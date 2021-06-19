
let time=60;
let score=0;
let key;
let flag=false;

const wordInput=document.querySelector('#input');
const qouteWord=document.querySelector('#current-word');
const scoreDisplay=document.querySelector('#score');
const timeDisplay=document.querySelector('#time');
const button=document.querySelector('#start');
const alert=document.querySelector('#alert');
button.addEventListener('click',init);

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
 }
 
 function matchWords(){
     if(qouteWord.innerHTML===wordInput.value){
       return true;
     }
     else{
         return false;
     }
 }
