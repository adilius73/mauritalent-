
export type Language = 'fr' | 'ar' | 'en';

export type UserRole = 'candidate' | 'recruiter' | 'public_admin' | 'guest' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'banned';
  joinDate: string;
  lastLogin: string;
}

export interface SystemLog {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Appel d\'offres';
  sector: string; 
  date: string;
  salary?: string;
  isPublicTender?: boolean;
  aiMatchScore?: number; 
  description: string;
  status?: 'active' | 'pending' | 'closed'; // Added status for moderation
}

export interface KpiData {
  name: string;
  value: number;
}

export interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
    en: string;
  };
}

// CV & Assistant Types
export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  customFields?: CustomField[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Resume {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experiences: Experience[];
  education: Education[];
}

// Tender types
export interface TenderDocument {
  id: string;
  name: string;
  type: 'dao' | 'annex' | 'clarification' | 'minutes';
  url: string;
  version: number;
  date: string;
}

export interface TenderClarification {
  id: string;
  question: string;
  answer: string;
  date: string;
  isPublic: boolean;
}

export interface TenderSubmission {
  id: string;
  tenderId: string;
  bidderName: string;
  date: string;
  status: 'submitted' | 'received';
  reference: string;
}

export interface Tender {
  id: string;
  title: string;
  reference: string;
  type: 'AO' | 'AMI' | 'RFP';
  category: string;
  announcer: string;
  status: 'open' | 'closed' | 'evaluation' | 'awarded';
  publishDate: string;
  deadline: string;
  budget: string;
  location: string;
  description: string;
  documents: TenderDocument[];
  clarifications: TenderClarification[];
}

// --- SITE VITRINE TYPES ---

export interface KnowledgeBlock {
  id: string;
  type: 'navigation' | 'service' | 'sectors' | 'audience' | 'resources' | 'news' | 'contact';
  title: string;
  content: any; // Flexible content based on type
}

export interface ServiceContent {
  label: string;
  short_tagline?: string;
  description?: string;
  value_proposition?: string;
  benefits?: string[];
  core_offers?: string[];
  target_audience?: string[];
  cta?: { id: string; label: string; intent: string }[];
}

export interface SiteVitrineData {
  project_id: string;
  version: string;
  knowledge_blocks: KnowledgeBlock[];
}
