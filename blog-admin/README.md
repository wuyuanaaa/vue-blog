# vue-blog

 基于 vue + express + mongoDB

### 本地调试

> 此方法可以调试前端代码（可以拉取到当前的真实数据）
 
 - 1、clone 整个项目至本地
 ```
 git clone https://github.com/wuyuanaaa/vue-blog.git
 ```
 - 2、安装依赖
 ```
 npm install
 ```
 - 3、修改 router.js 注释第 8 行 mode: 'history', 部分（调试时如果时哈希模式无法实时更新，暂时不知道什么原因）
 
 - 4、启动项目
 ```
 npm run server
 ```


### 页面整理

- 用户页面
  - [首页](https://blog.yuanaaa.top)
  - [文章页面](https://blog.yuanaaa.top/user/article/5c4867bda955881f515f11a4)
  - [关于页面](https://blog.yuanaaa.top/user/about)
  - [归档页面](https://blog.yuanaaa.top/user/archived)
  - [404页面](https://blog.yuanaaa.top/aa)


- 后台页面
  - 验证页面
  - 后台首页 (文章管理页面)
  - 图片管理页面
  - 新增文章页面

> - 19/1/30 新增后台测试账号，用户名：test , 密码：123456；
- 该账号只提供预览后台，执行修改操作会提示没有权限
- __后台进入方式__
 - 1、[URL进入](https://blog.yuanaaa.top/admin)
 - 2、通过点击页面底部时间部分进入
 - ![img](https://i.loli.net/2019/04/19/5cb9d548edd0d.png)


### 功能

- 导航 √
- 阅读量 √
- 归档时间轴 √
- 文章修改 √
- 文章类型转换 √
- 文章删除 √
- 文章编辑时 md 输入框与预览框同步滚动 √
- 标签分类 √
- 图床接口接入及图片管理 √
- 文章编辑器自动存档功能 √
- 评论 √
- 评论表情
- 文章列表下拉加载 √

### 更新记录

- 19/01/31 
   - 新增 文章编辑器自动存档功能； 
   - 优化 图片分页；
- 19/02/01 
   - 新增 backTop； 
   - 优化 文章编辑器自动保存时间调整为1分钟、用户页 nav 部分优化；
- 19/02/13 
   - 优化 首页大图显示效果，改为全屏显示；
- 19/02/14 
   - 修复 文章编辑器提交保存后再次进入提示读取存档；
- 19/02/15 
   - 修复 组件绑定的 window 事件未移除； 
   - 修复 内容管理-最后编辑时间 未正常设置； 
   - 优化 内容管理-标题栏点击标题跳转到文章详情页； 
   - 优化 md 转 HTML 是图片元素样式，新增阴影及margin；
- 19/02/19 
   - 优化 backTop 部分显示数字百分百；
- 19/02/12 
   - 修复 火狐浏览器底部 list-style 不生效；
- 19/02/25 
   - 优化 首页文章列表现在点击摘要也能跳转到文章页面； 
   - 优化 通过使用 cors-anywhere 实现了删除图片时无需通过新窗口打开链接；
- 19/02/28 优化 
   - 文章编辑器自动保存逻辑，页面加载时如果本地缓存与加载数据不同才提醒恢复； 
   - 优化 悄咪咪的该了 about 页面某条 flag;
- 19/03/05 
   - 修复 文章编辑器自动保存逻辑，新增文章时启动自动保存；
- 19/04/16 
   - 修复 测试账号图片权限问题（此处代码修改在 server 端）； 
   - 优化 优化了文章页面及标签页面在路由更新时获取新数据的方式；
- 19/04/19 
   - 新增 :tada:github 第三方登陆及评论功能；
- 19/04/20 
   - 修复 文章跳转没有重新加载问题； 
   - 修复 标签页能显示私密文章的问题； 
   - 新增 数据加载时页面顶部 LoadingBar 效果;
   - 修改 关于页面内容；
   - 修复 文章编辑组件自动保存逻辑错误；
- 19/04/21
   - 新增 文章列表下拉加载功能；
- 19/04/26
   - 修复 评论时间格式化错误；  
   - 修复 阅读量更新错误；  
- 19/05/01
   - 新增 友链页面；
   - 新增 文章锚点功能；
- 19/05/02
   - 优化 文章锚点生成更新在发布的时候完成，并将目录存入文章数据内；
   - 新增 文章列表显示评论数量；
   - 修复 导航条显示错误；
   - 修复 文章数据更新逻辑错误；
