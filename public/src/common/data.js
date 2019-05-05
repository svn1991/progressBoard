/**
 * Functions related to getting data from db.json
 */

/**
 * Get categories data
 */
function getCategoriesData() {
  return $.ajax({
    url: '/columns',
    dataType: 'json',
    success: function( data ) {
      return data
    },
    error: function( data ) {
      return data
    }
  });
}

/**
 * Get cards data
 */
function getCardsData() {
  return $.ajax({
    url: '/cards',
    dataType: 'json',
    success: function( data ) {
      return data
    },
    error: function( data ) {
      return data
    }
  });
}

/**
 * Get card object which can be pushed into the database
 * @param {object} newCardInfo 
 * @return {object} card info object which has same format as database
 */
function addCardToDatabase(newCardInfo) {
  return $.ajax({
    type: 'POST',
    url: '/cards',
    data: JSON.stringify(newCardInfo),
    contentType: "application/json",
    dataType: "json",
    success: function() {
      return newCardInfo + ' data sent to database successfully';
    },
    error: function(err) {
      return err + 'ajax failing'
    }
  });
}

/**
 * Get category object which can be pushed into the database
 * @param {object} newCategoryInfo 
 * @return {object} category info object which has same format as database
 */
function addCategoryToDatabase(newCategoryInfo) {
  return $.ajax({
    type: 'POST',
    url: '/columns',
    data: JSON.stringify(newCategoryInfo),
    contentType: "application/json",
    dataType: "json",
    success: function() {
      return newCategoryInfo + ' data sent to database successfully';
    },
    error: function(err) {
      return err + 'ajax failing'
    }
  });
}

/**
 * Delete card object based on its id
 * @param {number} cardId
 */
function deleteCard(cardId) {
  return $.ajax({
    type: 'DELETE',
    url: '/cards/'+cardId,
    success: function() {
      return cardId + ' deleted';
    },
    error: function(err) {
      return err + 'unable to delete card'
    }
  });
}

/**
 * Update card object
 * @param {object} card
 */
function updateCard(card) {
  return $.ajax({
    type: 'PUT',
    url: '/cards/'+card.id,
    data: JSON.stringify(card),
    contentType: "application/json",
    dataType: "json",
    success: function() {
      return card.id + ' updated';
    },
    error: function(err) {
      return err + 'unable to update card'
    }
  });
}