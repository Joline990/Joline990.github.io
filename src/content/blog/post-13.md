---
layout: ../../layouts/BlogpostLayout.astro
title: 'Custom panel'
pubDate: '24/01/2025'
description: 'Today I want to be able to focus well, because I notice that because it is all new to me, I experience too little structure and therefore find it harder to think of smaller intermediate steps towards my end result. I then feel like I am doing all sorts of things, but not getting any closer. 
In this blog post, I note down what I did today and what I learned.'
---
## Today's goal
My goal: by the end of the day, I want to create such a panel with buttons, sliders... to manipulate the view.
<figure>
  <img src="/blender_custom_panel/ui_elements.png" alt="Custom panel" title="Custom panel">
</figure>

## The process
I have no step-by-step plan, but I know what I want to achieve at the end of the day, so I will research first.
And I now want to start keeping the blog one step at a time so I don't have to do everything at once.
\
\
Let's start!
### Research
After looking up some articles & videos, I am going to check them out and possibly try to join in. While doing that, I will take some notes of things I have learnt.
\
\
I found some aritcles that explains the basics of creating your own custom panels & making them as add-ons so you can use them in any blender project.
There are several steps in creating a custom basic panel, but I am happy to refer here to the well-documented sources I used for this.
- Article (https://community.osarch.org/discussion/759/blender-create-your-first-blender-add-on) starts from the template "UI Panel Simple"
- **Victor Stepanov** (https://www.youtube.com/watch?v=Qyy_6N3JV3k&list=PLB8-FQgROBmlqzZ4HBzIAGpho-xp0Bn_h&index=2) explains in his videos very well how to work with Blender's Python API from scratch.

> **Learning 01**: there are several python templates in blender.
>
> Scripting > Templates > Python > ...

#### Basic panel
A panel consists of **operators**, you can compare it to functions, they do something, they perform an action. Important to know is that they work on the active object & a correct context is needed. 

> **Step by step**: create a basic panel
>
> 0. Create panel class
> 1. Panel location
> 2. Labels
> 3. Layout
> 4. Register & unregister panel
> 5. Add-on

##### 0. Create panel class
```python
class CATEGORY_PT_name_of_your_panel(bpy.types.Panel): # naming convention for panels
```
##### 1. Panel location
Where will the panel be placed in the UI of Blender? Use `bl_space_type` & `bl_region_type`.
\
\
bl_space_type
\
This is the "big location" where our panel will be located. There are different types. You can see this by clicking on a space icon.
<figure>
  <img src="/blender_custom_panel/bl_space_type.png" alt="Different spaces" title="Spaces in Blender">
  <figcaption>Spaces in Blender</figcaption>
</figure>

bl_region_type
<figure>
  <img src="/blender_custom_panel/bl_region_type.svg" alt="Grid with 2 columns; first column from top to bottom: header, window, footer and right column: UI" title="Regions in Blender">
  <figcaption>Regions in Blender</figcaption>
</figure>

##### 2. Labels
Give your panel a name -> use `bl_label`.

##### 3. Layout
-> Inside draw() function: create rows (or columns) with operators.
```python
    def draw(self, context):
        layout = self.layout

        row = layout.row()
        row.operator("mesh.primitive_cube_add", text="Add cube") # creates a cube when clicking on the Add cube btn
```

##### 4. Register & unregister panel
Let Blender know the panel exist.
```python
    def register():
        bpy.utils.register_class(name_of_your_panel_you_defined_in_the_class_above)

    def unregister():
        bpy.utils.unregister_class(name_of_your_panel_you_defined_in_the_class_above)

    if __name__ == "__main__":
        register()
```
##### 5. Add-on
5.1. Preparation step
- (!) unregister
- add `bl_info` dictionary

<br><br>
5.2. Save add-on
Inside text editor: Text > Save As
(!) .py extension, so Blender recognizes the add-on.
<br><br>
5.3. Add add-on in Blender
- Restart Blender
- Edit > Preferences > Add-ons > Install from disk
- Enable your add-on (check checkbox)
- You see your add-on in your project

> **Learning 02**: To know the correct name - click on an item and see it appear at the bottom left.
><figure>
>   <img src="/blender_custom_panel/bl_space_type2.svg" alt="Different spaces" title="Spaces in Blender">
></figure>

### Explore further
Let's create a panel with different UI elements with **built-in operators** (like when clicking on button, you add a cube).
But first, what are the different options we have? Can we use a text input, checkbox, slider...?
\
\
Let's experiment with a cube and the different options we can find in the documentation (https://docs.blender.org/manual/en/latest/interface/controls/index.html#ui-elements).
\
\
This is my status at the moment:
<figure>
  <img src="/blender_custom_panel/ui_elements.png" alt="Custom panel" title="Custom panel">
</figure>

I created **sub panels** by using `bl_parent_id`, added a checkbox, radio buttons (https://blender.stackexchange.com/questions/30421/create-a-radio-button-via-python), changed default text...

I don't quite get my way around the documentation yet and also find it difficult to quickly find, for example, how to link a built-in operator to a checkbox.
## Next steps
My steps were:
1. Find tutorials on the topic
2. Try to understand tutorials and write things down
3. Explore different UI elements

<br>

The next steps are:
1. Understanding operators better - how are they created, can I create a custom operator?
2. Try other UI elements, that I haven't implemented yet, like a color field, text input field...
The steps above I want to focus on learning and just changing a basic shape (like cube) (i.e. as I am doing).
3. Try to modify a rhombohedron fractal in a custom panel with the things I have already learned.
## Reflection
I found it easier to work with a specific goal in mind. Although my daily goal could be formulated smaller, my next steps are already clear. I hope to be able to modify my rhombohedron fractal a bit by Sunday evening.
