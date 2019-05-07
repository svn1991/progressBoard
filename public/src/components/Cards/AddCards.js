/**
 * Flag to ensure 1 data object -> 1 data call in case of double clicking submit
 */
let newCardSaving = false;

/**
 * Return add card button template
 * @param {number} categoryId
 * @returns {object} add button element
 */
function getAddCardButtonTemplate(categoryId) {
  const addButton = document.createElement('div');
  addButton.classList.add('add-card-button');
  addButton.addEventListener('click', 
    function (event) {
      addCardButtonClicked(categoryId, event);      
    }
  );
  addButton.innerHTML = `
    <i class="icons fas fa-plus"></i>
    <div class="add-card-wrapper hidden"></div>
  `;
  return addButton;
}

/**
 * Add card button is clicked
 * @param {number} categoryIndex 
 * @param {object} element
 */
function addCardButtonClicked(categoryIndex, event) {
  let addCardElement = addCard(categoryIndex);
  if (event) {
    // ensure that no new card in a another category is being edited
    // ensure that no other cards are being updated
    if (!isActivtityInProgress()) {
      if (event.target && event.target.firstElementChild) {
        event.target.classList.add('editing-card');
        event.target.firstElementChild.classList.add('hidden');

        if (event.target && event.target.lastElementChild) {
          event.target.lastElementChild.appendChild(addCardElement);
          event.target.lastElementChild.classList.remove('hidden');
        }
      }
    } else {
      notifyUserOnActions();
    }
  }
}

/**
 * Configure formData and format card info
 * @param {object} formData form data
 */
function addNewCardInfo(formData) {
  const cardData = {};
  formData.forEach(data => {
    switch (data.name) {
      case 'title':
        cardData.title = data.value;
        break;
      case 'description':
        cardData.description = data.value;
        break;
      case 'columnId':
        cardData.columnId = data.value;
        break;
      default:
        break;
    }
  });
  return cardData;
}

/**
 * Listener added when new card information is submitted
 * @param {object} formElement form element related to saving new card info
 */
function setListenerForSavingNewCard(formElement) {
  if (formElement) {
    formElement.addEventListener(
      'submit',
      function _saveCard(event) {
        event.preventDefault();
        event.stopPropagation();
        let formData = $('#save-card-form') ? $('#save-card-form').serializeArray() : [];
        let formattedData = addNewCardInfo(formData);
        if (isCardNameDuplicate(formattedData.title)){
          const errorElement = document.getElementById('add-card-input-error');
          if (errorElement) {
            errorElement.innerText = "Please enter a unique card title";
          }
        } else {
          if (!newCardSaving) {
            newCardSaving = true;
            return addCardToDatabase(formattedData)
            .then(function(msg){
              console.log(msg);
              return loadCards('newCardAdded')
              .then(function(msg){
                resetAddCard();
                console.log(msg);
              })
              .fail(function(err) {
                console.log(err);
              });
            })
            .fail(function(err) {
              console.log(err);
            })
            .always(function() {
              newCardSaving = false;
            });
          } 
        }
        console.log('newcardsaving is true')       
        return false;
      }
    );
  }
}

/**
 * Listener added when new card information is discarded
 * @param {object} element discard new card info "button"
 */
function setListenerForDiscardingNewCard(element) {
  if (element) {
    element.addEventListener(
      'click', 
      resetAddCard
    );
  }
}

/**
 * Reset add card element to minimize
 */
function resetAddCard () {
  let editingCard = document.getElementsByClassName('editing-card')[0];
  if (editingCard) {
    editingCard.classList.remove('editing-card');
    notifyUserOnActions();
    editingCard.firstElementChild.classList.remove('hidden');
    editingCard.lastElementChild.innerHTML = "";
    editingCard.lastElementChild.classList.add('hidden');
  }
}

/**
 * Get element template for creating new card
 * @param {index} cardIndex card id in database
 * @param {index} categoryIndex column id in database
 * @return {object} dom element template
 */
function addCard(categoryIndex) {
  let addDiv = document.createElement('div');
  addDiv.dataset['categoryId']= categoryIndex;
  addDiv.classList.add('edit-card-element');

  addDiv.innerHTML = `
    <form id="save-card-form">
      <div class="card-header">
        <div class="card-title">
          <input type="text" name="title" value="" placeholder="Card Name" required/>
          <input type="hidden" name="columnId" value="${categoryIndex}" />
          <div id="add-card-input-error" class="error-msg"></div>
        </div>
      </div>
      <div class="card-description">
        <textarea 
          name="description" 
          placeholder="Please enter a description (optional)."
          wrap="hard"
        ></textarea>
      </div>
      <div class="card-save-wrapper">
        <div>
          <input type="submit" value="&#xf0c7;" name="submit" class="icons fas fa-save save-card card-save-action-button" />
        </div>
        <div>
          <i class="icons fas fa-trash discard-card card-save-action-button"></i>
        </div>
      </div>
    </form>      
  `;

  setListenerForSavingNewCard(addDiv.getElementsByTagName('form')[0]);
  setListenerForDiscardingNewCard(addDiv.getElementsByClassName('discard-card')[0]);

  return addDiv;
}

