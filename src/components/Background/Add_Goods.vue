<template>

    <!-- model-applycommit-->
    <div class="modal modal-warning fade" id="modal-warning">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="memberWxNameApply">{{fatherName}}</h4>
                </div>
                <div class="modal-body">
                    <p>{{fatherName}}</p>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">商品类别名称</div>
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
                                <select class="form-control" id="ckGoods.isWeight" v-model="ckGoods.isWeight" >
                                    <option value="1" selected>称重</option>
                                    <option value="2">不称重</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">采购组</div>
                            <div class="col-sm-10">
                                <select class="form-control" id="ckGoods.purGroupId" v-model="ckGoods.purGroupId" >
                                    <option value="1" selected>1重</option>
                                    <option value="2">2重</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">报警重量</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="ckGoods.alarmWeight" placeholder="报警重量"  value="1"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">保质期天数</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="ckGoods.qualityPeriod" placeholder="保质期天数"  value="1"/>
                            </div>

                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">产品状态</div>
                            <div class="col-sm-10">
                                <select class="form-control" id="goodsStatus" v-model="ckGoods.status">
                                    <option value="1" selected="selected">售卖中</option>
                                    <option value="2">断货</option>
                                    <option value="3">停止销售</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" >
                            <div class="col-sm-2 control-label">产品状态</div>
                            <div class="col-sm-10">
                                <input  class="form-control" v-model="ckGoods.type"/>
                            </div>
                        </div>

                        <div class="form-group" >
                            <div class="col-sm-2 control-label">零售价格</div>
                            <div class="col-sm-10">
                                <input  class="form-control" v-model="ckGoods.price"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label"></div>
                            <input type="button" class="btn btn-primary" @click="saveOrUpdate" value="确定" />
                            &nbsp;&nbsp;<input type="button" class="btn btn-warning" @click="back" value="返回"/>
                        </div>
                    </form>


                </div>
                <!--<div class="modal-footer">-->
                    <!--<button type="button" class="btn btn-outline pull-left" data-dismiss="modal" >关闭</button>-->
                    <!--<button type="button" class="btn btn-outline" id="commit" >确定</button>-->
                <!--</div>-->
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>


</template>

<script>
    import api from '../../api/background/productsManager'

    export default {
        name: "Add_Goods",
        data(){
          return{
              title:"新增",
              ckGoods:{
                  fatherId:this.$route.params.fatherId
              },
              type: 1,
              fatherName: this.$route.params.fatherName,
              fatherId: this.$route.params.fatherId,
              selectedStatus: 1

          }
        },
        created: function() {

            this.goodsId = this.$route.params.goodsId

            if(this.goodsId != null){
                this.title = "修改";
                this.getInfo(this.goodsId);
            }

        },
        components:{
        },

        methods:{
            getInfo: function(){
                console.log("huoqu api???");

                console.log(this.goodsId);

                api.getGoodsInfo(this.goodsId).then(res => {
                    this.ckGoods = res.data;
                    console.log(res);

                    $('#goodsStatus option[value= "' + this.ckGoods.status + '"]').attr("selected", true);   //设置Select的Text值为jQuery的项选中
                    $('#goodsStatus option[value= "' + this.ckGoods.isWeight + '"]').attr("selected", true);   //设置Select的Text值为jQuery的项选中

                })
            },
            saveOrUpdate: function (event) {
                console.log("saveOrUpdate api ")

                if(this.ckGoods.goodsId) {

                    api.updateGoods(JSON.stringify(this.ckGoods)).then(res => {
                        $('#modal-warning').modal('hide')

                        this.$router.go(-1)
                        this.$emit('submit-add');

                    })
                }else {


                    api.saveGoods(JSON.stringify(this.ckGoods)).then(res => {
                        $('#modal-warning').modal('hide')

                        this.$router.go(-1)

                        this.$emit('submit-add');

                    })
                }

            },

            back: function (event) {
                $('#modal-warning').modal('hide')

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
