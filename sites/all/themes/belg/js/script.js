/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
    Drupal.behaviors.my_custom_behavior = {
        attach: function (context, settings) {

            // Place your code here.

        }
    };
    $(document).ready(function () {
        $("body.node-type-tradition .field-requirements-list").append($("body.node-type-tradition #block-belgium-ideas"));


        $('.view-shows-teaser').find('.views-row').each(function () {
            var tabDiv = $('.views-row').find('.views-field-nothing');
            $.each(tabDiv, function () {
                var divWat = $(this).parent().find('.views-field-field-wat');
                var divWaar = $(this).parent().find('.views-field-field-waar');
                var divWanneer = $(this).parent().find('.views-field-field-wanneer');
                var divWebsite = $(this).parent().find('.views-field-field-website');
                
                
                //$(this).find('.right').append(divWanner);
                if(divWat.find('.field-content').is(':empty')) {
                    divWat.remove();
                }
                else{
                    
                    $(this).find('.right').append(divWat);
                }

                if(divWaar.find('.field-content').is(':empty') ) {
                    divWaar.remove();
                }
                else{
                    $(this).find('.right').append(divWaar);
                }

                if(divWanneer.find('.field-content').is(':empty') ) {
                    divWanneer.remove();
                }
                else{
                    
                    $(this).find('.right').append(divWanneer);
                }

                if(divWebsite.find('.field-content').is(':empty') ) {
                    divWebsite.remove();
                }
                else{
                    
                    $(this).find('.right').append(divWebsite);
                }
            });

            
        });


        $(".sitename:contains('Zing Ze!')").each(function () {
            $(this).html($(this).html().replace("Zing", "<span class='name-first'>Zing</span>"));
            $(this).html($(this).html().replace("Ze!", "<span class='name-second'>Ze!</span>"));
        });
        $("#backLink").click(function(event) {
            event.preventDefault();
            history.back(1);
        });

        $('.date-display-single').each(function () {
            $(this).html(function () {
                var text = $(this).text().split(" ");
                var last = text.pop();
                var first = text.shift();

                return "<div class='show-day'>" + first + "</div><div class='show-month'>" + last + "</div>"
            })

        });

        $('.view-shows-teaser').find('tr:odd').each(function () {
            $(this).addClass('second');
        });
        $('.view-shows-teaser').find('tr:even').each(function () {
            $(this).addClass('first');
        });
        $('.view-shows-teaser').find('table').addClass("table");

        $('.view-shows-teaser.view-display-id-page').find('.row-2').next('tr').addClass('slide').attr('id', 'more');

       // $('.view-shows-teaser.view-display-id-page .slide').hide().nextAll('tr').hide();
        //$(".view-shows-teaser.view-display-id-page .slide-btn").toggle(
        //    function () {
        //        $('.slide').slideDown(500).nextAll('tr').show();
        //        $(this).html('» Sluiten');
        //    },
        //    function () {
        //       $('.slide').slideUp(300).nextAll('tr').hide();
        //        $(this).html('» Alle activiteiten');
        //    }
        //);
        $('#block-views-promo-block-block').find('table').addClass('table');

        $('.pdf').parents('.views-row').addClass('green');
        $('.desc').parents('.views-row').addClass('orange');

        $('.orange').find('.views-field-field-page-reference, .views-field-php').wrapAll('<div class="orange-button"></div>');
        $('.green').find('.views-field-field-page-reference, .views-field-php').wrapAll('<div class="green-button"></div>');
        $('.green-button, .orange-button').addClass('color-button');

        $('.field-music ').find('.field-name-field-title, .field-name-field-description').wrapAll('<div class="music-left"></div>')
        $('.field-music ').find('.field-name-field-image, .field-name-field-audio').wrapAll('<div class="music-right"></div>')

        var player = $('.music').html();
        $('.field-name-field-audio').replaceWith(player);

        /*
         $('.field-requirements-list ').find('ul').addClass('pretable');
         $('ul.pretable li:even').addClass('even');
         $('ul.pretable li:odd').addClass('odd');*/

        $('.req').wrapInner('<div class="row"><div class="col-md-10 col-md-offset-1"></div></div>');

        $('.view-header').after('<div id="top"></div>');

        $('.view-over-kerf').find('.views-row').each(function () {
            /* new_id = $(this).find('.views-field-title').find('a').text().toLowerCase(); */
			new_id = $(this).find('.kerf-title').find('a').text().toLowerCase();
            imagePath = $(this).find('.views-field-field-kerf-image').find('img').attr('src');

            $('#top').append('<a href="#' + new_id + '"><img src="' + imagePath + '" class="img_overkerf ' + new_id + '" />' +
                '</a>');
            $(this).attr('id', new_id);
        });
		
		$('#top > a').mouseover(function(){
            if(!$(this).hasClass("active")){
                $(this).find('img').css('opacity', 1);
            }
        });
        $('#top > a').mouseleave(function(){
            if(!$(this).hasClass("active")){
                $(this).find('img').css('opacity', 0.4);
            }
        });

        var brwsrWinW = parseInt($(window).width());
        $('#page').css({
            'width':brwsrWinW,
            'overflow-x':'hidden'
        })

        $( ".row-by-four .views-row:nth-child(4n+4)" ).addClass( "nopad-r" );
        $( ".row-by-two:nth-child(2n+2)" ).addClass( "even" );
        /*var

        color = function(){
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        },
        $els = $('.view-main-traditions .views-field-php span'),
        colorify = function(els){
            els.each(function(){
                $(this).css('background', color());
            });
        };*/

        //colorify($els);

        //wrap agenda to link
        $('.agenda-link').hide();
        $('.agenda-link').find('a').each(function(){
            var links = $(this).attr('href');
            var td = $(this).parents('td');
            $(td).wrapInner('<a href="' + links + '"></a>');
        });

        //Style music title
        var title = $('.field-collection-item-field-music').find('.field-name-field-title').find('.field-item').text();
        var title_cut = title.slice(0, 3);
        var title_cut_end = title.slice(3);
        var new_title = '<span style="color: #ef3f4a">' + title_cut + '</span>' + title_cut_end;
        $('.field-collection-item-field-music').find('.field-name-field-title').find('.field-item').replaceWith('<div class="field-item even">' + new_title + '</div>');


        //add Zelf op pad gaan as title
        var zelf = '<p class="zelf"><span style="color: #ef3f4a">Zelf</span><span> op pad <span style="color: #ef3f4a">gaan?</span></span></p><p class="descr">Wat heb je nodig om op pad te gaan? Hieronder vind je de benodigdheden:</p>';
        $('.field-requirements-list ').prepend(zelf);

        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });

       $('.tradition-btn').each(function(){
           var col = $(this).attr('style');
           $(this).parent('span').attr('style',col);
       });

    });

})(jQuery, Drupal, this, this.document);
