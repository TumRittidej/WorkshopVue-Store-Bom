<template>
  <div id="sidebar">
    
      <v-app-bar color="blue" flat app dark
            clipped-left height="70">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <div class="d-flex align-center justify-end" style="width:100%">
          <v-toolbar-title>Username : {{username}}</v-toolbar-title>
        <v-btn color="error" depressed class="mx-3" @click="logoutUser"> <v-icon left>mdi-logout-variant</v-icon> LOGOUT</v-btn>
        </div>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app
            clipped color="blue lighten-5">
        <v-list nav dense class="mt-5"
          ><h1 class="ml-3">Menu</h1>
          <v-list-item-group
            v-model="group"
          >
            <v-list-item
              v-for="menuList in menuLists"
              :key="menuList.menu"
              router
              :to="menuList.route"
              class="mt-6"
            >
              <v-list-item-icon>
                <v-icon>{{ menuList.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ menuList.menu }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    
  </div>
</template>

<script>
export default {
  name: "member",
  data() {
    return {
      drawer: false,
      group: null,
      menuLists: [
        { menu: "พนักงาน", icon: "mdi-account-group", route: "/member" },
        { menu: "สินค้า", icon: "mdi-food", route: "/product" },
        { menu: "ออเดอร์", icon: "mdi-truck", route: "/order" },
      ],
      username: '',
      hiddenSidebar: false
    };
  },
  created() {
    this.getUsername()
  },
  methods: {
    getUsername() {
      this.username = JSON.parse(localStorage.getItem('username'))
    },
    logoutUser() {
      localStorage.removeItem('username')
      this.$router.go('/login')
    },
  },
};
</script>

<style>
</style>