const core = require('@actions/core');
const echarts = require('echarts');

const width = core.getInput('width');
const height =  core.getInput('height');
const chartOption =  core.getInput('chart-option');

const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: width,
    height: height
});

chart.setOption(JSON.parse(chartOption));
core.setOutput('svg', chart.renderToSVGString());
process.exit(0);