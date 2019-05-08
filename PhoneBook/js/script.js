// window.onload = function () {
//     var obj
//     {
//         name;
//         surname;
//         email;
//         phone;
//     }
//
//
//     var dmp = JSON.stringify(obj);
//
//     localStorage.setItem('object', dmp);
//
//     document.querySelector('h3').innerHTML.getItem('object')
//
// }


var contact = {};

$('#clear').click( function() {
    window.localStorage.clear();
    location.reload();
    return false;
});