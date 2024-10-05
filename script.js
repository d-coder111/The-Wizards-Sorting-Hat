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

// THEME Options

// Object containing styles for different themes (Hogwarts houses)
const themeStyles = {
  default: {
      backgroundColor: 'white', // Default background color
      color: 'black',           // Default text color
  },
  gryffindor: {
      backgroundColor: '#740001', // Gryffindor's dark red color
      color: '#D3A625',           // Gryffindor's gold color
  },
  ravenclaw: {
      backgroundColor: '#0E1A40', // Ravenclaw's navy blue color
      color: '#946B2D',           // Ravenclaw's bronze color
  },
  hufflepuff: {
      backgroundColor: '#ECB939', // Hufflepuff's yellow color
      color: '#000000',           // Hufflepuff's black color
  },
  slytherin: {
      backgroundColor: '#1A472A', // Slytherin's dark green color
      color: '#AAAAAA',           // Slytherin's silver/gray color
  },
};

// Grabbing HTML elements by their ID
const container = document.getElementById('quiz-container');
const themeButtons = document.querySelectorAll('.theme-button'); // All theme buttons
const form = document.getElementById('quizForm');
const resultDiv = document.getElementById('result'); // Div to display result text
const houseImage = document.getElementById('houseImage'); // Image element to display the house crest

// Event listener for each theme button to apply the corresponding theme
themeButtons.forEach(button => {
  button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme'); // Get the theme name from data attribute
      applyTheme(theme); // Apply the selected theme
  });
});

// Function to apply the theme by changing background and text colors
function applyTheme(theme) {
  const styles = themeStyles[theme]; // Get styles based on the theme name
  container.style.backgroundColor = styles.backgroundColor; // Set background color
  container.style.color = styles.color; // Set text color
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from refreshing the page
  const formData = new FormData(form); // Get form data
  const answers = {};
  for (let [name, value] of formData) {
      answers[name] = value; // Store form answers
  }
  const result = determineHouse(answers); // Determine the house based on answers
  resultDiv.textContent = `You belong to ${result}!`; // Display the result
  displayHouseImage(result); // Display the house crest
});

// Function to determine which house the user belongs to based on their answers
function determineHouse(answers) {
  const houseCounts = {
      Gryffindor: 0,
      Ravenclaw: 0,
      Hufflepuff: 0,
      Slytherin: 0
  };

  // Count how many answers match each house
  for (let answer of Object.values(answers)) {
      houseCounts[answer]++;
  }

  // Return the house with the highest count
  return Object.keys(houseCounts).reduce((a, b) => houseCounts[a] > houseCounts[b] ? a : b);
}

// Function to display the appropriate house crest based on the result
function displayHouseImage(house) {
  const imagePaths = {
      Gryffindor: 'path/to/gryffindor.jpg',
      Ravenclaw: 'path/to/ravenclaw.jpg',
      Hufflepuff: 'path/to/hufflepuff.jpg',
      Slytherin: 'path/to/slytherin.jpg'
  };

  houseImage.src = imagePaths[house]; // Set the image source to the selected house's crest
  houseImage.alt = `${house} crest`; // Set alt text for the image
  houseImage.style.display = 'block'; // Make the image visible
}
