<template>   
  <div>
          <el-table  ref="table" size="small" 
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
      stripe border 
      style="width: 100%;margin:0 auto;" 
      :default-sort = "{prop: 'date', order: 'ascending'}"
      highlight-current-row>
          <el-table-column
          prop="date.value"
          label="日期"
          width="90"
          align="center"
          sortable>
         </el-table-column>
         <el-table-column
          prop="WorkID.value"
          label="工单号"
          width="90"
          align="center">
          </el-table-column>
        <el-table-column
          prop="HouseID.value"
          label="房源号"
          width="90"
          align="center">
       </el-table-column>
        <el-table-column
        prop="UserID.value"
        label="租客ID"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name.value"
        label="租客姓名"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phoneNum.value"
        label="租客联系电话"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address.value"
        label="房源地址"
        align="center">
        </el-table-column>
          <el-table-column label="查看详情" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="toogleExpand(scope.row)">{{scope.row.expansion? '收起' : '查看历史工单详情'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <el-form label-position="top" inline class="demo-table-expand">
                 <el-form-item label="报修/投诉详细内容">
                    <div class="text">{{ props.row.Question.value }}</div>
                 </el-form-item>
                 <el-form-item label="报修/投诉具体图片">
                    <div class="pic"><img :src="props.row.Img.value"></div>
                 </el-form-item>
                 <el-form-item label="租客评价">
                    <div class="text">{{props.row.Comment.value}}</div>
                 </el-form-item>
                <el-form-item label="租客评分">
                    <div class="text">
                      <el-rate
                       v-model="props.row.Rate.value"
                       disabled
                       text-color="#ff9900"
                       :texts="texts"
                       show-score
                       >
                      </el-rate>
                      
                    </div>
                 </el-form-item>
              </el-form>
            </template>
          </el-table-column>
      </el-table>
              <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
       background
      layout="prev, pager, next, jumper"
      :total="tableData.length>0 ? tableData.length : null"
      style="margin-top:40px">
    </el-pagination>
    
    </div>
</template>
<script>
export default {
  name: 'History_Work',
  data() {
    return {
      texts:['差','一般','好','基本满意','非常满意'],
      currentPage:1,
      pageSize:8,
      tableData: [{
        date: {
          key: '日期',
          value: '2016-05-03',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '123333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '888888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '8888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13613677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王小虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '1、找开发商协商 如果发现质量问题，首先找开发商，因为购房者与开发商有着直接的合同关系。开发商作为商品房的生产商和销售商，对商品房质量承担最终责任。开发商与购房者的质量关系通过《商品房购销合同》和《商品房住宅质量保证书》来约束，如果购房者因质量问题要求赔偿损失，应由开发商向购房者赔偿，开发商再根据质量原因依照合同约定追索责任单位赔偿。2、因商品房质量保修责任发生纠纷的，如开发商不予解决、或对开发商的解决不满意，当事人可以向建设工程质量监督机构申请组织认定或向建设行政主管部门投诉。对于影响房屋结构安全的问题，住户可以直接委托具有法定结构安全鉴定资质的单位对房屋进行鉴定，其鉴定结论可作为民事赔偿的证据。3、提起仲裁或依法向人民法院起诉。如果上述途径都不能解决，购房者可以根据法律规定和自己的实际情况起诉开发商。综上所述，我们不难发现房屋质量问题已经成了一个普遍的现象。许多居民对类似住房出现的问题，不知道该如何投诉，如何解决，往往是一出现问题就找物业，而物业部门又因无力解决或其它一些原因把问题移交给别的部门，使问题拖而不决。在这里提醒购房者，出现房屋质量问题先找开发商协商，弄清楚问题的性质，再来选择不同的处理方式，必要时可以请律师协助解决，以便更好地维护自己的权益。',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/workinfo/1.webp'),
          visible:false,
        },
        Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },{
        date: {
          key: '日期',
          value: '2016-05-04',
          visible: false,
        },
        WorkID: {
          key: '工单号',
          value: '133333',
          visible: false,
        },
        HouseID: {
          key: '房源ID',
          value: '828888',
          visible: false,
        },
        UserID: {
          key: '租客ID',
          value: '2888888',
          visible: false,
        },
        phoneNum: {
          key: '租客电话',
          value: '13315677455',
          visible: false,
        },
         name: {
          key: '租客姓名',
          value: '王虎',
          visible: false,
        },
        address: {
          key: '租客地址',
          value: '上海市普陀区金沙江路 1518 弄大所多阿斯达大阿斯达大所',
          visible: false,
        },
        Question:{
           key: '详细内容',
          value: '我家水管子漏了！！！！！！！！！！！！！！！！！！！！！阿打算打算打算打算迪达斯化身丢啊诗奴好！！！！！！！！！！！！',
          visible: false,
        },
        Img:{
          key:'报修图片',
          value: require('../../assets/backgroundimg/home.webp'),
          visible:false,
        },Comment:{
          key:'租客评价',
          value: '这是哪个**师傅修的破东西',
          visible:false,
        },
        Rate:{
          key:'评分',
          value:2.7,
          visible:false,
        }
      },],
    }
  },
  created() {
      let tableData = this.tableData
      tableData.map(item => {
        item.expansion = false
      })
    },
  methods: {
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.tableData.map(item => {
        if (row.WorkID != item.WorkID) {
          $table.toggleRowExpansion(item, false)
          item.expansion = false
        } 
      })
      row.expansion=!row.expansion;
      $table.toggleRowExpansion(row)
    },
     handleSizeChange: function (size) {
                this.pagesize = size;
            },
     handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
        },
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 1;
}
.demo-table-expand label {
  margin-left:20px;
  width: 130px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form--label-top .el-form-item__label{
  padding-bottom: 0px;
}
.text{
  padding-left:40px;
  line-height: 25px;
}
.pic{
  height: 300px;
  padding-left:40px;
}
.pic img{
  height:100%;
  width:50%;
}
.el-main{
  overflow:visible;
}
</style>