<template>
  <div v-if="quotes" :style="{ height: chartHeight() }">
      <Line :data="chartData()" :options="chartOptions()" />
  </div>
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
    default: 30
  },
  interval: {
    type: String,
    default: '1_day'
  }
})
const quotes = ref();
const symbol = computed(() => props.symbol)
const days = computed(() => props.days)
const interval = computed(() => props.interval)

onMounted(async () => {
  await fetchQuotes();
});

const fetchQuotes = async () => {
  try {
    quotes.value = await QuotesAPIService.getQuotes(interval.value, symbol.value, days.value)
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

const chartHeight = () => {
  return "400px"
};

const chartOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: symbol.value,
      }
    }
  }
};

const chartData = () => {
  return {
    labels: quotes.value.map((quote) => new Date(quote.last_timestamp).toDateString()),
    datasets: [
      {
        label: 'Last Close',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: quotes.value.map((quote) => quote.last_close),
      },
      {
        label: 'Avg Close',
        borderColor: 'rgb(133,255,99)',
        data: quotes.value.map((quote) => quote.price_avg),
      },
      {
        label: 'Predicted Close',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: quotes.value.map((quote) => quote.predict_close),
      },
    ],
  };
};

</script>
