# dsh-hide-brand

隐藏 DSH 侧栏顶部那一行品牌区（鲸鱼标志 + `deepseek HARNESS` 字标），让「新会话」按钮直接上移，不留空白。

## 效果

| 改前 | 改后 |
| --- | --- |
| 60px 品牌行 + 品牌标识 | 该行移除，下方内容上移 |

macOS 桌面版里这一行是纯展示（不是按钮），隐藏不影响任何操作。

## 原理

两半：

- **宿主半区**（`lib/index.js`）：空实现，只用于让 loader 挂载。
- **浏览器半区**（`lib/client.js`）：注入一条 CSS ——
  `[class*="logoRow"] { display: none !important }`。

为什么不用清空 `sidebar.brand.*` slot：侧栏对这两个 slot 内置了 fallback（鲸鱼 + 本地构建标签），即使没有任何插件占据，它仍会绘制兜底内容。隐藏整行才能真正去掉那 60px。

选择器用属性匹配 `[class*="logoRow"]`，因为构建类名带哈希前缀（如 `kB3qhq_logoRow`），写死前缀会在升级后失效。

## 安装

桌面版不能用 `dsh plugin --profile desktop`。手工装：

```bash
cp -R <本仓库> ~/.dsh/profiles/desktop/node_modules/dsh-hide-brand
```

然后编辑 `~/.dsh/profiles/desktop/package.json` 两处：

```json
"dependencies": {
  "dsh-hide-brand": "file:./node_modules/dsh-hide-brand"
},
"dsh": {
  "profile": {
    "bundles": ["...原有条目", "dsh-hide-brand"]
  }
}
```

重启 DeepSeek Harness。

## 验证

1. 侧栏顶部不再有鲸鱼和字标。
2. 「新会话」按钮紧贴折叠按钮下方。
3. 折叠成 rail 时也不残留空白。

## 卸载

```bash
rm -rf ~/.dsh/profiles/desktop/node_modules/dsh-hide-brand
```

再从 `package.json` 的 `dependencies` 和 `dsh.profile.bundles` 里删掉对应条目，重启。

## 兼容性

- DSH `0.2.x`（桌面端与 Web 端同一套 client 插件机制）
- 不读写任何会话、凭据或配置数据
- 只注入一条 CSS，无网络请求、无宿主服务依赖
