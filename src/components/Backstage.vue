<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="score"
      sortable
      label="分数"
      width="100%">

    </el-table-column>
    <el-table-column
      prop="reply"
      label="回复消息"
      width="450%">
    </el-table-column>
    <el-table-column
      prop="send"
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
  <el-button>
    更新
  </el-button>
</div>
</template>
<script>
import { getTrainSet } from '../request/api'
export default {
     data() {
        return {
          tableData: []
        }
      },
      mounted(){
         getTrainSet().then(res=>{
        console.log(res.data)
        this.tableData = res.data
      })
      },
      methods:{
        delete_data(index,row){
          console.log(index)
          this.tableData.splice(index,1)
        }
      }
}
</script>