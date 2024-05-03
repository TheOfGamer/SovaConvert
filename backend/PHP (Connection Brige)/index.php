<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include('config.php');
header('Access-Control-Allow-Origin: *');
$extfrom = $_POST["inputType"];
$extto = $_POST["outputType"];
$file = $_FILES["file"];

function login_to_service($username, $password) {
    $url = "https://cloud.sovagroup.one/api/login.php?login={$username}&pass={$password}";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    $response = curl_exec($ch);
    if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {
        preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $response, $matches);
        $cookies = array();
        foreach($matches[1] as $item) {
            parse_str($item, $cookie);
            $cookies = array_merge($cookies, $cookie);
        }
        return $cookies;
    } else {
        return "Ошибка: " . curl_getinfo($ch, CURLINFO_HTTP_CODE);
    }
    curl_close($ch);
}

function upload_file($file_path, $cookies, $folder = null) {
    $url = "https://cloud.sovagroup.one/api/upload.php";
    $data = array('fileToUpload' => new CURLFile($file_path));
    if ($folder) {
        $data['folder'] = $folder;
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIE, http_build_query($cookies, '', '; '));
    $response = curl_exec($ch);
    if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {
        return $response;
    } else {
        return "Ошибка: " . curl_getinfo($ch, CURLINFO_HTTP_CODE);
    }
    curl_close($ch);
}

$cookies = login_to_service($OC_username, $OC_password);

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    if ($file['error'] == 0) {
        $unique_file_name = uniqid() . '.' . $extto;
        $unique_file_path = './files/' . $unique_file_name;
        if (move_uploaded_file($file['tmp_name'], $unique_file_path)) {
            $cookies = login_to_service($OC_username, $OC_password);
            $result = upload_file($unique_file_path, $cookies);
        } else {
            echo "Ошибка при сохранении файла.";
            exit();
        }
    } else {
            echo "Ошибка при загрузке файла: " . $file['error'];
            exit();
        }
} else {
    echo "Файл не был загружен.";
    exit();
}

$file_link = "https://cloud.sovagroup.one/users/517391744/" . $unique_file_name;

// Используем SSH2
$ssh = ssh2_connect($host);
if (!$ssh) {
    exit('Не удалось установить соединение');
}

if (!ssh2_auth_password($ssh, $username, $password)) {
    exit('Ошибка аутентификации');
}

$stream = ssh2_exec($ssh, 'python /home/user/sgadmin/convert.py ' . $file_link . ' ' . $extfrom . ' ' . $extto);
stream_set_blocking($stream, true);

echo stream_get_contents($stream);

fclose($stream);
echo($file_link);
?>
