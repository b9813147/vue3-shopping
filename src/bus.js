import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// _this.$bus.$emit('message:push')
// Message(String) 訊息內容
// status(String) alert 的樣式