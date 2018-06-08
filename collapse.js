 ;
 (function($) {
     $('head').append(getTheCss());
     $.fn.extend({
         collapse: function() {
             return this.each(function() {
                 var $this = $(this);
                 var $root = $this;
                 var isCollpase = false;
                 var conHeight = $this.outerHeight(true);
                 var childHeight = $this.children('*:first-child').outerHeight(true);
                 var conWidth = $this.width() + childHeight;
                 //  判断是否为换行
                 if (!isOneLine($this)) {
                     var iconEl = $(getCollapseIcon());
                     iconEl.css({
                         width: childHeight,
                         height: childHeight,
                     }).on('click', function() {
                         if (!isCollpase) {
                             $root.css("height", conHeight + 'px')
                             $(this).addClass('_expand');
                         } else {
                             $root.css("height", childHeight + 'px')
                             $(this).removeClass('_expand');
                         }
                         isCollpase = !isCollpase;
                     });
                     $root.append(iconEl);
                 }

                 $this.css({
                     overflow: 'hidden',
                     height: childHeight + 'px',
                     width: conWidth + 'px',
                     position: $this.css('position') === "static" ? 'relative' : $this.css('position'),
                     '-webkit-transition': 'height 200ms ease',
                     '-ms-transition': 'height 200ms ease',
                     'transition': 'height 200ms ease',
                 })
             })

             function getCollapseIcon() {
                 return '<div class="collapse-icon"><i class="iconfont icon-zhankai"></i></div>';
             }

             function isOneLine($dom) {
                 var firstChild = $dom.find("*:first-child")[0];
                 var lastChild = $dom.find('*:last-child')[0];
                 var firstRect = firstChild.getBoundingClientRect();
                 var lastRect = lastChild.getBoundingClientRect();
                 return firstRect.y === lastRect.y;
             }
         }
     });

     function getTheCss() {
         return "<style> .collapse-icon {\n            position: absolute;\n            right: 0;\n            top: 0;\n            transform-origin: center;\n            transition: transform 200ms ease;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n        \n        .collapse-icon._expand {\n            transform: rotate(180deg);\n        }</style>";
     }
 })($ || window.jQuery);