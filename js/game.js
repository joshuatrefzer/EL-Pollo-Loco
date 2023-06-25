let canvas;
let ctx;
let keyboard = new Keyboard();
let world;
let gameIsStarted = false;
let beforeMuted = false;
let isHorizontal = false;
let muted = false;
let fullscreenActive = false;

/**
 * Start game, set world..
 */
function init() {
    initLevel();
    gameIsStarted = true;
    removeScreen('startscreen');
    removeScreen('help');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    if (beforeMuted) {
        muteAllAudio();
    }
    getMobileButtons();
}


/**
 * get fullscreen on canvas
 * @param {element} element 
 */
function getFullScreen(element) {
    element.classList.add('fullscreen-dates');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * check if fullscreen is active, and start resulting actions after
 */
function checkForFullscreen() {
    const canvasDates = document.querySelectorAll('.canvas-dates');
    const buttonCenter = document.querySelectorAll('.button-center');
    if (!fullscreenActive) {
        getAllElementsFullScreen(canvasDates, buttonCenter);
    } else {
        exitFullscreen();
        endFullscreen();
    }
}


/**
 * Exit from fullsreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * changing elements for fullscreen-mode
 * @param {elements} canvasDates 
 * @param {elements} buttonCenter 
 */
function getAllElementsFullScreen(canvasDates, buttonCenter) {
    fullscreenActive = true;
    canvasDates.forEach((element) => {
        element.classList.add('fullscreen-dates');
    });
    buttonCenter.forEach((element) => {
        element.style = 'width: 100vw';
    });
    document.getElementById('canvas').classList.add('fullscreen-dates');
    getFullScreen(document.getElementById('content'));
}

/**
 * change elements to fit in, after fullscreen
 */
function endFullscreen() {
    const canvasDates = document.querySelectorAll('.canvas-dates');
    const buttonCenter = document.querySelectorAll('.button-center');
    fullscreenActive = false;
    canvasDates.forEach((element) => {
        element.classList.remove('fullscreen-dates');
    });
    buttonCenter.forEach((element) => {
        element.style = 'width: 100%';
    });
    document.getElementById('canvas').classList.remove('fullscreen-dates');
    document.getElementById('content').classList.remove('fullscreen-dates');
}

/**
 * check if the fullscreen-mode is active or not.
 */
document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
        endFullscreen();
    }
});




/**
 * check if smartphone is horizontal, if yes => remove "flip your phone"
 */
function getHorizontalUpdate() {
    isHorizontal = JSON.parse(localStorage.getItem('isHorizontal'));
    if (isHorizontal) {
        document.getElementById('flip-your-phone').classList.add('d-none');
    }
}

/**
 * is called "onload", an checks if the beforeMuted variable is true, after get it from LS
 */
function getMuteUpdate() {
    muted = false;
    beforeMuted = JSON.parse(localStorage.getItem('beforeMuted'));
    let button = document.getElementById('mute-img');
    if (beforeMuted) {
        button.src = 'img/mute.png';
    }
}

/**
 * shows help screen
 */
function help() {
    let container = document.getElementById('help-screen');
    container.classList.remove('d-none');

}

/**
 * onclick function for a button in the "help" section
 */
function backToMenu() {
    removeScreen('help-screen');

}

/**
 * Removes elements from screen. 
 * @param {'string'} id 
 */
function removeScreen(id) {
    document.getElementById(id).classList.add('d-none');
}

function getScreen(id) {
    document.getElementById(id).classList.remove('d-none');
}

/**
 * Check things before all is mute or not.
 */
function muteAllAudio() {
    let button = document.getElementById('mute-img');
    if (gameIsStarted) {
        if (!muted) {
            mute(button);
            beforeMuted = true;
            localStorage.setItem('beforeMuted', JSON.stringify(beforeMuted));
        } else {
            unmute(button);
            beforeMuted = false;
            localStorage.setItem('beforeMuted', JSON.stringify(beforeMuted));
        }
    } else {
        changeMutebutton(button);
    }
}

/**
 * Unmutes all audio in the game.
 * @param {element} button 
 */
