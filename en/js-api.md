---
title: JavaScript Scripts and Condition API
description: JS actions, JS conditions, event object structure, available APIs, and examples.
lang: en
nav_title: JavaScript Scripts and Condition API
nav_order: 4
prev_title: Actions and Built-in Features
prev_url: /en/actions.html
lang_switch_url: /js-api.html
---

# JavaScript Scripts and Condition API

FlexKey includes a QuickJS runtime. JavaScript is used in two places:

- JS actions: scripts run after a rule is triggered.
- JS conditions: scripts receive an event object and trigger the rule only when they return `true`.

The code editor supports API completion. When editing JS conditions, it also provides completion for the `event` / `input` event object fields.

## JS Actions

JS actions are saved as:

```text
js:<JavaScript code>
```

The script does not need to return a value. Exceptions are caught and logged. If debug information is enabled, FlexKey shows an error message.

Example:

```js
toast('Ready to play/pause');
input.keyevent(85);
```

```js
if (!shizuku.hasPermission()) {
    toast('Shizuku permission is required');
    exit();
}

shizuku.screenshot();
```

## JS Conditions

A JS condition is a function body, not a complete program entry. FlexKey wraps it like this:

```js
(function(){
  const event = { ... };
  const input = event;
  return (function(event, input){
    // Your script
  })(event, input) === true;
})();
```

Therefore:

- `event` and `input` refer to the same event object.
- In JS condition scripts, use `cc.input.keyevent()`, `cc.input.tap()`, and `cc.input.swipe()` if you need input simulation, because `input` is already the event alias.
- Only an explicit `return true;` triggers the action.
- Returning `1`, a non-empty string, or an object does not trigger the action.
- Script errors are caught and treated as condition not met. They should not crash the service.

Example: trigger when Volume Up is released.

```js
if (event.source !== 'key') {
    return false;
}

return event.action === 'up' && event.keyCode === 24;
```

Example: trigger when a notification contains a verification code.

```js
if (event.source !== 'notification') {
    return false;
}

return event.text.indexOf('verification code') >= 0;
```

Example: trigger only on a window change in a specific app.

```js
if (event.source !== 'accessibility') {
    return false;
}

return event.packageName === 'com.example.app'
    && event.eventTypeCode === 32
    && event.text.indexOf('Done') >= 0;
```

Notification and accessibility JS conditions have a 1-second per-rule trigger interval.

## Global Functions

| API | Returns | Description |
| --- | --- | --- |
| `requiresApi(apiLevel)` | `Boolean` | Requires a minimum Android API level; throws when not met |
| `requiresJsCoreVersion(version)` | `Boolean` | Requires a minimum JS core version |
| `print(message)` | `void` | Prints a log message |
| `toast(message)` | `void` | Shows a Toast |
| `waitForActivity(activityName, timeoutMs = 5000)` | `Boolean` | Waits until the current Activity name contains the given string |
| `waitForPackage(packageName, timeoutMs = 5000)` | `Boolean` | Waits until the foreground package equals the given package |
| `exit()` | `void` | Stops script execution |

## `console` and `log`

`console` writes to JS logs:

```js
console.log('message');
console.info('message');
console.debug('message');
console.warn('message');
console.error('message');
```

`log` writes to app logs:

```js
log.i('info');
log.d('debug');
log.v('verbose');
log.w('warning');
log.e('error');
log.wtf('critical');
```

## `device`

| Property | Type | Description |
| --- | --- | --- |
| `device.width` | `Int` | Screen width |
| `device.height` | `Int` | Screen height |
| `device.brand` | `String` | Brand |
| `device.model` | `String` | Model |
| `device.sdkInt` | `Int` | Android SDK version |
| `device.board` | `String` | Board |
| `device.device` | `String` | Device code name |
| `device.product` | `String` | Product name |
| `device.bootloader` | `String` | Bootloader |
| `device.hardware` | `String` | Hardware name |
| `device.fingerprint` | `String` | System fingerprint |
| `device.incremental` | `String` | Incremental version |
| `device.release` | `String` | Android release |

## `input`

| API | Returns | Description |
| --- | --- | --- |
| `input.keyevent(keyCode)` | `Boolean` | Simulates a key |
| `input.tap(x, y)` | `Boolean` | Taps a coordinate |
| `input.swipe(x1, y1, x2, y2, durationMs = 300)` | `Boolean` | Swipes between coordinates |
| `click(x, y)` | `Boolean` | Alias of `input.tap` |

Input simulation requires either Accessibility service or Shizuku authorization. `tap` and `swipe` try Minitouch/Shizuku first, then fall back to accessibility gestures.

In JS condition scripts, `input` is the event alias. Use `cc.input` when you need input simulation from a condition script.

## `app`

| API | Returns | Description |
| --- | --- | --- |
| `app.launch(pkg)` | `Boolean` | Launches an app |
| `app.openAppSetting(pkg)` | `Boolean` | Opens the app details page |
| `app.openFile(path)` | `Boolean` | Opens a file |
| `app.openUrl(url)` | `Boolean` | Opens a URL |
| `app.getAppName(pkg)` | `String` | Gets app name |
| `app.uninstall(pkg)` | `Boolean` | Opens app uninstall flow |

