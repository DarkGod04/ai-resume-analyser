import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient and borders based on score
  const containerClass = score > 69
    ? 'from-emerald-950/20 to-slate-900/20 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]'
    : score > 49
      ? 'from-amber-950/20 to-slate-900/20 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]'
      : 'from-rose-950/20 to-slate-900/20 border-rose-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${containerClass} border rounded-2xl w-full p-6 backdrop-blur-xl`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-1 rounded-xl bg-slate-950/50 border border-slate-800">
          <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100">ATS Match - {score}%</h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-200 mb-2">{subtitle}</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-5">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3.5">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-4 h-4 mt-0.5"
              />
              <p className={`text-xs ${suggestion.type === "good" ? "text-emerald-400" : "text-amber-400"} leading-relaxed font-medium`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-[11px] text-slate-500 italic leading-relaxed">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  )
}

export default ATS;
