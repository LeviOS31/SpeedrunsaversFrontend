<template>
  <div class="main">
    <div class="function-container">
      <div class="entry-limit-container">
        Show
        <div class="dropdown-container">
          <button class="dropdown">
            10
          </button>
          <p class="arrow-down">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px">
              <polygon points="50 62.31 11.79 24.3 6.15 29.98 50 73.59 93.85 29.98 88.2 24.3 50 62.31"/>
            </svg>
          </p>
        </div>
        entries
      </div>
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>
        <input type="text" placeholder="Search"/>
      </div>
    </div>
    <div class="table-container">
      <div class="table-header">
        <p id="id">ID</p>
        <p>Name</p>
        <p>Stock</p>
      </div>
      <div v-for="entry in props.entries" class="entry">
        <div class="information-container">
          <p id="id">{{ entry.id }}</p>
          <p>{{ entry.name }}</p>
          <p>{{ entry.count }}</p>
        </div>
        <div class="button-container">
          <button @click="openModal" class="edit">edit</button>
          <button class="delete">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
 let props = defineProps({
    entries: {
      type: Array,
      required: true
    },
   openModal: {
     type: Function,
     required: true
   }
  });
</script>

<style scoped lang="scss">
.main {
  .function-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    margin: 1.5rem auto 0;

    .entry-limit-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 140%;
      color: #171A1FFF;
      margin-left: 1rem;

      .dropdown-container {
        position: relative;

        .dropdown {
          background-color: white;
          border: none;
          box-shadow: 0 0 0 2px grey;
          border-radius: 0.2rem;
          padding-right: 4.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          cursor: pointer;
        }

        .arrow-down {
          position: absolute;
          margin: 0;
          top: 55%;
          transform: translateY(-50%);
          right: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            width: 0.9rem;
            height: 0.9rem;
            color: #171A1FFF;
          }
        }
      }
    }

    .search-bar {
      position: relative;
      margin-right: 1rem;

      svg {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.25rem;
        height: 1.25rem;
        color: #171A1FFF;
      }

      input {
        background: transparent;
        box-shadow: 0 0 0 2px grey;
        border: none;
        font-weight: 400;
        display: flex;
        align-items: center;
        padding-left: 2.5rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        border-radius: 0.3rem;
        font-size: 1.1rem;
        width: 17.5rem;
        caret-color:#006d7c;

        &::placeholder {
          opacity: 0.45;
        }
      }
    }
  }

  .table-container {
    position: relative;
    width: calc(100% - 2rem);
    margin: 0.5rem auto 0;

    .table-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      padding: 0 0.5rem;
      width: 75%;

      p {
        text-align: center;
        width: 33%;
      }

      #id {
        width: auto;
      }
    }

    .entry {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      background-color: white;
      border-radius: 0.2rem;

      &:nth-child(even) {
        background-color: #F5F5F5;
      }

      .information-container {
        display: flex;
        justify-content: space-between;
        width: 75%;
        padding: 0 0.5rem;

        p {
          width: 33%;
          text-align: center;
        }

        #id {
          width: auto;
        }
      }

      .button-container {
        position: absolute;
        right: 2rem;
        display: flex;
        align-items: center;
        align-self: center;
        gap: 0.5rem;

        button {
          padding: 0.5rem 1.25rem;
          height: fit-content;
          color: white;
          border: none;
          border-radius: 0.2rem;
          cursor: pointer;
          font-size: 1rem;
        }

        .edit {
          color: #FFFFFFFF;
          background: #ED7D2DFF;

          &:hover {
            color: #FFFFFFFF;
            background: #CC5F12FF;
          }

          /* Pressed */
          &:hover:active {
            color: #FFFFFFFF;
            background: #B1530FFF;
          }

          /* Disabled */
          &:disabled {
            opacity: 0.4;
          }
        }

        .delete {
          color: #FFFFFFFF;
          background: #E05858FF;

          /* Hover */
          &:hover {
            color: #FFFFFFFF;
            background: #DB3D3DFF;
          }

          /* Pressed */
          &:hover:active {
            color: #FFFFFFFF;
            background: #B82222FF;
          }

          /* Disabled */
          &:disabled {
            opacity: 0.4;
          }
        }
      }
    }
  }
}
</style>