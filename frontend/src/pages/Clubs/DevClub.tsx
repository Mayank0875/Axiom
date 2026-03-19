import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Dummy from "@/components/Dummy";
import {
  Code2,
  Globe,
  Users,
  Calendar,
  ExternalLink,
  Trophy,
  Target,
  BookOpen,
  Award,
  Zap,
  Github,
  Rocket,
  Building,
  UserCheck,
  FileText,
  Brain,
  Video,
  ArrowRight,
  Linkedin,
} from "lucide-react"
import Footer from "@/components/Footer";

const pocDetails = {
  name: "Aditya Kumar",
  role: "Full stack Developer | Strategy & Innovation | AI/ML Expert | Blockchain Expert | Club President@DevClub",
  photo: "/images/Aditya.jpg",
  bio: "",
  linkedin: "https://www.linkedin.com/in/adityaInnovates/",
};

export default function DevClub() {
  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      <div className="min-h-screen">

        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200/80 transition-colors animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Rocket className="w-4 h-4 mr-1" />
              Student-Led Tech Community
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              DevClub <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">NST</span>
            </h1>
            <p className="text-2xl text-blue-700 font-semibold mb-4 animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
              Learn. Build. Inspire.
            </p>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
              Bridging learning and real-world skills through open-source projects, GSoC, and hands-on innovation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Building, value: "4+", label: "Major Projects" },
                { icon: Users, value: "50+", label: "Active Members" },
                { icon: Globe, value: "GSoC", label: "Focus Program" },
                { icon: Trophy, value: "Open", label: "Source First" }
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
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Who We Are
              </h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                A student-led tech community focused on building real-world solutions through collaboration and innovation.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="border-blue-200 bg-blue-50/60 animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
                <CardContent className="p-8 text-center">
                  <p className="text-lg text-blue-800 leading-relaxed">
                    We empower students to turn ideas into impact through open-source projects, tech events, and hands-on
                    learning experiences. Our mission is to cultivate creativity, problem-solving, and continuous growth
                    in the ever-evolving world of technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Notable Achievements */}
        <section className="py-16 px-4 bg-blue-50/70">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Our Notable Achievements
              </h2>
              <p className="text-blue-700 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Showcasing innovation through impactful projects.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Code2, title: "DCODE", badge: "Open Source Program", desc: "Beginner-centric open-source program helping students take their first steps into real-world coding through guided, collaborative projects." },
                { icon: Zap, title: "RippleX", badge: "React Library", desc: "Custom-built JavaScript state management library for React ecosystem, simplifying application state handling for cleaner, faster development." },
                { icon: Calendar, title: "NXTUP 1.0", badge: "Event Management", desc: "Event management system streamlining registration, tracking, and management of university-wide events with efficiency and structure." }
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

        {/* Hear From Our Community - NEW SECTION */}
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Hear From Our Community
                    </h2>
                    <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                        Discover the projects we build and the experiences our members cherish.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Video 1 */}
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl text-blue-950">Project Showcase: DCODE</CardTitle>
                                <CardDescription className="text-blue-700 mt-2">
                                    See what our students built during our flagship open-source program.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/DBQRqkmKfHw"
                                        title="DCODE Project Showcase"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Video 2 */}
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl text-blue-950">Member Testimonial</CardTitle>
                                <CardDescription className="text-blue-700 mt-2">
                                    Hear directly from a DevClub member about their experience and growth.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/S6NpSqL44s8"
                                        title="DevClub Member Testimonial"
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

        {/* GSoC Section */}
        <section className="py-16 px-4 bg-blue-50/70">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Google Summer of Code Focus
              </h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Empowering students to contribute to open source and earn up to $3000 through GSoC.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <Card className="border-blue-200 bg-white mb-8 animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Globe className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-800">Open Source Simplified</h3>
                  </div>
                  <p className="text-gray-700">
                    Code that's publicly accessible for anyone to read, improve, and contribute to. When you contribute
                    and maintainers approve, your changes become part of projects used globally.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recruitment Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Join DevClub NST
              </h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
                Structured recruitment process to become part of our vibrant, project-driven tech community.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: FileText, title: "Form Submission", desc: "Submit your application form with basic details" },
                  { icon: Brain, title: "Aptitude Test", desc: "Assess your problem-solving and logical thinking" },
                  { icon: Video, title: "Technical Interview", desc: "Discuss your technical skills and interests" },
                  { icon: UserCheck, title: "Final Selection", desc: "Welcome to the DevClub NST family!" }
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
