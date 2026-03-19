import Navigation from '@/components/Navigation';
import Dummy from '@/components/Dummy'
import AcademicsSection from '@/components/AcademicsSection';
import Footer from '@/components/Footer';


const Academics = () => {
  return (
    <div className="min-h-screen">
      
      {/* <Navigation /> */}
      <Dummy />
      <div className="pt-20">
        <AcademicsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Academics;