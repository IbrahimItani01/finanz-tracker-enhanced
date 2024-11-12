<?php

include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$id =$data["id"];
$amount =$data["amount"];
$note =$data["note"];

$query = $connection->prepare("UPDATE incomes SET amount =?,note =? WHERE id =?");
$query->bind_param("isi",  $amount, $note,$id);
if($query->execute()){
    $response = [
        "status"=> "success",
        "message"=> "edited income"
    ];
    echo json_encode($response);
}else{
    echo "Error editing income";
}