const apiActualitesSenegal = [
    {
        titre: "TRANSPORT : La Phase 2 du BRT entre officiellement en service à Dakar",
        image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000",
        auteur: "Awa Diop",
        temps: "Il y a 10 min"
    },
    {
        titre: "CULTURE : Le Monument de la Renaissance, pilier incontournable du tourisme dakarois",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000",
        auteur: "Moustapha Ndiaye",
        temps: "Il y a 35 min"
    },
    {
        titre: "ÉCONOMIE : Conseil des ministres, les nouvelles directives pour le pôle de Diamniadio",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
        auteur: "Sidy Mohamed",
        temps: "Il y a 1h"
    },
    {
        titre: "SPORT : Les Lions du Sénégal affûtent leurs armes pour les prochains éliminatoires",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=300", 
        auteur: "Khadre Sakho",
        temps: "Il y a 2h"
    },
    {
        titre: "NUMÉRIQUE : L'essor des startups tech du côté de la SICAP et de Mermoz",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=300",
        auteur: "Thérèse N.",
        temps: "Il y a 3h"
    }
];

function determinerArticlesAleatoires(liste, quantite) {
    const melange = [...liste].sort(() => 0.5 - Math.random());
    return melange.slice(0, quantite);
}

function rafraichirLesActualites() {
    const articlesSelectionnes = determinerArticlesAleatoires(apiActualitesSenegal, 3);
    
    const articleUne = articlesSelectionnes[0];
    const articlesSecondaires = [articlesSelectionnes[1], articlesSelectionnes[2]];

    const uneImg = document.getElementById('une-img');
    const uneTitle = document.getElementById('une-title');
    const uneAuthor = document.getElementById('une-author');

    if(uneImg && uneTitle && uneAuthor) {
        uneImg.src = articleUne.image;
        uneTitle.textContent = articleUne.titre;
        uneAuthor.textContent = articleUne.auteur;
    }

    const secondaryList = document.getElementById('secondary-list');
    if (secondaryList) {
        secondaryList.innerHTML = ""; 

        articlesSecondaires.forEach(article => {
            const cardHTML = `
                <article class="horizontal-news-card focus-target">
                    <div class="horizontal-card-media">
                        <img src="${article.image}" alt="">
                    </div>
                    <div class="horizontal-card-body">
                        <h3>${article.titre}</h3>
                        <div class="post-meta">
                            <span><i class="far fa-clock"></i> ${article.temps}</span>
                            <span><i class="far fa-user"></i> ${article.auteur}</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn like-trigger"><i class="far fa-heart"></i> <span class="like-count">0</span></button>
                    </div>
                </article>
            `;
            secondaryList.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    rafraichirLesActualites();
    setInterval(rafraichirLesActualites, 5000); 
});
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("blurOverlay");
    const cards = document.querySelectorAll(".focus-target"); 

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (card.classList.contains("card-focus-active")) return;
            e.stopPropagation(); 
            document.body.classList.add("mode-focus");
            card.classList.add("card-focus-active");
        });
    });

    overlay.addEventListener("click", () => {
        document.body.classList.remove("mode-focus");
        cards.forEach(card => card.classList.remove("card-focus-active"));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("blurOverlay");
    const cards = document.querySelectorAll(".focus-target"); 

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (card.classList.contains("card-focus-active")) return;
            e.stopPropagation(); 
            document.body.classList.add("mode-focus");
            card.classList.add("card-focus-active");
        });
    });

    overlay.addEventListener("click", () => {
        document.body.classList.remove("mode-focus");
        cards.forEach(card => card.classList.remove("card-focus-active"));
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.focus-overlay');

    // 1. Gestion du clic global sur la page
    document.addEventListener('click', (e) => {
        // Si on clique sur une image qui a la classe cliquable-blur
        if (e.target.classList.contains('cliquable-blur')) {
            const img = e.target;
            // On cherche l'article entier (toute la carte) pour faire monter le tout
            const carteParent = img.closest('article') || img.closest('.focus-target') || img;
            
            // Si la carte entière est déjà zoomée, on ferme
            if (carteParent.classList.contains('card-focus-active')) {
                fermerFocus();
            } else {
                fermerFocus(); // On nettoie un ancien focus si besoin
                document.body.classList.add('mode-focus');
                carteParent.classList.add('card-focus-active');
            }
        }
    });

    // 2. Fermer le focus si on clique sur l'arrière-plan sombre
    if (overlay) {
        overlay.addEventListener('click', fermerFocus);
    }

    // Fonction magique pour tout réinitialiser proprement
    function fermerFocus() {
        document.body.classList.remove('mode-focus');
        document.querySelectorAll('.card-focus-active').forEach(element => {
            element.classList.remove('card-focus-active');
        });
    }
});
