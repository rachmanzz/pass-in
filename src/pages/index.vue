<template>
  <v-container fluid>
    <v-layout row wrap>
        <v-flex xs5 sm2 d-flex>
            <v-select
            :items="reqmethod"
            label="Method"
            v-model="getMethod"
            height="40"
            color="info"
            outline
            ></v-select>
        </v-flex>
        <v-flex xs7 sm10 pl-2 d-flex>
            <v-text-field
                v-model="getUrl"
                label="URL"
                height="40"
                outline
                color="info"
                placeholder="http://yourdomainame/api"
                required
                ></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs12 sm12 d-flex>
            <v-tabs
             color="cyan"
             dark
             slider-color="yellow"
             >
                <v-tab
                 v-for="n in tabsitem"
                 :key="n.code"
                 ripple>
                   {{n.name}}
                 </v-tab>
                 <v-tab-item
                  v-for="n in tabsitem" :key="n.code" style="padding:5px">
                    <v-card  v-show="n.code ===1 " style="padding:10px">
                        <v-layout row wrap v-for="(item, i) in formassets.headers" :key="i">
                            <v-flex xs4 sm3 d-flex>
                                <v-text-field
                                    v-model="item.name"
                                    label="Name"
                                    outline
                                    height="40"
                                    color="info"
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs5 sm7 pl-2 d-flex>
                                <v-text-field
                                    v-model="item.val"
                                    label="Value"
                                    outline
                                    height="40"
                                    color="info"
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs3 sm2 d-flex>
                                <v-btn color="info" depressed flat @click="headersAction(i)" large>
                                    <v-icon>{{formassets.headers.length !== 0 && (formassets.headers.length - 1) > i ? 'remove' : 'add'}}</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-card  v-show="n.code ===2 " style="padding:10px">
                        <v-layout row wrap v-for="(item, i) in formassets.params" :key="i">
                            <v-flex xs12 sm3 d-flex>
                                <v-text-field
                                    v-model="item.name"
                                    label="Name"
                                    outline
                                    height="40"
                                    color="info"
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm7 pl-2 d-flex>
                                <v-text-field
                                    v-model="item.val"
                                    label="Value"
                                    outline
                                    height="40"
                                    color="info"
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs3 sm2 d-flex>
                                <v-btn color="info" depressed flat @click="paramsAction(i)" large>
                                    <v-icon>{{formassets.params.length !== 0 && (formassets.params.length - 1) > i ? 'remove' : 'add'}}</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-card  v-show="n.code === 3 && formassets.method !== 'GET' && formassets.method !== 'DELETE'" style="padding:10px">
                        <v-layout row wrap v-for="(item, i) in formassets.body" :key="i">
                            <v-flex xs4 sm3 d-flex>
                                <v-text-field
                                    v-model="item.name"
                                    label="Name"
                                    outline
                                    height="40"
                                    color="info"
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs5 sm7 pl-2 d-flex>
                                <v-text-field
                                    v-model="item.val"
                                    label="Value"
                                    outline
                                    height="40"
                                    color="info"
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs3 sm2 d-flex>
                                <v-btn color="info" depressed flat @click="bodyAction(i)" large>
                                    <v-icon>{{formassets.body.length !== 0 && (formassets.body.length - 1) > i ? 'remove' : 'add'}}</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-card  v-show="n.code === 4" style="padding:10px">
                        <h3>Form Request</h3>
                        <v-data-table :items="[{ name: formassets.method, val: getUrl }]" :headers="[ { text: 'Method', value: 'Method' }, { text: 'Url', value: 'Url' } ]">
                          <template slot="items" slot-scope="props">
                              <td>{{props.item.name}}</td>
                              <td>{{props.item.val}}</td>
                          </template>
                        </v-data-table>
                        <hr>
                        <h3>Headers</h3>
                        <v-data-table :items="formassets.headers" :headers="[ { text: 'name', value: 'name' }, { text: 'value', align: 'left', value: 'value' } ]">
                          <template slot="items" slot-scope="props">
                              <td>{{props.item.name}}</td>
                              <td>{{props.item.val}}</td>
                          </template>
                        </v-data-table>
                        <hr>
                        <h3>Params</h3>
                        <v-data-table :items="formassets.params" :headers="[ { text: 'name', value: 'name' }, { text: 'value', align: 'left', value: 'value' } ]">
                          <template slot="items" slot-scope="props">
                              <td>{{props.item.name}}</td>
                              <td>{{props.item.val}}</td>
                          </template>
                        </v-data-table>
                        <hr>
                        <h3 v-show="formassets.method !== 'GET' && formassets.method !== 'DELETE'">Body</h3>
                        <v-data-table :items="formassets.body" v-show="formassets.method === 'POST'" :headers="[ { text: 'name', value: 'name' }, { text: 'value', align: 'left', value: 'value' } ]">
                          <template slot="items" slot-scope="props">
                              <td>{{props.item.name}}</td>
                              <td>{{props.item.val}}</td>
                          </template>
                        </v-data-table>
                    </v-card>
                    <v-card v-show="n.code === 5" style="padding:10px">
                      Response Status : {{result.status}}
                      <hr>
                      <vue-json-pretty :path="'res'" :data="result.data"></vue-json-pretty>
                    </v-card>
                    <v-card v-show="n.code === 6" style="padding:10px">
                      Response Status : {{ errors.code }}
                      <hr>
                      <div v-html="errors.data"></div>
                      <hr>
                      <h3>Headers</h3>
                      <vue-json-pretty :path="'res'" :data="errors.headers"></vue-json-pretty>
                    </v-card>
                  </v-tab-item>
            </v-tabs>
            <v-btn
              color="info"
              @click="mdialog = true"
              :loading="loading"
              dark
              fab
              fixed
              bottom
              right
            >
              <v-icon>send</v-icon>
            </v-btn>
        </v-flex>
        <v-flex x12 d-flex>
          <v-dialog
             v-model="mdialog"
             max-width="240">
              <v-card>
                <v-card-title class="headline">Confirm</v-card-title>
                <v-card-text>Are you sure ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="green darken-1"
                      flat="flat"
                      @click="mdialog = false"
                    >No</v-btn>
                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="sendAction"
                      >Yes, I am Sure</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: { VueJsonPretty },
  data () {
    return {
      mdialog: false,
      loading: false,
      tabactive: 'tab-2',
      tabsitem: [
        { name: 'Headers', code: 1 },
        { name: 'Params', code: 2 },
        { name: 'Body', code: 3 }
      ],
      tabsitemreset: [
        { name: 'Headers', code: 1 },
        { name: 'Params', code: 2 },
        { name: 'Body', code: 3 }
      ],
      reqmethod: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE'
      ],
      result: {},
      errors: {
        code: 500,
        data: '',
        headers: {}
      },
      formassets: {
        method: 'GET',
        headers: [
          { name: '', val: '' }
        ],
        params: [
          { name: '', val: '' }
        ],
        body: [
          { name: '', val: '' }
        ]
      }
    }
  },
  mounted () {
    this.formassets = this.$store.state.formassets
  },
  computed: {
    getMethod: {
      set (value) {
        this.$store.commit('setMethod', value)
      },
      get () {
        return this.$store.state.formassets.method
      }
    },
    getUrl: {
      set (value) {
        this.$store.commit('setUri', value)
      },
      get () {
        return this.$store.state.url
      }
    }
  },
  methods: {
    generateHeaders () {
      const data = this.$store.state.formassets.headers
      const size = data.length
      const result = { able: false, data: {} }
      for (let i = 0; i < size; i++) {
        if (data[i].name !== '') {
          if (!result.able) result.able = true
          let mdata = data[i]
          result.data[mdata.name] = mdata.val
        }
      }
      return result
    },
    generateParams () {
      const data = this.$store.state.formassets.params
      const size = data.length
      const result = { able: false, data: {} }
      for (let i = 0; i < size; i++) {
        if (data[i].name !== '') {
          if (!result.able) result.able = true
          let mdata = data[i]
          result.data[mdata.name] = mdata.val
        }
      }
      return result
    },
    generateBody () {
      const data = this.$store.state.formassets.body
      const size = data.length
      const result = { able: false, data: {} }
      for (let i = 0; i < size; i++) {
        if (data[i].name !== '') {
          if (!result.able) result.able = true
          let mdata = data[i]
          result.data[mdata.name] = mdata.val
        }
      }
      return result
    },
    removeTabs (code) {
      const index = this.indexOfCode(this.tabsitem, code)
      if (index >= 0) {
        this.tabsitem.splice(index, 1)
      }
    },
    indexOfCode (arr, looking) {
      const res = arr.map(e => { return e.code })
      return res.indexOf(looking)
    },
    headersAction (i) {
      const size = this.$store.state.formassets.headers.length - 1
      if (size > i) {
        this.$store.commit('removeHeader', 1)
      } else {
        this.$store.commit('setHeader', { name: '', val: '' })
      }
    },
    bodyAction (i) {
      const size = this.$store.state.formassets.body.length - 1
      if (size > i) {
        this.$store.commit('removeBody', 1)
      } else {
        this.$store.commit('setBody', { name: '', val: '' })
      }
    },
    paramsAction (i) {
      const size = this.$store.state.formassets.params.length - 1
      if (size > i) {
        this.$store.commit('removeParam', 1)
      } else {
        this.$store.commit('setParam', { name: '', val: '' })
      }
    },
    async sendAction () {
      this.removeTabs(4)
      this.removeTabs(5)
      this.removeTabs(6)
      this.mdialog = false
      if (this.url === '') {
        alert('error, url empty')
        return
      }
      if (this.indexOfCode(this.tabsitem, 4) < 0) this.tabsitem.push({ name: 'Send', code: 4 })
      this.loading = true
      const method = this.$store.state.formassets.method.toLowerCase()
      const arg = {
        method: method,
        url: this.$store.state.url
      }
      const mheaders = this.generateHeaders()
      const mparams = this.generateParams()
      const mbodies = this.generateBody()

      if (mheaders.able) {
        arg.headers = mheaders.data
        arg.headers['Access-Control-Expose-Headers'] = 'error'
      } else {
        arg.headers = {
          'Access-Control-Expose-Headers': 'error'
        }
      }
      if (mparams.able) {
        arg.params = mparams.data
      }
      if (method !== 'get' && method !== 'delete' && mbodies.able) {
        arg.data = mbodies.data
      }
      try {
        const response = await axios(arg)
        if (response) {
          if (this.indexOfCode(this.tabsitem, 5) < 0) this.tabsitem.push({ name: 'Result', code: 5 })
          this.result = response
        } else {
          if (this.indexOfCode(this.tabsitem, 6) < 0) this.tabsitem.push({ name: 'Error', code: 6 })
          this.errors.code = response.status
          this.errors.data = response.data
          this.errors.headers = response.headers
        }
        this.loading = false
      } catch (error) {
        if (typeof error.response !== 'undefined') {
          this.errors.code = error.response.status
          this.errors.data = error.response.data
          this.errors.headers = error.response.headers
        } else {
          this.errors.data = error.message
          this.errors.headers = error.config.headers
          this.errors.code = error.status
        }

        if (this.indexOfCode(this.tabsitem, 6) < 0) this.tabsitem.push({ name: 'Error', code: 6 })
        this.loading = false
      }
    }
  }
}
</script>
