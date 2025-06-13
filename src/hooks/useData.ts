import { useState, useEffect } from 'react';
import { 
  mockUsers, 
  mockTickets, 
  mockAssets, 
  mockKnowledgeArticles, 
  mockServiceCatalog, 
  mockProjects,
  mockDashboardStats 
} from '../data/mockData';
import { User, Ticket, Asset, KnowledgeArticle, ServiceCatalogItem, Project, DashboardStats } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(false);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updates } : user));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return { users, loading, addUser, updateUser, deleteUser };
};

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [loading, setLoading] = useState(false);

  const addTicket = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket = {
      ...ticket,
      id: `${ticket.type.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-3)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates, updatedAt: new Date() } : ticket
    ));
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  return { tickets, loading, addTicket, updateTicket, deleteTicket };
};

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [loading, setLoading] = useState(false);

  const addAsset = (asset: Omit<Asset, 'id'>) => {
    const newAsset = { ...asset, id: `AST-${Date.now().toString().slice(-3)}` };
    setAssets(prev => [...prev, newAsset]);
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(asset => asset.id === id ? { ...asset, ...updates } : asset));
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  return { assets, loading, addAsset, updateAsset, deleteAsset };
};

export const useKnowledgeBase = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>(mockKnowledgeArticles);
  const [loading, setLoading] = useState(false);

  const addArticle = (article: Omit<KnowledgeArticle, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'helpful'>) => {
    const newArticle = {
      ...article,
      id: `KB-${Date.now().toString().slice(-3)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      helpful: 0
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<KnowledgeArticle>) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, ...updates, updatedAt: new Date() } : article
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  return { articles, loading, addArticle, updateArticle, deleteArticle };
};

export const useServiceCatalog = () => {
  const [items, setItems] = useState<ServiceCatalogItem[]>(mockServiceCatalog);
  const [loading, setLoading] = useState(false);

  return { items, loading };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: `PRJ-${Date.now().toString().slice(-3)}` };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => project.id === id ? { ...project, ...updates } : project));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return { projects, loading, addProject, updateProject, deleteProject };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);
  const [loading, setLoading] = useState(false);

  return { stats, loading };
};