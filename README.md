

## 歪日
受 VueUse 启发，自己用的一些小工具

使用之前，建议先在`tsconfig.json`中添加以下内容以确保使用体验
```json5
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "exactOptionalPropertyTypes": true,
  }
}
```
有一些工具类型需要 TS 4.8+ 才能有效


### TODO
 - [x] 添加测试
 - [ ] CI：PR/Push时自动测试，release 时自动生成 changelog
 - [ ] vitepress 编写文档
 - [ ] random
 - [ ] usePointerCapture 支持函数作为 option
 - [ ] 发布时 build


FIXME: 更新 typescript eslint 时移除 `"@typescript-eslint/keyword-spacing": "off"`