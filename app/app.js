// a chaque fois que countHP est réduit penduOff est retiré d'une partie du prendu
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
            // ajoute la class "penduMort"
            penduTete.classList.add("penduMort");
            
            break;

        default:
            break;
    }
}
// fait apparaitre le btn restart et lui ajoute un eventListenner 
function gameOver() {
    //enlève la class btnTurnOff
    restartGame.classList.remove("btnTurnOff");
    //add un event sur le btn restartGame
    restartGame.addEventListener("click", () => restartTheGame());
} 

// remet toutes mes variables à zéro, fait disparaitre le pendu (avec penduOff) et affiche les btn de theme
function restartTheGame(){
    //donne à toute les partie du pendu la class penduOff pour le faire disparaitre
    penduComplet.forEach((pendu) => {
        if(pendu.membre.classList.contains("penduOff")) {

        } else {
            pendu.membre.classList.add("penduOff");
        }  
    })

    //retire la class penduMort 
    penduTete.classList.remove("penduMort");

    // delete tous les elements avec les class en paramètre 
    deleteElementsByClass("blocLettre");
    deleteElementsByClass("blocWord");

    //remet currentWord et hiddenWord à zéro
    currentWord = "";
    hiddenWord = "";

    //remet le countHp au maximum
    countHP = baseHP;

    //fait diparaitre le btn restart et indice
    restartGame.classList.add("btnTurnOff");
    btnIndice.classList.add("btnTurnOff");   

    //fait apparaitre les btn theme
    switchBtn("on");
}

// supprime les elements avec la class saisi en paramètre (très efficace en combinaison avec un array qui contient toutes les class à saisir et un forEach)
function deleteElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// affiche un mot aléatoire en lien avec le thème choisi
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

// fait apparaitre ou disparaitre mes btn themes
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

