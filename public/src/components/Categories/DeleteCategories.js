/**
 * Delete Category and their cards
 * @param {object} categoryElement
 * @param {number} categoryId 
 */
function deleteCategoryListener(categoryElement, categoryId) {
  let initialDeleteWrapper = categoryElement.getElementsByClassName('category-actions-wrapper')[0];
  let titleWrapper = categoryElement.getElementsByClassName('category-title-wrapper')[0];
  let deleteWrapper = categoryElement.getElementsByClassName('category-deletion-wrapper')[0];
  if (initialDeleteWrapper && titleWrapper && deleteWrapper) {
    let initialDelete = initialDeleteWrapper.getElementsByClassName('discard-category')[0];
    if (initialDelete){
      initialDelete.addEventListener('click', function(event) {
        if (isActivtityInProgress()) {
          titleWrapper.classList.add('hidden');
          deleteWrapper.classList.remove('hidden');
          initialDeleteWrapper.classList.add('adding-category-in-progress');
        }        
      });

      let confirmDeletion = deleteWrapper.getElementsByClassName('save-card')[0];
      let resetDeletion = deleteWrapper.getElementsByClassName('discard-card')[0];

      if (confirmDeletion) {
        confirmDeletion.addEventListener('click', function (){
          runDeleteCategory(categoryId);
        });
      }

      if (resetDeletion) {
        resetDeletion.addEventListener('click', function(){
          titleWrapper.classList.remove('hidden');
          deleteWrapper.classList.add('hidden');
          initialDeleteWrapper.classList.remove('adding-category-in-progress');
        });
      }
    }
  }
}

/**
 * Initial delete category
 * @param {number} categoryId
 */
function runDeleteCategory(categoryId) {
  return deleteCategory(categoryId)
  .then(function(msg2){
    deleteCategoryDom(categoryId);
    return updateCategoryDetails()
    .then(function(msg){
      console.log(msg)
      return updateCardsDetails()
      .then(function(msg3){
        console.log(msg3);
      })
      .fail(function(err){ 
        console.log(err);
      }); 
    })
    .fail(function(err){
      console.log(err);
    });    
  })
  .fail(function(err){
    console.log(err);
  });
}

/**
 * Delete Category DOM
 * @param {number} categoryId
 */
function deleteCategoryDom(categoryId) {
  let categoryElement = document.getElementById('category-id-'+categoryId);
  if (categoryElement) {
    categoryElement.parentNode.removeChild(categoryElement);
  }
}