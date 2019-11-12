<template>

    <div class="my_panel">

        <div class="row my-drop-group">

            <div class="my-dropDown-group col-md-5">
                <h5>主要负责订货商品的称重拣货</h5>
                <div class="my-dropDown">
                    <div class="my-dropDown-item">
                        <div class="drop-frame">

                            <span class="my-span">所有的出货部门</span>
                            <span class="caret my-caret my-span"></span>
                        </div>
                    </div>
                    <div style="display: none">
                        <ul class="nav nav-pills nav-stacked">
                            <li v-for="(item,index) in outDepList" v-bind:key="item.id" :id="item.outDepId"
                                :class="isactive == index ? 'active' : '' "
                                @click='onclick(index, item.depId, item.depName)'>

                                <a>{{item.depName}}</a></li>
                        </ul>
                    </div>


                </div>

            </div>

            <div class="my-dropDown-group col-md-5">
                <h5>产品分类</h5>
                <div class="my-dropDown">
                    <div class="my-dropDown-item">
                        <div class="drop-frame">

                            <span class="my-span">所有产品大类</span>
                            <span class="caret my-caret my-span"></span>
                        </div>
                    </div>
                    <div style="display: none">
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <!--<li role="separator" class="divider"></li>-->
                        <li><a  @click="queryFatherGoods($event, item.goodsId)" v-for="(item, index) in cateArr" :fatherId="item.goodsId"> {{item.goodsName}}</a></li>
                        </ul>
                    </div>


                </div>

            </div>
            <div class="col-md-2">
                <a class="btn my-warning btn-lg" >加入采购计划</a>
            </div>


        </div>




        <div class="panel panel-default">
            <div class="panel-body  no-border">
                <div class="box-body  no-padding">

                    <table id="jqGrid"></table>
                    <div id="jqGridPager"></div>

                </div>

            </div>

        </div>


    </div>




</template>

<script>
    import api from '../../../api/GoodsManagement/Products'
    import apid from '../../../api/background/outDep'

    export default {
        name: "ProductsStockPanel",
        props:['depId','depName'],

        mounted() {


        },
        watch: {
            depId: function(newVal,oldVal){
                this.depId = newVal;
                this.getCateList();
                this.getJqtableData();

            },
        },
        components: {
        },

        data() {
            return {
                page: 1,
                limit: 20,
                cateArr: [],
                fatherId: -1,
                outDepList:[]
            }
        },
        methods: {


            queryFatherGoods: function(event) {
                var $this = $(event.currentTarget);
             this.fatherId = $this.attr('fatherId');
             this.fatherName = $this.html();
             this.getJqtableData(this.depId, this.fatherId)
                $('#dropdownMenu1').html( this.fatherName+`<span class="caret"></span>`)

            },

            getCateList: function () {
                api.getOutDepCateList(this.depId).then(res => {
                    if(res) {
                        this.cateArr = res.data
                    }
                })

            },

            //获取表格数据
            getJqtableData: function(){
                var data = "page=" + this.page + "&limit=" + this.limit  + "&depId="+ this.depId + "&fatherId=" + this.fatherId;
                api.getOutDepGoodsList(data).then(res => {
                    this.goodsList = res.page.list;
                    //加载表格数据
                    this.jqtable()
                });

            },


            // 初始化表格
            jqtable() {

                console.log("jqtable?????")

                // 清空jqGrid表格数据
                $("#jqGrid").jqGrid("clearGridData")

                // 初始化jqgrid
                var _this = this

                //更新数据
                $("#jqGrid").jqGrid('setGridParam',{
                    datatype:'local',
                    data:this.goodsList,//newData是符合格式要求的重新加载的数据
                    page:this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#jqGrid").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#jqGrid").jqGrid(
                    {
                        data: _this.goodsList,
                        datatype: "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '产品名称', name: 'goodsName', width: 120},
                            {label: '进货规格库存', name: 'stockPurStandard', width: 110, formatter: function(value, options, row){
                                   var num = row.stockPurStandard;
                                    var st = row.purStandardName;
                                    return name = num + st;
                                } },
                            {label: '申请规格库存', name: 'stockApplyStandard', width: 150, formatter: function(value, options, row){
                                    var num = row.stockApplyStandard;
                                    var st = row.applyStandardName;
                                    return name = num + st;
                                }},
                            {label: '保质期天数', name: 'qualityPeriod', width: 120, formatter: function(value, options, row){
                                    return name = value + "天";
                                }},
                            {label: '报警数量', name: 'alarmWeight', width: 120, formatter: function(value, options, row){
                                    return name = value + row.purStandardName;
                                }},

                            {
                                label: '库存情况',
                                name: 'status',
                                width: 200,
                                formatter: function (value, options, rowData) {
                                    if (value === 1) {
                                        return  "<span class='label label-success'> 库存充足</span>";
                                    } else if (value === 2) {
                                        return  "<span class='label label-danger'> 库存不足</span>";
                                    } else {
                                        return  "<span class='label label-warning'> 已加入采购计划</span>";
                                    }
                                }
                            }
                        ],


                        viewrecords: true,
                        height: 400,
                        rowNum: 10,
                        rowList: [10, 30, 50],
                        rownumbers: true,
                        rownumWidth: 25,
                        shrinkToFit:false,
                        autowidth: true,
                        autoScroll: true,
                        multiselect: true,
                        pager: "#jqGridPager",
                        jsonReader: {
                            root: "page.list",
                            page: this.currPage,
                            total: this.totalCount,
                            records: this.totalPage,
                        },
                        prmNames: {
                            page: "page",
                            rows: "limit",
                            order: "order"
                        },
                        // gridComplete: function () {
                        //     //隐藏grid底部滚动条
                        //     $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
                        // }
                    });

            },




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

    .my-warning{
        /*background: #007a5a;*/
        background: #e07e20;
        color: #fff;
    }



</style>
