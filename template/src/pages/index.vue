<template>
  <div class="wrap">
    <!-- <el-tabs tab-position="left" type="border-card" class="layout">
      <el-tab-pane label="考试列表">
        <TestList />
      </el-tab-pane>
      <el-tab-pane label="线上监考">
        <Invigilate />
      </el-tab-pane>
      <el-tab-pane label="答卷批改">
        <Correction />
      </el-tab-pane>
      <el-tab-pane label="考情统计">
        <Statistics/>
      </el-tab-pane>
      <el-tab-pane label="退出"></el-tab-pane>
    </el-tabs>-->
    <div class="b_wrap">
      <gmenu />
      <div class="right_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
 
<script>
import menu from "@/components/menu.vue";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    gmenu: menu
  }
};
</script>
 
<style scoped lang = "scss">
.layout {
  height: 100vh;
  overflow: auto;
}
.right_view {
  width: 1414px;
  padding: 25px 25px 0;
  min-height: 100%;
  overflow: auto;
  margin-left: 125px;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>