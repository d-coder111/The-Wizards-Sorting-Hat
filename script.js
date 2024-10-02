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
      housePoints[pair[1]] += 1;
    }
  
    // Determine the house with the highest points
    let assignedHouse = Object.keys(housePoints).reduce((a, b) => housePoints[a] > housePoints[b] ? a : b);
  
    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `🎉 You belong to <strong>${assignedHouse}</strong>!`;
    resultDiv.style.display = 'block';
  });
