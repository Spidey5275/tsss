const revealItems = document.querySelectorAll(".reveal");
const quizCards = document.querySelectorAll(".quiz-card");
const scoreButton = document.querySelector("#score-button");
const scoreOutput = document.querySelector("#score-output");

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
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

quizCards.forEach((card) => {
  const options = card.querySelectorAll(".quiz-option");

  options.forEach((option, index) => {
    option.addEventListener("click", () => {
      options.forEach((item) => item.classList.remove("is-selected"));
      option.classList.add("is-selected");
      card.dataset.selected = String(index);
    });
  });
});

if (scoreButton && scoreOutput) {
  scoreButton.addEventListener("click", () => {
    let score = 0;
    let answered = 0;

    quizCards.forEach((card) => {
      const correctIndex = Number(card.dataset.correct);
      const selectedIndex = Number(card.dataset.selected);
      const options = card.querySelectorAll(".quiz-option");
      const feedback = card.querySelector(".quiz-feedback");

      options.forEach((option, index) => {
        option.classList.remove("is-correct", "is-wrong");

        if (index === correctIndex) {
          option.classList.add("is-correct");
        }

        if (!Number.isNaN(selectedIndex) && index === selectedIndex && selectedIndex !== correctIndex) {
          option.classList.add("is-wrong");
        }
      });

      if (!Number.isNaN(selectedIndex)) {
        answered += 1;
      }

      if (!Number.isNaN(selectedIndex) && selectedIndex === correctIndex) {
        score += 1;
      }

      if (feedback) {
        if (Number.isNaN(selectedIndex)) {
          feedback.textContent = "Choose one option first.";
        } else if (selectedIndex === correctIndex) {
          feedback.textContent = "Correct.";
        } else {
          feedback.textContent = "Incorrect. The correct answer is highlighted.";
        }
      }
    });

    if (answered < quizCards.length) {
      scoreOutput.textContent = `You answered ${answered}/${quizCards.length}. Finish all questions and then check again.`;
      return;
    }

    if (score >= 10) {
      scoreOutput.textContent = `Score: ${score}/${quizCards.length}. Excellent. This unit looks strong now.`;
    } else if (score >= 7) {
      scoreOutput.textContent = `Score: ${score}/${quizCards.length}. Good. Revise ethics, bioethics, and the case study once more.`;
    } else {
      scoreOutput.textContent = `Score: ${score}/${quizCards.length}. Read the weightage map and rapid recall sheet again, then retry.`;
    }
  });
}
