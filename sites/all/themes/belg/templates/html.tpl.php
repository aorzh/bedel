<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?><!DOCTYPE html>
<!--[if IEMobile 7]>
<html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]>
<html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]>
<html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]>
<html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!-->
<html <?php print $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->

<head>
    <?php print $head; ?>
    <title><?php print $head_title; ?></title>

    <?php if ($default_mobile_metatags): ?>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="MobileOptimized" content="width">
        <meta name="HandheldFriendly" content="true">
    <?php endif; ?>
    <meta http-equiv="cleartype" content="on">
      <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">

    <?php print $styles; ?>
    <?php print $scripts; ?>
    <?php if ($add_html5_shim and !$add_respond_js): ?>
        <!--[if lt IE 9]>
        <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
        <![endif]-->
    <?php elseif ($add_html5_shim and $add_respond_js): ?>
        <!--[if lt IE 9]>
        <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
        <![endif]-->
    <?php
    elseif ($add_respond_js): ?>
        <!--[if lt IE 9]>
        <script src="<?php print $base_path . $path_to_zen; ?>/js/respond.js"></script>
        <![endif]-->
    <?php endif; ?>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

</head>
<body class="<?php print $classes; ?>" <?php print $attributes; ?>>
<?php if ($skip_link_text && $skip_link_anchor): ?>
    <p id="skip-link">
        <a href="#<?php print $skip_link_anchor; ?>"
           class="element-invisible element-focusable"><?php print $skip_link_text; ?></a>
    </p>
<?php endif; ?>
<?php print $page_top; ?>
<?php print $page; ?>
<?php print $page_bottom; ?>
</body>
</html>