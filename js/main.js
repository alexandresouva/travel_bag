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
    id: '',
    name: itemName.value,
    amount: itemAmount.value,
  };

  const isADuplicateItem = itemsInLocalStorage.find(
    (item) => item.name === currentItem.name
  );

  if (isADuplicateItem) {
    currentItem.id = isADuplicateItem.id;
    const indexOfDuplicate = itemsInLocalStorage.findIndex(
      (item) => item.id === isADuplicateItem.id
    );
    itemsInLocalStorage[indexOfDuplicate].amount = currentItem.amount;
    updateItemIntoDOM(currentItem, indexOfDuplicate);
  } else {
    if (itemsInLocalStorage.length === 0) {
      currentItem.id = 0;
    } else {
      currentItem.id =
        itemsInLocalStorage[itemsInLocalStorage.length - 1].id + 1;
    }

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
  newItem.appendChild(createDeleteButton(item.id));

  $list.appendChild(newItem);
}

function updateItemIntoDOM(item, index) {
  const amount = $list.querySelectorAll('.item')[index].firstChild;
  amount.textContent = item.amount;
}

function createDeleteButton(id) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';

  deleteBtn.addEventListener('click', (e) => {
    deleteItem(e.target.parentElement, id);
  });

  return deleteBtn;
}

function deleteItem(element, id) {
  itemsInLocalStorage.splice(
    itemsInLocalStorage.findIndex((item) => item.id === id),
    1
  );

  element.remove();
  localStorage.setItem('backpack', JSON.stringify(itemsInLocalStorage));
}
