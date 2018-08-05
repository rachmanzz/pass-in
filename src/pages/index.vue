<template>
  <v-container fluid>
    <v-layout row wrap>
        <v-flex xs3 sm2 d-flex>
            <v-select
            :items="reqmethod"
            label="Method"
            outline
            ></v-select>
        </v-flex>
        <v-flex xs9 sm10 d-flex>
            <v-text-field
                v-model="url"
                label="URL"
                outline
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
                                    required
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs5 sm7 pl-2 d-flex>
                                <v-text-field
                                    v-model="item.val"
                                    label="Value"
                                    outline
                                    required
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs3 sm2 d-flex>
                                <v-btn color="primary" depressed flat @click="addHeader">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                  </v-tab-item>
            </v-tabs>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tabsitem: [
        { name: 'Headers', code: 1 },
        { name: 'Params', code: 2 },
        { name: 'Body', code: 3 }
      ],
      reqmethod: [
        'GET',
        'POST'
      ],
      url: '',
      formassets: {
        headers: [
          { name: '', val: '' }
        ]
      }
    }
  },
  methods: {
    addHeader () {
      this.formassets.headers.push({ name: '', val: '' })
    }
  }
}
</script>
