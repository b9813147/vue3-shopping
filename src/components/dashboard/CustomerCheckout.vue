<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="my-5 row justify-content-center">
            <!--        @submit.prevent="payOrder"-->
            <form class="col-md-6" @submit.prevent="payOrder">
                <table class="table">
                    <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                    </thead>
                    <tbody>
                    <tr v-for="order in order.products" :key="order.id">
                        <td class="align-middle">{{ order.product.title }}</td>
                        <td class="align-middle">{{ order.qty }}/{{ order.product.unit }}</td>
                        <td class="align-middle text-right">{{ order.final_total }}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="2" class="text-right">總計</td>
                        <td class="text-right">{{ order.total }}</td>
                    </tr>
                    </tfoot>
                </table>

                <table class="table">
                    <tbody>
                    <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                    <button class="btn btn-danger">確認付款去</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
  export default {
    name   : 'CustomerCheck',
    data () {
      return {
        isLoading: false,
        orderId  : '',
        order    : {
          user: {}
        }
      }
    },
    methods: {
      getCart () {
        const _this     = this
        const url       = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order/${_this.orderId}`
        _this.isLoading = true

        this.axios.get(url)
          .then((response) => {
            _this.order     = response.data.order
            _this.isLoading = false
          })
          .catch((error) => {console.log(error)})
      },

      payOrder () {
        const _this     = this
        const url       = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/pay/${_this.orderId}`
        _this.isLoading = true

        this.axios.post(url)
          .then((response) => {
            if (response.data.success) {
              _this.getCart()
              _this.isLoading = false
            }
          })
          .catch((error) => {console.log(error)})

      }
    },

    created () {
      this.orderId = this.$route.params.orderId

    },
    mounted () {
      this.getCart()
    }
  }
</script>

<style scoped>

</style>