// allow the user to click on the button to show or hide the course list
document.addEventListener('DOMContentLoaded', function () {
    var coursesList1 = document.getElementById('coursesList1');
    var coursesButton1 = document.querySelector('a[href="#coursesList1"]');

    var coursesList2 = document.getElementById('coursesList2');
    var coursesButton2 = document.querySelector('a[href="#coursesList2"]');

    coursesButton1.addEventListener('click', function () {
        if (coursesList1.classList.contains('show')) {
            this.textContent = 'View Courses';
        } else {
            this.textContent = 'Hide Courses';
        }
    });

    coursesButton2.addEventListener('click', function () {
        if (coursesList2.classList.contains('show')) {
            this.textContent = 'View Courses';
        } else {
            this.textContent = 'Hide Courses';
        }
    });
});

// change the behavior of clicking on the navbar links
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the href attribute is an internal link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const section = document.querySelector(this.getAttribute('href'));
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - navbarHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links, allow default behavior
        });
    });
});

// background animation
particlesJS('particles-js', {
    particles: {
        number: {
            value: 40,
            density: {
                enable: true,
                value_area: 600
            }
        },
        color: {
            value: "#000"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5
        },
        size: {
            value: 4
        },
        line_linked: {
            enable: true,
            distance: 200,
            color: "#000",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
});
