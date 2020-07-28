const socketIo = require('socket.io');
const { getMessages, saveMessage } = require('./events');

let interval;

function initSockets(httpServer) {
	const io = socketIo(httpServer);

	io.on('connection', (socket) => {
		console.log('New client connected');
		if (interval) {
			clearInterval(interval);
		}

		socket.emit('message', {
			type: 'get_messages',
			messages: getMessages(),
		});

		socket.on('message', (message) => {
			if (!message.type) return;

			switch (message.type) {
				case 'send_data':
					saveMessage(message);
					const newMessages = getMessages();
					io.sockets.emit('message', {
						type: 'get_messages',
						messages: newMessages,
					});
					break;

				default:
					break;
			}
		});
		socket.on('disconnect', () => {
			console.log('Client disconnected');
			clearInterval(interval);
		});
	});
}

module.exports = initSockets;
