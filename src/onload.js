function today() {
  var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var today = new Date();
  var year = today.getFullYear();
  var month = months[today.getMonth()];
  var day = today.getDate();
  var formatted_date = year + '-' + month + '-' + day;
  document.ccform.UMorderdate.value = formatted_date;
}

var discounted = false;

function updateTotal()
{
if (document.ccform.UMamount.value > 0)
  {
  calculateTotal();
  }
}
var discounttotal = 0; 
function calculateDiscount()
{
var discountInput = document.ccform.DiscountCode.value;
var discountindividual = 5.00;

var discountmessage = "";
var amount = document.ccform.UMamount.value;
 
if (discountInput=="letItSnow10")
  {
    if (amount >= 50.00) {
      if (discounted == false) {
        discounttotal=10.00;
        discountmessage = "discount applied";
        discounted = true;
      }
      else {
        discountmessage = "You already received a discount.";
      }
    }
    else {
      discountmessage = "minimum amount has not been met for this discount code";
    } 
  }
else if (discountInput=="letItSnow25") {
  if (amount >= 100.00) {
    if (discounted == false) {
      discounttotal=25.00;
      discountmessage = "discount applied";
      discounted = true;
    }
    else {
      discountmessage = "You already received a discount.";
    }
  }
  else {
    discountmessage = "minimum amount has not been met for this discount code";
  }
}
else if (discountInput != "")
  {
  discounttotal=0;
  discountmessage = "Not a valid discount code";
  }
else
  {
  discounttotal=0;
  discountmessage = "";
  }
 
//document.epayform.UMdiscount.value  = roundCurrency(discounttotal); 
document.getElementById('discountmessage').innerHTML = discountmessage;
 
calculateTotal();
}

function calculateTotal() 
{
/* USAePay API uses UMsubtotal, UMdiscount, UMshipping, UMtax as total amounts for the order.
  UMamount = UMsubtotal + UMshipping - UMdiscount + UMtax
  USAePay does not automatically calculate UMamount for us.
  Instead of using a simmpler calculation
  Qty * (Base Amount - Discount) * (1 + Tax) + Shipping = Amount,
  we'll use USAePay variables to better tie in with it's API.
*/
 
/*calculate subtotal
var subtotal = document.epayform.UMsubtotal.value;
subtotal = roundCurrency(subtotal);
 
var discounttotal = document.epayform.UMdiscount.value;
if (discounttotal != 0)
  {
  document.getElementById('discount').innerHTML = "$" + currencyFormatted(discounttotal);
  }
*/
var total = document.ccform.UMamount.value; 
total = total - discounttotal;
document.ccform.UMamount.value = total ;
discounttotal = 0; 
//document.getElementById('totalamount').innerHTML = "$" + currencyFormatted(total) ;
//document.getElementById('amount').innerHTML = total;
}
 
//round Currency
function roundCurrency(amount)
{
var i = Math.abs(amount);
i = Math.round  (i  * 100)/100;
return i;
}
 
//format Currency
function currencyFormatted(amount)
{
var i = parseFloat(amount);
if(isNaN(i))
  {
  i = 0.00;
  }
 
var minus = '';
if(i < 0)
  {
  minus = '-';
  }
i = Math.abs(i);
i = parseInt((i + .005) * 100);
i = i / 100;
s = new String(i);
if(s.indexOf('.') < 0)
  {
  s += '.00';
  }
if(s.indexOf('.') == (s.length - 2))
  {
  s += '0';
  }
s = minus + s;
return s;
}

var ccName = document.getElementById("ccName");
var ccNumber = document.getElementById("ccNumber");
var ccExp = document.getElementById("ccExp");
var cvv2 = document.getElementById("cvv2");
var emailrec = document.getElementById("emailrec");
var routingNum = document.getElementById("routingNum");
var acctNum = document.getElementById("acctNum");
var checkNum = document.getElementById("checkNum");
var dlNum = document.getElementById("dlNum");
var dlState = document.getElementById("dlState");


function enableCC() {
  ccName.removeAttribute("disabled");
  ccNumber.removeAttribute("disabled");
  ccExp.removeAttribute("disabled");
  cvv2.removeAttribute("disabled");
  emailrec.removeAttribute("disabled");
  routingNum.setAttribute("disabled", "true");
  acctNum.setAttribute("disabled", "true");
  checkNum.setAttribute("disabled", "true");
  dlNum.setAttribute("disabled", "true");
  dlState.setAttribute("disabled", "true");
}

function enableCheck() {
  routingNum.removeAttribute("disabled");
  acctNum.removeAttribute("disabled");
  checkNum.removeAttribute("disabled");
  dlNum.removeAttribute("disabled");
  dlState.removeAttribute("disabled");
  ccName.setAttribute("disabled", "true");
  ccNumber.setAttribute("disabled", "true");
  ccExp.setAttribute("disabled", "true");
  cvv2.setAttribute("disabled", "true");
  emailrec.setAttribute("disabled", "true");
}