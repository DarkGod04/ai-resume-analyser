import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0 min-h-screen relative">
            {/* Glowing backdrop elements */}
            <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none"></div>

            <nav className="resume-nav sticky top-0 z-50">
                <Link to="/" className="back-button group">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5 filter invert opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-slate-300 text-xs font-semibold group-hover:text-white transition-colors">Back to Dashboard</span>
                </Link>
                <div className="text-slate-100 font-extrabold text-sm tracking-widest uppercase">Evaluation Report</div>
            </nav>

            <div className="flex flex-row w-full max-lg:flex-col-reverse relative z-10">
                {/* Left Preview Section */}
                <section className="feedback-section bg-slate-950/20 border-r border-slate-900/60 h-[calc(100vh-80px)] sticky top-[80px] items-center justify-center max-lg:h-auto max-lg:static max-lg:border-r-0 max-lg:border-b">
                    {imageUrl && resumeUrl ? (
                        <div className="animate-fade-in gradient-border max-sm:m-0 h-[90%] max-w-xl w-full flex items-center justify-center p-[1px] bg-slate-900/30 rounded-2xl shadow-2xl border border-slate-800">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full p-2 flex items-center justify-center">
                                <img
                                    src={imageUrl}
                                    className="max-w-full max-h-full object-contain rounded-xl border border-slate-950 hover:brightness-105 transition-all duration-300"
                                    title="Click to view full PDF"
                                />
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="size-8 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin"></div>
                            <p className="text-xs text-slate-500 font-semibold mt-4">Rendering document preview...</p>
                        </div>
                    )}
                </section>

                {/* Right Feedback Section */}
                <section className="feedback-section h-[calc(100vh-80px)] overflow-y-auto max-lg:h-auto pb-20">
                    <div className="flex flex-col gap-2 mb-6">
                        <h2 className="text-2xl md:text-3xl text-slate-100 font-black tracking-tight">Resume Analytics</h2>
                        <p className="text-xs text-slate-400 font-medium">In-depth ATS parsing and design formatting reviews</p>
                    </div>

                    {feedback ? (
                        <div className="flex flex-col gap-6 animate-fade-in">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center py-20 shadow-2xl">
                            <img src="/images/resume-scan-2.gif" className="w-[180px] filter brightness-95 opacity-80 mb-4" />
                            <h3 className="text-slate-300 font-bold text-sm tracking-wider uppercase animate-pulse">Running AI diagnostic...</h3>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume;
