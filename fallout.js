'use strict';

(function() {
    //Add CRT screen lines
    let screenLines = document.createElement('div');
    screenLines.classList.add('fallout-screenlines');
    document.body.appendChild(screenLines);
    //Make changes to the story rows
    let oldTable = document.getElementById('siteTable');
    let newTable = convertTableRows();
    //Change the previous and next buttons
    let newNav = convertPrevNext();
    newTable.appendChild(newNav);
    //Swap tables
    oldTable.parentNode.replaceChild(newTable, oldTable);

    function convertTableRows() {
        var newSt = document.getElementById('siteTable').cloneNode(false);
        newSt.id = 'ftSiteTable';
        var fragment = document.createDocumentFragment();
        Array.from(document.querySelectorAll('#siteTable .thing'), (thing) => {
            let newThing = thing.cloneNode(false);
            newThing.classList.add('ft-thing');
            let rate = document.createElement('div');
            rate.innerText = thing.getElementsByClassName('rank')[0].innerText;
            rate.classList.add('ft-console', 'ft-cell', 'ft-rank');
            newThing.appendChild(rate);
            let vote = document.createElement('div');
            Array.from(thing.getElementsByClassName('arrow')).forEach((arrow) => {
                vote.appendChild(arrow);
            });
            vote.classList.add('ft-cell', 'ft-vote');
            newThing.appendChild(vote);
            let score = document.createElement('div');
            score.innerText = thing.querySelector('.score.unvoted').innerText;
            score.classList.add('ft-console', 'ft-cell', 'ft-score');
            newThing.appendChild(score);
            let title = thing.querySelector('a.title');
            let newTitle = document.createElement('a');
            newTitle.innerText = title.innerText.toUpperCase();
            newTitle.setAttribute('href', title.getAttribute('href'));
            newTitle.setAttribute('title', newTitle.innerText);
            newTitle.classList.add('ft-console', 'ft-cell', 'ft-title');
            newThing.appendChild(newTitle);
            let sub =   thing.getElementsByClassName('subreddit')[0] ||
                        document.createElement('div');
            sub.innerText = garbleText(sub.innerText.slice(3), 9, 5, true);
            sub.classList.add('ft-console', 'ft-cell', 'ft-sub');
            newThing.appendChild(sub);
            //
            fragment.appendChild(newThing);
        });
        //
        newSt.appendChild(fragment);
        return newSt;
    }


    function convertPrevNext() {
        let newNav = document.createElement('div');
        newNav.classList.add('ft-thing', 'ft-nav');
        Array.from(document.querySelectorAll('#siteTable .nextprev a')).forEach((button) => {
            let newButton = document.createElement('a');
            newButton.innerText = button.innerText.toUpperCase().match(/[A-Z]+/g)[0];
            newButton.setAttribute('href', button.getAttribute('href'));
            newButton.classList.add('ft-console', 'ft-cell', 'ft-nav');
            newNav.appendChild(newButton);
        });
        return newNav;
    }


    function garbleText(text, rtnLength, matchLength, caps) {
        var fillerChars = [ '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                            '{', '}', '[', ']', '<', '>', '?', '/', '\\', '.'];
        var rtnString = text.slice(0, matchLength || rtnLength / 2 || text.length / 2);
        while(rtnString.length < rtnLength) {
            if(randomInt(0, 2) === 1) {
                rtnString = rtnString + fillerChars[randomInt(0, fillerChars.length)];
            } else {
                rtnString = fillerChars[randomInt(0, fillerChars.length)] + rtnString;
            }
        }
        if (caps) {
            rtnString = rtnString.toUpperCase();
        }
        return rtnString;
    };


    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

})();