## `func`

`func` executes action bodies from JavaScript.

| API | Returns | Description |
| --- | --- | --- |
| `func.exec(data, name)` | `Boolean` | Executes a full action string |
| `func.run(prefix, args, name)` | `Boolean` | Executes an action by prefix and args |
| `func.global(args)` | `Boolean` | Executes `global:` |
| `func.app(args)` | `Boolean` | Executes `app:` |
| `func.ui(args)` | `Boolean` | Executes `ui:` |
| `func.url(args)` | `Boolean` | Executes `url:` |
| `func.keyevent(args)` | `Boolean` | Executes `keyevent:` |
| `func.intent(args)` | `Boolean` | Executes `intent:` |
| `func.notification(args)` | `Boolean` | Executes `notification:` |
| `func.settings(args)` | `Boolean` | Executes `settings:` |
| `func.action(args)` | `Boolean` | Executes `action:` |
| `func.lastError()` | `String` | Last execution error |

Example:

```js
if (!func.exec('keyevent:85', 'Play/Pause')) {
    log.e(func.lastError());
}
```

## `shizuku`

| API | Returns | Description |
| --- | --- | --- |
| `shizuku.isAvailable()` | `Boolean` | Whether Shizuku is available |
| `shizuku.hasPermission()` | `Boolean` | Whether permission is granted |
| `shizuku.requestPermission()` | `Boolean` | Requests Shizuku authorization |
| `shizuku.uid()` | `Int` | Shizuku UID |
| `shizuku.status()` | `String` | Status string |
| `shizuku.exec(command)` | `String` | Runs a shell command; returns `null` on failure |
| `shizuku.screenshot()` | `Boolean` | Takes and saves a screenshot |

## `cc` Namespace

The runtime also provides `cc` as a module collection:

```js
cc.app.launch('com.example.app');
cc.input.keyevent(85);
cc.shizuku.status();
```

It is equivalent to using `app`, `input`, `shizuku`, and other module globals directly.

## Condition Event Object

All events include:

| Field | Type | Description |
| --- | --- | --- |
| `event.source` | `String` | `key` / `floatingBall` / `accessibility` / `notification` |
| `event.sourceType` | `String` | `Key` / `FloatingBall` / `Accessibility` / `Notification` |
| `event.packageName` | `String` | Package name for the event |
| `event.currentPackageName` | `String` | Current foreground package |
| `event.time` | `Long` | Processing timestamp in milliseconds |

### Key Event

```js
{
  source: 'key',
  sourceType: 'Key',
  packageName: string,
  currentPackageName: string,
  time: number,
  action: 'down' | 'up' | 'multiple',
  actionCode: number,
  keyCode: number,
  keyName: string,
  repeatCount: number,
  eventTime: number,
  downTime: number,
  metaState: number,
  deviceId: number,
  deviceName: string,
  deviceDescriptor: string
}
```

### Floating Button Event

```js
{
  source: 'floatingBall',
  sourceType: 'FloatingBall',
  packageName: string,
  currentPackageName: string,
  time: number,
  eventType: 'SingleTap' | 'DoubleTap' | 'LongPress' |
      'FlingLeft' | 'FlingUp' | 'FlingRight' | 'FlingDown',
  eventName: string
}
```

### Accessibility Event

```js
{
  source: 'accessibility',
  sourceType: 'Accessibility',
  packageName: string,
  currentPackageName: string,
  time: number,
  eventType: string,
  eventTypeCode: number,
  className: string,
  contentDescription: string,
  viewId: string,
  text: string,
  texts: string[],
  nodeClassName: string,
  nodeText: string,
  nodeContentDescription: string,
  nodeViewId: string
}
```

Common `eventTypeCode` values:

| Value | Meaning |
| --- | --- |
| `32` | Window changed |
| `1` | View clicked |
| `16` | Text changed |
| `8` | Focus changed |

`text` is an aggregated text field and is usually the easiest field for keyword matching.

### Notification Event

```js
{
  source: 'notification',
  sourceType: 'Notification',
  packageName: string,
  currentPackageName: string,
  time: number,
  id: number,
  tag: string,
  key: string,
  postTime: number,
  tickerText: string,
  title: string,
  content: string,
  bigText: string,
  subText: string,
  text: string
}
```

`text` aggregates title, content, big text, and related fields.

## API Requirement Inference

When a JS action is saved, FlexKey infers requirements from script content:

- `shizuku.` or `shizuku[` requires Shizuku.
- `notification.` or `func.notification` requires Notification listener.
- `func.global` or `func.action` requires Accessibility service.
- `func.keyevent`, `input.keyevent`, `input.tap`, or `input.swipe` requires input simulation, which means Accessibility service or Shizuku.
- `input.tap` and `input.swipe` also require Android 7.0+.

If a script calls APIs indirectly through string concatenation, static inference may miss it. Document the dependency in the action description when needed.
