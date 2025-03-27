import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, X, FileText, Download, Search, Filter, Edit, Users, Award, RefreshCw, Video, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for teams
interface TeamMember {
  name: string;
  email: string;
  role: string;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  abstract: string;
  hasVideo: boolean;
  hasGithub: boolean;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'not_selected' | 'winner';
  score: number;
  submissionDate: string;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Innovators',
    members: [
      { name: 'John Doe', email: 'john@example.com', role: 'Team Leader' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'Developer' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer' },
    ],
    abstract: 'AI-powered smart city solution for traffic optimization.',
    hasVideo: true,
    hasGithub: true,
    status: 'shortlisted',
    score: 87,
    submissionDate: '2023-10-28',
  },
  {
    id: '2',
    name: 'Tech Wizards',
    members: [
      { name: 'Alice Brown', email: 'alice@example.com', role: 'Team Leader' },
      { name: 'Charlie Davis', email: 'charlie@example.com', role: 'Developer' },
    ],
    abstract: 'Machine learning platform for sustainable agriculture.',
    hasVideo: true,
    hasGithub: false,
    status: 'shortlisted',
    score: 85,
    submissionDate: '2023-10-27',
  },
  {
    id: '3',
    name: 'Code Masters',
    members: [
      { name: 'Eve Wilson', email: 'eve@example.com', role: 'Team Leader' },
      { name: 'Frank Miller', email: 'frank@example.com', role: 'Designer' },
      { name: 'Grace Lee', email: 'grace@example.com', role: 'Developer' },
      { name: 'Henry Evans', email: 'henry@example.com', role: 'Developer' },
    ],
    abstract: 'AI-driven health monitoring system for elderly care.',
    hasVideo: false,
    hasGithub: true,
    status: 'not_selected',
    score: 65,
    submissionDate: '2023-10-30',
  },
  {
    id: '4',
    name: 'Data Pioneers',
    members: [
      { name: 'Ivy Chen', email: 'ivy@example.com', role: 'Team Leader' },
      { name: 'Jack Wang', email: 'jack@example.com', role: 'Developer' },
    ],
    abstract: 'Renewable energy optimization using predictive analytics.',
    hasVideo: true,
    hasGithub: true,
    status: 'shortlisted',
    score: 82,
    submissionDate: '2023-10-29',
  },
  {
    id: '5',
    name: 'Neural Network',
    members: [
      { name: 'Kelly Zhang', email: 'kelly@example.com', role: 'Team Leader' },
      { name: 'Liam Singh', email: 'liam@example.com', role: 'Developer' },
      { name: 'Mia Johnson', email: 'mia@example.com', role: 'Designer' },
    ],
    abstract: 'AI-powered water quality monitoring for smart cities.',
    hasVideo: false,
    hasGithub: true,
    status: 'not_selected',
    score: 68,
    submissionDate: '2023-10-26',
  },
  {
    id: '6',
    name: 'Algorithm Aces',
    members: [
      { name: 'Noah Brown', email: 'noah@example.com', role: 'Team Leader' },
      { name: 'Olivia Davis', email: 'olivia@example.com', role: 'Developer' },
      { name: 'Peter Wilson', email: 'peter@example.com', role: 'Developer' },
    ],
    abstract: 'Smart grid optimization using reinforcement learning.',
    hasVideo: true,
    hasGithub: false,
    status: 'shortlisted',
    score: 81,
    submissionDate: '2023-10-28',
  },
];

// Status badge component
interface StatusBadgeProps {
  status: Team['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    submitted: { label: 'Submitted', variant: 'outline' as const },
    under_review: { label: 'Under Review', variant: 'secondary' as const },
    shortlisted: { label: 'Shortlisted', variant: 'default' as const },
    not_selected: { label: 'Not Selected', variant: 'destructive' as const },
    winner: { label: 'Winner', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('teams');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [winners, setWinners] = useState<{ id: string; place: number }[]>([]);
  const [announcementSent, setAnnouncementSent] = useState(false);
  
  // Filter teams based on search term and status
  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const shortlistedTeams = mockTeams.filter(team => team.status === 'shortlisted')
    .sort((a, b) => b.score - a.score);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };
  
  const selectWinner = (teamId: string, place: number) => {
    // Remove existing team with this place
    const updatedWinners = winners.filter(winner => winner.place !== place);
    // Add new winner
    setWinners([...updatedWinners, { id: teamId, place }]);
    
    toast({
      title: `Selected ${place}${getOrdinalSuffix(place)} place winner`,
      description: `${mockTeams.find(team => team.id === teamId)?.name} has been marked as a winner.`,
    });
  };
  
  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };
  
