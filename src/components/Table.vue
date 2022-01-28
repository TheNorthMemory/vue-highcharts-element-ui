<template>
  <el-table
    :data="table"
    stripe
    size="mini"
    style="width: 100%"
    :default-sort="defaultSort"
  >
    <el-table-column
      prop="jzrq"
      label="截至日期"
      sortable
      fixed
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="jzsj"
      label="截止时间"
      sortable
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="xcwzzgrzsl"
      label="现存无症状感染者数量"
      sortable
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="xzwzzgrzsl"
      label="新增无症状感染者数量"
      sortable
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="xcwzzgrzzjwsrdsl"
      label="现存无症状感染者中境外输入的数量"
      sortable
      width="250"
    >
    </el-table-column>
    <el-table-column
      prop="lyd"
      label="来源地"
      align="right"
      sortable
    >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      id: {
        type: String
      },
      table: {
        type: Array
      }
    },
    data() {
      return {
        defaultSort: {
          prop: 'jzrq',
          order: 'descending',
        }
      };
    },
  }
</script>
