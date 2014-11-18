<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<?php foreach($rows as $x => $r){$v = trim($r);if(strlen($v) != 0) $new_rows[] = $v;}?>
<?php $counter = 0;foreach ($new_rows as $id => $row): ?>
  <?php $m = $id + 1; if($m % 2 == 1): ?><div class="row-by-two cl"><?php endif?>
  <?php if ((($m) % 2) == 0): ?>
  <div <?php if ($classes_array[$id]) { print "class=\"item-$id nopad " . $classes_array[$id] .'"';  } ?>>
  <?php else: ?>
  <div <?php if ($classes_array[$id]) { print "class=\"item-$id " . $classes_array[$id] .'"';  } ?>>
  <?php endif; ?>
    <?php print $row; ?>
  </div>
  <?php $counter++; if($m % 2 == 0 || $counter == count($new_rows)): ?></div><?php endif; ?>
<?php endforeach; ?>
