<template>
  <div :id="id" :option="option"></div>
</template>

<script>
  import HighCharts from 'highcharts'
  export default {
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
    mounted() {
      this.chart = HighCharts.chart(this.id, this.option)
    },
  }
</script>
