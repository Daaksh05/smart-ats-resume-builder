import { LayoutDashboard, History, TrendingUp, Award } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="max-w-6xl mx-auto py-6 space-y-10">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold border border-emerald-500/20">
                    <Award size={14} /> Profile Strength: 84%
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-3xl col-span-2 space-y-6">
                    <h3 className="font-bold flex items-center gap-2">
                        <TrendingUp size={18} className="text-blue-500" />
                        ATS Score Trends
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-white/5">
                        {[45, 62, 58, 75, 84].map((score, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-lg transition-all hover:scale-105" style={{ height: `${score}%` }}>
                                <div className="text-[10px] text-center mt-[-20px] font-bold">{score}%</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 text-center uppercase tracking-widest">Last 5 Analysis Cycles</p>
                </div>

                <div className="glass p-8 rounded-3xl space-y-6">
                    <h3 className="font-bold flex items-center gap-2">
                        <History size={18} className="text-purple-500" />
                        Recent Resumes
                    </h3>
                    <div className="space-y-4">
                        {['Senior_Dev_React.pdf', 'Data_Scientist_FAANG.pdf', 'General_Software_Eng.pdf'].map((name, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                                    <LayoutDashboard size={20} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate">{name}</p>
                                    <p className="text-xs text-slate-500">Jan {20 - i}, 2025</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
