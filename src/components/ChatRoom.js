import React from 'react'
import { useRef } from 'react/cjs/react.development';
import ChatMessage from './ChatMessage';
import InputBar from './InputBar';

const ChatRoom = ({ messages, setMessages, setLastUserMsg }) => {
    const feedEnd = useRef();
    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} text={msg.text} type={msg.type} />)}
                <span ref={feedEnd}></span>
            </main>
            <InputBar messages={messages} setMessages={setMessages} feedEnd={feedEnd} setLastUserMsg={setLastUserMsg} />
        </>
    )
}

export default ChatRoom
