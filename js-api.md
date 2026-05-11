---
title: JS 脚本与条件 API
description: JS 动作、JS 条件、事件对象结构、可用 API 和示例。
nav_title: JS 脚本与条件 API
nav_order: 4
prev_title: 动作与内置功能
prev_url: /actions.html
---

# JS 脚本与条件 API

灵动键内置 QuickJS 运行时。JS 可以用于两类场景：

- JS 动作：规则触发后执行脚本。
- JS 条件：脚本接收事件对象，返回 `true` 时触发规则动作。

代码编辑器支持 API 补全。编写 JS 条件时，编辑器还会提供 `event` / `input` 事件对象字段补全。

## JS 动作

JS 动作保存为：

```text
js:<JavaScript code>
```

脚本不需要返回值。执行异常会被捕获，错误会记录到日志；开启调试信息时会显示错误提示。

示例：

```js
toast('准备播放/暂停');
input.keyevent(85);
```

```js
if (!shizuku.hasPermission()) {
    toast('需要 Shizuku 授权');
    exit();
}

shizuku.screenshot();
```

## JS 条件

JS 条件不是完整程序入口，而是一个函数体。运行时会包装成：

```js
(function(){
  const event = { ... };
  const input = event;
  return (function(event, input){
    // 你的脚本
  })(event, input) === true;
})();
```

因此：

- `event` 和 `input` 是同一个对象。
- 在 JS 条件中如果需要调用输入模拟 API，请使用 `cc.input.keyevent()`、`cc.input.tap()`、`cc.input.swipe()`，避免和事件别名 `input` 混淆。
- 只有明确 `return true;` 才会触发动作。
- 返回 `1`、非空字符串、对象等 truthy 值不会触发。
- 脚本异常会被捕获并视为条件不满足，不会让服务崩溃。

示例：音量键抬起时触发。

```js
if (event.source !== 'key') {
    return false;
}

return event.action === 'up' && event.keyCode === 24;
```

示例：通知包含验证码时触发。

```js
if (event.source !== 'notification') {
    return false;
}

return event.text.indexOf('验证码') >= 0;
```

示例：只在某个应用的窗口变化中触发。

```js
if (event.source !== 'accessibility') {
    return false;
}

return event.packageName === 'com.example.app'
    && event.eventTypeCode === 32
    && event.text.indexOf('完成') >= 0;
```

通知和无障碍类 JS 条件对同一规则有 1 秒触发间隔，避免重复触发。

## 全局函数

| API | 返回值 | 说明 |
| --- | --- | --- |
| `requiresApi(apiLevel)` | `Boolean` | 要求最低 Android API 级别，不满足会抛错 |
| `requiresJsCoreVersion(version)` | `Boolean` | 要求最低 JS 核心版本 |
| `print(message)` | `void` | 输出日志 |
| `toast(message)` | `void` | 显示 Toast |
| `waitForActivity(activityName, timeoutMs = 5000)` | `Boolean` | 等待当前 Activity 名称包含指定字符串 |
| `waitForPackage(packageName, timeoutMs = 5000)` | `Boolean` | 等待当前前台包名等于指定包名 |
| `exit()` | `void` | 终止脚本 |

## `console` 与 `log`

`console` 输出到 JS 日志：

```js
console.log('message');
console.info('message');
console.debug('message');
console.warn('message');
console.error('message');
```

`log` 输出到 App 日志：

```js
log.i('info');
log.d('debug');
log.v('verbose');
log.w('warning');
log.e('error');
log.wtf('critical');
```

## `device`

设备信息属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `device.width` | `Int` | 屏幕宽度 |
| `device.height` | `Int` | 屏幕高度 |
| `device.brand` | `String` | 品牌 |
| `device.model` | `String` | 型号 |
| `device.sdkInt` | `Int` | Android SDK 版本 |
| `device.board` | `String` | 主板 |
| `device.device` | `String` | 设备代号 |
| `device.product` | `String` | 产品名 |
| `device.bootloader` | `String` | Bootloader |
| `device.hardware` | `String` | 硬件名 |
| `device.fingerprint` | `String` | 系统指纹 |
| `device.incremental` | `String` | 系统增量版本 |
| `device.release` | `String` | Android 版本 |

## `input`

输入模拟 API：

| API | 返回值 | 说明 |
| --- | --- | --- |
| `input.keyevent(keyCode)` | `Boolean` | 模拟按键 |
| `input.tap(x, y)` | `Boolean` | 点击坐标 |
| `input.swipe(x1, y1, x2, y2, durationMs = 300)` | `Boolean` | 滑动 |
| `click(x, y)` | `Boolean` | `input.tap` 的别名 |

输入模拟满足“无障碍服务或 Shizuku 授权”其中之一即可。`tap` 和 `swipe` 会优先使用 Minitouch/Shizuku，失败后回退无障碍手势。

