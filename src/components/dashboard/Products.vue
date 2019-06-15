<template>
    <div>
        <loading :active.sync="isLoading"></loading>
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
        <Pagination :pagination="pagination" @getPageProducts="getProducts"/>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-dark">
                        <h5 class="modal-title text-white" id="productModalLabel">新增產品</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="inputImageUrl">輸入圖片網址</label>
                                        <input type="text" class="form-control" id="inputImageUrl" aria-describedby="imgHelp" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                                    </div>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="customFile" ref="files" @change="uploadFile">
                                        <label class="custom-file-label" for="customFile">或上傳圖片
                                            <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                        </label>
                                    </div>
                                    <img :src="tempProduct.imageUrl" alt="" class="img-fluid mt-2">
                                </div>
                                <div class="col-md-8">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="title">標題</label>
                                                <input type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="請輸入標題" v-model="tempProduct.title">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="category">分類</label>
                                                <input type="text" class="form-control" id="category" aria-describedby="categoryHelp" placeholder="請輸入分類" v-model="tempProduct.category">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="unit">單位</label>
                                                <input type="text" class="form-control" id="unit" aria-describedby="unityHelp" placeholder="請輸入單位" v-model="tempProduct.unit">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="origin_price">原價</label>
                                                <input type="text" class="form-control" id="origin_price" aria-describedby="origin_priceHelp" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="price">售價</label>
                                                <input type="text" class="form-control" id="price" aria-describedby="priceHelp" placeholder="請輸入售價" v-model="tempProduct.price">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <hr>
                                            <div class="form-group">
                                                <label for="content">產品描述</label>
                                                <textarea type="text" class="form-control" id="content" aria-describedby="contentHelp" placeholder="請輸入產品描述" v-model="tempProduct.content"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label for="description">產品說明 </label>
                                                <textarea type="text" class="form-control" id="description" aria-describedby="descriptionHelp" placeholder="請輸入產品說明" v-model="tempProduct.description"></textarea>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="is_enabled"
                                                       v-model="tempProduct.is_enabled"
                                                       :true-value="1"
                                                       :false-value="0">
                                                <label class="form-check-label" for="is_enabled">
                                                    是否啟用
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import $          from 'jquery'
  import Pagination from '../app/Pagination'

  export default {
    name      : 'Products',
    data () {
      return {
        products   : [],
        tempProduct: {},
        isNew      : false,
        isLoading  : false,
        status     : {
          fileUploading: false
        },
        pagination : {}
      }
    },
    methods   : {
      getProducts (page = 1) {
        const api       = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/products?page=${page}`
        const _this     = this
        _this.isLoading = true
        this.axios.get(api).then((response) => {
          _this.products   = response.data.products
          _this.pagination = response.data.pagination
          _this.isLoading  = false
        }).catch((error) => {
          console.log(error)
        })
      },

      openModal (isNew, item) {
        if (isNew) {
          this.tempProduct = {}
          this.isNew       = true
        } else {
          this.tempProduct = Object.assign({}, item)
          this.isNew       = false
        }
        $('#productModal').modal('show')
      },

      updateProduct () {
        let api        = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product`
        let httpMethod = 'post'
        const _this    = this

        if (!_this.isNew) {
          api        = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${_this.tempProduct.id}`
          httpMethod = 'put'
        }

        this.axios[httpMethod](api, { data: _this.tempProduct }).then((response) => {
          if (response.data.success) {
            $('#productModal').modal('hide')
            _this.getProducts()
          } else {
            $('#productModal').modal('hide')
            _this.getProducts()
            console.log('新增失敗')
          }
        }).catch((error) => {
          console.log(error)
        })
      },

      deleteProduct (item) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${item.id}`
        console.log(api)
        this.axios.delete(api).then((response) => {
          if (response.data.success) {
            this.getProducts()
          } else {
            this.getProducts()
            console.log('刪除失敗')
          }
        }).catch((error) => {
          console.log(error)
        })
      },

      uploadFile () {
        const _this      = this
        const uploadFile = _this.$refs.files.files[0]
        const url        = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/upload`
        const formDate   = new FormData()

        _this.status.fileUploading = true

        formDate.append('file-to-upload', uploadFile)
        this.axios.post(url, formDate, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          if (response.data.success) {

            _this.$set(_this.tempProduct, 'imageUrl', response.data.imageUrl)

            _this.status.fileUploading = false
            this.$bus.$emit('message:push', '上傳成功', 'success')
          } else {
            _this.status.fileUploading = false
            this.$bus.$emit('message:push', response.data.message, 'danger')
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created () {
      this.getProducts()

    },
    components: {
      Pagination,
    }
  }
</script>

<style scoped>

</style>