<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import Quotes from "../components/Quotes.vue";
import Plots from "../components/Plots.vue";

const route = useRoute();

onMounted(async () => {
})

</script>

<template>
<!--  <Quotes symbol="AAPL"/>-->
  <Plots symbol="DELL" :days="90" interval="1_day"/>
  <Plots symbol="DELL" :days="190" interval="1_week"/>
  <hr/>
  <Plots symbol="SPWR" :days="7" interval="1_hour"/>
  <Plots symbol="SPWR" :days="30" interval="1_day"/>
  <Plots symbol="SPWR" :days="90" interval="1_week"/>
  <hr/>
  <Plots symbol="INTC" :days="190" interval="1_week"/>
  <Plots symbol="INTC" :days="300" interval="1_month"/>
  <hr/>
  <Plots symbol="MSFT" :days="30" interval="1_day"/>
  <hr/>
  <Plots symbol="HMC" :days="30" interval="1_day"/>
  <hr/>
  <Plots symbol="STLA" :days="30" interval="1_day"/>
  <hr/>
<!--  <Plots symbol="CSCO" :days="7" interval="1_hour"/>-->
<!--  <Plots symbol="CSCO" :days="90" interval="1_day"/>-->
<!--  <Plots symbol="CSCO" :days="190" interval="1_week"/>-->
<!--  <Plots symbol="CSCO" :days="300" interval="1_month"/>-->

</template>

<style scoped>
</style>
