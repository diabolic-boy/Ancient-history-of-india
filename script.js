document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function loadEraDetails(event) {
    const button = event.target;
    const era = button.getAttribute("data-era");
    const contentDiv = document.getElementById(`${era}-content`);

    if (button.classList.contains("expanded")) {
        // If already expanded, clicking again should collapse it
        contentDiv.innerHTML = "";
        contentDiv.classList.remove("expanded");
        button.classList.remove("expanded");
        button.textContent = "Learn More";
    } else {
        // Load content via XMLHttpRequest when not expanded
        const filename = `${era}.html`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", filename, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                contentDiv.innerHTML = xhr.responseText;
                contentDiv.classList.add("expanded");
                button.classList.add("expanded");
                button.textContent = "Close";
            } else {
                console.error("Error loading content:", xhr.status);
            }
        };
        xhr.send();
    }
}

document.querySelectorAll(".learn_more_btn").forEach(button => {
    button.addEventListener("click", loadEraDetails);
});

// Intersection Observer to highlight visible timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    observer.observe(item);
});

// Back to Top Button functionality
const backToTopButton = document.createElement('button');
backToTopButton.textContent = "↑ Top";
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/Hide Back to Top Button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});
