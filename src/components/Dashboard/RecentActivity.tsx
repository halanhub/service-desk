import React from 'react';
import { Clock, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'ticket-created' | 'ticket-resolved' | 'ticket-assigned' | 'asset-updated';
  message: string;
  time: string;
  user: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'ticket-created',
    message: 'New incident ticket created: Email server down',
    time: '2 minutes ago',
    user: 'Mike Johnson'
  },
  {
    id: '2',
    type: 'ticket-resolved',
    message: 'Ticket INC-045 resolved: Network connectivity issue',
    time: '15 minutes ago',
    user: 'Sarah Wilson'
  },
  {
    id: '3',
    type: 'ticket-assigned',
    message: 'Change request CHG-012 assigned to Emily Davis',
    time: '1 hour ago',
    user: 'John Doe'
  },
  {
    id: '4',
    type: 'asset-updated',
    message: 'Asset Dell Laptop updated - Status changed to maintenance',
    time: '2 hours ago',
    user: 'Sarah Wilson'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'ticket-created':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'ticket-resolved':
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    case 'ticket-assigned':
      return <User className="w-4 h-4 text-blue-500" />;
    case 'asset-updated':
      return <XCircle className="w-4 h-4 text-yellow-500" />;
    default:
      return <Clock className="w-4 h-4 text-slate-500" />;
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {mockActivity.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900 font-medium">{item.message}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-slate-500">{item.time}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">by {item.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
        View All Activity
      </button>
    </div>
  );
};