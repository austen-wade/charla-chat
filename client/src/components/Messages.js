import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
const ENDPOINT = 'http://127.0.0.1:4001';

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const [socketResponse] = useSocket(ENDPOINT);

	useEffect(() => {
		if (socketResponse.messages) {
			setMessages(socketResponse.messages);
		}
	}, [socketResponse]);

	return (
		<div className="messages">
			{!!messages.length &&
				messages.map((message) => {
					return (
						<div className="message" key={message.id}>
							<div className="message-user">
								<b>{message.user}</b>
							</div>
							<div className="message-content">
								{message.content}
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Messages;
