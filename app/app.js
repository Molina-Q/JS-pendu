function penduEvolution(countHP) {
    switch (countHP) {
        case 6:
            penduTete.classList.remove("penduOff");
            break;

        case 5:
            penduCorps.classList.remove("penduOff");
            
            break;

        case 4:
            penduBrasD.classList.remove("penduOff");
            
            break;

        case 3:
            penduBrasG.classList.remove("penduOff");
            
            break;

        case 2:
            penduJambeD.classList.remove("penduOff");
            
            break;

        case 1:
            penduJambeG.classList.remove("penduOff");
            
            break;
        case 0:
            penduTete.classList.add("penduMort");
            
            break;

        default:
            break;
    }
}

function gameOver() {
    restartGame.classList.remove("btnTurnOff");
    restartGame.addEventListener("click", () => restartTheGame());
} 


function restartTheGame(){

    penduComplet.forEach((pendu) => {
        if(pendu.membre.classList.contains("penduOff")) {

        } else {
            pendu.membre.classList.add("penduOff");
        }  
    })
    deleteElementsByClass("blocLettre");
    deleteElementsByClass("blocWord");
    hiddenWord = "";
    currentWord = "";
    countHP = baseHP;
    restartGame.classList.add("btnTurnOff");
    btnIndice.classList.add("btnTurnOff");
    switchBtn("on");
}

function deleteElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function selectTheme(themeSelected) {
    switch (themeSelected) {
        case "Pays":
            currentWord = theme01.showRandomWord();
            return currentWord;

        case "Arbre":
            currentWord = theme02.showRandomWord();
            return currentWord;

        case "Prenom":
           currentWord = theme03.showRandomWord();
            return currentWord;

        case "Fleurs":
            currentWord = theme04.showRandomWord();
            return currentWord;

        case "Animaux":
            currentWord = theme05.showRandomWord();

            return currentWord;

        default:
            break;
    }
}

function switchBtn(btnOnOff) {
    switch (btnOnOff) {
        case "on":
            for (let i = 0; i < btnThemeChoice.length; i++) {
                const openBtnChoice = btnThemeChoice[i];
                openBtnChoice.classList.remove("btnTurnOff");
            }
            break;
        case "off":
            for (let i = 0; i < btnThemeChoice.length; i++) {
                const openBtnChoice = btnThemeChoice[i];
                openBtnChoice.classList.add("btnTurnOff");
            }
            break;
        default:
            break;
    }

}

function indiceWord(newWordPendu) {
    let indexUnderscore = arrayHiddenWord.indexOf("_");
    const arrayUnderscore = [];
    // check combien d'underscore le mot caché possède et les ajoute a un array
    while(indexUnderscore !== -1) {
        arrayUnderscore.push(indexUnderscore);
        indexUnderscore = arrayHiddenWord.indexOf("_", indexUnderscore + 1);
    }

    // si il reste qu'un seule underscore il n'y a pas d'indice
    if(arrayUnderscore.length <= 2) {
        alert("Pas besoin d'indice il ne reste que quelques lettre !");

    } else if(arrayUnderscore.length == 0) {
        alert("Le mot est déjà découvert");

    // si il en reste plus d'un, un indice est donné
    } else {
        let indiceLettre = arrayWord[Math.floor(Math.random() * arrayWord.length)];

        //check si la lettre donné n'est pas déjà deviné, si c'est le cas la boucle tourne 
        while(arrayHiddenWord.includes(indiceLettre)) {
            indiceLettre = arrayWord[Math.floor(Math.random() * arrayWord.length)];
        }

        let indiceIndex = arrayWord.indexOf(indiceLettre);

        //vérifie si un indice à déjà été donné
        if(indiceCheck) {
            indiceCheck = false;
            while(indiceIndex !== -1) {
                arrayHiddenWord[indiceIndex] = indiceLettre;
                indiceIndex = arrayWord.indexOf(indiceLettre, indiceIndex + 1);
            }
            
            hiddenWord = arrayHiddenWord.join("");
            newWordPendu.innerHTML = hiddenWord;

            const selectLettre = document.getElementsByClassName("blocLettre");
            for (let i = 0; i < selectLettre.length; i++) {
                const openSelectLettre = selectLettre[i];
                let selectEnfant = openSelectLettre.childNodes[0].innerHTML;
                if(selectEnfant.includes(indiceLettre)) {
                    openSelectLettre.classList.add("unclickableRight"); 
                }
            }    
            if(hiddenWord.includes("_") == false) {
                alert("victoire !");
                for (let i = 0; i < selectLettre.length; i++) {
                    const openLettres = selectLettre[i];
                    openLettres.classList.add("unclickable");
                    gameOver();
                }
            }
        } else {
            alert("Indice déjà utilisé !");
        }
    }  
}

 

