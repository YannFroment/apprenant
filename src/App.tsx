import './App.css';

function App() {
  function cut(text: string) {
    const phrases = text.match(/[A-Z][^.!?]*[.!?]/g);
    return phrases;
  }

  const text = 'Bonjour! Comment ça va? Je suis heureux de vous aider.';
  const cutted = cut(text);

  console.log(cutted);

  return (
    <>
      <h1>Vite + React</h1>
      <h3>Text : {text}</h3>
      <div className="card">
        <button>Random</button>
      </div>
    </>
  );
}

export default App;
