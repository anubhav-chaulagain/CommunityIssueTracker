export default function StatusBadge({ status, className = '' }) {
    const statusStyles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      Resolved: 'bg-green-100 text-green-800'
    };
  
    return (
      <span className={`!px-4 !py-2 rounded-full text-sm font-medium ${statusStyles[status]} ${className}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }