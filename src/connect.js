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
 
if (CCN.length == 0 &&  bankRouting.length == 0) {
  alert ("Error: missing values.\nYou have not included any Credit Card or Check information.\nPlease fill out either one to continue.");
document.ccform.UMcard.focus == true;
return false;
}
/*
if (bankRouting.length > 0) {
  if (CCN.length > 0) {
    alert ("Error: You can only use one payment method per transaction. \nPlease enter either your credit card information OR electronic check information.");
    return false;
  }
  else {
    document.ccform.UMcommand.value = "check:sale"
  }
} */
else if (CCN.length > 0 && expireDate.length < 4)
{
alert ("Error: Incorrect expiration date.\nThere should be 4 digits in the expiration date in the form MMYY.\nIt appears that you have less than 4.");
document.ccform.UMexpir.focus == true;
return false;
}
document.ccform.UMexpir.value = expireDate;

if (bankRouting.length > 0) {
  if (bankAccount.length == 0 ||
      dlNum.length == 0 ||
      dlState.length == 0
      ) {
    alert ("You must complete all bank account information, including account number, driver's license number, and issuing state");
    return false;
  }
  if (bankAccount.length > 0 && bankAccount.length < 4) {
    alert ("Bank account number should have a minimum of 4 digits")
  }
  if (billfname.length == 0 ||
      billlname.length == 0) {
    alert ("Please enter first and last name under billing information.")
  }
}
if (amount.length == 0 || amount <= 0)
{
alert ("Error: missing field amount.\n Please fill out the amount field.");
document.ccform.UMamount.focus == true;
return false;
}
 
if (sku.length == 0)
{
alert ("Error: missing field Product ID.\n Please fill out the Product ID field.");
document.ccform.UMline1sku.focus == true;
return false;
}
if (CCN > 0) { 
  if (name.length == 0 || !isAlphaSymbols(name, ".,' "))
  {
  alert ("Error: Please enter the name as it appears on the card using only alphabetic characters.");
  document.ccform.UMname.focus == true;
  return false;
  }
}
if (street.length == 0)
{
alert ("Error: Please enter the billing address.");
document.ccform.UMstreet.focus == true;
return false;
}
 
if (zip.length == 0 || zip.length < 5)
{
alert ("Error: missing or invalid billing zipcode.\n Please enter a 5 digit zipcode.");
document.ccform.UMzip.focus == true;
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