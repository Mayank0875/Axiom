import Navigation from '@/components/Navigation';
import Dummy from '@/components/Dummy';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}
      <Dummy />
      <HeroSection />
      
      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up delay-100 relative">
            <div className="absolute inset-0 -z-10 mx-auto w-3/4 h-full bg-blue-50/50 blur-3xl rounded-full"></div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              Explore NST Repository
            </h2>
            <p className="text-gray-800 text-lg max-w-2xl mx-auto font-medium">
              Access all the resources and documentation you need to excel in your tech journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up delay-200 relative z-10">
            {[
              { title: 'Clubs & Societies', href: '/clubs', description: 'Join amazing communities' },
              { title: 'Academics', href: '/academics', description: 'Courses & faculty' },
              { title: 'Campus Life', href: '/campus', description: 'Accommodation & facilities' },
              { title: 'Events', href: '/fests', description: 'TechFest & cultural events' },
              { title: 'Mentors', href: '/mentors', description: 'Student guidance' },
              { title: 'Startups', href: '/startups', description: 'Newton Startup Fund' }
            ].map((item, idx) => (
              <Link
                key={item.title}
                to={item.href}
                className={`group p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-200 hover:border-blue-500 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 hover:scale-[1.03] animate-fade-in-up relative overflow-hidden`}
                style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="font-semibold text-blue-950 mb-2 group-hover:text-blue-700 transition-colors relative z-10">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm relative z-10">{item.description}</p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;