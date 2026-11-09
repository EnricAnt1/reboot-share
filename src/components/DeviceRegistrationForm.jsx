import { useState, useMemo } from 'react';
import { StatusBadge } from './StatusBadge';
import { PlusIcon } from './Icons';

function getNextDeviceId(devices) {
  let maxNum = 0;
  devices.forEach((d) => {
    const match = d.id.match(/^RB-SH-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });
  const nextNum = maxNum + 1;
  return `RB-SH-${String(nextNum).padStart(3, '0')}`;
}

export function DeviceRegistrationForm({ devices, onAddDevice }) {
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const nextId = useMemo(() => getNextDeviceId(devices), [devices]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || type.trim() === '') {
      setError('Heu de seleccionar un tipus de dispositiu.');
      return;
    }

    const newDevice = {
      id: nextId,
      type: type,
      status: 'En prova',
      updatedAt: new Date().toLocaleDateString('ca-ES'),
      notes: 'Nou registre automàtic.',
    };

    onAddDevice(newDevice);
    setType('');
    setError('');
  };

  return (
    <section className="registration-card" aria-labelledby="form-heading">
      <div className="registration-header">
        <div>
          <h3 id="form-heading" className="registration-title">
            Registrar nou dispositiu
          </h3>
          <p className="registration-subtitle">
            L'identificador es genera automàticament i l'estat inicial s'assigna per defecte a «En prova».
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        <div className="registration-form-grid">
          {/* Identificador generat automàticament */}
          <div className="form-group">
            <label htmlFor="reg-device-id" className="form-group-label">
              Identificador (ID)
            </label>
            <div className="form-control-wrap">
              <span id="reg-device-id" className="auto-id-badge">{nextId}</span>
            </div>
            <span className="form-hint-caption">Generat automàticament</span>
          </div>

          {/* Selector de tipus */}
          <div className="form-group">
            <label htmlFor="reg-device-type" className="form-group-label">
              Tipus de dispositiu <span className="label-required">*</span>
            </label>
            <div className="form-control-wrap select-input-container">
              <select
                id="reg-device-type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  if (error) setError('');
                }}
                className={`registration-select ${error ? 'input-has-error' : ''}`}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'type-error-msg' : undefined}
              >
                <option value="">-- Selecciona un tipus --</option>
                <option value="Portàtil">Portàtil</option>
                <option value="Tauleta">Tauleta</option>
                <option value="Sobretaula">Sobretaula</option>
                <option value="Perifèrics">Perifèrics</option>
              </select>
            </div>
            {error ? (
              <p id="type-error-msg" className="field-error-message" role="alert">
                {error}
              </p>
            ) : (
              <span className="form-hint-caption">Camp obligatori</span>
            )}
          </div>

          {/* Estat inicial */}
          <div className="form-group">
            <span className="form-group-label">Estat inicial</span>
            <div className="form-control-wrap status-fixed-box">
              <StatusBadge status="En prova" />
            </div>
            <span className="form-hint-caption">Per defecte per a nous ingressos</span>
          </div>

          {/* Botó de desar */}
          <div className="form-group form-action-group">
            <span className="form-group-label form-label-spacer" aria-hidden="true">&nbsp;</span>
            <div className="form-control-wrap">
              <button type="submit" className="btn btn-primary btn-register">
                <PlusIcon />
                <span>Registrar dispositiu</span>
              </button>
            </div>
            <span className="form-hint-caption form-hint-spacer" aria-hidden="true">&nbsp;</span>
          </div>
        </div>
      </form>
    </section>
  );
}
