/** 
 * The pictures/values for the cards
 * Unicode characters were used so the client doesn't have to download the images. 
 * This improve loading time... less data has to be downloaded.
 * This is especially helpful for players who are in areas with poor internet connectivity.
 * The Unicode characters are displayed differently on different devices. This is a positive for uniqueness but a negative for consistency in design and experience.
 * @global
 */

const flowers = ['&#127801;', '&#127804;', '&#127803;', '&#127802;', '&#127989;', '&#127800;', '&#127803;', '&#127802;', '&#127808;', '&#127799;', '&#127799;', '&#127808;', '&#127800;', '&#127989;', '&#127804;', '&#127801;'];

/**
 * Keep track on whether the app was started or not
 * @global
 */
let start = false;

/**
 * Represents the timer.
 * I learnt how to set timeintervals and update html elements based on change in time from w3schools. 
 * Some of their codes was referenced for this purpose.
 * @class
 */

const timer = (function() {

    /**
     * Represents the number of seconds since the first card was flipped 
     * @memberof timer
     * @property {number}  0  number of seconds
     */
    let numSeconds = 0;

    /**
     * After the game has started, for every second, update the web-page to reflect how long since the game has started in seconds.
     * @memberof timer
     * @function
     */
    function updateTime() {
        document.getElementById("seconds").innerHTML = numSeconds;
        numSeconds++;
    }

    /** 
     * Since numSeconds is treated as a private membe of timer, this function is used to retrieve it whenever it is needed.
     * @memberof timer
     * @function
     */
    function getNumSeconds() {
        return numSeconds;
    }

    /**
     * Reset the time to 0 seconds
     * @memberof timer
     * @function
     */
    function resetTime() {
        numSeconds = 0;
        document.getElementById("seconds").innerHTML = numSeconds;
    }



    return {
        updateTime: updateTime,
        getNumSeconds: getNumSeconds,
        resetTime: resetTime
    }


})();


/**
 * Stores the time controller - used by setTimeInterval - start and stop time
 * @global
 */

let time;


/**
 * @description Display the cards on the page:
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/**
 * Store functions that can be used to perform some general actions
 * @class
 */
const ultility = (function() {


    /**
     * Shuffle the cards
     * Shuffle function is from http://stackoverflow.com/a/2450976
     * @memberof ultility
     * @function
     */
    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return {
        shuffle: shuffle
    };
}());




/*
 * @description set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
 * Keep track of all the moves that the player has made. 
 * It also keep track of the incorrect moves. After some incorrect moves the stars will decrement
 * @class
 */

const move = (function() {

    /**
     * Represents the number of moves or how many times a player turned over a card since the game started
     * @memberof move
     * @property {number}  0  number of moves
     */

    let moves = 0;

    /**
     * Represents the number of moves or how many times a player flipped over a non-match pair of cards
     * @memberof move
     * @property {number}  0  number of incorrect moves
     */

    let inCorrectMoves = 0;

    /**
     * Increment the number of moves the player ade
     * @memberof move
     * @function
     */

    function addMove() {
        moves++;
    }

    /**
     * Increment the number of times a player flipped over a non-match pair of cards
     * @memberof move
     * @function
     */

    function addIncorrectMove() {
        inCorrectMoves++;
    }

    /**
     * Returns the number of times a player flipped over a non-match pair of cards
     * @memberof move
     * @function
     */

    function getIncorrectMoves() {
        return inCorrectMoves;
    }

    /**
     * Update the UI every time a player makes a move
     * @memberof move
     * @function
     */
    function updateMoves() {
        let movesSpan = document.getElementById('moves');
        movesSpan.innerHTML = moves;
    }

    /**
     * Returns the number of moves the player made
     * @memberof move
     * @function
     */

    function getMoves() {
        return moves;
    }

    /**
     * Reset the number of moves to zero
     * @memberof move
     * @function
     */
    function resetMoves() {
        moves = 0;
        updateMoves();
        inCorrectMoves = 0;
    }

    return {
        addMove: addMove,
        addIncorrectMove: addIncorrectMove,
        getIncorrectMoves: getIncorrectMoves,
        updateMoves: updateMoves,
        getMoves: getMoves,
        resetMoves: resetMoves
    }

})();


/**
 * Keep track of the stars 
 * @class
 */

