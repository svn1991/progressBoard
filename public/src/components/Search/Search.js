let searchActivated = false;
let searchTerm = "";

/**
 * Load search function into app
 */
function setUpSearch() {
  const element = document.getElementById('search-container');
  if (element) {
    element.appendChild(getSearchTemplate());
  }
}

/**
 * Get search input template
 */
function getSearchTemplate() {
  const element = document.createElement('div');
  element.id = "search-input-wrapper";
  element.classList.add('search-wrapper');
  element.innerHTML = `
    <input id="search-input" class="search-input" type="text" value="" placeholder="Search..." name="search"/>
    <span class="icons fas fa-search search-icon"></span>
    <span class="icons fas fa-times cancel-search-icon hidden"></span>
  `;

  activateSearch(element);
  addSearchInputListener(element);
  deactivateSearch(element);
  
  return element;
}

/**
 * when search textbox is clicked
 */
function activateSearch(element) {
  element.addEventListener('click', function(event){
    if (!event.target.classList.contains('cancel-search-icon')){
      searchActivated = true;
      $(element).find('.icons.search-icon').addClass('hidden');
      $(element).find('.icons.cancel-search-icon').removeClass('hidden');
    }    
  });
}

/**
 * when search is cancelled
 */
function deactivateSearch(element) {
  const cancelSearch = element.getElementsByClassName('cancel-search-icon')[0];
  if (cancelSearch) {
    cancelSearch.addEventListener('click', function(event){      
      $(element).find('.icons.cancel-search-icon').addClass('hidden');
      $(element).find('.icons.search-icon').removeClass('hidden');
      $(element).find('#search-input').val('');
      searchTerm = "";
      checkSearchResult();
      searchActivated = false;
    });
  }  
}

/**
 * Listening for input changes in search box
 */
function addSearchInputListener(element) {
  const input = element.getElementsByClassName('search-input')[0];
  if(input) {
    input.addEventListener('input', function(event){
      searchTerm = event.target.value;
      checkSearchResult();
    })
  }
}

/**
 * When input in search term changes or card details change
 */
function checkSearchResult() {
  if (searchTerm === "") {
    $('[id^=card-id-]').removeClass('hidden');  
  } else {
    for (let i=0; i<cardDetails.length; i++) {
      const card = cardDetails[i];
      if (card.title.indexOf(searchTerm) === -1) {
        $('#card-id-'+card.id).addClass('hidden');
      } else {
        $('#card-id-'+card.id).removeClass('hidden');
      }
    }  
  }
}