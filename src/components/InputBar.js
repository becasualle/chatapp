import React from 'react'
import { useState } from 'react';

const InputBar = () => {
    const [inputValue, setInputValue] = useState('');
    const changeEventHandler = e => {
        setInputValue(e.target.value);
    }
    const sendMessageHandler = e => {
        e.preventDefault();
        setInputValue('');
    }

    return (
        <div>
            <form onSubmit={sendMessageHandler}>
                <input type="text" value={inputValue} onChange={changeEventHandler} placeholder="спросите меня про lte" />
                <button>🕊️</button>
            </form>
        </div>
    )
}

export default InputBar
