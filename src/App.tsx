import React from 'react';
import Page from './components/Page';
import { GlobalStyles } from './styles/GlobalStyles';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <>
      <Page />
      <GlobalStyles />
    </>
  );
};

export default App;
