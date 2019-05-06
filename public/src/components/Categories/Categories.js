let categoryDetails = [];
let categoryKeyValue = {};

/**
 * Allow card to be dropped into other categories
 * @param {object} event 
 */
function allowCardDrop(event) {
  event.preventDefault();
}

/**
 * Card dropped into other categories
 * @param {object} event 
 * @param {string} categoryId
 */
function dropCard(event, categoryId) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const card = document.getElementById(data);
  const wrapper = document.getElementById('cards-category-'+categoryId);

  if (wrapper && card) {
    const cardId = parseInt(card.dataset["cardId"]);
    wrapper.appendChild(card);
    updateCard({
      ...cardKeyValue[cardId],
      columnId: categoryId
    })
    .then(function(msg){
      console.log(msg);
      return updateCardsDetails()
      .then(function(msg){
        console.log(msg);
        return;        
      })
      .fail(function(err){
        console.log(err);
        return err;
      });
    })
    .fail(function(err){
      console.log(err);
      return err;
    });
  }
}

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
    <div class="category-title-wrapper category-title-wrapper-${category.id}">
      <div class="category-title-container">
        <div class="category-title category-display-title" data-category-id="${category.id}">${category.title}</div>
        <input class="category-input hidden" value=${category.title} name="category-title-input" placeholder="Enter a name" data-category-id="${category.id}" required />
      </div>
      <div class="category-actions-wrapper category-actions-${category.id}">
        <div>
          <i class='icons fas fa-times category-delete-action-button discard-category'></i>
        </div>
      </div>
    </div>  
    <div class="category-deletion-wrapper hidden category-delete-${category.id}">
      <div class="warning-msg">Confirm deletion of category?</span>?</div>
      <div class="category-deletion-controls">
        <div>
          <i class='icons fas fa-check category-deleting-action-button save-card'></i>
        </div>
        <div>
          <i class='icons fas fa-times category-deleting-action-button discard-card'></i>
        </div>
      </div>
    </div>
  `;

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('cards-wrapper');
  cardsWrapper.dataset['categoryId'] = category.id;
  cardsWrapper.id = 'cards-category-'+category.id;
  cardsWrapper.addEventListener('dragover', function(event) {
    allowCardDrop(event);
  });
  cardsWrapper.addEventListener('drop', function(event) {
    dropCard(event, category.id);
  });

  categoryElement.appendChild(cardsWrapper);

  switchCategoryTitleListener(categoryElement, category.id);
  deleteCategoryListener(categoryElement, category.id);
  return categoryElement;
}

/**
 * Switch to input view to edit category title
 * @param {number} categoryId 
 */
function switchCategoryTitleListener(element, categoryId) {
  let title = element.getElementsByClassName('category-title')[0];
  if (title) {
    title.addEventListener('click', function(event){
      event.preventDefault();

      // prevent category name change if a card is being edited
      if (
        document.getElementsByClassName('editing-card').length > 0 || 
        document.getElementsByClassName('editing-in-progress').length > 0 ||
        document.getElementsByClassName('adding-category-in-progress').length > 0
      ) {
        return;
      }

      let activeInput = $('.category-input:not(.hidden)');
      if (activeInput.length === 1) {
        if (activeInput.data('categoryId') != event.target.dataset[categoryId]) {
          saveCategoryTitleInInput();
        }
      }

      let input = element.getElementsByClassName('category-input')[0];
      let actionButton = element.getElementsByClassName('category-actions-wrapper')[0];
      
      if (input && actionButton) {
        title.classList.add('hidden');
        actionButton.classList.add('hidden');
        input.value = categoryKeyValue[categoryId].title;
        input.classList.remove('hidden');
      }
    });  
  }
}

/**
 * Listener to check if category input requires saving
 */
function addListenerForCategoryInput() {
  document.addEventListener('click', function(event){
    console.log(event.target.classList);
    
    // ignore when clicked element has class category-title
    if (event.target.classList.contains('category-title')) {
      return;
    }

    // ignore when clicked element is an active category input
    if (event.target.classList.contains('category-input') && !event.target.classList.contains('hidden')) {
      return;
    }

    saveCategoryTitleInInput();
  }); 
}

/**
 * Update Category Title of any column input which is active
 * @param {} activeInput 
 * @param {*} categoryId 
 */
function saveCategoryTitleInInput() {
  // if input is not hidden
  let activeInput = $('.category-input:not(.hidden)');

  if (activeInput.length === 1) {

    // for each input save the value
    const categoryId = activeInput.data('categoryId');
    const category = categoryKeyValue[categoryId]
    if (activeInput.val() && category && category.title !== activeInput.val()) {
      updateCategory({
        ...category,
        title: activeInput.val()
      })
      .then(function(msg) {
        return updateCategoryDetails()
        .then(function(){
          switchToDisplayCategory(activeInput, categoryId);
        })
        .fail(function(){

        });
      })
      .fail(function(err){
        console.log(err);
      });
    } else {
      switchToDisplayCategory(activeInput, categoryId);
    }
  }
}

/**
 * Switch to display category name instead of input
 * @param {object} input jquery input element
 * @param {number} categoryId 
 */
function switchToDisplayCategory(activeInput, categoryId) {
  activeInput.addClass('hidden');
  activeInput.val(categoryKeyValue[categoryId].title);
  const categoryTitle = activeInput.siblings('.category-title');
  if (categoryTitle) {
    categoryTitle.text(categoryKeyValue[categoryId].title);
    categoryTitle.removeClass('hidden');
    const actionWrapper = $('.category-actions-'+categoryId);
    if (actionWrapper) {
      actionWrapper.removeClass('hidden');
    }
  }
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

  addListenerForCategoryInput();
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