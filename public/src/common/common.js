/**
 * Check if any card/category are being added/edited/deleted
 */
function isActivtityInProgress() {
  if (
    document.getElementsByClassName('editing-card').length === 0 &&
    document.getElementsByClassName('editing-in-progress').length === 0 &&
    document.getElementsByClassName('adding-category-in-progress').length === 0 &&
    document.getElementsByClassName('editing-category-in-progress').length === 0
  ) {
    return false;
  }
  return true;
}

/**
 * Notify user to complete previous actions before proceeding
 */
function notifyUserOnActions() {
  let msg = "";
  let element;
  if (document.getElementsByClassName('editing-card').length > 0) {
    msg = "Please save/discard adding new card."
  } else if (document.getElementsByClassName('editing-in-progress').length > 0) {
    msg = "Please save/discard editing current card."
  } else if (document.getElementsByClassName('adding-category-in-progress').length > 0) {
    msg = "Please save/discard adding new category."
  } else if (document.getElementsByClassName('editing-category-in-progress').length > 0) {
    msg = "Please save/discard editing current category."
  } else {
    msg = "";
  }

  const notfiyDiv = document.getElementById('actions-notification');
  notfiyDiv.innerText = msg;
}