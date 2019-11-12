<template>

    <div class="my_panel">



        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                            营业额：11000 元
                    </h4>


                    <div class="pull-right">

                        <div class="dropdown ">
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                选择时间
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
                        <th>日期</th>
                        <th>周</th>
                        <th>销售额</th>
                        <th>所占公司比例</th>
                        <th style="width: 80px">百分比</th>
                    </tr>
                    <tr>
                        <td>1.</td>
                        <td>2019-09-01</td>
                        <td>周一</td>
                        <td>1229.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 2%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">2%</span></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>2019-09-02</td>
                        <td>周二</td>
                        <td>1020</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 1.84%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">1.84%</span></td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>2019-09-03</td>
                        <td>周三</td>
                        <td>1229.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 2%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">2%</span></td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>2019-09-04</td>
                        <td>周四</td>
                        <td>1229.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 2%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">2%</span></td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>2019-09-05</td>
                        <td>周五</td>
                        <td>1229.6</td>
                        <td>
                            <div class="progress progress-xs progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: 2%"></div>
                            </div>
                        </td>
                        <td><span class="badge bg-light-blue">2%</span></td>
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
        name: "TurnoverPanel",
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
    .padding {
        padding: 20px 5px;
    }

    .panel-title {
        height: 40px;
    }


</style>
