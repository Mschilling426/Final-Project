import React, { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [quote, setQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    console.log('API Key:', API_KEY); // Log key for debugging
  
    setFadeIn(false);

    fetch('https://api.api-ninjas.com/v1/quotes', {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
      },
    })
      .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Data:', data);
        setTimeout(() => {
        setQuote(data[0]); 
        setFadeIn(true);
      }, 300)
        setErrorMessage('');
  })
      .catch(error => {
        console.error('Error Fetching Quote:', error);
        setErrorMessage('Oops! Unable to fetch a quote. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={fetchQuote}>
        {loading ? 'Loading...' : 'Quotes'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {quote && (
        <blockquote className={fadeIn ? 'fade-in' : ''}>
        "{quote.quote}" - {quote.author}
    
          
        </blockquote>
      )}
    </div>
  );
}

export default App;