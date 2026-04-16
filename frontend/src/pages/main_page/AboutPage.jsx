import React from 'react';
import { 
  CheckCircle, 
  Target, 
  Users, 
  History, 
  Globe, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';
import Header from '../../components/Header';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 antialiased font-['Inter',_sans-serif] min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="text-center mb-24">
          <div className="inline-block p-3 rounded-2xl bg-white shadow-sm border border-gray-100 mb-6">
            <History className="text-[#D10043]" size={28} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900">
            Our Story & <span className="text-[#D10043]">Legacy</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Founded on a commitment to quality, Mariwasa Siam Ceramics Inc. has grown into the Philippines' 
            premier ceramic manufacturer, merging local craftsmanship with global technology.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 bg-pink-50 text-[#D10043] rounded-2xl flex items-center justify-center mb-8">
              <Target size={30} />
            </div>
            <h3 className="text-3xl font-black mb-4 text-gray-900">Our Mission</h3>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              To provide world-class ceramic products that enhance the Filipino living space, 
              driven by a passion for excellence, environmental sustainability, and 
              technological advancement.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-8">
              <Globe size={30} />
            </div>
            <h3 className="text-3xl font-black mb-4 text-gray-900">Our Vision</h3>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              To be the leading innovator in the ceramic industry across Southeast Asia, 
              setting the standard for aesthetic beauty, durability, and customer satisfaction 
              in every tile we produce.
            </p>
          </div>
        </div>

        <section className="bg-gray-900 rounded-[40px] p-10 md:p-20 text-white mb-24 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Modernizing the <br />
                <span className="text-[#D10043]">Talent Experience</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                This portal represents our shift toward Industry 4.0. By utilizing our 
                Automated Resume Analysis System, we ensure that every applicant's 
                unique skills are accurately matched with our technical requirements 
                without human bias.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-[#D10043]"><ShieldCheck size={20} /></div>
                  <span className="text-sm font-bold">Unbiased Review</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-[#D10043]"><Cpu size={20} /></div>
                  <span className="text-sm font-bold">Smart Matching</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-tr from-[#D10043] to-pink-500 rounded-full blur-3xl opacity-20 absolute top-0 right-0 animate-pulse"></div>
              <img 
                src="src/assets/logo.png" 
                alt="Technology" 
                className="h-48 w-48 object-contain relative z-20 brightness-200 opacity-20"
              />
            </div>
          </div>
        </section>

        <h3 className="text-center text-3xl font-black mb-12">Our Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { 
              title: "Innovation", 
              desc: "Constantly evolving our processes and products to lead the market.",
              icon: <Cpu size={24} /> 
            },
            { 
              title: "Quality", 
              desc: "Adhering to strict Siam-standards to ensure lifelong durability.",
              icon: <CheckCircle size={24} /> 
            },
            { 
              title: "People-First", 
              desc: "Empowering our employees and candidates through fair technology.",
              icon: <Users size={24} /> 
            }
          ].map((value, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-pink-100 transition-colors text-center group">
              <div className="text-[#D10043] mb-5 flex justify-center">
                <div className="p-4 bg-pink-50 rounded-2xl group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-xl mb-3">{value.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{value.desc}</p>
            </div>
          ))}
        </div>

        <section className="text-center py-20 bg-white rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-4xl font-black mb-6">Want to be part of our legacy?</h2>
          <p className="text-gray-500 mb-10 font-medium">Browse our current career opportunities and join the team.</p>
          <a 
            href="/careerspage" 
            className="inline-flex items-center space-x-3 bg-[#D10043] text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-lg shadow-pink-100"
          >
            <span>View Openings</span>
          </a>
        </section>
      </main>

      <footer className="py-16 border-t border-gray-100 bg-white text-center">
        <div className="flex justify-center mb-6">
          <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain grayscale opacity-50" />
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Mariwasa Siam Ceramics Inc.</p>
        <p className="text-gray-400 text-[10px]">© 2026 All rights reserved. Technology powered by AI.</p>
      </footer>
    </div>
  );
};

export default AboutPage;