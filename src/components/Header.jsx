import { LogoIcon, PlusIcon, ResetIcon } from './Icons';

export function Header({ onOpenNewModal, onResetData, isDefaultData }) {
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
