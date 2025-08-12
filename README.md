# Hydration Buddy
## Video Demo: https://youtu.be/HIiCGP48m7c

Never forget to drink water again! Hydration Buddy sends gentle reminders every 25 minutes so you can stay refreshed and focused throughout your day. This simple Chrome extension aims to help users develop a healthy hydration habit by sending subtle alerts during long work or study sessions.

# What It Does

Spending long hours working or studying? It’s easy to forget basic self-care like drinking enough water. Hydration Buddy is a lightweight Chrome extension that nudges you with a friendly alert every 25 minutes, helping you build a healthy hydration habit and feel your best.

The extension runs quietly in the background and uses Chrome’s notifications API to send reminders without interrupting your workflow. This encourages consistent water intake which can improve energy, concentration, and overall well-being.

Hydration Buddy's timer is easy to use and automatically starts counting down as soon as the extension is loaded. The reminder interval is designed to strike a balance — frequent enough to keep hydration on your mind, but spaced out so it doesn’t become distracting.

# Why I Built It

I noticed I was often dehydrated during long work sessions, which affected my energy and concentration. Despite knowing the importance of drinking water, I would get caught up in my tasks and forget to hydrate regularly.

This extension is my personal solution to stay on track and keep hydrated regularly without breaking focus. By using Hydration Buddy, I can maintain better health habits without adding complexity to my day.

# How to Use

1. Download or clone this repo.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer mode (top right corner).
4. Click **Load unpacked** and select the project folder.
5. The extension will start sending hydration reminders every 25 minutes automatically.

When the timer finishes, you’ll receive a notification prompting you to drink water. You can keep working and the extension will remind you again after the next interval.

# Customization

The reminder interval is currently set to 25 minutes, but you can easily adjust the timing in the code if you prefer.

To customize, open the `background.js` file and modify the timer duration (currently set to 1500000 milliseconds, which equals 25 minutes). This flexibility allows you to tailor reminders to your personal schedule.

# File Overview

- `manifest.json`: Defines the extension’s metadata, permissions, background scripts, and popup UI. It tells Chrome how to load and run the extension.
- `background.js`: Contains the main timer logic and sends notifications at the configured intervals. This script runs in the background, ensuring reminders continue even when the popup is closed.
- `popup.html` & `popup.js`: Provide a simple interface that appears when clicking the extension icon. They show the current timer status and will allow for future settings adjustments.
- `style.css`: Styles the popup window to ensure a clean, user-friendly design that matches Chrome’s look and feel.
- `README.md`: This documentation file explaining the project purpose, usage, design decisions, and future plans.

# Design Choices

- **25-minute interval**: Inspired by the Pomodoro Technique, this interval balances work focus with regular self-care breaks. It’s short enough to prevent dehydration without interrupting productivity.
- **Chrome extension format**: Allows hydration reminders to be integrated directly into the user’s daily browser experience without needing a separate app or device.
- **Use of notifications API**: Enables gentle, non-intrusive reminders that don’t require window pop-ups or sounds that could be distracting.
- **Simple UI**: The popup is minimalistic to avoid overwhelming the user and focuses on core functionality.

# Challenges & Learnings

Building Hydration Buddy helped me deepen my understanding of JavaScript, especially working with asynchronous timers and the Chrome extensions API.

I faced challenges debugging background scripts and ensuring notifications fired reliably. Chrome’s developer tools and console logs were invaluable in troubleshooting.

I also learned about extension permissions and how to balance functionality with user privacy and security.

# Future Improvements

- Add a settings page in the popup to let users customize reminder intervals without editing code.
- Include sound alerts and customizable notification messages.
- Track hydration history to motivate users with progress reports.
- Expand support to other browsers like Firefox or Edge.
- Add pause/resume controls for the timer.

# Contact

Questions or feedback? Feel free to reach out!  
Email: [hsuyatihtike43@gmail.com](mailto:hsuyatihtike43@gmail.com)

# License

This project is licensed under the MIT License — see the LICENSE file for details.
