import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatBot from '../components/AIChatBot';

// Mock data for the school dashboard
const mockClasses = [
  {
    id: 1,
    name: 'Class 9A',
    students: 25,
    avgPerformance: 78,
    subjects: [
      { name: 'Mathematics', avgScore: 75 },
      { name: 'Science', avgScore: 82 },
      { name: 'Literature', avgScore: 76 },
      { name: 'History', avgScore: 72 },
    ],
    topStudents: [
      { id: 1, name: 'Aidan K.', score: 95 },
      { id: 2, name: 'Dilnaz T.', score: 92 },
      { id: 3, name: 'Arman S.', score: 89 },
    ],
    needHelp: [
      { id: 4, name: 'Timur A.', score: 58 },
      { id: 5, name: 'Kamila R.', score: 62 },
    ],
  },
  {
    id: 2,
    name: 'Class 10B',
    students: 22,
    avgPerformance: 82,
    subjects: [
      { name: 'Mathematics', avgScore: 80 },
      { name: 'Science', avgScore: 85 },
      { name: 'Literature', avgScore: 79 },
      { name: 'History', avgScore: 84 },
    ],
    topStudents: [
      { id: 6, name: 'Sophia L.', score: 97 },
      { id: 7, name: 'Murat Z.', score: 94 },
      { id: 8, name: 'Diana K.', score: 91 },
    ],
    needHelp: [
      { id: 9, name: 'Amir B.', score: 65 },
    ],
  },
];

const mockReports = [
  { id: 1, name: 'Weekly Performance Summary', type: 'excel', lastGenerated: '2023-10-18' },
  { id: 2, name: 'Quarterly Academic Progress', type: 'pdf', lastGenerated: '2023-10-01' },
  { id: 3, name: 'Student Engagement Analysis', type: 'excel', lastGenerated: '2023-09-15' },
  { id: 4, name: 'Subject Benchmark Report', type: 'pdf', lastGenerated: '2023-09-05' },
];

const DashboardSchool = () => {
  const { t } = useTranslation();
  const { currentUser, userDisplayName } = useAuth();
  const [activeTab, setActiveTab] = useState('classes');
  const [selectedClass, setSelectedClass] = useState<number | null>(mockClasses[0].id);
  
  // This would be replaced with a hook that fetches real data
  const [classes, setClasses] = useState(mockClasses);
  const [reports, setReports] = useState(mockReports);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call to get school data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getSelectedClass = () => {
    return classes.find(cls => cls.id === selectedClass) || null;
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'excel':
        return (
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'pdf':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  // Filter classes or users based on search term
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome message */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              School Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your classes, students, and generate reports
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                placeholder="Search for classes or students..."
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('classes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'classes'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.school.classes')}
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'performance'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.school.performance')}
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.school.reports')}
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {t('dashboard.school.userManagement')}
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
              {/* Classes Tab */}
              {activeTab === 'classes' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Class Overview
                    </h2>
                    <button className="btn btn-primary text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Class
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClasses.map((cls) => (
                      <motion.div
                        key={cls.id}
                        className={`bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6 cursor-pointer transition-colors duration-200 ${
                          selectedClass === cls.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedClass(cls.id)}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{cls.name}</h3>
                        <div className="mt-2 flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{cls.students} Students</span>
                          <span className="font-medium text-primary">{cls.avgPerformance}% Avg</span>
                        </div>
                        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${cls.avgPerformance}%` }}
                          ></div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <button className="text-sm text-primary hover:text-accent">
                            View Details
                          </button>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            cls.avgPerformance >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            cls.avgPerformance >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            cls.avgPerformance >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {cls.avgPerformance >= 80 ? 'Excellent' :
                             cls.avgPerformance >= 70 ? 'Good' :
                             cls.avgPerformance >= 60 ? 'Average' : 'Needs Improvement'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Tab */}
              {activeTab === 'performance' && selectedClass && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {getSelectedClass()?.name} Performance
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Subject Performance */}
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Subject Performance</h3>
                      <div className="space-y-4">
                        {getSelectedClass()?.subjects.map((subject, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject.name}</span>
                              <span className="text-sm text-primary">{subject.avgScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${subject.avgScore}%` }}
                              ></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Top Students & Students Needing Help */}
                    <div className="space-y-6">
                      {/* Top Students */}
                      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Students</h3>
                        <div className="space-y-3">
                          {getSelectedClass()?.topStudents.map((student, index) => (
                            <motion.div
                              key={student.id}
                              className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] rounded-lg"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-800 dark:text-green-200 font-bold">
                                  {index + 1}
                                </div>
                                <span className="ml-3 text-gray-900 dark:text-white">{student.name}</span>
                              </div>
                              <span className="font-medium text-primary">{student.score}%</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Students Needing Help */}
                      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Students Needing Support</h3>
                        {getSelectedClass()?.needHelp.length ? (
                          <div className="space-y-3">
                            {getSelectedClass()?.needHelp.map((student, index) => (
                              <motion.div
                                key={student.id}
                                className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] rounded-lg"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-800 dark:text-red-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                  </div>
                                  <span className="ml-3 text-gray-900 dark:text-white">{student.name}</span>
                                </div>
                                <span className="font-medium text-red-600 dark:text-red-400">{student.score}%</span>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">All students are performing well!</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Reports & Analytics
                    </h2>
                    <button className="btn btn-primary text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Generate New Report
                    </button>
                  </div>
                  
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Available Reports</h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {reports.map((report, index) => (
                        <motion.div
                          key={report.id}
                          className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              {getReportIcon(report.type)}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{report.name}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button className="text-primary hover:text-accent">
                            Download
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* User Management Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      User Management
                    </h2>
                    <div className="flex space-x-2">
                      <button className="btn btn-outline text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Import Users
                      </button>
                      <button className="btn btn-primary text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add User
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="flex space-x-4">
                        <button 
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-white"
                        >
                          All Users
                        </button>
                        <button 
                          className="px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                        >
                          Students
                        </button>
                        <button 
                          className="px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                        >
                          Teachers
                        </button>
                        <button 
                          className="px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                        >
                          Parents
                        </button>
                      </div>
                      <div>
                        <select className="text-sm border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300">
                          <option>Sort by: Name (A-Z)</option>
                          <option>Sort by: Name (Z-A)</option>
                          <option>Sort by: Role</option>
                          <option>Sort by: Date Added</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">User list is coming soon</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          This feature is under development. Please check back later.
                        </p>
                        <div className="mt-6">
                          <button className="btn btn-primary text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Sample Users
                          </button>
                        </div>
                      </div>
                    </div>
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

export default DashboardSchool; 