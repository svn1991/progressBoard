/**
 * Replace display view of card with an editing view
 * @param {object} element card element
 * @param {number} cardId card id to be deleted
 */
function setEditCardListener(cardTemplate, cardId) {
  let editElem = cardTemplate.getElementsByClassName('fa-pen')[0];
  if (editElem) {
    editElem.addEventListener(
      'click',
      function(event) {
        let card = cardKeyValue[cardId];
        if (card && card.id) {
          cardTemplate.classList.add('editing-in-progress');
          $(cardTemplate).find('.card-display-wrapper').addClass('hidden');
          $(cardTemplate).find('.card-editing-wrapper').removeClass('hidden');          
        }
      }
    );
  }
}

/**
 * Save changes made during editing
 * @param {object} cardTemplate card element
 * @param {number} cardId card info data object
 */
function setSaveEditCardListener(cardTemplate, cardId) {
  let checkIcon = cardTemplate.getElementsByClassName('fa-check')[0];
  
  if (checkIcon) {
    checkIcon.addEventListener('click', function(event) {
      let titleInput = cardTemplate.getElementsByTagName('input')[0];
      let textarea = cardTemplate.getElementsByTagName('textarea')[0];
      let card = {...cardKeyValue[cardId]};

      if (titleInput && textarea && card && card.id) {
        card.title = titleInput.value;
        card.description = textarea.value;

        updateCard(card)
        .then(function(msg) {
          console.log(msg);
          return updateCardsDetails('update')
            .then(function(updateLocalData) {
              updateCardElement(card.id);
              return updateLocalData;
            })
            .fail(function(err) {
              return err;
            });
        })
        .fail(function(err) {
          console.log(err);
        })
        .always(function() {
          cardTemplate.classList.remove('editing-in-progress');
          $(cardTemplate).find('.card-editing-wrapper').addClass('hidden');
          $(cardTemplate).find('.card-display-wrapper').removeClass('hidden');
        });
      }
    });
  }
}

/**
 * Reset changes made during editing
 * @param {object} cardTemplate card element
 * @param {number} cardId card info data object
 */
function setResetEditCardListener(cardTemplate, cardId) {
  let crossIcon = cardTemplate.getElementsByClassName('fa-times')[0];
  
  if (crossIcon) {
    crossIcon.addEventListener('click', function(event) {
      let titleInput = cardTemplate.getElementsByTagName('input')[0];
      let textarea = cardTemplate.getElementsByTagName('textarea')[0];
      let card = cardKeyValue[cardId];

      if (titleInput && textarea && card && card.id) {
        titleInput.value = card.title;
        textarea.value = card.description;

        cardTemplate.classList.remove('editing-in-progress');
        $(cardTemplate).find('.card-editing-wrapper').addClass('hidden');
        $(cardTemplate).find('.card-display-wrapper').removeClass('hidden');
      }
    });
  }
}