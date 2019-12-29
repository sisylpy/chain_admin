<template>

    <div >
        <PageHeader/>

        <section class="content container-fluid">

            <div class="panel panel-default" id="rrapp" v-cloak>
                <div class="panel-heading">添加出货部门</div>
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-2 control-label">出货部门名称</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="storeDep.depName" placeholder="出货部门名称" value="name"/>
                        </div>
                    </div>



                    <div class="form-group">
                        <div class="col-sm-2 control-label"></div>
                        <input type="button" class="btn btn-primary" @click="saveOrUpdate" value="确定" />
                        &nbsp;&nbsp;<input type="button" class="btn btn-warning" @click="back" value="返回"/>
                    </div>
                </form>
            </div>
        </section>

    </div>



</template>

<script>
    import api from '../../../api/background/ckDep'
    import PageHeader from '@/components/PageHeader.vue'

    export default {
        name: "addOutDep",
        data(){
          return{
              storeDep:{
                  depType: 1,


              }

          }
        },

        components:{
            PageHeader,
        },

        methods:{

            saveOrUpdate: function (event) {
                console.log("storeDep api ")

                api.saveOutDep(JSON.stringify(this.storeDep)).then(res => {
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
