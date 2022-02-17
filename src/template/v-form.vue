<template>
    <div :key="responsividade" class="row">
        <v-header 
            :title="title" 
            :subtitle="subtitle" 
            :icon="icon" 
            :content_align="0"
            button="voltar"
        >
        </v-header>
        <div v-for="({title, data, visibility}) in fields" :key="title" style="margin:0px;padding:0px">
            <div v-if="visible(visibility)" class="card">
                <div class="card-header"> {{ title }} </div>
                <div class="card-body row">
                    <v-input 
                    v-for="({name, classe, title, required, type, options, face, back, setid, visibility, phantom}) in data"
                        :key="name"
                        :class="classe"
                        :title="title + ':' + (required ? ' *' : '') "
                        :name="name"
                        :value="form[name]"
                        :type="type"
                        :options="options"
                        :face="face"
                        :back="back"
                        :setid="setid"
                        :erro="erro[name]"
                        :visible="visible(visibility)"
                        :phantom="phantom"
                    />
                </div>
            </div>
        </div>
             
        <div class="col-sm-12" style="margin-bottom:100px; margin-top:20px">
            <button 
                class="btn btn-primary" 
                style="float:right"
                @click="submit()"
            >{{ id == 0 ? 'Salvar' : 'Atualizar'}}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'v-form',
    props:{
        fields: {
            type: Array,
            default: () => []
        },
        data:{
            type: String,
            default: ''
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
    },
    data(){
        return {
            form:{},
            erro:{},
            colapse:false,
            responsividade: 0,
        }
    },
    mounted(){
        if(this.$route.params.id != undefined)
        {
            if(Array.isArray(this.data)){
                this.form = this.data.find(item => item.id == this.$route.params.id)
            }
            else
            {
                this.axios(`/${this.data}/listar/${this.$route.params.id}`, 'get', {
                    callback: (result) => {
                        this.form = result;
                    }
                })
            }
        }
        else
        {
            this.form = this.fields.reduce((acc, field) => {
                field.data.forEach(input => {
                    if(input.type != 'placeholder')
                    {
                        acc[input.name] = input.default
                    }
                })
                return acc
            }, {})
            this.form.id = 0
        }
         this.emitter.on("input_data", ({name, value}) => {
            this.form[name] = value
        })
        
    },

    methods:
    {
        visible(visibility)
        {
            if(visibility == null)
            {
                return true
            }
            return visibility(this.form)
        },
        submit(){
            var erro = false;
            this.fields.forEach(({data, visibility}) => {
                if(this.visible(visibility))
                {
                data.forEach(({name, required, validation, visibility}) => {
                        if(required && this.visible(visibility) && (this.form[name] == undefined || this.form[name] == ''|| (Array.isArray(this.form[name]) && this.form[name].filter(item => item.excluir == false || item.excluir == undefined).length == 0)))
                        {
                            erro = true
                            this.erro[name] = 'Este campo é obrigatório.'
                        }
                        else
                        {
                            if(typeof validation !== 'undefined')
                            {
                                const processed = validation(this.form[name])
                                if(typeof processed != 'undefined')
                                {
                                    this.erro[name] = processed
                                    erro = true
                                }
                                else
                                {
                                    this.erro[name] = ''
                                }
                            }
                            else
                            {
                                this.erro[name] = ''
                            }
                        }
                    }
                )
                }
            })

            this.responsividade++
            if(!erro)
            {
                this.axios(`/${this.data}/salvar/`, 'post', {
                    data: this.form,
                })
            }
        },
    },


}
</script>
<style scoped>
.card{
    margin-bottom:20px;
    padding: 0px;
}
.btn{
    font-size: 15px;
    padding:10px;
    padding-left: 50px;
    padding-right:50px;
    color:white;
    background-color: v-bind(color);
}
.card-header{
    background-color: v-bind(color);
    color:white;
}
.card-body{
    padding: 25px 40px 10px 40px;
}
.btn-blue{
    color:white;
    background-color: v-bind(color);
}

</style>