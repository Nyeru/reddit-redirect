const STATUS_EL = document.getElementById("status");
const TOGGLE_BTN = document.getElementById("toggleBtn");
const RULE_ID = 1;

// Function to create the redirect rule dynamically
function createRedirectRule() {
  return {
    id: RULE_ID,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { transform: { host: "old.reddit.com" } }
    },
    condition: {
      urlFilter: "reddit.com",
      resourceTypes: ["main_frame"]
    }
  };
}

// Initialize popup
chrome.storage.local.get(["redirectEnabled"], async (data) => {
  let enabled = data.redirectEnabled ?? true;

  if (enabled) {
    // Add rule dynamically if enabled
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [createRedirectRule()],
      removeRuleIds: []
    });
  } else {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID]
    });
  }

  updateUI(enabled);
});

// Toggle button click
TOGGLE_BTN.addEventListener("click", async () => {
  const data = await chrome.storage.local.get(["redirectEnabled"]);
  const enabled = !(data.redirectEnabled ?? true);

  await chrome.storage.local.set({ redirectEnabled: enabled });

  if (enabled) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [createRedirectRule()],
      removeRuleIds: []
    });
  } else {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID]
    });
  }

  updateUI(enabled);
});

// Update the popup UI
function updateUI(enabled) {
  STATUS_EL.textContent = enabled ? "Enabled" : "Disabled";
  TOGGLE_BTN.textContent = enabled ? "Turn Off" : "Turn On";
}