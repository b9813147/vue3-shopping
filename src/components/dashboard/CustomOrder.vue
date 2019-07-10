<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="(v, k ) in products" :key="v.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                         :style="{backgroundImage:`url(${v.imageUrl})`}"
                    ></div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ v.category }}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{ v.title }}</a>
                        </h5>
                        <p class="card-text">{{ v.content }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h5" v-if="!v.price">{{ v.origin_price }} 元</div>
                            <del class="h6" v-if="v.price">原價 {{ v.origin_price }} 元</del>
                            <div class="h5" v-if="v.price">現在只要 {{ v.price }} 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(v.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === v.id"></i>
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                                @click="addToCart(v.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === v.id"></i>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="container mt-4">
            <table class="table">
                <thead>
                <tr>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                        </div>
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
                </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code"
                       @keydown.enter="addCouponCode">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                        套用優惠碼
                    </button>
                </div>
            </div>
        </div>
        <div class="my-5 row justify-content-center">
            <form class="col-md-6" @submit.prevent="createOder">
                <div class="form-group">
                    <label for="useremail">Email</label>
                    <input type="email" class="form-control" name="email" id="useremail"
                           :class="{ 'is-invalid': errors.has('email') }"
                           v-model="form.user.email" placeholder="請輸入 Email"
                           v-validate="'required|email'"
                    >
                    <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                </div>

                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                           :class="{ 'is-invalid': errors.has('name') }"
                           v-model="form.user.name" placeholder="輸入姓名"
                           v-validate="'required|alpha'"
                    >
                    <span class="text-danger" v-show="errors.has('name')">姓名必須輸入</span>
                </div>

                <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                </div>

                <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" id="useraddress" class="form-control"
                           name="address"
                           v-model="form.user.address"
                           :class="{ 'is-invalid': errors.has('address') }"
                           placeholder="請輸入地址"
                           v-validate="'required'"
                    >
                    <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                </div>

                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                              v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger">送出訂單</button>
                </div>
            </form>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel"
             aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ tempProduct.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img :src="tempProduct.imageUrl" alt="" class="img-fluid">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">
                                {{ tempProduct.content }}
                            </p>
                            <footer class="blockquote-footer text-right">
                                {{ tempProduct.description }}
                            </footer>
                        </blockquote>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h5" v-if="!tempProduct.price">{{ tempProduct.origin_price }} 元</div>
                            <del class="h6" v-if="tempProduct.price">原價 {{ tempProduct.origin_price }} 元</del>
                            <div class="h5" v-if="tempProduct.price">現在只要 {{ tempProduct.price }} 元</div>
                        </div>
                        <select name="" id="" class="form-control mt-3" v-model="tempProduct.num">
                            <option :value="num" v-for="num in 10" :key="num">選{{ num }} {{tempProduct.unit}}</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
                        </div>
                        <button type="button" class="btn btn-primary"
                                @click="addToCart(tempProduct.id,tempProduct.num)"
                        >
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === tempProduct.id"></i>
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name   : 'CustomOrder',
    data () {
      return {
        products   : [],
        tempProduct: {},
        isLoading  : false,
        status     : {
          loadingItem: true
        },
        form       : {
          user   : {
            name   : '',
            email  : '',
            tel    : '',
            address: ''
          },
          message: ''
        },
        cart       : {},
        coupon_code: '',
      }
    },
    methods: {
      getProducts () {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products`

        _this.isLoading = true
        this.axios.get(url).then((response) => {
          _this.products  = response.data.products
          _this.isLoading = false
        }).catch((error) => {
          console.log(error)
        })
      },

      getProduct (id) {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${id}`

        _this.status.loadingItem = id
        _this.axios.get(url).then((response) => {
          _this.tempProduct = response.data.product
          $('#productModal').modal('show')
          _this.status.loadingItem = ''
        }).catch((error) => {
          console.log(error)
        })
      },

      addToCart (id, qty = 1) {
        const _this              = this
        const url                = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
        const cart               = {
          product_id: id,
          qty
        }
        _this.status.loadingItem = id
        this.axios.post(url, { data: cart }).then((response) => {
          _this.status.loadingItem = ''
          $('#productModal').modal('hide')
          _this.getCart()
        }).catch((error) => {
          console.log(error)
        })
      },

      getCart () {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`

        _this.isLoading = true
        this.axios.get(url).then((response) => {
          _this.cart = response.data.data

          _this.isLoading = false
        }).catch((error) => {
          console.log(error)
        })
      },

      removeCartItem (id) {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${[process.env.VUE_APP_CUSTOM]}/cart/${id}`

        _this.isLoading = true
        this.axios.delete(url).then((response) => {
          _this.getCart()
          _this.isLoading = false
        }).catch((error) => {
          console.log(error)
        })
      },

      addCouponCode () {
        const _this     = this
        const url       = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/coupon`
        _this.isLoading = true
        let coupon      = {
          code: _this.coupon_code
        }
        this.axios.post(url, { data: coupon }).then((response) => {
          console.log(response)
          this.getCart()
          _this.isLoading = false
        }).catch((error) => {
          console.log(error)
        })
      },

      createOder () {
        const _this = this
        const url   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order`
        // _this.isLoading = true
        let order   = _this.form
        //驗證
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            this.axios.post(url, { data: order })
              .then((response) => {
                // console.log('訂單已建立', response)
                if (response.data.success) {
                  _this.$router.push(`/customer_checkout/${response.data.orderId}`)
                }
                _this.isLoading = false
              })
              .catch((error) => {console.log(error)})
          }
        })

      },
      init () {
        this.getProducts()
        this.getCart()
      }

    },
    created () {
      this.init()
      let api ='https://api.myjson.com/bins/87bkh';

      this.axios.get(api).then((response) => {console.log(response)})// 取不到資料

      $.get(api, (response) => {console.log(response)}) //取得到資料
    },

  }
</script>

<style scoped>

</style>