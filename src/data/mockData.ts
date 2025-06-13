import { User, Ticket, Asset, KnowledgeArticle, ServiceCatalogItem, Project, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    department: 'IT',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'technician',
    department: 'IT Support',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'user',
    department: 'Marketing',
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'technician',
    department: 'Network Operations',
    status: 'active'
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 'INC-001',
    title: 'Unable to access email server',
    description: 'Users reporting they cannot connect to the email server since this morning.',
    priority: 'high',
    status: 'in-progress',
    type: 'incident',
    assignee: mockUsers[1],
    requester: mockUsers[2],
    category: 'Email & Communication',
    subcategory: 'Email Server',
    createdAt: new Date('2025-01-10T09:00:00'),
    updatedAt: new Date('2025-01-10T10:30:00'),
    dueDate: new Date('2025-01-10T17:00:00'),
    tags: ['email', 'server', 'urgent']
  },
  {
    id: 'CHG-002',
    title: 'Server maintenance window',
    description: 'Scheduled maintenance for database servers during weekend.',
    priority: 'medium',
    status: 'open',
    type: 'change',
    assignee: mockUsers[3],
    requester: mockUsers[0],
    category: 'Infrastructure',
    subcategory: 'Server Maintenance',
    createdAt: new Date('2025-01-09T14:00:00'),
    updatedAt: new Date('2025-01-09T14:00:00'),
    dueDate: new Date('2025-01-12T08:00:00'),
    tags: ['maintenance', 'database', 'planned']
  },
  {
    id: 'SR-003',
    title: 'New laptop request',
    description: 'Request for new laptop for new employee starting next week.',
    priority: 'low',
    status: 'open',
    type: 'service-request',
    requester: mockUsers[2],
    category: 'Hardware',
    subcategory: 'Laptop',
    createdAt: new Date('2025-01-08T11:00:00'),
    updatedAt: new Date('2025-01-08T11:00:00'),
    tags: ['hardware', 'laptop', 'new-employee']
  }
];

export const mockAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'Dell Latitude 7420',
    type: 'Laptop',
    category: 'Hardware',
    manufacturer: 'Dell',
    model: 'Latitude 7420',
    serialNumber: 'DL7420001',
    status: 'in-use',
    assignedTo: mockUsers[2],
    location: 'Office Floor 2',
    purchaseDate: new Date('2024-03-15'),
    warrantyExpiry: new Date('2027-03-15'),
    cost: 1299.99
  },
  {
    id: 'AST-002',
    name: 'HP ProDesk 600',
    type: 'Desktop',
    category: 'Hardware',
    manufacturer: 'HP',
    model: 'ProDesk 600 G6',
    serialNumber: 'HP600G6001',
    status: 'available',
    location: 'IT Storage Room',
    purchaseDate: new Date('2024-01-20'),
    warrantyExpiry: new Date('2027-01-20'),
    cost: 899.99
  },
  {
    id: 'AST-003',
    name: 'Cisco Switch 2960',
    type: 'Network Equipment',
    category: 'Infrastructure',
    manufacturer: 'Cisco',
    model: '2960-X Series',
    serialNumber: 'CSC2960X001',
    status: 'in-use',
    location: 'Server Room A',
    purchaseDate: new Date('2023-11-10'),
    warrantyExpiry: new Date('2026-11-10'),
    cost: 2499.99
  },
  {
    id: 'AST-004',
    name: 'Dell UltraSharp U2720Q',
    type: 'Monitor',
    category: 'Hardware',
    manufacturer: 'Dell',
    model: 'UltraSharp U2720Q',
    serialNumber: 'DLU2720Q001',
    status: 'in-use',
    assignedTo: mockUsers[2],
    location: 'Office Floor 2',
    purchaseDate: new Date('2024-03-15'),
    warrantyExpiry: new Date('2027-03-15'),
    cost: 549.99
  },
  {
    id: 'AST-005',
    name: 'Dell WD19TB Docking Station',
    type: 'Docking Station',
    category: 'Hardware',
    manufacturer: 'Dell',
    model: 'WD19TB',
    serialNumber: 'DLWD19TB001',
    status: 'in-use',
    assignedTo: mockUsers[2],
    location: 'Office Floor 2',
    purchaseDate: new Date('2024-03-15'),
    warrantyExpiry: new Date('2027-03-15'),
    cost: 299.99
  },
  {
    id: 'AST-006',
    name: 'HP LaserJet Pro M404n',
    type: 'Printer',
    category: 'Hardware',
    manufacturer: 'HP',
    model: 'LaserJet Pro M404n',
    serialNumber: 'HPM404N001',
    status: 'in-use',
    location: 'Office Floor 2',
    purchaseDate: new Date('2024-02-10'),
    warrantyExpiry: new Date('2027-02-10'),
    cost: 199.99
  },
  {
    id: 'AST-007',
    name: 'Dell PowerEdge R740',
    type: 'Server',
    category: 'Infrastructure',
    manufacturer: 'Dell',
    model: 'PowerEdge R740',
    serialNumber: 'DLR740001',
    status: 'in-use',
    location: 'Server Room A',
    purchaseDate: new Date('2023-08-15'),
    warrantyExpiry: new Date('2026-08-15'),
    cost: 4999.99
  },
  {
    id: 'AST-008',
    name: 'Netgear ProSAFE GS724T',
    type: 'Switch',
    category: 'Infrastructure',
    manufacturer: 'Netgear',
    model: 'ProSAFE GS724T',
    serialNumber: 'NTGS724T001',
    status: 'in-use',
    location: 'Server Room B',
    purchaseDate: new Date('2023-12-05'),
    warrantyExpiry: new Date('2026-12-05'),
    cost: 399.99
  }
];

