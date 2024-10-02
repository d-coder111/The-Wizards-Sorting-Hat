document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Store house points
  const housePoints = {
    Gryffindor: 0,
    Ravenclaw: 0,
    Hufflepuff: 0,
    Slytherin: 0
  };

  // Count the selected answers
  const form = new FormData(this);
  for (let pair of form.entries()) {
    if (housePoints[pair[1]] !== undefined) {
      housePoints[pair[1]] += 1;
    }
  }

  // Determine the house with the highest points
  let assignedHouse = Object.keys(housePoints).reduce((a, b) => housePoints[a] > housePoints[b] ? a : b);

  // House descriptions
  const houseDescriptions = {
    Gryffindor: "Gryffindor values bravery, courage, and chivalry.",
    Ravenclaw: "Ravenclaw values intelligence, creativity, and learning.",
    Hufflepuff: "Hufflepuff values hard work, patience, and loyalty.",
    Slytherin: "Slytherin values ambition, cunning, and resourcefulness."
  };

  // House images
  const houseImages = {
    Gryffindor: "https://i.pinimg.com/564x/20/32/4c/20324c7839e5f076e7a3d5baa7b77f62.jpg",
    Ravenclaw: "https://i.pinimg.com/564x/92/b5/65/92b5654268d9f3157ed1ec58f6d63c3e.jpg",
    Hufflepuff: "https://i.pinimg.com/564x/66/ba/0c/66ba0cd629a306ecf9d207c90d2184be.jpg",
    Slytherin: "https://i.pinimg.com/564x/c1/4f/36/c14f36dea82449f6ee5af5c2a6007c66.jpg"
  };

  // Display result
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `🎉 You belong to <strong>${assignedHouse}</strong>!<br>${houseDescriptions[assignedHouse]}`;
  
  // Display the house image
  const houseImage = document.getElementById('houseImage');
  houseImage.src = houseImages[assignedHouse];
  houseImage.alt = `${assignedHouse} logo`;
  houseImage.style.display = 'block';
});
