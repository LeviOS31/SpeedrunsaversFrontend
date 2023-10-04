<template>
  <div class="modal-container">
    <div class="header">
      <h2>Edit Article</h2>
      <div @click="props.closeModal" class="close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="divider"/>
    <div v-for="input in inputs" class="input-container">
      <p>{{input.name}}:</p>
      <input type="text" :placeholder="input.name"/>
    </div>
    <button @click="save()" class="save">Save</button>
  </div>
  <div @click="props.closeModal" class="modal-background"/>
</template>

<script setup lang="ts">
let props = defineProps({
  inputs: {
    type: Array,
    required: true
  },
  closeModal: {
    type: Function,
    required: true
  }
});

function save() {
  console.log('save');
  props.closeModal();
}

</script>

<style scoped lang="scss">
.modal-container {
  width: 80%;
  height: 80svh;
  max-height:800px;
  max-width: 1600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  position: absolute;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 40px 0 rgba(63, 43, 79, 0.05);
  display:block;

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h2{
      font-size:1.2rem;
      font-weight: 400;
    }
    
    svg{
      cursor: pointer;
      height: 1.8rem;
      width: 1.8rem;
      color: #006d7c;
    }
  }
  
  .divider{
    width: 100%;
    background-color: #006d7c;
    height: 0.1rem;
  }
  
  .input-container{
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-top: 0.75rem;
    justify-content: space-between;
    
    input{
      padding: 1rem;
      border-radius: 0.3rem;
      font-size: 1rem;
      width: 80%;
      border: 1px solid #006d7c;
      caret-color: #006d7c;
    }
  }
  
  .save{
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 2rem;
    height: fit-content;
    color: white;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: 1rem;
    background-color: #006d7c;
  }
}

.modal-background {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display:block;
}
</style>