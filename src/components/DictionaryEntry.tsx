import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { DictionaryEntry as DictionaryEntryType } from '../types';

interface DictionaryEntryProps {
  entry: DictionaryEntryType;
  isSearchResult?: boolean;
}

const DictionaryEntry: React.FC<DictionaryEntryProps> = ({ 
  entry, 
  isSearchResult = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(isSearchResult);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div 
      className={`
        border-b border-gray-100 dark:border-gray-800 last:border-0
        ${isSearchResult ? 'bg-white dark:bg-gray-900 shadow-sm rounded-lg border p-4 mb-3' : ''}
      `}
    >
      <div 
        className="flex items-center justify-between py-3 px-1 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {entry.term}
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(entry.term);
            }}
            className={`
              p-1.5 rounded-full 
              ${isCopied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'} 
              dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700
              transition-colors
            `}
            aria-label="Copy term"
          >
            <Copy size={14} />
          </button>
          <button className="p-1 text-gray-400 dark:text-gray-500">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="pb-3 px-1 text-gray-700 dark:text-gray-300 animate-fadeIn">
          <p>{entry.definition}</p>
        </div>
      )}
    </div>
  );
};

export default DictionaryEntry;