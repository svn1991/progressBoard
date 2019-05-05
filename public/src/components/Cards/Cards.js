let cardDetails = [];
let cardKeyValue = {};

/**
 * Listener added when card is to be removed
 * @param {object} element card element
 * @param {number} cardId card id to be deleted
 */
function setDeleteCardListener(cardElement, cardId) {
  let deleteElem = cardElement.getElementsByClassName('fa-trash')[0];
  if (deleteElem) {
    deleteElem.addEventListener(
      'click', 
      function(event) {
        cardElement.parentNode.removeChild(cardElement);
        deleteCard(cardId)
        .then(function(msg) {
          console.log(msg);
          return updateCardsDetails('deleteCard');
        })
        .fail(function(err) {
          return err;
        })
        .always(function(msg) {
          console.log(msg);
        });
      }
    );
  }
}

/**
 * Update a card DOM with latest info
 * @param {number} cardId
 */
function updateCardElement(cardId) {
  let newCardElement = getCardElement(cardKeyValue[cardId], true);
  let oldCardElement = document.getElementById("card-id-" + cardId);

  newCardElement.classList.add('hidden');
  oldCardElement.insertAdjacentElement('afterend', newCardElement);
  oldCardElement.parentNode.removeChild(oldCardElement);
  newCardElement.classList.remove('hidden');
}

/**
 * Return individual card elements
 */
function getCardElement(card, update=false) {
  if (!update && $(".card-element#card-id-" + card.id).length > 0) {
    return false;
  }
  
  let cardTemplate = document.createElement('div');
  cardTemplate.id = "card-id-" + card.id;
  cardTemplate.dataset['categoryId'] = card.columnId;
  cardTemplate.dataset['cardId'] = card.id;
  cardTemplate.classList.add('card-element');
  cardTemplate.innerHTML = `
    <div class="card-header">
      <div class="card-title">
        <div class="card-display-wrapper">
          <span>${card.title}</span>
          <div class="card-edit-wrapper">
            <i class='icons fas fa-pen'></i>
            <i class='icons fas fa-trash'></i>
          </div>
        </div>
        <div class="card-editing-wrapper hidden">
          <input type="text" name="title" value="${card.title}" placeholder="Card Name" required/>
        </div>
      </div>
    </div>
    <div class="card-description">
      <div class="card-display-wrapper">
        <span class="display-card-fields ${!card.description ? 'grey-out' : ''}">
          ${card.description ? card.description : 'No description'}
        </span>
      </div>
      <div class="card-editing-wrapper hidden">
        <textarea
          class="editing-card-fields" 
          name="description" 
          placeholder="Please enter a description (optional)."
          wrap="hard"
        >${card.description}</textarea>
      </div>
    </div>
    <div class="card-editing-wrapper card-editing-controls hidden">
      <div class="card-edit-wrapper">
        <div>
          <i class='icons fas fa-check card-editing-action-button save-card'></i>
        </div>
        <div>
          <i class='icons fas fa-times card-editing-action-button discard-card'></i>
        </div>
      </div>
    </div>
  `;

  // save changes made during editing of a card
  setSaveEditCardListener(cardTemplate, card.id);

  // reset changes made during editing of a card
  setResetEditCardListener(cardTemplate, card.id);

  // change card display mode to editing mode
  setEditCardListener(cardTemplate, card.id);

  // delete the card
  setDeleteCardListener(cardTemplate, card.id);
  return cardTemplate;
}

/**
 * Create cards elements
 */
function createCards() {
  for (let i=0; i<cardDetails.length; i++) {
    let cardElement = getCardElement(cardDetails[i]);
    if (!cardElement) {
      continue;
    }
    let cardCategoryId = "cards-category-"+cardDetails[i].columnId;
    let categoryElement = document.getElementById(cardCategoryId);

    categoryElement.appendChild(cardElement);
  }
}

/**
 * map card details array into object
 */
function createCardsKeyValue() {
  cardDetails.map((card) => cardKeyValue[card.id] = card);
}

/**
 * Update Card details variable
 * @param {string} action status where this function was called
 */
function updateCardsDetails(action) {
  return getCardsData()
    .then(function(cardsInfo) {
      if (cardsInfo.length > 0) {
        cardDetails = cardsInfo;
        createCardsKeyValue();
        console.log(action + ' caused proper load of card details');
        return;
      } else {
        throw action + ' did not update card details';
      }
    })
    .fail(function (err) {
      console.log(err);
      return;
    });
}

/**
 * Execute: Load cards data
 */
function loadCards(action) {
  return updateCardsDetails(action)
  .then(function(msg) {
    if (cardDetails.length > 0) {
      createCards();
      console.log(msg);
      console.log('Successfully loaded cards');
      return;
    } else {
      throw 'Please check cards information in database'
    }
  })
  .fail(function (err) {
    console.log(err);
    return;
  });
}