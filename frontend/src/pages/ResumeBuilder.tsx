import { useState } from 'react';
import { Save, Plus, Eye } from 'lucide-react';

const ResumeBuilder = () => {
    const [resumeData, setResumeData] = useState({
        personal: { name: '', email: '', phone: '', summary: '' },
        skills: [''],
        experience: [{ company: '', role: '', period: '', description: '' }],
        education: [{ school: '', degree: '', year: '' }]
    });

    const updatePersonal = (field: string, value: string) => {
        setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
    };

    return (
        <div className="max-w-7xl mx-auto py-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">Resume Builder</h1>
                    <p className="text-slate-400">Craft your professional identity with ATS-friendly templates.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10">
                        <Eye size={18} /> Preview
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20">
                        <Save size={18} /> Save Version
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Editor Side */}
                <div className="space-y-8">
                    {/* Personal Info */}
                    <section className="glass p-8 rounded-3xl space-y-6">
                        <h3 className="text-xl font-bold border-b border-white/5 pb-4">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                className="bg-slate-900/50 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                                placeholder="Full Name"
                                onChange={(e) => updatePersonal('name', e.target.value)}
                            />
                            <input
                                className="bg-slate-900/50 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                                placeholder="Email Address"
                                onChange={(e) => updatePersonal('email', e.target.value)}
                            />
                        </div>
                        <textarea
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-sm min-h-[100px] focus:border-blue-500 outline-none"
                            placeholder="Professional Summary..."
                            onChange={(e) => updatePersonal('summary', e.target.value)}
                        />
                    </section>

                    {/* Skills Section */}
                    <section className="glass p-8 rounded-3xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Skills</h3>
                            <button
                                onClick={() => setResumeData(prev => ({ ...prev, skills: [...prev.skills, ''] }))}
                                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {resumeData.skills.map((skill, idx) => (
                                <input
                                    key={idx}
                                    className="bg-slate-900/50 border border-white/10 rounded-xl p-3 text-xs focus:border-blue-500 outline-none"
                                    placeholder="e.g. React"
                                    value={skill}
                                    onChange={(e) => {
                                        const newSkills = [...resumeData.skills];
                                        newSkills[idx] = e.target.value;
                                        setResumeData(prev => ({ ...prev, skills: newSkills }));
                                    }}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Live Preview Side */}
                <div className="hidden lg:block sticky top-32">
                    <div className="bg-white text-slate-900 aspect-[1/1.41] rounded shadow-2xl overflow-hidden p-12 space-y-6">
                        <div className="text-center border-b pb-6">
                            <h1 className="text-3xl font-black uppercase tracking-tighter">{resumeData.personal.name || "YOUR NAME"}</h1>
                            <p className="text-sm text-slate-600 mt-2">{resumeData.personal.email} • {resumeData.personal.phone}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-600 pl-4 py-1">
                                <h4 className="font-bold text-xs uppercase tracking-widest text-blue-600">Summary</h4>
                                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                                    {resumeData.personal.summary || "Add a summary to see it reflected here in real-time."}
                                </p>
                            </div>

                            <div className="border-l-4 border-slate-300 pl-4 py-1">
                                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900">Experience</h4>
                                <div className="mt-2 space-y-1">
                                    <p className="font-bold text-sm">Example Company Corporation</p>
                                    <p className="text-xs italic text-slate-500">Senior Software Engineer | 2020 - Present</p>
                                    <ul className="text-xs text-slate-700 list-disc ml-4 mt-1">
                                        <li>Led the migration of legacy systems to modern cloud architecture.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
