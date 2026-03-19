import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import { facultyMembers, mentorList } from "../data/data";
import Dummy from "@/components/Dummy"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer
import ExpertSessionsSection from "@/components/ExpertSessionsSection";

// --- TYPE DEFINITIONS (for TSX) ---
interface Person {
  id: number;
  name: string;
  img: string;
  bio: string;
  linkedin: string;
  badges?: string[];
}

// --- REDESIGNED CARD COMPONENT ---
const CardItem = ({ person, showBio = true }: { person: Person; showBio?: boolean }) => (
  <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg w-72 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:!scale-105">
    <div className="absolute -inset-px bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative h-full bg-gradient-to-br from-white to-blue-50 rounded-xl z-10 flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={person.img}
          alt={person.name}
          // UPDATED: Reverted to object-cover and added object-top to prioritize the face
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${person.name.replace(
              " ",
              "+"
            )}&background=3b82f6&color=fff&size=200`;
          }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-blue-950">{person.name}</h3>
          {showBio && (
            <p className="text-sm text-blue-700 mt-1 line-clamp-3 min-h-[60px]">
              {person.bio}
            </p>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 items-center justify-center min-h-[24px]">
          {person.badges?.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`badge-${idx}`}
              className="h-6"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <div className="p-4 pt-0">
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-white/80 p-2 rounded-lg shadow-sm border border-blue-200 text-blue-700 font-semibold transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          View Profile
        </a>
      </div>
    </div>
  </div>
);

// --- FLOWING CARDS COMPONENT ---
const FlowingCardsSection = ({
  title,
  data,
  sectionId,
}: {
  title: string;
  data: Person[];
  sectionId: string;
}) => {
  const [showAll, setShowAll] = useState(false);
  const animationDuration = data.length * 5;
  const showBio = sectionId === "faculty"; // Only show bio for faculty

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
                {[...data, ...data].map((person, index) => (
                  <div
                    key={`${sectionId}-${index}`}
                    className="flex-shrink-0 mx-3"
                  >
                    <CardItem person={person} showBio={showBio} />
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
              {data.map((person) => (
                <motion.div
                  key={`${sectionId}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  className="flex justify-center"
                >
                  <CardItem person={person} showBio={showBio} />
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

const AcademicsFaculty = () => {
  return (
    <>
      <div className="min-h-screen bg-white/95">
        <Dummy />
        <section className="pt-20 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Academics & Faculty
              </h2>
              <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                Learn from world-class educators and industry experts who are
                passionate about shaping the next generation of innovators.
              </p>
            </div>
            <FlowingCardsSection
              title="Our Distinguished Faculty"
              data={facultyMembers.map((member, idx) => ({
                ...member,
                id: idx,
              }))}
              sectionId="faculty"
            />
            <FlowingCardsSection
              title="Mentors"
              data={mentorList.map((mentor, idx) => ({
                ...mentor,
                id: idx,
              }))}
              sectionId="mentors"
            />
          </div>
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
          }
        `}</style>
        </section>
        <ExpertSessionsSection />
        <Footer />
      </div>
    </>
  );
};

export default AcademicsFaculty;