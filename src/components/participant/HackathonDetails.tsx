
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Award, MapPin } from 'lucide-react';
import { useHackathon } from '@/context/HackathonContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const HackathonDetails: React.FC = () => {
  const { currentHackathon, results } = useHackathon();
  
  if (!currentHackathon) {
    return (
      <Card className="text-center p-6">
        <div className="py-6">
          <div className="mx-auto bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <CalendarIcon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Active Hackathon</h3>
          <p className="text-muted-foreground">There are no active hackathons at the moment. Please check back later.</p>
        </div>
      </Card>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };
  
  const startDate = new Date(currentHackathon.startDate);
  const endDate = new Date(currentHackathon.endDate);
  const submissionDeadline = new Date(currentHackathon.submissionDeadline);
  const now = new Date();
  
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progressPercentage = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  
  const deadlinePassed = now > submissionDeadline;
  const daysRemaining = Math.ceil((submissionDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{currentHackathon.title}</CardTitle>
              <Badge variant="outline">Active</Badge>
            </div>
            <CardDescription className="mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {currentHackathon.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-4">
          <div>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Hackathon Progress</span>
              <span className="text-xs text-muted-foreground">
                {startDate > now ? 'Starting soon' : deadlinePassed ? 'Submission closed' : `${daysRemaining} days remaining`}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Important Dates</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Start Date</span>
                    </div>
                    <span className="text-sm">{formatDate(currentHackathon.startDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">End Date</span>
                    </div>
                    <span className="text-sm">{formatDate(currentHackathon.endDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Submission Deadline</span>
                    </div>
                    <span className={`text-sm ${deadlinePassed ? 'text-destructive' : ''}`}>
                      {formatDate(currentHackathon.submissionDeadline)}
                    </span>
                  </div>
                </div>
              </div>
              
              {results && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Results</h3>
                  <div className="space-y-2">
                    {results.winners
                      .sort((a, b) => a.place - b.place)
                      .map((winner) => (
                        <div key={winner.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="text-sm">{winner.place}{winner.place === 1 ? 'st' : winner.place === 2 ? 'nd' : winner.place === 3 ? 'rd' : 'th'} Place</span>
                          </div>
                          <span className="text-sm font-medium">{winner.teamName}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Prizes</h3>
              <div className="space-y-2">
                {currentHackathon.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                    </Badge>
                    <span className="text-sm">{prize}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{currentHackathon.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={deadlinePassed}>
          {deadlinePassed ? 'Submission Closed' : 'Submit Project'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HackathonDetails;
