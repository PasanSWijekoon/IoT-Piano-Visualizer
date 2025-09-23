# IoT Piano LED Visualizer - Website + Arduino

## Overview
The IoT Piano LED Visualizer project includes a web-based application designed to facilitate interaction with the piano visualizer system. This web application allows users to manage their piano notes, track performance, and adjust system settings. The website uses modern web technologies, including HTML, CSS, JavaScript, PHP, and Tailwind CSS, to create a responsive and user-friendly interface.

## Website Structure
The website consists of the following key pages:

1.  **Home Page**: Provides an overview of the current status of the system, allows users to upload or type in piano notes, select songs to play, and manage existing notes.

2.  **Login/Signup Page**: Allows users to log in to their accounts or sign up for a new account. It uses Tailwind CSS for styling and includes interactive elements like form input transitions and animations.

3.  **Performance Page**: Displays the user's recent performance data, including scores and modes for different songs. This page also features a section for graphical representation of performance progress over time.

4.  **Settings Page**: Provides options for users to adjust system settings such as volume control and theme selection (light or dark mode).

5.  **Help Page**: Offers guidance on how to use the system, including troubleshooting tips and frequently asked questions.

6.  **Contact Support Page**: Allows users to contact support by filling out a form with their name, email, and message.

---

## Arduino Project Simulator

**Simulator**
The project includes a simulator that provides a virtual environment to test the Arduino code without physical hardware.

- **Link**: [https://wokwi.com/projects/405832196234974209](https://wokwi.com/projects/405832196234974209)

---

## Key Features
-   **Responsive Design**: The website is designed to be fully responsive, ensuring a seamless experience across various devices, including desktops, tablets, and smartphones.
-   **User Interaction**: Users can interact with the system by uploading note files, typing notes directly into the application, and selecting different play modes.
-   **Performance Tracking**: The website provides an overview of the user's performance, displaying scores and modes for previously played songs.
-   **Settings Adjustment**: Users can personalize their experience by adjusting settings such as volume and theme.
-   **User Authentication**: The application includes login and signup functionalities to secure user data and personalize the experience.

---

## Technologies Used
-   **HTML/CSS**: For structuring and styling the web pages.
-   **JavaScript**: For handling interactive elements and form submissions.
-   **PHP**: For server-side scripting, handling user authentication, and managing note uploads.
-   **Tailwind CSS**: A utility-first CSS framework used for responsive and modern UI design.
-   **Font Awesome**: For incorporating icons into the user interface.

---

## Navigation Structure
The website features a consistent navigation structure to ensure ease of use:

-   **Desktop Navigation**: A top navigation bar with links to Home, Performance, Settings, Help, Contact Support, and Log Out.
-   **Mobile Navigation**: A collapsible menu for mobile users, providing the same links as the desktop navigation.

---

## Arduino Code Details
The Arduino code runs on an ESP32 microcontroller and manages the physical hardware components of the piano visualizer. It handles communication with the web application, controls the LED strip, and processes user input from the buttons.

### Hardware Components
The ESP32 is connected to the following components:

* **WS2811 LED Strip**: The code controls a strip of 14 LEDs to visually guide the user.
* **16x4 I2C LCD**: Displays messages to the user, such as Wi-Fi status, song name, and mode.
* **Push Buttons**: An array of 13 push buttons is used for user input, allowing them to play the piano notes.
* **PIR Motion Sensor**: A motion sensor is used to detect when a user is present, prompting them to start the song sequence.

### Wi-Fi and Server Communication
The code uses the `WiFi` and `HTTPClient` libraries to connect to the internet and communicate with the web server. It performs several key functions:

* **`connectToWiFi()`**: Establishes a Wi-Fi connection with the credentials provided.
* **`sendEspStatus()`**: Sends the status of the ESP32 (e.g., 'on') to the server, allowing the web application to monitor the device's availability.
* **`checkForSongFetch()`**: Periodically checks a flag on the server to see if a new song has been uploaded or selected by the user.
* **`fetchSongData()`**: If a new song is available, this function fetches the song data (notes, durations, song name, and mode) from the server.
* **`sendPerformanceToServer()`**: After a song is played, this function sends the performance data (song name, mode, and score) back to the server for tracking.

### Play Modes
The system supports two main play modes, determined by the data fetched from the web server:

* **`playTutorialMode()`**: Lights up an LED and waits for the user to press the corresponding button before proceeding to the next note. This mode is designed for learning.
* **`playPlayMode()`**: Lights up the LED and measures if the user presses the correct button within a specific time duration (the note's duration). This mode is for performance and scoring.

### Main Loop (`loop()`)
The main loop of the code continuously checks for user presence using the PIR sensor. When motion is detected, it waits for a button press to start the song sequence. It then calls the appropriate play function (`playTutorialMode` or `playPlayMode`) based on the fetched song data. After the song is completed, it calculates the performance score and sends it to the server. The loop also periodically checks for new songs from the server.

---

## Setup and Deployment
To set up and deploy the IoT Piano LED Visualizer website, follow these steps:

1.  **Environment Setup**: Ensure that you have a web server (e.g., Apache) and PHP installed. The website files should be placed in the server's root directory or a designated subdirectory.
    
2.  **Database Configuration**: Set up a MySQL database to handle user authentication and performance data. Update the PHP scripts with the appropriate database credentials.

3.  **Tailwind CSS**: The project uses a CDN for Tailwind CSS. Ensure that the internet connection is available for fetching the styles.

4.  **File Permissions**: Adjust file permissions as necessary to allow the web server to read and write files, particularly for note uploads.

---

## Usage
-   **Login/Signup**: Users must first log in or create an account to access the main features of the website.
-   **Note Management**: Once logged in, users can upload or type their piano notes and manage them from the Home page.
-   **Performance Tracking**: Users can view their performance history and graphical representation on the Performance page.
-   **Settings**: Users can customize their settings from the Settings page to enhance their learning experience.

