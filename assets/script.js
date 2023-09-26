// FUNCTION to execute code only run after the DOM is fully loaded
$(document).ready(function() {

  // Add Day.js plugin for Ordinal Date Format - https://day.js.org/docs/en/plugin/loading-into-browser
  dayjs.extend(window.dayjs_plugin_advancedFormat);

  // CONTAINER/ELEMENT VARIABLE(S)
  const saveButton = $('.saveBtn');
  const hourContainers = $('div[id^="hour"]');
  const currentDay = $('#currentDay');

  // GLOBAL VARIABLE(S)
  const today = dayjs();

  // RENDER the current date in the header of the page:
  currentDay.text(today.format('dddd, MMMM Do')); // Need to add advanced format plug in for ordinal

  // FUNCTION to load data from localStorage by looping through each div with ID starting with "hour"
  function loadFromLocalStorage() {
    hourContainers.each(function() {
      const hourDivID = $(this).attr('id'); // get full ID of current DIV;
      const eventName = localStorage.getItem(hourDivID); // get corresponding event name to Div ID
        // RENDER retrieved data to textarea within this div
      $(this).find('textarea').val(eventName);
    });
  }
  
  // FUNCTION to take ID of parent div pair with textarea-input and save to localStorage on save-button click
  function saveToLocalStorage () {
    saveButton.click(function() {
      const hourDivID = $(this).closest('div').attr('id');
      const textInput = $(this).siblings('textarea');
      const eventName = textInput.val().trim();
      localStorage.setItem(hourDivID, eventName);
      // SUB-FUNCTION to display different alert depending on whether a new event has been saved or the field has been saved empty (i.e cleared)
      if (eventName !== '') {
        alert(eventName + ' successfully saved to schedule.');
      } else {
        alert('Event/appointment successfully cleared from schedule.')
      }
    });
  }

  // FUNCTION to alter formatting of each container depending on relation to current time
  function applyTimeFormatting() {
    hourContainers.each(function() {
      const classHour = $(this).attr('id').slice(-2); // Get the hour (last two digits) of the IDs
      const currentHour = today.format('HH'); // Get the 24-hour-of-day time in JS
      //SUB-FUNCTION to compare hour of each class with current hour and apply conditional formatting by applying respective classes
      if (classHour < currentHour) {
        $(this).addClass('past');
      } else if (classHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }
  
  // EXECUTE functions on initialisation
  loadFromLocalStorage();
  saveToLocalStorage();
  applyTimeFormatting();

});