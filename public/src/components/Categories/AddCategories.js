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
  categoryForm.classList.add('category-save-form');
  categoryForm.innerHTML = `
    <input id="category-title-input" value="" placeholder="Category Name" required />
    <div class="category-save-wrapper">
      <div>
        <input type="submit" value="&#xf0c7;" name="submit" class="icons fas fa-save save-category category-save-action-button" />
      </div>
      <div>
        <i class="icons fas fa-trash discard-category category-save-action-button"></i>
      </div>
    </div>
  `;

  categoryElement.appendChild(categoryForm);
  return categoryElement;
}