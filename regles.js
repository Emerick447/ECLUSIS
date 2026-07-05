/* ==========================================
            L'ÉCLUSIS - RÈGLES
   ========================================== */

const REGLES_BASE = [

    // -------------------------
    // COULEURS
    // -------------------------

    {
        nom: "Carte rouge",
        verifier(historique, carte) {
            return carte.couleur === "♥" || carte.couleur === "♦";
        }
    },

    {
        nom: "Carte noire",
        verifier(historique, carte) {
            return carte.couleur === "♠" || carte.couleur === "♣";
        }
    },

    {
        nom: "Même couleur que la précédente",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return historique.at(-1).couleur === carte.couleur;
        }
    },

    {
        nom: "Couleur différente",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return historique.at(-1).couleur !== carte.couleur;
        }
    },

    {
        nom: "Alterner rouge/noir",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            const ancienneRouge =
                ["♥","♦"].includes(historique.at(-1).couleur);

            const nouvelleRouge =
                ["♥","♦"].includes(carte.couleur);

            return ancienneRouge !== nouvelleRouge;
        }
    },

    // -------------------------
    // ENSEIGNES
    // -------------------------

    {
        nom: "Même enseigne",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return historique.at(-1).couleur === carte.couleur;
        }
    },

    {
        nom: "Enseigne différente",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return historique.at(-1).couleur !== carte.couleur;
        }
    },

    // -------------------------
    // VALEURS
    // -------------------------

    {
        nom: "Valeur paire",
        verifier(historique, carte) {

            return carte.numero % 2 === 0;

        }
    },

    {
        nom: "Valeur impaire",
        verifier(historique, carte) {

            return carte.numero % 2 === 1;

        }
    },

    {
        nom: "Valeur supérieure",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return carte.numero >
                historique.at(-1).numero;
        }
    },

    {
        nom: "Valeur inférieure",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return carte.numero <
                historique.at(-1).numero;
        }
    },

    {
        nom: "Même valeur",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return carte.numero ===
                historique.at(-1).numero;
        }
    },

    {
        nom: "Valeur différente",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return carte.numero !==
                historique.at(-1).numero;
        }
    },

    {
        nom: "Différence de 1",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return Math.abs(
                carte.numero -
                historique.at(-1).numero
            ) === 1;
        }
    },

    {
        nom: "Supérieure ou égale à 7",
        verifier(historique, carte) {

            return carte.numero >= 7;

        }
    },

    {
        nom: "Inférieure ou égale à 7",
        verifier(historique, carte) {

            return carte.numero <= 7;

        }
    },

    // -------------------------
    // HISTORIQUE
    // -------------------------

    {
        nom: "Jamais la même carte",
        verifier(historique, carte) {

            return !historique.some(c =>
                c.numero === carte.numero &&
                c.couleur === carte.couleur
            );

        }
    },

    {
        nom: "Pas deux mêmes valeurs",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return historique.at(-1).numero !==
                   carte.numero;

        }
    },

    {
        nom: "Pas deux mêmes enseignes",
        verifier(historique, carte) {

            if (historique.length === 0)
                return true;

            return historique.at(-1).couleur !==
                   carte.couleur;

        }
    },

    // -------------------------
    // COMBINAISONS
    // -------------------------

    {
        nom: "Rouge et paire",
        verifier(historique, carte) {

            const rouge =
                carte.couleur === "♥" ||
                carte.couleur === "♦";

            return rouge && carte.numero % 2 === 0;
        }
    },
let reglesPerso = [];

try {
    const sauvegarde = localStorage.getItem("reglesPerso");

    if (sauvegarde) {
        reglesPerso = JSON.parse(sauvegarde);
    }

} catch(e) {

    reglesPerso = [];

}

function obtenirToutesLesRegles() {

    return [...REGLES_BASE, ...reglesPerso];

}

function sauvegarderRegles() {

    localStorage.setItem(
        "reglesPerso",
        JSON.stringify(reglesPerso)
    );

}
    {
        nom: "Noire et impaire",
        verifier(historique, carte) {

            const noire =
                carte.couleur === "♠" ||
                carte.couleur === "♣";

            return noire && carte.numero % 2 === 1;
        }
    }

];

/* ==========================================
      Fonction utilitaire
   ========================================== */

function choisirRegleAleatoire(){

    return REGLES[
        Math.floor(
            Math.random()*REGLES.length
        )
    ];

}
