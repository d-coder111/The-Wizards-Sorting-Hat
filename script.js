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

// House descriptions with multiple options
const houseDescriptions = {
  Gryffindor: [
    "You have been sorted into Gryffindor, the house of bravery and daring! Known for their courage, Gryffindors stand ready to fight for what is right, regardless of the odds. With bold hearts and a fierce sense of justice, you face challenges head-on.",
    "Welcome to Gryffindor! You embody the spirit of bravery and valor, where each challenge is met with courage. Heroes like Harry Potter and Hermione Granger inspire you to fight for justice.",
    "Congratulations! You've joined Gryffindor, where daring and bravery are celebrated. Here, you will find friendship among courageous souls ready to take on any adventure."
  ],
  
  Ravenclaw: [
    "Welcome to Ravenclaw, where wisdom and learning are cherished above all! As a member of this house, you are valued for your intelligence, creativity, and curiosity.",
    "You are now part of Ravenclaw! Known for your sharp mind and love for knowledge, you will thrive in an environment that encourages inquiry and innovation.",
    "Congratulations on being sorted into Ravenclaw! Here, your intelligence and creativity shine, and you will be surrounded by fellow thinkers and innovators."
  ],
  
  Hufflepuff: [
    "You’ve been sorted into Hufflepuff, the house of loyalty and kindness! Hufflepuffs are known for their strong sense of fairness, patience, and dedication.",
    "Welcome to Hufflepuff, where hard work and loyalty are valued above all! You will find true friendship and support among your fellow Hufflepuffs.",
    "Congratulations! You've joined Hufflepuff, where kindness and inclusivity create a warm and welcoming environment for all."
  ],
  
  Slytherin: [
    "Welcome to Slytherin, where ambition and cunning pave the way to greatness! As a Slytherin, you are driven by your goals and never shy away from doing what it takes to succeed.",
    "You've been sorted into Slytherin! Here, your resourcefulness and ambition will help you navigate challenges with ease and strategy.",
    "Congratulations on being sorted into Slytherin! This house is known for its determination and cleverness, traits that will guide you to success."
  ],
};


// Function to get a random description for the assigned house
function getRandomDescription(house) {
  const descriptions = houseDescriptions[house];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}

// Display result
const resultDiv = document.getElementById("result");
const attemptedQuestionsMessage = `You attempted ${attemptedQuestions} questions.`;
const randomHouseDescription = getRandomDescription(assignedHouse);
resultDiv.innerHTML = `${attemptedQuestionsMessage}<br>🎉 You belong to <strong>${assignedHouse}</strong>!<br>${randomHouseDescription}`;




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
