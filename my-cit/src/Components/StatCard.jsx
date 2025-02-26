export default function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-lg shadow-sm !p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`${color} !p-1.5 rounded-lg text-white`}>{icon}</div>
        </div>
      </div>
    );
  }