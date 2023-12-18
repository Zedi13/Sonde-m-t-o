// Fonction qui récupère la date actuelle
var currentDateElement = document.querySelector('.current-date');
// Fonction qui récupère l'heure actuelle
var currentTimeElement = document.querySelector('.current-time');

// Fonction pour mettre à jour la date et l'heure
function updateDateTime() {
    // Vérifier si les éléments existent
    if (currentDateElement && currentTimeElement) {
        var now = new Date();
        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };

        // Date et heure française
        currentDateElement.textContent = now.toLocaleDateString('fr-FR', options);

        // Récupération de l'heure et des minutes
        var hours = now.getHours();
        var minutes = now.getMinutes();
        currentTimeElement.textContent = `${hours}:${minutes}`;
    }
}

// Toutes les secondes date et time changent
setInterval(updateDateTime, 1000);
updateDateTime();

// Fonction pour rafraîchir la page
function refreshPage() {
    location.reload();
}

function initMap() {
    // Cette fonction peut rester vide
}


var mapVisible = false;
var map;

function toggleControlPanel() {
    var controlPanel = document.querySelector('.control_panel');
    var mapContainer = document.getElementById('map');

    if (controlPanel.classList.contains('control_panel--expanded')) {
        // Si le panneau de contrôle est étendu, le rétracter et masquer la carte
        controlPanel.classList.remove('control_panel--expanded');
        setTimeout(function () {
            mapContainer.style.display = 'none';
        }, 1000); // Masquer la carte 1 seconde après la rétraction du panneau
        mapVisible = false;
    } else {
        // Si le panneau de contrôle est rétracté, l'étendre et afficher la carte
        controlPanel.classList.add('control_panel--expanded');
        setTimeout(function () {
            if (!map) {
                // Initialisez la carte Google Maps avec les coordonnées
                map = new google.maps.Map(mapContainer, {
                    center: { lat: 43.4812549, lng: 5.3864446 },
                    zoom: 15
                });

                // Ajoutez un marqueur à la position
                var marker = new google.maps.Marker({
                    position: { lat: 43.4812549, lng: 5.3864446 },
                    map: map,
                    title: 'Votre emplacement'
                });
            }
            mapContainer.style.display = 'block';
            mapVisible = true;
        }, 1000); // Afficher la carte 1 seconde après l'extension du panneau
    }
}

// Fonction pour charger les relevés dans le tableau
function chargerReleves() {
    // Vérifier si l'élément avec l'ID "relevesTable" existe
    var tableBody = document.getElementById("relevesTable");

    // Vérifier si l'élément existe avant de procéder
    if (tableBody) {
        tableBody = tableBody.getElementsByTagName('tbody')[0];

        // Supprimer les lignes existantes du tableau
        if (tableBody) {
            tableBody.innerHTML = "";

            // Remplacer cette partie avec la logique pour récupérer les données depuis votre API
            // Exemple statique pour les fins de démonstration
            var donneesSimulees = [
                { heure: '12:00', temperature: '25.3', pression: '1013', humidite: '60' },
                // Ajoutez d'autres données ici...
            ];

            // Ajouter les données au tableau
            donneesSimulees.forEach(function (releve) {
                var row = tableBody.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = releve.heure;
                cell2.innerHTML = releve.temperature;
                cell3.innerHTML = releve.pression;
                cell4.innerHTML = releve.humidite;
            });
        }
    }
}

// Charger les relevés au chargement de la page
window.onload = chargerReleves;


// Fonction pour effectuer une requête AJAX
function chargerDonneesApi() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Analyser les données JSON
            var donnees = JSON.parse(xhr.responseText);
            afficherResultat(donnees);
        }
    };
    xhr.send();
}

// Fonction pour afficher les données dans la page
function afficherResultat(data) {
    var humiditeDiv = document.getElementById('humiditeDiv');
    var temperatureDiv = document.getElementById('temperatureDiv');
    var pressionDiv = document.getElementById('pressionDiv');

    humiditeDiv.innerHTML = `<p>Humidité: ${data.humidite}%</p>`;
    temperatureDiv.innerHTML = `<p>Température: ${data.temperature}°C</p>`;
    pressionDiv.innerHTML = `<p>Pression: ${data.pression} hPa</p>`;
}

// Charger les données au chargement de la page
window.onload = function () {
    chargerReleves();
    chargerDonneesApi();
};
