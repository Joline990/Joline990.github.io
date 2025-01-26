---
layout: ../../layouts/BlogpostLayout.astro
title: 'Reflection week 3'
pubDate: '26/01/2025'
description: 'It is time for my weekly reflection!'
---
## Done today
- tried to understand color material better (see blog post)
- added rotation & size changer (see blog post)
## Reflection week
### My week in a nutshell
#### Better performance
This week, I tried to get a **better performance** for my rhombohedron fractal. On forums, people advised me to work with **shaders**. I had created a cube & menger sponge fractal in **PyOpenGL** in combination with **PyGame** because Matplotlib is not really meant for 3d graphics. Since shaders take a lot of time to learn and I would also like to get interactivity in them, I decided not to delve into shaders. At the coach moment, feedback was given to **refactor the code** and work with **precomputed values**. I should also **collect some more numerical data** such as whether it is being re-rendered and every how many seconds, how many coordinates, rhombohedrons... are drawn? I also added **NumPy** in the code because it is faster and optimised than python loops. 
\
\
At some point, I stopped using it because I wasn't sure whether the code was refactored properly or not. I could go on like this till infinity, especially when I repeatedly asked ChatGPT to refactor the code.
#### My stuck moment
I then started looking for how to do interaction and then got stuck with my project for a while. I had looked up information about interaction in Python and Blender Python API, but I was just overwhelmed and didn't really see how to get started with interaction. 
> I felt again like in week 1 that I was doing all sorts of things but it wasn't getting me any closer.

#### Back on track
But during that search I came across **custom panels in Blender Python API**. Then I saw it again. Now what if I start with a simple interaction, for example, you are standing on a button and a cube in the 3D viewport? From then on I felt like I was on the train again. I decided to post a blog post every day, even if I didn't have much and was mainly researching, because ultimately this is also part of the process. Of course, I hope I don't have to do this again, but it is something I have learned and felt extra hard in this project. 
> **Learning**: the research days are also part of the process. Sometimes you feel like you haven't achieved anything at the end of the day, while you've spent hours researching but not coming up with anything, well those days are part of it too!
<br><br>

I've been wanting to start tweaking my rhombohedron fractal, but since I wanted to summarize and write down what I had done so I can remember it in a few days, I thought it would be better to play with a simple shape for now.
#### More leisure time?
I've been trying to take more leisure time. Some days this worked better than others, but I did not work more than 9 hours per day, as was sometimes the case last week.
### Terms of the week
- Face culling
- Custom Panel
- (Custom) Operator
- Custom properties
- Python console
### Planning
I'm on schedule, I think. I don't yet know if I will be able to link audio into the project as my research question contains, but we will see. I would first like to go further with interaction, because now I have only added it to a primitive cube of blender itself.

### Next steps
1. Add MIDI controller to have visual control
2. Change primitive cube by cube with vertices -> copy interaction and see if it still work, or if I need to make adjustments.
3. Change cube to rhombohedron fractal (skip menger sponge to go a bit faster) -> add interaction (copy, but also new interactions from my interactivity list)

- Prepare 3d file to 3d print - if my interaction process goes faster & if I still wanted...

- And also update my roadmap!

### Goal for next week
I can control my rhombohedron fractal visually with a MIDI controller.