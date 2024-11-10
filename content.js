let isBlocking = true;

function blockImage() {
  const imageDiv = document.querySelector('.ibe_util_photo.ibe_actif img');
  if (imageDiv) {
    imageDiv.style.display = isBlocking ? 'none' : '';
    console.log(isBlocking ? 'Image bloquée' : 'Image affichée');
  } else {
    console.log('L\'élément cible n\'a pas été trouvé.');
  }
}

// Créer un MutationObserver pour surveiller les ajouts dans le DOM
const observer = new MutationObserver(() => {
  if (isBlocking) {
    blockImage();
  }
});

// Observer les changements dans le corps de la page
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Charger l'état initial
browser.storage.sync.get('blocking', function(data) {
  isBlocking = data.blocking !== undefined ? data.blocking : true;
  blockImage();
});

// Écouter les messages du popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleBlocking") {
    isBlocking = request.blocking;
    blockImage();
  }
});

// Bloquer l'image immédiatement au cas où elle est déjà présente
blockImage();
