---
title: Actions and Built-in Features
description: Built-in action library, custom action format, action body syntax, and remote action JSON.
lang: en
nav_title: Actions and Built-in Features
nav_order: 3
prev_title: User Guide
prev_url: /en/user-guide.html
next_title: JavaScript Scripts and Condition API
next_url: /en/js-api.html
lang_switch_url: /actions.html
---

# Actions and Built-in Features

## What an Action Is

An action is what FlexKey runs after a rule is triggered. Each action is stored as a `DefinedFunction`; its core field is `body`.

```text
prefix:args
```

`prefix` selects the executor. `args` are passed to that executor.

## Built-in Action Library

The built-in action library is grouped by page. The Chinese action library comes from `app/src/main/res/raw-zh/*.json`.

### Common Actions

| Name | Description | body |
| --- | --- | --- |
| Alipay Payment | Opens the Alipay payment page | `url:alipays://platformapi/startapp?appId=20000056` |
| WeChat Scan | Opens WeChat Scan | `intent:activity://#Intent;component=com.tencent.mm/.ui.LauncherUI;B.LauncherUI.From.Scaner.Shortcut=true;end` |
| Camera | Opens the camera | `intent:action://android.media.action.STILL_IMAGE_CAMERA` |
| Toggle Auto Rotation | Toggles auto rotation | `settings:auto_rotation()` |
| Toggle Do Not Disturb | Cycles through interruption filters | `settings:do_not_disturb()` |
| Toggle Flashlight | Toggles the flashlight | `app:flash_light()` |
| Toggle Wi-Fi | Toggles Wi-Fi | `app:toggle_wifi()` |
| Screenshot | Takes and saves a screenshot | `app:screenshot()` |
| Show/Hide Floating Button | Toggles the floating button | `intent:service://#Intent;action=floating.toggle;component=xyz.imxqd.clickclick/.service.FloatingBallService;end` |
| Start Gesture Recognition | Opens gesture recognition | `intent:activity://#Intent;action=android.intent.action.MAIN;component=xyz.imxqd.clickclick/.ui.GestureDetectActivity;end` |
{: .action-table .action-table-desc-body }

### Global Controls

| Name | body | Requirement |
| --- | --- | --- |
| Back | `global:1` | Accessibility service |
| Home | `global:2` | Accessibility service |
| Recents | `global:3` | Accessibility service |
| Expand Notifications | `global:4` | Accessibility service |
| Quick Settings | `global:5` | Accessibility service |
| Power Menu | `global:6` | Accessibility service, Android 5.0+ |
| Split Screen | `global:7` | Accessibility service, Android 7.0+ |
| Scroll Forward | `action:4096` | Accessibility service |
| Scroll Backward | `action:8192` | Accessibility service |
| Copy Current Text | `action:16384` | Accessibility service |
| Cut Current Text | `action:65536` | Accessibility service |
| Paste Current Text | `action:32768` | Accessibility service |
| Previous HTML Element | `action:2048` | Accessibility service |
| Next HTML Element | `action:1024` | Accessibility service |
{: .action-table .action-table-body-dep }

### System Settings

| Name | body | Requirement |
| --- | --- | --- |
| Toggle Do Not Disturb | `settings:do_not_disturb()` | Notification policy access, Android 6.0+ |
| Toggle Auto Rotation | `settings:auto_rotation()` | Modify system settings |
| Enable Auto Rotation | `settings:auto_rotation(1)` | Modify system settings |
| Disable Auto Rotation | `settings:auto_rotation(0)` | Modify system settings |
| Rotate to 0 Degrees | `settings:rotation(0)` | Modify system settings |
| Rotate to 90 Degrees | `settings:rotation(90)` | Modify system settings |
| Rotate to 270 Degrees | `settings:rotation(270)` | Modify system settings |
| Rotate by 90 Degrees | `settings:rotate(90)` | Modify system settings |
| Rotate by 180 Degrees | `settings:rotate(180)` | Modify system settings |
{: .action-table .action-table-body-dep }

### App Actions

| Name | Description | body |
| --- | --- | --- |
| Alipay scan/payment/transit/health-code pages | Opens target Alipay pages | `url:alipays://...` |
| WeChat Scan | Opens WeChat Scan | `intent:activity://#Intent;component=com.tencent.mm/.ui.LauncherUI;...;end` |
| Mi Pay | Opens the Mi Pay shortcut page | `intent:activity://#Intent;action=com.miui.intent.action.DOUBLE_CLICK;...;end` |
| New Weibo Post | Opens Weibo compose | `url:sinaweibo://compose` |
| Dial 110 | Opens dialer | `url:tel:110` |
{: .action-table .action-table-desc-body }

These actions usually depend on whether the target app is installed.

### Media Actions

| Name | body |
| --- | --- |
| Next Track | `keyevent:87` |
| Previous Track | `keyevent:88` |
| Volume Up | `keyevent:24` |
| Volume Down | `keyevent:25` |
| Rewind | `keyevent:273` |
| Fast Forward | `keyevent:272` |
| Play/Pause | `keyevent:85` |
| Like in NetEase Cloud Music | `notification:com.netease.cloudmusic:4` |
| Like in NetEase Cloud Music (new) | `notification:com.netease.cloudmusic:@id/playNotificationStar` |
| Like in NetEase Cloud Music (built-in) | `app:cloud_music_like()` |
| Like in QQ Music | `intent:broadcast://#Intent;action=com.tencent.qqmusic.ACTION_SERVICE_FAVORATE_SONG.QQMusicPhone;end` |
{: .action-table .action-table-body }

### Fun Actions

