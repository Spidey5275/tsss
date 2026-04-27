const revealItems = document.querySelectorAll(".reveal");
const comfortButton = document.querySelector("#comfort-button");
const buttonMessage = document.querySelector("#button-message");

const comfortMessages = [
  "I am right here, cheering for your smile to come back softly. \u{1F337}",
  "Low days do not change how wonderful you are, not even a little. \u{1F497}",
  "You deserve rest, sweetness, and all the care your heart is asking for. \u2601\uFE0F",
  "Even today, you are still my favorite kind of beautiful soul. \u2728",
  "One slow breath at a time, love. I am with you through this. \u{1FAF6}",
];

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (comfortButton && buttonMessage) {
  let messageIndex = 0;

  comfortButton.addEventListener("click", () => {
    messageIndex = (messageIndex + 1) % comfortMessages.length;
    buttonMessage.textContent = comfortMessages[messageIndex];
  });
}
