document.getElementById('mail').addEventListener("click", function() {
    navigator.clipboard.writeText(this.textContent);
});