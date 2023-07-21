<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ninja Tactics</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="grid-board">
        <div class="cell" data-char="Naruto"><img src="naruto.jpg" alt="Naruto"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell" data-char="Shikamaru"><img src="shikamaru.jpg" alt="Shikamaru"></div>
    </div>

    <div class="message" id="message">Select a character</div>
    
    <!-- Actions Dropdown -->
    <div class="actions" id="actions">
        <ul>
            <li>Move</li>
            <li>Attack</li>
            <li>Support</li>
            <li>Plan</li>
        </ul>
    </div>

    <script src="script.js"></script>
</body>
</html>
