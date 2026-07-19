'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Simple parser for [text](/link) markdown syntax that our AI is instructed to use
const parseMarkdownLinks = (text) => {
  if (!text) return { __html: '' };
  // Replace [text](url) with <a href="url" style="color: var(--main); text-decoration: underline;">text</a>
  const html = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: var(--main); text-decoration: underline; font-weight: 500;">$1</a>');
  // Also replace basic newlines with <br/>
  const htmlWithBr = html.replace(/\n/g, '<br/>');
  return { __html: htmlWithBr };
};

export default function AIChatBubble() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load chat history on mount
  useEffect(() => {
    const saved = localStorage.getItem('gobiya_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse chat history');
      }
    } else {
      // Initial greeting
      setMessages([{ role: 'model', content: 'Hi there! I am the Gobiya AI Assistant. How can I help you grow your search visibility today?' }]);
    }
  }, []);

  // Save chat history on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('gobiya_chat_history', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      
      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages([...newMessages, { role: 'model', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'model', content: 'Sorry, I am having trouble connecting right now.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'model', content: 'Sorry, a network error occurred.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const initial = [{ role: 'model', content: 'Hi there! I am the Gobiya AI Assistant. How can I help you grow your search visibility today?' }];
    setMessages(initial);
    localStorage.setItem('gobiya_chat_history', JSON.stringify(initial));
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Floating Bubble Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chat"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--main)',
          color: 'var(--light)',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 2147483647,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--text)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--main)'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '2rem',
          width: '350px',
          maxWidth: 'calc(100vw - 4rem)',
          height: '500px',
          maxHeight: 'calc(100vh - 8rem)',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          zIndex: 2147483647,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'chatFadeIn 0.3s ease',
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid var(--border)',
            backgroundColor: '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }}></span>
                Gobiya AI
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online & Ready</p>
            </div>
            <button 
              onClick={handleReset}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}>
                  {msg.role === 'user' ? 'You' : 'Gobiya AI'}
                </span>
                <div 
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--main)' : 'var(--border)',
                    color: msg.role === 'user' ? 'var(--light)' : 'var(--text)',
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem',
                    borderBottomRightRadius: msg.role === 'user' ? '0.25rem' : '1rem',
                    borderBottomLeftRadius: msg.role === 'model' ? '0.25rem' : '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.4'
                  }}
                  dangerouslySetInnerHTML={parseMarkdownLinks(msg.content)}
                />
              </div>
            ))}
            
            {loading && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                 <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Gobiya AI</span>
                 <div style={{
                    backgroundColor: 'var(--border)',
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem',
                    borderBottomLeftRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}>
                    <span className="dot-typing">...</span>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} style={{
            padding: '1rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: '#f8fafc'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '2rem',
                border: '1px solid var(--border)',
                background: '#ffffff',
                color: 'var(--text)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: input.trim() ? 'var(--main)' : 'var(--border)',
                color: 'var(--light)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dot-typing { animation: blink 1.4s infinite both; }
        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }
      `}} />
    </>,
    document.body
  );
}
