import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatBot from '../components/AIChatBot';

// Mock data for the student dashboard
const mockSubjects = [
  { id: 1, name: 'Mathematics', progress: 75, color: 'from-blue-500 to-indigo-600' },
  { id: 2, name: 'Science', progress: 82, color: 'from-green-500 to-emerald-600' },
  { id: 3, name: 'Literature', progress: 60, color: 'from-yellow-500 to-amber-600' },
  { id: 4, name: 'History', progress: 45, color: 'from-red-500 to-rose-600' },
  { id: 5, name: 'Languages', progress: 90, color: 'from-purple-500 to-violet-600' },
];

const mockRecommendations = [
  {
    id: 1,
    title: 'Geometry Practice',
    description: 'Based on your recent quiz, we recommend practicing more triangle theorems.',
    type: 'practice',
  },
  {
    id: 2,
    title: 'Science Experiment',
    description: 'Try this virtual lab to better understand chemical reactions.',
    type: 'activity',
  },
  {
    id: 3,
    title: 'Reading Assignment',
    description: 'This article on ancient civilizations will help you prepare for your upcoming test.',
    type: 'reading',
  },
];

const mockAchievements = [
  {
    id: 1,
    title: 'Math Master',
    description: 'Completed 10 consecutive math exercises with over 90% accuracy.',
    date: '2023-10-15',
  },
  {
    id: 2,
    title: 'Science Explorer',
    description: 'Finished all experiments in the Chemistry module.',
    date: '2023-10-10',
  },
];

const DashboardStudent = () => {
  const { t } = useTranslation();
  const { currentUser, userDisplayName } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');

  // This would be replaced with a hook that fetches real data
  const [subjects, setSubjects] = useState(mockSubjects);
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get student data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'practice':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'activity':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'reading':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome message */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.student.welcome', { name: userDisplayName || 'Student' })}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Track your progress, see recommendations, and check your achievements
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('progress')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'progress'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.student.progress')}
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recommendations'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.student.recommendations')}
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'achievements'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.student.achievements')}
              </button>
            </nav>
          </div>

          {/* Content based on active tab */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="mt-6">
              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Subject Progress</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subjects.map((subject) => (
                      <motion.div
                        key={subject.id}
                        className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{subject.name}</h3>
                          <span className="text-lg font-semibold text-primary">{subject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${subject.color}`}
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>0%</span>
                          <span>100%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations Tab */}
              {activeTab === 'recommendations' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Recommendations</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendations.map((recommendation, index) => (
                      <motion.div
                        key={recommendation.id}
                        className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              {getTypeIcon(recommendation.type)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{recommendation.title}</h3>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">{recommendation.description}</p>
                            <div className="mt-4">
                              <button className="btn btn-primary">Start Now</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button className="btn btn-outline flex items-center">
                      {t('dashboard.student.openAI')}
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </span>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">{achievement.description}</p>
                            <p className="mt-2 text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AIChatBot />
    </div>
  );
};

export default DashboardStudent; 