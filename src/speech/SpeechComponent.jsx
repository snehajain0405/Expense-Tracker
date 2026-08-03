import React, { useEffect, useState } from 'react';
import { incomeCategories, expenseCategories } from '../constants/categories';

const SpeechComponent = ({ onVoiceInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptDisplay, setTranscriptDisplay] = useState('');

  const getMatchedCategory = (text, type) => {
    const categoryList = type === 'Income' ? incomeCategories : expenseCategories;
    const lowerText = text.toLowerCase();

    for (let category of categoryList) {
      if (lowerText.includes(category.type.toLowerCase())) {
        return category.type;
      }
    }
    return '';
  };

  useEffect(() => {
    if (!isRecording) return;

    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const extractDetails = (text) => {
      const lowerText = text.toLowerCase();

      const type = lowerText.includes('income') ? 'Income'
                 : lowerText.includes('expense') ? 'Expense' : '';

      const amountMatch = text.match(/\b\d+\b/);
      const amount = amountMatch ? amountMatch[0] : '';

      const category = getMatchedCategory(text, type);

      const monthMap = {
        january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
        july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
      };
      const dateRegex = /(?:on\s)?(january|february|march|april|may|june|july|august|september|october|november|december)\s(\d{1,2})/i;
      const dateMatch = text.match(dateRegex);
      let date = '';
      if (dateMatch) {
        const month = monthMap[dateMatch[1].toLowerCase()];
        const day = dateMatch[2].padStart(2, '0');
        const year = new Date().getFullYear();
        date = `${year}-${month}-${day}`;
      }

      return { type, amount, category, date };
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          const { type, amount, category, date } = extractDetails(transcript);
          if (onVoiceInput) {
            onVoiceInput({ type, amount, category, date });
          }
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscriptDisplay(finalTranscript + interimTranscript);
    };

    recognition.start();

    return () => recognition.stop();
  }, [isRecording, onVoiceInput]);

  const handleToggle = () => {
    setIsRecording(prev => !prev);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={handleToggle}>
        {isRecording ? '🛑 Stop Listening' : '🎙️ Start Listening'}
      </button>
      <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#444' }}>
        {transcriptDisplay && <p><strong>🗣️ You said:</strong> {transcriptDisplay}</p>}
      </div>
    </div>
  );
};

export default SpeechComponent;
