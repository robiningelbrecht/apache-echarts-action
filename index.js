const core = require('@actions/core');
const echarts = require('echarts');
const axios = require('axios');
const fs = require('fs');

const width = core.getInput('width');
const height = core.getInput('height');
const passOptionsAs = core.getInput('pass-options-as');
let chartOptions = core.getInput('chart-option');

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

    if (passOptionsAs === 'string') {
        if (!isValidJsonString(chartOptions)) {
            core.error('Invalid JSON for chartOptions');
            return;
        }
        chartOptions = JSON.parse(chartOptions);
    } else if (passOptionsAs === 'uri') {
        if (!isValidHttpUrl(chartOptions)) {
            core.error('Invalid URI for chartOptions');
            return;
        }
        const response = await axios({method: 'GET', url: chartOptions});
        chartOptions = await response.data;
    } else if (passOptionsAs === 'file') {
        const data = fs.readFileSync(chartOptions);
        if (!isValidJsonString(data)) {
            core.error('Invalid JSON for chartOptions');
            return;
        }
        chartOptions = JSON.parse(data);
    } else {
        core.error('Invalid option for pass-options-as');
        return;
    }

    try {
        chart.setOption(chartOptions);
        core.setOutput('svg', chart.renderToSVGString());
    } catch (e) {
        core.error(e);
        return;
    }

    core.info(chart.renderToSVGString());
    core.info('Done');

    process.exit(0);
}

run();