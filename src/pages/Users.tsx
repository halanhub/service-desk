import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, User, Mail, Shield, Monitor, Laptop, Printer, HardDrive } from 'lucide-react';
import { useUsers, useAssets } from '../hooks/useData';
import { User as UserType } from '../types';

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  technician: 'bg-blue-100 text-blue-800',
  user: 'bg-emerald-100 text-emerald-800'
};

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-100 text-slate-800'
};

export const Users: React.FC = () => {
  const { users, loading, addUser } = useUsers();
  const { assets } = useAssets();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'users' | 'workstation'>('users');

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getUserAssets = (userId: string) => {
    return assets.filter(asset => asset.assignedTo?.id === userId);
  };

  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'laptop':
        return Laptop;
      case 'desktop':
        return Monitor;
      case 'monitor':
        return Monitor;
      case 'printer':
        return Printer;
      case 'docking station':
        return HardDrive;
      default:
        return HardDrive;
    }
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newUser: Omit<UserType, 'id'> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'admin' | 'technician' | 'user',
      department: formData.get('department') as string,
      status: 'active'
    };

    addUser(newUser);
    setShowCreateForm(false);
    e.currentTarget.reset();
  };

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="technician">Technician</option>
            <option value="user">User</option>
          </select>
          
          <div className="flex items-center space-x-2 border border-slate-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('users')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'users' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setViewMode('workstation')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'workstation' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Work-station
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users View */}
      {viewMode === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{user.name}</h3>
                    <p className="text-sm text-slate-600">{user.department}</p>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-900">{user.email}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Role</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200">
                <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Work-station View */}
      {viewMode === 'workstation' && (
        <div className="space-y-6">
          {filteredUsers.map((user) => {
            const userAssets = getUserAssets(user.id);
            
            return (
              <div key={user.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span>{user.department}</span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Assets Assigned</div>
                    <div className="text-2xl font-bold text-slate-900">{userAssets.length}</div>
                  </div>
                </div>
                
                {userAssets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userAssets.map((asset) => {
                      const AssetIcon = getAssetIcon(asset.type);
                      
                      return (
                        <div key={asset.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <AssetIcon className="w-5 h-5 text-slate-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-slate-900 text-sm truncate">{asset.name}</h4>
                              <p className="text-xs text-slate-600">{asset.type}</p>
                              <p className="text-xs text-slate-500 mt-1">{asset.serialNumber}</p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  asset.status === 'in-use' ? 'bg-emerald-100 text-emerald-800' :
                                  asset.status === 'available' ? 'bg-blue-100 text-blue-800' :
                                  asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-slate-100 text-slate-800'
                                }`}>
                                  {asset.status.replace('-', ' ')}
                                </span>
                                <span className="text-xs text-slate-500">{asset.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                    <Monitor className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500">No assets assigned to this user</p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Assign Assets
                    </button>
                  </div>
                )}
                
                {userAssets.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-slate-900">
                          {userAssets.filter(a => a.status === 'in-use').length}
                        </div>
                        <div className="text-xs text-slate-600">In Use</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-slate-900">
                          {userAssets.filter(a => a.status === 'maintenance').length}
                        </div>
                        <div className="text-xs text-slate-600">Maintenance</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-slate-900">
                          ${userAssets.reduce((sum, asset) => sum + asset.cost, 0).toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">Total Value</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create User Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Add New User</h2>
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select name="role" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="user">User</option>
                  <option value="technician">Technician</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select name="department" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};