function flipCard(card, index, containerId) {
    if (!card.classList.contains("flipped")) {
        card.classList.add("flipped");
        selectRandomImage(card, containerId);
    }
}
function selectRandomImage(card, containerId) {

    var folderMappings = {
        'Permanente': ['Common', 'Rare', 'Epic', 'Legendary'],
        'Promocional': ['Common', 'Rare', 'Epic', 'Legendary'],
        'Adicional': ['Common', 'Rare', 'Epic', 'Legendary'],
    };

    var folders = folderMappings[containerId];

    if (!folders) {
        console.error(`No hay mapeo de carpetas para el ContainerId: ${containerId}`);
        return;
    }

    var folderProbabilities = [0.75, 0.15, 0.06, 0.04];

    var basePath = `/Banners/${containerId}/`;

    var randomFolderIndex = selectRandomIndex(folderProbabilities);
    var selectedFolder = folders[randomFolderIndex];

    var format = '.jpeg';
    if (selectedFolder == 'Legendary') {
        format = '.gif';
    }
    
    var randomImageNumber = Math.floor(Math.random() * 1) + 1;
    var randomImage = randomImageNumber + format;

    var imgfondo = card.querySelector('.imgfondo');
    imgfondo.style.backgroundImage = `url('${basePath}${selectedFolder}/${randomImage}')`;

    card.classList.remove('common', 'rare', 'epic', 'legendary');
    card.classList.add(selectedFolder.toLowerCase());
}

function selectRandomIndex(probabilities) {
    var randomValue = Math.random();
    var cumulativeProbability = 0;

    for (var i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomValue <= cumulativeProbability) {
            return i;
        }
    }

    return probabilities.length - 1;
}

function selectRandomIndex(probabilities) {
    var randomValue = Math.random();
    var cumulativeProbability = 0;

    for (var i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomValue <= cumulativeProbability) {
            return i;
        }
    }

    return probabilities.length - 1;
}

function generateCards(count, containerId) {
    var cardsContainer = document.getElementById(containerId);
    cardsContainer.innerHTML = '';
    for (var i = 1; i <= count; i++) {
        var card = document.createElement('div');
        card.className = 'k-card k-card-horizontal';
        card.onclick = function () { flipCard(this, i, containerId); };

        var imgfondo = document.createElement('div');
        imgfondo.className = 'imgfondo'; 
        imgfondo.style.backgroundImage = `url('/Banners/${containerId}/Cardback.jpg')`;

        var flippedImgfondo = document.createElement('div');
        flippedImgfondo.className = 'imgfondo flipped';
        flippedImgfondo.style.backgroundImage = "url('')";

        card.appendChild(imgfondo);
        card.appendChild(flippedImgfondo);
        cardsContainer.appendChild(card);
    }
}