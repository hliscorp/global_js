/**
 *
 * imageDefer
 *
 * Purpose: Load images in defer to reduce page load time.
 * Logic: HTML is modified so images are now '<span>' instead of '<img>', with all the original attributes changed into data-attributes.
 *        The script below parses the DOM and replaces the span tags to image tags led by few configurable constraints
 *
 */

var imageDeferCONFIG = function() {

    // Selector for the spans that are going to be transformed into images
    var imagesSelector = '.lazy-image';

    // Number of images to be loaded at once
    var deferLoadLimit = 1;

    // Number of images to be loaded with the page
    var pageLoadLimit = 1;

    // Approximate distance, in pixels, between images ( how much to scroll until additional images start loading )
    var scrollOffset = 200;


    // Setters
    this.setImagesSelector = function(selector) {

        imagesSelector = selector;
    };
    this.setDeferLoadAmount = function(amount) {

        deferLoadLimit = amount;
    };
    this.setPageLoadAmount = function(amount) {

        pageLoadLimit = amount;
    };
    this.setScrollOffset = function(amount) {

        scrollOffset = amount;
    };


    // Getters
    this.getImagesSelector = function() {

        return imagesSelector;
    };
    this.getDeferLoadAmount = function() {

        return deferLoadLimit;
    };
    this.getPageLoadAmount = function() {

        return pageLoadLimit;
    };
    this.getScrollOffset = function() {

        return scrollOffset;
    };

};

var imageDefer = function(CONFIG) {

    var BUSY = false;
    var maxScrollOffset = 0;

    this.init = function () {

        // Load images on page load
        spanToImage(CONFIG.getPageLoadAmount());


        bindEvents();
    };

    var bindEvents = function() {

        // Bind defer on scroll
        $(window).on('scroll', updateImages);
    };

    var updateImages = function() {

        if(!BUSY) {

            if($(window).scrollTop() - maxScrollOffset >= CONFIG.getScrollOffset()) {

                BUSY = true;

                var amountOfImagesToLoad = parseInt(($(window).scrollTop() - maxScrollOffset) / CONFIG.getScrollOffset() * CONFIG.getDeferLoadAmount());

                maxScrollOffset = $(window).scrollTop();

                spanToImage(amountOfImagesToLoad);

                BUSY = false;
            }

        }
    };

    var spanToImage = function(amount) {

        amount = amount ? amount : CONFIG.getDeferLoadAmount();

        var elements = $(CONFIG.getImagesSelector()).slice(0, amount);

        elements.each(function() {

            var image = document.createElement("img");

            $.each(this.attributes, function() {

                image.setAttribute(this.name.replace("data-", ""), this.value);
            });

            $(image).removeClass(CONFIG.getImagesSelector().substr(1));

            $(this).after(image);

            $(this).remove();
        });
    };

    this.init();
};
