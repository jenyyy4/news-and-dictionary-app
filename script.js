//API Used: http://newsapi.org/s/india-news-api
let apiKey = "926a09b845414911a0e922631f2b5d1d";
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "us";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

// generating cards
const generateUI = (articles) => {
    console.log(articles);
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
    <img src="${item.urlToImage || "./default.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};

//API call
const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
  console.log(data);

};

//category
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

//options
const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

//
const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};








// dictionary

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const bookIcon = document.querySelector(".book-icon");
let clickFlag = false;

bookIcon.addEventListener("click", () => {
    clickFlag = !clickFlag;
    const container = document.querySelector(".cont");
    if(clickFlag) {
        bookIcon.classList.remove("fa-book");
        bookIcon.classList.add("fa-xmark");
        container.style.display = "block";
    } else {
        bookIcon.classList.remove("fa-xmark");
        bookIcon.classList.add("fa-book");
        container.style.display = "none";
    }
});

btn.addEventListener("click", () => {
    let inputWord = document.getElementById("input-word").value;
    fetch(`${url}${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inputWord}</h3>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>`;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find Your Word</h3>`;
        });
});