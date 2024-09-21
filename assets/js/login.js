function toggleForm(formType) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const buttons = document.querySelectorAll("button");

  if (formType === "login") {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  }

  buttons.forEach((button) => {
    if (button.textContent.toLowerCase().includes(formType)) {
      button.classList.add("active-tab", "border-primary");
    } else {
      button.classList.remove("active-tab", "border-primary");
    }
  });
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("https://mypiono.sysoftgroups.com/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {

             // Store login state in localStorage
             localStorage.setItem('loggedIn', 'true');
             localStorage.setItem('userName', formData.get('email'));

          window.location = "index.html";
        } else {
          Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error",
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  });

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("https://mypiono.sysoftgroups.com/register.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            text: "Registration successful!",
            icon: "success",
          });
          this.reset();
          toggleForm("login"); // Switch to login form after successful signup
        } else {
          Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error",
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  });


 
  window.onload = function() {
    checkLoginStatus(); // Check if the user is logged in
}

function checkLoginStatus() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        //window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
       window.location.href = 'index.html'; // Redirect to login if not logged in
    }
}


function logout() {
    // Clear the login state from localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    // Optionally, show a message or alert
    alert('You have been logged out.');

    // Redirect to the login page
    window.location.href = 'login.html';
}