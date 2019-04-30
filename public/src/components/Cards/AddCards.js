/**
 * Add card button is clicked
 * @param {number} categoryIndex 
 * @param {object} element
 */
function addCardButtonClicked(categoryIndex, event) {
  let addCardElement = addCard(cardDetails.length+1, categoryIndex);
  if (event) {
    if (event.target && event.target.firstElementChild) {
      event.target.classList.add('editing-card');
      event.target.firstElementChild.classList.add('hidden');

      if (event.target && event.target.lastElementChild) {
        event.target.lastElementChild.appendChild(addCardElement);
        event.target.lastElementChild.classList.remove('hidden');
      }
    }
  }
}

/**
 * Get element template for creating new card
 * @param {index} cardIndex card id in database
 * @param {index} categoryIndex column id in database
 * @return {object} dom element template
 */
function addCard(cardIndex, categoryIndex) {
  let editDiv = document.createElement('div');
  editDiv.id="card-id-" + cardIndex;
  editDiv.dataset['categoryId']= categoryIndex;
  editDiv.dataset['cardId']= cardIndex;
  editDiv.classList.add('edit-card-element');

  editDiv.innerHTML = `
    <div class="card-header">
      <div class="card-title">
        <input type="text" name="cardName" value="" placeholder="Card Name" required/>
      </div>
    </div>
    <div class="card-description">
      <textarea 
        name="cardDescription" 
        placeholder="Please enter a description (optional)."
        wrap="hard"
      ></textarea>
    </div>
    <div class="card-save-wrapper">
      <i class="icons fas fa-save save-card card-save-action-button"></i>
      <i class="icons fas fa-trash discard-card card-save-action-button"></i>
    </div>
  `;

  editDiv.getElementsByClassName('discard-card')[0].addEventListener(
    'click', 
    function _discardCard(event){
      let editingCard = document.getElementsByClassName('editing-card')[0];
      editingCard.classList.remove('editing-card');
      editingCard.firstElementChild.classList.remove('hidden');
      editingCard.lastElementChild.innerHTML = "";
      editingCard.lastElementChild.classList.add('hidden');
    }
  );

  return editDiv;
}

