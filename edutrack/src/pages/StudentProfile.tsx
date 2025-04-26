import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

// Типы данных
interface UserProfile {
  displayName: string;
  photoURL: string;
  email: string;
  school: string;
  grade: string;
  age: number;
}

interface SubjectProgress {
  id: number;
  name: string;
  progress: number;
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: string;
}

interface Error {
  id: number;
  subject: string;
  topic: string;
  description: string;
  date: string;
}

interface Goal {
  id: number;
  subject: string;
  targetProgress: number;
  currentProgress: number;
  deadline: string;
}

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Заглушка данных (в реальном приложении данные будут загружаться из Firebase)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // В реальном приложении здесь были бы запросы к Firestore
        
        // Демо-данные для профиля
        setProfile({
          displayName: 'Темирлан Аскаров',
          photoURL: 'https://i.pravatar.cc/300',
          email: 'temirlan@example.com',
          school: 'Школа №25',
          grade: '10 класс',
          age: 16
        });

        // Демо-данные для прогресса по предметам
        setSubjects([
          { id: 1, name: 'Математика', progress: 75, color: 'from-blue-500 to-indigo-600' },
          { id: 2, name: 'История', progress: 68, color: 'from-green-500 to-emerald-600' },
          { id: 3, name: 'Физика', progress: 81, color: 'from-red-500 to-rose-600' },
          { id: 4, name: 'Биология', progress: 62, color: 'from-purple-500 to-violet-600' },
          { id: 5, name: 'Литература', progress: 90, color: 'from-yellow-500 to-amber-600' },
        ]);

        // Демо-данные для достижений
        setAchievements([
          { id: 1, title: 'Эксперт в геометрии', description: 'Достиг 90% знаний в теме', icon: '🏆', date: '2023-11-15' },
          { id: 2, title: 'Сократил ошибки', description: 'Меньше 5 ошибок в месяц', icon: '🥇', date: '2023-12-05' },
          { id: 3, title: 'Прогресс-марафонец', description: '30 дней подряд с занятиями', icon: '🔥', date: '2024-01-10' },
          { id: 4, title: 'Мастер уравнений', description: 'Решил 100 уравнений без ошибок', icon: '⚡', date: '2024-02-20' }
        ]);

        // Демо-данные для ошибок
        setErrors([
          { id: 1, subject: 'Математика', topic: 'Интегралы', description: 'Ошибка в вычислении определенного интеграла', date: '2024-03-15' },
          { id: 2, subject: 'Физика', topic: 'Электричество', description: 'Неправильное применение закона Ома', date: '2024-03-10' }
        ]);

        // Демо-данные для целей
        setGoals([
          { id: 1, subject: 'Алгебра', targetProgress: 90, currentProgress: 75, deadline: '2024-05-01' },
          { id: 2, subject: 'Биология', targetProgress: 80, currentProgress: 62, deadline: '2024-06-15' }
        ]);

      } catch (error) {
        console.error('Ошибка при загрузке данных профиля:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Обработчик загрузки фото профиля
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile || !currentUser) return;

    setUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `profilePhotos/${currentUser.uid}`);
      await uploadBytes(storageRef, photoFile);
      const photoURL = await getDownloadURL(storageRef);
      
      // В реальном приложении здесь был бы код для обновления профиля пользователя
      setProfile(prev => prev ? {...prev, photoURL} : null);
      
      setPhotoFile(null);
    } catch (error) {
      console.error('Ошибка при загрузке фото:', error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Данные для графика роста знаний
  const growthData = {
    labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь'],
    datasets: [
      {
        label: 'Рост знаний (%)',
        data: [50, 59, 65, 70, 73, 78],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        tension: 0.4
      },
    ],
  };
  
  // Опции для графика
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'История роста знаний',
      },
    },
  };

  // Рендеринг вкладки "Обзор"
  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Hero-секция с приветствием и текущей целью */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl p-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold mb-2">
          Привет, {profile?.displayName?.split(' ')[0] || 'Ученик'}! 🚀 Готов покорять новые вершины?
        </h2>
        <p className="text-lg">
          Текущая цель: Освоить Алгебру на {goals[0]?.targetProgress || 90}% 
          🎯 (текущий прогресс: {goals[0]?.currentProgress || 75}%)
        </p>
      </motion.div>

      {/* Карточка с общим прогрессом */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Общий прогресс</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <Doughnut 
                data={{
                  labels: ['Изучено', 'Осталось'],
                  datasets: [{
                    data: [75, 25],
                    backgroundColor: [
                      'rgba(75, 192, 192, 0.8)',
                      'rgba(200, 200, 200, 0.5)',
                    ]
                  }]
                }} 
              />
            </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#252525] rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
              >
                <h4 className="font-medium mb-2">{subject.name}</h4>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${subject.color}`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                <p className="text-right mt-1 text-sm font-medium">{subject.progress}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* История роста (график) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6"
      >
        <h3 className="text-xl font-semibold mb-4">История роста</h3>
        <div className="h-80">
          <Line options={options} data={growthData} />
        </div>
      </motion.div>

      {/* Последние ошибки и рекомендации */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Слабые зоны и рекомендации</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Слабые зоны */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4">
            <h4 className="font-semibold flex items-center text-red-600 dark:text-red-400 mb-3">
              <span className="mr-2">🔴</span> Слабые зоны
            </h4>
            
            {errors.length > 0 ? (
              <ul className="space-y-2">
                {errors.map(error => (
                  <li key={error.id} className="bg-white dark:bg-[#252525] rounded-xl p-3 shadow-sm">
                    <p className="font-medium">{error.subject}: {error.topic}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{error.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{error.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет активных слабых зон. Отличная работа!</p>
            )}
          </div>
          
          {/* AI-Советы */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
            <h4 className="font-semibold flex items-center text-blue-600 dark:text-blue-400 mb-3">
              <span className="mr-2">💡</span> AI-Советы
            </h4>
            
            <div className="bg-white dark:bg-[#252525] rounded-xl p-4 shadow-sm">
              <p className="font-medium">Работа над интегралами</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Решай по 3 задачи в день по интегралам — это повысит твой прогресс на +10% за неделю.
              </p>
              <button className="mt-2 text-sm text-primary font-medium">Начать сейчас →</button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Достижения */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Мои достижения</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements.map(achievement => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/10 rounded-2xl p-4 text-center shadow-sm"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-medium text-amber-800 dark:text-amber-400">{achievement.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
              <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Рендеринг вкладки "Личные данные"
  const renderPersonalTab = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Личные данные</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Фото и загрузка */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 mb-4">
            {profile?.photoURL ? (
              <img 
                src={profile.photoURL} 
                alt="Фото профиля" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
            )}
          </div>
          
          <div className="mt-2">
            <label className="btn btn-sm btn-outline">
              Выбрать фото
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handlePhotoChange}
              />
            </label>
            
            {photoFile && (
              <button 
                className="btn btn-sm btn-primary ml-2"
                onClick={uploadPhoto}
                disabled={uploadingPhoto}
              >
                {uploadingPhoto ? 'Загрузка...' : 'Загрузить'}
              </button>
            )}
          </div>
        </div>
        
        {/* Форма с данными */}
        <div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Полное имя
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                defaultValue={profile?.displayName}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                defaultValue={profile?.email}
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Школа
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                defaultValue={profile?.school}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Класс
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                defaultValue={profile?.grade}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Возраст
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                defaultValue={profile?.age}
              />
            </div>
            
            <div className="pt-2">
              <button type="button" className="btn btn-primary">
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );

  // Рендеринг вкладки "Цели"
  const renderGoalsTab = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Мои цели</h3>
          <button className="btn btn-primary btn-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить цель
          </button>
        </div>
        
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map(goal => (
              <div 
                key={goal.id}
                className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/30 dark:to-[#252525] rounded-2xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-lg">{goal.subject}</h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Дедлайн: {goal.deadline}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Прогресс: {goal.currentProgress}%</span>
                    <span>Цель: {goal.targetProgress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      style={{ width: `${(goal.currentProgress / goal.targetProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    (goal.currentProgress / goal.targetProgress) >= 0.9 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {(goal.currentProgress / goal.targetProgress) >= 0.9 
                      ? 'Почти достигнута' 
                      : 'В процессе'}
                  </span>
                  
                  <div>
                    <button className="btn btn-ghost btn-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="btn btn-ghost btn-sm text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">У вас пока нет целей обучения</p>
            <button className="btn btn-primary">Создать первую цель</button>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Рендеринг вкладки "Настройки"
  const renderSettingsTab = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Настройки профиля</h3>
      
      <div className="space-y-6">
        {/* Смена пароля */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h4 className="font-medium text-lg mb-4">Изменить пароль</h4>
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Текущий пароль
              </label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Новый пароль
              </label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Подтвердите новый пароль
              </label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <button type="button" className="btn btn-primary">
                Изменить пароль
              </button>
            </div>
          </form>
        </div>
        
        {/* Настройки языка */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h4 className="font-medium text-lg mb-4">Язык</h4>
          <div className="max-w-xs">
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50">
              <option value="ru">Русский</option>
              <option value="kk">Қазақша</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        
        {/* Настройки уведомлений */}
        <div>
          <h4 className="font-medium text-lg mb-4">Уведомления</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="email_notif" 
                className="rounded text-primary focus:ring-primary/50 h-5 w-5"
                defaultChecked
              />
              <label htmlFor="email_notif" className="ml-2 text-gray-700 dark:text-gray-300">
                Получать уведомления на email
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="progress_notif" 
                className="rounded text-primary focus:ring-primary/50 h-5 w-5"
                defaultChecked
              />
              <label htmlFor="progress_notif" className="ml-2 text-gray-700 dark:text-gray-300">
                Уведомления о прогрессе
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="achievement_notif" 
                className="rounded text-primary focus:ring-primary/50 h-5 w-5"
                defaultChecked
              />
              <label htmlFor="achievement_notif" className="ml-2 text-gray-700 dark:text-gray-300">
                Уведомления о достижениях
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="recommendation_notif" 
                className="rounded text-primary focus:ring-primary/50 h-5 w-5"
                defaultChecked
              />
              <label htmlFor="recommendation_notif" className="ml-2 text-gray-700 dark:text-gray-300">
                Рекомендации от AI
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Профиль
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Ваши личные данные, достижения и настройки
            </p>
          </div>

          {/* Вкладки профиля */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Обзор
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'personal'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Личные данные
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'goals'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Цели
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Настройки
              </button>
            </nav>
          </div>

          {/* Контент активной вкладки */}
          <div className="mt-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'personal' && renderPersonalTab()}
            {activeTab === 'goals' && renderGoalsTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentProfile; 