
    // Fetch performance data using JavaScript
    document.addEventListener("DOMContentLoaded", function() {
        fetch('https://mypiono.sysoftgroups.com/get_performance_data.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('performance-data');
            
            const labels = []; // For dates
            const tutorialScores = []; // Scores for "Tutorial" mode
            const playScores = []; // Scores for "Play" mode

            tableBody.innerHTML = ''; // Clear existing content

            if (data.length > 0) {
                data.forEach(row => {
                    const formattedDate = new Date(row.timestamp).toISOString().split('T')[0];

                    // Check if the date is already in the labels array
                    if (!labels.includes(formattedDate)) {
                        labels.push(formattedDate);
                    }

                    // Separate data for "Tutorial" and "Play" mode
                    if (row.mode === 'Tutorial') {
                        tutorialScores.push({
                            x: formattedDate,
                            y: row.score
                        });
                    } else if (row.mode === 'Play') {
                        playScores.push({
                            x: formattedDate,
                            y: row.score
                        });
                    }

                    // Create table rows dynamically
                    const tr = document.createElement('tr');
                    tr.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');
                    tr.innerHTML = `
                        <td class="py-2 px-3 sm:py-3 sm:px-6">${formattedDate}</td>
                        <td class="py-2 px-3 sm:py-3 sm:px-6">${row.song_name}</td>
                        <td class="py-2 px-3 sm:py-3 sm:px-6">${row.score}%</td>
                        <td class="py-2 px-3 sm:py-3 sm:px-6">${row.mode}</td>
                    `;
                    tableBody.appendChild(tr);
                });

                // Create the chart with separate datasets for "Tutorial" and "Play" modes
                const ctx = document.getElementById('performanceChart').getContext('2d');
                const performanceChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels, // Date labels for the x-axis
                        datasets: [
                            {
                                label: 'Tutorial Mode Score (%)',
                                data: tutorialScores.map(point => point.y),
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: false,
                                tension: 0.3
                            },
                            {
                                label: 'Play Mode Score (%)',
                                data: playScores.map(point => point.y),
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: false,
                                tension: 0.3
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Score (%)'
                                },
                                min: 0,
                                max: 100
                            }
                        }
                    }
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-3">No performance data available</td></tr>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    });

    window.onload = function() {
        checkLoginStatus(); // Check if the user is logged in
    }
    
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
        // Optionally, show a message or alert
        
  Swal.fire({
    title: "Success",
    text: "You have been logged out",
    icon: "success",
  });
    
        // Redirect to the login page
        window.location.href = 'login.html';
    }
    