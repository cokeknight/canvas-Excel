// JavaScript Document
Array.prototype.clear = function() {
    while (this.length != 0) {
        this.splice(0, 1);
    }
}

Array.prototype.floatToTopFromIndex = function(index) {
    var i = index,
    temp;
    for (; i < (this.length - 1); i++) {
        temp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = temp;
    }
}

Array.prototype.floatToTop = function(youritem) {
    var index = 0;
    for (; index < this.length; index++) {
        if (youritem == this[index]) {
            this.floatToTopFromIndex(index);
            break;
        }
    }
    if (index == this.length) {
        alert("error：item not found in array! file:kq-extjs.js,function Array.prototype.floatToTop");
    }
}

Array.prototype.removeAt = function(index) {
    if (index < this.length) {
        this.splice(index, 1);
    } else {
        alert("the index which you want to delete has outof the array's range");
    }
}

Array.prototype.remove = function(youritem) {
    var index = 0;
    for (; index < this.length; index++) {
        if (youritem == this[index]) {
            this.removeAt(index);
            break;
        }
    }
    if (index == this.length) {
        alert("error:item not found in array! file:kq-extjs.js,function array.prototype.remove");
    }
}

String.prototype.insertAt = function(index, str) {
    var str1, str2;
    str1 = this.substring(0, index);
    str2 = this.substring(index, this.length);
    return str1.concat(str, str2);
}

String.prototype.replaceAt = function(start, length, str) {
    if (length == 0) {
        return this.insertAt(start, str);
    } else {
        var str1, str2;
        str1 = this.substring(0, start);
        str2 = this.substring(start + length, this.length);
        return str1.concat(str, str2);
    }
}

String.prototype.removeAt = function(start, length) {
    if (length == 0) {
        return this;
    } else {
        var str1, str2;
        str1 = this.substring(0, start);
        str2 = this.substring(start + length, this.length);
        return str1.concat(str2);
    }
}
Array.prototype.indexOf = function(Object) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == Object) {
            return i;
        }
    }
    return - 1;
}
if (window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype.lineTo) {
    CanvasRenderingContext2D.prototype.dashedLine = function(x, y, x2, y2, dashArray, linestyle, color) {
        if (!dashArray) dashArray = [10, 5];
        var dashCount = dashArray.length;
        this.moveTo(x, y);
        var dx = (x2 - x),
        dy = (y2 - y);
        var slope = dx === 0 ? 1 : dy / dx;
        var distRemaining = Math.sqrt(dx * dx + dy * dy);
        var dashIndex = 0,
        draw = true;
        while (distRemaining >= 0.1 && dashIndex < 10000) {
            var dashLength = dashArray[dashIndex++%dashCount];
            if (linestyle === 'butt' && (dashIndex + 1) % 4 === 0 && draw === true) { //点划线
                dashLength = 2;
            }
            if ((dashIndex + 1 - 4) >= 0) {
                if (linestyle === 'bbut' && ((dashIndex + 1 - 4) % 6 === 0 || (dashIndex + 1 - 6) % 6 == 0) && draw === true) { //点划线
                    dashLength = 2;
                }
            }
            if (dashLength == 0) dashLength = 0.001; // Hack for Safari
            if (dashLength > distRemaining) dashLength = distRemaining;
            var xStep = slope === 1 ? dashLength: Math.sqrt(dashLength * dashLength / (1 + slope * slope));

            dx !== 0 ? x += xStep: null;

            y += slope * xStep;
            this[draw ? 'lineTo': 'moveTo'](x, y);
            distRemaining -= dashLength;
            draw = !draw;
        }
        // Ensure that the last segment is closed for proper stroking
        this.moveTo(0, 0);
    }
}
function convertToArray(nodes){ 
	var array = null; 
	try{ 
		array = Array.prototype.slice.call(nodes,0); //非IE 
	}catch(ex){ 
		array = new Array(); 
		for(var i = 0,len = nodes.length; i < len; i++){ 
		array.push(nodes[i]); 
		} 
	} 
	return array; 
} 

var T = function() {};
T.extend = function(obj){
      var extend = obj.extended;
      for (var i in obj){
         T[i] = obj[i];
      }
      if (extended) extended(klass);
};
 
T.inherit = function(c, p) 
{
	var f = function() {};
  	f.prototype = p.prototype;
  	
  	c.prototype = new f();
	c.superClass = p.prototype;
  	c.prototype.constructor = c;
};

T.forEach = function(enumerable, iterator, context) {
    var i, n, t;

    if (typeof iterator == "function" && enumerable) {


        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length: enumerable.byteLength;
        if (typeof n == "number") {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for (i = 0; i < n; i++) {

                t = enumerable[i];
                t === undefined && (t = enumerable.charAt && enumerable.charAt(i));

                // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                iterator.call(context || null, t, i, enumerable);
            }

            // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i = 0; i < enumerable; i++) {
                iterator.call(context || null, i, i, i);
            }

            // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if (enumerable.hasOwnProperty(i)) {
                    iterator.call(context || null, enumerable[i], i, enumerable);
                }
            }
        }
    }

    return enumerable;
};
T.isJson = function(obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
};
/*深度复制*/
T.cloneDeep = function(parent, child) {
    var i, toStr = Object.prototype.toString,
    astr = "[object Array]";
    child = child || {};
    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] === "object") {
                child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                arguments.callee(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
};
/*浅复制*/
T.clone = function(parent, child) {
    var i, child = child || {};
    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }
    }
    return child;
};
T.RGBToHex = function(rgb) {
    var regexp = /^rgb\(([0-9]{0,3}),\s([0-9]{0,3}),\s([0-9]{0,3})\)/g;
    var re = rgb.replace(regexp, "$1 $2 $3").split(" "); //利用正则表达式去掉多余的部分  
    var hexColor = "#";
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < 3; i++) {
        var r = null;
        var c = re[i];
        var hexAr = [];

        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        }
        hexAr.push(re[i] < 16 ? '0' + hex[c] : hex[c]);
        hexColor += hexAr.reverse().join('');
    }
    return hexColor;
};
T.Trim = function(sText) {
    return sText.replace(new RegExp("(^[\\s]*)|([\\s]*$)", "g"), "");
};
T.varsearch = function(o, s) {
    for (var p in o) {
        if (o[p] === s) {
            return p;
        }
    }
    return false;
};
T.object = (function() {
    return {
        getPrototypeNum:function (obj) {
			var i = 0;
			for (var p in obj) {
				i++;
			}
			return i;
		}
    }
} ());


