<template>
    <div class="container">
        <hearder-app />
        <div class="row justify-content-center">
            <div class="col-md-10">
             <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import HearderApp from './HeaderApp.vue';
    export default {
        name: 'main-app',
        components: {
            HearderApp
        }
    }
</script>
