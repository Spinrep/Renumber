
//bots

const bot1 = document.getElementById("bot1");
const bot2 = document.getElementById("bot2");
const bot3 = document.getElementById("bot3");
const bot4 = document.getElementById("bot4");



//variables


const bots = document.getElementsByClassName("bots");
const stats = document.getElementById("stats");

const nameBot = document.getElementById("name");
const imgBot = document.getElementById("statimg");
const numbersMemorize = document.getElementById("numbers");
const descriptionBot = document.getElementById("description");
const pointsBot = document.getElementById("points");
const gameImg = document.getElementById("imgGamePhoto");
const gameImg2 = document.getElementById("imgGamePhoto2");
const nameGame = document.getElementById("characterNameGame");
const returnButton = document.getElementById("return");
const returnButton2 = document.getElementById("return2");
const numbersGame = document.getElementById("numbersGame");
const descriptionGame = document.getElementById("descriptionGame");
const pointsGame = document.getElementById("pointsGame");
const playButton = document.getElementById("playButton");
const imgBotRealGame = document.getElementById("imgGamePhoto2");

//variables just of the game

let isfirst = 1;
let fullnumber;
let randomDigit;
let who;
let timesGoClicked;
var inputElement = document.getElementById("numberInput");
var inputValue = inputElement.value;

const morepoints = document.getElementById("pointsmore");
const fullpoints = document.getElementById("pointsLink");
const lostText = document.getElementById("lesspoints");
const returnButton3 = document.getElementById("return3");
const returnButton4 = document.getElementById("return4");
const newnumberText = document.getElementById("newnumber");
const goButton = document.getElementById("apllyButton")

//points 



let points = localStorage.getItem("pointstotal");


const botsArray = [
    
    {name : "Kid alien",
    img : "marciano.png",
    numbers : Math.floor(Math.random() * (6 - 3 + 1)) + 3, //3-6//
    description : "Hello from Mars, my parents took me here, im trying to learn Renumber but i dont have a very good memory !",
    points : "10 points",
    pointsnum : 10,
    numbersMemorize : "3-6"
  
    },

    {name : "Julian",
    img : "angry.png",
    numbers : Math.floor(Math.random() * (8 - 4 + 1 )) + 4 , //4-8//
    description : "Let's play fast, im so busy with my job, i can't spend too many time here",
    points : "12 points",
    pointsnum : 12,
    numbersMemorize : "4-8"
    },

    {name : "Saibaman",
    img: "saibaman.png",
    numbers : Math.floor(Math.random() * (10 - 6 + 1 )) + 6 , //6-10//,
    description : "Im better at fighthing but lets try to play this ",
    points : "15 points",
    pointsnum : 15,
    numbersMemorize : "6-10"
    },
    {
    name : "Teen Alien",
    img: "teenalien.png",
    numbers : Math.floor(Math.random() * (12 - 8 + 1 )) + 8 , //8-12//,
    description : "Did you beat my brother? Try now with me! ",
    points : "20 points",
    pointsnum : 20,
    numbersMemorize : "8-12"
    },
 
];

//times they have clicked GO
//play button 

updatepoints();
playButton.addEventListener("click", () => playGame())

//return button

returnButton.addEventListener("click", () => returnAction())
returnButton2.addEventListener("click", () => returnToStast())
returnButton3.addEventListener("click", () => returnToStast())
returnButton4.addEventListener("click", () => returnToStast())

inputElement.addEventListener('input', function() {
    // Verificar si el valor del input no está vacío
    if (inputElement.value.trim() !== '') {
        apllyButton.style.display = 'block'; // Mostrar el div si no está vacío
    } else {
        apllyButton.style.display = 'none'; // Ocultar el div si está vacío
    }
}); 




//bots click

for(i=0;i<bots.length;i++)
{
    bots[i].addEventListener("click", () => play())
}

function play(){
   botsandstats.style.display = "none";
   game.style.display = "block"; 
}


//show game

