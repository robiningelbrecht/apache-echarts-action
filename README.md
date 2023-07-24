# Apache Echarts action

Render server-side Apache Echarts using GitHub Action workflow

## Inputs

### `width`

**Required** Width of the SVG

### `height`

**Required** Height of the SVG

### `pass-options-as`

**Required** The way you want to pass the options, valid options are

- string
- uri
- file

### `chart-option`

**Required** The chart options, can be one of
* Valid JSON string 
* URI to valid JSON

Check https://echarts.apache.org/handbook/en/get-started/ for more info

## Example usage

```yaml
- name: Generate chart
  id: chart
  uses: robiningelbrecht/apache-echarts-action@v1.1.0
  with:
    width: 1000
    height: 300
    pass-options-as: uri
    chart-option: 'valid JSON string, URI to valid JSON or reference to file with valid JSON'

- name: Save generated SVG
  run: |
      cat <<EOF > chart.svg
      ${{ steps.chart.outputs.svg }}
      EOF
```

For actual examples, check the `test.yml` workflow.
