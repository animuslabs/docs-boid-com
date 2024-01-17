<template>
    <div v-html="renderedContent"></div>
  </template>
  
  <script>
  import katex from 'katex';
  
  export default {
    props: {
      content: {
        type: String,
        required: true
      }
    },
    computed: {
      renderedContent() {
        try {
          return katex.renderToString(this.content, { throwOnError: false });
        } catch (e) {
          return `Error rendering formula: ${e.message}`;
        }
      }
    }
  };
  </script>
  