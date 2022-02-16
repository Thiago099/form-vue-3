<template>
<div class="row">
    <v-header :title="title" :subtitle="subtitle" :icon="icon" :content_align="search_bar_align">
        <template v-slot:content="">
            <div class="col-12" style="margin:20px 0 20px 0;">
            <div v-html="display_search" class="phantom-input-overlay"></div>
            <i aria-hidden="true" class="fa fa-search fa-fw search-icon"></i>
            <input type="text" class="form-control input-sm phantom-input" v-model="search" @input="updateSearch()" placeholder="Digite para buscar"/>
            </div>
        </template>
    </v-header>
        
        
        
        <div v-if="empety">Nehum resultado encontrado</div>
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th scope="col" v-for="title in Object.keys(display_data[0])" :key="title">
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
                    <tr class="empety" v-for="index in (per_page-display.length)" :key="index">
                        <td v-for="item in Object.keys(display_data[0])" :key="item">&nbsp;</td>
                    </tr>
            </tbody>
        </table>
        <div class="col-12 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" @click.prevent="prevPage()" :class="{'disabled':page == 1}">
                            <span aria-hidden="true">
                                <i class="fa fa-angle-left" aria-hidden="true"></i>
                            </span>
                        </a>
                    </li>
                    <li class="page-item" :key="index" v-if="display_pages[0] != 1">
                        <a href="#" @click.prevent="setPage(1)" class="page-link" :class="{'btn-blue': page == 1}">
                            1
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link disabled" href="#" v-if="display_pages[0] != 1 && display_pages[0] != 2">
                            <span aria-hidden="true">
                                ...
                            </span>
                        </a>
                    </li>
                    <li class="page-item" v-for="index in display_pages" :key="index">
                        <a href="#" @click.prevent="setPage(index)" class="page-link" :class="{'btn-blue': page == index}">
                            {{ index }}
                        </a>
                    </li>
                    <li class="page-item" v-if="display_pages[display_pages.length-1] != pages && display_pages[display_pages.length-1] != pages-1">
                        <a class="page-link disabled" href="#" >
                            <span aria-hidden="true">
                                ...
                            </span>
                        </a>
                    </li>
                    <li class="page-item" v-if="display_pages[display_pages.length-1] != pages">
                        <a href="#" @click.prevent="setPage(pages)" class="page-link" :class="{'btn-blue': page == pages}">
                            {{ pages }}
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" @click.prevent="nextPage()" :class="{'disabled':page == pages}">
                            <span aria-hidden="true">
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>

export default {
    name: 'v-table',
    props: {
        data: {
        },
        fields:{},
        per_page:{
            type: Number,
            default: 15
        },
        title: {
            type: String,
            default: 'Header'
        },
        subtitle: {
            type: String,
            default: 'Subtitle'
        },
        icon:{
            type: String,
            default: 'icon-sub icon-relatorios_sub_icone'
        },
        search_bar_align:{
            type: Number,
            default: 40
        },
    },
    data(){
        return {
            filtered: [{}],
            display: [{}],
            last_search:'',
            display_search:'',
            display_data:[{}],
            sort_column:'',
            sort_order:true,
            search:'',
            empety:true,
            page:1,
            pages:1,
            page_display:15,
        }
    },
    computed: {
        display_pages(){
            const result = []
            let start;
            let end;
            if(this.page_display >= this.pages - 4 )
            {
                start = 1;
                end = this.pages;
            }
            else
            {
                let leftpad = Math.ceil(this.page_display/2)
                let rightpad = Math.ceil(this.page_display/2)
                if(this.page - leftpad < 0)
                {
                    rightpad -= this.page - leftpad 
                    leftpad = 1
                }
                else
                {
                    leftpad = this.page - leftpad + 1
                }
                if(this.page + rightpad > this.pages)
                {
                    leftpad -= this.page + rightpad - this.pages
                    rightpad = this.pages
                }
                else
                {
                    rightpad = this.page + rightpad
                }
                start = leftpad
                end = rightpad

                if(start <= 1)
                {
                    end +=1
                }
                if(start <= 2)
                {
                    end +=1
                }
                if(end >= this.pages)
                {
                    start -= 1;
                }
                if(end >= this.pages-1)
                {
                    start -= 1;
                }
            }
            for(let i = start; i <= end; i++){
                result.push(i)
            }
            return result
        },
        
    },
    methods:{
        updateSearch(){
            const filtered = this.display_data.filter(item => {
                for(let key in item)
                {
                    if(item[key].toString().toLowerCase().includes(this.search.toLowerCase()))
                    {
                        return true;
                    }
                }
                return false;
            });
            if(filtered.length != 0)
            {
                this.filtered = filtered;
                this.last_search = this.search;
            }
            const search = this.search.search(this.last_search);
            if(search == 0)
            {
                this.display_search = `<font color="black">${this.last_search}</font><font color="red">${this.search.replace(this.last_search,'')}</font>`;
            }
            else if(search >= 0)
            {
                const mid = this.search.split(this.last_search);
                this.display_search = `<font color="red">${mid[0]}</font><font color="black">${this.last_search}</font><font color="red">${mid[1]}</font>`;

            }
            else
            {
                this.display_search = `<font color="red">${this.search}</font>`;
            }
            this.updatePagination()
        },
        setPage(page){
            this.page = page;
            this.updatePagination();
        },
        nextPage(){
            this.page++;
            this.updatePagination();
        },
        prevPage(){
            this.page--;
            this.updatePagination();
        },
        updatePagination(){
            let comeco =
				this.per_page * (this.page - 1)
			let final =
				this.per_page * this.page
			if (comeco > this.filtered.length) {
				this.page = 1
				comeco =
					this.per_page * (this.page - 1)
				final = this.per_page * this.page
			}
            this.pages = Math.ceil(this.filtered.length / this.per_page)
			this.display = this.filtered.slice(comeco, final)
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
                this.empety = false;
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
    
    tr{
        background-color: rgb(255, 255, 255);
    }
    tr:nth-child(even){
        background-color: #f7f5f5;
    }
    .btn-blue{
        color:white;
        background-color: v-bind(color);
    }
    .phantom-input-overlay{
        pointer-events: none;
        position:absolute;
        margin-left:36px;
        margin-top:7px
    }
    .phantom-input{
        color: transparent;
        caret-color: black;
        padding-left: 35px;
    }
    .search-icon{
        pointer-events: none;
        position:absolute;
        margin-left:10px;
        margin-top:10px;
        color:rgb(134, 134, 134);
    }
    
    table {
        border: 2px solid v-bind(color);
    }
    table td, table th {
        border: none;
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
    .empety{
        background-color: #ececec;
    }
    .empety:nth-child(even){
        background-color: #e7e6e6;
    }
    .disabled{
        pointer-events: none;
    }
    
    .page-link{
        width: 50px;
        text-align: center;
    }
</style>