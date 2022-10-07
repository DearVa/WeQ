<script setup lang="ts">
import MainView from './components/MainView.vue'
</script>

<template>
  <div id="Main">
    <div id="Dragger"></div>
    <div id="Controls">
      <el-button  id="MinimizeButton" 
      style="margin:0; ">-</el-button>
      <el-button  id="CloseButton" 
      style="margin:0; ">×</el-button>
    </div>
    <MainView id="MainView" />
  </div>
</template>

<style scoped lang="css">
*{
  background-color: #f5f5f5;
}
#Dragger{
  background-color:transparent ;
  height: 30px;
  width:90%;
  -webkit-app-region: drag;
}

#Controls {
  background-color: transparent;
  top :0;
  right: 0;
  position: absolute;
  text-align: right;
  padding: 0;
}
#MinimizeButton{
  background-color: #f5f5f5;
  font-size: large;
  border-radius: 0;
  border :none;
  width:40px;
  height:30px;
}
#MinimizeButton:hover{
  background-color: #d3d3d3 !important;
  transition-delay: .05s;
  transition-duration: .5s;
}

#CloseButton{
  border :none;
  background-color: #f5f5f5;
  padding-top : 13px;
  font-size: large;
  text-align: center;
  border-radius: 0;
  width:40px;
  height:30px;
}
#CloseButton:hover{
  color:white;
  background-color: rgb(223, 116, 116) !important;
  transition-delay: .05s;
  transition-duration: .5s;
}

#MainView {
  display: flex;
  margin: 0;
}

#app {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#Main {
  overflow: hidden;
  width:900px;
  height: 600px;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
