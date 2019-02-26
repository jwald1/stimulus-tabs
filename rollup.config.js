import buble from "rollup-plugin-buble"
import filesize from "rollup-plugin-filesize"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"

export default {
  input: "src/tabs_controller.js",
  external: ["stimulus"],
  output: [
    {
      file: "dist/tabs-controller.js",
      format: "cjs",
      name: "StimulusTabs",
      sourcemap: true
    },
    {
      file: "dist/tabs-controller.m.js",
      format: "es",
      name: "StimulusTabs",
      sourcemap: true
    },
    {
      file: "dist/tabs-controller.umd.js",
      format: "umd",
      name: "StimulusTabs",
      sourcemap: true,
      globals: {
        stimulus: "Stimulus"
      }
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    buble({
      transforms: {
        classes: true
      },
      objectAssign: "Object.assign"
    }),
    filesize()
  ]
}
