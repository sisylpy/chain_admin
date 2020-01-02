<template>

    <div class="my_panel">

        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                        总额：{{billTotal}} 元
                    </h4>

                    <div class="pull-right">
                        <div class="dropdown ">
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                {{billDate}} <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li v-for="(item, index) in arr" :index="index" @click="changeDate(index)"><a href="#">{{item.billDate}}</a></li>
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
                        <th>单价</th>
                        <th>小计(元)</th>
                        <th style="width: 80px">百分比</th>
                    </tr>
                    <tr v-for="(item, index) in bill">
                        <td>{{index+1}}</td>
                        <td>{{item.goodsEntity.goodsName}}</td>
                        <td>{{item.quantity}}{{item.goodsEntity.purStandardName}}</td>
                        <td>{{item.discountPrice}}/{{item.goodsEntity.purStandardName}}</td>
                        <td>{{item.subTotal}}</td>
                        <td></td>
                        <td></td>
                    </tr>

                    </tbody>
                </table>
            </div>

        </div>

        </div>


    </div>




</template>

<script>
import api from '@/api/store/businessData'

    export default {
        name: "InBill",
        props:['storeId', 'storeName', 'businessType'],
        watch:{
            storeId: function(newVal) {
                console.log(newVal)
                console.log(this.businessType)
                this.storeId = newVal;
                if(this.businessType == "inBill"){
                    console.log("gaigai")
                    this.firstStoreData();
                }

            },
            businessType: function (newVal) {
                if (newVal == "inBill") {
                    this.firstStoreData();

                    }
            }
        },


        methods: {
            firstStoreData: function () {
                console.log(this.storeId);
                api.getLastThreeStockBill(this.storeId)
                    .then( res => {
                        if(res.data) {
                            console.log(res.data)
                            this.arr = res.data;
                            this.bill = res.data[0]['ckStockRecordEntities'];
                            this.billTotal = res.data[0]['total'];
                            this.billDate = res.data[0]['billDate']
                        }else{
                            this.arr = [];
                            this.bill = "";
                            this.billTotal = "";
                            this.billDate = "";
                        }
                    })
            },

            changeDate: function (index) {
                console.log(index)
                console.log(this.arr)
                console.log(this.arr[index])
                this.bill = this.arr[index]['ckStockRecordEntities'];
                this.billTotal = this.arr[index]['total'];
                this.billDate = this.arr[index]['billDate']
            }

        },
        data() {
            return {

                arr: [],
                billDate: "",
                bill: "",
                billTotal: "",
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
