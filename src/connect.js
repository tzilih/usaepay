// Code for connect.js 
//USAepay Javascript form validation and formatting script
//Developed by Mind2Web for USAePay
//For questions or comments email:
//support@usaepay.com or
//mind2webinfo@yahoo.com
 
function validateForm()
{
var CCN = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMcard.value)));
var expireDate = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMexpir.value)));
var bankRouting = trimBetweenSpaces(trimBegEndSpaces(document.ccform.UMrouting.value));
var bankAccount = trimBetweenSpaces(trimBegEndSpaces(document.ccform.UMaccount.value));
var dlNum = trimBetweenSpaces(trimBegEndSpaces(document.ccform.UMdlnum.value));
var dlState = trimBetweenSpaces(trimBegEndSpaces(document.ccform.UMdlstate.value));
var amount = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMamount.value)));
var sku = trimBetweenSpaces(trimBegEndSpaces(document.ccform.UMline1sku.value));
var name = document.ccform.UMname.value;
var billfname = document.ccform.UMbillfname.value;
var billlname = document.ccform.UMbilllname.value;
var street = document.ccform.UMstreet.value;
var zip = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMzip.value)));
var paymentMethod = document.ccform.UMcommand.value;

if (amount.length == 0 || amount <= 0)
{
alert ("Error: missing field amount.\n Please fill out the amount field.");
document.ccform.UMamount.focus();
return false;
}
if (sku.length == 0)
{
alert ("Error: Missing Product ID.\n Please fill out the Product ID field.");
document.ccform.UMline1sku.focus();
return false;
}

//Validate fields under credit card information
if (paymentMethod == 'cc:sale') {
  //validate cardholder name
  if (name.length == 0 || !isAlphaSymbols(name, ".,' "))
  {
  alert ("Error: Please enter the name as it appears on the card using only alphabetic characters.");
  document.ccform.UMname.focus();
  return false;
  }
  //validate CC # length is at least 12 numbers
  else if (CCN.length == 0) {
    alert("Missing credit card number.")
    document.ccform.UMcard.focus();
    return false;
  }
  else if (CCN.length < 12) {
    alert ("Error: Make sure the credit card you entered has at least 12 numbers.");
    document.ccform.UMcard.focus();
    return false;
  }
  else if (expireDate.length < 4) {
    alert ("Error: Enter a 4 digit expiration date in the MMYY format.");
    document.ccform.UMexpir.focus();
    return false;
  }
  document.ccform.UMexpir.value = expireDate;
}

//Validate ACH payment information
if (paymentMethod == 'check:sale') {
  //validate routing number has been entered
  if (bankRouting.length == 0) {
    alert("Please enter your bank routing number.");
    document.ccform.UMrouting.focus();
    return false;
  }
  //validate account number was entered; min 4 digits
  else if (bankAccount.length == 0) {
    alert ("Missing bank account number.");
    document.ccform.UMaccount.focus();
    return false;
  }
  else if (bankAccount.length < 4) {
    alert ("Bank account number should have a minimum of 4 digits");
    document.ccform.UMaccount.focus();
    return false;
  }
  else if (dlNum.length == 0) {
    alert("please enter your driver's license number.");
    document.ccform.UMdlnum.focus();
    return false;
  }
  else if (dlState.length == 0) {
    alert("Please enter the driver's license issuing state.")
    document.ccform.UMdlstate.focus();
    return false;
  }
  else if (billfname.length == 0 || !isAlphaSymbols(billfname, ".,' ")) {
  alert("Please enter first name under billing information.");
  document.ccform.UMbillfname.focus();
  return false;
  }
  else if (billlname.length == 0 || !isAlphaSymbols(billlname, ".,' ")) {
  alert("Please enter last name under billing information.");
  document.ccform.UMbilllname.focus();
  return false;
  }
}

if (street.length == 0)
{
alert ("Error: Please enter the billing address.");
document.ccform.UMstreet.focus();
return false;
} 
if (zip.length == 0 || zip.length != 5)
{
alert ("Error: missing or invalid billing zipcode.\n Please enter a 5 digit zipcode.");
document.ccform.UMzip.focus();
return false;
}
 
return true;
}
 
// Return true if a string is combination of alpha and given symbols.
function isAlphaSymbols(objValue, symbols) {
var ch
 
for (var i=0; i < objValue.length; i++) {
ch = objValue.charAt(i)
if (isAlphaChar(ch) == false) {
if (symbols.indexOf(ch) < 0)
return false
}
}
return true
}
 
// Return true of a character is an alphabet.
function isAlphaChar( ch ) {
return ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z"))
}
 
// Stiff off any non digit char
function stripOffNonDigit(objValue) {
var ch
var tempStr = new String()
 
for (var i=0; i<objValue.length; i++)
{
if (isDigitChar(objValue.charAt(i)) == true)
tempStr = tempStr + objValue.charAt(i)
}
 
return tempStr
}
 
// Return true if a character is a digit.
function isDigitChar( ch ) {
return ( ch >= "0" && ch <= "9" )
}
 
// Removes leading and trailing blanks from a value
function trimBegEndSpaces(object_value)
{
var leading_blanks = 0
var string_end = (object_value.length)-1
if (string_end < 0) string_end = 0
 
// find first nonblank: start with first character and scan forwards
while (leading_blanks <= string_end && object_value.charAt(leading_blanks) == " ")
{leading_blanks++}
 
// find last nonblank: start with last character and scan backwards
while (string_end > leading_blanks && object_value.charAt(string_end) == " ")
{string_end--}
 
return object_value = object_value.substring(leading_blanks,string_end+1)
}
 
// Remove any additional spaces
function trimBetweenSpaces(objValue) {
var blankExists = false
var newValue = new String()
var ch
 
for (var i=0; i < objValue.length; i++) {
ch = objValue.charAt(i)
if ( ch == " " ) {
if ( blankExists == false ) {
blankExists = true
newValue = newValue + ch
}
}
else {
newValue = newValue + ch
blankExists = false
}
}
if ( newValue == null )
return objValue
else
return newValue
}