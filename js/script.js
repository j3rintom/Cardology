var blackjackGame = {
    'YOU':{'scoreSpan':'#your-score','div':'#your-box','score':0},
    'DEALER':{'scoreSpan':'#dealer-score','div':'#dealer-box','score':0},
    'card':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]}
};
var wins=0,losses=0,draws=0;
const hitAudio = new Audio('assets/sounds/swish.m4a');
const winAudio = new Audio('assets/sounds/cash.m4a');
const looseAudio = new Audio('assets/sounds/aww.m4a');
const YOU = blackjackGame['YOU'];
const DEALER = blackjackGame['DEALER'];
document.querySelector('#bj-hit-btn').addEventListener('click',bjHit);
document.querySelector('#bj-deal-btn').addEventListener('click',bjDeal);
document.querySelector('#bj-stand-btn').addEventListener('click',bjStand);
function bjHit(){
    document.querySelector('#instructions').textContent='';
    document.querySelector('#you').style.opacity=1;
    document.querySelector('#dealer').style.opacity=1;
    let card = randomCard();
    showCard(YOU,card);
    updateScore(YOU,card);
}
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['card'][randomIndex];
}
function showCard(activePlayer,card){
    if(activePlayer['score']<21){
        let cardImage = document.createElement('img');
        cardImage.src='assets/images/'+card+'.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitAudio.play();
    }
}
function updateScore(activePlayer,card){
    if(card =='A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }

    }
    else{
            activePlayer['score']+=blackjackGame['cardsMap'][card];
    }
    showScore(activePlayer);
}
function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}
function bjDeal(){
    removeCards(YOU);
    removeCards(DEALER);
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-score').textContent=0;
    document.querySelector('#dealer-score').textContent=0;
    document.querySelector('#your-score').style.color='white';
    document.querySelector('#dealer-score').style.color='white';
    document.querySelector('#result').textContent='Lets Play!';
    document.querySelector('#result').style.color='black';
}
function removeCards(activePlayer){
    let images = document.querySelector(activePlayer['div']).querySelectorAll('img');
    for(i =0;i<images.length;i++){
        images[i].remove();
    }
}
function bjStand(){
    while(DEALER['score']<21){
        let card=randomCard();
        showCard(DEALER,card);
        updateScore(DEALER,card);
        showScore(DEALER);
        if(DEALER['score']>YOU['score']){
            break;
        }
    }
    let winner = computeWinner();
    switch(winner){
        case 'YOU' : document.querySelector('#result').textContent='YOU WON';
        winAudio.play();
        document.querySelector('#result').style.color='green';
        wins++;
        console.log(wins);
        document.querySelector('#wins').textContent=wins;
        break;
        case 'DEALER': document.querySelector('#result').textContent='YOU LOST';
        looseAudio.play();
        document.querySelector('#result').style.color='red';
        losses++;
        document.querySelector('#losses').textContent=losses;
        break;
        case 'DRAW' : document.querySelector('#result').textContent='YOU DREW';
        document.querySelector('#result').style.color='yellow';
        draws++;
        document.querySelector('#draws').textContent=draws;
        break;
    }
}
function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
            winner='YOU';
            console.log('YOU WON');
        }
        else if(YOU['score']< DEALER['score']){
            winner='DEALER';
            console.log('YOU LOOSE');
        }
        else if(YOU['score']===DEALER['score']){
            console.log('YOU DREW');
        }
    }
    else if(YOU['score']>21 && DEALER['sccore']<=21){
        winner = 'DEALER';
        console.log('You lost');
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log('YOU drew');
        winner = 'DRAW'
    }
    return winner;
}