import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubmitTask from './pages/SubmitTask';
import AICoach from './pages/AICoach';

const PrivateRoute = ({ children }) =>
  localStorage.getItem('token') ? children : <Navigate to="/" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/submit" element={<PrivateRoute><SubmitTask /></PrivateRoute>} />
        <Route path="/coach" element={<PrivateRoute><AICoach /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
