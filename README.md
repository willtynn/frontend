## 1. src/Menu/index.js
定义左侧和顶部的导航栏，其中使用`<Outlet>`组件引用了Router内子组件

## 2. src/Route/index.js
新添加的页面如下放到外层的路由里
```javascript
<Route path='/test/' element={<Menu />} >
  <Route path='table1' element={<BasicTable/>} />
  <Route path='table2' element={<CustomizedTables/>} />
</Route>
```
## 3. 格式化代码
提交前，使用`npx prettier --write 'src/xxx.js'`,格式化自己编写的代码