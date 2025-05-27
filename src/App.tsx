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
import { LanguageProvider } from './lib/language';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const user = useAuth(state => state.user);
  if (!user) return <Navigate to="/auth" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <LanguageProvider>
    <Router>
        <Layout>
      <Routes>
            <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
            <Route
              path="/edubridge"
              element={
          <ProtectedRoute>
              <EduBridge />
          </ProtectedRoute>
              }
            />
            <Route
              path="/mindmap"
              element={
                <ProtectedRoute>
              <MindMap />
          </ProtectedRoute>
              }
            />
            <Route
              path="/studybuddy"
              element={
                <ProtectedRoute>
              <StudyBuddy />
          </ProtectedRoute>
              }
            />
            <Route
              path="/eduassist"
              element={
                <ProtectedRoute>
              <EduAssist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tutor-dashboard"
              element={
                <ProtectedRoute allowedRoles={['tutor']}>
                  <TutorDashboard />
          </ProtectedRoute>
              }
            />
      </Routes>
        </Layout>
    </Router>
    </LanguageProvider>
  );
}