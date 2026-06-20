export interface Project {
  title: string;
  description: string[];
  category?: string;
}

export interface Job {
  title: string;
  company: string;
  period: string;
  description?: string[];
  projects?: Project[];
  highlight?: string; // New field for special emphasis notes
  skills?: string[];
  categorySkills?: Record<string, string[]>;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  honors?: string[];
  details?: string[];
}