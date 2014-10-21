(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
    Drupal.behaviors.belgium = {
        attach: function (context, settings) {
            var population = settings.belgium.population;
            var cityWrap = '<div class="city-wrap"><ul class="city-wrap-list"></ul></div>'

            //Traditions list
            var traditions = settings.belgium.traditions;
            var tradWrap = '<div class="trad-wrap"><ul class="trad-wrap-list"></ul></div>';
            $('#block-belgium-map').prepend(tradWrap);
            $.each(traditions, function (key, value) {
                var link = value.toLowerCase();
                $('.trad-wrap-list').append('<li><a name="' + key + '" href="#' + link + '">' + value + '</a></li>');
            });

            //Try to send Tradition ID (key) to php
            $('.trad-wrap-list').find('a').click(function () {
                $('.city-wrap-list').empty();
                var key = $(this).attr('name');

                var post = "&trad_id=" + key;
                $.ajax({
                    'url': 'ajax/get_info',
                    'type': 'POST',
                    'dataType': 'json',
                    'data': post,
                    'success': function (data) {
                        $.each(data, function (key, value) {
                            var peoples = population[key];
                            var singers = data[key];
                            var points = (singers/peoples)*100;
                            //console.log(points);

                            var link = key.toLowerCase();
                            $('.city-wrap-list').append('<li><a name="'+ points +'" href="#' + link + '">' + key + '</a></li>');
                        });
                    }
                });


            });


            //City list (should render after click on tradition)
            var city = settings.belgium.city;

            $('#block-belgium-map').append(cityWrap);
            $.each(city, function (key, value) {
                // var link = value.toLowerCase();
                // $('.city-wrap-list').append('<li><a href="#' + link + '">' + value + '</a></li>');
            });

        }
    };

    $(document).ready(function () {
        var post = "&trad_id=" + 1;
        $.ajax({
            'url': 'ajax/get_info',
            'type': 'POST',
            'dataType': 'json',
            'data': post,
            'success': function (data) {
                $.each(data, function (key, value) {
                    var link = key.toLowerCase();
                    $('.city-wrap-list').append('<li><a href="#' + link + '">' + key + '</a></li>');
                });
            }
        });

        //map hightlight functional
        $('img[usemap]').maphilight({ stroke: false, fillColor: '008800', fillOpacity: 0.7, wrapClass: 'map-wrap' });

        $('a').click(function (e) {
            e.preventDefault();
            var hightLightId = $(this).text().replace('#', '').toLowerCase();
            $('area').data('maphilight', data);
            var data = $('#' + hightLightId).mouseout().data('maphilight') || {};
            data.alwaysOn = !data.alwaysOn;
            $('#' + hightLightId).data('maphilight', data).trigger('alwaysOn.maphilight');
        });

        // Image resize support
        $('map').imageMapResize();
    });

})(jQuery, Drupal, this, this.document);
