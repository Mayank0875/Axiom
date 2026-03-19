import React from "react";
import {
  CalendarClock,
  Lightbulb,
  Users,
  MousePointerClick,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const expertSessionCards = [
  {
    title: "What",
    icon: Users,
    heading: "NST Office Hours (“Expert Sessions”)",
    description:
      "In-person, 45-minute one-on-one slots with your NST faculty. Bring any course question, project snag, or career query—and get expert answers face-to-face.",
  },
  {
    title: "Why",
    icon: Lightbulb,
    heading: "Personalized Learning. Deeper Insights.",
    description: [
      "Tailor every session to your needs—no more generic group lectures.",
      "Clarify tough concepts, debug assignments, or explore advanced topics.",
      "Build mentor relationships that last beyond the classroom.",
    ],
  },
  {
    title: "When",
    icon: CalendarClock,
    heading: "Monday – Thursday",
    description: [
      "Sessions open two weeks in advance.",
      "45‑minute slots fill up fast—plan ahead!",
      "You’ll receive an email reminder 24 hours before your booked time.",
    ],
  },
  {
    title: "How",
    icon: MousePointerClick,
    heading: "Book in 5 Easy Clicks",
    description: [
      "Log into your Newton School Dashboard",
      "Click the “Expert Sessions” button",
      "Choose your faculty, date, and time slot",
      "Confirm—then show up on campus!",
    ],
  },
];

const ExpertSessionsSection = () => {
  return (
    <section id="expert-sessions" className="py-20 bg-white/95">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up delay-100 relative">
          <div className="absolute inset-0 -z-10 mx-auto w-3/4 h-full bg-blue-50/50 blur-3xl rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
            Office Hours
          </h2>
          <p className="text-gray-800 text-lg max-w-3xl mx-auto font-medium pb-8">
            One-on-one sessions with faculty to help you master difficult
            topics, fix bugs, and plan your future—at your convenience.
          </p>

              <img
                className="rounded-lg"
                src="/Office-hours.jpeg"
                alt=""
              />
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {expertSessionCards.map((card, idx) => {
            const Icon = card.icon;
            const isArray = Array.isArray(card.description);

            return (
              <Card
                key={idx}
                className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${0.25 + idx * 0.1}s` }}
              >
                <div className="relative z-10">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-blue-100/80">
                        <Icon className="h-6 w-6 text-blue-700" />
                      </div>
                      <span className="text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-medium">
                        {card.title}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-blue-950">
                      {card.heading}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mt-2 text-sm text-gray-700">
                      {Array.isArray(card.description) ? (
                        <ul>
                          {card.description.map((line: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 mr-2"></div>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{card.description}</p>
                      )}
                    </div>
                  </CardContent>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertSessionsSection;
