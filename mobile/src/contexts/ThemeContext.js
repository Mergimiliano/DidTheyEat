import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 80,
      color: '#000',
      fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 20,
      color: 'gray',
    },
    textInput: {
      borderWidth: 1,
      borderColor: 'gray',
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
