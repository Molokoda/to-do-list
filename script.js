const arrayOfLists = ['todo','prog','done'];
let idButton = '';
function checkList(name){
	div = document.querySelector(`.${name}`);
	ul = div.querySelector('ul');
	arrayOfLi = ul.querySelectorAll('li');
	if(arrayOfLi.length === 0){
		return false;
	}
	else{
		return true;
	}
}

function deleteOrConfirm(){
	if(this.id.slice(4,this.id.length) === 'Clear'){
		idButton = this.id;
		if(checkList(idButton.slice(0,4))){
			confirmDecition();
		}
		else{
			alert('List is empty');
		}
	
	}
	else if(this.id.slice(0,4) === arrayOfLists[1]){
		idButton = this.id;
		confirmDecition();
	}
	else{
		deleteButton(this.id);
	}
}
function confirmDecition(){
	let div = document.querySelector('.agreement');
	div.style.display = 'flex';

}
function decitionYes(){
	if(idButton.slice(4, idButton.length) === 'Clear'){
		clearAll(idButton);
	}
	else{
		deleteButton(idButton);
	}
	let div = document.querySelector('.agreement');
	div.style.display = 'none';
}

function decitionNo(){
	let div = document.querySelector('.agreement');
	div.style.display = 'none';
}

function shift(number, array, name){
	for(let i = number; i < array.length; i++){
		let	arrayOfSpan = array[i].querySelectorAll('span');
		arrayOfSpan[0].textContent = i + ' '; 
		let arrayOfButton = array[i].querySelectorAll('button');
		arrayOfButton[0].id = name + i;
		arrayOfButton[1].id = name + i;
	}
}

function deleteButton(indetification){
	const listName = indetification.slice(0,4);
	const liNumber = indetification.slice(4,indetification.length);
	let div = document.querySelector(`.${listName}`);
	let spans = div.querySelectorAll('span');
	spans[1].textContent = spans[1].textContent - 1;
	let ul = div.querySelector('ul');
	let arrayOfLi = ul.querySelectorAll('li');
	shift(liNumber, arrayOfLi, listName);
	ul.removeChild(arrayOfLi[liNumber - 1]);
}

function nextButton(){
	const listName = this.id.slice(0,4);
	const liNumber = this.id.slice(4,this.id.length);
	let nextListName;
	for(i = 0; i < arrayOfLists.length; i++){
		if(arrayOfLists[i] === listName){
			nextListName = arrayOfLists[(i + 1) % arrayOfLists.length];
		}
	}
	let nextDiv = document.querySelector(`.${nextListName}`);
	let nextUl = nextDiv.querySelector('ul');
	let nextArrayOfLi = nextUl.querySelectorAll('li');
	if(nextListName === arrayOfLists[1] && nextArrayOfLi.length === 5){
		alert('Finish something in progress before add new');
	}
	else{
		let div = document.querySelector(`.${listName}`);
		let spans = div.querySelectorAll('span');
		spans[1].textContent = spans[1].textContent - 1;
		let ul = div.querySelector('ul');
		let arrayOfLi = ul.querySelectorAll('li');
		
		spans = nextDiv.querySelectorAll('span');
		spans[1].textContent = parseInt(spans[1].textContent) + 1;
		let arrayOfButton = arrayOfLi[liNumber - 1].querySelectorAll('button');
		let arrayOfSpan = arrayOfLi[liNumber - 1].querySelectorAll('span');
		arrayOfSpan[0].textContent = nextArrayOfLi.length + 1 + ' '; 
		arrayOfButton[1].id = nextListName + (nextArrayOfLi.length + 1); 
		arrayOfButton[0].id = nextListName + (nextArrayOfLi.length + 1);
		shift(liNumber, arrayOfLi, listName);
		nextUl.appendChild(arrayOfLi[liNumber - 1]);
	}
}

function creatLi(){
	let addElement = document.querySelector('.addElement');
	let arrayOfInputs = addElement.querySelectorAll('input');
	if(arrayOfInputs[0].value !== '' & arrayOfInputs[1].value !== ''){
		let newLi = document.createElement('li');
		let newSpan = document.createElement('span');
		newSpan.textContent = count(arrayOfLists[0]) + 1 + ' ';
		newLi.appendChild(newSpan);
		newSpan = document.createElement('span');
		newSpan.textContent = arrayOfInputs[0].value;
		newLi.appendChild(newSpan);
		newSpan = document.createElement('span');
		newSpan.textContent = arrayOfInputs[1].value;
		newLi.appendChild(newSpan);
		newButton = document.createElement('button');
		newButton.addEventListener('click',nextButton);
		newButton.setAttribute('id','todo' + (count(arrayOfLists[0]) + 1) );
		newLi.appendChild(newButton);
		newButton = document.createElement('button');
		newButton.setAttribute('id','todo' + (count(arrayOfLists[0]) + 1) );
		newButton.addEventListener('click',deleteOrConfirm);
		newLi.appendChild(newButton);
		let div = document.querySelector(`.${arrayOfLists[0]}`);
		let ul = div.querySelector('ul');
		ul.appendChild(newLi);
		changeCounter(arrayOfLists[0]);
	}
	else{
		alert('Fill all fields');
	}
	arrayOfInputs[0].value = '';
	arrayOfInputs[1].value = '';
		
}

function changeCounter(name){
	let element = document.querySelector(`.${name}`);
	let counter = element.querySelector('.counter');
	counter.textContent = count(name);
}

function count(name){
	let element = document.querySelector(`.${name}`);
	let ul = element.querySelector('ul');
	let arrayOfLi = ul.querySelectorAll('li');
	return arrayOfLi.length;
}

function clearAll(indetification){
	let listName = indetification.slice(0, 4);
	div = document.querySelector(`.${listName}`);
	ul = div.querySelector('ul');
	arrayOfLi = ul.querySelectorAll('li');
	for(i = arrayOfLi.length - 1; i >= 0; i--){
		ul.removeChild(arrayOfLi[i]);
	}
	changeCounter(listName)
}

yes.addEventListener('click',decitionYes);
no.addEventListener('click',decitionNo);
add.addEventListener('click',creatLi);
todoClear.addEventListener('click', deleteOrConfirm);
progClear.addEventListener('click', deleteOrConfirm);
doneClear.addEventListener('click', deleteOrConfirm);