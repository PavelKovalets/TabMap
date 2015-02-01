console.log("Hello from maps!");

var parsedData = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message from the extension:");
        console.log(request.data);
        parsedData = request.data;
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
            center: [53.929498, 27.564527], // Минск
            zoom: 10
        });

        geocodeParsedData(myMap);
    }

    function geocodeParsedData(map){
        parsedData.forEach(function(d){
           geocodeAddress(map, removeDistrictFromAddress(d.address));
        });

    };

    function geocodeAddress(map, address) {
        var myGeocoder = ymaps.geocode(address);
        myGeocoder.then(
            function (res) {
                map.geoObjects.add(res.geoObjects);
                // Выведем в консоль данные, полученные в результате геокодирования объекта.
                console.log(res.geoObjects.get(0).properties.get('metaDataProperty').getAll());
            },
            function (err) {
                // обработка ошибки
                console.log(err);
            }
        );
    };

    function removeDistrictFromAddress (address) {
        var districtStart = address.indexOf("(");
        return address.substring(0, districtStart);
    };
});