<template>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <div>
        <h2 class=" text-2xl font-bold">New Game</h2>
        <div class="flex justify-between my-4">
            <label for="name">Name:</label>
            <input type="text" id="name" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.name" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="description">Description:</label>
            <textarea id="description" class="w-11/12 resize-none px-3 py-2 rounded-lg" v-model="FormData.description"></textarea>
        </div>
        <div class="flex justify-between my-4">
            <label for="developer">Developer:</label>
            <input type="text" id="developer" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.developer" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="publisher">Publisher:</label>
            <input type="text" id="publisher" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.publisher" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="release_date">Release date:</label>
            <input type="date" id="release_date" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.release_date" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="platform">Platform:</label>
            <!-- <select id="platform" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.platform" required>
                <option  v-for="platform in platforms" :value="platform.id">{{platform.platformName}}</option>
            </select> -->
            <div class="directorist-select directorist-select-multi w-11/12 px-3 py-2 rounded-lg" id="multiSelect" data-max="99">               
                <input type="hidden">
            </div>
        </div>
        <div class="flex justify-between my-4">
            <label for="image">Image:</label>
            <input class="w-11/12" type="file" id="image" required>
        </div>
        <button @click="submit()" class="bg-green-600 w-full py-1.5 mt-6 rounded-xl text-white hover:bg-green-500">Add game</button>
    </div>
</template>

<script setup lang="ts">
import {getPlatforms} from "~/composables/Platform"
import {createGame} from "~/composables/Game"

let platforms = await getPlatforms();

let FormData = {
    name: "",
    description: "",
    developer: "",
    publisher: "",
    release_date: "",
    platform: "",
    image: ""
}

function submit(){
    let imagename:string = document.getElementById("image").files[0].name
    FormData.image = document.getElementById("image").files[0].name
    console.log(FormData)
}

onMounted(() => {
    multiSelect('#multiSelect')
})

