import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 px-4 py-3 md:py-4
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-black dark:text-white" />
          <h1 className="ml-2 text-2xl font-semibold text-black dark:text-white">
            Brainrot Dictionary
          </h1>
        </div>

        {/* Desktop search */}
        <div className="hidden md:block w-1/3 min-w-64">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            isSticky={isScrolled}
          />
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
          />
        </div>
      )}
    </header>
  );
};

export default Header;