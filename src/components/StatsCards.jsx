import { CheckCircleIcon, ClockIcon, AlertIcon, ShareIcon } from './Icons';

export function StatsCards({ devices, activeFilter, onFilterChange }) {
  const counts = {
    total: devices.length,
    apte: devices.filter((d) => d.status === 'Apte').length,
    enProva: devices.filter((d) => d.status === 'En prova').length,
    diagnosi: devices.filter((d) => d.status === 'Diagnosi').length,
    prestat: devices.filter((d) => d.status === 'Prestat').length,
  };

  const cards = [
    {
      id: 'Tots',
      title: 'Total dispositius',
      count: counts.total,
      description: 'Inventari registrat',
      colorClass: 'card-total',
      icon: null,
    },
    {
      id: 'Apte',
      title: 'Apte',
      count: counts.apte,
      description: 'Llestos per a cessió',
      colorClass: 'card-apte',
      icon: <CheckCircleIcon />,
    },
    {
      id: 'En prova',
      title: 'En prova',
      count: counts.enProva,
      description: 'En verificació tècnica',
      colorClass: 'card-en-prova',
      icon: <ClockIcon />,
    },
    {
      id: 'Diagnosi',
      title: 'Diagnosi',
      count: counts.diagnosi,
      description: 'Revisió d\'avaries',
      colorClass: 'card-diagnosi',
      icon: <AlertIcon />,
    },
    {
      id: 'Prestat',
      title: 'Prestat',
      count: counts.prestat,
      description: 'Cessió activa',
      colorClass: 'card-prestat',
      icon: <ShareIcon />,
    },
  ];

  return (
    <section className="stats-grid" aria-label="Resum de l'inventari">
      {cards.map((card) => {
        const isSelected = activeFilter === card.id;
        return (
          <button
            key={card.id}
            type="button"
            className={`stat-card ${card.colorClass} ${isSelected ? 'is-active' : ''}`}
            onClick={() => onFilterChange(card.id)}
            aria-pressed={isSelected}
          >
            <div className="stat-card-top">
              <span className="stat-title">{card.title}</span>
              {card.icon && <span className="stat-icon-wrapper">{card.icon}</span>}
            </div>
            <div className="stat-value">{card.count}</div>
            <div className="stat-desc">{card.description}</div>
            {isSelected && <span className="stat-filter-indicator">Filtre actiu</span>}
          </button>
        );
      })}
    </section>
  );
}