const multiSelect = (selector) => {
    let isMax = {
        [document.querySelector(selector).getAttribute('id')]: eval(document.querySelector(selector).getAttribute('data-max'))
    };
    let isSearch = false
    let item = document.getElementById("multiSelect");
    let defaultValues = {
        [document.querySelector(selector).getAttribute('id')]: document.querySelector(selector).getAttribute('data-default') ? eval(document.querySelector(selector).getAttribute('data-default')) : []
    };
    let optionValues = platforms.map(platform => platform.platformName)
    
    const arraySelector = item.getAttribute('id');            
    const hiddenInput = item.querySelector('input[type="hidden"]'); 

    let virtualSelect = document.createElement('div');
    virtualSelect.classList.add('directorist-select__container');
    item.append(virtualSelect);
    item.style.position = 'relative';
    item.style.zIndex = '0';
    let sibling = item.querySelector('.directorist-select__container'),
    option = platforms.map(platform => platform.platformName)

    let html = `
    <div class="directorist-select__label">
        <div class="directorist-select__selected-list"></div>
        <input type="text" class='directorist-select__search ${ isSearch ? 'directorist-select__search--show' : 'directorist-select__search--hide' }' type='text' class='value' placeholder='Filter Options....' />
    </div>
    <div class="directorist-select__dropdown">            
        <div class="directorist-select__dropdown--inner"></div>
    </div>
    <span class="directorist-error__msg"></span>`;

    function insertSearchItem () {
        item.querySelector('.directorist-select__selected-list').innerHTML = defaultValues[arraySelector].map(item => `<span class="directorist-select__selected-list--item">${item}&nbsp;&nbsp;<a href="#" data-key="${item}" class="directorist-item-remove"><i class="fa fa-times"></i></a></span>`).join("")
    }

    sibling.innerHTML = html;            
    const button = sibling.querySelector('.directorist-select__label');            
    insertSearchItem();
                                        
    document.body.addEventListener('click', (event) => {                        
        if(event.target == button || event.target.closest('.directorist-select__container')){
            return;
        } else {
            sibling.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
        }                
    });
    
    button.addEventListener('click', (e) => {
        
        e.preventDefault();
        var value = item.querySelector('input[type="text"]');
        value.focus();
       
        document.querySelectorAll('.directorist-select__dropdown').forEach(el => el.classList.remove('directorist-select__dropdown-open'));
        e.target.closest('.directorist-select__container').querySelector('.directorist-select__dropdown').classList.add('directorist-select__dropdown-open');
                                        
        var popUp = item.querySelector('.directorist-select__dropdown--inner');
        
        var item2 = '<ul>';
        option.forEach((el, key) => {  
            item2 += `<li data-key="${el}" class="directorist-select-item-hide">${el}</li>`;
        });
        item2 += '</ul>';
        
        popUp.innerHTML = item2;
        var li = item.querySelectorAll('li');

        li.forEach((element, index) => { 
            element.classList.remove('directorist-select-item-show');
            element.classList.add('directorist-select-item-hide');
            if(defaultValues[arraySelector].includes(element.getAttribute('data-key'))){                          
                element.classList.add('directorist-select-item-show');
                element.classList.remove('directorist-select-item-hide');
            }
        });
                            
        value && value.addEventListener('keyup', (event) => {     
                           
            var itemValue = event.target.value.toLowerCase();
            var filter = option.filter((el, index) => {                       
                    return el.toString().toLowerCase().startsWith(itemValue);
                });
            
            if(event.keyCode === 13){
                if(isMax[arraySelector]){

                    if(defaultValues[arraySelector].length < parseInt(isMax[arraySelector])){                                                      
                        if(!defaultValues[arraySelector].includes(event.target.value) && event.target.value !== ''){
                            defaultValues[arraySelector].push(event.target.value);
                            optionValues[arraySelector].push(event.target.value);
                            insertSearchItem();                
                            hiddenInput.value = JSON.stringify(defaultValues[arraySelector]);
                            value.value = '';
                            document.querySelectorAll('.directorist-select__dropdown').forEach(el => el.classList.remove('directorist-select__dropdown-open'));                          
                        }
                    } else {                            
                        item.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                        if(e.target.closest('.directorist-select')){

                            e.target.closest('.directorist-select').querySelector('.directorist-select__container').classList.add('directorist-error');
                            e.target.closest('.directorist-select').querySelector('.directorist-error__msg').innerHTML = `Max ${isMax[arraySelector]} Items Added `;
                        }
                    }
                } else {
                    if(!defaultValues[arraySelector].includes(event.target.value) && event.target.value !== ''){
                        defaultValues[arraySelector].push(event.target.value);
                        optionValues[arraySelector].push(event.target.value);
                        insertSearchItem();                
                        hiddenInput.value = JSON.stringify(defaultValues[arraySelector]);
                        value.value = '';
                        document.querySelectorAll('.directorist-select__dropdown').forEach(el => el.classList.remove('directorist-select__dropdown-open'));                          
                    }
                }
                
            }
                
            var elem = [];
            optionValues[arraySelector].forEach((el, index) => {
                filter.forEach(e => {                            
                    if(el.toLowerCase() == e.toLowerCase()){
                        elem.push(el);                                            
                    } 
                });    
            });
            
            var item2 = '<ul>';                
            elem.forEach((el) => {                        
                item2 += `<li data-key="${el}" class="directorist-select-item-hide">${el}</li>`;
            });
            item2 += '</ul>';
            
            var popUp = item.querySelector('.directorist-select__dropdown--inner');
            popUp.innerHTML = item2;
            var li = item.querySelectorAll('li');

            
            li.forEach((element, index) => {
                element.classList.remove('directorist-select-item-show');
                element.classList.add('directorist-select-item-hide');
                if(defaultValues[arraySelector].includes(element.getAttribute('data-key'))){                          
                    element.classList.add('directorist-select-item-show');
                    element.classList.remove('directorist-select-item-hide');
                }                       
                element.addEventListener('click', (event) => {                            
                    sibling.querySelector('.directorist-select__dropdown--inner').classList.remove('directorist-select__dropdown.open');                                                
                });
            });
        });
             
        eventDelegation('click', 'li', function(e){
            var index = e.target.getAttribute('data-key');
            var closestId = e.target.closest('.directorist-select').getAttribute('id');
            
            document.querySelectorAll('.directorist-select__dropdown').forEach(el => el.classList.remove('directorist-select__dropdown-open'));
                                                 
            if(isMax[closestId] === null && defaultValues[closestId]){
                defaultValues[closestId].filter(item => item == index ).length === 0 &&  defaultValues[closestId].push(index);
                
                hiddenInput.value = JSON.stringify(defaultValues[closestId]); 
                e.target.classList.remove('directorist-select-item-hide');
                e.target.classList.add('directorist-select-item-show');
                insertSearchItem();
            } else {   
                if(defaultValues[closestId])
                if(defaultValues[closestId].length  < parseInt(isMax[closestId])){                                                      
                    defaultValues[closestId].filter(item => item == index ).length === 0 &&  defaultValues[closestId].push(index);
                   
                    hiddenInput.value = JSON.stringify(defaultValues[closestId]);                        
                    e.target.classList.remove('directorist-select-item-hide');
                    e.target.classList.add('directorist-select-item-show');
                    insertSearchItem();
                } else {                            
                    item.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                    e.target.closest('.directorist-select').querySelector('.directorist-select__container').classList.add('directorist-error');
                    e.target.closest('.directorist-select').querySelector('.directorist-error__msg').innerHTML = `Max ${isMax[arraySelector]} Items Added `;
                }
            }
        });
    });

    eventDelegation('click', '.directorist-item-remove', function(e){
        var li = item.querySelectorAll('li');
        var closestId = e.target.closest('.directorist-select').getAttribute('id');
        
        defaultValues[closestId] = defaultValues[closestId] && defaultValues[closestId].filter(item => item != e.target.getAttribute('data-key'));
        if((defaultValues[closestId] && defaultValues[closestId].length) < (isMax[closestId] && parseInt(isMax[closestId]))){
            e.target.closest('.directorist-select').querySelector('.directorist-select__container').classList.remove('directorist-error');
            e.target.closest('.directorist-select').querySelector('.directorist-error__msg').innerHTML = '';
        }

        li.forEach((element, index) => { 
            element.classList.remove('directorist-select-item-show');
            element.classList.add('directorist-select-item-hide');
            if(defaultValues[closestId].includes(element.getAttribute('data-key'))){                          
                element.classList.add('directorist-select-item-show');
                element.classList.remove('directorist-select-item-hide');
            }
        });
        insertSearchItem();                
        hiddenInput.value = JSON.stringify(defaultValues[closestId]);
    });            
}

