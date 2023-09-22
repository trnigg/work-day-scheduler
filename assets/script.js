// Execute code only run after the DOM is fully loaded
$(document).ready(function() {

  $(function () {

    const saveButton = $('.saveBtn');

    // On page-load, load data from localStorage by looping through each div with ID starting with "hour"
    $('div[id^="hour"]').each(function() {
      const hourDivID = $(this).attr('id'); // get full ID of current DIV;
      const eventName = localStorage.getItem(hourDivID); // get corresponding event name to Div ID
      console.log(hourDivID, eventName);
  
      // If eventName is not 'null', display event name in text input area
      if (eventName) {
        $(this).find('textarea').val(eventName);
      }
    });

    // on save-button click, take ID of parent div pair with input if not empty and save to localStorage 
    saveButton.click(function() {
      const hourDivID = $(this).closest('div').attr('id');
      const textInput = $(this).siblings('textarea');
      const eventName = textInput.val().trim();
      if (eventName !== "") {
        localStorage.setItem(hourDivID, eventName);
        alert(eventName + " successfully saved to schedule.");
      } else {
        alert("Please enter name of event/appointment before saving.")
      }
    });


    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    // Get(2 digit hour)
      //if greater than ID-OUR = past
      //else if equal present
      //else () future
      // advanced format plug in for ordinal advanced format plugin could help for 'kk' (2-dig year from 0 comparison)

    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //


    // TODO: Add code to display the current date in the header of the page.
    let today = dayjs();
    const currentDay = $('#currentDay');
    currentDay.text(today.format(' dddd, MMMM D')); // Need to add advanced format plug in for ordinal

  });

});