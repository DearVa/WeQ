<template>
    <div class="common-layout">
        <el-container id="Container" style="">


            <el-header id="Header" >
                
            </el-header>


            <el-container id="Middle">


                <el-aside id="Aside">
                    <el-scrollbar >
                        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                            <el-avatar style="margin-left: 20px; margin-right: 0px;" :size="40" shape="square" :src="`https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png`"/>
                            <el-card class="box-card">
                                <div style="text-align: left ;max-width: 120px; ">
                                    <tr><td class="color-dark-light">群聊{{item}}</td></tr>
                                    <tr style="">
                                        <td style="overflow: hidden;max-width: 120px; 
                                        text-overflow:ellipsis;white-space: nowrap; color:#a2a2a2" 
                                        :style="`font-size:small`" class="color-dark-light">这是最新的群信息!!!!!!</td>
                                    </tr>
                                </div>
                            </el-card>
                        </p>
                    </el-scrollbar>
                </el-aside>


                <el-main id="Main">
                    
                </el-main>


            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#Container {
    width:900px;
    height:570px;
}

#Header {
    background-color: #f5f5f5;
    border-bottom-width: 1px!important;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-style: solid;
    border-color: #d2d2d2;
    -webkit-user-drag: none;
}

#Aside {
    width:250px;
    height: inherit;
    background: #e2e2e2;
}

#CloseButton{
    align-self: flex-end;
    right: 0;
}

#Middle{
    height: 510px;
}

#Main {
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: left;
    height: 60px;
    margin: 0;
    border-radius: 0;
}
.scrollbar-demo-item:hover{
    background-color: #d6d6d6;
    transition-duration: 0.3s;
}

.el-card{
    border:none !important;
    background-color: transparent;
    box-shadow: none!important;
}

</style>
