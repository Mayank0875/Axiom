import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Code, Trophy, Users, Target, Star, Award, Zap, ArrowRight, PlayCircle, Youtube, Brain, Rocket, Globe, BookOpen, TrendingUp, Medal, Flame, Sparkles, Crown, Swords, Shield, MessageCircle, Linkedin, ChevronRight, ExternalLink, Mail, Phone, MapPin } from "lucide-react"
import { Footer } from "react-day-picker";
import Dummy from "@/components/Dummy";

export default function CpClub() {
  const communityMembers = [
    { 
      icon: Crown, 
      title: "Candidate Master", 
      value: "1",
      description: "Top-tier competitive programmers",
      colors: {
        gradient: "from-amber-500 to-orange-600",
        bg: "from-amber-50 to-orange-50",
        border: "border-amber-200",
        text: "text-amber-900",
        accent: "text-amber-700"
      }
    },
    { 
      icon: Medal, 
      title: "Expert", 
      value: "2",
      description: "Advanced problem solvers",
      colors: {
        gradient: "from-purple-500 to-violet-600",
        bg: "from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-900",
        accent: "text-purple-700"
      }
    },
    { 
      icon: Flame, 
      title: "Specialists", 
      value: "2",
      description: "Skilled algorithmic thinkers",
      colors: {
        gradient: "from-cyan-500 to-blue-600",
        bg: "from-cyan-50 to-blue-50",
        border: "border-cyan-200",
        text: "text-cyan-900",
        accent: "text-cyan-700"
      }
    },
    { 
      icon: Sparkles, 
      title: "Pupils", 
      value: "6",
      description: "Emerging competitive coders",
      colors: {
        gradient: "from-emerald-500 to-green-600",
        bg: "from-emerald-50 to-green-50",
        border: "border-emerald-200",
        text: "text-emerald-900",
        accent: "text-emerald-700"
      }
    },
  ];

  const clubBenefits = [
    {
      icon: Brain,
      title: "Problem-Solving Mastery",
      description: "Develop advanced algorithmic thinking and enhance logical reasoning through structured practice and mentorship.",
      features: ["DSA Mastery", "Logic Building", "Pattern Recognition"]
    },
    {
      icon: TrendingUp,
      title: "Skill Enhancement",
      description: "Master data structures, algorithms, and competitive programming techniques used by top tech companies worldwide.",
      features: ["Advanced Algorithms", "Optimization", "Code Quality"]
    },
    {
      icon: Swords,
      title: "Competitive Edge",
      description: "Regular contests on multiple platforms to sharpen skills and build confidence under pressure.",
      features: ["Live Contests", "Mock Interviews", "Time Management"]
    },
    {
      icon: Shield,
      title: "ICPC Preparation",
      description: "Comprehensive training program designed specifically for ICPC and international competitions.",
      features: ["Team Formation", "Strategy Planning", "Contest Simulation"]
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Represent Newton School of Technology in prestigious national and international programming competitions.",
      features: ["Competition Opportunities", "Recognition", "Networking"]
    },
    {
      icon: Rocket,
      title: "Career Advancement",
      description: "Strong competitive programming background opens doors to top tech companies and prestigious opportunities.",
      features: ["Industry Connections", "Interview Prep", "Portfolio Building"]
    }
  ];

  const spotlightVideos = [
    {
      id: 1,
      title: "From Pupil to Specialist",
      description: "Follow an inspiring journey showcasing dedication, practice strategies, and breakthrough moments on the path to Specialist rank.",
      embedId: "fylywqd_gGQ",
      category: "Success Story"
    },
    {
      id: 2,
      title: "Live Contest Walkthrough",
      description: "Experience real-time problem-solving techniques and decision-making processes during competitive programming contests.",
      embedId: "68o5Qe6E92k",
      category: "Tutorial"
    },
    {
      id: 3,
      title: "Advanced Problem Solving",
      description: "Deep dive into complex algorithmic strategies and advanced techniques used by expert competitive programmers.",
      embedId: "b4wztf5q8Os",
      category: "Masterclass"
    }
  ];

  const pocDetails = {
    name: "Karan Chhillar",
    role: "President - OOPS (CP Club)",
    achievements: "Pupil @ Codeforces (Max - 1311) | 3⭐ @ CodeChef (Max - 1706) | Knight @ Leetcode (Max - 1846)",
    photo: "/images/Karan.jpg",
    bio: "Passionate competitive programmer leading OOPS with a vision to elevate Newton School of Technology's presence in global programming competitions.",
    linkedin: "https://www.linkedin.com/in/karan-chhillar-0a1618309/",
    email: "karan.chhillar@example.com"
  };

  const contestSchedule = [
    { 
      platform: "CodeChef",
      type: "Weekly Mandatory", 
      time: "Every Wednesday, 8:00 PM IST", 
      description: "Official weekly contests - mandatory for active membership",
      color: "orange",
      importance: "high"
    },
    { 
      platform: "LeetCode",
      type: "Weekly Contest", 
      time: "Every Sunday, 8:00 AM IST", 
      description: "Weekly algorithmic challenges and ranking competitions",
      color: "green",
      importance: "medium"
    },
    { 
      platform: "Codeforces",
      type: "Official Rounds", 
      time: "Usually around 8:05 PM IST", 
      description: "Global competitive programming rounds",
      color: "blue",
      importance: "high"
    },
    { 
      platform: "Internal",
      type: "College Competitions", 
      time: "Monthly Events", 
      description: "Tech fest competitions, mock rounds, and ladder challenges",
      color: "purple",
      importance: "medium"
    }
  ];

  const stats = [
    { value: "50+", label: "Active Coders", icon: Code, description: "Regularly participating members" },
    { value: "250+", label: "Total Students", icon: Users, description: "Community members across all levels" },
    { value: "11", label: "Rated Members", icon: Star, description: "Members with official platform ratings" },
    { value: "4+", label: "Platforms", icon: Globe, description: "Competitive programming platforms" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Dummy />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="text-gray-700 font-medium">Aiming for ICPC World Finals Gold</span>
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OOPS
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600">
              Organization of Problem Solvers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            The Official Competitive Programming Club of 
            <span className="font-semibold text-blue-600"> Newton School of Technology</span>
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Point of Contact */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leader
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with our club president for queries, collaborations, and guidance
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-white to-blue-50">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={pocDetails.photo}
                        alt={pocDetails.name}
                        className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80x80?text=KC'; }}
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{pocDetails.name}</h3>
                        <p className="text-blue-600 font-semibold">{pocDetails.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">{pocDetails.bio}</p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>{pocDetails.achievements}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 text-white">
                      <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 text-white to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <a href={pocDetails.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-4 w-4 text-white" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                  
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white">
                    <h4 className="text-xl font-bold mb-6">Quick Stats & Achievements</h4>
                    <div className="space-y-4">
                      {[
                        { platform: "Codeforces", rating: "1311", rank: "Pupil" },
                        { platform: "CodeChef", rating: "1706", rank: "3⭐" },
                        { platform: "LeetCode", rating: "1846", rank: "Knight" }
                      ].map((achievement) => (
                        <div key={achievement.platform} className="flex justify-between items-center py-2 border-b border-white/20">
                          <span className="font-medium">{achievement.platform}</span>
                          <div className="text-right">
                            <div className="font-bold">{achievement.rating}</div>
                            <div className="text-sm text-blue-200">{achievement.rank}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Joining Process */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Elite Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to become part of Newton's premier competitive programming club
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5" />
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Initial Joining</CardTitle>
                    <Badge className="bg-green-100 text-green-700 mt-1">Step 1 - Open Access</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Open to All Students</p>
                      <p className="text-gray-600 text-sm">No entrance test or prerequisites required</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Immediate Access</p>
                      <p className="text-gray-600 text-sm">Join club resources and community support instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Beginner Friendly</p>
                      <p className="text-gray-600 text-sm">Perfect starting point for your CP journey</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5" />
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Active Membership</CardTitle>
                    <Badge className="bg-blue-100 text-blue-700 mt-1">Step 2 - Performance Based</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Participation Requirements</p>
                        <p className="text-blue-700 text-sm">Missing 3 consecutive CodeChef contests = removal</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">↻</span>
                      </div>
                      <div>
                        <p className="font-semibold text-indigo-900">Easy Rejoin Process</p>
                        <p className="text-indigo-700 text-sm">Participate in 2 consecutive contests to rejoin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Members */}
      <section id="community" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Elite Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse community of skilled programmers across different expertise levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {communityMembers.map((member, idx) => {
              const Icon = member.icon;
              return (
                <Card
                  key={member.title}
                  className={`group relative overflow-hidden border-2 ${member.colors.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br ${member.colors.bg}`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${member.colors.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className={`${member.colors.text} font-bold text-lg`}>
                      {member.title}
                    </CardTitle>
                    <p className={`text-sm ${member.colors.accent}`}>{member.description}</p>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className={`text-4xl font-black ${member.colors.text} mb-2`}>
                      {member.value}
                    </div>
                    <div className="text-sm text-gray-500">Active Members</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join OOPS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your programming journey with comprehensive benefits and opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {clubBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white"
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {benefit.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight Videos */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Member Spotlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating achievements and sharing knowledge through inspiring member stories
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {spotlightVideos.map((video, idx) => (
              <Card key={video.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">{video.category}</Badge>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors mb-2">
                    {video.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-gray-100 group-hover:border-purple-200 transition-colors">
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
            ))}
          </div>
        </div>
      </section>

      {/* Contest Schedule */}
      <section id="contests" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contest Arena
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive contest schedule across multiple platforms to sharpen your competitive edge
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {contestSchedule.map((contest, idx) => (
              <Card
                key={contest.platform}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  contest.importance === 'high' ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${
                        contest.color === 'orange' ? 'from-orange-500 to-red-500' :
                        contest.color === 'green' ? 'from-green-500 to-emerald-500' :
                        contest.color === 'blue' ? 'from-blue-500 to-indigo-500' :
                        'from-purple-500 to-violet-500'
                      } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{contest.platform}</h3>
                        <p className="text-sm text-gray-600">{contest.type}</p>
                      </div>
                    </div>
                    {contest.importance === 'high' && (
                      <Badge className="bg-red-100 text-red-700">
                        <Flame className="w-3 h-3 mr-1" />
                        Mandatory
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{contest.time}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">{contest.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {/* Special Event */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Special Events & Announcements</h3>
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                
                <CardContent className="p-8 lg:p-12 relative z-10">
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                    <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Featured Event
                    </Badge>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900">
                      <Flame className="w-4 h-4 mr-1" />
                      Hot
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    Monthly Long Challenge
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="text-center md:text-left">
                      <p className="text-blue-100 text-lg mb-2">
                        Conducted by <span className="font-bold text-white">MerakiCode</span>
                      </p>
                      <p className="text-blue-100 text-lg">
                        Organized by <span className="font-bold text-white">Mayank Gupta</span>
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="flex items-center justify-center md:justify-end gap-2 text-blue-100 mb-2">
                        <Clock className="w-5 h-5" />
                        <span className="text-lg">Launching from</span>
                      </div>
                      <p className="text-2xl font-bold text-white">August 20th</p>
                    </div>
                  </div>
                  
                  <Button 
                    asChild 
                    className="bg-white text-blue-700 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <a 
                      href="https://www.hackerrank.com/contests/long-challenge-merakicode/challenges" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Rocket className="mr-3 w-5 h-5" />
                      Register on HackerRank 
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Vision & Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Driving India towards its first ICPC World Finals Gold Medal
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                        <p className="text-amber-700">The ultimate goal</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To make India win its first <strong className="text-amber-700">ICPC World Finals Gold Medal</strong>, 
                      with Newton School of Technology leading that historic moment.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                        <p className="text-blue-700">How we achieve it</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Build a strong competitive programming culture, develop world-class problem-solving skills, 
                      and create teams capable of competing at the highest international level.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-6">
                {[
                  { 
                    icon: Trophy, 
                    title: "Build Strong ICPC Teams", 
                    desc: "Develop competitive teams ready for international competitions with strategic training and mentorship"
                  },
                  { 
                    icon: Globe, 
                    title: "Global Problem-Solving", 
                    desc: "Promote world-class algorithmic thinking and advanced coding skills across our community"
                  },
                  { 
                    icon: Star, 
                    title: "Elevate India's CP Presence", 
                    desc: "Enhance India's standing in global competitive programming through excellence and innovation"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Card 
                      key={item.title} 
                      className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join OOPS today and become part of India's next generation of competitive programming champions
            </p>
          </div>
        </div>
      </section>

   

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up,
          .transition-all,
          .transition-colors,
          .transition-transform {
            animation: none;
            transition: none;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }
      `}</style>
    </div>
  )
}