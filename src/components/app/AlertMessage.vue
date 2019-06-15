<template>
    <div class="message-alert">
        <div class="alert alert-dismissible"
             :class="'alert-' + item.status"
             v-for="(item, key) in messages" :key="key">
            {{ item.message }}
            <button type="button" class="close" @click="removeMessage(key)" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
  export default {
    name   : 'Alert',
    data() {
      return {
        messages: [],
      };
    },
    methods: {
      updateMessage(message, status) {
        const timestamp = Math.floor(new Date() / 1000);
        this.messages.push({
          message,
          status,
          timestamp,
        });
        this.removeMessageWithTiming(timestamp);
      },
      removeMessage(num) {
        this.messages.splice(num, 1);
      },
      removeMessageWithTiming(timestamp) {
        const _this = this;
        setTimeout(() => {
          _this.messages.forEach((item, i) => {
            if (item.timestamp === timestamp) {
              _this.messages.splice(i, 1);
            }
          });
        }, 5000);
      },
    },
    created() {
      const _this = this;
      // 自定義名稱 'message:push'
      // message: 傳入參數
      // status: 樣式，預設值為 warning
      _this.$bus.$on('message:push', (message, status = 'warning') => {
        _this.updateMessage(message, status);
      });
      // _this.$bus.$emit('messsage:push');
    },
  };
</script>

<style scope>
    .message-alert {
        position: fixed;
        max-width: 50%;
        top: 56px;
        right: 20px;
        z-index: 1100;
    }
</style>