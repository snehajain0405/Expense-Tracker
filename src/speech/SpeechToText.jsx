import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = new recognition();

  useEffect(() => {
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setText(prev => prev + transcript + ' ');
        } else {
          interimTranscript += transcript;
        }
      }
    };

    speechRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    return () => {
      speechRecognition.stop();
    };
  }, []);

  const handleListen = () => {
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      speechRecognition.start();
      setIsListening(true);
    }
  };

  return (
  <div style={{ padding: '2rem' }}>
    <button onClick={handleListen}>
      {isListening ? 'Stop Listening' : 'Start Listening'}
    </button>
    
    <div style={{
      marginTop: '1rem',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      minHeight: '100px',
      backgroundColor: '#f9f9f9'
    }}>
      <p>{text || 'Your speech will appear here...'}</p>
    </div>
  </div>
);

};

export default SpeechToText;
