import { Users, Code, Mic, Brush, Gamepad, Film, Binary, Microchip} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ClubsSection = () => {
  const clubs = [
    {
      name: "CP Club",
      description: "For aspiring competitive programmers.",
      icon: Code,
      tags: [
        "Competitive Programming",
        "Algorithms",
        "Data Structures",
        "Problem Solving",
      ],
      link: "/cp",
    },
    {
      name: "Dev Club",
      description: "Hone your public speaking and communication skills.",
      icon: Binary,
      tags: [
        "UI/UX",
        "Web",
        "App",
        "AI",
        "Blockchain",
        "Cybersecurity",
        "Cloud Computing",
        "DevOps",
      ],
      link: "/dev",
    },
    {
      name: "Robotics Club",
      description: "Explore the world of robotics and automation.",
      icon: Microchip,
      tags: ["Robotics", "AI", "Engineering", "Automation", "Embedded Systems", "IoT", "Mechatronics"],
      link: "/robotics",
    },
    {
      name: "Google Developer Group",
      description: "A community for developers to learn, share, and grow.",
      icon: Code,
      tags: [
        "Web Development",
        "Mobile Development",
        "Cloud Computing",
        "AI & ML",
      ],
      link: "/gdg",
    }
  ]

    return (
    <section id="clubs" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up delay-100">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Clubs & Societies
          </h2>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Join vibrant communities, develop new skills, and make lifelong
            connections through our diverse range of student organizations.
          </p>
        </div>
        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, idx) => {
            const IconComponent = club.icon;
            return (
              <Card
                key={club.name}
                className="flex flex-col justify-between group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.18 + idx * 0.07}s` }}
              >
                <div className="relative z-10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-4 rounded-xl bg-blue-100/80 mb-4">
                        <IconComponent className="h-8 w-8 text-blue-700" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-blue-950">
                      {club.name}
                    </CardTitle>
                    <CardDescription className="text-gray-700 pt-1">
                      {club.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {club.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-blue-300 text-blue-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      onClick={() => (window.location.href = club.link)}
                      className="w-full bg-blue-500 border border-blue-300 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    >
                      Explore Community
                    </Button>
                  </CardContent>
                </div>
                {/* Hover Effects */}
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

export default ClubsSection;