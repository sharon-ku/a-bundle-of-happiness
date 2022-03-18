/**************************************************
Top navigation:
Contains HTML for
- top corner logo
- "Works" button at the top right corner
- "X" button when table of contents is opened
Insert this HTML into the top-navigation id on each page
**************************************************/

// HTML to insert into top-navigation id
let topNavigationHTML = `<section id="logo">
  <a href="index.html">
    <img src="assets/images/logo.png" alt="logo" />
  </a>
</section>

<nav id="close-button">
  <!-- Button to close the overlay navigation -->
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">X</a>
</nav>

<nav class="top-navigation">
  <a href="javascript:void(0)" class="active" onclick="openNav()">
    <p>Works ☰</p>
  </a>
</nav>`;

// Inserting into top-navigation id
$(`#top-navigation`).html(topNavigationHTML);
