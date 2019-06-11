<template>
    <div>
        <Navbar></Navbar>
        <div class="container-fluid">
            <div class="row">
                <Sidebar></Sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>


</template>

<script>
  import Navbar  from '../components/pages/Navbar';
  import Sidebar from '../components/pages/Sidebar';


  export default {
    name      : "dashboard",
    components: {
      Navbar,
      Sidebar,
    }
  }
</script>

<style scoped>

</style>