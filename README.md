# CSV Data Editor

This is a React-based CSV data editor application that allows users to view, search, sort, and edit data loaded from a CSV string. Changes can be "saved" (simulated to console) and user actions are confirmed with a Snackbar notification.

## Features

* **CSV Data Display**: Renders CSV data in a clear, sortable table.
* **Data Parsing**: Parses a multi-line CSV string into a structured array of JavaScript objects.
* **Search Functionality**: Users can search across all columns for specific values, dynamically filtering the displayed data.
* **Table Sorting**: Columns can be sorted in ascending or descending order by clicking on their headers.
* **In-cell Editing**: Directly edit cell values by clicking on them. Changes are reflected in real-time.
* **Simulated Save**: A "Save Changes" button simulates saving the modified data by logging the updated CSV string to the console.
* **Snackbar Notifications**: Provides user feedback for actions like saving data.
* **Responsive Design**: Basic responsiveness using Material-UI components.

## Technologies Used

* **React**: Frontend JavaScript library for building user interfaces.
* **Material-UI (MUI)**: A popular React UI framework for pre-built components and styling.
* **JavaScript (ES6+)**: Core programming language.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Navigate to the project directory:**
    Assuming `App.tsx` is within a standard React project structure (e.g., created with Create React App or Vite):

    ```bash
    cd my-csv-editor-app
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    This will install all the necessary packages, including React and Material-UI.

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will open the application in your default web browser at `http://localhost:3000` (or another available port).

## Usage

1.  **View Data**: Upon opening the application, the CSV data will be displayed in a table.
2.  **Search**: Use the "Search" text field to filter the table data. Type any keyword, and the table will instantly show only rows that contain that keyword in any of their columns.
3.  **Sort Columns**: Click on any column header (e.g., "Code", "StkDesc", "Expr1") to sort the data by that column. Clicking again will reverse the sort order (ascending/descending).
4.  **Edit Cells**:
    * Click directly on any cell in the table.
    * A text input field will appear, allowing you to modify the cell's content.
    * Press `Enter` or click outside the text input to save your changes to the table's state.
5.  **Save Changes**: Click the "Save Changes" button. This action will:
    * Convert the current table data back into a CSV string.
    * Log the updated CSV string to your browser's developer console (Inspect Element -> Console).
    * Display a "Data saved successfully!" Snackbar notification at the bottom of the screen.

## Code Structure

* `App.tsx`: The main React component that contains all the logic for parsing, displaying, filtering, sorting, and editing the CSV data.

### Key Functions and Components:

* `initialCsvData`: A template literal string holding the initial CSV data.
* `parseCSV(csvString)`: A utility function to convert a CSV string into an array of objects. It intelligently handles quoted fields and extracts headers.
* `toCSV(headers, data)`: A utility function to convert the structured data back into a CSV string, ensuring proper quoting for values containing commas or quotes.
* `useState`, `useEffect`, `useMemo`, `useCallback`: React hooks used for managing component state, side effects, and performance optimizations.
* **Material-UI Components**: `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TextField`, `Button`, `Box`, `Typography`, `TableSortLabel`, `Snackbar`, `Alert`.
