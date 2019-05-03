/**************************************************************************************/
/**************************** VARIABLES AND FUNCTIONS *********************************/
/**************************************************************************************/

/**
 * Return add card button template
 * @param {object} cardWrapper element which will contain category cards
 * @param {number} categoryId
 * @returns {object} add button element
 */
function getAddCardButtonTemplate(categoryId) {
  const addButton = document.createElement('div');
  addButton.classList.add('add-card-button');
  addButton.addEventListener('click', 
    function _addCardTemplate(event) {
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
 * When category info is received, create category html
 */
function createCategories(categories) {
  for (let i=0; i<categories.length; i++) {
    let category = categories[i];
    let categoryElement = document.createElement('div');
    categoryElement.classList.add('category-element')
    categoryElement.id = "category-id-" + category.id;
    categoryElement.dataset['categoryId'] = category.id;
    categoryElement.innerHTML = `
      <div class="category-title">${category.title}</div>
      <div class="cards-wrapper" data-category-id=${category.id} id="cards-category-${category.id}">
      </div>
    `;
    if (categoryElement.getElementsByClassName('cards-wrapper')[0]) {
      categoryElement.getElementsByClassName('cards-wrapper')[0].appendChild(getAddCardButtonTemplate(category.id));
      addCategory(categoryElement);
    } else {
      throw 'Could not find cards-wrapper element for Category ' + category.id + '.';
    }
  }
}

/**
 * Add category element to DOM
 */
function addCategory(categoryElement) {
  categoriesContainer.appendChild(categoryElement);
}



/**************************************************************************************/
/*********************************** EXECUTIONS ***************************************/
/**************************************************************************************/

let categoriesData = {};

/**
 * Setting up the categories html template
 */
const progressCategoriesTemplate = document.createElement('div');
progressCategoriesTemplate.id = 'progressCategories-template';
progressCategoriesTemplate.innerHTML = 
`
  <div id="categories-container"></div>
`;

/**
 * Adding template to 'body'
 */
const categoriesWrapper = document.getElementById('progress-categories-wrapper');
categoriesWrapper.innerHTML = progressCategoriesTemplate.innerHTML;
const categoriesContainer = document.getElementById('categories-container');

/**
 * Execute: Get categories data and start creating cards
 */
function loadCategories() {
  return getCategoriesData()
  .then(function(categoriesInfo) {
    if (categoriesInfo.length > 0) {
      categoriesData = categoriesInfo;
      createCategories(categoriesData);
      return loadCards('firstCardsLoad')
      .then(function(msg){
        return msg;
      })
      .fail(function(err) {
        return err;
      });;
    } else {
      throw 'Please check categories information in database'
    }
  })
  .fail(function (err) {
    categoriesContainer.innerHTML = 
    `
      <div> Sorry, categories cant be loaded. Please contact administrator. </div>
    `;
    return err;
  });
}

loadCategories()
.then(function(msg){
  console.log(msg);
})
.fail(function(err) {
  console.log(err);
});