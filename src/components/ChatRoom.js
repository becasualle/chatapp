import React from 'react'
import { useState, useRef } from 'react/cjs/react.development';
import ChatMessage from './ChatMessage';
import InputBar from './InputBar';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const feedEnd = useRef();

    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} text={msg.text} type={msg.type} />)}
                <span ref={feedEnd}></span>
            </main>
            <InputBar messages={messages} setMessages={setMessages} feedEnd={feedEnd} />
        </>
    )
}

export default ChatRoom
