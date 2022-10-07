import { useState } from 'react';

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

    if (replace) {
      // CREATE, SAVING, AND SHOW
      setHistory(prev => [...prev.slice(0,-1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode])
    }
  }

  const back = function() {
    if(history.length > 1) {
    setHistory((prev) => {
      const newHistory = [...prev]
      newHistory.pop()
      return newHistory;
    });
    // setMode(history[history.length-1]);
  }
};
  
  return {mode: history[history.length-1], transition, back};
}