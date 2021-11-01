import './App.css';
import ChatRoom from './ChatRoom';

function App() {
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <button>Перезапустить</button>
      </header>
      <section className='chatRoom'>
        <ChatRoom />
      </section>

    </div>
  );
}

export default App;
