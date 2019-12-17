<template>

    <div>

        <PageHeader/>

        <!--<section class="content container-fluid">-->

            <!--<div class="panel panel-default" id="rrapp" v-cloak>-->
                <!--<div class="panel-heading">dorushangp</div>-->
                <!--<form class="form-horizontal" method="post" enctype="multipart/form-data">-->
                    <!--<div class="form-group">-->
                        <!--<div class="col-sm-2 control-label">文件文职</div>-->
                        <!--<div class="col-sm-10">-->
                            <!--<input type="file" class="form-control" />-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div class="form-group">-->
                        <!--<div class="col-sm-2 control-label" >下载模版</div>-->
                        <!--<div class="col-sm-10">-->
                            <!--<a  @click="downloadTMP">下载</a>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<button @click="importExcel"></button>-->
                <!--</form>-->
            <!--</div>-->
        <!--</section>-->
        <input type="file" id="people-export" ref="inputer" @change="fileUpload"/>




    </div>

</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import  api from '@/api/background/goods'

    export default {
        name: "ImportGoods",
        components:{
            PageHeader,
        },
        methods: {
            back: function () {

            },
            downloadTMP: function () {
                window.open("http://localhost:8080/chainPro_war_exploded/sys/ckgoods/downloadExcelTMP")

            },

            importExcel: function () {

                let fileFormData = new FormData();

                fileFormData.append('file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名

                api.uploadExcel()
                    .then(res => {
                        console.log(res)
                    })

            },


            fileUpload(event){
                // 上传文件
                console.log(event);

                var file = event.target.files;

                console.log(file[0]);

                var formData = new FormData();
                formData.append('file', file[0])
                console.log(formData);


                // let formData = new FormData()
                // formData.append('name', this.name)
                // formData.append('age', this.age)
                // formData.append('file', this.file)
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                // 文件上传
                api.uploadExcel(formData)
                    .then(res => {
                        if(res) {
                            console.log(res)
                        }
                    })

            },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
