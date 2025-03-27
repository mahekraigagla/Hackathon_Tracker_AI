
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, X, Upload, FileText, GitHub, Video, Info, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';

// Submission status types
type SubmissionStatus = 'not_started' | 'in_progress' | 'submitted' | 'under_review' | 'shortlisted' | 'not_selected';

const statusInfo = {
  not_started: {
    label: 'Not Started',
    description: 'Your team has not started the submission process yet.',
    color: 'text-muted-foreground',
    icon: Clock,
  },
  in_progress: {
    label: 'In Progress',
    description: 'Your submission is being prepared but not yet submitted.',
    color: 'text-yellow-500',
    icon: Clock,
  },
  submitted: {
    label: 'Submitted',
    description: 'Your submission has been received and is awaiting review.',
    color: 'text-blue-500',
    icon: CheckCircle,
  },
  under_review: {
    label: 'Under Review',
    description: 'Your submission is currently being evaluated by our AI system.',
    color: 'text-orange-500',
    icon: Info,
  },
  shortlisted: {
    label: 'Shortlisted',
    description: 'Congratulations! Your team has been shortlisted.',
    color: 'text-green-500',
    icon: CheckCircle,
  },
  not_selected: {
    label: 'Not Selected',
    description: 'Unfortunately, your team was not selected for the final round.',
    color: 'text-red-500',
    icon: X,
  },
};

const ParticipantDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('submission');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('in_progress');
  const [teamName, setTeamName] = useState('Innovators');
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Team Member 1', email: 'member1@example.com', role: 'Team Leader' },
    { name: 'Team Member 2', email: 'member2@example.com', role: 'Developer' },
    { name: 'Team Member 3', email: 'member3@example.com', role: 'Designer' },
  ]);
  
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [prototypeVideo, setPrototypeVideo] = useState<File | null>(null);
  const [githubLink, setGithubLink] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  
  // Mock deadlines
  const registrationDeadline = new Date('2023-10-15T23:59:59');
  const submissionDeadline = new Date('2023-10-30T23:59:59');
  const now = new Date();
  
  // Calculate time remaining
  const submissionTimeRemaining = submissionDeadline.getTime() - now.getTime();
  const submissionDaysRemaining = Math.floor(submissionTimeRemaining / (1000 * 60 * 60 * 24));
  const submissionHoursRemaining = Math.floor((submissionTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  // Progress calculation
  const registrationProgress = 100; // Assume registration is complete
  let submissionProgress = 0;
  if (projectDescription) submissionProgress += 25;
  if (abstractFile) submissionProgress += 50;
  if (prototypeVideo || githubLink) submissionProgress += 25;
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmitProject = () => {
    if (!abstractFile) {
      toast({
        title: 'Required field missing',
        description: 'Please upload your abstract PDF before submitting.',
        variant: 'destructive',
      });
      return;
    }
    
    // Simulate submission
    toast({
      title: 'Submission successful!',
      description: 'Your project has been submitted for evaluation.',
    });
    
    // Update status
    setSubmissionStatus('submitted');
    
    // Simulate status changes (for demo purposes)
    setTimeout(() => {
      setSubmissionStatus('under_review');
      
      setTimeout(() => {
        // Randomly select between shortlisted and not selected for demo purposes
        const isShortlisted = Math.random() > 0.5;
        setSubmissionStatus(isShortlisted ? 'shortlisted' : 'not_selected');
      }, 5000);
    }, 3000);
  };
  
  const downloadCertificate = () => {
    toast({
      title: 'Certificate Downloaded',
      description: 'Your participation certificate has been downloaded successfully.',
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
              <div className="text-sm text-muted-foreground">{teamName}</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Status Card */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Submission Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className={`${statusInfo[submissionStatus].color} mt-1`}>
                      <statusInfo[submissionStatus].icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`font-medium ${statusInfo[submissionStatus].color}`}>
                        {statusInfo[submissionStatus].label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {statusInfo[submissionStatus].description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Deadlines Card */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Important Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <div className="text-sm font-medium">Registration</div>
                      <div className="text-sm text-muted-foreground">
                        {registrationDeadline.toLocaleDateString()}
                      </div>
                    </div>
                    <Progress value={registrationProgress} className="h-2" />
                    <div className="mt-1 text-xs text-right text-green-500">Complete</div>
                  </div>
                  
                  <div>
                    <div className="mb-2 flex justify-between">
                      <div className="text-sm font-medium">Submission</div>
                      <div className="text-sm text-muted-foreground">
                        {submissionDeadline.toLocaleDateString()}
                      </div>
                    </div>
                    <Progress value={submissionProgress} className="h-2" />
                    <div className="mt-1 text-xs text-right flex justify-between">
                      <span className="text-muted-foreground">{submissionProgress}% complete</span>
                      <span className={submitReminder}>
                        {submissionDaysRemaining > 0 
                          ? `${submissionDaysRemaining}d ${submissionHoursRemaining}h remaining` 
                          : submissionHoursRemaining > 0
                            ? `${submissionHoursRemaining}h remaining`
                            : 'Deadline passed'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Info Card */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Team Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Team Name</Label>
                    <div className="font-medium">{teamName}</div>
                  </div>
                  
                  <div>
                    <Label className="text-xs text-muted-foreground">Team Members</Label>
                    <div className="space-y-2">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground flex justify-between">
                            <span>{member.email}</span>
                            <span>{member.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="submission">Submission</TabsTrigger>
                <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
                <TabsTrigger value="results">Results & Certificates</TabsTrigger>
              </TabsList>
              
              {/* Submission Tab */}
              <TabsContent value="submission" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Project Submission</CardTitle>
                    <CardDescription>
                      Submit your project abstract and optional supporting materials for the hackathon.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Project Description</Label>
                      <Textarea 
                        id="project-description" 
                        placeholder="Briefly describe your project and how it addresses the hackathon theme..."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-hacktrack-blue" />
                          <span>Abstract (PDF)</span>
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors">
                          <Input
                            type="file"
                            id="abstract-upload"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, setAbstractFile)}
                          />
                          <Label htmlFor="abstract-upload" className="cursor-pointer w-full h-full flex flex-col items-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            {abstractFile ? (
                              <div className="text-sm font-medium">
                                {abstractFile.name}
                                <div className="text-xs text-green-500">Uploaded</div>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">
                                <span className="font-medium">Click to upload</span> or drag and drop
                                <p className="text-xs">PDF (max. 10MB)</p>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center">
                          <Video className="h-4 w-4 mr-1 text-hacktrack-blue" />
                          <span>Prototype Video (Optional)</span>
                        </Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors">
                          <Input
                            type="file"
                            id="video-upload"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, setPrototypeVideo)}
                          />
                          <Label htmlFor="video-upload" className="cursor-pointer w-full h-full flex flex-col items-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            {prototypeVideo ? (
                              <div className="text-sm font-medium">
                                {prototypeVideo.name}
                                <div className="text-xs text-green-500">Uploaded</div>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">
                                <span className="font-medium">Click to upload</span> or drag and drop
                                <p className="text-xs">MP4, MOV, AVI (max. 100MB)</p>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center" htmlFor="github-link">
                        <GitHub className="h-4 w-4 mr-1 text-hacktrack-blue" />
                        <span>GitHub Repository Link (Optional)</span>
                      </Label>
                      <Input
                        id="github-link"
                        placeholder="https://github.com/yourusername/your-repo"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm">
                      <span className="text-red-500">*</span> Required field
                    </div>
                    <Button 
                      onClick={handleSubmitProject}
                      disabled={submissionStatus !== 'in_progress' && submissionStatus !== 'not_started'}
                    >
                      Submit Project
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Submission Requirements Card */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Submission Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium">Important Information</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                          <li>Your abstract PDF is a required document that outlines your project.</li>
                          <li>The prototype video and GitHub repository are optional but recommended.</li>
                          <li>All submissions are final after the deadline. No modifications will be accepted.</li>
                          <li>Your submission will be evaluated by our AI system based on the criteria outlined in the hackathon information page.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* AI Feedback Tab */}
              <TabsContent value="feedback" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>AI Evaluation Feedback</CardTitle>
                    <CardDescription>
                      {submissionStatus === 'not_started' || submissionStatus === 'in_progress'
                        ? 'Submit your project to receive AI feedback.'
                        : submissionStatus === 'submitted' || submissionStatus === 'under_review'
                        ? 'Your submission is being evaluated. Feedback will be available soon.'
                        : 'Detailed AI feedback on your project submission.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(submissionStatus === 'not_started' || submissionStatus === 'in_progress') && (
                      <div className="text-center py-16">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Feedback Available Yet</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Please complete your project submission to receive detailed AI feedback on your project.
                        </p>
                      </div>
                    )}
                    
                    {(submissionStatus === 'submitted' || submissionStatus === 'under_review') && (
                      <div className="text-center py-16">
                        <div className="animate-pulse-slow">
                          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Evaluation in Progress</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Our AI system is currently analyzing your submission. Feedback will be available once the evaluation is complete.
                        </p>
                      </div>
                    )}
                    
                    {submissionStatus === 'shortlisted' && (
                      <div className="space-y-6">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-green-700 dark:text-green-300">Congratulations! Your team has been shortlisted.</h3>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Your project demonstrated exceptional quality and innovation. Here's detailed feedback from our AI evaluation.
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Overall Score: 87/100</h4>
                            <Progress value={87} className="h-2 mt-2" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Theme Relevance</span>
                                <span className="text-sm font-medium">92/100</span>
                              </div>
                              <Progress value={92} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                Your project strongly aligns with the hackathon theme and addresses key challenges in the selected area.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Innovation</span>
                                <span className="text-sm font-medium">88/100</span>
                              </div>
                              <Progress value={88} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                The solution demonstrates original thinking and a novel approach to the problem statement.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Technical Feasibility</span>
                                <span className="text-sm font-medium">84/100</span>
                              </div>
                              <Progress value={84} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                The proposed implementation is technically viable with the current technology stack.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Execution Quality</span>
                                <span className="text-sm font-medium">85/100</span>
                              </div>
                              <Progress value={85} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                The submitted prototype and code show good implementation quality and attention to detail.
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <h4 className="font-medium mb-2">Detailed Feedback</h4>
                            <p className="text-sm text-muted-foreground">
                              Your project "AI-Powered Smart City Solution" shows exceptional promise in addressing urban sustainability challenges. The abstract clearly articulates the problem statement and proposed solution.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Strengths include innovative use of machine learning algorithms for traffic optimization and the comprehensive approach to energy efficiency. The prototype demonstrates practical application with clean, well-structured code.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Areas for improvement include more detailed implementation plans for scaling the solution and addressing potential privacy concerns with data collection.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {submissionStatus === 'not_selected' && (
                      <div className="space-y-6">
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3">
                          <Info className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-red-700 dark:text-red-300">Your team was not selected for the final round.</h3>
                            <p className="text-sm text-red-600 dark:text-red-400">
                              While your project showed merit, it didn't rank in the top one-third of submissions. Here's feedback to help improve future projects.
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Overall Score: 68/100</h4>
                            <Progress value={68} className="h-2 mt-2" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Theme Relevance</span>
                                <span className="text-sm font-medium">72/100</span>
                              </div>
                              <Progress value={72} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                Your project addresses the theme but could more directly tackle the core challenges.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Innovation</span>
                                <span className="text-sm font-medium">65/100</span>
                              </div>
                              <Progress value={65} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                The approach shows some innovation but has similarities to existing solutions.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Technical Feasibility</span>
                                <span className="text-sm font-medium">74/100</span>
                              </div>
                              <Progress value={74} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                The solution is technically feasible but may face implementation challenges.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Execution Quality</span>
                                <span className="text-sm font-medium">62/100</span>
                              </div>
                              <Progress value={62} className="h-1.5" />
                              <p className="text-xs text-muted-foreground">
                                The implementation would benefit from more detailed development and testing.
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <h4 className="font-medium mb-2">Detailed Feedback</h4>
                            <p className="text-sm text-muted-foreground">
                              Your project showed promise but faced strong competition. The abstract presented a reasonable solution, but lacked specific details on implementation and potential impact.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Strengths include good problem identification and technical feasibility. However, the innovation factor scored lower as similar approaches exist in the market.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              For future submissions, consider focusing more on unique aspects of your solution, providing more detailed technical specifications, and including stronger evidence of potential effectiveness through prototyping or simulation data.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Results Tab */}
              <TabsContent value="results" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Hackathon Results</CardTitle>
                    <CardDescription>
                      View the final results and download your certificates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(submissionStatus === 'not_started' || submissionStatus === 'in_progress' || submissionStatus === 'submitted' || submissionStatus === 'under_review') && (
                      <div className="text-center py-16">
                        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Results Not Available Yet</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Hackathon results will be available after the evaluation process is complete.
                        </p>
                      </div>
                    )}
                    
                    {submissionStatus === 'shortlisted' && (
                      <div className="space-y-6">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-green-700 dark:text-green-300">Congratulations on being shortlisted!</h3>
                              <p className="text-sm text-green-600 dark:text-green-400">
                                Your team has been shortlisted for the final round of the hackathon.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Final Results</h4>
                          <div className="text-sm text-muted-foreground mb-4">
                            The judges are currently evaluating all shortlisted teams. Final results will be announced on November 10, 2023.
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Your Certificate</h4>
                          <Button onClick={downloadCertificate} className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Participation Certificate
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {submissionStatus === 'not_selected' && (
                      <div className="space-y-6">
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-orange-700 dark:text-orange-300">Thank you for participating!</h3>
                              <p className="text-sm text-orange-600 dark:text-orange-400">
                                While your team wasn't selected this time, we appreciate your hard work and innovative ideas.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Final Results</h4>
                          <div className="text-sm text-muted-foreground mb-4">
                            The final results with the winners will be announced on November 10, 2023.
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Future Opportunities</h4>
                          <p className="text-sm text-muted-foreground">
                            We encourage you to take the feedback provided and continue developing your project. There will be more hackathons and opportunities in the future!
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Announcements Card */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b border-border pb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">Finalists Announced!</h4>
                          <span className="text-xs text-muted-foreground">Nov 5, 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          The AI selection process has completed. All teams have been notified of their status. Final judging will take place on November 8-9.
                        </p>
                      </div>
                      
                      <div className="border-b border-border pb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">Submission Deadline Reminder</h4>
                          <span className="text-xs text-muted-foreground">Oct 25, 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This is a reminder that all submissions must be completed by October 30, 2023, at 11:59 PM. No late submissions will be accepted.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">Welcome to the Hackathon!</h4>
                          <span className="text-xs text-muted-foreground">Sept 15, 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Registration is now open for the AI Innovation Hackathon. We're excited to see your creative solutions to real-world problems!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

const submitReminder = now > submissionDeadline 
  ? 'text-red-500' 
  : submissionDaysRemaining <= 2 
    ? 'text-orange-500' 
    : 'text-muted-foreground';

export default ParticipantDashboard;
