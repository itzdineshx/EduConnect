import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Register } from './pages/Register';
import { EduBridge } from './pages/EduBridge';
import { MindMap } from './pages/MindMap';
import { StudyBuddy } from './pages/StudyBuddy';
import { EduAssist } from './pages/EduAssist';
import TutorDashboard from './pages/TutorDashboard';
import { useAuth } from './lib/auth';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const user = useAuth(state => state.user);
  if (!user) return <Navigate to="/auth" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

function App() {
  const user = useAuth(state => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              {user?.role === 'tutor' ? <TutorDashboard /> : <Home />}
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/tutor-dashboard" element={
          <ProtectedRoute allowedRoles={['tutor']}>
            <Layout>
              <TutorDashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/edubridge" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <EduBridge />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/mindmap" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <MindMap />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/studybuddy" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <StudyBuddy />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/eduassist" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <EduAssist />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;