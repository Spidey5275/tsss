const revealItems = document.querySelectorAll(".reveal");
const comfortButton = document.querySelector("#comfort-button");
const buttonMessage = document.querySelector("#button-message");
const petalRain = document.querySelector("#petal-rain");

const comfortMessages = [
  "I am right here, cheering for your smile to come back softly. \u{1F337}",
  "Low days do not change how wonderful you are, not even a little. \u{1F497}",
  "You deserve rest, sweetness, and all the care your heart is asking for. \u2601\uFE0F",
  "Even today, you are still my favorite kind of beautiful soul. \u2728",
  "One slow breath at a time, love. I am with you through this. \u{1FAF6}",
];

if (petalRain) {
  const petalCount = window.innerWidth < 640 ? 12 : 18;
  const petalFragment = document.createDocumentFragment();

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    const size = 16 + Math.random() * 14;
    const height = size * (1.35 + Math.random() * 0.25);
    const left = `${Math.random() * 100}%`;
    const drift = `${-90 + Math.random() * 180}px`;
    const spin = `${160 + Math.random() * 260}deg`;
    const duration = `${12 + Math.random() * 11}s`;
    const delay = `${Math.random() * -18}s`;
    const opacity = 0.32 + Math.random() * 0.38;

    petal.className = "falling-petal";
    petal.style.setProperty("--left", left);
    petal.style.setProperty("--width", `${size}px`);
    petal.style.setProperty("--height", `${height}px`);
    petal.style.setProperty("--drift", drift);
    petal.style.setProperty("--spin", spin);
    petal.style.setProperty("--duration", duration);
    petal.style.setProperty("--delay", delay);
    petal.style.setProperty("--opacity", opacity.toFixed(2));
    petalFragment.appendChild(petal);
  }

  petalRain.appendChild(petalFragment);
}

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
