
let time=60;
let score=0;
let isPlaying;


const wordInput=document.querySelector('#input');
const qouteWord=document.querySelector('#current-word');
const scoreDisplay=document.querySelector('#score');
const timeDisplay=document.querySelector('#time');
const button=document.querySelector('#start');
const alert=document.querySelector('#alert');
button.addEventListener('click',init);

const words=['hat','the','great' ,'Maratha', 'queen', 'Lokmata' ,'punyashloka', 'Devi',
'Ahilya',  'sunday','monday','tuesday','wednesday',
'Holkar', 'river',"Blue", "Red","Orange", "Yellow",
'lucky','sravan','america','japan','italy','jordan','turkey','statue','generate',
'stubborn','cocktail','runaway','joke','developer','establishment',
'hero','javascript','nutrition','desert','deserve','design','designer',
'desire','desk','desperate','despite','destroy','destruction',
'revolver','echo','siblings',
'enemy','energy','enforcement','engage','engine','engineer',
'investigate','horrendous','symptom','across','act','cabinet',
'cable','cake','calculate','call','camera',
'action','active','laughter','magic','master','space','definition'];

timeDisplay.innerHTML=time;

function init(){
 time=60;
 alert.className="collapse" ;
 generateWord(words);
 wordInput.value="";
 wordInput.addEventListener('input',checkWord);
 setTimeout(function repeat() {
  countDown();
  setTimeout(repeat, 1000);
}, 1000);
 setInterval(chackstatus,50);
}
 function generateWord(words){
     const randomInd=Math.floor(Math.random() * words.length);
     qouteWord.innerHTML=words[randomInd];
 }
 function countDown(){
   if(time>0) time--;
   else if(time===0)
   isPlaying=false;
   timeDisplay.innerHTML=time;
 }
 function chackstatus(){
   if( !isPlaying && time===0){
   alert.className="alert alert-warning w-25  mx-3" 
   wordInput.innerHTML="";
   score=0;
   }
 }
 function checkWord(){
     if(matchWords() && time>0){
     score++;
     wordInput.value="";
     generateWord(words);
     isPlaying=true;
     }
     scoreDisplay.innerHTML=score; 
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
