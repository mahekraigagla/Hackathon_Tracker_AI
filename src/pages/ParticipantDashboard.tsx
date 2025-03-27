import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, X, Upload, FileText, Github, Video, Info, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import HackathonDetails from '@/components/participant/HackathonDetails';

const submitReminder = (
  <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 my-4">
    <div className="flex gap-3">
      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
      <div>
        <h3 className="text-sm font-medium text-amber-800 dark:text-amber-500">Submission Deadline Approaching</h3>
        <p className="text-sm mt-1 text-amber-700 dark:text-amber-400">
          You have less than 24 hours to submit your project. Please ensure all required files are uploaded before the deadline.
        </p>
      </div>
    </div>
  </div>
);

const ParticipantDashboard = () => {
  const [activeTab, setActiveTab] = useState('project');
  const [uploading, setUploading] = useState(false);
  const [hasAbstractUploaded, setHasAbstractUploaded] = useState(false);
  const [hasVideoUploaded, setHasVideoUploaded] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  const uploadFile = (type: 'abstract' | 'video') => {
    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setUploading(false);
      
      if (type === 'abstract') {
        setHasAbstractUploaded(true);
      } else {
        setHasVideoUploaded(true);
      }
      
      toast({
        title: 'File uploaded',
        description: `Your ${type === 'abstract' ? 'abstract PDF' : 'demo video'} has been successfully uploaded.`,
      });
    }, 1500);
  };
  
  const handleSubmitProject = () => {
    if (!hasAbstractUploaded) {
      toast({
        title: 'Abstract required',
        description: 'You must upload an abstract PDF before submitting your project.',
        variant: 'destructive',
      });
      return;
    }
    
    // Success
    toast({
      title: 'Project submitted',
      description: 'Your project has been successfully submitted for review.',
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30 dark:bg-hacktrack-gray-dark/30">
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-medium">{user?.name || 'Team Leader'}</div>
              <div className="text-sm text-muted-foreground">Participant</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathon</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          {/* Project Tab */}
          <TabsContent value="project" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-2xl font-bold">Your Project</h2>
              <Badge variant="secondary">Draft</Badge>
            </div>
            
            {submitReminder}
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Upload your project abstract, demo video, and provide a link to your GitHub repository.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="abstract">Abstract PDF</Label>
                  <div className="flex items-center justify-between mt-2">
                    <Button variant="outline" disabled={uploading} onClick={() => uploadFile('abstract')}>
                      {uploading ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload PDF
                        </>
                      )}
                    </Button>
                    {hasAbstractUploaded && (
                      <Badge variant="success" className="gap-1.5">
                        <CheckCircle className="h-3 w-3" />
                        Uploaded
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="video">Demo Video (Optional)</Label>
                  <div className="flex items-center justify-between mt-2">
                    <Button variant="outline" disabled={uploading} onClick={() => uploadFile('video')}>
                      {uploading ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Video
                        </>
                      )}
                    </Button>
                    {hasVideoUploaded && (
                      <Badge variant="success" className="gap-1.5">
                        <CheckCircle className="h-3 w-3" />
                        Uploaded
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="github">GitHub Repository Link</Label>
                  <Input 
                    type="url" 
                    id="github" 
                    placeholder="https://github.com/your-repo" 
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project and its features" 
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitProject}>Submit Project</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Hackathon Tab */}
          <TabsContent value="hackathon" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Current Hackathon</h2>
            <HackathonDetails />
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-2xl font-bold">Your Team</h2>
              <Badge variant="secondary">3 Members</Badge>
            </div>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Team Innovators</CardTitle>
                <CardDescription>
                  View your team members and their roles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="Team Leader" />
                      <AvatarFallback>TL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Team Leader</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/steventey.png" alt="Developer" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Jane Smith</p>
                      <p className="text-xs text-muted-foreground">Developer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/sidmohanty92.png" alt="Designer" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Bob Johnson</p>
                      <p className="text-xs text-muted-foreground">Designer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Info className="h-4 w-4 mr-2" />
                  View Team Details
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ParticipantDashboard;
