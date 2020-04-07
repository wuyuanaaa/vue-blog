# vue-blog

 基于 vue + express + mongoDB
 
### 文件区分

- [blog](https://github.com/wuyuanaaa/vue-blog/tree/master/blog) 前台博客页面内容

- [blog-admin](https://github.com/wuyuanaaa/vue-blog/tree/master/blog-admin) 后台管理页面内容

### 本地调试

> 此方法可以调试前端代码（可以拉取接口数据，后端代码见 [blog-server](https://github.com/wuyuanaaa/blog-server)）
 
 - 1、clone 整个项目至本地
 ```
 git clone https://github.com/wuyuanaaa/vue-blog.git
 ```
 - 2、进入子项目文件夹，如 ./blog

 - 3、安装依赖
 ```
 npm install
 ```
 
 - 4、启动项目
 ```
 npm run dev
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
 - 1、[URL进入](https://admin.yuanaaa.top)
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

### 最近更新记录

#### blog

- 20/04/07
   - 优化 规范 store 部分代码
   - 修复 移除 iview 样式导致的样式问题
   - 优化 小屏时点击菜单后菜单自动隐藏

### 全部更新记录

- [blog](https://github.com/wuyuanaaa/vue-blog/blob/master/blog/README.md) 
- blog-admin 待整理

### 联系方式

- 邮箱 dao33250855@163.com
- 微信 wu_yu_an

欢迎各种交流