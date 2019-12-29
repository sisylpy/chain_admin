<template>

    <div>
        <PageHeader/>

        <div class="content" >
            <table class="table table-striped">
                <tbody>
                <tr>
                    <th>序号</th>
                    <th>供货商名称</th>
                    <th>付款方式</th>
                </tr>
                <tr v-for="(item, index) in  arr">
                    <td>{{index+1}}</td>
                    <td>{{item.supplierName}}</td>
                    <td>{{item.payMethods}}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import  api from '@/api/supplier/supplier'
    export default {
        name: "list",
        components: {
            PageHeader,

        },
        data(){
            return {
                arr: []
            }
        },
        mounted(){

            this.getAll();
        },
        methods:{
            getAll: function () {
               api.getAll()
                   .then(res => {
                       if(res) {
                           console.log(res)
                           this.arr = res.data
                       }
                   })
            }

        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
