import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-badge-green-text'
            : score > 49
        ? 'text-badge-yellow-text' : 'text-badge-red-text';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-3 items-center justify-center">
                    <p className="text-slate-200 text-base font-bold">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-slate-300 text-base font-bold">
                    <span className={`${textColor} font-extrabold text-lg`}>{score}</span>
                    <span className="text-slate-500 text-xs font-normal"> / 100</span>
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl w-full p-5 flex flex-col gap-4">
            <div className="flex flex-row items-center p-3 gap-6 border-b border-slate-800/80 pb-6">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-1.5">
                    <h2 className="text-lg font-extrabold text-slate-100">Your Resume Score</h2>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[240px]">
                        This score is calculated based on the content, tone, structure, and skills in your resume.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-2">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary;
