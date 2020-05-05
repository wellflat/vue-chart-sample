<template>
  <div id="app">
    <button id="initializeButton" v-on:click="initialize()">initialize</button>
    <button id="updateButton" v-on:click="updateData()">update</button>
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
      n: 0
    };
  },
  created() {
    this.chartData = {
      labels: "scatter dataset",
      datasets: [
        {
          label: "Scatter Dataset",
          data: this.createRandom(),
          backgroundColor: "#0099ff"
        }
      ]
    };
  },
  methods: {
    initialize() {
      console.log('initialize');
      const params = { perplexity: 30, eta: 100, alpha: 0.5 };
      const tsne = new tSNE(digits.data, params);
      const maxIter = 200;
      this.indexList = createIndexList(digits.target);
      this.it = tsne.iterator(maxIter);      
    },
    updateData() {
      console.log('updateData');
      const step = this.it.next();
      this.chartData = {
        labels: "digits dataset",
        datasets: this.paint(step.value)
      };
    },
    createRandom() {
      const n = 1000;
      let data = [];
      for (let i = 0; i < n; i++) {
        const randomX = Math.random() * 10;
        const randomY = Math.random() * 10;
        data[i] = { x: randomX, y: randomY };
      }
      return data;
    },
    paint(data) {
      const points = classifyPoint(data, this.indexList);
      const colors = ["blue", "navy", "teal", "green", "lime", "aqua", "yellow", "red", "fuchsia", "olive"];
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
          backgroundColor: colors[i]
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
  margin: 200px;
  width: 1000px;
  height: 500px;
}
button {
  width: 200px;
}
</style>
