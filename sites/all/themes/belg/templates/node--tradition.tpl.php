<?php
/**
 * @file
 * Returns the HTML for a node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
?>
<article class="view-tradition-home node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php if ($title_prefix || $title_suffix || $display_submitted || $unpublished || !$page && $title): ?>
    <header>
      <?php print render($title_prefix); ?>
      <?php if (!$page && $title): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
      <?php print render($title_suffix); ?>

      <?php if ($display_submitted): ?>
        <p class="submitted">
          <?php print $user_picture; ?>
          <?php print $submitted; ?>
        </p>
      <?php endif; ?>

      <?php if ($unpublished): ?>
        <mark class="unpublished"><?php print t('Unpublished'); ?></mark>
      <?php endif; ?>
    </header>
  <?php endif; ?>

  <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);

    //print render($content);
    print render($content['body']);
    
  ?>
  <section class="field-tradition-photos"><?php print render($content['field_tradition_photos']);?></section>
  <section class="field-when-and-where "><table><tbody><tr><td class="when"><img src="/sites/all/themes/belg/images/cutted/when.png"><div class="field-name-field-title">Wanneer</div><div class="field-name-field-description">kan er gezongen worden?</div> <a class="field-name-field-button" href="/activiteiten">Agenda</a></td><td class="where"><img src="/sites/all/themes/belg/images/cutted/where.png"><div class="field-name-field-title">Waar?</div><div class="field-name-field-description">Welke gemeenten doen mee?</div> <a class="field-name-field-button" href="/#block-belgium-map">Meer info</a></td></tr></tbody></table></section>
  <section class="field-music ">
 
          <?php //print render($content['field_music']);

          $field_music = field_get_items('node', $node, 'field_music');

// get all fields values if collection exists
if (!empty($field_music)){
    $field = field_view_value('node',$node, 'field_music', $field_music[0]);  
    foreach ($field['entity']['field_collection_item'] as $id => $field_collection){

        // load the field collection item entity
        $field_collection_item = field_collection_item_load($id);
        // wrap the entity and make it easier to get the values of fields
        $field_wrapper = entity_metadata_wrapper('field_collection_item', $field_collection_item);

        // all values from a field collection
        $field_title        = $field_wrapper->field_title->value();
        $field_image        = $field_wrapper->field_image->value(); // an array of image data
        $field_description  = $field_wrapper->field_description->value(); 
        $field_audio        = $field_wrapper->field_audio->value(); 

        // an example of getting image url from field_image
        $image_url          = $field_image['uri'] ? file_create_url($field_image['uri']) : '';
        $audio_url          = $field_audio['uri'] ? file_create_url($field_audio['uri']) : '';
        $description_val    = $field_description['value'];
        //print_r($field_description);
    }
}
          ?>

    <div class="music-left">
      <div class="field-name-field-title">
        <div class="field-item even"><span style="color: #ef3f4a">Mee</span>zingen</div>
      </div>
      <div class="field-name-field-description">
        <?php print $description_val;  ?>
      </div>
    </div>
    <div class="music-right">
      <div class="field-name-field-image">
          <img typeof="foaf:Image" src="<?php echo $image_url; ?>" width="568" height="94" alt="">
      </div>
      <audio controls=""><source src="<?php echo $audio_url; ?>"></audio>
    </div>  

    </section>
    <section class="field-requirements-list "><span class="btn-to-list"><a href="/idee-toe">Voeg jouw ideeën toe!</a></span></section>


  <?php print render($content['links']); ?>

  <?php print render($content['comments']); ?>

</article>
