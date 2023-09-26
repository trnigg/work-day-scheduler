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
      // if (eventName) {
        $(this).find('textarea').val(eventName);
      // }
    });

    // on save-button click, take ID of parent div pair with input (ifNot empty) and save to localStorage 
    saveButton.click(function() {
      const hourDivID = $(this).closest('div').attr('id');
      const textInput = $(this).siblings('textarea');
      const eventName = textInput.val().trim();
      localStorage.setItem(hourDivID, eventName);
      if (eventName !== "") {
        alert(eventName + " successfully saved to schedule.");
      } else {
        alert("Event/appointment successfully cleared from schedule.")
      }
    });

    // Get the 24-hour-of-day time in JS
    let currentHour = dayjs().format("HH");
    console.log(currentHour);

    // Get all IDs that starts with "hour"
    $('div[id^="hour"]').each(function() {
      // Get the hour (last two digits) of the IDs
      let classHour = $(this).attr('id').slice(-2);
      console.log(classHour);
      //compare hour of each class with current hour and apply conditional formatting by applying respective classes
      if (classHour < currentHour) {
        $(this).addClass("past");
      } else if (classHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });

    // TODO: Add code to display the current date in the header of the page.
    let today = dayjs();
    const currentDay = $('#currentDay');
    currentDay.text(today.format(' dddd, MMMM D')); // Need to add advanced format plug in for ordinal

  });

});