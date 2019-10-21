<template>

    <div >
        <PageHeader/>

        <section class="content container-fluid">

            <div class="panel panel-default" id="rrapp" v-cloak>
                <div class="panel-heading">{{title}}</div>
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-2 control-label">店铺名称</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.storeName" placeholder="店铺名称"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">打印名称</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.printLabel" placeholder="打印名称"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">对外名称</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.outLabel" placeholder="对外名称"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">详细地址</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.address" placeholder="详细地址"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">手机号码</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.phone" placeholder="手机号码"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">城市</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.city" placeholder="城市"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">区域</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.district" placeholder="区域"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-2 control-label">微信号码</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.wxNickName" placeholder="微信号码"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">微信id</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.wxOpenid" placeholder="微信id"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">微信头像</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.wxAvatarUrl" placeholder="微信头像"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 control-label">微信号码</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckStore.wxNumber" placeholder="微信号码"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-2 control-label"></div>
                        <input type="button" class="btn btn-primary" @click="saveOrUpdate" value="确定"/>
                        &nbsp;&nbsp;<input type="button" class="btn btn-warning" @click="back" value="返回"/>
                    </div>
                </form>
            </div>
        </section>

    </div>



</template>

<script>
    import api from '../../../api/background/store'
    import PageHeader from '@/components/PageHeader.vue'

    export default {
        name: "addCategory",
        data(){
          return{
              title: "添加分店",
              ckStore: {
                  storeName: ""

              }
          }
        },

        components:{
            PageHeader,
        },

        methods:{

            saveOrUpdate: function (event) {
                console.log("saveOrUpdate api ")

                api.saveStore(JSON.stringify(this.ckStore)).then(res => {
                    this.$router.go(-1)

                })




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
