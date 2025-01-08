---
layout: ../../layouts/BlogpostLayout.astro
title: 'First two days'
pubDate: '08/01/2025'
description: 'This blog post lists in dots what I have been doing for the past two days. Furthermore, I go a little deeper into some of the things I found.'
---
## Summary
- Checked what software exists to make fractals (most with 2d, not much to be found with 3d).
  - list: see below
  - how to install + download
  - searched for tutorials
- Discovered new definitions like ray marching, recursion & self-similarity.
- Searched for fractal artists
  - Julius Horsthuis - dutch artist who uses Mandelblob3d
- Also found some sources of inspiration that might come in handy further down the project.
  - https://iquilezles.org/articles/
  - 3d kaleidoscope: https://www.youtube.com/shorts/OXKKVHDkEA0
  - Creating sounds in mandelbrot: https://www.youtube.com/watch?v=GiAj9WW1OfQ&list=PLh9DXIT3m6N7n4R60eJGPPPnn5LvTXQLY&index=8
  - Analog fractals with 1930’s technology: https://www.youtube.com/watch?v=Pv26QAOcb6Q&list=PLh9DXIT3m6N7n4R60eJGPPPnn5LvTXQLY&index=8
  - Changing fractal using shaders: https://mehmetcanakbay.github.io/oben_fractal-viewer/
