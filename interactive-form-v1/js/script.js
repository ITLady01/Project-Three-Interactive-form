/******************************************
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
******************************************/


// ************************************ //
//           JOB ROLE SECTION         //
// ************************************ //

/*** I created the three constant variables 
 1) First function is $name input and 
This the function focus for Jquery and it will pull the Id "name" from the HTML
 I have added the Focus function the Name input field when document loads
  ***/
const $nameInput = $('#name');
const $title = $('#title');
const $otherTitle = $('#other-title');

$nameInput.focus();// tested the code and it worked

// Remove the Other Title input field once document loads
$otherTitle.remove();

// This is the listener being added to the Other Title input field when user selects "Other"
//I have added the if and else statements
$title.change(() => {
	const val = $('#title option').filter(':selected').val();
	if (val === 'other') {
		$title.parent().append($otherTitle);
	}
	else {
		$otherTitle.remove();
	}
});

// ************************************ //
//         T-SHIRT INFO SECTION         //
// ************************************ //

/***This is the const variables 
  1) Div Color is a constant and the value can't be changed this will pull the ID from the HTML file 
 The rest of the variables set as constant and the infomation will be pulled
  ***/

const $DivColor = $('#colors-js-puns');
const $SelectColor = $('#color');
const $ColorOptions = $('#color option');
const $jsPunsOpts = $ColorOptions.slice(0, 3);
const $iHeartJSOpts = $ColorOptions.slice(3, 6);totalcost
const designTypeRegEx = /\s*\(.*/;

// Hide the color section
$DivColor.hide();

// Change the text to only show the color name
// i.e. Removes the text ' (JS Puns shirt only)' from each color
for (let i = 0; i < $ColorOptions.length; i += 1) {
	const colorName = $ColorOptions[i].innerHTML;
	$ColorOptions[i].innerHTML = colorName.replace(designTypeRegEx, '');
}

// On t-shirt design change, add the correct group of colors back
$('#design').change(() => {
	const val = $('#design option').filter(':selected').val();

	$DivColor.show();
	// Remove any lingering options
	$SelectColor.empty();

	// Only append appropriate group of options	
	if (val === 'js puns') {
		$SelectColor.append($jsPunsOpts);
	}
	else if (val === 'heart js') {
		$SelectColor.append($iHeartJSOpts);
	}
	else {
		$DivColor.hide();
	}
	$SelectColor.prop('selectedIndex', 0);
});

// ************************************ //
//    REGISTER FOR ACTIVITIES SECTION   //
// ************************************ //
//Created the two variables for this will pull from the div class total
const $totalValues = $('<div class="total"><p></p></div>');
let total = 0;

// append html elements that displays the total cost of activities
$('.activities').append($totalValues);

// Adds all the listeners for the activities checkboxes
addActivityListener('all', 200);
addActivityListener('js-frameworks', 100, 'express');
addActivityListener('js-libs', 100, 'node');
addActivityListener('express', 100, 'js-frameworks');
addActivityListener('node', 100, 'js-libs');
addActivityListener('build-tools', 100);
addActivityListener('npm', 100);

// EFFECTS: adds a change listener to an activity checkbox,
//          when checked, calculates the price of the total and updates the html text
function addActivityListener(ActivityName, price, NameOfConflict = '') {

	const $activity = $('.activities input[name=' + ActivityName + ']');

	$activity.change(() => {
		if ($activity.is(':checked')) {
			total += price;
			$('.total p').text('Total: $' + total);
			// in case of conflict, toggle the conflicting activity
			if (NameOfConflict !== '') {
				toggleActivity(NameOfConflict, false);
			}
		}
		else {
			total -= price;
			$('.total p').text('Total: $' + total);
			if (NameOfConflict !== '') {
				toggleActivity(NameOfConflict, true);
			}
		}
	});
}

// CHANGES: toggles the activity to be enabled or disabled based on "enable" boolean
function toggleActivity(ActivityName, enable) {

	const $activity = $('.activities input[name=' + ActivityName + ']');

	if (enable) {
		$activity.prop('disabled', false);
		$activity.parent().removeClass('disabled');
	}
	else {
		$activity.prop('disabled', true);
		$activity.parent().addClass('disabled');
	}

}

// ************************************ //
//         PAYMENT INFO SECTION         //
// ************************************ //

// Add IDs to paypal and bitcoin paragraphs for easy selection
$('#credit-card').next().attr('id', 'paypal');
$('#credit-card').next().next().attr('id', 'bitcoin');

const $payment = $('#payment');
const $ccDiv = $('#credit-card');
const $paypalDiv = $('#paypal');
const $bitcoinDiv = $('#bitcoin');

// Default credit card option as selected and hide others
$payment.prop('selectedIndex', 1);
$paypalDiv.hide();
$bitcoinDiv.hide();

// On payment type change, display the correct payment type fields or info
$payment.change(() => {
	const val = $('#payment option').filter(':selected').val();
	switch (val) {

		case 'select_method':
			$ccDiv.hide();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
		case 'credit card':
			$ccDiv.show();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
		case 'paypal':
			$ccDiv.hide();
			$paypalDiv.show();
			$bitcoinDiv.hide();
			break;
		case 'bitcoin':
			$ccDiv.hide();
			$paypalDiv.hide();
			$bitcoinDiv.show();
			break;
		default:
			$ccDiv.show();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
	}
});

// ************************************ //
// FORM VALIDATION FUNCTIONS AND EVENTS //
// ************************************ //

// EFFECTS: Compares the regEx to the input val and returns true if matched
//          Adds an error class and appends an error message when not matched
function isValidInput($input, regEx, val, message = '') {

	if (regEx.test(val)) {
		// Remove possible error class and error message when test passes
		$input.removeClass('error');

		if ($input.prev().filter('.error-message').length !== 0) {
			$input.prev().remove();
			
		}

		return true;
	}
	else {
		$input.addClass('error');

		// Check for empty versus malformatted input, display appropriate message
		if (val === '') {
			message = ('Please enter your ').concat(message);
		}
		else {
			message = 'Your ' + message + ' is formatted incorrectly'
		}

		// Check for existence of error message, add html to document, or change text
		if ($input.prev().filter('.error-message').length === 0)
			$input.before('<p class="error-message">' + message + '</p>');
		else {
			$input.prev().filter('.error-message').text(message);
		}

		return false;
	}

}

// EFFECTS: Checks for at least one selected (checked) activity, returns false otherwise
//          Handles error message adding/removing depending on check
function isAttendingActivity() {

	const $activities = $('.activities input');
	const $errorHTML = $('<p class="error-message">Please select at least one activity.</p>');

	// If there is at least 1 checked activity, returns true
	if ($activities.filter(':checked').length) {
		$('.activities > .error-message').remove();
		return true;
	}
	else {
		if ($('.activities > .error-message').length === 0)
			$('.activities legend').after($errorHTML);
		return false;
	}
}

// EFFECTS: Call this function in order to add real-time form validation
//          Currently only supports Name and Email input fields
function realtimeValidation() {

	const nameRegEx = /[a-zA-Z]{1,}/;

	const $emailInput = $('#mail');
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// These listeners bind to input events, and check the validity of each input
	$nameInput.bind('input', () => { isValidInput($nameInput, nameRegEx, $nameInput.val(), 'name') });
	$emailInput.bind('input', () => { isValidInput($emailInput, emailRegEx, $emailInput.val(), 'email') });
}


// EFFECTS: Calls input validation functions and returns true if all pass
//          If one or more validation functions fail, the function returns false
function validateForm() {
		const nameRegEx = /[a-zA-Z]{1,}/;
	const nameVal = $nameInput.val();

	const $emailInput = $('#mail');
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const emailVal = $emailInput.val();

	const $ccInput = $('#cc-num');
	const ccRegEx = /^[0-9]{13,16}$/;
	const ccVal = $ccInput.val();

	const $zipInput = $('#zip');
	const zipRegEx = /^[0-9]{5}$/;
	const zipVal = $zipInput.val();

	const $cvvInput = $('#cvv');
	const cvvRegEx = /^[0-9]{3}$/;
	const cvvVal = $cvvInput.val();

	let isValid = true;

	// Each condition calls valid check. If the check returns false, we flip the isValid flag
	if (!isValidInput($nameInput, nameRegEx, nameVal, 'name')) {
		isValid = false;
	}
	if (!isValidInput($emailInput, emailRegEx, emailVal, 'email')) {
		isValid = false;
	}
	if (!isAttendingActivity()) {
		isValid = false;
	}

	// Only check for credit card validation if "Credit Card" payment type is selected
	if ($('#payment option').filter(':selected').val() === 'credit card') {

		if (!isValidInput($ccInput, ccRegEx, ccVal, 'card number')) {
			isValid = false;
		}
		if (!isValidInput($zipInput, zipRegEx, zipVal, 'zip code')) {
			isValid = false;
		}
		if (!isValidInput($cvvInput, cvvRegEx, cvvVal, 'CVV')) {
			isValid = false;
		}
	}

	// Return the flag, will be false if any of the tests failed
	return isValid;
}

// Call the function for enabling real-time validation on the form
realtimeValidation();

// Listener on form submission, validates form fields, otherwise, prevents submission
$('form').submit((ev) => {
	if(validateForm()) {
		return;
	}
	else {
		ev.preventDefault();
	}
	return
});
// console.log(validateForm); tested the code and its
// function register() {

// 	if ($('#payment option').filter(':selected').val() === 'paypal') {
// 		window.location.href = "https://www.paypal.com";
// 	}
// 	if ($('#payment option').filter(':selected').val() === 'bitcoin') {
// 		window.location.href = "https://bitcoin.org";
// 	}
// }