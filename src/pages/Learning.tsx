import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Типы данных для тем и предметов
interface Topic {
  id: number;
  title: string;
  isOpen: boolean;
  isCompleted: boolean;
  description: string;
}

interface Subject {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  topics: Topic[];
}

// Данные для предметов и тем
const subjects: Subject[] = [
  {
    id: 1,
    name: 'Алгебра',
    icon: '➗',
    description: 'Совершенствуй свои математические навыки',
    color: 'from-blue-500 to-indigo-600',
    topics: [
      {
        id: 1,
        title: 'Квадратные уравнения',
        isOpen: true,
        isCompleted: false,
        description: 'Основы решения квадратных уравнений и использование формулы дискриминанта'
      },
      {
        id: 2,
        title: 'Функции и их графики',
        isOpen: false,
        isCompleted: false,
        description: 'Изучение функций, их типов и построение графиков'
      },
      {
        id: 3,
        title: 'Прогрессии (арифметическая и геометрическая)',
        isOpen: false,
        isCompleted: false,
        description: 'Изучение основных понятий прогрессий, формулы для нахождения элементов прогрессии'
      }
    ]
  },
  {
    id: 2,
    name: 'Геометрия',
    icon: '📐',
    description: 'Изучай пространственные фигуры и их свойства',
    color: 'from-green-500 to-emerald-600',
    topics: [
      {
        id: 1,
        title: 'Базовые фигуры и их свойства',
        isOpen: true,
        isCompleted: false,
        description: 'Изучение основных геометрических фигур'
      },
      {
        id: 2,
        title: 'Площади и объемы фигур',
        isOpen: false,
        isCompleted: false,
        description: 'Формулы площадей и объемов различных фигур'
      },
      {
        id: 3,
        title: 'Векторы в пространстве',
        isOpen: false,
        isCompleted: false,
        description: 'Операции с векторами в пространстве'
      }
    ]
  },
  {
    id: 3,
    name: 'Биология',
    icon: '🌿',
    description: 'Узнай больше о живых организмах',
    color: 'from-yellow-500 to-amber-600',
    topics: [
      {
        id: 1,
        title: 'Основы клеточной теории и строение клетки',
        isOpen: true,
        isCompleted: false,
        description: 'Изучение клеточной теории, органоидов клетки и их функций'
      },
      {
        id: 2,
        title: 'Генетика. Законы Менделя',
        isOpen: false,
        isCompleted: false,
        description: 'Изучение основ генетики и законов наследования, разработанных Грегором Менделем'
      },
      {
        id: 3,
        title: 'Эволюция и происхождение жизни',
        isOpen: false,
        isCompleted: false,
        description: 'Изучение теорий происхождения жизни на Земле и механизмов эволюции'
      }
    ]
  },
  {
    id: 4,
    name: 'Информатика',
    icon: '💻',
    description: 'Изучи основы программирования и компьютерной грамотности',
    color: 'from-red-500 to-rose-600',
    topics: [
      {
        id: 1,
        title: 'Основы алгоритмизации и программирования',
        isOpen: true,
        isCompleted: false,
        description: 'Введение в алгоритмы, базовые структуры данных, основные понятия программирования'
      },
      {
        id: 2,
        title: 'Языки программирования. Python',
        isOpen: false,
        isCompleted: false,
        description: 'Основы работы с языком Python — самым популярным языком для старта'
      },
      {
        id: 3,
        title: 'Компьютерные сети и интернет',
        isOpen: false,
        isCompleted: false,
        description: 'Базовые знания о том, как устроены сети и как работает Интернет'
      }
    ]
  }
];

const Learning = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const navigate = useNavigate();

  // Функция для подсчёта прогресса предмета
  const calculateProgress = (topics: Topic[]): number => {
    if (topics.length === 0) return 0;
    const completedTopics = topics.filter(topic => topic.isCompleted).length;
    return Math.round((completedTopics / topics.length) * 100);
  };

  // Функция для отображения страницы с предметами
  const renderSubjectsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {subjects.map((subject) => (
        <motion.div
          key={subject.id}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm overflow-hidden cursor-pointer"
          onClick={() => setSelectedSubject(subject)}
        >
          <div className={`h-2 bg-gradient-to-r ${subject.color}`}></div>
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-4xl mr-4">{subject.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{subject.description}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Прогресс:</span>
                <span className="font-medium">{calculateProgress(subject.topics)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full bg-gradient-to-r ${subject.color}`}
                  style={{ width: `${calculateProgress(subject.topics)}%` }}
                ></div>
              </div>
            </div>
            
            <button 
              className="mt-4 w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Хочу улучшить знания!
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Функция для отображения страницы с темами выбранного предмета
  const renderTopicsList = () => {
    if (!selectedSubject) return null;

    return (
      <>
        <div className="mb-6">
          <button
            onClick={() => setSelectedSubject(null)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад к предметам
          </button>
        </div>

        <div className={`bg-gradient-to-r ${selectedSubject.color} text-white rounded-2xl p-8 mb-6`}>
          <div className="flex items-center">
            <span className="text-5xl mr-4">{selectedSubject.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
              <p className="text-white/80">{selectedSubject.description}</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">Темы для изучения</h3>
        
        <div className="space-y-4">
          {selectedSubject.topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-white dark:bg-[#1e1e1e] rounded-xl p-5 border-l-4 ${
                topic.isCompleted 
                  ? 'border-green-500' 
                  : topic.isOpen 
                    ? `border-${selectedSubject.color.split(' ')[1]}` 
                    : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-lg">
                  {index + 1}. {topic.title}
                </h4>
                {topic.isCompleted ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-400">
                    Завершено ✓
                  </span>
                ) : topic.isOpen ? (
                  <button 
                    className={`px-3 py-1 bg-gradient-to-r ${selectedSubject.color} text-white text-sm rounded-full`}
                    onClick={() => navigate(`/learning/${selectedSubject.id}/topic/${topic.id}`)}
                  >
                    Начать
                  </button>
                ) : (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    🔒 Недоступно
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Обучение
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Изучайте новые темы, решайте задачи и развивайте свои навыки
            </p>
          </div>

          {selectedSubject ? renderTopicsList() : renderSubjectsGrid()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Learning; 