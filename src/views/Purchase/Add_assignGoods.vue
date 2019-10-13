<template>

    <div class="panel panel-default" id="rrapp" v-cloak>
        <div class="panel-heading">{{title}}</div>
        <form class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-2 control-label">商品名称</div>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="ckGoods.goodsName" placeholder="商品名称" value="name"/>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-2 control-label">规格</div>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="ckGoods.standardName" placeholder="规格" value="1"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-2 control-label">申请规格</div>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="ckGoods.applyStandardName" placeholder="申请规格"  value="1"/>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-2 control-label">是否称重</div>
                <div class="col-sm-10">
                    <select class="form-control" id="ckGoods.isWeigh" v-model="ckGoods.isWeigh" >
                        <option value="1" selected>称重</option>
                        <option value="2">不称重</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-2 control-label">产品状态</div>
                <div class="col-sm-10">
                    <select class="form-control" id="goodsStatus" v-model="ckGoods.status">
                        <option value="1" selected>售卖中</option>
                        <option value="2">断货</option>
                        <option value="3">停止销售</option>
                    </select>
                </div>
            </div>
            <div class="form-group" >
                <div class="col-sm-2 control-label">产品状态</div>
                <div class="col-sm-10">
                    <input  class="form-control" v-model="ckGoods.type"  value="1"/>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-2 control-label"></div>
                <input type="button" class="btn btn-primary" @click="saveOrUpdate" value="确定" />
                &nbsp;&nbsp;<input type="button" class="btn btn-warning" @click="back" value="返回"/>
            </div>
        </form>
    </div>
</template>

<script>
    import api from '../../api/purchase'
    export default {
        name: "add_assignGoods",
        props:['goodsId'],
        data(){
          return{
              title:"新增",
              ckGoods:{},
              type: 1,
          }
        },
        created: function() {
            console.log("created!!!!!");
            console.log(this.$route.params.goodsId);
            this.goodsId = this.$route.params.goodsId

            if(this.goodsId != null){
                this.title = "修改";
                this.getInfo(this.goodsId);
            }
        },
        methods:{
            getInfo: function(){
                console.log("huoqu api???");

                console.log(this.goodsId);

                api.getGoodsInfo(this.goodsId).then(res => {
                    this.ckGoods = res.data;
                    console.log(res);

                    $('#goodsStatus option[value= "' + this.ckGoods.status + '"]').attr("selected", true);   //设置Select的Text值为jQuery的项选中
                    $('#goodsStatus option[value= "' + this.ckGoods.isWeigh + '"]').attr("selected", true);   //设置Select的Text值为jQuery的项选中

                })
            },
            saveOrUpdate: function (event) {
                console.log("saveOrUpdate api ")

                if(this.ckGoods.goodsId) {

                    api.updateGoods(JSON.stringify(this.ckGoods)).then(res => {
                        this.$router.go(-1)

                    })
                }else {


                    api.saveGoods(JSON.stringify(this.ckGoods)).then(res => {

                        this.$router.go(-1)

                    })
                }

            },

            back: function (event) {
                console.log("back");

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
