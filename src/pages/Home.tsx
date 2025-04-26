import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import GrowthStoriesSlider from '../components/GrowthStoriesSlider';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import AIChatBot from '../components/AIChatBot';

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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