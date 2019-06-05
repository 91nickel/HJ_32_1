'use strict';
setInterval(poolRequest, 5000);
function poolRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET",
        "https://neto-api.herokuapp.com/comet/pooling",
        true);
    xhr.send();

    xhr.addEventListener('load', (e) => {
        //console.log(+xhr.responseText);
        selectCard(type.p, +xhr.responseText);
    })
}