T.array = (function() {
    var array_string = "[object Array]",
    ops = Object.prototype.toString;
    return {
        sortNumber: function sortNumber(a, b) {
            return a - b
        },

        isArray: function(a) {
            return ops.call(a) === array_string
        },
        arrayMax: function(arr) {
            var arrs = arr.join().split(',');
            return arrs.sort(this.sortNumber)[arrs.length - 1];
        },
        InArray: function(destination, source) {
            if (source === undefined) return false;
            for (var i = 0; i < source.length; i++) {
                if (this.equal(source[i], destination)) {
                    return String(i);
                    break;
                }
            }
            return false;
        },
        equal: function(objA, objB) {
            if (typeof arguments[0] != typeof arguments[1]) return false; //数组
            if (arguments[0] instanceof Array) {
                if (arguments[0].length != arguments[1].length) return false;

                var allElementsEqual = true;
                for (var i = 0; i < arguments[0].length; ++i) {
                    if (typeof arguments[0][i] != typeof arguments[1][i]) return false;
                    if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number') allElementsEqual = (arguments[0][i] == arguments[1][i]);
                    else allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]); //递归判断对象是否相等                
                }
                return allElementsEqual;
            }

            //对象
            if (arguments[0] instanceof Object && arguments[1] instanceof Object) {
                var result = true;
                var attributeLengthA = 0,
                attributeLengthB = 0;
                for (var o in arguments[0]) {
                    //判断两个对象的同名属性是否相同（数字或字符串）
                    if (typeof arguments[0][o] === 'number' || typeof arguments[0][o] === 'string')

                    result = arguments[0][o] === arguments[1][o];
                    if (result === false) return false;
                    else {
                        //如果对象的属性也是对象，则递归判断两个对象的同名属性
                        //if (!arguments.callee(arguments[0][o], arguments[1][o]))
                        if (!arguments.callee(arguments[0][o], arguments[1][o])) {
                            result = false;
                            return result;
                        }
                    }++attributeLengthA;
                }

                for (var o in arguments[1]) {++attributeLengthB;
                }

                //如果两个对象的属性数目不等，则两个对象也不等
                if (attributeLengthA !== attributeLengthB) result = false;
                return result;
            }
            return arguments[0] === arguments[1];
        }
    }
} ());
T.html = (function() {
    var filepath = 'lib/htmllib/',
    defaultcss = ['width', 'height', 'class'],
    ops = Object.prototype.toString,
    dc = document,
	body = dc.body;
    return {
        getElementsByClassName: function(className) {
            var all = arguments[1] ? arguments[1].getElementsByTagName("*") : document.getElementsByTagName("*");
            var elements = new Array();
            for (var e = 0; e < all.length; e++) {
                if (all[e].className == className) {
                    elements[elements.length] = all[e];
                    break;
                }
            }
            return elements;
        },
        getClass: function(obj) {
            return obj.getAttribute('classname') ? obj.getAttribute('classname') : obj.getAttribute('class');
        },
        setClass: function(obj, classname) {
            obj.getAttribute('classname') ? obj.setAttribute('className', classname) : obj.setAttribute('class', classname);
        },

        rendBox: function(config) {
            var obj = document.createElement(config.type || 'div');
            T.forEach(config,
            function(item, index) {
                if (index === 'html') {
                    obj.innerHTML = this.getHtml(item);
                } else if (index === 'style') {
                    this.css(obj, item);
                } else if (index === 'class') {
                    this.setClass(obj, item);
                } else if (index === 'drag') {
                    if (item === true) this.Drag(obj);
                } else {
                    obj[index] = item;
                }
            },
            this);
            if (config.output!==true){
				 if(!config.rendTo){
				 	body.appendChild(obj);
				 }else{
						this.isFunction(config.rendTo)?config.rendTo(obj):config.rendTo.appendChild(obj);
				 }
			}

            return obj;

        },
        Drag: function(obj) {
            new dragbox(obj, obj.getElementsByTagName('div').item(0));
        },
		isHTMLElement:function(obj){
			return 	ops.call(obj) === '[object HTMLElement]';
		},
		isFunction:function(obj){
			return ops.call(obj) === '[object Function]';	
		},
        css: function(obj, style) {
            var style = style.split(',');
            T.forEach(style,
            function(item, index) {
                var temp = item.split('=');
                if (ops.call(obj) === '[object HTMLCanvasElement]' ) {
                    obj[temp[0]] = temp[1].replace(/"/g, '');
                } else {
                    obj.style[temp[0]] = temp[1].replace(/"/g, '');
                }
            },
            this);

            return obj;
        },
        getHtml: function(config) {
            if (!config.file) {
                alert('未指定html文件');
                return false;
            }
            var html = T.ajax.ajaxGet(filepath + config.file + '.html');
            if (config.filter) {
                html = this.fliter(html, config.filter);
            }
            return html;
        },
        fliter: function(html, config) {
            var regExp, html = html;
            T.forEach(config,
            function(item, index) {
                regExp = new RegExp("{\\$" + index + "}", 'g');
                html = html.replace(regExp, item);
            });

            return html;
        },
       getPosition: function(obj) {
            var topValue = 0,
            leftValue = 0;
            while (obj) {
                leftValue += obj.offsetLeft;
                topValue += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return {
                "left": leftValue,
                'top': topValue
            };
        },
        divCenterx: function(obj) {
           return (body.clientWidth - obj.clientWidth) / 2 + body.scrollLeft + 'px';

        },
        divCentery: function(obj) {
            return (body.clientHeight - obj.clientHeight) / 2 + body.scrollTop + 'px';
        },
        ex: function(event) {
            var evt = event ? event: window.event;
            return evt.pageX ? evt.pageX: evt.clientX + document.documentElement.scrollLeft;
        },
        ey: function(event) {
            var evt = event ? event: window.event;
            return evt.pageY ? evt.pageY: evt.clientY + document.documentElement.scrollTop;
        },
		loading:function(width,height,left,top,insertBeforeObj){
			
			var box = this.rendBox({'output':true,
				'class':'loading',
				'style':'width='+width+'px,height='+height+'px,zIndex=100,position=absolute,left='+left+'px,top='+top+'px',
				}
			);
			body.insertBefore(box,this.isHTMLElement(insertBeforeObj)?insertBeforeObj:dc.getElementById(insertBeforeObj));
			return box;
		}
    }
} ());
T.isEmptyObject = function(obj) {
    if (T.array.isArray(obj)) {
        if (obj.length !== 0) {
            return false;
        }

    } else {
        for (var name in obj) {
            return false;
            break;
        }

    }
    return true;
};
T.string = (function() {
    return {
        turnweishu: function(textv, weishu) {
            var obj = textv.split('.');
            if (weishu == 0) {
                endnum = '';
            } else {
                endnum = '.';
                for (var i = 0; i < weishu; i++) {
                    endnum += '0';
                }
            }

            if (obj.length === 1) {
                return textv + endnum;
            } else if (obj.length >= weishu) {
                if (weishu == 0) {
                    return obj;
                } else {
                    return obj + '.' + String(obj).substring(0, weishu);
                }
            } else if (obj.length < weishu) {
                return obj + '.' + obj + this.repeat('0', weishu - obj.length);
            }
        },
        glCountInstances: function(mainStr, subStr) {
            var count = 0;
            var offset = 0;
            do {
                offset = mainStr.indexOf(subStr, offset);
                if (offset != -1) {
                    count++;
                    offset += subStr.length;
                }
            } while ( offset != - 1 ) return count;
        },
		repeat:function(str, num) {
			var strs = '';
			for (var i = 0; i < num; i++) {
				strs += str;
			}
			return strs;
		}
    }
} ());
T.form = (function() {
    return {
        serialize: function(form) {
            var parts = {};
            var field = null;

            for (var i = 0,
            len = form.elements.length; i < len; i++) {
                field = form.elements[i];

                switch (field.type) {
                case "select-one":
                case "select-multiple":
                    for (var j = 0,
                    optLen = field.options.length; j < optLen; j++) {
                        var option = field.options[j];
                        if (option.selected) {
                            var optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value: option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value: option.text);
                            }

                            parts[field.name] = encodeURIComponent(optValue);
                        }
                    }
                    break;
                case undefined:
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;
                case "radio":
                case "checkbox":
                    if (!field.checked) {
                        break;
                    }
                default:
                    if (field.type === 'text' && field.value === '') break;
                    parts[field.name] = field.value != '' ? encodeURIComponent(field.value) : 1;

                }
            }
            return parts;
        }
    }
} ());
T.canvas = (function() {
    return {
        drawDashes: function(x, y, x2, y2, dashes, width, linestyle, color) {
            var dashGapArray = dashes.replace(/^\s+|\s+$/g, '').split(/\s+/);
            if (!dashGapArray[0] || (dashGapArray.length == 1 && dashGapArray[0] == 0)) return;

            dc.lineWidth = width;
            dc.beginPath();
            dc.strokeStyle = color;
            dc.dashedLine(x, y, x2, y2, dashGapArray, linestyle);
            dc.closePath();
            dc.stroke();
        }
    }
} ());
T.ajax = (function() {
    return {
        createDocument: function() {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"];

                for (var i = 0,
                len = versions.length; i < len; i++) {
                    try {
                        var xmldom = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xmldom;
                    } catch(ex) {
                        //skip
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        },
        createXHR: function() {
            if (typeof XMLHttpRequest != "undefined") {
                this.createXHR = function () {return  new XMLHttpRequest();};
                
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i,
                    len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            var xhr = new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            return xhr;
                        } catch(ex) {
                            //skip
                        }
                    }
                }
                this.createXHR = function () {return  new ActiveXObject(arguments.callee.activeXString)};
				
            } else {
                this.createXHR = function () {throw new Error("No XHR object available.");};
            }
			return this.createXHR();
        },
        ajaxGet: function(file, tflag,flag,callback) {
            var xhr = this.createXHR();
            var returnValue = '';
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        returnValue = xhr.responseText;
						callback ? callback(returnValue) : null;
                    } else {
                        returnValue = "Request was unsuccessful: " + xhr.status;
                    }
                }
            };
            if (tflag === true) {
                var now = new Date();
                var number = now.getYear().toString() + now.getMonth().toString() + now.getDate().toString() + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
                file += "?" + number
            }
			
            xhr.open("get", file, flag===undefined?false:flag); //false 
            xhr.send(null);
            if(callback===undefined)return returnValue;
        },
        ajaxPost: function(url, data, callback,flag) {
            var xhr = this.createXHR(),
            returnValue = '';
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        returnValue = xhr.responseText;
                        if (returnValue !== 'SUCCESS') {
                            alert(returnValue);
                        }
                        callback ? callback() : null;
                    } else {
                        alert(returnValue = "Request was unsuccessful: " + xhr.status);
                    }
                }
            };
            xhr.open("post", url,  flag===undefined?false:flag);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("data=" + encodeURIComponent(data));
        },
        ajaxGetJson: function(file,callback,flag) { //获得json
            var xhr = this.createXHR(),
            returnValue = '';
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        returnValue = xhr.responseText;
						callback ? callback(returnValue) : null;
                    } else {
                        returnValue = "Request was unsuccessful: " + xhr.status;
                    }
                }
            };
            xhr.open("get", file,flag===undefined?false:flag);
            xhr.send(null);
            if(callback===undefined)return returnValue;
        }

    }
} ());
T.xml = (function() {
    return {
        parseXml: function(xml) {
            var xmldom = null;

            if (typeof DOMParser != "undefined") {
                xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
                var errors = xmldom.getElementsByTagName("parsererror");
                if (errors.length) {
                    throw new Error("XML parsing error:" + errors[0].textContent);
                }
            } else if (typeof ActiveXObject != "undefined") {
                xmldom = createDocument();
                xmldom.loadXML(xml);
                if (xmldom.parseError != 0) {
                    throw new Error("XML parsing error: " + xmldom.parseError.reason);
                }
            } else {
                throw new Error("No XML parser available.");
            }

            return xmldom;
        },
        getLength: function(xml, glue, index) {
            xml = T.Trim(xml);

            var glue = glue || [],
            tempstr = '',
            index = index || 0;
            if (xml.charAt(index) === '<') {
                for (var i = 1,
                len = xml.length; i < len; i++) {
                    if (xml[i] === '>') break;
                    tempstr += xml[i];
                }
                index = xml.lastIndexOf(tempstr) + tempstr.length + 1;

                if (T.Trim(xml.substring(index)).charAt(0) === '<') {
                    glue.push(xml.substring(0, index));

                    glue.push(arguments.callee(xml.substring(index), glue, 0));
                    return glue;
                } else {
                    return xml.substring(0, index);
                }
            }
        },
        gXmlPrototype: function(xml, prototype) {
			
            var xmldom = null,
            arr = [];
            if (typeof xml !== 'object') {
                try {
                    var xml = this.getLength(xml);
                    if (typeof xml !== 'object') {
                        xmldom = this.parseXml(xml);
                    } else {

                        for (var i = 0,
                        len = xml.length; i < len; i++) {
                            arr.push(this.gXmlPrototype(this.parseXml(xml[i]), prototype));
                        }
                        return arr.join('@#!');
                    }

                } catch(ex) {
                    alert(ex.message);
                }

            } else {
                xmldom = xml;
            }

            if (xmldom.getElementsByTagName(prototype)[0] !== undefined) {
                if (xmldom.getElementsByTagName(prototype)[0].firstChild !== null) {
                    return xmldom.getElementsByTagName(prototype)[0].firstChild.nodeValue;
                } else {
                    return 'none';
                }
            } else {
                return 'none';
            }

        }
    }
} ());


