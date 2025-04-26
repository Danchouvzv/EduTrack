import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatBot from '../components/AIChatBot';

// Mock data for the parent dashboard
const mockChildren = [
  {
    id: 1,
    name: 'Aidan',
    grade: '9th Grade',
    avatar: null,
    subjects: [
      { name: 'Mathematics', progress: 75, grade: 'B+' },
      { name: 'Science', progress: 82, grade: 'A-' },
      { name: 'Literature', progress: 60, grade: 'C+' },
      { name: 'History', progress: 45, grade: 'C-' },
    ],
    achievements: [
      { id: 1, title: 'Math Master', date: '2023-10-15' },
      { id: 2, title: 'Science Explorer', date: '2023-10-10' },
    ],
  },
  {
    id: 2,
    name: 'Sophia',
    grade: '7th Grade',
    avatar: null,
    subjects: [
      { name: 'Mathematics', progress: 90, grade: 'A' },
      { name: 'Science', progress: 78, grade: 'B+' },
      { name: 'Literature', progress: 85, grade: 'A-' },
      { name: 'History', progress: 88, grade: 'A-' },
    ],
    achievements: [
      { id: 1, title: 'Reading Champion', date: '2023-10-18' },
      { id: 2, title: 'Perfect Attendance', date: '2023-10-01' },
    ],
  },
];

const mockParentAdvice = [
  {
    id: 1,
    title: 'Support Math Learning',
    description: 'Aidan is struggling with geometry concepts. Consider reviewing triangles and angles with them.',
    childId: 1,
  },
  {
    id: 2,
    title: 'Reading Encouragement',
    description: 'Sophia enjoys literature. Encourage more reading by visiting the library this weekend.',
    childId: 2,
  },
  {
    id: 3,
    title: 'History Project Help',
    description: 'Aidan has an upcoming history project. They may need help researching ancient civilizations.',
    childId: 1,
  },
];

// Weekly report data
const mockWeeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      childId: 1,
      data: [65, 70, 75, 68, 72],
    },
    {
      childId: 2,
      data: [85, 88, 84, 90, 92],
    },
  ],
};

const DashboardParent = () => {
  const { t } = useTranslation();
  const { currentUser, userDisplayName } = useAuth();
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedChild, setSelectedChild] = useState<number | null>(mockChildren[0].id);
  
  // This would be replaced with a hook that fetches real data
  const [children, setChildren] = useState(mockChildren);
  const [parentAdvice, setParentAdvice] = useState(mockParentAdvice);
  const [weeklyData, setWeeklyData] = useState(mockWeeklyData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get parent data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getFilteredAdvice = () => {
    if (!selectedChild) return parentAdvice;
    return parentAdvice.filter(advice => advice.childId === selectedChild);
  };

  const getSelectedChild = () => {
    return children.find(child => child.id === selectedChild) || null;
  };
  
  const getWeeklyDataForChild = () => {
    if (!selectedChild) return [];
    const childData = weeklyData.datasets.find(d => d.childId === selectedChild);
    return childData ? childData.data : [];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome message */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {userDisplayName || 'Parent'}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Monitor your child's progress and get personalized advice
            </p>
          </div>

          {/* Child selector */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {children.map(child => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedChild === child.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {child.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'summary'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.parent.summary')}
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.parent.reports')}
              </button>
              <button
                onClick={() => setActiveTab('advice')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'advice'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.parent.aiAdvice')}
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
              {/* Summary Tab */}
              {activeTab === 'summary' && selectedChild && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {getSelectedChild()?.name}'s Summary
                  </h2>
                  
                  {/* Grade overview */}
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Subject Performance</h3>
                    <div className="space-y-4">
                      {getSelectedChild()?.subjects.map((subject, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject.name}</span>
                            <div className="flex items-center">
                              <span className="text-sm text-primary mr-2">{subject.progress}%</span>
                              <span className={`text-sm font-semibold px-2 py-1 rounded ${
                                subject.grade.startsWith('A') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                subject.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {subject.grade}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent achievements */}
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {t('dashboard.parent.notifications')}
                    </h3>
                    {getSelectedChild()?.achievements.length ? (
                      <div className="space-y-4">
                        {getSelectedChild()?.achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-[#2a2a2a]"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {getSelectedChild()?.name} earned: {achievement.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No recent achievements to display.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && selectedChild && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Weekly Progress Report
                  </h2>
                  
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {getSelectedChild()?.name}'s Performance This Week
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Overall average score across all subjects
                      </p>
                    </div>
                    
                    {/* Simple chart visualization */}
                    <div className="h-64">
                      <div className="flex h-full items-end space-x-2">
                        {getWeeklyDataForChild().map((value, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-primary rounded-t-sm"
                              style={{ height: `${value}%` }}
                            ></div>
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              {weeklyData.labels[index]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="btn btn-outline">
                        Download Detailed Report
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Advice Tab */}
              {activeTab === 'advice' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    AI Recommendations for Parents
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {getFilteredAdvice().map((advice, index) => (
                      <motion.div
                        key={advice.id}
                        className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </span>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {advice.title}
                            </h3>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                              {advice.description}
                            </p>
                            <p className="mt-2 text-sm text-primary">
                              For: {children.find(c => c.id === advice.childId)?.name}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button 
                      className="btn btn-outline flex items-center"
                      onClick={() => document.querySelector('.fixed.bottom-6.right-6')?.dispatchEvent(new MouseEvent('click'))}
                    >
                      Ask AI for More Advice
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </button>
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

export default DashboardParent; 