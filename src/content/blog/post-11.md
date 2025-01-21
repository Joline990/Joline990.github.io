---
layout: ../../layouts/BlogpostLayout.astro
title: 'Performance & Blender Python API'
pubDate: '21/01/2025'
description: 'Monday & today I searched how to improve the performance so I can see multiple iterations/levels of the 3d fractal and as a change, I made in the Python API of Blender a rhombohedron fractal.'
---
## Performance
I noticed that on iteration 3, it failed to render and move the fractal. On a blog post (https://medium.com/the-research-nest/measuring-the-performance-of-your-python-program-3d19fd759813, https://medium.com/the-research-nest/optimizing-memory-usage-in-python-e8a30e0dddd3), I found several ways to start measuring performance. 

### Measure memory usage
1 of those ways is to use the **package 'sys**’ that measures memory usage.
```python
    import sys

    def draw_rhombohedron():
        rhombohedrons = generate_rhombohedron(0, 0, 0, 1, max_level)

        memory_used_bytes = sys.getsizeof(rhombohedrons) # know size of rhombohedrons array
        memory_used_kb = memory_used_bytes / (1024)
        print(f'Memory used by rhombohedrons: {memory_used_kb:.2f} KB')

        # ...code below
```
These were the outcomes:
| max_level | size |
| --- | --- |
| 0 | 0.06 KB |
| 1 | 0.24 KB |
| 2 | 3.62 KB |
| 3 | 66.90 KB |

It makes sense that at level 1 it takes up less memory than at level 2, because that's when a lot more rhombohedrons are added. Only this number increase dramatically!
### Optimization
Different articles gave different techniques how to optimize in Python.
- Maybe using a **generator with yield**
> **yield** is a keyword in Python.
> It works like a return, but a special one. If it finds something, it sends it and then continues in the loop. It remembers where it left off in the loop and continues. This is different from ordinary functions that start over every time you call them.
- **NumPy?** -> Python library that works with arrays, to make quick & complex calculations.
    - import numpy as np
    - written in C
    - np.array() → place around an array to optimize
- **Change Matplotlib by other library** like PyOpenGL, Panda3D, VisPy → more efficient 3d rendering (https://medium.com/@alexeyyurasov/3d-modeling-with-python-c21296756db2)

I tried using **PyOpenGL with PyGame** instead of Matplotlib. But the computer was running slower. When I asked this in forums, **shaders** was named among other things so that it can be run on the GPU instead of the CPU. At the moment, it seems very complicated to work with this.
```python
    # basic pygame window setup
    import pygame

    pygame.display.set_caption("Menger Sponge")
    screen = pygame.display.set_mode((600,600))

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
        
        #update stuff
        screen.fill((255,255,255))
        # draw stuff

        pygame.display.update()
```

- Maybe coding in C for faster results?? -> Python is slower than **compiled languages** like C++ or Java, but it is simpler to use & rapid development
<br><br>
I was also thinking of maybe **not drawing all the faces**, but only if they are in the face of the larger 3d shape. That way internal faces that you don't see anyway can be removed. That way, less has to be drawn and you can still see the shape. I have no idea how to do this.

### Conclusion
The limiting factor of rendering fractals is the speed of the graphics rendering. This is something I had encountered before, so wasn't surprised when it was rendering very slow at iteration/level 3. But I should be able to find a solution to it... because when we want to add interaction, it must be fast enough.
## Blender's Python API
First, I drew a cube using a tutorial (https://www.youtube.com/watch?v=mN3n9b98HMk), then made a menger sponge by combining the code from https://blenderartists.org/t/menger-sponge/605195/7 (updated some items according to new version of blender) and my Python menger sponge code.
\
\
It was easy to change the cube and menger sponge code to a rhombohedron, as I had already created the code files in Python (see last week). Although I had a few errors, they were easy to solve because they were clearly described in the ‘terminal’.
\
\
Have also already looked up some sources on what things to watch out for when making something in blender for 3d printing, but need to read up further on this.
\
\
Also, the rhombohedrons are now all separate and do not form 1 mesh (see image below). I asked this on a forum if people know how to put this into 1 mesh like the menge sponge where a cube primitive is used.
<figure>
  <img src="/rhombohedron/blender.png" alt="Rhombohedron fractal in Blender" title="Rhombohedron fractal in Blender">
</figure>
