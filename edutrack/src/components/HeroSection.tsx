import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register" className="btn btn-primary text-center">
                {t('hero.tryFree')}
              </Link>
              <Link to="/features" className="btn btn-outline text-center">
                {t('hero.learnMore')}
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Students</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Teachers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Schools</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full h-[400px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
              <svg width="350" height="350" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"></path>
                <path d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.6722 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"></path>
                <path d="M9.25 16.5L4.75 19L12 23.25L19.25 19L14.6722 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"></path>
              </svg>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-accent/20 rounded-full filter blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-primary/20 rounded-full filter blur-lg animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-accent/30 rounded-full filter blur-md animate-pulse"></div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 w-28 h-28 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <svg className="w-14 h-14 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 