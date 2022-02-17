<template>
<div v-if="visible || !phantom">
    <div v-if="visible && type !== 'placeholder'">        
    <label 
        v-if="title!=''" 
        for="input"
        >{{ title }}
    </label>
        <div 
            :class="`${group_class} col-12` "
        >
            <input v-if="type === 'text'"
                type="text" 
                class="form-control input-sm" 
                :class="erro != '' ? 'erro-input' : ''"
                @input="handleBaisc"
                :value="value"
            />
            <input v-else-if="type === 'password'"
                type="password" 
                class="form-control input-sm" 
                :class="erro != '' ? 'erro-input' : ''"
                @input="handleBaisc"
                :value="value"
            />
            <div v-else-if="type === 'switch'" class="btn-group col-12">
                <button 
                    v-for="([option, key]) in list_options"
                    :key="option"
                    type="button"
                    class="btn"
                    :class="`${key == value ? 'btn-blue' : ''} ${erro != '' ? 'erro-input' : ''}`"
                    @click="handleSwitch(key)"
                >
                    {{ option }}
                </button>
            </div>
            <select
             v-else-if="type === 'select'" 
             class="form-select input-sm" 
            :class="erro != '' ? 'erro-input' : ''"
             @change="handleBaisc"
             >
                <option value=""></option>
                <option 
                    v-for="([option, key]) in list_options"
                    :key="option"
                    :value="key"
                    :selected="key == value"
                >
                {{ option }}</option>
             </select>
             <input 
                v-else-if="type === 'date'"
                @input="handleBaisc"
                type="date" 
                class="form-control"
                :class="erro != '' ? 'erro-input' : ''"
                :value="value"
             >
            <input 
                v-else-if="type === 'time'"
                @input="handleBaisc"
                type="time" 
                class="form-control"
                :class="erro != '' ? 'erro-input' : ''"
                :value="value"
            >
            <input 
                v-else-if="type === 'number'"
                @input="handleBaisc"
                type="number" 
                class="form-control"
                :class="erro != '' ? 'erro-input' : ''"
                :value="value"
            >
            <div 
                class="input-group"
                v-else-if="type === 'multiselect'"
            >
                <div class="d-flex flex-no-wrap">
                    <div>
                        <select
                            class="form-select input-sm" 
                            :class="erro != '' ? 'erro-input' : ''"
                            ref="option"
                            style="height:38px;"
                        >
                        <option value=""></option>
                        <option 
                            
                            v-for="([option, key]) in list_options"
                            :key="option"
                            :value="key"
                        >
                        {{ option }}</option>
                </select>
                    </div>
                    <div class="input-group-btn">
                    <button
                        class="btn btn-blue"
                        :class="erro != '' ? 'erro-input' : ''"
                        style="border-radius:0px 5px 5px 0px;width:85px;"
                        type="button"
                        @click="addMultiselect"
                    >
                        ADD <i class="fa fa-arrow-right fa-fw"></i>
                    </button>
                    </div>
                    </div>
                        <div class="col-6">
                            <div  v-if="Array.isArray(content)">
                            <span
                                v-for="(item, idx) in content.filter(item => item.excluir != true)"
                                :key="idx"
                                style="margin-top: 3px"
                            >
                                <span
                                    title="Clique para remover"
                                    class="label"
                                    @click="removeMultiselect(item)"
                                >
                                    {{ item[face] }}
                                    <i class="fa fa-times no-print"></i>
                                </span>
                            </span>
                            </div>
                        </div>
                </div>
            <!-- <div v-else-if="type === 'check'">
                <div class="form-check" v-for="([option, key]) in list_options" :key="key">
                    <input 
                        class = "form-check-input" 
                        type = "checkbox" 
                        value = "" 
                        :id = "`flexCheckDefault_${key}_${name}`"
                        :class="erro != '' ? 'erro-input' : ''"
                        >
                    <label class="form-check-label" :for="`flexCheckDefault_${key}_${name}`">
                        {{option}}
                    </label>
                </div>
            </div> -->
        </div>
    <div class="erro-message" v-if="erro != ''">{{ erro }}</div>
    <div v-else class="erro-placeholder">A</div>
    </div>
</div>

</template>
<script>
export default {
    name: 'v-input',
    props: {
        
        erro:{
            type: String,
            default: ''
        },
        name:{},
        value:{},
        title:{ 
            default:''
        },
        type:{
            default: 'text'
        },
        options:{},
        face:{
            default: 'description'
        },
        back:{
            default: 'id'
        },
        setid:{
        },
        visible:{
            default: true
        },
        phantom:{
            default: true
        },

    },

    data(){ 
        return {
            content: this.value,
            list_options: [],
            dictionary:{},
        }
    },
    methods:
    {
        
        handleBaisc(event)
        {
            this.content = event.target.value
            this.$emit('input', this.content)
            this.emitter.emit('input_data',{name:this.name, value:this.content})
        },
        handleSwitch(key)
        {
            this.$emit('input', key == this.value ? null : key)
            this.content = key == this.value ? null : key
            this.emitter.emit('input_data',{name:this.name, value:this.content})
        },
        addMultiselect()
        {
            if(this.content == null)
                this.content = []
            
            if(this.$refs.option.value == '')
                return
            const found = this.content.find(item => item[this.setid] == this.$refs.option.value)
            if(found)
            {
                if(found.excluir == true)
                    found.excluir = false
                
            }
            else
            {
                const current = {}
                current[this.setid] = this.$refs.option.value
                current[this.face] = this.dictionary[this.$refs.option.value]
                this.content.push(current)
            }
            this.$emit('input', this.content)
            this.emitter.emit('input_data',{name:this.name, value:this.content})
        },
        removeMultiselect(item)
        {
            if(item.id == undefined)
            {
                const index = this.content.findIndex(item => item.id == item.id)
                this.content.splice(index, 1)
            }
            else
            {
                item.excluir = true
            }
            this.$emit('input', this.content)
            this.emitter.emit('input_data',{name:this.name, value:this.content})
        },
    },
    mounted(){
        
        this.content = this.value
        if(!this.options){console.log()} else
        if(Array.isArray(this.options[0]))
        {
            this.list_options = this.options
        }
        else if(typeof this.options[0] ==='object')
        {
            this.list_options = this.options.map(option => [option[this.face],option[this.back]])
        }
        else 
        {
            this.axios(this.options, 'get', {
                callback: ({lista}) => {
                    this.list_options = lista.map(option => [option[this.face],option[this.back]])
                    this.list_options.forEach(([option, id]) => {
                        this.dictionary[id] = option
                    });
                }
            })
        }
        
    },
    computed:
    {
        group_class(){
            switch(this.type)
            {
                case 'text':
                    return 'form-group'
                case 'switch':
                    return 'btn-group btn-group-justified'
            }
            return '';
        },
    }
}
</script>
<style scoped>
    .btn{
        border:1px solid rgb(206, 212, 218);
    }
    p{
        margin-bottom: 10px;
    }
    .btn-info{
        color:white;
        background-color: v-bind(color);
    }	
    .erro-message{
        color:red;
        font-size: 12px;
        margin-top: 5px;
    }
    .erro-input{
        border: 1px solid red;
    }
    .erro-label{
        color:red;
    }
    .erro-placeholder{
        opacity: 0;
    }

    .btn-blue{
        color:white;
        background-color: v-bind(color);
    }
    .label {
        cursor: pointer;
        padding: 6px 10px;
        margin-left: 10px;
        background: #3b7daf;
        border-radius:3px;
        border: 1px solid rgb(206, 212, 218);
        color: #FFF;
        float: left;
    }
</style>