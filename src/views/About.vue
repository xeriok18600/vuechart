<template>
  <div>
    <BarChart :chartData="chartData"></BarChart>
  </div>
</template>

<script>
import BarChart from "../components/BarChart.vue";
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      chartData: {},
      eatData: "",
      trafficData: "",
      recreationData: "",
    };
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
  },
  created() {
    this.calculate();
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      this.chartData = {
        labels: ["飲食", "交通", "娛樂"],
        datasets: [
          {
            label: "支出",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            data: [this.eatData, this.trafficData, this.recreationData],
          },
        ],
      };
    },
    calculate() {
      this.list.forEach(({ expendItem, expend }) => {
        if (expendItem.value === "eat")
          this.eatData = Number(this.eatData) + Number(expend);
        else if (expendItem.value === "traffic")
          this.trafficData = Number(this.trafficData) + Number(expend);
        else this.recreationData = Number(this.recreationData) + Number(expend);
      });
    },
  },
};
</script>
