## 快速生成HTML代码
此方案针对后台管理系统类，新增表单字段特别多的情况，如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923163410973.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNTk1ODg5MQ==,size_16,color_FFFFFF,t_70#pic_center)
这里大概有三四十个字段，如果一个的对着接口文档来写异常耗时，就是个苦力活，那有没有什么办法可以实现快速生成这种简单的代码呢？我们的接口文档用的是Swagger
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020092316363352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNTk1ODg5MQ==,size_16,color_FFFFFF,t_70#pic_center)
可以看到其实接口文档上对应的中文名和字段都是有的了，其实只需要把这个格式解析出来，然后循环一下就可以了。我们的接口文档有一个复制文档功能，复制出来是markdown文档，是这个样子的，我们只需要把表格部分复制出来解析就可以了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923164024432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNTk1ODg5MQ==,size_16,color_FFFFFF,t_70#pic_center)
下面是实现的方法
```javascript
var { Extractor } = require('markdown-tables-to-json');

let md = `

| label         | 请求类型     |     required |  type      |  --   |  --  |
| ------------ | -------------------------------- |-----------|--------|----|--- |
| fAreaId  | 大区id,整数类型 |   body    |   true   |integer(int64)  |       |
| fCaptainTel  | 车长电话 |   body    |   true   |string  |       |
| fCarsetCaptain  | 车长 |   body    |   true   |string  |       |
| fCarsetCaptainId  | 车长id,整型 |   body    |   true   |integer(int64)  |       |
| fCarsetDeputy  | 副车长 |   body    |   true   |string  |       |
| fCarsetDeputyId  | 副车长id |   body    |   true   |integer(int64)  |       |
| fCompanyApprove  | 公司特批:有特批,无特批 |   body    |   true   |string  |       |
| fContractDesc  | 合同说明 |   body    |   false   |string  |       |
| fContractName  | 合同名称 |   body    |   false   |string  |       |
| fContractSituation  | 合同情况 |   body    |   true   |string  |       |
| fCustomerCity  | 城市 |   body    |   false   |string  |       |
| fCustomerId  | 客户id,整数类型 |   body    |   true   |integer(int64)  |       |
`

// 这里只写了一个input如果想更细致些，可以自己写判断来处理
function input(label,code){
  return`
    <el-col :span="6">
          <el-form-item label="${label}" prop="${code}">
            <el-input v-model="form.${code}"></el-input>
          </el-form-item>
        </el-col>
        `
}


let mdData = Extractor.extractObject(md);
let html = ''

for(let key in mdData){
	 html = html + input(mdData[key].label,key)
}

console.log(html)
```
打印出来的效果，自己再放到页面中做一些调整就可以了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923164335715.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNTk1ODg5MQ==,size_16,color_FFFFFF,t_70#pic_center)
