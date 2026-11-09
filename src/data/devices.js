export const STATUSES = ['En prova', 'Apte', 'Diagnosi', 'Prestat'];

export const INITIAL_DEVICES = [
  {
    id: 'RB-SH-014',
    type: 'Portàtil',
    status: 'Apte',
    updatedAt: '09/11/2026',
    notes: 'Revisat i preparat amb programari bàsic.'
  },
  {
    id: 'RB-SH-015',
    type: 'Tauleta',
    status: 'En prova',
    updatedAt: '08/11/2026',
    notes: 'Comprovació de rendiment de bateria.'
  },
  {
    id: 'RB-SH-008',
    type: 'Portàtil',
    status: 'Diagnosi',
    updatedAt: '05/11/2026',
    notes: 'Pendent de substitució de teclat.'
  }
];

export const STATUS_CONFIG = {
  'Apte': {
    label: 'Apte',
    description: 'A punt per a cessió o ús immediat',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  'En prova': {
    label: 'En prova',
    description: 'En fase de test i control de qualitat',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  'Diagnosi': {
    label: 'Diagnosi',
    description: 'En revisió tècnica d\'incidències',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  'Prestat': {
    label: 'Prestat',
    description: 'Actualment cedit en préstec actiu',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
  }
};
