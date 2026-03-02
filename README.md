# CivicPulse - Citizen Issue Processing System

CivicPulse is a modern, professional SaaS dashboard designed for city authorities to efficiently manage, track, and analyze citizen-reported infrastructure and service issues. Built with a focus on design consistency, spatial visualization, and data-driven decision-making.

![CivicPulse Dashboard](https://picsum.photos/seed/civicpulse/1200/600)

## 🚀 Features

### 📊 Executive Dashboard
* **KPI Monitoring**: Real-time tracking of total reports, pending tasks, resolved issues, and average response times.
* **Trend Analysis**: Interactive line charts showing issue frequency over time.
* **Distribution Overview**: Pie charts visualizing the resolution status across all categories.

### 🗺️ Advanced Map View (GIS)
* **High-Detail Urban Map**: A custom-designed SVG map featuring organic district boundaries, river systems, and major highways.
* **Interactive Districts**: Hover-activated zones with real-time performance metrics and response rates.
* **Smart Markers**: Animated, priority-coded markers with detailed popovers and bidirectional synchronization with the issue list.
* **Google Maps Aesthetic**: Includes building footprints, secondary road networks, and POI indicators for hospitals, schools, and parks.

### 📋 Issue Management
* **Centralized List**: A robust table view with advanced filtering by status, priority, and category.
* **Detail Panel**: Slide-out panel for deep-diving into issue specifics, history, and administrative actions.
* **Status Workflow**: Seamless transition of issues from 'Reported' to 'Resolved'.

### 📈 Analytics & Reporting
* **Category Insights**: Bar charts showing the most frequent issue types (e.g., Potholes, Street Lights).
* **Performance Metrics**: Detailed breakdown of resolution efficiency and monthly trends.
* **Spatial Density**: Heatmap-ready visualization concepts for identifying problem hotspots.

### 🏢 Department & Category Management
* **Workload Tracking**: Monitor department assignments and current task loads.
* **Category Configuration**: Manage issue types with custom icons and trend indicators.

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS 4 (Utility-first, modern design system)
* **Animations**: Motion (formerly Framer Motion)
* **Charts**: Recharts (D3-based visualization)
* **Icons**: Lucide React
* **Build Tool**: Vite

## 📁 Project Structure

```text
/src
  ├── components/     # Reusable UI components (Badges, Cards, Sidebar)
  ├── services/       # Future API and external service logic
  ├── App.tsx         # Main application shell and routing logic
  ├── types.ts        # TypeScript interfaces and enums
  ├── constants.ts    # Mock data and system constants
  └── index.css       # Global styles and Tailwind configuration
```

## ⚙️ Installation & Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 🔮 Future Roadmap

* **Real-time Backend**: Integration with Express and SQLite for persistent data storage.
* **Citizen Mobile App**: A companion app for citizens to report issues with GPS and photo evidence.
* **AI Categorization**: Automated issue tagging and department routing using Gemini AI.
* **Push Notifications**: Real-time alerts for field workers and administrators.

## 📄 License

This project is developed as a professional demonstration of a modern citizen-government interaction platform.

---
*Crafted with precision for modern urban management.*
