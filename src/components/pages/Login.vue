<template>
    <div>
        <form class="form-signIn" @submit.prevent="signIn">
            <h1 class="h3 mb-3 font-weight-normal">請登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="user.username">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password">
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
    </div>
</template>

<script>
  export default {
    name   : "login",
    data() {
      return {
        user: {
          "username": "",
          "password": ""
        }
      }
    },
    methods: {
      signIn() {
        const api   = `${process.env.VUE_APP_API}/admin/signin`;
        const _this = this;

        this.axios.post(api, _this.user).then((response) => {
          if (response.data.success) {
            _this.$router.push('admin/products');
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
    html,
    body {
        height: 100%;
    }

    body {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signIn {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }

    .form-signIn .checkbox {
        font-weight: 400;
    }

    .form-signIn .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signIn .form-control:focus {
        z-index: 2;
    }

    .form-signIn input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signIn input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>