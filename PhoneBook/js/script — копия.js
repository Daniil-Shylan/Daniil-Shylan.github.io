/* var contac

 localStorage.user_id = 20;
 localStorage.user_name = 'Taras';

 var user_name = localStorage.user_name;
 document.write("<p>"+ user_name + "</p>");
 var user_id = localStorage.user_id;
 document.write("<p>" + user_id + "</p>"); */

// // Добавляем запись в существующий список
// $('#todos').prepend("<li>" + Description + "/li>");
// // Очищаем поле ввода
// $('#form')[0].reset();
// var todos = $('#todos').html();
// return false;
// });
//
// // если в локальном хранилище уже есть данные, то отображаем их
// if(localStorage.getItem('todos')) {
//     $('#todos').html(localStorage.getItem('todos'));
// }
//
// // Полная очиска localStorage
// $('#clear').click( function() {
//     localStorage.clear();
//     location.reload();
//     return false;
// });

// function valid(form) {
//     var name = form.Name.value;
//     var fname = form.Fname.value;
//     var e_mail = form.E_mail.value;
//     var phone = form.Phone.value;
// }
//
// var obj = {
//     name;
//     fname;
//     e_mail;
//     phone;
// };
//
// console.log(obj.name);
// console.log(obj.fname);
// console.log(obj.e_mail);
// console.log(obj.phone);

// function store(){
//     var inputEmail= document.getElementById("email");
//     localStorage.setItem("email", inputEmail.value);
// }

// window.onload = function () {
//     document.getElementById('green').onclick = function () {
//         console.log('Background color: green');
//         document.getElementsByTagName('body')[0].style.background = 'green';
//         localStorage.setItem('bgcolor','green');
//      }
// }

// var contact = {};
//
// var modal = document.getElementById("form1");
// var btn = document.getElementById("add");
//
// btn.onclick = function () {
//     modal.style.display = "block";
// };
//
// span.onclick = function () {
//     modal.style.display = "none";
//     window.location.reload();
// };
//
// function valid (fotm) {
//     var fail = "false";
//     var vphone = /^[\d\ +]{1}[\d\(\)\ -]{4,16}\d$/;
//     var vmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
//     var info = document.querySelector('#info');
//     contact.name = document.getElementsByName("name1")[0].value;
//     if(contact.name === "")
//         fail = "You did not enter a name";
//     for (var k = 0; k < localStorage.length; k++) {
//         var key2 = localStorage.key(k);
//         if(contact.name === key2 && e === 0) {
//             fail = "This contact name already exists";
//             break;
//         }
//     }
//
//     contact.surname = document.getElementsByName('surname')[0].value;
//
//     contact.phone = document.getElementsByName('phone')[0].value;
//     if(vphone.test(contact.phone) === false)
//         fail = "Invalid phone number format";
//     if(contact.phone === "")
//         fail = "You did not enter a phone";
//
//     contact.email = document.getElementsByName('email')[0].value;
//     if(vmail.test(contact.email) === false)
//         fail = "Wrong e-mail format";
//     if(contact.email === "")
//         fail = "You did not enter a e-mail";
//
//
//     if (fail === "false") {
//         localStorage.setItem(contact.name, JSON.stringify(contact));
//     }
//     else{
//         info.innerHTML = fail;
//         return false;
//     }
//
//     window.location.reload();


