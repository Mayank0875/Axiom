import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Check, Globe, MapPin, Plane, Rocket, Users, FileText, Briefcase, Lightbulb, Network, Star, Zap, Music, Trophy, ArrowRight, CheckCircle, FileSignature, MessageSquare, UserCheck } from "lucide-react"
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";

const Fests = () => {

  const neutronHighlights = [
    { title: "Technical Competitions", description: "Robo-Soccer, 24-hour AI Hackathon, BGMI battles, Drone Racing, and coding contests." },
    { title: "Workshops & Talks", description: "Panels with leaders from Uber, Google, and Salesforce, plus keynotes from top CEOs." },
    { title: "Drone Show", description: "Delhi NCR’s first massive 150-drone show creating spectacular formations in the night sky." },
    { title: "Cultural Fusion", description: "Live performances by major artists like Neeraj Shridhar, stand-up comedy, and VR demos." },
  ];

  const damruHighlights = [
    { title: "Star Performers", description: "Live performances by stars like Jassie Gill, Gaurav Kapoor, DJ MaskBox, and the fusion band Sadho." },
    { title: "Diverse Competitions", description: "Battle of the Bands, solo/group dance-offs, theatre, street art, and fashion shows." },
    { title: "Creative Workshops", description: "Masterclasses in photography, pottery, graffiti art, and creative writing." },
    { title: "Talent Showcases", description: "Open mic sessions, classical singing competitions, and much more for students to shine." },
  ];
  
  const benefits = [
      { icon: Star, title: "Leadership & Team Management", description: "Define roles, motivate teams, and mentor juniors, honing your emotional intelligence and accountability." },
      { icon: Calendar, title: "Project Planning & Execution", description: "Master organizational skills by managing timelines, budgets, and logistics for a large-scale event." },
      { icon: Users, title: "Communication & Networking", description: "Engage with sponsors, vendors, and peers from 250+ colleges, building a valuable professional network." },
      { icon: Lightbulb, title: "Problem-Solving & Adaptability", description: "Learn to anticipate risks, develop contingency plans, and tackle last-minute crises with creativity and composure." },
  ];

  const joinProcess = [
      { icon: FileSignature, title: "Google Form Roll-out", description: "The first step is to fill out the official interest form which will be circulated to all students." },
      { icon: MessageSquare, title: "Interview Round", description: "Shortlisted candidates will be invited for an interview to discuss their skills and motivation." },
      { icon: UserCheck, title: "Final Selection", description: "Successful candidates will be welcomed into the organizing committee to help shape the next fest." },
  ];

  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      <div className="min-h-screen">

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200/80 transition-colors animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Trophy className="w-4 h-4 mr-1" />
              Experience the Extraordinary
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              Our Flagship <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Fests</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              From cutting-edge tech showcases to vibrant cultural celebrations, our student-led fests are the heartbeat of campus life.
            </p>
          </div>
        </section>

        {/* Neutron Section */}
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up">
                        <Badge className="mb-4 bg-purple-100 text-purple-800">Techno-Cultural Fest</Badge>
                        <h2 className="text-4xl font-bold text-blue-950 mb-3">Neutron 2025</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            India’s most futuristic techno-cultural carnival, featuring cutting-edge tech competitions, workshops, and the first-ever massive drone show on a college campus.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center mb-8">
                            <div><p className="text-2xl font-bold text-blue-600">1,700+</p><p className="text-sm text-gray-500">Attendees</p></div>
                            <div><p className="text-2xl font-bold text-blue-600">1,100+</p><p className="text-sm text-gray-500">Participation</p></div>
                            <div><p className="text-2xl font-bold text-blue-600">₹20L+</p><p className="text-sm text-gray-500">Prize Pool</p></div>
                        </div>
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105 transition-all"
                        onClick={() => window.open("https://www.neutronfest.com", "_blank")}
                        >
                            Explore Neutron <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        {neutronHighlights.map((item, idx) => (
                            <Card key={idx} className="bg-white border-blue-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                                <CardHeader>
                                    <CardTitle className="text-blue-900">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Damru Section */}
        <section className="py-16 px-4 bg-blue-50/70">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-6 animate-fade-in-up order-2 lg:order-1" style={{ animationDelay: "0.1s" }}>
                        {damruHighlights.map((item, idx) => (
                            <Card key={idx} className="bg-white border-pink-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                                <CardHeader>
                                    <CardTitle className="text-blue-900">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="animate-fade-in-up order-1 lg:order-2 lg:text-right">
                        <Badge className="mb-4 bg-pink-100 text-pink-800">Cultural Fest</Badge>
                        <h2 className="text-4xl font-bold text-blue-950 mb-3">DAMRU 2024</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            North India's grandest cultural festival, spanning two days of music, dance, art, and recreation with a massive prize pool and top entertainers.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center lg:text-right mb-8">
                            <div><p className="text-2xl font-bold text-pink-600">1,000+</p><p className="text-sm text-gray-500">Participants</p></div>
                            <div><p className="text-2xl font-bold text-pink-600">20+</p><p className="text-sm text-gray-500">Colleges</p></div>
                            <div><p className="text-2xl font-bold text-pink-600">₹20L</p><p className="text-sm text-gray-500">Prize Pool</p></div>
                        </div>
                        <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105 transition-all"
                        onClick={() => window.open("https://www.youtube.com/watch?v=jC4OacF7uG8", "_blank")}
                        >
                            Explore DAMRU <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Benefits of Joining Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Why Join the Organizing Team?</h2>
              <p className="text-blue-700 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Organizing a fest cultivates leadership, project management, and networking skills that significantly enhance your personal growth and career readiness.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {benefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={idx} className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:-translate-y-1" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                    <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-blue-950">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* How to Join Section */}
        <section className="py-16 px-4 bg-blue-50/70">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">How to Join the Team</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Become a part of the core team that brings these massive events to life.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                {joinProcess.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                        <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                            <div className="mx-auto w-16 h-16 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center mb-4">
                                <Icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-950 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    );
                })}
            </div>
          </div>
        </section>

      </div>
      <Footer />

    </div>
  );
};

export default Fests;
