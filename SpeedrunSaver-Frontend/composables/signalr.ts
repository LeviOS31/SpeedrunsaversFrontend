import { HubConnectionBuilder } from '@microsoft/signalr';

let connection = null;

export const startSignalRConnection = () => {
  connection = new HubConnectionBuilder()
    .withUrl('http://localhost:5270/Signals')
    .build();

  connection.start()
    .then(() => console.log('SignalR Connected'))
    .catch(err => console.error('SignalR Connection Error: ', err));

  return connection;
};

export default {
  startSignalRConnection,
};