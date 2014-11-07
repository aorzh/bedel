(function ($, Drupal, window, document, undefined) {
    Drupal.behaviors.alex = {
        attach: function (context, settings) {

        }
    };

    $(document).ready(function () {
        if ($('body').hasClass('page-tradition')) {
            var output;
            output = '<section class="field-when-and-where ">' +
                '<table>' +
                '<tr>' +
                '<td class="when">' +
                '<img src="/sites/all/themes/belg/images/cutted/when.png">' +
                '<div class="field-name-field-title">Wanneer</div>'+
                '<div class="field-name-field-description">kan er gezongen worden?</div> ' +
                '<a class="field-name-field-button" href="/activiteiten">Agenda</a>' +
                '</td>' +
                '<td class="where">' +
                '<img src="/sites/all/themes/belg/images/cutted/where.png">' +
                '<div class="field-name-field-title">Waar?</div>'+
                '<div class="field-name-field-description">Welke gemeenten doen mee?</div> ' +
                '<a class="field-name-field-button" href="/#block-belgium-map">Meer info</a>' +
                '</td>' +
                '</tr>' +
                '</table >' +
                '</section>';
            $(output).insertAfter($('.field-tradition-photos '));

            if($('.field-tradition-photos ').find('.field-content').is(':empty')) {
                $('.field-tradition-photos ').css('display', 'none');
            }
            $('<section class="field-requirements-list "><div class="zelf-wrap"><p class="zelf">' +
                '<span style="color: #ef3f4a">Zelf</span>' +
                '<span> op pad <span style="color: #ef3f4a">gaan?</span></span></p>' +
                '<span class="btn-to-list"><a href="/idee-toe">Voeg jouw ideeën toe!</a></span></div>' +
                ' <p class="descr">Wat heb je nodig om op pad te gaan? Hieronder vind je de benodigdheden:</p>' +
                '</section> ').insertAfter($('.field-music '));


            $('.idea-list').find('li').each(function() {
                $('li:odd').addClass('odd');
                $('li:even').addClass('even');
            });
            /*
            $('.idea > li:nth-child(2n-1)').each(function() {
                $(this).next().add(this).wrapAll('<div class="idea-list"><ul></ul></div>');
            }).eq(0).closest('div').unwrap();*/

            //Replace ideas block
            var ideas = $('#block-belgium-ideas').appendTo('.field-requirements-list ');
        }

        //lets change titles for ideas
        var subt = $('.field-name-field-subtitle').find('.field-item').text();
        if (subt.length != 0) {
            $('#page-title').text(subt);
        }

        //if titel
        var titel = $('.field-name-field-titel').find('.field-item').text();
        if (titel.length != 0 && subt.length == 0) {
            $('#page-title').text(titel);
        } else {
            $('#page-title').text(subt);
        }

        var sing = $('.field-name-field-aantal-zangers').find('.field-item').text();
        var newSing = parseInt(sing);
        $('.field-name-field-aantal-zangers').find('.field-item').text(newSing);

        //hide tadition
        $('#edit-field-tradition-tid-1').find('option').each(function(){
           if($(this).attr('value') == '8') {
               $(this).hide();
           }
        });
        $('#edit-field-tradition-und').find('option').each(function(){
            if($(this).attr('value') == '8') {
                $(this).hide();
            }
        });

        // add title to entityform
        var titleText = $('.page-entityform')
            .find('.field-name-field-tradition')
            .find('a').text();

        $('.page-entityform').find('#page-title').text(titleText);

        //Hide email for not-logged-in
        //$('.field-name-field-e-mailadres-wordt-niet-get').hide();

    });

})(jQuery, Drupal, this, this.document);
