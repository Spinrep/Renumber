document.addEventListener("DOMContentLoaded", function() {
    // Navigation links

    const fullpoints = document.getElementById("pointsLink");

    let points = localStorage.getItem("pointstotal");

    updatepoints();


    const homeLink = document.getElementById("homeLink");
    const aboutLink = document.getElementById("aboutLink");

    // Mode buttons
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");

    // Modal

    const colorPicker = document.getElementById("colorPicker");


    document.body.style.backgroundColor = localStorage.getItem("pagecolor");

    // Navigation link click events
    homeLink.addEventListener("click", function(event) {
        // No need for preventDefault, as it's a regular link
        console.log("Navigating to renumbermenu.html");
    });

    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("About link clicked");
        // Add functionality to navigate to about page
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

    // Modal close button click event
 

    // Close modal when clicking outside of it


    // Color picker change event
    colorPicker.addEventListener("change", function() {
        const selectedColor = colorPicker.value;
        document.body.style.backgroundColor = selectedColor;
        localStorage.setItem("pagecolor", selectedColor)
    });

    function openSettingsModal() {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }
    function updatepoints(){
        fullpoints.innerHTML = points + " points";
    }
});

