# Plot Styles

All files in this folder should follow the same interface, exporting a function
constructor that takes style options as parameters and returns a drawing function,
which takes the following parameters:

* context [Object] canvas context to draw into
* options [Object] object containing drawing options
* options.x [number] X center point
* options.y [number] Y starting point
* value [number] Relative height
* max [number] Max height
