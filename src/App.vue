<template>
  <a-layout class="layout">
    <a-layout>
      <a-layout-header style="padding-left: 20px; border: 1px solid var(--color-border)">
        PBH
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-layout-content><RouterView /></a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {}
</script>
<style scoped>
.layout {
  height: 500px;
  background: var(--color-fill-2);
}
.layout :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout :deep(.arco-layout-footer),
.layout :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
