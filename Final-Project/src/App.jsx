import React, { useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [quote, setQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchQuote = () => {
    fetch('/api/v1/quotes?category=inspirational', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY, // Replace with your actual API key
      },
    })
    
    
      .then(response => {
        console.log('response status', response.status)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('fetched data', data)
        setQuote(data[0].quote); // 'quote' contains the quote
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        setErrorMessage('Oops! Unable to fetch a quote. Please try again later.');
      });
  };

  return (
    <div>
      <button onClick={fetchQuote}>{loading?'loading':'Get Motivational Quote'}</button>
      {errorMessage && <p>{errorMessage}</p>}
      {quote && <blockquote>
        "{quote.quote}" - {quote.author}
      </blockquote>}
    </div>
  );
}

export default App;