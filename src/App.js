import './App.css';
import { useState, useEffect } from 'react';
import ChatRoom from './components/ChatRoom';
import Message from './uitils/Message';

// Подгружаем историю из локального хранилища
const getLocalMessages = () => {
  let messages = localStorage.getItem('messages');
  if (messages) {
    return JSON.parse(localStorage.getItem('messages'))
  } else {
    return []
  }
}

const getLocalCuid = () => {
  let cuid = localStorage.getItem('cuid');
  if (cuid) {
    return JSON.parse(localStorage.getItem('cuid'))
  } else {
    return ''
  }
}

function App() {
  const [messages, setMessages] = useState(getLocalMessages());
  const [cuid, setCuid] = useState(getLocalCuid());
  const [lastBotMsg, setLastBotMsg] = useState('');
  const [lastUserMsg, setLastUserMsg] = useState('');
  // это значение нужно нам для ответа каждый раз, когда пользователь вводит повторное сообщение. Используется в качестве зависимости в useEffect.
  const countUserMessages = messages.filter(msg => msg.type === 'sent').length;

  // данные для формирования запроса
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
      }
      // когда событие READY (приветственное сообщение) или метод REQUEST (ответ на запрос пользователя) - обновляем последнее сообщение
      else {
        // проверяем, если сервер вернул новый cuid - обновляем его везде. Если хотим, чтобы при этом очищался чат и история - нужно вызвать resetChat (не уверен, что так нужно, оставляю только обновление cuid)
        urlType.request && data.result.cuid && data.result.cuid !== cuid && setCuid(data.result.cuid);
        const textValue = data.result.text.value;
        textValue && setLastBotMsg(textValue);
        // отправляем сообщение от бота каждый раз, когда оно является приветственным или когда оно хранится в стейте. Это нужно, чтобы избежать дупликатов при обновлении страницы.
        (lastBotMsg || textValue === 'Здравствуйте.') && addBotMsg(textValue);
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
  // перезапуск разговора в новой сессии с удалением истории текущего диалога
  const resetChat = () => {
    localStorage.clear();
    setMessages([]);
    setCuid('');
    setLastBotMsg('');
    setLastUserMsg('');
    fetchData(urlType.init)
  };
  // получаем cuid при первом рендере (в случае, если у нас нет cuid в локальном хранилище)
  useEffect(() => {
    !cuid && fetchData(urlType.init)
    // eslint-disable-next-line
  }, []);
  // получаем приветственное сообщение
  useEffect(() => {
    cuid && fetchData(urlType.event);
    // eslint-disable-next-line
  }, [cuid]);

  // сохраняем последнее отправленное сообщение пользователя для формирования запроса на реакцию бота
  // каждый раз, когда появляется пользовательское сообщение. Мы используем countUserMessages вместо lastUserMsg, чтобы обрабатывать повторные сообщения пользователя (3раза ввел lte = 3 раза получил ответы)
  useEffect(() => {
    fetchData(urlType.request);
    // eslint-disable-next-line
  }, [countUserMessages]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem('cuid', JSON.stringify(cuid))
  }, [cuid])

  return (
    <div className="App">
      <header>
        <h1>🤖💬</h1>
        <button onClick={resetChat}>Очистить</button>
      </header>
      <section className='chatRoom'>
        <ChatRoom messages={messages} setMessages={setMessages} setLastUserMsg={setLastUserMsg} />
      </section>

    </div>
  );
}

export default App;
