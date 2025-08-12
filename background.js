// ===========================
// Stay Hydrated Extension - MV3
// ===========================

// When extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Stay Hydrated extension installed/updated");

  // Check notification permission
  chrome.notifications.getPermissionLevel((level) => {
    console.log("Notification permission:", level);
  });

  // For testing — create a short 6-second alarm
  chrome.alarms.create("stay_hydrated", { delayInMinutes: 0.1, periodInMinutes: 0.1 });
  console.log("Test alarm created (fires every 6 seconds)");
});

// On Chrome startup
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started");
});

// Alarm listener (always top-level)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "stay_hydrated") {
    console.log("Alarm fired:", alarm);

    // Wake extension with badge update
    chrome.action.setBadgeText({ text: "💧" });
    chrome.action.setBadgeBackgroundColor({ color: "#00AEEF" });

    // Send notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "stay_hydrated.png",
      title: "Stay Hydrated!",
      message: "Time to sip water!",
      priority: 2,
      requireInteraction: true,
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error("Notification error:", chrome.runtime.lastError);
      } else {
        console.log("Notification sent:", notificationId);
      }
    });
  }
});

// Message listener from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === "reset") {
      chrome.alarms.clear("stay_hydrated", () => {
        if (chrome.runtime.lastError) {
          console.error("Error clearing alarm:", chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError });
        } else {
          console.log("Alarm cleared successfully");
          sendResponse({ success: true });
        }
      });
      return true;
    }

    if (request.time) {
      const minutes = parseInt(request.time);
      if (isNaN(minutes) || minutes <= 0 || minutes > 999) {
        sendResponse({ success: false, error: "Invalid time value" });
        return true;
      }

      createAlarm(minutes);
      sendResponse({ success: true });
    }
  } catch (error) {
    console.error("Error in message handler:", error);
    sendResponse({ success: false, error: error.message });
  }
  return true;
});

// Helper: create/reset alarm
function createAlarm(minutes) {
  console.log(`Creating alarm for ${minutes} minutes`);
  chrome.alarms.clear("stay_hydrated", () => {
    chrome.alarms.create("stay_hydrated", {
      delayInMinutes: minutes,
      periodInMinutes: minutes,
    });
    console.log("Alarm created successfully");

    chrome.alarms.get("stay_hydrated", (alarm) => {
      console.log("Current alarm:", alarm);
    });
  });
}
