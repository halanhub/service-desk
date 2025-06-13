import React from 'react';
import { 
  Ticket, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Folder, 
  Package, 
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { RecentActivity } from '../components/Dashboard/RecentActivity';
import { useDashboardStats } from '../hooks/useData';

export const Dashboard: React.FC = () => {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tickets"
          value={stats.totalTickets}
          change="+12%"
          changeType="positive"
          icon={Ticket}
          color="blue"
        />
        <StatsCard
          title="Open Tickets"
          value={stats.openTickets}
          change="-5%"
          changeType="positive"
          icon={AlertTriangle}
          color="yellow"
        />
        <StatsCard
          title="Resolved Today"
          value={stats.resolvedToday}
          change="+23%"
          changeType="positive"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Avg Resolution Time"
          value={`${stats.avgResolutionTime}h`}
          change="-15%"
          changeType="positive"
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="SLA Breaches"
          value={stats.slaBreaches}
          change="+2"
          changeType="negative"
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Folder}
          color="indigo"
        />
        <StatsCard
          title="Total Assets"
          value={stats.totalAssets}
          change="+8"
          changeType="positive"
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Knowledge Articles"
          value={stats.knowledgeArticles}
          change="+3"
          changeType="positive"
          icon={BookOpen}
          color="green"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Ticket Trends</h3>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <TrendingUp className="w-4 h-4" />
              <span>Last 30 days</span>
            </div>
          </div>
          
          {/* Placeholder for chart */}
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500">Chart visualization would go here</p>
              <p className="text-sm text-slate-400">Integration with charting library</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* SLA Performance */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">SLA Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">94.2%</div>
            <div className="text-sm text-emerald-700">Incidents</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">89.7%</div>
            <div className="text-sm text-blue-700">Service Requests</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">96.1%</div>
            <div className="text-sm text-purple-700">Changes</div>
          </div>
        </div>
      </div>
    </div>
  );
};