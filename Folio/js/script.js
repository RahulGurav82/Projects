

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode")
})


// infinite scrolling effect

const scrollContainer = document.getElementById('scrollContainer');
let scrollInterval;

// Function to start auto-scrolling from bottom to top
function startAutoScroll() {
    scrollContainer.scrollTop = scrollContainer.scrollHeight; // Scroll to the bottom initially

    scrollInterval = setInterval(() => {
        scrollContainer.scrollBy({
            top: -1, // Scroll upward (negative value)
            behavior: 'smooth'
        });

        // If the scroll reaches the top, reset to the bottom to create infinite scroll
        if (scrollContainer.scrollTop === 0) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, 20); // Adjust the speed (lower value = faster scroll)
}

// Function to stop scrolling
function stopAutoScroll() {
    clearInterval(scrollInterval); // Stop the interval that controls the scrolling
}

// Start scrolling automatically
startAutoScroll();

// Stop scrolling when the user hovers over the display
scrollContainer.addEventListener('mouseover', stopAutoScroll);

// Resume scrolling when the mouse leaves the display
scrollContainer.addEventListener('mouseout', startAutoScroll);