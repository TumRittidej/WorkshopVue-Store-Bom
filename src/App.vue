<template>
  <v-app>
    <Sidebar/>
    <v-main class="grey lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/views/Sidebar.vue";
export default {
  name: "app",
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Prompt", sans-serif;
}
</style>