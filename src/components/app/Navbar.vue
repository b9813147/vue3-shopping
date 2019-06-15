<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
  export default {
    name: "Navbar",
    methods: {
      logout() {
        const logout_url = `${process.env.VUE_APP_API}/logout`;
        const _this      = this;

        this.axios.post(logout_url).then((response) => {
          console.log(response.data);
          if (response.data) {
            _this.$router.push('Login');
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>

</style>