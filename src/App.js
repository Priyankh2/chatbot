import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
      if (!input) return;
  
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
  
      try {
          const response = await axios.post('http://localhost:5000/api/chatbot', { message: input });
  
          console.log('Bot Response:', response.data); // Log the API response data
  
          // Extract the relevant part of the response based on the actual structure
          const reply = response.data.reply || 'No valid response';
  
          setMessages([...newMessages, { sender: 'bot', text: reply }]);
      } catch (error) {
          console.error('Error sending message:', error);
          setMessages([...newMessages, { sender: 'bot', text: 'Error communicating with the bot.' }]);
      }
  
      setInput('');
  };
  
  

    return (
        <div className="App">
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
