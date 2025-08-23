// simplybook-button.js

const baseUrl = "https://williammatkaselka.simplybook.it/v2/";

/**
 * Creates a SimplyBook button for general bookings
 */
export function createSimplyBookButton(containerId, buttonText) {
  createButton(containerId, `${baseUrl}#book`, buttonText);
}

/**
 * Creates a SimplyBook button for package bookings
 */
export function createSimplyBookPackageButton(containerId, buttonText) {
  createButton(containerId, `${baseUrl}#packages`, buttonText);
}

/**
 * Internal helper to generate button
 */
function createButton(containerId, url, buttonText) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }

  const button = document.createElement("a");
  button.href = url;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.textContent = buttonText;

  // Styles (same for both buttons)
  button.style.textDecoration = "none";
  button.style.background = "#006aa7";
  button.style.color = "#fff";
  button.style.padding = "10px 16px";
  button.style.borderRadius = "4px";
  button.style.display = "inline-block";
  button.style.lineHeight = "1.3";   // ensures multi-line text is clean
  button.style.whiteSpace = "normal"; // allow wrapping

  container.style.textAlign = "center"; // center it
  container.appendChild(button);
}