function eventDelegation(event, psSelector, program) {
    document.body.addEventListener(event, function(e) {
        document.querySelectorAll(psSelector).forEach(elem => {
            if (e.target === elem) {
                program(e);
            }
        })
    });
}
</script>

<style>
body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
*, :after, :before {
    box-sizing: border-box;
}
.select-item-list{
    display: flex;
    padding: 100px 30px;
}
.select-item-list .select-item-list--single{
    padding: 20px 50px;
    width: 100%;
}
.select-item-list .select-item-list--single h4{
    font-size: 18px;
    
}
.directorist-select{
    min-height: 42px;
}
.directorist-select__container {
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    padding: 3px;
    min-width: 300px;
    background: #fff;    
}

.directorist-select__container .directorist-select__label{
    border-radius: 5px;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 4px;
    min-height: 42px;
    padding: 0 15px;
    background-color: #fff;
    border: 1px solid #ececec;
    cursor: pointer;
}

.directorist-select__container .directorist-select__label img,
.directorist-select__container .directorist-select__label i{
    max-width: 15px;
    width: 100%;
}

.directorist-select__container .directorist-select__selected-list .directorist-select__selected-list--item .directorist-item-remove i,
.directorist-select__container .directorist-select__selected-list .directorist-select__selected-list--item .directorist-item-remove span.fa,
.directorist-select__container .directorist-select__selected-list .directorist-select__selected-list--item .directorist-item-remove span.la{
    pointer-events: none;
}

.directorist-select__dropdown{
    background: #fff;
    box-shadow: 0 10px 40px rgb(134 142 174 / 30%);
    padding: 15px;
    box-sizing: border-box;
    display: none;
    margin-top: 4px;
    max-height: 400px;
    overflow-y: auto;
}
.directorist-select__dropdown .directorist-select__search{
    height: 42px;
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 8px;
    border: 1px solid #ececec;
}
.directorist-select__dropdown .directorist-select__search:focus{
    outline: none;
    box-shadow: 0 0;
}
.directorist-select__dropdown .directorist-select__search.directorist-select__search--hide{
    display: none;
}

.directorist-select__dropdown.directorist-select__dropdown-open{
    display: block;
}

.directorist-select__dropdown .directorist-select__dropdown--inner ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.directorist-select__dropdown .directorist-select__dropdown--inner ul li{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
}
.directorist-select__dropdown .directorist-select__dropdown--inner ul li .directorist-select-dropdown-item-icon img{
    max-width: 20px;
}
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label{
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ddd;
    align-items: center;
    padding: 2.5px 15px;
    border-radius: 4px;
    margin: -4px;
    min-height: 42px;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label input{
    font-size: 14px;
    border: 0 none;
    width: auto;
    padding: 5px;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label input:focus{
    outline: none;
    border: 0 none;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label .directorist-select__selected-list{
    display: flex;
    flex-wrap: wrap;
    margin: -4px 6px -4px -4px;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label .directorist-select__selected-list,
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label .directorist-select__search{
    margin: 0;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label .directorist-select__search{
    flex: auto;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label .directorist-select__selected-list .directorist-select__selected-list--item{
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    padding: 5px 8px;
    background-color: #3C3D58;
    border-radius: 4px;
    min-height: 17px;
    margin: 4px;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__label .directorist-select__selected-list .directorist-select__selected-list--item i{
    color: #fff;
}
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__dropdown{
    display: none;
}
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__dropdown.directorist-select__dropdown-open{
    display: block;
}
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__dropdown{
    background: #fff;
    box-shadow: 0 10px 40px rgb(134 142 174 / 30%);
    padding: 15px;
    box-sizing: border-box;
    margin-top: 2px;
    max-height: 400px;
    overflow-y: auto;
}
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__dropdown ul{
    padding: 0;
    margin: 0;
    list-style: none;
}
.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__dropdown ul li{
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
}

.directorist-select.directorist-select-multi .directorist-select__container .directorist-select__dropdown ul li.directorist-select-item-show{
    background-color: #F4F5F7;
    border-radius: 4px;
}
span.directorist-select__selected-list--item:first-letter {
    text-transform: capitalize;
}

/* Directorist Error */
.directorist-select__container.directorist-error .directorist-select__label{
    border-color: rgb(199, 6, 6) !important;
}
.directorist-error .directorist-error__msg{
    display: inline-block;
    margin-top: 12px;
    font-size: 14px;
    color:rgb(199, 6, 6);
}
</style>