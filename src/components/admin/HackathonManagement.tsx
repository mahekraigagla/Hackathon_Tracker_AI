
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Plus, Download, File, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useHackathon } from '@/context/HackathonContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HackathonManagement: React.FC = () => {
  const { hackathons } = useHackathon();
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };
  
  const handleDownloadPDF = (teamId: string) => {
    // In a real app, this would fetch and download the PDF from a server
    console.log(`Downloading PDF for team ${teamId}`);
    alert(`In a real app, this would download the PDF for team ${teamId}`);
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
                    {/* Mock team submissions - in a real app, these would be fetched from the server */}
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                      <div>
                        <div className="font-medium">Innovators</div>
                        <div className="text-sm text-muted-foreground">Submitted on Oct 28, 2023</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadPDF('1')} className="gap-2">
                        <File className="h-4 w-4" />
                        Abstract PDF
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                      <div>
                        <div className="font-medium">Tech Wizards</div>
                        <div className="text-sm text-muted-foreground">Submitted on Oct 27, 2023</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadPDF('2')} className="gap-2">
                        <File className="h-4 w-4" />
                        Abstract PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between">
                  <Button variant="outline">Edit Details</Button>
                  <Button variant={hackathon.isActive ? "destructive" : "default"}>
                    {hackathon.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
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
