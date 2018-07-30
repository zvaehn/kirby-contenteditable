<?php

/* Todos:
- Multilanguage?
- String parsing
- WYSIWYG
*/

// Check if the user is logged in
if(!$kirby->site()->user()) return;


$kirby->set('route', array(
  'pattern' => '(:all)/contenteditable',
  'method' => 'POST',
  'action'  => function($pageid) {
    $poststring = file_get_contents('php://input');

    try {
      // Parse json-text to php object
      $post = json_decode($poststring);

      // Get Page
      if($page = page($pageid)) {

        try {
          $updatedata = array(
            $post->field => $post->value
          );

          $page->update($updatedata);

          return response::json(array(
            'message' => 'Page has been successfully updated.',
          ), 200);
        }
        catch(Exception $e) {
          return response::json(array(
            'message' => "Unable to update page: " . $e->getMessage(),
          ), 400);
        }
      }
      else {
        return response::json(array(
          'message' => 'Page with pageid "'. $pageid .'" was not found.',
        ), 400);
      }
    }
    catch(Exceptionn $e) {
      return response::json(array(
        'message' => 'Failed to parse JSON data.',
      ), 400);
    }
  }
));


function contenteditableassets($kirby) {
  if(!$kirby->site()->user()) return;

  // http://{domain}/assets/plugins/{pluginName}/{optionalSubfolder}/{filename}
  $assetsURL = $kirby->urls()->assets() . "/plugins/contenteditable";

  ?>
  <link rel="stylesheet" href="<?= url($assetsURL . "/css/styles.css") ?>">
  <script src="<?= url($assetsURL . "/js/script.js") ?>"></script>

  <div class="contenteditable-controls" data-contenteditable-controls>
    <button class="button-save" data-contenteditable-save>✓</button>
    <button class="button-dismiss" data-contenteditable-dismiss>✗</button>
  </div>
  <?php
}
