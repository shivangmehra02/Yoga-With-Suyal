const inquiryForm = document.querySelector("#inquiry-form");
const statusNode = document.querySelector("#form-status");

const requiredSelectors = ["#name", "#email", "#phone", "#mode", "#program", "#slot", "#message"];

function validateField(field) {
  const value = field.value.trim();
  let valid = true;

  if (!value) valid = false;

  if (field.type === "email" && value) {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (field.type === "tel" && value) {
    valid = /^[0-9+\-\s]{8,20}$/.test(value);
  }

  field.classList.toggle("invalid", !valid);
  return valid;
}

function validateForm() {
  if (!inquiryForm) return false;
  let isValid = true;

  requiredSelectors.forEach((selector) => {
    const field = inquiryForm.querySelector(selector);
    if (!field) return;
    if (!validateField(field)) isValid = false;
  });

  return isValid;
}

function setStatus(message, type) {
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.classList.remove("success", "error");
  if (type) statusNode.classList.add(type);
}

function createMailtoLink(formData) {
  const subject = encodeURIComponent(
    `Yoga Class Inquiry - ${formData.program || "New Request"}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Preferred Mode: ${formData.mode}`,
      `Session Model: ${formData.program}`,
      `Preferred Slot: ${formData.slot}`,
      "",
      "Message:",
      formData.message,
    ].join("\n")
  );
  return `mailto:hello@yogawithsuyal.com?subject=${subject}&body=${body}`;
}

if (inquiryForm) {
  requiredSelectors.forEach((selector) => {
    const field = inquiryForm.querySelector(selector);
    if (!field) return;

    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill all required fields correctly.", "error");
      return;
    }

    const submitButton = inquiryForm.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const formData = Object.fromEntries(new FormData(inquiryForm).entries());
    const mailtoLink = createMailtoLink(formData);

    window.location.href = mailtoLink;
    inquiryForm.reset();
    setStatus(
      "Your email app has been opened with your inquiry for Yoga with Suyal.",
      "success"
    );

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = "Send Inquiry";
    }
  });
}
