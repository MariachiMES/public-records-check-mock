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
const gender = document.getElementById('sponsor-gender');
const instructionsBtn = document.getElementById('instructions-btn');

phoneNum.value = '0000000000';
results.value = 'Clear';

window.addEventListener('load', () => {
	instructionsBtn.click();
});

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
// gender.value = 'Male';

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
	if (validate('.fp', 3) === false) {
		return alert(`you are missing some data.`);
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
	if (validate('.fp-appt', 3) === false) {
		return alert(`you are missing some data.`);
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
	const month = monthNames[today.getMonth()];
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
	if (!validate('.foreign-id', 5)) {
		return alert(
			'Sponsor first Name, last Name and date of birth are required fields.'
		);
	}
	pageBodyEl.innerHTML = `<style>
	.passport-container {
		display: grid;
		grid-template-rows: 1fr 1fr;
		width: 100%;
		height: auto;
	}
	
	.passport-left {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.passport-right {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.passport-cover {
		background-color: green;
		height: 300px;
		width: 210px;
		border: 1px solid black;
		border-radius: 5px;
		text-align: center;
		color: gold;
		display: grid;
		grid-template-rows: 1fr 2fr 5fr 2fr 1fr;
	}
	
	.passport-open {
		margin: 1rem;
		background-color: lightblue;
		height: 420px;
		width: 300px;
		border: 1px solid black;
		border-radius: 5px;
	}
	.passport-open {
		display: grid;
		grid-template-rows: 1fr 1fr;
	}
	.passport-top {
		display: flex;
		border-bottom: 1px solid black;
		width: 300px;
	}
	.number {
		text-align: center;
		font-size: 2rem;
		color: rgb(231, 0, 0);
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
		left: 0;
		margin-left: 0;
		opacity: 0.5;
	}
	.watermark {
		opacity: 0.1;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		display: flex;
		width: 100%;
	}
	
	.passport-bottom {
		display: grid;
		grid-template-rows: 1fr 6fr 2fr;
		width: 300px;
	}
	.bottom-header {
		text-align: center;
	}
	.bottom-body {
		display: grid;
		grid-template-columns: 1fr .8fr .8fr;
	}
	.bottom-footer {
		font-size: 12px;
		width: 300px;
		text-align: center;
	}
	
	ul {
		list-style: none;
		font-size: 10px;
	}
	li {
		margin-bottom: 1rem;
	}
	
	.passport-picture {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>
<div class="passport-container">
			<div class="passport-left">
				<div class="passport-cover">
					<div class="cover-spacer"></div>
					<div class="cover-top">PASAPORTE</div>
					<div class="cover-logo">
						<svg
							width="120px"
							height="120px"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
						>
							<title>globe</title>
							<desc>Created with Sketch Beta.</desc>
							<defs></defs>
							<g
								id="Page-1"
								stroke="none"
								stroke-width="1"
								fill="none"
								fill-rule="evenodd"
								sketch:type="MSPage"
							>
								<g
									id="Icon-Set"
									sketch:type="MSLayerGroup"
									transform="translate(-204.000000, -671.000000)"
									fill="#000000"
								>
									<path
										d="M231.596,694.829 C229.681,694.192 227.622,693.716 225.455,693.408 C225.75,691.675 225.907,689.859 225.957,688 L233.962,688 C233.783,690.521 232.936,692.854 231.596,694.829 L231.596,694.829 Z M223.434,700.559 C224.1,698.95 224.645,697.211 225.064,695.379 C226.862,695.645 228.586,696.038 230.219,696.554 C228.415,698.477 226.073,699.892 223.434,700.559 L223.434,700.559 Z M220.971,700.951 C220.649,700.974 220.328,701 220,701 C219.672,701 219.352,700.974 219.029,700.951 C218.178,699.179 217.489,697.207 216.979,695.114 C217.973,695.027 218.98,694.976 220,694.976 C221.02,694.976 222.027,695.027 223.022,695.114 C222.511,697.207 221.822,699.179 220.971,700.951 L220.971,700.951 Z M209.781,696.554 C211.414,696.038 213.138,695.645 214.936,695.379 C215.355,697.211 215.9,698.95 216.566,700.559 C213.927,699.892 211.586,698.477 209.781,696.554 L209.781,696.554 Z M208.404,694.829 C207.064,692.854 206.217,690.521 206.038,688 L214.043,688 C214.093,689.859 214.25,691.675 214.545,693.408 C212.378,693.716 210.319,694.192 208.404,694.829 L208.404,694.829 Z M208.404,679.171 C210.319,679.808 212.378,680.285 214.545,680.592 C214.25,682.325 214.093,684.141 214.043,686 L206.038,686 C206.217,683.479 207.064,681.146 208.404,679.171 L208.404,679.171 Z M216.566,673.441 C215.9,675.05 215.355,676.789 214.936,678.621 C213.138,678.356 211.414,677.962 209.781,677.446 C211.586,675.523 213.927,674.108 216.566,673.441 L216.566,673.441 Z M219.029,673.049 C219.352,673.027 219.672,673 220,673 C220.328,673 220.649,673.027 220.971,673.049 C221.822,674.821 222.511,676.794 223.022,678.886 C222.027,678.973 221.02,679.024 220,679.024 C218.98,679.024 217.973,678.973 216.979,678.886 C217.489,676.794 218.178,674.821 219.029,673.049 L219.029,673.049 Z M223.954,688 C223.9,689.761 223.74,691.493 223.439,693.156 C222.313,693.058 221.168,693 220,693 C218.832,693 217.687,693.058 216.562,693.156 C216.26,691.493 216.1,689.761 216.047,688 L223.954,688 L223.954,688 Z M216.047,686 C216.1,684.239 216.26,682.507 216.562,680.844 C217.687,680.942 218.832,681 220,681 C221.168,681 222.313,680.942 223.438,680.844 C223.74,682.507 223.9,684.239 223.954,686 L216.047,686 L216.047,686 Z M230.219,677.446 C228.586,677.962 226.862,678.356 225.064,678.621 C224.645,676.789 224.1,675.05 223.434,673.441 C226.073,674.108 228.415,675.523 230.219,677.446 L230.219,677.446 Z M231.596,679.171 C232.936,681.146 233.783,683.479 233.962,686 L225.957,686 C225.907,684.141 225.75,682.325 225.455,680.592 C227.622,680.285 229.681,679.808 231.596,679.171 L231.596,679.171 Z M220,671 C211.164,671 204,678.163 204,687 C204,695.837 211.164,703 220,703 C228.836,703 236,695.837 236,687 C236,678.163 228.836,671 220,671 L220,671 Z"
										id="globe"
										sketch:type="MSShapeGroup"
									></path>
								</g>
							</g>
						</svg>
					</div>
					<div class="cover-bottom">${coo.value.toUpperCase()}</div>
					<div class="cover-spacer"></div>
				</div>
			</div>
			<div class="passport-right">
				<div class="passport-open">
					<div class="passport-top">
						<div class="number">DS32156</div>
						<div class="watermark">
							<svg
								version="1.0"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								width="200px"
								height="200px"
								viewBox="0 0 64 64"
								enable-background="new 0 0 64 64"
								xml:space="preserve"
							>
								<path
									fill="#231F20"
									d="M32,0C15.776,0,2.381,12.077,0.292,27.729c-0.002,0.016-0.004,0.031-0.006,0.047
                           c-0.056,0.421-0.106,0.843-0.146,1.269c-0.019,0.197-0.029,0.396-0.045,0.594c-0.021,0.28-0.044,0.56-0.058,0.842
                           C0.014,30.983,0,31.49,0,32c0,17.673,14.327,32,32,32s32-14.327,32-32S49.673,0,32,0z M33.362,58.502
                           c-0.72,0.787-1.901,1.414-2.675,0.67c-0.653-0.644-0.099-1.44,0-2.353c0.125-1.065-0.362-2.345,0.666-2.676
                           c0.837-0.259,1.468,0.322,2.009,1.012C34.187,56.175,34.239,57.526,33.362,58.502z M43.446,49.87
                           c-1.18,0.608-2.006,0.494-3.323,0.673c-2.454,0.309-4.394,1.52-6.333,0c-0.867-0.695-0.978-1.451-1.65-2.341
                           c-1.084-1.364-1.355-3.879-3.01-3.322c-1.058,0.356-1.026,1.415-1.654,2.335c-0.81,1.156-0.607,2.793-2.005,2.993
                           c-0.974,0.138-1.499-0.458-2.321-1c-0.922-0.614-1.104-1.348-2.002-1.993c-0.934-0.689-1.69-0.693-2.654-1.334
                           c-0.694-0.463-0.842-1.304-1.673-1.334c-0.751-0.022-1.289,0.346-1.664,0.996c-0.701,1.214-0.942,4.793-2.988,4.665
                           c-1.516-0.103-4.758-3.509-5.994-4.327c-0.405-0.273-0.78-0.551-1.158-0.763c-1.829-3.756-2.891-7.952-2.997-12.385
                           c0.614-0.515,1.239-0.769,1.819-1.493c0.927-1.13,0.481-2.507,1.673-3.335c0.886-0.604,1.602-0.507,2.669-0.658
                           c1.529-0.222,2.491-0.422,3.988,0c1.459,0.409,2.016,1.246,3.326,1.992c1.415,0.81,2.052,1.766,3.66,2.001
                           c1.166,0.165,1.966-0.901,2.988-0.337c0.824,0.458,1.406,1.066,1.341,2.001c-0.1,1.218-2.522,0.444-2.659,1.662
                           c-0.183,1.558,2.512-0.194,3.992,0.33c0.974,0.355,2.241,0.294,2.325,1.334c0.081,1.156-1.608,0.837-2.657,1.335
                           c-1.162,0.541-1.771,0.996-3.004,1.329c-1.125,0.298-2.312-0.628-2.987,0.329c-0.53,0.742-0.343,1.489,0,2.335
                           c0.787,1.931,3.349,1.352,5.322,0.657c1.383-0.488,1.641-1.726,2.997-2.329c1.438-0.641,2.554-1.335,3.981-0.663
                           c1.178,0.556,0.849,2.05,2.006,2.663c1.253,0.668,2.432-0.729,3.663,0c0.957,0.569,0.887,1.521,1.655,2.327
                           c0.894,0.942,1.41,1.702,2.668,2c1.286,0.299,2.072-1.071,3.327-0.671c0.965,0.315,1.755,0.68,1.987,1.672
                           C46.465,48.634,44.744,49.198,43.446,49.87z M45.839,33.841c-1.154,1.16-2.156,1.539-3.771,1.893c-1.433,0.315-3.443,1.438-3.772,0
                           c-0.251-1.148,1.029-1.558,1.893-2.359c0.959-0.895,1.854-0.983,2.826-1.892c0.87-0.802,0.756-2.031,1.893-2.359
                           c1.109-0.32,2.182-0.019,2.825,0.947C48.652,31.438,47.006,32.681,45.839,33.841z M59.989,29.319
                           c-0.492,0.508-0.462,1.044-0.965,1.542c-0.557,0.539-1.331,0.307-1.738,0.968c-0.358,0.577-0.13,1.057-0.194,1.735
                           c-0.041,0.387-1.924,1.256-2.313,0.385c-0.214-0.481,0.281-0.907,0-1.353c-0.263-0.401-0.555-0.195-0.899,0.181
                           c-0.359,0.388-0.772,0.958-1.221,1.172c-0.589,0.273-0.196-2.25-0.395-3.088c-0.146-0.663,0.01-1.08,0.198-1.736
                           c0.25-0.91,0.938-1.206,1.155-2.125c0.194-0.806,0.033-1.295,0-2.123c-0.039-0.906-0.015-1.427-0.188-2.314
                           c-0.192-0.937-0.252-1.525-0.771-2.316c-0.418-0.624-0.694-1.001-1.354-1.352c-0.16-0.088-0.31-0.146-0.452-0.191
                           c-0.34-0.113-0.659-0.128-1.098-0.193c-0.888-0.132-1.522,0.432-2.314,0c-0.462-0.255-0.606-0.575-0.96-0.967
                           c-0.404-0.434-0.511-0.789-0.967-1.158c-0.341-0.276-0.552-0.437-0.965-0.581c-0.79-0.263-1.342-0.082-2.126,0.196
                           c-0.77,0.268-1.058,0.707-1.739,1.155c-0.522,0.303-0.893,0.371-1.348,0.774c-0.276,0.242-1.59,1.177-2.127,1.155
                           c-0.544-0.021-0.851-0.343-1.338-0.382c-0.065-0.008-0.13-0.008-0.204,0c0,0,0,0-0.005,0c-0.473,0.036-0.696,0.269-1.146,0.382
                           c-1.107,0.276-1.812-0.115-2.905,0.197c-0.712,0.2-0.993,0.766-1.73,0.771c-0.841,0.005-1.125-0.743-1.932-0.968
                           c-0.442-0.118-0.702-0.129-1.157-0.19c-0.749-0.108-1.178-0.119-1.926-0.191H24.86c-0.016,0.006-0.591,0.058-0.688,0
                           c-0.422-0.286-0.722-0.521-1.244-0.773c-0.575-0.283-0.919-0.428-1.547-0.584l0.026-0.381c0,0,0-0.847-0.121-1.207
                           c-0.115-0.361-0.24-0.361,0-1.086c0.248-0.722,0.679-1.182,0.679-1.182c0.297-0.228,0.516-0.305,0.769-0.58
                           c0.51-0.539,0.717-0.998,0.774-1.739c0.067-0.972-1.205-1.367-0.97-2.316c0.209-0.826,0.904-0.98,1.547-1.543
                           c0.779-0.67,1.468-0.758,2.12-1.542c0.501-0.593,0.911-0.965,0.97-1.738c0.053-0.657-0.23-1.068-0.57-1.538
                           C28.356,2.175,30.157,2,32,2c14.919,0,27.29,10.893,29.605,25.158c-0.203,0.352-0.001,0.796-0.27,1.193
                           C60.979,28.894,60.436,28.85,59.989,29.319z"
								/>
							</svg>
						</div>
					</div>
					<div class="passport-bottom">
						<div class="bottom-header">>>>>>>>PASAPORTE>>>>>>></div>
						<div class="bottom-body">
							<div class="passport-picture">
							${getPassportPicture(gender.value)}
							</div>
							<div class="passport-info-1">
								<ul>
									<li>Name: ${firstName.value} ${lastName.value}</li>
									<li>DOB: ${dob.value}</li>
									<li>Date Issued:${createIssueDate()}</li>
								</ul>
							</div>
							<div class="passport-info-2">
								<ul>
									<li>Expiration Date: ${createExpirationDate(dob.value)}</li>
									<li>Sex: ${gender.value}</li>
									<li>Passport Number: DS32156</li>
								</ul>
							</div>
						</div>
						<div class="bottom-footer">
							>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DS32156
							<br />
							>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
						</div>
					</div>
				</div>
			</div>
		</div>
`;
	changeTitle('Passport');
}
function getPassportPicture(sex) {
	if (sex.toUpperCase() === 'MALE') {
		return passportMale;
	} else {
		return passportFemale;
	}
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

const passportMale = `<svg height="100px" width="100px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 512 512"  xml:space="preserve">
<style type="text/css">
.st0{fill:#000000;}
</style>
<g>
<path class="st0" d="M432.871,404.268c-10.756-18.361-27.411-29.408-43.426-36.782c-16.038-7.367-31.903-11.337-41.438-14.935
   c-7.56-2.808-15.799-7.195-21.676-11.948c-2.943-2.346-5.274-4.782-6.674-6.904c-1.446-2.13-1.885-3.784-1.885-4.894
   c0-7.591,0-11.025,0-22.57c10.116-11.263,24.655-28.7,30.615-56.358c2.093-0.938,4.156-1.996,6.138-3.389
   c4.96-3.412,9.154-8.365,12.708-15.106c3.59-6.771,6.756-15.427,10.138-27.27c1.706-6.011,2.51-11.226,2.51-15.874
   c0-5.356-1.103-9.996-3.129-13.772c-1.743-3.293-4.127-5.661-6.592-7.419c32.73-73.058-9.289-131.94-9.289-131.94l12.335-31.709
   c0,0-52.849,3.523-99.814-1.758c-135.694-15.247-143.277,79.858-143.277,122.13c0,25.326,3.784,40.045,7.061,48.06
   c-0.663,0.871-1.378,1.631-1.929,2.644c-2.018,3.769-3.121,8.417-3.121,13.772c0.015,4.64,0.797,9.855,2.518,15.866
   c4.529,15.769,8.611,25.944,13.9,33.422c2.652,3.71,5.654,6.69,8.931,8.954c1.996,1.393,4.06,2.451,6.138,3.389
   c5.974,27.642,20.506,45.087,30.622,56.35c0,11.546,0,14.987,0,22.578c0.022,0.946-0.455,2.681-2.026,4.924
   c-2.287,3.359-6.771,7.359-11.985,10.741c-5.192,3.404-11.106,6.287-16.074,8.03c-6.458,2.279-15.732,4.819-25.885,8.409
   c-15.248,5.401-32.73,13.178-46.726,27.151c-14.018,13.914-23.985,34.316-23.902,62.324c0,3.561,0.156,7.256,0.484,11.062
   c0.209,2.391,1.042,4.365,2.048,6.049c1.944,3.136,4.558,5.571,7.844,8.045c5.758,4.268,13.75,8.469,24.141,12.611
   c31.062,12.342,83.614,23.836,153.855,23.85c57.073-0.007,102.495-7.612,134.168-17.072c15.836-4.738,28.208-9.908,37.095-15.025
   c4.461-2.57,8.052-5.117,10.89-7.888c1.415-1.386,2.652-2.831,3.672-4.522c1.02-1.684,1.855-3.658,2.064-6.041
   c0.32-3.814,0.469-7.493,0.469-11.039C444.38,431.754,440.045,416.477,432.871,404.268z M243.374,496.291
   c-0.246-0.008-0.492-0.008-0.745-0.008l-24.812-58.228l0.32,0.253l22.57-28.216l3.702,15.575h0.991L243.374,496.291z
	M212.975,426.704l-28.462-66.756c3.568-2.071,7.076-4.35,10.294-6.905c1.966-1.579,3.844-3.24,5.564-5.006l47.56,34.965
   L212.975,426.704z M207.068,338.979c1.572-3.053,2.645-6.435,2.66-10.174c0-8.224,0-11.441,0-25.535v-2.979l-1.982-2.205
   c-10.57-11.776-24.879-27.404-29.848-55.173l-0.79-4.447l-4.238-1.505c-2.696-0.96-4.744-1.951-6.548-3.195
   c-2.644-1.869-5.05-4.425-7.858-9.653c-2.764-5.2-5.714-12.976-8.916-24.261c-1.423-4.924-1.915-8.76-1.915-11.605
   c0-3.314,0.633-5.236,1.282-6.465c0.976-1.774,2.175-2.533,3.702-3.143c1.043-0.403,2.145-0.552,2.778-0.604l6.011,1.274
   l8.633,14.92c0,0-0.469-74.205,7.047-79.851c9.393-7.054,63.426,14.093,79.858,14.093c16.446,0,68.7-22.905,77.974-15.97
   c10.786,8.067,8.931,88.774,8.931,88.774l8.834-22.86l3.621-0.388c0.633,0.008,2.942,0.276,4.514,1.311
   c0.879,0.574,1.609,1.236,2.272,2.443c0.641,1.229,1.274,3.151,1.274,6.458c0.014,2.853-0.492,6.689-1.899,11.62
   c-4.276,15.046-8.104,23.806-11.628,28.663c-1.758,2.458-3.367,3.986-5.162,5.244c-1.788,1.244-3.851,2.235-6.548,3.195
   l-4.238,1.505l-0.782,4.447c-4.953,27.769-19.27,43.397-29.84,55.173l-1.996,2.205v2.979c0,14.094,0,17.311,0,25.535
   c0.015,3.724,1.035,7.143,2.592,10.235l-48.857,35.895L207.068,338.979z M269.341,496.35c-0.246,0.015-0.462,0.022-0.716,0.022
   l-2.033-70.704h1.028l3.695-15.575l22.562,28.208l0.32-0.246L269.341,496.35z M299.024,426.704l-34.95-43.694l47.516-34.928
   c3.247,3.315,6.994,6.294,11.054,8.968c1.564,1.021,3.248,1.862,4.886,2.793L299.024,426.704z"/>
</g>
</svg>`;

const passportFemale = `<svg
height="100px"
width="100px"
version="1.1"
id="_x32_"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 512 512"
xml:space="preserve"
>
<style type="text/css">
	.st0 {
		fill: #000000;
	}
</style>
<g>
	<path
		class="st0"
		d="M394.907,363.894c-0.07-0.028-0.14-0.056-0.21-0.084c-9.137-3.446-18.077-5.976-25.948-8.13
c-5.243-1.433-9.961-2.698-13.932-3.908c-4.565-23.544-0.594-62.145,18.399-119.131C385.638,195.369,445.692,0,256,0
C66.308,0,130.55,194.222,138.784,232.641c10.199,47.592,25.193,96.734,19.014,118.425c-9.298,3.236-19.839,7.459-30.842,13.925
c-38.182-8.172-96.643,29.269-84.808,100.291c1.216,8.487,19.098,15.68,44.578,21.489c1.95,0.713,3.873,1.44,5.984,2.153
C128.257,500.948,186.808,511.979,256,512c57.958-0.007,106.877-7.529,141.794-16.973c8.752-2.37,16.609-4.858,23.55-7.396
c27.55-5.949,47.235-13.429,48.507-22.348C480.707,400.146,432.438,363.265,394.907,363.894z M358.899,443.808
c-5.369,0-52.792-16.63-102.899,3.055c-50.107-19.685-97.53-3.055-102.899-3.055c-4.271,0-8.507-46.451-14.589-67.22
c15.463-8.424,30.031-12.345,42.257-16.624c8.032-2.866,14.75-5.892,20.042-10.932c2.622-2.517,4.789-5.593,6.173-9.067
c1.391-3.474,2.013-7.263,2.006-11.212c0-8.354,0-18.798,0-33.107v-3.027l-2.02-2.243c-10.737-11.961-25.278-27.829-30.318-56.05
l-0.797-4.509l-4.306-1.538c-2.741-0.979-4.83-1.979-6.655-3.244c-2.691-1.901-5.131-4.494-7.984-9.814
c-2.816-5.284-5.802-13.177-9.066-24.634c-1.433-5.012-1.943-8.905-1.943-11.799c0.007-3.356,0.65-5.327,1.308-6.564
c0.992-1.804,2.209-2.572,3.761-3.194c1.062-0.405,2.188-0.559,2.831-0.615l7.626,1.622c2.845,4.53,4.201,8.92,4.201,8.92
s-5.369-16.106,8.948-37.58c13.953-20.929,73.812-2.796,111.63-56.559c36.958,43.599,37.79,14.946,51.219,35.084
c14.316,21.475,8.948,59.055,8.948,59.055s1.566-5.005,4.823-9.842l6.62-0.706c0.497-0.014,3.007,0.231,4.663,1.335
c0.902,0.573,1.636,1.244,2.307,2.482c0.657,1.238,1.3,3.202,1.314,6.564c0,2.894-0.518,6.781-1.944,11.799
c-4.341,15.295-8.235,24.187-11.807,29.122c-1.789,2.488-3.425,4.054-5.243,5.326c-1.824,1.266-3.914,2.265-6.654,3.244
l-4.306,1.538l-0.796,4.509c-5.04,28.22-19.581,44.089-30.318,56.05l-2.02,2.243v3.027c0,14.316,0,24.753,0,33.107
c-0.014,5.194,2.006,9.856,4.774,13.582c4.187,5.62,10.003,9.78,16.336,13.408c6.347,3.607,13.29,6.571,19.818,9.018
c7.801,2.894,17.742,5.173,28.611,8.346c0.616,0.182,1.245,0.378,1.86,0.559C367.826,392.583,363.38,443.808,358.899,443.808z"
	/>
</g>
</svg>`;
