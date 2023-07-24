const core = require('@actions/core');
const echarts = require('echarts');
const axios = require('axios');

const width = core.getInput('width');
const height = core.getInput('height');
let chartOption = core.getInput('chart-option');

const isValidHttpUrl = (str) => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(str);
}

const isValidJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const run = async () => {
    core.info('Generating SVG');

    const chart = echarts.init(null, null, {
        renderer: 'svg',
        ssr: true,
        width: width,
        height: height
    });

    if (isValidHttpUrl(chartOption)) {
        const response = await axios({method: 'GET', url: chartOption});
        chartOption = await response.data;
    } else if (isValidJsonString(chartOption)) {
        chartOption = JSON.parse(chartOption);
    } else {
        core.error('Invalid JSON for chartOption');
    }

    chart.setOption(chartOption);
    core.setOutput('svg', chart.renderToSVGString());

    core.info(chart.renderToSVGString());

    core.info('Done');
    process.exit(0);
}

run();