| Name | body |
| --- | --- |
| Random Vibration | `ui:vibrate([500,200,500,200,500,200])` |
| Tone | `ui:tone(256:100,288:100,320:100,341:100,384:100,426:100,480:100)` |
| Twinkle Twinkle Example | `ui:tone(...)` |
| Full Twinkle Twinkle | `ui:tone(...)` |
{: .action-table .action-table-body }

## Custom Action Types

### Launch App

Choose an app while creating a new action. FlexKey stores the app launch `Intent`.

### Open Shortcut

Choose a launcher shortcut exposed by another app and save it as an action.

### Click Notification Control

Clicks a button or control in an existing notification. Requires the Notification listener.

### Simulate Key

Choose or enter an Android `KeyEvent` keyCode. Key simulation can use enhanced input; either Accessibility service or Shizuku authorization is enough.

```text
keyevent:24
keyevent:85
```

### Custom Action

Manually enter the action name, description, and body. Use this when you want direct access to the action body syntax below.

### JS Action

Open the code editor and write JavaScript. The saved body is:

```text
js:<JavaScript code>
```

See [JavaScript Scripts and Condition API](/en/js-api.html).

## Action Body Syntax

### `global:<actionId>`

Runs Android Accessibility global actions.

| actionId | Meaning |
| --- | --- |
| `1` | Back |
| `2` | Home |
| `3` | Recents |
| `4` | Expand notification shade |
| `5` | Quick settings |
| `6` | Power menu |
| `7` | Split screen |

### `action:<actionId>`

Runs an accessibility node action on the current focused input/control.

| actionId | Meaning |
| --- | --- |
| `4096` | Scroll forward |
| `8192` | Scroll backward |
| `16384` | Copy |
| `32768` | Paste |
| `65536` | Cut |
| `2048` | Previous HTML element |
| `1024` | Next HTML element |

### `keyevent:<keyCode>`

Simulates an Android key. The Simulate Key dialog can list and search key codes.

```text
keyevent:24
keyevent:25
keyevent:85
```

### `url:<uri>`

Opens a URI with `ACTION_VIEW`, including web URLs, app schemes, and phone links.

```text
url:https://example.com
url:alipays://platformapi/startapp?appId=20000056
url:tel:110
```

### `intent:<mode>://...`

Supported modes:

| Mode | Description |
| --- | --- |
| `intent:action://<action>` | Starts an Activity by action |
| `intent:activity://#Intent;...;end` | Starts an Activity from an Intent URI |
| `intent:broadcast://#Intent;...;end` | Sends a Broadcast |
| `intent:service://#Intent;...;end` | Starts a Service |

### `notification:<package>:<target>`

Clicks a button or control in a current notification from the specified app.

Supported targets:

| Format | Meaning |
| --- | --- |
| `<index>` | The `index`-th PendingIntent in the notification |
| `@action/<index>` | The `index`-th item in the notification action array |
| `@id/<idName>` | Finds a resource ID in the notification RemoteViews |
| `@id/<resPackage>:id/<idName>` | Uses an explicit resource package and ID |

### `settings:<method>(args)`

```text
settings:auto_rotation()
settings:auto_rotation(1)
settings:auto_rotation(0)
settings:rotation(90)
settings:rotate(180)
settings:brightness(120)
settings:brightness()
settings:do_not_disturb()
```

### `app:<method>(args)`

```text
app:cloud_music_like()
app:flash_light()
app:flash_light(1)
app:flash_light(0)
app:toggle_wifi()
app:toggle_input_mode()
app:screenshot()
app:force_stop(com.example.app)
```

### `ui:<method>(args)`

```text
ui:toast(hello)
ui:vibrate([500,200,500])
ui:tone(256:100,288:100)
ui:tap(100,200)
ui:swipe(100,500,900,500,300)
ui:gesture(100,500,300,700,500,500,600)
ui:show_icon(com.example.app,icon_name)
ui:remote_icon(com.netease.cloudmusic,playNotificationStar)
ui:action_icon(com.netease.cloudmusic,0)
```

Touch simulation requires either Accessibility service or Shizuku authorization. `tap`, `swipe`, and `gesture` require Android 7.0+.

### `js:<script>`

Runs a JavaScript action. The script does not need to return a value.

```text
js:toast('hello'); input.keyevent(85);
```

## Remote Action JSON

Built-in and remote action libraries use the same model:

```json
{
  "name": "Action name",
  "description": "Action description",
  "body": "keyevent:85",
  "author": "Author",
  "update_time": 1527414422000,
  "dependencies": [
    {
      "type": "installed_package",
      "value": "com.example.app:0",
      "message": "Target app must be installed"
    }
  ]
}
```

An action library can be either an array or `{"total": 1, "data": [ ... ]}`.

Dependency types:

| type | value | Meaning |
| --- | --- | --- |
| `installed_package` | `packageName:minVersionCode` | Checks target app installation and minimum version |
| `api_level` / `min_api_level` | API number | Checks Android API level |
| `ver_code` | App versionCode | Checks FlexKey version |
| `service` | `accessibility` | Requires Accessibility service |
| `service` | `notification` or `notification_listener` | Requires Notification listener |
| `service` | `shizuku` | Requires Shizuku |
| `service` | `overlay` or `floating_ball` | Requires overlay permission |
| `service` | `input_simulation` / `input` / `input_simulator` | Requires Accessibility service or Shizuku for input simulation |

Even without manually declared dependencies, FlexKey can infer some requirements from the action body. For example, `global:` requires Accessibility service, `notification:` requires Notification listener, and `keyevent:` requires input simulation.
