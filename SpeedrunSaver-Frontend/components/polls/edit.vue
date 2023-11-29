<template>
    <div class="flex flex-col w-9/12 bg-gray-300 rounded-xl my-10 p-4">
        <form>
            <div class="flex justify-between">
                <h2 class=" text-2xl ml-1 mb-2"> Edit poll </h2>
                <button @click="deletepoll()" type="button" class="bg-red-600 rounded-lg text-white max-h-8 px-2">Delete</button>
            </div>
            <input type="text" :value="poll.pollName" name="pollName" class="w-full border-2 border-gray-300 p-2 rounded-lg mb-2">
            <label class="text-xl">Options</label>
            <div id="options" class="w-full mt-2 bg-gray-200 p-4 rounded-lg">
                <input type="text" v-for="(option, key) in poll.options" :name="'option'+(key+1)" :value="option" class="p-1 w-full mb-1">
            </div>
            <div class="flex justify-center gap-20 mt-4">
                <div>
                    <input type='checkbox' :checked="poll.active" name="active" class='ios8-switch ios8-switch-lg' id='checkbox-3'><p></p>
                    <div class="flex"> 
                        <label>Active</label>
                        <p @click="showinfo(1)" class="relative cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <div v-if="show == 1" class="absolute rounded-lg bg-gray-100 py-1 px-2 w-40 text-sm">
                                <p>When set to not active, users can't vote anymore.</p>
                            </div>
                        </p>
                    </div>
                </div>
                <div>
                    <input type='checkbox' :checked="poll.visible" name="visible" class='ios8-switch ios8-switch-lg' id='checkbox-2'><p></p>
                    <div class="flex">
                        <label >Visible</label>
                        <p @click="showinfo(2)" class="relative cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <div v-if="show == 2" class="absolute rounded-lg bg-gray-100 py-1 px-2 w-40 text-sm">
                                <p>when set to not visible, users can't see the poll anymore, but admins can still view and edit the poll.</p>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <button @click="back()" type="button" class="px-2 py-1 border-gray-500 border  text-black rounded-lg mt-2">Back</button>
                <button @click="submit()" type="button" class="px-2 py-1 bg-green-600 text-white rounded-lg mt-2">Edit poll</button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { EditPoll } from '~/composables/Poll';
import { DeletePoll } from '~/composables/Poll';

const prop = defineProps({
    poll: {
        type: Object,
        required: true
    },
    back: {
        type: Function,
        required: true
    }
})

async function submit(){
    var pollName = document.querySelector("input[name='pollName']").value
    var options = []
    var optioncount = document.querySelectorAll("#options input").length
    var active = document.querySelector("input[name='active']").checked
    var visible = document.querySelector("input[name='visible']").checked
    for(var i = 1; i <= optioncount; i++){
        options.push(document.querySelector("input[name='option"+i+"']").value)
    }
    console.log(pollName)
    console.log(options)
    
    var data = {
        id: prop.poll.id,
        pollName: pollName,
        options: options,
        votes: prop.poll.votes,
        active: active,
        visible: visible
    }
    console.log(data)
    await EditPoll(data)
    prop.back()
}

const show = ref(0);

function showinfo(num){
    if(show.value == num){
        show.value = 0
    }
    else{
        show.value = num
    }
}

function deletepoll(){
    var r = confirm("Are you sure you want to delete this poll?")
    if(r){
        DeletePoll(prop.poll.id)
        window.location.href = "/polls"
    }
}
</script>

<style>

input[type="checkbox"].ios8-switch {
    position: absolute;
    top:0px;
    margin: 0px 0 0 16px;    
}
input[type="checkbox"].ios8-switch {
    position: relative;
    padding: 5px 0 0 50px;
    line-height: 2.0em;
}
input[type="checkbox"].ios8-switch:before {
    margin-left: -20px;
    margin-top: -10px;
    content: "";
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 40px; /* x*5 */
    height: 24px; /* x*3 */
    border-radius: 16px; /* x*2 */
    background: #fff;
    border: 1px solid #d9d9d9;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
input[type="checkbox"].ios8-switch:after {
    margin-left: -20px;
    margin-top: -10px;
    content: "";
    position: absolute;
    display: block;
    left: 0px;
    top: 0px;
    width: 24px; /* x*3 */
    height: 24px; /* x*3 */
    border-radius: 16px; /* x*2 */
    background: #fff;
    border: 1px solid #d9d9d9;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
input[type="checkbox"].ios8-switch:hover:after {
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
}
input[type="checkbox"].ios8-switch:checked:after {
    margin-left: 0px;
}
input[type="checkbox"].ios8-switch:checked:before {
    background: #16A34A;
}

input[type="checkbox"].ios8-switch-lg {
    margin: 10px 0 0 15px;
}
input[type="checkbox"].ios8-switch-lg {
    position: relative;
    padding: 7px 0 0 60px;
    line-height: 2.3em;
}
input[type="checkbox"].ios8-switch-lg:before {
    width: 50px; /* x*5 */
    height: 30px; /* x*3 */
    border-radius: 20px; /* x*2 */
}
input[type="checkbox"].ios8-switch-lg:after {
    width: 30px; /* x*3 */
    height: 30px; /* x*3 */
    border-radius: 20px; /* x*2 */
}
input[type="checkbox"].ios8-switch-lg:hover:after {
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
input[type="checkbox"].ios8-switch-lg:checked:after {
    margin-left: 0px; /* x*2 */
}
</style>