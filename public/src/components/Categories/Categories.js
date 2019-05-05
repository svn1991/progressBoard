let categoryDetails = [];
let categoryKeyValue = {};

/**
 * Get category element template
 */
function getCategoryElement(category, update=false) {
  if (!update && $("#category-id-" + category.id).length > 0) {
    return false;
  }

  let categoryElement = document.createElement('div');
  categoryElement.classList.add('category-element')
  categoryElement.id = "category-id-" + category.id;
  categoryElement.dataset['categoryId'] = category.id;
  categoryElement.innerHTML = `
    <div class="category-title">${category.title}</div>
    <div class="cards-wrapper" data-category-id=${category.id} id="cards-category-${category.id}">
    </div>
  `;
  return categoryElement;
}
/**
 * When category info is received, create category html
 */
function createCategories() {
  for (let i=0; i<categoryDetails.length; i++) {
    let category = categoryDetails[i];
    let categoryElement = getCategoryElement(category);
    if (!categoryElement) {
      continue;
    }
    
    if (categoryElement.getElementsByClassName('cards-wrapper')[0]) {
      categoryElement.getElementsByClassName('cards-wrapper')[0].appendChild(getAddCardButtonTemplate(category.id));
      addCategory(categoryElement);
    } else {
      console.log('Could not find cards-wrapper element for Category ' + category.id + '.');
    }
  }
}

/**
 * Add category element to DOM
 */
function addCategory(categoryElement) {
  categoriesContainer.appendChild(categoryElement);
}

/**
 * map category details array into object
 */
function createCategoryKeyValue() {
  categoryDetails.map((category) => categoryKeyValue[category.id] = category);
}

/**
 * Update Category details variable
 * @param {string} action status where this function was called
 */
function updateCategoryDetails(action) {
  return getCategoriesData()
  .then(function(categoryInfo) {
    if (categoryInfo.length > 0) {
      categoryDetails = categoryInfo;
      createCategoryKeyValue();
      console.log(action + ' caused proper load of category details');
      return;
    } else {
      throw action + ' did not update category details';
    }
  })
  .fail(function (err) {
    console.log(err);
    return;
  });
}

/**
 * Execute: Get categories data and start creating cards
 */
function loadCategories(status) {
  return updateCategoryDetails(status)
  .then(function(msg) {
    console.log(msg);
    console.log(status + ': loadCategories and Update variable done');
    createCategories();
    return loadCards(status)
      .then(function(msg){
        console.log(msg + ': loadCategories and loadCards done');
        return;
      })
      .fail(function(err){
        console.log('loadCategories & loadCards errored out');
        console.log(err);
        return;
      });
  })
  .fail(function (err) {
    console.log(status + 'fail of category add');
    categoriesContainer.innerHTML = 
    `
      <div> Sorry, categories cant be loaded. Please contact administrator. </div>
    `;
    return err;
  });
}