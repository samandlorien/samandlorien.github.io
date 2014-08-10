<?php
if(isset($_POST['food_allergy'])){
   $json_food = $_POST['food_allergy'];
   $json_food['reaction']=(int)$json_food['reaction'];  // because it comes over as a string
   $raw_file = file_get_contents('food.json');
   $json_file = json_decode($raw_file, true);
   array_push( $json_file['allergies'], $json_food );
   file_put_contents('food.json', json_encode($json_file));
}
if(isset($_POST['new_chef']))
{
   $json_chef = $_POST['new_chef'];
   $raw_file = file_get_contents('food.json');
   $json_file = json_decode($raw_file, true);
   for($i=0; $i<count($json_file['calendar']); $i++) 
   {
      if($json_file['calendar'][$i]['day'] == (int)$json_chef['day'])
	  {
         $chef_string = 'chef' . $json_chef['time'];
         $json_file['calendar'][$i][$chef_string] = $json_chef['chef'];
      }
   }
   file_put_contents('food.json', json_encode($json_file));
}
// other uploads?
?>