
const game = new Game();

// start game
function gameStart() {  
    game.startGame();
}
 
// create a function to grab keys when clicked onscreen
// call handleInteraction() to confirm the clicked on is matched, if passed then 
// checked by regex as lowercase and match as an actual letter
// then check keyboard clicked on is matched
// call handleInteraction() to confirm matched letter
function markButton(e) {  
    if (e.target.tagName === 'BUTTON') {     
        const letter = e.target.textContent
        const clickLetter = e.target;
        clickLetter.setAttribute('disabled', 'true');
        clickLetter.classList.add('chosen');
        game.handleInteraction(e, letter);

    } else if(e.target.tagName === 'DIV') { 
        
        return null; 
    
    } else if (e) {
        const input = e.key.toLowerCase();
        const letterReg = /[a-z,]/g;
        const inputIsLetter = input.match(letterReg);

        if (inputIsLetter) {
            const buttonElements = document.querySelectorAll('.key');
            let keyLetter;

            for (let i = 0; i < buttonElements.length; i ++) {
                if (buttonElements[i].textContent === input) {
                    keyLetter = buttonElements[i];
                }
            }
            keyLetter.setAttribute('disabled', 'true');
            keyLetter.classList.add('chosen');
            game.handleInteraction(e, input);
        }
    }
}
// create addEventListener for mouse clicks and keyboard selections
document.getElementById('btn__reset').addEventListener('click', gameStart);
document.getElementById('qwerty').addEventListener('click', markButton);
document.addEventListener("keypress", markButton);

