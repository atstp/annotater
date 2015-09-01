(function(global,doc){ 'use strict';

  global.Annotater = function(options){

      // handle short code
      if( typeof options === 'string'){
          options = {name: options};
      }

      // extend the defaults
      for(var option in options){
          this[option] = options[option];
      }

      if(this.modelReplaces){
          this._insertModel();
      }
      this._collectVariables(); // builds an array at this._vars
      this._processMatches();   // builds an array at this._vars
      this._replaceTextNodes(); // replaces each of the identified text nodes
                                // with a <var> element
      return this;
  };

  global.Annotater.prototype = {

      inside:        'body',
      name:          null,
      nameBecomes:   '{name}',
      tooltip:       null,
      varClass:      'annotated-variable',
      modelReplaces: null,
      modelPrompt:   null,
      autoStyle:     true,

      _collectVariables: function(){
          this._vars = [];
          var nodeCache = [];
          var self = this;
          var matchedNode = document.querySelector(this.inside);
          recurseAndCollect(matchedNode);
          for(var cachedItemNo in nodeCache){
              self._extractMatchingTextNode(nodeCache[cachedItemNo]);
          }
          function recurseAndCollect(el){
              if(!el){return;}
              for( var i=0; i < el.childNodes.length;i++){
                  if( el.childNodes[i].nodeType == 3 &&
                      el.childNodes[i].data.match(self.name) ){
                      nodeCache.push( el.childNodes[i] )
                  } else if (self._okayToEnterNode(el.childNodes[i]) &&
                             el.childNodes[i].textContent.match(self.name) ){
                      recurseAndCollect(el.childNodes[i]);
                  }
              }
          }
      },

      _extractMatchingTextNode: function(textNode){
          var cursor = textNode;
          var matchIndex = null;
          var nextMatch = null;
          var matchLength = null;
          var startsWithMatch = null;
          while( cursor.data.match(this.name) ){
              nextMatch = cursor.data.match( this.name )[0];
              matchLength = nextMatch.length;
              matchIndex = cursor.data.indexOf( nextMatch );
              if( matchIndex > 0 ){
                  startsWithMatch = cursor.splitText( matchIndex );
              } else {
                  startsWithMatch = cursor;
              }
              cursor = startsWithMatch.splitText( matchLength );
              this._vars.push({
                  textNode: startsWithMatch,
                  name: startsWithMatch.data,
              });
          }
      },

      _replaceTextNodes: function(){
          var parent = null;
          var varEl = null;
          for(var nodeNum in this._vars){
              parent = this._vars[nodeNum].textNode.parentNode;
              varEl = this._vars[nodeNum].container;
              parent.insertBefore(varEl, this._vars[nodeNum].textNode);
              parent.removeChild(this._vars[nodeNum].textNode);
          }
      },

      _insertModel: function(){
          var self = this;
          var targetNode = null;
          var startsWithMatch = null;
          var input = document.createElement('input');
          var walker = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,null);
          while(walker.nextNode()){
            if(walker.currentNode.data.match(this.modelReplaces)){
              targetNode = walker.currentNode;
              break;
            }
          }
          if(!targetNode){return;}

          var nextMatch = targetNode.data.match(this.modelReplaces);
          var matchIndex = targetNode.data.indexOf( nextMatch );
          var matchLength = nextMatch[0].length;
          if( matchIndex > 0 ){
              startsWithMatch = targetNode.splitText( matchIndex );
          } else {
              startsWithMatch = cursor;
          }
          input.setAttribute('type','text');
          input.setAttribute('width','25');
          startsWithMatch.splitText( matchLength );

          startsWithMatch.parentNode.insertBefore(input,startsWithMatch);
          startsWithMatch.parentNode.insertBefore(document.createTextNode(this.modelPrompt),input);

          startsWithMatch.parentNode.removeChild(startsWithMatch);

          input.addEventListener('keyup', (function(e){
              var value = e.target.value;
              for(var i in this._vars){
                  if( value.length > 0 ){
                      this._vars[i].varTag.innerHTML = templateStringFrom( self.nameBecomes, {name: value});
                  } else {
                      this._vars[i].varTag.innerHTML = templateStringFrom( self.nameBecomes, {name: this._vars[i].name});
                  }
              }
          }).bind(this));
      },

      _processMatches: function(){
          var item = null;
          for(var nodeNum in this._vars){
              item = this._vars[nodeNum];
              item.container = document.createElement('span');
              item.varTag = document.createElement('span');
              item.toolTip = document.createElement('div');
              item.container.appendChild(item.varTag);

              item.varTag.innerHTML = this._flexyGen(item.name, this.nameBecomes);
              item.varTag.setAttribute('class', this._flexyGen(item.name, this.varClass));
              item.varTag.dataset.annotated = 'true';

              if( this.tooltip ){
                  // content
                  item.toolTip.innerHTML = this._flexyGen(item.name, this.tooltip);
                  item.container.appendChild(item.toolTip);
                  item.varTag.style.cursor = 'none';

                  // styles
                  if(this.autoStyle){
                      item.varTag.style.textDecorationStyle = 'dotted';
                      item.varTag.style.textDecorationColor = 'rgba(0,0,0,.5)';
                      item.varTag.style.textDecorationLine = 'underline';

                      item.container.style.position = 'relative';
                      item.container.style.overflow = 'visible';

                      item.toolTip.style.transitionDuration = '.5s';
                      item.toolTip.style.position = 'absolute';
                      item.toolTip.style.background = 'rgba(255,255,255,.9)';
                      item.toolTip.style.pointerEvents = 'none';
                      item.toolTip.style.padding = '6px';
                      item.toolTip.style.paddingTop = '30px';
                      item.toolTip.style.minWidth = '250px';
                      item.toolTip.style.fontWeight = 'normal';
                      item.toolTip.style.top = '-10px';
                      item.toolTip.style.left = '-10px';

                      item.container.style.zIndex = 0;
                      item.toolTip.style.zIndex = 5;
                      item.varTag.style.position = 'relative';
                      item.varTag.style.zIndex = 100;
                  }

                  // init state
                  deactivateToolTip.call(item, item, this);

                  // events
                  item.container.addEventListener('mouseleave', deactivateToolTip.bind(item, item, this));
                  item.container.addEventListener('mouseover', activateToolTip.bind(item, item, this));
              }
          }
      },

      _flexyGen: function(baseString,funcOrString){
          if (!funcOrString) {
              return baseString;
          } else if (typeof funcOrString === 'string') {
              // FIXME: positive lookaheads are trouble.
              //        they don't capture earlier (duh)
              //        but then goes on to break the next step
              //        because it's expecting it
              return baseString.replace(this.name, function(name){
                  return templateStringFrom(funcOrString, {
                      name: name,
                      capture: Array.prototype.slice.call(arguments,1,arguments.length-2)
                  });
              });
          } else if (typeof funcOrString === 'function') {
              return baseString.replace(this.name, funcOrString);
          }
      },


      _okayToEnterNode: function( nodeInQuestion ){
          var disallow = {
              tags: ['var', 'iframe', 'script', 'canvas', 'svg', 'textarea', 'input'],
              classes: ['annotater-no-descend']
          };
          if( nodeInQuestion.nodeType !== 1 ){
              return false;
          }
          if( nodeInQuestion.dataset.annotated === 'true' ){
              return false;
          }
          for( var i=0; i < disallow.tags.length; i++ ){
              if( nodeInQuestion.nodeName.toUpperCase() == disallow.tags[i].toUpperCase() ){
                  return false;
              }
          }
          for( var i=0; i < disallow.classes.length; i++ ){
              if( nodeInQuestion.classList &&
                  nodeInQuestion.classList.contains( disallow.classes[i] ) ){
                  return false;
              }
          }
          return true;
      }
  };

  function deactivateToolTip(item, self){
      if(self.autoStyle){
          this.toolTip.style.opacity = 0;
          this.toolTip.style.pointerEvents = 'none';
          this.varTag.style.textShadow = 'none';
          item.container.style.zIndex = 0;
          this.timeout = setTimeout(function(){
              item.toolTip.style.display = 'none';
          }, 1500);
      }
      this.varTag.classList.add('tooltip-closed');
      this.varTag.classList.remove('tooltip-open');
  }
  function activateToolTip(item, self){
      // cast to number nonsense
      var topPadding = +window.getComputedStyle(this.varTag, null).lineHeight.replace(/[^0-9.]/g,'') + 10;
      if(self.autoStyle){
          clearTimeout(this.timeout);
          item.container.style.zIndex = 1;
          item.toolTip.style.display = 'block';
          this.toolTip.style.opacity = 1;
          this.toolTip.style.pointerEvents = 'all';
          this.toolTip.style.paddingTop = topPadding + 'px';
          if(this.varTag.getBoundingClientRect().x > (window.innerWidth/2)){
              this.toolTip.style.right = '-10px';
              this.toolTip.style.left = 'unset';
          } else {
              this.toolTip.style.left = '-10px';
              this.toolTip.style.right = 'unset';
          }
      }
      this.varTag.classList.add('tooltip-open');
      this.varTag.classList.remove('tooltip-closed');
  }

  //
  // a templating function interpolates a string based on an object
  //
  //    var myPrefs = {
  //                      food: 'avacado',
  //                      condiment: ['ketchup','mustard'],
  //                  };
  //    var baseString = 'i like {food} with {condiment[0]}'
  //    templateStringFrom( baseString, myPrefs) // ==> 'i like avacado with ketchup'
  //
  function templateStringFrom( templateString, templateObject ){

      return templateString.replace(/\{([^}]+)\}/g, function(fullMatch, baseVal){
          var attrs = baseVal.split(/[."'\[\]]+/);
          if( attrs[attrs.length-1] === ''){ attrs.pop() } // if the string was x[y]
          var cursor = templateObject;
          var nextVal = null;
          while ( attrs.length > 0 ){
              // without this line, we'd get an error on the next iteration
              if( cursor === undefined ) { return undefined; }
              nextVal = attrs.shift();
              if( nextVal.match(/^[0-9]+$/) ){  // if it looks like a number
                nextVal *= 1;                   // coerce to a number
              }
              cursor = cursor[nextVal];
          }
          return cursor;
      });
  }

  //
  // returns a regex based on a string
  // or a regex passed in
  //
  //
  function buildRegex(potentialRegex) {
      if( (potentialRegex instanceof RegExp) ){
          return potentialRegex;
      } else if ( typeof potentialRegex === 'string'){
          return new RegExp("\\b" + potentialRegex.trim() + "\\b", "g");
      } else {
          throw new Error('can\'t build regex from ' + potentialRegex);
      }
  }

  //
  // factory method                            makes this == this
  //     var myVariable = new Annotater(args); // <--*       /
  //     var myVariable = annotater(args);     // <---------*
  //
  global.annotater = function(options){
      var returnValue = null;
      if(options instanceof Array){
          returnValue = [];
          for(var item in options){
              returnValue.push(new Annotater(options[item]));
          }
      } else {
          returnValue = new Annotater(options);
      }
      return returnValue;
  }

})(window,document);
