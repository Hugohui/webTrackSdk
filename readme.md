### PC端、移动端H5数据埋点JSSDK
目前只实现了基本的事件上报设计，更贴合业务的埋点可在此设计基础上扩展，比如上报时间戳、页面停留时长、页面渲染时长等。

#### 一、安装
```javascript
// 页面head引入
<script src="./webTrack.js"></script>
```

### 二、配置
`track`对象中的`clientConfig`为埋点配置项：
- serverUrl: 埋点上报地址
- version: 当前SDK版本

#### 三、生命周期事件上报
默认为页面生命周期添加了事件上报，直接修改`webTrack.js`中的生命周期函数完成定制上报。
生命周期函数如下：
- DOMContentLoaded
- load
- beforeunload
- unload

#### 四、自定义事件上报
给window对象注册了__TRACK_，调用__TRACK.track()方法进行自定义事件上报。
```javascript
const options = {
  btnClickCount: 12
}
__TRACK_.track(options)
```