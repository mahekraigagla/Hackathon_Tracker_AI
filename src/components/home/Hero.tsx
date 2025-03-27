
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Brain, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-10 dark:opacity-20" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 hidden lg:block">
        <div className="bg-hacktrack-blue/20 backdrop-blur-sm rounded-full h-32 w-32 animate-float" />
      </div>
      <div className="absolute bottom-1/3 right-10 hidden lg:block">
        <div className="bg-hacktrack-blue/10 backdrop-blur-sm rounded-full h-24 w-24 animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute top-2/3 left-1/4 hidden lg:block">
        <div className="bg-hacktrack-blue/15 backdrop-blur-sm rounded-full h-20 w-20 animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 p-2 rounded-full bg-hacktrack-blue/10 border border-hacktrack-blue/20 text-hacktrack-blue dark:text-hacktrack-blue-light inline-flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Hackathon Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-balance">
            Transform Your Hackathon with <span className="text-hacktrack-blue">Advanced AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl text-balance">
            HackTrack streamlines team registration, submission management, and participant 
            selection with cutting-edge AI technology designed for modern hackathons.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base font-medium">
              <Link to="/login?type=participant">Join as Participant</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-medium">
              <Link to="/hackathon-info">Learn More</Link>
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
            <div className="glass-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Driven Selection</h3>
              <p className="text-muted-foreground text-sm">
                Our AI analyzes abstracts and prototypes to select the most innovative teams.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Streamlined Registration</h3>
              <p className="text-muted-foreground text-sm">
                Easy team registration and project submission in one unified platform.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fair Evaluation</h3>
              <p className="text-muted-foreground text-sm">
                Impartial selection based on innovation, relevance, and technical merit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
