const form = document.querySelector("#inquiry-form");
const topic = document.querySelector("#topic");
const followUpFields = document.querySelector("#follow-up-fields");
const message = document.querySelector("#message");
const charCount = document.querySelector("#char-count");
const formStatus = document.querySelector("#form-status");
const successMessage = document.querySelector("#success-message");
const sendAnotherButton = document.querySelector("#send-another");

const conditionalFields = {
  product: document.querySelector("#product-field"),
  service: document.querySelector("#service-field"),
  order: document.querySelector("#order-field"),
};

function updateFollowUpFields() {
  const activeField = conditionalFields[topic.value];

  for (const [fieldType, field] of Object.entries(conditionalFields)) {
    const isActive = field === activeField;
    field.hidden = !isActive;

    const input = field.querySelector("input, select");
    input.disabled = !isActive;
    input.required = isActive && fieldType === "service";
  }

  followUpFields.hidden = !activeField;
}

function updateCharacterCount() {
  charCount.textContent = `${message.value.length} / 1000`;
}

topic.addEventListener("change", updateFollowUpFields);
message.addEventListener("input", updateCharacterCount);
message.maxLength = 1000;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.hidden = true;

  if (!form.reportValidity()) {
    return;
  }

  form.hidden = true;
  successMessage.hidden = false;
});

sendAnotherButton.addEventListener("click", () => {
  form.reset();
  updateFollowUpFields();
  updateCharacterCount();
  successMessage.hidden = true;
  form.hidden = false;
  formStatus.hidden = true;
  document.querySelector("#name").focus();
});