//////////////////////////////////////// CLASS ////////////////////////////////////////
class Theme {
    _libelle = "";
    _words = [];
    constructor(libelle) {
        this._libelle = libelle
    }

    //getter
    getLibelle() {
        return this._libelle;
    }
    //setter
    setLibelle(libelle) {
        this._libelle = libelle;
    }
    //method
    addTheme(wordObject) {
        this._words.push(wordObject);
    }

    showWords() {
        console.log("words from "+this.getLibelle()+" : ");
        this._words.forEach((word) => {
            console.log(word.getlibelle());
        })
    }

    showRandomWord() {
        let randomWord = this._words[Math.floor(Math.random() * this._words.length)];
        return randomWord._libelle;
    }
}

class Word {
    _libelle = "";
    constructor(libelle, themeObject) {
        this._libelle = libelle;
        this._themeObject = themeObject;

        this._themeObject.addTheme(this);
    }

    //getter
    getlibelle() {
        return this._libelle;
    }
    //setter
    setLibelle(libelle) {
        this._libelle = libelle;
    }
}

////////////////////////////// OBJECT //////////////////////////////
const theme01 = new Theme("Pays");
const word01Th01 = new Word("france", theme01);
const word02Th01 = new Word("allemagne", theme01);
const word03Th01 = new Word("belgique", theme01);
const word04Th01 = new Word("suisse", theme01);
const word05Th01 = new Word("espagne", theme01);
const word06Th01 = new Word("norvege", theme01);

const theme02 = new Theme("Arbre");
const word01Th02 = new Word("boulot", theme02);
const word02Th02 = new Word("sequoia", theme02);

const theme03 = new Theme("Prenom");
const word01Th03 = new Word("elisabeth", theme03);
const word02Th03 = new Word("benoit", theme03);
const word03Th03 = new Word("jean-michel", theme03);

const theme04 = new Theme("Fleurs");
const word01Th04 = new Word("coquelicot", theme04);
const word02Th04 = new Word("lavande", theme04);

const theme05 = new Theme("Animaux");
const word01Th05 = new Word("tortue", theme05);
const word02Th05 = new Word("toucan", theme05);

const allThemes = [
    {
        libelle: theme01.getLibelle(), 
    },
    {
        libelle: theme02.getLibelle(), 
    },
    {
        libelle: theme03.getLibelle(),
    },
    {
        libelle: theme04.getLibelle(),
    },
    {
        libelle: theme05.getLibelle(),
    },
];
////////////////////////////// Var //////////////////////////////
const penduBoard = document.getElementById("penduBoard");
const penduPart = document.getElementById("penduPart");
const lettersPart = document.getElementById("lettersPart");

//////////////////// penduPart ////////////////////
const blocWord = document.createElement("div");
blocWord.classList.add("blocWord");

const wordPendu = document.createElement("p");
wordPendu.classList.add("wordPendu");

//le mot choisi aléatoirement 
let currentWord = "";

let arrayWord;

//le mot caché que l'utilisateur doit deviner
let hiddenWord = "";

let arrayHiddenWord;

const penduVisuals = document.getElementById("penduVisuals");
const potence = document.getElementById("potence");
const penduTete = document.getElementById("penduTete");
const penduCorps = document.getElementById("penduCorps");
const penduBrasD = document.getElementById("penduBrasD");
const penduBrasG = document.getElementById("penduBrasG");
const penduJambeD = document.getElementById("penduJambeD");
const penduJambeG = document.getElementById("penduJambeG");

const penduComplet = [
    {
        membre:penduTete,
    },
    {
        membre:penduCorps,
    },
    {
        membre:penduBrasD,  
    },
    {
        membre:penduBrasG,
    },
    {
        membre:penduJambeD,
    },
    {
        membre:penduJambeG,
    },
    {
        membre:potence,
    }
];
const baseHP = 7;
let countHP = baseHP;
//////////////////// LettersPart ////////////////////
const lettreAlphabet = document.createElement("div");
lettreAlphabet.classList.add("blocLettre");

const lettreCarre = document.createElement("p");
lettreCarre.classList.add("lettreText");

const alphabetComplet = 'abcdefghijklmnopqrstuvwxyz'.split('');

let indiceCheck = true;

//////////////////// btn ////////////////////
const themeChoice = document.getElementById("themeChoice");

const buttonTheme = document.createElement("button");
buttonTheme.classList.add("btnChoices")

