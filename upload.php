<?php
if(isset($_POST['food_allergy'])){
   $json_food = $_POST['food_allergy'];
   $json_food['reaction']=(int)$json_food['reaction'];  // because it comes over as a string
   $raw_file = file_get_contents('food.json');
   $json_file = json_decode($raw_file, true);
   array_push( $json_file['allergies'], $json_food );
   file_put_contents('food.json', json_encode($json_file));
}
// other uploads?
?>