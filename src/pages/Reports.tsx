import React, { useState } from 'react';
import { BarChart3, Download, Filter, Calendar, TrendingUp, Ticket, Users, Package } from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-slate-600 mt-1">Comprehensive insights into your IT operations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">1,247</h3>
          <p className="text-slate-600 text-sm">Total Tickets</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">94.2%</h3>
          <p className="text-slate-600 text-sm">Resolution Rate</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-red-600 font-medium">-15%</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">4.2h</h3>
          <p className="text-slate-600 text-sm">Avg Resolution Time</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">+5%</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">8.7</h3>
          <p className="text-slate-600 text-sm">Customer Satisfaction</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Volume Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Ticket Volume Trends</h3>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <BarChart3 className="w-4 h-4" />
              <span>Monthly view</span>
            </div>
          </div>
          
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500">Ticket volume chart</p>
              <p className="text-sm text-slate-400">Chart library integration needed</p>
            </div>
          </div>
        </div>

        {/* Resolution Time Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Resolution Time Analysis</h3>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <TrendingUp className="w-4 h-4" />
              <span>Average hours</span>
            </div>
          </div>
          
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500">Resolution time trends</p>
              <p className="text-sm text-slate-400">Chart library integration needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Available Reports</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-900">Report Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-900">Category</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-900">Last Generated</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-900">Format</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { name: 'Ticket Summary Report', category: 'Operations', lastGenerated: '2025-01-10', format: 'PDF' },
                { name: 'SLA Performance Report', category: 'Performance', lastGenerated: '2025-01-09', format: 'Excel' },
                { name: 'Asset Inventory Report', category: 'Assets', lastGenerated: '2025-01-08', format: 'CSV' },
                { name: 'User Activity Report', category: 'Users', lastGenerated: '2025-01-07', format: 'PDF' },
                { name: 'Knowledge Base Analytics', category: 'Knowledge', lastGenerated: '2025-01-06', format: 'Excel' }
              ].map((report, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{report.lastGenerated}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Generate
                      </button>
                      <button className="text-sm text-slate-600 hover:text-slate-700 font-medium">
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">SLA Compliance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Critical</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <span className="text-sm font-medium text-slate-900">96%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">High</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-sm font-medium text-slate-900">94%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Medium</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-sm font-medium text-slate-900">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Low</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <span className="text-sm font-medium text-slate-900">98%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {[
              { name: 'Hardware Issues', count: 89, percentage: 35 },
              { name: 'Software Problems', count: 67, percentage: 26 },
              { name: 'Network Issues', count: 45, percentage: 18 },
              { name: 'Email & Communication', count: 32, percentage: 13 },
              { name: 'Security', count: 20, percentage: 8 }
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{category.name}</p>
                  <p className="text-xs text-slate-500">{category.count} tickets</p>
                </div>
                <span className="text-sm text-slate-600">{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Performance</h3>
          <div className="space-y-3">
            {[
              { name: 'Sarah Wilson', resolved: 47, rating: 4.8 },
              { name: 'Emily Davis', resolved: 39, rating: 4.6 },
              { name: 'Mike Johnson', resolved: 31, rating: 4.5 },
              { name: 'John Doe', resolved: 28, rating: 4.7 }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.resolved} resolved</p>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-yellow-500">★</span>
                  <span className="text-sm text-slate-600">{member.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};