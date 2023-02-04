const paragraphs = [];

// get random paragraphs from metaphorpsum.com
const get_parapharaphs = function(amount)
{
    // // reset the paragraphs array
    // paragraphs.length = 0;
    // let url = `http://metaphorpsum.com/paragraphs/${amount}/9`;
    // let request = new XMLHttpRequest();
    // request.open('GET', url, false);
    // request.send(null);
    // if (request.status === 200) {
    //     request.responseText;
    //     // split the response into paragraphs on the enters

    //     let requestedParagraphs = request.responseText.split("\n");
    //     requestedParagraphs.forEach(function(paragraph) {
    //         if(paragraph == "") requestedParagraphs.splice(requestedParagraphs.indexOf(paragraph), 1);
    //     });
    //     paragraphs.push(...requestedParagraphs);
    //     loadParagraphs();
    // }


    // paragraphs.length = 0;
    // let url = `https://contentai-net-text-generation.p.rapidapi.com/text-generation/api/?category=health-and-medicine`;
    // let request = new XMLHttpRequest();
    // request.withCredentials = true;
    // request.open('GET', url);
    // request.setRequestHeader("X-RapidAPI-Key", "572d008a92msh3880290847c7511p106d6ajsn00d2693d12a8");
    // request.setRequestHeader("X-RapidAPI-Host", "contentai-net-text-generation.p.rapidapi.com");
    // request.send(null);
    // if (request.status === 200) {
    //     request.responseText;
    //     console.log(request.responseText)
    //     // split the response into paragraphs on the enters

    //     let requestedParagraphs = request.responseText.split("\n");
    //     requestedParagraphs.forEach(function(paragraph) {
    //         if(paragraph == "") requestedParagraphs.splice(requestedParagraphs.indexOf(paragraph), 1);
    //     });
    //     paragraphs.push(...requestedParagraphs);
    //     loadParagraphs();
    // }


    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });
    
    xhr.open("GET", "https://montanaflynn-lorem-text-generator.p.rapidapi.com/paragraph?count=1&length=3");
    xhr.setRequestHeader("X-RapidAPI-Key", "572d008a92msh3880290847c7511p106d6ajsn00d2693d12a8");
    xhr.setRequestHeader("X-RapidAPI-Host", "montanaflynn-lorem-text-generator.p.rapidapi.com");
    
    xhr.send(data);

}


const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraphs() {
    console.log("load paragraphs")
    typingText.innerHTML = "";
    paragraphs.forEach(function(paragraph) {
        paragraph.split("").forEach(char => {
            let span = `<span>${char}</span>`
            typingText.innerHTML += span;
        });
    });



    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    console.log("init typing")
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];


    // scroll to active character
    document.querySelector('.active').scrollIntoView(false);



    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    get_parapharaphs(4);
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

get_parapharaphs(2);
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

// create auto scroll when typing
// inpField.addEventListener("input", () => {
//     let characters = typingText.querySelectorAll("span");
//     let typedChar = inpField.value.split("")[charIndex];
//     if (characters[charIndex].innerText == typedChar) {
//         characters[charIndex].scrollIntoView({block: "center", behavior: "smooth"});
//     }
// });
