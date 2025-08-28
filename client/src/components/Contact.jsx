import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#293c58]">

      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-3">
          {[
            {
              icon: Phone,
              title: "Call Us",
              details: ["+91-76879-06978", "+91-76879-06878"],
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Mail,
              title: "Email Us",
              details: ["contact@natcred.com", "hr@natcred.com"],
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: MapPin,
              title: "Visit Us",
              details: ["8502, Sector 20", "Patna, India"],
              color: "from-emerald-500 to-teal-500"
            }
          ].map((item, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-emerald-200 to-lime-200"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 font-medium leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/60 backdrop-blur-sm rounded-3xl"></div>
          <div className="relative bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="px-8 py-12 sm:p-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Have a project in mind? Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h4>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project or inquiry..."
                        className="w-full px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <button
                      onClick={handleSubmit}
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center px-12 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-lime-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;