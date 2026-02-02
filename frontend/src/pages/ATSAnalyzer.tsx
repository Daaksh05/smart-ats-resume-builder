import { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, BarChart2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



const ATSAnalyzer = () => {
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
    const [resumeText, setResumeText] = useState("");

    const handleAnalyze = async (useSample = false) => {
        if (!useSample) {
            if (activeTab === 'upload' && !file) {
                setError("Please upload a resume file.");
                return;
            }
            if (activeTab === 'paste' && !resumeText.trim()) {
                setError("Please paste your resume text.");
                return;
            }
        }

        if (!jd.trim()) {
            setError("Please provide a job description.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            let response;
            if (useSample) {
                const formData = new FormData();
                formData.append('job_description', jd);
                response = await axios.post('/api/ats/analyze-sample', formData);
            } else {
                const formData = new FormData();
                if (activeTab === 'upload' && file) {
                    formData.append('file', file);
                } else if (activeTab === 'paste' && resumeText) {
                    formData.append('manual_resume_text', resumeText);
                }
                formData.append('job_description', jd);
                response = await axios.post('/api/ats/analyze', formData);
            }
            setResults(response.data);
        } catch (err: any) {
            const msg = err.response?.data?.detail || "Analysis failed. Please ensure the backend is running.";
            setError(msg);

            // Auto-switch to paste tab if scanned PDF detected
            if (msg.includes("image-based")) {
                setActiveTab('paste');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 py-6">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">ATS Score Analyzer</h1>
                <p className="text-slate-400">See how your resume stacks up against the automated filters.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    {/* Tab Switcher */}
                    <div className="glass rounded-3xl overflow-hidden p-1 flex bg-slate-900/50 border border-white/10">
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'upload' ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Upload size={16} />
                            Upload File
                        </button>
                        <button
                            onClick={() => setActiveTab('paste')}
                            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'paste' ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FileText size={16} />
                            Paste Text
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {activeTab === 'upload' ? (
                            <div
                                className={`glass p-10 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:border-blue-500/50'}`}
                                onClick={() => document.getElementById('resume-upload')?.click()}
                            >
                                <input
                                    id="resume-upload"
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.docx"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFile(e.target.files[0]);
                                            setResults(null);
                                        }
                                    }}
                                />
                                <div className={`p-4 rounded-2xl mb-4 ${file ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                                    <Upload />
                                </div>
                                <p className="font-medium text-center">{file ? file.name : "Upload Resume (PDF/DOCX)"}</p>
                                <p className="text-xs text-slate-500 mt-2 text-center">Max 5MB • Scanned PDFs not supported</p>
                            </div>
                        ) : (
                            <div className="glass p-6 rounded-3xl space-y-4 font-mono">
                                <textarea
                                    className="w-full h-48 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                                    placeholder="Paste your resume content here..."
                                    value={resumeText}
                                    onChange={(e) => setResumeText(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="flex justify-between items-center px-2">
                            <span className="text-xs text-slate-500 font-medium">Quick Verification:</span>
                            <button
                                onClick={() => handleAnalyze(true)}
                                className="text-xs text-blue-400 hover:text-white bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 transition-all flex items-center gap-1.5 font-bold"
                            >
                                <Zap size={12} />
                                Try Sample Resume
                            </button>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl space-y-4">
                        <h3 className="font-bold flex items-center gap-2">
                            <FileText size={18} className="text-blue-400" />
                            Job Description
                        </h3>
                        <textarea
                            className="w-full h-64 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                            placeholder="Paste the job requirements here..."
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm flex flex-col gap-2 shadow-lg">
                            <div className="flex items-center gap-3 font-bold">
                                <AlertCircle size={18} />
                                Analysis Issue
                            </div>
                            <p className="pl-7 opacity-90">{error}</p>
                            {error.includes("image-based") && (
                                <div className="pl-7 mt-2 text-xs border-t border-red-500/10 pt-3 text-slate-400 space-y-3">
                                    <p>💡 Tip: Your PDF appears to be a scanned image. Switch to the <b>'Paste Text'</b> tab above to manually paste your content, or upload a .docx file.</p>
                                    <button
                                        onClick={() => {
                                            setActiveTab('paste');
                                            setError("");
                                        }}
                                        className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/30 transition-all font-bold"
                                    >
                                        Switch to Paste Text Mode
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        onClick={() => handleAnalyze(false)}
                        className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 ${loading ? 'bg-slate-800' : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98]'}`}
                    >
                        {loading ? <RefreshCw className="animate-spin" /> : <Zap size={18} />}
                        {loading ? "Processing NLP..." : "Analyze Compatibility"}
                    </button>
                </div>

                {/* Results Section */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {!results && !loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full glass rounded-3xl flex flex-col items-center justify-center text-slate-500 p-10 text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center">
                                    <BarChart2 size={40} />
                                </div>
                                <p>Upload your documents to see the analysis results here.</p>
                                <button
                                    onClick={() => handleAnalyze(true)}
                                    className="px-6 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-full border border-blue-500/30 transition-all font-bold text-sm"
                                >
                                    Don't have a resume? Use our Sample
                                </button>
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full glass rounded-3xl flex flex-col items-center justify-center p-10"
                            >
                                <div className="relative w-32 h-32 mb-8">
                                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <p className="font-bold text-xl animate-pulse">Running NLP Pipeline...</p>
                                <p className="text-slate-500 mt-2">Extracting keywords & matching context</p>
                            </motion.div>
                        )}

                        {results && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Score Widget */}
                                <div className="glass p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900/20 text-center shadow-2xl border border-blue-500/20">
                                    <div className="text-6xl font-black mb-2 text-white">{results.overall_score}%</div>
                                    <div className="text-sm font-bold text-blue-400 tracking-widest uppercase">ATS Match Score</div>
                                    <p className="mt-4 text-slate-300 italic">"{results.feedback}"</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass p-5 rounded-2xl bg-slate-900/40">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Semantic Match</div>
                                        <div className="text-2xl font-bold text-white">{results.detail_scores.semantic_match}%</div>
                                    </div>
                                    <div className="glass p-5 rounded-2xl bg-slate-900/40">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Keyword Overlap</div>
                                        <div className="text-2xl font-bold text-white">{results.detail_scores.keyword_overlap}%</div>
                                    </div>
                                </div>

                                <div className="glass p-8 rounded-3xl space-y-6 bg-slate-900/20">
                                    <div>
                                        <h4 className="font-bold flex items-center gap-2 mb-4 text-emerald-400">
                                            <CheckCircle size={18} />
                                            Strong Keywords Found
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.keywords.matched.map((kw: any, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold flex items-center gap-2 mb-4 text-amber-400">
                                            <AlertCircle size={18} />
                                            Missing Crucial Terms
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.keywords.missing.map((kw: any, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full border border-amber-500/20">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ATSAnalyzer;
