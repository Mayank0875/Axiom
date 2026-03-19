import Navigation from '@/components/Navigation';
import Dummy from '@/components/Dummy'
import HeroSection from '@/components/HeroSection';
import ClubsSection from '@/components/ClubsSection';
import AcademicsSection from '@/components/AcademicsSection';
import CampusLifeSection from '@/components/CampusLifeSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}
      <Dummy />
      <HeroSection />
      <ClubsSection />
      <AcademicsSection />
      <CampusLifeSection />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;
