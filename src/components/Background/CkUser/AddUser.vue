<template>

    <div>
        <PageHeader/>

        <section class="content container-fluid">

            <div class="panel panel-default" id="rrapp" v-cloak>
                <div class="panel-heading">添加员工</div>
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-2 control-label">员工名称</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="ckUser.ckUserName" placeholder="员工名称"
                                   value="name"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-2 control-label">所在部门</div>
                        <div class="col-sm-10">
                            <select class="form-control"  v-model="ckUser.userDepId">
                                <option :value="item.depId" v-for="item in depArr">{{item.depName}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-2 control-label">角色</div>
                        <div class="col-sm-10">

                            <form>

                                <div  v-for="role in roleArr" >
                                    <label  @change="clickRole"> {{role.roleName}}
                                    <input type="checkbox" class="minimal"  v-model="userRoleArr"
                                           :value="role.roleId" >
                                    </label>
                                </div>



                            </form>


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
    import apiDep from '../../../api/background/outDep'
    import apiUser from '../../../api/background/ckUser'
    import PageHeader from '@/components/PageHeader.vue'

    export default {
        name: "addUser",
        data() {
            return {
                ckUser: {},
                roleArr: [],
                depArr: [],
                userRoleArr: [],
                roleIds: []
            }
        },

        components: {
            PageHeader,
        },
        mounted() {
            this.getRole();
            this.getOutDep();
        },

        methods: {
            clickRole: function(e){
                var that = this;
                // this.roleIds = "";
                for(var i = 0; i < that.userRoleArr.length; i++) {
                    console.log("ok???")
                    console.log(that.userRoleArr)
                    this.roleIds.push(that.userRoleArr[i]);
                    console.log(this.roleIds)

                }
                that.ckUser.roleIds = this.roleIds
                console.log("enenen....")
    },


    getRole: function () {
                apiUser.getRole().then(res => {
                    if (res) {
                        console.log(res)
                        this.roleArr = res.data
                    }
                })
            },
            getOutDep: function () {
                var type = 1;
                apiDep.getOutDepList(type).then(res => {
                    if (res) {
                        this.depArr = res.data
                    }
                })
            },

            saveOrUpdate: function (event) {
                console.log("saveOrUpdate api ")



                apiUser.saveUser(JSON.stringify(this.ckUser)).then(res => {
                    if(res) {
                        this.$router.go(-1)
                    }

                })

            },

            back: function (event) {
                console.log("back");

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
.check-margin{
    margin-right: 30px;

}
</style>
