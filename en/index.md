---
title: FlexKey Documentation
description: Documentation for the Android automation and shortcut trigger app.
lang: en
nav_title: Overview
nav_order: 1
next_title: User Guide
next_url: /en/user-guide.html
lang_switch_url: /
---

# FlexKey Documentation

FlexKey is an Android automation and shortcut trigger app. It combines conditions and actions into rules: when a key, floating button, gesture, notification, or accessibility event matches a condition, FlexKey runs the selected action.

These docs describe the current app behavior, built-in features, custom actions, custom condition scripts, and JavaScript APIs.

## Docs

- [User Guide](/en/user-guide.html): services, permissions, rule creation, condition types, scopes, and common workflows.
- [Actions and Built-in Features](/en/actions.html): built-in action library, custom action format, action body syntax, and remote action JSON.
- [JavaScript Scripts and Condition API](/en/js-api.html): JS actions, JS conditions, event object structure, available APIs, and examples.

## Core Model

A rule has three parts:

- Condition: when to trigger, such as a key click, floating button swipe, notification, accessibility event match, or a JS script returning `true`.
- Scope: global, or only while selected apps are in the foreground.
- Action: what to run, such as Back, opening an app page, simulating a key, clicking a notification button, or running a JS script.

## Capabilities and Permissions

FlexKey relies on Android system services for automation. The app prompts for dependencies when required:

| Capability | Used for |
| --- | --- |
| Accessibility service | Key and key-combo conditions, accessibility event conditions, Back/Home/Recents, accessibility node actions, and part of touch simulation |
| Notification listener | Notification event conditions, notification JS conditions, notification control actions |
| Overlay permission | Floating button display and floating button conditions |
| Shizuku authorization | Enhanced key/touch simulation, screenshots, force-stopping apps |
| Modify system settings | Auto rotation, brightness, orientation, and related settings actions |

Key and touch simulation require either the Accessibility service or Shizuku authorization. Some vendor-specific permissions do not expose reliable public status APIs; the settings page provides shortcuts and asks you to confirm them manually.

## Typical Workflow

1. Open Settings > Services and Permissions, then enable the services you need.
2. Open Actions and install built-in actions, or create custom/JS actions.
3. Open Rules and create a rule. Choose exactly one condition type.
4. Set the scope, choose the action, and save.
5. Use the rule list to enable/disable rules, drag to reorder them, or open the menu to change the action or delete a rule.
