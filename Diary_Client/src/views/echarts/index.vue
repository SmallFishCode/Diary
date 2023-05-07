<template>
    <div class="echarts">
        <TitleBar title="Graph" />
        <div class="echarts__tabs">
            <div ref="echartsTabs" class="echarts__tabs-dom"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import TitleBar from '@/components/title-bar.vue'
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption,
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { getTabsEcharts } from '@/server/echarts'

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
])

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

// 初始化图表
const echartsTabs = ref<HTMLElement>()
const tabsOption = ref<EChartsOption>({})

// 初始化图表数值
const initTabsOptions = async () => {
    const res = await getTabsEcharts({ username: localStorage.getItem('username')! })
    tabsOption.value = {
        title: {
            text: '标签使用情况',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            top: 30,
        },
        series: [
            {
                name: '日记数量',
                type: 'pie',
                radius: '50%',
                data: res,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }
    // 标签图表初始化 + 渲染图表
    const tabsChart = echarts.init(echartsTabs.value!)
    tabsOption.value && tabsChart.setOption(tabsOption.value)
}

initTabsOptions()

</script>

<style scoped lang='less'>
.echarts {
    width: 100vw;
    height: 100vh;

    &__tabs {
        margin-top: 20px;
        width: 100%;
        position: relative;

        &-dom {
            width: 100%;
            height: 500px;
        }

        &-title {
            font-weight: 500;
            margin-left: 10px;
            margin-bottom: 10px;
            color: #908a8ab3;
        }
       
    }
}

</style>