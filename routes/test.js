document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);

    // Convert FormData to JSON
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    // Make POST request
    fetch("https://bookstorebe-production.up.railway.app/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to register user.");
            }
            return response.json();
        })
        .then(data => {
            console.log("User registered successfully:", data);
            // You can redirect the user to another page or show a success message here
        })
        .catch(error => {
            console.error("Registration failed:", error);
            // Handle error, show error message, etc.
        });
});