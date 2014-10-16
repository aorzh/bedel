(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
    Drupal.behaviors.my_custom_behavior = {
        attach: function (context, settings) {

            // Place your code here.

        }
    };
    $(document).ready(function () {
        google.load("visualization", "1", {packages:["geomap"]});
        google.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {

            var data = google.visualization.arrayToDataTable([
                ['Region', 'Putten'],
                ['Antwerp', 100],
                ['Retie', 300],
                ['Dessel', 300],
                ['Mol', 300],
                ['Meerhout', 300],
                ['Geel', 300],
                ['Laakdal', 300],
                ['Veerle', 300],


            ]);

            var options = {
                region: 'BE',
                resolution: 'provinces',
                displayMode : 'text'
            };
            options['dataMode'] = 'regions';

           // var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            var container = document.getElementById('regions_div');
            var geomap = new google.visualization.GeoMap(container)

            geomap.draw(data, options);

        }

    });

})(jQuery, Drupal, this, this.document);
