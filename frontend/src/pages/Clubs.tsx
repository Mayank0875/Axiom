import Navigation from "@/components/Navigation";
import Dummy from "@/components/Dummy";
import ClubsSection from "@/components/ClubsSection";
import Footer from "@/components/Footer";


const Clubs = () => {
  return (
    // Set a light background from our theme
    <div className="min-h-screen bg-white/95">
      <Dummy />

      {/* The ClubsSection component itself should also use the light theme */}
      <div className="pt-24 relative z-10">
        <ClubsSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Clubs;