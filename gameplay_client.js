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
    }
};

var ClientGameplay = function(CONFIG) {

    var iframeWindow = document.querySelector(CONFIG.getIframeSelector()).contentWindow,
        iframe = $(CONFIG.getIframeSelector()),
        play_button = $(CONFIG.getPlayButtonSelector()),
        reload_button = $(CONFIG.getReloadButtonSelector()),
        fullscreen_button = $(CONFIG.getFullscreenButtonSelector());

    var init = function() {

        // Adjust iframe size
        resizeFrame();

        // Send configuration object to iframe
        iframeWindow.Gameplay.setClientCONFIG(CONFIG);

        bindEvents();
    };

    var bindEvents = function() {

        // Bind play button
        play_button.on('click', iframeWindow.Gameplay.engageGameplay);

        // Bind reload button
        reload_button.on('click', reloadFrame);

        // Bind fullscreen button
        fullscreen_button.on('click', iframeWindow.Gameplay.toggleFullScreen);

        // Bind iframe resize on window resize
        $(window).on('resize', resizeFrame);
    };
    var reloadFrame = function() {

        // Display play button after iframe reloads if not screenshot
        if(!iframeWindow.document.getElementsByTagName('body')[0].dataset.type === 'screenshot') {

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

                // iframe.height(iframe.width() / ratio);
                iframe.attr('height', iframe.width() / iframe.attr('width') * iframe.attr('height'));


            } else { // Resize iFrame by its original ratio

                iframe.attr('height', iframe.width() / iframe.attr('width') * iframe.attr('height'));
            }
        }
        // iframe.attr('height', 100);
    };

    init();
};
