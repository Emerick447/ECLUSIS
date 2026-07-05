/* ==========================================
            L'ÉCLUSIS - script.js
   Partie 1/2
========================================== */

// ----------------------------
// Variables
// ----------------------------

const COULEURS = ["♠", "♥", "♦", "♣"];
const VALEURS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];

let paquet = [];
let main = [];

let cartesAcceptees = [];
let cartesRefusees = [];

let regleChoisie = null;

// ----------------------------
// Création du paquet
// ----------------------------

function creerPaquet() {

    paquet = [];

    for (let couleur of COULEURS) {

        for (let i = 0; i < VALEURS.length; i++) {

            paquet.push({
                valeur: VALEURS[i],
                numero: i + 1,
                couleur: couleur
            });

        }

    }

}

// ----------------------------
// Mélange
// ----------------------------

function melanger() {

    for (let i = paquet.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [paquet[i], paquet[j]] =
        [paquet[j], paquet[i]];

    }

}

// ----------------------------
// Distribution
// ----------------------------

function distribuer(nb = 7) {

    main = [];

    for (let i = 0; i < nb; i++) {

        if (paquet.length > 0)
            main.push(paquet.pop());

    }

}

// ----------------------------
// Création d'une carte HTML
// ----------------------------

function creerCarteHTML(carte, cliquable = false, index = -1) {

    const div = document.createElement("div");

    div.className = "carte";

    if (carte.couleur == "♥" || carte.couleur == "♦")
        div.classList.add("rouge");
    else
        div.classList.add("noire");

    div.innerHTML =
        `<div>${carte.valeur}</div>
         <div style="font-size:40px">${carte.couleur}</div>`;

    if (cliquable) {

        div.onclick = () => jouerCarte(index);

    }

    return div;

}

// ----------------------------
// Affichage de la main
// ----------------------------

function afficherMain() {

    const zone = document.getElementById("mainJoueur");

    zone.innerHTML = "";

    main.forEach((carte, index) => {

        zone.appendChild(
            creerCarteHTML(carte, true, index)
        );

    });

}

// ----------------------------
// Cartes acceptées
// ----------------------------

function afficherCartesAcceptees() {

    const zone = document.getElementById("cartesAcceptees");

    zone.innerHTML = "";

    cartesAcceptees.forEach(carte => {

        let c = creerCarteHTML(carte);

        c.classList.add("acceptee");

        zone.appendChild(c);

    });

}

// ----------------------------
// Cartes refusées
// ----------------------------

function afficherCartesRefusees() {

    const zone = document.getElementById("cartesRefusees");

    zone.innerHTML = "";

    cartesRefusees.forEach(carte => {

        let c = creerCarteHTML(carte);

        c.classList.add("refusee");

        zone.appendChild(c);

    });

}

// ----------------------------
// Afficher un message
// ----------------------------

function message(texte) {

    document.getElementById("message").textContent = texte;

}

// ----------------------------
// Jouer une carte
// ----------------------------

function jouerCarte(index) {

    const carte = main[index];

    const acceptee =
        regleChoisie.verifier(
            cartesAcceptees,
            carte
        );

    if (acceptee) {

        cartesAcceptees.push(carte);

        message("✅ Carte acceptée");

    }
    else {

        cartesRefusees.push(carte);

        message("❌ Carte refusée");

    }

    // retirer de la main
    main.splice(index, 1);

    // repiocher
    if (paquet.length > 0)
        main.push(paquet.pop());

    afficherMain();
    afficherCartesAcceptees();
    afficherCartesRefusees();

}
