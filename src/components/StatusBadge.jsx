import { STATUS_CONFIG } from '../data/devices';
import { CheckCircleIcon, ClockIcon, AlertIcon, ShareIcon } from './Icons';

export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    color: '#4b5563',
    bgColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  };

  const renderIcon = () => {
    switch (status) {
      case 'Apte':
        return <CheckCircleIcon className="badge-icon" />;
      case 'En prova':
        return <ClockIcon className="badge-icon" />;
      case 'Diagnosi':
        return <AlertIcon className="badge-icon" />;
      case 'Prestat':
        return <ShareIcon className="badge-icon" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`}
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
      title={config.description}
    >
      <span className="status-dot" style={{ backgroundColor: config.color }} />
      {renderIcon()}
      <span className="status-text">{status}</span>
    </span>
  );
}
