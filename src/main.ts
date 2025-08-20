import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websockets - Client</h2>

    <input id="jwToken" placeholder="JWT Token" />
    <button id="connect">Connect</button>

    <br />

    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>


    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`;

//connectToServer();


const jwtToken = document.querySelector<HTMLInputElement>('#jwToken')!;
const connectButton = document.querySelector<HTMLButtonElement>('#connect')!;

connectButton.addEventListener('click', () => {
    if (jwtToken.value.trim().length <= 0) return alert('JWT Token is required');

    connectToServer(jwtToken.value.trim());
});