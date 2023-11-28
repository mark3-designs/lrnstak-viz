<template>
<!--  <div v-if="quotes">-->
<!--  {{predictions?.[symbol]?.[0]}}-->
  <table style="width: 100%">
    <tr>
    <template v-for="chart in charts">
      <td>
      <div :style="{ height: chartHeight() }">
      <Line :data="chart.buildChart()" :options="chart.buildOptions()" />
      </div>
      </td>
    </template>
    </tr>
  </table>
<!--  </div>-->
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

import { computed, onMounted, ref } from "vue";
import { Line } from "vue-chartjs";
import { QuotesAPIService } from '../app/service/quotes_service';
import { PriceLastCloseChart } from "../app/plot/price_last_close_chart";
import { PriceAvgHighLowChart } from "../app/plot/price_avg_high_low_chart";
import { PredictedNextChart } from "../app/plot/predicted_next_chart";
import { PercentileHighLow } from "../app/plot/percentile_high_low_chart";
import { VolumeAndTradesChart } from "../app/plot/volume_and_trades_chart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
)

const props = defineProps({
  symbol: String,
  days: {
    type: Number,
    default: 4
  },
  interval: {
    type: String,
    default: '1_hour'
  }
})
const quotes = ref();
const predictions = ref();
const charts = ref([]);
const symbol = computed(() => props.symbol)
const days = computed(() => props.days)
const interval = computed(() => props.interval)

onMounted(async () => {
  await fetchQuotes();
});

const fetchQuotes = async () => {
  try {
    predictions.value = await QuotesAPIService.getPrediction(interval.value, symbol.value, days.value);
    quotes.value = await QuotesAPIService.getQuotes(interval.value, symbol.value, days.value);
    charts.value.push(new PriceLastCloseChart(`${symbol.value} ${interval.value}`, quotes.value));
    charts.value.push(new PriceAvgHighLowChart(symbol.value, quotes.value));
    // charts.value.push(new PercentileHighLow(symbol.value, quotes.value));
    // charts.value.push(new VolumeAndTradesChart(symbol.value, quotes.value));
    charts.value.push(new PredictedNextChart(symbol.value, predictions.value[symbol.value]));
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

const chartHeight = () => {
  return "400px"
};

</script>
