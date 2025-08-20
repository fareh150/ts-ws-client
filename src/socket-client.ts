import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string) =>
{
    const manager = new Manager("https://teslo-shop-zgyg.onrender.com/socket.io/socket.io.js" ,{
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });

    // Limpiar listeners previos
    socket?.removeAllListeners();
    
    socket = manager.socket('/');

    addListeners();
}

const addListeners = () =>
{
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

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

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if ( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', {
            id: 'Yo!',
            message: messageInput.value
        });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string}) => {
        const newMessage = document.createElement('li');

        newMessage.innerText = `${payload.fullName}: ${payload.message}`;
        messagesUl.appendChild(newMessage);
        messagesUl.scrollTop = messagesUl.scrollHeight;
        
    })

}