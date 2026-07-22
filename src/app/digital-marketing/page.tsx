"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const filters = ["SEO", "Social", "Paid Ads", "Content", "Email"];

const services = [
  {
    title: "Brand Growth & Social Strategy",
    price: "Asterisk Technology",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Ad Campaign Management",
    price: "Himalayan Aura Digital",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Digital Marketing Training",
    price: "Vrit Jobs",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

export default function DigitalMarketing() {
  const [activeFilter, setActiveFilter] = useState("SEO");

  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] font-sans pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Navbar />

        {/* ── 1. HERO ── */}
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-24 mt-8 rounded-[32px] bg-white">
          {/* Main Image Container */}
          <div className="absolute inset-0 rounded-[32px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Digital Marketing Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top-Left Cutout */}
          <div className="absolute top-0 left-0 w-[85%] md:w-[280px] h-[120px] md:h-[140px] bg-white rounded-br-[32px] z-10 p-5 md:p-6 flex flex-col justify-start">
            {/* Inverted Corners */}
            <div className="absolute top-0 left-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 32px, white 32px)' }}></div>
            <div className="absolute top-full left-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 32px, white 32px)' }}></div>

            <div className="border border-gray-200 text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-2 md:mb-3">
              Digital Marketing
            </div>
            <div className="text-[9px] md:text-[11px] font-medium text-gray-500 leading-snug">
              Elevate Your Brand<br />
              <span className="font-bold tracking-widest text-black uppercase">STAND OUT TODAY</span>
            </div>
          </div>

          {/* Top-Right Cutout */}
          <div className="absolute top-0 right-0 w-[90%] md:w-[450px] lg:w-[500px] h-[140px] md:h-[160px] bg-white rounded-bl-[32px] z-10 p-5 md:p-6 lg:p-8 flex items-center justify-end text-right">
            {/* Inverted Corners */}
            <div className="absolute top-0 right-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 32px, white 32px)' }}></div>
            <div className="absolute top-full right-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 32px, white 32px)' }}></div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
              Data-Driven Growth.<br />Creative Strategy.
            </h1>
          </div>

          {/* Bottom Cutout (U-shaped, indented from left) */}
          <div className="absolute bottom-0 left-[8%] md:left-[12%] w-[180px] md:w-[240px] h-[60px] md:h-[70px] bg-white rounded-t-[32px] z-10 flex items-center justify-center">
            {/* Left Inverted Corner */}
            <div className="absolute bottom-0 right-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 0% 0%, transparent 32px, white 32px)' }}></div>
            {/* Right Inverted Corner */}
            <div className="absolute bottom-0 left-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 100% 0%, transparent 32px, white 32px)' }}></div>

            <div className="border border-gray-200 text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-full w-fit">
              Aashutosh Jha - Portfolio
            </div>
          </div>
        </section>

        {/* ── 2. SERVICES ── */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
              Crafted With<br />Precision In Data!
            </h2>
            <div className="flex flex-wrap gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s) => (
              <div key={s.title} className="group cursor-pointer">
                <div className="relative rounded-[32px] overflow-hidden bg-[#f4f4f4] aspect-[4/3] mb-4 p-8 flex items-center justify-center">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-5 right-5 w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm font-semibold text-black mb-1">{s.title}</p>
                  <p className="text-sm font-bold text-gray-500">{s.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. FEATURE SPLIT ── */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-auto lg:h-[500px]">
          {/* Left Dark Card */}
          <div className="relative rounded-[32px] overflow-hidden bg-[#1c1c1c] h-[300px] lg:h-full p-8 flex flex-col justify-between">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Data Analytics"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
            <div className="relative z-10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit">
              Product
            </div>
            <div className="relative z-10 text-white">
              <p className="text-xs font-medium text-white/70 mb-1">Build your brand</p>
              <p className="text-xs font-bold tracking-widest text-white uppercase mb-4">LIKE YOU WANTED</p>
              <p className="text-2xl font-semibold leading-tight">Data-driven<br />results inside</p>
            </div>
          </div>

          {/* Right Image with Top-Left Cutout */}
          <div className="relative rounded-[32px] bg-white h-[400px] lg:h-full">
            <div className="absolute inset-0 rounded-[32px] overflow-hidden">
               <img
                 src="https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                 alt="Marketing Team"
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Top-Left Cutout for text */}
            <div className="absolute top-0 left-0 w-[85%] md:w-[350px] h-[280px] bg-white rounded-br-[32px] z-10 p-6 pr-10 pt-4 flex flex-col justify-start">
               {/* Inverted Corners */}
               <div className="absolute top-0 left-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 32px, white 32px)' }}></div>
               <div className="absolute top-full left-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 32px, white 32px)' }}></div>

               <div className="border border-gray-200 text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-6">
                 Modern Marketing
               </div>
               <h3 className="text-2xl md:text-3xl font-semibold leading-[1.1] mb-6 tracking-tight">
                 When We Run<br />Campaigns,<br />We Look For<br />The Best
               </h3>
               <button className="bg-black hover:bg-gray-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors w-fit mt-auto">
                 Get Started
               </button>
            </div>
          </div>
        </section>

        {/* ── 4. FULL-WIDTH BANNER ── */}
        <section className="mb-24 relative rounded-[32px] h-[400px] md:h-[500px] bg-white">
          <div className="absolute inset-0 rounded-[32px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Marketing Strategy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top-Right Cutout */}
          <div className="absolute top-0 right-0 w-[85%] md:w-[280px] h-[100px] md:h-[120px] bg-white rounded-bl-[32px] z-10 p-5 md:p-6 flex flex-col items-end text-right">
            {/* Inverted Corners */}
            <div className="absolute top-0 right-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 32px, white 32px)' }}></div>
            <div className="absolute top-full right-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 32px, white 32px)' }}></div>

            <div className="border border-gray-200 text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-2">
              Digital Strategy
            </div>
            <div className="text-[9px] md:text-[11px] font-medium text-gray-500 leading-snug">
              Make Your Brand<br />
              <span className="font-bold tracking-widest text-black uppercase">COME TRUE TODAY</span>
            </div>
          </div>

          {/* Bottom-Left Cutout */}
          <div className="absolute bottom-0 left-0 w-[90%] md:w-[600px] h-[160px] md:h-[200px] bg-white rounded-tr-[32px] z-10 p-5 md:p-6 md:pr-12 pb-2 flex flex-col justify-end">
            {/* Inverted Corners */}
            <div className="absolute bottom-full left-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 100% 0%, transparent 32px, white 32px)' }}></div>
            <div className="absolute bottom-0 left-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 100% 0%, transparent 32px, white 32px)' }}></div>

            <div className="border border-gray-200 text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-3 md:mb-4">
              Modern Digital Life
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-[52px] font-semibold leading-[1.1] text-black tracking-tight">
              Crafted From<br />Reclaimed Strategy<br />For Growth <span className="text-xl md:text-3xl">🚀</span>
            </h2>
          </div>
        </section>

        {/* ── 5. BOTTOM ROW ── */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-auto lg:h-[400px]">
          {/* Narrow Left Image */}
          <div className="rounded-[32px] overflow-hidden h-[300px] lg:h-full">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Case Study 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Wide Right Image with Top-Right Cutout */}
          <div className="relative rounded-[32px] bg-white h-[300px] lg:h-full">
            <div className="absolute inset-0 rounded-[32px] overflow-hidden">
               <img
                 src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                 alt="Case Study 2"
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Top-Right Cutout */}
            <div className="absolute top-0 right-0 w-[140px] h-[80px] bg-white rounded-bl-[32px] z-10 p-4 flex justify-end items-start">
               {/* Inverted Corners */}
               <div className="absolute top-0 right-full w-8 h-8 hidden md:block" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 32px, white 32px)' }}></div>
               <div className="absolute top-full right-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 32px, white 32px)' }}></div>

               <div className="border border-gray-200 text-xs font-semibold px-4 py-1.5 rounded-full w-fit">
                 Results
               </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="footer" className="mt-8 mb-8 bg-white rounded-[32px] py-16 px-8 text-center flex flex-col items-center border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-100">
            <div className="w-5 h-5 bg-gradient-to-br from-[#4a5e35] to-[#2c3e1e] rounded-full shadow-inner"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's build your brand</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
            Let's talk strategy, campaigns, and results — open to collaborations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full max-w-sm mx-auto sm:max-w-none">
            <a href="https://www.linkedin.com/in/aashutoshjha001" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full h-14 px-8 font-semibold border-gray-300 text-black w-full sm:w-auto shadow-sm">
                <PlayCircle className="w-5 h-5 mr-2 text-gray-500" />
                LinkedIn
              </Button>
            </a>
            <a href="mailto:jhaaashutosh933@gmail.com">
              <Button className="rounded-full h-14 px-8 bg-black hover:bg-gray-800 text-white font-semibold w-full sm:w-auto shadow-sm border-none">
                Contact Me
              </Button>
            </a>
          </div>
          <div className="w-full border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 Er. Aashutosh Jha. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
