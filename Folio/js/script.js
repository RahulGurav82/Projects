const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

const modeSwitch = document.getElementById("mode-switch");
modeSwitch.addEventListener("change", () => {
document.body.classList.toggle("dark-mode");
});

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        // Remove the event listener when the sidebar is closed
        document.removeEventListener('click', closeSidebarOnClickOutside);
    } else {
        sidebar.classList.add('open');
        // Add the event listener to close the sidebar when clicking outside
        document.addEventListener('click', closeSidebarOnClickOutside);
    }
}

function closeSidebarOnClickOutside(event) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    
    // If the click is outside the sidebar and the hamburger menu
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove('open');
        document.removeEventListener('click', closeSidebarOnClickOutside); // Remove listener after closing
    }
}


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