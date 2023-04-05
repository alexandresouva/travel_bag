const $form = document.querySelector('#novoItem');
const $list = document.querySelector('#list');

$form.addEventListener('submit', (e) => addItemToTravelList(e));

function addItemToTravelList(e) {
  e.preventDefault();

  const itemName = e.target.elements['nome'].value;
  const itemAmount = e.target.elements['quantidade'].value;
  createListItem(itemName, itemAmount);
}

function createListItem(name, amount) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const quantityOfItems = document.createElement('strong');
  quantityOfItems.textContent = amount;

  newItem.appendChild(quantityOfItems);
  newItem.innerHTML += name;

  $list.appendChild(newItem);
}
