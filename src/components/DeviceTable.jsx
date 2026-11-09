import { useState, useMemo } from 'react';
import { StatusBadge } from './StatusBadge';
import {
  LaptopIcon,
  TabletIcon,
  DesktopIcon,
  GenericDeviceIcon,
  SearchIcon,
  FilterIcon,
  CloseIcon,
} from './Icons';
import { STATUSES } from '../data/devices';

export function DeviceTable({
  devices,
  activeStatusFilter,
  onStatusFilterChange,
  onUpdateStatus,
  onDeleteDevice,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tots');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Extract unique types from current devices
  const availableTypes = useMemo(() => {
    const types = new Set(devices.map((d) => d.type));
    return ['Tots', ...Array.from(types)];
  }, [devices]);

  // Filter & sort devices
  const filteredDevices = useMemo(() => {
    return devices
      .filter((device) => {
        // Status filter
        if (activeStatusFilter !== 'Tots' && device.status !== activeStatusFilter) {
          return false;
        }
        // Type filter
        if (typeFilter !== 'Tots' && device.type !== typeFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchId = device.id.toLowerCase().includes(q);
          const matchType = device.type.toLowerCase().includes(q);
          const matchStatus = device.status.toLowerCase().includes(q);
          const matchNotes = device.notes?.toLowerCase().includes(q);
          return matchId || matchType || matchStatus || matchNotes;
        }
        return true;
      })
      .sort((a, b) => {
        let valA = a[sortField] || '';
        let valB = b[sortField] || '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [devices, activeStatusFilter, typeFilter, searchQuery, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getDeviceIcon = (type) => {
    const lower = type.toLowerCase();
    if (lower.includes('portàtil') || lower.includes('laptop')) {
      return <LaptopIcon className="device-type-icon" />;
    }
    if (lower.includes('tauleta') || lower.includes('tablet')) {
      return <TabletIcon className="device-type-icon" />;
    }
    if (lower.includes('sobretaula') || lower.includes('ordinador')) {
      return <DesktopIcon className="device-type-icon" />;
    }
    return <GenericDeviceIcon className="device-type-icon" />;
  };

  const hasActiveFilters = searchQuery !== '' || activeStatusFilter !== 'Tots' || typeFilter !== 'Tots';

  const clearAllFilters = () => {
    setSearchQuery('');
    setTypeFilter('Tots');
    onStatusFilterChange('Tots');
  };

  return (
    <div className="table-card">
      <div className="table-toolbar">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Cerca per identificador o tipus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Cerca dispositius"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Neteja cerca"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        <div className="filter-group">
          <div className="select-wrapper">
            <FilterIcon className="select-icon" />
            <label htmlFor="status-filter-select" className="sr-only">Filtrar per estat</label>
            <select
              id="status-filter-select"
              value={activeStatusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="filter-select"
            >
              <option value="Tots">Tots els estats</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <label htmlFor="type-filter-select" className="sr-only">Filtrar per tipus</label>
            <select
              id="type-filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="Tots">Tots els tipus</option>
              {availableTypes
                .filter((t) => t !== 'Tots')
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={clearAllFilters}
              title="Neteja tots els filtres"
            >
              Neteja filtres
            </button>
          )}
        </div>
      </div>

      <div className="table-meta-bar">
        <span className="results-count">
          Mostrant <strong>{filteredDevices.length}</strong> de <strong>{devices.length}</strong> dispositius
        </span>
        {activeStatusFilter !== 'Tots' && (
          <span className="filter-pill">
            Estat: <strong>{activeStatusFilter}</strong>
            <button
              type="button"
              onClick={() => onStatusFilterChange('Tots')}
              className="filter-pill-remove"
              aria-label="Elimina filtre d'estat"
            >
              ×
            </button>
          </span>
        )}
        {typeFilter !== 'Tots' && (
          <span className="filter-pill">
            Tipus: <strong>{typeFilter}</strong>
            <button
              type="button"
              onClick={() => setTypeFilter('Tots')}
              className="filter-pill-remove"
              aria-label="Elimina filtre de tipus"
            >
              ×
            </button>
          </span>
        )}
      </div>

      <div className="table-container">
        <table className="device-table" aria-label="Llistat d'inventari de dispositius">
          <thead>
            <tr>
              <th scope="col" onClick={() => handleSort('id')} className="sortable-th">
                <div className="th-content">
                  <span>Identificador</span>
                  <span className="sort-indicator">
                    {sortField === 'id' ? (sortAsc ? '▲' : '▼') : '↕'}
                  </span>
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('type')} className="sortable-th">
                <div className="th-content">
                  <span>Tipus</span>
                  <span className="sort-indicator">
                    {sortField === 'type' ? (sortAsc ? '▲' : '▼') : '↕'}
                  </span>
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('status')} className="sortable-th">
                <div className="th-content">
                  <span>Estat</span>
                  <span className="sort-indicator">
                    {sortField === 'status' ? (sortAsc ? '▲' : '▼') : '↕'}
                  </span>
                </div>
              </th>
              <th scope="col" className="th-center">
                <span>Modificar estat</span>
              </th>
              <th scope="col" className="th-right">
                <span>Acció</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr key={device.id} className="device-row">
                  <td className="cell-id">
                    <span className="id-code">{device.id}</span>
                  </td>
                  <td className="cell-type">
                    <div className="type-badge-container">
                      <span className="type-icon-box">{getDeviceIcon(device.type)}</span>
                      <span className="type-name">{device.type}</span>
                    </div>
                  </td>
                  <td className="cell-status">
                    <StatusBadge status={device.status} />
                  </td>
                  <td className="cell-status-changer th-center">
                    <label htmlFor={`change-status-${device.id}`} className="sr-only">
                      Canviar estat del dispositiu {device.id}
                    </label>
                    <select
                      id={`change-status-${device.id}`}
                      value={device.status}
                      onChange={(e) => onUpdateStatus(device.id, e.target.value)}
                      className="inline-status-select"
                      title="Canviar estat d'aquest dispositiu"
                    >
                      {STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="cell-actions th-right">
                    <button
                      type="button"
                      className="btn-delete-row"
                      onClick={() => onDeleteDevice(device.id)}
                      title={`Eliminar el dispositiu ${device.id}`}
                      aria-label={`Eliminar el dispositiu ${device.id}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state-cell">
                  <div className="empty-state">
                    <div className="empty-icon-wrap">🔍</div>
                    <h3 className="empty-title">No s'ha trobat cap dispositiu</h3>
                    <p className="empty-text">
                      No hi ha cap dispositiu que coincideixi amb els criteris de cerca o filtres actuals.
                    </p>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={clearAllFilters}
                      >
                        Neteja els criteris de cerca
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
