/* Do not let both "Participants" fields of any form be required at once */
document.addEventListener('DOMContentLoaded', function () {
  var textArea = document.getElementById('participants');
  var fileUpload = document.getElementById('participants_via_file_upload');

  if (!textArea || !fileUpload) {
    return;
  }

  /* to indicate an un-required field is "(alternative)" (not "(important)") */
  /* https://github.com/TACC/Core-Styles/blob/v2.57.3/src/lib/_imports/components/c-form.css#L98-L104 */
  var style = document.createElement('style');
  style.textContent = `
    .field-wrapper:not(.required) label[for*="participants"] .asterisk:after {
      content: "(alternative)";
    }
  `;
  document.head.appendChild(style);

  var textAreaWrapper = textArea.closest('.field-wrapper');
  var fileUploadWrapper = fileUpload.closest('.field-wrapper');

  function ensureAsterisk(wrapper) {
    var label = wrapper.querySelector('label');
    if (label && !label.querySelector('.asterisk')) {
      var asterisk = document.createElement('span');
      asterisk.className = 'asterisk';
      asterisk.textContent = '*';
      label.appendChild(asterisk);
    }
  }

  ensureAsterisk(textAreaWrapper);
  ensureAsterisk(fileUploadWrapper);

  function updateRequired() {
    const hasText = textArea.value.trim() !== '';
    const hasFile = fileUpload.value !== '';
    const shouldRequireTextArea = !hasFile;
    const shouldRequireFileUpload = hasFile && !hasText;

    textArea.required = shouldRequireTextArea;
    fileUpload.required = shouldRequireFileUpload;

    textAreaWrapper.classList.toggle('required', shouldRequireTextArea);
    fileUploadWrapper.classList.toggle('required', shouldRequireFileUpload);
  }

  textArea.addEventListener('input', updateRequired);
  fileUpload.addEventListener('change', updateRequired);

  updateRequired();
});
