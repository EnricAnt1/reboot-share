import { useState } from 'react';
import { INITIAL_DEVICES } from './data/devices';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { DeviceRegistrationForm } from './components/DeviceRegistrationForm';
import { DeviceTable } from './components/DeviceTable';
import { NewDeviceModal } from './components/NewDeviceModal';
import './App.css';

export default function App() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [activeFilter, setActiveFilter] = useState('Tots');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const handleUpdateStatus = (deviceId, newStatus) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: newStatus } : d))
    );
    showToast(`S'ha actualitzat l'estat del dispositiu ${deviceId} a "${newStatus}".`);
  };

  const handleAddDevice = (newDevice) => {
    setDevices((prev) => [newDevice, ...prev]);
    showToast(`S'ha registrat el dispositiu ${newDevice.id} correctament.`);
  };

  const handleDeleteDevice = (deviceId) => {
    const confirmed = window.confirm(
      `Esteu segurs que voleu eliminar el dispositiu ${deviceId} de l'inventari?`
    );
    if (!confirmed) return;

    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    showToast(`S'ha eliminat el dispositiu ${deviceId} de l'inventari.`);
  };

  const handleResetData = () => {
    setDevices(INITIAL_DEVICES);
    setActiveFilter('Tots');
    showToast("S'han restablert les dades de mostra originals.");
  };

  const isDefaultData =
    devices.length === INITIAL_DEVICES.length &&
    devices.every(
      (d, i) =>
        d.id === INITIAL_DEVICES[i]?.id &&
        d.type === INITIAL_DEVICES[i]?.type &&
        d.status === INITIAL_DEVICES[i]?.status
    );

  return (
    <div className="app-layout">
      <Header
        onOpenNewModal={() => setIsModalOpen(true)}
        onResetData={handleResetData}
        isDefaultData={isDefaultData}
      />

      <main className="app-main">
        <div className="dashboard-intro">
          <div>
            <h2 className="dashboard-heading">Tauler d'Inventari</h2>
            <p className="dashboard-subheading">
              Gestió i seguiment d'equips informàtics donats per a reutilització social
            </p>
          </div>
        </div>

        <StatsCards
          devices={devices}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <DeviceRegistrationForm
          devices={devices}
          onAddDevice={handleAddDevice}
        />

        <DeviceTable
          devices={devices}
          activeStatusFilter={activeFilter}
          onStatusFilterChange={setActiveFilter}
          onUpdateStatus={handleUpdateStatus}
          onDeleteDevice={handleDeleteDevice}
        />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <strong>REBOOT Share</strong> — Projecte de reutilització tecnològica i economia circular.
          </p>
          <span className="footer-note">Dades locals en memòria · Sense base de dades</span>
        </div>
      </footer>

      <NewDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddDevice={handleAddDevice}
        existingIds={devices.map((d) => d.id)}
      />

      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span className="toast-icon">✓</span>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