export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'KB-001',
    title: 'How to reset your password',
    content: 'Step-by-step guide to reset your company password...',
    category: 'Account Management',
    tags: ['password', 'reset', 'account'],
    author: mockUsers[1],
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-15'),
    views: 245,
    helpful: 23,
    status: 'published'
  },
  {
    id: 'KB-002',
    title: 'Setting up VPN connection',
    content: 'Instructions for configuring VPN access for remote work...',
    category: 'Network & Security',
    tags: ['vpn', 'remote', 'connection'],
    author: mockUsers[3],
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-12-01'),
    views: 189,
    helpful: 31,
    status: 'published'
  }
];

export const mockServiceCatalog: ServiceCatalogItem[] = [
  {
    id: 'SC-001',
    name: 'New User Account',
    description: 'Request a new user account for company systems',
    category: 'Account Management',
    icon: 'UserPlus',
    approvalRequired: true,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'department', label: 'Department', type: 'select', required: true, options: ['IT', 'HR', 'Finance', 'Marketing'] },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true }
    ]
  },
  {
    id: 'SC-002',
    name: 'Hardware Request',
    description: 'Request new hardware equipment',
    category: 'Hardware',
    icon: 'Monitor',
    approvalRequired: true,
    fields: [
      { id: 'equipmentType', label: 'Equipment Type', type: 'select', required: true, options: ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse'] },
      { id: 'justification', label: 'Business Justification', type: 'textarea', required: true },
      { id: 'urgency', label: 'Urgency', type: 'select', required: true, options: ['Low', 'Medium', 'High'] }
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Network Infrastructure Upgrade',
    description: 'Upgrading network switches and routers across all offices',
    status: 'in-progress',
    priority: 'high',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-31'),
    manager: mockUsers[0],
    team: [mockUsers[1], mockUsers[3]],
    progress: 35
  },
  {
    id: 'PRJ-002',
    name: 'ITSM Platform Implementation',
    description: 'Implementing new IT service management platform',
    status: 'planning',
    priority: 'medium',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-06-30'),
    manager: mockUsers[1],
    team: [mockUsers[0], mockUsers[2]],
    progress: 15
  }
];

export const mockDashboardStats: DashboardStats = {
  totalTickets: 147,
  openTickets: 23,
  resolvedToday: 8,
  avgResolutionTime: 4.2,
  slaBreaches: 2,
  activeProjects: 5,
  totalAssets: 342,
  knowledgeArticles: 89
};