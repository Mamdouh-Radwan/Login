var userName = document.getElementById('userName');
var signUpMail = document.getElementById('signUpMail');
var signUpPassword = document.getElementById('signUpPassword');
var usedMailAlert = document.getElementById('usedMailAlert');
var requiredInputsUp = document.getElementById('requiredInputsUp');
var success = document.getElementById('success');

var signInMail = document.getElementById('signInMail');
var signInPassword = document.getElementById('signInPassword');
var requiredInputsIn = document.getElementById('requiredInputsIn')
var passwordAlert = document.getElementById('passwordAlert');
var registerAlert = document.getElementById('registerAlert');
var wrongM =document.getElementById('mailWrong');
var wrongP =document.getElementById('passWrong');

var mailRegex = /^.{1,}?(@).{1,}\.(.){1,}$/ ;
var passRegex = /^.{8,}/ ;

var welcomeMsg = document.getElementById('welcome');


var user
var usersList =[];
if(localStorage.getItem('uList')){
  usersList = JSON.parse(localStorage.getItem('uList'));
}

var path = location.href;
var basicUrl = path.split('/')
basicUrl.pop();
var fPath = basicUrl.join('/');




function addUser() {
  if(validation(signUpMail,signUpPassword)){
    user = {
      name: userName.value,
      email: signUpMail.value,
      passWord: signUpPassword.value
    }
    if(user.name === "" || user.email === "" || user.passWord === ""){
      requiredInputsUp.classList.remove("d-none")
    }
    else if(searchUser(user.email)){
      usedMailAlert.classList.remove('d-none')
      requiredInputsUp.classList.add("d-none")
    }
    else{
      usedMailAlert.classList.add('d-none')
      requiredInputsUp.classList.add("d-none")
      usersList.push(user);
      localStorage.setItem('uList', JSON.stringify(usersList))
      clearInputs(3);
      success.classList.remove('d-none')
      setTimeout(function() {
        success.classList.add('d-none')
        location.replace(fPath+'/index.html') 
      }, 2000);
  }
}
 }
function searchUser(userMail) {
  var founded = 0;
  for (i =0; i < usersList.length; i++) {
    if(usersList[i].email === userMail){
      founded = usersList[i];
    }
  }
  return founded;
}

function clearInputs(x) {
  switch (x) {
    case 2:
      signInMail.value = "";
      signInMail.classList.remove('is-valid')
      signInPassword.value = "";
      signInPassword.classList.remove('is-valid')
      break;
    case 3:
      userName.value = "";
      signUpMail.value = "";
      signUpMail.classList.remove('is-valid')
      signUpPassword.value = "";
      signUpPassword.classList.remove('is-valid')
      break;
  }
}

function signIn() {
  if(signInMail.value === "" || signInPassword.value === ""){
    requiredInputsIn.classList.remove("d-none")
    passwordAlert.classList.add('d-none')
    registerAlert.classList.add("d-none")
  }
  else{
    if(validation(signInMail,signInPassword)){
      wrongM.classList.add('d-none')
      wrongP.classList.add('d-none')
      requiredInputsIn.classList.add("d-none")
      var signedUser = searchUser(signInMail.value);
      if(signedUser){
        if(signInPassword.value === signedUser.passWord){
          console.log("pass");
          passwordAlert.classList.add('d-none')
          localStorage.setItem('loggedUser', JSON.stringify(signedUser.name))
          location.replace(fPath+'/welcome.html')
          console.log(loggedIn);
          clearInputs(2);
        }
        else{
          passwordAlert.classList.remove('d-none')
        }
      }
      else{
        requiredInputsIn.classList.add('d-none')
        passwordAlert.classList.add('d-none')
        registerAlert.classList.remove('d-none')
      }
    }
    else{
      if(validate('signInMail',mailRegex)){
        wrongM.classList.add('d-none')
      }
      else{
        wrongM.classList.remove('d-none')
      }
      if(validate('signInPassword',mailRegex)){
        wrongP.classList.add('d-none')
      }
      else{
        wrongP.classList.remove('d-none')
      }
    }
  }
}
var loggedIn = JSON.parse(localStorage.getItem('loggedUser'))

if(loggedIn){
  if(location.href === fPath+'/welcome.html'){
    welcomeMsg.innerHTML = `Welcome ${loggedIn}`
  }
}

function logOut() {
  localStorage.removeItem('loggedUser')
  location.replace(fPath+'/index.html')
}

function validate(id,regex){
  var testElement = document.getElementById(id);
  if (regex.test(testElement.value)) {
    testElement.classList.add("is-valid");
    testElement.classList.remove("is-invalid");
    return true
  } 
  else {
    testElement.classList.remove("is-valid");
    testElement.classList.add("is-invalid");
    return false
  }
}
function validation(mail,pass){
  return (mailRegex.test(mail.value) && passRegex.test(pass.value))
}