const star = (function() {

    /**
     * Represents the number of stars the player currently has
     * @memberof star
     * @property {number}  3  number of stars
     */

    let stars = 3;

    /**
     * Check and return how many stars the player actually has based on the number of times he/she has made incorrect pairing of cards
     * @memberof star
     * @function
     */

    function getRemainingStars() {
        if (move.getIncorrectMoves() <= 8) {
            return 3;
        } else if (move.getIncorrectMoves() > 8 && move.getIncorrectMoves() <= 12) {
            return 2;
        } else if (move.getIncorrectMoves() > 12) {
            return 1;
        }
    }

    /**
     * If the player now has fewer stars will update the UI to reflect the number of stars the player actually has
     * @memberof star
     * @function
     */
    function updateStars() {
        let tempStars = getRemainingStars();
        if (stars !== tempStars) {
            if (tempStars === 2) {
                let star3 = document.getElementById('star3');
                star3.classList.add('blur');

            } else if (tempStars === 1) {
                let star2 = document.getElementById('star2');
                star2.classList.add('blur');

            }
        }
    }

    /**
     * Reset the stars on the UI to show that the player has all of his/her stars
     * @memberof star
     * @function
     */

    function resetStars() {
        let starElements = document.getElementsByClassName('star');
        for (aStar of starElements) {
            aStar.classList.remove('blur');
        }
    }

    return {
        updateStars: updateStars,
        resetStars: resetStars
    };


})();

/**
 * Deals with the wining screen - after the player has successfully completed the game
 * @class
 */
const winning = (function() {

    /**
     * Create and display the winning screen to the user. 
     * It fades out the player's playing board and display the winning screen:
     * Tell the player he has won and display link to play again.
     * The winning screen display one of the flowers in the games for decoration three times.
     * The number of moves, stars and seconds the player has at the end of the game. 
     * @memberof winning
     * @function
     */
    function createWinningScreen() {

        let board = document.getElementById('board');
        board.classList.add('blur');

        let winningBanner = document.getElementById('winningMat');
        winningMat.classList.remove('hide');
        winningMat.classList.add('show');

        let winningTokens = document.getElementById('winningMat__token');
        winningTokens.innerHTML = ` ${flowers[1]} ${flowers[1]} ${flowers[1]} `;

        let starsContent = document.getElementById('stars');
        let winningStars = document.getElementById('winningMat__stars');

        winningStars.innerHTML = starsContent.innerHTML;

        document.getElementById('winningMat__moves').innerHTML = `${move.getMoves()} moves`;

        document.getElementById('winningMat__seconds').innerHTML = `${document.getElementById('seconds').innerHTML} seconds`;
    }

    /**
     * If the player wishes to replay the game the winning screen is hidden from sight so that the player can get access to the playing board. 
     * @memberof winning
     * @function
     */

    function resetWin() {
        let board = document.getElementById('board');
        board.classList.remove('blur');

        let winningBanner = document.getElementById('winningMat');
        winningMat.classList.remove('show');
        winningMat.classList.add('hide');


    }

    return {
        createWinningScreen: createWinningScreen,
        resetWin: resetWin
    };

})();

/**
 * Represents a card and all of its functionalities
 * @class
 */

