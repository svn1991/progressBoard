/**
 * Add card button is clicked
 * @param {number} categoryIndex 
 * @param {object} element
 */
function addCardButtonClicked(categoryIndex, event) {
  let addCardElement = addCard(cardDetails.length+1, categoryIndex);
  if (event) {
    if (event.target && event.target.firstElementChild) {
      event.target.classList.add('editing-card');
      event.target.firstElementChild.classList.add('hidden');

      if (event.target && event.target.lastElementChild) {
        event.target.lastElementChild.appendChild(addCardElement);
        event.target.lastElementChild.classList.remove('hidden');
      }
    }
  }
}

/**
 * Configure formData and format card info
 * @param {object} formData form data
 */
function addNewCardInfo(formData) {
  const cardData = {
    id: cardDetails.length + 1
  };
  formData.forEach(data => {
    switch (data.name) {
      case 'title':
        cardData.title = data.value;
        break;
      case 'description':
        cardData.description = data.value;
        break;
      case 'columnId':
        cardData.columnId = data.value;
        break;
      default:
        break;
    }
  });
  return cardData;
}

/**
 * Get element template for creating new card
 * @param {index} cardIndex card id in database
 * @param {index} categoryIndex column id in database
 * @return {object} dom element template
 */
function addCard(cardIndex, categoryIndex) {
  let editDiv = document.createElement('div');
  editDiv.id="card-id-" + cardIndex;
  editDiv.dataset['categoryId']= categoryIndex;
  editDiv.dataset['cardId']= cardIndex;
  editDiv.classList.add('edit-card-element');

  editDiv.innerHTML = `
    <form id="save-card-form">
      <div class="card-header">
        <div class="card-title">
          <input type="text" name="title" value="" placeholder="Card Name" required/>
          <input type="hidden" name="columnId" value="${categoryIndex}" />
        </div>
      </div>
      <div class="card-description">
        <textarea 
          name="description" 
          placeholder="Please enter a description (optional)."
          wrap="hard"
        ></textarea>
      </div>
      <div class="card-save-wrapper">
        <div>
          <input type="submit" value="&#xf0c7;" name="submit" class="icons fas fa-save save-card card-save-action-button" />
        </div>
        <div>
          <i class="icons fas fa-trash discard-card card-save-action-button"></i>
        </div>
      </div>
    </form>      
  `;
  
  editDiv.getElementsByTagName('form')[0].addEventListener(
    'submit',
    function _saveCard(event) {
      event.preventDefault();
      let formData = $('#save-card-form') ? $('#save-card-form').serializeArray() : [];
      let formattedData = addNewCardInfo(formData);
      addCardToDatabase(formattedData)
      .then(function(msg){
        console.log(msg);
        loadCards()
        .then(function(msg){
          console.log(msg);
        })
        .fail(function(err) {
          console.log(err);
        });
      })
      .fail(function(err) {
        console.log(err);
      });;
      return false;
    }
  );
  
  editDiv.getElementsByClassName('discard-card')[0].addEventListener(
    'click', 
    function _discardCard(event){
      let editingCard = document.getElementsByClassName('editing-card')[0];
      editingCard.classList.remove('editing-card');
      editingCard.firstElementChild.classList.remove('hidden');
      editingCard.lastElementChild.innerHTML = "";
      editingCard.lastElementChild.classList.add('hidden');
    }
  );

  return editDiv;
}

