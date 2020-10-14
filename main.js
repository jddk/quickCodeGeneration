
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
console.log(mdData)
let html = ''

for(let key in mdData){
	 html = html + input(mdData[key].label,key)
}

console.log(html)

