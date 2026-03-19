import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Dummy from "@/components/Dummy";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Bot,
  Users,
  Trophy,
  Target,
  Lightbulb,
  Wrench,
  Zap,
  Heart,
  Rocket,
  Settings,
  Plane,
  Ship,
  Car,
  FileText,
  Video,
  UserCheck,
  Calendar,
  BookOpen,
  ArrowRight,
  Gamepad2,
  Linkedin,
} from "lucide-react"
import Footer from "@/components/Footer";

const pocDetails = {
  name: "Sourabh Sarkar",
  role: "POC Robotics Club",
  photo: "/images/Sourabh Sarkar.jpg",
  bio: "",
  linkedin: "https://www.linkedin.com/in/sourabh-sarkar-a32821293/",
};

export default function RoboticsClub() {
  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200/80 transition-colors animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Rocket className="w-4 h-4 mr-1" />
              Where Curiosity Sparks Innovation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              Welcome to the <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Robotics Club</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
              Your ideas come to life as moving, sensing, thinking machines. Whether you're fascinated by wheeled bots,
              drones, underwater vehicles, or AI-driven automation, there's a place for you here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Bot, value: "3+", label: "Flagship Projects" },
                { icon: Trophy, value: "3rd", label: "DTU Challenge" },
                { icon: Users, value: "All", label: "Welcome" },
                { icon: Wrench, value: "Hands On", label: "Learning" }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50/50"
                    style={{ animationDelay: `${0.3 + idx * 0.07}s` }}
                  >
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Point of Contact Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Point of Contact
              </h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Have questions or want to collaborate? Reach out to our club lead.
              </p>
            </div>
            <div className="max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <Card className="group relative overflow-hidden bg-white border-2 border-blue-200 hover:border-indigo-400 shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 text-center relative z-10">
                  <img
                    src={pocDetails.photo}
                    alt={pocDetails.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/128'; }}
                  />
                  <h3 className="text-2xl font-bold text-blue-950">{pocDetails.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-4">{pocDetails.role}</p>
                  <p className="text-gray-700 mb-6">{pocDetails.bio}</p>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    <a href={pocDetails.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>Who We Are</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                A student-run community dedicated to exploring robotics through hands-on projects, workshops, and competitions.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                { icon: Settings, title: "Build Real Robots", desc: "From line-followers to autonomous vehicles, we design, prototype, and program real working robots." },
                { icon: BookOpen, title: "Learn Together", desc: "Weekly workshops cover sensors, microcontrollers (Arduino, Raspberry Pi), CAD, machine learning, and more." },
                { icon: Trophy, title: "Compete & Showcase", desc: "Represent our college at national and inter-college robotics challenges and competitions." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.22 + idx * 0.07}s` }}>
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-blue-950">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{item.desc}</p>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-16 px-4 bg-blue-50/70">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>Our Journey</h2>
              <p className="text-blue-700 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Celebrating our achievements and learning from every challenge.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow bg-white animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Gamepad2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        Gesture-Controlled Wheelchair (IIT BHU)
                      </h3>
                      <p className="text-gray-700">
                        Developed a glove-based interface using MPU6050 and Bluetooth-driven motors to empower mobility
                        for users with limited hand function.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow bg-white animate-fade-in-up" style={{ animationDelay: "0.29s" }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Trophy className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-800 mb-2">Line-Follower Robot (DTU Challenge)</h3>
                      <p className="text-gray-700">
                        Secured <strong>3rd place</strong> with an efficient sensor array and PID control system,
                        showcasing our technical precision and teamwork.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* See Our Robots in Action */}
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        See Our Robots in Action
                    </h2>
                    <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                        From concept to reality, watch our creations come to life.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Video 1 */}
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl text-blue-950">Project Showcase</CardTitle>
                                <CardDescription className="text-blue-700 mt-2">
                                    A glimpse into the mechanics and electronics behind our award-winning bots.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/fp2LNDcZYZM"
                                        title="Robotics Project Showcase"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Video 2 - UPDATED LINK */}
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl text-blue-950">Competition Highlights</CardTitle>
                                <CardDescription className="text-blue-700 mt-2">
                                    Experience the thrill of competition and see our robots tackle tough challenges.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/7MOFBE7xcdw"
                                        title="Robotics Competition Highlights"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        {/* Flagship Projects */}
        <section className="py-16 px-4 bg-blue-50/70">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>Flagship Projects 2025-26</h2>
              <p className="text-blue-700 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Pushing the boundaries of autonomous systems and robotics.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                { icon: Car, title: "Autonomous Ground Vehicle (AGV)", badge: "Computer Vision", desc: "Self-navigating golf buggy with Computer Vision mapping for autonomous campus transportation." },
                { icon: Plane, title: "Vertical Takeoff & Landing Drone (VTOL)", badge: "Aerial Systems", desc: "Hybrid multirotor-plane for efficient aerial surveys combining helicopter and airplane capabilities." },
                { icon: Ship, title: "Autonomous Underwater Vehicle (AUV)", badge: "Marine Robotics", desc: "Submersible robot for data collection in water bodies, enabling underwater research and monitoring." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.22 + idx * 0.07}s` }}>
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-blue-950">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{item.desc}</p>
                      <Badge className="bg-blue-100 text-blue-800">{item.badge}</Badge>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>How to Join & Participate</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Membership is open to all, no prior experience required. Bring enthusiasm; we'll teach you the rest!
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: FileText, title: "Submit Form", desc: "Provide skills, interests, and project ideas." },
                  { icon: Video, title: "Interview", desc: "Aptitude and reasoning assessment." },
                  { icon: Bot, title: "Pick a Project", desc: "Align with one of our flagship initiatives." },
                  { icon: UserCheck, title: "Engage & Contribute", desc: "Attend meetings, workshops, and build sessions." }
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <Card key={step.title} className="text-center hover:shadow-lg transition-shadow bg-white animate-fade-in-up border-blue-200 hover:-translate-y-1" style={{ animationDelay: `${0.22 + idx * 0.07}s` }}>
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-sm text-blue-950">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-600">{step.desc}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  )
}
