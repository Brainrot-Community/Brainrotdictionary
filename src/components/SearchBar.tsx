import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSticky?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, isSticky = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isSticky && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSticky]);

  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative ${isSticky ? 'w-full max-w-3xl' : 'w-full'}`}>
      <div className={`
        relative flex items-center 
        ${isSticky 
          ? 'backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl shadow-lg' 
          : 'bg-gray-100/80 dark:bg-gray-800/80 rounded-full'
        }
        transition-all duration-300 ease-in-out
      `}>
        <Search 
          className={`absolute left-3 ${searchTerm ? 'text-black dark:text-white' : 'text-gray-400'}`} 
          size={20} 
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`
            w-full py-3 pl-10 pr-10 text-base
            ${isSticky ? 'bg-transparent' : 'bg-transparent'} 
            rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:text-white placeholder-gray-400
            transition-all duration-300
          `}
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;