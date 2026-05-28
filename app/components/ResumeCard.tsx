import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-fade-in">
            <div className="resume-card-header">
                <div className="flex flex-col gap-1">
                    {companyName && <h2 className="text-slate-100 font-extrabold text-lg break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-sm break-words text-slate-400 font-medium">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="text-slate-100 font-extrabold text-lg">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="gradient-border group-hover:from-violet-500/20 group-hover:to-cyan-400/20 duration-300">
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-800">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[280px] object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-all duration-500"
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
