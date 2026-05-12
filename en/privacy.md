---
title: Privacy Policy
description: FlexKey privacy details for local data, sensitive permissions, network access, and user controls.
layout: legal
lang: en
lang_switch_url: /privacy.html
---

# Privacy Policy

Effective date: May 12, 2026

This Privacy Policy applies to the FlexKey Android app and this web page. FlexKey is a local automation tool. Its core features depend on rules, conditions, actions, and scripts that you create or import.

## What We Do Not Upload by Default

By default, FlexKey does not upload the following content to developer servers:

- Rules, conditions, actions, scripts, and gesture configurations you create.
- Selected app scopes, action library installation status, and local settings.
- Accessibility events, notification content, key events, screenshots, or foreground app information.

This data is mainly stored in the app's private data directory and is used to run automation rules on your device.

## Data Processed Locally

To provide its features, FlexKey processes the following data on your device:

| Data type | Purpose |
| --- | --- |
| Rules, actions, and scripts | Save user configuration and run actions when conditions match |
| App package names and app labels | Configure rule scopes, launch apps, and check built-in action dependencies |
| Key events and input device information | Recognize hardware keys, Bluetooth buttons, and key-combo conditions |
| Accessibility events and UI text | Match accessibility conditions and run Back, Home, scroll, click, copy, paste, and related actions |
| Notification titles, text, and buttons | Match notification conditions and run notification control actions |
| Screenshot or media projection results | Used only when you trigger screenshot-related actions |
| Remote action library URLs | Store action library addresses that you add manually |

## Sensitive Permissions

FlexKey requests or opens settings for sensitive permissions only when you enable related features:

- Accessibility service: key listening, accessibility-event conditions, global Back/Home/Recents, scrolling, copy/paste, and part of touch simulation.
- Notification access: notification conditions, notification text matching, and notification button actions.
- Overlay permission: floating button display and floating button gestures.
- Shizuku authorization: enhanced key/touch simulation, screenshots, force-stop, and other privileged actions.
- Query installed apps: selecting rule scopes, launching apps, and checking built-in action dependency status.
- Foreground service and notification permissions: maintaining required background capability and showing service state after you enable the related switch.
- Battery optimization exemption, auto-start, and vendor background permissions: improving stability for long-running listeners and background services.
- Modify system settings, Do Not Disturb access, camera/flashlight, phone call, and related permissions: running the system actions you choose.

Before requesting a permission, the app explains why it is needed and waits for your confirmation. You can revoke permissions at any time in Android system settings.

## Network Access

FlexKey uses network access mainly in these cases:

- Loading a remote action library URL that you add.
- Opening help documentation, feedback pages, or app market pages.
- Some distribution channels or build variants may enable crash feedback and process diagnostics as described by that channel. The default behavior documented here is not to upload local rules, scripts, or event content.

When you add a remote action library, make sure the source is trustworthy. The remote server may receive ordinary request information such as IP address, request time, User-Agent, and request path.

## Third-Party Services and External Links

Feedback pages, app markets, remote action libraries, and third-party apps opened through actions are controlled by their own providers. FlexKey cannot control how those third parties process data. Review their privacy policies after leaving the app or this web page.

## Data Sharing

FlexKey does not sell personal data. When running actions you configure, the app may pass necessary information to Android or target apps, such as opening a specific app page, sending an Intent, placing a phone call, clicking a notification button, or accessing a remote action library you added.

## Retention and Deletion

Local rules, actions, scripts, and settings remain until you delete them, clear app data, or uninstall the app. After you revoke Accessibility, Notification, Overlay, Shizuku, or related permissions, features that depend on those permissions stop using them.

## Children's Privacy

FlexKey is not directed to children. Minors should use the app only with guardian consent and in compliance with local law.

## Policy Updates

If app features, data handling, or permission uses change materially, we will update this document and revise the effective date at the top of the page.

## Contact

For privacy questions, contact the maintainers through [GitHub Issues](https://github.com/hfutxqd/ClickClick/issues).
