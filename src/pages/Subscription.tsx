import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Subscription = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscription = (plan: string) => {
    // В будущем здесь будет логика оплаты
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-center text-white">
        <p className="text-sm md:text-base">
          {t('subscription.banner')}
        </p>
      </div>

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Блок 1: Приветствие */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('subscription.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('subscription.subtitle')}
            </motion.p>
          </motion.section>

          {/* Блок 2: Преимущества */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              {t('subscription.whySubscribe')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Карточка 1 */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t('subscription.benefits.analysis.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('subscription.benefits.analysis.description')}
                </p>
              </motion.div>

              {/* Карточка 2 */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t('subscription.benefits.plan.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('subscription.benefits.plan.description')}
                </p>
              </motion.div>

              {/* Карточка 3 */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t('subscription.benefits.goals.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('subscription.benefits.goals.description')}
                </p>
              </motion.div>

              {/* Карточка 4 */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t('subscription.benefits.history.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('subscription.benefits.history.description')}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Блок 3: Тарифы подписок */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              {t('subscription.choosePlan')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Тариф 1: Старт */}
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 pt-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('subscription.plans.starter.name')}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                      {t('subscription.plans.starter.label')}
                    </span>
                  </div>
                  
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('subscription.plans.starter.price')}
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">{t('subscription.plans.starter.period')}</span>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {t('subscription.plans.starter.description')}
                  </p>
                </div>
                
                <div className="px-6 pb-6">
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.starter.features.gradesAnalysis')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.starter.features.knowledgeMap')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.starter.features.aiRecommendations')}</span>
                    </li>
                  </ul>
                  
                  <button 
                    onClick={() => handleSubscription(t('subscription.plans.starter.name'))}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    {t('subscription.select')}
                  </button>
                </div>
              </motion.div>
              
              {/* Тариф 2: Рост+ (рекомендуемый) */}
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm overflow-hidden transform scale-105 ring-2 ring-indigo-500 dark:ring-indigo-400"
              >
                <div className="bg-indigo-500 text-white text-center py-1.5 text-sm font-medium">
                  {t('subscription.plans.growth.recommended')}
                </div>
                <div className="px-6 pt-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('subscription.plans.growth.name')}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
                      {t('subscription.plans.growth.label')}
                    </span>
                  </div>
                  
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('subscription.plans.growth.price')}
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">{t('subscription.plans.growth.period')}</span>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {t('subscription.plans.growth.description')}
                  </p>
                </div>
                
                <div className="px-6 pb-6">
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.growth.features.starterFeatures')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.growth.features.weeklyPlans')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.growth.features.miniLessons')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.growth.features.goalTracking')}</span>
                    </li>
                  </ul>
                  
                  <button 
                    onClick={() => handleSubscription(t('subscription.plans.growth.name'))}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    {t('subscription.select')}
                  </button>
                </div>
              </motion.div>
              
              {/* Тариф 3: PRO-Развитие */}
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 pt-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('subscription.plans.pro.name')}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full">
                      {t('subscription.plans.pro.label')}
                    </span>
                  </div>
                  
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('subscription.plans.pro.price')}
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">{t('subscription.plans.pro.period')}</span>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {t('subscription.plans.pro.description')}
                  </p>
                </div>
                
                <div className="px-6 pb-6">
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.pro.features.growthFeatures')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.pro.features.softSkills')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.pro.features.challenges')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t('subscription.plans.pro.features.support')}</span>
                    </li>
                  </ul>
                  
                  <button 
                    onClick={() => handleSubscription(t('subscription.plans.pro.name'))}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    {t('subscription.select')}
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Сравнительная таблица */}
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm p-6 overflow-x-auto">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                {t('subscription.comparison')}
              </h3>
              
              <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('subscription.feature')}</th>
                    <th className="py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('subscription.plans.starter.name')}</th>
                    <th className="py-3 text-center text-xs font-medium text-indigo-500 uppercase tracking-wider">{t('subscription.plans.growth.name')}</th>
                    <th className="py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('subscription.plans.pro.name')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.starter.features.gradesAnalysis')}</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.starter.features.aiRecommendations')}</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.growth.features.weeklyPlans')}</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.growth.features.miniLessons')}</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.growth.features.goalTracking')}</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.pro.features.softSkills')}</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.pro.features.challenges')}</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{t('subscription.plans.pro.features.support')}</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-gray-300 dark:text-gray-600">—</td>
                    <td className="py-3 text-center text-green-500">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Дополнительный блок: Почему именно мы */}
          <section className="text-center mb-8 max-w-3xl mx-auto border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {t('subscription.whyUs')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('subscription.statistics.description')}
            </p>
            
            <div className="flex justify-center mt-6 space-x-6 md:space-x-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-500">10 000+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('subscription.statistics.activeStudents')}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-500">93%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('subscription.statistics.improvedGrades')}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-500">2+ часа</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('subscription.statistics.timeSaved')}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Модальное окно (заглушка для оплаты) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              {t('subscription.checkout.title')} "{selectedPlan}"
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('subscription.checkout.info')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('subscription.checkout.terms')}
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {t('subscription.checkout.close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Subscription; 