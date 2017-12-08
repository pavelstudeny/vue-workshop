<template>
    <table>
        <tr v-for="p in projects"><th>{{p.name}}</th><td>{{p.id}}</td></tr>
    </table>
</template>

<script>
export default {
    name: 'ProjectList',
    props: ['projects']
}    
</script>

