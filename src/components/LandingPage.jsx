import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Video, 
  Calendar, 
  Shield, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Users,
  Award,
  Heart
} from 'lucide-react'

function LandingPage() {
  const { openAuthModal, demoCredentials } = useAuth()

  const features = [
    {
      icon: <Video className="w-8 h-8 text-primary-600" />,
      title: "Video Consultations",
      description: "Secure, high-quality video consultations from the comfort of your home"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary-600" />,
      title: "Easy Booking",
      description: "Schedule appointments 24/7 with our intuitive booking system"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Secure Records",
      description: "HIPAA-compliant storage and management of your medical records"
    }
  ]

  const pricingPlans = [
    {
      name: "Initial Consultation",
      price: "$150",
      duration: "60 minutes",
      features: [
        "Comprehensive health assessment",
        "Medical history review",
        "Treatment plan development",
        "Follow-up recommendations"
      ]
    },
    {
      name: "Follow-up Visit",
      price: "$100",
      duration: "30 minutes",
      features: [
        "Progress monitoring",
        "Medication adjustments",
        "Lifestyle recommendations",
        "Quick health check"
      ]
    },
    {
      name: "Urgent Care",
      price: "$200",
      duration: "45 minutes",
      features: [
        "Same-day appointments",
        "Immediate assessment",
        "Emergency guidance",
        "Priority scheduling"
      ]
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "Dr. Senz provided excellent care during my video consultation. The platform was easy to use and I felt completely comfortable discussing my health concerns.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "The booking system is incredibly convenient. I was able to schedule an appointment and receive my prescription all within the same day.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      content: "Dr. Senz's expertise and the secure platform gave me peace of mind. My medical records are well-organized and easily accessible.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Dr. Senz Medical</span>
            </div>
            <button
              onClick={openAuthModal}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Health, 
                <span className="text-primary-600"> Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience personalized medical care with Dr. Sarah Senz through secure video consultations, 
                easy appointment booking, and comprehensive health management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openAuthModal}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Book Consultation
                </button>
                <button className="btn-secondary text-lg px-8 py-3">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Sarah Senz</h3>
                  <p className="text-primary-600 font-semibold mb-2">MD, Internal Medicine</p>
                  <p className="text-gray-600 mb-4">15+ years of experience</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500">
                    <span>Internal Medicine</span>
                    <span>•</span>
                    <span>Preventive Care</span>
                    <span>•</span>
                    <span>Chronic Disease Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with compassionate care to provide you with the best medical experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Consultation Options
            </h2>
            <p className="text-xl text-gray-600">
              Choose the consultation type that best fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="card relative">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-600">{plan.duration}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openAuthModal}
                  className="w-full btn-primary"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from patients who trust Dr. Senz with their health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have transformed their healthcare experience with Dr. Senz.
          </p>
          <button
            onClick={openAuthModal}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">Dr. Senz Medical</span>
              </div>
              <p className="text-gray-400">
                Providing compassionate, professional medical care through innovative technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@drsenz.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Video Consultations</li>
                <li>Health Assessments</li>
                <li>Prescription Management</li>
                <li>Lab Results Review</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Demo Access</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>
                  <p className="font-medium text-white">Doctor Login:</p>
                  <p>doctor@drsenz.com</p>
                  <p>Password: doctor123</p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-white">Patient Login:</p>
                  <p>patient@example.com</p>
                  <p>Password: patient123</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dr. Senz Medical Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
