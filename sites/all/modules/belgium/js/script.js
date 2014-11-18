(function ($, Drupal, window, document, undefined) {
    Drupal.behaviors.belgium = {
        attach: function (context, settings) {
            var population = settings.belgium.population;
            var cityWrap = '<div class="city-wrap"><ul class="city-wrap-list"></ul></div>';

            //Traditions list
            var traditions = settings.belgium.traditions;
            var tradWrap = '<div class="trad-wrap"><ul class="trad-wrap-list"></ul></div>';

            $('#block-belgium-map').prepend(tradWrap).append(cityWrap);
            $.each(traditions, function (key, value) {
                var link = value.toLowerCase();
                $('.trad-wrap-list').append('<li class="' + link + '"><span class="arrow"> » </span>' +
                    '<a name="' + key + '" href="#' + link + '">' + value + '</a></li>');
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
                                            'data': {town: $(this).attr('id'), tradition_id: k},
                                            'success': function (content) {
                                                return content
                                            }
                                        })
                                    }
                                }
                            });

                            $('.city-wrap-list').append('<li style="background-color: rgba(' + colors + ', .6)"><div class="point-left">' +
                                '<span class="number" style="color: ' + colors + '">' + i + '</span></div><div class="point-right">' +
                                '<a name="' + points + '" href="#' + link + '">' + key + '</a>' +
                                '<span class="points">' + points.toFixed(2) + ' punten</span></div></li>');
                        });
                    }
                });

            });

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


    function colorHex(city) {
        var c = '';
        if (city == 'geel') {
            c = 'efb848';
        } else if (city == 'dessel') {
            c = '862084';
        } else if (city == 'mol') {
            c = '008aaf';
        } else if (city == 'balen') {
            c = 'd35144';
        } else if (city == 'retie') {
            c = '40af49';
        } else if (city == 'laakdal') {
            c = 'f37052';
        } else {
            c = '46be95';
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

                    $('area').qtip({
                        content: {
                            text: function (event, api) {
                                return $.ajax({
                                    'url': 'ajax/tooltip',
                                    'type': 'POST',
                                    'dataType': 'json',
                                    'data': {town: $(this).attr('id'), tradition_id: 1},
                                    'success': function (content) {
                                        return content
                                    }
                                })
                            }
                        }
                    });

                    $('.city-wrap-list').append('<li style="background-color: rgba(' + colors + ', .6)">' +
                        '<div class="point-left"><span class="number" style="color: ' + colors + '">' + i + '</span></div>' +
                        '<div class="point-right"><a href="#' + link + '">' + key + '</a>' +
                        '<span class="points">' + points.toFixed(2) + ' punten</span></div></li>');

                });
            }
        });

        //if redirect from tradition
        var last = document.referrer;

        var segment = last.substr(last.lastIndexOf('/') + 1);
        var trad_segment = last.substr(last.lastIndexOf('/') - 9, 9);
        if (trad_segment == 'tradition') {
            var s = "&nid=" + segment;
            $.ajax({
                'url': 'ajax/tradition',
                'type': 'POST',
                'dataType': 'json',
                'data': s,
                'success': function (data) {
                    $('.trad-wrap-list').find('li').each(function () {
                        $(this).removeClass('active');
                        if ($(this).find('a').attr('href') == '#' + data) {
                            $(this).addClass('active');
                        }
                    });
                    var t = "&trad_name=" + data;

                    $.ajax({
                        'url': 'ajax/get_tradition',
                        'type': 'POST',
                        'dataType': 'json',
                        'data': t,
                        'success': function (d) {
                            var p = "&trad_id=" + d;
                            $.ajax({
                                'url': 'ajax/get_info',
                                'type': 'POST',
                                'dataType': 'json',
                                'data': p,
                                'success': function (data) {
                                    $('.city-wrap-list').empty();
                                    var $i = 0;
                                    $.each(data, function (key, value) {
                                        $i++;
                                        var peoples = population[key];
                                        var singers = data[key];
                                        var points = (singers / peoples) * 100;
                                        var colors = color(key);
                                        var link = key.toLowerCase();

                                        $('area').qtip({
                                            content: {
                                                text: function (event, api) {
                                                    return $.ajax({
                                                        'url': 'ajax/tooltip',
                                                        'type': 'POST',
                                                        'dataType': 'json',
                                                        'data': {town: $(this).attr('id'), tradition_id: d},
                                                        'success': function (content) {
                                                            return content
                                                        }
                                                    })
                                                }
                                            }
                                        });

                                        $('.city-wrap-list').append($('<li style="background-color: rgba(' + colors + ', .6)">' +
                                            '<div class="point-left"><span class="number" style="color: ' + colors + '">' + i + '</span></div>' +
                                            '<div class="point-right"><a href="#' + link + '">' + key + '</a>' +
                                            '<span class="points">' + points.toFixed(2) + ' punten</span></div></li>'));
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }


        //map hightlight functional
        //$('img[usemap]').maphilight({ stroke: false, fillColor:"1115a5", fillOpacity: 1, wrapClass: 'map-wrap' });
        //$('img[usemap]').maphilight({wrapClass: 'map-wrap', fillOpacity: 1});



        $('area').each(function () {
            $(this).mouseover(function (e) {
                e.preventDefault();
                window.globaCity = $(this).attr('id');

                var data = $('#'+ window.globaCity).data('maphilight') || {};
                //$('area').metadata();
                data.fillColor = colorHex(window.globaCity);
                //data.neverOn = !data.neverOn;
                $('#'+ window.globaCity).data('maphilight', data);
                $('#'+ window.globaCity).attr('data-maphilight', '{"strokeColor":"' + colorHex(window.globaCity) + '","strokeWidth": 0, "fillColor":"' + colorHex(window.globaCity) + '", "fillOpacity": 1}');
            });

        });

        $('#Image-Maps-Com-belgium').wrap('<div class="map-wrap map"></div>');
        $('#Image-Maps-Com-belgium').maphilight({
            fillColor: 'CECECE',
            stroke: false,
            fillOpacity: 1
        });

        //hide two traditions
        function hideTradition(trad) {
            $(trad).hide();
        }

        hideTradition('.zing');
        hideTradition('.uitgedoofde');

        // Image resize support
        $('map').imageMapResize();


    });

})(jQuery, Drupal, this, this.document);
