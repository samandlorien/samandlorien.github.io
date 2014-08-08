<?php
var_dump($_POST);
//$sam = $this->input->post('data');
//var_dump($sam);
//echo json_decode($data);
echo " php ";
if(isset($_POST['myData'])){
 $obj = $_POST['myData'];
 //file_put_contents('resultsd.json', json_encode($obj));
$inp = file_get_contents('resultsd.json');
$tempArray = json_decode($inp, true);
echo "temp";
echo json_encode($tempArray);
echo " obj";
echo json_encode($obj);
echo " merge";


//$a1 = json_decode( $json1, true );
//$a2 = json_decode( $json2, true );

//$res = array_merge_recursive( $tempArray, $obj );
$res = array_merge( $tempArray, $obj );

$resJson = json_encode( $res );
echo $resJson;



//echo json_encode([$tempArray $obj]);
//$asdf = array_merge($tempArray,$obj);
var_dump($asdf);
$jsonData = json_encode($asdf);
echo $jsonData;
//$tempArray.concat($data);
//array_push($tempArray, $data);
//$jsonData = json_encode($tempArray);
file_put_contents('results.json', $jsonData);
echo $obj;
printf('stuff');
 //some php operation
}
printf('other stuff');
echo " okay... ";
echo $_POST;
die(' okay ');
  /*var_dump($_POST);
  die('hey');
  if(isset($_POST['categories'])) {
    $json = $_POST['categories'];
    var_dump(json_decode($json, true));
  } else {
    echo "Noooooooob";
  }*//*
?>
<?php
   // Configuration - Your Options
      $allowed_filetypes = array('.json'); // These will be the types of file that will pass the validation.
      $max_filesize = 100288; // Maximum filesize in BYTES (currently 0.5MB).
      $upload_path = './files/'; // The place the files will be uploaded to (currently a 'files' directory).
 
   $filename = $_FILES['userfile']['name']; // Get the name of the file (including file extension).
   $ext = substr($filename, strpos($filename,'.'), strlen($filename)-1); // Get the extension from the filename.
 
   // Check if the filetype is allowed, if not DIE and inform the user.
   if(!in_array($ext,$allowed_filetypes))
      die('go away troll');
 
   // Now check the filesize, if it is too large then DIE and inform the user.
   if(filesize($_FILES['userfile']['tmp_name']) > $max_filesize)
      die('go away troll');
 
   // Check if we can upload to the specified path, if not DIE and inform the user.
   if(!is_writable($upload_path))
      die('go away troll');
 
   // Upload the file to your specified path.
   if(move_uploaded_file($_FILES['userfile']['tmp_name'],$upload_path . $filename))
         echo 'Your file upload was successful, view the file <a href="' . $upload_path . $filename . '" title="Your File">here</a>'; // It worked.
      else
         echo 'There was an error during the file upload.  Please try again.'; // It failed :(.
 */
?>