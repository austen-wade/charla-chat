const messages = [
	{
		id: 1,
		user: 'austen',
		content: 'pizza is great',
	},
];

const socketTest = (socket) => {
	const response = new Date();
	socket.emit('socket_test', response);
};
const getMessages = () => {
	return messages;
};

const saveMessage = (message) => {
	if (!message) return;
	const newMessage = {
		id: messages.length + 1,
		user: message.user,
		content: message.message,
	};
	messages.push(newMessage);
};

module.exports = {
	socketTest,
	getMessages,
	saveMessage,
};
