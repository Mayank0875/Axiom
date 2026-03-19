import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Award, Mail, BarChart, Plane, ArrowRight } from "lucide-react"
import Dummy from "@/components/Dummy";
import Footer from "@/components/Footer";

const TravelFunds = () => {

  const eligibilityCriteria = [
    "Students shall receive a scholarship based on the quality and repute of the academic or technical competition.",
    "This policy ensures every student gets an equal opportunity to benefit from the scholarship program during their tenure.",
    "Applicants must demonstrate how their participation will positively represent Newton School of Technology.",
    "All grants are subject to the consumption of the annual budget and availability of funds."
  ];

  const applicationProcess = [
    {
      step: "01",
      title: "Application Submission",
      description: "Complete and submit a detailed application including the purpose of travel, expected outcomes, a copy of the invitation letter, and an estimated travel budget.",
    },
    {
      step: "02",
      title: "Email the Application",
      description: "Send the completed application and all supporting documents via email to csai.leadoffice@nst.rishihood.edu.in",
    },
    {
      step: "03",
      title: "Review and Evaluation",
      description: "A designated committee will assess applications based on the significance of the event, the student's potential, and the overall impact.",
    },
    {
      step: "04",
      title: "Grant Notification",
      description: "Successful applicants will be notified about the grant approval, the amount awarded, and any specific conditions or documentation requirements.",
    },
    {
      step: "05",
      title: "Post-Travel Reporting",
      description: "After the event, recipients must submit a comprehensive report summarizing the outcomes, along with all original travel bills and receipts.",
    },
  ];

  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      <div className="min-h-screen">

        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200/80 transition-colors animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Plane className="w-4 h-4 mr-2" />
              Supporting Global Opportunities
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              Student Travel <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Grant Policy</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              NST-RU supports students participating in academic and technical events of national and international repute through our Travel Grant program.
            </p>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">Eligibility Criteria</h2>
              <p className="text-blue-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                To ensure fairness and opportunity for all, the following criteria must be met.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {eligibilityCriteria.map((criterion, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50/60 border-l-4 border-blue-500 rounded-r-lg animate-fade-in-up" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <p className="text-gray-700">{criterion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">
              Application Process
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block"></div>
              <div className="space-y-16 md:space-y-0">
                {applicationProcess.map((step, idx) => (
                  <div key={idx} className={`md:flex items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <div className="w-full md:w-[calc(50%-2.5rem)]">
                       <Card className="p-6 bg-white border border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <CardTitle className="text-xl text-blue-900 mb-2">{step.title}</CardTitle>
                          <p className="text-gray-700">{step.description}</p>
                        </Card>
                    </div>
                    <div className="relative my-4 md:my-0">
                      <div className="z-10 bg-white w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-blue-600 text-xl shadow-md mx-4 shrink-0">
                        {step.step}
                      </div>
                    </div>
                    <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accountability and Contact Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-blue-800">
                    <BarChart className="w-6 h-6" />
                    Accountability Measures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="flex items-start gap-3 text-gray-700"><ArrowRight className="w-5 h-5 text-blue-500 mt-1 shrink-0" /><span>Students must provide detailed expense reports with original bills to account for the funds.</span></p>
                  <p className="flex items-start gap-3 text-gray-700"><ArrowRight className="w-5 h-5 text-blue-500 mt-1 shrink-0" /><span>Proof of attendance, presentations, or participation in the event is required.</span></p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-blue-800">
                    <Mail className="w-6 h-6" />
                    Contact & Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">For all queries and application submissions, please contact the Dean's office at the email address below.</p>
                  <Button asChild variant="outline" className="w-full border-blue-300 text-white-700 hover:bg-blue-100">
                    <a href="mailto:csai.leadoffice@nst.rishihood.edu.in">
                      csai.leadoffice@nst.rishihood.edu.in
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default TravelFunds;
