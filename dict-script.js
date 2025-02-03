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