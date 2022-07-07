import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
// import { useI18n } from '@/hooks/web/useI18n'
// const { t } = useI18n()
// 实时门票销量
export const pieOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  legend: {
    // show: false
    bottom: 0,
    left: 'center',
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      fontSize: 8,
      color: '#fff'
    }
  },
  grid: {
    left: 5,
    right: 10,
    top: 10,
    bottom: 20,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['25', '26', '27', '28', '29', '30', '31'],
    boundaryGap: false, //在刻线上显示，还是在刻线中间显示
    // 隐藏轴线
    axisLine: {
      show: false
    },
    // 隐藏刻线
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: '10px',
      color: '#fff'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: '10px',
      color: '#fff'
    },
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: '门票一',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
      showSymbol: false, // 去掉折线上的小圆点
      // 折线图区域渐变色
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          1,
          0,
          0,
          [
            {
              offset: 0,
              color: 'rgba(0,136,254,0)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0,136,254,.4)' // 100% 处的颜色
            }
          ],
          false
        )
      }
    },
    {
      name: '门票二',
      data: [130, 180, 120, 140, 100, 70, 80],
      type: 'line',
      showSymbol: false, // 去掉折线上的小圆点
      // 折线图区域渐变色
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          1,
          0,
          0,
          [
            {
              offset: 0,
              color: 'rgba(0,137,33,0)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0,137,33,.4)' // 100% 处的颜色
            }
          ],
          false
        )
      }
    }
  ]
}
// 停车场使用率
export const carOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  legend: {
    // show: false
    top: 0,
    left: 'center',
    icon: 'rict',
    itemWidth: 16,
    itemHeight: 5,
    textStyle: {
      fontSize: 8,
      color: '#fff'
    }
  },
  grid: {
    left: 5,
    right: 5,
    top: 20,
    bottom: 5,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['08-10时', '10-12时', '12-14时'],
    boundaryGap: true, //在刻线上显示，还是在刻线中间显示
    // 隐藏轴线
    axisLine: {
      show: false
    },
    // 隐藏刻线
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: '10px',
      color: '#fff'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: '10px',
      color: '#fff'
    },
    splitLine: {
      show: false
    }
  },
  color: ['rgb(0,193,71)', 'rgb(143,0,61)'],
  series: [
    {
      name: '机动车', // blue bar
      type: 'pictorialBar',
      symbol: 'roundRect',
      //   barWidth: '30px',
      symbolOffset: ['-5', '0'],
      symbolSize: ['20', '5'],
      symbolRepeat: true,
      // symbolClip: true,
      data: [130, 60, 120]
    },
    {
      name: '非机动车', // blue bar
      type: 'pictorialBar',
      symbol: 'roundRect',
      barWidth: '30px',
      symbolOffset: ['5', '0'],
      symbolRepeat: true,
      symbolSize: ['20', '5'],
      // symbolClip: true,
      data: [130, 180, 80]
    }
  ]
}
// 人流量分区段
export const peopleOptions: EChartsOption = {
  tooltip: {},
  color: ['rgb(0,199,150)', 'rgb(155,177,0)', 'rgb(0,137,33)', 'rgb(129,144,168)'],
  legend: {
    show: true,
    right: '10%',
    top: '20%',
    orient: 'vertical', //图例的布局朝向
    itemWidth: 15,
    itemHeight: 15,
    textStyle: {
      color: '#fff',
      fontSize: '14px'
    }
  },
  series: [
    {
      // name: "pie",
      type: 'pie',
      data: [
        {
          value: 60,
          name: '自由区'
        },
        {
          value: 20,
          name: '亲子区'
        },
        {
          value: 26,
          name: '活动区'
        },
        {
          value: 4,
          name: '服务区'
        }
      ],
      radius: ['50%', '85%'], //设置环形
      center: ['40%', '45%'], //设置饼图的位置
      // 字体设置
      label: {
        fontSize: 14,
        position: 'inside', // 内容在饼图内展示
        formatter: '{d}%', //b--name  c--value  d--%
        color: '#fff'
      }
    }
  ]
}
// 男女比例统计
export const sexOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  legend: {
    // show: false
    bottom: 0,
    left: 'center',
    icon: 'rict',
    itemWidth: 20,
    itemHeight: 7,
    textStyle: {
      fontSize: 12,
      color: '#fff'
    }
  },
  grid: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 25,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60以上'],
    boundaryGap: true, //在刻线上显示，还是在刻线中间显示
    // 隐藏轴线
    axisLine: {
      show: false
    },
    // 隐藏刻线
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: '10px',
      color: '#fff'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: '10px',
      color: '#fff'
    },
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: '男',
      type: 'bar',
      data: [130, 420, 460, 56, 62, 98, 35, 45],
      barWidth: 12, //柱图宽度
      // 柱体渐变色
      itemStyle: {
        borderRadius: [6, 6, 0, 0], //柱图圆角
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(10,180,115)'
          },
          {
            offset: 1,
            color: 'rgb(33,203,219)'
          }
        ])
      }
    },
    {
      name: '女',
      type: 'bar',
      data: [216, 359, 685, 95, 54, 32, 15, 9],
      barWidth: 12, //柱图宽度
      // 柱体渐变色
      itemStyle: {
        borderRadius: [6, 6, 0, 0], //柱图圆角
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(253,141,69)'
          },
          {
            offset: 1,
            color: 'rgb(252,189,91)'
          }
        ])
      }
    }
  ]
}
// 满意度调查
export const satisfactionOptions: EChartsOption = {
  radar: {
    indicator: [
      { name: '活动', max: 500 },
      { name: '景点', max: 500 },
      { name: '其他', max: 500 }
    ],
    axisNameGap: 5,
    radius: '80%', //半径
    shape: 'circle', //雷达绘制类型 polygon多边形 circle圆形
    axisName: {
      color: '#fff',
      fontSize: 13
    },
    splitNumber: 5, //设置有几圈
    center: ['50%', '55%'], //雷达图的位置
    // 雷达图的背景颜色
    splitArea: {
      areaStyle: {
        color: ['black']
      }
    },
    // 到名称的线
    axisLine: {
      lineStyle: {
        color: 'rgba(0,255,255,.5)',
        width: 2
      }
    },
    // 一圈一圈的线
    splitLine: {
      lineStyle: {
        color: 'rgba(0,255,255,.5)',
        width: 2
      }
    }
  },
  series: [
    {
      name: '',
      type: 'radar',
      data: [{ value: [200, 150, 400] }],
      itemStyle: {
        color: 'rgba(0,225,255,1)'
      },
      lineStyle: {
        color: 'rgba(0,225,255,1)'
      }
    }
  ]
}
