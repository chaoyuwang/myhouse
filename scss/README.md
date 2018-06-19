#这是Sass学习记录
> * Sass学习笔记和测试文件
> * 学习时间：2017-10-27

---

* ### 什么时候定义变量
> 1. 该值至少出现两次
> 1. 该值至少可能会被更新一次
> 1. 该值所有的表现都与变量有关（非巧合）

* ### 嵌套
> 1. 选择器嵌套 
```angular2html
body{
 color:#f00;
 h1{
  font-size:20px;
 }
}
```
> 2. 父选择器的标识符&;
在使用嵌套规则时，父选择器能对于嵌套规则如何解开提供更好的控制。它就是一个简单的`&`符号，且可以放在任何一个选择器可出现的地方，比如h1放在哪，它就可以放在哪。
```angularjs2html
article{
  color:#f00;
  &:hover{color:#333}
}
```
父选择器标识符还有另外一种用法，你可以在父选择器之前添加选择器
```angularjs2html
#content aside{
  color:#f00;
  body.ie &{color:#eee}
}
```
编译后
```angularjs2html
#content aside{color:#f00}
body .ie #content aside{color:#eee}
```
> 3. 子组合选择器和同层组合选择器:>,+,~
```angularjs2html
article{
  ~ article{border-top:1px solid #ccc}
  > section{background:#ccc}
  dl > {
    dt{color:#333}
    dd{color:#555}
  }
  nav + &{margin-top:0}
}
```
解析后css:
```angularjs2html
article ~article{border-top:1px solid #ccc}
article >section{background:#ccc}
article dl>dt{color:#333}
article dl>dd{color:#555}
nav +article{margin-top:0}
```
> 4. 属性嵌套 
```angular2html
.box{
 width:100px;
 margin:{
  top:10px;
  right:5px;
  bottom:3px;
  left:20px;
 }
}
```
> 5. 伪类嵌套
```angular2html
.clearfix{
 &:after,
 &:before{
  content:"";
  display:table;
 };
 &:after{
  clear:both;
  overflow:hidden;
 }
}
```
**避免使用选择器嵌套**

* ### 导入Sass
```@import```规则在生成css文件时就把相关文件导入归纳到同一个css文件。导入的写法不需要指明被导入的全名，可省略后缀.sass或.scss。
```angularjs2html
@import color               color.scss
@import sidebar    <---     sidebar.scss
@import mixin               mixin.scss
```
1. Sass局部文件
> Sass局部文件名以下划线_开头。这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。当你`@import`一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入`themes/_night-sky.scss`这个局部文件里的变量，你只需在样式表中写`@import "themes/night-sky";`局部文件可以被多个不同的文件引用。当一些样式需要在多个页面甚至多个项目中使用时，这非常有用。
2. 默认变量值
> `!default` 标签实现默认值，即如果该变量之前被定义了，则使用该声明的值，否则就使用默认值。
```angularjs2html
$yu-color: #f00 !default;
.yu-theme{
  color: $yu-color
}
```
如果导入局部文件之前声明了一个$yu-color变量，则使用该声明变量值，否则使用默认#f00。
3. 嵌套导入
> //_blue-theme.scss
```angularjs2html
aside{
    background:#f00;
    color:#333
}
```
```angularjs
.blue-theme{@import blue-theme}
```
生成的结果跟直接写在.blue-theme中的一样：
```angularjs2html
.blue-theme{
  aside{
    background:#f00;
    color:#333
  }
}
```

* ### 混合器
1. 声明混合器
> 使用 ```@mixin``` 来声明混合器。可声明带有参数的混合器 ```@mixin border-radius($radius:5px){}``` 
2. 调用混合器
> 匹配 ```@include``` 关键词来调用混合器 ```button{@include border-radius}```
3. 混合器的参数 
    * 不带值的参数
    ```angular2html
     @mixin border-radius($radius){
      -webkit-border-radius: $radius;
      border-radius: $radius;
     }
    ```
    调用时可以给给这个混合器传一个参数值：
    ```angular2html
     .box{
      @include border-radius(3px);
     }
    ```
    * 带值的参数
    可以给混合器的参数传一个 ```默认值``` ，遇到不同的值，给混合器传一个符合的参数值覆盖掉该默认值即可。
    * 传多个参数
        * ```@mixin center($width,$height){...}```
        特别的参数 ```...```
        * ```angular2html
             @mixin box-shadow($shadows...){
              @if length($shadows) >= 1{
                -webkit-box-shadow: $shadows;
                box-shadow: $shadows;
                }else{
                  $shadows: 0 0 2px rgba(#000,.25);
                  -webkit-box-shadow: $shadows;
                  box-shadow: $shadows;
                }
              }
    
            .box{@include box-shadow(0 0 1px rgba(#000,.5),0 0 2px rgba(#000,.2))}
            ```
            
