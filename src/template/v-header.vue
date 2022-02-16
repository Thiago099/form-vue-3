<template>
    <div class="row header">
    <div class="col-1">
        <dir style="margin-left:-30px">
            <i class = "icon " :class="icon" style="font-size:40pt"></i>
        </dir>
    </div>
    <div class="col-3">
        <dir style="margin-left:-70px">
            <h2 >{{ title }}</h2>
            <h6 style="cursor:pointer">{{ subtitle }} <i aria-hidden="true" class="fa fa-angle-down"></i></h6>
        </dir>
    </div>
    <div class="col-7" style="display: flex; align-items: center;">
        <div :style="`width:100%;margin-left:-${content_align}px`">
            <slot name="content" class="center"></slot>
        </div>
    </div>
    <div class="col-1">
        <div style="margin-left:115px;">
            <button class="form-control input-sm" style="width:100px;height:70px;float:right;margin-top:20px;"><i class="fa fa-solid fa-plus"></i><br>Novo</button>
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
        }
    },

}
</script>

<style scoped>
.header{
    background-color: v-bind(color);
    color:white;
    border-radius: 5px;
    padding-right: 50px;
    margin-bottom: 20px;
    margin-left:0px;
    margin-top:20px;
}
</style>