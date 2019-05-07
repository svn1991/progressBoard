/**
 * Set up app and its elements
 */
function setupApp() {
  loadCategories('firstLoad')
  .then(function() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.appendChild(getAddCategoryWrapper());
    setUpSearch();
    console.log('add new column button done')
  })
  .fail(function(err) {
    console.log(err);
  });
}