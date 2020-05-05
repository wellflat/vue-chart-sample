<template>
  <div id="app">
    <button id="updateButton" v-on:click="updateData()">update</button>
    <button id="stopButton" v-on:click="stop()">stop</button>
    <span>{{ n }}</span>
    <chart class="chart" :chartData="chartData" />
  </div>
</template>

<script>
import Chart from "./components/chart.vue";
import tSNE from "./t-sne/tsne";
import { digits } from "./t-sne/digits_data";
import { createIndexList, classifyPoint } from './t-sne/utils';

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartData: null,
      options: {
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom"
            }
          ]
        }
      },
      it: null,
      indexList: null,
      colors: null,
      n: 0,
      interval: null,
    };
  },
  created() {
    const params = { perplexity: 30, eta: 100, alpha: 0.5 };
    const tsne = new tSNE(digits.data, params);
    const maxIter = 1000;
    this.indexList = createIndexList(digits.target);
    this.colors = ["blue", "navy", "green", "lime", "aqua", "yellow", "red", "fuchsia", "olive", "purple"];
    this.it = tsne.iterator(maxIter);
    const step = this.it.next();
    this.chartData = {
        labels: "digits dataset",
        datasets: this.createDatasets(step.value)
    };
    this.n++;
  },
  methods: {
    updateData() {
      this.interval = setInterval(() => {
        const step = this.it.next();
        this.chartData = {
          labels: "digits dataset",
          datasets: this.createDatasets(step.value)
        };
        this.n++;
      }, 500);
    },
    stop() {
      clearInterval(this.interval);
    },
    createDatasets(data) {
      const points = classifyPoint(data, this.indexList);
      const N = points.length;
      const datasets = [];
      for(let i=0; i<N; i++) {
        const data = [];
        const dataLen = points[i].length;
        for(let j=0; j<dataLen; j++) {
          data[j] = { x: points[i][j][0], y: points[i][j][1] };
        }
        datasets[i] = {
          label: i,
          data: data,
          backgroundColor: this.colors[i]
        };
      }
      return datasets;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px 200px;
}
.chart {
  width: 650px;
  height: 650px;
  margin: 10px auto;
}
button {
  width: 200px;
  margin-right: 10px;
}
</style>
