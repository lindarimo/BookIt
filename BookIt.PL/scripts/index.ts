import { getAllUsernames } from "./services";

$(document).ready(() => {
    var usernames: string[] = getAllUsernames();
    console.log(usernames);
    for (var element in usernames) {
        console.log(element);
        $('#selectUsername').append('<option' + element + '</option>')
    }
})
