import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  Clock,
  Award,
  ChevronRight,
  Code,
  Database,
  BrainCircuit,
  Cpu,
  Network,
  Bot,
  Laptop,
  GraduationCap,
  Lightbulb,
  Briefcase,
  GitBranch,
  Rocket,
  Palette,
  Eye,
  Languages,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Updated data structure to include all four years
const curriculumData = [
  {
    year: 1,
    theme: "Build",
    description: "Learn by building from day 1, strengthening your foundations in core CS concepts.",
    skills: ["Python", "ReactJS", "Data Structures Algorithms (DSA)", "File Handling", "Responsive Web Design", "Arrays", "Dictionary", "Searching", "API", "UI/UX", "Javascript", "Maths for CS"],
    semesters: [
      {
        id: 1,
        inClassroom: [
          { title: "Intro to Python", icon: Code },
          { title: "Web Development Basics", icon: Code },
          { title: "Core Maths I", icon: Lightbulb },
        ],
        beyondClassroom: [
          { title: "Portfolio Website", image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop" },
          { title: "Hackathon Participation", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" },
        ]
      },
      {
        id: 2,
        inClassroom: [
          { title: "Data Structures & Algorithms", icon: GitBranch },
          { title: "Advanced Javascript & React", icon: Code },
          { title: "UI/UX Fundamentals", icon: Palette },
        ],
        beyondClassroom: [
          { title: "Google Summer of Code", image: "https://images.unsplash.com/photo-1573495627361-d9b87960b12d?q=80&w=800&auto=format&fit=crop" },
          { title: "Competitive Programming", image: "https://cdn.pixabay.com/photo/2024/12/03/08/08/ai-generated-9241538_1280.jpg" },
        ]
      }
    ]
  },
  {
    year: 2,
    theme: "Achieve",
    description: "You will learn to build data-driven, complex systems which can scale.",
    skills: ["Node.js", "Backend Engineering", "Dynamic Programming", "Databases", "Machine Learning", "Data Visualisation", "Spark", "Mathematics for AI", "Backtracking", "PostgreSQL", "MongoDB", "Hadoop"],
    semesters: [
        {
            id: 3,
            inClassroom: [
                { title: "Backend Engineering", icon: Database },
                { title: "Intro to Databases (SQL)", icon: Database },
                { title: "System Design Basics", icon: Network },
            ],
            beyondClassroom: [
                { title: "Build a Social Media API", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop" },
                { title: "Last-mile Delivery Optimization", image: "https://t4.ftcdn.net/jpg/14/60/27/43/240_F_1460274366_n4gE3lZhpc0ByqfHQJ99UYVk4TubVTHP.jpg" },
            ]
        },
        {
            id: 4,
            inClassroom: [
                { title: "Intro to AI & ML", icon: BrainCircuit },
                { title: "Advanced Databases (NoSQL)", icon: Database },
                { title: "Data Visualization", icon: Palette },
            ],
            beyondClassroom: [
                { title: "Build InShorts like news app", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop" },
                { title: "Real-time Bidding Platform", image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop" },
            ]
        }
    ]
  },
  {
    year: 3,
    theme: "Innovate",
    description: "Create a mini version of an OS like iOS or Android and your own version of ChatGPT.",
    skills: ["Event-Driven Programming", "Deep Learning", "Networks - OSI Model", "GPT Models", "RISC Architecture"],
    semesters: [
      {
        id: 5,
        inClassroom: [
          { title: "Modern Computer Architecture", icon: Cpu },
          { title: "Computer Networks", icon: Network },
          { title: "Event-Driven Programming", icon: Code },
        ],
        beyondClassroom: [
          { title: "Build Collaborative apps", image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop" },
          { title: "Help CSK Recruit in IPL Auction", image: "https://media.gettyimages.com/id/1258274274/photo/topshot-chennai-super-kings-players-celebrate-with-the-trophy-after-their-victory-against.jpg?s=612x612&w=0&k=20&c=EIQm23bJ6xfMjqx994WjdlgsK4BKkY8oEbEo6RkLigk=" },
        ]
      },
      {
        id: 6,
        inClassroom: [
          { title: "Deep Learning", icon: Bot },
          { title: "Advanced Machine Learning", icon: BrainCircuit },
          { title: "GPT Models", icon: Sparkles },
        ],
        beyondClassroom: [
          { title: "Make a live-streaming app", image: "https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=800&auto=format&fit=crop" },
          { title: "Mandatory 6-month paid internships", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop" },
        ]
      }
    ]
  },
  {
    year: 4,
    theme: "Succeed",
    description: "The 8th semester is your industry internship, and by the end of the 7th, you will have a tool-kit to become an entrepreneur.",
    skills: ["Operating System", "Natural Language Processing", "Computer Vision", "Cyber Security", "NLTK / spaCy", "OpenCV", "Capstone Project"],
    semesters: [
        {
            id: 7,
            inClassroom: [
                { title: "Operating Systems", icon: Laptop },
                { title: "Computer Vision", icon: Eye },
                { title: "Natural Language Processing", icon: Languages },
            ],
            beyondClassroom: [
                { title: "Train your own LLM from scratch", image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=800&auto=format&fit=crop" },
                { title: "Deep Tech Projects", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop" },
            ]
        },
        {
            id: 8,
            inClassroom: [
                { title: "Theory of Computing", icon: GraduationCap },
                { title: "Cyber Security", icon: ShieldCheck },
                { title: "Capstone Project", icon: Rocket },
            ],
            beyondClassroom: [
                { title: "Preparing for top tech companies", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop" },
                { title: "Industry Internship / Research", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
            ]
        }
    ]
  },
];


// A new component to handle the semester content with animations
const SemesterContent = ({ semester }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={semester.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-blue-900 mb-4 text-center">In Classroom Learning</h4>
        <div className="grid grid-cols-2 gap-4">
          {semester.inClassroom.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                <div className="mx-auto w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-blue-700" />
                </div>
                <h5 className="font-semibold text-sm text-blue-950">{item.title}</h5>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-blue-900 mb-4 text-center">Beyond Classroom Learning</h4>
        <div className="grid grid-cols-2 gap-4">
          {semester.beyondClassroom.map(item => (
            <Card key={item.title} className="group overflow-hidden border-blue-200">
              <img src={item.image} alt={item.title} className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="p-3 bg-white h-full">
                <h5 className="font-semibold text-sm text-blue-950">{item.title}</h5>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);

const AcademicsSection = () => {
  const [activeSemesters, setActiveSemesters] = useState({});

  const handleSetSemester = (year, semId) => {
    setActiveSemesters(prev => ({ ...prev, [year]: semId }));
  };

  return (
    <section id="academics" className="py-20 bg-white/95">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up delay-100">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Industry First, 
            <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent"> Advanced Curriculum</span>
          </h2>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Our cutting-edge B.Tech curriculum in AI & ML is designed with industry leaders to prepare you for tomorrow's tech challenges.
          </p>
        </div>

        {/* Year-wise Curriculum Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {curriculumData.map((yearData, idx) => {
              const isEven = idx % 2 === 0;
              const activeSemesterId = activeSemesters[yearData.year] || yearData.semesters[0].id;
              const activeSemesterData = yearData.semesters.find(s => s.id === activeSemesterId);

              return (
                <div
                  key={yearData.year}
                  className="relative flex flex-col lg:flex-row items-center justify-between animate-fade-in-up w-full"
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-md flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                  </div>

                  <div className={`w-full lg:w-5/12 p-4 ${isEven ? 'lg:order-1' : 'lg:order-3'}`}>
                    <div className="text-center lg:text-left">
                      <Badge className="bg-blue-600 text-white text-sm px-4 py-1 mb-4">YEAR {yearData.year}</Badge>
                      <h3 className="text-4xl font-bold text-blue-950 mb-3">{yearData.theme}</h3>
                      <p className="text-lg text-gray-600">{yearData.description}</p>
                    </div>
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4 text-center lg:text-left">What you'll learn</h4>
                      {/* <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {yearData.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50/50">
                            {skill}
                          </Badge>
                        ))}
                      </div> */}
                    </div>
                  </div>

                  <div className={`w-full lg:w-5/12 p-4 mt-12 lg:mt-0 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
                    <div className="bg-gradient-to-br from-blue-100/50 to-indigo-100/50 p-6 sm:p-8 rounded-2xl border border-blue-200 shadow-lg">
                      {/* Semester Tabs */}
                      <div className="mb-6 bg-blue-200/50 p-1 rounded-full flex items-center">
                        <button
                          onClick={() => handleSetSemester(yearData.year, yearData.semesters[0].id)}
                          className={`w-1/2 rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${activeSemesterId === yearData.semesters[0].id ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:bg-white/50'}`}
                        >
                          Semester {yearData.semesters[0].id}
                        </button>
                        <button
                          onClick={() => handleSetSemester(yearData.year, yearData.semesters[1].id)}
                          className={`w-1/2 rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${activeSemesterId === yearData.semesters[1].id ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:bg-white/50'}`}
                        >
                          Semester {yearData.semesters[1].id}
                        </button>
                      </div>
                      
                      {/* Render content for the active semester */}
                      {activeSemesterData && <SemesterContent semester={activeSemesterData} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
