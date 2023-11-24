//Fonction qui récupère la date actuelle
var currentDateElement = document.querySelector('.current-date');
//Fonction qui récupère l'heure actuelle
var currentTimeElement = document.querySelector('.current-time');

// Fonction pour mettre à jour la date et l'heure
function updateDateTime() {
    var now = new Date();
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };

    //Date et heure française
    currentDateElement.textContent = now.toLocaleDateString('fr-FR', options);

    //Récupération de l'heure et des minutes
    var hours = now.getHours();
    var minutes = now.getMinutes();
    currentTimeElement.textContent = `${hours}:${minutes}`;
}

//Toutes les secondes date et time changent
setInterval(updateDateTime, 1000);
updateDateTime();

//Fonction pour rafraîchir la page
function refreshPage() {
    location.reload();
}

//Fonction étendre le panneau de configuration une fois cliquer sur la fleche
function toggleControlPanel() {
    var controlPanel = document.querySelector('.control_panel');
    controlPanel.classList.toggle('control_panel--expanded');
}
