import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, ReactNode } from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import DashboardStudent from './pages/DashboardStudent';
import DashboardParent from './pages/DashboardParent';
import DashboardSchool from './pages/DashboardSchool';
import Analytics from './pages/Analytics';
import StudentProfile from './pages/StudentProfile';
import Learning from './pages/Learning';
import TopicDetail from './pages/TopicDetail';
import Subscription from './pages/Subscription';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';
import { useAuth } from './context/AuthContext';
import { UserRole } from './services/authService';
import './App.css';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole | null;
}

// Protected route component
const ProtectedRoute = ({ children, requiredRole = null }: ProtectedRouteProps) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscription" element={<Subscription />} />
              
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
              <Route 
                path="/dashboard/student" 
                element={
                  <ProtectedRoute requiredRole="student">
                    <DashboardStudent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/parent" 
                element={
                  <ProtectedRoute requiredRole="parent">
                    <DashboardParent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/school" 
                element={
                  <ProtectedRoute requiredRole="school">
                    <DashboardSchool />
                  </ProtectedRoute>
                } 
              />
              
              {/* Learning Routes */}
              <Route 
                path="/learning" 
                element={
                  <ProtectedRoute>
                    <Learning />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/learning/:subjectId/topic/:topicId" 
                element={
                  <ProtectedRoute>
                    <TopicDetail />
                  </ProtectedRoute>
                } 
              />
              
              {/* Analytics Route */}
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student Profile Route */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <StudentProfile />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
