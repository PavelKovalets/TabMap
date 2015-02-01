var data = [];
var rows = document.querySelectorAll("table.tabdata tr.trdata");

for(var i=0; i<rows.length;i++) {
    var cells = rows[i].cells;
    data.push({
        name: cells[0].innerText,
        discount: cells[1].innerHTML,
        isWorking: cells[2].innerHTML,
        price: cells[5].innerText,
        count: cells[6].innerText,
        refreshed: cells[7].innerText,
        address: cells[8].innerText,
        phone: cells[9].innerText

    });
}
console.log(data);
chrome.runtime.sendMessage({data: data}, function(response) {
    console.log(response.info);
});