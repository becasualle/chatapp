import './App.css';
import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import Message from '../uitils/Message';

// Подгружаем историю из локального хранилища
const getLocalStorage = () => {
  let messages = localStorage.getItem('messages');
  if (messages) {
    return JSON.parse(localStorage.getItem('messages'))
  } else {
    return []
  }
}

function App() {
  const [messages, setMessages] = useState(getLocalStorage());
  const [cuid, setCuid] = useState('');
  const [lastBotMsg, setLastBotMsg] = useState('');
  const [lastUserMsg, setLastUserMsg] = useState('');

  const uuid = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';
  const euid = '00b2fcbe-f27f-437b-a0d5-91072d840ed3';
  const url = 'https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.';
  // три типа методов 
  const urlType = {
    init: 'init',
    event: 'event',
    request: 'request'
  }
  // в зависимости от метода конструируем ссылку и параметры POST-запроса: меняется body
  const buildFetchInput = (inputType) => {
    let fetchUrl = '';
    let reqBody = {};

    if (inputType === urlType.init) {
      fetchUrl = url + urlType.init;
      reqBody = { uuid }
    } else if (inputType === urlType.event) {
      fetchUrl = url + urlType.event;
      reqBody = {
        cuid,
        euid
      };
    } else if (inputType === urlType.request) {
      fetchUrl = url + urlType.request;
      reqBody = {
        cuid,
        text: lastUserMsg
      };
    }

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(reqBody)
    }
    return { fetchUrl, params }
  }

  // получаем данные от API и в зависимости от их типа обновляем стейты
  const fetchData = async (inputType) => {
    try {
      const { fetchUrl, params } = buildFetchInput(inputType);
      const response = await fetch(fetchUrl, params);
      const data = await response.json();
      // обновляем идентификатор чата когда происходит инициализация
      if (inputType === urlType.init) {
        setCuid(data.result.cuid)
      } else {
        // когда событие READY (приветственное сообщение) или метод REQUEST (ответ на запрос пользователя) - обновляем последнее сообщение
        const textValue = data.result.text.value;
        textValue && setLastBotMsg(textValue);
      }
    } catch (error) {
      throw error;
    }
  };
  // добавляем сообщение от бота в наш список сообщений
  const addBotMsg = (msg) => {
    const newMsg = new Message(msg, 'received');
    setMessages([...messages, newMsg]);
  }

  const resetChat = () => {
    // очистить локальное хранилище
    // удалить cuid
    // корректно инициализировать новый чат
  };

  useEffect(() => {
    // fetchCuid(initURL, initParams);
    fetchData(urlType.init)
  }, []);

  useEffect(() => {
    cuid && fetchData(urlType.event);
  }, [cuid]);

  useEffect(() => {
    lastBotMsg && addBotMsg(lastBotMsg);
  }, [lastBotMsg]);

  useEffect(() => {
    lastUserMsg && fetchData(urlType.request);
  }, [lastUserMsg]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <button onClick={resetChat}>Очистить</button>
      </header>
      <section className='chatRoom'>
        <ChatRoom messages={messages} setMessages={setMessages} setLastUserMsg={setLastUserMsg} />
      </section>

    </div>
  );
}

export default App;
