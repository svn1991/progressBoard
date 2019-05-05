/**
 * Flag to ensure 1 data object -> 1 data call in case of double clicking submit
 */
let newCategorySaving = false;

/**
 * Return add category button template
 * @returns {object} add button element
 */
function getAddCategoryWrapper() {
  const addCategory = document.createElement('div');
  addCategory.id = "add-category-wrapper";
  addCategory.appendChild(getAddCategoryButtonTemplate());
  addCategory.appendChild(getAddCategoryFormTemplate());
  return addCategory;
}

/**
 * Return add category button template
 * @returns {object} add button element
 */
function getAddCategoryButtonTemplate() {
  const addButton = document.createElement('div');
  addButton.classList.add('add-category-button');
  addButton.id = 'add-category-button';
  addButton.addEventListener('click', 
    function () {
      addCategoryButtonClicked();      
    }
  );
  addButton.innerHTML = `
    <i class="icons fas fa-plus"></i>
  `;
  return addButton;
}

/**
 * Get add category form
 */
function addCategoryButtonClicked() {
  let categoryButton = document.getElementById('add-category-button');
  categoryButton.classList.add('hidden');
  let addCategoryForm = document.getElementById('add-category-form-wrapper');
  addCategoryForm.classList.remove('hidden');
}

/**
 * Get template for adding new card
 */
function getAddCategoryFormTemplate() {
  let categoryElement = document.createElement('div');
  categoryElement.classList.add('category-element');
  categoryElement.classList.add('hidden');
  categoryElement.id = 'add-category-form-wrapper';

  let categoryForm = document.createElement('form');
  categoryForm.id = 'save-category-form';
  categoryForm.innerHTML = `
    <input id="category-title-input" name="title" value="" placeholder="Category Name" required />
    <div class="category-save-wrapper">
      <div>
        <input type="submit" value="&#xf0c7;" name="submit" class="icons fas fa-save save-category category-save-action-button" />
      </div>
      <div>
        <i class="icons fas fa-trash discard-category category-save-action-button"></i>
      </div>
    </div>
  `;

  saveAddCategoryButtonClicked(categoryForm);
  discardAddCategoryButtonClicked(categoryForm);

  categoryElement.appendChild(categoryForm);
  return categoryElement;
}

/**
 * Listener for saving category
 */
function saveAddCategoryButtonClicked(formElement) {
  if (formElement) {
    formElement.addEventListener('submit', function(){
      event.preventDefault();
      let formData = $('#save-category-form') ? $('#save-category-form').serializeArray() : [];
      let formattedData = addNewCategoryInfo(formData);
      if (!newCardSaving) {
        newCategorySaving = true;
        return addCategoryToDatabase(formattedData)
        .then(function(msg){
          console.log(msg);
          return loadCategories('newCategoryAdded')
          .then(function(msg){
            resetAddCategory();
            console.log(msg);
          })
          .fail(function(err) {
            console.log(err);
          });
        })
        .fail(function(err) {
          console.log(err);
        })
        .always(function() {
          newCategorySaving = false;
        });
      }
    });
  }
}

function resetAddCategory() {
  let categoryButton = document.getElementById('add-category-button');
  categoryButton.classList.remove('hidden');
  let addCategoryForm = document.getElementById('add-category-form-wrapper');
  addCategoryForm.classList.add('hidden');
  let categoryAddInput = document.getElementById('category-title-input');
  categoryAddInput.value = "";
}

/**
 * Configure formData and format card info
 * @param {object} formData form data
 */
function addNewCategoryInfo(formData) {
  const categoryData = {};
  formData.forEach(data => {
    switch (data.name) {
      case 'title':
        categoryData.title = data.value;
        break;
      default:
        break;
    }
  });
  return categoryData;
}

/**
 * Listener for discarding new add of category
 */
function discardAddCategoryButtonClicked(formElement) {
  let discardButton = formElement.getElementsByClassName('discard-category')[0];
  if (discardButton) {
    discardButton.addEventListener(
      'click', 
      resetAddCategory
    );
  }
}