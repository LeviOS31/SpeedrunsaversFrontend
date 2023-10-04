<template>
  <div class="footer-container">
    <p>Company ©</p>
  </div>
</template>


<script setup lang="ts">

</script>

<style scoped lang="scss">
  .footer-container{
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 4px 40px 0 rgba(63, 43, 79, 0.05);
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    
    p{
      font-family: Inter, sans-serif;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 140%;
      padding: 0.5rem;
      color: #006D7CFF;
      margin-left: 3svw;
    }
  }
</style>