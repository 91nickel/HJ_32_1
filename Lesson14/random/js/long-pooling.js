'use strict';

setInterval(longPoolRequest, 5000);

function longPoolRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET",
        "https://neto-api.herokuapp.com/comet/long-pooling",
        true);
    xhr.send();

    xhr.addEventListener('load', (e) => {
        //console.log(+xhr.responseText);
        selectCard(type.lp, +xhr.responseText);
    })
}