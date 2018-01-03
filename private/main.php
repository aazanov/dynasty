<?php



    $encoding = "utf-8";
    $from_name = $_POST['email'];
    $mail_to = "a_azanov@mail.ru";
    $mail_subject = 'Invation';
    $mail_message = 'Please invite me, my name is '.$_POST['first_name']
    .'\r\n You can find me on '.$_POST['social'];

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
	$result = mail($mail_to, $mail_subject, $mail_message, $header);
    if ($result){
        echo $_POST['email']." sent successfully";
	}
    else
        echo ('Have a Fault');

?>