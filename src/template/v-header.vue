<template>
    <div class="row header">
    <div class="col-1">
        <dir class="main-icon">
            <i class = "icon " :class="icon" style="font-size:40pt"></i>
        </dir>
    </div>
    <div class="col-md-3 col-sm-11">
        <dir class="main-text">
            <h2 >{{ title }}</h2>
            <h6 style="cursor:pointer">{{ subtitle }} <i aria-hidden="true" class="fa fa-angle-down"></i></h6>
        </dir>
    </div>
    <div class="col-md-6 col-sm-12" style="display: flex; align-items: center;">
        <div style="width:100%;" class="main-content">
            <slot name="content" class="center"></slot>
        </div>
    </div>
    <div class="col-2 buttons">
        <div  class="main-button-container">
            <div v-if="button == 'novo'">
            <router-link :to="'/'+$parent.$parent.$options.name+'/editar'">
                <button class="form-control input-sm main-button main-button-new" >
                    <i class="fa fa-solid fa-plus"></i><br>Novo
                </button>
            </router-link>
            </div>
            <div v-else-if="button == 'voltar'" >
                <router-link :to="'/'+$parent.$parent.$options.name">
                    <button class="form-control input-sm main-button  main-button-back">
                        <i aria-hidden="true" class="icon-left" style="font-size: 18px;"></i>
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'v-header',
    props: {
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
        content_align:
        {
            type: Number,
            default: 40
        },
        button:{
            type: String,
            default: 'novo'
        },
    },

}
</script>

<style scoped>
.header{
    background-color: v-bind(color);
    color:white;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-left:0px;
    margin-top:20px;
}
@media (max-width:770px) {
    .main-icon{
        margin-left: -30px;
    }
    .main-content{
        margin-left: 20px;
        margin-top:-5%;
    }
    .main-button-container{
        margin-top: -20px;
        margin-left: 130px;
    }
    .main-button{
        margin-bottom: 20px;
    }
    .buttons{
        position: fixed;
        right: 16%;
        margin-top: 15px;
    }
}
@media (min-width:770px) {
    .main-icon{
        margin-left: -30px;
    }
    .main-text{
        margin-left:-20%
    }
    .main-content{
        margin-left: 0px;
        margin-left: -20px;
    } 
    .main-button{
        margin-bottom: 20px;
    }
}
.main-button-container{
       background-color: red;
    }
.main-button-new{
    width:100px;
    height:70px;
    float:right;
    margin-top:20px;
    margin-right:10px
}
.main-button-back{
    width:80px;
    height:50px;
    float:right;
    margin-top:30px;
    margin-right:10px
}
</style>