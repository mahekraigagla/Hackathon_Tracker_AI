
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HostEvent: React.FC = () => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <CalendarPlus className="h-5 w-5 text-primary" />
          Host a Hackathon
        </CardTitle>
        <CardDescription>Create and manage your own hackathon events</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          HackTrack provides a complete platform for organizing and managing hackathons. 
          From registration to submission evaluation, our tools make it easy to run a successful event.
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-sm">Customizable registration forms</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-sm">Project submission management</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-sm">AI-powered evaluation tools</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-sm">Automated certificate generation</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/login?role=admin" className="w-full">
          <Button className="w-full gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HostEvent;
