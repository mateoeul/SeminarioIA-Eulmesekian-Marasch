import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! Soy tu asistente para gestionar estudiantes.\nPuedo ayudarte a:\n- Buscar estudiantes por nombre o apellido\n- Agregar nuevos estudiantes\n- Mostrar la lista completa de estudiantes\n\n¿Qué necesitás?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Guardar historial actual + mensaje del usuario
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/chat', { mensaje: input });
      setMessages([...newMessages, { from: "bot", text: res.data.respuesta }]);
    } catch (err) {
      setMessages([...newMessages, { from: "bot", text: "Error al conectar con el asistente." }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h1 className="chat-title">Chat Asistente</h1>
        <div className="chat-history">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
              style={{
                textAlign: msg.from === "user" ? "right" : "left",
                margin: "8px 0"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: msg.from === "user" ? "#6366f1" : "#e5e7eb",
                  color: msg.from === "user" ? "#fff" : "#333",
                  borderRadius: "16px",
                  padding: "8px 14px",
                  maxWidth: "80%",
                  wordBreak: "break-word"
                }}
              >
                  {typeof msg.text === "object"
                    ? JSON.stringify(msg.text)
                    : msg.text}
              </span>
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <span
                style={{
                  display: "inline-block",
                  background: "#e5e7eb",
                  color: "#6366f1",
                  borderRadius: "16px",
                  padding: "8px 14px",
                  fontStyle: "italic"
                }}
              >
                El asistente está pensando...
              </span>
            </div>
          )}
        </div>
        <form className="chat-form" onSubmit={handleSend}>
          <input
            className="chat-input"
            type="text"
            placeholder="Escribí tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            className="chat-send"
            type="submit"
            disabled={!input.trim() || loading}
          >
            Enviar
          </button>
        </form>
        <footer className="chat-footer">
          Hecho con React & CSS
        </footer>
      </div>
    </div>
  )
}

export default App