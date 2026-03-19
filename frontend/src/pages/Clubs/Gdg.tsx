import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, Lightbulb, Star, Code, Palette, Rocket, Mic, FileSignature, MessageSquare, UserCheck, Linkedin, BrainCircuit, Award, Handshake, ArrowRight } from "lucide-react"
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";

const Gdg = () => {

  const leadership = [
    {
      name: "Aaryan Yadav",
      role: "President, GDG RU",
      photo: "/images/Aryan.jpg",
      bio: "Leading the charge to foster a vibrant tech community at Rishihood University.",
      linkedin: "https://www.linkedin.com/in/aaryanyadav/",
    },
    {
      name: "Puneet",
      role: "Vice President, GDG RU",
      photo: "/images/Puneet.jpg",
      bio: "Dedicated to creating opportunities for students to learn, grow, and connect.",
      linkedin: "https://www.linkedin.com/in/puneet-kathuria-33a296220/",
    },
    {
      name: "Pranav Singh",
      role: "Secretary, GDG RU",
      photo: "/images/student_mentors/pranav_singh.jpeg",
      bio: "The organizational backbone of GDG RU, managment and coordination.",
      linkedin: "https://www.linkedin.com/in/pranav-singh-developer",
    },
  ];

  const benefits = [
    { icon: BrainCircuit, title: "Technical Skill Development", description: "Access workshops, hackathons, and codelabs on Google technologies like Android, AI/ML, Cloud, and Firebase." },
    { icon: Users, title: "Networking & Community", description: "Connect with peers, professionals, and Google experts, fostering collaboration and mentorship." },
    { icon: Award, title: "Professional Growth", description: "Showcase projects, earn certificates, and gain leadership experience to bolster your resume." },
    { icon: Mic, title: "Personal Growth", description: "Develop soft skills like public speaking, teamwork, and innovative problem-solving." },
  ];

  const joinProcess = [
      { step: "01", icon: FileSignature, title: "Application Form", description: "Fill out the Google Form, indicating your interest in verticals like Web Dev, Marketing, or Design. The form includes case-based and aptitude questions." },
      { step: "02", icon: MessageSquare, title: "Assessment Round", description: "The selection process varies. Non-technical roles may have a direct interview, while technical roles will involve a task or exam." },
      { step: "03", icon: UserCheck, title: "Final Selection", description: "Successful candidates are welcomed into a vertical to begin their journey of learning and contributing to the GDG RU community." },
  ];

  const communityHighlights = [
    {
      title: "Visual Vortex Hackathon 2024",
      url: "https://www.linkedin.com/posts/gdgrishihood_hackathon-accessibility-innovation-activity-7268140311434915840-PbAt",
      description: "Our first-ever UI/UX hackathon, where students created innovative, accessible digital solutions in a 12-hr Overnight Designing Sprint, showcasing creativity and teamwork.",
    },
    {
      title: "IdeaVerse 1.0 Ideathon",
      url: "https://www.linkedin.com/posts/gdgrishihood_ideaverse-ideathon-innovationinaction-activity-7299196093383229440-UKsS",
      description: "An entrepreneurship-themed event where students pitched groundbreaking ideas and built business models, guided by industry experts.",
    },
  ];

  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      <div className="min-h-screen">

        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200/80 transition-colors animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Globe className="w-4 h-4 mr-2" />
              Google Developer Groups
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              Google Developers <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Group</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              An open, inclusive space for students to learn, collaborate, and innovate with Google technologies.
            </p>
          </div>
        </section>

        {/* Benefits of Joining Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Why Join GDG?</h2>
              <p className="text-blue-700 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Unlock a world of learning, professional development, and networking in tech.
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

        {/* Flagship Events Section */}
        <section className="py-16 px-4 bg-blue-50/70">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Our Flagship Events</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Bringing together the brightest minds to solve real-world challenges.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg"><Palette className="w-6 h-6 text-purple-600" /></div>
                    <CardTitle className="text-2xl text-blue-950">Visual Vortex</CardTitle>
                  </div>
                  <CardDescription className="font-semibold text-purple-700">The UI/UX Hackathon</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Our flagship UI/UX hackathon where student designers and developers compete to create innovative and user-friendly digital experiences.</p>
                </CardContent>
              </Card>
              <Card className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg"><Rocket className="w-6 h-6 text-green-600" /></div>
                    <CardTitle className="text-2xl text-blue-950">Ideathon</CardTitle>
                  </div>
                  <CardDescription className="font-semibold text-green-700">The Entrepreneurial Hackathon</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">An entrepreneurship-themed hackathon where students ideate, build business models, and pitch innovative solutions to a panel of experts.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Highlights Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Community Highlights</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Explore our vibrant community through our latest events and achievements.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {communityHighlights.map((highlight, idx) => (
                <Card
                  key={idx}
                  className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-blue-950">{highlight.title}</CardTitle>
                    <CardDescription className="text-blue-700">{highlight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(highlight.url, "_blank")}
                    >
                      View More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open("https://www.linkedin.com/company/gdgrishihood/", "_blank")}
              >
                Explore More on LinkedIn
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Meet the Core Team</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                The student leaders driving our community forward.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {leadership.map((leader, idx) => (
                <Card key={idx} className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:-translate-y-1" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <img src={leader.photo} alt={leader.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
                    <CardTitle className="text-xl text-blue-950">{leader.name}</CardTitle>
                    <CardDescription className="text-blue-700 font-semibold">{leader.role}</CardDescription>
                    <p className="text-gray-600 text-sm mt-3 min-h-[60px]">{leader.bio}</p>
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                      <Button variant="outline" size="icon" className="rounded-full border-blue-300 text-white hover:bg-blue-100">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">
              How to Join the Team
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block"></div>
              <div className="space-y-16 md:space-y-0">
                {joinProcess.map((step, idx) => (
                  <div key={idx} className={`md:flex items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <div className="w-full md:w-[calc(50%-2.5rem)]">
                       <Card className="p-6 bg-white border border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <step.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl text-blue-900">{step.title}</CardTitle>
                          </div>
                          <p className="text-gray-700">{step.description}</p>
                        </Card>
                    </div>
                    <div className="relative my-4 md:my-0">
                      <div className="z-10 bg-white w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-blue-600 text-xl shadow-md mx-4 shrink-0">
                        {step.step}
                      </div>
                    </div>
                    <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Gdg;