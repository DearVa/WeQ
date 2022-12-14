# WeQ 前端项目

## 前置

+ 确保已经安装了 `pnpm`  
    ```
    $ npm/cnpm install -g pnpm
    ```

    若终端中出现  `无法加载文件 ... 因为在此系统上禁止运行脚本`   
    请在`PowerShell`中键入 
    ``` bash 
    set-ExecutionPolicy RemoteSigned
    ``` 
    并允许

## 关于包

+ 还原
    ``` bash
    $ pnpm install
    ```   

+ 清理
    ``` bash
    $ pnpm store prune
    ```

## 关于调试
``` bash
$ pnpm electron:dev
```

## 关于构建
``` bash
$ pnpm app:build
```   
构建完成的文件将出现在 `build` 目录下   

---
# 关于编辑器插件
## Visual Studio Code
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

- [language-postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss)

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 

## 插件带来的问题
- ### " Module '*.vue' has no default export "
  
    在 *`Vetur`* 插件的 *`settings.json`* 中添加：   
    ```
    "vetur.validation.script": false
    ```

+ ### " Parsing error: '>' expected "
    
    在 *`.eslintrc.js`* 中添加:   
    ```
    "parser": "vue-eslint-parser"
    ```        
    以及 *`"parserOptions"`* 节点中添加:    
    ```
    "parser": "@typescript-eslint/parser"
    ```

--- 

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

