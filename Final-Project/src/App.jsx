import React, { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [quote, setQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const fetchQuote = () => {
      if (!name || !age) {
        alert('Please enter your name and age');
        return;
      }
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


  // Handle name input validation
  const nameChange = (event) => {
    const nameInput = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(nameInput)) {
      setName(nameInput);
    } else {
      alert("Please enter a valid name (letters only).");
    }
  };


  // Handle age input validation
  const ageChange = (event) => {
    const ageInput = event.target.value;
    if (/^\d+$/.test(ageInput) && ageInput > 0 && ageInput <= 120) {
      setAge(ageInput);
    } else {
      alert("Please enter a valid age between 1 and 120.");
    }
  };




  return (
    <div>
    <input type='text' 
    placeholder='Enter Your Name' 
    value={name}
    onChange={nameChange}>
    </input>
    <input
    type='text'
    placeholder='Enter Your Age'
    value={age}
    onChange={ageChange}>
    </input>
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