import './App.css';
import MainTask from './components/MainTask';
import { useMemo, useRef, useEffect } from 'react';
import { PomodoroProvider } from './context/PomodoroContext';
import SaveButton from './components/SaveButton';
import PomodoroGrid from './components/PomodoroGrid';

const App = () => {
  const gridRef = useRef(null);

  const themes = useMemo(() => ({
    pomodoro: {
      foreground: '#ffffff',
      background: '#d95550',
    },
    short_break: {
      foreground: '#ffffff',
      background: '#1565c0',
    },
    long_break: {
      foreground: '#ffffff',
      background: '#ab47bc'

    },
    completed: {
      foreground: '#ffffff',
      background: '#4caf50'
    }
  }), []);

  useEffect(() => {
    const handleWindowLoad = () => {
      // This code will run when the window is fully loaded
      console.log('Window is fully loaded!');
      startCoBrowsing();
      // You can perform actions that require the entire window to be loaded here.
    };

    // Add the load event listener when the component mounts
    window.addEventListener('load', handleWindowLoad);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  });

  const startCoBrowsing = () => {  
    window["SARISKA_API_KEY"] = "27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437";
    window.startCoBrowsing('Wizard', 'cobrowsingsession4');

  }

  const stopCobrowsing = async () => {
    window.stopCoBrowsing();
  };

  return (
    <>
      <PomodoroProvider>
        <MainTask themes={themes} />
        <PomodoroGrid gridRef={gridRef} themes={themes} />
        <SaveButton gridRef={gridRef} />
      </PomodoroProvider>
    </>
  );
}

export default App;
