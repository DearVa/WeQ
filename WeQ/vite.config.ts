import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "build") {
    console.log("vite");
  }

  console.log("~~~ THIS IS VITE ~~~")
  return {
    plugins: [vue()],
    base: "", //解决编译后白屏问题， 默认是'/'
    build: {
      outDir: "dist/src",
    }
  };
});