- Tutorial I followed about someone who turns a 2d fractal into 3d using **shadertoy**: https://www.youtube.com/watch?v=__dSLc7-Cpo
He blends a shape with a 3d fractal using methods like intersection & revolution.
- Watched TED talk by the person who named the mandelbrot set: Benoit Mandelbrot.
- Briefly looked at where you can 3D print.
## Different definitions
### Ray Marching
- Different renders exist (https://www.youtube.com/watch?v=svLzmFuSBhk)
  - rasteriser: for 2d to 3d element conversion - lines & points are converted into pixels - GPU for real-time
  - ray tracing: used for animation (movies) - takes a long time to convert, but has a realistic image
  - ray marching: with **distance estimator (DE)**, the closest point know the distance and so make circles to next point - much more detailed - **from 2:38**
      - “you proceed in small steps along the ray and check how close you are to the object you are rendering”
      - “The value of the distance estimator tells you how large a step you are allowed to march along the ray, since you are guaranteed not to hit anything within this radius.”
      (http://blog.hvidtfeldts.net/index.php/2012/05/distance-estimated-3d-fractals-part-viii-epilogue/)
### Self-similarity
Self-similarity is a key trait of fractals, but self-similarity alone doesn’t make a fractal (think of a line). Fractals have a fine structure at small scales (zoom-in) & can’t be described with Euclidean Geometry.
### Recursion
Recursion is the process of repeatedly applying a rule, indicating that the outcome of one iteration becomes the starting point for the next; the output of a process is fed back into the process itself, over and over again. In code you call a function inside a function (see example below).
\
\
In maths we have a **recursion() formula** that we know from secondary school: **factorial() function**. When we want to calculate the factorial of 4, it refers itself to make calculations, until it reaches the stopping condition.
> **Attention!** Fractals continue to **infinity**, but because our computer would then crash (frozen computer due to infinite loop), **we stop when a certain condition is completed**. An exit condition is required!
>
Factorial() function
*n*! = *n*×(*n*−1)! where 0! = 1
```js
const factorial = (n) => {
  if (n <= 1) {
  return 1;  
  } else {
  return n * factorial(n - 1);
  }
}
```
## Nature of Code
I read chapter 8: fractals on nature of code website (https://natureofcode.com/fractals/, to do: trees & L-systems)
- Euclidean Geometry ↔ Geometry of Nature: fractals
  - Euclidean: basic shapes like circle, square, lines
- The focus of this article here is on 2d fractals, not 3d, but was good to understand concepts (see below: key traits of fractals).
- Fractals described in the article:
  - Koch curve
  - Cantor set
- Tried to do some exercises in `p5.js`
<figure>
  <img src="/recursion.webp" alt="Trying a recursive patter in p5js" title="recursive pattern">
  <figcaption>Left: reference image, right: what I made.</figcaption>
</figure>

### Creating a Mandelbulb point cloud in processing
7 January, I was mainly concerned with software search and then watched a tutorial ([https://www.youtube.com/watch?v=NJCiUVGiNyA](https://www.youtube.com/watch?v=NJCiUVGiNyA&t=319s)) several times and participated in the steps myself to understand how things work.
The tutorial was about the **mandelbulb** which is a 3d fractal of the 2d fractal **mandelbrot**. After making the **3d point cloud** in **processing**, I tried to understand the mandelbrot better.
\
\
In summary, the mandelbrot represents complex numbers that are bounded and do not continue to infinity. Everything in the shape (usually coloured black) is part of the mandelbrot. The operations that produce an unbounded row have outcomes that get larger and larger the more often the operation is repeated. To better understand whether or not a point exists in the mandelbrot, I refer to this source: https://www.skytopia.com/project/fractal/mandelbrot.html#pandora.
\
\
In the tutorial, **spherical coordinates** are used, since **White & Nylander's (2009) formula** is based on them.
White & Nylander’s formula: https://www.skytopia.com/project/fractal/2mandelbulb.html (scroll down). You can also see how different the mandelbulb looks like in different powers & iterations.
\
\
The tutorial works with processing (https://processing.org/).
- PeasyCam (so you can rotate the fractal around) - **Sketch > Import Library... > Add Library...**
- auto format code: edit > auto-format
- P3D → kind of render mode for rendering 3d content; you also have a default renderer, PDF, P2D and SVG; this render mode makes use of OpenGL-compatible graphics hardware
- maybe for future - connecting with Arduino: https://processing.org/tutorials/electronics/#code
## Insight
The period when people discovered and did the most with fractals is over, you can see this from the amount of articles you can find around 2008 - 2014 (a decade ago), but still some fractal artists make amazing things. It is not the easiest thing to do as it involves difficult maths and I myself am still learning all about this. But I want to try to make the most of it and see what I can do within this timeframe. Although I have to be aware that a full digital installation that is multi-sensory is too high, as was also mentioned at the first coaching moment. 
\
\
Further steps for me are (1) delimiting the scope and seeing it more as different elements, but still making it belong together so that a conclusion can be made at the end. This includes a restatement of (1.1) what I want to do (process & deliverables), (1.2) the end result and (1.3) research question. The tip I was given at the coaching moment is to focus this week on researching the different applications of fractals, how fractals work (what mathematics is behind them), 2d fractals first then 3d and still waiting to look at software. (2) Secondly, a good schedule should also be created. (e.g. 4 days I keep working on the sense ‘hearing’ and make a demo).
## Software list
- XaoS, XaoS.js (=real-time interactive fractal zoomer) https://xaos-project.github.io/
    - free, open-source, available on mac
    - zoom smoothly in any place in the fractal without long calculation
- Python (there are several libraries such as matplotlib for drawing fractals)
    - matplotlib library.
    - https://matplotlib.org/matplotblog/posts/animated-fractals/
    - https://godhalakshmi.medium.com/a-simple-introduction-to-the-world-of-fractals-using-python-c8cb859bfd6d
- Python 4 Grasshopper & Rhino 3d: https://www.youtube.com/watch?v=v3qS8loG2Wc, https://www.youtube.com/watch?v=dff29jOD-Fk
- OpenGL: https://www.youtube.com/watch?v=Dzan85c3TiM - 3d menger sponge fractal
- C++
- Processing
    - https://www.youtube.com/watch?v=NJCiUVGiNyA - Mandelbulb 3d fractal van de Coding Train
- p5.js (https://natureofcode.com/fractals/)
- https://fractalfoundation.org/resources/fractal-software/
- Julia
- Unity?
- Fractal Explorer
- Fractal Extreme
- Quadrium 1&2
- Fractint
- Mutatorkammer
- Fractalworks
- various by Stephen C. Ferguson
- Mind-boggling Fractals
- Mandelbulb3D
    - “when you load in a fractal formula and hit the "Calculate 3d" button, you can explore your fractal in 3D space” (https://www.proworks.com/blog/archive/let-s-make-awesome-3d-fractals/)
- Mandelbulber (https://sourceforge.net/projects/mandelbulber/) - normally works on mac - when trying to install it, mac doesn’t recognize it (the version would be mandelbulber2, but won’t work)
- Ultrafractal
    - https://www.ultrafractal.com/download/ (free for 30 days, after start payment)
- Incendia (https://www.incendia.net/index.php) - works only with windows 10 & 11
- JWildfire
    - creating 2d & 3d fractal flames
    - free open-source, available for mac