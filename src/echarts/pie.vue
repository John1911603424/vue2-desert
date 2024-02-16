<template>
    <div style="width: auto;height: 470px" ref="Echart">
    </div>
</template>
   
<script>
    import * as echarts from 'echarts';
    
    export default {
        name: 'pie1',
        data () {
            return {
            // option配置
            option: {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [50, 250],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                    ]
                    }
                ]
                }
        }
    },
    mounted () {
        this.echartsInit()
    },
    methods: {
        echartsInit () {
        // 在生命周期中挂载  
        // var chartDom = document.getElementById('pie1');
        // var myChart = echarts.init(chartDom);
        // option && myChart.setOption(option);

        // echarts.init(document.getElementById('pie1')).setOption(this.option)
        echarts.init(this.$refs.Echart).setOption(this.option)
        }
    }
}
</script>

<style scoped>

</style>