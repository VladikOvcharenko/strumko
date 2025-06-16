<?php
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '') { http_response_code(422); exit('Name required'); }
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422); exit('Bad e-mail');
}

$from = 'noreply@strumko.com';
$to   = 'strumko.energy.office@gmail.com';
$subj = 'Website form submission';

$lines = ["Name: $name"];
if ($email)   $lines[] = "Email: $email";
if ($phone)   $lines[] = "Phone: $phone";
if ($message) $lines[] = "\n$message";

$body = implode("\n", $lines);

$headers  = "From: Website <$from>\r\n";
if ($email) $headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$sent = mail($to, $subj, $body, $headers, "-f $from");

if ($sent) {
    header('Location: https://strumko.com?success=true');
    exit;
}

http_response_code(500);
echo 'Mail transfer failed';
