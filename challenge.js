initialise();
var prevRoll,scores,roundScore,activePlayer,gamePlaying,lastDice,finalScore;


finalScore = document.querySelector('.final-score').value;

function initialise()
{   
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;  
    gamePlaying = true;  
    document.querySelector("#dice-1").style.display = 'none';
    document.querySelector("#dice-2").style.display = 'none';
    document.querySelector(".final-score").style.display = 'block';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;        
    document.getElementById('name-0').textContent="Player 1";
    document.getElementById('name-1').textContent="Player 2";  
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner'); 
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.add('active');
    if(finalScore === '')
    {
        finalScore = 100;
    }
}

function nextPlayer()
{
    activePlayer === 1 ? activePlayer=0:activePlayer=1;
    roundScore = 0; 
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

}

document.querySelector(".btn-roll").addEventListener('click', function(){
    document.querySelector('.final-score').style.display = 'none';
    if(gamePlaying)
    {
        //Random Number
        let dice1 = Math.floor(Math.random()*6)+1;
        let dice2 = Math.floor(Math.random()*6)+1;

        //Select the Dice Element and Display the result
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';  
        document.getElementById('dice-1').src = 'dice-'+dice1+'.png';
        document.getElementById('dice-2').src = 'dice-'+dice2+'.png';

        // Update Dice Score Until dice rolls to 1 

        if(dice1 !== 1 && dice2 !== 1)
        { //Add Score
            roundScore += (dice1+dice2);
            document.querySelector('#current-'+ activePlayer).textContent = roundScore; 
        }
        else
        { //Change Player      
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click',function(){

    document.querySelector('.final-score').style.display = 'none';

    if(gamePlaying)
    {
         //Add Current Score to Global Score
        scores[activePlayer] += roundScore;
        //Update the User Interface
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer]>=finalScore)
        {
            document.getElementById('name-'+activePlayer).textContent="WINNER!";
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-2').style.display='none'; 
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else
        {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click',initialise);


