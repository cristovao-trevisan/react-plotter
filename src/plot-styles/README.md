# Plot Styles

All files in this folder should follow the same interface, exporting a function
constructor that takes style options as parameters and returns a drawing function. Here is a sample:
```javascript
/**
 * @desc style constructor
 * @return {function}
*/
function myStyle (props) {
  // Persistent variables (like last position) go here
  // ...

  /**
   * @desc drawing function
   * @param {CanvasRenderingContext2D} context
   * @param {number} options.x Initial x
   * @param {number} options.y Initial y
   * @param {number} options.length Length
  */
  return (context, options) => {
    // Draw to context here
    // ...
  }
}
```
