export type AchievementStatus = 'Winner' | 'Runner Up' | 'Finalist' | 'Shortlisted' | 'Selected' | 'Special Award';

export type AchievementCategory = 'All' | 'Hackathon' | 'Open Source' | 'Research' | 'Engineering';

export interface Achievement {
  id: string;
  title: string;
  event: string;
  date: string;
  year: number;
  status: AchievementStatus;
  category: AchievementCategory;
  summary: string;
  description: string;
  evidenceUrl?: string;
  evidenceLabel?: string;
  highlightTag?: string;
  badgeIcon?: string;
}

export interface MemberScreenshot {
  id: string;
  title: string;
  caption: string;
  tag: string;
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatarUrl?: string;
  avatarSeed: string; // for high-res deterministic avatar / mascot fallback
  accentColor: string;
  skills: {
    core: string[];
    secondary: string[];
    tools: string[];
  };
  individualAchievements: string[];
  screenshots?: MemberScreenshot[];
  strongestProject: {
    title: string;
    role: string;
    description: string;
  };
  teamContributions: string[];
  experienceSnippet?: string;
  ghibliRole?: string;
  ghibliTagline?: string;
  ghibliAvatarUrl?: string;
  links: {
    github: string;
    linkedin: string;
    portfolio?: string;
    x?: string;
    email: string;
  };
}

export type ProjectStatus = 'Production' | 'MVP Complete' | 'Hackathon Winner' | 'Prototype' | 'In Progress';

export type ProjectCategory = 'All' | 'AI & ML' | 'Full-Stack' | 'Distributed Systems' | 'Web3 & Security';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  problemStatement: string;
  proposedSolution: string;
  techStack: string[];
  keyAlgorithms: string[];
  metrics?: { label: string; value: string }[];
  teamMembers: {
    memberId: string;
    memberName: string;
    contribution: string;
  }[];
  githubUrl: string;
  liveDemoUrl?: string;
  docsUrl?: string;
  coverImage?: string;
  featured: boolean;
}

export interface CapabilityItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & Cloud' | 'AI & Data' | 'Systems & Security' | 'UI/UX & Product';
  description: string;
  associatedMemberIds: string[];
  associatedProjectIds: string[];
  evidenceText: string;
}

export interface WorkflowStep {
  stepNumber: number;
  phase: string;
  title: string;
  duration: string;
  description: string;
  artifactsProduced: string[];
  toolsUsed: string[];
  sprintMechanism: string;
}

export interface BehindTheScenesItem {
  id: string;
  type: 'milestone' | 'debugging' | 'iteration' | 'story';
  title: string;
  date: string;
  tag: string;
  content: string;
  quote?: string;
}
