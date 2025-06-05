import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DictionarySection from './components/DictionarySection';
import SearchResults from './components/SearchResults';
import AlphabeticalIndex from './components/AlphabeticalIndex';
import { useSearch } from './hooks/useSearch';
import { getAlphabeticalSections } from './data/dictionary';

function App() {
  const { searchTerm, setSearchTerm, filteredEntries, isSearching, hasResults } = useSearch();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sections = Object.keys(getAlphabeticalSections()).sort();
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -75% 0px',
      threshold: 0
    });

    // Reset refs map
    sectionRefs.current = new Map();

    // Observe all section elements
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        sectionRefs.current.set(section, element);
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const handleSectionClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Get alphabetical sections data
  const alphabeticalSections = getAlphabeticalSections();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Mobile search visible only on larger screens or when there are no results */}
        <div className="md:hidden mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Hero section */}
        {!isSearching && (
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
              Brainrot Dictionary
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your definitive guide to internet slang, memes, and digital culture phenomena
            </p>
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-6">
          {/* Alphabetical index sidebar */}
          <AlphabeticalIndex 
            sections={sections} 
            activeSection={activeSection} 
            onSectionClick={handleSectionClick}
          />

          {/* Dictionary content */}
          <div>
            {/* Search results */}
            {isSearching && (
              <SearchResults entries={filteredEntries} searchTerm={searchTerm} />
            )}

            {/* Alphabetical list when not searching or when search has no results */}
            {(!isSearching || (isSearching && !hasResults)) && (
              <div className="space-y-8">
                {sections.map(letter => (
                  <DictionarySection 
                    key={letter}
                    id={letter}
                    letter={letter} 
                    entries={alphabeticalSections[letter]} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Brainrot Dictionary. All internet slang explained.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;