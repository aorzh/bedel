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
            $(output).insertAfter($('.body '));
        }

    });

})(jQuery, Drupal, this, this.document);
