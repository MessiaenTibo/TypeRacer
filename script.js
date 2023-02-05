const paragraphs = [
    "Gewoonlijk ingesneden lot als middelpunt goudmijnen verdedigen wij. Na kwam gaat arme ipoh om bouw al kost op. Jungles geplant ze anderen of de ik streken. Verdedigen rijkdommen verdwijnen uit als. Alluviale vierkante overvloed ze en mengeling. Dal meesters voorziet heb gebouwen scheppen stampers dag lamamijn. Staan vrouw al telok om enkel wonde. Ook bedragen prestige losmaken moeilijk tin. Arbeiden dat mag leerling gebruikt machines.",

"Al aandacht middelen elastica er staatjes wisselen ze. Heele wij zeker roode ieder heb zes heeft far. Ze nu op eerder bouwde brengt. Bron geld tien de koel de daar duur. Nam singapore dus hellingen voorschot wij gebrachte belasting. Dit verscholen zit goudmijnen per werktuigen ook. Cultures men baksteen dik hectaren bepaalde verloren. Gezegend aan opbrengt zou rivieren mongolen rug ongeveer. Ontwikkeld hij kan weelderige een had verwijderd.",

"Duur far zit als dure zes zoon. Zilver hadden op wolken succes af werden ze oosten. Ton tegen onzer dit zijde alles goa matig nadat. Hand mee puin was noch door. Loopt op wordt langs in bevel wilde al. Far vruchtbaar aan interesten gewasschen uitgegeven per met. Moeten andere den missen het succes dag ten. Onzuivere en bloeiende inlandsen ad kapitalen. Drie naar op haar deed toen en. Rijkdommen al ze ongebruikt kilometers buitendien ontwouding tinwinning.",

"Vruchtbaar ingewanden om kooplieden na ontwouding. Nemen nu bezet en assam. Zeker steun ze rijst en en zijde perak op. Zilver leener in de slecht ziekte. Aanleiding inlandsche wantrouwen of af ik feestdagen uitgevoerd te. Na en om ongunstig nu honderden chineesch arabieren voorschot. Van rug gebracht hectaren eromheen grootste ten vestigen schatten. Talrijk planter zoo gewicht nam stroeve zwijnen brengen.",

"Diep toch er vijf zelf valt nu dien. Ruwe deze hand gaat dit sap hout ten. Op op vijftien tusschen vroegere. Regeering aanraking are dat loodrecht eigenaars. Ver invloed slechts met bereikt bij ormoezd noodige. Verbouwd interest zoo mijnerts het parasiet. Te al mogendheid ontwouding mijnwerker voorschijn verdedigen verscholen. Drukke zouden mee velden wij liggen goa midden die. Vestigen wel geringer verwoest der toekomst strooien generaal.",

"Komst deele de telde te er zeker. Meenemen dan gestegen cultures men getracht schijnen omwonden rug met. Meenemen vestigen en de al eromheen nu uiterste gesloten. Jungles zin wij streken meester enclave. Goa mag zal bezorgden heb financien vochtigen. Of bezorgden voorschot schatkist ik chineesch arabische zuidgrens nu. Wassching oog krachtige siameezen men uitrollen volledige vierkante. Ontginning als bevaarbaar mag weggevoerd onvermoeid vruchtbaar economisch. Scheen al na meende meters gerust.",

"Mogelijk cultures pyrieten interest ik rivieren nu de geschikt. Ook dien tot toe heft komt sago stad zijn kan. Aangaan enclave elk ziedaar als zwijnen mee metalen. Elkander wie heerlijk nog oog getracht staatjes kan verbrand. Inboorling vergrooten tinprijzen mislukking zoo wel zij. Een sap cultures schijnen boringen wat mijnbouw bij plaatsen. Trekken en terwijl op om behalen ze gebeurt. Bevolking besparing toe binnenste herhaling nutteloos oog.",

"Upasboom pyrieten centimes van rug passeert dat gevonden eveneens. Vaak om mont meer af al ze thee daar gaat. Dag meeste het elders kwarts weldra passen vlucht. Het beide uit weren rug gayah met kinta. Uitstekend werktuigen de gunstigste en dergelijke nu. Nu product sarongs ze terwijl. Deze dan uit puin door zoon west elk. Zekere gas had goa bij liefst sumper werden moeten houden. Behoeften bovenkant vroegeren was dal vernielen ton.",

"Krachten die wel ten werkzaam afkoopen geworden. Zulk op ze ader in lama iets op stad ging. Maleische wat leeningen schatkist nog wat resultaat. Hoogere er geleend nu taiping te gedaald. Pogingen die dit golconda bedreven had. Verkochten of nu beschaving de ingesneden.",

"Doodende beroemde engelsch nu in bespaart. Steel al bevel staan in ze. Af nu verren lossen liever en dreigt tunnel te. Verwoest goa are ongeveer interest ver was mineraal. Lamamijn selangor zandlaag negritos die kan voordeel. Veertien passeert na eromheen voorziet op bordeaux de de onnoodig. Bijgeloof siameezen duimbreed al na op honderden bepaalden scheidden.",
];

// get random paragraphs from metaphorpsum.com
const get_parapharaphs = function(amount)
{
    // reset the paragraphs array
    paragraphs.length = 0;
    let url = `http://metaphorpsum.com/paragraphs/${amount}/9`;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) {
        request.responseText;
        // split the response into paragraphs on the enters

        let requestedParagraphs = request.responseText.split("\n");
        requestedParagraphs.forEach(function(paragraph) {
            if(paragraph == "") requestedParagraphs.splice(requestedParagraphs.indexOf(paragraph), 1);
        });
        paragraphs.push(...requestedParagraphs);
    }
    loadParagraphs();
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
    shuffle(paragraphs);
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


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
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
