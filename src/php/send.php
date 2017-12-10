<?php

    $encoding = "utf-8";
    $from_name = $_POST['email'];
    $mail_to = "a_azanov@mail.ru";
    $mail_subject = 'Новое обращение';
    $mail_message = "Имя: ".$_POST['name']
    ."\r\nemail: ".$_POST['mail']
    ."\r\nТелефон: ".$_POST['phone']
    ."\r\nРасчетная сумма неустойки: ".$_POST['volume']
    ."\r\nСообщение:\r\n\r\n"
    .$_POST['message'] ;

//    $mail_message = filter_var($mail_message , FILTER_SANITIZE_EMAIL);
    $mail_message = htmlspecialchars($mail_message);

    // Preferences for Subject field
    $subject_preferences = array(
        "input-charset" => $encoding,
        "output-charset" => $encoding,
        "line-length" => 76,
        "line-break-chars" => "\r\n"
    );

    // Mail header
    $header = "Content-type: text/html; charset=".$encoding." \r\n";
    $header .= "From: в-защиту-дольщика.рф <".$_POST['email']."> \r\n";
    $header .= "MIME-Version: 1.0 \r\n";
    $header .= "Content-Transfer-Encoding: 8bit \r\n";
    $header .= "Date: ".date("r (T)")." \r\n";
    $header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);

    // Send mail
	$result = mail($mail_to, $mail_subject, $mail_message);
    if ($result){
        echo $_POST['email']." sent successfully";
	}
    else
        echo ('Have a Fault');

?>