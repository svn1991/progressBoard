let cardDetails = {};

/**
 * Return individual card elements
 */
function getCardElement(card) {
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
  return cardTemplate;
}

/**
 * Create cards elements
 */
function createCards(cards) {
  for (let i=0; i<cards.length; i++) {
    let cardElement = getCardElement(cards[i]);
    let cardCategoryId = "cards-category-"+cards[i].columnId;
    let categoryElement = document.getElementById(cardCategoryId);

    categoryElement.appendChild(cardElement);
  }
}

/**
 * Execute: Load cards data
 */
function loadCards() {
  return getCardsData()
  .then(function(cardsInfo) {
    if (cardsInfo.length > 0) {
      cardDetails = cardsInfo;
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