function gameUpdate(botSelectedClick){
    gameImg.src = botSelectedClick["img"];
    nameGame.innerText = botSelectedClick["name"];
    numbersGame.innerText = "Memorize " + botSelectedClick.numbersMemorize + " numbers";
    descriptionGame.innerText = botSelectedClick["description"];
    pointsGame.innerText =  botSelectedClick["points"]
    imgBotRealGame.src = botSelectedClick["img"];
    console.log(botSelectedClick)
     

}


//Show stats

function update(botSelected){
    nameBot.innerText = botSelected["name"];
    imgBot.src = botSelected["img"];
    numbersMemorize.innerText = "Memorize " + botSelected.numbersMemorize + " numbers";
    descriptionBot.innerText = botSelected["description"];
    pointsBot.innerText = botSelected["points"];
    stats.style.display = "block";

    for(i=0;i<bots.length;i++)
    {
        bots[i].addEventListener("mouseout", () => 
        {
        stats.style.display = "none";
        });
    }

}

//each bot hover

bot1.addEventListener("mouseover", () => update(botsArray[0]))
bot2.addEventListener("mouseover", () => update(botsArray[1]))
bot3.addEventListener("mouseover", () => update(botsArray[2]))
bot4.addEventListener("mouseover", () => update(botsArray[3]))



//each bot click

bot1.addEventListener("click", () => { gameUpdate(botsArray[0]); who = 0})
bot2.addEventListener("click", () => { gameUpdate(botsArray[1]); who = 1})
bot3.addEventListener("click", () => { gameUpdate(botsArray[2]); who = 2})
bot4.addEventListener("click", () => { gameUpdate(botsArray[3]); who = 3})



goButton.addEventListener("click", () => {
    timesGoClicked=timesGoClicked+1;
    inputValue = inputElement.value;
    if (!checksamenumber()) return;
    inputElement.value = "";
    console.log(timesGoClicked);
    createNewNumber()
    if(timesGoClicked==botsArray[who].numbers)
        {
            win();
        }

});

//return function

function returnAction(){
    botsandstats.style.display = "flex";
    game.style.display = "none"; 
}


function playGame(){
    inputElement.value = "";
    isfirst = 1;
    timesGoClicked = 0;
    console.log(timesGoClicked)
    apllyButton.style.display = 'none';
    game.style.display = "none";
    renumberGame.style.display = "block";
    realgame();
}

function returnToStast(){
    wind.style.display = "none";
    lostd.style.display = "none";
    game.style.display = "block";
    renumberGame.style.display = "none";
}


function realgame(){

     createNewNumber()
}

function createNewNumber(){
    
    if(isfirst)
    {
    firstnumber();
    }

    else{
    console.log("is not first")
    randomDigit = Math.floor(Math.random() * 10);
    fullnumber = fullnumber.toString() + randomDigit.toString();
    console.log(randomDigit + " random digit");
    console.log(fullnumber + " full number");
    }
 

    updateNumber(randomDigit);
    
}

function updateNumber(number){
    newnumberText.innerHTML = number; 
}

function firstnumber()
{
    randomDigit = Math.floor(Math.random() * 10);
    fullnumber = randomDigit
    isfirst = 0;
    console.log("first")
    console.log(randomDigit + " random digit");
    console.log(fullnumber + " full number");
}

function checksamenumber(){
    console.log(inputValue + " input value " + fullnumber);
    if(inputValue!=fullnumber)
        {
            lost();
            return false;
        }

        return true;
}

function lost(){
    lostd.style.display = "block";
    renumberGame.style.display = "none";
    lostText.innerHTML  = "You just lost " + botsArray[who].pointsnum + " points from " + botsArray[who].name;
    points = localStorage.getItem("pointstotal");
    points = points - botsArray[who].pointsnum;
    localStorage.setItem("pointstotal", points);

    updatepoints();
}
function win(){
    wind.style.display = "block";
    renumberGame.style.display = "none";
    morepoints.innerHTML = "You just win "+ botsArray[who].pointsnum + " points from " + botsArray[who].name;
    points = localStorage.getItem("pointstotal");
    points = parseInt(points) + botsArray[who].pointsnum;
    localStorage.setItem("pointstotal", points);

    updatepoints();
}

function updatepoints(){
    fullpoints.innerHTML = points + " points";
}