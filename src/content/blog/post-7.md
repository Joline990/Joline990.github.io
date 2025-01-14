---
layout: ../../layouts/BlogpostLayout.astro
title: ''
pubDate: '14/01/2025'
description: ''
---
## Something about the investigated fractals
### L-systems, Newton & Burnship fractal
There are a lot of fractals, yesterday (13 January 2025), I went through the documentation of the L-systems on the Nature of Code website. I didn't go into it any further, like the Newton fractal & Burnship fractal where I took half an hour for each to find out how they are created. I found it very complicated to understand mathematically and so I don't go further into it here. The last fractal I looked at was the Julia set.
### Julia set
Did you know that the **Mandelbrot contains** several sets of the **Julia set**?
\
\
Just type ‘julia set in mandelbrot’ into your search engine and you'll see where the different Julia sets can be found in the Mandelbrot. This is no coincidence, as Benoit Mandelbrot came up with this fractal from studying **Gaston Julia** with his Julia sets.  The Mandelbrot uses the same formula as the Julia set, but **with the Julia set, c is a fixed complex number**. A Julia set in the Mandelbrot is called **connected Julia set**, outside it (growing to infinity) it is called a **disconnected or dust Julia set**. The Julia sets have also been named like the Douady rabbit. And that's not all: the iconic Mandelbrot can also be created by other equations. We call this the phenomenon of **Universality of Mandelbrot**. see: https://fractalfoundation.org/OFC/OFC-5-5.html
## Making a choice
After taking a closer look at several fractals (Koch curve, Cantor set, Sierpinski Triangle, Mandelbrot & Julia set, fractal trees...), I now want to focus on 1 fractal per fractal experience.
\
\
Since I got the feedback to have a look in **TouchDesigner** (since it was not in my software list), I first looked for some inspiration on how fractals can take shape in TouchDesigner by looking up tutorials. In particular, I came across fractal trees that were being done a lot with and I think something fun might be made out of that. I think it would also be fun to look into **audio-reactive** projects in TouchDesigner to be able to make the fractal tree change based on sound like https://www.youtube.com/watch?v=bb4sKuAWYio.
\
\
I decide not to make anything for the Mandelbrot or a specific Julia set, because there is already a lot of information about that and after making the Mandelbulb using a Nature of Code tutorial, I didn't feel like I can do many new things with it. I found particularly inspiring the article where White & Nylander were looking for a 3D formula of the Mandelbrot and showed different renders depending on power & iteration.<br><br>
<figure>
  <img src="/mandelbulb_article.png" alt="mandelbrot different iterations" title="Mandelbrot iterations">
  <img src="/mandelbulb_article2.png" alt="mandelbulb (power 3) different iterations" title="Mandelbulb iterations">
  <figcaption>From: https://www.skytopia.com/project/fractal/2mandelbulb.html </figcaption>
</figure>

## Choice made
I decided to delve further into **Sierpinski fractals**, i.e. fractal where a similar shape in the centre is removed again and again. But a lot has already been created around that type as well... I'm trying to let go of the idea that I want to make something innovative, because fractals drawn by computer have been around for a long time. 
> **But for me it's new**, so I want to learn it. I don't want to copy code, because otherwise I won't learn anything either. 

I was already looking at & programming the Sierpinski Triangle, and had found in my research that there are several variations (see blog post:  <a href="/post-5/">Sierpinski, trees & fractal dimension</a>). I looked at those variations to see if there was anything fun to do with them. Just following tutorial and writing code along, I didn't want that. I really wanted to understand it.
<br><br>
<figure>
  <img src="/rhombus/reference.svg" alt="reference image" title="inspiration source">
  <figcaption>Left: 2 Sierpinski triangle form a rhombus, right: my idea.</figcaption>
</figure>
I saw how 2 Sierpinski Triangles were positioned underneath each other to form a rhombus. From this, I came up with a challenge for myself: 

