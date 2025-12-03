import React from 'react';
import useAppState from './hooks/useAppState';
import SearchScreen from './components/screens/SearchScreen';
import GalleryScreen from './components/screens/GalleryScreen';
import ViewerScreen from './components/screens/ViewerScreen';
import ErrorScreen from './components/screens/ErrorScreen';

const App = () => {
  const appState = useAppState();
  const { currentScreen, error } = appState;

  const renderScreen = () => {
    if (currentScreen === 'gallery') {
      return <GalleryScreen {...appState} />;
    }

    if (currentScreen === 'viewer') {
      return <ViewerScreen {...appState} />;
    }

    if (currentScreen === 'error' || error) {
      return <ErrorScreen {...appState} />;
    }

    return <SearchScreen {...appState} />;
  };

  return renderScreen();
};

export default App;
