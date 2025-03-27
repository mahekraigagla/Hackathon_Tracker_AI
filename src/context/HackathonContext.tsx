import React, { createContext, useContext, useState, useEffect } from 'react';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  submissionDeadline: string;
  location: string;
  prizes: string[];
  isActive: boolean;
}

interface HackathonResults {
  hackathonId: string;
  winners: Array<{
    id: string;
    teamName: string;
    place: number;
    projectTitle: string;
    projectDescription: string;
  }>;
  announcementDate: string;
}

interface HackathonContextType {
  hackathons: Hackathon[];
  currentHackathon: Hackathon | null;
  results: HackathonResults | null;
  addHackathon: (hackathon: Omit<Hackathon, 'id'>) => void;
  updateHackathon: (id: string, hackathon: Partial<Hackathon>) => void;
  publishResults: (results: Omit<HackathonResults, 'announcementDate'>) => void;
}

const HackathonContext = createContext<HackathonContextType | undefined>(undefined);

// Mock data for hackathons
const initialHackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI for Good Hackathon',
    description: 'Develop innovative AI solutions that address real-world challenges in healthcare, education, or sustainability.',
    startDate: '2023-12-01',
    endDate: '2023-12-10',
    registrationDeadline: '2023-11-20',
    submissionDeadline: '2023-12-10',
    location: 'Virtual',
    prizes: ['$5,000 for 1st Place', '$2,000 for 2nd Place', '$1,000 for 3rd Place'],
    isActive: true,
  }
];

export const useHackathon = () => {
  const context = useContext(HackathonContext);
  if (context === undefined) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
};

export const HackathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hackathons, setHackathons] = useState<Hackathon[]>(() => {
    // Try to load from localStorage
    const savedHackathons = localStorage.getItem('hacktrack_hackathons');
    return savedHackathons ? JSON.parse(savedHackathons) : initialHackathons;
  });
  
  const [results, setResults] = useState<HackathonResults | null>(() => {
    // Try to load from localStorage
    const savedResults = localStorage.getItem('hacktrack_results');
    return savedResults ? JSON.parse(savedResults) : null;
  });

  // Always keep the most recent active hackathon as the current one
  const currentHackathon = hackathons.find(hackathon => hackathon.isActive) || null;

  // Save to localStorage whenever hackathons change
  useEffect(() => {
    localStorage.setItem('hacktrack_hackathons', JSON.stringify(hackathons));
  }, [hackathons]);

  // Save to localStorage whenever results change
  useEffect(() => {
    if (results) {
      localStorage.setItem('hacktrack_results', JSON.stringify(results));
    }
  }, [results]);

  const addHackathon = (hackathon: Omit<Hackathon, 'id'>) => {
    const newHackathon = {
      ...hackathon,
      id: Date.now().toString(),
    };
    setHackathons(prev => [...prev, newHackathon]);
  };

  const updateHackathon = (id: string, hackathonUpdates: Partial<Hackathon>) => {
    setHackathons(prev => 
      prev.map(hackathon => 
        hackathon.id === id ? { ...hackathon, ...hackathonUpdates } : hackathon
      )
    );
  };

  const publishResults = (resultsData: Omit<HackathonResults, 'announcementDate'>) => {
    const newResults = {
      ...resultsData,
      announcementDate: new Date().toISOString(),
    };
    setResults(newResults);
  };

  const value = {
    hackathons,
    currentHackathon,
    results,
    addHackathon,
    updateHackathon,
    publishResults,
  };

  return <HackathonContext.Provider value={value}>{children}</HackathonContext.Provider>;
};
