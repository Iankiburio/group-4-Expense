# Expense Tracker Application

This repository contains the code for an Expense Tracker application, built with Flask on the backend and incorporating React on the frontend.

## Backend
The backend utilizes Flask and Flask extensions for creating a RESTful API and managing expenses.

### Dependencies
- Flask==2.0.2
- Flask-RESTful==0.3.9
- Flask-SQLAlchemy==2.5.1
- Flask-Migrate==3.1.0
- Flask-CORS==3.0.10
- Flask-WTF==0.15.1
- Flask-Login==0.5.0
- SQLAlchemy==1.4.31
- Werkzeug==2.0.2
- WTForms==2.3.3

### Functionality
- `/login`: Handles user login and registration with token-based authentication.
- `/expenses`:
  - `GET`: Retrieves all expenses.
  - `POST`: Adds a new expense.
- `/expenses/<expense_id>`:
  - `DELETE`: Deletes a specific expense.
- `/logout`: Handles user logout.

## Frontend
The frontend is built using React and includes form components for adding and listing expenses.

### Components
- `ExpenseForm.css`: Styles for the expense form container, labels, inputs, and buttons.
- `ExpenseForm.js`: React component for adding expenses.
- `ExpenseList.css`: Styles for the expense list container, items, and buttons.
- `ExpenseList.js`: React component for displaying the list of expenses.
- `Login.css`: Styles for the login page including form elements and responsiveness.

## Instructions
To run the application:
1. Set up the backend by installing dependencies and running the Flask server.
2. Set up the frontend by configuring the React environment and launching the application.

## Backend Setup
1. Ensure Python 3.10 is installed.
2. Install dependencies using `pip install -r requirements.txt`.
3. Run the Flask server using `python app.py`.

## Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies using `npm install`.
3. Start the React application with `npm start`.

## Contributors
- [Alpha Likembe
- Ian Kiburio
- Sadique Said
- Faith Achieng]
