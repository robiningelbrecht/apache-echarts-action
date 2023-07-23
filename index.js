const core = require('@actions/core');
const echarts = require('echarts');

const width = core.getInput('width');
const height =  core.getInput('height');
const chartOption =  core.getInput('chart-option');

const run = () => {
    core.info('Step 1');

    const chart = echarts.init(null, null, {
        renderer: 'svg',
        ssr: true,
        width: width,
        height: height
    });

    core.info('Step 2');

    chart.setOption(JSON.parse(chartOption));
    core.info('Step 3');
    core.setOutput('svg', chart.renderToSVGString());
    core.info('Step 4');

}
run();