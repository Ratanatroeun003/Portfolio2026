import { DashboardCardProps } from '@/types/dassboardCard';

const DashboardCard = ({ label, note, value, color }: DashboardCardProps) => {
  return (
    <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300">
      {/* Label */}
      <p className="text-sm text-gray-400">{label}</p>

      {/* Value */}
      <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>

      {/* Note */}
      <p className={`text-sm mt-3 ${color}`}>{note}</p>
    </div>
  );
};

export default DashboardCard;
