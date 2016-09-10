# Dragonit

#### Abstract:
A simple front-end project using HTML5's Drag and Drop APIs. <br>
It makes users be able to design or simulate view files of Web projects based on the mouse interaction.

----
#### Demo:
Web Page: [https://dragonit-demo.herokuapp.com/](https://dragonit-demo.herokuapp.com/)<br>
Demo Video: [https://youtu.be/GelvTrUfkM4](https://youtu.be/GelvTrUfkM4)

----
#### Documentation (Korean):
[http://arkainoh.blogspot.kr/2016/09/dragonit.html](http://arkainoh.blogspot.kr/2016/09/dragonit.html)

----
#### Getting Started:

(I recommend you to apply the latest version of Bootstrap and jQuery. Bootstrap is not mandatory, but at least you have to define the style of 'active' class using css)<br>
<br>Get bootstrap: [http://getbootstrap.com/getting-started/](http://getbootstrap.com/getting-started/)
<br>Get jQuery: [http://jquery.com/download/](http://jquery.com/download/) or include `<script src="//code.jquery.com/jquery.min.js"></script>` in your code.

Download 'dragonit.js' and include it in your project. <br>
On your view file (HTML based), Attach a <div\> tag with 'dragonit' class at the beginning of the <body\> tag: `<div class='dragonit'></div>` <br>
<br> Then, paste `<script src="dragonit.js"></script>` at the end of the <body\> tag.
<br>
<br>For example,
> <body\> <br>
> <div class="dragonit"\></div\><br>
> <br> Your code here... <br>
> <br> <script src="dragonit.js"\></script\>
> <br></body\>

Now, you need to add event controllers on your page. It can be done simply by adding 3 buttons with class name 'dragonit_select', 'dragonit_move', 'dragonit_delete'.

For example,

> <button type="button" class="dragonit_select"\>select</button\><br>
> 
> <button type="button" class="dragonit_move"\>move</button\><br>
> 
> <button type="button" class="dragonit_delete"\>delete</button\><br>


You are ready to use Dragonit!

#####For Rails:

Attach `<%= javascript_include_tag "dragonit" %>` instead of `<script src="dragonit.js"></script>`. <br><br>
Add `Rails.application.config.assets.precompile += %w( dragonit.js )` to /config/initializers/assets.rb

----
#### Development Environment:
- c9.io
- HTML5
- Apache/2.4.7 (Ubuntu) PHP/5.5.9-1ubuntu4.19

----
#### References:
[https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) <br>
[https://developer.mozilla.org/en-US/docs/Web/API/Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)<br>
[http://m.mkexdev.net/87](http://m.mkexdev.net/87)<br>
[http://sergeswin.com/1032](http://sergeswin.com/1032)
