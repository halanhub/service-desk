import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Package, User, Calendar, Edit, Save, X, Monitor, Laptop, Wifi, Server, Printer, HardDrive } from 'lucide-react';
import { useAssets, useUsers } from '../hooks/useData';
import { Asset } from '../types';

const statusColors = {
  'in-use': 'bg-emerald-100 text-emerald-800',
  'available': 'bg-blue-100 text-blue-800',
  'maintenance': 'bg-yellow-100 text-yellow-800',
  'retired': 'bg-slate-100 text-slate-800'
};

const assetCategories = [
  { id: 'computers', name: 'Computers', icon: Laptop, color: 'bg-blue-50 border-blue-200' },
  { id: 'monitors', name: 'Monitors', icon: Monitor, color: 'bg-purple-50 border-purple-200' },
  { id: 'docking-station', name: 'Docking Stations', icon: HardDrive, color: 'bg-green-50 border-green-200' },
  { id: 'network', name: 'Network', icon: Wifi, color: 'bg-orange-50 border-orange-200' },
  { id: 'server', name: 'Servers', icon: Server, color: 'bg-red-50 border-red-200' },
  { id: 'printers', name: 'Printers', icon: Printer, color: 'bg-yellow-50 border-yellow-200' }
];

export const Assets: React.FC = () => {
  const { assets, loading, addAsset, updateAsset } = useAssets();
  const { users } = useUsers();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'categories'>('categories');

  const getCategoryFromType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'Laptop': 'computers',
      'Desktop': 'computers',
      'Monitor': 'monitors',
      'Docking Station': 'docking-station',
      'Network Equipment': 'network',
      'Switch': 'network',
      'Router': 'network',
      'Server': 'server',
      'Printer': 'printers'
    };
    return typeMap[type] || 'computers';
  };

  const filteredAssets = assets.filter(asset => {
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    const assetCategory = getCategoryFromType(asset.type);
    const matchesCategory = filterCategory === 'all' || assetCategory === filterCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const getAssetsByCategory = (categoryId: string) => {
    return filteredAssets.filter(asset => getCategoryFromType(asset.type) === categoryId);
  };

  const handleCreateAsset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newAsset: Omit<Asset, 'id'> = {
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      category: formData.get('category') as string,
      manufacturer: formData.get('manufacturer') as string,
      model: formData.get('model') as string,
      serialNumber: formData.get('serialNumber') as string,
      status: formData.get('status') as 'in-use' | 'available' | 'maintenance' | 'retired',
      location: formData.get('location') as string,
      purchaseDate: new Date(formData.get('purchaseDate') as string),
      cost: parseFloat(formData.get('cost') as string),
      warrantyExpiry: formData.get('warrantyExpiry') ? new Date(formData.get('warrantyExpiry') as string) : undefined,
      assignedTo: formData.get('assignedTo') ? users.find(u => u.id === formData.get('assignedTo')) : undefined
    };

    addAsset(newAsset);
    setShowCreateForm(false);
    e.currentTarget.reset();
  };

  const handleEditAsset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAsset) return;

    const formData = new FormData(e.currentTarget);
    
    const updatedAsset: Partial<Asset> = {
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      category: formData.get('category') as string,
      manufacturer: formData.get('manufacturer') as string,
      model: formData.get('model') as string,
      serialNumber: formData.get('serialNumber') as string,
      status: formData.get('status') as 'in-use' | 'available' | 'maintenance' | 'retired',
      location: formData.get('location') as string,
      purchaseDate: new Date(formData.get('purchaseDate') as string),
      cost: parseFloat(formData.get('cost') as string),
      warrantyExpiry: formData.get('warrantyExpiry') ? new Date(formData.get('warrantyExpiry') as string) : undefined,
      assignedTo: formData.get('assignedTo') ? users.find(u => u.id === formData.get('assignedTo')) : undefined
    };

    updateAsset(editingAsset.id, updatedAsset);
    setShowEditForm(false);
    setEditingAsset(null);
  };

  const handleStatusChange = (assetId: string, newStatus: 'in-use' | 'available' | 'maintenance' | 'retired') => {
    updateAsset(assetId, { status: newStatus });
  };

  const openEditModal = (asset: Asset) => {
    setEditingAsset(asset);
    setShowEditForm(true);
  };

  if (loading) {
    return <div className="p-6">Loading assets...</div>;
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
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="in-use">In Use</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="retired">Retired</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {assetCategories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 border border-slate-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('categories')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'categories' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Category View */}
      {viewMode === 'categories' && (
        <div className="space-y-8">
          {assetCategories.map((category) => {
            const categoryAssets = getAssetsByCategory(category.id);
            const Icon = category.icon;
            
            if (categoryAssets.length === 0 && filterCategory === 'all') return null;
            
            return (
              <div key={category.id} className={`border-2 border-dashed rounded-xl p-6 ${category.color}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                      <p className="text-sm text-slate-600">{categoryAssets.length} assets</p>
                    </div>
                  </div>
                </div>
                
                {categoryAssets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryAssets.map((asset) => (
                      <div key={asset.id} className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 text-sm">{asset.name}</h4>
                              <p className="text-xs text-slate-600">{asset.id}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => openEditModal(asset)}
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Edit Asset"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Status</span>
                            <select
                              value={asset.status}
                              onChange={(e) => handleStatusChange(asset.id, e.target.value as any)}
                              className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 focus:ring-1 focus:ring-blue-500 ${statusColors[asset.status]}`}
                            >
                              <option value="available">Available</option>
                              <option value="in-use">In Use</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="retired">Retired</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Model</span>
                            <span className="font-medium text-slate-900">{asset.model}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Serial</span>
                            <span className="font-mono text-slate-900">{asset.serialNumber}</span>
                          </div>
                          
                          {asset.assignedTo && (
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Assigned</span>
                              <span className="font-medium text-slate-900">{asset.assignedTo.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500">No {category.name.toLowerCase()} found</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{asset.name}</h3>
                    <p className="text-sm text-slate-600">{asset.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(asset)}
                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                    title="Edit Asset"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <select
                    value={asset.status}
                    onChange={(e) => handleStatusChange(asset.id, e.target.value as any)}
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${statusColors[asset.status]}`}
                  >
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Type</span>
                  <span className="text-sm font-medium text-slate-900">{asset.type}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Manufacturer</span>
                  <span className="text-sm font-medium text-slate-900">{asset.manufacturer}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Serial Number</span>
                  <span className="text-sm font-mono text-slate-900">{asset.serialNumber}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Location</span>
                  <span className="text-sm font-medium text-slate-900">{asset.location}</span>
                </div>
                
                {asset.assignedTo && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Assigned To</span>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-slate-500" />
                      <span className="text-sm font-medium text-slate-900">{asset.assignedTo.name}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Purchase Date</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span className="text-sm text-slate-900">{asset.purchaseDate.toLocaleDateString()}</span>
                  </div>
                </div>
                
                {asset.warrantyExpiry && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Warranty Expires</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="text-sm text-slate-900">{asset.warrantyExpiry.toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Cost</span>
                  <span className="text-sm font-semibold text-slate-900">${asset.cost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Asset Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Add New Asset</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateAsset} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dell Laptop"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select name="type" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Docking Station">Docking Station</option>
                    <option value="Network Equipment">Network Equipment</option>
                    <option value="Switch">Switch</option>
                    <option value="Router">Router</option>
                    <option value="Server">Server</option>
                    <option value="Printer">Printer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select name="category" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Peripherals">Peripherals</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select name="status" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dell, HP, Apple"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Latitude 7420"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Asset serial number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Office Floor 2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned To</label>
                  <select name="assignedTo" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Unassigned</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cost ($)</label>
                  <input
                    type="number"
                    name="cost"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Warranty Expiry</label>
                  <input
                    type="date"
                    name="warrantyExpiry"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Asset Modal */}
      {showEditForm && editingAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Edit Asset - {editingAsset.name}</h2>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingAsset(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditAsset} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingAsset.name}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dell Laptop"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select name="type" required defaultValue={editingAsset.type} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Docking Station">Docking Station</option>
                    <option value="Network Equipment">Network Equipment</option>
                    <option value="Switch">Switch</option>
                    <option value="Router">Router</option>
                    <option value="Server">Server</option>
                    <option value="Printer">Printer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select name="category" required defaultValue={editingAsset.category} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Peripherals">Peripherals</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select name="status" required defaultValue={editingAsset.status} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    required
                    defaultValue={editingAsset.manufacturer}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dell, HP, Apple"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    required
                    defaultValue={editingAsset.model}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Latitude 7420"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    required
                    defaultValue={editingAsset.serialNumber}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Asset serial number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    defaultValue={editingAsset.location}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Office Floor 2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned To</label>
                  <select name="assignedTo" defaultValue={editingAsset.assignedTo?.id || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Unassigned</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cost ($)</label>
                  <input
                    type="number"
                    name="cost"
                    step="0.01"
                    required
                    defaultValue={editingAsset.cost}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    required
                    defaultValue={editingAsset.purchaseDate.toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Warranty Expiry</label>
                  <input
                    type="date"
                    name="warrantyExpiry"
                    defaultValue={editingAsset.warrantyExpiry?.toISOString().split('T')[0] || ''}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingAsset(null);
                  }}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};