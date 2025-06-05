import React from 'react';
import { DictionaryEntry as DictionaryEntryType } from '../types';
import DictionaryEntry from './DictionaryEntry';

interface DictionarySectionProps {
  letter: string;
  entries: DictionaryEntryType[];
  id?: string;
}

const DictionarySection: React.FC<DictionarySectionProps> = ({ 
  letter, 
  entries,
  id
}) => {
  return (
    <section id={id} className="pt-6 pb-2 animate-fadeIn">
      <div className="sticky top-20 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-2">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{letter}</h2>
        <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mb-2"></div>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-lg overflow-hidden">
        {entries.map((entry) => (
          <DictionaryEntry key={entry.term} entry={entry} />
        ))}
      </div>
    </section>
  );
};

export default DictionarySection;