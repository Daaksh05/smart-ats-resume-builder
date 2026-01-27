import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="py-6 text-center text-slate-500 text-sm border-t border-white/5">
                © 2025 Smart Resume Builder Platform | AI-Powered Career Growth
            </footer>
        </div>
    );
};

export default MainLayout;
