import { useState, useMemo } from 'react';
import { DictionaryEntry } from '../types';
import { sortedDictionaryData } from '../data/dictionary';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    
    return sortedDictionaryData.filter(entry => 
      entry.term.toLowerCase().includes(lowercaseSearch) ||
      entry.definition.toLowerCase().includes(lowercaseSearch)
    );
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredEntries,
    hasResults: filteredEntries.length > 0,
    isSearching: searchTerm.trim() !== ''
  };
};