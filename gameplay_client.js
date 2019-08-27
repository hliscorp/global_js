document.domain = window.location.hostname.replace("www.","").replace("dev.","");

var ClientGameplayCONFIG = function() {

    // Selector for the subdomain iframe loaded in client
    var iframeSelector = '#gameplay_iframe';

    // Selector for the play button
    var playButtonSelector = '#game_play_button';

    // Selector for the reload button
    var reloadButtonSelector = '#play-replay';

    // Selector for the fullscreen button
    var fullscreenButtonSelector = '#play-fullscreen';

    // Handler function for fullscreen events
    this.fullscreenHandler = function() {};


    // Setters
    this.setIframeSelector = function(selector) {

        iframeSelector = selector;
    };
    this.setPlayButtonSelector = function(selector) {

        playButtonSelector = selector;
    };
    this.setReloadButtonSelector = function(selector) {

        reloadButtonSelector = selector;
    };
    this.setFullscreenButtonSelector = function(selector) {

        fullscreenButtonSelector = selector;
    };
    this.setFullscreenHandler = function(handler) {

        this.fullscreenHandler = handler;
    };


    // Getters
    this.getIframeSelector = function() {

        return iframeSelector;
    };
    this.getPlayButtonSelector = function() {

        return playButtonSelector;
    };
    this.getReloadButtonSelector = function() {

        return reloadButtonSelector;
    };
    this.getFullscreenButtonSelector = function() {

        return fullscreenButtonSelector;
    };
};

var ClientGameplay = function(CONFIG) {

    var iframeWindow = document.querySelector(CONFIG.getIframeSelector()).contentWindow,
        iframe = $(CONFIG.getIframeSelector()),
        play_button = $(CONFIG.getPlayButtonSelector()),
        reload_button = $(CONFIG.getReloadButtonSelector()),
        fullscreen_button = $(CONFIG.getFullscreenButtonSelector()),
        is_first_load = true;

    this.init = function() {

        // Adjust iframe size
        resizeFrame();

        // Send configuration object to iframe
        iframeWindow.Gameplay.setClientCONFIG(CONFIG);

        if(iframe.hasClass('fullscreen')) {

            iframeWindow.Gameplay.toggleFullScreen();
        }

        bindEvents();

        is_first_load = false;
    };

    var bindEvents = function() {

        // Bind play button
        play_button.on('click', iframeWindow.Gameplay.engageGameplay);

        // Bind reload button
        if(is_first_load) {

            reload_button.on('click', reloadFrame);
        }

        // Bind fullscreen button
        if(is_first_load) {

            fullscreen_button.on('click', function () {

                CONFIG.fullscreenHandler();
                iframeWindow.Gameplay.toggleFullScreen();
            });
        }

        // Bind iframe resize on window resize
        $(window).on('resize', resizeFrame);
    };
    var reloadFrame = function() {

        // Display play button after iframe reloads if not screenshot
        if(iframeWindow.document.getElementsByTagName('body')[0].dataset.type !== 'screenshot') {

            iframe.on('load', function() {

                play_button.show();
            });
        }

        iframe.attr('src', iframe.attr('src'));
    };
    var resizeFrame = function() {

        var screenshot = $(iframeWindow.document.getElementById('screenshot'));
        var ratio = screenshot.width() / screenshot.height();

        // If not fullscreen
        if(!iframeWindow.Gameplay.is_fullscreen) {

            if(ratio < 2) { // Resize iFrame by the screen shot ratio

                iframe.attr('height', Math.round(iframe.width() / ratio));

            } else { // Resize iFrame by its original ratio

                iframe.attr('height', iframe.width() / iframe.attr('width') * iframe.attr('height'));
            }
        }
    };
};
