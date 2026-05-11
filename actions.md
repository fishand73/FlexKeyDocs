# 动作与内置功能

## 动作是什么

动作是灵动键规则触发后执行的功能。每个动作都保存为一条 `DefinedFunction`，核心字段是 `body`。`body` 的格式为：

```text
prefix:args
```

`prefix` 决定使用哪类执行器，`args` 是执行器参数。

## 内置动作库

内置动作库按页面分组。中文内置动作来自 `app/src/main/res/raw-zh/*.json`。

### 常用动作

| 名称 | 说明 | body |
| --- | --- | --- |
| 支付宝付款 | 打开支付宝付款界面 | `url:alipays://platformapi/startapp?appId=20000056` |
| 微信扫一扫 | 打开微信扫一扫 | `intent:activity://#Intent;component=com.tencent.mm/.ui.LauncherUI;B.LauncherUI.From.Scaner.Shortcut=true;end` |
| 打开相机 | 打开相机 | `intent:action://android.media.action.STILL_IMAGE_CAMERA` |
| 开启/关闭自动旋转 | 切换自动旋转 | `settings:auto_rotation()` |
| 切换勿扰模式 | 循环切换多种勿扰模式 | `settings:do_not_disturb()` |
| 开关手电筒 | 切换手电筒 | `app:flash_light()` |
| 开关 Wifi | 切换 Wifi | `app:toggle_wifi()` |
| 截取当前屏幕 | 截图并保存 | `app:screenshot()` |
| 隐藏/显示悬浮球 | 切换悬浮球显示 | `intent:service://#Intent;action=floating.toggle;component=xyz.imxqd.clickclick/.service.FloatingBallService;end` |
| 开始手势识别 | 打开手势识别界面 | `intent:activity://#Intent;action=android.intent.action.MAIN;component=xyz.imxqd.clickclick/.ui.GestureDetectActivity;end` |

### 全局控制

| 名称 | body | 依赖 |
| --- | --- | --- |
| 返回键 | `global:1` | 无障碍服务 |
| HOME 键 | `global:2` | 无障碍服务 |
| 多任务键 | `global:3` | 无障碍服务 |
| 展开通知栏 | `global:4` | 无障碍服务 |
| 快速设置 | `global:5` | 无障碍服务 |
| 电源菜单 | `global:6` | 无障碍服务，Android 5.0+ |
| 分屏模式 | `global:7` | 无障碍服务，Android 7.0+ |
| 向前滚动 | `action:4096` | 无障碍服务 |
| 向后滚动 | `action:8192` | 无障碍服务 |
| 复制当前文本 | `action:16384` | 无障碍服务 |
| 剪切当前文本 | `action:65536` | 无障碍服务 |
| 粘贴当前文本 | `action:32768` | 无障碍服务 |
| 上一个标签 | `action:2048` | 无障碍服务 |
| 下一个标签 | `action:1024` | 无障碍服务 |

### 系统设置

| 名称 | body | 依赖 |
| --- | --- | --- |
| 切换勿扰模式 | `settings:do_not_disturb()` | 通知政策权限，Android 6.0+ |
| 开启/关闭自动旋转 | `settings:auto_rotation()` | 修改系统设置 |
| 开启自动旋转 | `settings:auto_rotation(1)` | 修改系统设置 |
| 关闭自动旋转 | `settings:auto_rotation(0)` | 修改系统设置 |
| 旋转至 0 度 | `settings:rotation(0)` | 修改系统设置 |
| 旋转至 90 度 | `settings:rotation(90)` | 修改系统设置 |
| 旋转至 270 度 | `settings:rotation(270)` | 修改系统设置 |
| 旋转 90 度 | `settings:rotate(90)` | 修改系统设置 |
| 旋转 180 度 | `settings:rotate(180)` | 修改系统设置 |

### 应用动作

| 名称 | 说明 | body |
| --- | --- | --- |
| 支付宝扫码/付款/乘车码/健康码 | 打开支付宝指定页面 | `url:alipays://...` |
| 微信扫一扫 | 打开微信扫一扫 | `intent:activity://#Intent;component=com.tencent.mm/.ui.LauncherUI;...;end` |
| Mi Pay | 打开 Mi Pay 快捷界面 | `intent:activity://#Intent;action=com.miui.intent.action.DOUBLE_CLICK;...;end` |
| 发新微博 | 打开微博发布页 | `url:sinaweibo://compose` |
| 拨打 110 | 打开拨号 | `url:tel:110` |

