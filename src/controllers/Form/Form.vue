<template>
        <v-form 
            :fields="fields" 
            id="0" 
            data="Teste"
        />
</template>
<script>
import fields from './Form.js'

export default {
    name: 'App',
    data(){
        return {
            fields
        }
    },
    
}
</script>