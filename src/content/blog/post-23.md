---
layout: ../../layouts/BlogpostLayout.astro
title: 'Time my code'
pubDate: '09/02/2025'
description: 'Some numbers of timing the update_fractal() function to be fully executed.'
---
## Time my code
I timed my update_fractal() function for different scenarios in the final code using the time module from python. 
\
\
What? I only changed the max_levels, nothing else has changed yet. 
\
Amount times executed? 3 times
\
This is the average time per level that the update_fractal() takes to execute:
| max_level | average (in seconds)|
| --- | --- |
| 0 | 0.0055 sec |
| 1 | 0.0154 sec |
| 2 | 0.1101 sec |

\
What? I change the rotation for the 3 axes, then I change the max_level:
\
Amount times executed? 3 times
\
Results - time it takes update_fractal() to execute:
| max_level | first time | second time | third time |
| --- | --- | --- | --- |
| 0 | 0.0080 sec | 0.0085 sec | 0.0099 sec |
| 1 | 0.0177 sec | 0.0198 sec | 0.0232 sec |
| 2 | 0.1376 sec | 0.1372 sec | 0.1461 sec |

\
What? I empty the canvas and I change my desired level and then change all properties.
| max_level | amount times update_fractal executed | min. value | max. value | average |
| --- | --- | --- | --- | --- |
| 0 | 54 | 0.0010 sec | 0.0108 sec | 0.0018 sec |
| 1 | 69 | 0.0065 sec | 0.0319 sec | 0.0096 sec |
| 2 | 42 | 0.0816 sec | 0.5206 sec | 0.3599 sec |

\
Conclusion: I find that with max_level = 2, things are a lot harder when I want to change things quickly. It's just about right. So you have to be a bit careful to adjust things, a bit more patient to adjust things.
\
\
What? I also timed the time to calculate everything in my refactored matplotlib project (without interactions).
\
Amount times executed? 6 times
\
Result:
| project | average |
| --- | --- |
| without NumPy | 0.1591 sec |
| with NumPy | 0.0914 sec|

\
Conclusion: when refactored with NumPy, the code is faster than without NumPy. NumPy then also makes for faster calculations because it uses N-dimensional arrays and no python list to go over.