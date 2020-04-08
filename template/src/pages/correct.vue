<template>
  <section class="wrap">
    <header>
      <el-card>
        <el-row class="pager_info">
          <el-col :span="5">3月21日文数测试</el-col>
          <el-col :span="5">年级：初中三年级</el-col>
          <el-col :span="5">学科：数学</el-col>
          <el-col :span="5">当前进度：77.78%</el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" @click="checkPaper">查看试卷</el-button>
            <el-button type="primary" size="small">提交</el-button>
            <el-button type="primary" size="small" @click="reback">返回</el-button>
          </el-col>
        </el-row>
      </el-card>
    </header>
    <div class="main">
      <div class="left_box">
        <qleftList />
      </div>
      <div :class="{box1:componentName==='fillq'}" class="right_box">
        <component :is="componentName"></component>
      </div>
    </div>
    <checkPaperDialog :show.sync="ShowcheckPaperDialog" />
  </section>
</template>
 
<script>
import qleftList from "@/components/Correction/qleftList.vue";
import fillq from "@/components/Correction/fillq.vue";
import answerq from "@/components/Correction/answerq.vue";
import checkPaperDialog from "@/components/Correction/checkPaperDialog.vue";

export default {
  name: "correct",
  data() {
    return {
      componentName: "answerq",
      ShowcheckPaperDialog: false
    };
  },
  methods: {
    reback(){
      this.$router.go(-1)
    },
    checkPaper() {
      this.ShowcheckPaperDialog = true;
    }
  },
  components: {
    qleftList,
    fillq,
    answerq,
    checkPaperDialog
  }
};
</script>
 
<style scoped lang = "scss">
.pager_info {
  line-height: 32px;
}
.main {
  margin-top: 10px;
  &::after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
.left_box {
  width: 200px;
  float: left;
}
.right_box {
  margin-left: 210px;
}
.box1 {
  height: calc(100vh - 134px);
  overflow: auto;
}
</style>