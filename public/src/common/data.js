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