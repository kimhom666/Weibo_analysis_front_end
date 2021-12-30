<template>
<div>
  <h2>
    聊天记录管理
    
  </h2>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="collect_time"
      sortable
      label="时间"
      width="100%">

    </el-table-column>
    <el-table-column
      prop="reply_text"
      label="回复消息"
      width="450%">
    </el-table-column>
    <el-table-column
      prop="send_text"
      label="寄送消息"
      width="450%">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="delete_data(scope.$index,scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column> 
      </el-table>
</div>
</template>
<script>
import { getColections,delCollections } from '../request/api'
export default {
     data() {
        return {
          tableData: []
        }
      },
      created(){
        var params = {
          "user_name" : localStorage.getItem("user_name")
        }
        getColections(params).then(res=>{
          console.log(res.data)
          this.tableData = res.data.result
        })

      },
      mounted(){
         
      },
      methods:{
        delete_data(index,row){
          console.log(index)
          this.tableData.splice(index,1)
          console.log(row.col_id)
          var params = {
            "col_id": row.col_id
          }
          delCollections(params).then(res=>{
            if(res.data.status =="200"){
              alert("删除成功")
            }
          })
        }
      }
}
</script>