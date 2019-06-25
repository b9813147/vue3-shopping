<template>
    <div>
        <!--        <loading :active.sync="isLoading"></loading>-->
        <div class="text-right mt-4">
            <button type="button" class="btn btn-purple" @click="openModal(true)">建立新產品</button>
        </div>
        <table class="table mt-4">
            <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="160">編輯</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in products" :key="item.id">
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-right">{{ item.origin_price | currency }}</td>
                <td class="text-right">{{ item.price | currency }}</td>
                <td v-if="item.is_enabled === 1" class="text-success">啟用</td>
                <td v-else class="text-danger">停用</td>
                <td>
                    <a href="#" class="btn btn-outline-purple btn-sm mr-2" @click="openModal(false,item)">編輯</a>
                    <a href="#" class="btn btn-outline-danger btn-sm" @click="deleteProduct(item)">刪除</a>
                </td>
            </tr>
            </tbody>
        </table>
        <!-- pagination -->

    </div>
</template>

<script>
  export default {
    name   : 'OrderList',
    data () {
      return {
        isLoading    : false,
        products    : [],
        tempOrderList: {}

      }
    },
    methods: {
      getOrderList (page = 1) {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`
                        // /api/:api_path/admin/orders?page=:page
        _this.axios.get(url).then((response) => {
          // _this.products = response.data
          console.log(response)

        })

      }
    },
    mounted () {
      this.getOrderList()
    }

  }
</script>

<style scoped>

</style>