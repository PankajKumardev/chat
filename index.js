const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { verifyTokenSocket } = require('./middleware/authMiddleware');
const Chat = require('./models/chatModel');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const onlineUsers = new Map();


io.use(verifyTokenSocket).on('connection', (socket) => {
    console.log('User connected:', socket.user.id);

  
    onlineUsers.set(socket.user.id, socket.id);

   
    socket.on('chat message', async (msg) => {
        const { receiverId, message } = msg;

        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('chat message', {
                senderId: socket.user.id,
                message,
            });
        }

        try {
            await Chat.create({
                senderId: socket.user.id,
                receiverId: receiverId,
                message,
            });
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.user.id);
        onlineUsers.delete(socket.user.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
