import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  FileText,
  Globe,
  Briefcase,
  Lightbulb,
  Network,
  Star,
  MapPin,
  Plane,
} from "lucide-react";
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";

const TechTrek = () => {
  const whatToExpect = [
    {
      icon: Globe,
      title: "Global Exposure",
      description:
        "Visit top tech hubs and universities to grasp global trends and disruptive business models.",
    },
    {
      icon: Network,
      title: "Pro Networking",
      description:
        "Connect with founders, CXOs, and experts. Pitch your ideas directly to VCs.",
    },
    {
      icon: Briefcase,
      title: "Skill Development",
      description:
        "Engage in hands-on workshops, coding labs, and challenges beyond the curriculum.",
    },
    {
      icon: Star,
      title: "Personal Growth",
      description:
        "Develop independence, adaptability, and a global mindset with diverse peers and cultures.",
    },
  ];

  const destinations = [
    {
      location: "China",
      cities: "Beijing",
      description:
        "100+ hours of workshops with visits to Baidu Apollo, Alibaba Cloud, JD.com, and DeepSeek labs.",
      image:
        "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
      icon: Globe,
    },
    {
      location: "Singapore",
      cities: "Singapore",
      description:
        "Campus sessions at NUS & SUTD with networking at Gojek, Shell, and other leading tech firms.",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
      icon: MapPin,
    },
    {
      location: "India",
      cities: "Bangalore",
      description:
        "Explore India's Silicon Valley with visits to startup ecosystems and entrepreneurship workshops.",
      image:
        "https://media.istockphoto.com/id/1192261427/photo/vidhan-soudha-bangalore.jpg?s=612x612&w=0&k=20&c=vs5YGb93RSoY4f9E4zXo6SatrR8SqTnQy26HrwKw2XQ=",
      icon: Lightbulb,
    },
    {
      location: "Commming Soon",
      cities: "soon .......",
      description: "This year we are Comming up with more adventures...",
      image:
        "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbWluZyUyMHNvb258ZW58MHx8MHx8fDA%3D",
      icon: Plane,
    },
  ];

  const applicationProcess = [
    {
      step: "01",
      title: "Express Interest",
      description:
        "Fill out the official interest form. This is the first step to signal your intent to join the trek.",
    },
    {
      step: "02",
      title: "Attend Info Session",
      description:
        "Join a detailed meeting where we'll cover the full agenda, costs, itinerary, and answer your questions.",
    },
    {
      step: "03",
      title: "Confirm Your Spot",
      description:
        "Submit the required documents and a seat-blocking fee to officially reserve your place on the trip.",
    },
    {
      step: "04",
      title: "Logistics Handled",
      description:
        "Sit back and relax. NST will manage your visa applications, flight bookings, and all travel logistics.",
    },
    {
      step: "05",
      title: "Bon Voyage!",
      description:
        "Pack your bags and prepare for a transformative journey to the world's leading tech hubs.",
    },
  ];

  const eventVideos = [
    {
      id: 1,
      title: "Tech Tour to China",
      description:
        "Join us as we explore the tech landscape of China, visiting leading companies and startups.",
      embedId: "TOv4C1UQap0",
    },
    {
      id: 2,
      title: "Singapore Tech Trip",
      description:
        "Glimpse into a one of a kind tech trek to Singapore of Newton School of Technology (NST).",
      embedId: "TGoiT0M0RWQ",
    },
    {
      id: 3,
      title: "Alibaba Insider Model",
      description:
        "Get an exclusive look at Alibaba's innovative strategies and technologies.",
      embedId: "x6y5ckZQu84",
    },
    {
      id: 4,
      title: "NST to Harvard",
      description:
        "Follow our journey as we take NST to the prestigious Harvard University.",
      embedId: "7tR2Q3J53xM",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Dummy />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-blue-300 bg-white text-blue-800 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Plane className="w-4 h-4 mr-2" />
            Global & Domestic Opportunities
          </Badge>
          <h1
            className="text-4xl md:text-6xl font-extrabold text-blue-950 mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            International & Domestic{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Tech Treks
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-slate-700 mb-10 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Bridge theory with practice. Gain leadership experience, global
            exposure, and real-world insights that will define your future
            career.
          </p>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <a href="#destinations">
                Explore Destinations <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              Simple 5-Step Application
            </h2>
            <p className="text-lg text-slate-600 mt-4">
              Your journey begins here. Follow these steps to secure your spot.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block"
              aria-hidden="true"
            ></div>
            <div className="space-y-12 md:space-y-0">
              {applicationProcess.map((step, idx) => (
                <div
                  key={idx}
                  className={`md:flex items-center w-full ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="w-full md:w-[calc(50%-3rem)]">
                    <Card className="p-6 bg-white border-2 border-blue-100 shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-400 hover:-translate-y-1">
                      <CardTitle className="text-xl text-blue-900 mb-2">
                        {step.title}
                      </CardTitle>
                      <p className="text-slate-700">{step.description}</p>
                    </Card>
                  </div>
                  <div className="relative my-6 md:my-0 md:mx-4 shrink-0">
                    <div className="z-10 bg-white w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-blue-600 text-2xl shadow-md mx-auto">
                      {step.step}
                    </div>
                  </div>
                  <div className="hidden md:block w-[calc(50%-3rem)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Galleries Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Event Galleries
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the energy and excitement of our flagship events and
              past treks.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {eventVideos.map((video, idx) => (
              <Card
                key={video.id}
                className="group overflow-hidden bg-white border-slate-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardHeader className="p-6">
                  <CardTitle className="text-2xl text-blue-950 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 mt-2 text-base">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-inner border">
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

      {/* Required Documents Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-900">
                <FileText className="w-7 h-7" />
                Documents & Prerequisites
              </CardTitle>
              <CardDescription className="text-blue-800/80 text-base pt-1">
                Ensure you have these ready to streamline your application
                process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-slate-800">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Valid Passport</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>College ID Card</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Bonafide Certificate</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Parent's 6-month Bank Statement</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Parent's Passport or PAN Card</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Signed Excursion Documents</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              These treks are more than just trips; they are career-defining
              experiences designed to accelerate your growth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {whatToExpect.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-6 bg-slate-50/80 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2 border border-slate-200/90"
                >
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Destinations Section */}
      <section id="destinations" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Our Destinations
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From Asia's bustling tech hubs to America's innovation centers,
              our treks span the globe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest, idx) => {
              const Icon = dest.icon;
              return (
                <Card
                  key={idx}
                  className="group overflow-hidden border-slate-200 shadow-md animate-fade-in-up transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={dest.image}
                      alt={dest.location}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full shadow-md">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <Badge variant="secondary" className="mb-2">
                      {dest.cities}
                    </Badge>
                    <CardTitle className="text-xl text-blue-950">
                      {dest.location}
                    </CardTitle>
                    <p className="text-slate-600 mt-2 text-sm">
                      {dest.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechTrek;
