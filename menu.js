document.addEventListener("DOMContentLoaded", function() {
    // Navigation links
    const fullpoints = document.getElementById("pointsLink");
    const homeLink = document.getElementById("homeLink");
    const aboutLink = document.getElementById("aboutLink");
    const themeToggle = document.getElementById("themeToggle");
    const currentThemeSpan = document.getElementById("currentTheme");

    // Mode buttons
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");

    let points = localStorage.getItem("pointstotal");
    updatepoints();

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Navigation link click events
    homeLink.addEventListener("click", function(event) {
        console.log("Navigating to renumbermenu.html");
    });

    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("About link clicked");
        // Add functionality to navigate to about page
    });

    // Theme toggle click event
    themeToggle.addEventListener("click", function(event) {
        event.preventDefault();
        const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // Mode button click events
    mode1.addEventListener("click", function() {
        console.log("Classic Mode selected");
        // Add functionality for Classic Mode
    });

    mode2.addEventListener("click", function() {
        console.log("Timed Mode selected");
        // Add functionality for Timed Mode
    });

    mode3.addEventListener("click", function() {
        console.log("Endless Mode selected");
        // Add functionality for Endless Mode
    });

    function updatepoints(){
        fullpoints.innerHTML = points + " points";
    }

    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
            currentThemeSpan.textContent = "Dark";
        } else {
            document.body.classList.remove("dark-theme");
            currentThemeSpan.textContent = "Light";
        }
    }
});