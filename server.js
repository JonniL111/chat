const express = require('express');

const app = express(); //в этой перем экспресовское приложение
const server = require('http').createServer(app); //в этой серверное
const io = require('socket.io')(server, { cors: { origin: '*' } });

app.use(express.json()); //мидлвар для получения body в запросе

app.use(express.static('build'));

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
        usersData: [...rooms.get(roomId).get('usersData').entries()],
      }
    : { users: [], messages: [], usersData: [] };
  res.json(obj);
});

app.post('/rooms', (req, res) => {
  const { roomId } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
        ['usersData', new Map()],
      ]),
    );
  }
  res.send();
});

app.post('/img', (req, res) => {
  console.log(req.body.fData);
  res.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName, randColor }) => {
    //ROOM:JOIN - экшен для сокета на клиенте
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName); //помещаем в комнату нового пользователя
    if (!rooms.get(roomId).get('usersData').has(userName)) {
      rooms.get(roomId).get('usersData').set(userName, { randColor });
    } //добавляем в пользовательскую инфу цвет
    const users = [...rooms.get(roomId).get('users').values()];
    const usersData = [...rooms.get(roomId).get('usersData').entries()];
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', { users, usersData }); //в комноте всем кроме меня сообщить о подключении
  }); //в дата все что сокет передает от клиента серверу

  socket.on(
    'ROOM:NEW_MESSAGE',
    ({ roomId, messageId, userName, text, image, like = [], isDeleted }) => {
      const color = rooms.get(roomId).get('usersData').get(userName).randColor;
      const obj = { roomId, messageId, userName, text, image, like, isDeleted, color };
      rooms.get(roomId).get('messages').push(obj); //помещаем в комнату нового пользователя сообщение
      socket.to(roomId).broadcast.emit('ROOM:SET_MESSAGE', obj);
    },
  );

  socket.on('ROOM:NEW_IMAGE', ({ roomId, messageId, userName, photo, like = [], isDeleted }) => {
    const color = rooms.get(roomId).get('usersData').get(userName).randColor;
    const obj = { roomId, messageId, userName, photo, like, isDeleted, color };
    rooms.get(roomId).get('messages').push(obj); //помещаем в комнату нового пользователя сообщение
    socket.to(roomId).broadcast.emit('ROOM:SET_MESSAGE', obj);
  });

  socket.on('ROOM:DELETE_MESSAGE', ({ roomId, messageId }) => {
    const newText = 'Сообщение удалено ...';
    const index = rooms
      .get(roomId)
      .get('messages')
      .findIndex((item) => item.messageId === messageId); //ищем сообщение в массиве
    const message = rooms.get(roomId).get('messages');
    message[index].text = newText; //обновляем данные на сервере
    message[index].image = null;
    message[index].isDeleted = true;
    const obj = { index, newText, isDeleted: message[index].isDeleted };
    io.to(roomId).emit('ROOM:DELETE_MESSAGE', obj); //сообщаем об обновлении и высылаем данные для стора
  });

  //добавляем лайки
  socket.on('ROOM:LIKE_IT', ({ roomId, messageId, userId }) => {
    const index = rooms
      .get(roomId)
      .get('messages')
      .findIndex((item) => item.messageId === messageId);
    const message = rooms.get(roomId).get('messages');
    //проверка для добавления или удаления лайка пользователя (можно добавить только 1 лайк)
    if (!message[index].like.includes(userId)) {
      message[index].like.push(userId);
      const obj = { index, like: message[index].like };
      io.to(roomId).emit('ROOM:LIKE_IT', obj);
    } else {
      const likeId = message[index].like.findIndex((id) => id === userId); //получаем idх юзера в массиве лайков
      message[index].like.splice(likeId, 1); //удаляем лайк
      const obj = { index, like: message[index].like };
      io.to(roomId).emit('ROOM:LIKE_IT', obj);
    }
  });

  //отключаем юзеров при дисконекте
  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        const usersData = [...rooms.get(roomId).get('usersData').entries()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', { users, usersData });
      }
    });
  });
  console.log('user connection ', socket.id);
}); // когда пользователь подключился, получаем перем сокет

const PORT = process.env.PORT || 3001;

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Сервер на:3001, запущен`);
});
