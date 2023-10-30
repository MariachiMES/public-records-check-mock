const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const dob = document.getElementById('dob');
const goBtn = document.getElementById('go-button');
const tableBodyEl = document.getElementById('table-body');

goBtn.addEventListener('click', getNamesArr);

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
	let fullNameArr = [];
	if (firstArr.length > 1) {
		fullNameArr.push(firstArr.concat(lastArr).join(' '));
	}

	for (var i = 0; i < firstArr.length; i++) {
		fullNameArr.push(firstArr[i] + ' ' + lastArr.join(' '));
		for (var j = 0; j < lastArr.length; j++) {
			fullNameArr.push(firstArr[i] + ' ' + lastArr[j]);
		}
	}
	console.log(fullNameArr);
	renderBGCheck(fullNameArr);
}

function renderBGCheck(arr) {
	arr.forEach((line) => {
		const tableRow = document.createElement('tr');
		tableRow.innerHTML = `<td>${line}</td>
      <td>${dob.value}</td>
      <td>Clear</td>`;
		console.log(tableRow);
		tableBodyEl.append(tableRow);
	});
}
