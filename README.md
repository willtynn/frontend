# 开发流程
## 1. src/Menu/index.js
该文件内定义左侧和顶部的导航栏，其中使用`<Outlet>`组件引用了Router内子组件，按钮点击后页面跳转使用`onClick={() => {navigate('/test/table2');}}`跳转到对应的页面
## 2. 在src/Pages目录下创建对应页面的文件夹并开发对应页面
## 3. src/Route/index.js
新添加的页面参考如下方式，放到外层的路由里
```javascript
<Route path='/test/' element={<Menu />} >
  <Route path='table1' element={<BasicTable/>} />
  <Route path='table2' element={<CustomizedTables/>} />
</Route>
```
## 4. 格式化代码
提交前，使用`npx prettier --write 'src/xxx.js'`,格式化自己编写的代码