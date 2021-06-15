<template>
  <div class="" >
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">Export</el-button>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="center">
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author"  align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Readings"  align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="Date">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp  }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'MergeHeader',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false
    }
  },

  activated() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      setTimeout(()=>{
        this.list = [
          {
            "id":20,
            "timestamp":260985797605,
            "author":"Jason",
            "reviewer":"Dorothy",
            "title":"Ktxjfyx Ppvqwmkw Vuoyeti Rbgjth Aymgd",
            "content_short":"mock data",
            "importance":2,
            "type":"CN",
            "status":"draft",
            "display_time":"1992-12-18 07:41:04",
            "comment_disabled":true,
          },
          {
            "id":20,
            "timestamp":260985797605,
            "author":"Jason",
            "reviewer":"Dorothy",
            "title":"Ktxjfyx Ppvqwmkw Vuoyeti Rbgjth Aymgd",
            "content_short":"mock data",
            "importance":2,
            "type":"CN",
            "status":"draft",
            "display_time":"1992-12-18 07:41:04",
            "comment_disabled":true,
          }

        ]
        this.listLoading = false
      },1000)
    },
    handleDownload() {
      this.downloadLoading = true
        import('./export/Export2Excel').then(excel => {
          const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
          const header = ['Id', 'Title', 'Author', 'Readings', 'displayTime']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:D1', 'E1:E2']
          excel.export_json_to_excel({
         //   multiHeader,
            header,
          //  merges,
            filename:"前端导出",
            data
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
