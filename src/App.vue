<template>
    <div class="hold-transition skin-blue sidebar-mini" id="app">

    <div class="wrapper" v-cloak>

        <!-- Main Header -->
        <header class="main-header">

            <a href="javascript:void(0);" class="logo">
                <!-- mini logo for sidebar mini 50x50 pixels -->
                <span class="logo-mini"><b>XX</b></span>
                <!-- logo for regular state and mobile devices -->
                <span class="logo-lg"><b>XX权限管理系统</b></span>
            </a>
            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top" role="navigation">
                <!-- Sidebar toggle button-->
                <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                </a>
                <div style="float:left;color:#fff;padding:15px 10px;">欢迎 {{user.username}}</div>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li><a href="http://www.baidu.com" target="_blank"><i class="fa fa-home"></i> &nbsp;待办事项</a></li>
                        <li><a href="javascript:;" @click="updatePassword"><i class="fa fa-lock"></i> &nbsp;修改密码</a></li>
                        <li><a @click="logout"><i class="fa fa-sign-out"></i> &nbsp;退出系统</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">

            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">

                 <!--Sidebar Menu -->
                <ul class="sidebar-menu" data-widget="tree">

                    <li class="header">导航菜单</li>

                    <menu-item  :item="item" v-for="item in menuList" v-bind:key="item.id"></menu-item>

                </ul>
                <!-- /.sidebar-menu -->
            </section>
            <!-- /.sidebar -->
        </aside>


        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">

            <!-- Content Header (Page header) -->
            <section class="content-header">

                <h1>
                    {{navTitle}}
                    <small></small>
                </h1>
                <ol class="breadcrumb" id="nav_title">
                    <li class="active"><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
                    <li class="active">{{navTitle}}</li>
                </ol>

            </section>

            <section class="content container-fluid">

                <router-view/>


            </section>

               <!--<Home/>-->


            <!-- /.content -->


        </div>
        <!-- /.content-wrapper -->

        <!-- Main Footer -->
        <footer class="main-footer">
            <!-- To the right -->
            <div class="pull-right hidden-xs">
                Anything you want
            </div>
            <!-- Default to the left -->
            <strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
        </footer>

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Create the tabs -->
            <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
                <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
                <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <!-- Home tab content -->
                <div class="tab-pane active" id="control-sidebar-home-tab">
                    <h3 class="control-sidebar-heading">Recent Activity</h3>
                    <ul class="control-sidebar-menu">
                        <li>
                            <a href="javascript:;">
                                <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                                <div class="menu-info">
                                    <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                                    <p>Will be 23 on April 24th</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.control-sidebar-menu -->

                    <h3 class="control-sidebar-heading">Tasks Progress</h3>
                    <ul class="control-sidebar-menu">
                        <li>
                            <a href="javascript:;">
                                <h4 class="control-sidebar-subheading">
                                    Custom Template Design
                                    <span class="pull-right-container">
                    <span class="label label-danger pull-right">70%</span>
                  </span>
                                </h4>

                                <div class="progress progress-xxs">
                                    <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.control-sidebar-menu -->

                </div>
                <!-- /.tab-pane -->
                <!-- Stats tab content -->
                <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
                <!-- /.tab-pane -->
                <!-- Settings tab content -->
                <div class="tab-pane" id="control-sidebar-settings-tab">
                    <form method="post">
                        <h3 class="control-sidebar-heading">General Settings</h3>

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Report panel usage
                                <input type="checkbox" class="pull-right" checked>
                            </label>

                            <p>
                                Some information about this general settings option
                            </p>
                        </div>
                        <!-- /.form-group -->
                    </form>
                </div>
                <!-- /.tab-pane -->
            </div>
        </aside>
        <!-- /.control-sidebar -->
        <!-- Add the sidebar's background. This div must be placed
        immediately after the control sidebar -->
        <div class="control-sidebar-bg"></div>
    </div>
    <!-- ./wrapper -->


    </div>
</template>

<script>
    import api from './api/user'
    import menuItem from './components/MenuItem'

    export default {
        name: "adminlte",
        components: {
            menuItem,

        },
        created: function () {
            this.getMenuList();
            this.getUser();
        },
        data:function () {
            return {
                user: {},
                menuList: {},
                item: {},
                navTitle: "Dashboard",
                main: "sys/main.html",

            }
        },
        methods: {
            getUser: function () {

                api.getUserInfo().then(res =>{
                    console.log(res);
                    if(res) {
                        this.user = res.user
                    }

                })

            },
            getMenuList: function(){
                // let formData2 = {username: 'admin', password: 'admin'}

                api.getSideBarList().then(res => {
                    console.log(res);
                    if(res) {
                        this.menuList = res.menuList
                    }
                })
            },
            updatePassword: function () {
                console.log("update");

            },

            logout: function () {
                api.logout().then(res => {
                    console.log(res);
                    if(res.code == 0){//登录成功

                        window.location.href= 'login.html'
                    }else{
                        this.error = true;
                        this.errorMsg = res.msg;
                    }


                })
            }



        }




    }
</script>

<style>

</style>
