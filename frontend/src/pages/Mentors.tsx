import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Star,
  Users,
  MessageCircle,
  ExternalLink,
  X,
  Linkedin,
  BrainCircuit,
  Lightbulb,
  Mic,
  Award,
  Handshake,
  Rocket,
  CheckCircle,
} from "lucide-react";
import DotGrid from "../components/DotGrid/DotGrid";
import { studentMentors } from "../data/data.ts";

// --- TYPE DEFINITIONS ---
interface StudentMentor {
  name: string;
  img: string;
  bio: string;
  batch: string;
  linkedin?: string;
}

// --- REDESIGNED MENTOR CARD COMPONENT ---
const MentorCardItem = ({ mentor }: { mentor: StudentMentor }) => (
  <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg w-72 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:!scale-105">
    <div className="absolute -inset-px bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative h-full bg-gradient-to-br from-white to-blue-50 rounded-xl z-10 flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={mentor.img}
          alt={mentor.name}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${mentor.name.replace(
              " ",
              "+"
            )}&background=3b82f6&color=fff&size=200`;
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-blue-600 text-white text-xs shadow-lg">
            Batch {mentor.batch}
          </Badge>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-blue-950">{mentor.name}</h3>
          <p className="text-sm text-blue-700 mt-1 line-clamp-3 min-h-[60px]">
            {mentor.bio}
          </p>
        </div>
      </div>
      <div className="p-4 pt-0">
        {mentor.linkedin ? (
          <a
            href={mentor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-white/80 p-2 rounded-lg shadow-sm border border-blue-200 text-blue-700 font-semibold transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg"
          >
            <Linkedin className="h-4 w-4 mr-2" />
            View Profile
          </a>
        ) : (
          <div className="flex items-center justify-center w-full bg-gray-100 p-2 rounded-lg border border-gray-200 text-gray-500 font-semibold">
            <MessageCircle className="h-4 w-4 mr-2" />
            Connect Soon
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- FLOWING CARDS SECTION ---
const FlowingMentorsSection = ({
  title,
  data,
  sectionId,
}: {
  title: string;
  data: StudentMentor[];
  sectionId: string;
}) => {
  const [showAll, setShowAll] = useState(false);
  const animationDuration = data.length * 5;

  return (
    <div className="mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text mb-10 text-center">
        {title}
      </h3>

      <AnimatePresence mode="wait">
        {!showAll ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div
                className="flex w-max animate-scroll hover:[animation-play-state:paused]"
                style={{ animationDuration: `${animationDuration}s` }}
              >
                {[...data, ...data].map((mentor, index) => (
                  <div
                    key={`${sectionId}-${mentor.name}-${index}`}
                    className="flex-shrink-0 mx-3"
                  >
                    <MentorCardItem mentor={mentor} />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                View All ({data.length})
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <button
              onClick={() => setShowAll(false)}
              className="absolute -top-16 right-0 z-20 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {data.map((mentor) => (
                <motion.div
                  key={`${sectionId}-grid-${mentor.name}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  className="flex justify-center"
                >
                  <MentorCardItem mentor={mentor} />
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(false)}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-gray-700 hover:to-gray-800 transition"
              >
                Show Less
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Mentors = () => {
  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                🌱 Junior Mentorship Culture
              </h1>
              <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-8">
                "Culture does not make people, people make the culture." At NST,
                we believe that the transition into college life should feel less
                like a leap and more like a warm welcome.
              </p>
            </div>
            <FlowingMentorsSection
              title="Meet Our Student Mentors"
              data={studentMentors}
              sectionId="mentors"
            />
          </div>
        </section>

        {/* Why This Culture Matters */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent">
              💬 Why This Culture Matters
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Smooth Transition", description: "Mentors ease the transition into college life, helping juniors settle in and navigate their new environment." },
                { step: "02", title: "Bonding & Empathy", description: "We build long-lasting bonds across batches and promote a culture of empathy and open communication." },
                { step: "03", title: "Empowerment & Community", description: "Juniors gain confidence, clarity, and a strong support network that genuinely cares." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                🌟 Key Benefits for Juniors
              </h2>
              <p className="text-gray-700 text-lg font-medium max-w-3xl mx-auto leading-relaxed">
                Here's how the Junior Mentorship Culture transforms your college experience from day one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { emoji: "🌟", title: "Easier Transition into College Life", points: ["Mentors serve as friendly guides, helping juniors settle in smoothly.", "They explain how things work — from academics to clubs, from campus culture to events."] },
                { emoji: "🧭", title: "Academic & Career Guidance", points: ["Gain insights into real-world projects, tech stacks, internships, and learning paths.", "Get help with coding, subjects, tech profiles, and career clarity."] },
                { emoji: "🫂", title: "Emotional and Social Support", points: ["Mentors aren't just for studies — they're someone to talk to.", "They listen, share personal experiences, and help deal with homesickness or stress."] },
                { emoji: "🎉", title: "Fun & Bonding", points: ["Regular group mixers and challenges make juniors feel connected.", "Mentors are relatable seniors who hype you up and create a positive, friendly atmosphere."] },
              ].map((benefit) => (
                <Card
                  key={benefit.title}
                  className="group relative overflow-hidden bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center shadow-inner border border-white/50">
                          <span className="text-2xl">{benefit.emoji}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-blue-950 mb-4 group-hover:text-blue-800 transition-colors">
                          {benefit.title}
                        </h3>
                        <div className="space-y-3">
                          {benefit.points.map((point, pointIdx) => (
                            <div key={pointIdx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-700 leading-relaxed font-medium">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Add the CSS animation styles */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Mentors;
