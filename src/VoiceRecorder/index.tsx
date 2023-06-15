import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

function VoiceRecorder() {
  const words = ['Chat', 'Poisson', 'Bocal'];
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognition | null>(null);

  function playAudio(word: string | undefined) {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  }

  async function startRecording(event: Event | undefined, word: string) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const audioChunks = [];

    recorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });

    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);

    // Démarrer la reconnaissance vocale en même temps que l'enregistrement
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      if (word.toLowerCase() === result) alert('Réussi');
    };

    recognition.onerror = (error) => {
      console.error('Erreur de reconnaissance vocale :', error);
    };

    recognition.onstart = () => {
      console.log('Reconnaissance vocale démarrée');
    };

    recognition.onend = () => {
      console.log('Reconnaissance vocale terminée');
    };

    recognition.start();
    setSpeechRecognition(recognition);
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }

    if (speechRecognition) {
      speechRecognition.stop();
      setSpeechRecognition(null);
    }
  }

  return (
    <Container>
      {words.map((word, index) => (
        <div key={index}>
          {word}
          <button onClick={() => playAudio(word)}>Écouter</button>
          <button
            onClick={
              recording ? stopRecording : () => startRecording(event, word)
            }
          >
            {recording
              ? "Arrêter l'enregistrement"
              : "Commencer l'enregistrement"}
          </button>
        </div>
      ))}
    </Container>
  );
}

export default VoiceRecorder;
