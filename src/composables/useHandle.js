export function handleClickOutSide(event, variableTrigger, htmlSelector) {
  const modalContainer = document.querySelector(`${htmlSelector}`);
  if (
    modalContainer &&
    !modalContainer.contains(event.target.parentNode) &&
    variableTrigger.value
  ) {
    variableTrigger.value = false;
  }
}
