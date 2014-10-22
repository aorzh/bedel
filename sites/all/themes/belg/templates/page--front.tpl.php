<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

<div id="page">

    <header class="header" id="header" role="banner">
        <div class="wrapper-head">
            <div class="header-right">
                <?php if ($logo): ?>
                    <div id="logo">
                        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"
                           class="header__logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"
                                                     class="header__logo-image"/></a>
                    </div>
                <?php endif; ?>
                <div class="sitename">
                    <?php print $site_name; ?>
                </div>
                <?php print render($page['header']); ?>
            </div>
            <div class="wrapper">
                <div class="main-menu">
                    <?php
                    $menu = menu_navigation_links('main-menu');
                    print theme('links__main_menu', array('links' => $menu));
                    ?>
                </div>
                <div class="border">
                    <div class="houses">
                        <?php $block = block_load('block', '2');
                        $city_block = _block_get_renderable_array(_block_render_blocks(array($block)));
                        print render($city_block);
                        ?>
                        <img src="/sites/all/themes/belg/images/cutted/houses.png">
                        <?php $block = block_load('block', '1');
                        $submit_block = _block_get_renderable_array(_block_render_blocks(array($block)));
                        print render($submit_block);
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="main" class="container">
        <div class="row">
            <div class="col-md-11 col-md-offset-1">
                <div id="content" class="column" role="main">
                    <?php print render($page['highlighted']); ?>
                    <?php print $breadcrumb; ?>
                    <a id="main-content"></a>
                    <?php print render($title_prefix); ?>
                    <?php if ($title): ?>
                        <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
                    <?php endif; ?>
                    <?php print render($title_suffix); ?>
                    <?php print $messages; ?>
                    <?php print render($tabs); ?>
                    <?php print render($page['help']); ?>
                    <?php if ($action_links): ?>
                        <ul class="action-links"><?php print render($action_links); ?></ul>
                    <?php endif; ?>
                    <?php print render($page['content']); ?>
                    <?php print $feed_icons; ?>
                </div>

                <div id="navigation">

                    <?php if ($main_menu): ?>
                        <nav id="main-menu" role="navigation" tabindex="-1">
                            <?php
                            // This code snippet is hard to modify. We recommend turning off the
                            // "Main menu" on your sub-theme's settings form, deleting this PHP
                            // code block, and, instead, using the "Menu block" module.
                            // @see https://drupal.org/project/menu_block
                            print theme('links__system_main_menu', array(
                                'links' => $main_menu,
                                'attributes' => array(
                                    'class' => array('links', 'inline', 'clearfix'),
                                ),
                                'heading' => array(
                                    'text' => t('Main menu'),
                                    'level' => 'h2',
                                    'class' => array('element-invisible'),
                                ),
                            )); ?>
                        </nav>
                    <?php endif; ?>

                    <?php print render($page['navigation']); ?>

                </div>

                <?php
                // Render the sidebars to see if there's anything in them.
                $sidebar_first = render($page['sidebar_first']);
                $sidebar_second = render($page['sidebar_second']);
                ?>

                <?php if ($sidebar_first || $sidebar_second): ?>
                    <aside class="sidebars">
                        <?php print $sidebar_first; ?>
                        <?php print $sidebar_second; ?>
                    </aside>
                <?php endif; ?>

                
        </div>

            </div>
        </div>
        <div class="row map-section">
                    <div class="col-md-9 col-md-offset-2">
                        <?php
                        $block = block_load('belgium', 'map');
                        $city_block = _block_get_renderable_array(_block_render_blocks(array($block)));
                        print render($city_block);
                        ?>
                    </div>
                </div>
                <div class="row welcome-section">
                    <div class="col-md-7 col-md-offset-2 border-bottom">
                        <div class="show-title">Noteer in je <span class="red">agenda</span>:</div>
                    </div>
                    <div class="col-md-2">
                        <div class="zwelkom"><img src="/sites/all/themes/belg/images/cutted/zwelkom.png"></div>
                    </div>

                    <div class="col-md-7 col-md-offset-3">
                        <?php $block = block_load('view', 'shows_teaser-block');
                        $shows_block = views_embed_view('shows_teaser', $display_id = 'block');
                        print render($shows_block); ?>
                        <!--<div class="more"><a class="slide-btn" href="#more">» Alle activiteiten</a></div>-->
                        <div class="more"><a class="slidebtn" href="activiteiten">» Alle activiteiten</a></div>
                    </div>
            </div>
            <div class="row pdf-section">
                <div class="col-md-7 col-md-offset-4">
                    <?php 
                    //$block2 = block_load('view', 'page_footer_block-block');
                    //$show_block = views_embed_view('page_footer_block', $display_id = 'block');
                    //print render($show_block); ?>
                </div>
            </div>

    </div>

    <?php print render($page['footer']); ?>

</div>

<?php print render($page['bottom']); ?>
