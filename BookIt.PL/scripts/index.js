"use strict";
exports.__esModule = true;
var services_1 = require("./services");
$(document).ready(function () {
    var usernames = services_1.getAllUsernames();
    console.log(usernames);
    for (var element in usernames) {
        console.log(element);
        $('#selectUsername').append('<option' + element + '</option>');
    }
});
