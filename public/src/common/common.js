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