const card = (function() {

    /**
     * After the player has flipped a pair of cards check to see if the pairs match or not.
     * If the pair doesn't match then have to flip back both cards. Therefore, flipBackBoth = true else flipBackBoth = false
     * @memberof card
     * @property {boolean}  3  
     */

    let flipBackBoth = false;

    /**
     * In a pair, keep track of the the first card flipped.
     * @memberof card
     * @property {number}    
     */

    let firstCardId;

    /**
     * When a card is fliiped check if it is first move of the pairs.
     * @memberof card
     * @property {number}    
     */
    let firstMove = true;

    /**
     * Keep track of all the correct matched pairs the player made.
     * When the player has reached 8 matched pairs the player has won the game.
     * @memberof card
     * @property {number} 0
     */
    let matchedPairs = 0;

    /**
     * Reset cards to their default setting. Used to replay the game.
     * @memberof card
     * @function
     */

    function resetCard() {
        flipBackBoth = false;
        firstCardId = undefined;
        firstMove = true;
        matchedPairs = 0;
    }

    /**
     * When a card is flipped is used to check if a pair was flipped and whether there was a match or not.
     * @memberof card
     * @function
     */

    function compareCards(card) {
        let matched = false;
        if (firstMove) {

            //game has started so set the timer
            if (!start) {
                time = setInterval(timer.updateTime, 1000);
                start = true;
            }
            //first move or new pair of move
            //therefore, nothing to compare
            //store result and set firstMove to cater for secondMove of the new pair

            firstCardId = card.id;
            firstMove = false;
            flipBackBoth = false;
        } else {
            //second move of the pair
            //when a pair of card is flipped the number of moves is updated
            move.addMove();
            move.updateMoves();
            //compare card to the first card of the pair
            let firstCard = document.getElementById(firstCardId);
            if (firstCard.getAttribute("value") === card.getAttribute("value")) {
                //a matching pair
                //therefore, points will be rewarded
                flipBackBoth = false;
                matched = true;
                matchedPairs++;
            } else {
                //did not get it right for this pair
                //so this flag will single to flip back both cards
                flipBackBoth = true;
            }


            //still have to reset values to cater for next moves
            firstMove = true;

        }

        return matched;
    }

    /**
     * Update UI to show card is flipped.
     * @memberof card
     * @function
     */

    function flipCard(card) {
        card.classList.remove('final-flip');
        card.classList.remove('is-flipped');
        window.requestAnimationFrame(function() {
            card.classList.add('is-flipped');
        });
    }

    /**
     * After the first card of the card is flipped keep the value part on display
     * @memberof card
     * @function
     */

    function showCard(card) {

        card.classList.remove('final-flip');
        card.classList.remove('is-flipped');
        window.requestAnimationFrame(function() {
            card.classList.add('final-flip');
        });
    }

    /**
     * When a card is flipped will initialize checking for pair and also if the player has unveiled pairs.
     * @memberof card
     * @function
     */
    function checkForPair(card) {

        //alert(card.getAttribute("matched"));

        let alreadyMatched = card.getAttribute("matched");

        if (alreadyMatched == '1' || card.id === firstCardId) {
            return;
        }

        //move.addMove();
        //move.updateMoves();

        if (firstMove) {
            card.classList.add('final-flip');
        }


        let win = false;

        //if win will remove event listener
        win = compareCards(card);

        let firstCard = document.getElementById(firstCardId);


        if (win) {

            card.classList.add('final-flip');
            //firstCard.classList.add('final-flip');

            card.setAttribute('matched', '1');
            firstCard.setAttribute('matched', '1');

            if (matchedPairs == 8) {
                clearTimeout(time);
                winning.createWinningScreen();
            }
            return;
        } else {

            if (flipBackBoth) {
                move.addIncorrectMove();
                star.updateStars();

                flipCard(card);
                flipCard(firstCard);
                firstCardId = undefined;

            }


        }

    }

    /**
     * Create the UI for the front of the card or the default/cover side. 
     * @memberof card
     * @function
     */

    function createCardFront() {

        const front = document.createElement("div");
        front.classList.add('card__face');
        front.classList.add('card__face--front');
        front.innerHTML = '&#128144;';
        return front;
    }

    /**
     * Create the UI for the back of the card or the side with the actual value.
     * @memberof card
     * @function
     */
    function createCardBack(picture) {

        const back = document.createElement("div");
        back.classList.add('card__face');
        back.classList.add('card__face--back');
        back.innerHTML = picture;
        return back;
    }

    /**
     * For the UI, create a card with its front and back sides. 
     * @memberof card
     * @function
     */

    function createCard(picture, id) {
        const cardHolder = document.createElement("div");
        cardHolder.classList.add('card-holder');

        const card = document.createElement("div");
        card.id = id;
        card.setAttribute('value', picture);
        card.setAttribute('matched', '0');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.classList.add('card');

        let front = createCardFront();
        let back = createCardBack(picture);

        card.append(front);
        card.append(back);

        card.addEventListener('click', function() {
            checkForPair(card);

        });
        
        card.addEventListener('keypress', function(e) {
           	if (e.key === 'Enter' || e.keyCode === 13) {
      			// code for enter
      			checkForPair(card);
    		}            
        });


        cardHolder.append(card);
        return cardHolder;
    }


    return {
        createCard: createCard,
        resetCard: resetCard

    };
}());


/**
 * A board with cards.
 * @class
 */

const board = (function() {

    /**
     * Clear the board
     * @memberof board
     * @function
     */

    function resetBoard() {
        let boardElement = document.getElementById('board');
        boardElement.innerHTML = "";
    }

    /**
     * Display a new set of shuffled cards.
     * @memberof board
     * @function
     */
    function prepareBoard() {
        ultility.shuffle(flowers);
        let i = 0;
        while (i < 16) {

            let board = document.getElementById("board");
            board.append(card.createCard(flowers[i], i));

            i++;
        }

    }
    return {
        prepareBoard: prepareBoard,
        resetBoard: resetBoard
    };
}());


/**
 * A controller to initialize and reset the game.
 * @class
 */

const init = (function() {

    /**
     * Initialize the game
     * @memberof init
     */
    function play() {
        board.prepareBoard();
        let replayElement = document.getElementById('replay');
        replayElement.addEventListener('click', function() {
            replay();

        });

    }

    /**
     * Replay the game
     * @memberof init
     */

    function replay() {
        //clear timer
        clearTimeout(time);
        //reset time
        timer.resetTime();
        //clear out all of the cards and hopefully their events
        board.resetBoard();
        start = false;
        move.resetMoves();
        star.resetStars();
        card.resetCard();
        board.prepareBoard();
        winning.resetWin();
    }

    return {
        play: play
    }



})();


/** The game starts */
init.play();