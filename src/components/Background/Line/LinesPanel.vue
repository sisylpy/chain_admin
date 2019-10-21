<template>

    <div class="my_panel">

        <div class="panel panel-default" v-for="(item, index) in lineArr">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                        {{item.lineName}}
                    </h4>
                </div>
            </div>



        <div class="panel-body no-padding">
            <div class="box-body table-responsive no-padding">
                <table class="table">
                    <tbody>
                    <tr :for="item.storeId" v-for="(item3,index) in item.storeEntityList">
                        <td>第{{index+1}}个送达</td>
                        <td>{{item3.storeName}}</td>
                        <td>{{item3.address}}</td>
                        <!--<td><a class="btn  btn-default">选择</a></td>-->
                    </tr>
                    </tbody>


                </table>


            </div>

        </div>

        </div>


    </div>




</template>

<script>

    import api from '@/api/background/line'

    export default {
        name: "LinesPanel",
        mounted() {
            this.getLineData();

        }, components: {

        },
        methods: {
            getLineData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                api.getLineList(data).then(res => {
                    console.log(res);

                    this.lineArr = res.page.list;
                });
            },
        },
        data() {
            return {
                abc: "fff",
                type: "1",
                page: 1,
                limit: 20,
                lineArr: [],

            }
        }


    }

</script>

<style scoped>
    /*.content{*/
    /*background: #fff;*/
    /*}*/
    .padding {
        padding: 20px 5px;
    }

    .panel-title {
        height: 40px;
    }


</style>
