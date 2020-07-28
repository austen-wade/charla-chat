import React from 'react';
import SendMessage from './components/SendMessage';
import Messages from './components/Messages';
import './App.scss';

function App() {
	return (
		<>
			<div className="chat">
				<Messages />
				<SendMessage />
			</div>
		</>
	);
}

export default App;
