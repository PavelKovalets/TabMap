console.log("Hello from maps!");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message from the extension:");
        console.log(request.data);
    });

var myMap;

document.addEventListener("DOMContentLoaded", function(event) {
    ymaps.ready(init);

    function init () {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [55.76, 37.64], // Москва
            zoom: 10
        });
    }
});