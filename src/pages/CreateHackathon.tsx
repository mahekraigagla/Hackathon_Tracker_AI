
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, PlusCircle, Save } from 'lucide-react';
import { useHackathon } from '@/context/HackathonContext';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const CreateHackathon: React.FC = () => {
  const { addHackathon } = useHackathon();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [registrationDeadline, setRegistrationDeadline] = useState<Date | undefined>(undefined);
  const [submissionDeadline, setSubmissionDeadline] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [prizes, setPrizes] = useState(['', '', '']);
  
  const handlePrizeChange = (index: number, value: string) => {
    const updatedPrizes = [...prizes];
    updatedPrizes[index] = value;
    setPrizes(updatedPrizes);
  };
  
  const handleAddPrize = () => {
    setPrizes([...prizes, '']);
  };
  
  const handleRemovePrize = (index: number) => {
    const updatedPrizes = prizes.filter((_, i) => i !== index);
    setPrizes(updatedPrizes);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !startDate || !endDate || !registrationDeadline || !submissionDeadline || !location) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const nonEmptyPrizes = prizes.filter(prize => prize.trim() !== '');
    
    addHackathon({
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      registrationDeadline: registrationDeadline.toISOString(),
      submissionDeadline: submissionDeadline.toISOString(),
      location,
      prizes: nonEmptyPrizes,
      isActive: true,
    });
    
    toast({
      title: "Hackathon created",
      description: "The hackathon has been successfully created and published.",
    });
    
    navigate('/admin-dashboard');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30 dark:bg-hacktrack-gray-dark/30">
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-medium">{user?.name || 'Admin User'}</div>
              <div className="text-sm text-muted-foreground">Hackathon Organizer</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Create New Hackathon</h1>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin-dashboard')}>
              Back to Dashboard
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Hackathon Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Hackathon Title</Label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      placeholder="e.g., AI for Good Hackathon"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Describe the hackathon's purpose and theme"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="startDate"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="endDate"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="registrationDeadline"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !registrationDeadline && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {registrationDeadline ? format(registrationDeadline, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={registrationDeadline}
                            onSelect={setRegistrationDeadline}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="submissionDeadline">Submission Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="submissionDeadline"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !submissionDeadline && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {submissionDeadline ? format(submissionDeadline, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={submissionDeadline}
                            onSelect={setSubmissionDeadline}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      placeholder="e.g., Virtual or University Campus"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Prizes</Label>
                    <div className="space-y-2">
                      {prizes.map((prize, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input 
                            value={prize} 
                            onChange={(e) => handlePrizeChange(index, e.target.value)} 
                            placeholder={`Prize for ${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} place`}
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemovePrize(index)}
                            disabled={prizes.length <= 1}
                          >
                            <PlusCircle className="h-4 w-4 rotate-45" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddPrize}
                        className="mt-2"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Prize
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit} type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Create Hackathon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateHackathon;
