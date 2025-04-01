
 document.addEventListener("DOMContentLoaded", function () {
        // Animate Skill Bars
        document.querySelectorAll(".skill-bar").forEach(skill => {
            let percentage = skill.getAttribute("data-skill") + "%";
            skill.style.width = percentage;
        });
    });
    

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // Hover Animation for Project Boxes
    document.querySelectorAll(".project-box").forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.style.transform = "scale(1.05)";
            box.style.transition = "transform 0.3s ease-in-out";
        });
        box.addEventListener("mouseleave", () => {
            box.style.transform = "scale(1)";
        });
    });
const textArray = ["a Web Developer!", "a Coder!", "a Designer!",];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Speed of typing (milliseconds)
const erasingSpeed = 50; // Speed of erasing
const delayBetweenTexts = 1500; // Delay before erasing starts

const typingTextElement = document.querySelector(".typing-text");

function typeText() {
    if (charIndex < textArray[textIndex].length) {
        typingTextElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(eraseText, delayBetweenTexts);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingTextElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, erasingSpeed);
    } else {
        textIndex = (textIndex + 1) % textArray.length; // Move to the next phrase
        setTimeout(typeText, typingSpeed);
    }
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeText, 500);
});
