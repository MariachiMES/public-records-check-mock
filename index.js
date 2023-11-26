const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const dob = document.getElementById('dob');
const goBtn = document.getElementById('go-button');
const a_number = document.getElementById('a-number');
const fingerPrintBtn = document.getElementById('fingerprints');
const lopcBtn = document.getElementById('lopc');
const poaBtn = document.getElementById('poa');
const stateEl = document.getElementById('state');
const pageBodyEl = document.getElementById('page-body');
const relationship = document.getElementById('relationship');
const caseManager = document.getElementById('case-manager');
const phoneNum = document.getElementById('phone');
const zipCode = document.getElementById('zip');
const city = document.getElementById('city');
const address = document.getElementById('address');
const results = document.getElementById('background-check-results');
const childDob = document.getElementById('child-dob');
const childName = document.getElementById('child-name');
const fingerprintConfirmBtn = document.getElementById('fingerprint-confirm');

a_number.placeholder = 'A Number';
a_number.value = '123456789';
firstName.value = 'Panfilo Roberto';
lastName.value = 'Jimenez Telosico';
dob.value = '11/12/1990';
stateEl.value = 'TX';
relationship.value = 'Father';
phoneNum.value = '1234567890';
caseManager.value = 'David Ortiz';
results.value = 'Clear';
childName.value = 'Lorenzo Enrique Ortiz';
childDob.value = '6/3/2017';
address.value = '123 Main Street';
city.value = 'Anywhere';
zipCode.value = '24323';

goBtn.addEventListener('click', getNamesArr);
fingerPrintBtn.addEventListener('click', renderFingerprints);
lopcBtn.addEventListener('click', renderLOPC);
poaBtn.addEventListener('click', renderPoa);
fingerprintConfirmBtn.addEventListener('click', renderFPConfirmation);

function renderFPConfirmation() {}

function getNumbers(str, startPos, length) {
	let newStr = '';
	for (var i = 0; i < length; i++) {
		newStr += str[startPos + i];
	}
	return newStr;
}

function parsePhoneNum(num) {
	const areaCode = getNumbers(num, 0, 3);
	const prefix = getNumbers(num, 3, 3);
	const phNum = getNumbers(num, 6, 4);

	return `(${areaCode}) - ${prefix} - ${phNum}`;
}
function emailConvert(str) {
	const nameArr = str.split(' ');
	return nameArr.join('.');
}

function renderFingerprints() {
	const today = new Date().toLocaleDateString();

	const apptTime = new Date().getHours() + 3;
	const adjustedTime = apptTime > 12 ? apptTime - 12 : apptTime;
	const amOrPm = apptTime > 11 ? 'pm' : 'am';

	pageBodyEl.innerHTML = `
	<section class="section">
  <img id="fieldprint-logo" style="height: 100px" src="./fieldprint.png" />
  <h2 class="subtitle">
    This message is to confirm that <span id="fp-appt-sponsor">${
			firstName.value
		} ${lastName.value}</span> has a fingerprint appointment
    on <span id="fp-appt-date">${today}</span> at <span id="fp-appt-time">${
		adjustedTime + amOrPm
	}</span>
  </h2>
</section>`;
}

function renderFPConfirmation() {
	const today = new Date().toLocaleDateString();

	const apptTime = new Date().getHours() + 3;
	const adjustedTime = apptTime > 12 ? apptTime - 12 : apptTime;
	const amOrPm = apptTime > 11 ? 'pm' : 'am';

	pageBodyEl.innerHTML = `
	<section class="section">
  <img id="fieldprint-logo" style="height: 100px" src="./fieldprint.png" />
  <h2 class="subtitle">
    This message is to confirm that <span id="fp-appt-sponsor">${firstName.value} ${lastName.value}</span> DID ATTEND their
	fingerprint appointment on <span id="fp-appt-date">${today}</span>.
  </h2>
</section>`;
}

function renderLOPC() {
	pageBodyEl.innerHTML = `
	<div class="container is-max-desktop" style="text-align: center">
    <h1 class="title is-1">LOPC APPOINTMENT</h1>
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <td>Custodian's Name:</td>
                <td>${firstName.value.trim()} ${lastName.value.trim()}</td>
            </tr>
            <tr>
                <td>Relationship To Minor:</td>
                <td>${relationship.value.trim()}</td>
            </tr>
            <tr>
                <td>Phone Number:</td>
                <td>${parsePhoneNum(phoneNum.value.trim())}</td>
            </tr>
            <tr>
                <td>Address:</td>
                <td>${address.value}</td>
            </tr>
            <tr>
                <td>City:</td>
                <td>${city.value}</td>
            </tr>
            <tr>
                <td>State:</td>
                <td>${state.value}</td>
            </tr>
            <tr>
                <td>Zip:</td>
                <td>${zipCode.value}</td>
            </tr>
            <tr>
                <td>Send Confirmation Email to:</td>
                <td>${emailConvert(caseManager.value)}@deployedservices.com</td>
            </tr>
            <tr>
                <td>Minor's Name:</td>
                <td>${childName.value}</td>
            </tr>
            <tr>
                <td>A#:</td>
                <td>${a_number.value}</td>
            </tr>
            <tr>
                <td>Separated from parent at border?</td>
                <td>No</td>
            </tr>
            <tr>
                <td>List A#'s/DOB for additional minors:</td>
                <td>None</td>
            </tr>
            <tr>
                <td>Facility where minor is detained:</td>
                <td>Greensboro ICF, Greensboro, NC</td>
            </tr>
            <tr>
                <td>Contact info of person making appointment:</td>
                <td>${emailConvert(caseManager.value)}@deployedservices.com ${
		caseManager.value
	} 123-123-1234/ Greensboro Piedmont Academy ICF</td>
            </tr>
            <tr>
                <td>Comments:</td>
                <td>There are no available appointments near to the
                    sponsor’s address (More than 70 miles away).</td>
            </tr>

        </tbody>

    </table>
</div>
`;
}

function renderPoa() {
	pageBodyEl.innerHTML = proofOfAddressTemplate;
}

let firstNameArr = [];
let lastNameArr = [];

function getNamesArr() {
	if (firstName.value.trim().split(' ').length > 1) {
		firstNameArr = firstName.value.trim().split(' ');
	} else {
		firstNameArr = [firstName.value.trim()];
	}
	if (lastName.value.trim().split(' ').length > 1) {
		lastNameArr = lastName.value.trim().split(' ');
	} else {
		lastNameArr = [lastName.value];
	}
	console.log(firstNameArr, lastNameArr);
	jumbleNames(firstNameArr, lastNameArr);
}

function jumbleNames(firstArr, lastArr) {
	if (
		!firstName.value ||
		!lastName.value ||
		!a_number.value ||
		!dob.value ||
		a_number.value.length !== 9
	) {
		return alert(
			'There is some missing data, or your A-number is not quite correct somehow. Trying to help you, dude.  \n\n love, david.'
		);
	}
	let fullNameArr = [];
	if (firstArr.length > 1) {
		fullNameArr.push(firstArr.concat(lastArr).join(' '));
	}

	for (var i = 0; i < firstArr.length; i++) {
		let newName = firstArr[i] + ' ' + lastArr.join(' ');
		console.log(fullNameArr.includes(newName));
		if (!fullNameArr.includes(newName) || newName.split(' ').length < 2) {
			fullNameArr.push(newName);
		}
		for (var j = 0; j < lastArr.length; j++) {
			let secondName = firstArr[i] + ' ' + lastArr[j];
			if (!fullNameArr.includes(secondName) || newName.split(' ').length < 2) {
				fullNameArr.push(secondName);
			}
		}
	}

	renderBGCheck(fullNameArr);
}

function renderBGCheck(arr) {
	pageBodyEl.innerHTML = `
	<h1 id="todays-date" class="d-flex p-2">
		Public Records Check
	</h1>
	<table class="table">
	<thead>
		<tr>
			<th scope="col">Full Name</th>
			<th scope="col">Address</th>
			<th scope="col">DOB</th>
			<th scope="col">Results</th>
		</tr>
	</thead>
	<tbody id="table-body">
		<tr></tr>
	</tbody>
	</table>`;
	const tableBodyEl = document.getElementById('table-body');
	const todayEl = document.getElementById('todays-date');
	const today = new Date();
	todayEl.append(today.toLocaleDateString());

	arr.forEach((line) => {
		const tableRow = document.createElement('tr');
		tableRow.innerHTML = `
		<td>${line}</td>
		<td>${stateEl.value}</td>
		<td>${dob.value}</td>
		<td>Clear</td>`;
		console.log(tableRow);
		tableBodyEl.append(tableRow);
		changeTitle();
	});
}

function getInitials(first, last) {
	let initials = '';
	for (var i = 0; i < first.length; i++) {
		initials += first[i].charAt(0).toUpperCase();
	}
	for (var j = 0; j < last.length; j++) {
		initials += last[j].charAt(0).toUpperCase();
	}
	return initials;
}

function changeTitle() {
	document.title = `${a_number.value}_SP_${getInitials(
		firstNameArr,
		lastNameArr
	)}_Public_Records_Check`;
}

function electricBillDate() {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const today = new Date();
	today.setDate(1);
	const month = monthNames[today.getMonth() - 1];
	const formattedDate = today.toLocaleDateString();
	return [month, formattedDate];
}

const billMonth = electricBillDate()[0];
const fullBillDate = electricBillDate()[1];

let proofOfAddressTemplate = `<style>
body{
	margin-top:20px;

}

.invoice {
	background: #fff;
	padding: 20px
}

.invoice-company {
	font-size: 20px
}

.invoice-header {
	margin: 0 -20px;
	background: #f0f3f4;
	padding: 20px
}

.invoice-date,
.invoice-from,
.invoice-to {
	display: table-cell;
	width: 1%
}

.invoice-from,
.invoice-to {
	padding-right: 20px
}

.invoice-date .date,
.invoice-from strong,
.invoice-to strong {
	font-size: 16px;
	font-weight: 600
}

.invoice-date {
	text-align: right;
	padding-left: 20px
}

.invoice-price {
	background: #f0f3f4;
	display: table;
	width: 100%
}

.invoice-price .invoice-price-left,
.invoice-price .invoice-price-right {
	display: table-cell;
	padding: 20px;
	font-size: 20px;
	font-weight: 600;
	width: 75%;
	position: relative;
	vertical-align: middle
}

.invoice-price .invoice-price-left .sub-price {
	display: table-cell;
	vertical-align: middle;
	padding: 0 20px
}

.invoice-price small {
	font-size: 12px;
	font-weight: 400;
	display: block
}

.invoice-price .invoice-price-row {
	display: table;
	float: left
}

.invoice-price .invoice-price-right {
	width: 25%;
	background: #2d353c;
	color: #fff;
	font-size: 28px;
	text-align: right;
	vertical-align: bottom;
	font-weight: 300
}

.invoice-price .invoice-price-right small {
	display: block;
	opacity: .6;
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 12px
}

.invoice-footer {
	border-top: 1px solid #ddd;
	padding-top: 10px;
	font-size: 10px
}

.invoice-note {
	color: #999;
	margin-top: 80px;
	font-size: 85%
}

.invoice>div:not(.invoice-footer) {
	margin-bottom: 20px
}

.btn.btn-white, .btn.btn-white.disabled, .btn.btn-white.disabled:focus, .btn.btn-white.disabled:hover, .btn.btn-white[disabled], .btn.btn-white[disabled]:focus, .btn.btn-white[disabled]:hover {
	color: #2d353c;
	background: #fff;
	border-color: #d9dfe3;
}
</style>
<div class="container">
<div class="col-md-12">
  <div class="invoice">
	 <!-- begin invoice-company -->
	 <div class="invoice-company text-inverse f-w-600">
		DS Utility, Inc
	 </div>
	 <!-- end invoice-company -->
	 <!-- begin invoice-header -->
	 <div class="invoice-header">
		<div class="invoice-from">
		   <address class="m-t-5 m-b-5">
			  <strong class="text-inverse">DS Utility, Inc.</strong><br>
			  1234 Main Street<br>
			  ${city.value}, ${stateEl.value} ${zipCode.value}<br>
			  Phone: (123) 000-0000<br>
			  Fax: (123) 000-0001
		   </address>
		</div>
		<div class="invoice-to">
		   <address class="m-t-5 m-b-5">
			  <strong class="text-inverse">${firstName.value} ${lastName.value}</strong><br>
			  ${address.value}<br>
			  ${city.value}, ${stateEl.value} ${zipCode.value}<br>
			  Phone: ${parsePhoneNum(phoneNum.value)}]<br>
		   </address>
		</div>
		<div class="invoice-date">
		   <small>Invoice / ${billMonth} period</small>
		   <div class="date text-inverse m-t-5">${fullBillDate}</div>
		   <div class="invoice-detail">
			  #0000123DSS<br>
			  Electric Bill
		   </div>
		</div>
	 </div>
	 <!-- end invoice-header -->
	 <!-- begin invoice-content -->
	 <div class="invoice-content">
		<!-- begin table-responsive -->
		<div class="table-responsive">
		   <table class="table table-invoice">
			  <thead>
				 <tr>
					<th>TASK DESCRIPTION</th>
					<th class="text-center" width="10%">RATE</th>
					<th class="text-center" width="10%">HOURS</th>
					<th class="text-right" width="20%">LINE TOTAL</th>
				 </tr>
			  </thead>
			  <tbody>
				 <tr>
					<td>
					   <span class="text-inverse">Website design &amp; development</span><br>
					   <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sagittis arcu.</small>
					</td>
					<td class="text-center">$50.00</td>
					<td class="text-center">50</td>
					<td class="text-right">$2,500.00</td>
				 </tr>
				 
			  </tbody>
		   </table>
		</div>
		<!-- end table-responsive -->
		<!-- begin invoice-price -->
		<div class="invoice-price">
		   <div class="invoice-price-left">
			  <div class="invoice-price-row">
				 <div class="sub-price">
					<small>SUBTOTAL</small>
					<span class="text-inverse">$4,500.00</span>
				 </div>
				 <div class="sub-price">
					<i class="fa fa-plus text-muted"></i>
				 </div>
				 <div class="sub-price">
					<small>PAYPAL FEE (5.4%)</small>
					<span class="text-inverse">$108.00</span>
				 </div>
			  </div>
		   </div>
		   <div class="invoice-price-right">
			  <small>TOTAL</small> <span class="f-w-600">$4508.00</span>
		   </div>
		</div>
		<!-- end invoice-price -->
	 </div>
	 <!-- end invoice-content -->
	 <!-- begin invoice-note -->
	 <div class="invoice-note">
		* Make all checks payable to DS Utility<br>
		* Payment is due within 30 days<br>
		* If you have any questions concerning this invoice, contact Bad Bunny at T: 123.555.0000 E: BadBunny@greensborolive.com 
	 </div>
	 <!-- end invoice-note -->
	 <!-- begin invoice-footer -->
	 <div class="invoice-footer">
		<p class="text-center m-b-5 f-w-600">
		   THANK YOU FOR YOUR BUSINESS
		</p>
		<p class="text-center">
		   <span class="m-r-10"><i class="fa fa-fw fa-lg fa-globe"></i> dsutility.com</span>
		   <span class="m-r-10"><i class="fa fa-fw fa-lg fa-phone-volume"></i> T: 123-000-0000</span>
		   <span class="m-r-10"><i class="fa fa-fw fa-lg fa-envelope"></i> training@dsutility.com</span>
		</p>
	 </div>
	 <!-- end invoice-footer -->
  </div>
</div>
</div>`;