T.glproxy=function(func, thisObject) {
    return (function() {
        return func.apply(thisObject, arguments);
    });
}

T.color = (function() {
    return {
        getcolorFromByte: function(color) {
    if (color === undefined || typeof(parseInt(color, 10)) === "NaN") {
        return undefined;
    }
    if (color.indexOf("#") !== -1) return color;
    if (color.charAt(0) === '-') color = color.substring(1);
    var color = parseInt(color, 10).toString(16);
    if (color.length === 6) {
        return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
    } else if (color.length === 2) {
        color = '0000' + color;
        return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
    } else if (color.length === 4) {
        color = '00' + color;
        return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
    } else if (color.length === 1) {
        if (color === "0") {
            return "#000000";
        }
    } else {
        return "#" + color;
    }
        }
    }
} ());
function preventDefault(e) { //阻止dom默认
    if (document.all) {
        e.returnValue = false;
        e.cancelBubble = true;
    } else if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
}
function getByDigit(prototype, pos) { // 1 为true  0 为false
    return (prototype >> pos) & 0x01;
}
function setByDigit(prototype, pos) { // 按位取反
    return prototype ^ (1 << (pos));
}
function clearCeng(obj) {
	
    if (arguments[1] && arguments[1] === 'class') {
		var handle = arguments.callee;
        var objs = T.html.getElementsByClassName(obj);
        T.forEach(objs,function(item) {handle(item);});
    } else {
        var obj = typeof obj == 'string' ? document.getElementById(obj) : obj;
        if (obj) {
            obj.parentNode.removeChild(obj);
        }
    }
}
