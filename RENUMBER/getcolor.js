const modal = document.getElementById("settingsModal");
const closeButton = document.querySelector(".close");

const colorPicker = document.getElementById("colorPicker");

document.body.style.backgroundColor = localStorage.getItem("pagecolor");



settingsLink.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("Settings link clicked");
    openSettingsModal();
});

function openSettingsModal() {
    modal.style.display = "block";
}

closeButton.addEventListener("click", function() {
    closeModal();
});

function closeModal() {
    modal.style.display = "none";
}

colorPicker.addEventListener("change", function() {
    const selectedColor = colorPicker.value;
    document.body.style.backgroundColor = selectedColor;
    colorIndicator.style.backgroundColor = selectedColor;
    localStorage.setItem("pagecolor", selectedColor)
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        closeModal();
    }
});