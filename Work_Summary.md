
## Backend

The backend is built with **Django** and **Django REST Framework**, providing API endpoints for fetching reports, generating summaries, and managing report data.

### Key Components

- **Views**: Define API endpoints and handle HTTP requests for summarization and report retrieval.
- **Models**: Represent the data structures for reports and other entities in the database.
- **Serializers**: Convert model instances to JSON format for API responses and validate incoming data.

## Frontend

The frontend is developed using **React.js** and **Material UI**, delivering a dynamic and responsive user interface. It communicates with the backend API to fetch data and generate summaries.

### Key Components

- **ReportsGrid**: Displays a list of reports with filtering options for type and year.
- **Summary**: Handles the summarization feature and displays the generated summaries.
- **PDF Viewer**: Integrates an embedded viewer for displaying PDF documents within the app.
- **Internationalization**: Utilizes **i18next** for language switching, supporting both LTR and RTL layouts.

## Installation

### Prerequisites

- **Backend**: Python 3.7+, virtualenv
- **Frontend**: Node.js 14+, npm or Yarn

### Backend Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/CBL-Dashboard-V2.git
    cd CBL-Dashboard-V2/backend
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

1. **Navigate to the Frontend Directory**:

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

## System Features

### User Authentication

Secure login and logout functionalities ensure that only authorized users can access certain features of the application.

### Report Management

- **CRUD Operations**: Administrators can create, read, update, and delete reports.
- **Filtering**: Users can filter reports by type and year for efficient navigation.

### Summarization Tool

- **AI-Powered Summaries**: Generate summaries in English or Arabic.
- **Batch Summarization**: Select multiple reports to generate combined summaries, highlighting trends and contrasts.

### Internationalization

- **Multi-Language Support**: The app supports English and Arabic languages.
- **Dynamic Layout**: The user interface adjusts between LTR and RTL layouts based on the selected language.

## Non-Functional Requirements

### Performance

- **Response Time**: API responses should be under 2 seconds for optimal user experience.
- **Scalability**: The system should handle increasing numbers of reports and users without performance degradation.

### Security

- **Data Protection**: Secure handling and storage of user data and report information.
- **Authentication**: Robust authentication mechanisms to prevent unauthorized access.
- **Authorization**: Role-based access control to restrict functionalities appropriately.

### Usability

- **User-Friendly Interface**: Intuitive design for easy navigation and interaction.
- **Responsive Design**: Compatible across major web browsers and devices, including desktops and mobiles.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **Django**: For the robust backend framework.
- **React.js**: For the flexible and efficient frontend library.
- **Material UI**: For providing a rich set of UI components.
- **i18next**: For simplifying internationalization within the app.
