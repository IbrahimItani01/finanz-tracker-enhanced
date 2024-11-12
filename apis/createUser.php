 <?php


 include "connection.php";
 $data = json_decode(file_get_contents("php://input"), true);

 $userName = $data["name"];
 $password = $data["password"];
 $budget = $data["budget"];


$hashed = password_hash($password,PASSWORD_DEFAULT);
$checkUserExist = $connection->prepare("SELECT id,name,password from users where name=?");
$checkUserExist->bind_param( "s", $userName);
$checkUserExist->execute();
$result = $checkUserExist->get_result();
if ($result->num_rows> 0) {
    $row = $result->fetch_assoc();
    $retrievedPassword =json_encode($row["password"]);
    // echo gettype($hashed) ;
    if(password_verify($password,$row['password'])){
        $response = [
            "status"=>"success",
            "message"=>"User found and authenticated",
            "userName"=> $row["name"],
            "userId"=>$row["id"],
        ];
        echo json_encode($response);
    }else{
        $response = [
            "status"=>"failed",
            "message"=>"User found but failed to authenticate"
        ];
        echo json_encode($response);
    }
}
else{
    $query = $connection->prepare("INSERT INTO users (name, budget, password) VALUES (?, ?,?)");
    $query->bind_param("sis", $userName, $budget,$hashed);
    
    if($query->execute() === TRUE) {    
        $userId = $connection->insert_id;
        $response = [
            "status"=> "success",
            "message"=> "user: added $userName to DB",
            "userId"=> $userId,        ];
        echo json_encode( $response );
    }else{
        $response = [
            "status"=>"failed",
            "message"=>"failed to add user"
        ];
        echo json_encode($response);
    }
    exit; // Ensures no other output is sent
}

