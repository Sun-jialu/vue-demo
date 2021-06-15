<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
  </div>
</template>

<script>
const tinymce = require('tinymce')
export default {
  name: "tinymce",
  components: {},
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      required: false,
      default: 200
    },
    maxHeight: {
      type: Number,
      required: false,
      default: 400
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || "vue-tinymce-" + +new Date() +'-' + parseInt(Math.random()*10000)
    };
  },
  watch: {
    value:{
      handler(val){
        if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>{
           tinymce.get(this.tinymceId).setContent(val)
        }
         );
       }
       if(!this.hasInit){
          this.$nextTick(() =>
             this.initTinymce()
           );
       }
      },
      immediate:true
    }
    // value(val) {
    //   if (!this.hasChange && this.hasInit) {
    //     this.$nextTick(() =>
    //      tinymce.get(this.tinymceId).setContent(val)
    //     );
    //   },
    // }
  },
  activated() {
     this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
     tinymce.init({
        selector: `#${this.tinymceId}`, //操作的对象
        language: "zh_CN", //语言
        height: _this.height, //编辑器高度
        max_height:_this.maxHeight,
        powerpaste_word_import: "propmt", // 参数可以是propmt, merge, clear，效果自行切换对比
        powerpaste_html_import: "propmt", // propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        statusbar: false,
        body_class: 'vue-tiny-panel-body',
        content_style:'.vue-tiny-panel-body {padding-bottom:0 !important;} .vue-tiny-panel-body * {margin:0;paddint:0}',
        // tinymce的其他配置参数
        // toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        // plugins: 'powerpaste  print preview searchreplace autolink directionality visualblocks  fullscreen image link media  code codesample table charmap hr pagebreak nonbreaking  insertdatetime advlist lists wordcount imagetools     autoresize   ',
      
        toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        // toolbar_drawer: "sliding",
        quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: 'powerpaste  print preview searchreplace autolink directionality visualblocks  fullscreen image link media  code codesample table charmap hr pagebreak nonbreaking  insertdatetime advlist lists wordcount imagetools     autoresize   ',
        menubar: false,
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            // console.log(window.tinymce.get(this.tinymceId))
            this.hasChange = true;
            // console.log(editor.getContent({format: 'html'}));
            this.$emit("input", editor.getContent({ format: "html" }));
          });
        },
        images_upload_handler: function(blobInfo, success, failure) {
          console.log(blobInfo)
          // 这个函数主要处理word中的图片，并自动完成上传；
          // ajaxUpload是自己定义的一个函数；在回调中，记得调用success函数，传入上传好的图片地址；
          // blobInfo.blob() 得到图片的file对象；
          // ajaxUpload(blobInfo.blob()).then((data) => {
          //    // 上传成功后，调用success函数传入图片地址
          //    success(data.uploadedImageUrl)
          //  })
          success('data:image/png;base64,'+ blobInfo.base64());
        }
      });
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
       tinymce.get(this.tinymceId).destroy();
      }
    },
    setContent(value) {
     tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
     tinymce.get(this.tinymceId).getContent();
    }
  },
  destroyed() {
    this.destroyTinymce();
  }
};
</script>
<style lang="scss" scoped>
.editor-container {
  ::v-deep .tox-tinymce{
       display: flex !important;
   }
  ::v-deep .tox-toolbar__primary{
     border-top:none;
   }
   ::v-deep .mce-content-body {
     padding-bottom:0 !important;
   }
}
</style>

