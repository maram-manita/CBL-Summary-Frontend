# React + Vite

# CBL Report Summarizer App

## Overview

The Report Summarizer App is a web-based AI summary application that allows users to view and filter reports, download PDFs, and manage files. The app supports both English and Arabic languages, and the layout adapts dynamically to the selected language.

## Features

- **Multi-Language Support**: The app supports English and Arabic. The layout switches between **LTR** (Left-to-Right) and **RTL** (Right-to-Left) based on the selected language.
- **File Filtering**: Users can filter reports based on report type and year.
- **PDF Viewer**: Select and view PDF documents associated with each report.
- **File Selection**: Checkbox-based selection of multiple reports for actions such as generating summaries.
- **Soon**: Generate AI-Powered summary
- **Responsive Design**: The app is designed to work seamlessly across desktop and mobile devices.

## Technologies Used

- **React.js**: Frontend framework for building the UI.
- **Material UI**: React component library for built-in components
- **i18next**: A library for managing internationalization and translations
- **Vite**: Tool for fast development and build

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn

### Steps to Install

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/maram-manita/CBL-Summary-App
   ```

2. Navigate to the Reports folder (wherever you have it stored):

   ```bash
   npx http-server .
   ```

3. Install dependencies (first time only, may have to re-run if more dependencies are add):

   ```bash
   npm install .
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

   This will start the development server and open the app in your browser at `http://localhost:5173`.

## Usage

1. **Language Toggle**: The language can be toggled between **English** and **Arabic** via the **globe icon** in the navbar. The app layout will adjust according to the selected language.
2. **Filtering Reports**: Users can filter reports by **report type** and **year**. Only the matching reports will be displayed in the data grid.

3. **Viewing PDFs**: Click on the **"View PDF"** button to open the corresponding PDF in an embedded iframe.

4. **File Selection**: Use checkboxes to select multiple files. The selected files can be used for further actions such as generating summaries.

## Folder Structure

```
/src
  /assets      // Store images, logos, and other static assets
  /components  // Reusable React components
    Navbar.js  // Navbar component
    ReportsGrid.js  // DataGrid component for report list
  /i18n        // Internationalization files
  App.js       // Main application component
  App.css      // Custom CSS for styling
  index.js     // Entry point for React app
```

## Acknowledgements

- **Material UI**: For providing a rich set of UI components.
- **i18next**: For making internationalization in React simple and easy.
- **React**: For building the entire frontend of this application.
