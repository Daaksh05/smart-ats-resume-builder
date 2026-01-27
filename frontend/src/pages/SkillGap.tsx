import { useState } from 'react';
import axios from 'axios';
import { Target, Zap, GraduationCap, ChevronRight, ExternalLink } from 'lucide-react';

const SkillGap = () => {
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    const handleAnalyze = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file!);
        formData.append('job_description', jd);

        try {
            const resp = await axios.post("http://localhost:8000/api/ats/skill-gap", formData);
            setResults(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-6">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Skill Gap Analyzer</h1>
                <p className="text-slate-400">Bridge the distance between your experience and the job requirements.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Reuse similar upload/text logic but focused on skills */}
                    <div className="glass p-6 rounded-3xl space-y-4">
                        <label className="text-sm font-bold text-slate-400">Step 1: Upload your latest resume</label>
                        <input
                            type="file"
                            className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                        />
                    </div>

                    <div className="glass p-6 rounded-3xl space-y-4">
                        <label className="text-sm font-bold text-slate-400">Step 2: Paste the target Job Description</label>
                        <textarea
                            className="w-full h-40 bg-slate-900 border border-white/10 rounded-xl p-4 text-sm"
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !file || !jd}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        {loading ? "Analyzing..." : "Find Skill Gaps"}
                    </button>
                </div>

                <div>
                    {results ? (
                        <div className="space-y-6">
                            <div className="glass p-8 rounded-3xl bg-blue-500/5 border-blue-500/20">
                                <h3 className="font-bold mb-6 flex items-center gap-2">
                                    <Target className="text-blue-500" />
                                    Gaps Identified
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <span className="text-xs font-bold text-red-500 uppercase tracking-tighter">Core Skills Missing</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {results.gap_summary.core.map((s: string) => <span key={s} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs">{s}</span>)}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-xs font-bold text-amber-500 uppercase tracking-tighter">Preferred Skills Missing</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {results.gap_summary.preferred.map((s: string) => <span key={s} className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs">{s}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-3xl">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Zap className="text-amber-400" />
                                    Recommended Resources
                                </h3>
                                <div className="space-y-3">
                                    {results.recommendations.map((rec: any, idx: number) => (
                                        <a
                                            key={idx}
                                            href={rec.resource}
                                            target="_blank"
                                            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <GraduationCap size={18} className="text-slate-500" />
                                                <span className="text-sm font-medium">Learn {rec.skill}</span>
                                            </div>
                                            <ExternalLink size={14} className="text-slate-600" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-12 text-center opacity-30">
                            <ChevronRight size={48} className="mb-4" />
                            <p>Analyze to reveal skill gaps and learning resources.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillGap;
