<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  data: () => {
    console.log("Vue.js is installed.")
    return {
      message: "This is vue!"
    }
  }
}
</script>