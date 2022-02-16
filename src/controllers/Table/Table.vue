<template>

    <v-table 
    title = "Usuário"
    subtitle = "Usuários do sistema"
    icon = "icon-cadastro_usuarios"
    search_bar_align = "80"
    :data="table_data" 
    :fields="['nome',['descricao_estado','estado']]"
    ></v-table>
</template>
<script>
import table_data from './TableData'

export default {
    name: 'App',
    data(){
        return {
            table_data,
        }
    },
}
</script>

