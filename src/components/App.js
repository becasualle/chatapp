import './App.css';
import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import Message from '../uitils/Message';

function App() {
  const [messages, setMessages] = useState([]);
  const [cuid, setCuid] = useState('');
  const [lastBotMsg, setLastBotMsg] = useState('');
  const [lastUserMsg, setLastUserMsg] = useState('');

  const addBotMsg = (msg) => {

    const newMsg = new Message(msg, 'received');
    setMessages([...messages, newMsg]);

  }

  // CHAT.INIT Инициализация чата
  const initURL = 'https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.init';
  const initRequest = {
    uuid: '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4',
    cuid: '',
    context: {}
  }

  const initParams = {
    // mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(initRequest)
  };

  const fetchCuid = async (url, initParams) => {
    try {
      const response = await fetch(url, initParams);
      const data = await response.json();
      setCuid(data.result.cuid)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCuid(initURL, initParams);
  }, []);

  // CHAT.EVENT получение приветственного сообщения от инфа
  const eventURL = 'https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.event';

  const eventRequest = {
    cuid,
    "euid": '00b2fcbe-f27f-437b-a0d5-91072d840ed3'
  }

  const eventParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(eventRequest)
  };

  const fetchEvent = async (url, initParams) => {
    try {
      const response = await fetch(url, initParams);
      const data = await response.json();
      const textValue = data.result.text.value;
      textValue && setLastBotMsg(textValue);
      console.log(data)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    cuid && fetchEvent(eventURL, eventParams);
  }, [cuid]);

  useEffect(() => {
    lastBotMsg && addBotMsg(lastBotMsg);
  }, [lastBotMsg]);

  // CHAT.REQUEST Получение ответа и реакции инфа на запрос пользователя
  const requestURL = 'https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request';

  const readyRequest = {
    cuid,
    text: lastUserMsg
  }

  const readyParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(readyRequest)
  };

  const fetchReady = async (url, initParams) => {
    console.log('works')
    try {
      const response = await fetch(url, initParams);
      const data = await response.json();
      const textValue = data.result.text.value;
      textValue && setLastBotMsg(textValue);
      console.log(data)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    lastUserMsg && fetchReady(requestURL, readyParams);
  }, [lastUserMsg]);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <button>Очистить</button>
      </header>
      <section className='chatRoom'>
        <ChatRoom messages={messages} setMessages={setMessages} setLastUserMsg={setLastUserMsg} />
      </section>

    </div>
  );
}

export default App;
