import {Component} from "react";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {PieChart} from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 SVG 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {SVGRenderer} from 'echarts/renderers';
// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    LegendComponent,
    ToolboxComponent,
    LabelLayout,
    UniversalTransition,
    SVGRenderer
]);
type PropsT = {
    chartClick: (val: string) => void,
}
type StateT = {
    myChart: echarts.ECharts|null
}
export default class Chart extends Component<PropsT, StateT> {
    constructor(props: PropsT) {
        super(props);
        this.state={
            myChart:null
        }
    }

    componentDidMount() {
        const myChart = echarts.init(document.getElementById('main'));
        this.setState({
            myChart
        })
        const option = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: 0,
                textStyle: {
                    color: 'white'
                }
            },
            series: [
                {
                    name: 'Skill',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['35%', '85%'],
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        position: 'inner',
                        fontSize: 14
                    },
                    labelLine: {
                        show: false
                    },
                    filter: '',
                    data: [
                        {value: 2, name: 'TS'},
                        {value: 5, name: 'Uniapp'},
                        {value: 2, name: 'UniappX'},
                        {value: 4, name: 'Vue'},
                        {value: 1, name: 'React'},
                        {value: 2, name: '原生'},
                    ]
                }
            ]
        };
        myChart.setOption(option);
        myChart.on('click', (e) => {
            this.props.chartClick(e.name)
        })
    }
    closeToolTip(){
        this.state.myChart!.dispatchAction({
            type: 'hideTip'
        });
    }

    render() {
        return (
            <div id="main" style={{width: '100%', aspectRatio: '.7'}}></div>
        );
    }
}