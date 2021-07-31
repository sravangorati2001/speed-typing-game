
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
var db= firebase.firestore();;



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
'cable','cake','calculate','call','camera','craft','hospital','should','show','shown','side','simple','since','sing','sit','six','size','sleep',
'slow','small','snow','some','something','song','soon','sound','south','space','special','spell',
'spring','stand','star','start','stay','step','stood','stop','story','street','strong','study','such','summer','sun',
'system','page','pair','part','pass','passed','people','perhaps','person','picture','place','plan','plane','plant','play','point','power',
'probably','problem','product','provide','pull','put','call','came','car','care','carefully','carry','centre',
'certain','change','check','child','children','city','class','clear','close','cold','colour',
'come','common','community','complete','contain','could','country','course','create','cried','cross','cry','cut','chocolate',
'machine','made','make','man','many','map','mark',
'may','mean','measure','men','might','mile','million','mind','minute','miss','money','month','moon','more',
'action','active','laughter','magic','master','space','definition'];

function gameFunc(){
  document.getElementById('highest').innerText=0;
  
  db.collection("score")
  .doc(localStorage.getItem("uid"))
  .get()
  .then((docRef) => { document.getElementById('highest').innerText=docRef.data().firebaseScore })
  .catch(function(error){
    db.collection("score").doc(uid).set({
      firebaseScore:0
      });
  });
          document.getElementById("startB").addEventListener('click',init);

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
       db.collection("score").doc(localStorage.getItem("uid")).update("firebaseScore",score);
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
   var  email=document.getElementById("email").value;
     var password=document.getElementById("password").value;
    if(signupButton.value==="SIGN UP"){
     firebase.auth().createUserWithEmailAndPassword(email, password).then(
       function(){
         localStorage.setItem("uid",email);
        window.location.href = "game.html";
       }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("error").innerText=errorMessage;
       alertt.className="alert alert-warning alert-dismissible fade show";
      });
    }
    else{
     
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        function(){
        localStorage.setItem("uid",email);
         window.location.href = "game.html";
        }
      ).catch(function(error) {
        // Handle Errors here.
      //   var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("error").innerText=errorMessage;
      alertt.className="alert alert-warning alert-dismissible fade show";
    });
    }
   
}

  function logoutUser(){
        
         firebase.auth().signOut();
         window.location.href = "index.html";
  }
