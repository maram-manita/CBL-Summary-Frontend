CBL Summary App
## Overview

The **CBL Summary App** is a web-based application designed to summarize reports using AI technology. It allows users to view, filter, and summarize reports, with support for both English and Arabic languages. The application features a responsive design that adapts to various devices and includes features like PDF viewing and multi-file selection for batch summarization.

## Features

- **AI-Powered Summarization**: Generate summaries of selected reports using advanced AI algorithms.
- **Multi-Language Support**: Supports English and Arabic, switching between LTR and RTL layouts based on the selected language.
- **Report Filtering**: Filter reports by type and year to find relevant documents quickly.
- **PDF Viewer**: View PDF reports directly within the application.
- **Batch Operations**: Select multiple reports for bulk summarization.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Backend**: Python, Django, Django REST Framework
- **Frontend**: React.js, Material UI, Axios, i18next
- **Others**: Vite (for frontend tooling), html2pdf.js (for exporting summaries)

## Installation

### Prerequisites

- **Backend**: Python 3.7+, virtualenv
- **Frontend**: Node.js 14+, npm or Yarn

### Backend Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/CBL-Summary-App.git
    cd CBL-Summary-App/backend
    ```

2. **Create a Virtual Environment**:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install Dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Apply Migrations**:

    ```bash
    python manage.py migrate
    ```

5. **Run the Server**:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to Frontend Directory**:

    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the Development Server**:

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:5173`.

## Usage

1. **Language Toggle**: Switch between English and Arabic using the globe icon in the navbar.
2. **Filter Reports**: Use the filters to select reports by type and year.
3. **View PDFs**: Click "View PDF" to open the report in an embedded viewer.
4. **Select Reports**: Use checkboxes to select multiple reports for summarization.
5. **Generate Summary**: Click "Summarize" to generate an AI-powered summary of selected reports.
6. **Export Summary**: Use the export feature to download the summary as a PDF.

## Project Structure

```
CBL-Summary-App/
├── backend/
│   ├── api/
│   ├── backend/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **Django**: For the robust and scalable backend framework.
- **React.js**: For the flexible and efficient frontend library.
- **Material UI**: For pre-built UI components that enhanced development speed.
- **i18next**: For simplifying internationalization across the app.
