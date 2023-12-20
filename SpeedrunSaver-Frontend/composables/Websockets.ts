export const useWebsockets = (table:string) => { 
    var socket:WebSocket = new WebSocket('ws://localhost:8080');
    switch (table) {
        case 'categories':
            socket = new WebSocket('ws://localhost:8080');
        break;
        case 'comments':
            socket = new WebSocket('ws://localhost:8081');
        break;
        case 'games':
            socket = new WebSocket('ws://localhost:8082');
        break;
        case 'platforms':
            socket = new WebSocket('ws://localhost:8083');
        break;
        case 'rules':
            socket = new WebSocket('ws://localhost:8084');
        break;
        case 'speedruns':
            socket = new WebSocket('ws://localhost:8085');
        break;
        case 'users':
            socket = new WebSocket('ws://localhost:8086');
        break;
    }

    socket.onopen = (event) => {
        console.log('WebSocket connection opened:', event);
    };

    socket.onmessage = (event) => {
        const data = event.data;
        console.log('Received message:', data);

        // Update your UI with the new data
        // For simplicity, let's just log it to the console
        //document.body.innerHTML += `<p>${data}</p>`;
    };

    socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}