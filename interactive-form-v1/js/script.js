
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
const $iHeartJSOpts = $ColorOptions.slice(3, 6);
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
function addActivityListener(NameofActivity, price, conflictName = '') {

	const $activity = $('.activities input[name=' + NameofActivity + ']');

	$activity.change(() => {
		if ($activity.is(':checked')) {
			total += price;
			$('.total p').text('Total: $' + total);
			// in case of conflict, toggle the conflicting activity
			if (conflictName !== '') {
				toggleActivity(conflictName, false);
			}
		}
		else {
			total -= price;
			$('.total p').text('Total: $' + total);
			if (conflictName !== '') {
				toggleActivity(conflictName, true);
			}
		}
	});
}

// CHANGES: toggles the activity to be enabled or disabled based on "enable" boolean
function toggleActivity(NameofActivity, enable) {

	const $activity = $('.activities input[name=' + activityName + ']');

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

