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
      :label="dict.jzrq"
      sortable
      fixed
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="jzsj"
      :label="dict.jzsj"
      sortable
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="xcwzzgrzsl"
      :label="dict.xcwzzgrzsl"
      sortable
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="xzwzzgrzsl"
      :label="dict.xzwzzgrzsl"
      sortable
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="xcwzzgrzzjwsrdsl"
      :label="dict.xcwzzgrzzjwsrdsl"
      sortable
      width="250"
    >
    </el-table-column>
    <el-table-column
      prop="lyd"
      :label="dict.lyd"
      align="right"
      sortable
    >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      dict: {
        type: Object
      },
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
