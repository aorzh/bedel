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
                    <div class="houses wie">
                        <img src="/sites/all/themes/belg/images/cutted/wie.png">
                        
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="main" class="container">
        <div class="row">
            <div class="col-md-11 col-md-offset-1">
                <div class="view-header-title">
                        Wie <span class="green">zingt</span> het meest?
                </div>
                <?php $block = block_load('block', '1');
                        $submit_block = _block_get_renderable_array(_block_render_blocks(array($block)));
                        print render($submit_block);
                        ?>
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

                
            </div>
        </div>
    </div>

    <?php print render($page['footer']); ?>

</div>

<?php print render($page['bottom']); ?>