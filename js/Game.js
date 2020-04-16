
class Game {
    constructor() {
      this.missed = 0;
      this.phrases = ['do or do not, there is no try',
                      'just do it',
                      'mind over matter',
                      'flow like water',
                      'what goes around comes around'];
      this.phraseClass = '';
    }

    // gets random phrase
    getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length);
        this.chosenPhrase = this.phrases[randomNum];
        return this.chosenPhrase;
    }

    // handles the letter check, the right/wrong letters 
    // if wrong then stores into a targetLetter variable to active removeLife()
    // which will be sent to class wrong and show the letter is wrong, therefore lose a heart
    handleInteraction(e, letter) {
        const letterIsInPhrase = this.phraseClass.checkLetter(letter);
        if (letterIsInPhrase) {
            this.phraseClass.showMatchedLetter(letter);
            this.checkForWin();
        } else {
            if (e) {
                const wrongInputs = document.querySelectorAll('.wrong');
                if (wrongInputs) {
                    for (let i = 0; i < wrongInputs.length; i ++) {
                        if (wrongInputs[i].textContent === letter) {
                            return false;
                        }
                    }
                }
                const buttonElements = document.querySelectorAll('.key');
                let keyLetter;
                for (let i = 0; i < buttonElements.length; i ++) {
                    if (buttonElements[i].textContent === letter) {
                        keyLetter = buttonElements[i];
                    }
                }
                keyLetter.classList.add('wrong');
            }   else {
                    e.target.classList.add('wrong');
                }
                this.removeLife();
        } 
    }

    // add a miss to every wrong letter to remove hearts
    // locate the liveHeart using eq to select index as it increases and
    // replace with lostHeart
    // when missed is at 5 gameover() will be called with a message
    removeLife() {    
        this.missed += 1;
        for (let i = 0; i < this.missed; i++) {        
            $(".tries img")
                .eq(i)
                .queue(function(next) {
                    $(this).attr("src", "images/lostHeart.png");
                    next();
                });
        }  
        if(this.missed === 5) {
            this.gameOver('Sorry, good effort!')
        }
    }

    // check if the phrase matches, then display win message
    checkForWin() {   
        const showCount = $('.show').length;
        const letterCount = this.phraseClass.phrase.length;
        if (letterCount === showCount) {
            this.gameOver(`You won! The phrase was <i>"${this.chosenPhrase}"</i>`);
        } 
    }

    // fade the overlay, show message, reset button
    gameOver(message) {    
        $('#overlay').fadeIn(1000);
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('game-over-message').innerHTML = message;
        document.getElementById('btn__reset').textContent = 'Try Again!';
    }

    // start game with reset button to reload to the start screen
    // get new phrase, display it, then fade into the overlay
    startGame() {       
        if (document.getElementById('btn__reset').textContent === 'Try Again!') {
            window.location.reload(true);
            return false;
        }        
        const phrase = this.getRandomPhrase();
        this.phraseClass = new Phrase(phrase);
        this.phraseClass.addPhraseToDisplay();
        $('#overlay').fadeOut(1000);
    }
}