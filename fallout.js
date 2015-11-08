'use strict';

(function() {
    //Add CRT screen lines
    var screenLines = document.createElement('div');
    screenLines.classList.add('fallout-screenlines');
    document.body.appendChild(screenLines);
    //Make changes to the story rows
    convertTableRows();
    //Change the previous and next buttons
    convertPrevNext();

    /**
     * @function convertTableRows
     * Removes unused elements from the DOM and adds extension specific classes
     * to those it does use for easier, and more thorough styling
     */
    function convertTableRows() {
        var list = document.getElementById('siteTable');
        [].forEach.call(list.getElementsByClassName('thing'), function(thing) {
            let rank = thing.getElementsByClassName('rank')[0];
            let vote = thing.getElementsByClassName('midcol')[0];
            let arrows = [].slice.call(vote.getElementsByClassName('arrow'));
            let score = document.createElement('div');
            let scores = [].slice.call(thing.getElementsByClassName('score'));
            let title = thing.querySelector('a.title');
            let comment = thing.getElementsByClassName('comments')[0];
            let subreddit = thing.getElementsByClassName('subreddit')[0] || document.createElement('span');
            let expando = thing.getElementsByClassName('expando')[0];
            //
            rank.classList.add('console-text', 'fallout-rank', 'fallout-cell');
            rank.classList.remove('rank');
            vote.innerHTML = '';
            arrows.forEach( (x) => vote.appendChild(x) );
            vote.classList.remove('midcol');
            vote.classList.add('fallout-vote', 'fallout-cell');
            scores.forEach( (x) => score.appendChild(x) );
            score.classList.add('console-text', 'fallout-score', 'fallout-cell');
            title.classList.add('console-text', 'fallout-title', 'fallout-cell');
            title.classList.remove('title');
            title.innerText = title.innerText.toUpperCase();
            if(title.innerText.length > 29) title.setAttribute('title', title.innerText);
            comment.innerText = '>>';
            comment.classList.add('fallout-comment', 'fallout-cell');
            if(subreddit) {
                subreddit.classList.add('console-text', 'fallout-subreddit', 'fallout-cell');
                subreddit.classList.remove('subreddit');
                subreddit.innerText = garbleText(subreddit.innerText.slice(3), 9, randomInt(3, 6), true);
            }
            //
            thing.classList.add('fallout-thing');
            thing.classList.remove('link');
            thing.innerHTML = '';
            thing.appendChild(rank);
            thing.appendChild(vote);
            thing.appendChild(score);
            thing.appendChild(title);
            thing.appendChild(comment);
            if(subreddit) thing.appendChild(subreddit);
        });
    }

    /**
     * @function convertPrevNext
     * Stylizes the Previous and Next buttons
     */
    function convertPrevNext() {
        var list = document.getElementById('siteTable');
        var newButtons = document.createElement('div');
        newButtons.classList.add('fallout-nextprev');
        [].forEach.call(document.querySelectorAll('.nextprev a'), function(button) {
            button.innerText = button.innerText.slice(0,4) === 'next' ? 'NEXT' : 'PREV';
            newButtons.appendChild(button);
        });
        list.replaceChild(newButtons, list.getElementsByClassName('nav-buttons')[0]);
    }

    /**
     * @function garbleText
     * Converts a given string into a broken and 'corrupted' string
     * @params {String} text String to garbleText
     * @params {Int} rtnLength length of the final string to return
     * @params {matchLength} length of substring to use from original string
     * @params {caps} true to UPPERCASE the return string
     * @return {String}
     */
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
