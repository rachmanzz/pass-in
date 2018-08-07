<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Try Reqres.in
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click.stop="runRegres(item.code)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon v-html="drawer ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { title: 'List Users', code: 1 },
        { title: 'Single User', code: 2 },
        { title: 'Single user not found', code: 3 },
        { title: 'List <resource>', code: 4 },
        { title: 'Single <resource>', code: 5 },
        { title: 'Create', code: 6 },
        { title: 'Update (PUT)', code: 7 },
        { title: 'Update (PATCH)', code: 8 },
        { title: 'Delete', code: 9 }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pass-In Test',
      urlregres: 'https://reqres.in/'
    }
  },
  methods: {
    runRegres (code) {
      this.$store.commit('resetHeaders')
      this.$store.commit('resetParams')
      this.$store.commit('resetBody')
      if (code === 1) {
        this.$store.commit('setHeader', { name: '', val: '' })
        this.$store.commit('setParam', { name: 'page', val: '2' })
        this.$store.commit('setBody', { name: '', val: '' })

        this.$store.commit('setMethod', 'GET')
        this.$store.commit('setUri', this.urlregres + 'api/users')
      }

      if (code === 2) {
        this.emptyAll()

        this.$store.commit('setMethod', 'GET')
        this.$store.commit('setUri', this.urlregres + 'api/users/2')
      }

      if (code === 3) {
        this.emptyAll()

        this.$store.commit('setMethod', 'GET')
        this.$store.commit('setUri', this.urlregres + 'api/users/23')
      }

      if (code === 4) {
        this.emptyAll()

        this.$store.commit('setMethod', 'GET')
        this.$store.commit('setUri', this.urlregres + 'api/unknown')
      }

      if (code === 5) {
        this.emptyAll()

        this.$store.commit('setMethod', 'GET')
        this.$store.commit('setUri', this.urlregres + 'api/unknown/2')
      }

      if (code === 6) {
        this.$store.commit('setHeader', { name: '', val: '' })
        this.$store.commit('setParam', { name: '', val: '' })
        this.$store.commit('setBody', { name: 'name', val: 'morpheus' })
        this.$store.commit('setBody', { name: 'job', val: 'accountant' })

        this.$store.commit('setMethod', 'POST')
        this.$store.commit('setUri', this.urlregres + 'api/users')
      }

      if (code === 7) {
        this.$store.commit('setHeader', { name: '', val: '' })
        this.$store.commit('setParam', { name: '', val: '' })
        this.$store.commit('setBody', { name: 'name', val: 'morpheus' })
        this.$store.commit('setBody', { name: 'job', val: 'programmer VB' })

        this.$store.commit('setMethod', 'PUT')
        this.$store.commit('setUri', this.urlregres + 'api/users/2')
      }

      if (code === 8) {
        this.$store.commit('setHeader', { name: '', val: '' })
        this.$store.commit('setParam', { name: '', val: '' })
        this.$store.commit('setBody', { name: 'name', val: 'morpheus' })
        this.$store.commit('setBody', { name: 'job', val: 'programmer Nodejs' })

        this.$store.commit('setMethod', 'PATCH')
        this.$store.commit('setUri', this.urlregres + 'api/users/2')
      }

      if (code === 9) {
        this.emptyAll()

        this.$store.commit('setMethod', 'DELETE')
        this.$store.commit('setUri', this.urlregres + 'api/users/2')
      }
    },
    emptyAll () {
      this.$store.commit('setHeader', { name: '', val: '' })
      this.$store.commit('setParam', { name: '', val: '' })
      this.$store.commit('setBody', { name: '', val: '' })
    }
  },
  name: 'App'
}
</script>
