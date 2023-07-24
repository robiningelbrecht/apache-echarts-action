# Apache Echarts action

Render server-side Apache Echarts using GitHub Action workflow

## Inputs

### `width`

**Required** Width of the SVG

### `height`

**Required** Height of the SVG

### `chart-option`

**Required** The chart options, can be one od
* Valid JSON string 
* URI to valid JSON

Check https://echarts.apache.org/handbook/en/get-started/ for more info

## Example usage

```yaml
- name: Generate chart
  id: chart
  uses: robiningelbrecht/apache-echarts-action@v1.0.0
  with:
    width: 1000
    height: 300
    chart-option: 'valid JSON string or URI to valid JSON'

- name: Display generated SVG
  run: echo "${{ steps.chart.outputs.svg }}"
```
