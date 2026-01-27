import { Info } from 'lucide-react';

const KeywordMatch = () => {
    const keywords = [
        { word: 'Python', strength: 95, type: 'matched' },
        { word: 'FastAPI', strength: 88, type: 'matched' },
        { word: 'React', strength: 92, type: 'matched' },
        { word: 'Docker', strength: 40, type: 'missing' },
        { word: 'Kubernetes', strength: 25, type: 'missing' },
        { word: 'SQL', strength: 75, type: 'matched' },
        { word: 'Machine Learning', strength: 15, type: 'missing' },
        { word: 'Microservices', strength: 60, type: 'weak' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-6">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Semantic Keyword Match</h1>
                <p className="text-slate-400">Deep analysis of technical terms and context using SpaCy word vectors.</p>
            </div>

            <div className="glass p-10 rounded-[3rem] space-y-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold">Keyword Heatmap</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Visualizing importance vs match strength</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                            <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Matched
                        </div>
                        <div className="flex items-center gap-2 text-xs text-red-400">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div> Missing
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {keywords.map((k, i) => (
                        <div
                            key={i}
                            className={`p-6 rounded-3xl flex flex-col items-center justify-center space-y-3 transition-all transform hover:scale-105 cursor-help
                  ${k.type === 'matched' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                                    k.type === 'missing' ? 'bg-red-500/10 border border-red-500/20' :
                                        'bg-amber-500/10 border border-amber-500/20'}`}
                        >
                            <span className="text-sm font-bold">{k.word}</span>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${k.type === 'matched' ? 'bg-emerald-500' : k.type === 'missing' ? 'bg-red-500' : 'bg-amber-500'}`}
                                    style={{ width: `${k.strength}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-black opacity-50">{k.strength}% MATCH</span>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6 flex gap-4 items-start">
                    <Info className="text-blue-400 flex-shrink-0" />
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold">Pro-Tip for Semantics</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Our AI doesn't just look for exact words. It understands that "Distributed Systems" is semantically related to "Microservices". Try using broader conceptual language in your experience section!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordMatch;
