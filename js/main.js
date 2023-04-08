'use strict';

const $form = document.querySelector('#form');
const $list = document.querySelector('#list');
// Retorna o primeiro valor true, se ambos forem falsos, o último valor é retornado
const itemsInLocalStorage = JSON.parse(localStorage.getItem('backpack')) || [];

$form.addEventListener('submit', function addItemToBackpack(e) {
  e.preventDefault();

  let itemName = e.target.elements['nome'];
  let itemAmount = e.target.elements['quantidade'];
  const currentItem = {
    id: itemsInLocalStorage.length,
    name: itemName.value,
    amount: itemAmount.value,
  };

  const isADuplicateItem = itemsInLocalStorage.find(
    (item) => item.name === currentItem.name
  );

  if (isADuplicateItem) {
    currentItem.id = isADuplicateItem.id;
    itemsInLocalStorage[currentItem.id].amount = currentItem.amount;
    updateItemIntoDOM(currentItem);
  } else {
    createItemIntoDOM(currentItem);
    itemsInLocalStorage.push(currentItem);
  }

  localStorage.setItem('backpack', JSON.stringify(itemsInLocalStorage));

  itemName.value = '';
  itemAmount.value = '';
});

itemsInLocalStorage?.forEach((item) => createItemIntoDOM(item));

function createItemIntoDOM(item) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const quantityOfItems = document.createElement('strong');
  quantityOfItems.classList.add('item__amount');
  quantityOfItems.textContent = item.amount;

  newItem.appendChild(quantityOfItems);
  newItem.innerHTML += item.name;

  $list.appendChild(newItem);
}

function updateItemIntoDOM(item) {
  const amount = $list.querySelectorAll('.item')[item.id].firstChild;
  amount.textContent = item.amount;
}
