# Apache Echarts action

Render server-side Apache Echarts using GitHub Action workflow

## Inputs

TODO

## Example usage

```yaml
- name: Generate chart
  id: chart
  uses: robiningelbrecht/apache-echarts-action
  with:
    width: 1000
    height: 300
    chart-option: 'valid JSON string or URI to valid JSON'

- name: Display generated SVG
  run: echo "${{ steps.chart.outputs.svg }}"
```
