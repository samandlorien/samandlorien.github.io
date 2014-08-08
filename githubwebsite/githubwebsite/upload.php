<?php
if(isset($_POST['food'])){
   $json_food = $_POST['food'];
   $raw_file = file_get_contents('food.json');
   $json_file = json_decode($raw_file, true);
   $new_food = array_merge( $json_file, $json_food );
   file_put_contents('food.json', $new_food);
}
// other uploads?
?>