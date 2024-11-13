import React from 'react';
import Index from './src/screens/Index';
import { ThemeProvider } from './src/contexts/ThemeContext';

const App = () => {

  return (
    <ThemeProvider>
          <Index />
    </ThemeProvider>
  )

}

export default App;
