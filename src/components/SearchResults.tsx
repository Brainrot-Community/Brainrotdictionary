import React from 'react';
import { DictionaryEntry as DictionaryEntryType } from '../types';
import DictionaryEntry from './DictionaryEntry';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  entries: DictionaryEntryType[];
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ entries, searchTerm }) => {
  if (!searchTerm.trim()) {
    return null;
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">No results found</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We couldn't find any terms matching "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <div className="py-4 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
          Search Results
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {entries.length} result{entries.length !== 1 ? 's' : ''} for "{searchTerm}"
        </p>
      </div>
      <div className="space-y-1">
        {entries.map((entry) => (
          <DictionaryEntry key={entry.term} entry={entry} isSearchResult={true} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;