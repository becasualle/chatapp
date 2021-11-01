import React from 'react'
import { useState } from 'react';
import Message from '../uitils/Message';


const InputBar = ({ messages, setMessages, feedEnd }) => {
    const [inputValue, setInputValue] = useState('');
    // записываем значение ввода в поле сообщения в inputValue
    const changeEventHandler = e => {
        setInputValue(e.target.value);
    }

    // после отправки создаем новое сообщение, добавляем в messages, очищаем поле ввода, скроллим в конец
    const sendMessageHandler = e => {
        e.preventDefault();
        const newMsg = new Message(inputValue, 'user');
        setMessages([...messages, newMsg]);
        feedEnd.current.scrollIntoView({ behavior: 'smooth' });
        setInputValue('');
    }

    return (
        <div>
            <form onSubmit={sendMessageHandler}>
                <input type="text" value={inputValue} onChange={changeEventHandler} placeholder="спросите меня про LTE" />
                <button>🕊️</button>
            </form>
        </div>
    )
}

export default InputBar
