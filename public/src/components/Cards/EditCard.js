/**
 * Get edit cards template for editing already saved cards
 * @param {number} cardId 
 * @param {string} description
 * @param {string} title
 * @param {number} columnId
 * @return {string} innerHTML
 */
function getEditElement(card) {
  let editDiv = document.createElement('div');
  editDiv.dataset['categoryId']= card.columnId;
  editDiv.classList.add('edit-card-element');

  editDiv.innerHTML = `
    <form id="edit-card-form">
      <div class="card-header">
        <div class="card-title">
          <input type="text" name="title" value="${card.title}" placeholder="Card Name" required/>
          <input type="hidden" name="columnId" value="${card.columnId}" />
          <input type="hidden" name="cardId" value="${card.id}" />
        </div>
      </div>
      <div class="card-description">
        <textarea 
          name="description" 
          placeholder="Please enter a description (optional)."
          wrap="hard"
        >${card.description}</textarea>
      </div>
      <div class="card-save-wrapper">
        <div>
          <input type="submit" value="&#xf0c7;" name="submit" class="icons fas fa-save save-edit-card card-edit-action-button" />
        </div>
        <div>
          <i class="icons fas fa-trash discard-edit-card card-edit-action-button"></i>
        </div>
      </div>
    </form>      
  `;
  return editDiv;
}