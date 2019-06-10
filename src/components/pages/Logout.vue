<template>
    <div>
        <a href="#" @click.prevent="logout" class="btn btn-danger">logout</a>
    </div>
</template>

<script>
    export default {
        name   : 'Logout',
        props  : {
            msg: String
        },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
