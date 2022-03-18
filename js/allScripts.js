// These are the scripts that I insert at the end of the body of each HTML page

// // HTML that contains scripts to add
// let scriptsToAdd = `<script src="js/show-on-scroll.js"></script>
// <script src="js/topNavigation.js"></script>
// <script src="js/tableOfContents.js"></script>
// <script src="js/cursor.js"></script>`;

// HTML that contains scripts to add
let scriptsToAdd = `<script src="js/show-on-scroll.js"></script>
<script src="js/tableOfContents.js"></script>
<script src="js/cursor.js"></script>`;

// Add HTML to all-scripts id
$(`#all-scripts`).html(scriptsToAdd);
