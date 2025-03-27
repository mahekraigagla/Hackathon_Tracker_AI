
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Plus, Download, File, PlusCircle, CheckCircle, Award } from 'lucide-react';
import { format } from 'date-fns';
import { useHackathon } from '@/context/HackathonContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Mock team submissions data
const mockTeamSubmissions = [
  {
    id: '1',
    teamName: 'Innovators',
    submitDate: '2023-10-28',
    abstract: 'innovators_abstract.pdf',
    status: 'submitted'
  },
  {
    id: '2',
    teamName: 'Tech Wizards',
    submitDate: '2023-10-27',
    abstract: 'tech_wizards_abstract.pdf',
    status: 'submitted'
  }
];

const HackathonManagement: React.FC = () => {
  const { hackathons, updateHackathon, publishResults } = useHackathon();
  const [isPublishingResults, setIsPublishingResults] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null);
  const [winners, setWinners] = useState([
    { id: '', teamName: '', place: 1, projectTitle: '', projectDescription: '' },
    { id: '', teamName: '', place: 2, projectTitle: '', projectDescription: '' },
    { id: '', teamName: '', place: 3, projectTitle: '', projectDescription: '' }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };
  
  const handleDownloadPDF = (teamId: string, fileName: string) => {
    // In a real app, this would fetch and download the PDF from a server
    console.log(`Downloading PDF ${fileName} for team ${teamId}`);
    toast({
      title: 'Download Started',
      description: `Downloading abstract for ${fileName}`,
    });
  };

  const handleToggleHackathonStatus = (hackathon: any) => {
    updateHackathon(hackathon.id, { isActive: !hackathon.isActive });
    toast({
      title: hackathon.isActive ? 'Hackathon Deactivated' : 'Hackathon Activated',
      description: `${hackathon.title} has been ${hackathon.isActive ? 'deactivated' : 'activated'}.`,
    });
  };

  const handlePublishResults = () => {
    if (!selectedHackathon) return;
    
    // Validate winners data
    const isValid = winners.every(winner => 
      winner.teamName.trim() !== '' && 
      winner.projectTitle.trim() !== ''
    );
    
    if (!isValid) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields for the winners.',
        variant: 'destructive'
      });
      return;
    }

    setIsPublishingResults(true);
    
    // Simulate API call
    setTimeout(() => {
      publishResults({
        hackathonId: selectedHackathon,
        winners: winners
      });
      
      setIsPublishingResults(false);
      setSelectedHackathon(null);
      
      toast({
        title: 'Results Published',
        description: 'The hackathon results have been published successfully.',
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Hackathon Management</h2>
          <p className="text-muted-foreground">Create and manage hackathon events</p>
        </div>
        
        <Button onClick={() => navigate('/create-hackathon')} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Hackathon
        </Button>
      </div>
      
      {hackathons.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id} className="border-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{hackathon.title}</CardTitle>
                      {hackathon.isActive && <Badge>Active</Badge>}
                    </div>
                    <CardDescription className="mt-1">{hackathon.location}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Dates</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Start Date</span>
                        </div>
                        <span>{formatDate(hackathon.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>End Date</span>
                        </div>
                        <span>{formatDate(hackathon.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Registration Deadline</span>
                        </div>
                        <span>{formatDate(hackathon.registrationDeadline)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Submission Deadline</span>
                        </div>
                        <span>{formatDate(hackathon.submissionDeadline)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Prizes</h3>
                    <div className="space-y-2">
                      {hackathon.prizes.map((prize, index) => (
                        <div key={index} className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                          </Badge>
                          <span>{prize}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm">{hackathon.description}</p>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Team Submissions</h3>
                  <div className="space-y-4">
                    {mockTeamSubmissions.map(team => (
                      <div key={team.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                        <div>
                          <div className="font-medium">{team.teamName}</div>
                          <div className="text-sm text-muted-foreground">Submitted on {team.submitDate}</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownloadPDF(team.id, team.abstract)} 
                          className="gap-2"
                        >
                          <File className="h-4 w-4" />
                          Abstract PDF
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4 justify-between">
                <div className="flex gap-4">
                  <Button variant="outline">Edit Details</Button>
                  <Button 
                    variant={hackathon.isActive ? "destructive" : "default"}
                    onClick={() => handleToggleHackathonStatus(hackathon)}
                  >
                    {hackathon.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => setSelectedHackathon(hackathon.id)}
                    >
                      <Award className="h-4 w-4" />
                      Publish Results
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Publish Hackathon Results</DialogTitle>
                      <DialogDescription>
                        Enter the winners of "{hackathon.title}". This information will be visible to all participants.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      {[1, 2, 3].map((place, index) => (
                        <div key={place} className="space-y-2">
                          <div className="flex items-center mb-2">
                            <Badge className="mr-2">
                              {place}{place === 1 ? 'st' : place === 2 ? 'nd' : 'rd'} Place
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <Label htmlFor={`team-${place}`}>Team Name</Label>
                              <Input 
                                id={`team-${place}`}
                                value={winners[index].teamName}
                                onChange={(e) => {
                                  const newWinners = [...winners];
                                  newWinners[index].teamName = e.target.value;
                                  newWinners[index].id = `winner-${place}`;
                                  setWinners(newWinners);
                                }}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`project-${place}`}>Project Title</Label>
                              <Input 
                                id={`project-${place}`}
                                value={winners[index].projectTitle}
                                onChange={(e) => {
                                  const newWinners = [...winners];
                                  newWinners[index].projectTitle = e.target.value;
                                  setWinners(newWinners);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={handlePublishResults}
                        disabled={isPublishingResults}
                      >
                        {isPublishingResults ? 'Publishing...' : 'Publish Results'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-6">
          <div className="py-6">
            <div className="mx-auto bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Hackathons Yet</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first hackathon event.</p>
            <Button onClick={() => navigate('/create-hackathon')} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Hackathon
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HackathonManagement;
