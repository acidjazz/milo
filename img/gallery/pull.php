#!/bin/php
<?php

$server = 'ftp.photoctm.com';
$user = 'ftpeventuser';
$password = 'ftp$2014';
$conn = ftp_connect($server);

ftp_login($conn, $user, $password);
ftp_pasv($conn, TRUE);

echo "[MILO] :: connection established\r\n";

$remote = ftp_nlist($conn, '/live');

$handle = opendir('.');
$local = [];

while (false !== ($entry = readdir($handle))) {
  $local[] = $entry;
}

echo "[MILO] :: checking for new files\r\n";

$diff = array_diff($remote, $local);

foreach ($diff as $newfile) {
  ftp_get($conn, $newfile, '/live/'.$newfile, FTP_BINARY);
  echo "[MILO] :: NEW FILE [ $newfile ]\r\n";
}

$handle = opendir('.');
$files = [];

while (false !== ($entry = readdir($handle))) {

  if (strpos($entry, '.jpg') !== false) {
    $files[filemtime($entry)] = $entry;
  }

  if (strpos($entry, '.png') !== false) {
    $files[filemtime($entry)] = $entry;
  }

  if (strpos($entry, '.jpeg') !== false) {
    $files[filemtime($entry)] = $entry;
  }

}

ksort($files);

// update config file
$cfg = json_decode(file_get_contents('../../cfg/config.json'), true);
$cfg['cfg']['gallery'] = '';
foreach ($files as $file) {
  $cfg['cfg']['gallery'][] = ['img' => $file];
}

$json = json_encode($cfg, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

file_put_contents('../../cfg/config.json', $json);

echo "[MILO] :: config update complete\r\n";
echo "[MILO] :: compiling thumbnails..\r\n";

exec('mogrify  -format jpg -path thumbs -thumbnail 211x144 *.jpg');

echo "[MILO] :: compilation complete..\r\n";

