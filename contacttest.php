<?php

if($_POST["submit"]) {
    $recipient="your@email.address";
    $subject="Form to email message";
    $sender=$_POST["sender"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

    $thankYou="<p>Thank you! Your message has been sent.</p>";
}
?>

<!DOCTYPE html>

<html>
  <head>
    <!-- <link rel="icon" type="image/png" href="favicon-196x196.png"> -->
    <title>Sean Watters — Contact</title>
    <link rel="stylesheet" href="css/styles.css" type="text/css">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
  </head>

  <body>

    <?=$thankYou ?>

    
    <header>
      <div class="name_header">
        <a href="index" style="color: black; text-decoration: none;">SEAN WATTERS</a>
      </div>
      <div class="page_navigation_links">
         <a href="index" style="color: black">HOME</a> |
         <a href="blog" style="color: black">BLOG</a> |
         <a href="contact" style="color: black">CONTACT</a>
      </div>

      <div class="header_band">
        <h1 class="title_style" style="text-align: right;">contact</h1>
      </div>
    </header>

    <main>
      <h2 class="first_header_style">Info</h2>




  <div class="contact_form">

    <form action="contact.php" method="post" enctype="text/plain">
            <input name="name" type="text" class="contact_form_cells" id="name" placeholder="Name">
            <input name="email" type="email" class="contact_form_cells" id="email" placeholder="Email">
            <input name="subject" type="text" class="contact_form_cells" id="subject" placeholder="Subject">
       <div>
            <textarea name="message" rows="5" class="contact_message_cell" id="message" placeholder="Message"></textarea>
       </div>
       <div>
            <input name="submit" type="submit" class="send_button" id="submit" value="Send">
       </div>
     </form>

   </div>

    </main>

    <footer>
      <div class="footer_band">
        <div class="social_media_links">
           <a href="https://twitter.com/sean_watters" style="color: whitesmoke; text-decoration: underline;">twitter</a> |
           <a href="https://www.linkedin.com/in/sean-watters-2877b9125/" style="color: whitesmoke; text-decoration: underline;">LinkedIn</a> |
           <a href="https://github.com/seanwatters" style="color: whitesmoke; text-decoration: underline;">github</a>
        </div>
      </div>
      <div class="tm">© 2019 sean watters</div>
    </footer>
  </body>
</html>
