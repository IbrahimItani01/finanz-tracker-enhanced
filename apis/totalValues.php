<?php
include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"]; 

$incomeQuery = $connection->prepare("SELECT SUM(amount) AS total_income FROM incomes WHERE user_id = ?");
$incomeQuery->bind_param("i", $id);
$incomeQuery->execute();
$incomeResult = $incomeQuery->get_result();
$incomeData = $incomeResult->fetch_assoc();

// Query to get the sum of expenses
$expenseQuery = $connection->prepare("SELECT SUM(amount) AS total_expenses FROM expenses WHERE user_id = ?");
$expenseQuery->bind_param("i", $id);
$expenseQuery->execute();
$expenseResult = $expenseQuery->get_result();
$expenseData = $expenseResult->fetch_assoc();

// Combine both results into a response
$response = [
    "status" => "success",
    "total_income" => $incomeData['total_income'] ?? 0,  // If no result, return 0
    "total_expenses" => $expenseData['total_expenses'] ?? 0  // If no result, return 0
];

// Send the JSON response
echo json_encode($response);

