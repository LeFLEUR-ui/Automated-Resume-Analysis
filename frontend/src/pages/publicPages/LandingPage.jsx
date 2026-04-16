import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/Header';
import { ChevronDown, LogIn, UserPlus, Briefcase, Info, FileUp, CheckCircle, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 antialiased font-['Inter',_sans-serif]">
      <Helmet>
        <title>Mariwasa - Portal</title>
      </Helmet>

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="mb-12">
          <div className="inline-block rounded-3xl bg-white shadow-sm border border-gray-100 mb-8">
            <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-10 w-10 object-contain" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900">
            Join <span className="text-[#D10043]">Mariwasa Siam</span> Ceramics
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Experience an AI-driven recruitment process designed to match your potential with our innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 bg-pink-50 text-[#D10043] rounded-2xl mb-8 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Apply for Specific Job</h3>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">Browse our current openings and find the perfect role for your expertise.</p>
            <a href="#" className="w-full bg-[#D10043] hover:bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-lg shadow-pink-100">
              <span>View Open Positions</span>
            </a>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 bg-gray-50 text-gray-900 rounded-2xl mb-8 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileUp size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">General Application</h3>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">Let our AI system analyze your resume and match you with future opportunities.</p>
            <button className="w-full bg-gray-900 hover:bg-[#D10043] text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-lg shadow-gray-200">
              <span>Fast Upload Resume</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {[
            { title: "AI Review", desc: "Automated analysis ensures your profile is seen immediately by HR.", icon: <ShieldCheck /> },
            { title: "Perfect Match", desc: "We match your skills precisely with our technical requirements.", icon: <CheckCircle /> },
            { title: "Real-time Status", desc: "Track every stage of your application through your dashboard.", icon: <LogIn /> }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-pink-100 transition-colors">
              <div className="text-[#D10043] mb-5 flex justify-center">
                <div className="p-3 bg-pink-50 rounded-xl">
                  {React.cloneElement(feature.icon, { size: 24 })}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed leading-5">{feature.desc}</p>
            </div>
          ))}
        </div>

        <hr className="border-gray-100 mb-20" />

        <section className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-12 w-12 object-contain" />
          </div>
          <h2 className="text-4xl font-black mb-6 text-gray-900">About Mariwasa Siam Ceramics</h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            The Philippines' leading ceramic manufacturer. We combine traditional craftsmanship with 
            Siam-standard technology to build the homes of tomorrow.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-pink-50 text-[#D10043] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                To revolutionize the ceramic industry through sustainable innovation, creating world-class 
                living spaces while empowering Filipino talent.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-4">
                {['Competitive compensation', 'Professional growth paths', 'Global industry standards'].map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600 font-semibold">
                    <div className="w-2 h-2 bg-[#D10043] rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Mariwasa Siam Ceramics Inc.</p>
        <p className="text-gray-400 text-[10px]">© 2026 All rights reserved. Technology powered by AI.</p>
      </footer>
    </div>
  );
};

export default LandingPage;