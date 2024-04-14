let currentScore = 0;

// Variable to store the value of the star being interacted with
let starValue;

// Function to highlight stars up to a certain starNumber
function highlightStar(starNumber) {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star, index) => {
    if (index < starNumber) {
      star.src = "assets/star.svg";
    }
  });
  starValue = starNumber;
}

// Function to reset stars to default state
function resetStars() {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star, index) => {
    if (index >= currentScore) {
      star.src = "assets/star2.svg";
    } else {
      star.src = "assets/star.svg";
    }
  });
}

// Function to update the current score and reset stars accordingly
function rateStar(score) {
  currentScore = score;
  resetStars();
}

// Function to create a review based on user input
function createReview() {
  const comment = document.querySelector(".rate").value;
  const userReview = document.getElementById("userReview");

  const reviewText = document.createElement("p");
  const starContainer = document.createElement("div");
  const reviewContainer = document.createElement("div");
  const userProfileImage = document.createElement("img");

  userProfileImage.classList.add("userProfileImage");
  userProfileImage.src = "assets/user.svg";

  starContainer.classList.add("reviewStars");

  userReview.appendChild(userProfileImage);
  userReview.appendChild(reviewContainer);
  reviewContainer.appendChild(starContainer);
  reviewContainer.appendChild(reviewText);

  for (let i = 0; i < starValue; i++) {
    const star = document.createElement("img");
    star.src = "assets/star.svg";
    starContainer.appendChild(star);
    star.style.transform = "scale(0.5)";
  }

  reviewText.innerText = comment;
  commentButton.disabled = true;  // Disable the comment button after review is created
}

const commentButton = document.querySelector(".btn");
commentButton.addEventListener("click", createReview);

// Function to add mouseover events to stars for highlighting
function addMouseOverEvent() {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      highlightStar(index + 1);
    });

    star.addEventListener('mouseout', () => {
      resetStars();
    });
  });
}

// Function to add click events to stars for rating
function addClickEvent() {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      rateStar(index + 1);
    });
  });
}

// Initialize mouseover and click events for stars
addMouseOverEvent();
addClickEvent();
