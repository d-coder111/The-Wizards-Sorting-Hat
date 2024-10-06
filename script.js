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


// Theme styles object using CSS-like naming conventions
const themeStyles = {
  default: {
    // The default theme will be handled separately
  },
  gryffindor: {
    'background': 'linear-gradient(135deg, #740001 0%, #ae0001 100%)',
    'color': '#ffc500',
    'question-background': 'rgba(174, 0, 1, 0.7)',
    'button-background': '#ffc500',
    'button-color': '#740001',
    'question-border': '2px solid #ffc500',
    'text-shadow': '1px 1px 2px #000'
  },
  ravenclaw: {
    'background': 'linear-gradient(135deg, #0e1a40 0%, #222f5b 100%)',
    'color': '#946b2d',
    'question-background': 'rgba(34, 47, 91, 0.7)',
    'button-background': '#946b2d',
    'button-color': '#0e1a40',
    'question-border': '2px solid #946b2d',
    'text-shadow': '1px 1px 2px #000'
  },
  hufflepuff: {
    'background': 'linear-gradient(135deg, #ecb939 0%, #f0c75e 100%)',
    'color': '#372e29',
    'question-background': 'rgba(240, 199, 94, 0.7)',
    'button-background': '#372e29',
    'button-color': '#ecb939',
    'question-border': '2px solid #60605c',
    'text-shadow': '1px 1px 2px #fff'
  },
  slytherin: {
    'background': 'linear-gradient(135deg, #1a472a 0%, #2a623d 100%)',
    'color': '#aaaaaa',
    'question-background': 'rgba(42, 98, 61, 0.7)',
    'button-background': '#aaaaaa',
    'button-color': '#1a472a',
    'question-border': '2px solid #aaaaaa',
    'text-shadow': '1px 1px 2px #000'
  }
};

// Function to apply theme
function applyTheme(themeName) {
  const container = document.getElementById('quiz-container');
  const questions = container.querySelectorAll('.question');
  const buttons = container.querySelectorAll('button');
  const labels = container.querySelectorAll('label');

  if (themeName === 'default') {
    // Reset to original CSS styles
    document.body.style.cssText = `
      font-family: "Arial", sans-serif;
      background: radial-gradient(circle at center, #1b1f3b, #0a0c22, #000000);
      margin: 0;
      padding: 20px;
    `;
    
    container.style.cssText = `
      max-width: 1918px;
      margin: -198px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      background: none;
      z-index: 0;
      transition: all 0.3s ease;
    `;

    questions.forEach(question => {
      question.style.cssText = `
        font-family: 'libre-baskerville-bold', serif;
        font-weight: 600;
        color: white;
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        transition: background-color 0.3s;
      `;
    });

    buttons.forEach(button => {
      button.style.cssText = `
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #6200ea;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.2em;
        margin: 10px 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      `;
    });

    labels.forEach(label => {
      label.style.cssText = `
        font-family: 'Gabriela', serif;
        font-size: 22px;
        color: yellow;
        text-shadow: 0 0 3px black;
        display: block;
        background-color: #ff000017;
        padding: 15px;
        margin: 10px 0;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease, transform 0.3s ease;
      `;
    });
  } else {
    const theme = themeStyles[themeName];
    document.body.style.background = theme['background'];
    container.style.color = theme['color'];
    container.style.textShadow = theme['text-shadow'];

    questions.forEach(question => {
      question.style.backgroundColor = theme['question-background'];
      question.style.border = theme['question-border'];
    });

    buttons.forEach(button => {
      button.style.backgroundColor = theme['button-background'];
      button.style.color = theme['button-color'];
    });

    labels.forEach(label => {
      label.style.backgroundColor = theme['question-background'];
      label.style.color = theme['color'];
      label.style.border = theme['question-border'];
    });
  }

  // Add some Harry Potter-inspired decorative elements
  addDecorativeElements(themeName);

  // Save the current theme to localStorage
  localStorage.setItem('selectedTheme', themeName);
}

// Function to add decorative elements based on the theme
function addDecorativeElements(themeName) {
  let decorElement = document.getElementById('theme-decor');
  if (!decorElement) {
    decorElement = document.createElement('div');
    decorElement.id = 'theme-decor';
    document.body.appendChild(decorElement);
  }

  switch(themeName) {
    case 'gryffindor':
      decorElement.innerHTML = '🦁';
      break;
    case 'ravenclaw':
      decorElement.innerHTML = '🦅';
      break;
    case 'hufflepuff':
      decorElement.innerHTML = '🦡';
      break;
    case 'slytherin':
      decorElement.innerHTML = '🐍';
      break;
    default:
      decorElement.innerHTML = '⚡';
  }

  decorElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 40px;
    z-index: 1000;
  `;
}

// Event listener for theme buttons
document.querySelectorAll('.theme-button').forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-theme');
    applyTheme(theme);
  });
});

// Function to apply the saved theme or default on page load
function applySavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && themeStyles.hasOwnProperty(savedTheme)) {
    applyTheme(savedTheme);
  } else {
    applyTheme('default');
  }
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);

// Call the function to set up event listeners
handleOptionSelection();

// Load the previously stored answer when the page loads
window.onload = function() {
  loadStoredAnswer();
};


