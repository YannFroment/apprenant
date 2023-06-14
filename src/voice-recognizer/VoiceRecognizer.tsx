import { useState } from 'react';

export const VoiceRecognizer = () => {
  const [buttonText, setButtonText] = useState('click me');

  const handleClick = () => {
    setButtonText('i was clicked');
  };
  return (
    <div>
      <button onClick={handleClick} type="button">
        {buttonText}
      </button>
    </div>
  );
};
