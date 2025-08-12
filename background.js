// ===========================
// Stay Hydrated Extension
// MV3 service worker version
// ===========================

// When extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Stay Hydrated extension installed/updated");

  // Log notification permission level
  chrome.notifications.getPermissionLevel((level) => {
    console.log("Notification permission:", level);
  });
});

// When Chrome starts up (helps debug wake-ups)
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started");
});

// Alarm listener (top-level so it's always registered)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "stay_healthy") {
    console.log("Alarm fired:", alarm);

    chrome.notifications.create({
      type: "basic",
      iconUrl: "stay_hydrated.png",
      title: "Stay Hydrated!",
      message: "Time to sip water!",
      priority: 2,
      requireInteraction: true, // stays until dismissed
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error("Notification error:", chrome.runtime.lastError);
      } else {
        console.log("Notification sent:", notificationId);
      }
    });
  }
});

// Message listener for popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === "reset") {
      chrome.alarms.clear("stay_healthy", () => {
        if (chrome.runtime.lastError) {
          console.error("Error clearing alarm:", chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError });
        } else {
          console.log("Alarm cleared successfully");
          sendResponse({ success: true });
        }
      });
      return true; // keep the message channel open
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

// Helper: create or reset the alarm
function createAlarm(minutes) {
  console.log(`Creating alarm for ${minutes} minutes`);
  chrome.alarms.clear("stay_healthy", () => {
    chrome.alarms.create("stay_healthy", {
      delayInMinutes: minutes,
      periodInMinutes: minutes, // repeats
    });
    console.log("Alarm created successfully");

    // For debugging: check current alarm
    chrome.alarms.get("stay_healthy", (alarm) => {
      console.log("Current alarm:", alarm);
    });
  });
}
