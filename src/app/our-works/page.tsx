"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function OurWorks() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#1c1c1c] font-sans pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Navigation - Standard layout */}
        <Navbar />

        {/* --- 1. HERO SECTION (Matches First Image: L-Shape Astronaut with Cutout) --- */}
        <div className="flex flex-col lg:flex-row gap-4 mb-24 h-auto lg:h-[600px] mt-8">
           
           {/* LEFT COLUMN: Astronaut (60%) */}
           <div className="w-full lg:w-[60%] h-[400px] lg:h-full relative">
              <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-black">
                 <img 
                   src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                   alt="Space / Engineering" 
                   className="w-full h-full object-cover object-top opacity-90" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                 
                 <div className="absolute bottom-10 left-10 text-white z-10">
                    <h1 className="text-4xl xl:text-[44px] font-bold leading-tight tracking-tight">
                      Engineering solutions<br />Driving digital growth
                    </h1>
                 </div>

                 {/* Bottom-Right Mask Cutout (Creates the inset area for block) */}
                 <div className="absolute bottom-0 right-0 w-[42%] h-[48%] bg-[#f5f4ef] rounded-tl-[32px] z-10 hidden lg:block">
                     {/* Inverted Corners */}
                     <div className="absolute bottom-0 right-full w-8 h-8" style={{ background: 'radial-gradient(circle at 0 0, transparent 32px, #f5f4ef 32px)' }}></div>
                     <div className="absolute bottom-full right-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 0 0, transparent 32px, #f5f4ef 32px)' }}></div>
                     
                     {/* Block (Sitting exactly inside the mask) */}
                     <div className="absolute bottom-0 right-0 w-[calc(100%-16px)] h-[calc(100%-16px)] bg-[#1f221f] rounded-[32px] p-6 xl:p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-white text-5xl xl:text-6xl font-bold tracking-tighter">14</div>
                        <div className="text-gray-400 text-xs xl:text-sm font-medium leading-tight max-w-[120px]">Major projects in my portfolio</div>
                     </div>
                 </div>
              </div>

              {/* Mobile Block (Stacked) */}
              <div className="block lg:hidden w-full bg-[#1f221f] rounded-[32px] p-6 mt-4 flex flex-col justify-between h-[150px]">
                  <div className="text-white text-5xl font-bold tracking-tighter">14</div>
                  <div className="text-gray-400 text-sm font-medium leading-tight">Major projects in my portfolio</div>
              </div>
           </div>

           {/* RIGHT COLUMN: Mustard & Graffiti (40%) */}
           <div className="w-full lg:w-[40%] flex flex-col gap-4 h-[600px] lg:h-full">
              
              {/* Top: Mustard Block (55%) */}
              <div className="h-[55%] bg-[#e5b06d] rounded-[32px] p-8 xl:p-10 text-white flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                     <span className="text-xs xl:text-sm font-bold uppercase tracking-wider text-white/80">Aashutosh Jha</span>
                     <span className="text-xs xl:text-sm font-bold uppercase tracking-wider text-white/80 border-b border-white/30 pb-1 cursor-pointer hover:text-white transition-colors">Hire Me</span>
                 </div>
                 <p className="text-xl xl:text-2xl font-bold leading-relaxed max-w-[280px]">
                     Showcasing expertise across Power Systems Engineering and Digital Marketing.
                 </p>
              </div>

              {/* Bottom: Graffiti Block (45%) */}
              <div className="h-[45%] rounded-[32px] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Creative Setup" 
                    className="w-full h-full object-cover" 
                  />
              </div>
              
           </div>
        </div>

        {/* --- 2. SERVICES SECTION (Matches Second Image: Top-Left Cutout) --- */}
        {/* Mobile */}
        <section className="block lg:hidden mb-16 rounded-[32px] overflow-hidden bg-[#1f221f] relative p-8">
           <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vintage Car" className="absolute inset-0 w-full h-full object-cover opacity-40" />
           <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-8 leading-tight">Bridging analytical engineering and creative marketing strategies</h2>
              <div className="flex flex-col gap-4 text-white/90 text-sm">
                 <div className="border-b border-white/20 pb-2">Power Systems Simulation (ETAP, PowerFactory)</div>
                 <div className="border-b border-white/20 pb-2">Transmission Line & Hydropower Design</div>
                 <div className="border-b border-white/20 pb-2">Comprehensive promotion in social networks</div>
                 <div className="border-b border-white/20 pb-2">PPC, SEO, and Digital Campaign Management</div>
              </div>
           </div>
        </section>

        {/* Desktop */}
        <section className="hidden lg:block relative w-full h-[500px] mb-24 bg-[#1f221f] rounded-[32px]">
           <img 
             src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
             alt="Vintage Car" 
             className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-[32px]" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[32px]"></div>
           
           {/* Top-Left Mask Cutout (Creates the inset text area) */}
           <div className="absolute top-0 left-0 w-[55%] h-[40%] bg-[#f5f4ef] rounded-br-[32px] z-10 flex items-start pt-2 pl-2">
               {/* Inverted Corners */}
               <div className="absolute top-0 left-full w-8 h-8" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 32px, #f5f4ef 32px)' }}></div>
               <div className="absolute top-full left-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 32px, #f5f4ef 32px)' }}></div>
               
               <h2 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-[#1c1c1c] max-w-xl pr-8">
                  Bridging analytical engineering and creative marketing strategies
               </h2>
           </div>

           {/* Services List Grid over Image */}
           <div className="absolute bottom-12 left-10 xl:left-12 grid grid-cols-2 gap-y-6 gap-x-16 text-white/90 text-sm xl:text-base font-medium max-w-4xl z-10">
              <div className="border-b border-white/20 pb-3">Power Systems Simulation & Analysis</div>
              <div className="border-b border-white/20 pb-3">Development of creative advertising campaigns</div>
              <div className="border-b border-white/20 pb-3">Transmission Line & Substation Design</div>
              <div className="border-b border-white/20 pb-3">Comprehensive promotion in social networks</div>
              <div className="border-b border-white/20 pb-3">Android App Development (Engineering Tools)</div>
              <div className="border-b border-white/20 pb-3">Analysis and optimization of ad campaigns</div>
           </div>
        </section>

        {/* --- 3. LATEST WORKS --- */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 pl-2">Our Latest Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-[350px] rounded-[32px] relative overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Engineering Project" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 text-white font-medium text-lg max-w-[200px]">INPS Stability Analysis (PowerFactory)</div>
            </div>
            <div className="h-[350px] rounded-[32px] relative overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Marketing Campaign" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 text-white font-medium text-lg max-w-[200px]">Brand Growth for Asterisk Tech</div>
            </div>
            <div className="h-[350px] rounded-[32px] relative overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Hydropower" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 text-white font-medium text-lg max-w-[200px]">Hydropower Plant Design Feasibility</div>
            </div>
          </div>
        </section>

        {/* --- 4. ABOUT US --- */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 pl-2">My Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
             <div className="bg-[#e5b06d] rounded-[32px] p-8 xl:p-10 text-white flex flex-col justify-center h-[220px]">
               <div className="text-3xl font-bold mb-4">4+ Years</div>
               <p className="text-sm xl:text-base font-medium leading-relaxed">
                 Active experience in digital marketing, building brand strategies and running ad campaigns.
               </p>
             </div>
             <div className="bg-[#1f221f] rounded-[32px] p-8 xl:p-10 text-white flex flex-col justify-center h-[220px]">
               <div className="text-2xl font-bold mb-4">MSc Candidate</div>
               <p className="text-sm xl:text-base text-gray-400 leading-relaxed font-medium">
                 Currently pursuing a Master's degree in Power System Engineering at IOE Pulchowk.
               </p>
             </div>
             <div className="bg-[#1f221f] rounded-[32px] p-8 xl:p-10 text-white flex flex-col justify-center h-[220px]">
               <div className="text-2xl font-bold mb-4">2 Domains</div>
               <p className="text-sm xl:text-base text-gray-400 leading-relaxed font-medium">
                 Successfully balancing technical engineering expertise with creative marketing skills.
               </p>
             </div>
          </div>
          
          <div className="h-[350px] rounded-[32px] overflow-hidden relative flex flex-col justify-end">
            <img 
              src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Analysis" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="relative z-10 text-white p-10 md:p-12">
              <div className="text-3xl font-bold mb-4">Analysis & Implementation</div>
              <p className="text-sm md:text-base font-medium max-w-2xl text-white/80 leading-relaxed">
                Whether simulating power grid stability or optimizing an ad campaign, my approach relies heavily on data analysis and careful implementation to achieve the maximum effect.
              </p>
            </div>
          </div>
        </section>

        {/* --- 5. PARTNERS / TOOLS --- */}
        <section className="mb-28">
          <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center md:text-left pl-2">Tools & Technologies</h2>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-500 px-4 text-black">
            <span className="text-2xl font-bold tracking-tighter">PowerFactory</span>
            <span className="text-3xl font-black italic">Google Ads</span>
            <span className="text-4xl font-serif font-bold">ETAP</span>
            <span className="text-3xl font-black tracking-widest">META Ads</span>
            <span className="text-3xl font-serif italic">Android SDK</span>
            <span className="text-3xl font-semibold">SEO</span>
          </div>
        </section>

        {/* --- 6. FOOTER --- */}
        <footer id="footer" className="mt-16 mb-8 bg-white rounded-[32px] py-10 px-8 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
             <div className="w-5 h-5 bg-gradient-to-br from-[#4a5e35] to-[#2c3e1e] rounded-full shadow-inner"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Let's get started on something great</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Open for digital marketing collaborations and engineering projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full max-w-sm mx-auto sm:max-w-none">
            <a href="https://www.linkedin.com/in/aashutoshjha001" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-lg h-12 px-6 font-medium border-gray-300 text-gray-700 w-full sm:w-auto shadow-sm">
                <PlayCircle className="w-5 h-5 mr-2 text-gray-500" />
                View Profile
              </Button>
            </a>
            <a href="mailto:jhaaashutosh933@gmail.com">
              <Button className="rounded-lg h-12 px-6 bg-[#2c3e1e] hover:bg-[#202d16] text-white font-medium w-full sm:w-auto shadow-sm border-none">
                Get started
              </Button>
            </a>
          </div>
          
          <div className="w-full border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 Er. Aashutosh Jha. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0 font-medium">
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
