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
      "Welcome to Gryffindor, where courage is more than a word—it's a way of life. As a Gryffindor, you’ll embody the qualities of bravery, determination, and unwavering loyalty. Here, you'll find a family that celebrates boldness, where daring to dream big is always encouraged and fearlessly pursuing those dreams is part of our legacy. In the halls of Hogwarts, Gryffindor stands as a beacon of light, producing leaders, visionaries, and warriors who challenge the status quo and push boundaries. Whether you're outwitting dark forces, solving mysteries, or defending those who cannot defend themselves, the values of Gryffindor will guide you. Here, you'll walk the same path as legendary figures—Harry Potter, who showed us the power of love and friendship; Hermione Granger, whose intellect and courage were unmatched; and Albus Dumbledore, who proved that true leadership lies in making the right choices, even when they’re the hardest. With the iconic red and gold colors emblazoned on your chest and the lion roaring proudly on your house crest, know that you are part of a legacy of bravery. So step forward, embrace your destiny, and let your Gryffindor heart lead the way!"
    Ravenclaw:
      "Welcome to Ravenclaw, the house where the mind knows no bounds! Here, intelligence and curiosity are celebrated, and the pursuit of knowledge is never-ending. As a Ravenclaw, you are part of a community that values wit, originality, and the drive to understand the world in all its complexity. You are not only encouraged to ask questions, but to seek answers in ways others might not even imagine. In the grand tower of Ravenclaw, you’ll find companions who challenge conventional thinking and explore new ideas with an open mind. From solving riddles to mastering spells, your sharp intellect will be your greatest asset. Creativity flows freely here, where the most brilliant and unconventional minds thrive. You now walk alongside the likes of Luna Lovegood, whose unconventional wisdom and open-hearted nature remind us that true brilliance can take many forms, and Cho Chang, who exemplifies grace under pressure and the strength of mind. Whether you're delving into ancient texts, crafting innovative spells, or pondering the great mysteries of magic, Ravenclaw's values will guide your journey. With the bronze eagle soaring high on your crest and the blue and silver colors representing the clarity of the sky and intellect, Ravenclaw welcomes you. Embrace your endless curiosity and let your thirst for knowledge lead you to greatness!"    
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
  "Lumos",
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

// Function to handle the option selection
function handleOptionSelection() {
  const options = document.querySelectorAll('input[name="options"]');

  options.forEach(option => {
    option.addEventListener('change', function() {
      // Store the selected value
      const selectedValue = option.value;
      localStorage.setItem('selectedAnswer', selectedValue); // Store the selected value
      console.log("Selected answer stored: " + selectedValue);
      
      // Change the background color of the selected option
      options.forEach(opt => {
        const label = opt.parentElement; // Reference to the label
        if (opt.checked) {
          label.classList.add('selected'); // Add class to selected label
        } else {
          label.classList.remove('selected'); // Remove class from unselected labels
        }
      });
    });
  });
}

// Function to load the stored answer (if it exists) when the page loads
function loadStoredAnswer() {
  const storedAnswer = localStorage.getItem('selectedAnswer');

  if (storedAnswer) {
    const optionToSelect = document.querySelector(`input[name="options"][value="${storedAnswer}"]`);
    
    if (optionToSelect) {
      optionToSelect.checked = true; // Check the stored option
      const label = optionToSelect.parentElement; // Reference to the label
      label.classList.add('selected'); // Set the class to green
    }
  }
}

// Call the function to set up event listeners
handleOptionSelection();

// Load the previously stored answer when the page loads
window.onload = function() {
  loadStoredAnswer();
};


