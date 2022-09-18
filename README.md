

## 歪日
受VueUse启发，自己用的一些小工具，非常简陋，建议跳过

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
