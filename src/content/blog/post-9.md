---
layout: ../../layouts/BlogpostLayout.astro
title: 'From 2d to 3d'
pubDate: '18/01/2025'
description: 'In this blog post, I share my steps on how to transform a 2d Sierpinski Rhombus fractal to 3d. First, I drew a cube and then a rhombus in Python. Next, I first create a blender sponge and then apply the same technique for the rhombus. This is work of 2.5 days.'
---
## Cube
### Step 1: basic setup
1. Create new **.py file** (make sure Python is installed)
> **Check if Python is installed:** open a terminal and type "python3 --version".
2. Install & import libraries
    - Install with pip3 on macOs ($pip3 install...) → make sure pip3 is installed (or you'll see ‘zsh command not found’)
    - Libraries I use:
        - **matplotlib**: to generate 3d plot with axes
3. Create a plot figure
    - Place the various axes and label them. 
    - Give your figure a name 
    - plt.show() -> to show the plot
    - Later we can add some extras like background colour, remove the axes...
    ```python
    import matplotlib.pyplot as plt

    fig = plt.figure()
    ax = fig.add_subplot(projection='3d')

    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    plt.title('3D cube')

    plt.show()
    ```
    based on (https://www.bottomscience.com/how-to-plot-3d-vectors-in-python-single-multiple/).
    We get something like this:
    <figure>
    <img src="/cube/basicsetup.png" alt="Basic setup" title="Basic setup">
    </figure>
### Step 2: make a cube
How? Let's think...

We want to make a cube. We can write down the different vertices and then connect them. But... we do want it to be possible at the end to make it a menger sponge by recursively removing the middle square at the six faces (+ in the middle). So we also need our side faces... In addition, we keep in mind that we want to give the vertices different coordinates for the rhombohedron. 
\
\
In short

We need to know:
- coordinates of the 8 vertices
- 6 faces

#### Coordinates of 8 vertices
<figure>
    <img src="/cube/vertices.svg" alt="vertices of a cube" title="Vertices">
    <figcaption>Vertices of a cube with index</figcaption>
</figure>

```python
# define vertices
vertices = [
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],
    [-1, -1, -1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, -1, 1],
    [-1, -1, 1]
]
```
#### 6 faces
We can now see in which faces our vertices lie.
<figure>
    <img src="/cube/faces.svg" alt="faces of a cube" title="Faces">
    <figcaption>Image showing the different surfaces. The index corresponds to the index of the faces array.</figcaption>
</figure>

```python
#define faces
faces = [
    [vertices[0], vertices[1], vertices[2], vertices[3]],
    [vertices[0], vertices[3], vertices[7], vertices[4]],
    [vertices[4], vertices[5], vertices[6], vertices[7]],
    [vertices[1], vertices[2], vertices[6], vertices[5]],
    [vertices[2], vertices[3], vertices[7], vertices[6]],
    [vertices[0], vertices[1], vertices[5], vertices[4]]
]
```
#### Bring together & draw 6 faces in 3d plot
```python
#draw faces
ax.add_collection3d(Poly3DCollection(faces, 
 facecolors='cyan', linewidths=1, edgecolors='b', alpha=.25))
```
Using add_collection3d & Poly3DCollection is something I saw when searching for how to draw a cube & polygons (the faces can be seen as polygons) in Python.

### Step 3: add extras
#### Change background color
```python
    ax.set_facecolor('Cyan') #bg color - inside plot
    fig.patch.set_facecolor('Cyan') #bg color - outside plot
```
### Some comments
#### Change aspect ratio size
<figure>
    <img src="/cube/axes_equal.png" alt="before and after axes aspect ratio in matplotlib" title="Before & after">
    <figcaption>Left: without considering equal aspect ratio, right: with equal aspect ratio</figcaption>
</figure>

It looks like we made a cuboid, instead of a cube. Yet the coordinates are correct. This is because the axes are not equally distributed. We can solve this by
```python
    ax.set_aspect('equal')
```
#### Remove toolbar & others
When creating a plot in matplotlib, a toolbar is automatically created. This is good for developer mode, but not as an end result.
On Stack Overflow I found several answers and tried those, but not all of them worked yet as some posts are older than 10 years(!). In the end, I succeeded!

<figure>
    <img src="/cube/matplotlib_delete.png" alt="before and after deleting default matplotlib things" title="Before & after">
    <figcaption>Left: default UI, right: removed UI</figcaption>
</figure>

```python
    #version matplotlib: 3.10.0
    import matplotlib.pyplot as plt

    plt.rcParams['toolbar'] = 'None' #remove toolbar before create a figure

    fig = plt.figure() # create figure
    ax = fig.add_subplot(projection='3d') # setup plot for 3d

    fig.canvas.manager.set_window_title('3d cube') # change window title
    ax.set_axis_off() # delete axes
```
#### Sources used to create a 3d cube in Python
- Draw polygon faces in 3d plot:
    - https://stackoverflow.com/questions/66716714/how-to-add-thickness-to-flat-polygons-plotted-on-matplotlib-3d-axes
    - https://stackoverflow.com/questions/44881885/how-to-draw-a-parallelepiped
    - https://stackoverflow.com/questions/4622057/plotting-3d-polygons
    - https://matplotlib.org/stable/gallery/mplot3d/polys3d.html#sphx-glr-gallery-mplot3d-polys3d-py
    - https://matplotlib.org/stable/api/_as_gen/mpl_toolkits.mplot3d.axes3d.Axes3D.add_collection3d.html
- Change background color: https://stackoverflow.com/questions/14088687/how-to-change-plot-background-color
- Remove toolbar -> from this source https://stackoverflow.com/questions/78945314/restore-matplotlib-navigation-toolbar-option to this source to find the answer: https://matplotlib.org/stable/users/explain/customizing.html#matplotlibrc-sample
- Change window title: https://stackoverflow.com/questions/5812960/change-figure-window-title-in-pylab
- Hide axis: https://stackoverflow.com/questions/7336927/how-can-i-hide-an-axis-of-a-3d-plot

## Rhombohedron
For the rhombohedron we do the same as the cube. We can start copying our cube code. We only need to adjust the coordinates of the vertices and possibly the faces if the vertices lie within another face.
\
\
Now, of course, the hardest part is calculating those coordinates mathematically. I was looking for examples where the rhombohedron is drawn with the coordinates of the vertices attached.
### Method 1
Based on the figure below, I can position the rhombohedron in the middle (x = 0, y = 0 and z = 0) using the same range as my cube, namely from -1 to 1.
<figure>
    <img src="/rhombohedron/reference1.png" alt="reference rhombohedron" title="reference">
    <figcaption>Figure from: https://www.researchgate.net/figure/Cluster-representation-of-crystal-structures-a-rhombohedral-cluster-aggregate-of-the_fig1_374865644</figcaption>
</figure>
We look at the leftmost figure. 

> **👀 Observation**: note that the vertices are the **centres of the faces** of the cube in which the rhombohedron is trapped plus 2 more vertices of the cube itself. 

It is now very easy to calculate its coordinates, because we take the centre of the range [-1, 1], or 0.
<figure>
    <img src="/rhombohedron/rhombohedron1_vertices.svg" alt="vertices of a rhombohedron" title="Vertices">
    <figcaption>Vertices of a rhombohedron with index</figcaption>
</figure>
When we add these values to our vertices array & change the faces array, we get this:
<figure>
    <img src="/rhombohedron/rhombohedron1.png" alt="rhombohedron in Python using matplotlib" title="Result">
    <figcaption>End result</figcaption>
</figure>

### Method 2
As you can see in the image above, the 3d shape floats. In method 2, we want it to lie flat, so we actually have 2 different z values that we use 4 times.
\
\
In this method there is more maths involved, because in the previous one we saw that the points are always the centre of the squares plus 2 more vertices of the cube containing the shape.
\
\
Calculations to determine the different coordinates of the vertices of a rhombohedron can be found on Wikipedia (https://en.wikipedia.org/wiki/Rhombohedron), where they give 1 vertex the coordinates (0,0,0), and from there run 3 vectors (e1, e2 & e3). That way, by adding vectors, we can calculate all the coordinates of the vertices. I did not make up the calculation e1, e2 & e3 myself, I take it from Wikipedia itself.
\
\
Let's make it more visual. 
\
\
Step 1: choose a **vertex (0,0,0)**. From there, 3 vectors depart, we call them e1, e2 and e3.
The **acute angle** between e1 and e2, we call theta (θ).
<figure>
    <img src="/rhombohedron/rhombohedron2_step1.svg" alt="rhombohedron in Python using matplotlib" title="Step 1">
</figure>
Step 2: let's apply the formulas.

> <figure>
>  <image src="/rhombohedron/rhombohedron2_formulas.png" alt="rhombohedron formulas" title="Formulas">
>  <figcaption>Figure from: https://en.wikipedia.org/wiki/Rhombohedron#Solid_geometry</figcaption>
> </figure>

<figure>
    <img src="/rhombohedron/rhombohedron2_step2.svg" alt="rhombohedron in Python using matplotlib" title="Step 2">
</figure>
Step 3: Let's calculate the other vertices. What would V be?
<figure>
    <img src="/rhombohedron/rhombohedron2_step3_1.svg" alt="rhombohedron in Python using matplotlib" title="Step 3 - part 1">
</figure>
As I said above, we can add vectors. Tip: e1, e2 & e3 are vectors. There are several possibilities.
<figure>
    <img src="/rhombohedron/rhombohedron2_step3_2.svg" alt="rhombohedron in Python using matplotlib" title="Step 3 - part 2">
</figure>
V = e1 + e3’
but... e3 = e3’
so V = e1 + e3
\
\
Calculate now the other coordinates with vectors.
<figure>
    <img src="/rhombohedron/rhombohedron2_step4.svg" alt="rhombohedron in Python using matplotlib" title="Step 4">
</figure>
Instead of calculating all the different coordinates manually, we let the computer do the maths for us.

```python
theta = math.pi/3 # acute angle

origin_vertices = [
    [1, 0, 0], # e1
    [math.cos(theta), math.sin(theta), 0], # e2
    [math.cos(theta), (math.cos(theta) - (math.cos(theta) ** 2))/math.sin(theta), (math.sqrt(1 - 3 * math.cos(theta) ** 2 + 2 * math.cos(theta)**3))/math.sin(theta)] # e3
]

vertices = [
    [0,0,0], 
    origin_vertices[1],
    [origin_vertices[0][0] + origin_vertices[1][0], origin_vertices[0][1] + origin_vertices[1][1], origin_vertices[0][2] + origin_vertices[1][2]], 
    origin_vertices[0],
    origin_vertices[2], 
    [origin_vertices[1][0] + origin_vertices[2][0], origin_vertices[1][1] + origin_vertices[2][1], origin_vertices[1][2] + origin_vertices[2][2]],
    [origin_vertices[0][0] + origin_vertices[1][0] + origin_vertices[2][0], origin_vertices[0][1] + origin_vertices[1][1] + origin_vertices[2][1], origin_vertices[0][2] + origin_vertices[1][2] + origin_vertices[2][2]], 
    [origin_vertices[0][0] + origin_vertices[2][0], origin_vertices[0][1] + origin_vertices[2][1], origin_vertices[0][2] + origin_vertices[2][2]]
]
```
> **Note**: origin_vertices[0][0] means "take the first item from the origin_vertices array and take the first element of that array (inside origin_vertices)."<br><br>
> For e1 + e2 we add the x,y & z coordinates from the origin_vertices[0] and origin_vertices[1] up.

When I first started rendering the shape, I saw this (see below). I knew I was almost there, but that my faces were not quite right yet.
<figure>
    <img src="/rhombohedron/rhombohedron2_faces.png" alt="rhombohedron weird shape" title="Almost there...">
</figure>

To solve it, you can change the vertices inside the arrays of the faces array or change the order of the vertices array.
\
\
And there is our rhombohedron!

<figure>
    <img src="/rhombohedron/rhombohedron2_endresult.svg" alt="rhombohedron in Python using matplotlib" title="Result">
    <figcaption>
        Left: it seems a bit odd from this point to see whether the rhombohedron is really flat or not. <br>
        Right: different perspective; yes, it is flat on the ground!
    </figcaption>
</figure>