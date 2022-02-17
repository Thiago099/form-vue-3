<template>

    <v-table 
    :title="title"
    :subtitle="subtitle"
    :icon="icon"
    :data="table_data" 
    :fields="fields"
    ></v-table>
</template>
<script>
import table_data from './TableData'
import {title, subtitle, icon} from './Header.js'

export default {
    name: 'usuario',
    data(){
        return {
            table_data,
            fields:[
                ['nome_trigrama','nome - trigrama'],
                'cpf',
                'orgao',
                'celular'
            ],
            title,
            subtitle,
            icon
        }
    },
}
</script>

