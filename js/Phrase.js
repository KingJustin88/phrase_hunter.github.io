
class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    // grabbing the phrase and displaying it by appending it
    addPhraseToDisplay() {
        let displayHTML = ``;
        for (let i = 0; i < this.phrase.length; i++) {
            if (this.phrase[i] === " ") {
                displayHTML += `<li class="hide show"></li>`;
            } else {
                displayHTML += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
              }
        }
        $("#phrase ul").append(displayHTML);
    }
 
    // checking letter and matching it with the phrase
    checkLetter(letter) {
        return this.phrase.match(letter);
    }

    // grabbing the matched letter and displaying it 
    showMatchedLetter(letter) {
        const letterElements = document.getElementsByClassName(letter);
        for (let i = 0; i < letterElements.length; i ++) {
            letterElements[i].classList.add('show');
        }
    }
}
