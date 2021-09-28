import {createApp,ref,onMounted,computed} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.5/vue.esm-browser.min.js"
const Vm=createApp({
    setup(){
        const newthings=ref('')
        const list=ref([])
        const nowediting=ref('')
        function save(){
            let history= JSON.stringify(list)
            localStorage.setItem('history',history)
            nowediting.value=""
        }
        function add(){
            if(!newthings.value){
                return;
            }
            const data={
                data:newthings.value,
                id:list.value.length,
                done:false,
            }
            newthings.value=""
            list.value.push(data)
            save()
        }

        function del(index){
            let target=list.value.filter(obj=>obj.id==index)
            target=list.value.findIndex(obj=>obj.id==target[0].id)
            list.value.splice(target,1)
            save()
        }
        const temp=ref({})
        function edit(index){
            if(nowediting.value!==""){
                nowediting.value=""
            }else{
                nowediting.value=index
            }
            let target=list.value.filter(obj=>obj.id==index)
            target=list.value.findIndex(obj=>obj.id==target[0].id)
            target=list.value[target]
            temp.value=target
        }

        function clear(){
            list.value=[]
            temp.value=""
            save()
        }   

        function done(){
            save()
        }

        const filter=ref('')
        const filterData=computed(()=>{
            if (filter.value!=='') {
                const filted=list.value.filter(obj=>{
                    return obj.done===filter.value
                    }
                )
                return filted
            } else {
                return list.value
            }
        })

        onMounted(()=>{
            let his=JSON.parse(localStorage.getItem('history'))
            list.value=his._value
        })
        return{
            add,
            save,
            del,
            edit,
            clear,
            done,
            newthings,
            list,
            nowediting,
            filter,
            filterData,
            temp,
        }
    }
})
Vm.mount('#app')