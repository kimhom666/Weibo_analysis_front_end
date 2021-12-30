<template>
  <div class="talk_box">
    <div class="header">
      <el-button circle @click="check_chat">管理聊天记录</el-button>
     <el-button circle @click="save_chat">保存聊天记录 </el-button>

      <span>KIM THE ROBOT</span>
        <el-button icon="el-icon-search" circle @click="check_collections">查看收藏的对话集合</el-button>
    </div>
    <div class="message_box" id="msg_box">
      <div class="message" v-for = "(message, index) in messageList" :key="message.id">
        <div v-if="message.id %2 ==0" class="send_message">
          <img class= "robot_icon" src='../assets/OIP.jpeg'>
            <el-button type="warning" icon="el-icon-star-off" circle @click="collecting(index)"></el-button>

          <span>
            {{message.chatContent}}
          </span>
          <el-rate
              v-model="value[index]"
              show-text
              @change="rate_text(index)"
              >
          </el-rate>
        </div> 
        
        <div v-else class="receive_message">
          <!-- <span>
            {{message.name}}
          </span> -->
          <span>
            {{message.chatContent}}   
          </span>          
                    <img class= "user_icon" src='../assets/user.png'>
                    
        </div>
      </div> 
    </div>
    <div class="input_space">
      <select class="task_or_chat" id="who" v-model="task_chat">
                <option value="0">任务型</option>
                <option value="1">闲聊型</option>
      </select>
      <input type="text" class="talk_word" id="talkwords" v-model="text1" @keyup.enter="send_msg">
      <input type="button" value="发送" class="talk_sub" id="talksub" @click="send_msg">
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import {requestText, saveText, collections, saveChatHistory} from '../request/api'
export default {
  name: 'HelloWorld',
  data(){
    return{
      send_id : 0,
      receive_od : 1,
      value: [null],
      messageList:[
        {"name":"kimhom","chatContent":"你好",id:1},
        {"name":"robot","chatContent":"你好",id:2},
        {"name":"kimhom","chatContent":"你是谁",id:1},
        {"name":"robot","chatContent":"我是一个机器人",id:2},
        {"name":"kimhom","chatContent":"你吃饭了吗",id:1},
        {"name":"robot","chatContent":"我不用吃饭",id:2},
        {"name":"kimhom","chatContent":"哈哈哈哈哈",id:1},
        {"name":"robot","chatContent":"很好笑",id:2},
        {"name":"kimhom","chatContent":"再见",id:1},
        {"name":"robot","chatContent":"下次见",id:2}
      ],
      text1: "",
      task_chat: 1,
    }
  },
  created(){
    console.log(localStorage.getItem("user_name"))
  },
  updated(){
        // 聊天定位到底部
          let ele = document.getElementById('msg_box');
          ele.scrollTop = ele.scrollHeight;
      },
  methods: {
    collecting(index){
      console.log(index)
      var send_text = this.messageList[index-1]["chatContent"]
      var reply_text = this.messageList[index]["chatContent"]
      var params = {
        "send_text": send_text,
        "reply_text": reply_text,
        "user_name":localStorage.getItem("user_name")
      }
      console.log(params)
      collections(params).then(res=>{
        console.log(res.data)
        if(res.data.status == "200"){
          alert("收藏成功")
        }
        else{
          alert("收藏失败")
        }
      })
    },
    check_collections(){
        this.$router.push({
          path: "/collections",
        });  
    },
    rate_text(index){
      console.log("索引为"+index)
      console.log("评分为:"+this.value[index])
      console.log("发送的消息",this.messageList[index-1]["chatContent"])
      console.log("收到的消息",this.messageList[index]["chatContent"])
      var send_text = this.messageList[index-1]["chatContent"]
      var reply_text = this.messageList[index]["chatContent"]
      var params = {
        "send_text": send_text,
        "reply_text": reply_text,
        "score": this.value[index]
      }
      saveText(params).then(res=>{
        console.log(res)
        if(res.data.status == 200){
          this.$alert('谢谢您对训练集的帮助')
        }
        else{
          this.$alert("服务器异常返回代码", res.data.status)
        }
      })
    },
    send_msg(){
      console.log(this.text1)
      this.messageList.push({"name":"kimhom", "chatContent":this.text1, id:1})
      // let msg_box = document.getElementById('msg_box')
      // msg_box.scrollTop = msg_box.scrollHeight 
      let parmas = {
        category: this.task_chat,
        text: this.text1
      }
      requestText(parmas).then(res=>{
        console.log(res.data)
        this.messageList.push({"name":"robot", "chatContent": res.data["text"], id:2})
      })
      this.text1 = ""
    },
    save_chat(){
      alert("成功保存")
      console.log(this.messageList)
      var params = {
        "messages" : this.messageList
      }
      saveChatHistory(params).then(res=>{
        
      })
    },
    check_chat(){
      this.$router.push({
        path: "/managechat"
      }
      )
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  text-align: center;
  border: 1px solid greenyellow;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px
}
.send_message{
  margin: 10px;
  text-align: left;

}
.message_box {
  width: 580px;
  height: 340px;
  border: 1px solid #666;
  background: #fff;
  margin: 10px auto 0;
  overflow: auto;
}
.send_message span{
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid aliceblue;
  background: #FFF2f1;
  border-radius: 15px;
  padding: 5px 10px;
}
.receive_message{
  margin: 10px;
  text-align: right;
}
.receive_message span{
  display: inline-block;
  background: #ef8201;
  border-radius: 10px;
  color: #fff;
  padding: 5px 10px;
}
.talk_box{
  width: 580px;
  height: 420px;
  border: 1px solid #666;
  background: #fff;
  margin: 10px auto 0;
  overflow: auto;
}
.input_space{
  width: 580px;
  margin: 10px auto 0;
}
.talk_word {
  width: 400px;
  height: 26px;
  padding: 0px;
  float: left;
  margin-left: 10px;
  outline: none;
  text-indent: 10px;
}
.talk_sub {
  width: 56px;
  height: 30px;
  float: left;
  margin-left: 10px;
}
.robot_icon{
  width: 30px;
  height: 30px;
}
.user_icon{
  width: 30px;
  height: 30px;
}
.task_or_chat{
  width: 80px;
  height: 28px;
  padding: 0px;
  float: left;
  margin-left: 10px;
  outline: none;
  text-indent: 10px;
}
</style>
