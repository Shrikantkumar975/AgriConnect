import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/auth/Login';
import AdminLogin from './pages/auth/AdminLogin';
import Register from './pages/auth/Register';
import AuthSuccess from './pages/auth/AuthSuccess';
import AddCrop from './pages/farmer/AddCrop';
import Marketplace from './pages/buyer/Marketplace';
import Cart from './pages/buyer/Cart';
import Chat from './pages/common/Chat';
import ProtectedRoute from './components/common/ProtectedRoute';
import Profile from './pages/common/Profile';
import MyCrops from './pages/farmer/MyCrops';
import OrderHistory from './pages/buyer/OrderHistory';
import FarmerOrders from './pages/farmer/FarmerOrders';
import Home from './pages/common/Home';
import CropDetails from './pages/common/CropDetails';

import MainLayout from './components/common/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <CartProvider>
            <Router>
              <ToastContainer position="top-right" autoClose={3000} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/success" element={<AuthSuccess />} />

                {/* Landing Page */}
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <Home />
                    </MainLayout>
                  }
                />

                {/* Marketplace */}
                <Route
                  path="/marketplace"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Marketplace />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/crop/:id"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CropDetails />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Cart />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-crop"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AddCrop />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Chat />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Profile />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-crops"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <MyCrops />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <OrderHistory />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/farmer-orders"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <FarmerOrders />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </CartProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
