import { useState } from 'react';
import { STATUSES } from '../data/devices';
import { CloseIcon, PlusIcon } from './Icons';

export function NewDeviceModal({ isOpen, onClose, onAddDevice, existingIds }) {
  const [id, setId] = useState('');
  const [type, setType] = useState('Portàtil');
  const [status, setStatus] = useState('En prova');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanId = id.trim().toUpperCase();

    if (!cleanId) {
      setError("L'identificador és obligatori (ex: RB-SH-016).");
      return;
    }

    if (existingIds.includes(cleanId)) {
      setError(`Ja existeix un dispositiu amb l'identificador ${cleanId}.`);
      return;
    }

    onAddDevice({
      id: cleanId,
      type: type.trim(),
      status,
      notes: notes.trim() || 'Sense observacions.',
      updatedAt: new Date().toLocaleDateString('ca-ES'),
    });

    // Reset and close
    setId('');
    setType('Portàtil');
    setStatus('En prova');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h2 className="modal-title">Afegir nou dispositiu</h2>
            <p className="modal-subtitle">Introdueix les dades per registrar el dispositiu a l'inventari</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tancar formulari"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error-alert" role="alert">{error}</div>}

          <div className="form-field">
            <label htmlFor="device-id-input" className="form-label">
              Identificador (ID) <span className="required">*</span>
            </label>
            <input
              id="device-id-input"
              type="text"
              placeholder="ex: RB-SH-016"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (error) setError('');
              }}
              className="form-input"
              autoFocus
              required
            />
            <span className="form-hint">Format recomanat: RB-SH-XXX</span>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="device-type-select" className="form-label">
                Tipus de dispositiu <span className="required">*</span>
              </label>
              <select
                id="device-type-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select"
              >
                <option value="Portàtil">Portàtil</option>
                <option value="Tauleta">Tauleta</option>
                <option value="Ordinador de sobretaula">Ordinador de sobretaula</option>
                <option value="Monitor">Monitor</option>
                <option value="Altres">Altres</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="device-status-select" className="form-label">
                Estat inicial <span className="required">*</span>
              </label>
              <select
                id="device-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="device-notes-input" className="form-label">
              Observacions (opcional)
            </label>
            <textarea
              id="device-notes-input"
              rows="3"
              placeholder="Estat físic, components revisats o destinatari..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel·lar
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusIcon />
              <span>Desar a l'inventari</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
