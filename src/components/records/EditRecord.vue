<template>
  <teleport to="#dialog">
    <transition name="dialog">
      <div class="dialog-mask" v-if="show">
        <div class="dialog-wrapper">
          <div class="dialog-container">
            <header>
              <h2>{{ userInput.name }}</h2>
            </header>

            <section class="dialog-body">
              <div v-if="isSaving">
                <base-spinner></base-spinner>
              </div>
              <form @submit.prevent="submitForm">
                <div
                  class="form-control"
                  :class="{ invalid: !formIsValid.nameField }"
                >
                  <label for="name">Name</label>
                  <input
                    v-model.trim="userInput.name"
                    type="text"
                    maxlength="16"
                    class="name"
                    id="name"
                    @blur="clearInvalidName"
                  />
                  <p v-if="!formIsValid.nameField">Name must not be empty</p>
                </div>
                <div class="form-control">
                  <label for="desc">Description (optional)</label>
                  <textarea
                    v-model.trim="userInput.description"
                    maxlength="128"
                    class="desc"
                    id="desc"
                  >
                  </textarea>
                </div>

                <div class="form-control">
                  <label for="level">Choose a Level</label>
                  <select v-model="userInput.level" @change="changeDueDate">
                    <option
                      v-for="level in levels"
                      :key="level.text"
                      :value="level.value"
                    >
                      {{ level.text }}
                    </option>
                  </select>
                </div>

                <div class="form-control">
                  <h3>Revision counter {{ userInput.counter }}</h3>
                </div>

                <div
                  class="form-control"
                  :class="{ invalid: !formIsValid.dateField }"
                >
                  <label for="date">Revision date</label>
                  <input
                    v-model="userInput.revDate"
                    type="date"
                    class="date"
                    id="date"
                    @blur="clearInvalidDate"
                    @change="changeDueDate"
                  />
                  <p v-if="!formIsValid.dateField">
                    Date must not be in future
                  </p>
                </div>

                <div class="form-control">
                  <h3>Next Due Date {{ userInput.dueDate }}</h3>
                </div>

                <div class="form-control">
                  <h3>Date Added {{ userInput.dateAdded }}</h3>
                </div>

                <div class="menu">
                  <base-button>Save</base-button>
                </div>
              </form>
            </section>
            <div class="menu">
              <base-button @click="openDeleteWarning" mode="alert"
                >Delete</base-button
              >
              <base-button @click="resetForm">Cancel</base-button>
            </div>
            <teleport to="#dialog">
              <transition name="modal">
                <delete-warning
                  v-if="showDeleteWarning"
                  @close="closeDeleteWarning"
                  @delete="deleteEntry"
                >
                </delete-warning>
              </transition>
            </teleport>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { DateTime } from 'luxon'
import DeleteWarning from './DeleteWarning.vue'
import calculateDueDate from '../../utilities/calculateDueDate.js'

export default {
  name: 'EditRecord',
  props: ['show', 'id'],
  emits: ['close'],
  components: {
    DeleteWarning,
  },
  data() {
    return {
      selectedRecord: {},
      levels: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
      ],
      formIsValid: {
        nameField: true,
        dateField: true,
      },
      userInput: {},
      showDeleteWarning: false,
      isSaving: false,
    }
  },
  created() {
    this.selectedRecord = this.$store.getters.records.find(
      (record) => record.id === this.id
    )
    this.userInput = { ...this.selectedRecord }
  },
  updated() {
    this.selectedRecord = this.$store.getters.records.find(
      (record) => record.id === this.id
    )
    this.userInput = { ...this.selectedRecord }
  },
  methods: {
    clearInvalidName() {
      this.formIsValid.nameField = true
    },
    clearInvalidDate() {
      this.formIsValid.dateField = true
    },
    changeDueDate() {
      this.userInput.dueDate = calculateDueDate(
        this.userInput.level,
        this.userInput.revDate
      )
    },
    validateName() {
      this.formIsValid.nameField = true
      if (this.userInput.name === '') {
        this.formIsValid.nameField = false
      }
    },
    validateDate() {
      this.formIsValid.dateField = true
      const today = DateTime.now()
      const inputRevDate = DateTime.fromISO(this.userInput.revDate)
      const diff = inputRevDate.diff(today).toObject()
      if (diff.milliseconds > 0) {
        this.formIsValid.dateField = false
      }
    },
    async submitForm() {
      this.isSaving = true
      this.validateName()
      if (!this.formIsValid.nameField) {
        return
      }
      this.validateDate()
      if (!this.formIsValid.dateField) {
        return
      }
      await this.$store.dispatch('editRecord', this.userInput)
      this.resetForm()
      this.isSaving = false
      this.$emit('close')
    },
    resetForm() {
      this.userInput = { ...this.selectedRecord }
      this.formIsValid.nameField = true
      this.formIsValid.dateField = true
      this.$emit('close')
    },
    openDeleteWarning() {
      this.showDeleteWarning = true
    },
    closeDeleteWarning() {
      this.showDeleteWarning = false
    },
    deleteEntry() {
      this.$store.dispatch('deleteRecord', this.id)
      this.showDeleteWarning = false
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  /* display: flex; */
}

/* .dialog-wrapper {
  justify-content: center;
} */

.dialog-container {
  width: 60%;
  margin: 5rem auto;
  padding: 5rem 6rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  z-index: 50;

  border: none;
}

.diallog-body {
  margin: 20px 0;
}

header {
  background-color: #2074a8;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

.menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>