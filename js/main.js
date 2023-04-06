const $form = document.querySelector('#novoItem');
const $list = document.querySelector('#list');
const itemsInLocalStorage = [];

$form.addEventListener('submit', (e) => addItemToTravelList(e));

function addItemToTravelList(e) {
  e.preventDefault();

  let itemName = e.target.elements['nome'];
  let itemAmount = e.target.elements['quantidade'];
  createListItem(itemName.value, itemAmount.value);

  itemName.value = '';
  itemAmount.value = '';
}

function createListItem(name, amount) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const quantityOfItems = document.createElement('strong');
  quantityOfItems.textContent = amount;

  newItem.appendChild(quantityOfItems);
  newItem.innerHTML += name;

  $list.appendChild(newItem);

  const currentItem = {
    name: name,
    amount: amount,
  };
  itemsInLocalStorage.push(currentItem);
  localStorage.setItem('travelItems', JSON.stringify(itemsInLocalStorage));
}
