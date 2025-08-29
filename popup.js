const STATUS_EL = document.getElementById("status");
const TOGGLE_BTN = document.getElementById("toggleBtn");
const RULE_ID = 1001;
// Creates redirect Rule
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
    },
  };
}

// Initialize popup with immediate status display
async function initializePopup() {
  try {
    const data = await chrome.storage.local.get(["redirectEnabled"]);
    const enabled = data.redirectEnabled ?? true;
    
    updateUI(enabled);
    
    if (enabled) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID],
        addRules: [createRedirectRule()],
      });
    } else {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID]
      });
    }
    
  } catch (error) {
    console.error("Error initializing popup:", error);
    updateUI(true);
  }
}

// Toggle button
TOGGLE_BTN.addEventListener("click", async () => {
try {
    TOGGLE_BTN.disabled = true;
    

    const data = await chrome.storage.local.get(["redirectEnabled"]);
    const newState = !(data.redirectEnabled ?? true);
    

    await chrome.storage.local.set({ redirectEnabled: newState });
    
    if (newState) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [createRedirectRule()],
        removeRuleIds: []
      });
    } else {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID]
      });
    }
    
    updateUI(newState);
    
  } catch (error) {
    console.error("Error toggling redirect:", error);
    TOGGLE_BTN.disabled = false;
  }
});

// Update the popup UI
function updateUI(enabled) {
  STATUS_EL.textContent = enabled ? "Enabled" : "Disabled";
  STATUS_EL.className = enabled ? "status-enabled" : "status-disabled";
  
  TOGGLE_BTN.textContent = enabled ? "Turn Off" : "Turn On";
  TOGGLE_BTN.className = enabled ? "btn-turn-off" : "btn-turn-on";
  TOGGLE_BTN.disabled = false;
}

initializePopup();
