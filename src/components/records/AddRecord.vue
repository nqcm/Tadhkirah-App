<template>
  <teleport to="body">
    <div
      class="modal-bg"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    ></div>
    <div class="dialog">
      <header>
        <h2>Add a new record</h2>
        <div class="image">
          <img :src="require('@/assets/images/logo-graphic.png')" alt="" />
        </div>
      </header>

      <section class="form">
        <form @submit.prevent="submitForm">
          <div class="form-control" :class="{ invalid: !formIsValid }">
            <label for="name">Name </label>
            <input
              v-model.trim="name"
              type="text"
              autofocus
              placeholder="Name of Surah / Hizb / Portion"
              maxlength="16"
              class="name"
              id="name"
              @blur="clearInvalidForm"
            />
            <p class="error-message" v-if="!formIsValid">
              Name must not be empty
            </p>
          </div>

          <div class="form-control">
            <label for="desc">Description (optional)</label>
            <textarea
              v-model.trim="desc"
              type="text"
              placeholder="Notes or description for yourself"
              maxlength="128"
              class="desc"
              id="desc"
            >
            </textarea>
          </div>

          <div class="form-control">
            <label for="level">Choose a Level</label>
            <select v-model="levelInput">
              <option
                v-for="level in levels"
                :key="level.text"
                :value="level.value"
              >
                {{ level.text }}
              </option>
            </select>
          </div>

          <div class="buttons">
            <base-button>Add</base-button>
            <base-button @click="$emit('close')">Cancel</base-button>
          </div>
        </form>
      </section>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'AddRecord',
  emits: ['close'],
  data() {
    return {
      levels: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
      ],
      name: '',
      desc: '',
      levelInput: '',
      formIsValid: true,
    }
  },

  methods: {
    clearInvalidForm() {
      this.formIsValid = true
    },
    validateForm() {
      this.formIsValid = true
      if (this.name === '') {
        this.formIsValid = false
      }
    },
    fillMissingInfo() {
      if (this.levelInput === '') {
        this.levelInput = 1
      }
    },
    submitForm() {
      this.validateForm()
      if (!this.formIsValid) {
        return
      }
      this.fillMissingInfo()
      const formData = {
        name: this.name,
        description: this.desc,
        level: this.levelInput,
      }
      this.$store.dispatch('addRecord', formData)
      this.$emit('close')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-bg {
  @apply fixed
          inset-0
          h-screen
          w-full
          bg-grey-dark
          bg-opacity-80
          z-10;
}

.dialog {
  @apply bg-grey-medium
          text-white
          flex
          flex-col
          md:flex-row
          fixed
          top-0 md:top-12
          left-0 md:left-1/4
          w-screen md:w-1/2
          h-screen md:h-3/4
          z-50
          m-0
          p-0;
}

header {
  @apply bg-grey-medium
          text-gold
          w-full
          p-10;
}

header h2 {
  @apply text-center
          text-xl
          font-bold
          my-4;
}

img {
  @apply w-48
          mx-auto;
}

.form {
  @apply px-2
          w-11/12
          m-auto;
}

.form-control {
  @apply my-6 mx-0;
}

label {
  @apply font-semibold
          block
          mb-2;
}

input,
textarea {
  @apply block
          w-full
          bg-grey-light
          border
          border-grey-light
          font-thin
          p-2
          focus:border-gold;
}

input:focus-visible,
textarea:focus-visible {
  outline: none;
}

.invalid input,
.invalid textarea {
  @apply border-red;
}

.error-message {
  @apply font-light
          text-sm
          italic
          mt-2
          text-red;
}

select {
  @apply text-grey-dark;
}

.buttons {
  @apply flex
          space-x-8
          justify-center;
}

/* .modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
} */

/* dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 50%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
} */

/* header {
  background-color: #2074a8;
  color: white;
  width: 100%;
  padding: 1rem;
} */

/* header h2 {
  margin: 0;
} */

/* section {
  padding: 1rem;
} */

/* menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
} */

/* .form-control {
  margin: 0.5rem 0;
} */

/* label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
} */

/* input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
} */

/* input:focus,
textarea:focus { */
/* background-color: #a0dbff; */
/* outline: none;
  border-color: #2074a8;
} */

/* h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
} */
</style>
