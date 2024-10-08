import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Column2D from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Star Per Language',
        theme: 'candy',
        decimal: 0,
        doughnutRadius: '45%',
        showPercentValues: 0,
      },
      // Chart Data
      data
    }
  };
  return (<ReactFC {...chartConfigs} />);
}
export default Doughnut2d
