<template>
    <v-empty-state
      headline="No Messages Yet"
      text="You haven't received any messages yet. When you do, they'll appear here."
      title="Check back later."
      @click:action="onClickAction"
    ></v-empty-state>
    <div class="state-empty">
        <a href="/">volver atras</a>
    </div>
  </template>
  <script setup>
    function onClickAction () {
      alert('You clicked the action button')
    }
  </script>
  
  <style>
.state-empty{
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>