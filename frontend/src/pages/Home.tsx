import { Link } from 'react-router-dom';
import { FileText, BarChart2, Zap, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        { title: 'Resume Builder', desc: 'Create ATS-optimized resumes with real-time feedback.', icon: FileText, path: '/builder' },
        { title: 'ATS Analyzer', desc: 'Get a detailed match score against any job description.', icon: BarChart2, path: '/analyzer' },
        { title: 'Skill Gap', desc: 'Identify exactly what skills you need to land the job.', icon: Zap, path: '/skill-gap' },
        { title: 'AI Assistant', desc: 'Rewrite weak bullet points with strong action verbs.', icon: Rocket, path: '/builder' },
    ];

    return (
        <div className="space-y-20 py-10">
            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-7xl font-extrabold tracking-tight"
                >
                    Master the <span className="gradient-text">Job Search</span> with AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-400"
                >
                    The all-in-one AI platform to build resumes, analyze ATS scores, and bridge skill gaps.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-4 pt-6"
                >
                    <Link to="/builder" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all">
                        Build My Resume
                    </Link>
                    <Link to="/analyzer" className="glass hover:bg-white/10 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                        Check ATS Score
                    </Link>
                </motion.div>
            </section>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <Link
                        key={i}
                        to={f.path}
                        className="glass p-8 rounded-3xl hover:border-blue-500/50 transition-all group"
                    >
                        <div className={`p-3 rounded-2xl mb-6 inline-block bg-slate-800 group-hover:bg-blue-500/20 group-hover:text-blue-400 text-slate-400 transition-colors`}>
                            <f.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </Link>
                ))}
            </section>

            {/* Social Proof/Trust */}
            <section className="glass rounded-[3rem] p-12 text-center bg-gradient-to-r from-blue-900/10 to-purple-900/10 border-white/5">
                <h2 className="text-3xl font-bold mb-8 italic text-slate-300">"The smartest way to bypass HR filters."</h2>
                <div className="flex justify-center gap-12 grayscale opacity-50">
                    <span className="font-black text-2xl">FORBES</span>
                    <span className="font-black text-2xl">TECHCRUNCH</span>
                    <span className="font-black text-2xl">WIRED</span>
                </div>
            </section>
        </div>
    );
};

export default Home;
