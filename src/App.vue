<template>
    <div class="container">
        <router-view style="margin-bottom:50px" />
        <div id="nav" class="text-center p-3 footer">
            <div v-for="route in routes" :key="route.path" style="display:inline">
                <router-link  :to="route.path.replace(':id','1')">{{ route.name }}</router-link> <span v-if="route != routes[routes.length - 1]"> | </span>
            </div>
            
        </div>
        {{ routs }}
    </div>
</template>
<script>
import router from './global/router'
export default {
    name: 'App',
    data(){
        return{
            routes:router.options.routes
        }
    }
}
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