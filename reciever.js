const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
    auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWQwOTRhYTdmNDdiMzVmMjRlODBhZSIsImlhdCI6MTcyNjgxMDU3MSwiZXhwIjoxNzI5NDAyNTcxfQ.2bd4WLz8Bg-DfJr6KJIz2aTOqeF-3C8uaRqBHBFrYEQ'
    }
});

socket.on('connect', () => {
    console.log('Connected as User 2');
});

socket.on('chat message', (msg) => {
    console.log('New message received by User 2:', msg);
});

socket.on('disconnect', () => {
    console.log('User 2 disconnected');
});
