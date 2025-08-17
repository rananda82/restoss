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

      // Check if token number is already in use by an unpaid order
      const existingUnpaidOrder = orders.find(order => 
        order.tokenNumber === newOrder.tokenNumber && order.paymentStatus === 'unpaid'
      );
      
      if (existingUnpaidOrder) {
        alert('Token number is already in use by an unpaid order! Please complete payment for the existing order or use a different token number.');
        return;
      }

      // Generate permanent unique order number (format: ORD-YYYYMMDD-HHMMSS-XXX)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      const permanentOrderNumber = `ORD-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;

      const order = {
        id: Date.now(),
        permanentOrderNumber,
        tokenNumber: newOrder.tokenNumber,
        items: newOrder.items,
        status: 'pending',
        createdBy: currentUser.name || currentUser.username,
        createdAt: new Date().toISOString(),
        paymentStatus: 'unpaid',
        totalAmount: 0,
        discountAmount: 0,
        finalAmount: 0,
        paymentMethod: null,
        editHistory: [
          {
            action: 'created',
            by: currentUser.name || currentUser.username,
            timestamp: new Date().toISOString(),
            details: `Order created with permanent ID: ${permanentOrderNumber}`
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
    const [orderDetailsModal, setOrderDetailsModal] = useState(null);
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

    // Filter and sort orders based on search token, view filter, and user role
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
      
      // Sort orders: for admin/cashier - unpaid first, then by creation date desc
      // For waiters - keep normal order (newest first)
      if (currentUser.role === 'admin' || currentUser.role === 'cashier') {
        filtered = filtered.sort((a, b) => {
          // First priority: unpaid orders come first
          if (a.paymentStatus !== b.paymentStatus) {
            if (a.paymentStatus === 'unpaid') return -1;
            if (b.paymentStatus === 'unpaid') return 1;
          }
          // Second priority: sort by creation date (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else {
        // For waiters, just sort by newest first
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

    const processPayment = (orderId, amount, method, discountAmount = 0) => {
      const finalAmount = parseFloat(amount) - parseFloat(discountAmount);
      
      if (finalAmount < 0) {
        alert('Final amount cannot be negative');
        return;
      }

      setOrders(orders.map(order =>
        order.id === orderId 
          ? { 
            ...order, 
            paymentStatus: 'paid', 
            totalAmount: parseFloat(amount), 
            discountAmount: parseFloat(discountAmount),
            finalAmount: finalAmount,
            paymentMethod: method, 
            status: 'completed',
            editHistory: [
              ...order.editHistory,
              {
                action: 'payment_processed',
                by: currentUser.name || currentUser.username,
                timestamp: new Date().toISOString(),
                details: `Payment processed: ${amount}${discountAmount > 0 ? ` (Discount: ${discountAmount})` : ''} = ${finalAmount.toFixed(2)} via ${method}`
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

    // Simple PaymentModal for backward compatibility
    const PaymentModal = ({ order, onClose }) => {
      return null; // This is now handled by OrderDetailsModal
    };

    // Calculator Component for Payment Modal
    const Calculator = ({ onNumberClick }) => {
      const numbers = [
        [7, 8, 9],
        [4, 5, 6], 
        [1, 2, 3],
        ['.', 0, 'C']
      ];

      const handleClick = (value) => {
        onNumberClick(value);
      };

      const isMobile = window.innerWidth < 768;

      return (
        <div className={`grid grid-cols-3 gap-2 p-3 bg-gray-100 rounded-xl ${isMobile ? 'max-w-xs mx-auto' : ''}`}>
          {numbers.flat().map((num, index) => (
            <button
              key={index}
              onClick={() => handleClick(num)}
              className={`${isMobile ? 'h-14' : 'h-12'} rounded-lg font-bold ${isMobile ? 'text-xl' : 'text-lg'} transition-all duration-200 ${
                num === 'C' 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' 
                  : num === '.'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm hover:shadow-md border border-gray-200'
              } transform hover:-translate-y-0.5 active:scale-95`}
            >
              {num === 'C' ? '🗑️' : num}
            </button>
          ))}
        </div>
      );
    };

    // Order Details Modal Component
    const OrderDetailsModal = ({ order, onClose }) => {
      const [amount, setAmount] = useState('');
      const [method, setMethod] = useState('cash');
      const [discountAmount, setDiscountAmount] = useState('0');
      const [discountReason, setDiscountReason] = useState('');

      const handleCalculatorClick = (value) => {
        if (value === 'C') {
          setAmount('');
        } else if (value === '.') {
          if (!amount.includes('.')) {
            setAmount(amount + '.');
          }
        } else {
          setAmount(amount + value.toString());
        }
      };

      const calculateFinal = () => {
        const total = parseFloat(amount) || 0;
        const discount = parseFloat(discountAmount) || 0;
        return Math.max(0, total - discount);
      };

      const handlePayment = () => {
        if (!amount || parseFloat(amount) <= 0) {
          alert('Please enter valid amount');
          return;
        }
        
        if (parseFloat(discountAmount) > parseFloat(amount)) {
          alert('Discount amount cannot be greater than total amount');
          return;
        }

        if (parseFloat(discountAmount) > 0 && !discountReason.trim()) {
          alert('Please provide a reason for the discount');
          return;
        }

        processPayment(order.id, amount, method, discountAmount);
        
        // Add discount reason to edit history if discount was applied
        if (parseFloat(discountAmount) > 0) {
          setOrders(prevOrders => prevOrders.map(o =>
            o.id === order.id 
              ? {
                ...o,
                discountReason: discountReason.trim(),
                editHistory: [
                  ...o.editHistory,
                  {
                    action: 'discount_applied',
                    by: currentUser.name || currentUser.username,
                    timestamp: new Date().toISOString(),
                    details: `Discount applied: ${discountAmount} - Reason: ${discountReason.trim()}`
                  }
                ]
              }
              : o
          ));
        }
        
        onClose();
      };

      // Responsive modal based on screen size
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
            isMobile 
              ? 'w-full h-full max-h-screen overflow-y-auto' 
              : isTablet 
                ? 'w-full max-w-4xl max-h-[95vh] overflow-y-auto' 
                : 'w-full max-w-7xl max-h-[90vh] overflow-y-auto'
          }`}>
            {/* Header - Sticky on mobile */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-blue-600" size={isMobile ? 20 : 24} />
                  </div>
                  <span className="truncate">Token #{order.tokenNumber}</span>
                </h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className={`p-4 sm:p-6 ${
              order.paymentStatus === 'unpaid' && !isMobile 
                ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' 
                : 'space-y-6'
            }`}>
              {/* Left Side - Order Information */}
              <div className={`space-y-4 sm:space-y-6 ${
                order.paymentStatus === 'unpaid' && !isMobile ? 'xl:order-1' : ''
              }`}>
                {/* Order Information Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                  <h4 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                      <ShoppingCart size={14} className="text-blue-700" />
                    </div>
                    Order Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Token Number:</span>
                      <span className="font-semibold text-blue-600 text-lg">#{order.tokenNumber}</span>
                    </div>
                    {(currentUser.role === 'admin' || currentUser.role === 'cashier') && (
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-mono text-xs text-right max-w-[60%] break-all">{order.permanentOrderNumber}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created by:</span>
                      <span className="font-semibold truncate max-w-[60%]">{order.createdBy}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">Created at:</span>
                      <span className="text-right text-xs max-w-[60%]">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'ready' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Payment:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items Card */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <ShoppingCart size={14} className="text-gray-700" />
                    </div>
                    Order Items ({order.items.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border hover:shadow-sm transition-shadow">
                        <span className="font-medium text-gray-800 truncate flex-1 mr-2">{item.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm text-gray-600">x{item.quantity}</span>
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment History if Paid */}
                {order.paymentStatus === 'paid' && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-200">
                    <h4 className="text-base sm:text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <CreditCard size={14} className="text-green-700" />
                      </div>
                      Payment Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                      </div>
                      {order.discountAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-red-600">Discount:</span>
                          <span className="font-semibold text-red-600">-${order.discountAmount?.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-semibold capitalize">{order.paymentMethod}</span>
                      </div>
                      <div className="border-t border-green-300 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-green-700 font-bold">Final Amount:</span>
                          <span className="font-bold text-green-700 text-lg">${order.finalAmount?.toFixed(2) || order.totalAmount?.toFixed(2) || '0.00'}</span>
                        </div>
                      </div>
                      {order.discountReason && (
                        <div className="mt-2 pt-2 border-t border-green-300">
                          <span className="text-xs text-green-700">
                            <strong>Discount Reason:</strong> {order.discountReason}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Payment Section (Only show if unpaid) */}
              {order.paymentStatus === 'unpaid' && (
                <div className={`space-y-4 sm:space-y-6 ${
                  !isMobile ? 'xl:order-2' : ''
                }`}>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-200 sticky top-20 max-h-[80vh] overflow-y-auto">
                    <h4 className="text-base sm:text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                      <CreditCard size={20} />
                      Process Payment
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Calculator Section - Moved to top for better UX */}
                      <div className="order-first">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Calculator</label>
                        <Calculator onNumberClick={handleCalculatorClick} />
                      </div>

                      {/* Amount Display - Large and prominent */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount ($)</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-4 sm:p-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-2xl sm:text-3xl font-bold text-center bg-white"
                            placeholder="0.00"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">$</div>
                        </div>
                      </div>

                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 50, 100].map(quickAmount => (
                          <button
                            key={quickAmount}
                            onClick={() => setAmount(quickAmount.toString())}
                            className="py-2 px-3 bg-white border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-sm font-semibold text-purple-700"
                          >
                            ${quickAmount}
                          </button>
                        ))}
                      </div>

                      {/* Payment Method - Prominent buttons */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setMethod('online')}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 ${
                              method === 'online'
                                ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                            }`}
                          >
                            <CreditCard size={20} />
                            Online
                          </button>
                        </div>
                      </div>

                      {/* Discount Section */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={discountAmount}
                          onChange={(e) => setDiscountAmount(e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="0.00"
                        />
                      </div>

                      {parseFloat(discountAmount) > 0 && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Reason</label>
                          <input
                            type="text"
                            value={discountReason}
                            onChange={(e) => setDiscountReason(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            placeholder="Why is discount being applied?"
                          />
                        </div>
                      )}

                      {/* Final Amount Display */}
                      {amount && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Subtotal:</span>
                              <span className="font-semibold text-lg">${parseFloat(amount || 0).toFixed(2)}</span>
                            </div>
                            {parseFloat(discountAmount) > 0 && (
                              <div className="flex justify-between">
                                <span className="text-red-600">Discount:</span>
                                <span className="font-semibold text-red-600">-${parseFloat(discountAmount).toFixed(2)}</span>
                              </div>
                            )}
                            <div className="border-t border-green-300 pt-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-800 font-bold">Final Amount:</span>
                                <span className="font-bold text-green-600 text-2xl">${calculateFinal().toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Complete Payment Button */}
                      <button
                        onClick={handlePayment}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className={`w-full py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl transform transition-all duration-200 ${
                          amount && parseFloat(amount) > 0
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:-translate-y-0.5'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        💳 Complete Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* If order is paid, show payment completed message */}
              {order.paymentStatus === 'paid' && (
                <div className={`flex items-center justify-center ${!isMobile ? 'xl:col-span-2' : ''}`}>
                  <div className="text-center p-6 sm:p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 w-full max-w-md">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">✅ Payment Completed</h4>
                    <p className="text-green-600">This order has been fully paid</p>
                    <div className="mt-4 text-green-800">
                      <div className="text-2xl font-bold">${order.finalAmount?.toFixed(2) || order.totalAmount?.toFixed(2) || '0.00'}</div>
                      <div className="text-sm opacity-75">via {order.paymentMethod}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };Method('cash')}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 ${
                              method === 'cash'
                                ? 'bg-green-500 border-green-500 text-white shadow-lg'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-green-300'
                            }`}
                          >
                            <DollarSign size={20} />
                            Cash
                          </button>
                          <button
                            onClick={() => set

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
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    {/* Clickable Token Number for Admin/Cashier */}
                    {(currentUser.role === 'admin' || currentUser.role === 'cashier') ? (
                      <button
                        onClick={() => setOrderDetailsModal(order)}
                        className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-200 cursor-pointer hover:scale-105 transform text-left"
                      >
                        Token #{order.tokenNumber}
                      </button>
                    ) : (
                      <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Token #{order.tokenNumber}
                      </h3>
                    )}
                    {currentUser.role === 'waiter' && order.createdBy === (currentUser.name || currentUser.username) && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold border border-green-200 self-start">
                        Your Order
                      </span>
                    )}
                  </div>
                  
                  {/* Show permanent order number only to admin and cashier */}
                  {(currentUser.role === 'admin' || currentUser.role === 'cashier') && (
                    <p className="text-xs text-gray-400 mb-1 font-mono break-all">ID: {order.permanentOrderNumber}</p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                    <span>Created by: <span className="font-medium">{order.createdBy}</span></span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-xs">{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
                  <span className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-center transition-all duration-200 ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    order.status === 'ready' ? 'bg-green-100 text-green-800 border border-green-200' :
                    'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  
                  <span className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-center transition-all duration-200 ${
                    order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {order.paymentStatus === 'paid' ? '💳 Paid' : '⏳ Unpaid'}
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
                  <div className="space-y-2">
                    <p className="text-green-800 font-semibold">Payment Completed</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="ml-2 font-semibold">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                      </div>
                      {order.discountAmount > 0 && (
                        <div>
                          <span className="text-red-600">Discount:</span>
                          <span className="ml-2 font-semibold text-red-600">-${order.discountAmount?.toFixed(2)}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Method:</span>
                        <span className="ml-2 font-semibold capitalize">{order.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-green-700 font-bold">Final:</span>
                        <span className="ml-2 font-bold text-green-700">${order.finalAmount?.toFixed(2) || order.totalAmount?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                    {order.discountReason && (
                      <div className="mt-3 pt-2 border-t border-green-300">
                        <span className="text-xs text-green-700">
                          <strong>Discount Reason:</strong> {order.discountReason}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                {editingOrder !== order.id && order.paymentStatus === 'unpaid' && (
                  <button
                    onClick={() => startEditingOrder(order)}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                  >
                    <Edit size={14} />
                    <span className="hidden sm:inline">Edit Order</span>
                    <span className="sm:hidden">Edit</span>
                  </button>
                )}
                
                {order.paymentStatus === 'paid' && (
                  <div className="px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold flex items-center gap-2 cursor-not-allowed border border-red-200 text-sm">
                    <X size={14} />
                    <span className="hidden sm:inline">Cannot Edit - Payment Completed</span>
                    <span className="sm:hidden">Paid - No Edit</span>
                  </div>
                )}

                {(currentUser.role === 'waiter' || currentUser.role === 'admin') && order.status !== 'completed' && editingOrder !== order.id && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                    >
                      <span className="hidden sm:inline">Mark Preparing</span>
                      <span className="sm:hidden">Preparing</span>
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                    >
                      <span className="hidden sm:inline">Mark Ready</span>
                      <span className="sm:hidden">Ready</span>
                    </button>
                  </>
                )}

                {(currentUser.role === 'cashier' || currentUser.role === 'admin') && order.paymentStatus === 'unpaid' && editingOrder !== order.id && (
                  <button
                    onClick={() => setOrderDetailsModal(order)}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                  >
                    <CreditCard size={14} />
                    <span className="hidden sm:inline">Process Payment</span>
                    <span className="sm:hidden">Pay</span>
                  </button>
                )}

                <button
                  onClick={() => toggleHistory(order.id)}
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                >
                  <Clock size={14} />
                  <span className="hidden sm:inline">{showHistory[order.id] ? 'Hide' : 'Show'} History</span>
                  <span className="sm:hidden">{showHistory[order.id] ? 'Hide' : 'Show'}</span>
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

        {orderDetailsModal && (
          <OrderDetailsModal 
            order={orderDetailsModal} 
            onClose={() => setOrderDetailsModal(null)} 
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
      const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
      const todayItemsSold = todayOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
      
      // Yesterday's analytics
      const yesterdayOrders = filterOrdersByDate(paidOrders, yesterday, today);
      const yesterdayRevenue = yesterdayOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
      
      // This week's analytics
      const weekOrders = filterOrdersByDate(paidOrders, thisWeek);
      const weekRevenue = weekOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
      
      // This month's analytics
      const monthOrders = filterOrdersByDate(paidOrders, thisMonth);
      const monthRevenue = monthOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
      
      // Selected date analytics
      const selectedDateOrders = filterOrdersByDate(paidOrders, selectedDateStart, selectedDateEnd);
      const selectedDateRevenue = selectedDateOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
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
        waiterStats[waiter].revenue += (order.finalAmount || order.totalAmount || 0);
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