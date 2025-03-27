
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How does the AI team selection process work?",
    answer: "Our AI analyzes team submissions based on multiple criteria including relevance to the hackathon theme, innovation, technical feasibility, and clarity of presentation. It then ranks all teams and automatically selects the top one-third for the final round."
  },
  {
    question: "Can I modify my submission after submitting?",
    answer: "No, once the submission deadline has passed, you cannot modify your abstract, prototype, or GitHub repository link. Please ensure your submission is complete and finalized before the deadline."
  },
  {
    question: "How will I know if my team is selected?",
    answer: "All teams will receive automated email notifications about their selection status. Additionally, you can check your team's status in real-time on your participant dashboard."
  },
  {
    question: "What criteria does the AI use to evaluate submissions?",
    answer: "The AI evaluates submissions based on theme relevance, innovation and uniqueness, technical feasibility, execution quality, and clarity of the abstract submission. Each factor contributes to your team's overall score."
  },
  {
    question: "When will we receive our certificates?",
    answer: "Participation certificates for shortlisted teams are sent automatically after the hackathon ends. Winner certificates are distributed via email after the final results are announced by the admin team."
  },
  {
    question: "Can I participate in multiple teams?",
    answer: "No, each participant can only be registered with one team for a specific hackathon. This ensures fairness and equal opportunities for all participants."
  },
];

