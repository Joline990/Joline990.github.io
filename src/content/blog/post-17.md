---
layout: ../../layouts/BlogpostLayout.astro
title: 'MIDI & max_level changer'
pubDate: '27/01/2025'
description: 'Today I tested my midi controller in an add-on. I played around a bit with different values and custom properties I had already set up. I also changed max_level of the menger sponge with a custom property. You can read more in this blog.'
---
## MIDI Controller
### Add-on
Let's connect a midi controller. I first download the editor software from the controller itself where we can change LED colors, ids and other stuff.
\
\
I was looking for **MIDI add-ons** for Blender since Blender does not have a built-in MIDI controller. When I searched in the extensions (Edit > Preferences > Get Extensions), I found nothing with MIDI. However, the community has already developed some add-ons that we can use. In various videos, I often saw the use of  JPfeP AddRoutes being used, but I ended up on an empty webpage. 
\
\
I also came across a recent video (2 days ago!) that according to the description of the video would work with Blender version 4.3, now I have that version, so I went to the github repo which communicated the latest features by version. I left the tab open for a while and searched further for others.
\
\
I looked further online and saw a website with blender add-ons (https://blender-addons.org/?offset=1&pricing=free&search=midi). There the AddRoutes was mentioned and I could find a link to the github repository. There were a lot of recent issues that were unresolved from people including that it doesn't work from a certain version onwards, including the current one. So that was not an option to pursue.
\
\
I also looked for midi add-ons that are paid (on the same website), but there were none there. When I clicked on ‘all’, I saw 1 added (https://blender-addons.org/?offset=1&search=midi). Yet it is labelled as free... I saw many similarities with that recent video, or... no, it was the same person, the same add-on! I looked no further and decided to download this one because of the videos that helped a bit as support. I could only try if it would work. Link add-on: https://github.com/EldinZenderink/MidiController
### Playing with MIDI
I installed the zip file as an add-on in Blender and tried it out.
First I connected my MIDI device, this was pretty easy! Inside `Status` I can see the input ids & values of my MIDI controls.
I can also map those controls with blender properties. Therefore, I go to `Register Controller Mapping` and followed the instructions:
1. Touch a MIDI control
2. Change a blender property to change the value (or copy full data path)
3. Choose a name for this link between the control option & blender property. Set the min & max values for the blender property. Now the computer will map the values from that control (between 0 - 127 (default)) and the min/max of the chosen property.
4. Repeat the steps to add more combinations.
You can see all your combinations in `Mapped Controls`.

<br>
Instead of using predefined blender properties & operators, you can use custom operators.
<br><br>
Thanks to this code, I can now easily use my MIDI controller, should there be no add-ons made for this yet, I would have to make one myself to connect the MIDI controller and this would cost me a lot of time, as I would have to go and figure this out completely, whereas now I can skip that step.

## Change level
In my Week 3 reflection, I said I would change a cube with those vertices and then immediately switch to the rhombohedron fractal and skip the menger sponge. But I can't really do much more with the cube than what I have now. I have then started working with the menger sponge first anyway which is drawn using the cube primitive from blender itself. Then I will change it in my rhombohedron fractal code, where I do not use primitive meshes.
\
\
Let's first change the level/iteration of the menger sponge.
How?
First I remove everything from the viewport and then I re-render the code to make a menger sponge with the new level.
\
\
You can delete things in blender in several ways. Although I found things from older versions, they still work.
\
\
When we delete something in the viewport, we see this: 
```python
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False) # Python tooltip we see when hovering Delete
Deleted 1 object(s)
```
If we add this code inside our update function for our custom property max_level, and we change the value of our max_level, the objects from the screen aren't removed.
\
\
On https://b3d.interplanety.org/en/how-to-delete-object-from-scene-through-the-blender-python-api/#:~:text=Removing I found this piece of code:
```python
# from article
bpy.data.objects['Suzanne'].select_set(True)
bpy.ops.object.delete()
```
We have to select our Cube object (change Suzanne into Cube) and use again the delete operator. But I get an error in my terminal: 
```
RuntimeError: Operator bpy.ops.object.delete.poll() failed, context is incorrect.
```
I got the error because I was in edit mode and not in object mode. In fact, we turn on this mode in our code when rendering our fractal.
Solved by replacing my OBJECT_MODE again:
```python
first_cube = True
generate_menger_sponge(0, 0, 0, 1, max_level)

bpy.ops.object.mode_set(mode='OBJECT') 

def update_level(self, context):
    """Delete selected object & change the level value"""
    bpy.data.objects['Cube'].select_set(True)
    bpy.ops.object.delete()
```
When adding this line behind, the cubes aren't deleted:
```
generate_menger_sponge(0, 0, 0, 1, self.max_level)
```
But if I don't want to show that fractal when running the script, I have to place that code inside my update function.
So all this code that first was placed below the functions, must be now inside my update function for the level.
```
   first_cube = True

    generate_menger_sponge(0, 0, 0, 1, self.max_level)

    bpy.ops.mesh.select_all()
    bpy.ops.mesh.remove_doubles()

    bpy.ops.object.mode_set(mode='OBJECT')
```
But with that previous delete code, it doesn't work. Error in my terminal:
```
KeyError: 'bpy_prop_collection[key]: key "Cube" not found'
```
It wants to reference my cube object in my collection, but there is none yet.
We need to use something else, maybe without an operator as the article also mentions, also someone on a forum (scroll down) (https://blender.stackexchange.com/questions/27234/python-how-to-completely-remove-an-object) tells that it is also faster then using the `ops` call.
```python
# from article
object_to_delete = bpy.data.objects['Suzanne']
bpy.data.objects.remove(object_to_delete, do_unlink=True)
```
We add a `do_unlink` so it unlinks all usages of the object before deleting it from the scene.
When changing values, we still don't see anything, therefore we need to add a if statement and loop over all our objects.
```python
for obj in bpy.data.objects:
   if obj.name.startswith("Cube"):
       bpy.data.objects.remove(obj, do_unlink = True)

```
Full update_level function:
```python
def update_level(self, context):
    """Delete selected object & change the level value"""
    for obj in bpy.data.objects:
        if obj.name.startswith("Cube"):
            bpy.data.objects.remove(obj, do_unlink = True)
   
    global first_cube
    first_cube = True

    generate_menger_sponge(0, 0, 0, 1, self.max_level)

    bpy.ops.mesh.select_all()
    bpy.ops.mesh.remove_doubles()

    bpy.ops.object.mode_set(mode='OBJECT')
```
If you're wondering where that update_level comes from, this is the update function called when a custom property changes. How to create a custom property I described in previous steps.
\
\
It would also be possible using collections I think. But we first have to define a collection, remove the collection & create again a collection. That is more code to write for something that can be solved with less lines.
\
\
Additional sources I have used and have not yet mentioned:
- deleting collections: https://b3d.interplanety.org/en/removing-collections-through-the-blender-python-api/
- creating collections: https://blender.stackexchange.com/questions/184363/how-can-i-add-a-collection-using-python
- startswith() from Python: https://www.w3schools.com/python/ref_string_startswith.asp
- remove() function in Blender: https://docs.blender.org/api/current/bpy.types.BlendDataObjects.html#bpy.types.BlendDataObjects.remove
\
\
To add this to a midi controller input, we can start addressing this custom property by copying the full data path.
\
\
There is something weird that I don't quite understand at the moment and that is when I indicate another level, the menger sponge moves a bit (see video)
<video controls>
  <source src="/week4/sponge_level_moving.mov" type="video/mp4">
</video>