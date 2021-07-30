
let time=60;
let score=0;
let key;
let flag=false;

const wordInput=document.querySelector('#input');
const qouteWord=document.querySelector('#current-word');
const scoreDisplay=document.querySelector('#score');
const timeDisplay=document.querySelector('#time');
const button=document.getElementById("startB")
const alert=document.querySelector('#alert');
const highestScore=document.getElementById('highest');


var signupButton=document.getElementById("Signin");
var loginDiv=document.getElementById("loginDiv");
var alertt=document.getElementById("alert");
var db;
var uid ;

db = firebase.firestore();

const words=['hat','the','great' ,'Maratha', 'queen', 'Lokmata' ,'cow','crazy','express',
'crack','creative','examine',
'creature', 'Devi','inspire',
'Ahilya',  'sunday','monday','tuesday','wednesday',
'Holkar', 'river',"Blue", "Red","Orange", "Yellow",'create',
'lucky','sravan','america','japan','italy','jordan','turkey','statue','generate',
'stubborn','cocktail','runaway','joke','developer','establishment',
'hero','javascript','nutrition','desert','deserve','design','designer',
'desire','desk','desperate','despite','destroy','destruction',
'creation','crash','honey','horizon','manage','memory','network',
'revolver','echo','siblings','honest','impossible','index',
'enemy','energy','enforcement','engage','engine','engineer','cream',
'investigate','horrendous','symptom','across','act','cabinet',
'cable','cake','calculate','call','camera','craft','hospital',
'action','active','laughter','magic','master','space','definition'];



timeDisplay.innerHTML=time;
function init(){
  
 time=60;
 score=0;
 scoreDisplay.innerHTML=score; 
 alert.className="collapse" ;
 generateWord(words);
 wordInput.value="";
 wordInput.addEventListener('input',checkWord);
 if(!flag){
key= setInterval(countDown,1000);
 }
 flag=true;
}
 function generateWord(words){
     const randomInd=Math.floor(Math.random() * words.length);
     qouteWord.innerHTML=words[randomInd];
 }
 function countDown(){
   if(time>0) time--;
   else if(time===0){
    clearInterval(key);
    alert.className="alert alert-warning w-25  mx-3" 
   wordInput.value="";
   wordInput.removeEventListener('input',checkWord);
   score=0;
    flag=false;
   }
   timeDisplay.innerHTML=time;
 }
 
 function checkWord(){
     if(matchWords() && time>0){
     score++;
     wordInput.value="";
     generateWord(words);
     isPlaying=true;
     }
     scoreDisplay.innerHTML=score; 
     if(score>highestScore.innerText){
       highestScore.innerText=score;
       db.collection("score").doc(uid).update("firebaseScore",score);
     }
 }
 
 function matchWords(){
     if(qouteWord.innerHTML===wordInput.value){
       return true;
     }
     else{
         verdict.innerHTML="";
         return false;
     }
 }



 
function changeSigninDiv(){
  document.getElementById("email").value="";
  document.getElementById("password").value="";
  document.getElementById("Signin").value="SIGN UP";
  document.getElementById("Sign").className="inactive";
  loginDiv.className="active underlineHover"
}
function changeSignupDiv(){
  document.getElementById("email").value="";
  document.getElementById("password").value="";
  document.getElementById("Signin").value="SIGN IN";
  document.getElementById("Sign").className="active";
  loginDiv.className="inactive underlineHover"
}

function myFunc(){
    var email=document.getElementById("email").value;
     var password=document.getElementById("password").value;
   //  window.alert(email+" "+password);
  
    if(signupButton.value==="SIGN UP"){
   // console.log("jdfjf");
     firebase.auth().createUserWithEmailAndPassword(email, password).then(
       function(){
       // window.location.href = "game.html";
       document.getElementById("login").style.display="none";
         document.getElementById("game").style.display="block";
        var user = firebase.auth().currentUser;
  if(user){
  uid=user.email;
  //window.alert(uid);
  }
  
  db.collection("score").doc(uid).set({
    firebaseScore:0
    });
    document.getElementById("startB").addEventListener('click',init);
       }
     ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      // window.alert(errorMessage);
       alertt.className="alert alert-warning alert-dismissible fade show";
      });
    }
    else{
     
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        function(){
         // console.log("djf");
         document.getElementById("login").style.display="none";
         document.getElementById("game").style.display="block";
         document.getElementById('highest').innerText="";
         var user = firebase.auth().currentUser;
         if(user){
          uid=user.email;
          //window.alert(uid);
          }
         db.collection("score")
         .doc(uid)
         .get()
         .then((docRef) => { document.getElementById('highest').innerText=docRef.data().firebaseScore });
         
          document.getElementById("startB").addEventListener('click',init);
          
        }
      ).catch(function(error) {
        // Handle Errors here.
      //   var errorCode = error.code;
        var errorMessage = error.message;
      //  // console.log(errorCode);
       // window.alert(errorMessage);
      alertt.className="alert alert-warning alert-dismissible fade show";
      //  console.log(errorMessage);
    });
    }
   
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      
        
     } else {
        // User is signed out
        // ...
      }
    });
}

  function logoutUser(){
   
    document.getElementById("login").style.display="block";
         document.getElementById("game").style.display="none";
         document.getElementById("email").value="";
         document.getElementById("password").value="";
         firebase.auth().signOut();
  }