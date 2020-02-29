<template>
  <div id="app">
    <button id="updateButton" v-on:click="updateData()">update</button>
    <chart class="chart" :chartData="chartData" />
  </div>
</template>

<script>
import Chart from "./components/chart.vue";

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
      }
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
        },
        {
          label: "Scatter Dataset2",
          data: this.createRandom(),
          backgroundColor: "#ff0099"
        }
      ]
    };
  },
  methods: {
    updateData() {
      this.chartData = {
        labels: "scatter dataset",
        datasets: [
          {
            label: "Scatter Dataset",
            data: this.createRandom(),
            backgroundColor: "#0099ff"
          },
          {
            label: "Scatter Dataset2",
            data: this.createRandom(),
            backgroundColor: "#ff0099"
          }
        ]
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
