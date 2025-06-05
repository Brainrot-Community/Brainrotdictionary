import React from 'react';

interface AlphabeticalIndexProps {
  sections: string[];
  activeSection: string | null;
  onSectionClick: (section: string) => void;
}

const AlphabeticalIndex: React.FC<AlphabeticalIndexProps> = ({ 
  sections, 
  activeSection, 
  onSectionClick 
}) => {
  return (
    <div className="sticky top-24 hidden md:block">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-lg shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Index</h2>
        <div className="flex flex-col gap-2">
          {sections.map(section => (
            <button
              key={section}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-200
                ${activeSection === section 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 font-medium' 
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}
              `}
              onClick={() => onSectionClick(section)}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabeticalIndex;