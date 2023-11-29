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
const idCreator = document.getElementById('foreign-id');
const bcBtn = document.getElementById('bc-btn');
const motherName = document.getElementById('mother-name');
const fatherName = document.getElementById('father-name');
const coo = document.getElementById('coo');
const lodBtn = document.getElementById('lod-btn');

phoneNum.value = '0000000000';
results.value = 'Clear';
//THIS STUFF BELOW IS FOR TESTING

// firstName.value = 'David Jose';
// lastName.value = 'Ortiz Salazar';
// dob.value = '2/26/1983';
// a_number.value = '123123123';
// stateEl.value = 'TX';
// relationship.value = 'Father';
// caseManager.value = 'Hector Barberi';
// zipCode.value = 24534;
// city.value = 'Crystal City';
// address.value = '203 N Ave C';
// childDob.value = '6/3/2017';
// childName.value = 'Lorenzo Ortiz';
// coo.value = 'Guatemala';
// motherName.value = 'Gloria Ortiz';
// fatherName.value = 'Lorenzo Ortiz';

goBtn.addEventListener('click', jumbleNames);
fingerPrintBtn.addEventListener('click', renderFingerprints);
lopcBtn.addEventListener('click', renderLOPC);
poaBtn.addEventListener('click', renderPoa);
fingerprintConfirmBtn.addEventListener('click', renderFPConfirmation);
idCreator.addEventListener('click', renderForeignId);
bcBtn.addEventListener('click', renderBc);
lodBtn.addEventListener('click', renderLOD);

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
	getNamesArr();
	if (firstName.value === '' || lastName.value === '') {
		firstName.value === ''
			? errorColorHandling(firstName)
			: colorHandler(lastName);
		lastName.value === ''
			? errorColorHandling(lastName)
			: colorHandler(lastName);
		return alert('You are missing a name for this.');
	}
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
	changeTitle('Fingerprint_Appt');
}

function renderFPConfirmation() {
	getNamesArr();
	if (firstName.value === '' || lastName.value === '') {
		firstName.value === ''
			? errorColorHandling(firstName)
			: colorHandler(lastName);
		lastName.value === ''
			? errorColorHandling(lastName)
			: colorHandler(lastName);
		return alert('You are missing a name for this.');
	}
	const today = new Date().toLocaleDateString();
	pageBodyEl.innerHTML = `
	<section class="section">
  <img id="fieldprint-logo" style="height: 100px" src="./fieldprint.png" />
  <h2 class="subtitle">
    This message is to confirm that <span id="fp-appt-sponsor">${firstName.value} ${lastName.value}</span> DID ATTEND their
	fingerprint appointment on <span id="fp-appt-date">${today}</span>.
  </h2>
</section>`;
	changeTitle('Fingerprint_Confirmation');
}

function validate(className, nodeLength) {
	const dataPoints = document.querySelectorAll(className);
	let dataValues = [];
	dataPoints.forEach((item) => {
		if (item.value === '') {
			errorColorHandling(item);
		} else {
			colorHandler(item);
			dataValues.push(item.value);
		}
	});
	if (dataValues.length < nodeLength) {
		return false;
	}

	return true;
}
function renderLOPC() {
	getNamesArr();
	if (validate('.lopc', 11) === false) {
		return alert(
			`It appears you are missing some data. Case manager name, Child Name, A-Number, Sponsor first name, last name, address, city, state, zip code, phone number, and relationship are required.`
		);
	}

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
                <td>${emailConvert(
									caseManager.value
								).toLowerCase()}@deployedservices.com</td>
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
                <td>${emailConvert(
									caseManager.value
								).toLowerCase()}@deployedservices.com ${
		caseManager.value
	} Ph: 000.000.0000/ Greensboro ICF</td>
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
	changeTitle('LOPC');
}

function errorColorHandling(element) {
	element.classList.add('missing');
}

function colorHandler(element) {
	element.classList.remove('missing');
}

let firstNameArr = [];
let lastNameArr = [];

function getNamesArr() {
	colorsBackToNormal();
	if (firstNameArr.length !== 0 || lastNameArr.length !== 0) {
		return;
	}

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
}

function jumbleNames() {
	getNamesArr();
	if (!validate('.bgc', 6)) {
		return alert(
			'A number, Sponsor first name, last name, date of birth, state, and Results are required fields.'
		);
	}
	if (a_number.value.length !== 9) {
		return alert(
			'There is some missing data, or your A-number is not quite correct somehow. Trying to help you, dude.  \n\n love, david.'
		);
	}

	let fullNameArr = [];
	if (firstNameArr.length > 1) {
		fullNameArr.push(firstNameArr.concat(lastNameArr).join(' '));
	}

	for (var i = 0; i < firstNameArr.length; i++) {
		let newName = firstNameArr[i] + ' ' + lastNameArr.join(' ');
		if (!fullNameArr.includes(newName) || newName.split(' ').length < 2) {
			fullNameArr.push(newName);
		}
		for (var j = 0; j < lastNameArr.length; j++) {
			let secondName = firstNameArr[i] + ' ' + lastNameArr[j];
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
		tableBodyEl.append(tableRow);
		changeTitle('Public_Records_Check');
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

function changeTitle(docName) {
	document.title = `${a_number.value}_SP_${getInitials(
		firstNameArr,
		lastNameArr
	)}_${docName}`;
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

function colorsBackToNormal() {
	const inputArr = document.querySelectorAll('input');
	inputArr.forEach((item) => {
		item.classList.remove('missing');
	});
}

function renderForeignId() {
	getNamesArr();
	colorsBackToNormal();
	if (!validate('.foreign-id', 4)) {
		return alert(
			'Sponsor first Name, last Name and date of birth are required fields.'
		);
	}
	pageBodyEl.innerHTML = `<style>
	.picture {
		display: flex;
		justify-content: center;
	}
	img {
		height: 10rem;
	}

	#page-body {
		justify-content: center;
		align-items: center;
		display: flex;
	}

	.id-container {
	}

	.id-card {
		line-height: 15px;
		border: 1px solid black;
		border-radius: 5px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 300px;
		width: 500px;
	}

	.left {
		display: grid;
		grid-template-rows: 1fr 5fr 1fr 1fr;
	}
	.right {
		align-items: center;
		line-height: 35px;
		display: grid;
		grid-template-rows: 1fr 5fr 1fr;
	}

	.spacer {
	}

	ul {
		list-style: none;
		padding: 2rem;
	}

	.caption {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 1rem;
	}
</style>
<div class="id-container">
	<div class="id-card">
		<div class="left">
			<div class="spacer"></div>
			<div class="picture">
				<img src="avatar.png" />
			</div>
			<div class="caption">Foreign ID</div>
			<div class="spacer"></div>
		</div>
		<div class="right">
			<div class="spacer"></div>
			<div class="text">
				<ul class="data">
					<li>Name: <span id="id-name">${firstName.value} ${lastName.value}</span></li>
					<li>DOB: <span id="id-dob">${dob.value}</span></li>
					<li>Issued: <span id="id-issued">${createIssueDate()}</span></li>
					<li>Expiration: <span id="id-expiration">${createExpirationDate(
						dob.value
					)}</span></li>
				</ul>
			</div>
			<div class="spacer"></div>
		</div>
	</div>
</div>
</div>`;
	changeTitle('Foreign_ID');
}
function createExpirationDate(dob) {
	const dateOfBirth = new Date(dob);
	const expirationDate = new Date(dateOfBirth);
	expirationDate.setDate(dateOfBirth.getDate() - 1);
	expirationDate.setFullYear(new Date().getFullYear() + 2);
	return expirationDate.toLocaleDateString();
}

function randomize(params) {
	const randomNum = Math.floor(Math.random() * params);
	return randomNum;
}
function createIssueDate() {
	const issueDate = new Date();
	issueDate.setMonth(randomize(11));
	issueDate.setDate(randomize(28));
	issueDate.setFullYear(issueDate.getFullYear() - 3);
	return issueDate.toLocaleDateString();
}
function renderLOD() {
	getNamesArr();
	if (validate('.lod', 12) === false) {
		return alert(
			`LOD Requires Child's Name, Mother's Name, Father's Name and A-Number`
		);
	}
	pageBodyEl.innerHTML = `<style>
	.lod-el{
		padding: 3rem;
	}
	</style><div class = 'lod-el'> <p>
	Yo, ${motherName.value}, con domicilio en ${coo.value}, otorgo por este medio el poder a ${firstName.value} ${lastName.value}, con domicilio en ${address.value}, ${city.value}, ${stateEl.value} ${zip.value}, para actual como tutor legal de ${childName.value}, menor de edad, con fecha de nacimiento ${childDob.value}.
   </p>
   <p>
	 Esta designacion se realiza con el fin de garantizar el bienestar, cuidado y proteccion adecuada de CH${childName.value} en situatcions en las que no me encuentre disponible para ejercer como su tutor legal
   </p>
   
   <h4>Nombre de la madre: ${motherName.value}</h4>
   <h4>Nombre del padre:  ${fatherName.value}</h4>
   <br/>
   <h4>Nombre del apoderado: ${firstName.value} ${lastName.value}</h4></div>`;

	changeTitle('LOD');
}
function renderBc() {
	getNamesArr();
	validate('.bc', 6);
	if (!validate('.bc', 6)) {
		return alert(
			`A-Number, Child's Name, Child's, DOB, Mother's Name, Father's Name, and Country of Origin or required.`
		);
	}
	const today = new Date();
	const yesterday = new Date(today.setDate(today.getDate() - 1));
	pageBodyEl.innerHTML = `
	<style>
	element.style {
	}
	.bc-el {
		text-align: center;
		border: 1px solid black;
		margin: 1rem;
		padding: 1rem;
		height: 100%;
	}


	html {
		background-color: #fff;
		font-size: 16px;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		min-width: 300px;
		overflow-x: hidden;
		overflow-y: scroll;
		text-rendering: optimizeLegibility;
		-webkit-text-size-adjust: 100%;
		-moz-text-size-adjust: 100%;
		text-size-adjust: 100%;
	}
	html {
		font-family: sans-serif;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}
</style>
	<div class="bc-el document"><h1 class="bc-title"></h1><div class="bc-header"><h2>Registro Nacional de las Personas</h2>
	<h4>Republica de ${coo.value}</h4>
	<h3>Registro Civil de las Personas</h3>
	<h3>Certificado de Nacimiento</h3></div><div class="bc-info">
	<h3>
		El infrascrito Rigistrador Civil de las Personas del Rigistro Nacional de
		las Personas del Municipio de
		${coo.value}, Departamento de
		${coo.value},
	</h3>
	<h3>CERTIFICA</h3>
	<h3>
		que con fecha ${yesterday.toLocaleDateString()} en la partida AAA, folio BB del libro ZZZ del
		Registro Civil del Municipio de
		${coo.value}, Departamento de
		${coo.value}, quedo inscrito el nacimiento de:
	</h3></div><div class="inscrito"><strong>Datos del Inscrito</strong><h3>${
		childName.value
	}</h3><h3>${childDob.value}</h3><h4>
	${coo.value}</h4><hr></div><div class="inscrito"><strong>Datos de la
		Madre</strong><h3>${
			motherName.value
		}</h3><hr><strong>Datos del Padre</strong><h3>${
		fatherName.value
	}</h3><hr></div><div class="inscrito"></div><h4></h4></div>!`;
	document.title = `${a_number.value}_Child_BC`;
}

function renderPoa() {
	getNamesArr();
	const poaNodes = document.querySelectorAll('.poa');
	let poaData = [];
	poaNodes.forEach((item) => {
		if (item.value === '') {
			errorColorHandling(item);
		} else {
			poaData.push(item.value);
			colorHandler(item);
		}
	});
	if (poaData.length < 8) {
		return alert(
			`Proof of address requires the child's A-Number, Sponsor's first name, last name, address, city, state, zip code`
		);
	}
	pageBodyEl.innerHTML = `<style>
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
			DS Utility, Inc (TRAINING)
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
				  Phone: ${parsePhoneNum(phoneNum.value)}<br>
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
						<th>DESCRIPTION</th>
						<th class="text-center" width="10%">WATER</th>
						<th class="text-center" width="10%">WASTE</th>
						<th class="text-right" width="20%">ELECTRICITY</th>
					 </tr>
				  </thead>
				  <tbody>
					 <tr>
						<td>
						   <span class="text-inverse">Water, Electricity, Waste</span><br>
						   <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sagittis arcu.</small>
						</td>
						<td class="text-center">$50.00</td>
						<td class="text-center">$20.00</td>
						<td class="text-right">$90.00</td>
					 </tr>
					 
				  </tbody>
			   </table>
			</div>
			<!-- end table-responsive -->
			<!-- begin invoice-price -->
			<div class="invoice-price">
			   <div class="invoice-price-left">
				  <div class="invoice-price-row">
					
				  </div>
			   </div>
			   <div class="invoice-price-right">
				  <small>TOTAL</small> <span class="f-w-600">$160.00</span>
			   </div>
			</div>
			<!-- end invoice-price -->
		 </div>
		 <!-- end invoice-content -->
		 <!-- begin invoice-note -->
		 <div class="invoice-note">
			* Make all checks payable to DS Utility<br>
			* Payment is due within 30 days<br>
			* If you have any questions concerning this invoice, contact AC Slater at T: 123.555.0000 E: BadBunny@greensborolive.com 
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
	changeTitle('Proof_Address');
}
