import React, { useEffect, useMemo, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
} from 'firebase/auth';
import useAppState from './hooks/useAppState';
import SearchScreen from './components/screens/SearchScreen';
import GalleryScreen from './components/screens/GalleryScreen';
import ViewerScreen from './components/screens/ViewerScreen';
import ErrorScreen from './components/screens/ErrorScreen';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const getFirebaseApp = () => {
  const existingApps = getApps();
  if (existingApps.length) {
    return existingApps[0];
  }
  return initializeApp(firebaseConfig);
};

const App = () => {
  const appState = useAppState();
  const { currentScreen, error } = appState;
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState(null);

  const firebaseApp = useMemo(() => getFirebaseApp(), []);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const customToken = import.meta.env.VITE_FIREBASE_CUSTOM_TOKEN;

    const authenticate = async () => {
      try {
        if (customToken) {
          await signInWithCustomToken(auth, customToken);
        } else {
          await signInAnonymously(auth);
        }
        setAuthReady(true);
      } catch (err) {
        setAuthError(err);
        if (customToken) {
          try {
            await signInAnonymously(auth);
            setAuthReady(true);
            setAuthError(null);
          } catch (fallbackErr) {
            setAuthError(fallbackErr);
          }
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthReady(true);
      }
    });

    authenticate();

    return () => {
      unsubscribe();
    };
  }, [firebaseApp]);

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 via-white to-sky-50 text-gray-700">
        <div className="text-center space-y-2">
          <p className="text-4xl">🚂</p>
          <p className="text-lg font-semibold">じゅんびちゅう… すこしまってね</p>
          {authError && (
            <p className="text-sm text-red-500">せっていを たしかめてね</p>
          )}
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    if (authError) {
      return <ErrorScreen />;
    }

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
