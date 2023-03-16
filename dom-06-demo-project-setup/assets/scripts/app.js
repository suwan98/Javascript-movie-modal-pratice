const addMovideModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const background = document.querySelector("#backdrop");
const cancelAddMovieButton = addMovideModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovideModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const moive of movies) {
    if (moive.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  deleteMovie(movieId);
};

const addNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class = "movie-element_image">
      <img src="${imageUrl}" alt = "${title}"
    </div>
    <div class = "movie-element_info">
      <h2>${title}</h2>
      <p>${rating} / 5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.appendChild(newMovieElement);
};

const toggleBackdrop = () => {
  background.classList.toggle("visible");
};
const showMovieModal = () => {
  addMovideModal.classList.toggle("visible");
  toggleBackdrop();
};
const closedMovieModal = () => {
  addMovideModal.classList.remove("visible");
  toggleBackdrop();
};

const claerMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const cancelAddMovieHandelr = () => {
  closedMovieModal();
  claerMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("1과 5사이의 유효한 숫자를 입력해주세요");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closedMovieModal();
  claerMovieInput();
  addNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closedMovieModal();
  cancelMovieDeletion();
};

startAddMovieButton.addEventListener("click", showMovieModal);
background.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandelr);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
