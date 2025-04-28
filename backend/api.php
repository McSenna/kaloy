<?php
    include_once './config/connection.php';
    include_once './header.php';
    
    header('Content-Type: application/json');

    $res = ['error' => false];
    $action = isset($_GET['action']) ? $_GET['action'] : '';
        switch($action) {
            case 'fetch':
                fetchData();
                break;
   
            default:
            $res = [
                'type' => 'error',
                'message' => 'Invalid action'
            ];
            echo json_encode($res);
            break;
        }


        function fetchData() {
            global $connect;

            $stmt = $connect->prepare("SELECT * FROM employees");
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
    
            $data = [];
            while($users = $result->fetch_assoc()) {
                $data[] = $users;
            }
    
            echo json_encode($data);
        }

    