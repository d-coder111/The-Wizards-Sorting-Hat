document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Store house points
  const housePoints = {
    Gryffindor: 0,
    Ravenclaw: 0,
    Hufflepuff: 0,
    Slytherin: 0,
  };

  // Count the selected answers
  const form = new FormData(this);
  let attemptedQuestions = 0; // Track attempted questions

  for (let pair of form.entries()) {
    if (housePoints[pair[1]] !== undefined) {
      housePoints[pair[1]] += 1;
      attemptedQuestions++; // Increment for each attempted question
    }
  }

  // Check if any questions were attempted
  if (attemptedQuestions === 0) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "You're out of Hogwarts!";
    return; // Stop execution if no questions were attempted
  }

  // Determine the house with the highest points
  let assignedHouse = Object.keys(housePoints).reduce((a, b) =>
    housePoints[a] > housePoints[b] ? a : b
  );

  // House descriptions
  const houseDescriptions = {
    Gryffindor:
      "You have been sorted into Gryffindor, the house of the brave and daring! Known for their courage, Gryffindors are always ready to stand up for what is right, no matter the odds. With a bold heart and a fierce sense of justice, you are never afraid to take risks or face challenges head-on. Welcome to the house of heroes like Harry Potter, Hermione Granger, and Albus Dumbledore!",
    Ravenclaw:
      "Welcome to Ravenclaw, where wisdom and learning are prized above all! As a member of this house, you are valued for your intelligence, creativity, and curiosity. Ravenclaws are known for their sharp minds and thirst for knowledge, always seeking answers to life’s mysteries. You join the ranks of greats like Luna Lovegood and Cho Chang, where cleverness and ingenuity reign supreme!",
    Hufflepuff:
      "You’ve been sorted into Hufflepuff, the house of loyalty and kindness! Hufflepuffs are known for their strong sense of fairness, patience, and dedication. You are someone who values friendship, hard work, and the well-being of others. In Hufflepuff, every person matters, and unity is key. You stand alongside legends like Newt Scamander and Cedric Diggory, where inclusivity and perseverance define your strength!",
    Slytherin:
      "Welcome to Slytherin, where ambition and cunning pave the way to greatness! As a Slytherin, you are driven by your goals and never shy away from doing what it takes to succeed. Known for being resourceful and strategic, you can navigate challenges with ease and foresight. In Slytherin, you follow in the footsteps of powerhouses like Severus Snape and Merlin, with ambition as your guiding star!",
  };

  // House images
  const houseImages = {
    Gryffindor:
      "https://i.pinimg.com/564x/20/32/4c/20324c7839e5f076e7a3d5baa7b77f62.jpg",
    Ravenclaw:
      "https://i.pinimg.com/564x/92/b5/65/92b5654268d9f3157ed1ec58f6d63c3e.jpg",
    Hufflepuff:
      "https://i.pinimg.com/564x/66/ba/0c/66ba0cd629a306ecf9d207c90d2184be.jpg",
    Slytherin:
      "https://i.pinimg.com/564x/c1/4f/36/c14f36dea82449f6ee5af5c2a6007c66.jpg",
  };

  // Display result
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `🎉 You belong to <strong>${assignedHouse}</strong>!<br>${houseDescriptions[assignedHouse]}`;

  // Display the house image
  const houseImage = document.getElementById("houseImage");
  houseImage.src = houseImages[assignedHouse];
  houseImage.alt = `${assignedHouse} logo`;
  houseImage.style.display = "block";
});

const spells = [
  "Expecto Patronum",
  "Alarte Ascendare",
  "Avada Kedavra",
  "Accio",
  "Stupefy",
  "Wingardium Leviosa",
  "Alohomora",
];

function getSpellOfTheDay() {
  const currentDate = new Date();
  const dayOfYear = getDayOfYear(currentDate);

  const spellIndex = dayOfYear % spells.length;
  return spells[spellIndex];
}

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  
}

// Helper function to get the current day of the year (1 - 365)
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date -
    start +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

document.getElementById("generateSpellBtn").addEventListener("click", () => {
  const spellTextElement = document.getElementById("spellText");
  const randomSpell = getSpellOfTheDay();

  // Clear previous spell and reset animation
  spellTextElement.style.animation = "none";
  setTimeout(() => {
    spellTextElement.textContent = randomSpell;
    spellTextElement.style.animation = "";
  }, 10); // Small delay to trigger reflow and restart animation
});
