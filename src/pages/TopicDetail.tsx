import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Типы данных для заданий
interface Exercise {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  explanation: string;
}

interface TopicContent {
  title: string;
  description: string;
  content: string;
  exercises: Exercise[];
}

// Демо-контент для тем уроков
const topicsContent: Record<string, Record<string, TopicContent>> = {
  "1": { // Алгебра
    "1": { // Квадратные уравнения
      title: "Квадратные уравнения",
      description: "Основы решения квадратных уравнений и использование формулы дискриминанта",
      content: `
## Что такое квадратное уравнение?

Квадратное уравнение - это уравнение вида **ax² + bx + c = 0**, где a, b и c - числа, причем a ≠ 0.

## Решение квадратных уравнений через дискриминант

Для решения квадратного уравнения используется формула дискриминанта:

**D = b² - 4ac**

После вычисления дискриминанта определяем количество корней:
- Если D > 0, уравнение имеет два различных корня: x₁ = (-b + √D) / 2a и x₂ = (-b - √D) / 2a
- Если D = 0, уравнение имеет один корень: x = -b / 2a
- Если D < 0, уравнение не имеет действительных корней

## Пример решения

Давайте решим уравнение: **2x² + 4x - 6 = 0**

1. Определяем коэффициенты: a = 2, b = 4, c = -6
2. Вычисляем дискриминант: D = 4² - 4 × 2 × (-6) = 16 + 48 = 64
3. Поскольку D > 0, уравнение имеет два корня:
   - x₁ = (-4 + √64) / (2 × 2) = (-4 + 8) / 4 = 1
   - x₂ = (-4 - √64) / (2 × 2) = (-4 - 8) / 4 = -3

Ответ: x₁ = 1, x₂ = -3
      `,
      exercises: [
        {
          id: 1,
          question: "Чему равен дискриминант уравнения 3x² - 5x + 2 = 0?",
          options: ["1", "9", "25", "49"],
          correctAnswer: "1",
          explanation: "D = b² - 4ac = (-5)² - 4 × 3 × 2 = 25 - 24 = 1"
        },
        {
          id: 2,
          question: "Сколько корней имеет уравнение x² + 6x + 9 = 0?",
          options: ["0", "1", "2", "3"],
          correctAnswer: "1",
          explanation: "D = 6² - 4 × 1 × 9 = 36 - 36 = 0, значит уравнение имеет один корень"
        },
        {
          id: 3,
          question: "Решите уравнение x² - 4 = 0",
          options: ["x = ±2", "x = ±4", "x = 2", "x = 4"],
          correctAnswer: "x = ±2",
          explanation: "x² - 4 = 0, x² = 4, x = ±√4 = ±2"
        }
      ]
    }
  },
  "4": { // Информатика
    "1": { // Основы алгоритмизации
      title: "Основы алгоритмизации и программирования",
      description: "Введение в алгоритмы, базовые структуры данных, основные понятия программирования",
      content: `
## Что такое алгоритм?

Алгоритм - это конечная последовательность действий, выполнение которых позволяет решить поставленную задачу. 
Свойства алгоритма:
- **Дискретность**: алгоритм должен представлять процесс решения задачи как последовательное выполнение простых шагов
- **Детерминированность**: каждое действие алгоритма должно быть однозначно определено
- **Конечность**: алгоритм должен завершаться за конечное число шагов
- **Результативность**: алгоритм должен приводить к решению задачи

## Основные типы алгоритмов

1. **Линейный алгоритм** - алгоритм, в котором действия выполняются последовательно одно за другим
2. **Разветвляющийся алгоритм** - алгоритм, в котором в зависимости от условия выполняется та или иная последовательность действий
3. **Циклический алгоритм** - алгоритм, в котором некоторые действия повторяются многократно

## Основные конструкции

- **Следование**: выполнение действий одно за другим
- **Ветвление**: выбор выполнения одного из вариантов действий в зависимости от условия
- **Цикл**: многократное повторение действий

## Пример алгоритма

Алгоритм приготовления бутерброда:
1. Взять хлеб
2. Нарезать хлеб на ломтики
3. Взять масло
4. Намазать масло на хлеб
5. Положить сверху сыр или колбасу
6. Бутерброд готов
      `,
      exercises: [
        {
          id: 1,
          question: "Какой алгоритм включает в себя многократное повторение действий?",
          options: ["Линейный", "Разветвляющийся", "Циклический", "Случайный"],
          correctAnswer: "Циклический",
          explanation: "Циклический алгоритм характеризуется многократным повторением одних и тех же действий"
        },
        {
          id: 2,
          question: "Какое из следующих не является свойством алгоритма?",
          options: ["Дискретность", "Детерминированность", "Бесконечность", "Результативность"],
          correctAnswer: "Бесконечность",
          explanation: "Алгоритм должен обладать свойством конечности, т.е. завершаться за конечное число шагов"
        },
        {
          id: 3,
          question: "Что характеризует разветвляющийся алгоритм?",
          options: [
            "Последовательное выполнение команд", 
            "Выбор действий в зависимости от условия", 
            "Многократное повторение действий", 
            "Случайный выбор действий"
          ],
          correctAnswer: "Выбор действий в зависимости от условия",
          explanation: "Разветвляющийся алгоритм выполняет разные последовательности действий в зависимости от выполнения условия"
        }
      ]
    }
  }
};

