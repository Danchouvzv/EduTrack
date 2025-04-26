import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface StoryCardProps {
  name: string;
  grade: string;
  story: string;
  improvement: string;
  subject: string;
}

const StoryCard = ({ name, grade, story, improvement, subject }: StoryCardProps) => {
  return (
    <motion.div 
      className="min-w-[300px] bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg p-6 flex flex-col"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          {name.charAt(0)}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{grade}</p>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{story}</p>
      
      <div className="mt-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject}</span>
          <span className="text-sm font-medium text-primary">{improvement}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" 
            style={{ width: improvement }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

const GrowthStoriesSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      name: "Aidan",
      grade: "9th Grade",
      story: "Improved in geometry by 30% in just 2 months with personalized practice recommendations.",
      improvement: "30%",
      subject: "Geometry"
    },
    {
      name: "Dilnaz",
      grade: "8th Grade",
      story: "Discovered her talent for biology through AI-recommended exploration activities.",
      improvement: "45%",
      subject: "Biology"
    },
    {
      name: "Arman",
      grade: "11th Grade",
      story: "Overcame math anxiety with step-by-step guidance and interactive visualizations.",
      improvement: "28%",
      subject: "Algebra"
    },
    {
      name: "Kamila",
      grade: "10th Grade",
      story: "Raised her language proficiency through daily AI conversation practice.",
      improvement: "35%",
      subject: "English"
    },
    {
      name: "Timur",
      grade: "7th Grade",
      story: "Found a love for coding through interactive programming challenges.",
      improvement: "40%",
      subject: "Computer Science"
    }
  ];

  const nextSlide = () => {
    if (sliderRef.current) {
      const maxIndex = Math.max(0, stories.length - getVisibleCards());
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    }
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 3; // xl
      if (window.innerWidth >= 768) return 2; // md
      return 1; // mobile
    }
    return 3; // default
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex(prev => Math.min(prev, Math.max(0, stories.length - getVisibleCards())));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stories.length]);

  return (
    <div className="bg-gray-50 dark:bg-[#151515] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('growthStories.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how students have improved their skills and discovered new talents with EduTrack.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center z-10">
            <button
              onClick={prevSlide}
              className="bg-white dark:bg-[#2a2a2a] p-2 rounded-full shadow-md disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center z-10">
            <button
              onClick={nextSlide}
              className="bg-white dark:bg-[#2a2a2a] p-2 rounded-full shadow-md disabled:opacity-50"
              disabled={currentIndex >= stories.length - getVisibleCards()}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden mx-10">
            <motion.div
              ref={sliderRef}
              className="flex gap-6 py-4"
              initial={false}
              animate={{ x: `calc(-${currentIndex * 100}% / ${getVisibleCards()})` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {stories.map((story, index) => (
                <div key={index} className="w-full min-w-[calc(100%/3-1rem)] md:min-w-[calc(50%-1rem)] xl:min-w-[calc(33.333%-1rem)]">
                  <StoryCard {...story} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a href="#" className="text-primary hover:text-accent font-medium">
            {t('growthStories.viewMore')} →
          </a>
        </div>
      </div>
    </div>
  );
};

export default GrowthStoriesSlider; 