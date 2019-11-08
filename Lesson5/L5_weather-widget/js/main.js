const request = new XMLHttpRequest();
request.addEventListener('load', func);
request.open('GET', 'https://neto-api.herokuapp.com/weather');
request.send();

function func() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}