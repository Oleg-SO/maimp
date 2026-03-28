<?php
header('Content-Type: application/json');

// Настройки
$to_mechanic = 'mechanic@maimp.ru'; // СЮДА ВСТАВЬТЕ ПОЧТУ ДЛЯ МЕХАНИКА
$to_electric = 'office@maimp.ru';   // СЮДА ПОЧТА ДЛЯ ЭЛЕКТРИКА
$site_name = 'МашиноИмпульс';

// Определяем тип заявки
$form_type = $_POST['form_type'] ?? 'electric';

if ($form_type === 'mechanic') {
    $to = $to_mechanic;
    $subject = 'Заявка на вызов автомеханика';
    $message = "<h2>Новая заявка на вызов автомеханика</h2>";
    $message .= "<p><strong>Имя:</strong> " . htmlspecialchars($_POST['name'] ?? '') . "</p>";
    $message .= "<p><strong>Телефон:</strong> " . htmlspecialchars($_POST['phone'] ?? '') . "</p>";
    $message .= "<p><strong>Автомобиль:</strong> " . htmlspecialchars($_POST['car'] ?? 'Не указано') . "</p>";
    $message .= "<p><strong>Проблема:</strong> " . nl2br(htmlspecialchars($_POST['problem'] ?? 'Не указана')) . "</p>";
} else {
    $to = $to_electric;
    $subject = 'Заявка на вызов автоэлектрика';
    $message = "<h2>Новая заявка на вызов автоэлектрика</h2>";
    $message .= "<p><strong>Имя:</strong> " . htmlspecialchars($_POST['name'] ?? '') . "</p>";
    $message .= "<p><strong>Телефон:</strong> " . htmlspecialchars($_POST['phone'] ?? '') . "</p>";
    $message .= "<p><strong>Сообщение:</strong> " . nl2br(htmlspecialchars($_POST['message'] ?? 'Не указано')) . "</p>";
}

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: $site_name <noreply@maimp.ru>\r\n";
$headers .= "Reply-To: " . ($_POST['email'] ?? $to) . "\r\n";

// Отправляем письмо
$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки. Попробуйте позже.']);
}