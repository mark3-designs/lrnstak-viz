<template>
  <div>
    <h2>Stock Data for {{ symbol }}</h2>
    <ul>
      <li v-for="quote in quotes" :key="quote.last_timestamp">
        {{ quote.last_timestamp }} - {{ quote.last_close }}
        {{ quote }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import { QuotesAPIService } from '../app/service/quotes_service';

const props = defineProps({
  symbol: String
})
const quotes = ref([]);
const symbol = computed(() => props.symbol)

const fetchQuotes = async () => {
  try {
    const days = 7;
    const interval = '1_day';

    const quotesData = await QuotesAPIService.getQuotes(interval, symbol.value, days);
    // Update the quotes reactive reference with the fetched data
    quotes.value = quotesData;
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

onMounted(() => {
  fetchQuotes();
});

</script>