这些动作通常依赖目标应用是否安装。

### 媒体动作

| 名称 | body |
| --- | --- |
| 下一曲 | `keyevent:87` |
| 上一曲 | `keyevent:88` |
| 音量+ | `keyevent:24` |
| 音量- | `keyevent:25` |
| 快退 | `keyevent:273` |
| 快进 | `keyevent:272` |
| 播放/暂停 | `keyevent:85` |
| 网易云喜爱 | `notification:com.netease.cloudmusic:4` |
| 网易云喜爱(新) | `notification:com.netease.cloudmusic:@id/playNotificationStar` |
| 网易云音乐喜爱（内置） | `app:cloud_music_like()` |
| QQ 音乐喜爱 | `intent:broadcast://#Intent;action=com.tencent.qqmusic.ACTION_SERVICE_FAVORATE_SONG.QQMusicPhone;end` |

### 趣味动作

| 名称 | body |
| --- | --- |
| 乱乱震动 | `ui:vibrate([500,200,500,200,500,200])` |
| 音调 | `ui:tone(256:100,288:100,320:100,341:100,384:100,426:100,480:100)` |
| 小星星示例 | `ui:tone(...)` |
| 小星星完整版 | `ui:tone(...)` |

## 自定义动作类型

### 打开应用

在创建新动作中选择应用，App 会保存目标应用的启动 `Intent`。

### 打开快捷方式

选择其他应用提供的 launcher shortcut，保存为动作。

### 模拟通知控件点击

用于点击通知上的按钮或控件。依赖通知服务。

### 模拟按键

选择或输入 Android `KeyEvent` 的 keyCode。按键模拟会优先走增强输入通道，满足“无障碍服务或 Shizuku 授权”即可。

示例：

```text
keyevent:24
keyevent:85
```

### 自定义动作

手动填写动作名称、说明和 body。适合直接调用下面的动作语法。

### JS 动作

打开代码编辑器编写 JavaScript，保存后 body 为：

```text
js:<JavaScript code>
```

详见 [JS 脚本与条件 API](js-api.md)。

## 动作 body 语法

### `global:<actionId>`

调用 Android 无障碍全局动作。常用值：

| actionId | 含义 |
| --- | --- |
| `1` | 返回 |
| `2` | 主页 |
| `3` | 最近任务 |
| `4` | 展开通知栏 |
| `5` | 快速设置 |
| `6` | 电源菜单 |
| `7` | 分屏 |

示例：

```text
global:1
```

### `action:<actionId>`

对当前焦点输入控件执行无障碍节点动作。内置动作使用这些值：

| actionId | 含义 |
| --- | --- |
| `4096` | 向前滚动 |
| `8192` | 向后滚动 |
| `16384` | 复制 |
| `32768` | 粘贴 |
| `65536` | 剪切 |
| `2048` | 上一个标签 |
| `1024` | 下一个标签 |

示例：

```text
action:32768
```

### `keyevent:<keyCode>`

模拟 Android 按键。keyCode 可在“模拟按键”弹窗中搜索选择。

```text
keyevent:24
keyevent:25
keyevent:85
```

### `url:<uri>`

用 `ACTION_VIEW` 打开 URI，支持普通 URL、scheme、电话等。

```text
url:https://example.com
url:alipays://platformapi/startapp?appId=20000056
url:tel:110
```

### `intent:<mode>://...`

支持四种模式：

| 模式 | 说明 |
| --- | --- |
| `intent:action://<action>` | 按 action 启动 Activity |
| `intent:activity://#Intent;...;end` | 启动 Activity Intent URI |
| `intent:broadcast://#Intent;...;end` | 发送 Broadcast |
| `intent:service://#Intent;...;end` | 启动 Service |

示例：

```text
intent:action://android.media.action.STILL_IMAGE_CAMERA
intent:activity://#Intent;component=com.tencent.mm/.ui.LauncherUI;end
intent:broadcast://#Intent;action=com.example.ACTION;end
intent:service://#Intent;action=floating.toggle;component=xyz.imxqd.clickclick/.service.FloatingBallService;end
```

