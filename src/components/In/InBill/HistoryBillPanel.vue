<template>

    <div class="my_panel">

        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                        HistoryBill：
                    </h4>

                    <div class="pull-right">
                        <div class="dropdown ">
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                按销售额排名
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a href="#">按销售额排名</a></li>
                                <li><a href="#">按出货数量排名</a></li>
                                <li><a href="#"></a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        <div class="panel-body no-padding">
            <div class="box-body table-responsive no-padding">

                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>商品</th>
                        <th>出货数量</th>
                        <th>销售额</th>
                        <th>销售额所占比例</th>
                        <th style="width: 80px">百分比{{depId}}</th>
                    </tr>

                    <tr v-for="(item ,index) in billArr">
                        <td>1.</td>
                        <td>{{item.inSupplierId}}</td>
                        <td>12129.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 30%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">30%</span></td>
                    </tr>

                    </tbody>
                </table>

            </div>

        </div>

        </div>


    </div>




</template>

<script>
import api from '../../../api/In/InBill'

    export default {
        name: "HistoryBill",
        props:['depId','depName'],

        mounted() {
            console.log("mounted....aaa")
            this.initBill();

        },
        watch: {
            depId: function(newVal,oldVal){
                this.searchBill(newVal)

            },
        },
        components: {
        },

        data() {
            return {
                page: 1,
                limit: 20,
                billArr: [],
            }
        },
        methods: {
            initBill: function() {
                var data = "page=" + this.page + "&limit=" + this.limit  + "&depId="+ this.depId;

                api.billList(data).then(res => {
                    if(res) {
                        console.log(res)
                        this.billArr = res.page.list;
                    }

                })
            },
            searchBill: function (depId) {
                console.log(depId)
                console.log("mounted....")
                var data = "page=" + this.page + "&limit=" + this.limit  + "&depId="+ depId;

                api.billList(data).then(res => {
                    if(res) {
                        console.log(res)
                        this.billArr = res.page.list;
                    }

                })

            }
        }


    }

</script>

<style scoped>
    /*.content{*/
    /*background: #fff;*/
    /*}*/


    .panel-title {
        height: 40px;
    }




</style>
