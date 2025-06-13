import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Tickets } from './pages/Tickets';
import { Assets } from './pages/Assets';
import { Users } from './pages/Users';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { ServiceCatalog } from './pages/ServiceCatalog';
import { Projects } from './pages/Projects';
import { Reports } from './pages/Reports';

const getPageTitle = (activeTab: string) => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    tickets: 'Tickets',
    assets: 'Assets',
    users: 'Users',
    knowledge: 'Knowledge Base',
    'service-catalog': 'Service Catalog',
    projects: 'Projects',
    reports: 'Reports & Analytics',
    settings: 'Settings'
  };
  return titles[activeTab] || 'Dashboard';
};

const getBreadcrumbs = (activeTab: string) => {
  const breadcrumbs: Record<string, string[]> = {
    dashboard: ['Home'],
    tickets: ['ITSM', 'Tickets'],
    assets: ['ITSM', 'Assets'],
    users: ['Administration', 'Users'],
    knowledge: ['ITSM', 'Knowledge Base'],
    'service-catalog': ['Self-Service', 'Service Catalog'],
    projects: ['ITSM', 'Projects'],
    reports: ['Analytics', 'Reports'],
    settings: ['Administration', 'Settings']
  };
  return breadcrumbs[activeTab] || ['Home'];
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tickets':
        return <Tickets />;
      case 'assets':
        return <Assets />;
      case 'users':
        return <Users />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'service-catalog':
        return <ServiceCatalog />;
      case 'projects':
        return <Projects />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Settings</h2>
              <p className="text-slate-600">System configuration and preferences will be available here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getPageTitle(activeTab)} 
          breadcrumbs={getBreadcrumbs(activeTab)}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;