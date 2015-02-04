var data = [];
var rows = document.querySelectorAll("table.tabdata tr.trdata");

for(var i=0; i<rows.length;i++) {
    var cells = rows[i].cells;
    data.push({
        name: cells[0].innerText,
        link: cells[0].childNodes[0].childNodes[0].href,
        discount: cells[1].innerHTML,
        isWorking: cells[2].childNodes[0].title,
        rawPrice: cells[5].innerText,
        price: parsePrice(cells[5].innerText),
        count: cells[6].innerText,
        refreshed: cells[7].innerText,
        rawAddress: cells[8].innerText,
        address: removeDistrictFromAddress(cells[8].innerText),
        phone: cells[9].innerText

    });
}
console.log(data);
chrome.runtime.sendMessage({data: data}, function(response) {
    console.log(response.info);
});

function parsePrice(rawPrice) {
    return parseInt(rawPrice.replace(/\s+/g, ''));
}

function removeDistrictFromAddress (address) {
    var districtStart = address.indexOf("(");
    return districtStart >= 0 ? address.substring(0, districtStart) : address;
};