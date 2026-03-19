import Navigation from "@/components/Navigation";
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Building,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  Download,
  CheckCircle,
  Quote,
  Rocket,
  Sparkles,
} from "lucide-react";

const Internships = () => {
  
  const gsocStudents = [
    { name: "Krishna Dave", quote: "From not knowing GSoC to cracking it in 6 months — all thanks to NST’s support. What a journey!", batch: 2024 },
    { name: "Agnik Misra", quote: "In one year I’ve cracked GSoC 2025 — proud to have hit my first-year milestone!", batch: 2024 },
    { name: "Birajit Saikia", quote: "If I can do it, so can you.", batch: 2024 },
    { name: "Ashu Choudhary", quote: "I cracked GSoC 2025 in just one focused month.", batch: 2024 },
    { name: "Yakshit Savaliya", quote: "NST’s support made it all possible.", batch: 2024 },
  ];

  const featuredInterns = [
      { name: "Janhvi Yadav", role: "Intern, DRDO", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/DRDO_logo.svg/1200px-DRDO_logo.svg.png" },
      { name: "Udita", role: "Intern, Razorpay", logo: "https://cdn.worldvectorlogo.com/logos/razorpay.svg" },
      { name: "Rachit Kumar", role: "Frontend Engineer Intern, Sarvam", logo: "https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1499866879/g8q6jsy755vy2zyf8t5z.png" },
  ];
  
  const studentProjects = [
      { title: "Crypto Wallet", description: "Web3-based wallet for secure crypto management, inspired by MetaMask.", madeBy: "Aditya Kumar", batch: 2024 },
      { title: "CritiAI: AI Chatbot", description: "AI-powered chatbot for travel recs, coding help, and language learning.", madeBy: "Agnik Mishra", batch: 2024 },
      { title: "Skippi Clone", description: "Modernized website for Skippi ice pop brand, with future e-commerce integration planned.", madeBy: "MD Sajjan", batch: 2024 },
      { title: "Go-For-Gold", description: "7-day ICPC bootcamp with mentorship from World Finalists and intensive training.", madeBy: "Kunal Vats, Udit Jain", batch: 2024 },
      { title: "NST AI", description: "AI study buddy for NST using Mistral 7b LLM for Q&A and lecture summaries.", madeBy: "Vivek Wagadare", batch: 2024 },
      { title: "Smart India Hackathon", description: "Youngest first-year team tackling Delhi Transport Corporation challenges.", madeBy: "Roni, Deeptanu & Team", batch: 2024 },
  ];

  return (
    <div className="min-h-screen bg-white/95">
      
      {/* <Navigation /> */}
      <Dummy />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent animate-fade-in-up" style={{animationDelay: "0.1s"}}>
                Internship & Placement Success
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: "0.2s"}}>
                Our students achieve in two years what others take four. That’s why our curriculum is built to rigorously develop industry-relevant skills.
            </p>
          </div>

        {/* Stats Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-6 text-center animate-fade-in-up delay-300">
              {[
                { label: "Active Internships", value: "250+" },
                { label: "Partner Companies", value: "80+" },
                { label: "Average Stipend", value: "₹25K/month" },
                { label: "Placement Rate", value: "93%" },
              ].map((stat, idx) => (
                <div key={stat.label} style={{ animationDelay: `${0.35 + idx * 0.07}s` }} className="animate-fade-in-up">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      
      {/* Internship Report Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-2 animate-fade-in-up">Internship Report 2025 Released</h2>
                <p className="text-xl text-blue-700 font-semibold mb-4 animate-fade-in-up" style={{animationDelay: "0.1s"}}>93.07% of students secured internships by their second year.</p>
                <p className="text-gray-600 mb-6 animate-fade-in-up" style={{animationDelay: "0.2s"}}>Certified by B2K Analytics (IIM Ahmedabad’s Placement Auditors)</p>
                <Button
                  variant="outline"
                  className="border-blue-300 text-white hover:bg-blue-100 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/posts/nst-placement-cell_internship-report-activity-7351948283545554945-O-iM?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADyYFOEB7fjXRNe7HZi7MRLOi3_Nt2Vqoi4",
                      "_blank"
                    )
                  }
                >
                  View Internship Report
                </Button>
            </div>
        </div>
      </section>
      
      {/* GSoC Success Section */}
      <section className="py-20 bg-blue-50/70">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Google Summer of Code Success</h2>
                <p className="text-blue-700 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: "0.1s"}}>
                    6 First-Year Students Selected in GSoC with an average stipend of ₹2.3 lakhs, a testament to our hands-on curriculum.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gsocStudents.map((student, idx) => (
                    <Card key={idx} className="bg-white border-blue-200 shadow-lg animate-fade-in-up" style={{ animationDelay: `${0.2 + idx * 0.07}s` }}>
                        <CardContent className="p-6">
                            <Quote className="w-8 h-8 text-blue-300 mb-4" />
                            <p className="text-gray-700 mb-4 italic">"{student.quote}"</p>
                            <p className="font-semibold text-blue-900">{student.name}</p>
                            <p className="text-sm text-gray-600">NST {student.batch} Batch</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Zuvees Case Study */}
      <section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side: Case Study Description */}
      <div className="animate-fade-in-up">
        <Badge className="mb-4 bg-blue-100 text-blue-800">Case Study</Badge>
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Building a UAE‑Based Startup’s Product from Scratch
        </h2>
        <p className="text-gray-700 mb-6">
          When Zuvees, a fast‑growing gifting tech startup in Dubai, needed a full‑stack tech solution, they turned to our students who built their entire product from the ground up.
        </p>
        <Card className="bg-blue-50/50 border-blue-200">
          <CardContent className="p-6">
            <p className="text-blue-800 italic">
              "It didn’t feel like we were working with students — it felt like we were working with professionals. They delivered like pros."
            </p>
            <p className="font-semibold text-right mt-2 text-blue-900">
              - Abhishek Daiya, Founder of Zuvees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Side: What They Built */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <Card className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 transition-all duration-300">
          
          {/* Gradient background (z-0) */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Bottom progress bar (z-0) */}
          <div className="absolute bottom-0 left-0 w-0 h-1 z-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>

          {/* Content (z-10) */}
          <div className="relative z-10">
            <CardHeader>
              <CardTitle className="text-blue-900">
                From Zero to One: What They Built
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span className="text-gray-700">Real‑time dashboards for the Dubai Ops Team.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span className="text-gray-700">Live integrations for payment gateways and order tracking.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span className="text-gray-700">Backend to manage inventory, logistics, and user flows.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span className="text-gray-700">Frontend designed for customers and ops teams.</span>
              </li>
            </CardContent>
          </div>
          
        </Card>
      </div>
    </div>
  </div>
</section>

      {/* How to Apply Section */}
      <section id="how-to-apply" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">How to Land Your Dream Internship</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: "0.1s"}}>
              Whether you're on campus or exploring off-campus opportunities, NST equips you with cutting-edge tools and strategies to secure top internships.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* On-Campus Section */}
            <Card className="bg-blue-50/50 border-blue-200 shadow-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Building className="w-6 h-6 text-blue-500" /> On-Campus Opportunities
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Streamlined, high-impact process to connect you with top companies through our placement portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Craft a Stellar Resume</p>
                    <p className="text-gray-700">Work with your mentor to create a resume that stands out, tailored to showcase your skills and projects.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Access the Placement Portal</p>
                    <p className="text-gray-700">Once your resume is mentor-approved, unlock our AI-powered placement portal on your student dashboard.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">One-Click Apply</p>
                    <p className="text-gray-700">Apply to top companies with a single click — our backend auto-submits your resume and tracks your applications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">AI Interview Prep</p>
                    <p className="text-gray-700">Get exclusive access to our AI-driven mock interview platform, simulating real-world interviews with instant feedback.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Off-Campus Section */}
            <Card className="bg-blue-50/50 border-blue-200 shadow-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-500" /> Off-Campus Opportunities
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Take charge of your career with creative, out-of-the-box strategies to land internships globally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Cold Email Mastery</p>
                    <p className="text-gray-700">Use our AI-crafted cold email templates to pitch directly to startup founders and hiring managers with a 30%+ response rate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Freelance Platforms</p>
                    <p className="text-gray-700">Showcase your skills on platforms like Fiverr, Upwork, and Toptal with NST’s portfolio-building workshops.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Job Platforms & Networking</p>
                    <p className="text-gray-700">Leverage LinkedIn, Naukri.com, and Glassdoor with our AI-optimized profile tips to attract recruiters.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Open-Source Contributions</p>
                    <p className="text-gray-700">Stand out by contributing to open-source projects like GSoC with guidance from our mentors and alumni network.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Why Apply Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Why Apply for Internships ?</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: "0.1s"}}>
              Unlock unparalleled opportunities to kickstart your career with real-world experience, mentorship, and a chance to shine in the tech world.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-World Impact",
                description: "Work on projects that shape industries, from startups to global giants, and see your code in action.",
                icon: <Rocket className="w-8 h-8 text-blue-500" />,
              },
              {
                title: "Mentorship That Matters",
                description: "Learn from industry veterans and GSoC mentors who guide you to build skills that employers value.",
                icon: <Sparkles className="w-8 h-8 text-blue-500" />,
              },
              {
                title: "Launch Your Career",
                description: "93% placement rate and internships at top firms like DRDO and Razorpay — your future starts here.",
                icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
              },
            ].map((reason, idx) => (
              <Card
                key={idx}
                className="group bg-white border-blue-200 shadow-lg hover:border-blue-500 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + idx * 0.07}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {reason.icon}
                    <h3 className="text-xl font-semibold text-blue-900">{reason.title}</h3>
                  </div>
                  <p className="text-gray-700">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Projects */}
      <section className="py-20 bg-blue-50/70">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Student‑Built Projects Showcasing Internship‑Level Work</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {studentProjects.map((project, idx) => (
                      <Card key={idx} className="group relative overflow-hidden bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${0.1 + idx * 0.07}s` }}>
                          <CardHeader>
                              <CardTitle className="text-blue-950">{project.title}</CardTitle>
                              <CardDescription className="text-blue-700">By {project.madeBy} ({project.batch})</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <p className="text-gray-700">{project.description}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default Internships;