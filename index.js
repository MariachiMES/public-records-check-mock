const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const dob = document.getElementById('dob');
const goBtn = document.getElementById('go-button');
const tableBodyEl = document.getElementById('table-body');
const a_number = document.getElementById('a-number');
const fingerPrintBtn = document.getElementById('fingerprints');
const lopcBtn = document.getElementById('lopc');
const poaBtn = document.getElementById('poa');
const stateEl = document.getElementById('state');
a_number.placeholder = 'A Number';
a_number.value = '123456789';
firstName.value = 'Panfilo Roberto';
lastName.value = 'Jimenez Telosico';
dob.value = '11/12/1990';
stateEl.value = 'TX';

const todayEl = document.getElementById('todays-date');
const today = new Date();
todayEl.append(today.toLocaleDateString());

goBtn.addEventListener('click', getNamesArr);
fingerPrintBtn.addEventListener('click', renderFingerprints);
lopcBtn.addEventListener('click', renderLOPC);
poaBtn.addEventListener('click', renderPoa);

function renderFingerprints() {
	console.log('render Finger Prints');
}

function renderLOPC() {}

function renderPoa() {}

let firstNameArr = [];
let lastNameArr = [];

function getNamesArr() {
	if (firstName.value.split(' ').length > 1) {
		firstNameArr = firstName.value.split(' ');
	} else {
		firstNameArr = [firstName.value];
	}
	if (lastName.value.split(' ').length > 1) {
		lastNameArr = lastName.value.split(' ');
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
	tableBodyEl.innerHTML = '';
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
