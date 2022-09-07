import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import { NoteContextProvider } from './context/NoteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="archived" element={<App />} />
        </Routes>
      </NoteContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
