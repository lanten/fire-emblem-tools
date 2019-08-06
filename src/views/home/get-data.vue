<template>
  <div class="p-16 home">
    <app-header title="home" />

    <div class="mt-16 mb-16">
      <router-link to="/demo">demo</router-link>
    </div>

    <van-button class="mt-16" type="primary" block @click="getTeaLike">茶叶喜好</van-button>

    <van-button class="mt-16" type="primary" block @click="getNames">names</van-button>

    <van-button class="mt-16" type="primary" block @click="getData">parseData</van-button>

    <van-button class="mt-16" type="primary" block @click="getDataTopics">getDataTopics</van-button>

    <van-button class="mt-16" type="primary" block @click="getDataGroup">
      getDataGroup
    </van-button>

    <div class="card mt-16">
      {{ dataSource }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  dataSource: any = []
  mounted() {}

  async getNames() {
    const dataSrc: Array<DataSourceItem> = await $api.common.querySourceData()

    const obj = {}

    dataSrc.forEach(val => {
      obj[val.title] = val.names
    })

    this.dataSource = obj
  }

  async getTeaLike() {
    const strSource = await this.$axios.get('/datas/like-tea-source.txt').then(res => res.data)

    let objData = this.parseTable(strSource)
    objData = objData.splice(1, objData.length - 1)

    const obj = {}

    objData.forEach(v => {
      const [name, value] = v

      if (obj[name]) {
        obj[name].push(value)
      } else {
        obj[name] = [value]
      }
    })

    console.log(obj)
    this.dataSource = obj
  }

  parseTable(str: string): Array<Array<string>> {
    const obj = {}

    let trArr: any = str.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || []

    trArr = trArr.map((v: string) => {
      let tdArr = v.replace(/<tr[^>]*>|<\/tr>/g, '').match(/<td[^>]*>[\s\S]*?<\/td>/g) || []
      tdArr = tdArr.map(v => v.replace(/<td[^>]*>|<\/td>/g, ''))
      return tdArr
    })
    return trArr
  }

  async getDataGroup() {
    const dataSrc: Array<DataSourceItem> = await $api.common.querySourceData()

    const topics: Array<string> = await this.$axios.get('datas/topics.json').then(res => res.data)

    const likeTea = await this.$axios.get('/datas/like-tea.json').then(res => res.data)

    const topicsMap = {}
    topics.forEach((topic, topicIndex) => {
      topicsMap[topic] = topicIndex
    })

    const resData = dataSrc.map(({ title, data, names }) => {
      const obj = {
        group: title,
        items: {},
      }

      const nameIndexMap = {}
      names.forEach((name, nameIndex) => {
        nameIndexMap[nameIndex] = name
        obj.items[name] = {
          topics: [],
          tea: likeTea[name],
        }
      })

      data.forEach(val => {
        const topic = val.splice(0, 1)[0]
        const topicIndex = topicsMap[topic]
        val.forEach((bool: boolean, index) => {
          if (bool) {
            obj.items[nameIndexMap[index]].topics.push(topicIndex)
          }
        })
      })
      return obj
    })

    this.dataSource = resData

    console.log(resData)
  }

  getDataTopics() {
    this.$axios.get('datas/source.json').then(({ data }) => {
      const topics = data[0].data.map((v: any) => v[0])
      this.dataSource = topics
    })
  }

  getData() {
    this.$axios.get('datas/data-1.txt').then(res => {
      let str: string = res.data
      str = str.replace(/\n/g, '')
      let strArr = str.split('<tr class=\\"firstRow\\">')

      strArr = strArr.splice(1, strArr.length - 2)

      strArr.forEach(val => {
        // let str = `<tr>${val}`
        const dataItem: any = {}
        let arr: Array<any> = val.split('</tr>')
        const names = arr[1].split('<td>')

        dataItem.title = arr[0].replace(/<td>|<\/td>/g, '')
        dataItem.names = names
          .splice(2, names.length - 1)
          .map((v: string) => v.replace('</td>', ''))

        arr = arr.splice(2, arr.length - 3).map(v => {
          return v
            .split('<td>')
            .splice(1, v.length - 1)
            .map((v2: string) => {
              let rv = v2.replace('</td>', '')
              if (rv === '√') return true
              if (rv === '×') return false
              return rv
            })
        })

        dataItem.data = arr

        this.dataSource.push(dataItem)
      })
    })
  }
}
</script>
