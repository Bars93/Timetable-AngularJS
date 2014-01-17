<?php
if (isset($_POST['data']) && isset($_POST['file'])) {
    $file = 'data/' . $_POST['file'];
    $data = $_POST['data'];
    $fp = fopen($file, 'w');
    if (fwrite($fp, $data)) {
        echo 'success';
    } else {
        echo 'error file write';
    }
    fclose($fp);
} else {
    echo 'error input data';
}