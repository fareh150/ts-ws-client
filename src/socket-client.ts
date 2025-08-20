import { Manager, Socket } from "socket.io-client"

export const connectToServer = (token: string) =>
{
    const manager = new Manager("http://localhost:3000/socket.io/socket.io.js" ,{
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });

    const socket = manager.socket('/');

    addListeners(socket);
}

const addListeners = (socket: Socket) =>
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

    socket.on('message-from-server', (payload: { fullname: string, message: string}) => {
        const newMessage = document.createElement('li');
        newMessage.innerText = `${payload.fullname}: ${payload.message}`;
        messagesUl.appendChild(newMessage);
        messagesUl.scrollTop = messagesUl.scrollHeight;
        
    })

}