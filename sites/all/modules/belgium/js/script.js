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
                $('.trad-wrap-list').append('<li><span class="arrow"> » </span><a name="' + key + '" href="#' + link + '">' + value + '</a></li>');
            });

            //First active by default
            $('.trad-wrap').find('li:first-child').addClass('active');
            //Try to send Tradition ID (key) to php
            $('.trad-wrap-list').find('a').click(function () {
                $('.trad-wrap').find('li').each(function () {
                    $(this).removeClass('active');
                });
                $(this).parent('li').addClass('active');
                $('.city-wrap-list').empty();
                var key = $(this).attr('name');
                var k = $(this).attr('name');
                var i = 0;
                var post = "&trad_id=" + key;
                $.ajax({
                    'url': 'ajax/get_info',
                    'type': 'POST',
                    'dataType': 'json',
                    'data': post,
                    'success': function (data) {
                        $.each(data, function (key, value) {
                            i++;
                            var peoples = population[key];
                            var singers = data[key];
                            var points = (singers / peoples) * 100;
                            //console.log(points);
                            var colors = color(key);
                            var link = key.toLowerCase();
                            //$('map').find("#" + link).attr('data-tooltip', singers + " " + points.toFixed(2));

                            $('area').qtip({
                                content: {
                                    text: function (event, api) {
                                        return $.ajax({
                                            'url': 'ajax/tooltip',
                                            'type': 'POST',
                                            'dataType': 'json',
                                            'data':  {town: $(this).attr('id'), tradition_id: k},
                                            'success': function (content) {
                                                return content
                                            }
                                        })
                                    }
                                }
                            });

                            $('.city-wrap-list').append('<li style="background-color: rgba(' + colors + ', .6)"><div class="point-left"><span class="number" style="color: ' + colors + '">' + i + '</span></div><div class="point-right"><a name="' + points + '" href="#' + link + '">' + key + '</a><span class="points">' + points.toFixed(2) + ' punten</span></div></li>');
                        });
                    }
                });

            });

            //City list (should render after click on tradition)
            var city = settings.belgium.city;

            $('#block-belgium-map').append(cityWrap);
            /*$.each(city, function (key, value) {
                // var link = value.toLowerCase();
                // $('.city-wrap-list').append('<li><a href="#' + link + '">' + value + '</a></li>');
            });*/

        }
    };

    //rgba value
    function color(city) {
        var c = '';
        if (city == 'Geel') {
            c = '239, 184, 72';
        } else if (city == 'Dessel') {
            c = '134, 32, 132';
        } else if (city == 'Mol') {
            c = '0, 138, 175';
        } else if (city == 'Balen') {
            c = '211, 81, 68';
        } else if (city == 'Retie') {
            c = '64, 175, 73';
        } else if (city == 'Laakdal') {
            c = '243, 112, 82';
        } else {
            c = '75,190,149';
        }
        return c;
    }


    $(document).ready(function () {
        var population = Drupal.settings.belgium.population;
        //Default pre-load
        var i = 0;
        var post = "&trad_id=" + 1;
        $.ajax({
            'url': 'ajax/get_info',
            'type': 'POST',
            'dataType': 'json',
            'data': post,
            'success': function (data) {
                $.each(data, function (key, value) {
                    i++;
                    var peoples = population[key];
                    var singers = data[key];
                    var points = (singers / peoples) * 100;
                    var colors = color(key);
                    var link = key.toLowerCase();

                    //$('map').find("#" + link).attr('data-tooltip', singers + " " + points.toFixed(2));

                    $('area').qtip({
                        content: {
                            text: function (event, api) {
                                return $.ajax({
                                    'url': 'ajax/tooltip',
                                    'type': 'POST',
                                    'dataType': 'json',
                                    'data':  {town: $(this).attr('id'), tradition_id: 1},
                                    'success': function (content) {
                                        return content
                                    }
                                })
                            }
                        }
                    });

                    $('.city-wrap-list').append('<li style="background-color: rgba(' + colors + ', .6)"><div class="point-left"><span class="number" style="color: ' + colors + '">' + i + '</span></div><div class="point-right"><a href="#' + link + '">' + key + '</a><span class="points">' + points.toFixed(2) + ' punten</span></div></li>');
                });
            }
        });

        //map hightlight functional
        $('img[usemap]').maphilight({ stroke: false, fillColor: '008bb2', fillOpacity: 1, wrapClass: 'map-wrap' });


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
