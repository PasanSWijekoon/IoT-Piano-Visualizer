<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IoT Piano LED Visualizer - Notes Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/assets/img/favicon/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
</head>

<body class="bg-gray-100 font-sans flex flex-col min-h-screen">
    <!-- Navigation Section -->
    <nav class="bg-indigo-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <a href="index.html" class="font-bold text-xl">IoT Piano Visualizer</a>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-4">
                    <a href="index.html" class="hover:text-indigo-200 transition-colors duration-300">Home</a>
                    <a href="performance.html" class="hover:text-indigo-200 transition-colors duration-300">Performance</a>
                    <a href="settings.html" class="hover:text-indigo-200 transition-colors duration-300">Settings</a>
                    <a href="contact.html" class="hover:text-indigo-200 transition-colors duration-300">Contact Support</a>
                    <a href="#" class="hover:text-indigo-200 transition-colors duration-300">Log Out</a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-button" class="md:hidden focus:outline-none">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
    
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="md:hidden hidden mt-3">
                <a href="index.html" class="block py-2 px-4 text-sm text-left bg-indigo-700 rounded-lg mb-2 hover:bg-indigo-800 transition-colors duration-300">Home</a>
                <a href="performance.html" class="block py-2 px-4 text-sm text-left bg-indigo-700 rounded-lg mb-2 hover:bg-indigo-800 transition-colors duration-300">Performance</a>
                <a href="settings.html" class="block py-2 px-4 text-sm text-left bg-indigo-700 rounded-lg mb-2 hover:bg-indigo-800 transition-colors duration-300">Settings</a>
                <a href="contact.html" class="block py-2 px-4 text-sm text-left bg-indigo-700 rounded-lg mb-2 hover:bg-indigo-800 transition-colors duration-300">Contact Support</a>
                <a href="#" class="block py-2 px-4 text-sm text-left bg-indigo-700 rounded-lg mb-2 hover:bg-indigo-800 transition-colors duration-300">Log Out</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto mt-4 sm:mt-8 px-4">
        <!-- Current Status Section -->
        <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-8">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Current Status</h2>
            <div class="flex items-center space-x-4">
                <div class="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                <p class="text-base sm:text-lg" id="current-status">Playing: Happy Birthday</p>
            </div>
        </div>

        <!-- Notes Upload Section -->
        <div class="grid sm:grid-cols-2 gap-4 sm:gap-8">
            <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Upload Your Piano Notes</h2>
                <form action="upload.php" method="post" enctype="multipart/form-data">
                    <div class="flex items-center justify-center w-full">
                        <label class="w-full flex flex-col items-center px-4 py-4 sm:py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-600 hover:text-white">
                            <i class="fas fa-cloud-upload-alt text-2xl sm:text-3xl"></i>
                            <span class="mt-2 text-sm sm:text-base leading-normal">Select a file</span>
                            <input type='file' name="noteFile" accept=".txt, .midi, .xml" class="hidden" required />
                        </label>
                    </div>
                    <button type="submit" class="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300">Upload Notes</button>
                </form>
                <p id="upload-feedback" class="mt-2 text-xs sm:text-sm text-gray-600">File uploaded successfully!</p>
            </div>

            <!-- Type Your Notes Section -->
            <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Type Your Notes</h2>
                <input type="text" id="song-name" class="w-full p-2 mb-2 border rounded text-sm sm:text-base" placeholder="Enter song name, e.g., Happy Birthday">
                <textarea id="typed-notes" rows="4" class="w-full p-2 border rounded text-sm sm:text-base" placeholder="Type notes here, e.g., C4 E4 G4">C4 E4 G4</textarea>
                <button onclick="submitTypedNotes()" class="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300">Submit Notes</button>
                <p id="note-feedback" class="mt-2 text-xs sm:text-sm text-gray-600">Notes received successfully!</p>
            </div>
        </div>
        
        <!-- Select Song to Play Section -->
        <div class="mt-4 sm:mt-8 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-semibold mb-4">Select Song to Play</h2>
            <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <select id="song-list" class="w-full sm:w-1/3 p-2 border rounded mb-4 sm:mb-0 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="happy_birthday.mid">Happy Birthday</option>
                    <option value="twinkle_twinkle.mid">Twinkle Twinkle Little Star</option>
                    <option value="fur_elise.mid">Fur Elise</option>
                </select>
                <div class="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <label class="inline-flex items-center">
                        <input type="radio" id="tutorial-mode" name="mode" value="tutorial" checked class="form-radio text-indigo-600 focus:ring-indigo-500">
                        <span class="ml-2 text-sm sm:text-base">Tutorial Mode</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" id="play-mode" name="mode" value="play" class="form-radio text-indigo-600 focus:ring-indigo-500">
                        <span class="ml-2 text-sm sm:text-base">Play Mode</span>
                    </label>
                </div>
                <button onclick="playSong()" class="w-full sm:w-auto bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Play Selected Song
                </button>
            </div>
            <p id="playback-feedback" class="mt-4 text-xs sm:text-sm text-gray-600">Playing: Twinkle Twinkle Little Star in Tutorial Mode</p>
        </div>

        <!-- Manage Your Notes Section -->
        <div class="mt-4 sm:mt-8 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Manage Your Notes</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-xs sm:text-sm">
                    <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase leading-normal">
                            <th class="py-2 px-3 sm:py-3 sm:px-6 text-left">Note Name</th>
                            <th class="py-2 px-3 sm:py-3 sm:px-6 text-left">Type</th>
                            <th class="py-2 px-3 sm:py-3 sm:px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="notes-list" class="text-gray-600 font-light">
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">Happy Birthday</td>
                            <td class="py-2 px-3 sm:py-3 sm:px-6 text-left">Uploaded</td>
                            <td class="py-2 px-3 sm:py-3 sm:px-6 text-center">
                                <button class="bg-blue-500 text-white py-1 px-2 rounded mr-1 hover:bg-blue-600 transition duration-300 text-xs sm:text-sm">Play</button>
                                <button class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300 text-xs sm:text-sm">Delete</button>
                            </td>
                        </tr>
                        <!-- More rows here -->
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto text-center text-sm">
            <p class="mt-2">&copy; 2024 IoT Piano LED Visualizer. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Function to submit typed notes
        function submitTypedNotes() {
            const typedNotes = document.getElementById('typed-notes').value;
            // Send the typed notes to the server (implementation needed)
            document.getElementById('note-feedback').innerText = 'Notes submitted successfully!';
        }

        // Function to play the selected song
        function playSong() {
            const selectedSong = document.getElementById('song-list').value;
            const selectedMode = document.querySelector('input[name="mode"]:checked').value;
            // Implement the logic to play the selected song
            document.getElementById('playback-feedback').innerText = `Playing: ${selectedSong} in ${selectedMode} Mode`;
        }

        // Simulated function to handle feedback (replace with real data fetching as needed)
        function simulateFeedback() {
            document.getElementById('current-status').innerText = 'Idle';
            document.getElementById('upload-feedback').innerText = 'Upload a note file to get started.';
            document.getElementById('note-feedback').innerText = '';
            document.getElementById('playback-feedback').innerText = 'Select a song and mode to play.';
        }

        // Initialize page with sample feedback
        simulateFeedback();
    </script>
</body>

</html>
