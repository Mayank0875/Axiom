import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  ExternalLink,
  Twitter, // Assuming 'X' icon is Twitter
  Code, // Icon for 'Made by'
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { label: 'Academic Curriculum', href: '/academics' },
    { label: 'Campus Life', href: '/campus' },
    { label: 'Student Support', href: '/mentors' },
  ];

  const resources = [
    {
      label: 'Academic Calendar',
      href: 'https://drive.google.com/file/d/1XEd4pqtU-eOwKL76o5C1snXM7ZE58AoO/view?usp=sharing',
    },
    { label: 'Faculty Directory', href: '/academics/faculty' },
    { label: 'Student Portal', href: 'https://my.newtonschool.co/' },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/newtonschooloftechnology/',
      label: 'Facebook',
    },
    { icon: Twitter, href: 'https://x.com/nst_edu', label: 'X/Twitter' },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/newtonschooloftechnology/?hl=en',
      label: 'Instagram',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/school/newton-school-of-technology/',
      label: 'LinkedIn',
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-200 py-20">
      <div className="container mx-auto px-6 space-y-16">

        {/* Links Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <svg width="30" height="30" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_127_15039)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.46951 0H10.3963V2.27927H2.46951V5.53538L5.12235 5.53538H6.90853C8.56579 5.53538 10.0967 6.09099 11.3342 7.0307L15.9611 2.27927H12.2988V0H17.5305H19.75V2.27927V7.65185H17.5305V3.89096L12.9036 8.6424C13.8187 9.91324 14.3597 11.4854 14.3597 13.1872L14.3597 18.9118L14.3598 22.2937C16.2787 20.8921 17.5305 18.5899 17.5305 15.9875V9.60551H19.75V15.9875C19.75 21.5172 15.3848 26 10 26C4.61522 26 0.25 21.5172 0.25 15.9875V2.27927V0H2.46951ZM2.46951 15.9875V7.81465L5.12235 7.81465H6.90853C9.79792 7.81465 12.1402 10.22 12.1402 13.1872L12.1402 18.9118L12.1402 23.4039C11.4618 23.6101 10.7435 23.7207 10 23.7207C5.84103 23.7207 2.46951 20.2584 2.46951 15.9875Z" fill="#0673F9"></path></g></svg>
              <div>
                <h3 className="text-xl font-bold text-blue-900">Newton School of Technology</h3>
                <p className="text-sm text-gray-600">Rishihood University</p>
              </div>
            </div>
            <p className="text-gray-700">
              Empowering the next generation of tech leaders through innovative education, hands-on learning, and industry-relevant curriculum at Rishihood University.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-3 text-blue-600" />
                <span className="text-sm">Rishihood University, Haryana, India</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="h-4 w-4 mr-3 text-blue-600" />
                <span className="text-sm">csai.leadoffice@nst.rishihood.edu.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 group"
                  >
                    {link.label}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 group"
                  >
                    {resource.label}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p>© 2025 Newton School of Technology. All rights reserved.</p>
            {/* NEW: Added credit link */}
            <a href="https://www.linkedin.com/company/official-merakiworks/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/60 text-blue-800 px-3 py-1.5 rounded-full border border-blue-200 hover:shadow-md hover:bg-white transition-all duration-300">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Made with 💙 by <strong>MerakiWorks</strong></span>
            </a>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white border border-blue-200 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 rounded-lg flex items-center justify-center transition-all shadow-md"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
