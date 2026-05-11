---
title: User Guide
description: Services, permissions, rule creation, condition types, scopes, and common workflows.
lang: en
nav_title: User Guide
nav_order: 2
prev_title: Overview
prev_url: /en/
next_title: Actions and Built-in Features
next_url: /en/actions.html
lang_switch_url: /user-guide.html
---

# User Guide

## What FlexKey Does

FlexKey connects system events to automation actions through rules. It is useful when you want to:

- Map volume keys, Bluetooth buttons, or keyboard keys to Back, Home, media controls, or app pages.
- Run quick actions from floating button gestures.
- Watch notifications or UI events and trigger actions when keywords match.
- Use JavaScript scripts for more precise conditions and actions.
- Use Shizuku for enhanced key/touch simulation, screenshots, force-stop, and other privileged actions.

## Initial Setup

Open Settings > Services and Permissions, then enable what you need:

| Setting | Required when |
| --- | --- |
| Accessibility service | Using key conditions, key-combo conditions, accessibility event conditions, global controls, accessibility node actions, or part of input simulation |
| Notification listener | Using notification event conditions, notification JS conditions, or notification control actions |
| Floating button | Using floating button conditions |
| Shizuku | Using enhanced key/touch simulation, Shizuku screenshots, force-stop, or other privileged actions |
| Auto-start / Associated start / Background pop-up | Improving service stability on vendor Android builds |
| Modify system settings | Using auto rotation, brightness, orientation, and settings actions |
| Ignore battery optimization | Reducing the chance that background services are killed |

Before requesting sensitive permissions, the app explains why the permission is needed and waits for explicit user consent before opening the system settings page.

## Rule Model

A rule is made of condition + scope + action.

### Conditions

When creating a rule, choose exactly one condition:

- Key: listens to hardware keys, Bluetooth buttons, keyboard keys, and similar input events. Supports single click, long click, double click, and triple click.
- Key combo: triggers when multiple keys are pressed as a group.
- Virtual Home: supports double click and triple click on some devices.
- Floating button: supports single tap, double tap, long press, and fling left/up/right/down.
- Gesture recognition: triggers after drawing a configured gesture in the gesture recognition screen.
- Event engine: listens to accessibility events or notification events and matches simple fields such as text, view ID, and event type.
- JS script: passes key, floating button, notification, or accessibility events to a script. The rule triggers only when the script returns `true`.

### Scope

Scope has two modes:

- Global: can trigger while any app is in the foreground.
- Specific apps: triggers only when the current foreground package matches one of the selected apps.

Specific app matching uses the current foreground package name. Rules store package names and display names, and execution checks package names.

### Actions

Actions can be selected from the action library or created directly while creating a rule. Creating a new action supports:

- Launching an app.
- Opening a launcher shortcut.
- Clicking a notification control.
- Simulating a key.
- Custom actions.
- JS actions.

After a new action is created, it is filled into the current rule automatically.

## Create a Rule

1. Open the Rules page and tap Create.
2. Choose one condition type.
3. Configure the condition, such as key type, event source, matching text, or JS script.
4. Choose the scope: global or selected apps.
5. Choose an action, or tap Create New Action.
6. Save the rule.

## Manage Rules

The rule list supports:

- Switch: enable or disable a rule.
- Tap: open the rule context menu.
- Long press: drag to reorder rules.
- Change action: return to the rule editor and change only the action.
- Delete: confirmation is required before deletion.

## Condition Details

### Key Conditions

Key conditions require the Accessibility service. During setup, press the target key and FlexKey records:

- keyCode.
- keyName.
- Input device ID, name, and descriptor.
- Whether to ignore device information.
- Trigger type: single click, long click, double click, or triple click.

If device information is ignored, any input with the same keyCode can trigger the rule. Otherwise the same key from different devices is treated separately.

### Floating Button Conditions

Floating button conditions require overlay permission. Event types:

- `SingleTap`: single tap.
- `DoubleTap`: double tap.
- `LongPress`: long press.
- `FlingLeft`: fling left.
- `FlingUp`: fling up.
- `FlingRight`: fling right.
- `FlingDown`: fling down.

### Event Engine

The event engine is for simple automation without writing code.

Accessibility events can match:

- Event type: all events, window changes, view clicked, text changed, focus changed.
- Text: aggregated title/content/node text/class text, case-insensitive.
- View ID: for example `com.example:id/button`.

Notification events can match:

- Source app.
- Aggregated notification title, content, big text, subtitle, and related fields.

Event engine rules have a 1-second per-rule trigger interval to avoid repeated triggers when notifications or UI content refresh frequently.

### JS Conditions

JS conditions are for complex checks. The script receives `event` and `input`; in condition scripts they refer to the same event object.

Only an explicit `return true;` triggers the action. Other truthy values do not trigger.

Example:

```js
if (event.source !== 'notification') {
    return false;
}

return event.packageName === 'com.example.chat'
    && event.text.indexOf('verification code') >= 0;
```

See [JavaScript Scripts and Condition API](/en/js-api.html).

## Action Feedback

In Settings > Other Settings, you can configure:

- Vibrate after successful execution.
- Show the action name after successful execution.

When an action fails, the app shows an error message if debug information is enabled.

## Stability Tips

- For long-running key listening, floating button, or notification listening, enable auto-start, associated start, background pop-up, and battery optimization exemptions when your device vendor requires them.
- Vendor permission pages vary widely. FlexKey tries to open the matching page; when status cannot be detected, confirm it manually in system settings.
- JS condition errors and internal service errors are caught and logged. They should not crash the Accessibility service or Notification listener service.
