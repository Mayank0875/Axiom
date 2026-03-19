import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Trophy, Lightbulb, Users, ArrowRight, Plane, MapPin, Globe, Zap, Music, Camera, Gamepad2 } from 'lucide-react';
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Neutron 2025",
      subtitle: "India's First Techno-Cultural Fest",
      date: "April 12-13, 2024",
      description: "A student-led fest blending cutting-edge technology with vibrant cultural performances.",
      stats: {
        participants: "1,700+",
        attendees: "1,500+",
        prizePool: "₹10L+"
      },
      icon: Zap,
      gradient: "from-purple-600 to-blue-600"
    },
    {
      id: 2,
      title: "DAMRU 2024",
      subtitle: "Diversity, Art, Music & Recreation Unleashed",
      date: "Nov 29-30, 2024",
      description: "Rishihood University's flagship cultural fest with celebrity performances and workshops.",
      stats: {
        participants: "1,500+",
        colleges: "20+",
        prizePool: "₹15-20L"
      },
      icon: Music,
      gradient: "from-pink-600 to-purple-600"
    }
  ];

  const techTreks = [
    { id: 1, title: "China Tech Exploration", location: "Beijing & Shanghai", icon: Globe },
    { id: 2, title: "Singapore Innovation Trek", location: "Singapore", icon: MapPin },
    { id: 3, title: "HPAIR at Harvard University", location: "Boston, USA", icon: Plane },
    { id: 4, title: "Bangalore Tech Trek", location: "Bangalore, India", icon: Lightbulb },
  ];
  
  const eventVideos = [
    { id: 1, title: "Tech Tour to China", description: "Join us as we explore the tech landscape of China, visiting leading companies and startups.", embedId: "TOv4C1UQap0" },
    { id: 2, title: "Neutron 2025: The Reveal", description: "Experience the energy and innovation of India's first techno-cultural fest", embedId: "NY9UNcgIaYQ" },
    { id: 3, title: "Alibaba Insider Model", description: "Get an exclusive look at Alibaba's innovative strategies and technologies.", embedId: "x6y5ckZQu84" },
    { id: 4, title: "NST to Harvard", description: "Follow our journey as we take NST to the prestigious Harvard University.", embedId: "7tR2Q3J53xM" },
  ];

  return (
    <div className="min-h-screen bg-white/95">
      <section id="events" className="py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up delay-100">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Real-World Exposure & 
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent"> Fest Experiences</span>
            </h2>
            <p className="text-xl text-gray-700 font-medium max-w-4xl mx-auto">
              Bridge theory and practice through our flagship festivals and international tech treks. Gain leadership experience, global exposure, and real-world insights that shape your future career.
            </p>
          </div>

          {/* Flagship Events */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-blue-900 mb-8 text-center animate-fade-in-up delay-200">
              🎉 Our Flagship Fests
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, idx) => {
                const IconComponent = event.icon;
                return (
                  <Card
                    key={event.id}
                    className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 border border-blue-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 animate-fade-in-up transform hover:-translate-y-2"
                    style={{ animationDelay: `${0.22 + idx * 0.15}s` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="relative z-10 p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className="mb-4 bg-blue-100 text-blue-800">{event.date}</Badge>
                          <CardTitle className="text-3xl text-blue-950 mb-2">{event.title}</CardTitle>
                          <CardDescription className="text-indigo-600 font-semibold mb-4">{event.subtitle}</CardDescription>
                        </div>
                        <div className={`p-4 rounded-lg bg-gradient-to-r ${event.gradient}`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6">{event.description}</p>
                      <div className="flex justify-around bg-blue-100/50 rounded-lg p-4 mb-6 text-center">
                        {Object.entries(event.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-xl font-bold text-blue-900">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          </div>
                        ))}
                      </div>
                      <Button
                      onClick={()=> {
                        if (idx == 0){
                          window.open("https://www.neutronfest.com", "_blank");
                        } else {
                          window.open("https://www.youtube.com/watch?v=jC4OacF7uG8", "_blank");
                        }
                      }}
                       className={`w-full bg-gradient-to-r ${event.gradient} text-white hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Event Galleries - NEW SECTION */}
          <section className="mb-20">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">
                    Event Galleries
                </h3>
                <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up">
                    Experience the energy and excitement of our flagship events.
                </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                {eventVideos.map((video, idx) => (
                    <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl text-blue-950">{video.title}</CardTitle>
                                <CardDescription className="text-blue-700 mt-2">
                                    {video.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.embedId}`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
          </section>

          {/* Tech Treks */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-blue-900 mb-8 text-center animate-fade-in-up delay-300">
              🌍 International & Domestic Tech Treks
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techTreks.map((trek, idx) => {
                const IconComponent = trek.icon;
                return (
                  <Card
                    key={trek.id}
                    className="group relative overflow-hidden bg-white border border-indigo-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up transform hover:-translate-y-1"
                    style={{ animationDelay: `${0.32 + idx * 0.08}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-indigo-100">
                          <IconComponent className="h-5 w-5 text-indigo-700" />
                        </div>
                        <Badge variant="outline" className="border-indigo-300 text-indigo-700">{trek.location}</Badge>
                      </div>
                      <CardTitle className="text-lg text-blue-950 group-hover:text-indigo-700 transition-all duration-300">
                        {trek.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EventsSection;
