<template>
    <div class="container">
        <router-view />
        <div id="nav" class="text-center p-3 footer">
            <router-link to="/">Form</router-link> |
            <router-link to="/table">Table</router-link>
        </div>
    </div>
</template>
<script>
</script>

<style scoped>
.router-link-active{
    color: red;
}
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
}
</style>