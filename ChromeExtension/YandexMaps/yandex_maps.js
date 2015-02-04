console.log("Hello from maps!");

var dataWithPrice = [];
var dataWithoutPrice = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message from the extension:");
        console.log(request.data);
        request.data.forEach(function(d){
            if (d.price){
                dataWithPrice.push(d);
            } else {
                dataWithoutPrice.push(d);
            }
        });

        dataWithPrice = dataWithPrice.sort(function(a,b){
            return a.price - b.price;
        });
    });

var myMap;

ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [53.929498, 27.564527], // Минск
        zoom: 11,
        controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl']
    });

    //TODO Hotfix
    setTimeout(geocodeAllData, 3000);
}

function geocodeAllData(){
    dataWithPrice.forEach(geocodeData);
    dataWithoutPrice.forEach(geocodeData);
};

function geocodeData(data) {
    var myGeocoder = ymaps.geocode(data.address);
    myGeocoder.then(
        function (res) {
            if (res.geoObjects.getLength() <= 0) {
                alert("Not found: " + address);
            } else if (res.geoObjects.getLength() > 1) {
                alert("More than one: " + address);
            } else {
                var geoObject = res.geoObjects.get(0);
                myMap.geoObjects.add(createPlacemarkFromData(data, geoObject.geometry.getCoordinates()));
            }
        },
        function (err) {
            console.log(err);
        }
    );
};


function createPlacemarkFromData(data, coordinates) {
    var color = 'blue';

    if (data.price){
        color = determineColorByPrice(data.price);
    }

    return new ymaps.Placemark(coordinates, {
        balloonContentBody: [
            '<address>',
            '<a href="' + data.link + '" title="' + data.name + '">' + data.name + '<a/>',
            '<br/>',
            'Адрес: ' + data.rawAddress,
            '<br/>',
            'Обновлено: ' + data.refreshed,
            '<br/>',
            data.isWorking,
            '<br/>',
            'Кол-во: ' + data.count,
            '<br/>',
            'Цена: ' + data.rawPrice,
            '</address>'
        ].join('')
    }, {
        preset: 'islands#circleDotIcon',
        iconColor: color
    });
}

function determineColorByPrice(price) {
    if(dataWithPrice.length <= 2) {
        return 'green';
    }

    var minPrice = dataWithPrice[0].price;
    var maxPrice = dataWithPrice[dataWithPrice.length-1].price;

    var red = 255*(price-minPrice)/(maxPrice - minPrice);
    red = red.toFixed(0);
    var green = 255 - red;

    return "rgb(" + red + "," + green + ",0)"
}