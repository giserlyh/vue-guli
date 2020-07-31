<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调-->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar:"https://edu-1189.oss-cn-beijing.aliyuncs.com/2020/07/22/84f79c3be72148048608b799cb1e2be5file.png"
      },
      saveBtnDisabled: false,
      imagecropperKey: 0, //上传组件的key，唯一标识
      BASE_API: process.env.BASE_API, //获取dev.env.js里面的地址
      imagecropperShow: false
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      //从路径获取id
      const id = this.$route.params.id;
      //调用id查询方法
      this.getInfo(id);
    } 
    else {
      this.teacher = {
         avatar:"https://edu-1189.oss-cn-beijing.aliyuncs.com/2020/07/22/84f79c3be72148048608b799cb1e2be5file.png"
      };
    }
  },
  watch: {
    //监听
    $route(to, from) {
      //路由变化的方式，路由发生变化，代码就会执行
      if (this.$route.params && this.$route.params.id) {
        //从路径获取id
        const id = this.$route.params.id;
        //调用id查询方法
        this.getInfo(id);
      } 
      else {
        this.teacher = {
         avatar:"https://edu-1189.oss-cn-beijing.aliyuncs.com/2020/07/22/84f79c3be72148048608b799cb1e2be5file.png"
      };
      }
    }
  },
  methods: {
    //关闭上传弹框的方法
    close() {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey+1;
    },
    //上传成功的方法
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片
      this.teacher.avatar = data.url;
      this.imagecropperKey = this.imagecropperKey+1;
    },

    saveOrUpdate() {
      // 判断修改还是添加
      if (this.teacher.id) {
        this.updateTeacher();
      } else {
        this.saveTeacher();
      }
    },

    //修改讲师
    updateTeacher() {
      teacher.updateTeacher(this.teacher).then(response => {
        this.$message.success("修改成功");
        //回到列表界面 路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },

    //添加讲师方法
    saveTeacher() {
      teacher.addTeacher(this.teacher).then(response => {
        this.$message.success("添加成功");

        //回到列表界面 路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
    //根据id查询
    getInfo(id) {
      teacher.getTeacherInfo(id).then(response => {
        this.teacher = response.data.teacher;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>