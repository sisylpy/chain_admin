<template>

    <div class="my_panel">

        <div class="row my-drop-group">

            <div class="my-dropDown-group col-md-6">
                <h5>负责订货商品的称重拣货</h5>
                <div class="form-group"  style="background: yellow">
                    <select class="form-control select2"  data-placeholder="出库部门"
                            style="width: 100%;" id="selectOutDepProStock" >
                        <option ></option>
                        <option v-for="(item) in outDepArr" :value="item.depId" :key="item.depId"> {{item.depName}}</option>
                    </select>

                </div>

            </div>

            <div class="my-dropDown-group col-md-6">
                <h5>商品类别</h5>
                <div class="form-group"  style="background: yellow">
                    <select class="form-control select2"  data-placeholder="类别"
                            style="width: 100%;" id="selectFatherProStock" >
                        <option ></option>
                        <option v-for="(item) in cateArr" :value="item.goodsId" > {{item.goodsName}}</option>
                    </select>

                </div>
            </div>


        </div>




        <div class="panel panel-default">
            <div class="panel-body  no-border no-padding">
                <div class="box-body  no-padding">

                    <table id="jqGridStockPanel"></table>
                    <div id="jqGridPagerStock"></div>

                </div>

            </div>

        </div>


    </div>




</template>

<script>
    import api from '../../../api/goodsManagement/inventory'

    export default {
        name: "StockListPanel",
        props:['stockType'],

        watch: {

            stockType: function (newVal, oldVal) {
                console.log(newVal)

                if (newVal === "stockGoods") {
                    console.log("meiyouma?")
                    this.getJqtableData();
                }
            },


        },


        data() {
            return {
                page: 1,
                limit: 200,
                goodsType: 0,
                fatherId: -1,
                depId: -1,
                goodsList:[],
                outDepArr: [],
                cateArr: [],

            }
        },

        mounted(){
            var that = this;

            $('.select2').select2();

            // selcct 产品

            $('#selectOutDepProStock').on('change', function (e) {

                that.depId = $(this).val();
                that.getJqtableData();
            });

            $('#selectFatherProStock').on('change', function (e) {

                console.log("selfatheer")
                that.fatherId = $(this).val();
                that.getJqtableData();
            });






            this.getJqtableData();

        },
        methods: {



            queryFatherGoods: function(event) {
                var $this = $(event.currentTarget);
             this.fatherId = $this.attr('fatherId');
             this.fatherName = $this.html();
             this.getJqtableData(this.depId, this.fatherId)
                $('#dropdownMenu1').html( this.fatherName+`<span class="caret"></span>`)

            },

            getSortsList: function () {

                api.getOutDepAndCate(this.goodsType).then(res => {
                    if(res) {
                        this.cateArr = res.data.fatherList;
                        this.outDepArr = res.data.outDepList;

                    }
                })

            },

            //获取表格数据
            getJqtableData: function(){
                var data = "page=" + this.page + "&limit=" + this.limit  +
                    "&depId="+ this.depId + "&fatherId=" + this.fatherId + "&type="+ this.goodsType;
                this.bus.$emit('loading', true);

                api.getOutDepTypeGoodsList(data).then(res => {
                    this.goodsList = res.page.list;
                    this.bus.$emit('loading', false);
                    //加载表格数据
                    this.jqtable()
                    this.getSortsList();

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
                $("#jqGridStockPanel").jqGrid('setGridParam',{
                    datatype:'local',
                    data:this.goodsList,//newData是符合格式要求的重新加载的数据
                    page:this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#jqGridStockPanel").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#jqGridStockPanel").jqGrid(
                    {
                        data: _this.goodsList,
                        datatype: "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '产品名称', name: 'goodsName', width: 120},

                            {label: '出货部门', name: 'goodsName', width: 120, formatter: function(value, options, row){
                                    return name = row.depEntity.depName
                                }},
                            {label: '保质期天数', name: 'qualityPeriod', width: 120, formatter: function(value, options, row){
                                    return name = value + "天";
                                }},
                            {label: '报警数量', name: 'alarmWeight', width: 120, formatter: function(value, options, row){
                                    return name = value + row.purStandardName;
                                }},
                            {label: '单价', name: 'price', width: 120, formatter: function(value, options, row){

                                    return name = value + "元";
                                } },
                            {label: '现在库存', name: 'stockPurStandard', width: 120, formatter: function(value, options, row){
                                    var num = row.stockPurStandard;
                                    var st = row.purStandardName;
                                    return name = num + st;
                                } },





                        ],


                        viewrecords: true,
                        height: 440,
                        rowNum: 10,
                        rowList: [10, 30, 50],
                        rownumbers: true,
                        rownumWidth: 25,
                        shrinkToFit:false,
                        autowidth: true,
                        autoScroll: true,
                        multiselect: false,
                        pager: "#jqGridPagerStock",
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
