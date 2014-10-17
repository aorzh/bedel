<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */

$data = $row->field_field_music;
$item_id = '';
foreach ($data as $value) {
    $item_id = $value['raw']['value'];
}
$collection = field_collection_item_load($item_id);
if (isset($collection->field_audio['und'][0]['uri']) && !empty($collection->field_audio['und'][0]['uri'])) {
    $uri = $collection->field_audio['und'][0]['uri'];

    $url = file_create_url($uri);
    if ($row->field_field_music) {
        print '<div class="music"><audio controls><source src="' . $url . '"></audio></div>';
    }
}
?>
<?php print $output; ?>