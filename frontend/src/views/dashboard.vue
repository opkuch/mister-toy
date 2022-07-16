<template>
  <section class="dashboard flex align-center justify-center space-around" v-if="labelsData">
    <div class="toys-per-label">
      <h3>Toy price per label, in USD: </h3>
      <DoughnutChart :chartData="labelsData" />
    </div>
    <div class="toys-per-stock">
      <h3>Toys per stock: </h3>
      <DoughnutChart :chartData="toysData" />
    </div>
  </section>
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "dashboard",
  components: { DoughnutChart },
  props: {
     width: {
      type: Number,
      default: 250
    },
    height: {
      type: Number,
      default: 250
    },
  },
  data() {
    return {
      labelsData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
              "#0079AF",
              "#A5C8ED",
            ],
          },
        ],
      },
      toysData: {
        labels: ["In Stock", "Out of stock"],
        datasets: [
          {
            data: null,
            backgroundColor: ["#48d648", "#d64848"],
          },
        ],
      },
    };
  },
  created() {
      const dataSet = this.$store.getters.getLabelsCount;
      Object.keys(dataSet).map(((label) => {
        this.labelsData.labels.push(label)
        this.labelsData.datasets[0].data.push(dataSet[label]);
      })) 
      this.toysData.datasets[0].data = this.$store.getters.toyStockCount;
      },
}
</script>
