import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line, ReferenceLine
} from 'recharts';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebase';

// Типы данных
interface Subject {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  masteredTopics: number;
  totalErrors: number;
}

interface Topic {
  id: string;
  subjectId: string;
  name: string;
  progress: number;
  recommendation: string;
}

interface ErrorType {
  category: string;
  count: number;
}

interface ProgressHistory {
  month: string;
  progress: number;
  average: number;
}

const Analytics = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([]);
  const [progressHistory, setProgressHistory] = useState<ProgressHistory[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Цвета для графиков
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6B8B'];
  
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Получаем информацию о пользователе
        const userRef = doc(firestore, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          console.error('Пользователь не найден');
          setLoading(false);
          return;
        }
        
        // Загружаем предметы
        const subjectsRef = collection(firestore, 'subjects');
        const subjectsQuery = query(
          subjectsRef, 
          where('userId', '==', currentUser.uid)
        );
        
        const subjectsSnapshot = await getDocs(subjectsQuery);
        const subjectsData: Subject[] = [];
        
        subjectsSnapshot.forEach((doc) => {
          const data = doc.data();
          subjectsData.push({
            id: doc.id,
            name: data.name,
            progress: data.progress || 0,
            totalTopics: data.totalTopics || 0,
            masteredTopics: data.masteredTopics || 0,
            totalErrors: data.totalErrors || 0
          });
        });
        
        setSubjects(subjectsData);
        
        if (subjectsData.length > 0) {
          setSelectedSubject(subjectsData[0].id);
          
          // Загружаем темы
          const topicsRef = collection(firestore, 'topics');
          const topicsQuery = query(
            topicsRef, 
            where('userId', '==', currentUser.uid)
          );
          
          const topicsSnapshot = await getDocs(topicsQuery);
          const topicsData: Topic[] = [];
          
          topicsSnapshot.forEach((doc) => {
            const data = doc.data();
            topicsData.push({
              id: doc.id,
              subjectId: data.subjectId,
              name: data.name,
              progress: data.progress || 0,
              recommendation: data.recommendation || 'Нет рекомендаций'
            });
          });
          
          setTopics(topicsData);
          
          // Загружаем типы ошибок
          const errorsRef = collection(firestore, 'errorStats');
          const errorsQuery = query(
            errorsRef, 
            where('userId', '==', currentUser.uid)
          );
          
          const errorsSnapshot = await getDocs(errorsQuery);
          const errorsData: ErrorType[] = [];
          
          errorsSnapshot.forEach((doc) => {
            const data = doc.data();
            errorsData.push({
              category: data.category,
              count: data.count || 0
            });
          });
          
          setErrorTypes(errorsData);
          
          // Загружаем историю прогресса
          const historyRef = collection(firestore, 'progressHistory');
          const historyQuery = query(
            historyRef, 
            where('userId', '==', currentUser.uid)
          );
          
          const historySnapshot = await getDocs(historyQuery);
          const historyData: ProgressHistory[] = [];
          
          historySnapshot.forEach((doc) => {
            const data = doc.data();
            historyData.push({
              month: data.month,
              progress: data.progress || 0,
              average: data.average || 0
            });
          });
          
          // Сортируем историю по месяцам
          historyData.sort((a, b) => {
            const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            return months.indexOf(a.month) - months.indexOf(b.month);
          });
          
          setProgressHistory(historyData);
        }
        
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);
  
  // Фильтрация тем по выбранному предмету
  const filteredTopics = topics.filter(
    topic => selectedSubject ? topic.subjectId === selectedSubject : true
  );
  
  // Сортировка тем по прогрессу (сначала слабые темы)
  const sortedTopics = [...filteredTopics].sort((a, b) => a.progress - b.progress);
  
  // Обработчик для выбора предмета
  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };
  
  // Компонент для пользовательского тултипа
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Прогресс: {data.progress}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Освоено тем: {data.masteredTopics} из {data.totalTopics}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Всего ошибок: {data.totalErrors}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Если пользователь не авторизован, показываем сообщение
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Требуется авторизация
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Для доступа к аналитике успеваемости необходимо войти в систему.
            </p>
            <a 
              href="/auth/login" 
              className="btn btn-primary inline-block"
            >
              Войти в систему
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Проверяем наличие данных
  const hasNoData = subjects.length === 0;
  
  if (hasNoData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Данные отсутствуют
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              У вас пока нет данных для аналитики. Начните обучение, чтобы увидеть статистику.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Аналитика успеваемости
        </h1>
        
        {/* Секция с круговыми диаграммами предметов */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Общий прогресс по предметам
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className={`bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 ${
                  selectedSubject === subject.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 text-center">
                  {subject.name}
                </h3>
                
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Пройдено', value: subject.progress },
                          { name: 'Осталось', value: 100 - subject.progress }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={1}
                        dataKey="value"
                      >
                        <Cell key={`cell-0`} fill={COLORS[0]} />
                        <Cell key={`cell-1`} fill="#E0E0E0" />
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="text-center mt-2">
                  <p className="text-2xl font-bold text-primary dark:text-accent">
                    {subject.progress}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Освоено тем: {subject.masteredTopics} из {subject.totalTopics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Таблица тем внутри предметов */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Темы и рекомендации
            {selectedSubject && (
              <span className="ml-2 text-gray-500 dark:text-gray-400 font-normal">
                ({subjects.find(s => s.id === selectedSubject)?.name})
              </span>
            )}
          </h2>
          
          <div className="overflow-x-auto bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-[#2a2a2a]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Тема
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Прогресс
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    AI-рекомендация
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#1e1e1e] divide-y divide-gray-200 dark:divide-gray-700">
                {sortedTopics.length > 0 ? (
                  sortedTopics.map((topic) => (
                    <tr key={topic.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {topic.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              topic.progress < 30 ? 'bg-red-500' : 
                              topic.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${topic.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                          {topic.progress}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {topic.recommendation}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      Темы не найдены для выбранного предмета
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        
        {/* График ошибок */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Типы ошибок
          </h2>
          
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={errorTypes}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Количество ошибок" 
                    fill="#FF6B8B" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
        
        {/* График роста */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Динамика успеваемости
          </h2>
          
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressHistory}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={75} stroke="#A28CFF" strokeDasharray="3 3" />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    name="Ваш прогресс"
                    stroke="#0088FE"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    name="Средний прогресс"
                    stroke="#00C49F"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics; 