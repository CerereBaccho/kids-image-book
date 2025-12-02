import { useCallback, useState } from 'react';
import { fetchImages } from '../services/wikimediaApi';

/**
 * Global app state hook
 * Manages screens, search term, results and search execution
 */
export const useAppState = () => {
  const [currentScreen, setCurrentScreen] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSetScreen = useCallback((nextScreen) => {
    setCurrentScreen(nextScreen);
  }, []);

  const handleSearch = useCallback(async (query) => {
    const trimmedQuery = query.trim();
    setSearchTerm(query);

    if (!trimmedQuery) {
      setSearchResults([]);
      setError(null);
      setCurrentScreen('search');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchImages(trimmedQuery);
      setSearchResults(results);
      setCurrentScreen('gallery');
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentScreen,
    searchTerm,
    searchResults,
    isLoading,
    error,
    handleSearch,
    handleSetScreen,
  };
};

export default useAppState;
