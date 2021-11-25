    import Player from '@vimeo/player';

    const player = new Player('vimeo-player');
    
    const throttle = require('lodash.throttle');


    const currentTime = throttle(seconds => {
        localStorage.setItem("videoplayer-current-time", seconds);
    }, 1250);

    const timeUpdate = () => {
        player.getCurrentTime().then(currentTime)
        .catch(error => {
            console.log(error.name);
        });
    };

    player.on('timeupdate', timeUpdate);
    
    const playSavedCurrentTimes = () => {
        const savedCurrentTime = localStorage.getItem("videoplayer-current-time");
        player.setCurrentTime(savedCurrentTime)
            .catch(error => {
                switch (error.name) {
                    case 'RangeError':
                        break;

                    default:
                        break;
                };
            });
        
        player.off('play');
    }

    player.on('play', playSavedCurrentTimes);

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });