# strong-webpack
学习webpack的源码，并模仿实现打包，只作为个人学习笔记

- [参考的资料1](https://github.com/youngwind/blog/issues/99)
- [参考的资料2](https://github.com/happylindz/blog/issues/6)

### 如何解析js文件，并取得依赖包

使用esprima或acorn来解析js文件，获得相关的依赖，简单，而且避开了写复杂的正则表达式。在分析完后递归搜索出所有的依赖包。