> **#Challenge 1 - Sierpinski Rhombus fractal**: Program (first in Processing) a rhombus dividing it x-number of times into 9 equal rhombuses and remove the middle one. While doing so, make sketches so I can also explain to someone else exactly what is happening mathematically (e.g. why that number and not another?).
>
No examples of this fractal could be found online 🙂. So that was good. Even though I know it will look very similar to the Sierpinski Carpet.
## Sierpinski Rhombus fractal
### Explanation
We want our rhombus in the middle of the canvas -> use `translate(width/2, height/2);`.
<figure>
  <img src="/rhombus/step1-translate.svg" alt="Moving grid center" title="Move grid center">
</figure>
<br>

In Processing, you can use `quad()` for a four-sided polygon. We need to enter 4 coordinates for this. We can find this by using the large & small diagonal.<br><br>
<figure>
  <img src="/rhombus/step2-quad.svg" alt="Use of quad() in Processing" title="A rhombus drawn in Processing">
  <figcaption>quad(0, -D/2, d/2, 0, 0, D/2, -d/2, 0);</figcaption>
</figure>
<figure>
  <img src="/rhombus/iteration1->iteration2.svg" alt="First two iterations of the rhombus" title="Iterations rhombus">
</figure><br>
For the different iterations, we need to find the new coordinates. We do this by using our diagonals again.
<figure>
  <img src="/rhombus/step3-1.svg" alt="step 3: find coordinates - step 1" title="Find coordinates">
  <figcaption>Left: our large diagonal is split into 6 equal lengths. Do the same for the small diagonal.<br>
Right: you get the values indicated above & to the right.</figcaption>
</figure>
Now, we know all the coordinates of all the figures that were made by dividing a rhombus into 9 equal rhombuses.
<br><br>
Let's draw the little rhombus at the top (coloured in figure) in two different ways: (1) with centre P(0,0) and (2)with centre P(0, -D/3) where there is a displacement first.
<figure>
  <img src="/rhombus/step3-2.svg" alt="step 3: find coordinates - step 2" title="Find coordinates">
</figure>
<br><br>
As we remove the middle rhombus each time, we move our centre from the original rhombus to the newly created rhombus (see above). This way, our calculations are not unnecessarily complicated. 
<figure>
  <img src="/rhombus/lettersystem-rhombus.svg" alt="Starting on top, then going clockwise for each letter (A -> H). Inside the middle rhombus is 'remove' written." title="Lettersystem">
  <figcaption> Left: centres of the panes.<br>
Right: letter system I use to draw the 8 different panes.</figcaption>
</figure>

> To **iterate over our rhombuses**, I use this function:<br>
> drawRhombus(x + x coordinate middle point,  y + coordinate middle point, newD, newd, iteration + 1);<br><br><br>
> **For A this is**: drawRhombus(x + 0,  y + -D/3, newD, newd, iteration + 1); => drawRhombus(x,  y - D/3, newD, newd, iteration + 1);<br><br>
> **For F this is**: drawRhombus(x - d/6,  y + D/6, newD, newd, iteration + 1);<br><br>
> !!! Don't change D or d into newD or newd, because we are looking at our previous iteration.
> We give both our newD and newd in the function, because those values change and aren't equal.

<figure>
  <img src="/rhombus/shrink-rhombus.svg" alt="a rhombus will be 1/3 smaller." title="rhombus iteration size">
  <figcaption> A rhombus shrinks by 1/3 from its previous size.</figcaption>
</figure>
Now that we have seen it mathematically, we can put everything together in Processing. Using my demo Sierpinski2, I managed to implement the rhombus.
<br><br>
To see the code, go to my Github.

### Reflection
Now that I put the code of the Sierpinski2 demo next to this one, they are very similar. So I had used this one as a reference, but had almost not looked at it. The only difference is that Sierpinski2 used triangles and now it uses diamonds.
\
\
In hindsight, it was actually not difficult at all. The hardest part is finding the coordinates of the centres of the diamonds, but with the help of the two diagonals (I figured it out by myself!) it worked.

<figure>
  <img src="/rhombus/endresult.png" alt="final result" title="Final result">
  <figcaption>Final result: from iteration 1 to 5.</figcaption>
</figure>