const TopicDetail = () => {
  const { subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Проверяем, существует ли контент для выбранной темы
  const topicContent = subjectId && topicId ? topicsContent[subjectId]?.[topicId] : undefined;
  
  // Если контент не найден, перенаправляем на страницу обучения
  useEffect(() => {
    if (!topicContent) {
      navigate('/learning');
    }
  }, [topicContent, navigate]);
  
  // Если контент не загружен, показываем загрузку
  if (!topicContent) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // Обработка выбора ответа
  const handleAnswerSelect = (exerciseId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  // Проверка результатов
  const checkAnswers = () => {
    let correctCount = 0;
    
    topicContent.exercises.forEach(exercise => {
      if (userAnswers[exercise.id] === exercise.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
    setProgress(100);
  };

  // Отображение контента темы
  const renderTopicContent = () => (
    <div className="prose dark:prose-invert max-w-none">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm p-8 mb-8">
        <h1>{topicContent.title}</h1>
        <p className="lead">{topicContent.description}</p>
        
        <div className="mt-6">
          {/* Используем простую обработку для markdown-подобного текста */}
          {topicContent.content.split('##').map((section, index) => {
            if (index === 0) return null;
            
            const [title, ...content] = section.split('\n');
            return (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold mb-3">{title.trim()}</h2>
                {content.map((paragraph, pIndex) => (
                  paragraph.trim() && (
                    <p key={pIndex} className="mb-3">
                      {paragraph.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                    </p>
                  )
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Отображение упражнений
  const renderExercises = () => (
    <div className="mt-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Проверь себя</h2>
      
      {topicContent.exercises.map((exercise, index) => (
        <motion.div
          key={exercise.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-3">
            Вопрос {index + 1}: {exercise.question}
          </h3>
          
          {exercise.options && (
            <div className="space-y-2 mt-4">
              {exercise.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`exercise-${exercise.id}-option-${option}`}
                    name={`exercise-${exercise.id}`}
                    value={option}
                    checked={userAnswers[exercise.id] === option}
                    onChange={() => handleAnswerSelect(exercise.id, option)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    disabled={showResults}
                  />
                  <label
                    htmlFor={`exercise-${exercise.id}-option-${option}`}
                    className={`ml-2 block text-sm font-medium ${
                      showResults 
                        ? option === exercise.correctAnswer 
                          ? 'text-green-700 dark:text-green-400' 
                          : userAnswers[exercise.id] === option 
                            ? 'text-red-700 dark:text-red-400'
                            : 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option}
                    {showResults && option === exercise.correctAnswer && (
                      <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                    )}
                    {showResults && option !== exercise.correctAnswer && userAnswers[exercise.id] === option && (
                      <span className="ml-2 text-red-600 dark:text-red-400">✕</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}
          
          {showResults && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">Объяснение:</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{exercise.explanation}</p>
            </div>
          )}
        </motion.div>
      ))}
      
      {!showResults ? (
        <button
          onClick={checkAnswers}
          disabled={topicContent.exercises.some(ex => !userAnswers[ex.id])}
          className={`mt-6 px-6 py-3 rounded-lg font-medium transition ${
            topicContent.exercises.some(ex => !userAnswers[ex.id])
              ? 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          Проверить ответы
        </button>
      ) : (
        <div className="mt-6">
          <div className={`p-4 rounded-lg ${
            score === topicContent.exercises.length
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
              : score >= topicContent.exercises.length / 2
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
          }`}>
            <h3 className="font-semibold text-lg mb-1">
              Ваш результат: {score} из {topicContent.exercises.length}
            </h3>
            <p>
              {score === topicContent.exercises.length
                ? 'Отлично! Вы правильно ответили на все вопросы!'
                : score >= topicContent.exercises.length / 2
                  ? 'Хороший результат! Повторите материал и попробуйте еще раз.'
                  : 'Рекомендуем внимательно изучить материал и попробовать снова.'}
            </p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Link 
              to="/learning" 
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Назад к урокам
            </Link>
            
            {score === topicContent.exercises.length && (
              <button 
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
                onClick={() => navigate('/learning')}
              >
                Следующая тема
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/learning" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Назад к урокам
            </Link>
          </div>
          
          {/* Прогресс бар */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Прогресс урока:</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {renderTopicContent()}
          {renderExercises()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TopicDetail; 