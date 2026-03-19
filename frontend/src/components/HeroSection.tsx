import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// 1. It's best practice to import your images locally
// After downloading and placing the image in `src/assets`, you can import it like this:
// import campusHero from "@/assets/campus-hero.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0">
        <img
          // 2. Use the imported local image. For this example, I'm using a high-quality, optimized Unsplash URL.
          // Replace this with `campusHero` once you've saved the image locally.
          src="/images/hero_section_image.jpeg"
          alt="Newton School Campus"
          className="w-full h-full object-cover"
        />
        {/* Adds a dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex items-center justify-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-in delay-100">
            <span className="text-white font-medium">
              🎓 Welcome to NST Repository
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-200 drop-shadow-lg">
            Your Gateway to
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent block">
              Tech Knowledge
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300
              bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 text-white/90 border border-white/20 shadow-lg"
          >
            Discover comprehensive tech resources, documentation, and learning materials to enhance your technical knowledge.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-400">
            <Link
              to={"/campus"}
              className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-lg px-8 py-4 h-auto border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to={"https://youtu.be/VDwRPGdWv0g"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md text-blue-700 bg-white hover:bg-gray-100 text-lg px-8 py-4 h-auto transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Campus Tour
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-up delay-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">1500+</div>
              <div className="text-white/80">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">50+</div>
              <div className="text-white/80">Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">20+</div>
              <div className="text-white/80">Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">93%</div>
              <div className="text-white/80">Placement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
