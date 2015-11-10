'use strict';

(function() {
    //Add CRT screen lines
    let screenLines = document.createElement('div');
    screenLines.classList.add('fallout-screenlines');
    document.body.appendChild(screenLines);
    //Create and swap the header
    let oldHeader = document.getElementById('header');
    let newHeader = convertHeader();
    oldHeader.parentNode.replaceChild(newHeader, oldHeader);
    //Create and swap the siteTables
    let oldTable = document.getElementById('siteTable');
    let newTable = convertTableRows();
    let newNav = convertPrevNext();
    newTable.appendChild(newNav);
    oldTable.parentNode.replaceChild(newTable, oldTable);
    //Create and swap the sidebar
    let oldSide = document.getElementsByClassName('side')[0];
    let newSide = convertSidebar();
    oldSide.parentNode.replaceChild(newSide, oldSide);


    function convertHeader() {
        let newHeader = document.createElement('div');
        newHeader.id = 'ftHeader';
        newHeader.classList.add('ft-header');
        let title = document.createElement('div');
        let titleLink = document.createElement('a');
        titleLink.innerText = 'REDDIT INDUSTRIES (TM) TERMLINK PROTOCOL';
        titleLink.setAttribute('href', 'https://www.reddit.com/');
        titleLink.classList.add('ft-console', 'ft-site-title');
        title.appendChild(titleLink);
        newHeader.appendChild(title);
        if(document.getElementById('login-popup')) {
            let login = document.createElement('div');
            let loginLink = document.createElement('a');
            loginLink.innerText = 'ENTER PASSWORD NOW';
            loginLink.setAttribute('href', 'https://www.reddit.com/login');
            loginLink.classList.add('ft-console', 'ft-login');
            login.appendChild(loginLink);
            newHeader.appendChild(login);
            let tries = document.createElement('div');
            tries.innerText = '4 ATTEMPT(S) LEFT: ◼ ◼ ◼ ◼';
            tries.classList.add('ft-console', 'ft-tries');
            newHeader.appendChild(tries);
        }
        //
        return newHeader;
    }


    function convertTableRows() {
        let newSt = document.getElementById('siteTable').cloneNode(false);
        newSt.id = 'ftSiteTable';
        let fragment = document.createDocumentFragment();
        Array.from(document.querySelectorAll('#siteTable .thing'), (thing) => {
            let newThing = thing.cloneNode(false);
            newThing.classList.remove('link');
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
            let comment = document.createElement('a');
            comment.innerText = '>>';
            comment.setAttribute('href', thing.getElementsByClassName('comments')[0].getAttribute('href'));
            comment.classList.add('ft-console', 'ft-cell', 'ft-comment');
            newThing.appendChild(comment);
            let sub =   thing.getElementsByClassName('subreddit')[0] ||
                        document.createElement('div');
            sub.innerText = garbleText(sub.innerText.slice(3), 9, 5, true);
            sub.classList.remove('subreddit');
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
        let fillerChars = [ '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                            '{', '}', '[', ']', '<', '>', '?', '/', '\\', '.'];
        let rtnString = text.slice(0, matchLength || rtnLength / 2 || text.length / 2);
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


    function convertSidebar() {
        let newSide = document.createElement('div');
        newSide.id = 'ftSidebar';
        newSide.classList.add('ft-sidebar', 'ft-console');
        let search = document.querySelector('.side #search input[type=text]');
        search.classList.add('ft-console', 'ft-search');
        newSide.appendChild(search);
        let submitLink = document.querySelector('.side .submit-link a');
        submitLink.classList.add('ft-console', 'ft-button', 'ft-submit');
        newSide.appendChild(submitLink);
        let submitText = document.querySelector('.side .submit-text a');
        submitText.classList.add('ft-console', 'ft-button', 'ft-submit');
        newSide.appendChild(submitText);
        let create = document.querySelector('.side .create a');
        create.classList.add('ft-console', 'ft-button', 'ft-submit');
        newSide.appendChild(create);
        //
        return newSide;
    };

})();
