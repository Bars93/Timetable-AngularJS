<?php
define("PATH_BASE", "./data/");
switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
    {
        if (isset($_GET['file'])) {
            $file = mysql_real_escape_string($_GET['file']);
            if (file_exists(PATH_BASE . $file)) {
                $data = file_get_contents(PATH_BASE . $file);
                header("Content-Type: application/json");
                http_response_code(200);
                echo $data;
            } else {
                header("Content-Type: text/plain; charset=UTF-8");
                http_response_code(404);
                echo 'Ошибка - Файл не существует';
            }
        } else {
            header("Content-Type: text/plain; charset=UTF-8");
            http_response_code(400);
            echo 'Ошибка запроса, параметр file не был передан или передан неверно, обратитесь к системному администратору';
        }
    }
        break;
    case "PUT":
    case "POST":
    {
        $inp = @json_decode(file_get_contents("php://input"), true);
        if (isset($inp['data']) && isset($inp['file'])) {
            $file = mysql_real_escape_string($inp['file']);
            if (!file_exists(PATH_BASE . $file) || (file_exists(PATH_BASE . $file) && is_writable(PATH_BASE . $file))) {
                $fp = fopen(PATH_BASE . $file, "w");
                if (fwrite($fp, $inp['data'])) {
                    fclose($fp);
                    header("Content-Type: text/plain; charset=UTF-8");
                    http_response_code(200);
                    echo 'success';
                } else {
                    header("Content-Type: text/plain; charset=UTF-8");
                    http_response_code(500);
                    echo 'Ошибка записи в файл';
                }
            } else {
                header("Content-Type: text/plain; charset=UTF-8");
                http_response_code(500);
                echo 'Ошибка создания/записи в файл';
            }
        } else {
            header("Content-Type: text/plain; charset=UTF-8");
            http_response_code(400);
            echo 'Ошибка запроса, параметры JSON переданы неверно, обратитесь к системному администратору';
        }
    }
        break;
    default:
        header("Content-Type: text/plain; charset=UTF-8");
        http_response_code(405);
        echo 'Такой запрос сервером не поддерживается';
        break;
}