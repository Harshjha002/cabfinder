<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); 

$inputData = json_decode(file_get_contents("php://input"), true) ?? $_POST;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($inputData)) {
        echo json_encode(["success" => false, "message" => "No data received"]);
        exit;
    }

    $data = [
        "source" => $inputData["source"] ?? "N/A",
        "destination" => $inputData["destination"] ?? "N/A",
        "carType" => $inputData["carType"] ?? "N/A",
        "seater" => $inputData["seater"] ?? "N/A",
        "travelDate" => $inputData["travelDate"] ?? "N/A",
        "returnDate" => $inputData["returnDate"] ?? "N/A"
    ];

    error_log("Received Data: " . print_r($data, true));

    echo json_encode([
        "success" => true,
        "message" => "Form submitted successfully!",
        "received_data" => $data
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>
