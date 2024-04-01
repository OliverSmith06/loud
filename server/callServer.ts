import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      io.to(roomId).emit('user-connected', userId); // Changed this line
  
      socket.on('disconnect', () => {
        io.to(roomId).emit('user-disconnected', userId); // Changed this line
      });
    });
  });
  

server.listen(7000, () => {
  console.log('Server running on http://localhost:7000');
});
