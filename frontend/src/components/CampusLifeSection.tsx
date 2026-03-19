import React from 'react';
import { Home, UtensilsCrossed, Dumbbell, MapPin, Wifi, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tab } from '@headlessui/react';
import Dummy from '@/components/Dummy';
import Footer from '@/components/Footer';

const accommodations = [
  {
    id: 1,
    name: 'Hostel Block R1',
    type: 'Boys Hostel',
    capacity: '600+ Students',
    features: [
      'AC Rooms (Double Sharing)',
      'Wi-Fi',
      'Common Laundry',
      '1 Refrigerator, 1 Microwave/Oven & Water Heater/Cooler per floor',
    ],
    icon: Home,
  },
  {
    id: 2,
    name: 'Hostel Block R2',
    type: 'Boys Hostel',
    capacity: '600+ Students',
    features: [
      'AC Rooms (Double Sharing)',
      'Wi-Fi',
      'Common Laundry',
      '1 Refrigerator, 1 Microwave/Oven & Water Heater/Cooler per floor',
    ],
    icon: Home,
  },
  {
    id: 3,
    name: 'Hostel Block R3',
    type: 'Girls Hostel',
    capacity: '300+ Students',
    features: [
      'AC Rooms (Double Sharing)',
      'Wi-Fi',
      'Common Laundry',
      '1 Refrigerator, 1 Microwave/Oven & Water Heater/Cooler per floor',
    ],
    icon: Home,
  },
];

const facilities = [
  {
    icon: UtensilsCrossed,
    title: 'Central Mess',
    description: 'Nutritious meals with diverse menu options',
    details: ['Multi-cuisine', 'Dietary preferences', 'Quality assured'],
  },
  {
    icon: Dumbbell,
    title: 'Learners Arena',
    description: 'Modern sports facilities and fitness center',
    details: [
      'Basketball court x 2',
      'Tennis lawn x 2',
      'Cricket nets x 2',
      'Swimming Pool & Gym',
    ],
  },
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Campus-wide fiber connectivity for seamless learning.',
    details: ['24/7 uptime', 'Secure network'],
  },
  {
    icon: Car,
    title: 'Transportation',
    description: 'Shuttle services and parking facilities',
    details: ['Campus shuttle', 'City connectivity'],
  },
];

export default function CampusLifeSection() {
  function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="min-h-screen bg-white/95">
      <Dummy />
      <section id="campus" className="py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600">
              Campus Life
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Explore our comfortable accommodation and world-class facilities that make Newton School of Technology a thriving community.
            </p>
          </div>

          {/* Tabs for Accommodation & Facilities */}
          <Tab.Group>
            <Tab.List className="flex justify-center space-x-2 sm:space-x-4 mb-12 bg-blue-100/60 p-2 rounded-full max-w-md mx-auto">
              {['Accommodation', 'Facilities'].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm font-semibold leading-5 rounded-full',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-900 hover:bg-white/[0.6]'
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {accommodations.map((hostel, idx) => {
                    const Icon = hostel.icon;
                    return (
                      <motion.div
                        key={hostel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <div className="p-3 bg-blue-100 rounded-lg">
                                <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                              </div>
                              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium">
                                {hostel.capacity}
                              </span>
                            </div>
                            <CardTitle className="text-xl font-semibold text-blue-950">
                              {hostel.name}
                            </CardTitle>
                            <CardDescription className="text-indigo-600 font-medium">
                              {hostel.type}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <h4 className="font-semibold mb-2 text-blue-900">
                              Features:
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              {hostel.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {facilities.map((facility, idx) => {
                    const Icon = facility.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="group relative overflow-hidden text-center p-6 bg-white border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                          <div className="flex flex-col items-center">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl mb-4 shadow-lg">
                              <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-950 mb-1">
                              {facility.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {facility.description}
                            </p>
                            <ul className="space-y-1 text-gray-700 text-sm">
                              {facility.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-center justify-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Virtual Tour CTA */}
          <div className="mt-20 text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl border border-blue-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Experience Our Campus
              </h3>
              <p className="text-gray-700 mb-6 max-w-xl mx-auto">
                Take a virtual tour or schedule an in-person visit to explore our state-of-the-art facilities.
              </p>
              <div className="flex justify-center">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/VDwRPGdWv0g"
                  title="Campus Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl shadow-xl max-w-3xl w-full"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* The extra Footer component has been removed from here */}
    </div>
  );
}