const restartGame = document.getElementById("btnRestart");
const btnIndice = document.getElementById("btnIndice");
////////////////////////////// Code ////////////////////////////// 
// window.addEventListener("mousemove", function() {
//     const computedStyle = window.getComputedStyle(themeChoice); 
//     const themeChoiceWidth = computedStyle.getPropertyValue("width");
//     const root = document.querySelector(":root");  
//     root.style.setProperty("--width-themeChoice", `${themeChoiceWidth}`);
// })

allThemes.forEach((theme) => {
    const newBtnTheme = buttonTheme.cloneNode();
    newBtnTheme.innerHTML = theme.libelle;
    newBtnTheme.classList.add("btnTheme"+theme.libelle);
    themeChoice.appendChild(newBtnTheme);
})

const btnThemeChoice = document.getElementsByClassName("btnChoices");
for (let i = 0; i < btnThemeChoice.length; i++) {
    const openBtnThemeChoice = btnThemeChoice[i];

    openBtnThemeChoice.addEventListener("click", function() {
        potence.classList.remove("penduOff");
        btnIndice.classList.remove("btnTurnOff");
        indiceCheck = true;
        console.log(indiceCheck);

        selectTheme(openBtnThemeChoice.innerHTML);
        switchBtn("off");
        console.log("wordIs : "+currentWord);
            
        for (let i = 0; i < currentWord.length; i++) {
            hiddenWord += "_";
        }

        arrayWord = currentWord.split("");
        arrayHiddenWord = hiddenWord.split("");

        if(arrayWord.includes("-")) {
            let index = arrayWord.indexOf("-");
            arrayHiddenWord[index] = "-";
            hiddenWord = arrayHiddenWord.join("");
        }

        const newBlocWord = blocWord.cloneNode();
        console.log("echo")
        const newWordPendu = wordPendu.cloneNode();
        newWordPendu.innerHTML = hiddenWord;

        penduPart.appendChild(newBlocWord);

        newBlocWord.appendChild(newWordPendu);

        let newIndice = function() {indiceWord(newWordPendu);};

        btnIndice.addEventListener("click", newIndice, false);

        for (let i = 0; i < alphabetComplet.length; i++) {
            const elementAlphabet = alphabetComplet[i];

            const newlettreAlphabet = lettreAlphabet.cloneNode();

            const newLettreCarre = lettreCarre.cloneNode();
            newLettreCarre.innerHTML = elementAlphabet;

            lettersPart.appendChild(newlettreAlphabet);
            newlettreAlphabet.appendChild(newLettreCarre);
        }
        // ajouté unclickable à la lettre donné en indice, et ajouté un while pour compléter toutes les lettres si ya plus de fois le mm ex
        const selectLettre = document.getElementsByClassName("blocLettre");
        for (let i = 0; i < selectLettre.length; i++) {
            const openSelectLettre = selectLettre[i];
            let selectEnfant = openSelectLettre.childNodes[0].innerHTML;

            openSelectLettre.addEventListener("click", function() {
                    
                if(openSelectLettre.classList.contains("unclickable")||
                openSelectLettre.classList.contains("unclickableRight")||
                openSelectLettre.classList.contains("unclickableWrong")) {
                    alert("Lettre déjà utilisé !");
                } else if(currentWord.includes(selectEnfant)) {

                    let index = arrayWord.indexOf(selectEnfant);
                    while(index != -1) {
                        arrayHiddenWord[index] = selectEnfant;
                        index = arrayWord.indexOf(selectEnfant, index + 1);
                    }

                    hiddenWord = arrayHiddenWord.join("");
                    newWordPendu.innerHTML = hiddenWord;        
                    openSelectLettre.classList.add("unclickableRight");

                    if(hiddenWord.includes("_") == false) {
                        alert("victoire !");
                        for (let i = 0; i < selectLettre.length; i++) {
                            const openLettres = selectLettre[i];
                            openLettres.classList.add("unclickable");
                            gameOver();
                            btnIndice.removeEventListener("click", newIndice, false);
                        }
                    }

                } else {
                    countHP--;
                    openSelectLettre.classList.add("unclickableWrong");   
                    penduEvolution(countHP);
                    
                    if(countHP == 0) {
                        alert("perdu !");
                        hiddenWord = currentWord;
                        newWordPendu.innerHTML = hiddenWord;   
                        for (let i = 0; i < selectLettre.length; i++) {
                            const openLettres = selectLettre[i];
                            openLettres.classList.add("unclickable");
                            gameOver();
                            btnIndice.removeEventListener("click", newIndice, false);
                        }     
                    }
                }
            });
        }
    });
}



