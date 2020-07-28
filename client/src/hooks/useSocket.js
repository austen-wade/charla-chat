import React from 'react';
import socketIOClient from 'socket.io-client';

const useSocket = (serverUrl) => {
	const [response, setResponse] = React.useState({});
	const [isConnected, setConnected] = React.useState(false);
	const [socket, setSocket] = React.useState(null);

	React.useEffect(() => {
		const socket = socketIOClient(serverUrl || `http://localhost:4001`);
		setConnected(true);
		setSocket(socket);
		socket.on('message', (message) => {
			if (!message.type) return;
			switch (message.type) {
				case 'get_messages':
					setResponse({ ...response, messages: message.messages });
					break;

				default:
					break;
			}
		});

		return () => {
			socket.disconnect();
			setConnected(false);
			setSocket(null);
		};
		// eslint-disable-next-line
	}, [serverUrl, isConnected]);

	const dispatch = ({ type, payload }) => {
		switch (type) {
			case 'send_data':
				socket.emit('message', { type, ...payload });
				break;
			default:
				break;
		}
	};

	return [response, dispatch];
};

export default useSocket;
