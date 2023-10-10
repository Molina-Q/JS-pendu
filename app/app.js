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
            penduTete.classList.remove("penduMort");
            
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
            break;
        case "Arbre":
            currentWord = theme02.showRandomWord();

            return currentWord;
            break;
        case "Prenom":
           currentWord = theme03.showRandomWord();

            return currentWord;
            break;
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

//le mot caché que l'utilisateur doit deviner
let hiddenWord = "";

const penduVisuals = document.getElementById("penduVisuals");
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
];
const baseHP = 7;
let countHP = baseHP;
//////////////////// LettersPart ////////////////////
const lettreAlphabet = document.createElement("div");
lettreAlphabet.classList.add("blocLettre");

const lettreCarre = document.createElement("p");
lettreCarre.classList.add("lettreText");

const alphabetComplet = 'abcdefghijklmnopqrstuvwxyz'.split('');

//////////////////// btn ////////////////////
const themeChoice = document.getElementById("themeChoice");

const buttonTheme = document.createElement("button");
buttonTheme.classList.add("btnChoices")

const restartGame = document.getElementById("btnRestart");
////////////////////////////// Code ////////////////////////////// 
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
        
        selectTheme(openBtnThemeChoice.innerHTML);
        console.log("wordIs : "+currentWord);
        
        switchBtn("off");
            
        for (let i = 0; i < currentWord.length; i++) {
            hiddenWord += "_";
        }

        const newBlocWord = blocWord.cloneNode();

        const newWordPendu = wordPendu.cloneNode();
        newWordPendu.innerHTML = hiddenWord;

        penduPart.appendChild(newBlocWord);

        newBlocWord.appendChild(newWordPendu);

        for (let i = 0; i < alphabetComplet.length; i++) {
            const elementAlphabet = alphabetComplet[i];

            const newlettreAlphabet = lettreAlphabet.cloneNode();

            const newLettreCarre = lettreCarre.cloneNode();
            newLettreCarre.innerHTML = elementAlphabet;

            lettersPart.appendChild(newlettreAlphabet);
            newlettreAlphabet.appendChild(newLettreCarre);
        }

        const selectLettre = document.getElementsByClassName("blocLettre");
        for (let i = 0; i < selectLettre.length; i++) {
            const openSelectLettre = selectLettre[i];
            let selectEnfant = openSelectLettre.childNodes[0].innerHTML;

            openSelectLettre.addEventListener("click", function() {
            if(openSelectLettre.classList.contains("unclickable")) {
                alert("Lettre déjà utilisé !");
            } else if(currentWord.includes(selectEnfant)||currentWord.includes(selectEnfant.toUpperCase())) {
                const arrayWord = currentWord.split("");
                const arrayHiddenWord = hiddenWord.split("");

                let index = arrayWord.indexOf(selectEnfant);
                while(index != -1) {
                    arrayHiddenWord[index] = selectEnfant;
                    index = arrayWord.indexOf(selectEnfant, index + 1);
                }

                hiddenWord = arrayHiddenWord.join("");
                newWordPendu.innerHTML = hiddenWord;        
                openSelectLettre.classList.add("unclickable");

                if(hiddenWord.includes("_") == false) {
                    alert("victoire !");
                    for (let i = 0; i < selectLettre.length; i++) {
                        const openLettres = selectLettre[i];
                        openLettres.classList.add("unclickable");
                    }
                }

            } else {
                countHP--;
                openSelectLettre.classList.add("unclickable");   
                penduEvolution(countHP);
                
                if(countHP == 0) {
                    alert("perdu !");
                    hiddenWord = currentWord;
                    newWordPendu.innerHTML = hiddenWord;   
                    for (let i = 0; i < selectLettre.length; i++) {
                        const openLettres = selectLettre[i];
                        openLettres.classList.add("unclickable");
                        gameOver()
                    }     
                }
            }
        });
        }
    })
}



