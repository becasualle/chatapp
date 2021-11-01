import React from 'react'
import { useState, useEffect } from 'react';
import Message from '../uitils/Message';
import { FaPaperPlane } from "react-icons/fa";


const InputBar = ({ messages, setMessages, feedEnd }) => {
    const [inputValue, setInputValue] = useState('');
    // записываем значение ввода в поле сообщения в inputValue
    const changeEventHandler = e => {
        setInputValue(e.target.value);
    }

    // после отправки создаем новое сообщение, добавляем в messages, очищаем поле ввода, скроллим в конец
    const sendMessageHandler = e => {
        e.preventDefault();
        const newMsg = new Message(inputValue, 'sent');
        setMessages([...messages, newMsg]);
        setInputValue('');
    }

    useEffect(() => {
        feedEnd.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, feedEnd])

    return (

        <form onSubmit={sendMessageHandler}>
            <input type="text" value={inputValue} onChange={changeEventHandler} placeholder="спросите меня про LTE" />
            <button type="submit" disabled={!inputValue}><FaPaperPlane /></button>
        </form>

    )
}

export default InputBar
