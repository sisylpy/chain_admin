<template>
    <div class="dropbox p-3" ref="dropbox" id="dropbox">
        <h5 v-if="files.length===0" class="text-center" style="width:100%; color:#aaa;">
            将文件拖到这里
        </h5>

        <div class="border m-2 d-inline-block p-4" style="float: left; margin-bottom: 20px;"
             v-for='(value, key) in imgs'
             :key="index">
            <!--<h5 class="mt-0">{{ file.name }}</h5>-->
            <div style="" class="delImg" :index="index" :aaa="index" @click="delImg(key)">
                <button>删除</button>
            </div>
            <div style="top: -20px;">
                <img :src="getObjectURL(value)" style="width:300px;height:380px;"/>
            </div>
            <!--<div class="progress" v-if="file.showPercentage">-->
            <!--<div class="progress-bar progress-bar-striped"-->
            <!--:style="{ height: file.uploadPercentage+'%' }"-->
            <!--&gt;</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "dragImg",
        data() {
            return{
                files: [],

            }
        },
        mounted(){

            var dropbox = document.querySelector(".dropbox");
            dropbox.addEventListener("dragenter", this.onDrag, false);
            dropbox.addEventListener("dragover", this.onDrag, false);
            dropbox.addEventListener("dragleave", this.onDragLeave, false);
            dropbox.addEventListener("drop", this.onDrop, false);
        },
        methods: {
            //删除拖拽的图片
            delImage: function (data) {
                console.log(data)
                this.files.splice(data, 1)
            },


            uploadFile: function (file, url) {
                return new Promise((resolve, reject) => {
                    var fr = new FileReader();
                    var that = this;
                    var item = {};
                    fr.readAsDataURL(file);


                    fr.onload = function () {
                        item = {
                            src: this.result,
                            name: file.name,
                            uploadPercentage: 0,
                            showPercentage: true
                        };
                        that.files.push(item);
                        var fd = new FormData();
                        fd.append("file", file);

                    };
                });
            },


            onDrag: function (e) {
                e.stopPropagation();
                e.preventDefault();
                console.log("进入");
                //style=""
                this.$refs.dropbox.style = "border:0.25rem dashed #ddd; position:relative; overflow-y:auto;max-height:350px";
            },
            onDragLeave: function (e) {
                e.stopPropagation();
                e.preventDefault();
                console.log("离开");
                this.$refs.dropbox.style = "border:0.25rem dashed #ddd; height: 350px;";
            },
            onDrop: function (e) {
                e.stopPropagation();
                e.preventDefault();
                console.log("松手");
                var url = "http://127.0.0.1:3000/upload-multiply";
                var dt = e.dataTransfer;
                for (var i = 0; i !== dt.files.length; i++) {
                    this.uploadFile(dt.files[i], url);
                }
            },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