  const announceWinners = () => {
    if (winners.length === 0) {
      toast({
        title: 'No winners selected',
        description: 'Please select at least one winner before announcing results.',
        variant: 'destructive',
      });
      return;
    }
    
    setAnnouncementSent(true);
    toast({
      title: 'Winners announced',
      description: 'The hackathon results have been announced and certificates will be sent automatically.',
    });
  };
  
  const sendCertificates = () => {
    toast({
      title: 'Certificates sent',
      description: 'Participation and winner certificates have been sent to all eligible teams.',
    });
  };
  
  const editTeamDetails = (teamId: string, updates: Partial<Team>) => {
    // In a real app, this would update the team in the database
    toast({
      title: 'Team details updated',
      description: 'The team information has been updated successfully.',
    });
  };
  
  // Stats calculations
  const totalTeams = mockTeams.length;
  const shortlistedCount = mockTeams.filter(team => team.status === 'shortlisted').length;
  const notSelectedCount = mockTeams.filter(team => team.status === 'not_selected').length;
  const hasVideoCount = mockTeams.filter(team => team.hasVideo).length;
  const hasGithubCount = mockTeams.filter(team => team.hasGithub).length;
  
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <h2 className="text-2xl font-bold">Registered Teams</h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teams..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="not_selected">Not Selected</option>
                  <option value="winner">Winners</option>
                </select>
              </div>
            </div>
            
