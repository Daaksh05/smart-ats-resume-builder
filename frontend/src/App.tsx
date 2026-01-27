import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import ATSAnalyzer from './pages/ATSAnalyzer';
import SkillGap from './pages/SkillGap';
import Dashboard from './pages/Dashboard';
import KeywordMatch from './pages/KeywordMatch';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/analyzer" element={<ATSAnalyzer />} />
          <Route path="/semantic" element={<KeywordMatch />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
