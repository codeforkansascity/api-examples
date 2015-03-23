/* From http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/ */

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}


var d = new Date();
var month = d.getMonth() + 1;

if (d.getHours() < 7) {
    var day = d.getDate() - 2;
} else {
    var day = d.getDate() - 1;
}

var output = d.getFullYear() + '-' +
    (('' + month).length < 2 ? '0' : '') + month + '-' +
    (('' + day).length < 2 ? '0' : '') + day;
var yesterday = output + 'T00:00:00';

// See http://dev.socrata.com/docs/queries.html on SoQL Clauses

var request_311 = createCORSRequest("get", "http://data.kcmo.org/resource/7at3-sxhp.json?$where=creation_date='" + yesterday + "'");
if (request_311) {
    request_311.onload = function () {
        var data = JSON.parse(request_311.responseText);
        console.dir(data);
        for (var i in data) {
            var row = '';
            row += '<tr>';
            row += '<td>' + data[i]['case_id'] + '</td>';
            row += '<td>' + data[i]['street_address'] + '</td>';
            row += '<td>' + data[i]['department'] + '</td>';
            row += '<td>' + data[i]['request_type'] + '</td>';
            row += '<td>' + data[i]['status'] + '</td>';
            row += '</tr>';

            $('#cases > tbody:last').append(row);

            if (i > 10) break;
            
        }
    };
    request_311.send();
} 


// Get Google Spreadsheet data

// https://docs.google.com/spreadsheets/d/1IFbDEk5cRKP3WuQX7gMl6XDxLYuVZ4eeq0XRluxqmEQ/edit#gid=669009687
