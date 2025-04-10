const customSelects = document.querySelectorAll('.custom-select');

customSelects.forEach((customSelect) => {
  const selectElem = customSelect.querySelector('select');
  const placeholder = selectElem.getAttribute('placeholder');
  const options = [...selectElem.options].filter((option) => !option.disabled);

  const selectOverlay = document.createElement('div');
  selectOverlay.setAttribute('class', 'select-overlay select-hide');

  const selectSelected = document.createElement('div');
  selectSelected.classList.add('select-selected');
  selectSelected.innerHTML = `<div>${
    selectElem.options[selectElem.selectedIndex].innerHTML
  }</div>`;

  if (placeholder) selectSelected.innerHTML = `<div>${placeholder}</div>`;

  const selectItems = document.createElement('div');
  selectItems.setAttribute('class', 'select-items select-hide');

  [...options].forEach((option, index) => {
    const optionElem = document.createElement('div');
    optionElem.classList.add('select-item');
    optionElem.innerHTML = option.innerHTML;
    if (index === 0) optionElem.classList.add('same-as-selected');
    selectItems.append(optionElem);

    optionElem.addEventListener('click', () => {
      const sameAsSelected = selectItems.querySelector('.same-as-selected');
      const changeEvent = new Event('change');
      selectSelected.innerHTML = `<span>${option.innerHTML}</span>`;
      selectElem.value = option.value;
      customSelect.dataset.value = selectElem.value;
      sameAsSelected.classList.remove('same-as-selected');
      optionElem.classList.add('same-as-selected');
      selectElem.dispatchEvent(changeEvent);
      closeAllSelect();
    });
  });

  customSelect.append(selectSelected, selectItems, selectOverlay);

  selectSelected.addEventListener('click', function (event) {
    event.stopPropagation();
    closeAllSelect();
    event.currentTarget.classList.add('active');
    selectOverlay.classList.remove('select-hide');
    selectItems.classList.remove('select-hide');
  });

  selectOverlay.addEventListener('click', closeAllSelect);
});

function closeAllSelect() {
  customSelects.forEach((customSelect) => {
    const selectOverlayElement = customSelect.querySelector('.select-overlay');
    const selectItemElement = customSelect.querySelector('.select-items');
    const selectSelectedElement = customSelect.querySelector('.select-selected');

    selectSelectedElement.classList.remove('active');
    selectItemElement.classList.add('select-hide');
    selectOverlayElement.classList.add('select-hide');
  });
}