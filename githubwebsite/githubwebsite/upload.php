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
   
   
   echo json_encode($json_file['calendar']);
  // foreach($json_file['calendar'] as $day)
for($i=0; $i<count($json_file['calendar']); $i++) 
   {
   $day = $json_file['calendar'][$i];
		if($day['day'] == (int)$json_chef['day'])
		{
		echo "day ";
		echo $day['day'];
		echo (int)$json_chef['day'];
		switch($json_chef['time'])
	   {
	   case '1':
	   echo "chef1";
	   var_export($day['chef1']);
	   echo "------------";
	   echo $json_chef['chef'];
	   $day['chef1'] = $json_chef['chef'];
	   echo $day['chef1'];
	   //$json_file['calendar'][i].chef1 = (int)$json_chef['chef'];
	   echo "sadfasdf---------------|";
	   echo $json_file['calendar'][$i]['chef1'];
	   echo "|";
	   $json_file['calendar'][$i]['chef1'] = $json_chef['chef'];
	   echo $json_file['calendar'][$i]['chef1'];
	   break;
	   case '2':
	   //$json_file['calendar'][i].chef2 = $json_chef['chef'];
	   break;
	   case '3':
	   //$json_file['calendar'][i].chef3 = $json_chef['chef'];
	   break;
	   }
		}
   }
   /*for(int i = 0; i < $json_file['calendar']->length; ++i)
   {
	if ($json_file['calendar'][i].day == (int)$json_chef['day'])
	{
	   switch((int)$json_chef['time'])
	   {
	   case 1:
	   $json_file['calendar'][i].chef1 = $json_chef['chef'];
	   break;
	   case 2:
	   $json_file['calendar'][i].chef2 = $json_chef['chef'];
	   break;
	   case 3:
	   $json_file['calendar'][i].chef3 = $json_chef['chef'];
	   break;
	   }
    }
   }*/
    echo json_encode($json_file['calendar']);
}
// other uploads?
?>