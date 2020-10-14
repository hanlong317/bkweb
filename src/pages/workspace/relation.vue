<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-aside width="200px" style="height: 100%">
                群聊或个人聊天待开发
            </el-aside>
            <el-container style="width: 400px">
                <el-header height="10%">
                    头部待开发
                </el-header>
                <el-main height="60%">
                    <div style="width: 800px;border:1px solid #505050;border-radius: 5px; overflow:auto;height: 330px">
                        <ul>
                            <li v-for="item in list">
                                <el-row style="margin-top: 5px;">
                                    <div v-show="item.userId != $store.state.userId" style="display: inline-block">
                                        <p style="color: #2b85e4;font-size: 14px;margin-bottom: 5px;">{{item.name}}</p>
                                        <p class="socketContent">{{item.data}}</p>
                                    </div>

                                    <div v-show="item.userId == $store.state.userId" style="float: right">
                                        <p style="color: #2b85e4;font-size: 14px;margin-bottom: 5px;text-align: right">{{item.name}}</p>
                                        <p class="socketContent">{{item.data}}</p>
                                    </div>
                                </el-row>
                            </li>
                        </ul>
                    </div>
                </el-main>
                <el-footer height="30%">
                    <el-input
                            v-model="content"
                            type="textarea"
                               :rows="6"
                               style="border-color: black;width: 800px;"
                    ></el-input>
                    <el-button @click="submitContent" type="primary" style="position: relative;top:50px;left: -80px;">发送</el-button>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "relation",
        data(){
            return {
                content:'',
            }
        },
        props:{
            list:Array,
            websocketsend:Function,
        },
        methods:{
            //发送信息处理
            submitContent(){
                if(this.content == ''){
                    return ;
                }
                let actions = {};
                actions.type="group";
                actions.tid="001";
                actions.name=this.$store.state.name;
                actions.data=this.content;
                this.websocketsend(JSON.stringify(actions));
                this.content ="";
            },

        }
    }
</script>

<style scoped>
    .socketContent{
        max-width: 400px;
        display: inline-block;
        background-color: #654d99;
        color: white;
        padding: 5px;
        border-radius: 3px;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>
