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
    success: function(data) {
      return loadCards()
      .then(function(msg){
        return newCardInfo + 'added successfully';
      })
      .fail(function(err) {
        return err;
      });
    },
    error: function( data ) {
      return data
    }
  });
}