import React from 'react'
import './ChatMessage.css'

const ChatMessage = () => {
    return (
        <div className='message sent'>
            <img src="https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1635764718~hmac=64ac6a6a4aeb64315ea4c751ef2a9281" alt="avatar" className='userAvatar' />
            <p>Здравствуйте</p>
        </div>
    )
}

export default ChatMessage