### `notification:<package>:<target>`

点击指定应用当前通知中的按钮或控件。

支持的 target：

| 格式 | 含义 |
| --- | --- |
| `<index>` | 通知中第 `index` 个 PendingIntent |
| `@action/<index>` | 通知 action 数组中的第 `index` 个按钮 |
| `@id/<idName>` | 在通知 RemoteViews 中查找目标包的资源 ID |
| `@id/<resPackage>:id/<idName>` | 指定资源包名和资源 ID |

示例：

```text
notification:com.netease.cloudmusic:4
notification:com.netease.cloudmusic:@id/playNotificationStar
notification:com.example.app:@action/0
```

### `settings:<method>(args)`

系统设置动作：

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

说明：

- `auto_rotation()`：切换自动旋转。
- `auto_rotation(1|0)`：开启或关闭自动旋转。
- `rotation(0|90|180|270)`：设置固定方向。
- `rotate(90|180|270)`：在当前方向基础上旋转。
- `brightness(value)`：设置亮度。
- `brightness()`：切换为自动亮度。
- `do_not_disturb()`：循环切换勿扰模式。

### `app:<method>(args)`

App 内置动作：

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

说明：

- `cloud_music_like()`：网易云音乐喜欢/取消喜欢当前歌曲。
- `flash_light()`：切换手电筒；`1` 开启，`0` 关闭。
- `toggle_wifi()`：切换 Wi-Fi。
- `toggle_input_mode()`：切换输入模式。
- `screenshot()`：截图并保存，优先使用 Shizuku，失败时回退系统截图。
- `force_stop(packageName)`：强制停止应用，优先 root，其次 Shizuku；不可用时打开应用详情页。

### `ui:<method>(args)`

UI 与输入辅助动作：

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

说明：

- `toast(text)`：显示提示。
- `vibrate([durations])`：按毫秒数组震动。
- `tone(freq:duration,...)`：播放指定频率和时长的音调，`0` 表示短暂停顿。
- `tap(x,y)`：点击坐标。
- `swipe(x1,y1,x2,y2,durationMs)`：滑动。
- `gesture(x1,y1,x2,y2,...,durationMs)`：按点序列生成手势。
- `show_icon`、`remote_icon`、`action_icon`：显示应用资源、通知控件或通知 action 图标。

触控模拟满足“无障碍服务或 Shizuku 授权”其中之一即可；`tap`、`swipe`、`gesture` 仍要求 Android 7.0+。

### `js:<script>`

执行 JavaScript 动作。脚本不需要返回值。

```text
js:toast('hello'); input.keyevent(85);
```

## 远程动作 JSON

内置动作和远程动作库使用相同模型。单个动作结构：

```json
{
  "name": "动作名称",
  "description": "动作说明",
  "body": "keyevent:85",
  "author": "作者",
  "update_time": 1527414422000,
  "dependencies": [
    {
      "type": "installed_package",
      "value": "com.example.app:0",
      "message": "需要安装目标应用"
    }
  ]
}
```

动作库可以是：

- 动作数组。
- `{"total": 1, "data": [ ... ]}`。

依赖类型：

| type | value | 说明 |
| --- | --- | --- |
| `installed_package` | `packageName:minVersionCode` | 检查目标应用是否安装且版本足够 |
| `api_level` / `min_api_level` | API 数字 | 检查 Android API 级别 |
| `ver_code` | App versionCode | 检查灵动键版本 |
| `service` | `accessibility` | 需要无障碍服务 |
| `service` | `notification` 或 `notification_listener` | 需要通知服务 |
| `service` | `shizuku` | 需要 Shizuku |
| `service` | `overlay` 或 `floating_ball` | 需要悬浮窗 |
| `service` | `input_simulation` / `input` / `input_simulator` | 需要无障碍或 Shizuku 任一输入模拟能力 |

即使没有手动声明依赖，App 也会根据 body 自动推导部分能力要求，例如 `global:` 需要无障碍，`notification:` 需要通知服务，`keyevent:` 需要输入模拟能力。
