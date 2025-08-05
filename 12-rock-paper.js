
const score =JSON.parse(localStorage.getItem('scoree'))||{//or operator instead of if(!score)
  win:0,
  loss:0,
  tie:0 };


document.querySelector('.js-score')
.innerHTML=`Win:${score.win}, Losses:${score.loss}, Ties:${score.tie}`;

const rockElement=document.querySelector('.js-Rock-Button');
rockElement.addEventListener('click',()=>{
  playgame('rock');
});

const paperElement=document.querySelector('.js-Paper-Button');
paperElement.addEventListener('click',()=>{
  playgame('paper');
});

const scissorElement=document.querySelector('.js-Scissor-Button');
scissorElement.addEventListener('click',()=>{
  playgame('scissor');
});

document.querySelector('.js-auto').addEventListener('click',()=>{
  g();
});

document.querySelector('.js-Reset').addEventListener('click',()=>{
  score.win=0;
 score.loss=0;
 score.tie=0;
let resulty=( localStorage.getItem('resulty'));
let takenu=( localStorage.getItem('takenu'));
let moves=( localStorage.getItem('moves'));
updateScore(resulty,takenu,moves);
 localStorage.removeItem('scoree');//refresh then local storage 
});

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r')playgame('rock');
  else if(event.key==='p')playgame('paper');
  else if(event.key==='s')playgame('scissor');
});

function playgame(taken){
const compmove=pickcompmpove();
let result='';
if(taken==='rock'){
if(compmove==='paper')result='loss'
else if(compmove==='scissor')result='win';
else result='tie';
}



else if(taken==='paper'){
if(compmove==='paper') result='tie'; 
else if(compmove==='scissor')result='loss';
else result='win';
}   


else if( taken==='scissor'){
if(compmove==='paper')result='win';
else if(compmove==='scissor')result='tie';
else result='loss' 
}


if(result==='win')++score.win;
else if(result==='loss')++score.loss;
else ++score.tie;
localStorage.setItem('scoree',JSON.stringify(score));//local storage only support strings.
localStorage.setItem('resulty',result);
localStorage.setItem('moves',compmove);
localStorage.setItem('takenu',taken);

updateScore(result, taken,compmove);


}


//let win=0 , loose=0 , tie=0;
function updateScore(result, taken,compmove){
document.querySelector('.js-score')
.innerHTML= `
<span class="result-css">You ${result}.</span>
<br><br>
You<img src="./svgImages/${taken}-emoji.png"> <img src="./svgImages/${compmove}-emoji.png" >Computer
<br><br><br><br>
<span class="scores-css">Win:${score.win}, Losses:${score.loss}, Ties:${score.tie}</span>`;
}

function pickcompmpove(){
let compmove='';
const randomNo=Math.random();
if(randomNo>=1/3 && randomNo<2/3)compmove='paper';
else if(randomNo>=2/3 && randomNo<1)compmove='scissor';
else compmove='rock';// we can also return compmove
return compmove;
}
//const auto=()=>{not recommneded , cause below one is easier to read and it provide hoisitng}
function auto(){
  let taken='';
  const randomNo=Math.random();
  if(randomNo>=1/3 && randomNo<2/3)taken='paper';
  else if(randomNo>=2/3 && randomNo<1)taken='scissor';
  else taken='rock';// we can also return compmove
  return taken;
}
let intervalId;
function g(){
  if(document.querySelector('.js-auto').innerText==='Auto Play'){
    intervalId= setInterval(
     ()=>{  
    playgame(auto())},1000);
    document.querySelector('.js-auto').innerHTML='Stop Play';
  }
  else{ document.querySelector('.js-auto').innerHTML='Auto Play';
  clearInterval(intervalId);
  }
}
