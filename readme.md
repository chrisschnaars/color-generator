# Color Generator
A quick way for browsing randomly-generated colors for the web.

### How to Use
Just press the spacebar to refresh the color.

For more intricate color manipulation, use the sliders to adjust the R,G,B values.

Coming soon: were you pressing spacebar a bit too fast, and accidentally skipped by a color that caught your eye? Just press the back key to go back in time. Press forward to go back to where you were. Note that this only works with randomly-generated colors, not slider-generated colors.

### Notes of Potential Interest
The text color is determined by calculating the WCAG contrast ratio of the randomly-generated color against both black and white, and choosing whichever ratio is higher (more contrast).

Both ratios are compared to see if they meet the minimum contrast ratio of 4.5.

It would be great to not only compare these two pre-determined colors, but instead generate a text color that has an even more ideal ratio (somewhere over 7 for smaller text).

### Ideas? Implementation improvements?
Get at my via email.



https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb
https://gist.github.com/mjackson/5311256
