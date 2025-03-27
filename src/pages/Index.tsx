
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Testimonial Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Trusted by Hackathon Organizers</h2>
              <p className="text-muted-foreground text-lg">
                See what organizers and participants are saying about HackTrack.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-hacktrack-blue-light/20 rounded-full flex items-center justify-center text-hacktrack-blue font-bold">JD</div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Jane Doe</h4>
                    <p className="text-sm text-muted-foreground">Hackathon Organizer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "HackTrack has transformed how we run our hackathons. The AI-driven selection process saved us countless hours and provided truly objective results."
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-hacktrack-blue-light/20 rounded-full flex items-center justify-center text-hacktrack-blue font-bold">MS</div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Mike Smith</h4>
                    <p className="text-sm text-muted-foreground">Tech Company CEO</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The detailed analysis of each submission was impressive. Our team could focus on judging the finalists rather than wading through hundreds of initial applications."
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-hacktrack-blue-light/20 rounded-full flex items-center justify-center text-hacktrack-blue font-bold">AT</div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Alex Thompson</h4>
                    <p className="text-sm text-muted-foreground">Student Participant</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "As a participant, I loved the transparent feedback system. Even though we didn't win, we got valuable insights about our project that we'll use next time."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-hacktrack-blue dark:bg-hacktrack-blue-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Next Hackathon?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the growing number of organizations using HackTrack to run efficient, objective, and impactful hackathons.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/login?type=admin" className="px-8 py-3 bg-white text-hacktrack-blue font-medium rounded-full hover:bg-opacity-90 transition-all">
                Host a Hackathon
              </a>
              <a href="/hackathon-info" className="px-8 py-3 bg-transparent border border-white font-medium rounded-full hover:bg-white/10 transition-all">
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
