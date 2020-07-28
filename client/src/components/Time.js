import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

export default function ClientComponent() {
	const [response, setResponse] = useState('');

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);

		socket.on('socketTest', (data) => {
			const d = new Date(data);
			var datestring =
				('0' + d.getHours()).slice(-2) +
				':' +
				('0' + d.getMinutes()).slice(-2);

			console.log({
				'server time': `${datestring}`,
			});
			setResponse(data);
		});

		return () => socket.disconnect();
	}, []);

	if (response) {
		return (
			<p>
				It's <time dateTime={response}>{response}</time>
			</p>
		);
	} else {
		return <p>Loading response ...</p>;
	}
}
