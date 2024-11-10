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

const observer = new MutationObserver(() => {
  blockImage();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});


browser.runtime.sendMessage({action: "getState"}, function(response) {
  isBlocking = response.blocking;
  blockImage();
});


browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateState") {
    isBlocking = request.blocking;
    blockImage();
  }
});


blockImage();
