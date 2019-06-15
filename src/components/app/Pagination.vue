<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
                    <a class="page-link" href="#" aria-label="Previous" @click="getProducts(pagination.current_page - 1 )">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="(page, key) in pagination.total_pages" :key="key" :class="{ 'active':pagination.current_page === page }">
                    <a class="page-link" href="#" @click="getProducts(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
                    <a class="page-link" href="#" aria-label="Next" @click="getProducts(pagination.current_page + 1 )">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
  export default {
    name : "Pagination",
    props: ['pagination'],
    methods: {
      getProducts(page) {
        this.$emit('getPageProducts', page);
      }
    }

  }
</script>

<style scoped>

</style>