/**************************************************
Table of contents:
Opens when user clicks on "Works" button
Contains functions that handle openNav and closeNav
Insert this HTML into the table-of-contents id on each page
**************************************************/

// HTML to insert into table-of-contents id
let tableOfContentsHTML = `
<div class="cursor"></div>
<div class="cursor2"></div>

<h1>Works</h1>
<section class="all-groups">
  <section class="group" id="group2">
    <a href="hungry-fishies.html">
      <p>Hungry Fishies</p>
    </a>
    <a href="stayhere.html">
      <p>Stayhere</p>
    </a>
    <a href="array-we-code.html">
      <p>Array We Code</p>
    </a>
    <a href="snails-journey.html">
      <p>A Snail's Journey</p>
    </a>
    <a href="personal-boundaries.html">
      <p>Personal Boundaries</p>
    </a>
    <a href="star-sprout.html">
      <p>Star Sprout</p>
    </a>
  </section>



  <a href="proposal.html">
    <h1>Proposal & Moodboard</h1>
  </a>
  <a href="assets/images/narrative/narrative.pdf">
    <h1>Narrative</h1>
  </a>
</section>`;

// // CONTACT HERE
// <section class="group" id="contact">
//   <h2>Contact</h2>
//   <a href = "mailto: sharonkudesigns@gmail.com">
//     <p>sharonkudesigns@gmail.com</p>
//   </a>
// </section>

// Inserting into table-of-contents id
$(`#table-of-contents`).html(tableOfContentsHTML);

// Open navigation when someone clicks on the span element
function openNav() {
  $(`#table-of-contents`).css({
    width: `100%`,
    padding: `100px`,
  });

  // $(`#table-of-contents`).removeClass("hide-table-of-contents");
  // $(`#table-of-contents`).addClass("show-table-of-contents");

  $(`#close-button`).css({
    display: `flex`,
  });
}

// Close navigation when someone clicks on the "x" symbol inside the overlay
function closeNav() {
  $(`#table-of-contents`).css({
    width: `0%`,
    padding: `0%`,
  });

  // $(`#table-of-contents`).removeClass("show-table-of-contents");
  // $(`#table-of-contents`).addClass("hide-table-of-contents");

  $(`#close-button`).css({
    display: `none`,
  });
}
