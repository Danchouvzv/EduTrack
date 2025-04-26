import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLang();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-[#1e1e1e] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-2xl">EduTrack</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            >
              {t('navigation.dashboard')}
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            >
              {t('navigation.contact')}
            </Link>
            
            {currentUser ? (
              <Link 
                to="/profile" 
                className="ml-4 btn btn-primary text-sm"
              >
                {currentUser.displayName}
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/auth/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
                >
                  {t('navigation.login')}
                </Link>
                <Link 
                  to="/auth/register" 
                  className="btn btn-primary text-sm"
                >
                  {t('navigation.signup')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Theme and language toggles */}
          <div className="hidden md:flex items-center">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            
            {/* Language selector */}
            <div className="relative ml-3">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
                aria-label="Change language"
              >
                {language === 'en' ? '🇬🇧' : language === 'ru' ? '🇷🇺' : '🇰🇿'}
              </button>
              
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-[#2a2a2a] ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setIsLangMenuOpen(false);
                      }}
                      className={`${language === 'en' ? 'bg-gray-100 dark:bg-[#3a3a3a]' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]`}
                      role="menuitem"
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('ru');
                        setIsLangMenuOpen(false);
                      }}
                      className={`${language === 'ru' ? 'bg-gray-100 dark:bg-[#3a3a3a]' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]`}
                      role="menuitem"
                    >
                      🇷🇺 Русский
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('kz');
                        setIsLangMenuOpen(false);
                      }}
                      className={`${language === 'kz' ? 'bg-gray-100 dark:bg-[#3a3a3a]' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]`}
                      role="menuitem"
                    >
                      🇰🇿 Қазақша
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white dark:bg-[#1e1e1e]"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.dashboard')}
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.contact')}
            </Link>
            {currentUser ? (
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentUser.displayName}
              </Link>
            ) : (
              <>
                <Link 
                  to="/auth/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.login')}
                </Link>
                <Link 
                  to="/auth/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-opacity-90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.signup')}
                </Link>
              </>
            )}
            
            {/* Theme toggle - mobile */}
            <div className="flex items-center px-3 py-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                <span className="ml-2 text-sm">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
            
            {/* Language toggles - mobile */}
            <div className="flex gap-2 px-3 py-2">
              <button
                onClick={() => changeLanguage('en')}
                className={`p-2 rounded-full ${language === 'en' ? 'bg-gray-100 dark:bg-[#3a3a3a]' : ''} text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] focus:outline-none`}
                aria-label="English"
              >
                🇬🇧
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`p-2 rounded-full ${language === 'ru' ? 'bg-gray-100 dark:bg-[#3a3a3a]' : ''} text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] focus:outline-none`}
                aria-label="Russian"
              >
                🇷🇺
              </button>
              <button
                onClick={() => changeLanguage('kz')}
                className={`p-2 rounded-full ${language === 'kz' ? 'bg-gray-100 dark:bg-[#3a3a3a]' : ''} text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] focus:outline-none`}
                aria-label="Kazakh"
              >
                🇰🇿
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 