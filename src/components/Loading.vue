<template>
  <div class="loading">
    <div class="text">加载中</div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes dot
{
	0%   {
    content: '.'
  }
	33%  {
    content: '..'
  }
	66%  {
    content: '...'
  }
}
.text {
  width: 100px;
  &::after {
    content: ' ';
    animation: dot 1.5s infinite;
  }
}
</style>