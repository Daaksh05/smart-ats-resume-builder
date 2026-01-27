import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart2, Zap, Target, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/builder', label: 'Builder', icon: FileText },
        { path: '/analyzer', label: 'ATS Analyzer', icon: BarChart2 },
        { path: '/skill-gap', label: 'Skill Gap', icon: Zap },
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold gradient-text">SmartResume</Link>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-500' : 'text-slate-400'}`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white">Sign In</Link>
                    <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-1">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