function unmute(button) {
    button.src = 'img/volume-normal.png';
    world.audioArray.forEach(sound => {
        sound.volume = 1;
    });
    muted = false;
    

}

/**
 * Mutes all audio in the game.
 * @param {element} button 
 */
function mute(button) {
    button.src = 'img/mute.png';
    world.audioArray.forEach(sound => {
        sound.volume = 0;
    });
    muted = true;
}


/**
 * Changes the Mute Button, and safes the change into LS.
 * @param {element} button 
 */

function changeMutebutton(button) {
    if (beforeMuted) {
        button.src = 'img/volume-normal.png';
        beforeMuted = false;
        localStorage.setItem('beforeMuted', JSON.stringify(beforeMuted));
    } else {
        beforeMuted = true;
        button.src = 'img/mute.png';
        localStorage.setItem('beforeMuted', JSON.stringify(beforeMuted));
    }

}

/**
 * check on "resize", if it's mobile or not and call functions to change buttons in the help section
 */
window.addEventListener('resize', function (event) {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        changeHelpContentMobile();
    } else {
        getButtonsNormal();
    }
});

/**
 * Change btns in the help section for desktop
 */
function getButtonsNormal() {
    document.getElementById('left').src = 'img/keys/left.png';
    document.getElementById('right').src = 'img/keys/left.png';
    document.getElementById('up').src = 'img/keys/space-button.png';
    document.getElementById('throw').src = 'img/keys/d-button.png';
}

/**
 * Change btns in the help section for mobile
 */
function changeHelpContentMobile() {
    document.getElementById('left').src = 'img/mobile-keys/arrow-left.png';
    document.getElementById('right').src = 'img/mobile-keys/arrow-left.png';
    document.getElementById('up').src = 'img/mobile-keys/arrow-up.png';
    document.getElementById('throw').src = 'img/mobile-keys/bottle-button.png';
    getMobileButtons();
}

/**
 * Adds Buttons on the screen, to play without keyboard => for mobile only
 */
function getMobileButtons() {
    const mobileButtons = document.querySelectorAll('.mobile-button');
    if (gameIsStarted && window.matchMedia("(max-width: 1000px)").matches) {
        mobileButtons.forEach(button => {
            button.classList.remove('d-none');
        });
    } else {
        mobileButtons.forEach(button => {
            button.classList.add('d-none');
        });
    }
}


/**
 * checks if smartphone is hold horizontal or not.
 */
window.addEventListener("orientationchange", function () {
    var orientation = window.screen.orientation.angle;
    if (orientation === 90 || orientation === -90) {
        document.getElementById('flip-your-phone').classList.add('d-none');
        isHorizontal = true;
        localStorage.setItem('isHorizontal', JSON.stringify(isHorizontal));
    } else {
        document.getElementById('flip-your-phone').classList.remove('d-none');
        isHorizontal = false;
        localStorage.setItem('isHorizontal', JSON.stringify(isHorizontal));
    }
});

/**
 * Checks for pressed left-button on toucscreen
 * @param {TouchEvent} event 
 * @param {boolean} value 
 */
function touchLeft(event, value) {
    event.preventDefault();
    keyboard.LEFT = value;
}

/**
 * Checks for pressed right-button on toucscreen
 * @param {TouchEvent} event 
 * @param {boolean} value 
 */
function touchRight(event, value) {
    event.preventDefault();
    keyboard.RIGHT = value;
}

/**
 * Checks for pressed jump-button on toucscreen
 * @param {TouchEvent} event 
 * @param {boolean} value 
 */
function touchUp(event, value) {
    event.preventDefault();
    keyboard.SPACE = value;
}

/**
 * Checks for pressed throw-button on toucscreen
 * @param {TouchEvent} event 
 * @param {boolean} value 
 */
function touchThrow(event, value) {
    event.preventDefault();
    keyboard.D = value;
}


/**
 * Asks for pressed keys, to play the game. Sets var to true
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

});


/**
 * asks for the keyup, after pressed key. Sets vars to false.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});