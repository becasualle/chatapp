import React from 'react'
import userImg from '../img/user.png'
import assistantImg from '../img/assistant.png'

const ChatMessage = ({ text, type }) => {
    const avatar = type === 'sent' ? userImg : assistantImg;

    return (
        <div className={`message ${type}`}>
            <img src={avatar} alt="avatar" />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage
