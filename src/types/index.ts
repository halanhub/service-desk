export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'user';
  department: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  type: 'incident' | 'problem' | 'change' | 'service-request';
  assignee?: User;
  requester: User;
  category: string;
  subcategory?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  resolution?: string;
  tags: string[];
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  category: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: 'in-use' | 'available' | 'maintenance' | 'retired';
  assignedTo?: User;
  location: string;
  purchaseDate: Date;
  warrantyExpiry?: Date;
  cost: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  helpful: number;
  status: 'draft' | 'published' | 'archived';
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  price?: number;
  approvalRequired: boolean;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required: boolean;
  options?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  startDate: Date;
  endDate: Date;
  manager: User;
  team: User[];
  progress: number;
}

export interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  resolvedToday: number;
  avgResolutionTime: number;
  slaBreaches: number;
  activeProjects: number;
  totalAssets: number;
  knowledgeArticles: number;
}