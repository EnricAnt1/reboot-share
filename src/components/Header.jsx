import { LogoIcon, PlusIcon, ResetIcon } from './Icons';

export function Header({ devices = [], onOpenNewModal, onResetData, isDefaultData }) {
  const statusCounts = {
    'En prova': devices.filter((d) => d.status === 'En prova').length,
    'Apte': devices.filter((d) => d.status === 'Apte').length,
    'Diagnosi': devices.filter((d) => d.status === 'Diagnosi').length,
    'Prestat': devices.filter((d) => d.status === 'Prestat').length,
  };

  return (
    <header className="app-header">
      <div className="header-brand-container">
        <div className="brand-badge">
          <LogoIcon />
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">REBOOT Share</h1>
              <span className="brand-tag">Inventari</span>
            </div>
            <p className="brand-subtitle">
              Plataforma de reutilització i seguiment de dispositius tecnològics
            </p>
          </div>
        </div>
      </div>

      <div className="header-status-summary" aria-label="Recompte ràpid per estat a la capçalera">
        <span className="header-status-item status-item-prova" title="Dispositius En prova">
          <span className="header-status-dot dot-prova"></span>
          <span className="status-label">En prova:</span>
          <strong>{statusCounts['En prova']}</strong>
        </span>
        <span className="header-status-item status-item-apte" title="Dispositius Aptes">
          <span className="header-status-dot dot-apte"></span>
          <span className="status-label">Apte:</span>
          <strong>{statusCounts['Apte']}</strong>
        </span>
        <span className="header-status-item status-item-diagnosi" title="Dispositius en Diagnosi">
          <span className="header-status-dot dot-diagnosi"></span>
          <span className="status-label">Diagnosi:</span>
          <strong>{statusCounts['Diagnosi']}</strong>
        </span>
        <span className="header-status-item status-item-prestat" title="Dispositius Prestats">
          <span className="header-status-dot dot-prestat"></span>
          <span className="status-label">Prestat:</span>
          <strong>{statusCounts['Prestat']}</strong>
        </span>
      </div>

      <div className="header-actions">
        {!isDefaultData && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onResetData}
            title="Torna a carregar les dades de mostra inicials"
          >
            <ResetIcon />
            <span>Restablir mostra</span>
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenNewModal}
          id="btn-add-device"
        >
          <PlusIcon />
          <span>Nou dispositiu</span>
        </button>
      </div>
    </header>
  );
}
