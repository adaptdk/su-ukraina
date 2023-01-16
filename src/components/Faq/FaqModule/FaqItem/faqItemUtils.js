// Just took this from stackoverflow
// https://stackoverflow.com/a/30810322
const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement(`textarea`);
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = `0`;
  textArea.style.left = `0`;
  textArea.style.position = `fixed`;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand(`copy`);
  } catch (err) {
    //console.error(`Fallback: Oops, unable to copy`, err);
  }

  document.body.removeChild(textArea);
};

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log(`Async: Copying to clipboard was successful!`);
    },
    function (err) {
      console.error(`Async: Could not copy text: `, err);
    }
  );
}

/**
 * Handler for the faq item's copy button.
 *
 * This function does two things: 1) creates a pop-up animation with
 * text that says whatever is set as the "data-copied" attribute;
 * and 2) copies the selected FAQ item's section's URL to the clipboard.
 * @param {*} e Mouse click event.
 */
const handleAnchorClick = (e) => {
  const el = document.createElement(`span`);
  el.className = `copy-popup`;
  el.ariaHidden = true;
  el.innerText = e.target.dataset.copied;
  e.target.parentNode.appendChild(el);
  setTimeout(() => {
    el.classList.add(`copy-popup--active`);
  }, 1);

  setTimeout(() => {
    el.classList.remove(`copy-popup--active`);
    setTimeout(() => {
      el.parentNode.removeChild(el);
    }, 500);
  }, 1001);

  copyTextToClipboard(e.target.href);

  e.preventDefault();
};

export { handleAnchorClick };
