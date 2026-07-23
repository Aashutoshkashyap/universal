"use client";

import { useState } from "react";
import { ArrowRight, X, Calendar, MapPin, Clock } from "lucide-react";

export default function NewsAndEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cards = [
    {
      title: "Admissions Open for 2026 Intake",
      description: "Applications are now open for undergraduate and postgraduate engineering programs. Explore eligibility, scholarships, and important admission dates.",
      cta: "Learn More",
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Technical Workshops & Guest Lectures",
      description: "Gain insights from industry professionals and academic experts through workshops, seminars, and interactive technical sessions held throughout the year.",
      cta: "View Events",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Student Clubs & Innovation Activities",
      description: "From robotics and engineering societies to competitions and collaborative projects, discover how students turn ideas into real-world impact.",
      cta: "Explore Activities",
      img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Campus News & Achievements",
      description: "Stay updated with student accomplishments, research highlights, institutional announcements, and milestones from across the UESC community.",
      cta: "Read News",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const modalEvents = [
    { id: 1, title: "Annual Engineering Hackathon 2026", date: "August 15, 2026", time: "9:00 AM - 6:00 PM", location: "Main Campus Auditorium", type: "Competition" },
    { id: 2, title: "Guest Lecture: AI in Civil Engineering", date: "August 22, 2026", time: "2:00 PM - 4:00 PM", location: "Virtual / Room 302", type: "Guest Lecture" },
    { id: 3, title: "Fall Career Fair & Internship Drive", date: "September 5, 2026", time: "10:00 AM - 4:00 PM", location: "Campus Courtyard", type: "Career Event" },
    { id: 4, title: "Robotics Club Showcase", date: "September 12, 2026", time: "11:00 AM - 2:00 PM", location: "Engineering Lab Block B", type: "Student Activity" },
    { id: 5, title: "Alumni Meet & Networking Dinner", date: "September 20, 2026", time: "6:00 PM - 9:00 PM", location: "Grand Hotel, Lalitpur", type: "Networking" },
  ];

  return (
    <>
      <section id="news-events" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
          
          {/* Header */}
          <div className="mb-14 text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                News & Events
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-end justify-between w-full gap-6">
              <div className="max-w-2xl text-center sm:text-left">
                <h2
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-4xl lg:text-5xl text-black leading-tight mb-4"
                >
                  Stay Connected with What's Happening at UESC
                </h2>
                <p className="text-[15px] text-black/60 font-light leading-relaxed">
                  Discover the latest news, academic achievements, technical workshops, seminars, student activities, and campus events that shape the UESC community. Stay informed about opportunities to learn, connect, and grow beyond the classroom.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group flex-shrink-0"
              >
                <span>All Events</span>
                <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-lg transition-shadow group flex flex-col cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-2xl text-black mb-3 leading-snug"
                  >
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-black/60 font-light leading-relaxed flex-1">
                    {card.description}
                  </p>
                </div>
                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-black group-hover:text-red-600 transition-colors">
                    {card.cta}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-black/5 text-black flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Events Button */}
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group"
            >
              <span>All Events</span>
              <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Events Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-black/5">
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl text-black">
                  Upcoming Events
                </h3>
                <p className="text-sm text-black/50 mt-1">Don't miss out on what's happening at UESC.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors text-black/70 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Events List) */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="space-y-4">
                {modalEvents.map((event) => (
                  <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-black/5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
                    <div className="space-y-3">
                      <div className="inline-block px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-wider">
                        {event.type}
                      </div>
                      <h4 className="text-lg font-semibold text-black group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-black/60 font-light">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-black/40" /> {event.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-black/40" /> {event.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-black/40" /> {event.location}</span>
                      </div>
                    </div>
                    <button className="self-start sm:self-center px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-blue-600 transition-colors shrink-0">
                      RSVP
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
