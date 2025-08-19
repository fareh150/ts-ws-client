import { Manager, Socket } from "socket.io-client"

export const connectToServer = () =>
{
    const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

    const socket = manager.socket('/');

    addListeners(socket);
}

const addListeners = (socket: Socket) =>
{
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerText = 'online';
        
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerText = 'offline';
    })

    socket.on('clients-updated', (clients: string[]) =>
    {
        clientsUl.innerHTML = clients.map(client => `<li>${client}</li>`).join('');
    })

}