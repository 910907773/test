<template>
  <div id="hallsettings">
    <div class="user-list">
      <ul>
        <li class="picture" >
          <span>我的相册</span>
          <div class="picture-list">
            <div v-for="item in myGalleryList" class="picture-item" @click="openCustomConfrim(item.fullUrl)">
              <img :src="item.fullUrl" width="60px" height="60px"/>
            </div>
            <div @click="openCustomConfrim(null)" class="addPicture">
              +
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 上传图片 -->
    <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
  </div>
</template>

<script>
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
export default {
  data() {
    return {
      name:"abc",
      size:0,//图片大小
      YDUI
    };
  },
  methods: {
    openCustomConfrim(fullUrl) {
      this.$dialog.confirm({
        title: "上传图片",
        mes:
            '<div style="width:277px;height:170px;"><img id="uploadImg" src="'+(fullUrl==null?'':fullUrl)+'" alt="" width="100%" height="100%"/></div>',
        opts: [
          {
            txt: "上传",
            color: true,
            stay: true,
            callback: () => {
              document.getElementById('upload_file').click();
            }
          },
          {
            txt: "保存",
            color: true,
            callback: () => {
              var uploadImg = document.getElementById("uploadImg").src;
              if(uploadImg == ""){//未选择图片
                this.$dialog.toast({
                  mes: '请选择要上传的图片',
                  timeout: 1500
                });
                return;
              }
              //在这里进行图片上传操作

              document.getElementById("uploadImg").src = '';//保存成功后清除src属性的值
            }
          },
          {
            txt: "取消",
            color: false,
          }
        ]
      });
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      let _this = this;
      entry.file(function(file) {
        _this.fileAdd(file);
      });
    },
    fileAdd(file) {
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        this.$dialog.toast({
          mes: '请选择图片文件',
          timeout: 1500
        });
        return;
      } else {
        let reader = new FileReader();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          let result = this.result;
          let image = new Image();
          image.src = result;
          if(this.result.length <= 100 * 1024){
            document.getElementById("uploadImg").src = file.src;
          }else{//图片压缩
            image.onload = function() {
              let data = _this.compress(image);
              document.getElementById("uploadImg").src = data;
            };
          }
        };
      }
    },
    compress(img){
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
                img,
                i * nw * ratio,
                j * nh * ratio,
                nw * ratio,
                nh * ratio,
                0,
                0,
                nw,
                nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
          "压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    }
  },
  mounted() {
  }
};
</script>

<style scoped>

</style>