在 JS 条件脚本里，`input` 是事件对象别名；如果条件脚本中确实需要调用输入模拟，请改用 `cc.input`。

## `app`

| API | 返回值 | 说明 |
| --- | --- | --- |
| `app.launch(pkg)` | `Boolean` | 启动应用 |
| `app.openAppSetting(pkg)` | `Boolean` | 打开应用详情页 |
| `app.openFile(path)` | `Boolean` | 打开文件 |
| `app.openUrl(url)` | `Boolean` | 打开 URL |
| `app.getAppName(pkg)` | `String` | 获取应用名 |
| `app.uninstall(pkg)` | `Boolean` | 跳转卸载应用 |

## `func`

`func` 可从 JS 中执行动作 body。

| API | 返回值 | 说明 |
| --- | --- | --- |
| `func.exec(data, name)` | `Boolean` | 执行完整动作字符串 |
| `func.run(prefix, args, name)` | `Boolean` | 按 prefix 和 args 执行动作 |
| `func.global(args)` | `Boolean` | 执行 `global:` |
| `func.app(args)` | `Boolean` | 执行 `app:` |
| `func.ui(args)` | `Boolean` | 执行 `ui:` |
| `func.url(args)` | `Boolean` | 执行 `url:` |
| `func.keyevent(args)` | `Boolean` | 执行 `keyevent:` |
| `func.intent(args)` | `Boolean` | 执行 `intent:` |
| `func.notification(args)` | `Boolean` | 执行 `notification:` |
| `func.settings(args)` | `Boolean` | 执行 `settings:` |
| `func.action(args)` | `Boolean` | 执行 `action:` |
| `func.lastError()` | `String` | 最近一次执行错误 |

示例：

```js
if (!func.exec('keyevent:85', '播放/暂停')) {
    log.e(func.lastError());
}
```

## `shizuku`

| API | 返回值 | 说明 |
| --- | --- | --- |
| `shizuku.isAvailable()` | `Boolean` | Shizuku 服务是否可用 |
| `shizuku.hasPermission()` | `Boolean` | 是否已授权 |
| `shizuku.requestPermission()` | `Boolean` | 请求授权 |
| `shizuku.uid()` | `Int` | Shizuku UID |
| `shizuku.status()` | `String` | 状态字符串 |
| `shizuku.exec(command)` | `String` | 执行 shell 命令，失败返回 `null` |
| `shizuku.screenshot()` | `Boolean` | 截图并保存到相册 |

示例：

```js
if (shizuku.hasPermission()) {
    const result = shizuku.exec('settings get system screen_brightness');
    log.i(result);
}
```

## `cc` 命名空间

运行时还提供 `cc` 对象作为模块集合：

```js
cc.app.launch('com.example.app');
cc.input.keyevent(85);
cc.shizuku.status();
```

等价于直接使用 `app`、`input`、`shizuku` 等对象。

## 条件事件对象

所有事件都有这些基础字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `event.source` | `String` | `key` / `floatingBall` / `accessibility` / `notification` |
| `event.sourceType` | `String` | `Key` / `FloatingBall` / `Accessibility` / `Notification` |
| `event.packageName` | `String` | 事件所属应用包名 |
| `event.currentPackageName` | `String` | 当前前台应用包名 |
| `event.time` | `Long` | 事件处理时间戳，毫秒 |

### 按键事件

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

常用字段：

- `keyCode`：Android keyCode。
- `keyName`：例如 `KEYCODE_VOLUME_UP`。
- `action`：`down`、`up` 或 `multiple`。
- `deviceDescriptor`：区分输入设备。

### 悬浮球事件

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

### 无障碍事件

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

常见 `eventTypeCode`：

| 值 | 含义 |
| --- | --- |
| `32` | 窗口变化 |
| `1` | 控件点击 |
| `16` | 文本变化 |
| `8` | 焦点变化 |

`text` 是聚合文本，通常最适合做关键词匹配。

### 通知事件

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

`text` 会聚合标题、正文、展开正文等内容，适合用 `indexOf` 做关键词判断。

## API 权限推导

JS 动作保存后，App 会根据脚本内容推导依赖：

- 包含 `shizuku.` 或 `shizuku[`：需要 Shizuku。
- 包含 `notification.` 或 `func.notification`：需要通知服务。
- 包含 `func.global` 或 `func.action`：需要无障碍服务。
- 包含 `func.keyevent`、`input.keyevent`、`input.tap`、`input.swipe`：需要输入模拟能力，即无障碍服务或 Shizuku 授权。
- 包含 `input.tap`、`input.swipe`：还需要 Android 7.0+。

如果脚本通过字符串拼接间接调用这些 API，静态推导可能无法识别，建议在动作说明中写清依赖。
