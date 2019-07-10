<template>
    <div>
        <!--        <loading :active.sync="isLoading"></loading>-->
        <table class="table mt-4">
            <thead>
            <tr>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額</th>
                <th>是否付款</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in products" :key="item.id">
                <td v-if="item.is_paid">{{ item.create_at }}</td>
                <td v-else class="text-secondary">{{ item.create_at }}</td>
                <td v-if="item.is_paid">{{ item.email }}</td>
                <td v-else class="text-secondary">{{ item.email }}</td>
                <td v-if="item.is_paid">{{ item.message }}</td>
                <td v-else class="text-secondary">{{ item.message }}</td>
                <td v-if="item.is_paid" class="text-right">{{ item.total | currency }}</td>
                <td v-else class="text-right text-secondary">{{ item.total | currency }}</td>
                <td v-if="item.is_paid" class="text-success">已付款</td>
                <td v-else class="text-secondary">尚未付款</td>
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
        products     : [],
        tempOrderList: {}

      }
    },
    methods: {
      getOrderList (page = 1) {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`
        // /api/:api_path/admin/orders?page=:page
        _this.axios.get(url).then((response) => {
          let dataOrders = []
          response.data.orders.forEach((iterm) => {
            dataOrders.push({
              create_at: moment.unix(iterm.create_at).format('YYYY-MM-DD'),
              email    : iterm.user.email,
              product  : iterm.products,
              total    : iterm.total,
              is_paid  : iterm.is_paid,
              message  : iterm.message,
            })
          })
          _this.products = dataOrders
        })
          .catch((error) => {console.log(error)})
      }
    },
    mounted () {
      this.getOrderList()
    }

  }
</script>

<style scoped>

</style>