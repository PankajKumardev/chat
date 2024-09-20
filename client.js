const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
    auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWQwYTJiYjFhNmE1MjU2OWU4OWNkMyIsImlhdCI6MTcyNjgxMDkyNCwiZXhwIjoxNzI5NDAyOTI0fQ.hSBlqI1pA0nkgPCnkzj_4iWsWgVA6Hs6S08m3gZrxW0'
    }
});

socket.on('connect', () => {
    console.log('Connected as User 1');

    socket.emit('chat message', {
        receiverId: '66ed094aa7f47b35f24e80ae',
        message: 'Hello pankaj!!!'
    });
});

socket.on('chat message', (msg) => {
    console.log('New message received by User 1:', msg);
});

socket.on('disconnect', () => {
    console.log('User 1 disconnected');
});
