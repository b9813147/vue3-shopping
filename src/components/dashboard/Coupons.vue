<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button type="button" class="btn btn-purple" @click="openModal(true)">建立優惠券</button>
        </div>
        <table class="table mt-4">
            <thead>
            <tr>
                <th>名稱</th>
                <th>百分比</th>
                <th>優惠代碼</th>
                <th>截止日期</th>
                <th>是否啟用</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in coupons.coupons" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.percent }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.due_date }}</td>
                <td v-if="item.is_enabled" class="text-success">啟用</td>
                <td v-else class="text-danger">停用</td>
                <td>
                    <a href="#" class="btn btn-outline-purple btn-sm mr-2" @click="openModal(false,item)">編輯</a>
                    <a href="#" class="btn btn-outline-danger btn-sm" @click="deleteCoupon(item)">刪除</a>
                </td>
            </tr>
            </tbody>
        </table>

        <!--         pagination -->
        <Pagination :pagination="pagination" @getPageProducts="getCoupons"/>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel"
             aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">名稱:</label>
                            <input type="text" name="title" id="title" class="form-control" placeholder="請輸入名稱"
                                   v-model="tempCoupon.title"
                            >
                        </div>
                        <div class="form-group">
                            <label for="percent">百分比:</label>
                            <input type="number" name="percent" id="percent" class="form-control" placeholder="請輸入數值"
                                   v-model="tempCoupon.percent"
                            >
                        </div>
                        <div class="form-group">
                            <label for="code">優惠代碼:</label>
                            <input type="text" name="code" id="code" class="form-control" placeholder="請輸入優惠代碼"
                                   v-model="tempCoupon.code"
                            >
                        </div>
                        <div class="form-group">
                            <label for="due_date">截止日期:</label>
                            <input type="date" name="due_date" id="due_date" class="form-control" placeholder="請輸入截止日期"
                                   v-model="tempCoupon.due_date"
                            >
                        </div>
                        <div class="form-group">
                            <label for="checkbox">是否啟用</label>
                            <input type="checkbox" name="is_enabled" id="checkbox" class="form-check"
                                   v-model="tempCoupon.is_enabled"
                            >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" @click="updateCouponCode">送出</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import $          from 'jquery'
  import Pagination from '@/components/app/Pagination'

  export default {
    name      : 'Coupons',
    data () {
      return {
        coupons   : [],
        pagination: {},
        tempCoupon: {},
        isLoading : false,
        isNew     : false,

      }
    },
    methods   : {
      getCoupons (page = 1) {
        const _this = this
        const api   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`

        _this.isLoading = true
        this.axios.get(api).then((response) => {
          _this.coupons    = response.data
          _this.pagination = response.data.pagination
          _this.isLoading  = false
        }).catch((error) => {console.log(error)})
      },

      updateCouponCode () {
        // const _this = this
        // const api   = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon`
        const _this    = this
        let api        = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon`
        let httpMethod = 'post'

        if (!_this.isNew) {
          api        =
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${_this.tempCoupon.id}`
          httpMethod = 'put'
        }

        _this.isLoading = true
        this.axios[httpMethod](api, { data: _this.tempCoupon }).then((response) => {

          _this.isLoading = false
          $('#productModal').modal('hide')
          _this.getCoupons()
        }).catch((error) => {console.log(error)})
      },

      deleteCoupon (item) {
        const _this     = this
        const api       = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${item.id}`
        _this.isLoading = true
        this.axios.delete(api).then((response) => {

          _this.isLoading = false
          _this.getCoupons()
        }).catch((error) => {console.log(error)})
      },

      openModal (isNew, item) {
        if (isNew) {
          this.tempCoupon = {}
          this.isNew      = true
        } else {
          this.tempCoupon = Object.assign({}, item)
          this.isNew      = false
        }
        $('#productModal').modal('show')
      },
    },
    created () {
      this.getCoupons()
      // this.addCouponCode()
      // /api/:api_path/admin/coupon

    },
    components: { Pagination }

  }
</script>

<style scoped>

</style>