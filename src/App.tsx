import React, { useState, useEffect } from 'react';
import { User, LogOut, Plus, Edit, Trash2, Save, X, Users, ShoppingCart, CreditCard, DollarSign, Eye, UserPlus, Clock, BarChart3, TrendingUp, Calendar } from 'lucide-react';

const RestaurantOrderApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [waiters, setWaiters] = useState([
    { id: 1, username: 'waiter', password: 'waiter123', name: 'Default Waiter', active: true }
  ]);
  const [menuItems, setMenuItems] = useState({
    food: [
      { id: 1, name: 'Chicken Burger', category: 'food' },
      { id: 2, name: 'Beef Pizza', category: 'food' },
      { id: 3, name: 'Caesar Salad', category: 'food' },
      { id: 4, name: 'Grilled Fish', category: 'food' }
    ],
    drinks: [
      { id: 5, name: 'Coca Cola', category: 'drinks' },
      { id: 6, name: 'Orange Juice', category: 'drinks' },
      { id: 7, name: 'Coffee', category: 'drinks' },
      { id: 8, name: 'Water', category: 'drinks' }
    ]
  });
  const [activeTab, setActiveTab] = useState('orders');

  // Default users
  const defaultUsers = {
    admin: { username: 'admin', password: 'admin123', name: 'Admin User' },
    cashier: { username: 'cashier', password: 'cashier123', name: 'Cashier User' }
  };

  // Login Component
  const LoginForm = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '', role: 'waiter' });

    useEffect(() => {
      // Auto-fill default credentials when role changes
      if (loginData.role === 'admin') {
        setLoginData({ username: 'admin', password: 'admin123', role: 'admin' });
      } else if (loginData.role === 'cashier') {
        setLoginData({ username: 'cashier', password: 'cashier123', role: 'cashier' });
      } else {
        setLoginData({ username: 'waiter', password: 'waiter123', role: 'waiter' });
      }
    }, [loginData.role]);

    const handleLogin = () => {
      if (loginData.role === 'admin') {
        const admin = defaultUsers.admin;
        if (admin.username === loginData.username && admin.password === loginData.password) {
          setCurrentUser({ ...loginData, name: admin.name });
          return;
        }
      } else if (loginData.role === 'cashier') {
        const cashier = defaultUsers.cashier;
        if (cashier.username === loginData.username && cashier.password === loginData.password) {
          setCurrentUser({ ...loginData, name: cashier.name });
          return;
        }
      } else if (loginData.role === 'waiter') {
        const waiter = waiters.find(w => w.username === loginData.username && w.password === loginData.password && w.active);
        if (waiter) {
          setCurrentUser({ ...loginData, name: waiter.name, id: waiter.id });
          return;
        }
      }
      alert('Invalid credentials');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Restaurant POS</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please login to continue</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Role</label>
              <select 
                value={loginData.role}
                onChange={(e) => setLoginData({...loginData, role: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              >
                <option value="waiter">Waiter</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="Enter password"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login to System
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-blue-800 mb-2">Default Credentials:</p>
            <div className="text-xs space-y-1 text-blue-700">
              <p><strong>Waiter:</strong> waiter / waiter123</p>
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Cashier:</strong> cashier / cashier123</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Waiter Management Component (Admin only)
  const WaiterManagement = () => {
    const [newWaiter, setNewWaiter] = useState({ username: '', password: '', name: '' });
    const [editingWaiter, setEditingWaiter] = useState(null);

    const addWaiter = () => {
      if (!newWaiter.username || !newWaiter.password || !newWaiter.name) {
        alert('Please fill all fields');
        return;
      }

      if (waiters.find(w => w.username === newWaiter.username)) {
        alert('Username already exists');
        return;
      }

      const waiter = {
        id: Date.now(),
        ...newWaiter,
        active: true
      };

      setWaiters([...waiters, waiter]);
      setNewWaiter({ username: '', password: '', name: '' });
    };

    const toggleWaiterStatus = (waiterId) => {
      setWaiters(waiters.map(waiter =>
        waiter.id === waiterId ? { ...waiter, active: !waiter.active } : waiter
      ));
    };

    const deleteWaiter = (waiterId) => {
      if (waiters.length === 1) {
        alert('Cannot delete the last waiter');
        return;
      }
      setWaiters(waiters.filter(waiter => waiter.id !== waiterId));
    };

    const updateWaiter = (waiterId, updatedData) => {
      setWaiters(waiters.map(waiter =>
        waiter.id === waiterId ? { ...waiter, ...updatedData } : waiter
      ));
      setEditingWaiter(null);
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="text-blue-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Waiter</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={newWaiter.name}
              onChange={(e) => setNewWaiter({...newWaiter, name: e.target.value})}
              className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Full Name"
            />
            <input
              type="text"
              value={newWaiter.username}
              onChange={(e) => setNewWaiter({...newWaiter, username: e.target.value})}
              className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Username"
            />
            <input
              type="password"
              value={newWaiter.password}
              onChange={(e) => setNewWaiter({...newWaiter, password: e.target.value})}
              className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Password"
            />
          </div>
          
          <button
            onClick={addWaiter}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <UserPlus size={18} />
            Add Waiter
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Waiters</h2>
          </div>
          
          <div className="space-y-4">
            {waiters.map(waiter => (
              <div key={waiter.id} className={`border-2 rounded-xl p-4 transition-all duration-200 ${waiter.active ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                {editingWaiter === waiter.id ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      defaultValue={waiter.name}
                      placeholder="Full Name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateWaiter(waiter.id, { name: e.target.value });
                        }
                      }}
                    />
                    <input
                      type="text"
                      defaultValue={waiter.username}
                      placeholder="Username"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateWaiter(waiter.id, { username: e.target.value });
                        }
                      }}
                    />
                    <input
                      type="password"
                      defaultValue={waiter.password}
                      placeholder="Password"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateWaiter(waiter.id, { password: e.target.value });
                        }
                      }}
                    />
                    <button
                      onClick={() => setEditingWaiter(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{waiter.name}</h3>
                      <p className="text-gray-600">@{waiter.username}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${waiter.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {waiter.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setEditingWaiter(waiter.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => toggleWaiterStatus(waiter.id)}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${waiter.active ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                      >
                        {waiter.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteWaiter(waiter.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // New Order Component
  const NewOrderForm = () => {
    const [newOrder, setNewOrder] = useState({
      items: [],
      tokenNumber: ''
    });

    const addItemToOrder = (item) => {
      const existingItem = newOrder.items.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        setNewOrder({
          ...newOrder,
          items: newOrder.items.map(orderItem =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          )
        });
      } else {
        setNewOrder({
          ...newOrder,
          items: [...newOrder.items, { ...item, quantity: 1 }]
        });
      }
    };

    const removeItemFromOrder = (itemId) => {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.filter(item => item.id !== itemId)
      });
    };

    const updateItemQuantity = (itemId, quantity) => {
      if (quantity === 0) {
        removeItemFromOrder(itemId);
        return;
      }
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map(item =>
          item.id === itemId ? { ...item, quantity: quantity } : item
        )
      });
    };

    const submitOrder = () => {
      if (!newOrder.tokenNumber || newOrder.items.length === 0) {
        alert('Please enter token number and add at least one item');
        return;
      }

      if (orders.find(order => order.tokenNumber === newOrder.tokenNumber)) {
        alert('Token number already exists! Please use a different token number.');
        return;
      }

      const order = {
        id: Date.now(),
        tokenNumber: newOrder.tokenNumber,
        items: newOrder.items,
        status: 'pending',
        createdBy: currentUser.name || currentUser.username,
        createdAt: new Date().toISOString(),
        paymentStatus: 'unpaid',
        totalAmount: 0,
        paymentMethod: null,
        editHistory: [
          {
            action: 'created',
            by: currentUser.name || currentUser.username,
            timestamp: new Date().toISOString(),
            details: 'Order created'
          }
        ]
      };

      setOrders([...orders, order]);
      setNewOrder({ items: [], tokenNumber: '' });
      setActiveTab('orders');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Order</h2>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Token Number</label>
            <input
              type="text"
              value={newOrder.tokenNumber}
              onChange={(e) => setNewOrder({...newOrder, tokenNumber: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-lg font-semibold"
              placeholder="Enter token number (e.g., 1001, A123, etc.)"
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Food Items</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {menuItems.food.map(item => (
                <button
                  key={item.id}
                  onClick={() => addItemToOrder(item)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Drinks</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {menuItems.drinks.map(item => (
                <button
                  key={item.id}
                  onClick={() => addItemToOrder(item)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {newOrder.items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
              <div className="space-y-3">
                {newOrder.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg min-w-[30px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItemFromOrder(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={submitOrder}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit Order
          </button>
        </div>
      </div>
    );
  };

  // Orders List Component
  const OrdersList = () => {
    const [editingOrder, setEditingOrder] = useState(null);
    const [editOrderItems, setEditOrderItems] = useState([]);
    const [showHistory, setShowHistory] = useState({});
    const [paymentModal, setPaymentModal] = useState(null);
    const [searchToken, setSearchToken] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [viewFilter, setViewFilter] = useState('all');

    const updateOrderStatus = (orderId, status) => {
      setOrders(orders.map(order =>
        order.id === orderId ? { 
          ...order, 
          status,
          editHistory: [
            ...order.editHistory,
            {
              action: 'status_updated',
              by: currentUser.name || currentUser.username,
              timestamp: new Date().toISOString(),
              details: `Status changed to ${status}`
            }
          ]
        } : order
      ));
    };

    // Filter orders based on search token and view filter
    React.useEffect(() => {
      let filtered = orders;
      
      // Apply view filter first
      if (viewFilter === 'my-orders' && currentUser.role === 'waiter') {
        filtered = orders.filter(order => order.createdBy === (currentUser.name || currentUser.username));
      }
      
      // Then apply search filter
      if (searchToken.trim()) {
        filtered = filtered.filter(order => 
          order.tokenNumber.toLowerCase().includes(searchToken.toLowerCase())
        );
      }
      
      setFilteredOrders(filtered);
    }, [orders, searchToken, viewFilter, currentUser]);

    const startEditingOrder = (order) => {
      // Check if order can be edited (not paid) - applies to ALL users
      if (order.paymentStatus === 'paid') {
        alert('Cannot edit order - payment has been completed. Paid orders cannot be modified.');
        return;
      }
      
      setEditingOrder(order.id);
      setEditOrderItems([...order.items]);
    };

    const cancelEditingOrder = () => {
      setEditingOrder(null);
      setEditOrderItems([]);
    };

    const saveOrderChanges = (orderId) => {
      setOrders(orders.map(order =>
        order.id === orderId ? { 
          ...order, 
          items: editOrderItems,
          editHistory: [
            ...order.editHistory,
            {
              action: 'items_updated',
              by: currentUser.name || currentUser.username,
              timestamp: new Date().toISOString(),
              details: 'Order items modified'
            }
          ]
        } : order
      ));
      setEditingOrder(null);
      setEditOrderItems([]);
    };

    const addItemToEditOrder = (item) => {
      const existingItem = editOrderItems.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        setEditOrderItems(editOrderItems.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        ));
      } else {
        setEditOrderItems([...editOrderItems, { ...item, quantity: 1 }]);
      }
    };

    const updateEditItemQuantity = (itemId, quantity) => {
      if (quantity === 0) {
        setEditOrderItems(editOrderItems.filter(item => item.id !== itemId));
        return;
      }
      setEditOrderItems(editOrderItems.map(item =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      ));
    };

    const removeEditItem = (itemId) => {
      setEditOrderItems(editOrderItems.filter(item => item.id !== itemId));
    };

    const processPayment = (orderId, amount, method) => {
      setOrders(orders.map(order =>
        order.id === orderId 
          ? { 
            ...order, 
            paymentStatus: 'paid', 
            totalAmount: parseFloat(amount), 
            paymentMethod: method, 
            status: 'completed',
            editHistory: [
              ...order.editHistory,
              {
                action: 'payment_processed',
                by: currentUser.name || currentUser.username,
                timestamp: new Date().toISOString(),
                details: `Payment processed: $${amount} via ${method}`
              }
            ]
          }
          : order
      ));
    };

    const toggleHistory = (orderId) => {
      setShowHistory(prev => ({
        ...prev,
        [orderId]: !prev[orderId]
      }));
    };

    const PaymentModal = ({ order, onClose }) => {
      const [amount, setAmount] = useState('');
      const [method, setMethod] = useState('cash');

      const handlePayment = () => {
        if (!amount || parseFloat(amount) <= 0) {
          alert('Please enter valid amount');
          return;
        }
        processPayment(order.id, amount, method);
        onClose();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="text-blue-600" size={24} />
                Process Payment - Token #{order.tokenNumber}
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter total amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="cash">Cash</option>
                  <option value="online">Online</option>
                </select>
              </div>
              
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {/* Search Bar and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Search & Filter Orders</h2>
          </div>
          
          {/* View Filter - Only show for waiters */}
          {currentUser.role === 'waiter' && (
            <div className="mb-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setViewFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    viewFilter === 'all' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Orders ({orders.length})
                </button>
                <button
                  onClick={() => setViewFilter('my-orders')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    viewFilter === 'my-orders' 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  My Orders ({orders.filter(order => order.createdBy === (currentUser.name || currentUser.username)).length})
                </button>
              </div>
            </div>
          )}
          
          <div className="relative">
            <input
              type="text"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-lg pl-12"
              placeholder="Search by token number (e.g., 1001, A123)..."
            />
            <Eye className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          {searchToken && (
            <div className="mt-3 text-sm text-gray-600">
              {filteredOrders.length === 0 
                ? `No orders found for "${searchToken}"` 
                : `Found ${filteredOrders.length} order${filteredOrders.length === 1 ? '' : 's'} matching "${searchToken}"`
              }
            </div>
          )}
          
          {!searchToken && currentUser.role === 'waiter' && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {viewFilter === 'all' ? 'all orders' : 'your orders'} 
              {viewFilter === 'all' && ` (${filteredOrders.length} total)`}
              {viewFilter === 'my-orders' && ` (${filteredOrders.length} of your orders)`}
            </div>
          )}
        </div>

        {filteredOrders.length === 0 && !searchToken && viewFilter === 'all' ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 text-lg font-medium">No orders yet</p>
            <p className="text-gray-400 text-sm mt-2">Create your first order to get started</p>
          </div>
        ) : filteredOrders.length === 0 && (searchToken || viewFilter === 'my-orders') ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Eye className="text-yellow-600" size={32} />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              {searchToken ? 'No orders found' : 'No orders in this view'}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {searchToken 
                ? 'Try searching with a different token number' 
                : viewFilter === 'my-orders' 
                  ? 'You haven\'t created any orders yet'
                  : 'No orders available'
              }
            </p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Token #{order.tokenNumber}
                    </h3>
                    {currentUser.role === 'waiter' && order.createdBy === (currentUser.name || currentUser.username) && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold border border-green-200">
                        Your Order
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Created by: {order.createdBy}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    order.status === 'ready' ? 'bg-green-100 text-green-800 border border-green-200' :
                    'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Items:</h4>
                {editingOrder === order.id ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {editOrderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                          <span className="font-semibold text-gray-800">{item.name}</span>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateEditItemQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              -
                            </button>
                            <span className="font-bold text-lg min-w-[30px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateEditItemQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeEditItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-3 text-gray-700">Add Food Items:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                        {menuItems.food.map(item => (
                          <button
                            key={item.id}
                            onClick={() => addItemToEditOrder(item)}
                            className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                      
                      <h5 className="font-medium mb-3 text-gray-700">Add Drinks:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                        {menuItems.drinks.map(item => (
                          <button
                            key={item.id}
                            onClick={() => addItemToEditOrder(item)}
                            className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => saveOrderChanges(order.id)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEditingOrder}
                        className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                        <span className="font-medium">{item.name} x {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {order.paymentStatus === 'paid' && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <p className="text-green-800 font-semibold">
                    Payment Completed: ${order.totalAmount} via {order.paymentMethod}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-4">
                {editingOrder !== order.id && order.paymentStatus === 'unpaid' && (
                  <button
                    onClick={() => startEditingOrder(order)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Edit size={16} />
                    Edit Order
                  </button>
                )}
                
                {order.paymentStatus === 'paid' && (
                  <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold flex items-center gap-2 cursor-not-allowed border border-red-200">
                    <X size={16} />
                    Cannot Edit - Payment Completed
                  </div>
                )}

                {(currentUser.role === 'waiter' || currentUser.role === 'admin') && order.status !== 'completed' && editingOrder !== order.id && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Mark Preparing
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Mark Ready
                    </button>
                  </>
                )}

                {(currentUser.role === 'cashier' || currentUser.role === 'admin') && order.paymentStatus === 'unpaid' && editingOrder !== order.id && (
                  <button
                    onClick={() => setPaymentModal(order)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <CreditCard size={16} />
                    Process Payment
                  </button>
                )}

                <button
                  onClick={() => toggleHistory(order.id)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Clock size={16} />
                  {showHistory[order.id] ? 'Hide' : 'Show'} History
                </button>
              </div>

              {showHistory[order.id] && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h5 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
                    <Clock size={18} />
                    Order History
                  </h5>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {order.editHistory.map((entry, idx) => (
                      <div key={idx} className="text-sm bg-white p-3 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium text-blue-800">{entry.by}</span>
                            <span className="text-gray-600 ml-2">{entry.details}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {paymentModal && (
          <PaymentModal 
            order={paymentModal} 
            onClose={() => setPaymentModal(null)} 
          />
        )}
      </div>
    );
  };

  // Sales Analytics Component (Admin only)
  const SalesAnalytics = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [dateRange, setDateRange] = useState('today');
    
    // Calculate analytics based on orders
    const calculateAnalytics = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const selectedDateObj = new Date(selectedDate);
      const selectedDateStart = new Date(selectedDateObj.getFullYear(), selectedDateObj.getMonth(), selectedDateObj.getDate());
      const selectedDateEnd = new Date(selectedDateStart.getTime() + 24 * 60 * 60 * 1000);
      
      const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
      
      const filterOrdersByDate = (orders, startDate, endDate = null) => {
        return orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          if (endDate) {
            return orderDate >= startDate && orderDate < endDate;
          }
          return orderDate >= startDate;
        });
      };
      
      // Today's analytics
      const todayOrders = filterOrdersByDate(paidOrders, today);
      const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const todayItemsSold = todayOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
      
      // Yesterday's analytics
      const yesterdayOrders = filterOrdersByDate(paidOrders, yesterday, today);
      const yesterdayRevenue = yesterdayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      // This week's analytics
      const weekOrders = filterOrdersByDate(paidOrders, thisWeek);
      const weekRevenue = weekOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      // This month's analytics
      const monthOrders = filterOrdersByDate(paidOrders, thisMonth);
      const monthRevenue = monthOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      // Selected date analytics
      const selectedDateOrders = filterOrdersByDate(paidOrders, selectedDateStart, selectedDateEnd);
      const selectedDateRevenue = selectedDateOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const selectedDateItemsSold = selectedDateOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
      
      // Popular items analysis
      const itemSales = {};
      paidOrders.forEach(order => {
        order.items.forEach(item => {
          if (itemSales[item.name]) {
            itemSales[item.name] += item.quantity;
          } else {
            itemSales[item.name] = item.quantity;
          }
        });
      });
      
      const popularItems = Object.entries(itemSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([name, quantity]) => ({ name, quantity }));
      
      // Payment method analysis
      const paymentMethods = {};
      paidOrders.forEach(order => {
        if (order.paymentMethod) {
          paymentMethods[order.paymentMethod] = (paymentMethods[order.paymentMethod] || 0) + 1;
        }
      });
      
      // Waiter performance
      const waiterStats = {};
      paidOrders.forEach(order => {
        const waiter = order.createdBy;
        if (!waiterStats[waiter]) {
          waiterStats[waiter] = { orders: 0, revenue: 0 };
        }
        waiterStats[waiter].orders += 1;
        waiterStats[waiter].revenue += order.totalAmount || 0;
      });
      
      const waiterPerformance = Object.entries(waiterStats)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.revenue - a.revenue);
      
      // Growth calculations
      const revenueGrowth = yesterdayRevenue > 0 ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100) : 0;
      
      return {
        today: {
          orders: todayOrders.length,
          revenue: todayRevenue,
          itemsSold: todayItemsSold,
          avgOrderValue: todayOrders.length > 0 ? todayRevenue / todayOrders.length : 0
        },
        yesterday: {
          orders: yesterdayOrders.length,
          revenue: yesterdayRevenue
        },
        week: {
          orders: weekOrders.length,
          revenue: weekRevenue
        },
        month: {
          orders: monthOrders.length,
          revenue: monthRevenue
        },
        selectedDate: {
          orders: selectedDateOrders.length,
          revenue: selectedDateRevenue,
          itemsSold: selectedDateItemsSold,
          date: selectedDate
        },
        popularItems,
        paymentMethods,
        waiterPerformance,
        revenueGrowth,
        totalOrders: orders.length,
        paidOrders: paidOrders.length,
        unpaidOrders: orders.length - paidOrders.length
      };
    };
    
    const analytics = calculateAnalytics();
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sales Analytics & Reports</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-500" />
              <span className="font-semibold text-gray-700">Select Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Orders</h3>
              <ShoppingCart size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">{analytics.today.orders}</p>
            <div className="flex items-center gap-2 text-blue-100">
              <TrendingUp size={16} />
              <span className="text-sm">vs Yesterday: {analytics.yesterday.orders}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Revenue</h3>
              <DollarSign size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">${analytics.today.revenue.toFixed(2)}</p>
            <div className="flex items-center gap-2 text-green-100">
              <TrendingUp size={16} />
              <span className={`text-sm ${analytics.revenueGrowth >= 0 ? 'text-green-100' : 'text-red-200'}`}>
                {analytics.revenueGrowth >= 0 ? '+' : ''}{analytics.revenueGrowth.toFixed(1)}% vs Yesterday
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Items Sold Today</h3>
              <BarChart3 size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">{analytics.today.itemsSold}</p>
            <div className="text-purple-100 text-sm">
              Avg per order: {analytics.today.orders > 0 ? (analytics.today.itemsSold / analytics.today.orders).toFixed(1) : '0'}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Avg Order Value</h3>
              <CreditCard size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">${analytics.today.avgOrderValue.toFixed(2)}</p>
            <div className="text-orange-100 text-sm">
              Based on {analytics.today.orders} orders
            </div>
          </div>
        </div>

        {/* Period Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              This Week
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Orders:</span>
                <span className="font-semibold">{analytics.week.orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-semibold text-green-600">${analytics.week.revenue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Calendar className="text-purple-600" size={20} />
              This Month
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Orders:</span>
                <span className="font-semibold">{analytics.month.orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-semibold text-green-600">${analytics.month.revenue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Eye className="text-orange-600" size={20} />
              Selected Date ({analytics.selectedDate.date})
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Orders:</span>
                <span className="font-semibold">{analytics.selectedDate.orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-semibold text-green-600">${analytics.selectedDate.revenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items Sold:</span>
                <span className="font-semibold">{analytics.selectedDate.itemsSold}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={24} />
            Top Selling Items (All Time)
          </h3>
          
          {analytics.popularItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.popularItems.map((item, index) => (
                <div key={item.name} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-800">#{index + 1} {item.name}</span>
                      <p className="text-sm text-gray-600">Sold: {item.quantity} units</p>
                    </div>
                    <div className="text-right">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No sales data available</p>
          )}
        </div>

        {/* Payment Methods & Waiter Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <CreditCard className="text-blue-600" size={24} />
              Payment Methods
            </h3>
            
            {Object.keys(analytics.paymentMethods).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analytics.paymentMethods).map(([method, count]) => (
                  <div key={method} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <span className="font-semibold text-gray-800 capitalize">{method}</span>
                    <div className="text-right">
                      <span className="font-bold text-blue-600">{count} orders</span>
                      <div className="text-sm text-gray-600">
                        {((count / analytics.paidOrders) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No payment data available</p>
            )}
          </div>

          {/* Waiter Performance */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Users className="text-purple-600" size={24} />
              Waiter Performance
            </h3>
            
            {analytics.waiterPerformance.length > 0 ? (
              <div className="space-y-4">
                {analytics.waiterPerformance.map((waiter, index) => (
                  <div key={waiter.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-gold bg-yellow-500' : 'bg-purple-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-800">{waiter.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${waiter.revenue.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">{waiter.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No waiter data available</p>
            )}
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={24} />
            Overall Statistics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{analytics.totalOrders}</div>
              <div className="text-gray-700 font-semibold">Total Orders</div>
              <div className="text-sm text-gray-500 mt-1">All time</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">{analytics.paidOrders}</div>
              <div className="text-gray-700 font-semibold">Completed Orders</div>
              <div className="text-sm text-gray-500 mt-1">
                {analytics.totalOrders > 0 ? ((analytics.paidOrders / analytics.totalOrders) * 100).toFixed(1) : 0}% completion rate
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">{analytics.unpaidOrders}</div>
              <div className="text-gray-700 font-semibold">Pending Orders</div>
              <div className="text-sm text-gray-500 mt-1">Awaiting payment</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const MenuManagement = () => {
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', category: 'food' });

    const addMenuItem = () => {
      if (!newItem.name) {
        alert('Please enter item name');
        return;
      }

      const item = {
        id: Date.now(),
        name: newItem.name,
        category: newItem.category
      };

      setMenuItems({
        ...menuItems,
        [newItem.category]: [...menuItems[newItem.category], item]
      });

      setNewItem({ name: '', category: 'food' });
    };

    const deleteMenuItem = (itemId, category) => {
      setMenuItems({
        ...menuItems,
        [category]: menuItems[category].filter(item => item.id !== itemId)
      });
    };

    const updateMenuItem = (itemId, category, newName) => {
      setMenuItems({
        ...menuItems,
        [category]: menuItems[category].map(item =>
          item.id === itemId ? { ...item, name: newName } : item
        )
      });
      setEditingItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Menu Item</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter item name"
            />
            
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="food">Food</option>
              <option value="drinks">Drinks</option>
            </select>
            
            <button
              onClick={addMenuItem}
              className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={18} />
              Add Item
            </button>
          </div>
        </div>

        {['food', 'drinks'].map(category => (
          <div key={category} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 capitalize">{category} Items</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems[category].map(item => (
                <div key={item.id} className="border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-300 transition-all duration-200">
                  {editingItem === item.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        defaultValue={item.name}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            updateMenuItem(item.id, category, e.target.value);
                          }
                        }}
                        className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingItem(item.id)}
                          className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item.id, category)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Restaurant POS</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{currentUser.name || currentUser.username}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart size={18} />
                <span>Orders</span>
              </div>
            </button>
            
            {(currentUser.role === 'waiter' || currentUser.role === 'admin') && (
              <button
                onClick={() => setActiveTab('new-order')}
                className={`py-4 px-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'new-order'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Plus size={18} />
                  <span>New Order</span>
                </div>
              </button>
            )}
            
            {currentUser.role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`py-4 px-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'menu'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Edit size={18} />
                    <span>Menu</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3 size={18} />
                    <span>Analytics</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('waiters')}
                  className={`py-4 px-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'waiters'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users size={18} />
                    <span>Waiters</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'orders' && <OrdersList />}
        {activeTab === 'new-order' && <NewOrderForm />}
        {activeTab === 'menu' && currentUser.role === 'admin' && <MenuManagement />}
        {activeTab === 'analytics' && currentUser.role === 'admin' && <SalesAnalytics />}
        {activeTab === 'waiters' && currentUser.role === 'admin' && <WaiterManagement />}
      </main>
    </div>
  );
};

export default RestaurantOrderApp;