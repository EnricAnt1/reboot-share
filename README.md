# REBOOT Share Inventory App

A clean, modern, and responsive web dashboard designed to manage and track refurbished technology devices (laptops, tablets, desktop computers, and peripherals) for circular economy and social technology reuse initiatives.

All user-facing interfaces, labels, and status indicators are localized in **Catalan**.

---

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)**: Modern component-based user interface with hooks and state management.
- **[Vite 8](https://vite.dev/)**: Next-generation, lightning-fast frontend development tool and production bundler.
- **Modern CSS3**: Pure CSS styling utilizing CSS Custom Properties (variables), Flexbox, CSS Grid, and responsive breakpoints, featuring automatic support for light and dark color schemes.
- **ESLint**: Code quality and linting configuration for React and modern JavaScript.

---

## ✨ Main Features

- **localStorage Persistence**:
  All inventory items, status changes, new registrations, and deletions are saved directly to the browser's `localStorage` under the key `reboot_share_devices_inventory`. Data persists automatically across page reloads without requiring an external database or backend API.

- **Automatic Sequential ID Generation**:
  Device identifiers are automatically calculated based on the highest existing numbered code (e.g., `RB-SH-016`, `RB-SH-017`, `RB-SH-018`...).

- **KPI Status Dashboard**:
  Interactive metrics and counter badges prominently displayed at the top of the dashboard for each device status:
  - **En prova**: Devices currently undergoing technical verification and testing.
  - **Apte**: Devices ready for loan, assignment, or use.
  - **Diagnosi**: Devices under technical diagnosis or repair.
  - **Prestat**: Devices actively loaned to end users.
  - **Total**: Complete count of registered inventory items.
  Clicking any KPI card immediately filters the inventory table by that status.

- **Integrated Device Registration Form**:
  A streamlined form situated above the inventory table allowing users to register new devices with a pre-filled automatic ID, device type selector (`Portàtil`, `Tauleta`, `Sobretaula`, `Perifèrics`), default status (`En prova`), and field validation in Catalan.

- **Interactive Inventory Table**:
  - Full-text search by ID, type, or notes.
  - Combined filtering by device type and status.
  - Column sorting by Identifier, Type, and Status.
  - Inline status changer dropdown for every device row.
  - Visual status chips with dedicated color coding and icons.

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) and `npm` installed on your machine.

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd reboot-share
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Open your browser and navigate to the local URL shown in the terminal (usually `http://localhost:5173/`).

---

## 📦 Available Scripts

- `npm run dev`: Starts the local development server with instant HMR.
- `npm run build`: Compiles and bundles the application for production into the `dist/` folder.
- `npm run lint`: Runs ESLint across the codebase to check for code style and syntax rules.
- `npm run preview`: Locally previews the production build created by `npm run build`.

---

## 📄 License

Private project developed for the REBOOT Share technological reuse platform.