const HackathonInfo: React.FC = () => {
  const { hash } = useLocation();
  const { toast } = useToast();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ type: 'user' | 'bot', content: string }[]>([
    { type: 'bot', content: 'Hello! I can answer your questions about the hackathon. How can I help you today?' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to hash section on load
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  
  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', content: chatInput }]);
    
    // Simulate AI processing
    setTimeout(() => {
      // Simple keyword-based responses for demo
      let botResponse = "I'm not sure about that. Could you please ask about the hackathon rules, submission process, or evaluation criteria?";
      
      const input = chatInput.toLowerCase();
      
      if (input.includes('deadline') || input.includes('when')) {
        botResponse = "The hackathon registration deadline is October 15, 2023. The final submission deadline is October 30, 2023.";
      } else if (input.includes('team') && (input.includes('size') || input.includes('members'))) {
        botResponse = "Teams can have between 1-4 members. All team members must be registered with their details before the registration deadline.";
      } else if (input.includes('submit') || input.includes('submission')) {
        botResponse = "You must submit a PDF abstract (mandatory) and can optionally include a prototype video and GitHub repository link through your participant dashboard.";
      } else if (input.includes('select') || input.includes('shortlist')) {
        botResponse = "Our AI system automatically selects the top one-third of all registered teams based on innovation, relevance to theme, and technical feasibility.";
      } else if (input.includes('certificate')) {
        botResponse = "Participation certificates are sent automatically to all shortlisted teams after the hackathon. Winners receive special certificates after the final results announcement.";
      }
      
      setChatMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 1000);
    
    setChatInput('');
  };
  
  const [rulesAcknowledged, setRulesAcknowledged] = useState(false);
  
  const handleAcknowledgeRules = () => {
    setRulesAcknowledged(true);
    toast({
      title: "Rules Acknowledged",
      description: "You have successfully acknowledged the hackathon rules.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 animated-gradient opacity-10 dark:opacity-20" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Hackathon Information</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Learn everything you need to know about the upcoming AI Innovation Hackathon,
                including rules, deadlines, and evaluation criteria.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="rounded-full" asChild>
                  <a href="#rules">
                    Rules & Guidelines
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href="#timeline">
                    Timeline
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href="#evaluation">
                    Evaluation Criteria
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href="#faq">
                    FAQs
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Rules Section */}
        <section id="rules" className="py-16 bg-secondary/50 dark:bg-hacktrack-gray-dark/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Rules & Guidelines</h2>
              
              <div className="glass-card p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Participation Rules</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Teams must consist of 1-4 members, with one designated team leader.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>All team members must be registered with their complete details before the registration deadline.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Each participant can only be part of one team.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Teams must submit a PDF abstract (mandatory) describing their project.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Optional submissions include a prototype video and GitHub repository link.</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass-card p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Hackathon Theme</h3>
                <p className="text-muted-foreground mb-4">
                  This hackathon focuses on "AI Solutions for Sustainable Development." Projects should address one or more of the following sub-themes:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Climate Change Mitigation & Adaptation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Smart & Sustainable Cities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Sustainable Agriculture & Food Security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Clean Energy Access & Efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hacktrack-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>AI for Health & Well-being</span>
                  </li>
                </ul>
              </div>
              
              {!rulesAcknowledged ? (
                <div className="text-center">
                  <Button onClick={handleAcknowledgeRules} className="rounded-full px-6">
                    I Acknowledge the Rules
                  </Button>
                </div>
              ) : (
                <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-green-800 dark:text-green-300 font-medium">Rules successfully acknowledged!</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section id="timeline" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Event Timeline</h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:translate-x-[-0.5px]"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  <div className="relative flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                      <div className="glass-card p-6 inline-block md:ml-auto">
                        <h3 className="font-semibold text-lg mb-1">Registration Opens</h3>
                        <p className="text-muted-foreground">September 15, 2023</p>
                        <p className="mt-2 text-sm">Team registration begins on the platform.</p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-hacktrack-blue rounded-full border-4 border-background transform md:translate-x-[-50%] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">1</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-hacktrack-blue rounded-full border-4 border-background transform md:translate-x-[-50%] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">2</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                      <div className="glass-card p-6 inline-block">
                        <h3 className="font-semibold text-lg mb-1">Registration Deadline</h3>
                        <p className="text-muted-foreground">October 15, 2023</p>
                        <p className="mt-2 text-sm">Last day to register your team. No new registrations allowed after this date.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                      <div className="glass-card p-6 inline-block md:ml-auto">
                        <h3 className="font-semibold text-lg mb-1">Submission Deadline</h3>
                        <p className="text-muted-foreground">October 30, 2023</p>
                        <p className="mt-2 text-sm">Final day to submit your project abstract, prototype video, and GitHub repository.</p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-hacktrack-blue rounded-full border-4 border-background transform md:translate-x-[-50%] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">3</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-hacktrack-blue rounded-full border-4 border-background transform md:translate-x-[-50%] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">4</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                      <div className="glass-card p-6 inline-block">
                        <h3 className="font-semibold text-lg mb-1">AI Selection Process</h3>
                        <p className="text-muted-foreground">November 1-5, 2023</p>
                        <p className="mt-2 text-sm">AI evaluates and ranks all submissions to select the top one-third of teams.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                      <div className="glass-card p-6 inline-block md:ml-auto">
                        <h3 className="font-semibold text-lg mb-1">Results Announcement</h3>
                        <p className="text-muted-foreground">November 10, 2023</p>
                        <p className="mt-2 text-sm">Final winners announced by the admin team.</p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-hacktrack-blue rounded-full border-4 border-background transform md:translate-x-[-50%] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">5</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Evaluation Criteria Section */}
        <section id="evaluation" className="py-16 bg-secondary/50 dark:bg-hacktrack-gray-dark/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">AI Evaluation Criteria</h2>
              
              <div className="glass-card p-8 mb-6">
                <h3 className="text-xl font-semibold mb-4">How Our AI Evaluates Your Project</h3>
                <p className="text-muted-foreground mb-6">
                  Our advanced AI system analyzes your submission using the following criteria to determine the most innovative and promising projects:
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-hacktrack-blue/10 rounded-full p-1 mr-2">
                        <span className="bg-hacktrack-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      </div>
                      Relevance to Hackathon Theme (25%)
                    </h4>
                    <p className="text-sm text-muted-foreground pl-10">
                      How well your project addresses the hackathon's theme and selected sub-themes. The AI analyzes keywords and context in your abstract.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-hacktrack-blue/10 rounded-full p-1 mr-2">
                        <span className="bg-hacktrack-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      </div>
                      Innovation & Uniqueness (25%)
                    </h4>
                    <p className="text-sm text-muted-foreground pl-10">
                      The originality of your solution and its differentiation from existing approaches. The AI compares your project to a database of known solutions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-hacktrack-blue/10 rounded-full p-1 mr-2">
                        <span className="bg-hacktrack-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                      </div>
                      Technical Feasibility (20%)
                    </h4>
                    <p className="text-sm text-muted-foreground pl-10">
                      Whether your solution is technically viable and can be implemented with current technology. The AI evaluates the technical descriptions and GitHub repository (if provided).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-hacktrack-blue/10 rounded-full p-1 mr-2">
                        <span className="bg-hacktrack-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                      </div>
                      Implementation & Execution (20%)
                    </h4>
                    <p className="text-sm text-muted-foreground pl-10">
                      The quality of your prototype, GitHub repository, and overall implementation. The AI analyzes code quality, organization, and execution if provided.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-hacktrack-blue/10 rounded-full p-1 mr-2">
                        <span className="bg-hacktrack-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
                      </div>
                      Clarity of Presentation (10%)
                    </h4>
                    <p className="text-sm text-muted-foreground pl-10">
                      How clearly your abstract and supporting materials communicate your idea. The AI evaluates the structure, readability, and comprehensiveness of your submissions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-4">Dynamic Shortlisting Process</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI system automatically selects exactly one-third of all registered teams to be shortlisted based on the combined scores across all evaluation criteria.
                </p>
                <div className="bg-hacktrack-blue/10 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Example:</strong> If 120 teams register and submit their projects, the AI will select the top 40 teams based on their overall scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="glass-card overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6">
                        <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                        <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="p-6 pt-0 border-t border-border/50">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Chatbot Section */}
        <section className="py-16 bg-secondary/50 dark:bg-hacktrack-gray-dark/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Still Have Questions?</h2>
              <p className="text-center text-muted-foreground mb-8">
                Ask our AI chatbot for quick answers about the hackathon, submission guidelines, or evaluation process.
              </p>
              
              <div className="glass-card p-6 rounded-xl h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                  {chatMessages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-hacktrack-blue text-white rounded-tr-none' 
                            : 'bg-secondary dark:bg-hacktrack-gray-dark rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                
                <Separator className="my-2" />
                
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!chatInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                This chatbot can answer common questions about the hackathon. For more specific inquiries, 
                please contact <a href="mailto:support@hacktrack.com" className="text-hacktrack-blue hover:underline">support@hacktrack.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HackathonInfo;
