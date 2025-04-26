import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import GrowthStoriesSlider from '../components/GrowthStoriesSlider';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import AIChatBot from '../components/AIChatBot';

const Home = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  // Перенаправляем авторизованных пользователей на соответствующую панель управления
  useEffect(() => {
    if (currentUser && userRole) {
      if (userRole === 'student') {
        navigate('/dashboard/student');
      } else if (userRole === 'parent') {
        navigate('/dashboard/parent');
      } else if (userRole === 'school') {
        navigate('/dashboard/school');
      }
    }
  }, [currentUser, userRole, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <GrowthStoriesSlider />
        <FeaturesSection />
        <CallToAction />
      </main>
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default Home; 