let currentScore = 0;
let starValue;

function highlightStar(starNumber) {
  const stars = document.querySelectorAll('.star');
  
  stars.forEach((star, index) => {
    if (index < starNumber) {
      star.src = "assets/star.svg";
    }
  });
  starValue = starNumber;
}

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

function rateStar(score) {
  currentScore = score;
  resetStars();
}
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
    commentButton.disabled = true;
  }
  
  const commentButton = document.querySelector(".btn");
  commentButton.addEventListener("click", createReview);


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


function addClickEvent() {
  const stars = document.querySelectorAll('.star');
  
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      rateStar(index + 1);
    });
  });
}


addMouseOverEvent();
addClickEvent();
