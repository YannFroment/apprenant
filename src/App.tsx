import Draggable from 'react-draggable';

const texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4'];

function App() {
  function handleStop(e, data) {
    console.log('stop');
  }

  return (
    <>
      {texts.map((item, index) => {
        return (
          <>
            <Draggable key={index} onStop={handleStop}>
              <div>{item}</div>
            </Draggable>
          </>
        );
      })}
    </>
  );
}

export default App;
