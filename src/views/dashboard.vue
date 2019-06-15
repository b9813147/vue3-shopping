<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
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
  import Navbar  from '../components/app/Navbar';
  import Sidebar from '../components/app/Sidebar';
  import Alert   from '../components/app/AlertMessage';


  export default {
    name      : "dashboard",
    components: {
      Navbar,
      Sidebar,
      Alert
    }
  }
</script>

<style scoped>

</style>