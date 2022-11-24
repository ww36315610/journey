<template>
  <div class="app-container">
    <input ref="inputSearch" placeholder="Search for name... "  size="100" @input="handleAutoSearch($event)" />
    <el-button type="success" size="mini" style="margin-left: 10px;" @click="handleAdd">新增</el-button>
    <el-table
      :data="newTableData"
      style="width: 100%;margin-top: 20px;"
      :default-sort="{ prop: 'date', order: 'ascending' }"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        sortable
      >
      <template slot-scope="scope">
        <span v-if="!scope.row.isEdit">
          <span>{{scope.row.date}}</span>
        </span>
        <span v-else>
          <input type="date" v-model="scope.row.date"/>
        </span>      
      </template>
      </el-table-column>
      <el-table-column 
        prop="name" 
        label="姓名" 
        width="180">         
        <template slot-scope="scope">	
          <span v-if="!scope.row.isEdit">
            <span>{{ scope.row.name}}</span>
          </span>  
          <span v-else>
            <input size="10" v-model="scope.row.name" />
          </span>      
        </template>
      </el-table-column>

      <el-table-column 
        prop="address" 
        label="地址"> 
        <template slot-scope="scope">
          <span v-if="!scope.row.isEdit">
            <span>{{ scope.row.address}}</span> 
          </span>
          <span v-else>
            <input v-model="scope.row.address"/>
          </span>
          
        </template>
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <span v-if="!scope.row.isEdit">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </span>
        <span v-else>
          <el-button
          size="mini"
          type="success" 
          @click="handleEditConfirm(scope.$index, scope.row)">确认
          </el-button>
        </span>

        <el-button
          size="mini"
          type="danger"
          style="margin-left: 10px;"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { getList } from '@/api/table'
export default {
  data() {
    return {
      tableData:[],
      newTableData:[],
      listLoading:null
    };
  },
  created() {
    this.fetchData()
    console.log(this)
    
  },
  mounted(){
    // this.newTableData = this.tableData
  },
  methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          console.log(response.data.items)
          this.tableData = response.data.items
          this.newTableData = this.tableData
          console.log(this)
          this.listLoading = false
        })
      },
      handleAutoSearch(e){       
        this.newTableData = this.tableData.filter((obj)=>{
          return obj.name.indexOf(e.target.value) !== -1
        })
      },
      handleAdd(){
        this.newTableData.unshift({id:nanoid(),
          isEdit:true,
          date: '',
          name: '',
          address: ''
          })
      },
      handleEdit(index, row) {
        if(Object.prototype.hasOwnProperty.call(row,'isEdit')){
          row.isEdit = true
        }else{
          this.$set(row,'isEdit',true)
        }        
      },
      handleEditConfirm(index,row){
        row.isEdit = false
      },

      handleDelete(index,row) {
        if(confirm('确认删除吗？')){
          this.tableData = this.tableData.filter((obj)=>{
          return obj.id !== row.id
          })        
        this.$nextTick(()=>{
          this.newTableData = this.tableData
          this.$refs.inputSearch.value=''
        })
        }
      },
  },
};
</script>

<style scoped>

</style>
