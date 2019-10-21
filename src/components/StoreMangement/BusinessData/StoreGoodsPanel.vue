<template>

    <div class="my_panel">

        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                            商品数量：102个
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
                        <th style="width: 80px">百分比</th>
                    </tr>
                    <tr>
                        <td>1.</td>
                        <td>猪头肉</td>
                        <td>205斤</td>
                        <td>12129.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 30%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">30%</span></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>哈尔滨精品红肠</td>
                        <td>300斤</td>
                        <td>8900.3</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 20%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">20%</span></td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>荷叶鸡</td>
                        <td>150斤</td>
                        <td>700</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 15%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">15%</span></td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>猪蹄</td>
                        <td>295斤</td>
                        <td>690.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 11.35%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">11.35%</span></td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </div>

        </div>


    </div>




</template>

<script>


    export default {
        name: "StoreGoodsPanel",
        mounted() {

        }, components: {
        },
        methods: {},
        data() {
            return {
                abc: "fff",
                type: "1"
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
