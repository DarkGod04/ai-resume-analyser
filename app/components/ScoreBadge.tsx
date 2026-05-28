interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green text-badge-green-text border border-badge-green-text/20';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow text-badge-yellow-text border border-badge-yellow-text/20';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-badge-red text-badge-red-text border border-badge-red-text/20';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-xs font-semibold tracking-wide uppercase">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