            <div className="rounded-md border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Submission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.members.length} members</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Badge variant="outline" className="mr-1">PDF</Badge>
                            {team.hasVideo && <Badge variant="outline">Video</Badge>}
                            {team.hasGithub && <Badge variant="outline">GitHub</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={team.status} />
                        </TableCell>
                        <TableCell>{team.score}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleTeamSelect(team)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        No teams found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Team Details Modal */}
            {selectedTeam && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-background rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedTeam.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge status={selectedTeam.status} />
                          <span className="text-sm text-muted-foreground">
                            Submitted on {new Date(selectedTeam.submissionDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => setSelectedTeam(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Team Members</h4>
                          <div className="space-y-3">
                            {selectedTeam.members.map((member, index) => (
                              <div key={index} className="flex justify-between">
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-sm text-muted-foreground">{member.email}</div>
                                </div>
                                <div className="text-sm text-muted-foreground">{member.role}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Score Breakdown</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Overall Score</span>
                                <span className="font-medium">{selectedTeam.score}/100</span>
                              </div>
                              <Progress value={selectedTeam.score} className="h-2 mt-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Project Abstract</h4>
                          <div className="bg-secondary/50 p-3 rounded-md text-sm">
                            {selectedTeam.abstract}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Submission Materials</h4>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <FileText className="h-4 w-4 mr-2" />
                              Download Abstract PDF
                            </Button>
                            {selectedTeam.hasVideo && (
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Video className="h-4 w-4 mr-2" />
                                View Prototype Video
                              </Button>
                            )}
                            {selectedTeam.hasGithub && (
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Github className="h-4 w-4 mr-2" />
                                View GitHub Repository
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border flex justify-between">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Team Details
                      </Button>
                      <Button variant="default" size="sm" onClick={() => setSelectedTeam(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Final Results</h2>
                <p className="text-muted-foreground">Select winners and announce the final results</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="default" 
                  onClick={announceWinners} 
                  disabled={announcementSent || winners.length === 0}
                  className="gap-2"
                >
                  <Award className="h-4 w-4" />
                  Announce Winners
                </Button>
                <Button 
                  variant="outline" 
                  onClick={sendCertificates} 
                  disabled={!announcementSent}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Send Certificates
                </Button>
              </div>
            </div>
            
            {announcementSent ? (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Winners Announced</CardTitle>
                  <CardDescription>
                    The winners have been officially announced and notified.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {winners.sort((a, b) => a.place - b.place).map((winner) => {
                      const team = mockTeams.find(team => team.id === winner.id);
                      return (
                        <div key={winner.id} className="flex items-start gap-4">
                          <div className="bg-hacktrack-blue/10 rounded-full p-3 flex-shrink-0">
                            <Award className="h-6 w-6 text-hacktrack-blue" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg">{winner.place}{getOrdinalSuffix(winner.place)} Place</h3>
                              <Badge>Winner</Badge>
                            </div>
                            <p className="font-medium">{team?.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">{team?.abstract}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setAnnouncementSent(false)} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Edit Announcement
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Shortlisted Teams</CardTitle>
                    <CardDescription>
                      Select winners from the AI-shortlisted teams below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border shadow-sm overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Team Name</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead className="text-right">Select as Winner</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shortlistedTeams.map((team, index) => (
                            <TableRow key={team.id}>
                              <TableCell>#{index + 1}</TableCell>
                              <TableCell className="font-medium">{team.name}</TableCell>
                              <TableCell>{team.score}/100</TableCell>
                              <TableCell className="max-w-xs truncate">{team.abstract}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Button 
                                    variant={winners.some(w => w.id === team.id && w.place === 1) ? "default" : "outline"} 
                                    size="sm" 
                                    onClick={() => selectWinner(team.id, 1)}
                                  >
                                    1st
                                  </Button>
                                  <Button 
                                    variant={winners.some(w => w.id === team.id && w.place === 2) ? "default" : "outline"} 
                                    size="sm" 
                                    onClick={() => selectWinner(team.id, 2)}
                                  >
                                    2nd
                                  </Button>
                                  <Button 
                                    variant={winners.some(w => w.id === team.id && w.place === 3) ? "default" : "outline"} 
                                    size="sm" 
                                    onClick={() => selectWinner(team.id, 3)}
                                  >
                                    3rd
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-2xl font-bold">Hackathon Statistics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{totalTeams}</div>
                      <div className="text-muted-foreground">Total Teams</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{shortlistedCount}</div>
                      <div className="text-muted-foreground">Shortlisted Teams</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{hasVideoCount}</div>
                      <div className="text-muted-foreground">Video Submissions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{hasGithubCount}</div>
                      <div className="text-muted-foreground">GitHub Submissions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Selection Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Shortlisted Teams</span>
                        <span className="text-sm font-medium">{shortlistedCount} / {totalTeams}</span>
                      </div>
                      <Progress value={(shortlistedCount / totalTeams) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Not Selected</span>
                        <span className="text-sm font-medium">{notSelectedCount} / {totalTeams}</span>
                      </div>
                      <Progress value={(notSelectedCount / totalTeams) * 100} className="h-2" />
                    </div>
                    
                    <div className="pt-4">
                      <div className="text-sm text-muted-foreground">
                        {Math.round((shortlistedCount / totalTeams) * 100)}% of teams were shortlisted by the AI evaluation system.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Submission Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">PDF Abstract Only</span>
                        <span className="text-sm font-medium">
                          {totalTeams - hasVideoCount - hasGithubCount + Math.min(hasVideoCount, hasGithubCount)} / {totalTeams}
                        </span>
                      </div>
                      <Progress 
                        value={((totalTeams - hasVideoCount - hasGithubCount + Math.min(hasVideoCount, hasGithubCount)) / totalTeams) * 100} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">With Video</span>
                        <span className="text-sm font-medium">{hasVideoCount} / {totalTeams}</span>
                      </div>
                      <Progress value={(hasVideoCount / totalTeams) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">With GitHub</span>
                        <span className="text-sm font-medium">{hasGithubCount} / {totalTeams}</span>
                      </div>
                      <Progress value={(hasGithubCount / totalTeams) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  {/* Timeline items */}
                  <div className="space-y-8 ml-6">
                    <div className="relative">
                      <div className="absolute left-0 w-4 h-4 bg-hacktrack-blue rounded-full border-4 border-background transform translate-x-[-50%] translate-y-[0%]" />
                      <div>
                        <h3 className="font-semibold">Registration Closed</h3>
                        <p className="text-sm text-muted-foreground">October 15, 2023</p>
                        <p className="text-sm mt-1">
                          {totalTeams} teams successfully registered for the hackathon.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-0 w-4 h-4 bg-hacktrack-blue rounded-full border-4 border-background transform translate-x-[-50%] translate-y-[0%]" />
                      <div>
                        <h3 className="font-semibold">Submission Deadline</h3>
                        <p className="text-sm text-muted-foreground">October 30, 2023</p>
                        <p className="text-sm mt-1">
                          All teams submitted their projects before the deadline.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-0 w-4 h-4 bg-hacktrack-blue rounded-full border-4 border-background transform translate-x-[-50%] translate-y-[0%]" />
                      <div>
                        <h3 className="font-semibold">AI Evaluation Completed</h3>
                        <p className="text-sm text-muted-foreground">November 5, 2023</p>
                        <p className="text-sm mt-1">
                          AI system selected {shortlistedCount} teams for the final round.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-0 w-4 h-4 bg-secondary rounded-full border-4 border-background transform translate-x-[-50%] translate-y-[0%]" />
                      <div>
                        <h3 className="font-semibold text-muted-foreground">Final Results Announcement</h3>
                        <p className="text-sm text-muted-foreground">November 10, 2023</p>
                        <p className="text-sm mt-1 text-muted-foreground">
                          {announcementSent ? "Winners have been announced." : "Pending announcement of winners."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
