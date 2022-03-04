<template>
  <div id="app">
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <Chart :id="id" :option="option" ref="opendata" />
      </el-col>
      <el-col :span="1">
        <el-slider
          @change="toggle"
          :min="-1"
          :max="0"
          :step="-1"
          show-stops
          :show-tooltip="false"
          :marks="marks"
          v-model="period"
          vertical
          height="80px"
        >
        </el-slider>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <Table :id="id" :dict="dict" :table="table" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import Table from './components/Table.vue'
import Chart from './components/Chart.vue'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(utc).extend(timezone).extend(isSameOrAfter).extend(isSameOrBefore).tz.setDefault('Asia/Shanghai')

export default {
  name: 'App',
  components: {
    Chart,
    Table,
  },
  data() {
    return {
      period: 0,
      marks: {
        '0': '近7天',
        '-1': '上7天',
      },
      id: 'opendata',
      dict: {
        jzrq            : '截至日期',
        jzsj            : '截至时间',
        xzwzzgrzsl      : '新增无症状感染者数量',
        lyd             : '来源地',
        xcwzzgrzsl      : '现存无症状感染者数量',
        xcwzzgrzzjwsrdsl: '现存无症状感染者中境外输入的数量',
      },
      table: [],
      option: {
          chart: {
            type: 'line'
          },
          title: {
            text: '深圳市“新冠肺炎”-无症状感染者统计情况'
          },
          subtitle: {
            text: '数据来源: opendata.sz.gov.cn'
          },
          xAxis: {
            categories: [],
          },
          yAxis: {
            title: {
              text: '人数'
            }
          },
          series: [],
      }
    }
  },
  created() {
    this.toggle()
  },
  methods: {
    toggle() {
      const defs = [
        {"xcwzzgrzsl":"11","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/13","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"9","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/14","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"7","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/15","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"6","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/16","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"7","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/17","xzwzzgrzsl":"1"},
        {"xcwzzgrzsl":"8","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/18","xzwzzgrzsl":"1"},
        {"xcwzzgrzsl":"9","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/19","xzwzzgrzsl":"1"},

        {"xcwzzgrzsl":"9","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/20","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"9","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/21","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"8","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/22","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"9","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/23","xzwzzgrzsl":"1"},
        {"xcwzzgrzsl":"10","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/24","xzwzzgrzsl":"1"},
        {"xcwzzgrzsl":"10","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/25","xzwzzgrzsl":"0"},
        {"xcwzzgrzsl":"9","jzsj":"24时","lyd":"-","xcwzzgrzzjwsrdsl":"-","jzrq":"2022/1/26","xzwzzgrzsl":"0"},
      ]
      const dateFmt = 'YYYY/M/DD'
      const datePub = dayjs('2022/1/27', dateFmt)
      const period = {
        before: datePub.add(this.period * 7 - 1, 'days'),
        after: datePub.add((this.period - 1) * 7, 'days'),
      }

      const table = defs.filter(({jzrq: n}) => {
        const day = dayjs(n, dateFmt);
        return day.isSameOrAfter(period.after) && day.isSameOrBefore(period.before)
      })

      const keys = ['xcwzzgrzsl', 'xzwzzgrzsl', 'xcwzzgrzzjwsrdsl']
      const toNumeric = n => '-' === n ? 0 : +n
      const series = keys.map(n => {
        const name = this.dict[n]
        const data = table.map(r => toNumeric(r[n]))
        return {name, data}
      })

      this.table = table

      this.option.xAxis.categories = table.map(({jzrq: day}) => day)
      this.option.series = series
      this.$refs.opendata && this.$refs.opendata.chart && this.$refs.opendata.chart.update(this.option)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.el-slider.is-vertical {
  margin-top: 160px;
}
.el-slider.is-vertical .el-slider__runway,
.el-slider.is-vertical .el-slider__bar {
  background-color: transparent;
}
</style>
