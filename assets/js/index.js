// Define the note mapping
const noteMapping = {
  C4: 0,
  "C#4": 1,
  Db4: 1,
  D4: 2,
  "D#4": 3,
  Eb4: 3,
  E4: 4,
  F4: 5,
  "F#4": 6,
  Gb4: 6,
  G4: 7,
  "G#4": 8,
  Ab4: 8,
  A4: 9,
  "A#4": 10,
  Bb4: 10,
  B4: 11,
  C5: 12,
};

// Convert the valid notes to an array for easier checking
const validNotes = Object.keys(noteMapping);

// Function to validate notes and durations as the user types
document
  .getElementById("typed-notes")
  .addEventListener("input", validateInputs);
document
  .getElementById("typed-durations")
  .addEventListener("input", validateInputs);

function validateInputs() {
  const typedNotes = document.getElementById("typed-notes").value.split(" ");
  const typedDurations = document
    .getElementById("typed-durations")
    .value.split(" ");

  // Validate notes
  const invalidNotes = typedNotes.filter(
    (note) => !validNotes.includes(note.trim())
  );

  // Validate durations (ensure they are between 100 and 5000)
  const invalidDurations = typedDurations.filter((duration) => {
    const num = parseInt(duration);
    return isNaN(num) || num < 100 || num > 5000;
  });

  // Validate if the number of notes matches the number of durations
  const notesDurationsMismatch = typedNotes.length !== typedDurations.length;

  // Display feedback
  let feedbackMessage = "";
  if (invalidNotes.length > 0) {
    feedbackMessage += `Invalid notes detected: ${invalidNotes.join(", ")}. `;
  }
  if (invalidDurations.length > 0) {
    feedbackMessage += `Invalid durations detected: ${invalidDurations.join(
      ", "
    )} (should be between 100 and 5000). `;
  }
  if (notesDurationsMismatch) {
    feedbackMessage += `The number of notes (${typedNotes.length}) and durations (${typedDurations.length}) must match.`;
  }

  if (feedbackMessage) {
    document.getElementById("note-feedback").textContent = feedbackMessage;
    document.getElementById("note-feedback").style.color = "red";
  } else {
    document.getElementById("note-feedback").textContent =
      "Notes and durations received successfully!";
    document.getElementById("note-feedback").style.color = "green";
  }
}

function submitTypedNotes() {
  // Get the song name, notes, and durations entered by the user
  const songName = document.getElementById("song-name").value;
  const notes = document
    .getElementById("typed-notes")
    .value.split(" ")
    .filter((note) => validNotes.includes(note.trim()));
  const durations = document
    .getElementById("typed-durations")
    .value.split(" ")
    .map((duration) => parseInt(duration));

  // Validate durations (100 to 5000) and ensure number of notes matches number of durations
  const validDurations = durations.filter(
    (duration) => duration >= 100 && duration <= 5000
  );
  const notesDurationsMatch = notes.length === durations.length;

  // Check if all notes and durations are valid and match
  if (
    notes.length > 0 &&
    validDurations.length === durations.length &&
    notesDurationsMatch
  ) {
    // Convert notes to corresponding values using noteMapping
    const notesNumeric = notes.map((note) => noteMapping[note]);

    // Create an object to hold the data
    const songData = {
      song_name: songName,
      notes: notesNumeric,
      durations: validDurations,
    };

    // Log the data or send it to the server
    console.log(songData);

    // Example of sending data to the server using fetch (AJAX)
    fetch("https://mypiono.sysoftgroups.com/save_song.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Success",
          text: "Notes submitted successfully!",
          icon: "success",
        });
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("note-feedback").textContent =
          "An error occurred while submitting notes.";
        document.getElementById("note-feedback").style.color = "red";
      });
  } else {
    let errorMessage = "Please correct the following issues: ";
    if (!notesDurationsMatch) {
      errorMessage += "The number of notes and durations must match. ";
    }
    if (validDurations.length !== durations.length) {
      errorMessage += "All durations must be between 100 and 5000.";
    }
    document.getElementById("note-feedback").textContent = errorMessage;
    document.getElementById("note-feedback").style.color = "red";
  }
}

// Function to load songs dynamically from the server
function loadSongs() {
  fetch("https://mypiono.sysoftgroups.com/get_songs.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const songList = document.getElementById("song-list");
        songList.innerHTML = ""; // Clear any existing options

        // Populate the dropdown with songs
        data.songs.forEach((song) => {
          const option = document.createElement("option");
          option.value = song.id;
          option.textContent = song.song_name;
          songList.appendChild(option);
        });
      } else {
        document.getElementById("playback-feedback").textContent = data.message;
      }
    })
    .catch((error) => {
      console.error("Error loading songs:", error);
      document.getElementById("playback-feedback").textContent =
        "Error loading songs.";
    });
}



function playSong() {
    // Get the select element
    const songList = document.getElementById('song-list');

    // Get the selected option's value (song ID) and text (song name)
    const selectedSongId = songList.value;
    const selectedSongName = songList.options[songList.selectedIndex].text;

    // Get the selected mode (Tutorial or Play)
    const mode = document.querySelector('input[name="mode"]:checked').value;

    // Update the feedback message to display the song name instead of the ID
    document.getElementById('playback-feedback').textContent = `Playing: ${selectedSongName} in ${mode} mode`;

    // Send the song ID and mode to the server for saving
    fetch('https://mypiono.sysoftgroups.com/save_played_song.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            song_id: selectedSongId,
            mode: mode
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Song play data saved successfully.');
        } else {
            console.error('Error saving song play data:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

function fetchStatus() {

    const statusIndicator = document.getElementById('status-indicator');
    const currentStatus = document.getElementById('current-status');

    fetch('https://mypiono.sysoftgroups.com/song.php')  // Replace with your server URL
        .then(response => response.json())
        .then(data => {
            currentStatus.textContent = "Playing : " + data.song_name;
            const status = data.status;
            if (status=="on") {
                statusIndicator.classList.remove('bg-red-500');
                statusIndicator.classList.add('bg-green-500');
            } else {
                statusIndicator.classList.remove('bg-green-500');
                statusIndicator.classList.add('bg-red-500');
            }
        })
        .catch(error => console.error('Error fetching status:', error));
}

// Fetch the status every 5 seconds
setInterval(fetchStatus, 5000);



function checkLoginStatus() {
  if (localStorage.getItem('loggedIn') !== 'true') {
      window.location.href = 'login.html'; // Redirect to login if not logged in
  } else {
      //document.getElementById('welcomeMessage').innerText = `Welcome, ${localStorage.getItem('userName')}!`;
  }
}

function logout() {
  // Clear the login state from localStorage
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userName');

  Swal.fire({
    title: "Success",
    text: "You have been logged out",
    icon: "success",
  });
 

  // Redirect to the login page
  window.location.href = 'login.html';
}


window.onload = function() {
  checkLoginStatus(); // Check if the user is logged in
  loadSongs();
}
