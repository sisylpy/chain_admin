<template>
    <!-- Main content -->
    <section class="content">

        <PageHeader/>


        <div class="row">
            <div class="col-md-3">

                <!-- Profile Image -->
                <div class="box box-primary">
                    <div class="box-body box-profile">
                        <img class="profile-user-img img-responsive img-circle" src="../../assets/logo.png" alt="User profile picture">

                        <h3 class="profile-username text-center">燕郊华联</h3>

                        <p class="text-muted text-center">李</p>

                        <ul class="list-group list-group-unbordered">
                            <li class="list-group-item">
                                <b>河北</b> <a class="pull-right">1,322</a>
                            </li>
                            <li class="list-group-item">
                                <b>燕郊</b> <a class="pull-right">543</a>
                            </li>
                            <li class="list-group-item">
                                <b>北城</b> <a class="pull-right">13,287</a>
                            </li>
                        </ul>

                        <a href="#" class="btn btn-primary btn-block"><b>重新定位</b></a>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->

                <!-- About Me Box -->
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">本周营业额</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <strong><i class="fa fa-book margin-r-5"></i> 平均每天</strong>

                        <p class="text-muted">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                        </p>

                        <hr>

                        <strong><i class="fa fa-map-marker margin-r-5"></i> 每日详细</strong>

                        <p class="text-muted">Malibu, California</p>

                        <hr>

                        <strong><i class="fa fa-pencil margin-r-5"></i> Skills</strong>

                        <p>
                            <span class="label label-danger">UI Design</span>
                            <span class="label label-success">Coding</span>
                            <span class="label label-info">Javascript</span>
                            <span class="label label-warning">PHP</span>
                            <span class="label label-primary">Node.js</span>
                        </p>

                        <hr>

                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Notes</strong>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
            <!-- /.col -->
            <div class="col-md-9">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#products" data-toggle="tab">售卖产品</a></li>
                        <li><a href="#stockCount" data-toggle="tab">盘库</a></li>
                        <li><a href="#businessAnalysis" data-toggle="tab">经营分析</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="active tab-pane" id="products">

                         <!-- This is goodsTable-->
                            <h4>goodsTable</h4>

                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="stockCount">


                            <!-- The panku -->
                            <h4>panku </h4>


                        </div>
                        <!-- /.tab-pane -->

                        <div class="tab-pane" id="businessAnalysis">
                            <h4>jingyingfenxi </h4>

                        </div>
                        <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                </div>
                <!-- /.nav-tabs-custom -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->

    </section>
    <!-- /.content -->
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'

    export default {
        name: "Store",
        components:{
            PageHeader,
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