// donne un indice (ou non)
function indiceWord(newWordPendu) {
    let indexUnderscore = arrayHiddenWord.indexOf("_");
    const arrayUnderscore = [];
    // check combien d'underscore le mot caché possède et ajoute leurs index a un array
    while(indexUnderscore !== -1) {
        arrayUnderscore.push(indexUnderscore);
        indexUnderscore = arrayHiddenWord.indexOf("_", indexUnderscore + 1);
    }

    // si il reste au moins deux underscore il n'y a pas d'indice
    if(arrayUnderscore.length <= 2) {
        alert("Pas besoin d'indice il ne reste que quelques lettre !");

    } else if(arrayUnderscore.length == 0) {
        alert("Le mot est déjà découvert");

    // si il reste plus de deux lettres à decouvrir, un indice est donné
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
            // bloque la lettre ajouté par l'indice et si l'indice fini complète le mot, donne la victoire
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
class Theme { // class Theme qui a comme unique paramètre libelle
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
    // chaque fois qu'un object est instancié par la class Word cette function est appelé
    addTheme(wordObject) {
        this._words.push(wordObject);
    }

    // return un mot aléatoire de l'array words
    showRandomWord() {
        let randomWord = this._words[Math.floor(Math.random() * this._words.length)];
        return randomWord._libelle;
    }
}

class Word { // class Word qui a comme paramètre libelle et themeObject (themeObject qui est une clé étrangère)
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

// word01Theme01
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
const word02Th05 = new Word("elephant", theme05);

// le libelle de tous mes themes, utilisés pour être affiché sur les btn themes
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

// mes div principales (penduPart et lettersPart sont des enfants de Board)
const penduBoard = document.getElementById("penduBoard");

const penduPart = document.getElementById("penduPart");

const lettersPart = document.getElementById("lettersPart");

//////////////////// penduPart ////////////////////

//parti supérieur de l'écran (le pendu et le mot à deviner)
const blocWord = document.createElement("div");
blocWord.classList.add("blocWord");

const wordPendu = document.createElement("p");
wordPendu.classList.add("wordPendu");

//le mot choisi aléatoirement 
let currentWord = "";

// array contenant le string currentWord avec une lettre par index
let arrayWord = currentWord.split("");

//le mot caché en utilisant des underscore et de la même longueur que currentWord
let hiddenWord = "";

// array contenant le string hiddenWord avec un caractère par index
let arrayHiddenWord = hiddenWord.split("");

// tous les elements HTML qui font le visuelle du pendu 
const penduVisuals = document.getElementById("penduVisuals");
const potence = document.getElementById("potence");
const penduTete = document.getElementById("penduTete");
const penduCorps = document.getElementById("penduCorps");
const penduBrasD = document.getElementById("penduBrasD");
const penduBrasG = document.getElementById("penduBrasG");
const penduJambeD = document.getElementById("penduJambeD");
const penduJambeG = document.getElementById("penduJambeG");

// un array avec toutes ces parties
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

// le nombre d'erreurs que le user peut faire avant de perdre
const baseHP = 7;
let countHP = baseHP;

//////////////////// LettersPart ////////////////////

//parti inférieur de l'écran (clavier)
const lettreAlphabet = document.createElement("div");
lettreAlphabet.classList.add("blocLettre");

const lettreCarre = document.createElement("p");
lettreCarre.classList.add("lettreText");

const alphabetComplet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// vérifie si un indice à déjà été donné (true = non, false = oui)
let indiceCheck = true;

//////////////////// btn ////////////////////

const themeChoice = document.getElementById("themeChoice");

const buttonTheme = document.createElement("button");
buttonTheme.classList.add("btnChoices")

const restartGame = document.getElementById("btnRestart");
const btnIndice = document.getElementById("btnIndice");

////////////////////////////// Code ////////////////////////////// 

//tous les themes apparaisse dans des btn
allThemes.forEach((theme) => {

    const newBtnTheme = buttonTheme.cloneNode();
    newBtnTheme.innerHTML = theme.libelle;
    newBtnTheme.classList.add("btnTheme"+theme.libelle);
    themeChoice.appendChild(newBtnTheme);

})

const btnThemeChoice = document.getElementsByClassName("btnChoices");

for (let i = 0; i < btnThemeChoice.length; i++) {

    const openBtnThemeChoice = btnThemeChoice[i];
    
    // exécute en fonction du btn theme qui est clické
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

        // fait en sorte que si le mot possède un "-", ce caractère ne sera pas caché
        if(arrayWord.includes("-")) {
            let index = arrayWord.indexOf("-");
            arrayHiddenWord[index] = "-";
            hiddenWord = arrayHiddenWord.join("");
        }

        const newBlocWord = blocWord.cloneNode();
        const newWordPendu = wordPendu.cloneNode();
        newWordPendu.innerHTML = hiddenWord;

        penduPart.appendChild(newBlocWord);
        newBlocWord.appendChild(newWordPendu);

        let newIndice = function() {indiceWord(newWordPendu);};

        btnIndice.addEventListener("click", newIndice, false);

        // affiche tous le clavier avec l'alphabet
        for (let i = 0; i < alphabetComplet.length; i++) {
            const elementAlphabet = alphabetComplet[i];

            const newlettreAlphabet = lettreAlphabet.cloneNode();

            const newLettreCarre = lettreCarre.cloneNode();
            newLettreCarre.innerHTML = elementAlphabet;

            lettersPart.appendChild(newlettreAlphabet);
            newlettreAlphabet.appendChild(newLettreCarre);
        }

        //event quand je clic sur une lettre
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

                    // quand il n'y a plus de "_" c'est gagné 
                    if(hiddenWord.includes("_") == false) {

                        alert("victoire !");

                        for (let i = 0; i < selectLettre.length; i++) {
                            const openLettres = selectLettre[i];
                            openLettres.classList.add("unclickable");
                        }

                        gameOver();
                        btnIndice.removeEventListener("click", newIndice, false);
                    }

                } else {

                    // lors d'une erreur décrémente le countHP et met à jour le pendu et rends inclickable le carre
                    countHP--;
                    openSelectLettre.classList.add("unclickableWrong");   
                    penduEvolution(countHP);

                    //si le countHP atteint zéro c'est perdu
                    if(countHP == 0) {

                        alert("perdu !");
                        hiddenWord = currentWord;
                        newWordPendu.innerHTML = hiddenWord; 

                        for (let i = 0; i < selectLettre.length; i++) {
                            const openLettres = selectLettre[i];
                            openLettres.classList.add("unclickable");
                        }     

                        gameOver();

                        // empêche la multiplication de l'eventListener du btnIndice
                        btnIndice.removeEventListener("click", newIndice, false);
                    }
                }
            });
        }
    });
}



