import React from 'react';
import { ShoppingCart, CheckCircle, Clock } from 'lucide-react';
import { useServiceCatalog } from '../hooks/useData';
import * as Icons from 'lucide-react';

export const ServiceCatalog: React.FC = () => {
  const { items, loading } = useServiceCatalog();

  if (loading) {
    return <div className="p-6">Loading service catalog...</div>;
  }

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Icons.Package;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Service Catalog</h2>
          <p className="text-slate-600 mt-1">Request IT services and support</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <ShoppingCart className="w-4 h-4" />
            <span>My Requests (3)</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const IconComponent = getIcon(item.icon);
          
          return (
            <div key={item.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    
                    {item.approvalRequired ? (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">Approval required</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs">Instant fulfillment</span>
                      </div>
                    )}
                  </div>
                  
                  {item.price && (
                    <div className="text-lg font-semibold text-slate-900 mb-3">
                      ${item.price}
                    </div>
                  )}
                  
                  <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Request Service
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popular Services */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Services</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Password Reset', requests: 156, category: 'Account Management' },
            { name: 'Software Installation', requests: 89, category: 'Software' },
            { name: 'VPN Access', requests: 67, category: 'Network' },
            { name: 'Email Setup', requests: 45, category: 'Communication' }
          ].map((service, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <h4 className="font-medium text-slate-900 mb-1">{service.name}</h4>
              <p className="text-xs text-slate-600 mb-2">{service.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{service.requests} requests</span>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">My Recent Requests</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {[
            { id: 'SR-001', service: 'New Laptop Request', status: 'In Progress', date: '2025-01-10' },
            { id: 'SR-002', service: 'Software License', status: 'Approved', date: '2025-01-09' },
            { id: 'SR-003', service: 'Email Account', status: 'Completed', date: '2025-01-08' }
          ].map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{request.id}</p>
                  <p className="text-xs text-slate-600">{request.service}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  request.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                  request.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status}
                </span>
                <p className="text-xs text-slate-500 mt-1">{request.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};