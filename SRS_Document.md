# Software Requirements Specification (SRS)

## Table of Contents
1. [Introduction](#introduction)
   1. [Purpose](#purpose)
   2. [Scope](#scope)
2. [Definitions, Acronyms, and Abbreviations](#definitions-acronyms-and-abbreviations)
3. [References](#references)
4. [Overall Description](#overall-description)
   1. [Product Perspective](#product-perspective)
   2. [Product Functions](#product-functions)
   3. [User Classes and Characteristics](#user-classes-and-characteristics)
   4. [Operating Environment](#operating-environment)
   5. [Design and Implementation Constraints](#design-and-implementation-constraints)
   6. [Assumptions and Dependencies](#assumptions-and-dependencies)
5. [System Features](#system-features)
   1. [User Authentication](#user-authentication)
   2. [Report Management](#report-management)
   3. [Summarization Tool](#summarization-tool)
   4. [Internationalization](#internationalization)
6. [External Interface Requirements](#external-interface-requirements)
   1. [User Interfaces](#user-interfaces)
   2. [Hardware Interfaces](#hardware-interfaces)
   3. [Software Interfaces](#software-interfaces)
   4. [Communication Interfaces](#communication-interfaces)
7. [Other Non-Functional Requirements](#other-non-functional-requirements)
   1. [Performance Requirements](#performance-requirements)
   2. [Security Requirements](#security-requirements)
   3. [Software Quality Attributes](#software-quality-attributes)
8. [Appendices](#appendices)
   1. [Appendix A: Glossary](#appendix-a-glossary)
   2. [Appendix B: Use Case Diagrams](#appendix-b-use-case-diagrams)

## Introduction
### Purpose
The CBL Summary App is designed to provide users with an efficient tool to view, filter, and summarize reports using AI technology. This Software Requirements Specification (SRS) outlines the functional and non-functional requirements for the development and deployment of the application.

### Scope
The application consists of a backend built with Django and Django REST Framework, and a frontend developed using React.js and Material UI. It supports both English and Arabic languages, allowing users to toggle between them seamlessly. Key functionalities include report management, AI-powered summarization, PDF viewing, and responsive design compatible with various devices.

## Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **AI**: Artificial Intelligence
- **UI**: User Interface
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **REST**: Representational State Transfer

## References
- Django Documentation
- React.js Documentation
- Material UI Documentation
- i18next Documentation

## Overall Description
### Product Perspective
The CBL Summary App is a standalone web application that integrates a Django backend for data management and API services, and a React frontend for user interaction. It interacts with external APIs to fetch and process report data and utilizes AI services for text summarization.

### Product Functions
- **User Authentication**: Secure login and logout functionalities.
- **Report Management**: CRUD operations for reports, including fetching from remote sources.
- **Summarization Tool**: AI-powered summarization of selected reports.
- **PDF Viewing**: Integrated PDF viewer for report documents.
- **Internationalization**: Support for English and Arabic languages with dynamic layout adjustments.
- **Responsive Design**: Optimized UI for desktop and mobile devices.

### User Classes and Characteristics
- **Administrators**: Manage reports, oversee system operations.
- **Regular Users**: View, filter, and summarize reports.
- **Guest Users**: Limited access to view reports without summarization features.

### Operating Environment
- **Backend**: Python 3.7+, Django 5.1.4, PostgreSQL database.
- **Frontend**: Node.js 14+, React.js, Material UI.
- **Deployment**: Compatible with cloud platforms supporting Django and React deployments.

### Design and Implementation Constraints
- Must adhere to Microsoft Content Policies.
- Ensure compliance with copyright laws.
- Maintain code modularity for scalability and maintenance.

### Assumptions and Dependencies
- Availability of external APIs for fetching report data.
- Users have stable internet connections for accessing the application.
- Secure storage of API keys and sensitive information.

## System Features
### User Authentication
**Description**: Enables users to securely log in and out of the application.

**Functional Requirements**:
- Users must provide valid credentials to access protected features.
- Passwords should be hashed and securely stored.
- Implement session management to handle user sessions.

### Report Management
**Description**: Facilitates the creation, retrieval, updating, and deletion of report entries.

**Functional Requirements**:
- Fetch reports from remote sources and populate the database.
- Allow administrators to add, edit, or remove reports.
- Enable users to filter reports by type and year.

### Summarization Tool
**Description**: Provides AI-powered summarization of selected reports.

**Functional Requirements**:
- Allow users to select multiple reports for summarization.
- Generate summaries in English or Arabic based on user preference.
- Display summaries with organized headings and bullet points.

### Internationalization
**Description**: Supports multiple languages and adjusts the UI layout accordingly.

**Functional Requirements**:
- Enable language toggling between English and Arabic.
- Adjust text direction (LTR/RTL) based on the selected language.
- Translate all UI elements and messages.

## External Interface Requirements
### User Interfaces
- **Navbar**: Contains language toggle, navigation links.
- **Reports Grid**: Displays available reports with filtering options.
- **PDF Viewer**: Embedded viewer for selected PDFs.
- **Summary Section**: Displays generated summaries with export options.
- **Dialogs**: Session expiration and error notifications.

### Hardware Interfaces
No specific hardware interfaces required. Compatible with standard desktops, laptops, tablets, and smartphones.

### Software Interfaces
- **Backend APIs**: Endpoints for fetching reports, generating summaries.
- **AI Services**: Integration with AI APIs for text summarization.
- **Database**: PostgreSQL for data storage.

### Communication Interfaces
- **HTTP/HTTPS**: Secure communication between frontend and backend.
- **API Calls**: RESTful API endpoints for data operations.

## Other Non-Functional Requirements
### Performance Requirements
- **Response Time**: API responses should be under 2 seconds for optimal user experience.
- **Scalability**: System should handle increasing numbers of reports and users without performance degradation.

### Security Requirements
- **Data Protection**: Secure handling of user data and report information.
- **Authentication**: Implement robust authentication mechanisms.
- **Authorization**: Role-based access control to restrict functionalities.

### Software Quality Attributes
- **Usability**: Intuitive and user-friendly interface.
- **Reliability**: High availability and minimal downtime.
- **Maintainability**: Modular codebase for easy updates and maintenance.
- **Portability**: Compatible across major web browsers and devices.

## Appendices
### Appendix A: Glossary
- **CBL**: Central Bank of Libya
- **SRS**: Software Requirements Specification
- **UI**: User Interface

### Appendix B: Use Case Diagrams
Diagrams to be added to visualize user interactions and system functionalities.
