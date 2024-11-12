<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Specify allowed methods
 header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Specify allowed headers
$connection = new mysqli(
    "localhost",
    "root",
    "",
    "finanz_db",
);

if ($connection->connect_error) {
    die("Error connecting with DB". $connection->connect_error);
}