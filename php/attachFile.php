<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json; charset=UTF-8");
    
    $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
    
    $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE
    
    $name = $params->name;
    $selectedFile = $params->base64textString;
    $folderName = $params->type;
    $selectedFile = base64_decode($selectedFile);
    
    switch ($folderName) {
        case "profilePicture":
            $filePath = $_SERVER['DOCUMENT_ROOT'].'/php/api/profilePicture/'.$name;
        break;
        case "postPicture":
            $filePath = $_SERVER['DOCUMENT_ROOT'].'/php/api/postPicture/'.$name;
        break;
        case "attachedFile":
            $filePath = $_SERVER['DOCUMENT_ROOT'].'/php/api/attachedFile/'.$name;
        break;
        /* Esto es para saber en que carpetas van, es decir, si luego se va a subir 
        un archivo adjunto seria otro case que le llega por type desde el front */
        
    }  
    
    file_put_contents($filePath, $selectedFile);
    
    class Result {}
    // GENERA LOS DATOS DE RESPUESTA
    $response = new Result();
    
    $response->resultado = 'OK';
    $response->mensaje = 'Sended';
    $response->hola = $filePath;
    
    header('Content-Type: application/json');
    echo json_encode($response); // MUESTRA EL JSON GENERADO */
?>