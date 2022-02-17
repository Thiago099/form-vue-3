<template>
        <v-form 
            :title="title"
            :subtitle="subtitle"
            :icon="icon"
            :fields="fields" 
            :data="table_data"
        />
            <!-- data="Teste" -->
        
</template>
<script>
import {title, subtitle, icon} from './Header.js'
import fields from './Form.js'
import table_data from './TableData.json'
export default {
    name: 'usuario',
    data(){
        return {
            fields,
            table_data,
            title,
            subtitle,
            icon
        }
    },
}
</script>