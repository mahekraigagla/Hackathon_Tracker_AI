
import React from 'react';
import { CheckCircle, Code, FileText, Award, BrainCircuit, Users } from 'lucide-react';

const features = [
  {
    title: "AI-Driven Team Selection",
    description: "Our revolutionary AI evaluates abstracts, prototypes, and code quality to select the top teams with complete objectivity.",
    icon: BrainCircuit,
    delay: "0.1s",
  },
  {
    title: "Detailed Project Analysis",
    description: "NLP algorithms analyze abstracts for innovation, feasibility, and relevance to hackathon themes.",
    icon: FileText,
    delay: "0.2s",
  },
  {
    title: "Code Quality Assessment",
    description: "Our system evaluates GitHub repositories to assess code quality, organization, and implementation.",
    icon: Code,
    delay: "0.3s",
  },
  {
    title: "Dynamic Shortlisting",
    description: "Automatic selection of the top one-third of teams based on comprehensive evaluation criteria.",
    icon: CheckCircle,
    delay: "0.4s",
  },
  {
    title: "Team Management Tools",
    description: "Easy-to-use registration and management tools for both participants and organizers.",
    icon: Users,
    delay: "0.5s",
  },
  {
    title: "Automated Certificates",
    description: "Automatic generation and distribution of certificates for participants and winners.",
    icon: Award,
    delay: "0.6s",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-secondary/50 dark:bg-hacktrack-gray-dark/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Revolutionizing Hackathon Management</h2>
          <p className="text-muted-foreground text-lg">
            HackTrack combines cutting-edge AI with intuitive design to transform how hackathons are organized and experienced.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-xl hover-scale animate-fade-in"
              style={{ animationDelay: feature.delay }}
            >
              <div className="bg-hacktrack-blue/10 rounded-full p-3 inline-flex mb-6">
                <feature.icon className="h-6 w-6 text-hacktrack-blue dark:text-hacktrack-blue-light" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
