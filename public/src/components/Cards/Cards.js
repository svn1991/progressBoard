let cardDetails = {};

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
 * Return individual card elements
 */
function getCardElement(card) {
  if ($(".card-element#card-id-" + card.id).length > 0) {
    return false;
  }
  
  let cardTemplate = document.createElement('div');
  cardTemplate.id = "card-id-" + card.id;
  cardTemplate.dataset['categoryId'] = card.columnId;
  cardTemplate.dataset['cardId'] = card.id;
  cardTemplate.classList.add('card-element');
  cardTemplate.innerHTML = `
    <div class="card-header">
      <div class="card-title">${card.title}</div>
      <div class="card-edit-wrapper">
        <i class='icons fas fa-trash'></i>
      </div>
    </div>
    <div class="card-description">${card.description}</div>
  `;

  setDeleteCardListener(cardTemplate, card.id);
  return cardTemplate;
}

/**
 * Create cards elements
 */
function createCards(cards) {
  for (let i=0; i<cards.length; i++) {
    let cardElement = getCardElement(cards[i]);
    if (!cardElement) {
      continue;
    }
    let cardCategoryId = "cards-category-"+cards[i].columnId;
    let categoryElement = document.getElementById(cardCategoryId);

    categoryElement.appendChild(cardElement);
  }
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
        return action + ' caused proper load of card details';
      } else {
        throw action + ' did not update card details';
      }
    })
    .fail(function (err) {
      return err;
    });
}

/**
 * Execute: Load cards data
 */
function loadCards(action) {
  return updateCardsDetails(action)
  .then(function(cardsInfo) {
    if (cardsInfo.length > 0) {
      createCards(cardDetails);
      return 'Successfully loaded cards'
    } else {
      throw 'Please check cards information in database'
    }
  })
  .fail(function (err) {
    return err;
  });
}