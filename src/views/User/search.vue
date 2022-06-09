<template>
<el-container>
 
      
 <el-main>
     <div style="margin-top: 15px;">
   <el-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="输入房源名直接搜索"
  @select="handleSelect(state)"
  ></el-autocomplete>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </div>
      <div class="nav">
           <div class="city">
             <span>城市:</span>

  <el-cascader
    v-model="city"
    :options="options_city"
    :props="optionProps"
    @change="classify" id="city">
    </el-cascader>
    </div>
    <div class="money">
      <span>租金范围(元/月):</span>
      <el-radio-group v-model="radio_money" @change="classify" id="rent">
    <el-radio :label="1">1000以下</el-radio>
    <el-radio :label="2">1000~3000</el-radio>
    <el-radio :label="3">3000~5000</el-radio>
    <el-radio :label="4">5000~10000</el-radio>
    <el-radio :label="5">10000以上</el-radio>
    </el-radio-group>
    </div>
    <div class="housestyle">
      <span>
        户型:
      </span>
      <el-select v-model="housestyle" placeholder="请选择" @change="classify" id="type">
    <el-option
      v-for="item in options_housestyle"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
    <!-- <div class="renttime">
      <span>
        租期:
      </span>
      <el-radio v-model="radio_renttime" label="短租">短租</el-radio>
      <el-radio v-model="radio_renttime" label="长租">长租</el-radio>
    </div> -->
      </div>
      <div class="container">
        <div v-if="info.length==0">
        <p>貌似什么都没找到欸~</p>
   <img src="../../assets/backgroundimg/blank.gif" alt="">
         </div>
         <div v-else>
            <!-- <div v-for="item in items_index" :key="item" > -->
            <div v-for="item in info" :key="item" >
            <div class="house" style="border-radius:25px">
                <div class="pic">
                    <!-- <img :src="item.url" alt="" style="width:400px;height:200px;"> -->
                    <!-- <img :src="items[item.id-1].url" alt="" style="width:400px;height:200px;"> -->
                    <img :src="item.PicPathList[0].PicPath" alt="" style="width:400px;height:200px;border-radius:10px">
                </div>
                <div class="content">
                    <div class="name">
                        <a href="information"  @click="addjusthouseid(item)">房源名:{{item.Housename}}</a>
                    </div>
                     <div class="place">
                         <!-- 地点:{{items[item.id-1].place}} -->
                         地点:{{item.Address}}
                     </div>
                     <div class="floor">
                         <!-- 楼层:{{items[item.id-1].floor}} -->
                         楼层:{{item.Floor}}
                     </div>
                     <div class="add">
                         <el-button type="warning" round @click="addcollection(item)">加入收藏</el-button>
                    </div>
                </div>
                <!-- <div class="mark"> -->
                    <!-- 评分:{{items[item.id-1].mark}} -->
                    <!-- 评分:{{item.mark}} -->
                <!-- </div> -->
                <div class="rentmoney">
                    <!-- 租金:{{items[item.HouseID-1].money}}元/月 -->
                    <span>租金:</span>
                    <p>{{item.Rent}}元/月</p>
                    
                </div>
                <div class="housemodel">
                    <!-- 户型:{{items[item.HouseID-1].model}} -->
                    <span>户型:</span>
                    
                    <p>{{item.Housetype}}</p>
                </div>
                <div class="area">
                    <!-- 面积:{{items[item.HouseID-1].area}}m² -->
                    <span>面积:</span>
                    <p>{{item.Area}}m²</p>
                    
                </div>
                
        </div>
            <div class="clear"></div>
        </div>
         </div>
    </div>
 </el-main>
 <el-footer>
 </el-footer>
    
</el-container>
</template>
<style scoped>
.clear{
    clear: both;
}
.el-main {
    overflow:visible;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-container{
      background-color:rgb(240, 242, 245);
      height: auto;
      /* width: 100%; */
  }
  .el-pagination{
    margin-top: 100px;
  }
  .city{
    display: flex;
    margin-top:100px;
    margin-left: 20px;
    align-items: center;
  }
  .money{
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    align-items: center;
  }
  .housestyle{
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    align-items: center;
  }
  .renttime{
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    align-items: center;
  }
  .city span{
    padding-right: 20px;
  }
  .money span{
    padding-right: 20px;
  }
  .housestyle span{
    padding-right: 20px;
  }
  .renttime span{
    padding-right: 20px;
  }
  .container{
      height: 100%;
      margin-top: 50px;
  }
  .container .house{
      background-color: white;
      margin-bottom: 30px;
      height: 240px;
  }
  .container .house .pic{
      float: left;
      margin:20px;
  }
  .container .house .content{
      text-align: left;
      float: left;
  }
  .container .house .content .name{
      margin-top: 30px;
  }
  .container .house .content .name a{
      color: skyblue;
      
      font-size: 20px;
      text-decoration: none;
  }
  .container .house .content .name a:hover{
      color: blue;
      text-decoration: underline;
  }
  .container .house .content .floor{
      margin-top: 30px;
  }
   .container .house .content .place{
      margin-top: 30px;
  }
    .container .house .content .add{
       margin-top: 20px;
  }
  .container .house .rentmoney{
      color: lightcoral;
      font-weight: bold;
      float: right;
      margin-top: 80px;
      margin-right: 50px;
      background-color: rgb(240, 242, 245);
      padding: 10px;
      border-radius: 10px;
      height: 60px;
  }
  .container .house .housemodel{
      color: lightcoral;
      font-weight: bold;
      float: right;
      margin-top: 80px;
      margin-right: 50px;
      background-color: rgb(240, 242, 245);
      padding: 10px;
      border-radius: 10px;
      height: 60px;
  }

  .container .house .area{
      color: lightcoral;
      font-weight: bold;
      float: right;
      margin-top: 80px;
      margin-right: 50px;
      background-color: rgb(240, 242, 245);
      padding: 10px;
      border-radius: 10px;
      height: 60px;
  }
    .container .house p{
      font-size: 30px;
  } 
  .container .house span{
    font-size: 15px;
    text-align: left;
  }
</style>
<script>
import qs from "qs";
export default {
    data() {
      return {
        restaurants: [],
        state: '',
        timeout:  null,
        radio_money: null,
        radio_renttime: 1,
        city:'',
        value: '5',
        housestyle:'',
        info:[],
         items_index: [],  
       items: [
            { id:1, name: '湾景国际3单元1楼四户',           mark:5.0,          place:'北京海淀',  floor:2,  money:4500,model:'3室2厅',  area:127,url:require('../../assets/houseinfo/1/pic/1.png')},
            { id:2, name: '天宫4单元6楼2户',                mark:4.0,              place:'北京海淀',  floor:8,  money:4500,model:'3室1厅',  area:120 ,url:require('../../assets/houseinfo/2/pic/1.png')},
            { id:3, name: '林肯公园3单元2楼1户',            mark:5.0,           place:'北京昌平',  floor:15,  money:15000,model:'3室2厅', area:251 ,url:require('../../assets/houseinfo/3/pic/1.png')},
            { id:4, name: '玫瑰园2单元1楼3户',              mark:3.8,             place:'上海黄浦区',floor:1,money:7500,model:'3室1厅',  area:90,url:require('../../assets/houseinfo/4/pic/1.png')},
            { id:5, name: '玫瑰园3单元2楼7户',              mark:4.4,             place:'北京海淀',  floor:10,  money:7700,model:'3室1厅',  area:128 ,url:require('../../assets/houseinfo/5/pic/1.png')},
            { id:6, name: '天上人间3单元2楼1户',            mark:5.0,           place:'北京朝阳',  floor:5,  money:5500,model:'1室1厅',  area:0.2 ,url:require('../../assets/houseinfo/6/pic/1.png')},
            { id:7, name: '芜湖牛逼2单元1楼4户',            mark:4.7,           place:'北京海淀',  floor:19,  money:7000,model:'2室1厅',  area:99.6 ,url:require('../../assets/houseinfo/7/pic/1.png')},
            { id:8, name: '北苑2单元3楼1户',                mark:4.1,               place:'成都锦江',  floor:19,  money:2399,model:'1室1厅',  area:45 ,url:require('../../assets/houseinfo/8/pic/1.png')},
            { id:9, name: '观澳园2单元3楼4户',              mark:4.2,             place:'上海徐汇',  floor:3,  money:8000,model:'2室1厅',  area:90.5 ,url:require('../../assets/houseinfo/9/pic/1.png')},
            { id:10,name: '永泰庄2单元3楼1户',              mark:3.6,             place:'成都成化',  floor:5,  money:5500,model:'2室1厅',  area:63, url:require('../../assets/houseinfo/10/pic/1.png')},
            { id:11,name: '悦溪3单元2楼1户',                mark:3.4,               place:'上海徐汇',  floor:6,  money:9000,model:'2室2厅',  area:88.5, url:require('../../assets/houseinfo/11/pic/1.png')},
            { id:12,name: '仁和花园3单元2楼5户',            mark:5.0,           place:'上海徐汇',  floor:6,  money:3400,model:'2室1厅',  area:89, url:require('../../assets/houseinfo/12/pic/1.png')},
            { id:13,name: '汇景5单元2楼4户',                mark:4.2,               place:'北京通州',  floor:2,  money:6000,model:'2室1厅',  area:88, url:require('../../assets/houseinfo/13/pic/1.png')},
            { id:14,name: '通天院2单元3楼1户',              mark:3.6,             place:'上海徐汇',  floor:8,  money:7250,model:'2室1厅',  area:54, url:require('../../assets/houseinfo/14/pic/1.png')},
            { id:15,name: '丽湾家园2单元3楼4户',            mark:5.0,           place:'北京东城',  floor:2,  money:5900,model:'2室1厅',  area:89, url:require('../../assets/houseinfo/15/pic/1.png')},
            { id:16,name: '祈东家园5单元2楼1户',            mark:5.0,           place:'北京通州',  floor:12,  money:5000,model:'2室2厅',  area:80, url:require('../../assets/houseinfo/16/pic/1.png')},
            { id:17,name: '中湾国际5单元2楼6户',            mark:5.0,          place:'北京西城',  floor:16,  money:6650,model:'1室1厅',  area:42,url:require('../../assets/houseinfo/17/pic/1.png')},
            { id:18,name: '明珠家园5单元4楼8户',            mark:3.2,           place:'北京大兴',  floor:3,  money:6700,model:'3室2厅',  area:100 ,url:require('../../assets/houseinfo/18/pic/1.png')},
            { id:19,name: '金隅汇景7单元3楼8户',            mark:5.0,           place:'北京通州',  floor:8,  money:6000,model:'2室1厅',  area:80 ,url:require('../../assets/houseinfo/19/pic/1.png')},
            { id:20,name: '次渠嘉园4单元3楼2户',            mark:4.4,           place:'北京通州',  floor:17,  money:3399,model:'1室1厅',  area:45 ,url:require('../../assets/houseinfo/20/pic/1.png')},
            { id:21,name: '紫藤一村4单元3楼8户',            mark:5.0,           place:'上海浦东',  floor:12,  money:4500,model:'2室1厅',  area:77 ,url:require('../../assets/houseinfo/21/pic/1.png')},
            { id:22,name: '爱博二村5单元2楼4户',            mark:5.0,           place:'成都郫县',  floor:5,  money:3300,model:'1室1厅',  area:59.8 ,url:require('../../assets/houseinfo/22/pic/1.png')},
            { id:23,name: '黎明花园2单元3楼4户',            mark:3.4,           place:'北京西城',  floor:3,  money:4400,model:'2室1厅',  area:52.3 ,url:require('../../assets/houseinfo/23/pic/1.png')},
            { id:24,name: '玫瑰园4单元3楼2户',              mark:3.1,             place:'成都高新',  floor:14,  money:4600,model:'2室1厅',  area:66.5 ,url:require('../../assets/houseinfo/24/pic/1.png')},
            { id:25,name: '碧林湾摩登堂6单元3楼2户',        mark:5.0,       place:'北京海淀',  floor:13,  money:4600,model:'2室1厅',  area:66.5 ,url:require('../../assets/houseinfo/25/pic/1.png')},
            { id:26,name: '七韵美地苑 6单元3楼2户',         mark:5.0,        place:'上海黄埔',  floor:3,  money:7000,model:'2室2厅',  area:91, url:require('../../assets/houseinfo/26/pic/1.png')},
            { id:27,name: '牡丹新村8单元3楼1户',            mark:4.7,           place:'没写',      floor:2,      money:4000,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/27/pic/1.png')},
            { id:28,name: '万圭园2单元5楼2户',              mark:3.9,             place:'成都锦江',  floor:17,  money:4000,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/28/pic/1.png')},
            { id:29,name: '天上单元楼户',                   mark:5.0,                  place:'北京海淀',  floor:19,  money:4000,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/29/pic/1.png')},
            { id:30,name: '东边院子1单元2楼4户',            mark:4.8,           place:'广州荔湾',  floor:16,  money:1780,model:'3室1厅',  area:80, url:require('../../assets/houseinfo/30/pic/1.png')},
            { id:31,name: '南城都汇汇朗园5单元2楼3户',      mark:4.5,     place:'广州越秀',  floor:8,  money:3800,model:'3室1厅',  area:89, url:require('../../assets/houseinfo/31/pic/1.png')},
            { id:32,name: '保利城单元5楼3户',               mark:5.0,              place:'广州海珠',  floor:7,  money:1850,model:'2室2厅',  area:73, url:require('../../assets/houseinfo/32/pic/1.png')},
            { id:33,name: '中德英伦世邦6单元4楼2户',        mark:3.6,       place:'成都成化',  floor:12,  money:2000,model:'2室1厅',  area:88 ,url:require('../../assets/houseinfo/33/pic/1.png')},
            { id:34,name: '成华奥园广场(二期)4单元2楼3户',  mark:4.2, place:'成都成化',  floor:19,  money:2200,model:'2室1厅',  area:72.8, url:require('../../assets/houseinfo/34/pic/1.png')},
            { id:35,name: '东城印象4单元3楼2户',            mark:4.8,           place:'成都龙泉驿',floor:10,money:2180,model:'1室1厅',area:45, url:require('../../assets/houseinfo/35/pic/1.png')},
            { id:36,name: '时光荟6单元3楼2户',              mark:5.0,             place:'北京东城',  floor:13,  money:1560,model:'1室1厅',  area:42.8, url:require('../../assets/houseinfo/36/pic/1.png')},
            { id:37,name: '时光荟6单元3楼2户',              mark:5.0,             place:'北京东城',  floor:8,  money:1560,model:'1室1厅',  area:42.8, url:require('../../assets/houseinfo/37/pic/1.png')},
            { id:38,name: '华侨城御龙山7单元8楼3户',        mark:4.0,       place:'上海徐汇',  floor:20,  money:2480,model:'2室2厅',  area:88, url:require('../../assets/houseinfo/38/pic/1.png')},
            { id:39,name: '鑫禾北城鑫街6单元5楼2户',        mark:3.1,       place:'广州黄埔',  floor:16,  money:1480,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/39/pic/1.png')},
            { id:40,name: '鑫禾北城鑫街7单元3楼4户',        mark:3.8,       place:'北京西城',  floor:15,  money:2700,model:'3室2厅',  area:79, url:require('../../assets/houseinfo/40/pic/1.png')},
        ],  
//         options_city: [{
//           value: "11",
//           label: "北京市",
//           children: [{
//          value: "1101",
//          label: "市辖区",
//          children: [{
//            value: "110101",
//            label: "东城区"
//          }, {
//            value: "110102",
//            label: "西城区"
//          }, {
//            value: "110105",
//            label: "朝阳区"
//          }, {
//            value: "110106",
//            label: "丰台区"
//          }, {
//            value: "110107",
//            label: "石景山区"
//          }, {
//            value: "110108",
//            label: "海淀区"
//          }, {
//            value: "110109",
//            label: "门头沟区"
//          }, {
//            value: "110111",
//            label: "房山区"
//          }, {
//            value: "110112",
//            label: "通州区"
//          }, {
//            value: "110113",
//            label: "顺义区"
//          }, {
//            value: "110114",
//            label: "昌平区"
//          }, {
//            value: "110115",
//            label: "大兴区"
//          }, {
//            value: "110116",
//            label: "怀柔区"
//          }, {
//            value: "110117",
//            label: "平谷区"
//          }, {
//            value: "110118",
//            label: "密云区"
//          }, {
//            value: "110119",
//            label: "延庆区"
//          }]
//           }]
// }, {
//   value: "12",
//   label: "天津市",
//   children: [{
//     value: "1201",
//     label: "市辖区",
//     children: [{
//       value: "120101",
//       label: "和平区"
//     }, {
//       value: "120102",
//       label: "河东区"
//     }, {
//       value: "120103",
//       label: "河西区"
//     }, {
//       value: "120104",
//       label: "南开区"
//     }, {
//       value: "120105",
//       label: "河北区"
//     }, {
//       value: "120106",
//       label: "红桥区"
//     }, {
//       value: "120110",
//       label: "东丽区"
//     }, {
//       value: "120111",
//       label: "西青区"
//     }, {
//       value: "120112",
//       label: "津南区"
//     }, {
//       value: "120113",
//       label: "北辰区"
//     }, {
//       value: "120114",
//       label: "武清区"
//     }, {
//       value: "120115",
//       label: "宝坻区"
//     }, {
//       value: "120116",
//       label: "滨海新区"
//     }, {
//       value: "120117",
//       label: "宁河区"
//     }, {
//       value: "120118",
//       label: "静海区"
//     }, {
//       value: "120119",
//       label: "蓟州区"
//     }]
//   }]
// }, {
//   value: "13",
//   label: "河北省",
//   children: [{
//     value: "1301",
//     label: "石家庄市",
//     children: [{
//       value: "130102",
//       label: "长安区"
//     }, {
//       value: "130104",
//       label: "桥西区"
//     }, {
//       value: "130105",
//       label: "新华区"
//     }, {
//       value: "130107",
//       label: "井陉矿区"
//     }, {
//       value: "130108",
//       label: "裕华区"
//     }, {
//       value: "130109",
//       label: "藁城区"
//     }, {
//       value: "130110",
//       label: "鹿泉区"
//     }, {
//       value: "130111",
//       label: "栾城区"
//     }, {
//       value: "130121",
//       label: "井陉县"
//     }, {
//       value: "130123",
//       label: "正定县"
//     }, {
//       value: "130125",
//       label: "行唐县"
//     }, {
//       value: "130126",
//       label: "灵寿县"
//     }, {
//       value: "130127",
//       label: "高邑县"
//     }, {
//       value: "130128",
//       label: "深泽县"
//     }, {
//       value: "130129",
//       label: "赞皇县"
//     }, {
//       value: "130130",
//       label: "无极县"
//     }, {
//       value: "130131",
//       label: "平山县"
//     }, {
//       value: "130132",
//       label: "元氏县"
//     }, {
//       value: "130133",
//       label: "赵县"
//     }, {
//       value: "130171",
//       label: "石家庄高新技术产业开发区"
//     }, {
//       value: "130172",
//       label: "石家庄循环化工园区"
//     }, {
//       value: "130181",
//       label: "辛集市"
//     }, {
//       value: "130183",
//       label: "晋州市"
//     }, {
//       value: "130184",
//       label: "新乐市"
//     }]
//   }, {
//     value: "1302",
//     label: "唐山市",
//     children: [{
//       value: "130202",
//       label: "路南区"
//     }, {
//       value: "130203",
//       label: "路北区"
//     }, {
//       value: "130204",
//       label: "古冶区"
//     }, {
//       value: "130205",
//       label: "开平区"
//     }, {
//       value: "130207",
//       label: "丰南区"
//     }, {
//       value: "130208",
//       label: "丰润区"
//     }, {
//       value: "130209",
//       label: "曹妃甸区"
//     }, {
//       value: "130224",
//       label: "滦南县"
//     }, {
//       value: "130225",
//       label: "乐亭县"
//     }, {
//       value: "130227",
//       label: "迁西县"
//     }, {
//       value: "130229",
//       label: "玉田县"
//     }, {
//       value: "130271",
//       label: "河北唐山芦台经济开发区"
//     }, {
//       value: "130272",
//       label: "唐山市汉沽管理区"
//     }, {
//       value: "130273",
//       label: "唐山高新技术产业开发区"
//     }, {
//       value: "130274",
//       label: "河北唐山海港经济开发区"
//     }, {
//       value: "130281",
//       label: "遵化市"
//     }, {
//       value: "130283",
//       label: "迁安市"
//     }, {
//       value: "130284",
//       label: "滦州市"
//     }]
//   }, {
//     value: "1303",
//     label: "秦皇岛市",
//     children: [{
//       value: "130302",
//       label: "海港区"
//     }, {
//       value: "130303",
//       label: "山海关区"
//     }, {
//       value: "130304",
//       label: "北戴河区"
//     }, {
//       value: "130306",
//       label: "抚宁区"
//     }, {
//       value: "130321",
//       label: "青龙满族自治县"
//     }, {
//       value: "130322",
//       label: "昌黎县"
//     }, {
//       value: "130324",
//       label: "卢龙县"
//     }, {
//       value: "130371",
//       label: "秦皇岛市经济技术开发区"
//     }, {
//       value: "130372",
//       label: "北戴河新区"
//     }]
//   }, {
//     value: "1304",
//     label: "邯郸市",
//     children: [{
//       value: "130402",
//       label: "邯山区"
//     }, {
//       value: "130403",
//       label: "丛台区"
//     }, {
//       value: "130404",
//       label: "复兴区"
//     }, {
//       value: "130406",
//       label: "峰峰矿区"
//     }, {
//       value: "130407",
//       label: "肥乡区"
//     }, {
//       value: "130408",
//       label: "永年区"
//     }, {
//       value: "130423",
//       label: "临漳县"
//     }, {
//       value: "130424",
//       label: "成安县"
//     }, {
//       value: "130425",
//       label: "大名县"
//     }, {
//       value: "130426",
//       label: "涉县"
//     }, {
//       value: "130427",
//       label: "磁县"
//     }, {
//       value: "130430",
//       label: "邱县"
//     }, {
//       value: "130431",
//       label: "鸡泽县"
//     }, {
//       value: "130432",
//       label: "广平县"
//     }, {
//       value: "130433",
//       label: "馆陶县"
//     }, {
//       value: "130434",
//       label: "魏县"
//     }, {
//       value: "130435",
//       label: "曲周县"
//     }, {
//       value: "130471",
//       label: "邯郸经济技术开发区"
//     }, {
//       value: "130473",
//       label: "邯郸冀南新区"
//     }, {
//       value: "130481",
//       label: "武安市"
//     }]
//   }, {
//     value: "1305",
//     label: "邢台市",
//     children: [{
//       value: "130502",
//       label: "襄都区"
//     }, {
//       value: "130503",
//       label: "信都区"
//     }, {
//       value: "130505",
//       label: "任泽区"
//     }, {
//       value: "130506",
//       label: "南和区"
//     }, {
//       value: "130522",
//       label: "临城县"
//     }, {
//       value: "130523",
//       label: "内丘县"
//     }, {
//       value: "130524",
//       label: "柏乡县"
//     }, {
//       value: "130525",
//       label: "隆尧县"
//     }, {
//       value: "130528",
//       label: "宁晋县"
//     }, {
//       value: "130529",
//       label: "巨鹿县"
//     }, {
//       value: "130530",
//       label: "新河县"
//     }, {
//       value: "130531",
//       label: "广宗县"
//     }, {
//       value: "130532",
//       label: "平乡县"
//     }, {
//       value: "130533",
//       label: "威县"
//     }, {
//       value: "130534",
//       label: "清河县"
//     }, {
//       value: "130535",
//       label: "临西县"
//     }, {
//       value: "130571",
//       label: "河北邢台经济开发区"
//     }, {
//       value: "130581",
//       label: "南宫市"
//     }, {
//       value: "130582",
//       label: "沙河市"
//     }]
//   }, {
//     value: "1306",
//     label: "保定市",
//     children: [{
//       value: "130602",
//       label: "竞秀区"
//     }, {
//       value: "130606",
//       label: "莲池区"
//     }, {
//       value: "130607",
//       label: "满城区"
//     }, {
//       value: "130608",
//       label: "清苑区"
//     }, {
//       value: "130609",
//       label: "徐水区"
//     }, {
//       value: "130623",
//       label: "涞水县"
//     }, {
//       value: "130624",
//       label: "阜平县"
//     }, {
//       value: "130626",
//       label: "定兴县"
//     }, {
//       value: "130627",
//       label: "唐县"
//     }, {
//       value: "130628",
//       label: "高阳县"
//     }, {
//       value: "130629",
//       label: "容城县"
//     }, {
//       value: "130630",
//       label: "涞源县"
//     }, {
//       value: "130631",
//       label: "望都县"
//     }, {
//       value: "130632",
//       label: "安新县"
//     }, {
//       value: "130633",
//       label: "易县"
//     }, {
//       value: "130634",
//       label: "曲阳县"
//     }, {
//       value: "130635",
//       label: "蠡县"
//     }, {
//       value: "130636",
//       label: "顺平县"
//     }, {
//       value: "130637",
//       label: "博野县"
//     }, {
//       value: "130638",
//       label: "雄县"
//     }, {
//       value: "130671",
//       label: "保定高新技术产业开发区"
//     }, {
//       value: "130672",
//       label: "保定白沟新城"
//     }, {
//       value: "130681",
//       label: "涿州市"
//     }, {
//       value: "130682",
//       label: "定州市"
//     }, {
//       value: "130683",
//       label: "安国市"
//     }, {
//       value: "130684",
//       label: "高碑店市"
//     }]
//   }, {
//     value: "1307",
//     label: "张家口市",
//     children: [{
//       value: "130702",
//       label: "桥东区"
//     }, {
//       value: "130703",
//       label: "桥西区"
//     }, {
//       value: "130705",
//       label: "宣化区"
//     }, {
//       value: "130706",
//       label: "下花园区"
//     }, {
//       value: "130708",
//       label: "万全区"
//     }, {
//       value: "130709",
//       label: "崇礼区"
//     }, {
//       value: "130722",
//       label: "张北县"
//     }, {
//       value: "130723",
//       label: "康保县"
//     }, {
//       value: "130724",
//       label: "沽源县"
//     }, {
//       value: "130725",
//       label: "尚义县"
//     }, {
//       value: "130726",
//       label: "蔚县"
//     }, {
//       value: "130727",
//       label: "阳原县"
//     }, {
//       value: "130728",
//       label: "怀安县"
//     }, {
//       value: "130730",
//       label: "怀来县"
//     }, {
//       value: "130731",
//       label: "涿鹿县"
//     }, {
//       value: "130732",
//       label: "赤城县"
//     }, {
//       value: "130771",
//       label: "张家口经济开发区"
//     }, {
//       value: "130772",
//       label: "张家口市察北管理区"
//     }, {
//       value: "130773",
//       label: "张家口市塞北管理区"
//     }]
//   }, {
//     value: "1308",
//     label: "承德市",
//     children: [{
//       value: "130802",
//       label: "双桥区"
//     }, {
//       value: "130803",
//       label: "双滦区"
//     }, {
//       value: "130804",
//       label: "鹰手营子矿区"
//     }, {
//       value: "130821",
//       label: "承德县"
//     }, {
//       value: "130822",
//       label: "兴隆县"
//     }, {
//       value: "130824",
//       label: "滦平县"
//     }, {
//       value: "130825",
//       label: "隆化县"
//     }, {
//       value: "130826",
//       label: "丰宁满族自治县"
//     }, {
//       value: "130827",
//       label: "宽城满族自治县"
//     }, {
//       value: "130828",
//       label: "围场满族蒙古族自治县"
//     }, {
//       value: "130871",
//       label: "承德高新技术产业开发区"
//     }, {
//       value: "130881",
//       label: "平泉市"
//     }]
//   }, {
//     value: "1309",
//     label: "沧州市",
//     children: [{
//       value: "130902",
//       label: "新华区"
//     }, {
//       value: "130903",
//       label: "运河区"
//     }, {
//       value: "130921",
//       label: "沧县"
//     }, {
//       value: "130922",
//       label: "青县"
//     }, {
//       value: "130923",
//       label: "东光县"
//     }, {
//       value: "130924",
//       label: "海兴县"
//     }, {
//       value: "130925",
//       label: "盐山县"
//     }, {
//       value: "130926",
//       label: "肃宁县"
//     }, {
//       value: "130927",
//       label: "南皮县"
//     }, {
//       value: "130928",
//       label: "吴桥县"
//     }, {
//       value: "130929",
//       label: "献县"
//     }, {
//       value: "130930",
//       label: "孟村回族自治县"
//     }, {
//       value: "130971",
//       label: "河北沧州经济开发区"
//     }, {
//       value: "130972",
//       label: "沧州高新技术产业开发区"
//     }, {
//       value: "130973",
//       label: "沧州渤海新区"
//     }, {
//       value: "130981",
//       label: "泊头市"
//     }, {
//       value: "130982",
//       label: "任丘市"
//     }, {
//       value: "130983",
//       label: "黄骅市"
//     }, {
//       value: "130984",
//       label: "河间市"
//     }]
//   }, {
//     value: "1310",
//     label: "廊坊市",
//     children: [{
//       value: "131002",
//       label: "安次区"
//     }, {
//       value: "131003",
//       label: "广阳区"
//     }, {
//       value: "131022",
//       label: "固安县"
//     }, {
//       value: "131023",
//       label: "永清县"
//     }, {
//       value: "131024",
//       label: "香河县"
//     }, {
//       value: "131025",
//       label: "大城县"
//     }, {
//       value: "131026",
//       label: "文安县"
//     }, {
//       value: "131028",
//       label: "大厂回族自治县"
//     }, {
//       value: "131071",
//       label: "廊坊经济技术开发区"
//     }, {
//       value: "131081",
//       label: "霸州市"
//     }, {
//       value: "131082",
//       label: "三河市"
//     }]
//   }, {
//     value: "1311",
//     label: "衡水市",
//     children: [{
//       value: "131102",
//       label: "桃城区"
//     }, {
//       value: "131103",
//       label: "冀州区"
//     }, {
//       value: "131121",
//       label: "枣强县"
//     }, {
//       value: "131122",
//       label: "武邑县"
//     }, {
//       value: "131123",
//       label: "武强县"
//     }, {
//       value: "131124",
//       label: "饶阳县"
//     }, {
//       value: "131125",
//       label: "安平县"
//     }, {
//       value: "131126",
//       label: "故城县"
//     }, {
//       value: "131127",
//       label: "景县"
//     }, {
//       value: "131128",
//       label: "阜城县"
//     }, {
//       value: "131171",
//       label: "河北衡水高新技术产业开发区"
//     }, {
//       value: "131172",
//       label: "衡水滨湖新区"
//     }, {
//       value: "131182",
//       label: "深州市"
//     }]
//   }]
// }, {
//   value: "14",
//   label: "山西省",
//   children: [{
//     value: "1401",
//     label: "太原市",
//     children: [{
//       value: "140105",
//       label: "小店区"
//     }, {
//       value: "140106",
//       label: "迎泽区"
//     }, {
//       value: "140107",
//       label: "杏花岭区"
//     }, {
//       value: "140108",
//       label: "尖草坪区"
//     }, {
//       value: "140109",
//       label: "万柏林区"
//     }, {
//       value: "140110",
//       label: "晋源区"
//     }, {
//       value: "140121",
//       label: "清徐县"
//     }, {
//       value: "140122",
//       label: "阳曲县"
//     }, {
//       value: "140123",
//       label: "娄烦县"
//     }, {
//       value: "140171",
//       label: "山西转型综合改革示范区"
//     }, {
//       value: "140181",
//       label: "古交市"
//     }]
//   }, {
//     value: "1402",
//     label: "大同市",
//     children: [{
//       value: "140212",
//       label: "新荣区"
//     }, {
//       value: "140213",
//       label: "平城区"
//     }, {
//       value: "140214",
//       label: "云冈区"
//     }, {
//       value: "140215",
//       label: "云州区"
//     }, {
//       value: "140221",
//       label: "阳高县"
//     }, {
//       value: "140222",
//       label: "天镇县"
//     }, {
//       value: "140223",
//       label: "广灵县"
//     }, {
//       value: "140224",
//       label: "灵丘县"
//     }, {
//       value: "140225",
//       label: "浑源县"
//     }, {
//       value: "140226",
//       label: "左云县"
//     }, {
//       value: "140271",
//       label: "山西大同经济开发区"
//     }]
//   }, {
//     value: "1403",
//     label: "阳泉市",
//     children: [{
//       value: "140302",
//       label: "城区"
//     }, {
//       value: "140303",
//       label: "矿区"
//     }, {
//       value: "140311",
//       label: "郊区"
//     }, {
//       value: "140321",
//       label: "平定县"
//     }, {
//       value: "140322",
//       label: "盂县"
//     }]
//   }, {
//     value: "1404",
//     label: "长治市",
//     children: [{
//       value: "140403",
//       label: "潞州区"
//     }, {
//       value: "140404",
//       label: "上党区"
//     }, {
//       value: "140405",
//       label: "屯留区"
//     }, {
//       value: "140406",
//       label: "潞城区"
//     }, {
//       value: "140423",
//       label: "襄垣县"
//     }, {
//       value: "140425",
//       label: "平顺县"
//     }, {
//       value: "140426",
//       label: "黎城县"
//     }, {
//       value: "140427",
//       label: "壶关县"
//     }, {
//       value: "140428",
//       label: "长子县"
//     }, {
//       value: "140429",
//       label: "武乡县"
//     }, {
//       value: "140430",
//       label: "沁县"
//     }, {
//       value: "140431",
//       label: "沁源县"
//     }, {
//       value: "140471",
//       label: "山西长治高新技术产业园区"
//     }]
//   }, {
//     value: "1405",
//     label: "晋城市",
//     children: [{
//       value: "140502",
//       label: "城区"
//     }, {
//       value: "140521",
//       label: "沁水县"
//     }, {
//       value: "140522",
//       label: "阳城县"
//     }, {
//       value: "140524",
//       label: "陵川县"
//     }, {
//       value: "140525",
//       label: "泽州县"
//     }, {
//       value: "140581",
//       label: "高平市"
//     }]
//   }, {
//     value: "1406",
//     label: "朔州市",
//     children: [{
//       value: "140602",
//       label: "朔城区"
//     }, {
//       value: "140603",
//       label: "平鲁区"
//     }, {
//       value: "140621",
//       label: "山阴县"
//     }, {
//       value: "140622",
//       label: "应县"
//     }, {
//       value: "140623",
//       label: "右玉县"
//     }, {
//       value: "140671",
//       label: "山西朔州经济开发区"
//     }, {
//       value: "140681",
//       label: "怀仁市"
//     }]
//   }, {
//     value: "1407",
//     label: "晋中市",
//     children: [{
//       value: "140702",
//       label: "榆次区"
//     }, {
//       value: "140703",
//       label: "太谷区"
//     }, {
//       value: "140721",
//       label: "榆社县"
//     }, {
//       value: "140722",
//       label: "左权县"
//     }, {
//       value: "140723",
//       label: "和顺县"
//     }, {
//       value: "140724",
//       label: "昔阳县"
//     }, {
//       value: "140725",
//       label: "寿阳县"
//     }, {
//       value: "140727",
//       label: "祁县"
//     }, {
//       value: "140728",
//       label: "平遥县"
//     }, {
//       value: "140729",
//       label: "灵石县"
//     }, {
//       value: "140781",
//       label: "介休市"
//     }]
//   }, {
//     value: "1408",
//     label: "运城市",
//     children: [{
//       value: "140802",
//       label: "盐湖区"
//     }, {
//       value: "140821",
//       label: "临猗县"
//     }, {
//       value: "140822",
//       label: "万荣县"
//     }, {
//       value: "140823",
//       label: "闻喜县"
//     }, {
//       value: "140824",
//       label: "稷山县"
//     }, {
//       value: "140825",
//       label: "新绛县"
//     }, {
//       value: "140826",
//       label: "绛县"
//     }, {
//       value: "140827",
//       label: "垣曲县"
//     }, {
//       value: "140828",
//       label: "夏县"
//     }, {
//       value: "140829",
//       label: "平陆县"
//     }, {
//       value: "140830",
//       label: "芮城县"
//     }, {
//       value: "140881",
//       label: "永济市"
//     }, {
//       value: "140882",
//       label: "河津市"
//     }]
//   }, {
//     value: "1409",
//     label: "忻州市",
//     children: [{
//       value: "140902",
//       label: "忻府区"
//     }, {
//       value: "140921",
//       label: "定襄县"
//     }, {
//       value: "140922",
//       label: "五台县"
//     }, {
//       value: "140923",
//       label: "代县"
//     }, {
//       value: "140924",
//       label: "繁峙县"
//     }, {
//       value: "140925",
//       label: "宁武县"
//     }, {
//       value: "140926",
//       label: "静乐县"
//     }, {
//       value: "140927",
//       label: "神池县"
//     }, {
//       value: "140928",
//       label: "五寨县"
//     }, {
//       value: "140929",
//       label: "岢岚县"
//     }, {
//       value: "140930",
//       label: "河曲县"
//     }, {
//       value: "140931",
//       label: "保德县"
//     }, {
//       value: "140932",
//       label: "偏关县"
//     }, {
//       value: "140971",
//       label: "五台山风景名胜区"
//     }, {
//       value: "140981",
//       label: "原平市"
//     }]
//   }, {
//     value: "1410",
//     label: "临汾市",
//     children: [{
//       value: "141002",
//       label: "尧都区"
//     }, {
//       value: "141021",
//       label: "曲沃县"
//     }, {
//       value: "141022",
//       label: "翼城县"
//     }, {
//       value: "141023",
//       label: "襄汾县"
//     }, {
//       value: "141024",
//       label: "洪洞县"
//     }, {
//       value: "141025",
//       label: "古县"
//     }, {
//       value: "141026",
//       label: "安泽县"
//     }, {
//       value: "141027",
//       label: "浮山县"
//     }, {
//       value: "141028",
//       label: "吉县"
//     }, {
//       value: "141029",
//       label: "乡宁县"
//     }, {
//       value: "141030",
//       label: "大宁县"
//     }, {
//       value: "141031",
//       label: "隰县"
//     }, {
//       value: "141032",
//       label: "永和县"
//     }, {
//       value: "141033",
//       label: "蒲县"
//     }, {
//       value: "141034",
//       label: "汾西县"
//     }, {
//       value: "141081",
//       label: "侯马市"
//     }, {
//       value: "141082",
//       label: "霍州市"
//     }]
//   }, {
//     value: "1411",
//     label: "吕梁市",
//     children: [{
//       value: "141102",
//       label: "离石区"
//     }, {
//       value: "141121",
//       label: "文水县"
//     }, {
//       value: "141122",
//       label: "交城县"
//     }, {
//       value: "141123",
//       label: "兴县"
//     }, {
//       value: "141124",
//       label: "临县"
//     }, {
//       value: "141125",
//       label: "柳林县"
//     }, {
//       value: "141126",
//       label: "石楼县"
//     }, {
//       value: "141127",
//       label: "岚县"
//     }, {
//       value: "141128",
//       label: "方山县"
//     }, {
//       value: "141129",
//       label: "中阳县"
//     }, {
//       value: "141130",
//       label: "交口县"
//     }, {
//       value: "141181",
//       label: "孝义市"
//     }, {
//       value: "141182",
//       label: "汾阳市"
//     }]
//   }]
// }, {
//   value: "15",
//   label: "内蒙古自治区",
//   children: [{
//     value: "1501",
//     label: "呼和浩特市",
//     children: [{
//       value: "150102",
//       label: "新城区"
//     }, {
//       value: "150103",
//       label: "回民区"
//     }, {
//       value: "150104",
//       label: "玉泉区"
//     }, {
//       value: "150105",
//       label: "赛罕区"
//     }, {
//       value: "150121",
//       label: "土默特左旗"
//     }, {
//       value: "150122",
//       label: "托克托县"
//     }, {
//       value: "150123",
//       label: "和林格尔县"
//     }, {
//       value: "150124",
//       label: "清水河县"
//     }, {
//       value: "150125",
//       label: "武川县"
//     }, {
//       value: "150172",
//       label: "呼和浩特经济技术开发区"
//     }]
//   }, {
//     value: "1502",
//     label: "包头市",
//     children: [{
//       value: "150202",
//       label: "东河区"
//     }, {
//       value: "150203",
//       label: "昆都仑区"
//     }, {
//       value: "150204",
//       label: "青山区"
//     }, {
//       value: "150205",
//       label: "石拐区"
//     }, {
//       value: "150206",
//       label: "白云鄂博矿区"
//     }, {
//       value: "150207",
//       label: "九原区"
//     }, {
//       value: "150221",
//       label: "土默特右旗"
//     }, {
//       value: "150222",
//       label: "固阳县"
//     }, {
//       value: "150223",
//       label: "达尔罕茂明安联合旗"
//     }, {
//       value: "150271",
//       label: "包头稀土高新技术产业开发区"
//     }]
//   }, {
//     value: "1503",
//     label: "乌海市",
//     children: [{
//       value: "150302",
//       label: "海勃湾区"
//     }, {
//       value: "150303",
//       label: "海南区"
//     }, {
//       value: "150304",
//       label: "乌达区"
//     }]
//   }, {
//     value: "1504",
//     label: "赤峰市",
//     children: [{
//       value: "150402",
//       label: "红山区"
//     }, {
//       value: "150403",
//       label: "元宝山区"
//     }, {
//       value: "150404",
//       label: "松山区"
//     }, {
//       value: "150421",
//       label: "阿鲁科尔沁旗"
//     }, {
//       value: "150422",
//       label: "巴林左旗"
//     }, {
//       value: "150423",
//       label: "巴林右旗"
//     }, {
//       value: "150424",
//       label: "林西县"
//     }, {
//       value: "150425",
//       label: "克什克腾旗"
//     }, {
//       value: "150426",
//       label: "翁牛特旗"
//     }, {
//       value: "150428",
//       label: "喀喇沁旗"
//     }, {
//       value: "150429",
//       label: "宁城县"
//     }, {
//       value: "150430",
//       label: "敖汉旗"
//     }]
//   }, {
//     value: "1505",
//     label: "通辽市",
//     children: [{
//       value: "150502",
//       label: "科尔沁区"
//     }, {
//       value: "150521",
//       label: "科尔沁左翼中旗"
//     }, {
//       value: "150522",
//       label: "科尔沁左翼后旗"
//     }, {
//       value: "150523",
//       label: "开鲁县"
//     }, {
//       value: "150524",
//       label: "库伦旗"
//     }, {
//       value: "150525",
//       label: "奈曼旗"
//     }, {
//       value: "150526",
//       label: "扎鲁特旗"
//     }, {
//       value: "150571",
//       label: "通辽经济技术开发区"
//     }, {
//       value: "150581",
//       label: "霍林郭勒市"
//     }]
//   }, {
//     value: "1506",
//     label: "鄂尔多斯市",
//     children: [{
//       value: "150602",
//       label: "东胜区"
//     }, {
//       value: "150603",
//       label: "康巴什区"
//     }, {
//       value: "150621",
//       label: "达拉特旗"
//     }, {
//       value: "150622",
//       label: "准格尔旗"
//     }, {
//       value: "150623",
//       label: "鄂托克前旗"
//     }, {
//       value: "150624",
//       label: "鄂托克旗"
//     }, {
//       value: "150625",
//       label: "杭锦旗"
//     }, {
//       value: "150626",
//       label: "乌审旗"
//     }, {
//       value: "150627",
//       label: "伊金霍洛旗"
//     }]
//   }, {
//     value: "1507",
//     label: "呼伦贝尔市",
//     children: [{
//       value: "150702",
//       label: "海拉尔区"
//     }, {
//       value: "150703",
//       label: "扎赉诺尔区"
//     }, {
//       value: "150721",
//       label: "阿荣旗"
//     }, {
//       value: "150722",
//       label: "莫力达瓦达斡尔族自治旗"
//     }, {
//       value: "150723",
//       label: "鄂伦春自治旗"
//     }, {
//       value: "150724",
//       label: "鄂温克族自治旗"
//     }, {
//       value: "150725",
//       label: "陈巴尔虎旗"
//     }, {
//       value: "150726",
//       label: "新巴尔虎左旗"
//     }, {
//       value: "150727",
//       label: "新巴尔虎右旗"
//     }, {
//       value: "150781",
//       label: "满洲里市"
//     }, {
//       value: "150782",
//       label: "牙克石市"
//     }, {
//       value: "150783",
//       label: "扎兰屯市"
//     }, {
//       value: "150784",
//       label: "额尔古纳市"
//     }, {
//       value: "150785",
//       label: "根河市"
//     }]
//   }, {
//     value: "1508",
//     label: "巴彦淖尔市",
//     children: [{
//       value: "150802",
//       label: "临河区"
//     }, {
//       value: "150821",
//       label: "五原县"
//     }, {
//       value: "150822",
//       label: "磴口县"
//     }, {
//       value: "150823",
//       label: "乌拉特前旗"
//     }, {
//       value: "150824",
//       label: "乌拉特中旗"
//     }, {
//       value: "150825",
//       label: "乌拉特后旗"
//     }, {
//       value: "150826",
//       label: "杭锦后旗"
//     }]
//   }, {
//     value: "1509",
//     label: "乌兰察布市",
//     children: [{
//       value: "150902",
//       label: "集宁区"
//     }, {
//       value: "150921",
//       label: "卓资县"
//     }, {
//       value: "150922",
//       label: "化德县"
//     }, {
//       value: "150923",
//       label: "商都县"
//     }, {
//       value: "150924",
//       label: "兴和县"
//     }, {
//       value: "150925",
//       label: "凉城县"
//     }, {
//       value: "150926",
//       label: "察哈尔右翼前旗"
//     }, {
//       value: "150927",
//       label: "察哈尔右翼中旗"
//     }, {
//       value: "150928",
//       label: "察哈尔右翼后旗"
//     }, {
//       value: "150929",
//       label: "四子王旗"
//     }, {
//       value: "150981",
//       label: "丰镇市"
//     }]
//   }, {
//     value: "1522",
//     label: "兴安盟",
//     children: [{
//       value: "152201",
//       label: "乌兰浩特市"
//     }, {
//       value: "152202",
//       label: "阿尔山市"
//     }, {
//       value: "152221",
//       label: "科尔沁右翼前旗"
//     }, {
//       value: "152222",
//       label: "科尔沁右翼中旗"
//     }, {
//       value: "152223",
//       label: "扎赉特旗"
//     }, {
//       value: "152224",
//       label: "突泉县"
//     }]
//   }, {
//     value: "1525",
//     label: "锡林郭勒盟",
//     children: [{
//       value: "152501",
//       label: "二连浩特市"
//     }, {
//       value: "152502",
//       label: "锡林浩特市"
//     }, {
//       value: "152522",
//       label: "阿巴嘎旗"
//     }, {
//       value: "152523",
//       label: "苏尼特左旗"
//     }, {
//       value: "152524",
//       label: "苏尼特右旗"
//     }, {
//       value: "152525",
//       label: "东乌珠穆沁旗"
//     }, {
//       value: "152526",
//       label: "西乌珠穆沁旗"
//     }, {
//       value: "152527",
//       label: "太仆寺旗"
//     }, {
//       value: "152528",
//       label: "镶黄旗"
//     }, {
//       value: "152529",
//       label: "正镶白旗"
//     }, {
//       value: "152530",
//       label: "正蓝旗"
//     }, {
//       value: "152531",
//       label: "多伦县"
//     }, {
//       value: "152571",
//       label: "乌拉盖管委会"
//     }]
//   }, {
//     value: "1529",
//     label: "阿拉善盟",
//     children: [{
//       value: "152921",
//       label: "阿拉善左旗"
//     }, {
//       value: "152922",
//       label: "阿拉善右旗"
//     }, {
//       value: "152923",
//       label: "额济纳旗"
//     }, {
//       value: "152971",
//       label: "内蒙古阿拉善经济开发区"
//     }]
//   }]
// }, {
//   value: "21",
//   label: "辽宁省",
//   children: [{
//     value: "2101",
//     label: "沈阳市",
//     children: [{
//       value: "210102",
//       label: "和平区"
//     }, {
//       value: "210103",
//       label: "沈河区"
//     }, {
//       value: "210104",
//       label: "大东区"
//     }, {
//       value: "210105",
//       label: "皇姑区"
//     }, {
//       value: "210106",
//       label: "铁西区"
//     }, {
//       value: "210111",
//       label: "苏家屯区"
//     }, {
//       value: "210112",
//       label: "浑南区"
//     }, {
//       value: "210113",
//       label: "沈北新区"
//     }, {
//       value: "210114",
//       label: "于洪区"
//     }, {
//       value: "210115",
//       label: "辽中区"
//     }, {
//       value: "210123",
//       label: "康平县"
//     }, {
//       value: "210124",
//       label: "法库县"
//     }, {
//       value: "210181",
//       label: "新民市"
//     }]
//   }, {
//     value: "2102",
//     label: "大连市",
//     children: [{
//       value: "210202",
//       label: "中山区"
//     }, {
//       value: "210203",
//       label: "西岗区"
//     }, {
//       value: "210204",
//       label: "沙河口区"
//     }, {
//       value: "210211",
//       label: "甘井子区"
//     }, {
//       value: "210212",
//       label: "旅顺口区"
//     }, {
//       value: "210213",
//       label: "金州区"
//     }, {
//       value: "210214",
//       label: "普兰店区"
//     }, {
//       value: "210224",
//       label: "长海县"
//     }, {
//       value: "210281",
//       label: "瓦房店市"
//     }, {
//       value: "210283",
//       label: "庄河市"
//     }]
//   }, {
//     value: "2103",
//     label: "鞍山市",
//     children: [{
//       value: "210302",
//       label: "铁东区"
//     }, {
//       value: "210303",
//       label: "铁西区"
//     }, {
//       value: "210304",
//       label: "立山区"
//     }, {
//       value: "210311",
//       label: "千山区"
//     }, {
//       value: "210321",
//       label: "台安县"
//     }, {
//       value: "210323",
//       label: "岫岩满族自治县"
//     }, {
//       value: "210381",
//       label: "海城市"
//     }]
//   }, {
//     value: "2104",
//     label: "抚顺市",
//     children: [{
//       value: "210402",
//       label: "新抚区"
//     }, {
//       value: "210403",
//       label: "东洲区"
//     }, {
//       value: "210404",
//       label: "望花区"
//     }, {
//       value: "210411",
//       label: "顺城区"
//     }, {
//       value: "210421",
//       label: "抚顺县"
//     }, {
//       value: "210422",
//       label: "新宾满族自治县"
//     }, {
//       value: "210423",
//       label: "清原满族自治县"
//     }]
//   }, {
//     value: "2105",
//     label: "本溪市",
//     children: [{
//       value: "210502",
//       label: "平山区"
//     }, {
//       value: "210503",
//       label: "溪湖区"
//     }, {
//       value: "210504",
//       label: "明山区"
//     }, {
//       value: "210505",
//       label: "南芬区"
//     }, {
//       value: "210521",
//       label: "本溪满族自治县"
//     }, {
//       value: "210522",
//       label: "桓仁满族自治县"
//     }]
//   }, {
//     value: "2106",
//     label: "丹东市",
//     children: [{
//       value: "210602",
//       label: "元宝区"
//     }, {
//       value: "210603",
//       label: "振兴区"
//     }, {
//       value: "210604",
//       label: "振安区"
//     }, {
//       value: "210624",
//       label: "宽甸满族自治县"
//     }, {
//       value: "210681",
//       label: "东港市"
//     }, {
//       value: "210682",
//       label: "凤城市"
//     }]
//   }, {
//     value: "2107",
//     label: "锦州市",
//     children: [{
//       value: "210702",
//       label: "古塔区"
//     }, {
//       value: "210703",
//       label: "凌河区"
//     }, {
//       value: "210711",
//       label: "太和区"
//     }, {
//       value: "210726",
//       label: "黑山县"
//     }, {
//       value: "210727",
//       label: "义县"
//     }, {
//       value: "210781",
//       label: "凌海市"
//     }, {
//       value: "210782",
//       label: "北镇市"
//     }]
//   }, {
//     value: "2108",
//     label: "营口市",
//     children: [{
//       value: "210802",
//       label: "站前区"
//     }, {
//       value: "210803",
//       label: "西市区"
//     }, {
//       value: "210804",
//       label: "鲅鱼圈区"
//     }, {
//       value: "210811",
//       label: "老边区"
//     }, {
//       value: "210881",
//       label: "盖州市"
//     }, {
//       value: "210882",
//       label: "大石桥市"
//     }]
//   }, {
//     value: "2109",
//     label: "阜新市",
//     children: [{
//       value: "210902",
//       label: "海州区"
//     }, {
//       value: "210903",
//       label: "新邱区"
//     }, {
//       value: "210904",
//       label: "太平区"
//     }, {
//       value: "210905",
//       label: "清河门区"
//     }, {
//       value: "210911",
//       label: "细河区"
//     }, {
//       value: "210921",
//       label: "阜新蒙古族自治县"
//     }, {
//       value: "210922",
//       label: "彰武县"
//     }]
//   }, {
//     value: "2110",
//     label: "辽阳市",
//     children: [{
//       value: "211002",
//       label: "白塔区"
//     }, {
//       value: "211003",
//       label: "文圣区"
//     }, {
//       value: "211004",
//       label: "宏伟区"
//     }, {
//       value: "211005",
//       label: "弓长岭区"
//     }, {
//       value: "211011",
//       label: "太子河区"
//     }, {
//       value: "211021",
//       label: "辽阳县"
//     }, {
//       value: "211081",
//       label: "灯塔市"
//     }]
//   }, {
//     value: "2111",
//     label: "盘锦市",
//     children: [{
//       value: "211102",
//       label: "双台子区"
//     }, {
//       value: "211103",
//       label: "兴隆台区"
//     }, {
//       value: "211104",
//       label: "大洼区"
//     }, {
//       value: "211122",
//       label: "盘山县"
//     }]
//   }, {
//     value: "2112",
//     label: "铁岭市",
//     children: [{
//       value: "211202",
//       label: "银州区"
//     }, {
//       value: "211204",
//       label: "清河区"
//     }, {
//       value: "211221",
//       label: "铁岭县"
//     }, {
//       value: "211223",
//       label: "西丰县"
//     }, {
//       value: "211224",
//       label: "昌图县"
//     }, {
//       value: "211281",
//       label: "调兵山市"
//     }, {
//       value: "211282",
//       label: "开原市"
//     }]
//   }, {
//     value: "2113",
//     label: "朝阳市",
//     children: [{
//       value: "211302",
//       label: "双塔区"
//     }, {
//       value: "211303",
//       label: "龙城区"
//     }, {
//       value: "211321",
//       label: "朝阳县"
//     }, {
//       value: "211322",
//       label: "建平县"
//     }, {
//       value: "211324",
//       label: "喀喇沁左翼蒙古族自治县"
//     }, {
//       value: "211381",
//       label: "北票市"
//     }, {
//       value: "211382",
//       label: "凌源市"
//     }]
//   }, {
//     value: "2114",
//     label: "葫芦岛市",
//     children: [{
//       value: "211402",
//       label: "连山区"
//     }, {
//       value: "211403",
//       label: "龙港区"
//     }, {
//       value: "211404",
//       label: "南票区"
//     }, {
//       value: "211421",
//       label: "绥中县"
//     }, {
//       value: "211422",
//       label: "建昌县"
//     }, {
//       value: "211481",
//       label: "兴城市"
//     }]
//   }]
// }, {
//   value: "22",
//   label: "吉林省",
//   children: [{
//     value: "2201",
//     label: "长春市",
//     children: [{
//       value: "220102",
//       label: "南关区"
//     }, {
//       value: "220103",
//       label: "宽城区"
//     }, {
//       value: "220104",
//       label: "朝阳区"
//     }, {
//       value: "220105",
//       label: "二道区"
//     }, {
//       value: "220106",
//       label: "绿园区"
//     }, {
//       value: "220112",
//       label: "双阳区"
//     }, {
//       value: "220113",
//       label: "九台区"
//     }, {
//       value: "220122",
//       label: "农安县"
//     }, {
//       value: "220171",
//       label: "长春经济技术开发区"
//     }, {
//       value: "220172",
//       label: "长春净月高新技术产业开发区"
//     }, {
//       value: "220173",
//       label: "长春高新技术产业开发区"
//     }, {
//       value: "220174",
//       label: "长春汽车经济技术开发区"
//     }, {
//       value: "220182",
//       label: "榆树市"
//     }, {
//       value: "220183",
//       label: "德惠市"
//     }, {
//       value: "220184",
//       label: "公主岭市"
//     }]
//   }, {
//     value: "2202",
//     label: "吉林市",
//     children: [{
//       value: "220202",
//       label: "昌邑区"
//     }, {
//       value: "220203",
//       label: "龙潭区"
//     }, {
//       value: "220204",
//       label: "船营区"
//     }, {
//       value: "220211",
//       label: "丰满区"
//     }, {
//       value: "220221",
//       label: "永吉县"
//     }, {
//       value: "220271",
//       label: "吉林经济开发区"
//     }, {
//       value: "220272",
//       label: "吉林高新技术产业开发区"
//     }, {
//       value: "220273",
//       label: "吉林中国新加坡食品区"
//     }, {
//       value: "220281",
//       label: "蛟河市"
//     }, {
//       value: "220282",
//       label: "桦甸市"
//     }, {
//       value: "220283",
//       label: "舒兰市"
//     }, {
//       value: "220284",
//       label: "磐石市"
//     }]
//   }, {
//     value: "2203",
//     label: "四平市",
//     children: [{
//       value: "220302",
//       label: "铁西区"
//     }, {
//       value: "220303",
//       label: "铁东区"
//     }, {
//       value: "220322",
//       label: "梨树县"
//     }, {
//       value: "220323",
//       label: "伊通满族自治县"
//     }, {
//       value: "220382",
//       label: "双辽市"
//     }]
//   }, {
//     value: "2204",
//     label: "辽源市",
//     children: [{
//       value: "220402",
//       label: "龙山区"
//     }, {
//       value: "220403",
//       label: "西安区"
//     }, {
//       value: "220421",
//       label: "东丰县"
//     }, {
//       value: "220422",
//       label: "东辽县"
//     }]
//   }, {
//     value: "2205",
//     label: "通化市",
//     children: [{
//       value: "220502",
//       label: "东昌区"
//     }, {
//       value: "220503",
//       label: "二道江区"
//     }, {
//       value: "220521",
//       label: "通化县"
//     }, {
//       value: "220523",
//       label: "辉南县"
//     }, {
//       value: "220524",
//       label: "柳河县"
//     }, {
//       value: "220581",
//       label: "梅河口市"
//     }, {
//       value: "220582",
//       label: "集安市"
//     }]
//   }, {
//     value: "2206",
//     label: "白山市",
//     children: [{
//       value: "220602",
//       label: "浑江区"
//     }, {
//       value: "220605",
//       label: "江源区"
//     }, {
//       value: "220621",
//       label: "抚松县"
//     }, {
//       value: "220622",
//       label: "靖宇县"
//     }, {
//       value: "220623",
//       label: "长白朝鲜族自治县"
//     }, {
//       value: "220681",
//       label: "临江市"
//     }]
//   }, {
//     value: "2207",
//     label: "松原市",
//     children: [{
//       value: "220702",
//       label: "宁江区"
//     }, {
//       value: "220721",
//       label: "前郭尔罗斯蒙古族自治县"
//     }, {
//       value: "220722",
//       label: "长岭县"
//     }, {
//       value: "220723",
//       label: "乾安县"
//     }, {
//       value: "220771",
//       label: "吉林松原经济开发区"
//     }, {
//       value: "220781",
//       label: "扶余市"
//     }]
//   }, {
//     value: "2208",
//     label: "白城市",
//     children: [{
//       value: "220802",
//       label: "洮北区"
//     }, {
//       value: "220821",
//       label: "镇赉县"
//     }, {
//       value: "220822",
//       label: "通榆县"
//     }, {
//       value: "220871",
//       label: "吉林白城经济开发区"
//     }, {
//       value: "220881",
//       label: "洮南市"
//     }, {
//       value: "220882",
//       label: "大安市"
//     }]
//   }, {
//     value: "2224",
//     label: "延边朝鲜族自治州",
//     children: [{
//       value: "222401",
//       label: "延吉市"
//     }, {
//       value: "222402",
//       label: "图们市"
//     }, {
//       value: "222403",
//       label: "敦化市"
//     }, {
//       value: "222404",
//       label: "珲春市"
//     }, {
//       value: "222405",
//       label: "龙井市"
//     }, {
//       value: "222406",
//       label: "和龙市"
//     }, {
//       value: "222424",
//       label: "汪清县"
//     }, {
//       value: "222426",
//       label: "安图县"
//     }]
//   }]
// }, {
//   value: "23",
//   label: "黑龙江省",
//   children: [{
//     value: "2301",
//     label: "哈尔滨市",
//     children: [{
//       value: "230102",
//       label: "道里区"
//     }, {
//       value: "230103",
//       label: "南岗区"
//     }, {
//       value: "230104",
//       label: "道外区"
//     }, {
//       value: "230108",
//       label: "平房区"
//     }, {
//       value: "230109",
//       label: "松北区"
//     }, {
//       value: "230110",
//       label: "香坊区"
//     }, {
//       value: "230111",
//       label: "呼兰区"
//     }, {
//       value: "230112",
//       label: "阿城区"
//     }, {
//       value: "230113",
//       label: "双城区"
//     }, {
//       value: "230123",
//       label: "依兰县"
//     }, {
//       value: "230124",
//       label: "方正县"
//     }, {
//       value: "230125",
//       label: "宾县"
//     }, {
//       value: "230126",
//       label: "巴彦县"
//     }, {
//       value: "230127",
//       label: "木兰县"
//     }, {
//       value: "230128",
//       label: "通河县"
//     }, {
//       value: "230129",
//       label: "延寿县"
//     }, {
//       value: "230183",
//       label: "尚志市"
//     }, {
//       value: "230184",
//       label: "五常市"
//     }]
//   }, {
//     value: "2302",
//     label: "齐齐哈尔市",
//     children: [{
//       value: "230202",
//       label: "龙沙区"
//     }, {
//       value: "230203",
//       label: "建华区"
//     }, {
//       value: "230204",
//       label: "铁锋区"
//     }, {
//       value: "230205",
//       label: "昂昂溪区"
//     }, {
//       value: "230206",
//       label: "富拉尔基区"
//     }, {
//       value: "230207",
//       label: "碾子山区"
//     }, {
//       value: "230208",
//       label: "梅里斯达斡尔族区"
//     }, {
//       value: "230221",
//       label: "龙江县"
//     }, {
//       value: "230223",
//       label: "依安县"
//     }, {
//       value: "230224",
//       label: "泰来县"
//     }, {
//       value: "230225",
//       label: "甘南县"
//     }, {
//       value: "230227",
//       label: "富裕县"
//     }, {
//       value: "230229",
//       label: "克山县"
//     }, {
//       value: "230230",
//       label: "克东县"
//     }, {
//       value: "230231",
//       label: "拜泉县"
//     }, {
//       value: "230281",
//       label: "讷河市"
//     }]
//   }, {
//     value: "2303",
//     label: "鸡西市",
//     children: [{
//       value: "230302",
//       label: "鸡冠区"
//     }, {
//       value: "230303",
//       label: "恒山区"
//     }, {
//       value: "230304",
//       label: "滴道区"
//     }, {
//       value: "230305",
//       label: "梨树区"
//     }, {
//       value: "230306",
//       label: "城子河区"
//     }, {
//       value: "230307",
//       label: "麻山区"
//     }, {
//       value: "230321",
//       label: "鸡东县"
//     }, {
//       value: "230381",
//       label: "虎林市"
//     }, {
//       value: "230382",
//       label: "密山市"
//     }]
//   }, {
//     value: "2304",
//     label: "鹤岗市",
//     children: [{
//       value: "230402",
//       label: "向阳区"
//     }, {
//       value: "230403",
//       label: "工农区"
//     }, {
//       value: "230404",
//       label: "南山区"
//     }, {
//       value: "230405",
//       label: "兴安区"
//     }, {
//       value: "230406",
//       label: "东山区"
//     }, {
//       value: "230407",
//       label: "兴山区"
//     }, {
//       value: "230421",
//       label: "萝北县"
//     }, {
//       value: "230422",
//       label: "绥滨县"
//     }]
//   }, {
//     value: "2305",
//     label: "双鸭山市",
//     children: [{
//       value: "230502",
//       label: "尖山区"
//     }, {
//       value: "230503",
//       label: "岭东区"
//     }, {
//       value: "230505",
//       label: "四方台区"
//     }, {
//       value: "230506",
//       label: "宝山区"
//     }, {
//       value: "230521",
//       label: "集贤县"
//     }, {
//       value: "230522",
//       label: "友谊县"
//     }, {
//       value: "230523",
//       label: "宝清县"
//     }, {
//       value: "230524",
//       label: "饶河县"
//     }]
//   }, {
//     value: "2306",
//     label: "大庆市",
//     children: [{
//       value: "230602",
//       label: "萨尔图区"
//     }, {
//       value: "230603",
//       label: "龙凤区"
//     }, {
//       value: "230604",
//       label: "让胡路区"
//     }, {
//       value: "230605",
//       label: "红岗区"
//     }, {
//       value: "230606",
//       label: "大同区"
//     }, {
//       value: "230621",
//       label: "肇州县"
//     }, {
//       value: "230622",
//       label: "肇源县"
//     }, {
//       value: "230623",
//       label: "林甸县"
//     }, {
//       value: "230624",
//       label: "杜尔伯特蒙古族自治县"
//     }, {
//       value: "230671",
//       label: "大庆高新技术产业开发区"
//     }]
//   }, {
//     value: "2307",
//     label: "伊春市",
//     children: [{
//       value: "230717",
//       label: "伊美区"
//     }, {
//       value: "230718",
//       label: "乌翠区"
//     }, {
//       value: "230719",
//       label: "友好区"
//     }, {
//       value: "230722",
//       label: "嘉荫县"
//     }, {
//       value: "230723",
//       label: "汤旺县"
//     }, {
//       value: "230724",
//       label: "丰林县"
//     }, {
//       value: "230725",
//       label: "大箐山县"
//     }, {
//       value: "230726",
//       label: "南岔县"
//     }, {
//       value: "230751",
//       label: "金林区"
//     }, {
//       value: "230781",
//       label: "铁力市"
//     }]
//   }, {
//     value: "2308",
//     label: "佳木斯市",
//     children: [{
//       value: "230803",
//       label: "向阳区"
//     }, {
//       value: "230804",
//       label: "前进区"
//     }, {
//       value: "230805",
//       label: "东风区"
//     }, {
//       value: "230811",
//       label: "郊区"
//     }, {
//       value: "230822",
//       label: "桦南县"
//     }, {
//       value: "230826",
//       label: "桦川县"
//     }, {
//       value: "230828",
//       label: "汤原县"
//     }, {
//       value: "230881",
//       label: "同江市"
//     }, {
//       value: "230882",
//       label: "富锦市"
//     }, {
//       value: "230883",
//       label: "抚远市"
//     }]
//   }, {
//     value: "2309",
//     label: "七台河市",
//     children: [{
//       value: "230902",
//       label: "新兴区"
//     }, {
//       value: "230903",
//       label: "桃山区"
//     }, {
//       value: "230904",
//       label: "茄子河区"
//     }, {
//       value: "230921",
//       label: "勃利县"
//     }]
//   }, {
//     value: "2310",
//     label: "牡丹江市",
//     children: [{
//       value: "231002",
//       label: "东安区"
//     }, {
//       value: "231003",
//       label: "阳明区"
//     }, {
//       value: "231004",
//       label: "爱民区"
//     }, {
//       value: "231005",
//       label: "西安区"
//     }, {
//       value: "231025",
//       label: "林口县"
//     }, {
//       value: "231071",
//       label: "牡丹江经济技术开发区"
//     }, {
//       value: "231081",
//       label: "绥芬河市"
//     }, {
//       value: "231083",
//       label: "海林市"
//     }, {
//       value: "231084",
//       label: "宁安市"
//     }, {
//       value: "231085",
//       label: "穆棱市"
//     }, {
//       value: "231086",
//       label: "东宁市"
//     }]
//   }, {
//     value: "2311",
//     label: "黑河市",
//     children: [{
//       value: "231102",
//       label: "爱辉区"
//     }, {
//       value: "231123",
//       label: "逊克县"
//     }, {
//       value: "231124",
//       label: "孙吴县"
//     }, {
//       value: "231181",
//       label: "北安市"
//     }, {
//       value: "231182",
//       label: "五大连池市"
//     }, {
//       value: "231183",
//       label: "嫩江市"
//     }]
//   }, {
//     value: "2312",
//     label: "绥化市",
//     children: [{
//       value: "231202",
//       label: "北林区"
//     }, {
//       value: "231221",
//       label: "望奎县"
//     }, {
//       value: "231222",
//       label: "兰西县"
//     }, {
//       value: "231223",
//       label: "青冈县"
//     }, {
//       value: "231224",
//       label: "庆安县"
//     }, {
//       value: "231225",
//       label: "明水县"
//     }, {
//       value: "231226",
//       label: "绥棱县"
//     }, {
//       value: "231281",
//       label: "安达市"
//     }, {
//       value: "231282",
//       label: "肇东市"
//     }, {
//       value: "231283",
//       label: "海伦市"
//     }]
//   }, {
//     value: "2327",
//     label: "大兴安岭地区",
//     children: [{
//       value: "232701",
//       label: "漠河市"
//     }, {
//       value: "232721",
//       label: "呼玛县"
//     }, {
//       value: "232722",
//       label: "塔河县"
//     }, {
//       value: "232761",
//       label: "加格达奇区"
//     }, {
//       value: "232762",
//       label: "松岭区"
//     }, {
//       value: "232763",
//       label: "新林区"
//     }, {
//       value: "232764",
//       label: "呼中区"
//     }]
//   }]
// }, {
//   value: "31",
//   label: "上海市",
//   children: [{
//     value: "3101",
//     label: "市辖区",
//     children: [{
//       value: "310101",
//       label: "黄浦区"
//     }, {
//       value: "310104",
//       label: "徐汇区"
//     }, {
//       value: "310105",
//       label: "长宁区"
//     }, {
//       value: "310106",
//       label: "静安区"
//     }, {
//       value: "310107",
//       label: "普陀区"
//     }, {
//       value: "310109",
//       label: "虹口区"
//     }, {
//       value: "310110",
//       label: "杨浦区"
//     }, {
//       value: "310112",
//       label: "闵行区"
//     }, {
//       value: "310113",
//       label: "宝山区"
//     }, {
//       value: "310114",
//       label: "嘉定区"
//     }, {
//       value: "310115",
//       label: "浦东新区"
//     }, {
//       value: "310116",
//       label: "金山区"
//     }, {
//       value: "310117",
//       label: "松江区"
//     }, {
//       value: "310118",
//       label: "青浦区"
//     }, {
//       value: "310120",
//       label: "奉贤区"
//     }, {
//       value: "310151",
//       label: "崇明区"
//     }]
//   }]
// }, {
//   value: "32",
//   label: "江苏省",
//   children: [{
//     value: "3201",
//     label: "南京市",
//     children: [{
//       value: "320102",
//       label: "玄武区"
//     }, {
//       value: "320104",
//       label: "秦淮区"
//     }, {
//       value: "320105",
//       label: "建邺区"
//     }, {
//       value: "320106",
//       label: "鼓楼区"
//     }, {
//       value: "320111",
//       label: "浦口区"
//     }, {
//       value: "320113",
//       label: "栖霞区"
//     }, {
//       value: "320114",
//       label: "雨花台区"
//     }, {
//       value: "320115",
//       label: "江宁区"
//     }, {
//       value: "320116",
//       label: "六合区"
//     }, {
//       value: "320117",
//       label: "溧水区"
//     }, {
//       value: "320118",
//       label: "高淳区"
//     }]
//   }, {
//     value: "3202",
//     label: "无锡市",
//     children: [{
//       value: "320205",
//       label: "锡山区"
//     }, {
//       value: "320206",
//       label: "惠山区"
//     }, {
//       value: "320211",
//       label: "滨湖区"
//     }, {
//       value: "320213",
//       label: "梁溪区"
//     }, {
//       value: "320214",
//       label: "新吴区"
//     }, {
//       value: "320281",
//       label: "江阴市"
//     }, {
//       value: "320282",
//       label: "宜兴市"
//     }]
//   }, {
//     value: "3203",
//     label: "徐州市",
//     children: [{
//       value: "320302",
//       label: "鼓楼区"
//     }, {
//       value: "320303",
//       label: "云龙区"
//     }, {
//       value: "320305",
//       label: "贾汪区"
//     }, {
//       value: "320311",
//       label: "泉山区"
//     }, {
//       value: "320312",
//       label: "铜山区"
//     }, {
//       value: "320321",
//       label: "丰县"
//     }, {
//       value: "320322",
//       label: "沛县"
//     }, {
//       value: "320324",
//       label: "睢宁县"
//     }, {
//       value: "320371",
//       label: "徐州经济技术开发区"
//     }, {
//       value: "320381",
//       label: "新沂市"
//     }, {
//       value: "320382",
//       label: "邳州市"
//     }]
//   }, {
//     value: "3204",
//     label: "常州市",
//     children: [{
//       value: "320402",
//       label: "天宁区"
//     }, {
//       value: "320404",
//       label: "钟楼区"
//     }, {
//       value: "320411",
//       label: "新北区"
//     }, {
//       value: "320412",
//       label: "武进区"
//     }, {
//       value: "320413",
//       label: "金坛区"
//     }, {
//       value: "320481",
//       label: "溧阳市"
//     }]
//   }, {
//     value: "3205",
//     label: "苏州市",
//     children: [{
//       value: "320505",
//       label: "虎丘区"
//     }, {
//       value: "320506",
//       label: "吴中区"
//     }, {
//       value: "320507",
//       label: "相城区"
//     }, {
//       value: "320508",
//       label: "姑苏区"
//     }, {
//       value: "320509",
//       label: "吴江区"
//     }, {
//       value: "320571",
//       label: "苏州工业园区"
//     }, {
//       value: "320581",
//       label: "常熟市"
//     }, {
//       value: "320582",
//       label: "张家港市"
//     }, {
//       value: "320583",
//       label: "昆山市"
//     }, {
//       value: "320585",
//       label: "太仓市"
//     }]
//   }, {
//     value: "3206",
//     label: "南通市",
//     children: [{
//       value: "320602",
//       label: "崇川区"
//     }, {
//       value: "320611",
//       label: "港闸区"
//     }, {
//       value: "320612",
//       label: "通州区"
//     }, {
//       value: "320623",
//       label: "如东县"
//     }, {
//       value: "320671",
//       label: "南通经济技术开发区"
//     }, {
//       value: "320681",
//       label: "启东市"
//     }, {
//       value: "320682",
//       label: "如皋市"
//     }, {
//       value: "320684",
//       label: "海门市"
//     }, {
//       value: "320685",
//       label: "海安市"
//     }]
//   }, {
//     value: "3207",
//     label: "连云港市",
//     children: [{
//       value: "320703",
//       label: "连云区"
//     }, {
//       value: "320706",
//       label: "海州区"
//     }, {
//       value: "320707",
//       label: "赣榆区"
//     }, {
//       value: "320722",
//       label: "东海县"
//     }, {
//       value: "320723",
//       label: "灌云县"
//     }, {
//       value: "320724",
//       label: "灌南县"
//     }, {
//       value: "320771",
//       label: "连云港经济技术开发区"
//     }, {
//       value: "320772",
//       label: "连云港高新技术产业开发区"
//     }]
//   }, {
//     value: "3208",
//     label: "淮安市",
//     children: [{
//       value: "320803",
//       label: "淮安区"
//     }, {
//       value: "320804",
//       label: "淮阴区"
//     }, {
//       value: "320812",
//       label: "清江浦区"
//     }, {
//       value: "320813",
//       label: "洪泽区"
//     }, {
//       value: "320826",
//       label: "涟水县"
//     }, {
//       value: "320830",
//       label: "盱眙县"
//     }, {
//       value: "320831",
//       label: "金湖县"
//     }, {
//       value: "320871",
//       label: "淮安经济技术开发区"
//     }]
//   }, {
//     value: "3209",
//     label: "盐城市",
//     children: [{
//       value: "320902",
//       label: "亭湖区"
//     }, {
//       value: "320903",
//       label: "盐都区"
//     }, {
//       value: "320904",
//       label: "大丰区"
//     }, {
//       value: "320921",
//       label: "响水县"
//     }, {
//       value: "320922",
//       label: "滨海县"
//     }, {
//       value: "320923",
//       label: "阜宁县"
//     }, {
//       value: "320924",
//       label: "射阳县"
//     }, {
//       value: "320925",
//       label: "建湖县"
//     }, {
//       value: "320971",
//       label: "盐城经济技术开发区"
//     }, {
//       value: "320981",
//       label: "东台市"
//     }]
//   }, {
//     value: "3210",
//     label: "扬州市",
//     children: [{
//       value: "321002",
//       label: "广陵区"
//     }, {
//       value: "321003",
//       label: "邗江区"
//     }, {
//       value: "321012",
//       label: "江都区"
//     }, {
//       value: "321023",
//       label: "宝应县"
//     }, {
//       value: "321071",
//       label: "扬州经济技术开发区"
//     }, {
//       value: "321081",
//       label: "仪征市"
//     }, {
//       value: "321084",
//       label: "高邮市"
//     }]
//   }, {
//     value: "3211",
//     label: "镇江市",
//     children: [{
//       value: "321102",
//       label: "京口区"
//     }, {
//       value: "321111",
//       label: "润州区"
//     }, {
//       value: "321112",
//       label: "丹徒区"
//     }, {
//       value: "321171",
//       label: "镇江新区"
//     }, {
//       value: "321181",
//       label: "丹阳市"
//     }, {
//       value: "321182",
//       label: "扬中市"
//     }, {
//       value: "321183",
//       label: "句容市"
//     }]
//   }, {
//     value: "3212",
//     label: "泰州市",
//     children: [{
//       value: "321202",
//       label: "海陵区"
//     }, {
//       value: "321203",
//       label: "高港区"
//     }, {
//       value: "321204",
//       label: "姜堰区"
//     }, {
//       value: "321271",
//       label: "泰州医药高新技术产业开发区"
//     }, {
//       value: "321281",
//       label: "兴化市"
//     }, {
//       value: "321282",
//       label: "靖江市"
//     }, {
//       value: "321283",
//       label: "泰兴市"
//     }]
//   }, {
//     value: "3213",
//     label: "宿迁市",
//     children: [{
//       value: "321302",
//       label: "宿城区"
//     }, {
//       value: "321311",
//       label: "宿豫区"
//     }, {
//       value: "321322",
//       label: "沭阳县"
//     }, {
//       value: "321323",
//       label: "泗阳县"
//     }, {
//       value: "321324",
//       label: "泗洪县"
//     }, {
//       value: "321371",
//       label: "宿迁经济技术开发区"
//     }]
//   }]
// }, {
//   value: "33",
//   label: "浙江省",
//   children: [{
//     value: "3301",
//     label: "杭州市",
//     children: [{
//       value: "330102",
//       label: "上城区"
//     }, {
//       value: "330103",
//       label: "下城区"
//     }, {
//       value: "330104",
//       label: "江干区"
//     }, {
//       value: "330105",
//       label: "拱墅区"
//     }, {
//       value: "330106",
//       label: "西湖区"
//     }, {
//       value: "330108",
//       label: "滨江区"
//     }, {
//       value: "330109",
//       label: "萧山区"
//     }, {
//       value: "330110",
//       label: "余杭区"
//     }, {
//       value: "330111",
//       label: "富阳区"
//     }, {
//       value: "330112",
//       label: "临安区"
//     }, {
//       value: "330122",
//       label: "桐庐县"
//     }, {
//       value: "330127",
//       label: "淳安县"
//     }, {
//       value: "330182",
//       label: "建德市"
//     }]
//   }, {
//     value: "3302",
//     label: "宁波市",
//     children: [{
//       value: "330203",
//       label: "海曙区"
//     }, {
//       value: "330205",
//       label: "江北区"
//     }, {
//       value: "330206",
//       label: "北仑区"
//     }, {
//       value: "330211",
//       label: "镇海区"
//     }, {
//       value: "330212",
//       label: "鄞州区"
//     }, {
//       value: "330213",
//       label: "奉化区"
//     }, {
//       value: "330225",
//       label: "象山县"
//     }, {
//       value: "330226",
//       label: "宁海县"
//     }, {
//       value: "330281",
//       label: "余姚市"
//     }, {
//       value: "330282",
//       label: "慈溪市"
//     }]
//   }, {
//     value: "3303",
//     label: "温州市",
//     children: [{
//       value: "330302",
//       label: "鹿城区"
//     }, {
//       value: "330303",
//       label: "龙湾区"
//     }, {
//       value: "330304",
//       label: "瓯海区"
//     }, {
//       value: "330305",
//       label: "洞头区"
//     }, {
//       value: "330324",
//       label: "永嘉县"
//     }, {
//       value: "330326",
//       label: "平阳县"
//     }, {
//       value: "330327",
//       label: "苍南县"
//     }, {
//       value: "330328",
//       label: "文成县"
//     }, {
//       value: "330329",
//       label: "泰顺县"
//     }, {
//       value: "330371",
//       label: "温州经济技术开发区"
//     }, {
//       value: "330381",
//       label: "瑞安市"
//     }, {
//       value: "330382",
//       label: "乐清市"
//     }, {
//       value: "330383",
//       label: "龙港市"
//     }]
//   }, {
//     value: "3304",
//     label: "嘉兴市",
//     children: [{
//       value: "330402",
//       label: "南湖区"
//     }, {
//       value: "330411",
//       label: "秀洲区"
//     }, {
//       value: "330421",
//       label: "嘉善县"
//     }, {
//       value: "330424",
//       label: "海盐县"
//     }, {
//       value: "330481",
//       label: "海宁市"
//     }, {
//       value: "330482",
//       label: "平湖市"
//     }, {
//       value: "330483",
//       label: "桐乡市"
//     }]
//   }, {
//     value: "3305",
//     label: "湖州市",
//     children: [{
//       value: "330502",
//       label: "吴兴区"
//     }, {
//       value: "330503",
//       label: "南浔区"
//     }, {
//       value: "330521",
//       label: "德清县"
//     }, {
//       value: "330522",
//       label: "长兴县"
//     }, {
//       value: "330523",
//       label: "安吉县"
//     }]
//   }, {
//     value: "3306",
//     label: "绍兴市",
//     children: [{
//       value: "330602",
//       label: "越城区"
//     }, {
//       value: "330603",
//       label: "柯桥区"
//     }, {
//       value: "330604",
//       label: "上虞区"
//     }, {
//       value: "330624",
//       label: "新昌县"
//     }, {
//       value: "330681",
//       label: "诸暨市"
//     }, {
//       value: "330683",
//       label: "嵊州市"
//     }]
//   }, {
//     value: "3307",
//     label: "金华市",
//     children: [{
//       value: "330702",
//       label: "婺城区"
//     }, {
//       value: "330703",
//       label: "金东区"
//     }, {
//       value: "330723",
//       label: "武义县"
//     }, {
//       value: "330726",
//       label: "浦江县"
//     }, {
//       value: "330727",
//       label: "磐安县"
//     }, {
//       value: "330781",
//       label: "兰溪市"
//     }, {
//       value: "330782",
//       label: "义乌市"
//     }, {
//       value: "330783",
//       label: "东阳市"
//     }, {
//       value: "330784",
//       label: "永康市"
//     }]
//   }, {
//     value: "3308",
//     label: "衢州市",
//     children: [{
//       value: "330802",
//       label: "柯城区"
//     }, {
//       value: "330803",
//       label: "衢江区"
//     }, {
//       value: "330822",
//       label: "常山县"
//     }, {
//       value: "330824",
//       label: "开化县"
//     }, {
//       value: "330825",
//       label: "龙游县"
//     }, {
//       value: "330881",
//       label: "江山市"
//     }]
//   }, {
//     value: "3309",
//     label: "舟山市",
//     children: [{
//       value: "330902",
//       label: "定海区"
//     }, {
//       value: "330903",
//       label: "普陀区"
//     }, {
//       value: "330921",
//       label: "岱山县"
//     }, {
//       value: "330922",
//       label: "嵊泗县"
//     }]
//   }, {
//     value: "3310",
//     label: "台州市",
//     children: [{
//       value: "331002",
//       label: "椒江区"
//     }, {
//       value: "331003",
//       label: "黄岩区"
//     }, {
//       value: "331004",
//       label: "路桥区"
//     }, {
//       value: "331022",
//       label: "三门县"
//     }, {
//       value: "331023",
//       label: "天台县"
//     }, {
//       value: "331024",
//       label: "仙居县"
//     }, {
//       value: "331081",
//       label: "温岭市"
//     }, {
//       value: "331082",
//       label: "临海市"
//     }, {
//       value: "331083",
//       label: "玉环市"
//     }]
//   }, {
//     value: "3311",
//     label: "丽水市",
//     children: [{
//       value: "331102",
//       label: "莲都区"
//     }, {
//       value: "331121",
//       label: "青田县"
//     }, {
//       value: "331122",
//       label: "缙云县"
//     }, {
//       value: "331123",
//       label: "遂昌县"
//     }, {
//       value: "331124",
//       label: "松阳县"
//     }, {
//       value: "331125",
//       label: "云和县"
//     }, {
//       value: "331126",
//       label: "庆元县"
//     }, {
//       value: "331127",
//       label: "景宁畲族自治县"
//     }, {
//       value: "331181",
//       label: "龙泉市"
//     }]
//   }]
// }, {
//   value: "34",
//   label: "安徽省",
//   children: [{
//     value: "3401",
//     label: "合肥市",
//     children: [{
//       value: "340102",
//       label: "瑶海区"
//     }, {
//       value: "340103",
//       label: "庐阳区"
//     }, {
//       value: "340104",
//       label: "蜀山区"
//     }, {
//       value: "340111",
//       label: "包河区"
//     }, {
//       value: "340121",
//       label: "长丰县"
//     }, {
//       value: "340122",
//       label: "肥东县"
//     }, {
//       value: "340123",
//       label: "肥西县"
//     }, {
//       value: "340124",
//       label: "庐江县"
//     }, {
//       value: "340171",
//       label: "合肥高新技术产业开发区"
//     }, {
//       value: "340172",
//       label: "合肥经济技术开发区"
//     }, {
//       value: "340173",
//       label: "合肥新站高新技术产业开发区"
//     }, {
//       value: "340181",
//       label: "巢湖市"
//     }]
//   }, {
//     value: "3402",
//     label: "芜湖市",
//     children: [{
//       value: "340202",
//       label: "镜湖区"
//     }, {
//       value: "340203",
//       label: "弋江区"
//     }, {
//       value: "340207",
//       label: "鸠江区"
//     }, {
//       value: "340208",
//       label: "三山区"
//     }, {
//       value: "340221",
//       label: "芜湖县"
//     }, {
//       value: "340222",
//       label: "繁昌县"
//     }, {
//       value: "340223",
//       label: "南陵县"
//     }, {
//       value: "340271",
//       label: "芜湖经济技术开发区"
//     }, {
//       value: "340272",
//       label: "安徽芜湖长江大桥经济开发区"
//     }, {
//       value: "340281",
//       label: "无为市"
//     }]
//   }, {
//     value: "3403",
//     label: "蚌埠市",
//     children: [{
//       value: "340302",
//       label: "龙子湖区"
//     }, {
//       value: "340303",
//       label: "蚌山区"
//     }, {
//       value: "340304",
//       label: "禹会区"
//     }, {
//       value: "340311",
//       label: "淮上区"
//     }, {
//       value: "340321",
//       label: "怀远县"
//     }, {
//       value: "340322",
//       label: "五河县"
//     }, {
//       value: "340323",
//       label: "固镇县"
//     }, {
//       value: "340371",
//       label: "蚌埠市高新技术开发区"
//     }, {
//       value: "340372",
//       label: "蚌埠市经济开发区"
//     }]
//   }, {
//     value: "3404",
//     label: "淮南市",
//     children: [{
//       value: "340402",
//       label: "大通区"
//     }, {
//       value: "340403",
//       label: "田家庵区"
//     }, {
//       value: "340404",
//       label: "谢家集区"
//     }, {
//       value: "340405",
//       label: "八公山区"
//     }, {
//       value: "340406",
//       label: "潘集区"
//     }, {
//       value: "340421",
//       label: "凤台县"
//     }, {
//       value: "340422",
//       label: "寿县"
//     }]
//   }, {
//     value: "3405",
//     label: "马鞍山市",
//     children: [{
//       value: "340503",
//       label: "花山区"
//     }, {
//       value: "340504",
//       label: "雨山区"
//     }, {
//       value: "340506",
//       label: "博望区"
//     }, {
//       value: "340521",
//       label: "当涂县"
//     }, {
//       value: "340522",
//       label: "含山县"
//     }, {
//       value: "340523",
//       label: "和县"
//     }]
//   }, {
//     value: "3406",
//     label: "淮北市",
//     children: [{
//       value: "340602",
//       label: "杜集区"
//     }, {
//       value: "340603",
//       label: "相山区"
//     }, {
//       value: "340604",
//       label: "烈山区"
//     }, {
//       value: "340621",
//       label: "濉溪县"
//     }]
//   }, {
//     value: "3407",
//     label: "铜陵市",
//     children: [{
//       value: "340705",
//       label: "铜官区"
//     }, {
//       value: "340706",
//       label: "义安区"
//     }, {
//       value: "340711",
//       label: "郊区"
//     }, {
//       value: "340722",
//       label: "枞阳县"
//     }]
//   }, {
//     value: "3408",
//     label: "安庆市",
//     children: [{
//       value: "340802",
//       label: "迎江区"
//     }, {
//       value: "340803",
//       label: "大观区"
//     }, {
//       value: "340811",
//       label: "宜秀区"
//     }, {
//       value: "340822",
//       label: "怀宁县"
//     }, {
//       value: "340825",
//       label: "太湖县"
//     }, {
//       value: "340826",
//       label: "宿松县"
//     }, {
//       value: "340827",
//       label: "望江县"
//     }, {
//       value: "340828",
//       label: "岳西县"
//     }, {
//       value: "340871",
//       label: "安徽安庆经济开发区"
//     }, {
//       value: "340881",
//       label: "桐城市"
//     }, {
//       value: "340882",
//       label: "潜山市"
//     }]
//   }, {
//     value: "3410",
//     label: "黄山市",
//     children: [{
//       value: "341002",
//       label: "屯溪区"
//     }, {
//       value: "341003",
//       label: "黄山区"
//     }, {
//       value: "341004",
//       label: "徽州区"
//     }, {
//       value: "341021",
//       label: "歙县"
//     }, {
//       value: "341022",
//       label: "休宁县"
//     }, {
//       value: "341023",
//       label: "黟县"
//     }, {
//       value: "341024",
//       label: "祁门县"
//     }]
//   }, {
//     value: "3411",
//     label: "滁州市",
//     children: [{
//       value: "341102",
//       label: "琅琊区"
//     }, {
//       value: "341103",
//       label: "南谯区"
//     }, {
//       value: "341122",
//       label: "来安县"
//     }, {
//       value: "341124",
//       label: "全椒县"
//     }, {
//       value: "341125",
//       label: "定远县"
//     }, {
//       value: "341126",
//       label: "凤阳县"
//     }, {
//       value: "341171",
//       label: "苏滁现代产业园"
//     }, {
//       value: "341172",
//       label: "滁州经济技术开发区"
//     }, {
//       value: "341181",
//       label: "天长市"
//     }, {
//       value: "341182",
//       label: "明光市"
//     }]
//   }, {
//     value: "3412",
//     label: "阜阳市",
//     children: [{
//       value: "341202",
//       label: "颍州区"
//     }, {
//       value: "341203",
//       label: "颍东区"
//     }, {
//       value: "341204",
//       label: "颍泉区"
//     }, {
//       value: "341221",
//       label: "临泉县"
//     }, {
//       value: "341222",
//       label: "太和县"
//     }, {
//       value: "341225",
//       label: "阜南县"
//     }, {
//       value: "341226",
//       label: "颍上县"
//     }, {
//       value: "341271",
//       label: "阜阳合肥现代产业园区"
//     }, {
//       value: "341272",
//       label: "阜阳经济技术开发区"
//     }, {
//       value: "341282",
//       label: "界首市"
//     }]
//   }, {
//     value: "3413",
//     label: "宿州市",
//     children: [{
//       value: "341302",
//       label: "埇桥区"
//     }, {
//       value: "341321",
//       label: "砀山县"
//     }, {
//       value: "341322",
//       label: "萧县"
//     }, {
//       value: "341323",
//       label: "灵璧县"
//     }, {
//       value: "341324",
//       label: "泗县"
//     }, {
//       value: "341371",
//       label: "宿州马鞍山现代产业园区"
//     }, {
//       value: "341372",
//       label: "宿州经济技术开发区"
//     }]
//   }, {
//     value: "3415",
//     label: "六安市",
//     children: [{
//       value: "341502",
//       label: "金安区"
//     }, {
//       value: "341503",
//       label: "裕安区"
//     }, {
//       value: "341504",
//       label: "叶集区"
//     }, {
//       value: "341522",
//       label: "霍邱县"
//     }, {
//       value: "341523",
//       label: "舒城县"
//     }, {
//       value: "341524",
//       label: "金寨县"
//     }, {
//       value: "341525",
//       label: "霍山县"
//     }]
//   }, {
//     value: "3416",
//     label: "亳州市",
//     children: [{
//       value: "341602",
//       label: "谯城区"
//     }, {
//       value: "341621",
//       label: "涡阳县"
//     }, {
//       value: "341622",
//       label: "蒙城县"
//     }, {
//       value: "341623",
//       label: "利辛县"
//     }]
//   }, {
//     value: "3417",
//     label: "池州市",
//     children: [{
//       value: "341702",
//       label: "贵池区"
//     }, {
//       value: "341721",
//       label: "东至县"
//     }, {
//       value: "341722",
//       label: "石台县"
//     }, {
//       value: "341723",
//       label: "青阳县"
//     }]
//   }, {
//     value: "3418",
//     label: "宣城市",
//     children: [{
//       value: "341802",
//       label: "宣州区"
//     }, {
//       value: "341821",
//       label: "郎溪县"
//     }, {
//       value: "341823",
//       label: "泾县"
//     }, {
//       value: "341824",
//       label: "绩溪县"
//     }, {
//       value: "341825",
//       label: "旌德县"
//     }, {
//       value: "341871",
//       label: "宣城市经济开发区"
//     }, {
//       value: "341881",
//       label: "宁国市"
//     }, {
//       value: "341882",
//       label: "广德市"
//     }]
//   }]
// }, {
//   value: "35",
//   label: "福建省",
//   children: [{
//     value: "3501",
//     label: "福州市",
//     children: [{
//       value: "350102",
//       label: "鼓楼区"
//     }, {
//       value: "350103",
//       label: "台江区"
//     }, {
//       value: "350104",
//       label: "仓山区"
//     }, {
//       value: "350105",
//       label: "马尾区"
//     }, {
//       value: "350111",
//       label: "晋安区"
//     }, {
//       value: "350112",
//       label: "长乐区"
//     }, {
//       value: "350121",
//       label: "闽侯县"
//     }, {
//       value: "350122",
//       label: "连江县"
//     }, {
//       value: "350123",
//       label: "罗源县"
//     }, {
//       value: "350124",
//       label: "闽清县"
//     }, {
//       value: "350125",
//       label: "永泰县"
//     }, {
//       value: "350128",
//       label: "平潭县"
//     }, {
//       value: "350181",
//       label: "福清市"
//     }]
//   }, {
//     value: "3502",
//     label: "厦门市",
//     children: [{
//       value: "350203",
//       label: "思明区"
//     }, {
//       value: "350205",
//       label: "海沧区"
//     }, {
//       value: "350206",
//       label: "湖里区"
//     }, {
//       value: "350211",
//       label: "集美区"
//     }, {
//       value: "350212",
//       label: "同安区"
//     }, {
//       value: "350213",
//       label: "翔安区"
//     }]
//   }, {
//     value: "3503",
//     label: "莆田市",
//     children: [{
//       value: "350302",
//       label: "城厢区"
//     }, {
//       value: "350303",
//       label: "涵江区"
//     }, {
//       value: "350304",
//       label: "荔城区"
//     }, {
//       value: "350305",
//       label: "秀屿区"
//     }, {
//       value: "350322",
//       label: "仙游县"
//     }]
//   }, {
//     value: "3504",
//     label: "三明市",
//     children: [{
//       value: "350402",
//       label: "梅列区"
//     }, {
//       value: "350403",
//       label: "三元区"
//     }, {
//       value: "350421",
//       label: "明溪县"
//     }, {
//       value: "350423",
//       label: "清流县"
//     }, {
//       value: "350424",
//       label: "宁化县"
//     }, {
//       value: "350425",
//       label: "大田县"
//     }, {
//       value: "350426",
//       label: "尤溪县"
//     }, {
//       value: "350427",
//       label: "沙县"
//     }, {
//       value: "350428",
//       label: "将乐县"
//     }, {
//       value: "350429",
//       label: "泰宁县"
//     }, {
//       value: "350430",
//       label: "建宁县"
//     }, {
//       value: "350481",
//       label: "永安市"
//     }]
//   }, {
//     value: "3505",
//     label: "泉州市",
//     children: [{
//       value: "350502",
//       label: "鲤城区"
//     }, {
//       value: "350503",
//       label: "丰泽区"
//     }, {
//       value: "350504",
//       label: "洛江区"
//     }, {
//       value: "350505",
//       label: "泉港区"
//     }, {
//       value: "350521",
//       label: "惠安县"
//     }, {
//       value: "350524",
//       label: "安溪县"
//     }, {
//       value: "350525",
//       label: "永春县"
//     }, {
//       value: "350526",
//       label: "德化县"
//     }, {
//       value: "350527",
//       label: "金门县"
//     }, {
//       value: "350581",
//       label: "石狮市"
//     }, {
//       value: "350582",
//       label: "晋江市"
//     }, {
//       value: "350583",
//       label: "南安市"
//     }]
//   }, {
//     value: "3506",
//     label: "漳州市",
//     children: [{
//       value: "350602",
//       label: "芗城区"
//     }, {
//       value: "350603",
//       label: "龙文区"
//     }, {
//       value: "350622",
//       label: "云霄县"
//     }, {
//       value: "350623",
//       label: "漳浦县"
//     }, {
//       value: "350624",
//       label: "诏安县"
//     }, {
//       value: "350625",
//       label: "长泰县"
//     }, {
//       value: "350626",
//       label: "东山县"
//     }, {
//       value: "350627",
//       label: "南靖县"
//     }, {
//       value: "350628",
//       label: "平和县"
//     }, {
//       value: "350629",
//       label: "华安县"
//     }, {
//       value: "350681",
//       label: "龙海市"
//     }]
//   }, {
//     value: "3507",
//     label: "南平市",
//     children: [{
//       value: "350702",
//       label: "延平区"
//     }, {
//       value: "350703",
//       label: "建阳区"
//     }, {
//       value: "350721",
//       label: "顺昌县"
//     }, {
//       value: "350722",
//       label: "浦城县"
//     }, {
//       value: "350723",
//       label: "光泽县"
//     }, {
//       value: "350724",
//       label: "松溪县"
//     }, {
//       value: "350725",
//       label: "政和县"
//     }, {
//       value: "350781",
//       label: "邵武市"
//     }, {
//       value: "350782",
//       label: "武夷山市"
//     }, {
//       value: "350783",
//       label: "建瓯市"
//     }]
//   }, {
//     value: "3508",
//     label: "龙岩市",
//     children: [{
//       value: "350802",
//       label: "新罗区"
//     }, {
//       value: "350803",
//       label: "永定区"
//     }, {
//       value: "350821",
//       label: "长汀县"
//     }, {
//       value: "350823",
//       label: "上杭县"
//     }, {
//       value: "350824",
//       label: "武平县"
//     }, {
//       value: "350825",
//       label: "连城县"
//     }, {
//       value: "350881",
//       label: "漳平市"
//     }]
//   }, {
//     value: "3509",
//     label: "宁德市",
//     children: [{
//       value: "350902",
//       label: "蕉城区"
//     }, {
//       value: "350921",
//       label: "霞浦县"
//     }, {
//       value: "350922",
//       label: "古田县"
//     }, {
//       value: "350923",
//       label: "屏南县"
//     }, {
//       value: "350924",
//       label: "寿宁县"
//     }, {
//       value: "350925",
//       label: "周宁县"
//     }, {
//       value: "350926",
//       label: "柘荣县"
//     }, {
//       value: "350981",
//       label: "福安市"
//     }, {
//       value: "350982",
//       label: "福鼎市"
//     }]
//   }]
// }, {
//   value: "36",
//   label: "江西省",
//   children: [{
//     value: "3601",
//     label: "南昌市",
//     children: [{
//       value: "360102",
//       label: "东湖区"
//     }, {
//       value: "360103",
//       label: "西湖区"
//     }, {
//       value: "360104",
//       label: "青云谱区"
//     }, {
//       value: "360111",
//       label: "青山湖区"
//     }, {
//       value: "360112",
//       label: "新建区"
//     }, {
//       value: "360113",
//       label: "红谷滩区"
//     }, {
//       value: "360121",
//       label: "南昌县"
//     }, {
//       value: "360123",
//       label: "安义县"
//     }, {
//       value: "360124",
//       label: "进贤县"
//     }]
//   }, {
//     value: "3602",
//     label: "景德镇市",
//     children: [{
//       value: "360202",
//       label: "昌江区"
//     }, {
//       value: "360203",
//       label: "珠山区"
//     }, {
//       value: "360222",
//       label: "浮梁县"
//     }, {
//       value: "360281",
//       label: "乐平市"
//     }]
//   }, {
//     value: "3603",
//     label: "萍乡市",
//     children: [{
//       value: "360302",
//       label: "安源区"
//     }, {
//       value: "360313",
//       label: "湘东区"
//     }, {
//       value: "360321",
//       label: "莲花县"
//     }, {
//       value: "360322",
//       label: "上栗县"
//     }, {
//       value: "360323",
//       label: "芦溪县"
//     }]
//   }, {
//     value: "3604",
//     label: "九江市",
//     children: [{
//       value: "360402",
//       label: "濂溪区"
//     }, {
//       value: "360403",
//       label: "浔阳区"
//     }, {
//       value: "360404",
//       label: "柴桑区"
//     }, {
//       value: "360423",
//       label: "武宁县"
//     }, {
//       value: "360424",
//       label: "修水县"
//     }, {
//       value: "360425",
//       label: "永修县"
//     }, {
//       value: "360426",
//       label: "德安县"
//     }, {
//       value: "360428",
//       label: "都昌县"
//     }, {
//       value: "360429",
//       label: "湖口县"
//     }, {
//       value: "360430",
//       label: "彭泽县"
//     }, {
//       value: "360481",
//       label: "瑞昌市"
//     }, {
//       value: "360482",
//       label: "共青城市"
//     }, {
//       value: "360483",
//       label: "庐山市"
//     }]
//   }, {
//     value: "3605",
//     label: "新余市",
//     children: [{
//       value: "360502",
//       label: "渝水区"
//     }, {
//       value: "360521",
//       label: "分宜县"
//     }]
//   }, {
//     value: "3606",
//     label: "鹰潭市",
//     children: [{
//       value: "360602",
//       label: "月湖区"
//     }, {
//       value: "360603",
//       label: "余江区"
//     }, {
//       value: "360681",
//       label: "贵溪市"
//     }]
//   }, {
//     value: "3607",
//     label: "赣州市",
//     children: [{
//       value: "360702",
//       label: "章贡区"
//     }, {
//       value: "360703",
//       label: "南康区"
//     }, {
//       value: "360704",
//       label: "赣县区"
//     }, {
//       value: "360722",
//       label: "信丰县"
//     }, {
//       value: "360723",
//       label: "大余县"
//     }, {
//       value: "360724",
//       label: "上犹县"
//     }, {
//       value: "360725",
//       label: "崇义县"
//     }, {
//       value: "360726",
//       label: "安远县"
//     }, {
//       value: "360728",
//       label: "定南县"
//     }, {
//       value: "360729",
//       label: "全南县"
//     }, {
//       value: "360730",
//       label: "宁都县"
//     }, {
//       value: "360731",
//       label: "于都县"
//     }, {
//       value: "360732",
//       label: "兴国县"
//     }, {
//       value: "360733",
//       label: "会昌县"
//     }, {
//       value: "360734",
//       label: "寻乌县"
//     }, {
//       value: "360735",
//       label: "石城县"
//     }, {
//       value: "360781",
//       label: "瑞金市"
//     }, {
//       value: "360783",
//       label: "龙南市"
//     }]
//   }, {
//     value: "3608",
//     label: "吉安市",
//     children: [{
//       value: "360802",
//       label: "吉州区"
//     }, {
//       value: "360803",
//       label: "青原区"
//     }, {
//       value: "360821",
//       label: "吉安县"
//     }, {
//       value: "360822",
//       label: "吉水县"
//     }, {
//       value: "360823",
//       label: "峡江县"
//     }, {
//       value: "360824",
//       label: "新干县"
//     }, {
//       value: "360825",
//       label: "永丰县"
//     }, {
//       value: "360826",
//       label: "泰和县"
//     }, {
//       value: "360827",
//       label: "遂川县"
//     }, {
//       value: "360828",
//       label: "万安县"
//     }, {
//       value: "360829",
//       label: "安福县"
//     }, {
//       value: "360830",
//       label: "永新县"
//     }, {
//       value: "360881",
//       label: "井冈山市"
//     }]
//   }, {
//     value: "3609",
//     label: "宜春市",
//     children: [{
//       value: "360902",
//       label: "袁州区"
//     }, {
//       value: "360921",
//       label: "奉新县"
//     }, {
//       value: "360922",
//       label: "万载县"
//     }, {
//       value: "360923",
//       label: "上高县"
//     }, {
//       value: "360924",
//       label: "宜丰县"
//     }, {
//       value: "360925",
//       label: "靖安县"
//     }, {
//       value: "360926",
//       label: "铜鼓县"
//     }, {
//       value: "360981",
//       label: "丰城市"
//     }, {
//       value: "360982",
//       label: "樟树市"
//     }, {
//       value: "360983",
//       label: "高安市"
//     }]
//   }, {
//     value: "3610",
//     label: "抚州市",
//     children: [{
//       value: "361002",
//       label: "临川区"
//     }, {
//       value: "361003",
//       label: "东乡区"
//     }, {
//       value: "361021",
//       label: "南城县"
//     }, {
//       value: "361022",
//       label: "黎川县"
//     }, {
//       value: "361023",
//       label: "南丰县"
//     }, {
//       value: "361024",
//       label: "崇仁县"
//     }, {
//       value: "361025",
//       label: "乐安县"
//     }, {
//       value: "361026",
//       label: "宜黄县"
//     }, {
//       value: "361027",
//       label: "金溪县"
//     }, {
//       value: "361028",
//       label: "资溪县"
//     }, {
//       value: "361030",
//       label: "广昌县"
//     }]
//   }, {
//     value: "3611",
//     label: "上饶市",
//     children: [{
//       value: "361102",
//       label: "信州区"
//     }, {
//       value: "361103",
//       label: "广丰区"
//     }, {
//       value: "361104",
//       label: "广信区"
//     }, {
//       value: "361123",
//       label: "玉山县"
//     }, {
//       value: "361124",
//       label: "铅山县"
//     }, {
//       value: "361125",
//       label: "横峰县"
//     }, {
//       value: "361126",
//       label: "弋阳县"
//     }, {
//       value: "361127",
//       label: "余干县"
//     }, {
//       value: "361128",
//       label: "鄱阳县"
//     }, {
//       value: "361129",
//       label: "万年县"
//     }, {
//       value: "361130",
//       label: "婺源县"
//     }, {
//       value: "361181",
//       label: "德兴市"
//     }]
//   }]
// }, {
//   value: "37",
//   label: "山东省",
//   children: [{
//     value: "3701",
//     label: "济南市",
//     children: [{
//       value: "370102",
//       label: "历下区"
//     }, {
//       value: "370103",
//       label: "市中区"
//     }, {
//       value: "370104",
//       label: "槐荫区"
//     }, {
//       value: "370105",
//       label: "天桥区"
//     }, {
//       value: "370112",
//       label: "历城区"
//     }, {
//       value: "370113",
//       label: "长清区"
//     }, {
//       value: "370114",
//       label: "章丘区"
//     }, {
//       value: "370115",
//       label: "济阳区"
//     }, {
//       value: "370116",
//       label: "莱芜区"
//     }, {
//       value: "370117",
//       label: "钢城区"
//     }, {
//       value: "370124",
//       label: "平阴县"
//     }, {
//       value: "370126",
//       label: "商河县"
//     }, {
//       value: "370171",
//       label: "济南高新技术产业开发区"
//     }]
//   }, {
//     value: "3702",
//     label: "青岛市",
//     children: [{
//       value: "370202",
//       label: "市南区"
//     }, {
//       value: "370203",
//       label: "市北区"
//     }, {
//       value: "370211",
//       label: "黄岛区"
//     }, {
//       value: "370212",
//       label: "崂山区"
//     }, {
//       value: "370213",
//       label: "李沧区"
//     }, {
//       value: "370214",
//       label: "城阳区"
//     }, {
//       value: "370215",
//       label: "即墨区"
//     }, {
//       value: "370271",
//       label: "青岛高新技术产业开发区"
//     }, {
//       value: "370281",
//       label: "胶州市"
//     }, {
//       value: "370283",
//       label: "平度市"
//     }, {
//       value: "370285",
//       label: "莱西市"
//     }]
//   }, {
//     value: "3703",
//     label: "淄博市",
//     children: [{
//       value: "370302",
//       label: "淄川区"
//     }, {
//       value: "370303",
//       label: "张店区"
//     }, {
//       value: "370304",
//       label: "博山区"
//     }, {
//       value: "370305",
//       label: "临淄区"
//     }, {
//       value: "370306",
//       label: "周村区"
//     }, {
//       value: "370321",
//       label: "桓台县"
//     }, {
//       value: "370322",
//       label: "高青县"
//     }, {
//       value: "370323",
//       label: "沂源县"
//     }]
//   }, {
//     value: "3704",
//     label: "枣庄市",
//     children: [{
//       value: "370402",
//       label: "市中区"
//     }, {
//       value: "370403",
//       label: "薛城区"
//     }, {
//       value: "370404",
//       label: "峄城区"
//     }, {
//       value: "370405",
//       label: "台儿庄区"
//     }, {
//       value: "370406",
//       label: "山亭区"
//     }, {
//       value: "370481",
//       label: "滕州市"
//     }]
//   }, {
//     value: "3705",
//     label: "东营市",
//     children: [{
//       value: "370502",
//       label: "东营区"
//     }, {
//       value: "370503",
//       label: "河口区"
//     }, {
//       value: "370505",
//       label: "垦利区"
//     }, {
//       value: "370522",
//       label: "利津县"
//     }, {
//       value: "370523",
//       label: "广饶县"
//     }, {
//       value: "370571",
//       label: "东营经济技术开发区"
//     }, {
//       value: "370572",
//       label: "东营港经济开发区"
//     }]
//   }, {
//     value: "3706",
//     label: "烟台市",
//     children: [{
//       value: "370602",
//       label: "芝罘区"
//     }, {
//       value: "370611",
//       label: "福山区"
//     }, {
//       value: "370612",
//       label: "牟平区"
//     }, {
//       value: "370613",
//       label: "莱山区"
//     }, {
//       value: "370614",
//       label: "蓬莱区"
//     }, {
//       value: "370671",
//       label: "烟台高新技术产业开发区"
//     }, {
//       value: "370672",
//       label: "烟台经济技术开发区"
//     }, {
//       value: "370681",
//       label: "龙口市"
//     }, {
//       value: "370682",
//       label: "莱阳市"
//     }, {
//       value: "370683",
//       label: "莱州市"
//     }, {
//       value: "370685",
//       label: "招远市"
//     }, {
//       value: "370686",
//       label: "栖霞市"
//     }, {
//       value: "370687",
//       label: "海阳市"
//     }]
//   }, {
//     value: "3707",
//     label: "潍坊市",
//     children: [{
//       value: "370702",
//       label: "潍城区"
//     }, {
//       value: "370703",
//       label: "寒亭区"
//     }, {
//       value: "370704",
//       label: "坊子区"
//     }, {
//       value: "370705",
//       label: "奎文区"
//     }, {
//       value: "370724",
//       label: "临朐县"
//     }, {
//       value: "370725",
//       label: "昌乐县"
//     }, {
//       value: "370772",
//       label: "潍坊滨海经济技术开发区"
//     }, {
//       value: "370781",
//       label: "青州市"
//     }, {
//       value: "370782",
//       label: "诸城市"
//     }, {
//       value: "370783",
//       label: "寿光市"
//     }, {
//       value: "370784",
//       label: "安丘市"
//     }, {
//       value: "370785",
//       label: "高密市"
//     }, {
//       value: "370786",
//       label: "昌邑市"
//     }]
//   }, {
//     value: "3708",
//     label: "济宁市",
//     children: [{
//       value: "370811",
//       label: "任城区"
//     }, {
//       value: "370812",
//       label: "兖州区"
//     }, {
//       value: "370826",
//       label: "微山县"
//     }, {
//       value: "370827",
//       label: "鱼台县"
//     }, {
//       value: "370828",
//       label: "金乡县"
//     }, {
//       value: "370829",
//       label: "嘉祥县"
//     }, {
//       value: "370830",
//       label: "汶上县"
//     }, {
//       value: "370831",
//       label: "泗水县"
//     }, {
//       value: "370832",
//       label: "梁山县"
//     }, {
//       value: "370871",
//       label: "济宁高新技术产业开发区"
//     }, {
//       value: "370881",
//       label: "曲阜市"
//     }, {
//       value: "370883",
//       label: "邹城市"
//     }]
//   }, {
//     value: "3709",
//     label: "泰安市",
//     children: [{
//       value: "370902",
//       label: "泰山区"
//     }, {
//       value: "370911",
//       label: "岱岳区"
//     }, {
//       value: "370921",
//       label: "宁阳县"
//     }, {
//       value: "370923",
//       label: "东平县"
//     }, {
//       value: "370982",
//       label: "新泰市"
//     }, {
//       value: "370983",
//       label: "肥城市"
//     }]
//   }, {
//     value: "3710",
//     label: "威海市",
//     children: [{
//       value: "371002",
//       label: "环翠区"
//     }, {
//       value: "371003",
//       label: "文登区"
//     }, {
//       value: "371071",
//       label: "威海火炬高技术产业开发区"
//     }, {
//       value: "371072",
//       label: "威海经济技术开发区"
//     }, {
//       value: "371073",
//       label: "威海临港经济技术开发区"
//     }, {
//       value: "371082",
//       label: "荣成市"
//     }, {
//       value: "371083",
//       label: "乳山市"
//     }]
//   }, {
//     value: "3711",
//     label: "日照市",
//     children: [{
//       value: "371102",
//       label: "东港区"
//     }, {
//       value: "371103",
//       label: "岚山区"
//     }, {
//       value: "371121",
//       label: "五莲县"
//     }, {
//       value: "371122",
//       label: "莒县"
//     }, {
//       value: "371171",
//       label: "日照经济技术开发区"
//     }]
//   }, {
//     value: "3713",
//     label: "临沂市",
//     children: [{
//       value: "371302",
//       label: "兰山区"
//     }, {
//       value: "371311",
//       label: "罗庄区"
//     }, {
//       value: "371312",
//       label: "河东区"
//     }, {
//       value: "371321",
//       label: "沂南县"
//     }, {
//       value: "371322",
//       label: "郯城县"
//     }, {
//       value: "371323",
//       label: "沂水县"
//     }, {
//       value: "371324",
//       label: "兰陵县"
//     }, {
//       value: "371325",
//       label: "费县"
//     }, {
//       value: "371326",
//       label: "平邑县"
//     }, {
//       value: "371327",
//       label: "莒南县"
//     }, {
//       value: "371328",
//       label: "蒙阴县"
//     }, {
//       value: "371329",
//       label: "临沭县"
//     }, {
//       value: "371371",
//       label: "临沂高新技术产业开发区"
//     }]
//   }, {
//     value: "3714",
//     label: "德州市",
//     children: [{
//       value: "371402",
//       label: "德城区"
//     }, {
//       value: "371403",
//       label: "陵城区"
//     }, {
//       value: "371422",
//       label: "宁津县"
//     }, {
//       value: "371423",
//       label: "庆云县"
//     }, {
//       value: "371424",
//       label: "临邑县"
//     }, {
//       value: "371425",
//       label: "齐河县"
//     }, {
//       value: "371426",
//       label: "平原县"
//     }, {
//       value: "371427",
//       label: "夏津县"
//     }, {
//       value: "371428",
//       label: "武城县"
//     }, {
//       value: "371471",
//       label: "德州经济技术开发区"
//     }, {
//       value: "371472",
//       label: "德州运河经济开发区"
//     }, {
//       value: "371481",
//       label: "乐陵市"
//     }, {
//       value: "371482",
//       label: "禹城市"
//     }]
//   }, {
//     value: "3715",
//     label: "聊城市",
//     children: [{
//       value: "371502",
//       label: "东昌府区"
//     }, {
//       value: "371503",
//       label: "茌平区"
//     }, {
//       value: "371521",
//       label: "阳谷县"
//     }, {
//       value: "371522",
//       label: "莘县"
//     }, {
//       value: "371524",
//       label: "东阿县"
//     }, {
//       value: "371525",
//       label: "冠县"
//     }, {
//       value: "371526",
//       label: "高唐县"
//     }, {
//       value: "371581",
//       label: "临清市"
//     }]
//   }, {
//     value: "3716",
//     label: "滨州市",
//     children: [{
//       value: "371602",
//       label: "滨城区"
//     }, {
//       value: "371603",
//       label: "沾化区"
//     }, {
//       value: "371621",
//       label: "惠民县"
//     }, {
//       value: "371622",
//       label: "阳信县"
//     }, {
//       value: "371623",
//       label: "无棣县"
//     }, {
//       value: "371625",
//       label: "博兴县"
//     }, {
//       value: "371681",
//       label: "邹平市"
//     }]
//   }, {
//     value: "3717",
//     label: "菏泽市",
//     children: [{
//       value: "371702",
//       label: "牡丹区"
//     }, {
//       value: "371703",
//       label: "定陶区"
//     }, {
//       value: "371721",
//       label: "曹县"
//     }, {
//       value: "371722",
//       label: "单县"
//     }, {
//       value: "371723",
//       label: "成武县"
//     }, {
//       value: "371724",
//       label: "巨野县"
//     }, {
//       value: "371725",
//       label: "郓城县"
//     }, {
//       value: "371726",
//       label: "鄄城县"
//     }, {
//       value: "371728",
//       label: "东明县"
//     }, {
//       value: "371771",
//       label: "菏泽经济技术开发区"
//     }, {
//       value: "371772",
//       label: "菏泽高新技术开发区"
//     }]
//   }]
// }, {
//   value: "41",
//   label: "河南省",
//   children: [{
//     value: "4101",
//     label: "郑州市",
//     children: [{
//       value: "410102",
//       label: "中原区"
//     }, {
//       value: "410103",
//       label: "二七区"
//     }, {
//       value: "410104",
//       label: "管城回族区"
//     }, {
//       value: "410105",
//       label: "金水区"
//     }, {
//       value: "410106",
//       label: "上街区"
//     }, {
//       value: "410108",
//       label: "惠济区"
//     }, {
//       value: "410122",
//       label: "中牟县"
//     }, {
//       value: "410171",
//       label: "郑州经济技术开发区"
//     }, {
//       value: "410172",
//       label: "郑州高新技术产业开发区"
//     }, {
//       value: "410173",
//       label: "郑州航空港经济综合实验区"
//     }, {
//       value: "410181",
//       label: "巩义市"
//     }, {
//       value: "410182",
//       label: "荥阳市"
//     }, {
//       value: "410183",
//       label: "新密市"
//     }, {
//       value: "410184",
//       label: "新郑市"
//     }, {
//       value: "410185",
//       label: "登封市"
//     }]
//   }, {
//     value: "4102",
//     label: "开封市",
//     children: [{
//       value: "410202",
//       label: "龙亭区"
//     }, {
//       value: "410203",
//       label: "顺河回族区"
//     }, {
//       value: "410204",
//       label: "鼓楼区"
//     }, {
//       value: "410205",
//       label: "禹王台区"
//     }, {
//       value: "410212",
//       label: "祥符区"
//     }, {
//       value: "410221",
//       label: "杞县"
//     }, {
//       value: "410222",
//       label: "通许县"
//     }, {
//       value: "410223",
//       label: "尉氏县"
//     }, {
//       value: "410225",
//       label: "兰考县"
//     }]
//   }, {
//     value: "4103",
//     label: "洛阳市",
//     children: [{
//       value: "410302",
//       label: "老城区"
//     }, {
//       value: "410303",
//       label: "西工区"
//     }, {
//       value: "410304",
//       label: "瀍河回族区"
//     }, {
//       value: "410305",
//       label: "涧西区"
//     }, {
//       value: "410306",
//       label: "吉利区"
//     }, {
//       value: "410311",
//       label: "洛龙区"
//     }, {
//       value: "410322",
//       label: "孟津县"
//     }, {
//       value: "410323",
//       label: "新安县"
//     }, {
//       value: "410324",
//       label: "栾川县"
//     }, {
//       value: "410325",
//       label: "嵩县"
//     }, {
//       value: "410326",
//       label: "汝阳县"
//     }, {
//       value: "410327",
//       label: "宜阳县"
//     }, {
//       value: "410328",
//       label: "洛宁县"
//     }, {
//       value: "410329",
//       label: "伊川县"
//     }, {
//       value: "410371",
//       label: "洛阳高新技术产业开发区"
//     }, {
//       value: "410381",
//       label: "偃师市"
//     }]
//   }, {
//     value: "4104",
//     label: "平顶山市",
//     children: [{
//       value: "410402",
//       label: "新华区"
//     }, {
//       value: "410403",
//       label: "卫东区"
//     }, {
//       value: "410404",
//       label: "石龙区"
//     }, {
//       value: "410411",
//       label: "湛河区"
//     }, {
//       value: "410421",
//       label: "宝丰县"
//     }, {
//       value: "410422",
//       label: "叶县"
//     }, {
//       value: "410423",
//       label: "鲁山县"
//     }, {
//       value: "410425",
//       label: "郏县"
//     }, {
//       value: "410471",
//       label: "平顶山高新技术产业开发区"
//     }, {
//       value: "410472",
//       label: "平顶山市城乡一体化示范区"
//     }, {
//       value: "410481",
//       label: "舞钢市"
//     }, {
//       value: "410482",
//       label: "汝州市"
//     }]
//   }, {
//     value: "4105",
//     label: "安阳市",
//     children: [{
//       value: "410502",
//       label: "文峰区"
//     }, {
//       value: "410503",
//       label: "北关区"
//     }, {
//       value: "410505",
//       label: "殷都区"
//     }, {
//       value: "410506",
//       label: "龙安区"
//     }, {
//       value: "410522",
//       label: "安阳县"
//     }, {
//       value: "410523",
//       label: "汤阴县"
//     }, {
//       value: "410526",
//       label: "滑县"
//     }, {
//       value: "410527",
//       label: "内黄县"
//     }, {
//       value: "410571",
//       label: "安阳高新技术产业开发区"
//     }, {
//       value: "410581",
//       label: "林州市"
//     }]
//   }, {
//     value: "4106",
//     label: "鹤壁市",
//     children: [{
//       value: "410602",
//       label: "鹤山区"
//     }, {
//       value: "410603",
//       label: "山城区"
//     }, {
//       value: "410611",
//       label: "淇滨区"
//     }, {
//       value: "410621",
//       label: "浚县"
//     }, {
//       value: "410622",
//       label: "淇县"
//     }, {
//       value: "410671",
//       label: "鹤壁经济技术开发区"
//     }]
//   }, {
//     value: "4107",
//     label: "新乡市",
//     children: [{
//       value: "410702",
//       label: "红旗区"
//     }, {
//       value: "410703",
//       label: "卫滨区"
//     }, {
//       value: "410704",
//       label: "凤泉区"
//     }, {
//       value: "410711",
//       label: "牧野区"
//     }, {
//       value: "410721",
//       label: "新乡县"
//     }, {
//       value: "410724",
//       label: "获嘉县"
//     }, {
//       value: "410725",
//       label: "原阳县"
//     }, {
//       value: "410726",
//       label: "延津县"
//     }, {
//       value: "410727",
//       label: "封丘县"
//     }, {
//       value: "410771",
//       label: "新乡高新技术产业开发区"
//     }, {
//       value: "410772",
//       label: "新乡经济技术开发区"
//     }, {
//       value: "410773",
//       label: "新乡市平原城乡一体化示范区"
//     }, {
//       value: "410781",
//       label: "卫辉市"
//     }, {
//       value: "410782",
//       label: "辉县市"
//     }, {
//       value: "410783",
//       label: "长垣市"
//     }]
//   }, {
//     value: "4108",
//     label: "焦作市",
//     children: [{
//       value: "410802",
//       label: "解放区"
//     }, {
//       value: "410803",
//       label: "中站区"
//     }, {
//       value: "410804",
//       label: "马村区"
//     }, {
//       value: "410811",
//       label: "山阳区"
//     }, {
//       value: "410821",
//       label: "修武县"
//     }, {
//       value: "410822",
//       label: "博爱县"
//     }, {
//       value: "410823",
//       label: "武陟县"
//     }, {
//       value: "410825",
//       label: "温县"
//     }, {
//       value: "410871",
//       label: "焦作城乡一体化示范区"
//     }, {
//       value: "410882",
//       label: "沁阳市"
//     }, {
//       value: "410883",
//       label: "孟州市"
//     }]
//   }, {
//     value: "4109",
//     label: "濮阳市",
//     children: [{
//       value: "410902",
//       label: "华龙区"
//     }, {
//       value: "410922",
//       label: "清丰县"
//     }, {
//       value: "410923",
//       label: "南乐县"
//     }, {
//       value: "410926",
//       label: "范县"
//     }, {
//       value: "410927",
//       label: "台前县"
//     }, {
//       value: "410928",
//       label: "濮阳县"
//     }, {
//       value: "410971",
//       label: "河南濮阳工业园区"
//     }, {
//       value: "410972",
//       label: "濮阳经济技术开发区"
//     }]
//   }, {
//     value: "4110",
//     label: "许昌市",
//     children: [{
//       value: "411002",
//       label: "魏都区"
//     }, {
//       value: "411003",
//       label: "建安区"
//     }, {
//       value: "411024",
//       label: "鄢陵县"
//     }, {
//       value: "411025",
//       label: "襄城县"
//     }, {
//       value: "411071",
//       label: "许昌经济技术开发区"
//     }, {
//       value: "411081",
//       label: "禹州市"
//     }, {
//       value: "411082",
//       label: "长葛市"
//     }]
//   }, {
//     value: "4111",
//     label: "漯河市",
//     children: [{
//       value: "411102",
//       label: "源汇区"
//     }, {
//       value: "411103",
//       label: "郾城区"
//     }, {
//       value: "411104",
//       label: "召陵区"
//     }, {
//       value: "411121",
//       label: "舞阳县"
//     }, {
//       value: "411122",
//       label: "临颍县"
//     }, {
//       value: "411171",
//       label: "漯河经济技术开发区"
//     }]
//   }, {
//     value: "4112",
//     label: "三门峡市",
//     children: [{
//       value: "411202",
//       label: "湖滨区"
//     }, {
//       value: "411203",
//       label: "陕州区"
//     }, {
//       value: "411221",
//       label: "渑池县"
//     }, {
//       value: "411224",
//       label: "卢氏县"
//     }, {
//       value: "411271",
//       label: "河南三门峡经济开发区"
//     }, {
//       value: "411281",
//       label: "义马市"
//     }, {
//       value: "411282",
//       label: "灵宝市"
//     }]
//   }, {
//     value: "4113",
//     label: "南阳市",
//     children: [{
//       value: "411302",
//       label: "宛城区"
//     }, {
//       value: "411303",
//       label: "卧龙区"
//     }, {
//       value: "411321",
//       label: "南召县"
//     }, {
//       value: "411322",
//       label: "方城县"
//     }, {
//       value: "411323",
//       label: "西峡县"
//     }, {
//       value: "411324",
//       label: "镇平县"
//     }, {
//       value: "411325",
//       label: "内乡县"
//     }, {
//       value: "411326",
//       label: "淅川县"
//     }, {
//       value: "411327",
//       label: "社旗县"
//     }, {
//       value: "411328",
//       label: "唐河县"
//     }, {
//       value: "411329",
//       label: "新野县"
//     }, {
//       value: "411330",
//       label: "桐柏县"
//     }, {
//       value: "411371",
//       label: "南阳高新技术产业开发区"
//     }, {
//       value: "411372",
//       label: "南阳市城乡一体化示范区"
//     }, {
//       value: "411381",
//       label: "邓州市"
//     }]
//   }, {
//     value: "4114",
//     label: "商丘市",
//     children: [{
//       value: "411402",
//       label: "梁园区"
//     }, {
//       value: "411403",
//       label: "睢阳区"
//     }, {
//       value: "411421",
//       label: "民权县"
//     }, {
//       value: "411422",
//       label: "睢县"
//     }, {
//       value: "411423",
//       label: "宁陵县"
//     }, {
//       value: "411424",
//       label: "柘城县"
//     }, {
//       value: "411425",
//       label: "虞城县"
//     }, {
//       value: "411426",
//       label: "夏邑县"
//     }, {
//       value: "411471",
//       label: "豫东综合物流产业聚集区"
//     }, {
//       value: "411472",
//       label: "河南商丘经济开发区"
//     }, {
//       value: "411481",
//       label: "永城市"
//     }]
//   }, {
//     value: "4115",
//     label: "信阳市",
//     children: [{
//       value: "411502",
//       label: "浉河区"
//     }, {
//       value: "411503",
//       label: "平桥区"
//     }, {
//       value: "411521",
//       label: "罗山县"
//     }, {
//       value: "411522",
//       label: "光山县"
//     }, {
//       value: "411523",
//       label: "新县"
//     }, {
//       value: "411524",
//       label: "商城县"
//     }, {
//       value: "411525",
//       label: "固始县"
//     }, {
//       value: "411526",
//       label: "潢川县"
//     }, {
//       value: "411527",
//       label: "淮滨县"
//     }, {
//       value: "411528",
//       label: "息县"
//     }, {
//       value: "411571",
//       label: "信阳高新技术产业开发区"
//     }]
//   }, {
//     value: "4116",
//     label: "周口市",
//     children: [{
//       value: "411602",
//       label: "川汇区"
//     }, {
//       value: "411603",
//       label: "淮阳区"
//     }, {
//       value: "411621",
//       label: "扶沟县"
//     }, {
//       value: "411622",
//       label: "西华县"
//     }, {
//       value: "411623",
//       label: "商水县"
//     }, {
//       value: "411624",
//       label: "沈丘县"
//     }, {
//       value: "411625",
//       label: "郸城县"
//     }, {
//       value: "411627",
//       label: "太康县"
//     }, {
//       value: "411628",
//       label: "鹿邑县"
//     }, {
//       value: "411671",
//       label: "河南周口经济开发区"
//     }, {
//       value: "411681",
//       label: "项城市"
//     }]
//   }, {
//     value: "4117",
//     label: "驻马店市",
//     children: [{
//       value: "411702",
//       label: "驿城区"
//     }, {
//       value: "411721",
//       label: "西平县"
//     }, {
//       value: "411722",
//       label: "上蔡县"
//     }, {
//       value: "411723",
//       label: "平舆县"
//     }, {
//       value: "411724",
//       label: "正阳县"
//     }, {
//       value: "411725",
//       label: "确山县"
//     }, {
//       value: "411726",
//       label: "泌阳县"
//     }, {
//       value: "411727",
//       label: "汝南县"
//     }, {
//       value: "411728",
//       label: "遂平县"
//     }, {
//       value: "411729",
//       label: "新蔡县"
//     }, {
//       value: "411771",
//       label: "河南驻马店经济开发区"
//     }]
//   }, {
//     value: "4190",
//     label: "省直辖县级行政区划",
//     children: [{
//       value: "419001",
//       label: "济源市"
//     }]
//   }]
// }, {
//   value: "42",
//   label: "湖北省",
//   children: [{
//     value: "4201",
//     label: "武汉市",
//     children: [{
//       value: "420102",
//       label: "江岸区"
//     }, {
//       value: "420103",
//       label: "江汉区"
//     }, {
//       value: "420104",
//       label: "硚口区"
//     }, {
//       value: "420105",
//       label: "汉阳区"
//     }, {
//       value: "420106",
//       label: "武昌区"
//     }, {
//       value: "420107",
//       label: "青山区"
//     }, {
//       value: "420111",
//       label: "洪山区"
//     }, {
//       value: "420112",
//       label: "东西湖区"
//     }, {
//       value: "420113",
//       label: "汉南区"
//     }, {
//       value: "420114",
//       label: "蔡甸区"
//     }, {
//       value: "420115",
//       label: "江夏区"
//     }, {
//       value: "420116",
//       label: "黄陂区"
//     }, {
//       value: "420117",
//       label: "新洲区"
//     }]
//   }, {
//     value: "4202",
//     label: "黄石市",
//     children: [{
//       value: "420202",
//       label: "黄石港区"
//     }, {
//       value: "420203",
//       label: "西塞山区"
//     }, {
//       value: "420204",
//       label: "下陆区"
//     }, {
//       value: "420205",
//       label: "铁山区"
//     }, {
//       value: "420222",
//       label: "阳新县"
//     }, {
//       value: "420281",
//       label: "大冶市"
//     }]
//   }, {
//     value: "4203",
//     label: "十堰市",
//     children: [{
//       value: "420302",
//       label: "茅箭区"
//     }, {
//       value: "420303",
//       label: "张湾区"
//     }, {
//       value: "420304",
//       label: "郧阳区"
//     }, {
//       value: "420322",
//       label: "郧西县"
//     }, {
//       value: "420323",
//       label: "竹山县"
//     }, {
//       value: "420324",
//       label: "竹溪县"
//     }, {
//       value: "420325",
//       label: "房县"
//     }, {
//       value: "420381",
//       label: "丹江口市"
//     }]
//   }, {
//     value: "4205",
//     label: "宜昌市",
//     children: [{
//       value: "420502",
//       label: "西陵区"
//     }, {
//       value: "420503",
//       label: "伍家岗区"
//     }, {
//       value: "420504",
//       label: "点军区"
//     }, {
//       value: "420505",
//       label: "猇亭区"
//     }, {
//       value: "420506",
//       label: "夷陵区"
//     }, {
//       value: "420525",
//       label: "远安县"
//     }, {
//       value: "420526",
//       label: "兴山县"
//     }, {
//       value: "420527",
//       label: "秭归县"
//     }, {
//       value: "420528",
//       label: "长阳土家族自治县"
//     }, {
//       value: "420529",
//       label: "五峰土家族自治县"
//     }, {
//       value: "420581",
//       label: "宜都市"
//     }, {
//       value: "420582",
//       label: "当阳市"
//     }, {
//       value: "420583",
//       label: "枝江市"
//     }]
//   }, {
//     value: "4206",
//     label: "襄阳市",
//     children: [{
//       value: "420602",
//       label: "襄城区"
//     }, {
//       value: "420606",
//       label: "樊城区"
//     }, {
//       value: "420607",
//       label: "襄州区"
//     }, {
//       value: "420624",
//       label: "南漳县"
//     }, {
//       value: "420625",
//       label: "谷城县"
//     }, {
//       value: "420626",
//       label: "保康县"
//     }, {
//       value: "420682",
//       label: "老河口市"
//     }, {
//       value: "420683",
//       label: "枣阳市"
//     }, {
//       value: "420684",
//       label: "宜城市"
//     }]
//   }, {
//     value: "4207",
//     label: "鄂州市",
//     children: [{
//       value: "420702",
//       label: "梁子湖区"
//     }, {
//       value: "420703",
//       label: "华容区"
//     }, {
//       value: "420704",
//       label: "鄂城区"
//     }]
//   }, {
//     value: "4208",
//     label: "荆门市",
//     children: [{
//       value: "420802",
//       label: "东宝区"
//     }, {
//       value: "420804",
//       label: "掇刀区"
//     }, {
//       value: "420822",
//       label: "沙洋县"
//     }, {
//       value: "420881",
//       label: "钟祥市"
//     }, {
//       value: "420882",
//       label: "京山市"
//     }]
//   }, {
//     value: "4209",
//     label: "孝感市",
//     children: [{
//       value: "420902",
//       label: "孝南区"
//     }, {
//       value: "420921",
//       label: "孝昌县"
//     }, {
//       value: "420922",
//       label: "大悟县"
//     }, {
//       value: "420923",
//       label: "云梦县"
//     }, {
//       value: "420981",
//       label: "应城市"
//     }, {
//       value: "420982",
//       label: "安陆市"
//     }, {
//       value: "420984",
//       label: "汉川市"
//     }]
//   }, {
//     value: "4210",
//     label: "荆州市",
//     children: [{
//       value: "421002",
//       label: "沙市区"
//     }, {
//       value: "421003",
//       label: "荆州区"
//     }, {
//       value: "421022",
//       label: "公安县"
//     }, {
//       value: "421023",
//       label: "监利县"
//     }, {
//       value: "421024",
//       label: "江陵县"
//     }, {
//       value: "421071",
//       label: "荆州经济技术开发区"
//     }, {
//       value: "421081",
//       label: "石首市"
//     }, {
//       value: "421083",
//       label: "洪湖市"
//     }, {
//       value: "421087",
//       label: "松滋市"
//     }]
//   }, {
//     value: "4211",
//     label: "黄冈市",
//     children: [{
//       value: "421102",
//       label: "黄州区"
//     }, {
//       value: "421121",
//       label: "团风县"
//     }, {
//       value: "421122",
//       label: "红安县"
//     }, {
//       value: "421123",
//       label: "罗田县"
//     }, {
//       value: "421124",
//       label: "英山县"
//     }, {
//       value: "421125",
//       label: "浠水县"
//     }, {
//       value: "421126",
//       label: "蕲春县"
//     }, {
//       value: "421127",
//       label: "黄梅县"
//     }, {
//       value: "421171",
//       label: "龙感湖管理区"
//     }, {
//       value: "421181",
//       label: "麻城市"
//     }, {
//       value: "421182",
//       label: "武穴市"
//     }]
//   }, {
//     value: "4212",
//     label: "咸宁市",
//     children: [{
//       value: "421202",
//       label: "咸安区"
//     }, {
//       value: "421221",
//       label: "嘉鱼县"
//     }, {
//       value: "421222",
//       label: "通城县"
//     }, {
//       value: "421223",
//       label: "崇阳县"
//     }, {
//       value: "421224",
//       label: "通山县"
//     }, {
//       value: "421281",
//       label: "赤壁市"
//     }]
//   }, {
//     value: "4213",
//     label: "随州市",
//     children: [{
//       value: "421303",
//       label: "曾都区"
//     }, {
//       value: "421321",
//       label: "随县"
//     }, {
//       value: "421381",
//       label: "广水市"
//     }]
//   }, {
//     value: "4228",
//     label: "恩施土家族苗族自治州",
//     children: [{
//       value: "422801",
//       label: "恩施市"
//     }, {
//       value: "422802",
//       label: "利川市"
//     }, {
//       value: "422822",
//       label: "建始县"
//     }, {
//       value: "422823",
//       label: "巴东县"
//     }, {
//       value: "422825",
//       label: "宣恩县"
//     }, {
//       value: "422826",
//       label: "咸丰县"
//     }, {
//       value: "422827",
//       label: "来凤县"
//     }, {
//       value: "422828",
//       label: "鹤峰县"
//     }]
//   }, {
//     value: "4290",
//     label: "省直辖县级行政区划",
//     children: [{
//       value: "429004",
//       label: "仙桃市"
//     }, {
//       value: "429005",
//       label: "潜江市"
//     }, {
//       value: "429006",
//       label: "天门市"
//     }, {
//       value: "429021",
//       label: "神农架林区"
//     }]
//   }]
// }, {
//   value: "43",
//   label: "湖南省",
//   children: [{
//     value: "4301",
//     label: "长沙市",
//     children: [{
//       value: "430102",
//       label: "芙蓉区"
//     }, {
//       value: "430103",
//       label: "天心区"
//     }, {
//       value: "430104",
//       label: "岳麓区"
//     }, {
//       value: "430105",
//       label: "开福区"
//     }, {
//       value: "430111",
//       label: "雨花区"
//     }, {
//       value: "430112",
//       label: "望城区"
//     }, {
//       value: "430121",
//       label: "长沙县"
//     }, {
//       value: "430181",
//       label: "浏阳市"
//     }, {
//       value: "430182",
//       label: "宁乡市"
//     }]
//   }, {
//     value: "4302",
//     label: "株洲市",
//     children: [{
//       value: "430202",
//       label: "荷塘区"
//     }, {
//       value: "430203",
//       label: "芦淞区"
//     }, {
//       value: "430204",
//       label: "石峰区"
//     }, {
//       value: "430211",
//       label: "天元区"
//     }, {
//       value: "430212",
//       label: "渌口区"
//     }, {
//       value: "430223",
//       label: "攸县"
//     }, {
//       value: "430224",
//       label: "茶陵县"
//     }, {
//       value: "430225",
//       label: "炎陵县"
//     }, {
//       value: "430271",
//       label: "云龙示范区"
//     }, {
//       value: "430281",
//       label: "醴陵市"
//     }]
//   }, {
//     value: "4303",
//     label: "湘潭市",
//     children: [{
//       value: "430302",
//       label: "雨湖区"
//     }, {
//       value: "430304",
//       label: "岳塘区"
//     }, {
//       value: "430321",
//       label: "湘潭县"
//     }, {
//       value: "430371",
//       label: "湖南湘潭高新技术产业园区"
//     }, {
//       value: "430372",
//       label: "湘潭昭山示范区"
//     }, {
//       value: "430373",
//       label: "湘潭九华示范区"
//     }, {
//       value: "430381",
//       label: "湘乡市"
//     }, {
//       value: "430382",
//       label: "韶山市"
//     }]
//   }, {
//     value: "4304",
//     label: "衡阳市",
//     children: [{
//       value: "430405",
//       label: "珠晖区"
//     }, {
//       value: "430406",
//       label: "雁峰区"
//     }, {
//       value: "430407",
//       label: "石鼓区"
//     }, {
//       value: "430408",
//       label: "蒸湘区"
//     }, {
//       value: "430412",
//       label: "南岳区"
//     }, {
//       value: "430421",
//       label: "衡阳县"
//     }, {
//       value: "430422",
//       label: "衡南县"
//     }, {
//       value: "430423",
//       label: "衡山县"
//     }, {
//       value: "430424",
//       label: "衡东县"
//     }, {
//       value: "430426",
//       label: "祁东县"
//     }, {
//       value: "430471",
//       label: "衡阳综合保税区"
//     }, {
//       value: "430472",
//       label: "湖南衡阳高新技术产业园区"
//     }, {
//       value: "430473",
//       label: "湖南衡阳松木经济开发区"
//     }, {
//       value: "430481",
//       label: "耒阳市"
//     }, {
//       value: "430482",
//       label: "常宁市"
//     }]
//   }, {
//     value: "4305",
//     label: "邵阳市",
//     children: [{
//       value: "430502",
//       label: "双清区"
//     }, {
//       value: "430503",
//       label: "大祥区"
//     }, {
//       value: "430511",
//       label: "北塔区"
//     }, {
//       value: "430522",
//       label: "新邵县"
//     }, {
//       value: "430523",
//       label: "邵阳县"
//     }, {
//       value: "430524",
//       label: "隆回县"
//     }, {
//       value: "430525",
//       label: "洞口县"
//     }, {
//       value: "430527",
//       label: "绥宁县"
//     }, {
//       value: "430528",
//       label: "新宁县"
//     }, {
//       value: "430529",
//       label: "城步苗族自治县"
//     }, {
//       value: "430581",
//       label: "武冈市"
//     }, {
//       value: "430582",
//       label: "邵东市"
//     }]
//   }, {
//     value: "4306",
//     label: "岳阳市",
//     children: [{
//       value: "430602",
//       label: "岳阳楼区"
//     }, {
//       value: "430603",
//       label: "云溪区"
//     }, {
//       value: "430611",
//       label: "君山区"
//     }, {
//       value: "430621",
//       label: "岳阳县"
//     }, {
//       value: "430623",
//       label: "华容县"
//     }, {
//       value: "430624",
//       label: "湘阴县"
//     }, {
//       value: "430626",
//       label: "平江县"
//     }, {
//       value: "430671",
//       label: "岳阳市屈原管理区"
//     }, {
//       value: "430681",
//       label: "汨罗市"
//     }, {
//       value: "430682",
//       label: "临湘市"
//     }]
//   }, {
//     value: "4307",
//     label: "常德市",
//     children: [{
//       value: "430702",
//       label: "武陵区"
//     }, {
//       value: "430703",
//       label: "鼎城区"
//     }, {
//       value: "430721",
//       label: "安乡县"
//     }, {
//       value: "430722",
//       label: "汉寿县"
//     }, {
//       value: "430723",
//       label: "澧县"
//     }, {
//       value: "430724",
//       label: "临澧县"
//     }, {
//       value: "430725",
//       label: "桃源县"
//     }, {
//       value: "430726",
//       label: "石门县"
//     }, {
//       value: "430771",
//       label: "常德市西洞庭管理区"
//     }, {
//       value: "430781",
//       label: "津市市"
//     }]
//   }, {
//     value: "4308",
//     label: "张家界市",
//     children: [{
//       value: "430802",
//       label: "永定区"
//     }, {
//       value: "430811",
//       label: "武陵源区"
//     }, {
//       value: "430821",
//       label: "慈利县"
//     }, {
//       value: "430822",
//       label: "桑植县"
//     }]
//   }, {
//     value: "4309",
//     label: "益阳市",
//     children: [{
//       value: "430902",
//       label: "资阳区"
//     }, {
//       value: "430903",
//       label: "赫山区"
//     }, {
//       value: "430921",
//       label: "南县"
//     }, {
//       value: "430922",
//       label: "桃江县"
//     }, {
//       value: "430923",
//       label: "安化县"
//     }, {
//       value: "430971",
//       label: "益阳市大通湖管理区"
//     }, {
//       value: "430972",
//       label: "湖南益阳高新技术产业园区"
//     }, {
//       value: "430981",
//       label: "沅江市"
//     }]
//   }, {
//     value: "4310",
//     label: "郴州市",
//     children: [{
//       value: "431002",
//       label: "北湖区"
//     }, {
//       value: "431003",
//       label: "苏仙区"
//     }, {
//       value: "431021",
//       label: "桂阳县"
//     }, {
//       value: "431022",
//       label: "宜章县"
//     }, {
//       value: "431023",
//       label: "永兴县"
//     }, {
//       value: "431024",
//       label: "嘉禾县"
//     }, {
//       value: "431025",
//       label: "临武县"
//     }, {
//       value: "431026",
//       label: "汝城县"
//     }, {
//       value: "431027",
//       label: "桂东县"
//     }, {
//       value: "431028",
//       label: "安仁县"
//     }, {
//       value: "431081",
//       label: "资兴市"
//     }]
//   }, {
//     value: "4311",
//     label: "永州市",
//     children: [{
//       value: "431102",
//       label: "零陵区"
//     }, {
//       value: "431103",
//       label: "冷水滩区"
//     }, {
//       value: "431121",
//       label: "祁阳县"
//     }, {
//       value: "431122",
//       label: "东安县"
//     }, {
//       value: "431123",
//       label: "双牌县"
//     }, {
//       value: "431124",
//       label: "道县"
//     }, {
//       value: "431125",
//       label: "江永县"
//     }, {
//       value: "431126",
//       label: "宁远县"
//     }, {
//       value: "431127",
//       label: "蓝山县"
//     }, {
//       value: "431128",
//       label: "新田县"
//     }, {
//       value: "431129",
//       label: "江华瑶族自治县"
//     }, {
//       value: "431171",
//       label: "永州经济技术开发区"
//     }, {
//       value: "431172",
//       label: "永州市金洞管理区"
//     }, {
//       value: "431173",
//       label: "永州市回龙圩管理区"
//     }]
//   }, {
//     value: "4312",
//     label: "怀化市",
//     children: [{
//       value: "431202",
//       label: "鹤城区"
//     }, {
//       value: "431221",
//       label: "中方县"
//     }, {
//       value: "431222",
//       label: "沅陵县"
//     }, {
//       value: "431223",
//       label: "辰溪县"
//     }, {
//       value: "431224",
//       label: "溆浦县"
//     }, {
//       value: "431225",
//       label: "会同县"
//     }, {
//       value: "431226",
//       label: "麻阳苗族自治县"
//     }, {
//       value: "431227",
//       label: "新晃侗族自治县"
//     }, {
//       value: "431228",
//       label: "芷江侗族自治县"
//     }, {
//       value: "431229",
//       label: "靖州苗族侗族自治县"
//     }, {
//       value: "431230",
//       label: "通道侗族自治县"
//     }, {
//       value: "431271",
//       label: "怀化市洪江管理区"
//     }, {
//       value: "431281",
//       label: "洪江市"
//     }]
//   }, {
//     value: "4313",
//     label: "娄底市",
//     children: [{
//       value: "431302",
//       label: "娄星区"
//     }, {
//       value: "431321",
//       label: "双峰县"
//     }, {
//       value: "431322",
//       label: "新化县"
//     }, {
//       value: "431381",
//       label: "冷水江市"
//     }, {
//       value: "431382",
//       label: "涟源市"
//     }]
//   }, {
//     value: "4331",
//     label: "湘西土家族苗族自治州",
//     children: [{
//       value: "433101",
//       label: "吉首市"
//     }, {
//       value: "433122",
//       label: "泸溪县"
//     }, {
//       value: "433123",
//       label: "凤凰县"
//     }, {
//       value: "433124",
//       label: "花垣县"
//     }, {
//       value: "433125",
//       label: "保靖县"
//     }, {
//       value: "433126",
//       label: "古丈县"
//     }, {
//       value: "433127",
//       label: "永顺县"
//     }, {
//       value: "433130",
//       label: "龙山县"
//     }]
//   }]
// }, {
//   value: "44",
//   label: "广东省",
//   children: [{
//     value: "4401",
//     label: "广州市",
//     children: [{
//       value: "440103",
//       label: "荔湾区"
//     }, {
//       value: "440104",
//       label: "越秀区"
//     }, {
//       value: "440105",
//       label: "海珠区"
//     }, {
//       value: "440106",
//       label: "天河区"
//     }, {
//       value: "440111",
//       label: "白云区"
//     }, {
//       value: "440112",
//       label: "黄埔区"
//     }, {
//       value: "440113",
//       label: "番禺区"
//     }, {
//       value: "440114",
//       label: "花都区"
//     }, {
//       value: "440115",
//       label: "南沙区"
//     }, {
//       value: "440117",
//       label: "从化区"
//     }, {
//       value: "440118",
//       label: "增城区"
//     }]
//   }, {
//     value: "4402",
//     label: "韶关市",
//     children: [{
//       value: "440203",
//       label: "武江区"
//     }, {
//       value: "440204",
//       label: "浈江区"
//     }, {
//       value: "440205",
//       label: "曲江区"
//     }, {
//       value: "440222",
//       label: "始兴县"
//     }, {
//       value: "440224",
//       label: "仁化县"
//     }, {
//       value: "440229",
//       label: "翁源县"
//     }, {
//       value: "440232",
//       label: "乳源瑶族自治县"
//     }, {
//       value: "440233",
//       label: "新丰县"
//     }, {
//       value: "440281",
//       label: "乐昌市"
//     }, {
//       value: "440282",
//       label: "南雄市"
//     }]
//   }, {
//     value: "4403",
//     label: "深圳市",
//     children: [{
//       value: "440303",
//       label: "罗湖区"
//     }, {
//       value: "440304",
//       label: "福田区"
//     }, {
//       value: "440305",
//       label: "南山区"
//     }, {
//       value: "440306",
//       label: "宝安区"
//     }, {
//       value: "440307",
//       label: "龙岗区"
//     }, {
//       value: "440308",
//       label: "盐田区"
//     }, {
//       value: "440309",
//       label: "龙华区"
//     }, {
//       value: "440310",
//       label: "坪山区"
//     }, {
//       value: "440311",
//       label: "光明区"
//     }]
//   }, {
//     value: "4404",
//     label: "珠海市",
//     children: [{
//       value: "440402",
//       label: "香洲区"
//     }, {
//       value: "440403",
//       label: "斗门区"
//     }, {
//       value: "440404",
//       label: "金湾区"
//     }]
//   }, {
//     value: "4405",
//     label: "汕头市",
//     children: [{
//       value: "440507",
//       label: "龙湖区"
//     }, {
//       value: "440511",
//       label: "金平区"
//     }, {
//       value: "440512",
//       label: "濠江区"
//     }, {
//       value: "440513",
//       label: "潮阳区"
//     }, {
//       value: "440514",
//       label: "潮南区"
//     }, {
//       value: "440515",
//       label: "澄海区"
//     }, {
//       value: "440523",
//       label: "南澳县"
//     }]
//   }, {
//     value: "4406",
//     label: "佛山市",
//     children: [{
//       value: "440604",
//       label: "禅城区"
//     }, {
//       value: "440605",
//       label: "南海区"
//     }, {
//       value: "440606",
//       label: "顺德区"
//     }, {
//       value: "440607",
//       label: "三水区"
//     }, {
//       value: "440608",
//       label: "高明区"
//     }]
//   }, {
//     value: "4407",
//     label: "江门市",
//     children: [{
//       value: "440703",
//       label: "蓬江区"
//     }, {
//       value: "440704",
//       label: "江海区"
//     }, {
//       value: "440705",
//       label: "新会区"
//     }, {
//       value: "440781",
//       label: "台山市"
//     }, {
//       value: "440783",
//       label: "开平市"
//     }, {
//       value: "440784",
//       label: "鹤山市"
//     }, {
//       value: "440785",
//       label: "恩平市"
//     }]
//   }, {
//     value: "4408",
//     label: "湛江市",
//     children: [{
//       value: "440802",
//       label: "赤坎区"
//     }, {
//       value: "440803",
//       label: "霞山区"
//     }, {
//       value: "440804",
//       label: "坡头区"
//     }, {
//       value: "440811",
//       label: "麻章区"
//     }, {
//       value: "440823",
//       label: "遂溪县"
//     }, {
//       value: "440825",
//       label: "徐闻县"
//     }, {
//       value: "440881",
//       label: "廉江市"
//     }, {
//       value: "440882",
//       label: "雷州市"
//     }, {
//       value: "440883",
//       label: "吴川市"
//     }]
//   }, {
//     value: "4409",
//     label: "茂名市",
//     children: [{
//       value: "440902",
//       label: "茂南区"
//     }, {
//       value: "440904",
//       label: "电白区"
//     }, {
//       value: "440981",
//       label: "高州市"
//     }, {
//       value: "440982",
//       label: "化州市"
//     }, {
//       value: "440983",
//       label: "信宜市"
//     }]
//   }, {
//     value: "4412",
//     label: "肇庆市",
//     children: [{
//       value: "441202",
//       label: "端州区"
//     }, {
//       value: "441203",
//       label: "鼎湖区"
//     }, {
//       value: "441204",
//       label: "高要区"
//     }, {
//       value: "441223",
//       label: "广宁县"
//     }, {
//       value: "441224",
//       label: "怀集县"
//     }, {
//       value: "441225",
//       label: "封开县"
//     }, {
//       value: "441226",
//       label: "德庆县"
//     }, {
//       value: "441284",
//       label: "四会市"
//     }]
//   }, {
//     value: "4413",
//     label: "惠州市",
//     children: [{
//       value: "441302",
//       label: "惠城区"
//     }, {
//       value: "441303",
//       label: "惠阳区"
//     }, {
//       value: "441322",
//       label: "博罗县"
//     }, {
//       value: "441323",
//       label: "惠东县"
//     }, {
//       value: "441324",
//       label: "龙门县"
//     }]
//   }, {
//     value: "4414",
//     label: "梅州市",
//     children: [{
//       value: "441402",
//       label: "梅江区"
//     }, {
//       value: "441403",
//       label: "梅县区"
//     }, {
//       value: "441422",
//       label: "大埔县"
//     }, {
//       value: "441423",
//       label: "丰顺县"
//     }, {
//       value: "441424",
//       label: "五华县"
//     }, {
//       value: "441426",
//       label: "平远县"
//     }, {
//       value: "441427",
//       label: "蕉岭县"
//     }, {
//       value: "441481",
//       label: "兴宁市"
//     }]
//   }, {
//     value: "4415",
//     label: "汕尾市",
//     children: [{
//       value: "441502",
//       label: "城区"
//     }, {
//       value: "441521",
//       label: "海丰县"
//     }, {
//       value: "441523",
//       label: "陆河县"
//     }, {
//       value: "441581",
//       label: "陆丰市"
//     }]
//   }, {
//     value: "4416",
//     label: "河源市",
//     children: [{
//       value: "441602",
//       label: "源城区"
//     }, {
//       value: "441621",
//       label: "紫金县"
//     }, {
//       value: "441622",
//       label: "龙川县"
//     }, {
//       value: "441623",
//       label: "连平县"
//     }, {
//       value: "441624",
//       label: "和平县"
//     }, {
//       value: "441625",
//       label: "东源县"
//     }]
//   }, {
//     value: "4417",
//     label: "阳江市",
//     children: [{
//       value: "441702",
//       label: "江城区"
//     }, {
//       value: "441704",
//       label: "阳东区"
//     }, {
//       value: "441721",
//       label: "阳西县"
//     }, {
//       value: "441781",
//       label: "阳春市"
//     }]
//   }, {
//     value: "4418",
//     label: "清远市",
//     children: [{
//       value: "441802",
//       label: "清城区"
//     }, {
//       value: "441803",
//       label: "清新区"
//     }, {
//       value: "441821",
//       label: "佛冈县"
//     }, {
//       value: "441823",
//       label: "阳山县"
//     }, {
//       value: "441825",
//       label: "连山壮族瑶族自治县"
//     }, {
//       value: "441826",
//       label: "连南瑶族自治县"
//     }, {
//       value: "441881",
//       label: "英德市"
//     }, {
//       value: "441882",
//       label: "连州市"
//     }]
//   }, {
//     value: "4419",
//     label: "东莞市",
//     children: [{
//       value: "441900003",
//       label: "东城街道"
//     }, {
//       value: "441900004",
//       label: "南城街道"
//     }, {
//       value: "441900005",
//       label: "万江街道"
//     }, {
//       value: "441900006",
//       label: "莞城街道"
//     }, {
//       value: "441900101",
//       label: "石碣镇"
//     }, {
//       value: "441900102",
//       label: "石龙镇"
//     }, {
//       value: "441900103",
//       label: "茶山镇"
//     }, {
//       value: "441900104",
//       label: "石排镇"
//     }, {
//       value: "441900105",
//       label: "企石镇"
//     }, {
//       value: "441900106",
//       label: "横沥镇"
//     }, {
//       value: "441900107",
//       label: "桥头镇"
//     }, {
//       value: "441900108",
//       label: "谢岗镇"
//     }, {
//       value: "441900109",
//       label: "东坑镇"
//     }, {
//       value: "441900110",
//       label: "常平镇"
//     }, {
//       value: "441900111",
//       label: "寮步镇"
//     }, {
//       value: "441900112",
//       label: "樟木头镇"
//     }, {
//       value: "441900113",
//       label: "大朗镇"
//     }, {
//       value: "441900114",
//       label: "黄江镇"
//     }, {
//       value: "441900115",
//       label: "清溪镇"
//     }, {
//       value: "441900116",
//       label: "塘厦镇"
//     }, {
//       value: "441900117",
//       label: "凤岗镇"
//     }, {
//       value: "441900118",
//       label: "大岭山镇"
//     }, {
//       value: "441900119",
//       label: "长安镇"
//     }, {
//       value: "441900121",
//       label: "虎门镇"
//     }, {
//       value: "441900122",
//       label: "厚街镇"
//     }, {
//       value: "441900123",
//       label: "沙田镇"
//     }, {
//       value: "441900124",
//       label: "道滘镇"
//     }, {
//       value: "441900125",
//       label: "洪梅镇"
//     }, {
//       value: "441900126",
//       label: "麻涌镇"
//     }, {
//       value: "441900127",
//       label: "望牛墩镇"
//     }, {
//       value: "441900128",
//       label: "中堂镇"
//     }, {
//       value: "441900129",
//       label: "高埗镇"
//     }, {
//       value: "441900401",
//       label: "松山湖"
//     }, {
//       value: "441900402",
//       label: "东莞港"
//     }, {
//       value: "441900403",
//       label: "东莞生态园"
//     }]
//   }, {
//     value: "4420",
//     label: "中山市",
//     children: [{
//       value: "442000001",
//       label: "石岐街道"
//     }, {
//       value: "442000002",
//       label: "东区街道"
//     }, {
//       value: "442000003",
//       label: "中山港街道"
//     }, {
//       value: "442000004",
//       label: "西区街道"
//     }, {
//       value: "442000005",
//       label: "南区街道"
//     }, {
//       value: "442000006",
//       label: "五桂山街道"
//     }, {
//       value: "442000100",
//       label: "小榄镇"
//     }, {
//       value: "442000101",
//       label: "黄圃镇"
//     }, {
//       value: "442000102",
//       label: "民众镇"
//     }, {
//       value: "442000103",
//       label: "东凤镇"
//     }, {
//       value: "442000104",
//       label: "东升镇"
//     }, {
//       value: "442000105",
//       label: "古镇镇"
//     }, {
//       value: "442000106",
//       label: "沙溪镇"
//     }, {
//       value: "442000107",
//       label: "坦洲镇"
//     }, {
//       value: "442000108",
//       label: "港口镇"
//     }, {
//       value: "442000109",
//       label: "三角镇"
//     }, {
//       value: "442000110",
//       label: "横栏镇"
//     }, {
//       value: "442000111",
//       label: "南头镇"
//     }, {
//       value: "442000112",
//       label: "阜沙镇"
//     }, {
//       value: "442000113",
//       label: "南朗镇"
//     }, {
//       value: "442000114",
//       label: "三乡镇"
//     }, {
//       value: "442000115",
//       label: "板芙镇"
//     }, {
//       value: "442000116",
//       label: "大涌镇"
//     }, {
//       value: "442000117",
//       label: "神湾镇"
//     }]
//   }, {
//     value: "4451",
//     label: "潮州市",
//     children: [{
//       value: "445102",
//       label: "湘桥区"
//     }, {
//       value: "445103",
//       label: "潮安区"
//     }, {
//       value: "445122",
//       label: "饶平县"
//     }]
//   }, {
//     value: "4452",
//     label: "揭阳市",
//     children: [{
//       value: "445202",
//       label: "榕城区"
//     }, {
//       value: "445203",
//       label: "揭东区"
//     }, {
//       value: "445222",
//       label: "揭西县"
//     }, {
//       value: "445224",
//       label: "惠来县"
//     }, {
//       value: "445281",
//       label: "普宁市"
//     }]
//   }, {
//     value: "4453",
//     label: "云浮市",
//     children: [{
//       value: "445302",
//       label: "云城区"
//     }, {
//       value: "445303",
//       label: "云安区"
//     }, {
//       value: "445321",
//       label: "新兴县"
//     }, {
//       value: "445322",
//       label: "郁南县"
//     }, {
//       value: "445381",
//       label: "罗定市"
//     }]
//   }]
// }, {
//   value: "45",
//   label: "广西壮族自治区",
//   children: [{
//     value: "4501",
//     label: "南宁市",
//     children: [{
//       value: "450102",
//       label: "兴宁区"
//     }, {
//       value: "450103",
//       label: "青秀区"
//     }, {
//       value: "450105",
//       label: "江南区"
//     }, {
//       value: "450107",
//       label: "西乡塘区"
//     }, {
//       value: "450108",
//       label: "良庆区"
//     }, {
//       value: "450109",
//       label: "邕宁区"
//     }, {
//       value: "450110",
//       label: "武鸣区"
//     }, {
//       value: "450123",
//       label: "隆安县"
//     }, {
//       value: "450124",
//       label: "马山县"
//     }, {
//       value: "450125",
//       label: "上林县"
//     }, {
//       value: "450126",
//       label: "宾阳县"
//     }, {
//       value: "450127",
//       label: "横县"
//     }]
//   }, {
//     value: "4502",
//     label: "柳州市",
//     children: [{
//       value: "450202",
//       label: "城中区"
//     }, {
//       value: "450203",
//       label: "鱼峰区"
//     }, {
//       value: "450204",
//       label: "柳南区"
//     }, {
//       value: "450205",
//       label: "柳北区"
//     }, {
//       value: "450206",
//       label: "柳江区"
//     }, {
//       value: "450222",
//       label: "柳城县"
//     }, {
//       value: "450223",
//       label: "鹿寨县"
//     }, {
//       value: "450224",
//       label: "融安县"
//     }, {
//       value: "450225",
//       label: "融水苗族自治县"
//     }, {
//       value: "450226",
//       label: "三江侗族自治县"
//     }]
//   }, {
//     value: "4503",
//     label: "桂林市",
//     children: [{
//       value: "450302",
//       label: "秀峰区"
//     }, {
//       value: "450303",
//       label: "叠彩区"
//     }, {
//       value: "450304",
//       label: "象山区"
//     }, {
//       value: "450305",
//       label: "七星区"
//     }, {
//       value: "450311",
//       label: "雁山区"
//     }, {
//       value: "450312",
//       label: "临桂区"
//     }, {
//       value: "450321",
//       label: "阳朔县"
//     }, {
//       value: "450323",
//       label: "灵川县"
//     }, {
//       value: "450324",
//       label: "全州县"
//     }, {
//       value: "450325",
//       label: "兴安县"
//     }, {
//       value: "450326",
//       label: "永福县"
//     }, {
//       value: "450327",
//       label: "灌阳县"
//     }, {
//       value: "450328",
//       label: "龙胜各族自治县"
//     }, {
//       value: "450329",
//       label: "资源县"
//     }, {
//       value: "450330",
//       label: "平乐县"
//     }, {
//       value: "450332",
//       label: "恭城瑶族自治县"
//     }, {
//       value: "450381",
//       label: "荔浦市"
//     }]
//   }, {
//     value: "4504",
//     label: "梧州市",
//     children: [{
//       value: "450403",
//       label: "万秀区"
//     }, {
//       value: "450405",
//       label: "长洲区"
//     }, {
//       value: "450406",
//       label: "龙圩区"
//     }, {
//       value: "450421",
//       label: "苍梧县"
//     }, {
//       value: "450422",
//       label: "藤县"
//     }, {
//       value: "450423",
//       label: "蒙山县"
//     }, {
//       value: "450481",
//       label: "岑溪市"
//     }]
//   }, {
//     value: "4505",
//     label: "北海市",
//     children: [{
//       value: "450502",
//       label: "海城区"
//     }, {
//       value: "450503",
//       label: "银海区"
//     }, {
//       value: "450512",
//       label: "铁山港区"
//     }, {
//       value: "450521",
//       label: "合浦县"
//     }]
//   }, {
//     value: "4506",
//     label: "防城港市",
//     children: [{
//       value: "450602",
//       label: "港口区"
//     }, {
//       value: "450603",
//       label: "防城区"
//     }, {
//       value: "450621",
//       label: "上思县"
//     }, {
//       value: "450681",
//       label: "东兴市"
//     }]
//   }, {
//     value: "4507",
//     label: "钦州市",
//     children: [{
//       value: "450702",
//       label: "钦南区"
//     }, {
//       value: "450703",
//       label: "钦北区"
//     }, {
//       value: "450721",
//       label: "灵山县"
//     }, {
//       value: "450722",
//       label: "浦北县"
//     }]
//   }, {
//     value: "4508",
//     label: "贵港市",
//     children: [{
//       value: "450802",
//       label: "港北区"
//     }, {
//       value: "450803",
//       label: "港南区"
//     }, {
//       value: "450804",
//       label: "覃塘区"
//     }, {
//       value: "450821",
//       label: "平南县"
//     }, {
//       value: "450881",
//       label: "桂平市"
//     }]
//   }, {
//     value: "4509",
//     label: "玉林市",
//     children: [{
//       value: "450902",
//       label: "玉州区"
//     }, {
//       value: "450903",
//       label: "福绵区"
//     }, {
//       value: "450921",
//       label: "容县"
//     }, {
//       value: "450922",
//       label: "陆川县"
//     }, {
//       value: "450923",
//       label: "博白县"
//     }, {
//       value: "450924",
//       label: "兴业县"
//     }, {
//       value: "450981",
//       label: "北流市"
//     }]
//   }, {
//     value: "4510",
//     label: "百色市",
//     children: [{
//       value: "451002",
//       label: "右江区"
//     }, {
//       value: "451003",
//       label: "田阳区"
//     }, {
//       value: "451022",
//       label: "田东县"
//     }, {
//       value: "451024",
//       label: "德保县"
//     }, {
//       value: "451026",
//       label: "那坡县"
//     }, {
//       value: "451027",
//       label: "凌云县"
//     }, {
//       value: "451028",
//       label: "乐业县"
//     }, {
//       value: "451029",
//       label: "田林县"
//     }, {
//       value: "451030",
//       label: "西林县"
//     }, {
//       value: "451031",
//       label: "隆林各族自治县"
//     }, {
//       value: "451081",
//       label: "靖西市"
//     }, {
//       value: "451082",
//       label: "平果市"
//     }]
//   }, {
//     value: "4511",
//     label: "贺州市",
//     children: [{
//       value: "451102",
//       label: "八步区"
//     }, {
//       value: "451103",
//       label: "平桂区"
//     }, {
//       value: "451121",
//       label: "昭平县"
//     }, {
//       value: "451122",
//       label: "钟山县"
//     }, {
//       value: "451123",
//       label: "富川瑶族自治县"
//     }]
//   }, {
//     value: "4512",
//     label: "河池市",
//     children: [{
//       value: "451202",
//       label: "金城江区"
//     }, {
//       value: "451203",
//       label: "宜州区"
//     }, {
//       value: "451221",
//       label: "南丹县"
//     }, {
//       value: "451222",
//       label: "天峨县"
//     }, {
//       value: "451223",
//       label: "凤山县"
//     }, {
//       value: "451224",
//       label: "东兰县"
//     }, {
//       value: "451225",
//       label: "罗城仫佬族自治县"
//     }, {
//       value: "451226",
//       label: "环江毛南族自治县"
//     }, {
//       value: "451227",
//       label: "巴马瑶族自治县"
//     }, {
//       value: "451228",
//       label: "都安瑶族自治县"
//     }, {
//       value: "451229",
//       label: "大化瑶族自治县"
//     }]
//   }, {
//     value: "4513",
//     label: "来宾市",
//     children: [{
//       value: "451302",
//       label: "兴宾区"
//     }, {
//       value: "451321",
//       label: "忻城县"
//     }, {
//       value: "451322",
//       label: "象州县"
//     }, {
//       value: "451323",
//       label: "武宣县"
//     }, {
//       value: "451324",
//       label: "金秀瑶族自治县"
//     }, {
//       value: "451381",
//       label: "合山市"
//     }]
//   }, {
//     value: "4514",
//     label: "崇左市",
//     children: [{
//       value: "451402",
//       label: "江州区"
//     }, {
//       value: "451421",
//       label: "扶绥县"
//     }, {
//       value: "451422",
//       label: "宁明县"
//     }, {
//       value: "451423",
//       label: "龙州县"
//     }, {
//       value: "451424",
//       label: "大新县"
//     }, {
//       value: "451425",
//       label: "天等县"
//     }, {
//       value: "451481",
//       label: "凭祥市"
//     }]
//   }]
// }, {
//   value: "46",
//   label: "海南省",
//   children: [{
//     value: "4601",
//     label: "海口市",
//     children: [{
//       value: "460105",
//       label: "秀英区"
//     }, {
//       value: "460106",
//       label: "龙华区"
//     }, {
//       value: "460107",
//       label: "琼山区"
//     }, {
//       value: "460108",
//       label: "美兰区"
//     }]
//   }, {
//     value: "4602",
//     label: "三亚市",
//     children: [{
//       value: "460202",
//       label: "海棠区"
//     }, {
//       value: "460203",
//       label: "吉阳区"
//     }, {
//       value: "460204",
//       label: "天涯区"
//     }, {
//       value: "460205",
//       label: "崖州区"
//     }]
//   }, {
//     value: "4603",
//     label: "三沙市",
//     children: [{
//       value: "460321",
//       label: "西沙群岛"
//     }, {
//       value: "460322",
//       label: "南沙群岛"
//     }, {
//       value: "460323",
//       label: "中沙群岛的岛礁及其海域"
//     }]
//   }, {
//     value: "4604",
//     label: "儋州市",
//     children: [{
//       value: "460400100",
//       label: "那大镇"
//     }, {
//       value: "460400101",
//       label: "和庆镇"
//     }, {
//       value: "460400102",
//       label: "南丰镇"
//     }, {
//       value: "460400103",
//       label: "大成镇"
//     }, {
//       value: "460400104",
//       label: "雅星镇"
//     }, {
//       value: "460400105",
//       label: "兰洋镇"
//     }, {
//       value: "460400106",
//       label: "光村镇"
//     }, {
//       value: "460400107",
//       label: "木棠镇"
//     }, {
//       value: "460400108",
//       label: "海头镇"
//     }, {
//       value: "460400109",
//       label: "峨蔓镇"
//     }, {
//       value: "460400111",
//       label: "王五镇"
//     }, {
//       value: "460400112",
//       label: "白马井镇"
//     }, {
//       value: "460400113",
//       label: "中和镇"
//     }, {
//       value: "460400114",
//       label: "排浦镇"
//     }, {
//       value: "460400115",
//       label: "东成镇"
//     }, {
//       value: "460400116",
//       label: "新州镇"
//     }, {
//       value: "460400499",
//       label: "洋浦经济开发区"
//     }, {
//       value: "460400500",
//       label: "华南热作学院"
//     }]
//   }, {
//     value: "4690",
//     label: "省直辖县级行政区划",
//     children: [{
//       value: "469001",
//       label: "五指山市"
//     }, {
//       value: "469002",
//       label: "琼海市"
//     }, {
//       value: "469005",
//       label: "文昌市"
//     }, {
//       value: "469006",
//       label: "万宁市"
//     }, {
//       value: "469007",
//       label: "东方市"
//     }, {
//       value: "469021",
//       label: "定安县"
//     }, {
//       value: "469022",
//       label: "屯昌县"
//     }, {
//       value: "469023",
//       label: "澄迈县"
//     }, {
//       value: "469024",
//       label: "临高县"
//     }, {
//       value: "469025",
//       label: "白沙黎族自治县"
//     }, {
//       value: "469026",
//       label: "昌江黎族自治县"
//     }, {
//       value: "469027",
//       label: "乐东黎族自治县"
//     }, {
//       value: "469028",
//       label: "陵水黎族自治县"
//     }, {
//       value: "469029",
//       label: "保亭黎族苗族自治县"
//     }, {
//       value: "469030",
//       label: "琼中黎族苗族自治县"
//     }]
//   }]
// }, {
//   value: "50",
//   label: "重庆市",
//   children: [{
//     value: "5001",
//     label: "市辖区",
//     children: [{
//       value: "500101",
//       label: "万州区"
//     }, {
//       value: "500102",
//       label: "涪陵区"
//     }, {
//       value: "500103",
//       label: "渝中区"
//     }, {
//       value: "500104",
//       label: "大渡口区"
//     }, {
//       value: "500105",
//       label: "江北区"
//     }, {
//       value: "500106",
//       label: "沙坪坝区"
//     }, {
//       value: "500107",
//       label: "九龙坡区"
//     }, {
//       value: "500108",
//       label: "南岸区"
//     }, {
//       value: "500109",
//       label: "北碚区"
//     }, {
//       value: "500110",
//       label: "綦江区"
//     }, {
//       value: "500111",
//       label: "大足区"
//     }, {
//       value: "500112",
//       label: "渝北区"
//     }, {
//       value: "500113",
//       label: "巴南区"
//     }, {
//       value: "500114",
//       label: "黔江区"
//     }, {
//       value: "500115",
//       label: "长寿区"
//     }, {
//       value: "500116",
//       label: "江津区"
//     }, {
//       value: "500117",
//       label: "合川区"
//     }, {
//       value: "500118",
//       label: "永川区"
//     }, {
//       value: "500119",
//       label: "南川区"
//     }, {
//       value: "500120",
//       label: "璧山区"
//     }, {
//       value: "500151",
//       label: "铜梁区"
//     }, {
//       value: "500152",
//       label: "潼南区"
//     }, {
//       value: "500153",
//       label: "荣昌区"
//     }, {
//       value: "500154",
//       label: "开州区"
//     }, {
//       value: "500155",
//       label: "梁平区"
//     }, {
//       value: "500156",
//       label: "武隆区"
//     }]
//   }, {
//     value: "5002",
//     label: "县",
//     children: [{
//       value: "500229",
//       label: "城口县"
//     }, {
//       value: "500230",
//       label: "丰都县"
//     }, {
//       value: "500231",
//       label: "垫江县"
//     }, {
//       value: "500233",
//       label: "忠县"
//     }, {
//       value: "500235",
//       label: "云阳县"
//     }, {
//       value: "500236",
//       label: "奉节县"
//     }, {
//       value: "500237",
//       label: "巫山县"
//     }, {
//       value: "500238",
//       label: "巫溪县"
//     }, {
//       value: "500240",
//       label: "石柱土家族自治县"
//     }, {
//       value: "500241",
//       label: "秀山土家族苗族自治县"
//     }, {
//       value: "500242",
//       label: "酉阳土家族苗族自治县"
//     }, {
//       value: "500243",
//       label: "彭水苗族土家族自治县"
//     }]
//   }]
// }, {
//   value: "51",
//   label: "四川省",
//   children: [{
//     value: "5101",
//     label: "成都市",
//     children: [
//       {
//         value:"510102",
//         label: "高新区"
//       },
//       {
//       value: "510104",
//       label: "锦江区"
//     }, {
//       value: "510105",
//       label: "青羊区"
//     }, {
//       value: "510106",
//       label: "金牛区"
//     }, {
//       value: "510107",
//       label: "武侯区"
//     }, {
//       value: "510108",
//       label: "成华区"
//     }, {
//       value: "510112",
//       label: "龙泉驿区"
//     }, {
//       value: "510113",
//       label: "青白江区"
//     }, {
//       value: "510114",
//       label: "新都区"
//     }, {
//       value: "510115",
//       label: "温江区"
//     }, {
//       value: "510116",
//       label: "双流区"
//     }, {
//       value: "510117",
//       label: "郫都区"
//     }, {
//       value: "510118",
//       label: "新津区"
//     }, {
//       value: "510121",
//       label: "金堂县"
//     }, {
//       value: "510129",
//       label: "大邑县"
//     }, {
//       value: "510131",
//       label: "蒲江县"
//     }, {
//       value: "510181",
//       label: "都江堰市"
//     }, {
//       value: "510182",
//       label: "彭州市"
//     }, {
//       value: "510183",
//       label: "邛崃市"
//     }, {
//       value: "510184",
//       label: "崇州市"
//     }, {
//       value: "510185",
//       label: "简阳市"
//     }]
//   }, {
//     value: "5103",
//     label: "自贡市",
//     children: [{
//       value: "510302",
//       label: "自流井区"
//     }, {
//       value: "510303",
//       label: "贡井区"
//     }, {
//       value: "510304",
//       label: "大安区"
//     }, {
//       value: "510311",
//       label: "沿滩区"
//     }, {
//       value: "510321",
//       label: "荣县"
//     }, {
//       value: "510322",
//       label: "富顺县"
//     }]
//   }, {
//     value: "5104",
//     label: "攀枝花市",
//     children: [{
//       value: "510402",
//       label: "东区"
//     }, {
//       value: "510403",
//       label: "西区"
//     }, {
//       value: "510411",
//       label: "仁和区"
//     }, {
//       value: "510421",
//       label: "米易县"
//     }, {
//       value: "510422",
//       label: "盐边县"
//     }]
//   }, {
//     value: "5105",
//     label: "泸州市",
//     children: [{
//       value: "510502",
//       label: "江阳区"
//     }, {
//       value: "510503",
//       label: "纳溪区"
//     }, {
//       value: "510504",
//       label: "龙马潭区"
//     }, {
//       value: "510521",
//       label: "泸县"
//     }, {
//       value: "510522",
//       label: "合江县"
//     }, {
//       value: "510524",
//       label: "叙永县"
//     }, {
//       value: "510525",
//       label: "古蔺县"
//     }]
//   }, {
//     value: "5106",
//     label: "德阳市",
//     children: [{
//       value: "510603",
//       label: "旌阳区"
//     }, {
//       value: "510604",
//       label: "罗江区"
//     }, {
//       value: "510623",
//       label: "中江县"
//     }, {
//       value: "510681",
//       label: "广汉市"
//     }, {
//       value: "510682",
//       label: "什邡市"
//     }, {
//       value: "510683",
//       label: "绵竹市"
//     }]
//   }, {
//     value: "5107",
//     label: "绵阳市",
//     children: [{
//       value: "510703",
//       label: "涪城区"
//     }, {
//       value: "510704",
//       label: "游仙区"
//     }, {
//       value: "510705",
//       label: "安州区"
//     }, {
//       value: "510722",
//       label: "三台县"
//     }, {
//       value: "510723",
//       label: "盐亭县"
//     }, {
//       value: "510725",
//       label: "梓潼县"
//     }, {
//       value: "510726",
//       label: "北川羌族自治县"
//     }, {
//       value: "510727",
//       label: "平武县"
//     }, {
//       value: "510781",
//       label: "江油市"
//     }]
//   }, {
//     value: "5108",
//     label: "广元市",
//     children: [{
//       value: "510802",
//       label: "利州区"
//     }, {
//       value: "510811",
//       label: "昭化区"
//     }, {
//       value: "510812",
//       label: "朝天区"
//     }, {
//       value: "510821",
//       label: "旺苍县"
//     }, {
//       value: "510822",
//       label: "青川县"
//     }, {
//       value: "510823",
//       label: "剑阁县"
//     }, {
//       value: "510824",
//       label: "苍溪县"
//     }]
//   }, {
//     value: "5109",
//     label: "遂宁市",
//     children: [{
//       value: "510903",
//       label: "船山区"
//     }, {
//       value: "510904",
//       label: "安居区"
//     }, {
//       value: "510921",
//       label: "蓬溪县"
//     }, {
//       value: "510923",
//       label: "大英县"
//     }, {
//       value: "510981",
//       label: "射洪市"
//     }]
//   }, {
//     value: "5110",
//     label: "内江市",
//     children: [{
//       value: "511002",
//       label: "市中区"
//     }, {
//       value: "511011",
//       label: "东兴区"
//     }, {
//       value: "511024",
//       label: "威远县"
//     }, {
//       value: "511025",
//       label: "资中县"
//     }, {
//       value: "511071",
//       label: "内江经济开发区"
//     }, {
//       value: "511083",
//       label: "隆昌市"
//     }]
//   }, {
//     value: "5111",
//     label: "乐山市",
//     children: [{
//       value: "511102",
//       label: "市中区"
//     }, {
//       value: "511111",
//       label: "沙湾区"
//     }, {
//       value: "511112",
//       label: "五通桥区"
//     }, {
//       value: "511113",
//       label: "金口河区"
//     }, {
//       value: "511123",
//       label: "犍为县"
//     }, {
//       value: "511124",
//       label: "井研县"
//     }, {
//       value: "511126",
//       label: "夹江县"
//     }, {
//       value: "511129",
//       label: "沐川县"
//     }, {
//       value: "511132",
//       label: "峨边彝族自治县"
//     }, {
//       value: "511133",
//       label: "马边彝族自治县"
//     }, {
//       value: "511181",
//       label: "峨眉山市"
//     }]
//   }, {
//     value: "5113",
//     label: "南充市",
//     children: [{
//       value: "511302",
//       label: "顺庆区"
//     }, {
//       value: "511303",
//       label: "高坪区"
//     }, {
//       value: "511304",
//       label: "嘉陵区"
//     }, {
//       value: "511321",
//       label: "南部县"
//     }, {
//       value: "511322",
//       label: "营山县"
//     }, {
//       value: "511323",
//       label: "蓬安县"
//     }, {
//       value: "511324",
//       label: "仪陇县"
//     }, {
//       value: "511325",
//       label: "西充县"
//     }, {
//       value: "511381",
//       label: "阆中市"
//     }]
//   }, {
//     value: "5114",
//     label: "眉山市",
//     children: [{
//       value: "511402",
//       label: "东坡区"
//     }, {
//       value: "511403",
//       label: "彭山区"
//     }, {
//       value: "511421",
//       label: "仁寿县"
//     }, {
//       value: "511423",
//       label: "洪雅县"
//     }, {
//       value: "511424",
//       label: "丹棱县"
//     }, {
//       value: "511425",
//       label: "青神县"
//     }]
//   }, {
//     value: "5115",
//     label: "宜宾市",
//     children: [{
//       value: "511502",
//       label: "翠屏区"
//     }, {
//       value: "511503",
//       label: "南溪区"
//     }, {
//       value: "511504",
//       label: "叙州区"
//     }, {
//       value: "511523",
//       label: "江安县"
//     }, {
//       value: "511524",
//       label: "长宁县"
//     }, {
//       value: "511525",
//       label: "高县"
//     }, {
//       value: "511526",
//       label: "珙县"
//     }, {
//       value: "511527",
//       label: "筠连县"
//     }, {
//       value: "511528",
//       label: "兴文县"
//     }, {
//       value: "511529",
//       label: "屏山县"
//     }]
//   }, {
//     value: "5116",
//     label: "广安市",
//     children: [{
//       value: "511602",
//       label: "广安区"
//     }, {
//       value: "511603",
//       label: "前锋区"
//     }, {
//       value: "511621",
//       label: "岳池县"
//     }, {
//       value: "511622",
//       label: "武胜县"
//     }, {
//       value: "511623",
//       label: "邻水县"
//     }, {
//       value: "511681",
//       label: "华蓥市"
//     }]
//   }, {
//     value: "5117",
//     label: "达州市",
//     children: [{
//       value: "511702",
//       label: "通川区"
//     }, {
//       value: "511703",
//       label: "达川区"
//     }, {
//       value: "511722",
//       label: "宣汉县"
//     }, {
//       value: "511723",
//       label: "开江县"
//     }, {
//       value: "511724",
//       label: "大竹县"
//     }, {
//       value: "511725",
//       label: "渠县"
//     }, {
//       value: "511771",
//       label: "达州经济开发区"
//     }, {
//       value: "511781",
//       label: "万源市"
//     }]
//   }, {
//     value: "5118",
//     label: "雅安市",
//     children: [{
//       value: "511802",
//       label: "雨城区"
//     }, {
//       value: "511803",
//       label: "名山区"
//     }, {
//       value: "511822",
//       label: "荥经县"
//     }, {
//       value: "511823",
//       label: "汉源县"
//     }, {
//       value: "511824",
//       label: "石棉县"
//     }, {
//       value: "511825",
//       label: "天全县"
//     }, {
//       value: "511826",
//       label: "芦山县"
//     }, {
//       value: "511827",
//       label: "宝兴县"
//     }]
//   }, {
//     value: "5119",
//     label: "巴中市",
//     children: [{
//       value: "511902",
//       label: "巴州区"
//     }, {
//       value: "511903",
//       label: "恩阳区"
//     }, {
//       value: "511921",
//       label: "通江县"
//     }, {
//       value: "511922",
//       label: "南江县"
//     }, {
//       value: "511923",
//       label: "平昌县"
//     }, {
//       value: "511971",
//       label: "巴中经济开发区"
//     }]
//   }, {
//     value: "5120",
//     label: "资阳市",
//     children: [{
//       value: "512002",
//       label: "雁江区"
//     }, {
//       value: "512021",
//       label: "安岳县"
//     }, {
//       value: "512022",
//       label: "乐至县"
//     }]
//   }, {
//     value: "5132",
//     label: "阿坝藏族羌族自治州",
//     children: [{
//       value: "513201",
//       label: "马尔康市"
//     }, {
//       value: "513221",
//       label: "汶川县"
//     }, {
//       value: "513222",
//       label: "理县"
//     }, {
//       value: "513223",
//       label: "茂县"
//     }, {
//       value: "513224",
//       label: "松潘县"
//     }, {
//       value: "513225",
//       label: "九寨沟县"
//     }, {
//       value: "513226",
//       label: "金川县"
//     }, {
//       value: "513227",
//       label: "小金县"
//     }, {
//       value: "513228",
//       label: "黑水县"
//     }, {
//       value: "513230",
//       label: "壤塘县"
//     }, {
//       value: "513231",
//       label: "阿坝县"
//     }, {
//       value: "513232",
//       label: "若尔盖县"
//     }, {
//       value: "513233",
//       label: "红原县"
//     }]
//   }, {
//     value: "5133",
//     label: "甘孜藏族自治州",
//     children: [{
//       value: "513301",
//       label: "康定市"
//     }, {
//       value: "513322",
//       label: "泸定县"
//     }, {
//       value: "513323",
//       label: "丹巴县"
//     }, {
//       value: "513324",
//       label: "九龙县"
//     }, {
//       value: "513325",
//       label: "雅江县"
//     }, {
//       value: "513326",
//       label: "道孚县"
//     }, {
//       value: "513327",
//       label: "炉霍县"
//     }, {
//       value: "513328",
//       label: "甘孜县"
//     }, {
//       value: "513329",
//       label: "新龙县"
//     }, {
//       value: "513330",
//       label: "德格县"
//     }, {
//       value: "513331",
//       label: "白玉县"
//     }, {
//       value: "513332",
//       label: "石渠县"
//     }, {
//       value: "513333",
//       label: "色达县"
//     }, {
//       value: "513334",
//       label: "理塘县"
//     }, {
//       value: "513335",
//       label: "巴塘县"
//     }, {
//       value: "513336",
//       label: "乡城县"
//     }, {
//       value: "513337",
//       label: "稻城县"
//     }, {
//       value: "513338",
//       label: "得荣县"
//     }]
//   }, {
//     value: "5134",
//     label: "凉山彝族自治州",
//     children: [{
//       value: "513401",
//       label: "西昌市"
//     }, {
//       value: "513422",
//       label: "木里藏族自治县"
//     }, {
//       value: "513423",
//       label: "盐源县"
//     }, {
//       value: "513424",
//       label: "德昌县"
//     }, {
//       value: "513425",
//       label: "会理县"
//     }, {
//       value: "513426",
//       label: "会东县"
//     }, {
//       value: "513427",
//       label: "宁南县"
//     }, {
//       value: "513428",
//       label: "普格县"
//     }, {
//       value: "513429",
//       label: "布拖县"
//     }, {
//       value: "513430",
//       label: "金阳县"
//     }, {
//       value: "513431",
//       label: "昭觉县"
//     }, {
//       value: "513432",
//       label: "喜德县"
//     }, {
//       value: "513433",
//       label: "冕宁县"
//     }, {
//       value: "513434",
//       label: "越西县"
//     }, {
//       value: "513435",
//       label: "甘洛县"
//     }, {
//       value: "513436",
//       label: "美姑县"
//     }, {
//       value: "513437",
//       label: "雷波县"
//     }]
//   }]
// }, {
//   value: "52",
//   label: "贵州省",
//   children: [{
//     value: "5201",
//     label: "贵阳市",
//     children: [{
//       value: "520102",
//       label: "南明区"
//     }, {
//       value: "520103",
//       label: "云岩区"
//     }, {
//       value: "520111",
//       label: "花溪区"
//     }, {
//       value: "520112",
//       label: "乌当区"
//     }, {
//       value: "520113",
//       label: "白云区"
//     }, {
//       value: "520115",
//       label: "观山湖区"
//     }, {
//       value: "520121",
//       label: "开阳县"
//     }, {
//       value: "520122",
//       label: "息烽县"
//     }, {
//       value: "520123",
//       label: "修文县"
//     }, {
//       value: "520181",
//       label: "清镇市"
//     }]
//   }, {
//     value: "5202",
//     label: "六盘水市",
//     children: [{
//       value: "520201",
//       label: "钟山区"
//     }, {
//       value: "520203",
//       label: "六枝特区"
//     }, {
//       value: "520221",
//       label: "水城县"
//     }, {
//       value: "520281",
//       label: "盘州市"
//     }]
//   }, {
//     value: "5203",
//     label: "遵义市",
//     children: [{
//       value: "520302",
//       label: "红花岗区"
//     }, {
//       value: "520303",
//       label: "汇川区"
//     }, {
//       value: "520304",
//       label: "播州区"
//     }, {
//       value: "520322",
//       label: "桐梓县"
//     }, {
//       value: "520323",
//       label: "绥阳县"
//     }, {
//       value: "520324",
//       label: "正安县"
//     }, {
//       value: "520325",
//       label: "道真仡佬族苗族自治县"
//     }, {
//       value: "520326",
//       label: "务川仡佬族苗族自治县"
//     }, {
//       value: "520327",
//       label: "凤冈县"
//     }, {
//       value: "520328",
//       label: "湄潭县"
//     }, {
//       value: "520329",
//       label: "余庆县"
//     }, {
//       value: "520330",
//       label: "习水县"
//     }, {
//       value: "520381",
//       label: "赤水市"
//     }, {
//       value: "520382",
//       label: "仁怀市"
//     }]
//   }, {
//     value: "5204",
//     label: "安顺市",
//     children: [{
//       value: "520402",
//       label: "西秀区"
//     }, {
//       value: "520403",
//       label: "平坝区"
//     }, {
//       value: "520422",
//       label: "普定县"
//     }, {
//       value: "520423",
//       label: "镇宁布依族苗族自治县"
//     }, {
//       value: "520424",
//       label: "关岭布依族苗族自治县"
//     }, {
//       value: "520425",
//       label: "紫云苗族布依族自治县"
//     }]
//   }, {
//     value: "5205",
//     label: "毕节市",
//     children: [{
//       value: "520502",
//       label: "七星关区"
//     }, {
//       value: "520521",
//       label: "大方县"
//     }, {
//       value: "520522",
//       label: "黔西县"
//     }, {
//       value: "520523",
//       label: "金沙县"
//     }, {
//       value: "520524",
//       label: "织金县"
//     }, {
//       value: "520525",
//       label: "纳雍县"
//     }, {
//       value: "520526",
//       label: "威宁彝族回族苗族自治县"
//     }, {
//       value: "520527",
//       label: "赫章县"
//     }]
//   }, {
//     value: "5206",
//     label: "铜仁市",
//     children: [{
//       value: "520602",
//       label: "碧江区"
//     }, {
//       value: "520603",
//       label: "万山区"
//     }, {
//       value: "520621",
//       label: "江口县"
//     }, {
//       value: "520622",
//       label: "玉屏侗族自治县"
//     }, {
//       value: "520623",
//       label: "石阡县"
//     }, {
//       value: "520624",
//       label: "思南县"
//     }, {
//       value: "520625",
//       label: "印江土家族苗族自治县"
//     }, {
//       value: "520626",
//       label: "德江县"
//     }, {
//       value: "520627",
//       label: "沿河土家族自治县"
//     }, {
//       value: "520628",
//       label: "松桃苗族自治县"
//     }]
//   }, {
//     value: "5223",
//     label: "黔西南布依族苗族自治州",
//     children: [{
//       value: "522301",
//       label: "兴义市"
//     }, {
//       value: "522302",
//       label: "兴仁市"
//     }, {
//       value: "522323",
//       label: "普安县"
//     }, {
//       value: "522324",
//       label: "晴隆县"
//     }, {
//       value: "522325",
//       label: "贞丰县"
//     }, {
//       value: "522326",
//       label: "望谟县"
//     }, {
//       value: "522327",
//       label: "册亨县"
//     }, {
//       value: "522328",
//       label: "安龙县"
//     }]
//   }, {
//     value: "5226",
//     label: "黔东南苗族侗族自治州",
//     children: [{
//       value: "522601",
//       label: "凯里市"
//     }, {
//       value: "522622",
//       label: "黄平县"
//     }, {
//       value: "522623",
//       label: "施秉县"
//     }, {
//       value: "522624",
//       label: "三穗县"
//     }, {
//       value: "522625",
//       label: "镇远县"
//     }, {
//       value: "522626",
//       label: "岑巩县"
//     }, {
//       value: "522627",
//       label: "天柱县"
//     }, {
//       value: "522628",
//       label: "锦屏县"
//     }, {
//       value: "522629",
//       label: "剑河县"
//     }, {
//       value: "522630",
//       label: "台江县"
//     }, {
//       value: "522631",
//       label: "黎平县"
//     }, {
//       value: "522632",
//       label: "榕江县"
//     }, {
//       value: "522633",
//       label: "从江县"
//     }, {
//       value: "522634",
//       label: "雷山县"
//     }, {
//       value: "522635",
//       label: "麻江县"
//     }, {
//       value: "522636",
//       label: "丹寨县"
//     }]
//   }, {
//     value: "5227",
//     label: "黔南布依族苗族自治州",
//     children: [{
//       value: "522701",
//       label: "都匀市"
//     }, {
//       value: "522702",
//       label: "福泉市"
//     }, {
//       value: "522722",
//       label: "荔波县"
//     }, {
//       value: "522723",
//       label: "贵定县"
//     }, {
//       value: "522725",
//       label: "瓮安县"
//     }, {
//       value: "522726",
//       label: "独山县"
//     }, {
//       value: "522727",
//       label: "平塘县"
//     }, {
//       value: "522728",
//       label: "罗甸县"
//     }, {
//       value: "522729",
//       label: "长顺县"
//     }, {
//       value: "522730",
//       label: "龙里县"
//     }, {
//       value: "522731",
//       label: "惠水县"
//     }, {
//       value: "522732",
//       label: "三都水族自治县"
//     }]
//   }]
// }, {
//   value: "53",
//   label: "云南省",
//   children: [{
//     value: "5301",
//     label: "昆明市",
//     children: [{
//       value: "530102",
//       label: "五华区"
//     }, {
//       value: "530103",
//       label: "盘龙区"
//     }, {
//       value: "530111",
//       label: "官渡区"
//     }, {
//       value: "530112",
//       label: "西山区"
//     }, {
//       value: "530113",
//       label: "东川区"
//     }, {
//       value: "530114",
//       label: "呈贡区"
//     }, {
//       value: "530115",
//       label: "晋宁区"
//     }, {
//       value: "530124",
//       label: "富民县"
//     }, {
//       value: "530125",
//       label: "宜良县"
//     }, {
//       value: "530126",
//       label: "石林彝族自治县"
//     }, {
//       value: "530127",
//       label: "嵩明县"
//     }, {
//       value: "530128",
//       label: "禄劝彝族苗族自治县"
//     }, {
//       value: "530129",
//       label: "寻甸回族彝族自治县"
//     }, {
//       value: "530181",
//       label: "安宁市"
//     }]
//   }, {
//     value: "5303",
//     label: "曲靖市",
//     children: [{
//       value: "530302",
//       label: "麒麟区"
//     }, {
//       value: "530303",
//       label: "沾益区"
//     }, {
//       value: "530304",
//       label: "马龙区"
//     }, {
//       value: "530322",
//       label: "陆良县"
//     }, {
//       value: "530323",
//       label: "师宗县"
//     }, {
//       value: "530324",
//       label: "罗平县"
//     }, {
//       value: "530325",
//       label: "富源县"
//     }, {
//       value: "530326",
//       label: "会泽县"
//     }, {
//       value: "530381",
//       label: "宣威市"
//     }]
//   }, {
//     value: "5304",
//     label: "玉溪市",
//     children: [{
//       value: "530402",
//       label: "红塔区"
//     }, {
//       value: "530403",
//       label: "江川区"
//     }, {
//       value: "530423",
//       label: "通海县"
//     }, {
//       value: "530424",
//       label: "华宁县"
//     }, {
//       value: "530425",
//       label: "易门县"
//     }, {
//       value: "530426",
//       label: "峨山彝族自治县"
//     }, {
//       value: "530427",
//       label: "新平彝族傣族自治县"
//     }, {
//       value: "530428",
//       label: "元江哈尼族彝族傣族自治县"
//     }, {
//       value: "530481",
//       label: "澄江市"
//     }]
//   }, {
//     value: "5305",
//     label: "保山市",
//     children: [{
//       value: "530502",
//       label: "隆阳区"
//     }, {
//       value: "530521",
//       label: "施甸县"
//     }, {
//       value: "530523",
//       label: "龙陵县"
//     }, {
//       value: "530524",
//       label: "昌宁县"
//     }, {
//       value: "530581",
//       label: "腾冲市"
//     }]
//   }, {
//     value: "5306",
//     label: "昭通市",
//     children: [{
//       value: "530602",
//       label: "昭阳区"
//     }, {
//       value: "530621",
//       label: "鲁甸县"
//     }, {
//       value: "530622",
//       label: "巧家县"
//     }, {
//       value: "530623",
//       label: "盐津县"
//     }, {
//       value: "530624",
//       label: "大关县"
//     }, {
//       value: "530625",
//       label: "永善县"
//     }, {
//       value: "530626",
//       label: "绥江县"
//     }, {
//       value: "530627",
//       label: "镇雄县"
//     }, {
//       value: "530628",
//       label: "彝良县"
//     }, {
//       value: "530629",
//       label: "威信县"
//     }, {
//       value: "530681",
//       label: "水富市"
//     }]
//   }, {
//     value: "5307",
//     label: "丽江市",
//     children: [{
//       value: "530702",
//       label: "古城区"
//     }, {
//       value: "530721",
//       label: "玉龙纳西族自治县"
//     }, {
//       value: "530722",
//       label: "永胜县"
//     }, {
//       value: "530723",
//       label: "华坪县"
//     }, {
//       value: "530724",
//       label: "宁蒗彝族自治县"
//     }]
//   }, {
//     value: "5308",
//     label: "普洱市",
//     children: [{
//       value: "530802",
//       label: "思茅区"
//     }, {
//       value: "530821",
//       label: "宁洱哈尼族彝族自治县"
//     }, {
//       value: "530822",
//       label: "墨江哈尼族自治县"
//     }, {
//       value: "530823",
//       label: "景东彝族自治县"
//     }, {
//       value: "530824",
//       label: "景谷傣族彝族自治县"
//     }, {
//       value: "530825",
//       label: "镇沅彝族哈尼族拉祜族自治县"
//     }, {
//       value: "530826",
//       label: "江城哈尼族彝族自治县"
//     }, {
//       value: "530827",
//       label: "孟连傣族拉祜族佤族自治县"
//     }, {
//       value: "530828",
//       label: "澜沧拉祜族自治县"
//     }, {
//       value: "530829",
//       label: "西盟佤族自治县"
//     }]
//   }, {
//     value: "5309",
//     label: "临沧市",
//     children: [{
//       value: "530902",
//       label: "临翔区"
//     }, {
//       value: "530921",
//       label: "凤庆县"
//     }, {
//       value: "530922",
//       label: "云县"
//     }, {
//       value: "530923",
//       label: "永德县"
//     }, {
//       value: "530924",
//       label: "镇康县"
//     }, {
//       value: "530925",
//       label: "双江拉祜族佤族布朗族傣族自治县"
//     }, {
//       value: "530926",
//       label: "耿马傣族佤族自治县"
//     }, {
//       value: "530927",
//       label: "沧源佤族自治县"
//     }]
//   }, {
//     value: "5323",
//     label: "楚雄彝族自治州",
//     children: [{
//       value: "532301",
//       label: "楚雄市"
//     }, {
//       value: "532322",
//       label: "双柏县"
//     }, {
//       value: "532323",
//       label: "牟定县"
//     }, {
//       value: "532324",
//       label: "南华县"
//     }, {
//       value: "532325",
//       label: "姚安县"
//     }, {
//       value: "532326",
//       label: "大姚县"
//     }, {
//       value: "532327",
//       label: "永仁县"
//     }, {
//       value: "532328",
//       label: "元谋县"
//     }, {
//       value: "532329",
//       label: "武定县"
//     }, {
//       value: "532331",
//       label: "禄丰县"
//     }]
//   }, {
//     value: "5325",
//     label: "红河哈尼族彝族自治州",
//     children: [{
//       value: "532501",
//       label: "个旧市"
//     }, {
//       value: "532502",
//       label: "开远市"
//     }, {
//       value: "532503",
//       label: "蒙自市"
//     }, {
//       value: "532504",
//       label: "弥勒市"
//     }, {
//       value: "532523",
//       label: "屏边苗族自治县"
//     }, {
//       value: "532524",
//       label: "建水县"
//     }, {
//       value: "532525",
//       label: "石屏县"
//     }, {
//       value: "532527",
//       label: "泸西县"
//     }, {
//       value: "532528",
//       label: "元阳县"
//     }, {
//       value: "532529",
//       label: "红河县"
//     }, {
//       value: "532530",
//       label: "金平苗族瑶族傣族自治县"
//     }, {
//       value: "532531",
//       label: "绿春县"
//     }, {
//       value: "532532",
//       label: "河口瑶族自治县"
//     }]
//   }, {
//     value: "5326",
//     label: "文山壮族苗族自治州",
//     children: [{
//       value: "532601",
//       label: "文山市"
//     }, {
//       value: "532622",
//       label: "砚山县"
//     }, {
//       value: "532623",
//       label: "西畴县"
//     }, {
//       value: "532624",
//       label: "麻栗坡县"
//     }, {
//       value: "532625",
//       label: "马关县"
//     }, {
//       value: "532626",
//       label: "丘北县"
//     }, {
//       value: "532627",
//       label: "广南县"
//     }, {
//       value: "532628",
//       label: "富宁县"
//     }]
//   }, {
//     value: "5328",
//     label: "西双版纳傣族自治州",
//     children: [{
//       value: "532801",
//       label: "景洪市"
//     }, {
//       value: "532822",
//       label: "勐海县"
//     }, {
//       value: "532823",
//       label: "勐腊县"
//     }]
//   }, {
//     value: "5329",
//     label: "大理白族自治州",
//     children: [{
//       value: "532901",
//       label: "大理市"
//     }, {
//       value: "532922",
//       label: "漾濞彝族自治县"
//     }, {
//       value: "532923",
//       label: "祥云县"
//     }, {
//       value: "532924",
//       label: "宾川县"
//     }, {
//       value: "532925",
//       label: "弥渡县"
//     }, {
//       value: "532926",
//       label: "南涧彝族自治县"
//     }, {
//       value: "532927",
//       label: "巍山彝族回族自治县"
//     }, {
//       value: "532928",
//       label: "永平县"
//     }, {
//       value: "532929",
//       label: "云龙县"
//     }, {
//       value: "532930",
//       label: "洱源县"
//     }, {
//       value: "532931",
//       label: "剑川县"
//     }, {
//       value: "532932",
//       label: "鹤庆县"
//     }]
//   }, {
//     value: "5331",
//     label: "德宏傣族景颇族自治州",
//     children: [{
//       value: "533102",
//       label: "瑞丽市"
//     }, {
//       value: "533103",
//       label: "芒市"
//     }, {
//       value: "533122",
//       label: "梁河县"
//     }, {
//       value: "533123",
//       label: "盈江县"
//     }, {
//       value: "533124",
//       label: "陇川县"
//     }]
//   }, {
//     value: "5333",
//     label: "怒江傈僳族自治州",
//     children: [{
//       value: "533301",
//       label: "泸水市"
//     }, {
//       value: "533323",
//       label: "福贡县"
//     }, {
//       value: "533324",
//       label: "贡山独龙族怒族自治县"
//     }, {
//       value: "533325",
//       label: "兰坪白族普米族自治县"
//     }]
//   }, {
//     value: "5334",
//     label: "迪庆藏族自治州",
//     children: [{
//       value: "533401",
//       label: "香格里拉市"
//     }, {
//       value: "533422",
//       label: "德钦县"
//     }, {
//       value: "533423",
//       label: "维西傈僳族自治县"
//     }]
//   }]
// }, {
//   value: "54",
//   label: "西藏自治区",
//   children: [{
//     value: "5401",
//     label: "拉萨市",
//     children: [{
//       value: "540102",
//       label: "城关区"
//     }, {
//       value: "540103",
//       label: "堆龙德庆区"
//     }, {
//       value: "540104",
//       label: "达孜区"
//     }, {
//       value: "540121",
//       label: "林周县"
//     }, {
//       value: "540122",
//       label: "当雄县"
//     }, {
//       value: "540123",
//       label: "尼木县"
//     }, {
//       value: "540124",
//       label: "曲水县"
//     }, {
//       value: "540127",
//       label: "墨竹工卡县"
//     }, {
//       value: "540171",
//       label: "格尔木藏青工业园区"
//     }, {
//       value: "540172",
//       label: "拉萨经济技术开发区"
//     }, {
//       value: "540173",
//       label: "西藏文化旅游创意园区"
//     }, {
//       value: "540174",
//       label: "达孜工业园区"
//     }]
//   }, {
//     value: "5402",
//     label: "日喀则市",
//     children: [{
//       value: "540202",
//       label: "桑珠孜区"
//     }, {
//       value: "540221",
//       label: "南木林县"
//     }, {
//       value: "540222",
//       label: "江孜县"
//     }, {
//       value: "540223",
//       label: "定日县"
//     }, {
//       value: "540224",
//       label: "萨迦县"
//     }, {
//       value: "540225",
//       label: "拉孜县"
//     }, {
//       value: "540226",
//       label: "昂仁县"
//     }, {
//       value: "540227",
//       label: "谢通门县"
//     }, {
//       value: "540228",
//       label: "白朗县"
//     }, {
//       value: "540229",
//       label: "仁布县"
//     }, {
//       value: "540230",
//       label: "康马县"
//     }, {
//       value: "540231",
//       label: "定结县"
//     }, {
//       value: "540232",
//       label: "仲巴县"
//     }, {
//       value: "540233",
//       label: "亚东县"
//     }, {
//       value: "540234",
//       label: "吉隆县"
//     }, {
//       value: "540235",
//       label: "聂拉木县"
//     }, {
//       value: "540236",
//       label: "萨嘎县"
//     }, {
//       value: "540237",
//       label: "岗巴县"
//     }]
//   }, {
//     value: "5403",
//     label: "昌都市",
//     children: [{
//       value: "540302",
//       label: "卡若区"
//     }, {
//       value: "540321",
//       label: "江达县"
//     }, {
//       value: "540322",
//       label: "贡觉县"
//     }, {
//       value: "540323",
//       label: "类乌齐县"
//     }, {
//       value: "540324",
//       label: "丁青县"
//     }, {
//       value: "540325",
//       label: "察雅县"
//     }, {
//       value: "540326",
//       label: "八宿县"
//     }, {
//       value: "540327",
//       label: "左贡县"
//     }, {
//       value: "540328",
//       label: "芒康县"
//     }, {
//       value: "540329",
//       label: "洛隆县"
//     }, {
//       value: "540330",
//       label: "边坝县"
//     }]
//   }, {
//     value: "5404",
//     label: "林芝市",
//     children: [{
//       value: "540402",
//       label: "巴宜区"
//     }, {
//       value: "540421",
//       label: "工布江达县"
//     }, {
//       value: "540422",
//       label: "米林县"
//     }, {
//       value: "540423",
//       label: "墨脱县"
//     }, {
//       value: "540424",
//       label: "波密县"
//     }, {
//       value: "540425",
//       label: "察隅县"
//     }, {
//       value: "540426",
//       label: "朗县"
//     }]
//   }, {
//     value: "5405",
//     label: "山南市",
//     children: [{
//       value: "540502",
//       label: "乃东区"
//     }, {
//       value: "540521",
//       label: "扎囊县"
//     }, {
//       value: "540522",
//       label: "贡嘎县"
//     }, {
//       value: "540523",
//       label: "桑日县"
//     }, {
//       value: "540524",
//       label: "琼结县"
//     }, {
//       value: "540525",
//       label: "曲松县"
//     }, {
//       value: "540526",
//       label: "措美县"
//     }, {
//       value: "540527",
//       label: "洛扎县"
//     }, {
//       value: "540528",
//       label: "加查县"
//     }, {
//       value: "540529",
//       label: "隆子县"
//     }, {
//       value: "540530",
//       label: "错那县"
//     }, {
//       value: "540531",
//       label: "浪卡子县"
//     }]
//   }, {
//     value: "5406",
//     label: "那曲市",
//     children: [{
//       value: "540602",
//       label: "色尼区"
//     }, {
//       value: "540621",
//       label: "嘉黎县"
//     }, {
//       value: "540622",
//       label: "比如县"
//     }, {
//       value: "540623",
//       label: "聂荣县"
//     }, {
//       value: "540624",
//       label: "安多县"
//     }, {
//       value: "540625",
//       label: "申扎县"
//     }, {
//       value: "540626",
//       label: "索县"
//     }, {
//       value: "540627",
//       label: "班戈县"
//     }, {
//       value: "540628",
//       label: "巴青县"
//     }, {
//       value: "540629",
//       label: "尼玛县"
//     }, {
//       value: "540630",
//       label: "双湖县"
//     }]
//   }, {
//     value: "5425",
//     label: "阿里地区",
//     children: [{
//       value: "542521",
//       label: "普兰县"
//     }, {
//       value: "542522",
//       label: "札达县"
//     }, {
//       value: "542523",
//       label: "噶尔县"
//     }, {
//       value: "542524",
//       label: "日土县"
//     }, {
//       value: "542525",
//       label: "革吉县"
//     }, {
//       value: "542526",
//       label: "改则县"
//     }, {
//       value: "542527",
//       label: "措勤县"
//     }]
//   }]
// }, {
//   value: "61",
//   label: "陕西省",
//   children: [{
//     value: "6101",
//     label: "西安市",
//     children: [{
//       value: "610102",
//       label: "新城区"
//     }, {
//       value: "610103",
//       label: "碑林区"
//     }, {
//       value: "610104",
//       label: "莲湖区"
//     }, {
//       value: "610111",
//       label: "灞桥区"
//     }, {
//       value: "610112",
//       label: "未央区"
//     }, {
//       value: "610113",
//       label: "雁塔区"
//     }, {
//       value: "610114",
//       label: "阎良区"
//     }, {
//       value: "610115",
//       label: "临潼区"
//     }, {
//       value: "610116",
//       label: "长安区"
//     }, {
//       value: "610117",
//       label: "高陵区"
//     }, {
//       value: "610118",
//       label: "鄠邑区"
//     }, {
//       value: "610122",
//       label: "蓝田县"
//     }, {
//       value: "610124",
//       label: "周至县"
//     }]
//   }, {
//     value: "6102",
//     label: "铜川市",
//     children: [{
//       value: "610202",
//       label: "王益区"
//     }, {
//       value: "610203",
//       label: "印台区"
//     }, {
//       value: "610204",
//       label: "耀州区"
//     }, {
//       value: "610222",
//       label: "宜君县"
//     }]
//   }, {
//     value: "6103",
//     label: "宝鸡市",
//     children: [{
//       value: "610302",
//       label: "渭滨区"
//     }, {
//       value: "610303",
//       label: "金台区"
//     }, {
//       value: "610304",
//       label: "陈仓区"
//     }, {
//       value: "610322",
//       label: "凤翔县"
//     }, {
//       value: "610323",
//       label: "岐山县"
//     }, {
//       value: "610324",
//       label: "扶风县"
//     }, {
//       value: "610326",
//       label: "眉县"
//     }, {
//       value: "610327",
//       label: "陇县"
//     }, {
//       value: "610328",
//       label: "千阳县"
//     }, {
//       value: "610329",
//       label: "麟游县"
//     }, {
//       value: "610330",
//       label: "凤县"
//     }, {
//       value: "610331",
//       label: "太白县"
//     }]
//   }, {
//     value: "6104",
//     label: "咸阳市",
//     children: [{
//       value: "610402",
//       label: "秦都区"
//     }, {
//       value: "610403",
//       label: "杨陵区"
//     }, {
//       value: "610404",
//       label: "渭城区"
//     }, {
//       value: "610422",
//       label: "三原县"
//     }, {
//       value: "610423",
//       label: "泾阳县"
//     }, {
//       value: "610424",
//       label: "乾县"
//     }, {
//       value: "610425",
//       label: "礼泉县"
//     }, {
//       value: "610426",
//       label: "永寿县"
//     }, {
//       value: "610428",
//       label: "长武县"
//     }, {
//       value: "610429",
//       label: "旬邑县"
//     }, {
//       value: "610430",
//       label: "淳化县"
//     }, {
//       value: "610431",
//       label: "武功县"
//     }, {
//       value: "610481",
//       label: "兴平市"
//     }, {
//       value: "610482",
//       label: "彬州市"
//     }]
//   }, {
//     value: "6105",
//     label: "渭南市",
//     children: [{
//       value: "610502",
//       label: "临渭区"
//     }, {
//       value: "610503",
//       label: "华州区"
//     }, {
//       value: "610522",
//       label: "潼关县"
//     }, {
//       value: "610523",
//       label: "大荔县"
//     }, {
//       value: "610524",
//       label: "合阳县"
//     }, {
//       value: "610525",
//       label: "澄城县"
//     }, {
//       value: "610526",
//       label: "蒲城县"
//     }, {
//       value: "610527",
//       label: "白水县"
//     }, {
//       value: "610528",
//       label: "富平县"
//     }, {
//       value: "610581",
//       label: "韩城市"
//     }, {
//       value: "610582",
//       label: "华阴市"
//     }]
//   }, {
//     value: "6106",
//     label: "延安市",
//     children: [{
//       value: "610602",
//       label: "宝塔区"
//     }, {
//       value: "610603",
//       label: "安塞区"
//     }, {
//       value: "610621",
//       label: "延长县"
//     }, {
//       value: "610622",
//       label: "延川县"
//     }, {
//       value: "610625",
//       label: "志丹县"
//     }, {
//       value: "610626",
//       label: "吴起县"
//     }, {
//       value: "610627",
//       label: "甘泉县"
//     }, {
//       value: "610628",
//       label: "富县"
//     }, {
//       value: "610629",
//       label: "洛川县"
//     }, {
//       value: "610630",
//       label: "宜川县"
//     }, {
//       value: "610631",
//       label: "黄龙县"
//     }, {
//       value: "610632",
//       label: "黄陵县"
//     }, {
//       value: "610681",
//       label: "子长市"
//     }]
//   }, {
//     value: "6107",
//     label: "汉中市",
//     children: [{
//       value: "610702",
//       label: "汉台区"
//     }, {
//       value: "610703",
//       label: "南郑区"
//     }, {
//       value: "610722",
//       label: "城固县"
//     }, {
//       value: "610723",
//       label: "洋县"
//     }, {
//       value: "610724",
//       label: "西乡县"
//     }, {
//       value: "610725",
//       label: "勉县"
//     }, {
//       value: "610726",
//       label: "宁强县"
//     }, {
//       value: "610727",
//       label: "略阳县"
//     }, {
//       value: "610728",
//       label: "镇巴县"
//     }, {
//       value: "610729",
//       label: "留坝县"
//     }, {
//       value: "610730",
//       label: "佛坪县"
//     }]
//   }, {
//     value: "6108",
//     label: "榆林市",
//     children: [{
//       value: "610802",
//       label: "榆阳区"
//     }, {
//       value: "610803",
//       label: "横山区"
//     }, {
//       value: "610822",
//       label: "府谷县"
//     }, {
//       value: "610824",
//       label: "靖边县"
//     }, {
//       value: "610825",
//       label: "定边县"
//     }, {
//       value: "610826",
//       label: "绥德县"
//     }, {
//       value: "610827",
//       label: "米脂县"
//     }, {
//       value: "610828",
//       label: "佳县"
//     }, {
//       value: "610829",
//       label: "吴堡县"
//     }, {
//       value: "610830",
//       label: "清涧县"
//     }, {
//       value: "610831",
//       label: "子洲县"
//     }, {
//       value: "610881",
//       label: "神木市"
//     }]
//   }, {
//     value: "6109",
//     label: "安康市",
//     children: [{
//       value: "610902",
//       label: "汉滨区"
//     }, {
//       value: "610921",
//       label: "汉阴县"
//     }, {
//       value: "610922",
//       label: "石泉县"
//     }, {
//       value: "610923",
//       label: "宁陕县"
//     }, {
//       value: "610924",
//       label: "紫阳县"
//     }, {
//       value: "610925",
//       label: "岚皋县"
//     }, {
//       value: "610926",
//       label: "平利县"
//     }, {
//       value: "610927",
//       label: "镇坪县"
//     }, {
//       value: "610928",
//       label: "旬阳县"
//     }, {
//       value: "610929",
//       label: "白河县"
//     }]
//   }, {
//     value: "6110",
//     label: "商洛市",
//     children: [{
//       value: "611002",
//       label: "商州区"
//     }, {
//       value: "611021",
//       label: "洛南县"
//     }, {
//       value: "611022",
//       label: "丹凤县"
//     }, {
//       value: "611023",
//       label: "商南县"
//     }, {
//       value: "611024",
//       label: "山阳县"
//     }, {
//       value: "611025",
//       label: "镇安县"
//     }, {
//       value: "611026",
//       label: "柞水县"
//     }]
//   }]
// }, {
//   value: "62",
//   label: "甘肃省",
//   children: [{
//     value: "6201",
//     label: "兰州市",
//     children: [{
//       value: "620102",
//       label: "城关区"
//     }, {
//       value: "620103",
//       label: "七里河区"
//     }, {
//       value: "620104",
//       label: "西固区"
//     }, {
//       value: "620105",
//       label: "安宁区"
//     }, {
//       value: "620111",
//       label: "红古区"
//     }, {
//       value: "620121",
//       label: "永登县"
//     }, {
//       value: "620122",
//       label: "皋兰县"
//     }, {
//       value: "620123",
//       label: "榆中县"
//     }, {
//       value: "620171",
//       label: "兰州新区"
//     }]
//   }, {
//     value: "6202",
//     label: "嘉峪关市",
//     children: [{
//       value: "620201001",
//       label: "雄关街道"
//     }, {
//       value: "620201002",
//       label: "钢城街道"
//     }, {
//       value: "620201100",
//       label: "新城镇"
//     }, {
//       value: "620201101",
//       label: "峪泉镇"
//     }, {
//       value: "620201102",
//       label: "文殊镇"
//     }]
//   }, {
//     value: "6203",
//     label: "金昌市",
//     children: [{
//       value: "620302",
//       label: "金川区"
//     }, {
//       value: "620321",
//       label: "永昌县"
//     }]
//   }, {
//     value: "6204",
//     label: "白银市",
//     children: [{
//       value: "620402",
//       label: "白银区"
//     }, {
//       value: "620403",
//       label: "平川区"
//     }, {
//       value: "620421",
//       label: "靖远县"
//     }, {
//       value: "620422",
//       label: "会宁县"
//     }, {
//       value: "620423",
//       label: "景泰县"
//     }]
//   }, {
//     value: "6205",
//     label: "天水市",
//     children: [{
//       value: "620502",
//       label: "秦州区"
//     }, {
//       value: "620503",
//       label: "麦积区"
//     }, {
//       value: "620521",
//       label: "清水县"
//     }, {
//       value: "620522",
//       label: "秦安县"
//     }, {
//       value: "620523",
//       label: "甘谷县"
//     }, {
//       value: "620524",
//       label: "武山县"
//     }, {
//       value: "620525",
//       label: "张家川回族自治县"
//     }]
//   }, {
//     value: "6206",
//     label: "武威市",
//     children: [{
//       value: "620602",
//       label: "凉州区"
//     }, {
//       value: "620621",
//       label: "民勤县"
//     }, {
//       value: "620622",
//       label: "古浪县"
//     }, {
//       value: "620623",
//       label: "天祝藏族自治县"
//     }]
//   }, {
//     value: "6207",
//     label: "张掖市",
//     children: [{
//       value: "620702",
//       label: "甘州区"
//     }, {
//       value: "620721",
//       label: "肃南裕固族自治县"
//     }, {
//       value: "620722",
//       label: "民乐县"
//     }, {
//       value: "620723",
//       label: "临泽县"
//     }, {
//       value: "620724",
//       label: "高台县"
//     }, {
//       value: "620725",
//       label: "山丹县"
//     }]
//   }, {
//     value: "6208",
//     label: "平凉市",
//     children: [{
//       value: "620802",
//       label: "崆峒区"
//     }, {
//       value: "620821",
//       label: "泾川县"
//     }, {
//       value: "620822",
//       label: "灵台县"
//     }, {
//       value: "620823",
//       label: "崇信县"
//     }, {
//       value: "620825",
//       label: "庄浪县"
//     }, {
//       value: "620826",
//       label: "静宁县"
//     }, {
//       value: "620881",
//       label: "华亭市"
//     }]
//   }, {
//     value: "6209",
//     label: "酒泉市",
//     children: [{
//       value: "620902",
//       label: "肃州区"
//     }, {
//       value: "620921",
//       label: "金塔县"
//     }, {
//       value: "620922",
//       label: "瓜州县"
//     }, {
//       value: "620923",
//       label: "肃北蒙古族自治县"
//     }, {
//       value: "620924",
//       label: "阿克塞哈萨克族自治县"
//     }, {
//       value: "620981",
//       label: "玉门市"
//     }, {
//       value: "620982",
//       label: "敦煌市"
//     }]
//   }, {
//     value: "6210",
//     label: "庆阳市",
//     children: [{
//       value: "621002",
//       label: "西峰区"
//     }, {
//       value: "621021",
//       label: "庆城县"
//     }, {
//       value: "621022",
//       label: "环县"
//     }, {
//       value: "621023",
//       label: "华池县"
//     }, {
//       value: "621024",
//       label: "合水县"
//     }, {
//       value: "621025",
//       label: "正宁县"
//     }, {
//       value: "621026",
//       label: "宁县"
//     }, {
//       value: "621027",
//       label: "镇原县"
//     }]
//   }, {
//     value: "6211",
//     label: "定西市",
//     children: [{
//       value: "621102",
//       label: "安定区"
//     }, {
//       value: "621121",
//       label: "通渭县"
//     }, {
//       value: "621122",
//       label: "陇西县"
//     }, {
//       value: "621123",
//       label: "渭源县"
//     }, {
//       value: "621124",
//       label: "临洮县"
//     }, {
//       value: "621125",
//       label: "漳县"
//     }, {
//       value: "621126",
//       label: "岷县"
//     }]
//   }, {
//     value: "6212",
//     label: "陇南市",
//     children: [{
//       value: "621202",
//       label: "武都区"
//     }, {
//       value: "621221",
//       label: "成县"
//     }, {
//       value: "621222",
//       label: "文县"
//     }, {
//       value: "621223",
//       label: "宕昌县"
//     }, {
//       value: "621224",
//       label: "康县"
//     }, {
//       value: "621225",
//       label: "西和县"
//     }, {
//       value: "621226",
//       label: "礼县"
//     }, {
//       value: "621227",
//       label: "徽县"
//     }, {
//       value: "621228",
//       label: "两当县"
//     }]
//   }, {
//     value: "6229",
//     label: "临夏回族自治州",
//     children: [{
//       value: "622901",
//       label: "临夏市"
//     }, {
//       value: "622921",
//       label: "临夏县"
//     }, {
//       value: "622922",
//       label: "康乐县"
//     }, {
//       value: "622923",
//       label: "永靖县"
//     }, {
//       value: "622924",
//       label: "广河县"
//     }, {
//       value: "622925",
//       label: "和政县"
//     }, {
//       value: "622926",
//       label: "东乡族自治县"
//     }, {
//       value: "622927",
//       label: "积石山保安族东乡族撒拉族自治县"
//     }]
//   }, {
//     value: "6230",
//     label: "甘南藏族自治州",
//     children: [{
//       value: "623001",
//       label: "合作市"
//     }, {
//       value: "623021",
//       label: "临潭县"
//     }, {
//       value: "623022",
//       label: "卓尼县"
//     }, {
//       value: "623023",
//       label: "舟曲县"
//     }, {
//       value: "623024",
//       label: "迭部县"
//     }, {
//       value: "623025",
//       label: "玛曲县"
//     }, {
//       value: "623026",
//       label: "碌曲县"
//     }, {
//       value: "623027",
//       label: "夏河县"
//     }]
//   }]
// }, {
//   value: "63",
//   label: "青海省",
//   children: [{
//     value: "6301",
//     label: "西宁市",
//     children: [{
//       value: "630102",
//       label: "城东区"
//     }, {
//       value: "630103",
//       label: "城中区"
//     }, {
//       value: "630104",
//       label: "城西区"
//     }, {
//       value: "630105",
//       label: "城北区"
//     }, {
//       value: "630106",
//       label: "湟中区"
//     }, {
//       value: "630121",
//       label: "大通回族土族自治县"
//     }, {
//       value: "630123",
//       label: "湟源县"
//     }]
//   }, {
//     value: "6302",
//     label: "海东市",
//     children: [{
//       value: "630202",
//       label: "乐都区"
//     }, {
//       value: "630203",
//       label: "平安区"
//     }, {
//       value: "630222",
//       label: "民和回族土族自治县"
//     }, {
//       value: "630223",
//       label: "互助土族自治县"
//     }, {
//       value: "630224",
//       label: "化隆回族自治县"
//     }, {
//       value: "630225",
//       label: "循化撒拉族自治县"
//     }]
//   }, {
//     value: "6322",
//     label: "海北藏族自治州",
//     children: [{
//       value: "632221",
//       label: "门源回族自治县"
//     }, {
//       value: "632222",
//       label: "祁连县"
//     }, {
//       value: "632223",
//       label: "海晏县"
//     }, {
//       value: "632224",
//       label: "刚察县"
//     }]
//   }, {
//     value: "6323",
//     label: "黄南藏族自治州",
//     children: [{
//       value: "632321",
//       label: "同仁县"
//     }, {
//       value: "632322",
//       label: "尖扎县"
//     }, {
//       value: "632323",
//       label: "泽库县"
//     }, {
//       value: "632324",
//       label: "河南蒙古族自治县"
//     }]
//   }, {
//     value: "6325",
//     label: "海南藏族自治州",
//     children: [{
//       value: "632521",
//       label: "共和县"
//     }, {
//       value: "632522",
//       label: "同德县"
//     }, {
//       value: "632523",
//       label: "贵德县"
//     }, {
//       value: "632524",
//       label: "兴海县"
//     }, {
//       value: "632525",
//       label: "贵南县"
//     }]
//   }, {
//     value: "6326",
//     label: "果洛藏族自治州",
//     children: [{
//       value: "632621",
//       label: "玛沁县"
//     }, {
//       value: "632622",
//       label: "班玛县"
//     }, {
//       value: "632623",
//       label: "甘德县"
//     }, {
//       value: "632624",
//       label: "达日县"
//     }, {
//       value: "632625",
//       label: "久治县"
//     }, {
//       value: "632626",
//       label: "玛多县"
//     }]
//   }, {
//     value: "6327",
//     label: "玉树藏族自治州",
//     children: [{
//       value: "632701",
//       label: "玉树市"
//     }, {
//       value: "632722",
//       label: "杂多县"
//     }, {
//       value: "632723",
//       label: "称多县"
//     }, {
//       value: "632724",
//       label: "治多县"
//     }, {
//       value: "632725",
//       label: "囊谦县"
//     }, {
//       value: "632726",
//       label: "曲麻莱县"
//     }]
//   }, {
//     value: "6328",
//     label: "海西蒙古族藏族自治州",
//     children: [{
//       value: "632801",
//       label: "格尔木市"
//     }, {
//       value: "632802",
//       label: "德令哈市"
//     }, {
//       value: "632803",
//       label: "茫崖市"
//     }, {
//       value: "632821",
//       label: "乌兰县"
//     }, {
//       value: "632822",
//       label: "都兰县"
//     }, {
//       value: "632823",
//       label: "天峻县"
//     }, {
//       value: "632857",
//       label: "大柴旦行政委员会"
//     }]
//   }]
// }, {
//   value: "64",
//   label: "宁夏回族自治区",
//   children: [{
//     value: "6401",
//     label: "银川市",
//     children: [{
//       value: "640104",
//       label: "兴庆区"
//     }, {
//       value: "640105",
//       label: "西夏区"
//     }, {
//       value: "640106",
//       label: "金凤区"
//     }, {
//       value: "640121",
//       label: "永宁县"
//     }, {
//       value: "640122",
//       label: "贺兰县"
//     }, {
//       value: "640181",
//       label: "灵武市"
//     }]
//   }, {
//     value: "6402",
//     label: "石嘴山市",
//     children: [{
//       value: "640202",
//       label: "大武口区"
//     }, {
//       value: "640205",
//       label: "惠农区"
//     }, {
//       value: "640221",
//       label: "平罗县"
//     }]
//   }, {
//     value: "6403",
//     label: "吴忠市",
//     children: [{
//       value: "640302",
//       label: "利通区"
//     }, {
//       value: "640303",
//       label: "红寺堡区"
//     }, {
//       value: "640323",
//       label: "盐池县"
//     }, {
//       value: "640324",
//       label: "同心县"
//     }, {
//       value: "640381",
//       label: "青铜峡市"
//     }]
//   }, {
//     value: "6404",
//     label: "固原市",
//     children: [{
//       value: "640402",
//       label: "原州区"
//     }, {
//       value: "640422",
//       label: "西吉县"
//     }, {
//       value: "640423",
//       label: "隆德县"
//     }, {
//       value: "640424",
//       label: "泾源县"
//     }, {
//       value: "640425",
//       label: "彭阳县"
//     }]
//   }, {
//     value: "6405",
//     label: "中卫市",
//     children: [{
//       value: "640502",
//       label: "沙坡头区"
//     }, {
//       value: "640521",
//       label: "中宁县"
//     }, {
//       value: "640522",
//       label: "海原县"
//     }]
//   }]
// }, {
//   value: "65",
//   label: "新疆维吾尔自治区",
//   children: [{
//     value: "6501",
//     label: "乌鲁木齐市",
//     children: [{
//       value: "650102",
//       label: "天山区"
//     }, {
//       value: "650103",
//       label: "沙依巴克区"
//     }, {
//       value: "650104",
//       label: "新市区"
//     }, {
//       value: "650105",
//       label: "水磨沟区"
//     }, {
//       value: "650106",
//       label: "头屯河区"
//     }, {
//       value: "650107",
//       label: "达坂城区"
//     }, {
//       value: "650109",
//       label: "米东区"
//     }, {
//       value: "650121",
//       label: "乌鲁木齐县"
//     }]
//   }, {
//     value: "6502",
//     label: "克拉玛依市",
//     children: [{
//       value: "650202",
//       label: "独山子区"
//     }, {
//       value: "650203",
//       label: "克拉玛依区"
//     }, {
//       value: "650204",
//       label: "白碱滩区"
//     }, {
//       value: "650205",
//       label: "乌尔禾区"
//     }]
//   }, {
//     value: "6504",
//     label: "吐鲁番市",
//     children: [{
//       value: "650402",
//       label: "高昌区"
//     }, {
//       value: "650421",
//       label: "鄯善县"
//     }, {
//       value: "650422",
//       label: "托克逊县"
//     }]
//   }, {
//     value: "6505",
//     label: "哈密市",
//     children: [{
//       value: "650502",
//       label: "伊州区"
//     }, {
//       value: "650521",
//       label: "巴里坤哈萨克自治县"
//     }, {
//       value: "650522",
//       label: "伊吾县"
//     }]
//   }, {
//     value: "6523",
//     label: "昌吉回族自治州",
//     children: [{
//       value: "652301",
//       label: "昌吉市"
//     }, {
//       value: "652302",
//       label: "阜康市"
//     }, {
//       value: "652323",
//       label: "呼图壁县"
//     }, {
//       value: "652324",
//       label: "玛纳斯县"
//     }, {
//       value: "652325",
//       label: "奇台县"
//     }, {
//       value: "652327",
//       label: "吉木萨尔县"
//     }, {
//       value: "652328",
//       label: "木垒哈萨克自治县"
//     }]
//   }, {
//     value: "6527",
//     label: "博尔塔拉蒙古自治州",
//     children: [{
//       value: "652701",
//       label: "博乐市"
//     }, {
//       value: "652702",
//       label: "阿拉山口市"
//     }, {
//       value: "652722",
//       label: "精河县"
//     }, {
//       value: "652723",
//       label: "温泉县"
//     }]
//   }, {
//     value: "6528",
//     label: "巴音郭楞蒙古自治州",
//     children: [{
//       value: "652801",
//       label: "库尔勒市"
//     }, {
//       value: "652822",
//       label: "轮台县"
//     }, {
//       value: "652823",
//       label: "尉犁县"
//     }, {
//       value: "652824",
//       label: "若羌县"
//     }, {
//       value: "652825",
//       label: "且末县"
//     }, {
//       value: "652826",
//       label: "焉耆回族自治县"
//     }, {
//       value: "652827",
//       label: "和静县"
//     }, {
//       value: "652828",
//       label: "和硕县"
//     }, {
//       value: "652829",
//       label: "博湖县"
//     }, {
//       value: "652871",
//       label: "库尔勒经济技术开发区"
//     }]
//   }, {
//     value: "6529",
//     label: "阿克苏地区",
//     children: [{
//       value: "652901",
//       label: "阿克苏市"
//     }, {
//       value: "652902",
//       label: "库车市"
//     }, {
//       value: "652922",
//       label: "温宿县"
//     }, {
//       value: "652924",
//       label: "沙雅县"
//     }, {
//       value: "652925",
//       label: "新和县"
//     }, {
//       value: "652926",
//       label: "拜城县"
//     }, {
//       value: "652927",
//       label: "乌什县"
//     }, {
//       value: "652928",
//       label: "阿瓦提县"
//     }, {
//       value: "652929",
//       label: "柯坪县"
//     }]
//   }, {
//     value: "6530",
//     label: "克孜勒苏柯尔克孜自治州",
//     children: [{
//       value: "653001",
//       label: "阿图什市"
//     }, {
//       value: "653022",
//       label: "阿克陶县"
//     }, {
//       value: "653023",
//       label: "阿合奇县"
//     }, {
//       value: "653024",
//       label: "乌恰县"
//     }]
//   }, {
//     value: "6531",
//     label: "喀什地区",
//     children: [{
//       value: "653101",
//       label: "喀什市"
//     }, {
//       value: "653121",
//       label: "疏附县"
//     }, {
//       value: "653122",
//       label: "疏勒县"
//     }, {
//       value: "653123",
//       label: "英吉沙县"
//     }, {
//       value: "653124",
//       label: "泽普县"
//     }, {
//       value: "653125",
//       label: "莎车县"
//     }, {
//       value: "653126",
//       label: "叶城县"
//     }, {
//       value: "653127",
//       label: "麦盖提县"
//     }, {
//       value: "653128",
//       label: "岳普湖县"
//     }, {
//       value: "653129",
//       label: "伽师县"
//     }, {
//       value: "653130",
//       label: "巴楚县"
//     }, {
//       value: "653131",
//       label: "塔什库尔干塔吉克自治县"
//     }]
//   }, {
//     value: "6532",
//     label: "和田地区",
//     children: [{
//       value: "653201",
//       label: "和田市"
//     }, {
//       value: "653221",
//       label: "和田县"
//     }, {
//       value: "653222",
//       label: "墨玉县"
//     }, {
//       value: "653223",
//       label: "皮山县"
//     }, {
//       value: "653224",
//       label: "洛浦县"
//     }, {
//       value: "653225",
//       label: "策勒县"
//     }, {
//       value: "653226",
//       label: "于田县"
//     }, {
//       value: "653227",
//       label: "民丰县"
//     }]
//   }, {
//     value: "6540",
//     label: "伊犁哈萨克自治州",
//     children: [{
//       value: "654002",
//       label: "伊宁市"
//     }, {
//       value: "654003",
//       label: "奎屯市"
//     }, {
//       value: "654004",
//       label: "霍尔果斯市"
//     }, {
//       value: "654021",
//       label: "伊宁县"
//     }, {
//       value: "654022",
//       label: "察布查尔锡伯自治县"
//     }, {
//       value: "654023",
//       label: "霍城县"
//     }, {
//       value: "654024",
//       label: "巩留县"
//     }, {
//       value: "654025",
//       label: "新源县"
//     }, {
//       value: "654026",
//       label: "昭苏县"
//     }, {
//       value: "654027",
//       label: "特克斯县"
//     }, {
//       value: "654028",
//       label: "尼勒克县"
//     }]
//   }, {
//     value: "6542",
//     label: "塔城地区",
//     children: [{
//       value: "654201",
//       label: "塔城市"
//     }, {
//       value: "654202",
//       label: "乌苏市"
//     }, {
//       value: "654221",
//       label: "额敏县"
//     }, {
//       value: "654223",
//       label: "沙湾县"
//     }, {
//       value: "654224",
//       label: "托里县"
//     }, {
//       value: "654225",
//       label: "裕民县"
//     }, {
//       value: "654226",
//       label: "和布克赛尔蒙古自治县"
//     }]
//   }, {
//     value: "6543",
//     label: "阿勒泰地区",
//     children: [{
//       value: "654301",
//       label: "阿勒泰市"
//     }, {
//       value: "654321",
//       label: "布尔津县"
//     }, {
//       value: "654322",
//       label: "富蕴县"
//     }, {
//       value: "654323",
//       label: "福海县"
//     }, {
//       value: "654324",
//       label: "哈巴河县"
//     }, {
//       value: "654325",
//       label: "青河县"
//     }, {
//       value: "654326",
//       label: "吉木乃县"
//     }]
//   }, {
//     value: "6590",
//     label: "自治区直辖县级行政区划",
//     children: [{
//       value: "659001",
//       label: "石河子市"
//     }, {
//       value: "659002",
//       label: "阿拉尔市"
//     }, {
//       value: "659003",
//       label: "图木舒克市"
//     }, {
//       value: "659004",
//       label: "五家渠市"
//     }, {
//       value: "659005",
//       label: "北屯市"
//     }, {
//       value: "659006",
//       label: "铁门关市"
//     }, {
//       value: "659007",
//       label: "双河市"
//     }, {
//       value: "659008",
//       label: "可克达拉市"
//     }, {
//       value: "659009",
//       label: "昆玉市"
//     }, {
//       value: "659010",
//       label: "胡杨河市"
//     }]
//   }]
//         }],
          options_city: [
            {
              label: "无",
              value: "无",
              },{
          label: "11",
          value: "北京市",
          children: [{
         label: "1101",
         value: "市辖区",
         children: [{
           label: "110101",
           value: "东城区"
         }, {
           label: "110102",
           value: "西城区"
         }, {
           label: "110105",
           value: "朝阳区"
         }, {
           label: "110106",
           value: "丰台区"
         }, {
           label: "110107",
           value: "石景山区"
         }, {
           label: "110108",
           value: "海淀区"
         }, {
           label: "110109",
           value: "门头沟区"
         }, {
           label: "110111",
           value: "房山区"
         }, {
           label: "110112",
           value: "通州区"
         }, {
           label: "110113",
           value: "顺义区"
         }, {
           label: "110114",
           value: "昌平区"
         }, {
           label: "110115",
           value: "大兴区"
         }, {
           label: "110116",
           value: "怀柔区"
         }, {
           label: "110117",
           value: "平谷区"
         }, {
           label: "110118",
           value: "密云区"
         }, {
           label: "110119",
           value: "延庆区"
         }]
          }]
}, {
  label: "12",
  value: "天津市",
  children: [{
    label: "1201",
    value: "市辖区",
    children: [{
      label: "120101",
      value: "和平区"
    }, {
      label: "120102",
      value: "河东区"
    }, {
      label: "120103",
      value: "河西区"
    }, {
      label: "120104",
      value: "南开区"
    }, {
      label: "120105",
      value: "河北区"
    }, {
      label: "120106",
      value: "红桥区"
    }, {
      label: "120110",
      value: "东丽区"
    }, {
      label: "120111",
      value: "西青区"
    }, {
      label: "120112",
      value: "津南区"
    }, {
      label: "120113",
      value: "北辰区"
    }, {
      label: "120114",
      value: "武清区"
    }, {
      label: "120115",
      value: "宝坻区"
    }, {
      label: "120116",
      value: "滨海新区"
    }, {
      label: "120117",
      value: "宁河区"
    }, {
      label: "120118",
      value: "静海区"
    }, {
      label: "120119",
      value: "蓟州区"
    }]
  }]
}, {
  label: "13",
  value: "河北省",
  children: [{
    label: "1301",
    value: "石家庄市",
    children: [{
      label: "130102",
      value: "长安区"
    }, {
      label: "130104",
      value: "桥西区"
    }, {
      label: "130105",
      value: "新华区"
    }, {
      label: "130107",
      value: "井陉矿区"
    }, {
      label: "130108",
      value: "裕华区"
    }, {
      label: "130109",
      value: "藁城区"
    }, {
      label: "130110",
      value: "鹿泉区"
    }, {
      label: "130111",
      value: "栾城区"
    }, {
      label: "130121",
      value: "井陉县"
    }, {
      label: "130123",
      value: "正定县"
    }, {
      label: "130125",
      value: "行唐县"
    }, {
      label: "130126",
      value: "灵寿县"
    }, {
      label: "130127",
      value: "高邑县"
    }, {
      label: "130128",
      value: "深泽县"
    }, {
      label: "130129",
      value: "赞皇县"
    }, {
      label: "130130",
      value: "无极县"
    }, {
      label: "130131",
      value: "平山县"
    }, {
      label: "130132",
      value: "元氏县"
    }, {
      label: "130133",
      value: "赵县"
    }, {
      label: "130171",
      value: "石家庄高新技术产业开发区"
    }, {
      label: "130172",
      value: "石家庄循环化工园区"
    }, {
      label: "130181",
      value: "辛集市"
    }, {
      label: "130183",
      value: "晋州市"
    }, {
      label: "130184",
      value: "新乐市"
    }]
  }, {
    label: "1302",
    value: "唐山市",
    children: [{
      label: "130202",
      value: "路南区"
    }, {
      label: "130203",
      value: "路北区"
    }, {
      label: "130204",
      value: "古冶区"
    }, {
      label: "130205",
      value: "开平区"
    }, {
      label: "130207",
      value: "丰南区"
    }, {
      label: "130208",
      value: "丰润区"
    }, {
      label: "130209",
      value: "曹妃甸区"
    }, {
      label: "130224",
      value: "滦南县"
    }, {
      label: "130225",
      value: "乐亭县"
    }, {
      label: "130227",
      value: "迁西县"
    }, {
      label: "130229",
      value: "玉田县"
    }, {
      label: "130271",
      value: "河北唐山芦台经济开发区"
    }, {
      label: "130272",
      value: "唐山市汉沽管理区"
    }, {
      label: "130273",
      value: "唐山高新技术产业开发区"
    }, {
      label: "130274",
      value: "河北唐山海港经济开发区"
    }, {
      label: "130281",
      value: "遵化市"
    }, {
      label: "130283",
      value: "迁安市"
    }, {
      label: "130284",
      value: "滦州市"
    }]
  }, {
    label: "1303",
    value: "秦皇岛市",
    children: [{
      label: "130302",
      value: "海港区"
    }, {
      label: "130303",
      value: "山海关区"
    }, {
      label: "130304",
      value: "北戴河区"
    }, {
      label: "130306",
      value: "抚宁区"
    }, {
      label: "130321",
      value: "青龙满族自治县"
    }, {
      label: "130322",
      value: "昌黎县"
    }, {
      label: "130324",
      value: "卢龙县"
    }, {
      label: "130371",
      value: "秦皇岛市经济技术开发区"
    }, {
      label: "130372",
      value: "北戴河新区"
    }]
  }, {
    label: "1304",
    value: "邯郸市",
    children: [{
      label: "130402",
      value: "邯山区"
    }, {
      label: "130403",
      value: "丛台区"
    }, {
      label: "130404",
      value: "复兴区"
    }, {
      label: "130406",
      value: "峰峰矿区"
    }, {
      label: "130407",
      value: "肥乡区"
    }, {
      label: "130408",
      value: "永年区"
    }, {
      label: "130423",
      value: "临漳县"
    }, {
      label: "130424",
      value: "成安县"
    }, {
      label: "130425",
      value: "大名县"
    }, {
      label: "130426",
      value: "涉县"
    }, {
      label: "130427",
      value: "磁县"
    }, {
      label: "130430",
      value: "邱县"
    }, {
      label: "130431",
      value: "鸡泽县"
    }, {
      label: "130432",
      value: "广平县"
    }, {
      label: "130433",
      value: "馆陶县"
    }, {
      label: "130434",
      value: "魏县"
    }, {
      label: "130435",
      value: "曲周县"
    }, {
      label: "130471",
      value: "邯郸经济技术开发区"
    }, {
      label: "130473",
      value: "邯郸冀南新区"
    }, {
      label: "130481",
      value: "武安市"
    }]
  }, {
    label: "1305",
    value: "邢台市",
    children: [{
      label: "130502",
      value: "襄都区"
    }, {
      label: "130503",
      value: "信都区"
    }, {
      label: "130505",
      value: "任泽区"
    }, {
      label: "130506",
      value: "南和区"
    }, {
      label: "130522",
      value: "临城县"
    }, {
      label: "130523",
      value: "内丘县"
    }, {
      label: "130524",
      value: "柏乡县"
    }, {
      label: "130525",
      value: "隆尧县"
    }, {
      label: "130528",
      value: "宁晋县"
    }, {
      label: "130529",
      value: "巨鹿县"
    }, {
      label: "130530",
      value: "新河县"
    }, {
      label: "130531",
      value: "广宗县"
    }, {
      label: "130532",
      value: "平乡县"
    }, {
      label: "130533",
      value: "威县"
    }, {
      label: "130534",
      value: "清河县"
    }, {
      label: "130535",
      value: "临西县"
    }, {
      label: "130571",
      value: "河北邢台经济开发区"
    }, {
      label: "130581",
      value: "南宫市"
    }, {
      label: "130582",
      value: "沙河市"
    }]
  }, {
    label: "1306",
    value: "保定市",
    children: [{
      label: "130602",
      value: "竞秀区"
    }, {
      label: "130606",
      value: "莲池区"
    }, {
      label: "130607",
      value: "满城区"
    }, {
      label: "130608",
      value: "清苑区"
    }, {
      label: "130609",
      value: "徐水区"
    }, {
      label: "130623",
      value: "涞水县"
    }, {
      label: "130624",
      value: "阜平县"
    }, {
      label: "130626",
      value: "定兴县"
    }, {
      label: "130627",
      value: "唐县"
    }, {
      label: "130628",
      value: "高阳县"
    }, {
      label: "130629",
      value: "容城县"
    }, {
      label: "130630",
      value: "涞源县"
    }, {
      label: "130631",
      value: "望都县"
    }, {
      label: "130632",
      value: "安新县"
    }, {
      label: "130633",
      value: "易县"
    }, {
      label: "130634",
      value: "曲阳县"
    }, {
      label: "130635",
      value: "蠡县"
    }, {
      label: "130636",
      value: "顺平县"
    }, {
      label: "130637",
      value: "博野县"
    }, {
      label: "130638",
      value: "雄县"
    }, {
      label: "130671",
      value: "保定高新技术产业开发区"
    }, {
      label: "130672",
      value: "保定白沟新城"
    }, {
      label: "130681",
      value: "涿州市"
    }, {
      label: "130682",
      value: "定州市"
    }, {
      label: "130683",
      value: "安国市"
    }, {
      label: "130684",
      value: "高碑店市"
    }]
  }, {
    label: "1307",
    value: "张家口市",
    children: [{
      label: "130702",
      value: "桥东区"
    }, {
      label: "130703",
      value: "桥西区"
    }, {
      label: "130705",
      value: "宣化区"
    }, {
      label: "130706",
      value: "下花园区"
    }, {
      label: "130708",
      value: "万全区"
    }, {
      label: "130709",
      value: "崇礼区"
    }, {
      label: "130722",
      value: "张北县"
    }, {
      label: "130723",
      value: "康保县"
    }, {
      label: "130724",
      value: "沽源县"
    }, {
      label: "130725",
      value: "尚义县"
    }, {
      label: "130726",
      value: "蔚县"
    }, {
      label: "130727",
      value: "阳原县"
    }, {
      label: "130728",
      value: "怀安县"
    }, {
      label: "130730",
      value: "怀来县"
    }, {
      label: "130731",
      value: "涿鹿县"
    }, {
      label: "130732",
      value: "赤城县"
    }, {
      label: "130771",
      value: "张家口经济开发区"
    }, {
      label: "130772",
      value: "张家口市察北管理区"
    }, {
      label: "130773",
      value: "张家口市塞北管理区"
    }]
  }, {
    label: "1308",
    value: "承德市",
    children: [{
      label: "130802",
      value: "双桥区"
    }, {
      label: "130803",
      value: "双滦区"
    }, {
      label: "130804",
      value: "鹰手营子矿区"
    }, {
      label: "130821",
      value: "承德县"
    }, {
      label: "130822",
      value: "兴隆县"
    }, {
      label: "130824",
      value: "滦平县"
    }, {
      label: "130825",
      value: "隆化县"
    }, {
      label: "130826",
      value: "丰宁满族自治县"
    }, {
      label: "130827",
      value: "宽城满族自治县"
    }, {
      label: "130828",
      value: "围场满族蒙古族自治县"
    }, {
      label: "130871",
      value: "承德高新技术产业开发区"
    }, {
      label: "130881",
      value: "平泉市"
    }]
  }, {
    label: "1309",
    value: "沧州市",
    children: [{
      label: "130902",
      value: "新华区"
    }, {
      label: "130903",
      value: "运河区"
    }, {
      label: "130921",
      value: "沧县"
    }, {
      label: "130922",
      value: "青县"
    }, {
      label: "130923",
      value: "东光县"
    }, {
      label: "130924",
      value: "海兴县"
    }, {
      label: "130925",
      value: "盐山县"
    }, {
      label: "130926",
      value: "肃宁县"
    }, {
      label: "130927",
      value: "南皮县"
    }, {
      label: "130928",
      value: "吴桥县"
    }, {
      label: "130929",
      value: "献县"
    }, {
      label: "130930",
      value: "孟村回族自治县"
    }, {
      label: "130971",
      value: "河北沧州经济开发区"
    }, {
      label: "130972",
      value: "沧州高新技术产业开发区"
    }, {
      label: "130973",
      value: "沧州渤海新区"
    }, {
      label: "130981",
      value: "泊头市"
    }, {
      label: "130982",
      value: "任丘市"
    }, {
      label: "130983",
      value: "黄骅市"
    }, {
      label: "130984",
      value: "河间市"
    }]
  }, {
    label: "1310",
    value: "廊坊市",
    children: [{
      label: "131002",
      value: "安次区"
    }, {
      label: "131003",
      value: "广阳区"
    }, {
      label: "131022",
      value: "固安县"
    }, {
      label: "131023",
      value: "永清县"
    }, {
      label: "131024",
      value: "香河县"
    }, {
      label: "131025",
      value: "大城县"
    }, {
      label: "131026",
      value: "文安县"
    }, {
      label: "131028",
      value: "大厂回族自治县"
    }, {
      label: "131071",
      value: "廊坊经济技术开发区"
    }, {
      label: "131081",
      value: "霸州市"
    }, {
      label: "131082",
      value: "三河市"
    }]
  }, {
    label: "1311",
    value: "衡水市",
    children: [{
      label: "131102",
      value: "桃城区"
    }, {
      label: "131103",
      value: "冀州区"
    }, {
      label: "131121",
      value: "枣强县"
    }, {
      label: "131122",
      value: "武邑县"
    }, {
      label: "131123",
      value: "武强县"
    }, {
      label: "131124",
      value: "饶阳县"
    }, {
      label: "131125",
      value: "安平县"
    }, {
      label: "131126",
      value: "故城县"
    }, {
      label: "131127",
      value: "景县"
    }, {
      label: "131128",
      value: "阜城县"
    }, {
      label: "131171",
      value: "河北衡水高新技术产业开发区"
    }, {
      label: "131172",
      value: "衡水滨湖新区"
    }, {
      label: "131182",
      value: "深州市"
    }]
  }]
}, {
  label: "14",
  value: "山西省",
  children: [{
    label: "1401",
    value: "太原市",
    children: [{
      label: "140105",
      value: "小店区"
    }, {
      label: "140106",
      value: "迎泽区"
    }, {
      label: "140107",
      value: "杏花岭区"
    }, {
      label: "140108",
      value: "尖草坪区"
    }, {
      label: "140109",
      value: "万柏林区"
    }, {
      label: "140110",
      value: "晋源区"
    }, {
      label: "140121",
      value: "清徐县"
    }, {
      label: "140122",
      value: "阳曲县"
    }, {
      label: "140123",
      value: "娄烦县"
    }, {
      label: "140171",
      value: "山西转型综合改革示范区"
    }, {
      label: "140181",
      value: "古交市"
    }]
  }, {
    label: "1402",
    value: "大同市",
    children: [{
      label: "140212",
      value: "新荣区"
    }, {
      label: "140213",
      value: "平城区"
    }, {
      label: "140214",
      value: "云冈区"
    }, {
      label: "140215",
      value: "云州区"
    }, {
      label: "140221",
      value: "阳高县"
    }, {
      label: "140222",
      value: "天镇县"
    }, {
      label: "140223",
      value: "广灵县"
    }, {
      label: "140224",
      value: "灵丘县"
    }, {
      label: "140225",
      value: "浑源县"
    }, {
      label: "140226",
      value: "左云县"
    }, {
      label: "140271",
      value: "山西大同经济开发区"
    }]
  }, {
    label: "1403",
    value: "阳泉市",
    children: [{
      label: "140302",
      value: "城区"
    }, {
      label: "140303",
      value: "矿区"
    }, {
      label: "140311",
      value: "郊区"
    }, {
      label: "140321",
      value: "平定县"
    }, {
      label: "140322",
      value: "盂县"
    }]
  }, {
    label: "1404",
    value: "长治市",
    children: [{
      label: "140403",
      value: "潞州区"
    }, {
      label: "140404",
      value: "上党区"
    }, {
      label: "140405",
      value: "屯留区"
    }, {
      label: "140406",
      value: "潞城区"
    }, {
      label: "140423",
      value: "襄垣县"
    }, {
      label: "140425",
      value: "平顺县"
    }, {
      label: "140426",
      value: "黎城县"
    }, {
      label: "140427",
      value: "壶关县"
    }, {
      label: "140428",
      value: "长子县"
    }, {
      label: "140429",
      value: "武乡县"
    }, {
      label: "140430",
      value: "沁县"
    }, {
      label: "140431",
      value: "沁源县"
    }, {
      label: "140471",
      value: "山西长治高新技术产业园区"
    }]
  }, {
    label: "1405",
    value: "晋城市",
    children: [{
      label: "140502",
      value: "城区"
    }, {
      label: "140521",
      value: "沁水县"
    }, {
      label: "140522",
      value: "阳城县"
    }, {
      label: "140524",
      value: "陵川县"
    }, {
      label: "140525",
      value: "泽州县"
    }, {
      label: "140581",
      value: "高平市"
    }]
  }, {
    label: "1406",
    value: "朔州市",
    children: [{
      label: "140602",
      value: "朔城区"
    }, {
      label: "140603",
      value: "平鲁区"
    }, {
      label: "140621",
      value: "山阴县"
    }, {
      label: "140622",
      value: "应县"
    }, {
      label: "140623",
      value: "右玉县"
    }, {
      label: "140671",
      value: "山西朔州经济开发区"
    }, {
      label: "140681",
      value: "怀仁市"
    }]
  }, {
    label: "1407",
    value: "晋中市",
    children: [{
      label: "140702",
      value: "榆次区"
    }, {
      label: "140703",
      value: "太谷区"
    }, {
      label: "140721",
      value: "榆社县"
    }, {
      label: "140722",
      value: "左权县"
    }, {
      label: "140723",
      value: "和顺县"
    }, {
      label: "140724",
      value: "昔阳县"
    }, {
      label: "140725",
      value: "寿阳县"
    }, {
      label: "140727",
      value: "祁县"
    }, {
      label: "140728",
      value: "平遥县"
    }, {
      label: "140729",
      value: "灵石县"
    }, {
      label: "140781",
      value: "介休市"
    }]
  }, {
    label: "1408",
    value: "运城市",
    children: [{
      label: "140802",
      value: "盐湖区"
    }, {
      label: "140821",
      value: "临猗县"
    }, {
      label: "140822",
      value: "万荣县"
    }, {
      label: "140823",
      value: "闻喜县"
    }, {
      label: "140824",
      value: "稷山县"
    }, {
      label: "140825",
      value: "新绛县"
    }, {
      label: "140826",
      value: "绛县"
    }, {
      label: "140827",
      value: "垣曲县"
    }, {
      label: "140828",
      value: "夏县"
    }, {
      label: "140829",
      value: "平陆县"
    }, {
      label: "140830",
      value: "芮城县"
    }, {
      label: "140881",
      value: "永济市"
    }, {
      label: "140882",
      value: "河津市"
    }]
  }, {
    label: "1409",
    value: "忻州市",
    children: [{
      label: "140902",
      value: "忻府区"
    }, {
      label: "140921",
      value: "定襄县"
    }, {
      label: "140922",
      value: "五台县"
    }, {
      label: "140923",
      value: "代县"
    }, {
      label: "140924",
      value: "繁峙县"
    }, {
      label: "140925",
      value: "宁武县"
    }, {
      label: "140926",
      value: "静乐县"
    }, {
      label: "140927",
      value: "神池县"
    }, {
      label: "140928",
      value: "五寨县"
    }, {
      label: "140929",
      value: "岢岚县"
    }, {
      label: "140930",
      value: "河曲县"
    }, {
      label: "140931",
      value: "保德县"
    }, {
      label: "140932",
      value: "偏关县"
    }, {
      label: "140971",
      value: "五台山风景名胜区"
    }, {
      label: "140981",
      value: "原平市"
    }]
  }, {
    label: "1410",
    value: "临汾市",
    children: [{
      label: "141002",
      value: "尧都区"
    }, {
      label: "141021",
      value: "曲沃县"
    }, {
      label: "141022",
      value: "翼城县"
    }, {
      label: "141023",
      value: "襄汾县"
    }, {
      label: "141024",
      value: "洪洞县"
    }, {
      label: "141025",
      value: "古县"
    }, {
      label: "141026",
      value: "安泽县"
    }, {
      label: "141027",
      value: "浮山县"
    }, {
      label: "141028",
      value: "吉县"
    }, {
      label: "141029",
      value: "乡宁县"
    }, {
      label: "141030",
      value: "大宁县"
    }, {
      label: "141031",
      value: "隰县"
    }, {
      label: "141032",
      value: "永和县"
    }, {
      label: "141033",
      value: "蒲县"
    }, {
      label: "141034",
      value: "汾西县"
    }, {
      label: "141081",
      value: "侯马市"
    }, {
      label: "141082",
      value: "霍州市"
    }]
  }, {
    label: "1411",
    value: "吕梁市",
    children: [{
      label: "141102",
      value: "离石区"
    }, {
      label: "141121",
      value: "文水县"
    }, {
      label: "141122",
      value: "交城县"
    }, {
      label: "141123",
      value: "兴县"
    }, {
      label: "141124",
      value: "临县"
    }, {
      label: "141125",
      value: "柳林县"
    }, {
      label: "141126",
      value: "石楼县"
    }, {
      label: "141127",
      value: "岚县"
    }, {
      label: "141128",
      value: "方山县"
    }, {
      label: "141129",
      value: "中阳县"
    }, {
      label: "141130",
      value: "交口县"
    }, {
      label: "141181",
      value: "孝义市"
    }, {
      label: "141182",
      value: "汾阳市"
    }]
  }]
}, {
  label: "15",
  value: "内蒙古自治区",
  children: [{
    label: "1501",
    value: "呼和浩特市",
    children: [{
      label: "150102",
      value: "新城区"
    }, {
      label: "150103",
      value: "回民区"
    }, {
      label: "150104",
      value: "玉泉区"
    }, {
      label: "150105",
      value: "赛罕区"
    }, {
      label: "150121",
      value: "土默特左旗"
    }, {
      label: "150122",
      value: "托克托县"
    }, {
      label: "150123",
      value: "和林格尔县"
    }, {
      label: "150124",
      value: "清水河县"
    }, {
      label: "150125",
      value: "武川县"
    }, {
      label: "150172",
      value: "呼和浩特经济技术开发区"
    }]
  }, {
    label: "1502",
    value: "包头市",
    children: [{
      label: "150202",
      value: "东河区"
    }, {
      label: "150203",
      value: "昆都仑区"
    }, {
      label: "150204",
      value: "青山区"
    }, {
      label: "150205",
      value: "石拐区"
    }, {
      label: "150206",
      value: "白云鄂博矿区"
    }, {
      label: "150207",
      value: "九原区"
    }, {
      label: "150221",
      value: "土默特右旗"
    }, {
      label: "150222",
      value: "固阳县"
    }, {
      label: "150223",
      value: "达尔罕茂明安联合旗"
    }, {
      label: "150271",
      value: "包头稀土高新技术产业开发区"
    }]
  }, {
    label: "1503",
    value: "乌海市",
    children: [{
      label: "150302",
      value: "海勃湾区"
    }, {
      label: "150303",
      value: "海南区"
    }, {
      label: "150304",
      value: "乌达区"
    }]
  }, {
    label: "1504",
    value: "赤峰市",
    children: [{
      label: "150402",
      value: "红山区"
    }, {
      label: "150403",
      value: "元宝山区"
    }, {
      label: "150404",
      value: "松山区"
    }, {
      label: "150421",
      value: "阿鲁科尔沁旗"
    }, {
      label: "150422",
      value: "巴林左旗"
    }, {
      label: "150423",
      value: "巴林右旗"
    }, {
      label: "150424",
      value: "林西县"
    }, {
      label: "150425",
      value: "克什克腾旗"
    }, {
      label: "150426",
      value: "翁牛特旗"
    }, {
      label: "150428",
      value: "喀喇沁旗"
    }, {
      label: "150429",
      value: "宁城县"
    }, {
      label: "150430",
      value: "敖汉旗"
    }]
  }, {
    label: "1505",
    value: "通辽市",
    children: [{
      label: "150502",
      value: "科尔沁区"
    }, {
      label: "150521",
      value: "科尔沁左翼中旗"
    }, {
      label: "150522",
      value: "科尔沁左翼后旗"
    }, {
      label: "150523",
      value: "开鲁县"
    }, {
      label: "150524",
      value: "库伦旗"
    }, {
      label: "150525",
      value: "奈曼旗"
    }, {
      label: "150526",
      value: "扎鲁特旗"
    }, {
      label: "150571",
      value: "通辽经济技术开发区"
    }, {
      label: "150581",
      value: "霍林郭勒市"
    }]
  }, {
    label: "1506",
    value: "鄂尔多斯市",
    children: [{
      label: "150602",
      value: "东胜区"
    }, {
      label: "150603",
      value: "康巴什区"
    }, {
      label: "150621",
      value: "达拉特旗"
    }, {
      label: "150622",
      value: "准格尔旗"
    }, {
      label: "150623",
      value: "鄂托克前旗"
    }, {
      label: "150624",
      value: "鄂托克旗"
    }, {
      label: "150625",
      value: "杭锦旗"
    }, {
      label: "150626",
      value: "乌审旗"
    }, {
      label: "150627",
      value: "伊金霍洛旗"
    }]
  }, {
    label: "1507",
    value: "呼伦贝尔市",
    children: [{
      label: "150702",
      value: "海拉尔区"
    }, {
      label: "150703",
      value: "扎赉诺尔区"
    }, {
      label: "150721",
      value: "阿荣旗"
    }, {
      label: "150722",
      value: "莫力达瓦达斡尔族自治旗"
    }, {
      label: "150723",
      value: "鄂伦春自治旗"
    }, {
      label: "150724",
      value: "鄂温克族自治旗"
    }, {
      label: "150725",
      value: "陈巴尔虎旗"
    }, {
      label: "150726",
      value: "新巴尔虎左旗"
    }, {
      label: "150727",
      value: "新巴尔虎右旗"
    }, {
      label: "150781",
      value: "满洲里市"
    }, {
      label: "150782",
      value: "牙克石市"
    }, {
      label: "150783",
      value: "扎兰屯市"
    }, {
      label: "150784",
      value: "额尔古纳市"
    }, {
      label: "150785",
      value: "根河市"
    }]
  }, {
    label: "1508",
    value: "巴彦淖尔市",
    children: [{
      label: "150802",
      value: "临河区"
    }, {
      label: "150821",
      value: "五原县"
    }, {
      label: "150822",
      value: "磴口县"
    }, {
      label: "150823",
      value: "乌拉特前旗"
    }, {
      label: "150824",
      value: "乌拉特中旗"
    }, {
      label: "150825",
      value: "乌拉特后旗"
    }, {
      label: "150826",
      value: "杭锦后旗"
    }]
  }, {
    label: "1509",
    value: "乌兰察布市",
    children: [{
      label: "150902",
      value: "集宁区"
    }, {
      label: "150921",
      value: "卓资县"
    }, {
      label: "150922",
      value: "化德县"
    }, {
      label: "150923",
      value: "商都县"
    }, {
      label: "150924",
      value: "兴和县"
    }, {
      label: "150925",
      value: "凉城县"
    }, {
      label: "150926",
      value: "察哈尔右翼前旗"
    }, {
      label: "150927",
      value: "察哈尔右翼中旗"
    }, {
      label: "150928",
      value: "察哈尔右翼后旗"
    }, {
      label: "150929",
      value: "四子王旗"
    }, {
      label: "150981",
      value: "丰镇市"
    }]
  }, {
    label: "1522",
    value: "兴安盟",
    children: [{
      label: "152201",
      value: "乌兰浩特市"
    }, {
      label: "152202",
      value: "阿尔山市"
    }, {
      label: "152221",
      value: "科尔沁右翼前旗"
    }, {
      label: "152222",
      value: "科尔沁右翼中旗"
    }, {
      label: "152223",
      value: "扎赉特旗"
    }, {
      label: "152224",
      value: "突泉县"
    }]
  }, {
    label: "1525",
    value: "锡林郭勒盟",
    children: [{
      label: "152501",
      value: "二连浩特市"
    }, {
      label: "152502",
      value: "锡林浩特市"
    }, {
      label: "152522",
      value: "阿巴嘎旗"
    }, {
      label: "152523",
      value: "苏尼特左旗"
    }, {
      label: "152524",
      value: "苏尼特右旗"
    }, {
      label: "152525",
      value: "东乌珠穆沁旗"
    }, {
      label: "152526",
      value: "西乌珠穆沁旗"
    }, {
      label: "152527",
      value: "太仆寺旗"
    }, {
      label: "152528",
      value: "镶黄旗"
    }, {
      label: "152529",
      value: "正镶白旗"
    }, {
      label: "152530",
      value: "正蓝旗"
    }, {
      label: "152531",
      value: "多伦县"
    }, {
      label: "152571",
      value: "乌拉盖管委会"
    }]
  }, {
    label: "1529",
    value: "阿拉善盟",
    children: [{
      label: "152921",
      value: "阿拉善左旗"
    }, {
      label: "152922",
      value: "阿拉善右旗"
    }, {
      label: "152923",
      value: "额济纳旗"
    }, {
      label: "152971",
      value: "内蒙古阿拉善经济开发区"
    }]
  }]
}, {
  label: "21",
  value: "辽宁省",
  children: [{
    label: "2101",
    value: "沈阳市",
    children: [{
      label: "210102",
      value: "和平区"
    }, {
      label: "210103",
      value: "沈河区"
    }, {
      label: "210104",
      value: "大东区"
    }, {
      label: "210105",
      value: "皇姑区"
    }, {
      label: "210106",
      value: "铁西区"
    }, {
      label: "210111",
      value: "苏家屯区"
    }, {
      label: "210112",
      value: "浑南区"
    }, {
      label: "210113",
      value: "沈北新区"
    }, {
      label: "210114",
      value: "于洪区"
    }, {
      label: "210115",
      value: "辽中区"
    }, {
      label: "210123",
      value: "康平县"
    }, {
      label: "210124",
      value: "法库县"
    }, {
      label: "210181",
      value: "新民市"
    }]
  }, {
    label: "2102",
    value: "大连市",
    children: [{
      label: "210202",
      value: "中山区"
    }, {
      label: "210203",
      value: "西岗区"
    }, {
      label: "210204",
      value: "沙河口区"
    }, {
      label: "210211",
      value: "甘井子区"
    }, {
      label: "210212",
      value: "旅顺口区"
    }, {
      label: "210213",
      value: "金州区"
    }, {
      label: "210214",
      value: "普兰店区"
    }, {
      label: "210224",
      value: "长海县"
    }, {
      label: "210281",
      value: "瓦房店市"
    }, {
      label: "210283",
      value: "庄河市"
    }]
  }, {
    label: "2103",
    value: "鞍山市",
    children: [{
      label: "210302",
      value: "铁东区"
    }, {
      label: "210303",
      value: "铁西区"
    }, {
      label: "210304",
      value: "立山区"
    }, {
      label: "210311",
      value: "千山区"
    }, {
      label: "210321",
      value: "台安县"
    }, {
      label: "210323",
      value: "岫岩满族自治县"
    }, {
      label: "210381",
      value: "海城市"
    }]
  }, {
    label: "2104",
    value: "抚顺市",
    children: [{
      label: "210402",
      value: "新抚区"
    }, {
      label: "210403",
      value: "东洲区"
    }, {
      label: "210404",
      value: "望花区"
    }, {
      label: "210411",
      value: "顺城区"
    }, {
      label: "210421",
      value: "抚顺县"
    }, {
      label: "210422",
      value: "新宾满族自治县"
    }, {
      label: "210423",
      value: "清原满族自治县"
    }]
  }, {
    label: "2105",
    value: "本溪市",
    children: [{
      label: "210502",
      value: "平山区"
    }, {
      label: "210503",
      value: "溪湖区"
    }, {
      label: "210504",
      value: "明山区"
    }, {
      label: "210505",
      value: "南芬区"
    }, {
      label: "210521",
      value: "本溪满族自治县"
    }, {
      label: "210522",
      value: "桓仁满族自治县"
    }]
  }, {
    label: "2106",
    value: "丹东市",
    children: [{
      label: "210602",
      value: "元宝区"
    }, {
      label: "210603",
      value: "振兴区"
    }, {
      label: "210604",
      value: "振安区"
    }, {
      label: "210624",
      value: "宽甸满族自治县"
    }, {
      label: "210681",
      value: "东港市"
    }, {
      label: "210682",
      value: "凤城市"
    }]
  }, {
    label: "2107",
    value: "锦州市",
    children: [{
      label: "210702",
      value: "古塔区"
    }, {
      label: "210703",
      value: "凌河区"
    }, {
      label: "210711",
      value: "太和区"
    }, {
      label: "210726",
      value: "黑山县"
    }, {
      label: "210727",
      value: "义县"
    }, {
      label: "210781",
      value: "凌海市"
    }, {
      label: "210782",
      value: "北镇市"
    }]
  }, {
    label: "2108",
    value: "营口市",
    children: [{
      label: "210802",
      value: "站前区"
    }, {
      label: "210803",
      value: "西市区"
    }, {
      label: "210804",
      value: "鲅鱼圈区"
    }, {
      label: "210811",
      value: "老边区"
    }, {
      label: "210881",
      value: "盖州市"
    }, {
      label: "210882",
      value: "大石桥市"
    }]
  }, {
    label: "2109",
    value: "阜新市",
    children: [{
      label: "210902",
      value: "海州区"
    }, {
      label: "210903",
      value: "新邱区"
    }, {
      label: "210904",
      value: "太平区"
    }, {
      label: "210905",
      value: "清河门区"
    }, {
      label: "210911",
      value: "细河区"
    }, {
      label: "210921",
      value: "阜新蒙古族自治县"
    }, {
      label: "210922",
      value: "彰武县"
    }]
  }, {
    label: "2110",
    value: "辽阳市",
    children: [{
      label: "211002",
      value: "白塔区"
    }, {
      label: "211003",
      value: "文圣区"
    }, {
      label: "211004",
      value: "宏伟区"
    }, {
      label: "211005",
      value: "弓长岭区"
    }, {
      label: "211011",
      value: "太子河区"
    }, {
      label: "211021",
      value: "辽阳县"
    }, {
      label: "211081",
      value: "灯塔市"
    }]
  }, {
    label: "2111",
    value: "盘锦市",
    children: [{
      label: "211102",
      value: "双台子区"
    }, {
      label: "211103",
      value: "兴隆台区"
    }, {
      label: "211104",
      value: "大洼区"
    }, {
      label: "211122",
      value: "盘山县"
    }]
  }, {
    label: "2112",
    value: "铁岭市",
    children: [{
      label: "211202",
      value: "银州区"
    }, {
      label: "211204",
      value: "清河区"
    }, {
      label: "211221",
      value: "铁岭县"
    }, {
      label: "211223",
      value: "西丰县"
    }, {
      label: "211224",
      value: "昌图县"
    }, {
      label: "211281",
      value: "调兵山市"
    }, {
      label: "211282",
      value: "开原市"
    }]
  }, {
    label: "2113",
    value: "朝阳市",
    children: [{
      label: "211302",
      value: "双塔区"
    }, {
      label: "211303",
      value: "龙城区"
    }, {
      label: "211321",
      value: "朝阳县"
    }, {
      label: "211322",
      value: "建平县"
    }, {
      label: "211324",
      value: "喀喇沁左翼蒙古族自治县"
    }, {
      label: "211381",
      value: "北票市"
    }, {
      label: "211382",
      value: "凌源市"
    }]
  }, {
    label: "2114",
    value: "葫芦岛市",
    children: [{
      label: "211402",
      value: "连山区"
    }, {
      label: "211403",
      value: "龙港区"
    }, {
      label: "211404",
      value: "南票区"
    }, {
      label: "211421",
      value: "绥中县"
    }, {
      label: "211422",
      value: "建昌县"
    }, {
      label: "211481",
      value: "兴城市"
    }]
  }]
}, {
  label: "22",
  value: "吉林省",
  children: [{
    label: "2201",
    value: "长春市",
    children: [{
      label: "220102",
      value: "南关区"
    }, {
      label: "220103",
      value: "宽城区"
    }, {
      label: "220104",
      value: "朝阳区"
    }, {
      label: "220105",
      value: "二道区"
    }, {
      label: "220106",
      value: "绿园区"
    }, {
      label: "220112",
      value: "双阳区"
    }, {
      label: "220113",
      value: "九台区"
    }, {
      label: "220122",
      value: "农安县"
    }, {
      label: "220171",
      value: "长春经济技术开发区"
    }, {
      label: "220172",
      value: "长春净月高新技术产业开发区"
    }, {
      label: "220173",
      value: "长春高新技术产业开发区"
    }, {
      label: "220174",
      value: "长春汽车经济技术开发区"
    }, {
      label: "220182",
      value: "榆树市"
    }, {
      label: "220183",
      value: "德惠市"
    }, {
      label: "220184",
      value: "公主岭市"
    }]
  }, {
    label: "2202",
    value: "吉林市",
    children: [{
      label: "220202",
      value: "昌邑区"
    }, {
      label: "220203",
      value: "龙潭区"
    }, {
      label: "220204",
      value: "船营区"
    }, {
      label: "220211",
      value: "丰满区"
    }, {
      label: "220221",
      value: "永吉县"
    }, {
      label: "220271",
      value: "吉林经济开发区"
    }, {
      label: "220272",
      value: "吉林高新技术产业开发区"
    }, {
      label: "220273",
      value: "吉林中国新加坡食品区"
    }, {
      label: "220281",
      value: "蛟河市"
    }, {
      label: "220282",
      value: "桦甸市"
    }, {
      label: "220283",
      value: "舒兰市"
    }, {
      label: "220284",
      value: "磐石市"
    }]
  }, {
    label: "2203",
    value: "四平市",
    children: [{
      label: "220302",
      value: "铁西区"
    }, {
      label: "220303",
      value: "铁东区"
    }, {
      label: "220322",
      value: "梨树县"
    }, {
      label: "220323",
      value: "伊通满族自治县"
    }, {
      label: "220382",
      value: "双辽市"
    }]
  }, {
    label: "2204",
    value: "辽源市",
    children: [{
      label: "220402",
      value: "龙山区"
    }, {
      label: "220403",
      value: "西安区"
    }, {
      label: "220421",
      value: "东丰县"
    }, {
      label: "220422",
      value: "东辽县"
    }]
  }, {
    label: "2205",
    value: "通化市",
    children: [{
      label: "220502",
      value: "东昌区"
    }, {
      label: "220503",
      value: "二道江区"
    }, {
      label: "220521",
      value: "通化县"
    }, {
      label: "220523",
      value: "辉南县"
    }, {
      label: "220524",
      value: "柳河县"
    }, {
      label: "220581",
      value: "梅河口市"
    }, {
      label: "220582",
      value: "集安市"
    }]
  }, {
    label: "2206",
    value: "白山市",
    children: [{
      label: "220602",
      value: "浑江区"
    }, {
      label: "220605",
      value: "江源区"
    }, {
      label: "220621",
      value: "抚松县"
    }, {
      label: "220622",
      value: "靖宇县"
    }, {
      label: "220623",
      value: "长白朝鲜族自治县"
    }, {
      label: "220681",
      value: "临江市"
    }]
  }, {
    label: "2207",
    value: "松原市",
    children: [{
      label: "220702",
      value: "宁江区"
    }, {
      label: "220721",
      value: "前郭尔罗斯蒙古族自治县"
    }, {
      label: "220722",
      value: "长岭县"
    }, {
      label: "220723",
      value: "乾安县"
    }, {
      label: "220771",
      value: "吉林松原经济开发区"
    }, {
      label: "220781",
      value: "扶余市"
    }]
  }, {
    label: "2208",
    value: "白城市",
    children: [{
      label: "220802",
      value: "洮北区"
    }, {
      label: "220821",
      value: "镇赉县"
    }, {
      label: "220822",
      value: "通榆县"
    }, {
      label: "220871",
      value: "吉林白城经济开发区"
    }, {
      label: "220881",
      value: "洮南市"
    }, {
      label: "220882",
      value: "大安市"
    }]
  }, {
    label: "2224",
    value: "延边朝鲜族自治州",
    children: [{
      label: "222401",
      value: "延吉市"
    }, {
      label: "222402",
      value: "图们市"
    }, {
      label: "222403",
      value: "敦化市"
    }, {
      label: "222404",
      value: "珲春市"
    }, {
      label: "222405",
      value: "龙井市"
    }, {
      label: "222406",
      value: "和龙市"
    }, {
      label: "222424",
      value: "汪清县"
    }, {
      label: "222426",
      value: "安图县"
    }]
  }]
}, {
  label: "23",
  value: "黑龙江省",
  children: [{
    label: "2301",
    value: "哈尔滨市",
    children: [{
      label: "230102",
      value: "道里区"
    }, {
      label: "230103",
      value: "南岗区"
    }, {
      label: "230104",
      value: "道外区"
    }, {
      label: "230108",
      value: "平房区"
    }, {
      label: "230109",
      value: "松北区"
    }, {
      label: "230110",
      value: "香坊区"
    }, {
      label: "230111",
      value: "呼兰区"
    }, {
      label: "230112",
      value: "阿城区"
    }, {
      label: "230113",
      value: "双城区"
    }, {
      label: "230123",
      value: "依兰县"
    }, {
      label: "230124",
      value: "方正县"
    }, {
      label: "230125",
      value: "宾县"
    }, {
      label: "230126",
      value: "巴彦县"
    }, {
      label: "230127",
      value: "木兰县"
    }, {
      label: "230128",
      value: "通河县"
    }, {
      label: "230129",
      value: "延寿县"
    }, {
      label: "230183",
      value: "尚志市"
    }, {
      label: "230184",
      value: "五常市"
    }]
  }, {
    label: "2302",
    value: "齐齐哈尔市",
    children: [{
      label: "230202",
      value: "龙沙区"
    }, {
      label: "230203",
      value: "建华区"
    }, {
      label: "230204",
      value: "铁锋区"
    }, {
      label: "230205",
      value: "昂昂溪区"
    }, {
      label: "230206",
      value: "富拉尔基区"
    }, {
      label: "230207",
      value: "碾子山区"
    }, {
      label: "230208",
      value: "梅里斯达斡尔族区"
    }, {
      label: "230221",
      value: "龙江县"
    }, {
      label: "230223",
      value: "依安县"
    }, {
      label: "230224",
      value: "泰来县"
    }, {
      label: "230225",
      value: "甘南县"
    }, {
      label: "230227",
      value: "富裕县"
    }, {
      label: "230229",
      value: "克山县"
    }, {
      label: "230230",
      value: "克东县"
    }, {
      label: "230231",
      value: "拜泉县"
    }, {
      label: "230281",
      value: "讷河市"
    }]
  }, {
    label: "2303",
    value: "鸡西市",
    children: [{
      label: "230302",
      value: "鸡冠区"
    }, {
      label: "230303",
      value: "恒山区"
    }, {
      label: "230304",
      value: "滴道区"
    }, {
      label: "230305",
      value: "梨树区"
    }, {
      label: "230306",
      value: "城子河区"
    }, {
      label: "230307",
      value: "麻山区"
    }, {
      label: "230321",
      value: "鸡东县"
    }, {
      label: "230381",
      value: "虎林市"
    }, {
      label: "230382",
      value: "密山市"
    }]
  }, {
    label: "2304",
    value: "鹤岗市",
    children: [{
      label: "230402",
      value: "向阳区"
    }, {
      label: "230403",
      value: "工农区"
    }, {
      label: "230404",
      value: "南山区"
    }, {
      label: "230405",
      value: "兴安区"
    }, {
      label: "230406",
      value: "东山区"
    }, {
      label: "230407",
      value: "兴山区"
    }, {
      label: "230421",
      value: "萝北县"
    }, {
      label: "230422",
      value: "绥滨县"
    }]
  }, {
    label: "2305",
    value: "双鸭山市",
    children: [{
      label: "230502",
      value: "尖山区"
    }, {
      label: "230503",
      value: "岭东区"
    }, {
      label: "230505",
      value: "四方台区"
    }, {
      label: "230506",
      value: "宝山区"
    }, {
      label: "230521",
      value: "集贤县"
    }, {
      label: "230522",
      value: "友谊县"
    }, {
      label: "230523",
      value: "宝清县"
    }, {
      label: "230524",
      value: "饶河县"
    }]
  }, {
    label: "2306",
    value: "大庆市",
    children: [{
      label: "230602",
      value: "萨尔图区"
    }, {
      label: "230603",
      value: "龙凤区"
    }, {
      label: "230604",
      value: "让胡路区"
    }, {
      label: "230605",
      value: "红岗区"
    }, {
      label: "230606",
      value: "大同区"
    }, {
      label: "230621",
      value: "肇州县"
    }, {
      label: "230622",
      value: "肇源县"
    }, {
      label: "230623",
      value: "林甸县"
    }, {
      label: "230624",
      value: "杜尔伯特蒙古族自治县"
    }, {
      label: "230671",
      value: "大庆高新技术产业开发区"
    }]
  }, {
    label: "2307",
    value: "伊春市",
    children: [{
      label: "230717",
      value: "伊美区"
    }, {
      label: "230718",
      value: "乌翠区"
    }, {
      label: "230719",
      value: "友好区"
    }, {
      label: "230722",
      value: "嘉荫县"
    }, {
      label: "230723",
      value: "汤旺县"
    }, {
      label: "230724",
      value: "丰林县"
    }, {
      label: "230725",
      value: "大箐山县"
    }, {
      label: "230726",
      value: "南岔县"
    }, {
      label: "230751",
      value: "金林区"
    }, {
      label: "230781",
      value: "铁力市"
    }]
  }, {
    label: "2308",
    value: "佳木斯市",
    children: [{
      label: "230803",
      value: "向阳区"
    }, {
      label: "230804",
      value: "前进区"
    }, {
      label: "230805",
      value: "东风区"
    }, {
      label: "230811",
      value: "郊区"
    }, {
      label: "230822",
      value: "桦南县"
    }, {
      label: "230826",
      value: "桦川县"
    }, {
      label: "230828",
      value: "汤原县"
    }, {
      label: "230881",
      value: "同江市"
    }, {
      label: "230882",
      value: "富锦市"
    }, {
      label: "230883",
      value: "抚远市"
    }]
  }, {
    label: "2309",
    value: "七台河市",
    children: [{
      label: "230902",
      value: "新兴区"
    }, {
      label: "230903",
      value: "桃山区"
    }, {
      label: "230904",
      value: "茄子河区"
    }, {
      label: "230921",
      value: "勃利县"
    }]
  }, {
    label: "2310",
    value: "牡丹江市",
    children: [{
      label: "231002",
      value: "东安区"
    }, {
      label: "231003",
      value: "阳明区"
    }, {
      label: "231004",
      value: "爱民区"
    }, {
      label: "231005",
      value: "西安区"
    }, {
      label: "231025",
      value: "林口县"
    }, {
      label: "231071",
      value: "牡丹江经济技术开发区"
    }, {
      label: "231081",
      value: "绥芬河市"
    }, {
      label: "231083",
      value: "海林市"
    }, {
      label: "231084",
      value: "宁安市"
    }, {
      label: "231085",
      value: "穆棱市"
    }, {
      label: "231086",
      value: "东宁市"
    }]
  }, {
    label: "2311",
    value: "黑河市",
    children: [{
      label: "231102",
      value: "爱辉区"
    }, {
      label: "231123",
      value: "逊克县"
    }, {
      label: "231124",
      value: "孙吴县"
    }, {
      label: "231181",
      value: "北安市"
    }, {
      label: "231182",
      value: "五大连池市"
    }, {
      label: "231183",
      value: "嫩江市"
    }]
  }, {
    label: "2312",
    value: "绥化市",
    children: [{
      label: "231202",
      value: "北林区"
    }, {
      label: "231221",
      value: "望奎县"
    }, {
      label: "231222",
      value: "兰西县"
    }, {
      label: "231223",
      value: "青冈县"
    }, {
      label: "231224",
      value: "庆安县"
    }, {
      label: "231225",
      value: "明水县"
    }, {
      label: "231226",
      value: "绥棱县"
    }, {
      label: "231281",
      value: "安达市"
    }, {
      label: "231282",
      value: "肇东市"
    }, {
      label: "231283",
      value: "海伦市"
    }]
  }, {
    label: "2327",
    value: "大兴安岭地区",
    children: [{
      label: "232701",
      value: "漠河市"
    }, {
      label: "232721",
      value: "呼玛县"
    }, {
      label: "232722",
      value: "塔河县"
    }, {
      label: "232761",
      value: "加格达奇区"
    }, {
      label: "232762",
      value: "松岭区"
    }, {
      label: "232763",
      value: "新林区"
    }, {
      label: "232764",
      value: "呼中区"
    }]
  }]
}, {
  label: "31",
  value: "上海市",
  children: [{
    label: "3101",
    value: "市辖区",
    children: [{
      label: "310101",
      value: "黄浦区"
    }, {
      label: "310104",
      value: "徐汇区"
    }, {
      label: "310105",
      value: "长宁区"
    }, {
      label: "310106",
      value: "静安区"
    }, {
      label: "310107",
      value: "普陀区"
    }, {
      label: "310109",
      value: "虹口区"
    }, {
      label: "310110",
      value: "杨浦区"
    }, {
      label: "310112",
      value: "闵行区"
    }, {
      label: "310113",
      value: "宝山区"
    }, {
      label: "310114",
      value: "嘉定区"
    }, {
      label: "310115",
      value: "浦东新区"
    }, {
      label: "310116",
      value: "金山区"
    }, {
      label: "310117",
      value: "松江区"
    }, {
      label: "310118",
      value: "青浦区"
    }, {
      label: "310120",
      value: "奉贤区"
    }, {
      label: "310151",
      value: "崇明区"
    }]
  }]
}, {
  label: "32",
  value: "江苏省",
  children: [{
    label: "3201",
    value: "南京市",
    children: [{
      label: "320102",
      value: "玄武区"
    }, {
      label: "320104",
      value: "秦淮区"
    }, {
      label: "320105",
      value: "建邺区"
    }, {
      label: "320106",
      value: "鼓楼区"
    }, {
      label: "320111",
      value: "浦口区"
    }, {
      label: "320113",
      value: "栖霞区"
    }, {
      label: "320114",
      value: "雨花台区"
    }, {
      label: "320115",
      value: "江宁区"
    }, {
      label: "320116",
      value: "六合区"
    }, {
      label: "320117",
      value: "溧水区"
    }, {
      label: "320118",
      value: "高淳区"
    }]
  }, {
    label: "3202",
    value: "无锡市",
    children: [{
      label: "320205",
      value: "锡山区"
    }, {
      label: "320206",
      value: "惠山区"
    }, {
      label: "320211",
      value: "滨湖区"
    }, {
      label: "320213",
      value: "梁溪区"
    }, {
      label: "320214",
      value: "新吴区"
    }, {
      label: "320281",
      value: "江阴市"
    }, {
      label: "320282",
      value: "宜兴市"
    }]
  }, {
    label: "3203",
    value: "徐州市",
    children: [{
      label: "320302",
      value: "鼓楼区"
    }, {
      label: "320303",
      value: "云龙区"
    }, {
      label: "320305",
      value: "贾汪区"
    }, {
      label: "320311",
      value: "泉山区"
    }, {
      label: "320312",
      value: "铜山区"
    }, {
      label: "320321",
      value: "丰县"
    }, {
      label: "320322",
      value: "沛县"
    }, {
      label: "320324",
      value: "睢宁县"
    }, {
      label: "320371",
      value: "徐州经济技术开发区"
    }, {
      label: "320381",
      value: "新沂市"
    }, {
      label: "320382",
      value: "邳州市"
    }]
  }, {
    label: "3204",
    value: "常州市",
    children: [{
      label: "320402",
      value: "天宁区"
    }, {
      label: "320404",
      value: "钟楼区"
    }, {
      label: "320411",
      value: "新北区"
    }, {
      label: "320412",
      value: "武进区"
    }, {
      label: "320413",
      value: "金坛区"
    }, {
      label: "320481",
      value: "溧阳市"
    }]
  }, {
    label: "3205",
    value: "苏州市",
    children: [{
      label: "320505",
      value: "虎丘区"
    }, {
      label: "320506",
      value: "吴中区"
    }, {
      label: "320507",
      value: "相城区"
    }, {
      label: "320508",
      value: "姑苏区"
    }, {
      label: "320509",
      value: "吴江区"
    }, {
      label: "320571",
      value: "苏州工业园区"
    }, {
      label: "320581",
      value: "常熟市"
    }, {
      label: "320582",
      value: "张家港市"
    }, {
      label: "320583",
      value: "昆山市"
    }, {
      label: "320585",
      value: "太仓市"
    }]
  }, {
    label: "3206",
    value: "南通市",
    children: [{
      label: "320602",
      value: "崇川区"
    }, {
      label: "320611",
      value: "港闸区"
    }, {
      label: "320612",
      value: "通州区"
    }, {
      label: "320623",
      value: "如东县"
    }, {
      label: "320671",
      value: "南通经济技术开发区"
    }, {
      label: "320681",
      value: "启东市"
    }, {
      label: "320682",
      value: "如皋市"
    }, {
      label: "320684",
      value: "海门市"
    }, {
      label: "320685",
      value: "海安市"
    }]
  }, {
    label: "3207",
    value: "连云港市",
    children: [{
      label: "320703",
      value: "连云区"
    }, {
      label: "320706",
      value: "海州区"
    }, {
      label: "320707",
      value: "赣榆区"
    }, {
      label: "320722",
      value: "东海县"
    }, {
      label: "320723",
      value: "灌云县"
    }, {
      label: "320724",
      value: "灌南县"
    }, {
      label: "320771",
      value: "连云港经济技术开发区"
    }, {
      label: "320772",
      value: "连云港高新技术产业开发区"
    }]
  }, {
    label: "3208",
    value: "淮安市",
    children: [{
      label: "320803",
      value: "淮安区"
    }, {
      label: "320804",
      value: "淮阴区"
    }, {
      label: "320812",
      value: "清江浦区"
    }, {
      label: "320813",
      value: "洪泽区"
    }, {
      label: "320826",
      value: "涟水县"
    }, {
      label: "320830",
      value: "盱眙县"
    }, {
      label: "320831",
      value: "金湖县"
    }, {
      label: "320871",
      value: "淮安经济技术开发区"
    }]
  }, {
    label: "3209",
    value: "盐城市",
    children: [{
      label: "320902",
      value: "亭湖区"
    }, {
      label: "320903",
      value: "盐都区"
    }, {
      label: "320904",
      value: "大丰区"
    }, {
      label: "320921",
      value: "响水县"
    }, {
      label: "320922",
      value: "滨海县"
    }, {
      label: "320923",
      value: "阜宁县"
    }, {
      label: "320924",
      value: "射阳县"
    }, {
      label: "320925",
      value: "建湖县"
    }, {
      label: "320971",
      value: "盐城经济技术开发区"
    }, {
      label: "320981",
      value: "东台市"
    }]
  }, {
    label: "3210",
    value: "扬州市",
    children: [{
      label: "321002",
      value: "广陵区"
    }, {
      label: "321003",
      value: "邗江区"
    }, {
      label: "321012",
      value: "江都区"
    }, {
      label: "321023",
      value: "宝应县"
    }, {
      label: "321071",
      value: "扬州经济技术开发区"
    }, {
      label: "321081",
      value: "仪征市"
    }, {
      label: "321084",
      value: "高邮市"
    }]
  }, {
    label: "3211",
    value: "镇江市",
    children: [{
      label: "321102",
      value: "京口区"
    }, {
      label: "321111",
      value: "润州区"
    }, {
      label: "321112",
      value: "丹徒区"
    }, {
      label: "321171",
      value: "镇江新区"
    }, {
      label: "321181",
      value: "丹阳市"
    }, {
      label: "321182",
      value: "扬中市"
    }, {
      label: "321183",
      value: "句容市"
    }]
  }, {
    label: "3212",
    value: "泰州市",
    children: [{
      label: "321202",
      value: "海陵区"
    }, {
      label: "321203",
      value: "高港区"
    }, {
      label: "321204",
      value: "姜堰区"
    }, {
      label: "321271",
      value: "泰州医药高新技术产业开发区"
    }, {
      label: "321281",
      value: "兴化市"
    }, {
      label: "321282",
      value: "靖江市"
    }, {
      label: "321283",
      value: "泰兴市"
    }]
  }, {
    label: "3213",
    value: "宿迁市",
    children: [{
      label: "321302",
      value: "宿城区"
    }, {
      label: "321311",
      value: "宿豫区"
    }, {
      label: "321322",
      value: "沭阳县"
    }, {
      label: "321323",
      value: "泗阳县"
    }, {
      label: "321324",
      value: "泗洪县"
    }, {
      label: "321371",
      value: "宿迁经济技术开发区"
    }]
  }]
}, {
  label: "33",
  value: "浙江省",
  children: [{
    label: "3301",
    value: "杭州市",
    children: [{
      label: "330102",
      value: "上城区"
    }, {
      label: "330103",
      value: "下城区"
    }, {
      label: "330104",
      value: "江干区"
    }, {
      label: "330105",
      value: "拱墅区"
    }, {
      label: "330106",
      value: "西湖区"
    }, {
      label: "330108",
      value: "滨江区"
    }, {
      label: "330109",
      value: "萧山区"
    }, {
      label: "330110",
      value: "余杭区"
    }, {
      label: "330111",
      value: "富阳区"
    }, {
      label: "330112",
      value: "临安区"
    }, {
      label: "330122",
      value: "桐庐县"
    }, {
      label: "330127",
      value: "淳安县"
    }, {
      label: "330182",
      value: "建德市"
    }]
  }, {
    label: "3302",
    value: "宁波市",
    children: [{
      label: "330203",
      value: "海曙区"
    }, {
      label: "330205",
      value: "江北区"
    }, {
      label: "330206",
      value: "北仑区"
    }, {
      label: "330211",
      value: "镇海区"
    }, {
      label: "330212",
      value: "鄞州区"
    }, {
      label: "330213",
      value: "奉化区"
    }, {
      label: "330225",
      value: "象山县"
    }, {
      label: "330226",
      value: "宁海县"
    }, {
      label: "330281",
      value: "余姚市"
    }, {
      label: "330282",
      value: "慈溪市"
    }]
  }, {
    label: "3303",
    value: "温州市",
    children: [{
      label: "330302",
      value: "鹿城区"
    }, {
      label: "330303",
      value: "龙湾区"
    }, {
      label: "330304",
      value: "瓯海区"
    }, {
      label: "330305",
      value: "洞头区"
    }, {
      label: "330324",
      value: "永嘉县"
    }, {
      label: "330326",
      value: "平阳县"
    }, {
      label: "330327",
      value: "苍南县"
    }, {
      label: "330328",
      value: "文成县"
    }, {
      label: "330329",
      value: "泰顺县"
    }, {
      label: "330371",
      value: "温州经济技术开发区"
    }, {
      label: "330381",
      value: "瑞安市"
    }, {
      label: "330382",
      value: "乐清市"
    }, {
      label: "330383",
      value: "龙港市"
    }]
  }, {
    label: "3304",
    value: "嘉兴市",
    children: [{
      label: "330402",
      value: "南湖区"
    }, {
      label: "330411",
      value: "秀洲区"
    }, {
      label: "330421",
      value: "嘉善县"
    }, {
      label: "330424",
      value: "海盐县"
    }, {
      label: "330481",
      value: "海宁市"
    }, {
      label: "330482",
      value: "平湖市"
    }, {
      label: "330483",
      value: "桐乡市"
    }]
  }, {
    label: "3305",
    value: "湖州市",
    children: [{
      label: "330502",
      value: "吴兴区"
    }, {
      label: "330503",
      value: "南浔区"
    }, {
      label: "330521",
      value: "德清县"
    }, {
      label: "330522",
      value: "长兴县"
    }, {
      label: "330523",
      value: "安吉县"
    }]
  }, {
    label: "3306",
    value: "绍兴市",
    children: [{
      label: "330602",
      value: "越城区"
    }, {
      label: "330603",
      value: "柯桥区"
    }, {
      label: "330604",
      value: "上虞区"
    }, {
      label: "330624",
      value: "新昌县"
    }, {
      label: "330681",
      value: "诸暨市"
    }, {
      label: "330683",
      value: "嵊州市"
    }]
  }, {
    label: "3307",
    value: "金华市",
    children: [{
      label: "330702",
      value: "婺城区"
    }, {
      label: "330703",
      value: "金东区"
    }, {
      label: "330723",
      value: "武义县"
    }, {
      label: "330726",
      value: "浦江县"
    }, {
      label: "330727",
      value: "磐安县"
    }, {
      label: "330781",
      value: "兰溪市"
    }, {
      label: "330782",
      value: "义乌市"
    }, {
      label: "330783",
      value: "东阳市"
    }, {
      label: "330784",
      value: "永康市"
    }]
  }, {
    label: "3308",
    value: "衢州市",
    children: [{
      label: "330802",
      value: "柯城区"
    }, {
      label: "330803",
      value: "衢江区"
    }, {
      label: "330822",
      value: "常山县"
    }, {
      label: "330824",
      value: "开化县"
    }, {
      label: "330825",
      value: "龙游县"
    }, {
      label: "330881",
      value: "江山市"
    }]
  }, {
    label: "3309",
    value: "舟山市",
    children: [{
      label: "330902",
      value: "定海区"
    }, {
      label: "330903",
      value: "普陀区"
    }, {
      label: "330921",
      value: "岱山县"
    }, {
      label: "330922",
      value: "嵊泗县"
    }]
  }, {
    label: "3310",
    value: "台州市",
    children: [{
      label: "331002",
      value: "椒江区"
    }, {
      label: "331003",
      value: "黄岩区"
    }, {
      label: "331004",
      value: "路桥区"
    }, {
      label: "331022",
      value: "三门县"
    }, {
      label: "331023",
      value: "天台县"
    }, {
      label: "331024",
      value: "仙居县"
    }, {
      label: "331081",
      value: "温岭市"
    }, {
      label: "331082",
      value: "临海市"
    }, {
      label: "331083",
      value: "玉环市"
    }]
  }, {
    label: "3311",
    value: "丽水市",
    children: [{
      label: "331102",
      value: "莲都区"
    }, {
      label: "331121",
      value: "青田县"
    }, {
      label: "331122",
      value: "缙云县"
    }, {
      label: "331123",
      value: "遂昌县"
    }, {
      label: "331124",
      value: "松阳县"
    }, {
      label: "331125",
      value: "云和县"
    }, {
      label: "331126",
      value: "庆元县"
    }, {
      label: "331127",
      value: "景宁畲族自治县"
    }, {
      label: "331181",
      value: "龙泉市"
    }]
  }]
}, {
  label: "34",
  value: "安徽省",
  children: [{
    label: "3401",
    value: "合肥市",
    children: [{
      label: "340102",
      value: "瑶海区"
    }, {
      label: "340103",
      value: "庐阳区"
    }, {
      label: "340104",
      value: "蜀山区"
    }, {
      label: "340111",
      value: "包河区"
    }, {
      label: "340121",
      value: "长丰县"
    }, {
      label: "340122",
      value: "肥东县"
    }, {
      label: "340123",
      value: "肥西县"
    }, {
      label: "340124",
      value: "庐江县"
    }, {
      label: "340171",
      value: "合肥高新技术产业开发区"
    }, {
      label: "340172",
      value: "合肥经济技术开发区"
    }, {
      label: "340173",
      value: "合肥新站高新技术产业开发区"
    }, {
      label: "340181",
      value: "巢湖市"
    }]
  }, {
    label: "3402",
    value: "芜湖市",
    children: [{
      label: "340202",
      value: "镜湖区"
    }, {
      label: "340203",
      value: "弋江区"
    }, {
      label: "340207",
      value: "鸠江区"
    }, {
      label: "340208",
      value: "三山区"
    }, {
      label: "340221",
      value: "芜湖县"
    }, {
      label: "340222",
      value: "繁昌县"
    }, {
      label: "340223",
      value: "南陵县"
    }, {
      label: "340271",
      value: "芜湖经济技术开发区"
    }, {
      label: "340272",
      value: "安徽芜湖长江大桥经济开发区"
    }, {
      label: "340281",
      value: "无为市"
    }]
  }, {
    label: "3403",
    value: "蚌埠市",
    children: [{
      label: "340302",
      value: "龙子湖区"
    }, {
      label: "340303",
      value: "蚌山区"
    }, {
      label: "340304",
      value: "禹会区"
    }, {
      label: "340311",
      value: "淮上区"
    }, {
      label: "340321",
      value: "怀远县"
    }, {
      label: "340322",
      value: "五河县"
    }, {
      label: "340323",
      value: "固镇县"
    }, {
      label: "340371",
      value: "蚌埠市高新技术开发区"
    }, {
      label: "340372",
      value: "蚌埠市经济开发区"
    }]
  }, {
    label: "3404",
    value: "淮南市",
    children: [{
      label: "340402",
      value: "大通区"
    }, {
      label: "340403",
      value: "田家庵区"
    }, {
      label: "340404",
      value: "谢家集区"
    }, {
      label: "340405",
      value: "八公山区"
    }, {
      label: "340406",
      value: "潘集区"
    }, {
      label: "340421",
      value: "凤台县"
    }, {
      label: "340422",
      value: "寿县"
    }]
  }, {
    label: "3405",
    value: "马鞍山市",
    children: [{
      label: "340503",
      value: "花山区"
    }, {
      label: "340504",
      value: "雨山区"
    }, {
      label: "340506",
      value: "博望区"
    }, {
      label: "340521",
      value: "当涂县"
    }, {
      label: "340522",
      value: "含山县"
    }, {
      label: "340523",
      value: "和县"
    }]
  }, {
    label: "3406",
    value: "淮北市",
    children: [{
      label: "340602",
      value: "杜集区"
    }, {
      label: "340603",
      value: "相山区"
    }, {
      label: "340604",
      value: "烈山区"
    }, {
      label: "340621",
      value: "濉溪县"
    }]
  }, {
    label: "3407",
    value: "铜陵市",
    children: [{
      label: "340705",
      value: "铜官区"
    }, {
      label: "340706",
      value: "义安区"
    }, {
      label: "340711",
      value: "郊区"
    }, {
      label: "340722",
      value: "枞阳县"
    }]
  }, {
    label: "3408",
    value: "安庆市",
    children: [{
      label: "340802",
      value: "迎江区"
    }, {
      label: "340803",
      value: "大观区"
    }, {
      label: "340811",
      value: "宜秀区"
    }, {
      label: "340822",
      value: "怀宁县"
    }, {
      label: "340825",
      value: "太湖县"
    }, {
      label: "340826",
      value: "宿松县"
    }, {
      label: "340827",
      value: "望江县"
    }, {
      label: "340828",
      value: "岳西县"
    }, {
      label: "340871",
      value: "安徽安庆经济开发区"
    }, {
      label: "340881",
      value: "桐城市"
    }, {
      label: "340882",
      value: "潜山市"
    }]
  }, {
    label: "3410",
    value: "黄山市",
    children: [{
      label: "341002",
      value: "屯溪区"
    }, {
      label: "341003",
      value: "黄山区"
    }, {
      label: "341004",
      value: "徽州区"
    }, {
      label: "341021",
      value: "歙县"
    }, {
      label: "341022",
      value: "休宁县"
    }, {
      label: "341023",
      value: "黟县"
    }, {
      label: "341024",
      value: "祁门县"
    }]
  }, {
    label: "3411",
    value: "滁州市",
    children: [{
      label: "341102",
      value: "琅琊区"
    }, {
      label: "341103",
      value: "南谯区"
    }, {
      label: "341122",
      value: "来安县"
    }, {
      label: "341124",
      value: "全椒县"
    }, {
      label: "341125",
      value: "定远县"
    }, {
      label: "341126",
      value: "凤阳县"
    }, {
      label: "341171",
      value: "苏滁现代产业园"
    }, {
      label: "341172",
      value: "滁州经济技术开发区"
    }, {
      label: "341181",
      value: "天长市"
    }, {
      label: "341182",
      value: "明光市"
    }]
  }, {
    label: "3412",
    value: "阜阳市",
    children: [{
      label: "341202",
      value: "颍州区"
    }, {
      label: "341203",
      value: "颍东区"
    }, {
      label: "341204",
      value: "颍泉区"
    }, {
      label: "341221",
      value: "临泉县"
    }, {
      label: "341222",
      value: "太和县"
    }, {
      label: "341225",
      value: "阜南县"
    }, {
      label: "341226",
      value: "颍上县"
    }, {
      label: "341271",
      value: "阜阳合肥现代产业园区"
    }, {
      label: "341272",
      value: "阜阳经济技术开发区"
    }, {
      label: "341282",
      value: "界首市"
    }]
  }, {
    label: "3413",
    value: "宿州市",
    children: [{
      label: "341302",
      value: "埇桥区"
    }, {
      label: "341321",
      value: "砀山县"
    }, {
      label: "341322",
      value: "萧县"
    }, {
      label: "341323",
      value: "灵璧县"
    }, {
      label: "341324",
      value: "泗县"
    }, {
      label: "341371",
      value: "宿州马鞍山现代产业园区"
    }, {
      label: "341372",
      value: "宿州经济技术开发区"
    }]
  }, {
    label: "3415",
    value: "六安市",
    children: [{
      label: "341502",
      value: "金安区"
    }, {
      label: "341503",
      value: "裕安区"
    }, {
      label: "341504",
      value: "叶集区"
    }, {
      label: "341522",
      value: "霍邱县"
    }, {
      label: "341523",
      value: "舒城县"
    }, {
      label: "341524",
      value: "金寨县"
    }, {
      label: "341525",
      value: "霍山县"
    }]
  }, {
    label: "3416",
    value: "亳州市",
    children: [{
      label: "341602",
      value: "谯城区"
    }, {
      label: "341621",
      value: "涡阳县"
    }, {
      label: "341622",
      value: "蒙城县"
    }, {
      label: "341623",
      value: "利辛县"
    }]
  }, {
    label: "3417",
    value: "池州市",
    children: [{
      label: "341702",
      value: "贵池区"
    }, {
      label: "341721",
      value: "东至县"
    }, {
      label: "341722",
      value: "石台县"
    }, {
      label: "341723",
      value: "青阳县"
    }]
  }, {
    label: "3418",
    value: "宣城市",
    children: [{
      label: "341802",
      value: "宣州区"
    }, {
      label: "341821",
      value: "郎溪县"
    }, {
      label: "341823",
      value: "泾县"
    }, {
      label: "341824",
      value: "绩溪县"
    }, {
      label: "341825",
      value: "旌德县"
    }, {
      label: "341871",
      value: "宣城市经济开发区"
    }, {
      label: "341881",
      value: "宁国市"
    }, {
      label: "341882",
      value: "广德市"
    }]
  }]
}, {
  label: "35",
  value: "福建省",
  children: [{
    label: "3501",
    value: "福州市",
    children: [{
      label: "350102",
      value: "鼓楼区"
    }, {
      label: "350103",
      value: "台江区"
    }, {
      label: "350104",
      value: "仓山区"
    }, {
      label: "350105",
      value: "马尾区"
    }, {
      label: "350111",
      value: "晋安区"
    }, {
      label: "350112",
      value: "长乐区"
    }, {
      label: "350121",
      value: "闽侯县"
    }, {
      label: "350122",
      value: "连江县"
    }, {
      label: "350123",
      value: "罗源县"
    }, {
      label: "350124",
      value: "闽清县"
    }, {
      label: "350125",
      value: "永泰县"
    }, {
      label: "350128",
      value: "平潭县"
    }, {
      label: "350181",
      value: "福清市"
    }]
  }, {
    label: "3502",
    value: "厦门市",
    children: [{
      label: "350203",
      value: "思明区"
    }, {
      label: "350205",
      value: "海沧区"
    }, {
      label: "350206",
      value: "湖里区"
    }, {
      label: "350211",
      value: "集美区"
    }, {
      label: "350212",
      value: "同安区"
    }, {
      label: "350213",
      value: "翔安区"
    }]
  }, {
    label: "3503",
    value: "莆田市",
    children: [{
      label: "350302",
      value: "城厢区"
    }, {
      label: "350303",
      value: "涵江区"
    }, {
      label: "350304",
      value: "荔城区"
    }, {
      label: "350305",
      value: "秀屿区"
    }, {
      label: "350322",
      value: "仙游县"
    }]
  }, {
    label: "3504",
    value: "三明市",
    children: [{
      label: "350402",
      value: "梅列区"
    }, {
      label: "350403",
      value: "三元区"
    }, {
      label: "350421",
      value: "明溪县"
    }, {
      label: "350423",
      value: "清流县"
    }, {
      label: "350424",
      value: "宁化县"
    }, {
      label: "350425",
      value: "大田县"
    }, {
      label: "350426",
      value: "尤溪县"
    }, {
      label: "350427",
      value: "沙县"
    }, {
      label: "350428",
      value: "将乐县"
    }, {
      label: "350429",
      value: "泰宁县"
    }, {
      label: "350430",
      value: "建宁县"
    }, {
      label: "350481",
      value: "永安市"
    }]
  }, {
    label: "3505",
    value: "泉州市",
    children: [{
      label: "350502",
      value: "鲤城区"
    }, {
      label: "350503",
      value: "丰泽区"
    }, {
      label: "350504",
      value: "洛江区"
    }, {
      label: "350505",
      value: "泉港区"
    }, {
      label: "350521",
      value: "惠安县"
    }, {
      label: "350524",
      value: "安溪县"
    }, {
      label: "350525",
      value: "永春县"
    }, {
      label: "350526",
      value: "德化县"
    }, {
      label: "350527",
      value: "金门县"
    }, {
      label: "350581",
      value: "石狮市"
    }, {
      label: "350582",
      value: "晋江市"
    }, {
      label: "350583",
      value: "南安市"
    }]
  }, {
    label: "3506",
    value: "漳州市",
    children: [{
      label: "350602",
      value: "芗城区"
    }, {
      label: "350603",
      value: "龙文区"
    }, {
      label: "350622",
      value: "云霄县"
    }, {
      label: "350623",
      value: "漳浦县"
    }, {
      label: "350624",
      value: "诏安县"
    }, {
      label: "350625",
      value: "长泰县"
    }, {
      label: "350626",
      value: "东山县"
    }, {
      label: "350627",
      value: "南靖县"
    }, {
      label: "350628",
      value: "平和县"
    }, {
      label: "350629",
      value: "华安县"
    }, {
      label: "350681",
      value: "龙海市"
    }]
  }, {
    label: "3507",
    value: "南平市",
    children: [{
      label: "350702",
      value: "延平区"
    }, {
      label: "350703",
      value: "建阳区"
    }, {
      label: "350721",
      value: "顺昌县"
    }, {
      label: "350722",
      value: "浦城县"
    }, {
      label: "350723",
      value: "光泽县"
    }, {
      label: "350724",
      value: "松溪县"
    }, {
      label: "350725",
      value: "政和县"
    }, {
      label: "350781",
      value: "邵武市"
    }, {
      label: "350782",
      value: "武夷山市"
    }, {
      label: "350783",
      value: "建瓯市"
    }]
  }, {
    label: "3508",
    value: "龙岩市",
    children: [{
      label: "350802",
      value: "新罗区"
    }, {
      label: "350803",
      value: "永定区"
    }, {
      label: "350821",
      value: "长汀县"
    }, {
      label: "350823",
      value: "上杭县"
    }, {
      label: "350824",
      value: "武平县"
    }, {
      label: "350825",
      value: "连城县"
    }, {
      label: "350881",
      value: "漳平市"
    }]
  }, {
    label: "3509",
    value: "宁德市",
    children: [{
      label: "350902",
      value: "蕉城区"
    }, {
      label: "350921",
      value: "霞浦县"
    }, {
      label: "350922",
      value: "古田县"
    }, {
      label: "350923",
      value: "屏南县"
    }, {
      label: "350924",
      value: "寿宁县"
    }, {
      label: "350925",
      value: "周宁县"
    }, {
      label: "350926",
      value: "柘荣县"
    }, {
      label: "350981",
      value: "福安市"
    }, {
      label: "350982",
      value: "福鼎市"
    }]
  }]
}, {
  label: "36",
  value: "江西省",
  children: [{
    label: "3601",
    value: "南昌市",
    children: [{
      label: "360102",
      value: "东湖区"
    }, {
      label: "360103",
      value: "西湖区"
    }, {
      label: "360104",
      value: "青云谱区"
    }, {
      label: "360111",
      value: "青山湖区"
    }, {
      label: "360112",
      value: "新建区"
    }, {
      label: "360113",
      value: "红谷滩区"
    }, {
      label: "360121",
      value: "南昌县"
    }, {
      label: "360123",
      value: "安义县"
    }, {
      label: "360124",
      value: "进贤县"
    }]
  }, {
    label: "3602",
    value: "景德镇市",
    children: [{
      label: "360202",
      value: "昌江区"
    }, {
      label: "360203",
      value: "珠山区"
    }, {
      label: "360222",
      value: "浮梁县"
    }, {
      label: "360281",
      value: "乐平市"
    }]
  }, {
    label: "3603",
    value: "萍乡市",
    children: [{
      label: "360302",
      value: "安源区"
    }, {
      label: "360313",
      value: "湘东区"
    }, {
      label: "360321",
      value: "莲花县"
    }, {
      label: "360322",
      value: "上栗县"
    }, {
      label: "360323",
      value: "芦溪县"
    }]
  }, {
    label: "3604",
    value: "九江市",
    children: [{
      label: "360402",
      value: "濂溪区"
    }, {
      label: "360403",
      value: "浔阳区"
    }, {
      label: "360404",
      value: "柴桑区"
    }, {
      label: "360423",
      value: "武宁县"
    }, {
      label: "360424",
      value: "修水县"
    }, {
      label: "360425",
      value: "永修县"
    }, {
      label: "360426",
      value: "德安县"
    }, {
      label: "360428",
      value: "都昌县"
    }, {
      label: "360429",
      value: "湖口县"
    }, {
      label: "360430",
      value: "彭泽县"
    }, {
      label: "360481",
      value: "瑞昌市"
    }, {
      label: "360482",
      value: "共青城市"
    }, {
      label: "360483",
      value: "庐山市"
    }]
  }, {
    label: "3605",
    value: "新余市",
    children: [{
      label: "360502",
      value: "渝水区"
    }, {
      label: "360521",
      value: "分宜县"
    }]
  }, {
    label: "3606",
    value: "鹰潭市",
    children: [{
      label: "360602",
      value: "月湖区"
    }, {
      label: "360603",
      value: "余江区"
    }, {
      label: "360681",
      value: "贵溪市"
    }]
  }, {
    label: "3607",
    value: "赣州市",
    children: [{
      label: "360702",
      value: "章贡区"
    }, {
      label: "360703",
      value: "南康区"
    }, {
      label: "360704",
      value: "赣县区"
    }, {
      label: "360722",
      value: "信丰县"
    }, {
      label: "360723",
      value: "大余县"
    }, {
      label: "360724",
      value: "上犹县"
    }, {
      label: "360725",
      value: "崇义县"
    }, {
      label: "360726",
      value: "安远县"
    }, {
      label: "360728",
      value: "定南县"
    }, {
      label: "360729",
      value: "全南县"
    }, {
      label: "360730",
      value: "宁都县"
    }, {
      label: "360731",
      value: "于都县"
    }, {
      label: "360732",
      value: "兴国县"
    }, {
      label: "360733",
      value: "会昌县"
    }, {
      label: "360734",
      value: "寻乌县"
    }, {
      label: "360735",
      value: "石城县"
    }, {
      label: "360781",
      value: "瑞金市"
    }, {
      label: "360783",
      value: "龙南市"
    }]
  }, {
    label: "3608",
    value: "吉安市",
    children: [{
      label: "360802",
      value: "吉州区"
    }, {
      label: "360803",
      value: "青原区"
    }, {
      label: "360821",
      value: "吉安县"
    }, {
      label: "360822",
      value: "吉水县"
    }, {
      label: "360823",
      value: "峡江县"
    }, {
      label: "360824",
      value: "新干县"
    }, {
      label: "360825",
      value: "永丰县"
    }, {
      label: "360826",
      value: "泰和县"
    }, {
      label: "360827",
      value: "遂川县"
    }, {
      label: "360828",
      value: "万安县"
    }, {
      label: "360829",
      value: "安福县"
    }, {
      label: "360830",
      value: "永新县"
    }, {
      label: "360881",
      value: "井冈山市"
    }]
  }, {
    label: "3609",
    value: "宜春市",
    children: [{
      label: "360902",
      value: "袁州区"
    }, {
      label: "360921",
      value: "奉新县"
    }, {
      label: "360922",
      value: "万载县"
    }, {
      label: "360923",
      value: "上高县"
    }, {
      label: "360924",
      value: "宜丰县"
    }, {
      label: "360925",
      value: "靖安县"
    }, {
      label: "360926",
      value: "铜鼓县"
    }, {
      label: "360981",
      value: "丰城市"
    }, {
      label: "360982",
      value: "樟树市"
    }, {
      label: "360983",
      value: "高安市"
    }]
  }, {
    label: "3610",
    value: "抚州市",
    children: [{
      label: "361002",
      value: "临川区"
    }, {
      label: "361003",
      value: "东乡区"
    }, {
      label: "361021",
      value: "南城县"
    }, {
      label: "361022",
      value: "黎川县"
    }, {
      label: "361023",
      value: "南丰县"
    }, {
      label: "361024",
      value: "崇仁县"
    }, {
      label: "361025",
      value: "乐安县"
    }, {
      label: "361026",
      value: "宜黄县"
    }, {
      label: "361027",
      value: "金溪县"
    }, {
      label: "361028",
      value: "资溪县"
    }, {
      label: "361030",
      value: "广昌县"
    }]
  }, {
    label: "3611",
    value: "上饶市",
    children: [{
      label: "361102",
      value: "信州区"
    }, {
      label: "361103",
      value: "广丰区"
    }, {
      label: "361104",
      value: "广信区"
    }, {
      label: "361123",
      value: "玉山县"
    }, {
      label: "361124",
      value: "铅山县"
    }, {
      label: "361125",
      value: "横峰县"
    }, {
      label: "361126",
      value: "弋阳县"
    }, {
      label: "361127",
      value: "余干县"
    }, {
      label: "361128",
      value: "鄱阳县"
    }, {
      label: "361129",
      value: "万年县"
    }, {
      label: "361130",
      value: "婺源县"
    }, {
      label: "361181",
      value: "德兴市"
    }]
  }]
}, {
  label: "37",
  value: "山东省",
  children: [{
    label: "3701",
    value: "济南市",
    children: [{
      label: "370102",
      value: "历下区"
    }, {
      label: "370103",
      value: "市中区"
    }, {
      label: "370104",
      value: "槐荫区"
    }, {
      label: "370105",
      value: "天桥区"
    }, {
      label: "370112",
      value: "历城区"
    }, {
      label: "370113",
      value: "长清区"
    }, {
      label: "370114",
      value: "章丘区"
    }, {
      label: "370115",
      value: "济阳区"
    }, {
      label: "370116",
      value: "莱芜区"
    }, {
      label: "370117",
      value: "钢城区"
    }, {
      label: "370124",
      value: "平阴县"
    }, {
      label: "370126",
      value: "商河县"
    }, {
      label: "370171",
      value: "济南高新技术产业开发区"
    }]
  }, {
    label: "3702",
    value: "青岛市",
    children: [{
      label: "370202",
      value: "市南区"
    }, {
      label: "370203",
      value: "市北区"
    }, {
      label: "370211",
      value: "黄岛区"
    }, {
      label: "370212",
      value: "崂山区"
    }, {
      label: "370213",
      value: "李沧区"
    }, {
      label: "370214",
      value: "城阳区"
    }, {
      label: "370215",
      value: "即墨区"
    }, {
      label: "370271",
      value: "青岛高新技术产业开发区"
    }, {
      label: "370281",
      value: "胶州市"
    }, {
      label: "370283",
      value: "平度市"
    }, {
      label: "370285",
      value: "莱西市"
    }]
  }, {
    label: "3703",
    value: "淄博市",
    children: [{
      label: "370302",
      value: "淄川区"
    }, {
      label: "370303",
      value: "张店区"
    }, {
      label: "370304",
      value: "博山区"
    }, {
      label: "370305",
      value: "临淄区"
    }, {
      label: "370306",
      value: "周村区"
    }, {
      label: "370321",
      value: "桓台县"
    }, {
      label: "370322",
      value: "高青县"
    }, {
      label: "370323",
      value: "沂源县"
    }]
  }, {
    label: "3704",
    value: "枣庄市",
    children: [{
      label: "370402",
      value: "市中区"
    }, {
      label: "370403",
      value: "薛城区"
    }, {
      label: "370404",
      value: "峄城区"
    }, {
      label: "370405",
      value: "台儿庄区"
    }, {
      label: "370406",
      value: "山亭区"
    }, {
      label: "370481",
      value: "滕州市"
    }]
  }, {
    label: "3705",
    value: "东营市",
    children: [{
      label: "370502",
      value: "东营区"
    }, {
      label: "370503",
      value: "河口区"
    }, {
      label: "370505",
      value: "垦利区"
    }, {
      label: "370522",
      value: "利津县"
    }, {
      label: "370523",
      value: "广饶县"
    }, {
      label: "370571",
      value: "东营经济技术开发区"
    }, {
      label: "370572",
      value: "东营港经济开发区"
    }]
  }, {
    label: "3706",
    value: "烟台市",
    children: [{
      label: "370602",
      value: "芝罘区"
    }, {
      label: "370611",
      value: "福山区"
    }, {
      label: "370612",
      value: "牟平区"
    }, {
      label: "370613",
      value: "莱山区"
    }, {
      label: "370614",
      value: "蓬莱区"
    }, {
      label: "370671",
      value: "烟台高新技术产业开发区"
    }, {
      label: "370672",
      value: "烟台经济技术开发区"
    }, {
      label: "370681",
      value: "龙口市"
    }, {
      label: "370682",
      value: "莱阳市"
    }, {
      label: "370683",
      value: "莱州市"
    }, {
      label: "370685",
      value: "招远市"
    }, {
      label: "370686",
      value: "栖霞市"
    }, {
      label: "370687",
      value: "海阳市"
    }]
  }, {
    label: "3707",
    value: "潍坊市",
    children: [{
      label: "370702",
      value: "潍城区"
    }, {
      label: "370703",
      value: "寒亭区"
    }, {
      label: "370704",
      value: "坊子区"
    }, {
      label: "370705",
      value: "奎文区"
    }, {
      label: "370724",
      value: "临朐县"
    }, {
      label: "370725",
      value: "昌乐县"
    }, {
      label: "370772",
      value: "潍坊滨海经济技术开发区"
    }, {
      label: "370781",
      value: "青州市"
    }, {
      label: "370782",
      value: "诸城市"
    }, {
      label: "370783",
      value: "寿光市"
    }, {
      label: "370784",
      value: "安丘市"
    }, {
      label: "370785",
      value: "高密市"
    }, {
      label: "370786",
      value: "昌邑市"
    }]
  }, {
    label: "3708",
    value: "济宁市",
    children: [{
      label: "370811",
      value: "任城区"
    }, {
      label: "370812",
      value: "兖州区"
    }, {
      label: "370826",
      value: "微山县"
    }, {
      label: "370827",
      value: "鱼台县"
    }, {
      label: "370828",
      value: "金乡县"
    }, {
      label: "370829",
      value: "嘉祥县"
    }, {
      label: "370830",
      value: "汶上县"
    }, {
      label: "370831",
      value: "泗水县"
    }, {
      label: "370832",
      value: "梁山县"
    }, {
      label: "370871",
      value: "济宁高新技术产业开发区"
    }, {
      label: "370881",
      value: "曲阜市"
    }, {
      label: "370883",
      value: "邹城市"
    }]
  }, {
    label: "3709",
    value: "泰安市",
    children: [{
      label: "370902",
      value: "泰山区"
    }, {
      label: "370911",
      value: "岱岳区"
    }, {
      label: "370921",
      value: "宁阳县"
    }, {
      label: "370923",
      value: "东平县"
    }, {
      label: "370982",
      value: "新泰市"
    }, {
      label: "370983",
      value: "肥城市"
    }]
  }, {
    label: "3710",
    value: "威海市",
    children: [{
      label: "371002",
      value: "环翠区"
    }, {
      label: "371003",
      value: "文登区"
    }, {
      label: "371071",
      value: "威海火炬高技术产业开发区"
    }, {
      label: "371072",
      value: "威海经济技术开发区"
    }, {
      label: "371073",
      value: "威海临港经济技术开发区"
    }, {
      label: "371082",
      value: "荣成市"
    }, {
      label: "371083",
      value: "乳山市"
    }]
  }, {
    label: "3711",
    value: "日照市",
    children: [{
      label: "371102",
      value: "东港区"
    }, {
      label: "371103",
      value: "岚山区"
    }, {
      label: "371121",
      value: "五莲县"
    }, {
      label: "371122",
      value: "莒县"
    }, {
      label: "371171",
      value: "日照经济技术开发区"
    }]
  }, {
    label: "3713",
    value: "临沂市",
    children: [{
      label: "371302",
      value: "兰山区"
    }, {
      label: "371311",
      value: "罗庄区"
    }, {
      label: "371312",
      value: "河东区"
    }, {
      label: "371321",
      value: "沂南县"
    }, {
      label: "371322",
      value: "郯城县"
    }, {
      label: "371323",
      value: "沂水县"
    }, {
      label: "371324",
      value: "兰陵县"
    }, {
      label: "371325",
      value: "费县"
    }, {
      label: "371326",
      value: "平邑县"
    }, {
      label: "371327",
      value: "莒南县"
    }, {
      label: "371328",
      value: "蒙阴县"
    }, {
      label: "371329",
      value: "临沭县"
    }, {
      label: "371371",
      value: "临沂高新技术产业开发区"
    }]
  }, {
    label: "3714",
    value: "德州市",
    children: [{
      label: "371402",
      value: "德城区"
    }, {
      label: "371403",
      value: "陵城区"
    }, {
      label: "371422",
      value: "宁津县"
    }, {
      label: "371423",
      value: "庆云县"
    }, {
      label: "371424",
      value: "临邑县"
    }, {
      label: "371425",
      value: "齐河县"
    }, {
      label: "371426",
      value: "平原县"
    }, {
      label: "371427",
      value: "夏津县"
    }, {
      label: "371428",
      value: "武城县"
    }, {
      label: "371471",
      value: "德州经济技术开发区"
    }, {
      label: "371472",
      value: "德州运河经济开发区"
    }, {
      label: "371481",
      value: "乐陵市"
    }, {
      label: "371482",
      value: "禹城市"
    }]
  }, {
    label: "3715",
    value: "聊城市",
    children: [{
      label: "371502",
      value: "东昌府区"
    }, {
      label: "371503",
      value: "茌平区"
    }, {
      label: "371521",
      value: "阳谷县"
    }, {
      label: "371522",
      value: "莘县"
    }, {
      label: "371524",
      value: "东阿县"
    }, {
      label: "371525",
      value: "冠县"
    }, {
      label: "371526",
      value: "高唐县"
    }, {
      label: "371581",
      value: "临清市"
    }]
  }, {
    label: "3716",
    value: "滨州市",
    children: [{
      label: "371602",
      value: "滨城区"
    }, {
      label: "371603",
      value: "沾化区"
    }, {
      label: "371621",
      value: "惠民县"
    }, {
      label: "371622",
      value: "阳信县"
    }, {
      label: "371623",
      value: "无棣县"
    }, {
      label: "371625",
      value: "博兴县"
    }, {
      label: "371681",
      value: "邹平市"
    }]
  }, {
    label: "3717",
    value: "菏泽市",
    children: [{
      label: "371702",
      value: "牡丹区"
    }, {
      label: "371703",
      value: "定陶区"
    }, {
      label: "371721",
      value: "曹县"
    }, {
      label: "371722",
      value: "单县"
    }, {
      label: "371723",
      value: "成武县"
    }, {
      label: "371724",
      value: "巨野县"
    }, {
      label: "371725",
      value: "郓城县"
    }, {
      label: "371726",
      value: "鄄城县"
    }, {
      label: "371728",
      value: "东明县"
    }, {
      label: "371771",
      value: "菏泽经济技术开发区"
    }, {
      label: "371772",
      value: "菏泽高新技术开发区"
    }]
  }]
}, {
  label: "41",
  value: "河南省",
  children: [{
    label: "4101",
    value: "郑州市",
    children: [{
      label: "410102",
      value: "中原区"
    }, {
      label: "410103",
      value: "二七区"
    }, {
      label: "410104",
      value: "管城回族区"
    }, {
      label: "410105",
      value: "金水区"
    }, {
      label: "410106",
      value: "上街区"
    }, {
      label: "410108",
      value: "惠济区"
    }, {
      label: "410122",
      value: "中牟县"
    }, {
      label: "410171",
      value: "郑州经济技术开发区"
    }, {
      label: "410172",
      value: "郑州高新技术产业开发区"
    }, {
      label: "410173",
      value: "郑州航空港经济综合实验区"
    }, {
      label: "410181",
      value: "巩义市"
    }, {
      label: "410182",
      value: "荥阳市"
    }, {
      label: "410183",
      value: "新密市"
    }, {
      label: "410184",
      value: "新郑市"
    }, {
      label: "410185",
      value: "登封市"
    }]
  }, {
    label: "4102",
    value: "开封市",
    children: [{
      label: "410202",
      value: "龙亭区"
    }, {
      label: "410203",
      value: "顺河回族区"
    }, {
      label: "410204",
      value: "鼓楼区"
    }, {
      label: "410205",
      value: "禹王台区"
    }, {
      label: "410212",
      value: "祥符区"
    }, {
      label: "410221",
      value: "杞县"
    }, {
      label: "410222",
      value: "通许县"
    }, {
      label: "410223",
      value: "尉氏县"
    }, {
      label: "410225",
      value: "兰考县"
    }]
  }, {
    label: "4103",
    value: "洛阳市",
    children: [{
      label: "410302",
      value: "老城区"
    }, {
      label: "410303",
      value: "西工区"
    }, {
      label: "410304",
      value: "瀍河回族区"
    }, {
      label: "410305",
      value: "涧西区"
    }, {
      label: "410306",
      value: "吉利区"
    }, {
      label: "410311",
      value: "洛龙区"
    }, {
      label: "410322",
      value: "孟津县"
    }, {
      label: "410323",
      value: "新安县"
    }, {
      label: "410324",
      value: "栾川县"
    }, {
      label: "410325",
      value: "嵩县"
    }, {
      label: "410326",
      value: "汝阳县"
    }, {
      label: "410327",
      value: "宜阳县"
    }, {
      label: "410328",
      value: "洛宁县"
    }, {
      label: "410329",
      value: "伊川县"
    }, {
      label: "410371",
      value: "洛阳高新技术产业开发区"
    }, {
      label: "410381",
      value: "偃师市"
    }]
  }, {
    label: "4104",
    value: "平顶山市",
    children: [{
      label: "410402",
      value: "新华区"
    }, {
      label: "410403",
      value: "卫东区"
    }, {
      label: "410404",
      value: "石龙区"
    }, {
      label: "410411",
      value: "湛河区"
    }, {
      label: "410421",
      value: "宝丰县"
    }, {
      label: "410422",
      value: "叶县"
    }, {
      label: "410423",
      value: "鲁山县"
    }, {
      label: "410425",
      value: "郏县"
    }, {
      label: "410471",
      value: "平顶山高新技术产业开发区"
    }, {
      label: "410472",
      value: "平顶山市城乡一体化示范区"
    }, {
      label: "410481",
      value: "舞钢市"
    }, {
      label: "410482",
      value: "汝州市"
    }]
  }, {
    label: "4105",
    value: "安阳市",
    children: [{
      label: "410502",
      value: "文峰区"
    }, {
      label: "410503",
      value: "北关区"
    }, {
      label: "410505",
      value: "殷都区"
    }, {
      label: "410506",
      value: "龙安区"
    }, {
      label: "410522",
      value: "安阳县"
    }, {
      label: "410523",
      value: "汤阴县"
    }, {
      label: "410526",
      value: "滑县"
    }, {
      label: "410527",
      value: "内黄县"
    }, {
      label: "410571",
      value: "安阳高新技术产业开发区"
    }, {
      label: "410581",
      value: "林州市"
    }]
  }, {
    label: "4106",
    value: "鹤壁市",
    children: [{
      label: "410602",
      value: "鹤山区"
    }, {
      label: "410603",
      value: "山城区"
    }, {
      label: "410611",
      value: "淇滨区"
    }, {
      label: "410621",
      value: "浚县"
    }, {
      label: "410622",
      value: "淇县"
    }, {
      label: "410671",
      value: "鹤壁经济技术开发区"
    }]
  }, {
    label: "4107",
    value: "新乡市",
    children: [{
      label: "410702",
      value: "红旗区"
    }, {
      label: "410703",
      value: "卫滨区"
    }, {
      label: "410704",
      value: "凤泉区"
    }, {
      label: "410711",
      value: "牧野区"
    }, {
      label: "410721",
      value: "新乡县"
    }, {
      label: "410724",
      value: "获嘉县"
    }, {
      label: "410725",
      value: "原阳县"
    }, {
      label: "410726",
      value: "延津县"
    }, {
      label: "410727",
      value: "封丘县"
    }, {
      label: "410771",
      value: "新乡高新技术产业开发区"
    }, {
      label: "410772",
      value: "新乡经济技术开发区"
    }, {
      label: "410773",
      value: "新乡市平原城乡一体化示范区"
    }, {
      label: "410781",
      value: "卫辉市"
    }, {
      label: "410782",
      value: "辉县市"
    }, {
      label: "410783",
      value: "长垣市"
    }]
  }, {
    label: "4108",
    value: "焦作市",
    children: [{
      label: "410802",
      value: "解放区"
    }, {
      label: "410803",
      value: "中站区"
    }, {
      label: "410804",
      value: "马村区"
    }, {
      label: "410811",
      value: "山阳区"
    }, {
      label: "410821",
      value: "修武县"
    }, {
      label: "410822",
      value: "博爱县"
    }, {
      label: "410823",
      value: "武陟县"
    }, {
      label: "410825",
      value: "温县"
    }, {
      label: "410871",
      value: "焦作城乡一体化示范区"
    }, {
      label: "410882",
      value: "沁阳市"
    }, {
      label: "410883",
      value: "孟州市"
    }]
  }, {
    label: "4109",
    value: "濮阳市",
    children: [{
      label: "410902",
      value: "华龙区"
    }, {
      label: "410922",
      value: "清丰县"
    }, {
      label: "410923",
      value: "南乐县"
    }, {
      label: "410926",
      value: "范县"
    }, {
      label: "410927",
      value: "台前县"
    }, {
      label: "410928",
      value: "濮阳县"
    }, {
      label: "410971",
      value: "河南濮阳工业园区"
    }, {
      label: "410972",
      value: "濮阳经济技术开发区"
    }]
  }, {
    label: "4110",
    value: "许昌市",
    children: [{
      label: "411002",
      value: "魏都区"
    }, {
      label: "411003",
      value: "建安区"
    }, {
      label: "411024",
      value: "鄢陵县"
    }, {
      label: "411025",
      value: "襄城县"
    }, {
      label: "411071",
      value: "许昌经济技术开发区"
    }, {
      label: "411081",
      value: "禹州市"
    }, {
      label: "411082",
      value: "长葛市"
    }]
  }, {
    label: "4111",
    value: "漯河市",
    children: [{
      label: "411102",
      value: "源汇区"
    }, {
      label: "411103",
      value: "郾城区"
    }, {
      label: "411104",
      value: "召陵区"
    }, {
      label: "411121",
      value: "舞阳县"
    }, {
      label: "411122",
      value: "临颍县"
    }, {
      label: "411171",
      value: "漯河经济技术开发区"
    }]
  }, {
    label: "4112",
    value: "三门峡市",
    children: [{
      label: "411202",
      value: "湖滨区"
    }, {
      label: "411203",
      value: "陕州区"
    }, {
      label: "411221",
      value: "渑池县"
    }, {
      label: "411224",
      value: "卢氏县"
    }, {
      label: "411271",
      value: "河南三门峡经济开发区"
    }, {
      label: "411281",
      value: "义马市"
    }, {
      label: "411282",
      value: "灵宝市"
    }]
  }, {
    label: "4113",
    value: "南阳市",
    children: [{
      label: "411302",
      value: "宛城区"
    }, {
      label: "411303",
      value: "卧龙区"
    }, {
      label: "411321",
      value: "南召县"
    }, {
      label: "411322",
      value: "方城县"
    }, {
      label: "411323",
      value: "西峡县"
    }, {
      label: "411324",
      value: "镇平县"
    }, {
      label: "411325",
      value: "内乡县"
    }, {
      label: "411326",
      value: "淅川县"
    }, {
      label: "411327",
      value: "社旗县"
    }, {
      label: "411328",
      value: "唐河县"
    }, {
      label: "411329",
      value: "新野县"
    }, {
      label: "411330",
      value: "桐柏县"
    }, {
      label: "411371",
      value: "南阳高新技术产业开发区"
    }, {
      label: "411372",
      value: "南阳市城乡一体化示范区"
    }, {
      label: "411381",
      value: "邓州市"
    }]
  }, {
    label: "4114",
    value: "商丘市",
    children: [{
      label: "411402",
      value: "梁园区"
    }, {
      label: "411403",
      value: "睢阳区"
    }, {
      label: "411421",
      value: "民权县"
    }, {
      label: "411422",
      value: "睢县"
    }, {
      label: "411423",
      value: "宁陵县"
    }, {
      label: "411424",
      value: "柘城县"
    }, {
      label: "411425",
      value: "虞城县"
    }, {
      label: "411426",
      value: "夏邑县"
    }, {
      label: "411471",
      value: "豫东综合物流产业聚集区"
    }, {
      label: "411472",
      value: "河南商丘经济开发区"
    }, {
      label: "411481",
      value: "永城市"
    }]
  }, {
    label: "4115",
    value: "信阳市",
    children: [{
      label: "411502",
      value: "浉河区"
    }, {
      label: "411503",
      value: "平桥区"
    }, {
      label: "411521",
      value: "罗山县"
    }, {
      label: "411522",
      value: "光山县"
    }, {
      label: "411523",
      value: "新县"
    }, {
      label: "411524",
      value: "商城县"
    }, {
      label: "411525",
      value: "固始县"
    }, {
      label: "411526",
      value: "潢川县"
    }, {
      label: "411527",
      value: "淮滨县"
    }, {
      label: "411528",
      value: "息县"
    }, {
      label: "411571",
      value: "信阳高新技术产业开发区"
    }]
  }, {
    label: "4116",
    value: "周口市",
    children: [{
      label: "411602",
      value: "川汇区"
    }, {
      label: "411603",
      value: "淮阳区"
    }, {
      label: "411621",
      value: "扶沟县"
    }, {
      label: "411622",
      value: "西华县"
    }, {
      label: "411623",
      value: "商水县"
    }, {
      label: "411624",
      value: "沈丘县"
    }, {
      label: "411625",
      value: "郸城县"
    }, {
      label: "411627",
      value: "太康县"
    }, {
      label: "411628",
      value: "鹿邑县"
    }, {
      label: "411671",
      value: "河南周口经济开发区"
    }, {
      label: "411681",
      value: "项城市"
    }]
  }, {
    label: "4117",
    value: "驻马店市",
    children: [{
      label: "411702",
      value: "驿城区"
    }, {
      label: "411721",
      value: "西平县"
    }, {
      label: "411722",
      value: "上蔡县"
    }, {
      label: "411723",
      value: "平舆县"
    }, {
      label: "411724",
      value: "正阳县"
    }, {
      label: "411725",
      value: "确山县"
    }, {
      label: "411726",
      value: "泌阳县"
    }, {
      label: "411727",
      value: "汝南县"
    }, {
      label: "411728",
      value: "遂平县"
    }, {
      label: "411729",
      value: "新蔡县"
    }, {
      label: "411771",
      value: "河南驻马店经济开发区"
    }]
  }, {
    label: "4190",
    value: "省直辖县级行政区划",
    children: [{
      label: "419001",
      value: "济源市"
    }]
  }]
}, {
  label: "42",
  value: "湖北省",
  children: [{
    label: "4201",
    value: "武汉市",
    children: [{
      label: "420102",
      value: "江岸区"
    }, {
      label: "420103",
      value: "江汉区"
    }, {
      label: "420104",
      value: "硚口区"
    }, {
      label: "420105",
      value: "汉阳区"
    }, {
      label: "420106",
      value: "武昌区"
    }, {
      label: "420107",
      value: "青山区"
    }, {
      label: "420111",
      value: "洪山区"
    }, {
      label: "420112",
      value: "东西湖区"
    }, {
      label: "420113",
      value: "汉南区"
    }, {
      label: "420114",
      value: "蔡甸区"
    }, {
      label: "420115",
      value: "江夏区"
    }, {
      label: "420116",
      value: "黄陂区"
    }, {
      label: "420117",
      value: "新洲区"
    }]
  }, {
    label: "4202",
    value: "黄石市",
    children: [{
      label: "420202",
      value: "黄石港区"
    }, {
      label: "420203",
      value: "西塞山区"
    }, {
      label: "420204",
      value: "下陆区"
    }, {
      label: "420205",
      value: "铁山区"
    }, {
      label: "420222",
      value: "阳新县"
    }, {
      label: "420281",
      value: "大冶市"
    }]
  }, {
    label: "4203",
    value: "十堰市",
    children: [{
      label: "420302",
      value: "茅箭区"
    }, {
      label: "420303",
      value: "张湾区"
    }, {
      label: "420304",
      value: "郧阳区"
    }, {
      label: "420322",
      value: "郧西县"
    }, {
      label: "420323",
      value: "竹山县"
    }, {
      label: "420324",
      value: "竹溪县"
    }, {
      label: "420325",
      value: "房县"
    }, {
      label: "420381",
      value: "丹江口市"
    }]
  }, {
    label: "4205",
    value: "宜昌市",
    children: [{
      label: "420502",
      value: "西陵区"
    }, {
      label: "420503",
      value: "伍家岗区"
    }, {
      label: "420504",
      value: "点军区"
    }, {
      label: "420505",
      value: "猇亭区"
    }, {
      label: "420506",
      value: "夷陵区"
    }, {
      label: "420525",
      value: "远安县"
    }, {
      label: "420526",
      value: "兴山县"
    }, {
      label: "420527",
      value: "秭归县"
    }, {
      label: "420528",
      value: "长阳土家族自治县"
    }, {
      label: "420529",
      value: "五峰土家族自治县"
    }, {
      label: "420581",
      value: "宜都市"
    }, {
      label: "420582",
      value: "当阳市"
    }, {
      label: "420583",
      value: "枝江市"
    }]
  }, {
    label: "4206",
    value: "襄阳市",
    children: [{
      label: "420602",
      value: "襄城区"
    }, {
      label: "420606",
      value: "樊城区"
    }, {
      label: "420607",
      value: "襄州区"
    }, {
      label: "420624",
      value: "南漳县"
    }, {
      label: "420625",
      value: "谷城县"
    }, {
      label: "420626",
      value: "保康县"
    }, {
      label: "420682",
      value: "老河口市"
    }, {
      label: "420683",
      value: "枣阳市"
    }, {
      label: "420684",
      value: "宜城市"
    }]
  }, {
    label: "4207",
    value: "鄂州市",
    children: [{
      label: "420702",
      value: "梁子湖区"
    }, {
      label: "420703",
      value: "华容区"
    }, {
      label: "420704",
      value: "鄂城区"
    }]
  }, {
    label: "4208",
    value: "荆门市",
    children: [{
      label: "420802",
      value: "东宝区"
    }, {
      label: "420804",
      value: "掇刀区"
    }, {
      label: "420822",
      value: "沙洋县"
    }, {
      label: "420881",
      value: "钟祥市"
    }, {
      label: "420882",
      value: "京山市"
    }]
  }, {
    label: "4209",
    value: "孝感市",
    children: [{
      label: "420902",
      value: "孝南区"
    }, {
      label: "420921",
      value: "孝昌县"
    }, {
      label: "420922",
      value: "大悟县"
    }, {
      label: "420923",
      value: "云梦县"
    }, {
      label: "420981",
      value: "应城市"
    }, {
      label: "420982",
      value: "安陆市"
    }, {
      label: "420984",
      value: "汉川市"
    }]
  }, {
    label: "4210",
    value: "荆州市",
    children: [{
      label: "421002",
      value: "沙市区"
    }, {
      label: "421003",
      value: "荆州区"
    }, {
      label: "421022",
      value: "公安县"
    }, {
      label: "421023",
      value: "监利县"
    }, {
      label: "421024",
      value: "江陵县"
    }, {
      label: "421071",
      value: "荆州经济技术开发区"
    }, {
      label: "421081",
      value: "石首市"
    }, {
      label: "421083",
      value: "洪湖市"
    }, {
      label: "421087",
      value: "松滋市"
    }]
  }, {
    label: "4211",
    value: "黄冈市",
    children: [{
      label: "421102",
      value: "黄州区"
    }, {
      label: "421121",
      value: "团风县"
    }, {
      label: "421122",
      value: "红安县"
    }, {
      label: "421123",
      value: "罗田县"
    }, {
      label: "421124",
      value: "英山县"
    }, {
      label: "421125",
      value: "浠水县"
    }, {
      label: "421126",
      value: "蕲春县"
    }, {
      label: "421127",
      value: "黄梅县"
    }, {
      label: "421171",
      value: "龙感湖管理区"
    }, {
      label: "421181",
      value: "麻城市"
    }, {
      label: "421182",
      value: "武穴市"
    }]
  }, {
    label: "4212",
    value: "咸宁市",
    children: [{
      label: "421202",
      value: "咸安区"
    }, {
      label: "421221",
      value: "嘉鱼县"
    }, {
      label: "421222",
      value: "通城县"
    }, {
      label: "421223",
      value: "崇阳县"
    }, {
      label: "421224",
      value: "通山县"
    }, {
      label: "421281",
      value: "赤壁市"
    }]
  }, {
    label: "4213",
    value: "随州市",
    children: [{
      label: "421303",
      value: "曾都区"
    }, {
      label: "421321",
      value: "随县"
    }, {
      label: "421381",
      value: "广水市"
    }]
  }, {
    label: "4228",
    value: "恩施土家族苗族自治州",
    children: [{
      label: "422801",
      value: "恩施市"
    }, {
      label: "422802",
      value: "利川市"
    }, {
      label: "422822",
      value: "建始县"
    }, {
      label: "422823",
      value: "巴东县"
    }, {
      label: "422825",
      value: "宣恩县"
    }, {
      label: "422826",
      value: "咸丰县"
    }, {
      label: "422827",
      value: "来凤县"
    }, {
      label: "422828",
      value: "鹤峰县"
    }]
  }, {
    label: "4290",
    value: "省直辖县级行政区划",
    children: [{
      label: "429004",
      value: "仙桃市"
    }, {
      label: "429005",
      value: "潜江市"
    }, {
      label: "429006",
      value: "天门市"
    }, {
      label: "429021",
      value: "神农架林区"
    }]
  }]
}, {
  label: "43",
  value: "湖南省",
  children: [{
    label: "4301",
    value: "长沙市",
    children: [{
      label: "430102",
      value: "芙蓉区"
    }, {
      label: "430103",
      value: "天心区"
    }, {
      label: "430104",
      value: "岳麓区"
    }, {
      label: "430105",
      value: "开福区"
    }, {
      label: "430111",
      value: "雨花区"
    }, {
      label: "430112",
      value: "望城区"
    }, {
      label: "430121",
      value: "长沙县"
    }, {
      label: "430181",
      value: "浏阳市"
    }, {
      label: "430182",
      value: "宁乡市"
    }]
  }, {
    label: "4302",
    value: "株洲市",
    children: [{
      label: "430202",
      value: "荷塘区"
    }, {
      label: "430203",
      value: "芦淞区"
    }, {
      label: "430204",
      value: "石峰区"
    }, {
      label: "430211",
      value: "天元区"
    }, {
      label: "430212",
      value: "渌口区"
    }, {
      label: "430223",
      value: "攸县"
    }, {
      label: "430224",
      value: "茶陵县"
    }, {
      label: "430225",
      value: "炎陵县"
    }, {
      label: "430271",
      value: "云龙示范区"
    }, {
      label: "430281",
      value: "醴陵市"
    }]
  }, {
    label: "4303",
    value: "湘潭市",
    children: [{
      label: "430302",
      value: "雨湖区"
    }, {
      label: "430304",
      value: "岳塘区"
    }, {
      label: "430321",
      value: "湘潭县"
    }, {
      label: "430371",
      value: "湖南湘潭高新技术产业园区"
    }, {
      label: "430372",
      value: "湘潭昭山示范区"
    }, {
      label: "430373",
      value: "湘潭九华示范区"
    }, {
      label: "430381",
      value: "湘乡市"
    }, {
      label: "430382",
      value: "韶山市"
    }]
  }, {
    label: "4304",
    value: "衡阳市",
    children: [{
      label: "430405",
      value: "珠晖区"
    }, {
      label: "430406",
      value: "雁峰区"
    }, {
      label: "430407",
      value: "石鼓区"
    }, {
      label: "430408",
      value: "蒸湘区"
    }, {
      label: "430412",
      value: "南岳区"
    }, {
      label: "430421",
      value: "衡阳县"
    }, {
      label: "430422",
      value: "衡南县"
    }, {
      label: "430423",
      value: "衡山县"
    }, {
      label: "430424",
      value: "衡东县"
    }, {
      label: "430426",
      value: "祁东县"
    }, {
      label: "430471",
      value: "衡阳综合保税区"
    }, {
      label: "430472",
      value: "湖南衡阳高新技术产业园区"
    }, {
      label: "430473",
      value: "湖南衡阳松木经济开发区"
    }, {
      label: "430481",
      value: "耒阳市"
    }, {
      label: "430482",
      value: "常宁市"
    }]
  }, {
    label: "4305",
    value: "邵阳市",
    children: [{
      label: "430502",
      value: "双清区"
    }, {
      label: "430503",
      value: "大祥区"
    }, {
      label: "430511",
      value: "北塔区"
    }, {
      label: "430522",
      value: "新邵县"
    }, {
      label: "430523",
      value: "邵阳县"
    }, {
      label: "430524",
      value: "隆回县"
    }, {
      label: "430525",
      value: "洞口县"
    }, {
      label: "430527",
      value: "绥宁县"
    }, {
      label: "430528",
      value: "新宁县"
    }, {
      label: "430529",
      value: "城步苗族自治县"
    }, {
      label: "430581",
      value: "武冈市"
    }, {
      label: "430582",
      value: "邵东市"
    }]
  }, {
    label: "4306",
    value: "岳阳市",
    children: [{
      label: "430602",
      value: "岳阳楼区"
    }, {
      label: "430603",
      value: "云溪区"
    }, {
      label: "430611",
      value: "君山区"
    }, {
      label: "430621",
      value: "岳阳县"
    }, {
      label: "430623",
      value: "华容县"
    }, {
      label: "430624",
      value: "湘阴县"
    }, {
      label: "430626",
      value: "平江县"
    }, {
      label: "430671",
      value: "岳阳市屈原管理区"
    }, {
      label: "430681",
      value: "汨罗市"
    }, {
      label: "430682",
      value: "临湘市"
    }]
  }, {
    label: "4307",
    value: "常德市",
    children: [{
      label: "430702",
      value: "武陵区"
    }, {
      label: "430703",
      value: "鼎城区"
    }, {
      label: "430721",
      value: "安乡县"
    }, {
      label: "430722",
      value: "汉寿县"
    }, {
      label: "430723",
      value: "澧县"
    }, {
      label: "430724",
      value: "临澧县"
    }, {
      label: "430725",
      value: "桃源县"
    }, {
      label: "430726",
      value: "石门县"
    }, {
      label: "430771",
      value: "常德市西洞庭管理区"
    }, {
      label: "430781",
      value: "津市市"
    }]
  }, {
    label: "4308",
    value: "张家界市",
    children: [{
      label: "430802",
      value: "永定区"
    }, {
      label: "430811",
      value: "武陵源区"
    }, {
      label: "430821",
      value: "慈利县"
    }, {
      label: "430822",
      value: "桑植县"
    }]
  }, {
    label: "4309",
    value: "益阳市",
    children: [{
      label: "430902",
      value: "资阳区"
    }, {
      label: "430903",
      value: "赫山区"
    }, {
      label: "430921",
      value: "南县"
    }, {
      label: "430922",
      value: "桃江县"
    }, {
      label: "430923",
      value: "安化县"
    }, {
      label: "430971",
      value: "益阳市大通湖管理区"
    }, {
      label: "430972",
      value: "湖南益阳高新技术产业园区"
    }, {
      label: "430981",
      value: "沅江市"
    }]
  }, {
    label: "4310",
    value: "郴州市",
    children: [{
      label: "431002",
      value: "北湖区"
    }, {
      label: "431003",
      value: "苏仙区"
    }, {
      label: "431021",
      value: "桂阳县"
    }, {
      label: "431022",
      value: "宜章县"
    }, {
      label: "431023",
      value: "永兴县"
    }, {
      label: "431024",
      value: "嘉禾县"
    }, {
      label: "431025",
      value: "临武县"
    }, {
      label: "431026",
      value: "汝城县"
    }, {
      label: "431027",
      value: "桂东县"
    }, {
      label: "431028",
      value: "安仁县"
    }, {
      label: "431081",
      value: "资兴市"
    }]
  }, {
    label: "4311",
    value: "永州市",
    children: [{
      label: "431102",
      value: "零陵区"
    }, {
      label: "431103",
      value: "冷水滩区"
    }, {
      label: "431121",
      value: "祁阳县"
    }, {
      label: "431122",
      value: "东安县"
    }, {
      label: "431123",
      value: "双牌县"
    }, {
      label: "431124",
      value: "道县"
    }, {
      label: "431125",
      value: "江永县"
    }, {
      label: "431126",
      value: "宁远县"
    }, {
      label: "431127",
      value: "蓝山县"
    }, {
      label: "431128",
      value: "新田县"
    }, {
      label: "431129",
      value: "江华瑶族自治县"
    }, {
      label: "431171",
      value: "永州经济技术开发区"
    }, {
      label: "431172",
      value: "永州市金洞管理区"
    }, {
      label: "431173",
      value: "永州市回龙圩管理区"
    }]
  }, {
    label: "4312",
    value: "怀化市",
    children: [{
      label: "431202",
      value: "鹤城区"
    }, {
      label: "431221",
      value: "中方县"
    }, {
      label: "431222",
      value: "沅陵县"
    }, {
      label: "431223",
      value: "辰溪县"
    }, {
      label: "431224",
      value: "溆浦县"
    }, {
      label: "431225",
      value: "会同县"
    }, {
      label: "431226",
      value: "麻阳苗族自治县"
    }, {
      label: "431227",
      value: "新晃侗族自治县"
    }, {
      label: "431228",
      value: "芷江侗族自治县"
    }, {
      label: "431229",
      value: "靖州苗族侗族自治县"
    }, {
      label: "431230",
      value: "通道侗族自治县"
    }, {
      label: "431271",
      value: "怀化市洪江管理区"
    }, {
      label: "431281",
      value: "洪江市"
    }]
  }, {
    label: "4313",
    value: "娄底市",
    children: [{
      label: "431302",
      value: "娄星区"
    }, {
      label: "431321",
      value: "双峰县"
    }, {
      label: "431322",
      value: "新化县"
    }, {
      label: "431381",
      value: "冷水江市"
    }, {
      label: "431382",
      value: "涟源市"
    }]
  }, {
    label: "4331",
    value: "湘西土家族苗族自治州",
    children: [{
      label: "433101",
      value: "吉首市"
    }, {
      label: "433122",
      value: "泸溪县"
    }, {
      label: "433123",
      value: "凤凰县"
    }, {
      label: "433124",
      value: "花垣县"
    }, {
      label: "433125",
      value: "保靖县"
    }, {
      label: "433126",
      value: "古丈县"
    }, {
      label: "433127",
      value: "永顺县"
    }, {
      label: "433130",
      value: "龙山县"
    }]
  }]
}, {
  label: "44",
  value: "广东省",
  children: [{
    label: "4401",
    value: "广州市",
    children: [{
      label: "440103",
      value: "荔湾区"
    }, {
      label: "440104",
      value: "越秀区"
    }, {
      label: "440105",
      value: "海珠区"
    }, {
      label: "440106",
      value: "天河区"
    }, {
      label: "440111",
      value: "白云区"
    }, {
      label: "440112",
      value: "黄埔区"
    }, {
      label: "440113",
      value: "番禺区"
    }, {
      label: "440114",
      value: "花都区"
    }, {
      label: "440115",
      value: "南沙区"
    }, {
      label: "440117",
      value: "从化区"
    }, {
      label: "440118",
      value: "增城区"
    }]
  }, {
    label: "4402",
    value: "韶关市",
    children: [{
      label: "440203",
      value: "武江区"
    }, {
      label: "440204",
      value: "浈江区"
    }, {
      label: "440205",
      value: "曲江区"
    }, {
      label: "440222",
      value: "始兴县"
    }, {
      label: "440224",
      value: "仁化县"
    }, {
      label: "440229",
      value: "翁源县"
    }, {
      label: "440232",
      value: "乳源瑶族自治县"
    }, {
      label: "440233",
      value: "新丰县"
    }, {
      label: "440281",
      value: "乐昌市"
    }, {
      label: "440282",
      value: "南雄市"
    }]
  }, {
    label: "4403",
    value: "深圳市",
    children: [{
      label: "440303",
      value: "罗湖区"
    }, {
      label: "440304",
      value: "福田区"
    }, {
      label: "440305",
      value: "南山区"
    }, {
      label: "440306",
      value: "宝安区"
    }, {
      label: "440307",
      value: "龙岗区"
    }, {
      label: "440308",
      value: "盐田区"
    }, {
      label: "440309",
      value: "龙华区"
    }, {
      label: "440310",
      value: "坪山区"
    }, {
      label: "440311",
      value: "光明区"
    }]
  }, {
    label: "4404",
    value: "珠海市",
    children: [{
      label: "440402",
      value: "香洲区"
    }, {
      label: "440403",
      value: "斗门区"
    }, {
      label: "440404",
      value: "金湾区"
    }]
  }, {
    label: "4405",
    value: "汕头市",
    children: [{
      label: "440507",
      value: "龙湖区"
    }, {
      label: "440511",
      value: "金平区"
    }, {
      label: "440512",
      value: "濠江区"
    }, {
      label: "440513",
      value: "潮阳区"
    }, {
      label: "440514",
      value: "潮南区"
    }, {
      label: "440515",
      value: "澄海区"
    }, {
      label: "440523",
      value: "南澳县"
    }]
  }, {
    label: "4406",
    value: "佛山市",
    children: [{
      label: "440604",
      value: "禅城区"
    }, {
      label: "440605",
      value: "南海区"
    }, {
      label: "440606",
      value: "顺德区"
    }, {
      label: "440607",
      value: "三水区"
    }, {
      label: "440608",
      value: "高明区"
    }]
  }, {
    label: "4407",
    value: "江门市",
    children: [{
      label: "440703",
      value: "蓬江区"
    }, {
      label: "440704",
      value: "江海区"
    }, {
      label: "440705",
      value: "新会区"
    }, {
      label: "440781",
      value: "台山市"
    }, {
      label: "440783",
      value: "开平市"
    }, {
      label: "440784",
      value: "鹤山市"
    }, {
      label: "440785",
      value: "恩平市"
    }]
  }, {
    label: "4408",
    value: "湛江市",
    children: [{
      label: "440802",
      value: "赤坎区"
    }, {
      label: "440803",
      value: "霞山区"
    }, {
      label: "440804",
      value: "坡头区"
    }, {
      label: "440811",
      value: "麻章区"
    }, {
      label: "440823",
      value: "遂溪县"
    }, {
      label: "440825",
      value: "徐闻县"
    }, {
      label: "440881",
      value: "廉江市"
    }, {
      label: "440882",
      value: "雷州市"
    }, {
      label: "440883",
      value: "吴川市"
    }]
  }, {
    label: "4409",
    value: "茂名市",
    children: [{
      label: "440902",
      value: "茂南区"
    }, {
      label: "440904",
      value: "电白区"
    }, {
      label: "440981",
      value: "高州市"
    }, {
      label: "440982",
      value: "化州市"
    }, {
      label: "440983",
      value: "信宜市"
    }]
  }, {
    label: "4412",
    value: "肇庆市",
    children: [{
      label: "441202",
      value: "端州区"
    }, {
      label: "441203",
      value: "鼎湖区"
    }, {
      label: "441204",
      value: "高要区"
    }, {
      label: "441223",
      value: "广宁县"
    }, {
      label: "441224",
      value: "怀集县"
    }, {
      label: "441225",
      value: "封开县"
    }, {
      label: "441226",
      value: "德庆县"
    }, {
      label: "441284",
      value: "四会市"
    }]
  }, {
    label: "4413",
    value: "惠州市",
    children: [{
      label: "441302",
      value: "惠城区"
    }, {
      label: "441303",
      value: "惠阳区"
    }, {
      label: "441322",
      value: "博罗县"
    }, {
      label: "441323",
      value: "惠东县"
    }, {
      label: "441324",
      value: "龙门县"
    }]
  }, {
    label: "4414",
    value: "梅州市",
    children: [{
      label: "441402",
      value: "梅江区"
    }, {
      label: "441403",
      value: "梅县区"
    }, {
      label: "441422",
      value: "大埔县"
    }, {
      label: "441423",
      value: "丰顺县"
    }, {
      label: "441424",
      value: "五华县"
    }, {
      label: "441426",
      value: "平远县"
    }, {
      label: "441427",
      value: "蕉岭县"
    }, {
      label: "441481",
      value: "兴宁市"
    }]
  }, {
    label: "4415",
    value: "汕尾市",
    children: [{
      label: "441502",
      value: "城区"
    }, {
      label: "441521",
      value: "海丰县"
    }, {
      label: "441523",
      value: "陆河县"
    }, {
      label: "441581",
      value: "陆丰市"
    }]
  }, {
    label: "4416",
    value: "河源市",
    children: [{
      label: "441602",
      value: "源城区"
    }, {
      label: "441621",
      value: "紫金县"
    }, {
      label: "441622",
      value: "龙川县"
    }, {
      label: "441623",
      value: "连平县"
    }, {
      label: "441624",
      value: "和平县"
    }, {
      label: "441625",
      value: "东源县"
    }]
  }, {
    label: "4417",
    value: "阳江市",
    children: [{
      label: "441702",
      value: "江城区"
    }, {
      label: "441704",
      value: "阳东区"
    }, {
      label: "441721",
      value: "阳西县"
    }, {
      label: "441781",
      value: "阳春市"
    }]
  }, {
    label: "4418",
    value: "清远市",
    children: [{
      label: "441802",
      value: "清城区"
    }, {
      label: "441803",
      value: "清新区"
    }, {
      label: "441821",
      value: "佛冈县"
    }, {
      label: "441823",
      value: "阳山县"
    }, {
      label: "441825",
      value: "连山壮族瑶族自治县"
    }, {
      label: "441826",
      value: "连南瑶族自治县"
    }, {
      label: "441881",
      value: "英德市"
    }, {
      label: "441882",
      value: "连州市"
    }]
  }, {
    label: "4419",
    value: "东莞市",
    children: [{
      label: "441900003",
      value: "东城街道"
    }, {
      label: "441900004",
      value: "南城街道"
    }, {
      label: "441900005",
      value: "万江街道"
    }, {
      label: "441900006",
      value: "莞城街道"
    }, {
      label: "441900101",
      value: "石碣镇"
    }, {
      label: "441900102",
      value: "石龙镇"
    }, {
      label: "441900103",
      value: "茶山镇"
    }, {
      label: "441900104",
      value: "石排镇"
    }, {
      label: "441900105",
      value: "企石镇"
    }, {
      label: "441900106",
      value: "横沥镇"
    }, {
      label: "441900107",
      value: "桥头镇"
    }, {
      label: "441900108",
      value: "谢岗镇"
    }, {
      label: "441900109",
      value: "东坑镇"
    }, {
      label: "441900110",
      value: "常平镇"
    }, {
      label: "441900111",
      value: "寮步镇"
    }, {
      label: "441900112",
      value: "樟木头镇"
    }, {
      label: "441900113",
      value: "大朗镇"
    }, {
      label: "441900114",
      value: "黄江镇"
    }, {
      label: "441900115",
      value: "清溪镇"
    }, {
      label: "441900116",
      value: "塘厦镇"
    }, {
      label: "441900117",
      value: "凤岗镇"
    }, {
      label: "441900118",
      value: "大岭山镇"
    }, {
      label: "441900119",
      value: "长安镇"
    }, {
      label: "441900121",
      value: "虎门镇"
    }, {
      label: "441900122",
      value: "厚街镇"
    }, {
      label: "441900123",
      value: "沙田镇"
    }, {
      label: "441900124",
      value: "道滘镇"
    }, {
      label: "441900125",
      value: "洪梅镇"
    }, {
      label: "441900126",
      value: "麻涌镇"
    }, {
      label: "441900127",
      value: "望牛墩镇"
    }, {
      label: "441900128",
      value: "中堂镇"
    }, {
      label: "441900129",
      value: "高埗镇"
    }, {
      label: "441900401",
      value: "松山湖"
    }, {
      label: "441900402",
      value: "东莞港"
    }, {
      label: "441900403",
      value: "东莞生态园"
    }]
  }, {
    label: "4420",
    value: "中山市",
    children: [{
      label: "442000001",
      value: "石岐街道"
    }, {
      label: "442000002",
      value: "东区街道"
    }, {
      label: "442000003",
      value: "中山港街道"
    }, {
      label: "442000004",
      value: "西区街道"
    }, {
      label: "442000005",
      value: "南区街道"
    }, {
      label: "442000006",
      value: "五桂山街道"
    }, {
      label: "442000100",
      value: "小榄镇"
    }, {
      label: "442000101",
      value: "黄圃镇"
    }, {
      label: "442000102",
      value: "民众镇"
    }, {
      label: "442000103",
      value: "东凤镇"
    }, {
      label: "442000104",
      value: "东升镇"
    }, {
      label: "442000105",
      value: "古镇镇"
    }, {
      label: "442000106",
      value: "沙溪镇"
    }, {
      label: "442000107",
      value: "坦洲镇"
    }, {
      label: "442000108",
      value: "港口镇"
    }, {
      label: "442000109",
      value: "三角镇"
    }, {
      label: "442000110",
      value: "横栏镇"
    }, {
      label: "442000111",
      value: "南头镇"
    }, {
      label: "442000112",
      value: "阜沙镇"
    }, {
      label: "442000113",
      value: "南朗镇"
    }, {
      label: "442000114",
      value: "三乡镇"
    }, {
      label: "442000115",
      value: "板芙镇"
    }, {
      label: "442000116",
      value: "大涌镇"
    }, {
      label: "442000117",
      value: "神湾镇"
    }]
  }, {
    label: "4451",
    value: "潮州市",
    children: [{
      label: "445102",
      value: "湘桥区"
    }, {
      label: "445103",
      value: "潮安区"
    }, {
      label: "445122",
      value: "饶平县"
    }]
  }, {
    label: "4452",
    value: "揭阳市",
    children: [{
      label: "445202",
      value: "榕城区"
    }, {
      label: "445203",
      value: "揭东区"
    }, {
      label: "445222",
      value: "揭西县"
    }, {
      label: "445224",
      value: "惠来县"
    }, {
      label: "445281",
      value: "普宁市"
    }]
  }, {
    label: "4453",
    value: "云浮市",
    children: [{
      label: "445302",
      value: "云城区"
    }, {
      label: "445303",
      value: "云安区"
    }, {
      label: "445321",
      value: "新兴县"
    }, {
      label: "445322",
      value: "郁南县"
    }, {
      label: "445381",
      value: "罗定市"
    }]
  }]
}, {
  label: "45",
  value: "广西壮族自治区",
  children: [{
    label: "4501",
    value: "南宁市",
    children: [{
      label: "450102",
      value: "兴宁区"
    }, {
      label: "450103",
      value: "青秀区"
    }, {
      label: "450105",
      value: "江南区"
    }, {
      label: "450107",
      value: "西乡塘区"
    }, {
      label: "450108",
      value: "良庆区"
    }, {
      label: "450109",
      value: "邕宁区"
    }, {
      label: "450110",
      value: "武鸣区"
    }, {
      label: "450123",
      value: "隆安县"
    }, {
      label: "450124",
      value: "马山县"
    }, {
      label: "450125",
      value: "上林县"
    }, {
      label: "450126",
      value: "宾阳县"
    }, {
      label: "450127",
      value: "横县"
    }]
  }, {
    label: "4502",
    value: "柳州市",
    children: [{
      label: "450202",
      value: "城中区"
    }, {
      label: "450203",
      value: "鱼峰区"
    }, {
      label: "450204",
      value: "柳南区"
    }, {
      label: "450205",
      value: "柳北区"
    }, {
      label: "450206",
      value: "柳江区"
    }, {
      label: "450222",
      value: "柳城县"
    }, {
      label: "450223",
      value: "鹿寨县"
    }, {
      label: "450224",
      value: "融安县"
    }, {
      label: "450225",
      value: "融水苗族自治县"
    }, {
      label: "450226",
      value: "三江侗族自治县"
    }]
  }, {
    label: "4503",
    value: "桂林市",
    children: [{
      label: "450302",
      value: "秀峰区"
    }, {
      label: "450303",
      value: "叠彩区"
    }, {
      label: "450304",
      value: "象山区"
    }, {
      label: "450305",
      value: "七星区"
    }, {
      label: "450311",
      value: "雁山区"
    }, {
      label: "450312",
      value: "临桂区"
    }, {
      label: "450321",
      value: "阳朔县"
    }, {
      label: "450323",
      value: "灵川县"
    }, {
      label: "450324",
      value: "全州县"
    }, {
      label: "450325",
      value: "兴安县"
    }, {
      label: "450326",
      value: "永福县"
    }, {
      label: "450327",
      value: "灌阳县"
    }, {
      label: "450328",
      value: "龙胜各族自治县"
    }, {
      label: "450329",
      value: "资源县"
    }, {
      label: "450330",
      value: "平乐县"
    }, {
      label: "450332",
      value: "恭城瑶族自治县"
    }, {
      label: "450381",
      value: "荔浦市"
    }]
  }, {
    label: "4504",
    value: "梧州市",
    children: [{
      label: "450403",
      value: "万秀区"
    }, {
      label: "450405",
      value: "长洲区"
    }, {
      label: "450406",
      value: "龙圩区"
    }, {
      label: "450421",
      value: "苍梧县"
    }, {
      label: "450422",
      value: "藤县"
    }, {
      label: "450423",
      value: "蒙山县"
    }, {
      label: "450481",
      value: "岑溪市"
    }]
  }, {
    label: "4505",
    value: "北海市",
    children: [{
      label: "450502",
      value: "海城区"
    }, {
      label: "450503",
      value: "银海区"
    }, {
      label: "450512",
      value: "铁山港区"
    }, {
      label: "450521",
      value: "合浦县"
    }]
  }, {
    label: "4506",
    value: "防城港市",
    children: [{
      label: "450602",
      value: "港口区"
    }, {
      label: "450603",
      value: "防城区"
    }, {
      label: "450621",
      value: "上思县"
    }, {
      label: "450681",
      value: "东兴市"
    }]
  }, {
    label: "4507",
    value: "钦州市",
    children: [{
      label: "450702",
      value: "钦南区"
    }, {
      label: "450703",
      value: "钦北区"
    }, {
      label: "450721",
      value: "灵山县"
    }, {
      label: "450722",
      value: "浦北县"
    }]
  }, {
    label: "4508",
    value: "贵港市",
    children: [{
      label: "450802",
      value: "港北区"
    }, {
      label: "450803",
      value: "港南区"
    }, {
      label: "450804",
      value: "覃塘区"
    }, {
      label: "450821",
      value: "平南县"
    }, {
      label: "450881",
      value: "桂平市"
    }]
  }, {
    label: "4509",
    value: "玉林市",
    children: [{
      label: "450902",
      value: "玉州区"
    }, {
      label: "450903",
      value: "福绵区"
    }, {
      label: "450921",
      value: "容县"
    }, {
      label: "450922",
      value: "陆川县"
    }, {
      label: "450923",
      value: "博白县"
    }, {
      label: "450924",
      value: "兴业县"
    }, {
      label: "450981",
      value: "北流市"
    }]
  }, {
    label: "4510",
    value: "百色市",
    children: [{
      label: "451002",
      value: "右江区"
    }, {
      label: "451003",
      value: "田阳区"
    }, {
      label: "451022",
      value: "田东县"
    }, {
      label: "451024",
      value: "德保县"
    }, {
      label: "451026",
      value: "那坡县"
    }, {
      label: "451027",
      value: "凌云县"
    }, {
      label: "451028",
      value: "乐业县"
    }, {
      label: "451029",
      value: "田林县"
    }, {
      label: "451030",
      value: "西林县"
    }, {
      label: "451031",
      value: "隆林各族自治县"
    }, {
      label: "451081",
      value: "靖西市"
    }, {
      label: "451082",
      value: "平果市"
    }]
  }, {
    label: "4511",
    value: "贺州市",
    children: [{
      label: "451102",
      value: "八步区"
    }, {
      label: "451103",
      value: "平桂区"
    }, {
      label: "451121",
      value: "昭平县"
    }, {
      label: "451122",
      value: "钟山县"
    }, {
      label: "451123",
      value: "富川瑶族自治县"
    }]
  }, {
    label: "4512",
    value: "河池市",
    children: [{
      label: "451202",
      value: "金城江区"
    }, {
      label: "451203",
      value: "宜州区"
    }, {
      label: "451221",
      value: "南丹县"
    }, {
      label: "451222",
      value: "天峨县"
    }, {
      label: "451223",
      value: "凤山县"
    }, {
      label: "451224",
      value: "东兰县"
    }, {
      label: "451225",
      value: "罗城仫佬族自治县"
    }, {
      label: "451226",
      value: "环江毛南族自治县"
    }, {
      label: "451227",
      value: "巴马瑶族自治县"
    }, {
      label: "451228",
      value: "都安瑶族自治县"
    }, {
      label: "451229",
      value: "大化瑶族自治县"
    }]
  }, {
    label: "4513",
    value: "来宾市",
    children: [{
      label: "451302",
      value: "兴宾区"
    }, {
      label: "451321",
      value: "忻城县"
    }, {
      label: "451322",
      value: "象州县"
    }, {
      label: "451323",
      value: "武宣县"
    }, {
      label: "451324",
      value: "金秀瑶族自治县"
    }, {
      label: "451381",
      value: "合山市"
    }]
  }, {
    label: "4514",
    value: "崇左市",
    children: [{
      label: "451402",
      value: "江州区"
    }, {
      label: "451421",
      value: "扶绥县"
    }, {
      label: "451422",
      value: "宁明县"
    }, {
      label: "451423",
      value: "龙州县"
    }, {
      label: "451424",
      value: "大新县"
    }, {
      label: "451425",
      value: "天等县"
    }, {
      label: "451481",
      value: "凭祥市"
    }]
  }]
}, {
  label: "46",
  value: "海南省",
  children: [{
    label: "4601",
    value: "海口市",
    children: [{
      label: "460105",
      value: "秀英区"
    }, {
      label: "460106",
      value: "龙华区"
    }, {
      label: "460107",
      value: "琼山区"
    }, {
      label: "460108",
      value: "美兰区"
    }]
  }, {
    label: "4602",
    value: "三亚市",
    children: [{
      label: "460202",
      value: "海棠区"
    }, {
      label: "460203",
      value: "吉阳区"
    }, {
      label: "460204",
      value: "天涯区"
    }, {
      label: "460205",
      value: "崖州区"
    }]
  }, {
    label: "4603",
    value: "三沙市",
    children: [{
      label: "460321",
      value: "西沙群岛"
    }, {
      label: "460322",
      value: "南沙群岛"
    }, {
      label: "460323",
      value: "中沙群岛的岛礁及其海域"
    }]
  }, {
    label: "4604",
    value: "儋州市",
    children: [{
      label: "460400100",
      value: "那大镇"
    }, {
      label: "460400101",
      value: "和庆镇"
    }, {
      label: "460400102",
      value: "南丰镇"
    }, {
      label: "460400103",
      value: "大成镇"
    }, {
      label: "460400104",
      value: "雅星镇"
    }, {
      label: "460400105",
      value: "兰洋镇"
    }, {
      label: "460400106",
      value: "光村镇"
    }, {
      label: "460400107",
      value: "木棠镇"
    }, {
      label: "460400108",
      value: "海头镇"
    }, {
      label: "460400109",
      value: "峨蔓镇"
    }, {
      label: "460400111",
      value: "王五镇"
    }, {
      label: "460400112",
      value: "白马井镇"
    }, {
      label: "460400113",
      value: "中和镇"
    }, {
      label: "460400114",
      value: "排浦镇"
    }, {
      label: "460400115",
      value: "东成镇"
    }, {
      label: "460400116",
      value: "新州镇"
    }, {
      label: "460400499",
      value: "洋浦经济开发区"
    }, {
      label: "460400500",
      value: "华南热作学院"
    }]
  }, {
    label: "4690",
    value: "省直辖县级行政区划",
    children: [{
      label: "469001",
      value: "五指山市"
    }, {
      label: "469002",
      value: "琼海市"
    }, {
      label: "469005",
      value: "文昌市"
    }, {
      label: "469006",
      value: "万宁市"
    }, {
      label: "469007",
      value: "东方市"
    }, {
      label: "469021",
      value: "定安县"
    }, {
      label: "469022",
      value: "屯昌县"
    }, {
      label: "469023",
      value: "澄迈县"
    }, {
      label: "469024",
      value: "临高县"
    }, {
      label: "469025",
      value: "白沙黎族自治县"
    }, {
      label: "469026",
      value: "昌江黎族自治县"
    }, {
      label: "469027",
      value: "乐东黎族自治县"
    }, {
      label: "469028",
      value: "陵水黎族自治县"
    }, {
      label: "469029",
      value: "保亭黎族苗族自治县"
    }, {
      label: "469030",
      value: "琼中黎族苗族自治县"
    }]
  }]
}, {
  label: "50",
  value: "重庆市",
  children: [{
    label: "5001",
    value: "市辖区",
    children: [{
      label: "500101",
      value: "万州区"
    }, {
      label: "500102",
      value: "涪陵区"
    }, {
      label: "500103",
      value: "渝中区"
    }, {
      label: "500104",
      value: "大渡口区"
    }, {
      label: "500105",
      value: "江北区"
    }, {
      label: "500106",
      value: "沙坪坝区"
    }, {
      label: "500107",
      value: "九龙坡区"
    }, {
      label: "500108",
      value: "南岸区"
    }, {
      label: "500109",
      value: "北碚区"
    }, {
      label: "500110",
      value: "綦江区"
    }, {
      label: "500111",
      value: "大足区"
    }, {
      label: "500112",
      value: "渝北区"
    }, {
      label: "500113",
      value: "巴南区"
    }, {
      label: "500114",
      value: "黔江区"
    }, {
      label: "500115",
      value: "长寿区"
    }, {
      label: "500116",
      value: "江津区"
    }, {
      label: "500117",
      value: "合川区"
    }, {
      label: "500118",
      value: "永川区"
    }, {
      label: "500119",
      value: "南川区"
    }, {
      label: "500120",
      value: "璧山区"
    }, {
      label: "500151",
      value: "铜梁区"
    }, {
      label: "500152",
      value: "潼南区"
    }, {
      label: "500153",
      value: "荣昌区"
    }, {
      label: "500154",
      value: "开州区"
    }, {
      label: "500155",
      value: "梁平区"
    }, {
      label: "500156",
      value: "武隆区"
    }]
  }, {
    label: "5002",
    value: "县",
    children: [{
      label: "500229",
      value: "城口县"
    }, {
      label: "500230",
      value: "丰都县"
    }, {
      label: "500231",
      value: "垫江县"
    }, {
      label: "500233",
      value: "忠县"
    }, {
      label: "500235",
      value: "云阳县"
    }, {
      label: "500236",
      value: "奉节县"
    }, {
      label: "500237",
      value: "巫山县"
    }, {
      label: "500238",
      value: "巫溪县"
    }, {
      label: "500240",
      value: "石柱土家族自治县"
    }, {
      label: "500241",
      value: "秀山土家族苗族自治县"
    }, {
      label: "500242",
      value: "酉阳土家族苗族自治县"
    }, {
      label: "500243",
      value: "彭水苗族土家族自治县"
    }]
  }]
}, {
  label: "51",
  value: "四川省",
  children: [{
    label: "5101",
    value: "成都市",
    children: [
      {
        label:"510102",
        value: "高新区"
      },
      {
      label: "510104",
      value: "锦江区"
    }, {
      label: "510105",
      value: "青羊区"
    }, {
      label: "510106",
      value: "金牛区"
    }, {
      label: "510107",
      value: "武侯区"
    }, {
      label: "510108",
      value: "成华区"
    }, {
      label: "510112",
      value: "龙泉驿区"
    }, {
      label: "510113",
      value: "青白江区"
    }, {
      label: "510114",
      value: "新都区"
    }, {
      label: "510115",
      value: "温江区"
    }, {
      label: "510116",
      value: "双流区"
    }, {
      label: "510117",
      value: "郫都区"
    }, {
      label: "510118",
      value: "新津区"
    }, {
      label: "510121",
      value: "金堂县"
    }, {
      label: "510129",
      value: "大邑县"
    }, {
      label: "510131",
      value: "蒲江县"
    }, {
      label: "510181",
      value: "都江堰市"
    }, {
      label: "510182",
      value: "彭州市"
    }, {
      label: "510183",
      value: "邛崃市"
    }, {
      label: "510184",
      value: "崇州市"
    }, {
      label: "510185",
      value: "简阳市"
    }]
  }, {
    label: "5103",
    value: "自贡市",
    children: [{
      label: "510302",
      value: "自流井区"
    }, {
      label: "510303",
      value: "贡井区"
    }, {
      label: "510304",
      value: "大安区"
    }, {
      label: "510311",
      value: "沿滩区"
    }, {
      label: "510321",
      value: "荣县"
    }, {
      label: "510322",
      value: "富顺县"
    }]
  }, {
    label: "5104",
    value: "攀枝花市",
    children: [{
      label: "510402",
      value: "东区"
    }, {
      label: "510403",
      value: "西区"
    }, {
      label: "510411",
      value: "仁和区"
    }, {
      label: "510421",
      value: "米易县"
    }, {
      label: "510422",
      value: "盐边县"
    }]
  }, {
    label: "5105",
    value: "泸州市",
    children: [{
      label: "510502",
      value: "江阳区"
    }, {
      label: "510503",
      value: "纳溪区"
    }, {
      label: "510504",
      value: "龙马潭区"
    }, {
      label: "510521",
      value: "泸县"
    }, {
      label: "510522",
      value: "合江县"
    }, {
      label: "510524",
      value: "叙永县"
    }, {
      label: "510525",
      value: "古蔺县"
    }]
  }, {
    label: "5106",
    value: "德阳市",
    children: [{
      label: "510603",
      value: "旌阳区"
    }, {
      label: "510604",
      value: "罗江区"
    }, {
      label: "510623",
      value: "中江县"
    }, {
      label: "510681",
      value: "广汉市"
    }, {
      label: "510682",
      value: "什邡市"
    }, {
      label: "510683",
      value: "绵竹市"
    }]
  }, {
    label: "5107",
    value: "绵阳市",
    children: [{
      label: "510703",
      value: "涪城区"
    }, {
      label: "510704",
      value: "游仙区"
    }, {
      label: "510705",
      value: "安州区"
    }, {
      label: "510722",
      value: "三台县"
    }, {
      label: "510723",
      value: "盐亭县"
    }, {
      label: "510725",
      value: "梓潼县"
    }, {
      label: "510726",
      value: "北川羌族自治县"
    }, {
      label: "510727",
      value: "平武县"
    }, {
      label: "510781",
      value: "江油市"
    }]
  }, {
    label: "5108",
    value: "广元市",
    children: [{
      label: "510802",
      value: "利州区"
    }, {
      label: "510811",
      value: "昭化区"
    }, {
      label: "510812",
      value: "朝天区"
    }, {
      label: "510821",
      value: "旺苍县"
    }, {
      label: "510822",
      value: "青川县"
    }, {
      label: "510823",
      value: "剑阁县"
    }, {
      label: "510824",
      value: "苍溪县"
    }]
  }, {
    label: "5109",
    value: "遂宁市",
    children: [{
      label: "510903",
      value: "船山区"
    }, {
      label: "510904",
      value: "安居区"
    }, {
      label: "510921",
      value: "蓬溪县"
    }, {
      label: "510923",
      value: "大英县"
    }, {
      label: "510981",
      value: "射洪市"
    }]
  }, {
    label: "5110",
    value: "内江市",
    children: [{
      label: "511002",
      value: "市中区"
    }, {
      label: "511011",
      value: "东兴区"
    }, {
      label: "511024",
      value: "威远县"
    }, {
      label: "511025",
      value: "资中县"
    }, {
      label: "511071",
      value: "内江经济开发区"
    }, {
      label: "511083",
      value: "隆昌市"
    }]
  }, {
    label: "5111",
    value: "乐山市",
    children: [{
      label: "511102",
      value: "市中区"
    }, {
      label: "511111",
      value: "沙湾区"
    }, {
      label: "511112",
      value: "五通桥区"
    }, {
      label: "511113",
      value: "金口河区"
    }, {
      label: "511123",
      value: "犍为县"
    }, {
      label: "511124",
      value: "井研县"
    }, {
      label: "511126",
      value: "夹江县"
    }, {
      label: "511129",
      value: "沐川县"
    }, {
      label: "511132",
      value: "峨边彝族自治县"
    }, {
      label: "511133",
      value: "马边彝族自治县"
    }, {
      label: "511181",
      value: "峨眉山市"
    }]
  }, {
    label: "5113",
    value: "南充市",
    children: [{
      label: "511302",
      value: "顺庆区"
    }, {
      label: "511303",
      value: "高坪区"
    }, {
      label: "511304",
      value: "嘉陵区"
    }, {
      label: "511321",
      value: "南部县"
    }, {
      label: "511322",
      value: "营山县"
    }, {
      label: "511323",
      value: "蓬安县"
    }, {
      label: "511324",
      value: "仪陇县"
    }, {
      label: "511325",
      value: "西充县"
    }, {
      label: "511381",
      value: "阆中市"
    }]
  }, {
    label: "5114",
    value: "眉山市",
    children: [{
      label: "511402",
      value: "东坡区"
    }, {
      label: "511403",
      value: "彭山区"
    }, {
      label: "511421",
      value: "仁寿县"
    }, {
      label: "511423",
      value: "洪雅县"
    }, {
      label: "511424",
      value: "丹棱县"
    }, {
      label: "511425",
      value: "青神县"
    }]
  }, {
    label: "5115",
    value: "宜宾市",
    children: [{
      label: "511502",
      value: "翠屏区"
    }, {
      label: "511503",
      value: "南溪区"
    }, {
      label: "511504",
      value: "叙州区"
    }, {
      label: "511523",
      value: "江安县"
    }, {
      label: "511524",
      value: "长宁县"
    }, {
      label: "511525",
      value: "高县"
    }, {
      label: "511526",
      value: "珙县"
    }, {
      label: "511527",
      value: "筠连县"
    }, {
      label: "511528",
      value: "兴文县"
    }, {
      label: "511529",
      value: "屏山县"
    }]
  }, {
    label: "5116",
    value: "广安市",
    children: [{
      label: "511602",
      value: "广安区"
    }, {
      label: "511603",
      value: "前锋区"
    }, {
      label: "511621",
      value: "岳池县"
    }, {
      label: "511622",
      value: "武胜县"
    }, {
      label: "511623",
      value: "邻水县"
    }, {
      label: "511681",
      value: "华蓥市"
    }]
  }, {
    label: "5117",
    value: "达州市",
    children: [{
      label: "511702",
      value: "通川区"
    }, {
      label: "511703",
      value: "达川区"
    }, {
      label: "511722",
      value: "宣汉县"
    }, {
      label: "511723",
      value: "开江县"
    }, {
      label: "511724",
      value: "大竹县"
    }, {
      label: "511725",
      value: "渠县"
    }, {
      label: "511771",
      value: "达州经济开发区"
    }, {
      label: "511781",
      value: "万源市"
    }]
  }, {
    label: "5118",
    value: "雅安市",
    children: [{
      label: "511802",
      value: "雨城区"
    }, {
      label: "511803",
      value: "名山区"
    }, {
      label: "511822",
      value: "荥经县"
    }, {
      label: "511823",
      value: "汉源县"
    }, {
      label: "511824",
      value: "石棉县"
    }, {
      label: "511825",
      value: "天全县"
    }, {
      label: "511826",
      value: "芦山县"
    }, {
      label: "511827",
      value: "宝兴县"
    }]
  }, {
    label: "5119",
    value: "巴中市",
    children: [{
      label: "511902",
      value: "巴州区"
    }, {
      label: "511903",
      value: "恩阳区"
    }, {
      label: "511921",
      value: "通江县"
    }, {
      label: "511922",
      value: "南江县"
    }, {
      label: "511923",
      value: "平昌县"
    }, {
      label: "511971",
      value: "巴中经济开发区"
    }]
  }, {
    label: "5120",
    value: "资阳市",
    children: [{
      label: "512002",
      value: "雁江区"
    }, {
      label: "512021",
      value: "安岳县"
    }, {
      label: "512022",
      value: "乐至县"
    }]
  }, {
    label: "5132",
    value: "阿坝藏族羌族自治州",
    children: [{
      label: "513201",
      value: "马尔康市"
    }, {
      label: "513221",
      value: "汶川县"
    }, {
      label: "513222",
      value: "理县"
    }, {
      label: "513223",
      value: "茂县"
    }, {
      label: "513224",
      value: "松潘县"
    }, {
      label: "513225",
      value: "九寨沟县"
    }, {
      label: "513226",
      value: "金川县"
    }, {
      label: "513227",
      value: "小金县"
    }, {
      label: "513228",
      value: "黑水县"
    }, {
      label: "513230",
      value: "壤塘县"
    }, {
      label: "513231",
      value: "阿坝县"
    }, {
      label: "513232",
      value: "若尔盖县"
    }, {
      label: "513233",
      value: "红原县"
    }]
  }, {
    label: "5133",
    value: "甘孜藏族自治州",
    children: [{
      label: "513301",
      value: "康定市"
    }, {
      label: "513322",
      value: "泸定县"
    }, {
      label: "513323",
      value: "丹巴县"
    }, {
      label: "513324",
      value: "九龙县"
    }, {
      label: "513325",
      value: "雅江县"
    }, {
      label: "513326",
      value: "道孚县"
    }, {
      label: "513327",
      value: "炉霍县"
    }, {
      label: "513328",
      value: "甘孜县"
    }, {
      label: "513329",
      value: "新龙县"
    }, {
      label: "513330",
      value: "德格县"
    }, {
      label: "513331",
      value: "白玉县"
    }, {
      label: "513332",
      value: "石渠县"
    }, {
      label: "513333",
      value: "色达县"
    }, {
      label: "513334",
      value: "理塘县"
    }, {
      label: "513335",
      value: "巴塘县"
    }, {
      label: "513336",
      value: "乡城县"
    }, {
      label: "513337",
      value: "稻城县"
    }, {
      label: "513338",
      value: "得荣县"
    }]
  }, {
    label: "5134",
    value: "凉山彝族自治州",
    children: [{
      label: "513401",
      value: "西昌市"
    }, {
      label: "513422",
      value: "木里藏族自治县"
    }, {
      label: "513423",
      value: "盐源县"
    }, {
      label: "513424",
      value: "德昌县"
    }, {
      label: "513425",
      value: "会理县"
    }, {
      label: "513426",
      value: "会东县"
    }, {
      label: "513427",
      value: "宁南县"
    }, {
      label: "513428",
      value: "普格县"
    }, {
      label: "513429",
      value: "布拖县"
    }, {
      label: "513430",
      value: "金阳县"
    }, {
      label: "513431",
      value: "昭觉县"
    }, {
      label: "513432",
      value: "喜德县"
    }, {
      label: "513433",
      value: "冕宁县"
    }, {
      label: "513434",
      value: "越西县"
    }, {
      label: "513435",
      value: "甘洛县"
    }, {
      label: "513436",
      value: "美姑县"
    }, {
      label: "513437",
      value: "雷波县"
    }]
  }]
}, {
  label: "52",
  value: "贵州省",
  children: [{
    label: "5201",
    value: "贵阳市",
    children: [{
      label: "520102",
      value: "南明区"
    }, {
      label: "520103",
      value: "云岩区"
    }, {
      label: "520111",
      value: "花溪区"
    }, {
      label: "520112",
      value: "乌当区"
    }, {
      label: "520113",
      value: "白云区"
    }, {
      label: "520115",
      value: "观山湖区"
    }, {
      label: "520121",
      value: "开阳县"
    }, {
      label: "520122",
      value: "息烽县"
    }, {
      label: "520123",
      value: "修文县"
    }, {
      label: "520181",
      value: "清镇市"
    }]
  }, {
    label: "5202",
    value: "六盘水市",
    children: [{
      label: "520201",
      value: "钟山区"
    }, {
      label: "520203",
      value: "六枝特区"
    }, {
      label: "520221",
      value: "水城县"
    }, {
      label: "520281",
      value: "盘州市"
    }]
  }, {
    label: "5203",
    value: "遵义市",
    children: [{
      label: "520302",
      value: "红花岗区"
    }, {
      label: "520303",
      value: "汇川区"
    }, {
      label: "520304",
      value: "播州区"
    }, {
      label: "520322",
      value: "桐梓县"
    }, {
      label: "520323",
      value: "绥阳县"
    }, {
      label: "520324",
      value: "正安县"
    }, {
      label: "520325",
      value: "道真仡佬族苗族自治县"
    }, {
      label: "520326",
      value: "务川仡佬族苗族自治县"
    }, {
      label: "520327",
      value: "凤冈县"
    }, {
      label: "520328",
      value: "湄潭县"
    }, {
      label: "520329",
      value: "余庆县"
    }, {
      label: "520330",
      value: "习水县"
    }, {
      label: "520381",
      value: "赤水市"
    }, {
      label: "520382",
      value: "仁怀市"
    }]
  }, {
    label: "5204",
    value: "安顺市",
    children: [{
      label: "520402",
      value: "西秀区"
    }, {
      label: "520403",
      value: "平坝区"
    }, {
      label: "520422",
      value: "普定县"
    }, {
      label: "520423",
      value: "镇宁布依族苗族自治县"
    }, {
      label: "520424",
      value: "关岭布依族苗族自治县"
    }, {
      label: "520425",
      value: "紫云苗族布依族自治县"
    }]
  }, {
    label: "5205",
    value: "毕节市",
    children: [{
      label: "520502",
      value: "七星关区"
    }, {
      label: "520521",
      value: "大方县"
    }, {
      label: "520522",
      value: "黔西县"
    }, {
      label: "520523",
      value: "金沙县"
    }, {
      label: "520524",
      value: "织金县"
    }, {
      label: "520525",
      value: "纳雍县"
    }, {
      label: "520526",
      value: "威宁彝族回族苗族自治县"
    }, {
      label: "520527",
      value: "赫章县"
    }]
  }, {
    label: "5206",
    value: "铜仁市",
    children: [{
      label: "520602",
      value: "碧江区"
    }, {
      label: "520603",
      value: "万山区"
    }, {
      label: "520621",
      value: "江口县"
    }, {
      label: "520622",
      value: "玉屏侗族自治县"
    }, {
      label: "520623",
      value: "石阡县"
    }, {
      label: "520624",
      value: "思南县"
    }, {
      label: "520625",
      value: "印江土家族苗族自治县"
    }, {
      label: "520626",
      value: "德江县"
    }, {
      label: "520627",
      value: "沿河土家族自治县"
    }, {
      label: "520628",
      value: "松桃苗族自治县"
    }]
  }, {
    label: "5223",
    value: "黔西南布依族苗族自治州",
    children: [{
      label: "522301",
      value: "兴义市"
    }, {
      label: "522302",
      value: "兴仁市"
    }, {
      label: "522323",
      value: "普安县"
    }, {
      label: "522324",
      value: "晴隆县"
    }, {
      label: "522325",
      value: "贞丰县"
    }, {
      label: "522326",
      value: "望谟县"
    }, {
      label: "522327",
      value: "册亨县"
    }, {
      label: "522328",
      value: "安龙县"
    }]
  }, {
    label: "5226",
    value: "黔东南苗族侗族自治州",
    children: [{
      label: "522601",
      value: "凯里市"
    }, {
      label: "522622",
      value: "黄平县"
    }, {
      label: "522623",
      value: "施秉县"
    }, {
      label: "522624",
      value: "三穗县"
    }, {
      label: "522625",
      value: "镇远县"
    }, {
      label: "522626",
      value: "岑巩县"
    }, {
      label: "522627",
      value: "天柱县"
    }, {
      label: "522628",
      value: "锦屏县"
    }, {
      label: "522629",
      value: "剑河县"
    }, {
      label: "522630",
      value: "台江县"
    }, {
      label: "522631",
      value: "黎平县"
    }, {
      label: "522632",
      value: "榕江县"
    }, {
      label: "522633",
      value: "从江县"
    }, {
      label: "522634",
      value: "雷山县"
    }, {
      label: "522635",
      value: "麻江县"
    }, {
      label: "522636",
      value: "丹寨县"
    }]
  }, {
    label: "5227",
    value: "黔南布依族苗族自治州",
    children: [{
      label: "522701",
      value: "都匀市"
    }, {
      label: "522702",
      value: "福泉市"
    }, {
      label: "522722",
      value: "荔波县"
    }, {
      label: "522723",
      value: "贵定县"
    }, {
      label: "522725",
      value: "瓮安县"
    }, {
      label: "522726",
      value: "独山县"
    }, {
      label: "522727",
      value: "平塘县"
    }, {
      label: "522728",
      value: "罗甸县"
    }, {
      label: "522729",
      value: "长顺县"
    }, {
      label: "522730",
      value: "龙里县"
    }, {
      label: "522731",
      value: "惠水县"
    }, {
      label: "522732",
      value: "三都水族自治县"
    }]
  }]
}, {
  label: "53",
  value: "云南省",
  children: [{
    label: "5301",
    value: "昆明市",
    children: [{
      label: "530102",
      value: "五华区"
    }, {
      label: "530103",
      value: "盘龙区"
    }, {
      label: "530111",
      value: "官渡区"
    }, {
      label: "530112",
      value: "西山区"
    }, {
      label: "530113",
      value: "东川区"
    }, {
      label: "530114",
      value: "呈贡区"
    }, {
      label: "530115",
      value: "晋宁区"
    }, {
      label: "530124",
      value: "富民县"
    }, {
      label: "530125",
      value: "宜良县"
    }, {
      label: "530126",
      value: "石林彝族自治县"
    }, {
      label: "530127",
      value: "嵩明县"
    }, {
      label: "530128",
      value: "禄劝彝族苗族自治县"
    }, {
      label: "530129",
      value: "寻甸回族彝族自治县"
    }, {
      label: "530181",
      value: "安宁市"
    }]
  }, {
    label: "5303",
    value: "曲靖市",
    children: [{
      label: "530302",
      value: "麒麟区"
    }, {
      label: "530303",
      value: "沾益区"
    }, {
      label: "530304",
      value: "马龙区"
    }, {
      label: "530322",
      value: "陆良县"
    }, {
      label: "530323",
      value: "师宗县"
    }, {
      label: "530324",
      value: "罗平县"
    }, {
      label: "530325",
      value: "富源县"
    }, {
      label: "530326",
      value: "会泽县"
    }, {
      label: "530381",
      value: "宣威市"
    }]
  }, {
    label: "5304",
    value: "玉溪市",
    children: [{
      label: "530402",
      value: "红塔区"
    }, {
      label: "530403",
      value: "江川区"
    }, {
      label: "530423",
      value: "通海县"
    }, {
      label: "530424",
      value: "华宁县"
    }, {
      label: "530425",
      value: "易门县"
    }, {
      label: "530426",
      value: "峨山彝族自治县"
    }, {
      label: "530427",
      value: "新平彝族傣族自治县"
    }, {
      label: "530428",
      value: "元江哈尼族彝族傣族自治县"
    }, {
      label: "530481",
      value: "澄江市"
    }]
  }, {
    label: "5305",
    value: "保山市",
    children: [{
      label: "530502",
      value: "隆阳区"
    }, {
      label: "530521",
      value: "施甸县"
    }, {
      label: "530523",
      value: "龙陵县"
    }, {
      label: "530524",
      value: "昌宁县"
    }, {
      label: "530581",
      value: "腾冲市"
    }]
  }, {
    label: "5306",
    value: "昭通市",
    children: [{
      label: "530602",
      value: "昭阳区"
    }, {
      label: "530621",
      value: "鲁甸县"
    }, {
      label: "530622",
      value: "巧家县"
    }, {
      label: "530623",
      value: "盐津县"
    }, {
      label: "530624",
      value: "大关县"
    }, {
      label: "530625",
      value: "永善县"
    }, {
      label: "530626",
      value: "绥江县"
    }, {
      label: "530627",
      value: "镇雄县"
    }, {
      label: "530628",
      value: "彝良县"
    }, {
      label: "530629",
      value: "威信县"
    }, {
      label: "530681",
      value: "水富市"
    }]
  }, {
    label: "5307",
    value: "丽江市",
    children: [{
      label: "530702",
      value: "古城区"
    }, {
      label: "530721",
      value: "玉龙纳西族自治县"
    }, {
      label: "530722",
      value: "永胜县"
    }, {
      label: "530723",
      value: "华坪县"
    }, {
      label: "530724",
      value: "宁蒗彝族自治县"
    }]
  }, {
    label: "5308",
    value: "普洱市",
    children: [{
      label: "530802",
      value: "思茅区"
    }, {
      label: "530821",
      value: "宁洱哈尼族彝族自治县"
    }, {
      label: "530822",
      value: "墨江哈尼族自治县"
    }, {
      label: "530823",
      value: "景东彝族自治县"
    }, {
      label: "530824",
      value: "景谷傣族彝族自治县"
    }, {
      label: "530825",
      value: "镇沅彝族哈尼族拉祜族自治县"
    }, {
      label: "530826",
      value: "江城哈尼族彝族自治县"
    }, {
      label: "530827",
      value: "孟连傣族拉祜族佤族自治县"
    }, {
      label: "530828",
      value: "澜沧拉祜族自治县"
    }, {
      label: "530829",
      value: "西盟佤族自治县"
    }]
  }, {
    label: "5309",
    value: "临沧市",
    children: [{
      label: "530902",
      value: "临翔区"
    }, {
      label: "530921",
      value: "凤庆县"
    }, {
      label: "530922",
      value: "云县"
    }, {
      label: "530923",
      value: "永德县"
    }, {
      label: "530924",
      value: "镇康县"
    }, {
      label: "530925",
      value: "双江拉祜族佤族布朗族傣族自治县"
    }, {
      label: "530926",
      value: "耿马傣族佤族自治县"
    }, {
      label: "530927",
      value: "沧源佤族自治县"
    }]
  }, {
    label: "5323",
    value: "楚雄彝族自治州",
    children: [{
      label: "532301",
      value: "楚雄市"
    }, {
      label: "532322",
      value: "双柏县"
    }, {
      label: "532323",
      value: "牟定县"
    }, {
      label: "532324",
      value: "南华县"
    }, {
      label: "532325",
      value: "姚安县"
    }, {
      label: "532326",
      value: "大姚县"
    }, {
      label: "532327",
      value: "永仁县"
    }, {
      label: "532328",
      value: "元谋县"
    }, {
      label: "532329",
      value: "武定县"
    }, {
      label: "532331",
      value: "禄丰县"
    }]
  }, {
    label: "5325",
    value: "红河哈尼族彝族自治州",
    children: [{
      label: "532501",
      value: "个旧市"
    }, {
      label: "532502",
      value: "开远市"
    }, {
      label: "532503",
      value: "蒙自市"
    }, {
      label: "532504",
      value: "弥勒市"
    }, {
      label: "532523",
      value: "屏边苗族自治县"
    }, {
      label: "532524",
      value: "建水县"
    }, {
      label: "532525",
      value: "石屏县"
    }, {
      label: "532527",
      value: "泸西县"
    }, {
      label: "532528",
      value: "元阳县"
    }, {
      label: "532529",
      value: "红河县"
    }, {
      label: "532530",
      value: "金平苗族瑶族傣族自治县"
    }, {
      label: "532531",
      value: "绿春县"
    }, {
      label: "532532",
      value: "河口瑶族自治县"
    }]
  }, {
    label: "5326",
    value: "文山壮族苗族自治州",
    children: [{
      label: "532601",
      value: "文山市"
    }, {
      label: "532622",
      value: "砚山县"
    }, {
      label: "532623",
      value: "西畴县"
    }, {
      label: "532624",
      value: "麻栗坡县"
    }, {
      label: "532625",
      value: "马关县"
    }, {
      label: "532626",
      value: "丘北县"
    }, {
      label: "532627",
      value: "广南县"
    }, {
      label: "532628",
      value: "富宁县"
    }]
  }, {
    label: "5328",
    value: "西双版纳傣族自治州",
    children: [{
      label: "532801",
      value: "景洪市"
    }, {
      label: "532822",
      value: "勐海县"
    }, {
      label: "532823",
      value: "勐腊县"
    }]
  }, {
    label: "5329",
    value: "大理白族自治州",
    children: [{
      label: "532901",
      value: "大理市"
    }, {
      label: "532922",
      value: "漾濞彝族自治县"
    }, {
      label: "532923",
      value: "祥云县"
    }, {
      label: "532924",
      value: "宾川县"
    }, {
      label: "532925",
      value: "弥渡县"
    }, {
      label: "532926",
      value: "南涧彝族自治县"
    }, {
      label: "532927",
      value: "巍山彝族回族自治县"
    }, {
      label: "532928",
      value: "永平县"
    }, {
      label: "532929",
      value: "云龙县"
    }, {
      label: "532930",
      value: "洱源县"
    }, {
      label: "532931",
      value: "剑川县"
    }, {
      label: "532932",
      value: "鹤庆县"
    }]
  }, {
    label: "5331",
    value: "德宏傣族景颇族自治州",
    children: [{
      label: "533102",
      value: "瑞丽市"
    }, {
      label: "533103",
      value: "芒市"
    }, {
      label: "533122",
      value: "梁河县"
    }, {
      label: "533123",
      value: "盈江县"
    }, {
      label: "533124",
      value: "陇川县"
    }]
  }, {
    label: "5333",
    value: "怒江傈僳族自治州",
    children: [{
      label: "533301",
      value: "泸水市"
    }, {
      label: "533323",
      value: "福贡县"
    }, {
      label: "533324",
      value: "贡山独龙族怒族自治县"
    }, {
      label: "533325",
      value: "兰坪白族普米族自治县"
    }]
  }, {
    label: "5334",
    value: "迪庆藏族自治州",
    children: [{
      label: "533401",
      value: "香格里拉市"
    }, {
      label: "533422",
      value: "德钦县"
    }, {
      label: "533423",
      value: "维西傈僳族自治县"
    }]
  }]
}, {
  label: "54",
  value: "西藏自治区",
  children: [{
    label: "5401",
    value: "拉萨市",
    children: [{
      label: "540102",
      value: "城关区"
    }, {
      label: "540103",
      value: "堆龙德庆区"
    }, {
      label: "540104",
      value: "达孜区"
    }, {
      label: "540121",
      value: "林周县"
    }, {
      label: "540122",
      value: "当雄县"
    }, {
      label: "540123",
      value: "尼木县"
    }, {
      label: "540124",
      value: "曲水县"
    }, {
      label: "540127",
      value: "墨竹工卡县"
    }, {
      label: "540171",
      value: "格尔木藏青工业园区"
    }, {
      label: "540172",
      value: "拉萨经济技术开发区"
    }, {
      label: "540173",
      value: "西藏文化旅游创意园区"
    }, {
      label: "540174",
      value: "达孜工业园区"
    }]
  }, {
    label: "5402",
    value: "日喀则市",
    children: [{
      label: "540202",
      value: "桑珠孜区"
    }, {
      label: "540221",
      value: "南木林县"
    }, {
      label: "540222",
      value: "江孜县"
    }, {
      label: "540223",
      value: "定日县"
    }, {
      label: "540224",
      value: "萨迦县"
    }, {
      label: "540225",
      value: "拉孜县"
    }, {
      label: "540226",
      value: "昂仁县"
    }, {
      label: "540227",
      value: "谢通门县"
    }, {
      label: "540228",
      value: "白朗县"
    }, {
      label: "540229",
      value: "仁布县"
    }, {
      label: "540230",
      value: "康马县"
    }, {
      label: "540231",
      value: "定结县"
    }, {
      label: "540232",
      value: "仲巴县"
    }, {
      label: "540233",
      value: "亚东县"
    }, {
      label: "540234",
      value: "吉隆县"
    }, {
      label: "540235",
      value: "聂拉木县"
    }, {
      label: "540236",
      value: "萨嘎县"
    }, {
      label: "540237",
      value: "岗巴县"
    }]
  }, {
    label: "5403",
    value: "昌都市",
    children: [{
      label: "540302",
      value: "卡若区"
    }, {
      label: "540321",
      value: "江达县"
    }, {
      label: "540322",
      value: "贡觉县"
    }, {
      label: "540323",
      value: "类乌齐县"
    }, {
      label: "540324",
      value: "丁青县"
    }, {
      label: "540325",
      value: "察雅县"
    }, {
      label: "540326",
      value: "八宿县"
    }, {
      label: "540327",
      value: "左贡县"
    }, {
      label: "540328",
      value: "芒康县"
    }, {
      label: "540329",
      value: "洛隆县"
    }, {
      label: "540330",
      value: "边坝县"
    }]
  }, {
    label: "5404",
    value: "林芝市",
    children: [{
      label: "540402",
      value: "巴宜区"
    }, {
      label: "540421",
      value: "工布江达县"
    }, {
      label: "540422",
      value: "米林县"
    }, {
      label: "540423",
      value: "墨脱县"
    }, {
      label: "540424",
      value: "波密县"
    }, {
      label: "540425",
      value: "察隅县"
    }, {
      label: "540426",
      value: "朗县"
    }]
  }, {
    label: "5405",
    value: "山南市",
    children: [{
      label: "540502",
      value: "乃东区"
    }, {
      label: "540521",
      value: "扎囊县"
    }, {
      label: "540522",
      value: "贡嘎县"
    }, {
      label: "540523",
      value: "桑日县"
    }, {
      label: "540524",
      value: "琼结县"
    }, {
      label: "540525",
      value: "曲松县"
    }, {
      label: "540526",
      value: "措美县"
    }, {
      label: "540527",
      value: "洛扎县"
    }, {
      label: "540528",
      value: "加查县"
    }, {
      label: "540529",
      value: "隆子县"
    }, {
      label: "540530",
      value: "错那县"
    }, {
      label: "540531",
      value: "浪卡子县"
    }]
  }, {
    label: "5406",
    value: "那曲市",
    children: [{
      label: "540602",
      value: "色尼区"
    }, {
      label: "540621",
      value: "嘉黎县"
    }, {
      label: "540622",
      value: "比如县"
    }, {
      label: "540623",
      value: "聂荣县"
    }, {
      label: "540624",
      value: "安多县"
    }, {
      label: "540625",
      value: "申扎县"
    }, {
      label: "540626",
      value: "索县"
    }, {
      label: "540627",
      value: "班戈县"
    }, {
      label: "540628",
      value: "巴青县"
    }, {
      label: "540629",
      value: "尼玛县"
    }, {
      label: "540630",
      value: "双湖县"
    }]
  }, {
    label: "5425",
    value: "阿里地区",
    children: [{
      label: "542521",
      value: "普兰县"
    }, {
      label: "542522",
      value: "札达县"
    }, {
      label: "542523",
      value: "噶尔县"
    }, {
      label: "542524",
      value: "日土县"
    }, {
      label: "542525",
      value: "革吉县"
    }, {
      label: "542526",
      value: "改则县"
    }, {
      label: "542527",
      value: "措勤县"
    }]
  }]
}, {
  label: "61",
  value: "陕西省",
  children: [{
    label: "6101",
    value: "西安市",
    children: [{
      label: "610102",
      value: "新城区"
    }, {
      label: "610103",
      value: "碑林区"
    }, {
      label: "610104",
      value: "莲湖区"
    }, {
      label: "610111",
      value: "灞桥区"
    }, {
      label: "610112",
      value: "未央区"
    }, {
      label: "610113",
      value: "雁塔区"
    }, {
      label: "610114",
      value: "阎良区"
    }, {
      label: "610115",
      value: "临潼区"
    }, {
      label: "610116",
      value: "长安区"
    }, {
      label: "610117",
      value: "高陵区"
    }, {
      label: "610118",
      value: "鄠邑区"
    }, {
      label: "610122",
      value: "蓝田县"
    }, {
      label: "610124",
      value: "周至县"
    }]
  }, {
    label: "6102",
    value: "铜川市",
    children: [{
      label: "610202",
      value: "王益区"
    }, {
      label: "610203",
      value: "印台区"
    }, {
      label: "610204",
      value: "耀州区"
    }, {
      label: "610222",
      value: "宜君县"
    }]
  }, {
    label: "6103",
    value: "宝鸡市",
    children: [{
      label: "610302",
      value: "渭滨区"
    }, {
      label: "610303",
      value: "金台区"
    }, {
      label: "610304",
      value: "陈仓区"
    }, {
      label: "610322",
      value: "凤翔县"
    }, {
      label: "610323",
      value: "岐山县"
    }, {
      label: "610324",
      value: "扶风县"
    }, {
      label: "610326",
      value: "眉县"
    }, {
      label: "610327",
      value: "陇县"
    }, {
      label: "610328",
      value: "千阳县"
    }, {
      label: "610329",
      value: "麟游县"
    }, {
      label: "610330",
      value: "凤县"
    }, {
      label: "610331",
      value: "太白县"
    }]
  }, {
    label: "6104",
    value: "咸阳市",
    children: [{
      label: "610402",
      value: "秦都区"
    }, {
      label: "610403",
      value: "杨陵区"
    }, {
      label: "610404",
      value: "渭城区"
    }, {
      label: "610422",
      value: "三原县"
    }, {
      label: "610423",
      value: "泾阳县"
    }, {
      label: "610424",
      value: "乾县"
    }, {
      label: "610425",
      value: "礼泉县"
    }, {
      label: "610426",
      value: "永寿县"
    }, {
      label: "610428",
      value: "长武县"
    }, {
      label: "610429",
      value: "旬邑县"
    }, {
      label: "610430",
      value: "淳化县"
    }, {
      label: "610431",
      value: "武功县"
    }, {
      label: "610481",
      value: "兴平市"
    }, {
      label: "610482",
      value: "彬州市"
    }]
  }, {
    label: "6105",
    value: "渭南市",
    children: [{
      label: "610502",
      value: "临渭区"
    }, {
      label: "610503",
      value: "华州区"
    }, {
      label: "610522",
      value: "潼关县"
    }, {
      label: "610523",
      value: "大荔县"
    }, {
      label: "610524",
      value: "合阳县"
    }, {
      label: "610525",
      value: "澄城县"
    }, {
      label: "610526",
      value: "蒲城县"
    }, {
      label: "610527",
      value: "白水县"
    }, {
      label: "610528",
      value: "富平县"
    }, {
      label: "610581",
      value: "韩城市"
    }, {
      label: "610582",
      value: "华阴市"
    }]
  }, {
    label: "6106",
    value: "延安市",
    children: [{
      label: "610602",
      value: "宝塔区"
    }, {
      label: "610603",
      value: "安塞区"
    }, {
      label: "610621",
      value: "延长县"
    }, {
      label: "610622",
      value: "延川县"
    }, {
      label: "610625",
      value: "志丹县"
    }, {
      label: "610626",
      value: "吴起县"
    }, {
      label: "610627",
      value: "甘泉县"
    }, {
      label: "610628",
      value: "富县"
    }, {
      label: "610629",
      value: "洛川县"
    }, {
      label: "610630",
      value: "宜川县"
    }, {
      label: "610631",
      value: "黄龙县"
    }, {
      label: "610632",
      value: "黄陵县"
    }, {
      label: "610681",
      value: "子长市"
    }]
  }, {
    label: "6107",
    value: "汉中市",
    children: [{
      label: "610702",
      value: "汉台区"
    }, {
      label: "610703",
      value: "南郑区"
    }, {
      label: "610722",
      value: "城固县"
    }, {
      label: "610723",
      value: "洋县"
    }, {
      label: "610724",
      value: "西乡县"
    }, {
      label: "610725",
      value: "勉县"
    }, {
      label: "610726",
      value: "宁强县"
    }, {
      label: "610727",
      value: "略阳县"
    }, {
      label: "610728",
      value: "镇巴县"
    }, {
      label: "610729",
      value: "留坝县"
    }, {
      label: "610730",
      value: "佛坪县"
    }]
  }, {
    label: "6108",
    value: "榆林市",
    children: [{
      label: "610802",
      value: "榆阳区"
    }, {
      label: "610803",
      value: "横山区"
    }, {
      label: "610822",
      value: "府谷县"
    }, {
      label: "610824",
      value: "靖边县"
    }, {
      label: "610825",
      value: "定边县"
    }, {
      label: "610826",
      value: "绥德县"
    }, {
      label: "610827",
      value: "米脂县"
    }, {
      label: "610828",
      value: "佳县"
    }, {
      label: "610829",
      value: "吴堡县"
    }, {
      label: "610830",
      value: "清涧县"
    }, {
      label: "610831",
      value: "子洲县"
    }, {
      label: "610881",
      value: "神木市"
    }]
  }, {
    label: "6109",
    value: "安康市",
    children: [{
      label: "610902",
      value: "汉滨区"
    }, {
      label: "610921",
      value: "汉阴县"
    }, {
      label: "610922",
      value: "石泉县"
    }, {
      label: "610923",
      value: "宁陕县"
    }, {
      label: "610924",
      value: "紫阳县"
    }, {
      label: "610925",
      value: "岚皋县"
    }, {
      label: "610926",
      value: "平利县"
    }, {
      label: "610927",
      value: "镇坪县"
    }, {
      label: "610928",
      value: "旬阳县"
    }, {
      label: "610929",
      value: "白河县"
    }]
  }, {
    label: "6110",
    value: "商洛市",
    children: [{
      label: "611002",
      value: "商州区"
    }, {
      label: "611021",
      value: "洛南县"
    }, {
      label: "611022",
      value: "丹凤县"
    }, {
      label: "611023",
      value: "商南县"
    }, {
      label: "611024",
      value: "山阳县"
    }, {
      label: "611025",
      value: "镇安县"
    }, {
      label: "611026",
      value: "柞水县"
    }]
  }]
}, {
  label: "62",
  value: "甘肃省",
  children: [{
    label: "6201",
    value: "兰州市",
    children: [{
      label: "620102",
      value: "城关区"
    }, {
      label: "620103",
      value: "七里河区"
    }, {
      label: "620104",
      value: "西固区"
    }, {
      label: "620105",
      value: "安宁区"
    }, {
      label: "620111",
      value: "红古区"
    }, {
      label: "620121",
      value: "永登县"
    }, {
      label: "620122",
      value: "皋兰县"
    }, {
      label: "620123",
      value: "榆中县"
    }, {
      label: "620171",
      value: "兰州新区"
    }]
  }, {
    label: "6202",
    value: "嘉峪关市",
    children: [{
      label: "620201001",
      value: "雄关街道"
    }, {
      label: "620201002",
      value: "钢城街道"
    }, {
      label: "620201100",
      value: "新城镇"
    }, {
      label: "620201101",
      value: "峪泉镇"
    }, {
      label: "620201102",
      value: "文殊镇"
    }]
  }, {
    label: "6203",
    value: "金昌市",
    children: [{
      label: "620302",
      value: "金川区"
    }, {
      label: "620321",
      value: "永昌县"
    }]
  }, {
    label: "6204",
    value: "白银市",
    children: [{
      label: "620402",
      value: "白银区"
    }, {
      label: "620403",
      value: "平川区"
    }, {
      label: "620421",
      value: "靖远县"
    }, {
      label: "620422",
      value: "会宁县"
    }, {
      label: "620423",
      value: "景泰县"
    }]
  }, {
    label: "6205",
    value: "天水市",
    children: [{
      label: "620502",
      value: "秦州区"
    }, {
      label: "620503",
      value: "麦积区"
    }, {
      label: "620521",
      value: "清水县"
    }, {
      label: "620522",
      value: "秦安县"
    }, {
      label: "620523",
      value: "甘谷县"
    }, {
      label: "620524",
      value: "武山县"
    }, {
      label: "620525",
      value: "张家川回族自治县"
    }]
  }, {
    label: "6206",
    value: "武威市",
    children: [{
      label: "620602",
      value: "凉州区"
    }, {
      label: "620621",
      value: "民勤县"
    }, {
      label: "620622",
      value: "古浪县"
    }, {
      label: "620623",
      value: "天祝藏族自治县"
    }]
  }, {
    label: "6207",
    value: "张掖市",
    children: [{
      label: "620702",
      value: "甘州区"
    }, {
      label: "620721",
      value: "肃南裕固族自治县"
    }, {
      label: "620722",
      value: "民乐县"
    }, {
      label: "620723",
      value: "临泽县"
    }, {
      label: "620724",
      value: "高台县"
    }, {
      label: "620725",
      value: "山丹县"
    }]
  }, {
    label: "6208",
    value: "平凉市",
    children: [{
      label: "620802",
      value: "崆峒区"
    }, {
      label: "620821",
      value: "泾川县"
    }, {
      label: "620822",
      value: "灵台县"
    }, {
      label: "620823",
      value: "崇信县"
    }, {
      label: "620825",
      value: "庄浪县"
    }, {
      label: "620826",
      value: "静宁县"
    }, {
      label: "620881",
      value: "华亭市"
    }]
  }, {
    label: "6209",
    value: "酒泉市",
    children: [{
      label: "620902",
      value: "肃州区"
    }, {
      label: "620921",
      value: "金塔县"
    }, {
      label: "620922",
      value: "瓜州县"
    }, {
      label: "620923",
      value: "肃北蒙古族自治县"
    }, {
      label: "620924",
      value: "阿克塞哈萨克族自治县"
    }, {
      label: "620981",
      value: "玉门市"
    }, {
      label: "620982",
      value: "敦煌市"
    }]
  }, {
    label: "6210",
    value: "庆阳市",
    children: [{
      label: "621002",
      value: "西峰区"
    }, {
      label: "621021",
      value: "庆城县"
    }, {
      label: "621022",
      value: "环县"
    }, {
      label: "621023",
      value: "华池县"
    }, {
      label: "621024",
      value: "合水县"
    }, {
      label: "621025",
      value: "正宁县"
    }, {
      label: "621026",
      value: "宁县"
    }, {
      label: "621027",
      value: "镇原县"
    }]
  }, {
    label: "6211",
    value: "定西市",
    children: [{
      label: "621102",
      value: "安定区"
    }, {
      label: "621121",
      value: "通渭县"
    }, {
      label: "621122",
      value: "陇西县"
    }, {
      label: "621123",
      value: "渭源县"
    }, {
      label: "621124",
      value: "临洮县"
    }, {
      label: "621125",
      value: "漳县"
    }, {
      label: "621126",
      value: "岷县"
    }]
  }, {
    label: "6212",
    value: "陇南市",
    children: [{
      label: "621202",
      value: "武都区"
    }, {
      label: "621221",
      value: "成县"
    }, {
      label: "621222",
      value: "文县"
    }, {
      label: "621223",
      value: "宕昌县"
    }, {
      label: "621224",
      value: "康县"
    }, {
      label: "621225",
      value: "西和县"
    }, {
      label: "621226",
      value: "礼县"
    }, {
      label: "621227",
      value: "徽县"
    }, {
      label: "621228",
      value: "两当县"
    }]
  }, {
    label: "6229",
    value: "临夏回族自治州",
    children: [{
      label: "622901",
      value: "临夏市"
    }, {
      label: "622921",
      value: "临夏县"
    }, {
      label: "622922",
      value: "康乐县"
    }, {
      label: "622923",
      value: "永靖县"
    }, {
      label: "622924",
      value: "广河县"
    }, {
      label: "622925",
      value: "和政县"
    }, {
      label: "622926",
      value: "东乡族自治县"
    }, {
      label: "622927",
      value: "积石山保安族东乡族撒拉族自治县"
    }]
  }, {
    label: "6230",
    value: "甘南藏族自治州",
    children: [{
      label: "623001",
      value: "合作市"
    }, {
      label: "623021",
      value: "临潭县"
    }, {
      label: "623022",
      value: "卓尼县"
    }, {
      label: "623023",
      value: "舟曲县"
    }, {
      label: "623024",
      value: "迭部县"
    }, {
      label: "623025",
      value: "玛曲县"
    }, {
      label: "623026",
      value: "碌曲县"
    }, {
      label: "623027",
      value: "夏河县"
    }]
  }]
}, {
  label: "63",
  value: "青海省",
  children: [{
    label: "6301",
    value: "西宁市",
    children: [{
      label: "630102",
      value: "城东区"
    }, {
      label: "630103",
      value: "城中区"
    }, {
      label: "630104",
      value: "城西区"
    }, {
      label: "630105",
      value: "城北区"
    }, {
      label: "630106",
      value: "湟中区"
    }, {
      label: "630121",
      value: "大通回族土族自治县"
    }, {
      label: "630123",
      value: "湟源县"
    }]
  }, {
    label: "6302",
    value: "海东市",
    children: [{
      label: "630202",
      value: "乐都区"
    }, {
      label: "630203",
      value: "平安区"
    }, {
      label: "630222",
      value: "民和回族土族自治县"
    }, {
      label: "630223",
      value: "互助土族自治县"
    }, {
      label: "630224",
      value: "化隆回族自治县"
    }, {
      label: "630225",
      value: "循化撒拉族自治县"
    }]
  }, {
    label: "6322",
    value: "海北藏族自治州",
    children: [{
      label: "632221",
      value: "门源回族自治县"
    }, {
      label: "632222",
      value: "祁连县"
    }, {
      label: "632223",
      value: "海晏县"
    }, {
      label: "632224",
      value: "刚察县"
    }]
  }, {
    label: "6323",
    value: "黄南藏族自治州",
    children: [{
      label: "632321",
      value: "同仁县"
    }, {
      label: "632322",
      value: "尖扎县"
    }, {
      label: "632323",
      value: "泽库县"
    }, {
      label: "632324",
      value: "河南蒙古族自治县"
    }]
  }, {
    label: "6325",
    value: "海南藏族自治州",
    children: [{
      label: "632521",
      value: "共和县"
    }, {
      label: "632522",
      value: "同德县"
    }, {
      label: "632523",
      value: "贵德县"
    }, {
      label: "632524",
      value: "兴海县"
    }, {
      label: "632525",
      value: "贵南县"
    }]
  }, {
    label: "6326",
    value: "果洛藏族自治州",
    children: [{
      label: "632621",
      value: "玛沁县"
    }, {
      label: "632622",
      value: "班玛县"
    }, {
      label: "632623",
      value: "甘德县"
    }, {
      label: "632624",
      value: "达日县"
    }, {
      label: "632625",
      value: "久治县"
    }, {
      label: "632626",
      value: "玛多县"
    }]
  }, {
    label: "6327",
    value: "玉树藏族自治州",
    children: [{
      label: "632701",
      value: "玉树市"
    }, {
      label: "632722",
      value: "杂多县"
    }, {
      label: "632723",
      value: "称多县"
    }, {
      label: "632724",
      value: "治多县"
    }, {
      label: "632725",
      value: "囊谦县"
    }, {
      label: "632726",
      value: "曲麻莱县"
    }]
  }, {
    label: "6328",
    value: "海西蒙古族藏族自治州",
    children: [{
      label: "632801",
      value: "格尔木市"
    }, {
      label: "632802",
      value: "德令哈市"
    }, {
      label: "632803",
      value: "茫崖市"
    }, {
      label: "632821",
      value: "乌兰县"
    }, {
      label: "632822",
      value: "都兰县"
    }, {
      label: "632823",
      value: "天峻县"
    }, {
      label: "632857",
      value: "大柴旦行政委员会"
    }]
  }]
}, {
  label: "64",
  value: "宁夏回族自治区",
  children: [{
    label: "6401",
    value: "银川市",
    children: [{
      label: "640104",
      value: "兴庆区"
    }, {
      label: "640105",
      value: "西夏区"
    }, {
      label: "640106",
      value: "金凤区"
    }, {
      label: "640121",
      value: "永宁县"
    }, {
      label: "640122",
      value: "贺兰县"
    }, {
      label: "640181",
      value: "灵武市"
    }]
  }, {
    label: "6402",
    value: "石嘴山市",
    children: [{
      label: "640202",
      value: "大武口区"
    }, {
      label: "640205",
      value: "惠农区"
    }, {
      label: "640221",
      value: "平罗县"
    }]
  }, {
    label: "6403",
    value: "吴忠市",
    children: [{
      label: "640302",
      value: "利通区"
    }, {
      label: "640303",
      value: "红寺堡区"
    }, {
      label: "640323",
      value: "盐池县"
    }, {
      label: "640324",
      value: "同心县"
    }, {
      label: "640381",
      value: "青铜峡市"
    }]
  }, {
    label: "6404",
    value: "固原市",
    children: [{
      label: "640402",
      value: "原州区"
    }, {
      label: "640422",
      value: "西吉县"
    }, {
      label: "640423",
      value: "隆德县"
    }, {
      label: "640424",
      value: "泾源县"
    }, {
      label: "640425",
      value: "彭阳县"
    }]
  }, {
    label: "6405",
    value: "中卫市",
    children: [{
      label: "640502",
      value: "沙坡头区"
    }, {
      label: "640521",
      value: "中宁县"
    }, {
      label: "640522",
      value: "海原县"
    }]
  }]
}, {
  label: "65",
  value: "新疆维吾尔自治区",
  children: [{
    label: "6501",
    value: "乌鲁木齐市",
    children: [{
      label: "650102",
      value: "天山区"
    }, {
      label: "650103",
      value: "沙依巴克区"
    }, {
      label: "650104",
      value: "新市区"
    }, {
      label: "650105",
      value: "水磨沟区"
    }, {
      label: "650106",
      value: "头屯河区"
    }, {
      label: "650107",
      value: "达坂城区"
    }, {
      label: "650109",
      value: "米东区"
    }, {
      label: "650121",
      value: "乌鲁木齐县"
    }]
  }, {
    label: "6502",
    value: "克拉玛依市",
    children: [{
      label: "650202",
      value: "独山子区"
    }, {
      label: "650203",
      value: "克拉玛依区"
    }, {
      label: "650204",
      value: "白碱滩区"
    }, {
      label: "650205",
      value: "乌尔禾区"
    }]
  }, {
    label: "6504",
    value: "吐鲁番市",
    children: [{
      label: "650402",
      value: "高昌区"
    }, {
      label: "650421",
      value: "鄯善县"
    }, {
      label: "650422",
      value: "托克逊县"
    }]
  }, {
    label: "6505",
    value: "哈密市",
    children: [{
      label: "650502",
      value: "伊州区"
    }, {
      label: "650521",
      value: "巴里坤哈萨克自治县"
    }, {
      label: "650522",
      value: "伊吾县"
    }]
  }, {
    label: "6523",
    value: "昌吉回族自治州",
    children: [{
      label: "652301",
      value: "昌吉市"
    }, {
      label: "652302",
      value: "阜康市"
    }, {
      label: "652323",
      value: "呼图壁县"
    }, {
      label: "652324",
      value: "玛纳斯县"
    }, {
      label: "652325",
      value: "奇台县"
    }, {
      label: "652327",
      value: "吉木萨尔县"
    }, {
      label: "652328",
      value: "木垒哈萨克自治县"
    }]
  }, {
    label: "6527",
    value: "博尔塔拉蒙古自治州",
    children: [{
      label: "652701",
      value: "博乐市"
    }, {
      label: "652702",
      value: "阿拉山口市"
    }, {
      label: "652722",
      value: "精河县"
    }, {
      label: "652723",
      value: "温泉县"
    }]
  }, {
    label: "6528",
    value: "巴音郭楞蒙古自治州",
    children: [{
      label: "652801",
      value: "库尔勒市"
    }, {
      label: "652822",
      value: "轮台县"
    }, {
      label: "652823",
      value: "尉犁县"
    }, {
      label: "652824",
      value: "若羌县"
    }, {
      label: "652825",
      value: "且末县"
    }, {
      label: "652826",
      value: "焉耆回族自治县"
    }, {
      label: "652827",
      value: "和静县"
    }, {
      label: "652828",
      value: "和硕县"
    }, {
      label: "652829",
      value: "博湖县"
    }, {
      label: "652871",
      value: "库尔勒经济技术开发区"
    }]
  }, {
    label: "6529",
    value: "阿克苏地区",
    children: [{
      label: "652901",
      value: "阿克苏市"
    }, {
      label: "652902",
      value: "库车市"
    }, {
      label: "652922",
      value: "温宿县"
    }, {
      label: "652924",
      value: "沙雅县"
    }, {
      label: "652925",
      value: "新和县"
    }, {
      label: "652926",
      value: "拜城县"
    }, {
      label: "652927",
      value: "乌什县"
    }, {
      label: "652928",
      value: "阿瓦提县"
    }, {
      label: "652929",
      value: "柯坪县"
    }]
  }, {
    label: "6530",
    value: "克孜勒苏柯尔克孜自治州",
    children: [{
      label: "653001",
      value: "阿图什市"
    }, {
      label: "653022",
      value: "阿克陶县"
    }, {
      label: "653023",
      value: "阿合奇县"
    }, {
      label: "653024",
      value: "乌恰县"
    }]
  }, {
    label: "6531",
    value: "喀什地区",
    children: [{
      label: "653101",
      value: "喀什市"
    }, {
      label: "653121",
      value: "疏附县"
    }, {
      label: "653122",
      value: "疏勒县"
    }, {
      label: "653123",
      value: "英吉沙县"
    }, {
      label: "653124",
      value: "泽普县"
    }, {
      label: "653125",
      value: "莎车县"
    }, {
      label: "653126",
      value: "叶城县"
    }, {
      label: "653127",
      value: "麦盖提县"
    }, {
      label: "653128",
      value: "岳普湖县"
    }, {
      label: "653129",
      value: "伽师县"
    }, {
      label: "653130",
      value: "巴楚县"
    }, {
      label: "653131",
      value: "塔什库尔干塔吉克自治县"
    }]
  }, {
    label: "6532",
    value: "和田地区",
    children: [{
      label: "653201",
      value: "和田市"
    }, {
      label: "653221",
      value: "和田县"
    }, {
      label: "653222",
      value: "墨玉县"
    }, {
      label: "653223",
      value: "皮山县"
    }, {
      label: "653224",
      value: "洛浦县"
    }, {
      label: "653225",
      value: "策勒县"
    }, {
      label: "653226",
      value: "于田县"
    }, {
      label: "653227",
      value: "民丰县"
    }]
  }, {
    label: "6540",
    value: "伊犁哈萨克自治州",
    children: [{
      label: "654002",
      value: "伊宁市"
    }, {
      label: "654003",
      value: "奎屯市"
    }, {
      label: "654004",
      value: "霍尔果斯市"
    }, {
      label: "654021",
      value: "伊宁县"
    }, {
      label: "654022",
      value: "察布查尔锡伯自治县"
    }, {
      label: "654023",
      value: "霍城县"
    }, {
      label: "654024",
      value: "巩留县"
    }, {
      label: "654025",
      value: "新源县"
    }, {
      label: "654026",
      value: "昭苏县"
    }, {
      label: "654027",
      value: "特克斯县"
    }, {
      label: "654028",
      value: "尼勒克县"
    }]
  }, {
    label: "6542",
    value: "塔城地区",
    children: [{
      label: "654201",
      value: "塔城市"
    }, {
      label: "654202",
      value: "乌苏市"
    }, {
      label: "654221",
      value: "额敏县"
    }, {
      label: "654223",
      value: "沙湾县"
    }, {
      label: "654224",
      value: "托里县"
    }, {
      label: "654225",
      value: "裕民县"
    }, {
      label: "654226",
      value: "和布克赛尔蒙古自治县"
    }]
  }, {
    label: "6543",
    value: "阿勒泰地区",
    children: [{
      label: "654301",
      value: "阿勒泰市"
    }, {
      label: "654321",
      value: "布尔津县"
    }, {
      label: "654322",
      value: "富蕴县"
    }, {
      label: "654323",
      value: "福海县"
    }, {
      label: "654324",
      value: "哈巴河县"
    }, {
      label: "654325",
      value: "青河县"
    }, {
      label: "654326",
      value: "吉木乃县"
    }]
  }, {
    label: "6590",
    value: "自治区直辖县级行政区划",
    children: [{
      label: "659001",
      value: "石河子市"
    }, {
      label: "659002",
      value: "阿拉尔市"
    }, {
      label: "659003",
      value: "图木舒克市"
    }, {
      label: "659004",
      value: "五家渠市"
    }, {
      label: "659005",
      value: "北屯市"
    }, {
      label: "659006",
      value: "铁门关市"
    }, {
      label: "659007",
      value: "双河市"
    }, {
      label: "659008",
      value: "可克达拉市"
    }, {
      label: "659009",
      value: "昆玉市"
    }, {
      label: "659010",
      value: "胡杨河市"
    }]
  }]
        }],
        options_housestyle: [{

          value: '无',
          label:'无',
        },
          
          {
          value: '3室1厅',
          label: '3室1厅'
        }, {
          value: '3室2厅',
          label: '3室2厅'
        }, {
          value: '2室1厅',
          label: '2室1厅'
        }, {
          value: '2室2厅',
          label: '2室2厅'
        }, {
          value: '1室1厅',
          label: '1室1厅'
        }],
        optionProps: {
       
        value: "value",
        label: "value",
        children: "children"
      },
      }
    },
    methods: {
      
      loadAll() {
        return [
          { "value": "湾景国际3单元1楼四户"},
          { "value": "永泰庄2单元3楼1户"},
          { "value": "悦溪3单元2楼1户"},
          { "value": "仁和花园3单元2楼5户"},
          { "value": "汇景5单元2楼4户"},
          { "value": "通天院2单元3楼1户"},
          { "value": "丽湾家园2单元3楼4户"},
          { "value": "祈东家园5单元2楼1户"},
          { "value": "中湾国际5单元2楼6户"},
          { "value": "明珠家园5单元4楼8户"},
          { "value": "金隅汇景7单元3楼8户"},
          { "value": "天宫4单元6楼2户"},
          { "value": "次渠嘉园4单元3楼2户"},
          { "value": "紫藤一村4单元3楼8户"},
          { "value": "爱博二村5单元2楼4户"},
          { "value": "黎明花园2单元3楼4户"},
          { "value": "玫瑰园4单元3楼2户"},
          { "value": "碧林湾摩登堂6 单元3楼2户"},
          { "value": " 七韵美地苑 6单元3楼2户"},
          { "value": "牡丹新村8单元3楼1户"},
          { "value": "万圭园2单元5楼2户"},
          { "value": "天上单元楼户"},
          { "value": "林肯公园3单元2楼1户"},
          { "value": "东边院子1单元2楼4户"},
          { "value": " 南城都汇汇朗园5单元2楼3户"},
          { "value": "保利城单元5楼3户"},
          { "value": "中德英伦世邦6单元4楼2户"},
          { "value": " 成华奥园广场(二期) 4单元2楼3户"},
          { "value": "东城印象4单元3楼2户"},
          { "value": "时光荟6单元3楼2户"},
          { "value": "时光荟6单元3楼2户"},
          { "value": "华侨城御龙山7单元8楼3户"},
          { "value": "鑫禾北城鑫街6单元5楼2户"},
          { "value": "玫瑰园2单元1楼3户"},
          { "value": " 鑫禾北城鑫街7单元3楼4户"},
          { "value": "玫瑰园3单元2楼7户"},
          { "value": "天上人间3单元2楼1户"},
          { "value": "芜湖牛逼2单元1楼4户"},
          { "value": "北苑2单元3楼1户"},
          { "value": "观澳园2单元3楼4户"},
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      info(){
        // window.location.href="information";
        window.open("information");
      },
      addcollection(item){
          this.$axios({
        method: "post",
        url: "http://localhost:8000/search/",
        data: qs.stringify({
          function_id: 6,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          house_id: item.HouseID
        }),
      })
        .then((res) => {
          console.log(item.id)
          if(res.data.errornumber==1){
            this.$message.success("收藏成功")
          }
          else if(res.data.errornumber==3){
            this.$message.warning("已经收藏过啦")
          }
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      },
      addjusthouseid(item){
        console.log(item);
        this.$store.dispatch("savejusthouseid", item.HouseID);
        window.location.href="information";
    },
     search(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/search/",
        data: qs.stringify({
          function_id: 7,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          house_name: this.state
        }),
      })
        .then((res) => {
              
              // this.items_index = res.data.houselist;
              this.info = res.data.houselist;
              this.radio_money = null;
              this.housestyle = null;
              this.city = null;
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      },
      classify(){
        this.$axios({
        method: "post",
        url: "http://localhost:8000/search/",
        data: qs.stringify({
          function_id: 8,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          city: this.city[0]+'/'+this.city[1]+'/'+this.city[2],
          type: this.housestyle,
          rent: this.radio_money
        }),
      })
        .then((res) => {
          if(res.data.houselist==''){
            this.info = res.data.houselist;
            this.$message.warning("没找到匹配项~");
            // window.location.reload();
          }
          else{
            this.info = res.data.houselist;
          }
              
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      },
      init(){
        this.$axios({
        method: "post",
        // url: "http://localhost:8000/collection/",
        url: "http://localhost:8000/FirstPage/",
        data: qs.stringify({
          function_id: 4,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
        }),
      })
        .then((res) => {
              // this.items_index = res.data.houselist;
              this.info = res.data.houselist;
              console.log(this.info);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.init();
    },
  }
</script>

