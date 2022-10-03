import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => [...prev, mode])

    if (replace) {
      // CREATE, SAVING, AND SHOW
      setHistory((prev) => {
        const newHistory = [...prev]
        newHistory.pop()
        return newHistory;
      });
    }
  }

  const back = function() {
    setHistory((prev) => {
      const newHistory = [...prev]
      newHistory.pop()
      return newHistory;
    });
    setMode(history[history.length-1]);
  };
  
  return {mode, transition, back};
}