import io from 'socket.io-client';
//const port = '3001';
const socket = io(); //должен принимать адрес, или возмет поумолчанию

export default socket;