> 不足之处是容易生成冗余代码块，不能只能地将相同样式代码合并在一起

* ### 扩展/继承
> 通过关键词 ```@extend``` 来继承已存在的类样式块，编译出来的代码会将选择器合并，形成组合选择器。
```angular2html
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}
```
编译后
```angular2html
//CSS
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}
```

* ### 占位符
> 用占位符 ```%Placeholder``` ,可以取代css中基类造成的代码冗余，因为 ```%Placeholder``` 声明的变量如果没经过 ```@extend``` 调用的话，就不会体现在css文件中
```angular2html
%mt5{
 margin-top: 5px;
}
%pt5{
 padding-top:5px;
}
```
而且通过 @extend 调用的占位符，编译出来的代码会将相同的代码合并在一起。

> #### 对比 混合器、继承和占位符
- 混合器会生成冗余代码，但能传递参数，**所以如果代码中涉及到参数可用混合器**
- 继承编译出来的css文件比混合器精简，但不能传参，**如果不需要不需要传参，且有一个基类已经存在，可以使用继承**
- 占位符编译出的css代码和继承类似，**但占位符是独立的，不调用就不会在css中产生代码**

|     |混合器  |继承  |占位符  |
|-----|-------|-----|-------|
|声明方式|@mixin|.class|%placeholder|
|调用方式|@include|@extend|@extend|
|使用环境|如果相同代码块需要在不同的环境传递不同的值时，可以通过混合器来定义重复使用的代码块。 **不足：** 编译出来的css代码冗余，使文件变得臃肿|如果相同代码块不需要传递不同的值，并且代码块已经在Sass文件中定义，可以通过继承来调用已经存在的基类。调用相同基类的代码会合并。  **不足：** 如果基类不存在HTML结构时，不管调用不调用，在编译出来的css文件中都会产生基类对应的代码|占位和继承类似，唯一不同的是，相同代码块不在基类中而是额外声明，如果不调用已声明的占位符，将不会产生任何样式代码，如果在不同选择器调用占位符，那么编译出来的css代码会把相同的代码合并 |

```angular2html
//SCSS中混合器使用
@mixin mt($var){
  margin-top: $var;  
}

.block {
  @include mt(5px);

  span {
    display:block;
    @include mt(5px);
  }
}

.header {
  color: orange;
  @include mt(5px);

  span{
    display:block;
    @include mt(5px);
  }
}

//SCSS 继承的运用
.mt{
  margin-top: 5px;  
}

.block {
  @extend .mt;

  span {
    display:block;
    @extend .mt;
  }
}

.header {
  color: orange;
  @extend .mt;

  span{
    display:block;
    @extend .mt;
  }
}

//SCSS中占位符的使用
%mt{
  margin-top: 5px;  
}

.block {
  @extend %mt;

  span {
    display:block;
    @extend %mt;
  }
}

.header {
  color: orange;
  @extend %mt;

  span{
    display:block;
    @extend %mt;
  }
}
```
* ### 插值 #{}

* ### 注释
    * 静默注释
    > 静默注释不会出现在编译后的css文件中，格式采用类C的语法格式：`//` 。
```angularjs2html
  body {
    color: #333; // 这种注释内容不会出现在生成的css文件中
    padding: 0; /* 这种注释内容会出现在生成的css文件中 */
  }
 ```

* ### 数据类型
  支持6种数据类型
  * 数字：1,2,3,10px
  * 字符串：有引号和无引号的字符串，"foo",baz
  * 颜色：#ff00ff; blue; rgba(255,255,255,.5)
  * 布尔型：true，false 
  * 空值：null
  * 数组：用空格或逗号做分隔符，1.5em 1.2em 0 2em，Helvetica,Arial,sans-serif
  * maps：相当于js的object，(key1: value1,key2: value2)

* ### 字符串

* ### 值列表

* ### 运算
