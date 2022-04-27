"use strict";



    // Punkt point als ersten Punkt für Formel speichern
    var lat1 = point[1];
    var lon1 = point[0];

    var ausgabeAB = "";
    var poisDistance = new Array(pois.features.length);

    // Berechnung der Abstände von Punkten(pois) zu Punkt mit for-Schleife 
    for(var i = 0; i < pois.features.length; i++) {
        // Punkte von pois-Array als zweiten Punkt speichern 
        var lat2 = pois.features[i].geometry.coordinates[1];
        var lon2 = pois.features[i].geometry.coordinates[0];
        
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = Math.round(R * c * 10) / 10; // in m umgerechnet und auf eine Nachkommastelle gerundet

        // Mehrdimensionales Array erstellen
        poisDistance[i] = new Array(2);

        // In array pois distance eintragen
        poisDistance[i][1] = d;
        poisDistance[i][0] = pois.features[i].properties.name;

        
    }

    // Array poisDistance aufsteigend sortieren
    //Quelle: https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/sort
    poisDistance.sort(zweiteSpalteSortieren);
    // Funktion für zweite Spalte sortieren 
    //gibt entweder -1, 0 oder 1 zurück und sort() tauscht dann die beiden ausgewählten Spalten
    function zweiteSpalteSortieren (a, b){
    return a[1] - b[1];
    }

    // Textausgabe von aufsteigend sortierten gegebenen Punkten als Text mit Zeilenumbruch (in HTML) eingefügen
    for(var i = 0; i < poisDistance.length; i++) {
    ausgabeAB = ausgabeAB + poisDistance[i][0]+ ": " + poisDistance[i][1] + "m" + "<br />";
    }

    

               
                                          

// Funktion für Ermittlung des Standorts plus eintragen in das Eingabefeld
 function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                document.getElementById("mPosition").innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            // GeoJSON Point erstellen
            var aPosition = {
                "type": "Point",
                "coordinates": [position.coords.latitude, position.coords.longitude]
            }
            // mit Stringify GeoJSON in Eingabefeld eintragen
            document.getElementById("mPosition").innerHTML = JSON.stringify(aPosition);
        }


