<template>
<div class="row">
        <div class="col-12" style="margin:20px 0 20px 0;">
           <div v-html="display_search" class="phantom-input-overlay"></div>
            <input type="text" class="form-control input-sm phantom-input" v-model="search" @input="updateSearch()"/>
        </div>
        <div v-if="empety">Nehum resultado encontrado</div>
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th scope="col" v-for="title in Object.keys(display[0])" :key="title">
                        <a @click="sortTable(title)" style="cursor:pointer">
                            {{title}}
                            <i
                                class="fa fa-fw fa-sort "
                                :class="{
                                    'fa-sort-amount-asc': sort_column == title && sort_order == true,
                                    'fa-sort-amount-desc':sort_column == title && sort_order == false,
                                }"
                            ></i>
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="line in display" :key="line">
                    <td v-for="item in line" :key="item">{{ item }}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

export default {
    name: 'v-table',
    props: {
        data: {
        },
        fields:{},
    },
    data(){
        return {
            display: [{}],
            last_search:'',
            display_search:[],
            display_data:[{}],
            sort_column:'',
            sort_order:true,
            search:'',
            empety:true,
        }
    },
    methods:{
        updateSearch(){
            const display = this.display_data.filter(item => {
                for(let key in item)
                {
                    if(item[key].toString().toLowerCase().includes(this.search.toLowerCase()))
                    {
                        return true;
                    }
                }
                return false;
            });
            if(display.length != 0)
            {
                this.display = display;
                this.last_search = this.search;
            }
            const search = this.search.search(this.last_search);
            if(search == 0)
            {
                this.display_search = `${this.last_search}<font color="red">${this.search.replace(this.last_search,'')}</font>`;
            }
            else if(search > 0)
            {
                const mid = this.search.split(this.last_search);
                this.display_search = `<font color="red">${mid[0]}</font>${this.last_search}<font color="red">${mid[1]}</font>`;

            }
            else
            {
                this.display_search = `<font color="red">${this.search}</font>`;
            }
            
        },
        sortTable(column){
            if(this.sort_column == column) 
            {
                this.sort_order = !this.sort_order;
            }
            else
            {
                this.sort_column = column;
            }
            // reduce display data into display
            this.display_data.sort((a,b) => {
                if(a[this.sort_column] < b[this.sort_column])
                {
                    return this.sort_order?-1:1;
                }
                if(a[this.sort_column] > b[this.sort_column])
                {
                    return this.sort_order?1:-1;
                }
                return 0;
            })
            this.display = this.display_data;
            this.updateSearch();
        }
    },
    created(){
        const process = result =>{
            this.display_data = result.map(line => {
                let newLine = {};
                for(let field of this.fields)
                {
                    if(Array.isArray(field))
                    {
                        newLine[field[1].toUpperCase()] = line[field[0]]
                    }
                    else
                    {
                        newLine[field.toUpperCase()] = line[field]
                    }
                }
                return newLine;
            });
            this.display = JSON.parse(JSON.stringify(this.display_data))
            this.sortTable(Object.keys(this.display[0])[0])
        }
        if(typeof this.data === 'object')
        {
            process(this.data)
        }
        else
        {
            this.axios(`/${this.data}/listar/`, 'get', {
                callback: (result) => {
                    if(result.length == 0)
                    {
                        console.log()
                    }
                    else
                    {
                        this.empety = false;
                        process(result)
                    }
                }
            })
        }
    },

}
</script>

<style scoped>
    thead th{
        border-style: none;
        background-color: v-bind(color);
        color:white;
    }
    
    tr:nth-child(even){
        background-color: #f5f4f4;
    }.btn-blue{
        color:white;
        background-color: v-bind(color);
    }
    .phantom-input-overlay{
        pointer-events: none;position:absolute;margin-left:13px;margin-top:7px
    }
    .phantom-input{
        color: transparent;
        caret-color: black;
    }
    
    table {
        border: 2px solid v-bind(color);
    }
    table td, table th {
        border: none
    }


    table tr td {
        border-right: 0;
    }
    table tr:last-child td {
        border-bottom: 0;
    }
    table tr td:first-child,
    table tr th:first-child {
        border-left: 0;
    }
    table tr td{
        border-top: 0;
    }
</style>