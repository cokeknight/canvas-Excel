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


// JavaScript Document
var _gl_renderTo;
var _gl_canvas,_gl_canvas2;
var _gl_drawContext;
var _gl_width;
var _gl_height;
var _gl_items = new Array();
var _gl_mouseState = {mousedownstate:false,focuswin:null,focusel:null};
var _moblie = 0;
var screenAvailHeight =window.screen.availHeight; //屏幕可用工作区高度 
var screenAvailWidth =window.screen.availWidth; //屏幕可用工作区宽度
var tempcell={row:0,col:0};
var is_mobile = screenAvailHeight*screenAvailWidth < 930*1280;
var chartOnly = /#onlychart=(.+)/.test(location.hash) && RegExp.$1==='true' ? true:false;
var _gl_cellButton_image=['iVBORw0KGgoAAAANSUhEUgAAAIoAAAA4CAYAAAAihWAaAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEUklEQVR4nO2dO28lRRBGT/X0vTYrLNZiA6QVYhESOTkS/5lfQYxEzFMIGeTVYrR+THd9BN3z8Nr5DbpOMvfOJBOU6vFVVY/9+PuNSEZFJAEIMIJxKYgDIIljnvjk4wP5+5/+4TAZ4JgSZoYrDGVorJBS5r6IiyN88+Yl+Y9/Zz5/ec6Lw0T1hJIxqZ76VYMTktORuTp/vy/89a7w+vKe/MXlOd9+dclnFwfuBaUKw0/9rsEJ+egwcTtXfvj1HT9f/Ye7k19dnPHlq3NeX2Tmnp7o1G8anJQD8ODwy/Udf17fIof84JX76hRgFtTiYOnU7xqckDzBXMGVcDIyyBI4RgEeKnhNYOFTRqZk424WcxWYkzCyuaEK5iBBBYiqZ2gK4AamipUCCZLTchI3cOhaShB0Z5EmcMjQhBV/dA2PMjISuETd2UGShJux5CoeHmV4qvyJs8hm7cbePqSwlqGR4dZSVe/2kmXNMFrYaT0fiPJ4ZFpB036n9SrhElILP+FNguY4es66eJT2wCgOLnBZ9I4Hx/W0iZP3YaZZUZjJ6KhHmMWbmBm5ShSB08qh6mBhK0Oz2EH1noqYNney1MwWVjI8z+WpuSWzhiRq11Kifzw2MlvDz0J+9LDfV6SzQ+NdKtmTIa3xqHhrHEeFPDbure8n21KR7lGa0Ca1p6GljE2V4f44V8mSmpH4UjsrhvAHZy/dQy+P14eLGudEfTw4iy3sybAocYbkKCVitnpsKkYF5IZ5BdcWemqX79u4QTAyR2+RZe9VWvfYbVVmI48Nqpy6arHt2kIPW/fYI5cdniWyVISStWS2zaFoFVmk0GVHp6InomsbM3DDl0m33QxCMCYitWR2dy+L1k52QVWroUPCHxut6vw2gpKXB5UtVwnGptIcx6LMSiJXWo7SfE1UPQF4bf2eipgwUlp6PUp9xIB1vycYl2y25ie1/8rLHweKQHHi0vD4koosocf6mME6ie9Nyo8d9bHROo+yS2a3CbdNQwk7GZuilqeoOw/Tbvd46fFEfhLomZmkvG0IQl0XwcJYRmZS6yD7zhYS9Jik5y0pCACySBhTDz1CZjFnMDh7+X5iNzO7n0eBKI5Hx5/JV/NyksG2mBxmMjpTz1UrHyype1/8ql3fj23BsXE1W9iTfS+4mUW/J+gN4m0UMrGUx8Z6PFfYSLBuY+xYz0dR3w6Liif40EjWvR5fT4NsFU9oKWOz6Wn7Xo9tzR93Byzq48Ep1k4KRd0ugIwK7gWpj6bEVxMCtZXSmpy2uOFkI0OaKEA1oEZ5PDomRy7M1T721brHYpqMKdN2ji3K4+E5S6R7YLcElotXygzznfqZXfHNhNE53Dq1prbfYyBz8vXNLb9dveV4WL4lmOILYINzlHggc/X2ljoXZkE+uHN/c8M8tcUfVDGmU79rcELeJ7VTl+YHXhwmzvNE/u7rSybbejyTPELP4FRNZCrFz8jHc958es7/X8sAEz9H9p0AAAAASUVORK5CYII=',

'iVBORw0KGgoAAAANSUhEUgAAAI0AAAA5CAYAAAALBajGAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAHWElEQVR4nO2dQY/cxhFGXxU5u5IWtmBB0CFxTgZyCJBcc885/9Y/IwhyiE/JxZCDJBAsay1LWu8Mu74cqptDzki5yQI4/YTZ5WiHAxAsVFd9VdU0qeg/rya+u93z476wIwgKzgAAMrACOJ0tE2CBcEwgCm4jFCOGwKOwG6/58slDRuF88+/XfP33H3j+/R0PdzvMhSQGRJgTEm761FfV+YhIwsxWx5JwOcWDnw/i2WcP+PMfnjICPL+d+Mu3t7x8N/HVsy+4vjKKACYUIvDuZzaOmaFihAVOYDYgiXEQ99PAP1+84/HLe37/q0eMRmCCB9c7fvvkCX/63TO++My52xuBMAE2IMqnvq7OR8RMqDi4MAUyxxFX18ZPd4UH3/yXH16+SUMCGNhzPThPH4989eUjfv105PUdlIARUbBPfU2dj4yZUBjmLQwxzODRQ/Hqx8I/vrvm7U/vkJExjXAGBVHgvsC7SdzvQRhTiDDDiE96UZ2Pi5mBQGagwDAwMYywPzj7gFA6jxGAYYQQKuIwOff3xlRAAZITBq4e1WwdM5CgZcpmxv4Q7A+GZBjgphrThJgcgoCYQDvAmBYRdfQVatNI7Ue70cLNEE6RIITVDHoEx0y0pazIEEYUAKuW17kMbHUsgUoai+yYio/zR+x4gqrFLfP1ziWSy5K0jmdno8k/5u+QUaiBj/LkzrYxpfjfjgHkQsrVJ3FcC6OhZkeS6ou+NF0Qmn/MvzAZIZACLYLas+Upqi6jgFiUDrwb0Max+X67DNAi+VlnziMnKPIVsLKurgdfAHUZynttWEARFAXB0WvMRhMGheXSFESsA+TOlknvsj5uce56mVl7Gjngs8CjVd7e2T52diyJk+QpjcbImEVSxjQSh6rXpN0sQuvONjFBgEw4lm1UAaWGKEVexT2dxzQlCxC1hJBuSa3a3dkui/sbNZWSZQC8jGdgqdO4tQMKykAYI80vDaezdbzVE0BgtSFm2eWwUoRdaVGBCC0DIKsFy1/+Ejq/NCJMDOEUh2HWaWqCVG1noQjnH6IuS4X0Lp5G14W+jRMGHo48m++yRikifCW9wEn2JGUQXJQajVRzdnWdZvOoxrNh8z2PWncM7P06jZllX6hZ/VDGNCaOS11n07R+mpYsG1l/LB/SaeblqUBUJZCoCXqh9+1tHAcMpxAMYRQXgxmTIEJIJ7Wn9DKGZneUHwpLT2PHlq7ORqnlasAoXjU7szn4lY6yy4mnqf0TcWyTgMgWiS7UbJp5SarVgGj/F/ZhnabROrQy7VbVaroivHWa8D97HEunUdCHs6fs0EsvM4URtdLdHcylEYCn8yCIaN1779NpKEiFiJiFPVVlsHMZ5PJkpBZcX1E7OavFrBVhhuw8J1OsEjX9ghwK7y5n06zbH+pmAHKKIGKRO1ss+mkkLGJOvefS+Hu/tLM9cr7NomA21EXKs6/KfHX/zwLhUBV0sNwtosbA3WS2Tk5VRhV0s26ZmXOUNKFG1WmUH1c9oU1XBhTTUeTrbJsqx4kAy91CpshCdmZXjoWf1J4sleBARGTNwUJzY05nu8y9Uy1LUm3GmvU6aAn50WhsmE8q8qoKtwzKe8Fy8yxm3GoTViEY5Is4N1kYTcypVQhKVYi9Vjj7+P+2yY2rYj4Gw2tfVdFiynaZPc0FS9lcoMq+muVYQ2e7LPchUn1fZ+BUOzlPxT0WbqjMnXtNVO4RzdZZ7xcBmGHVceR49kn2BGBeN2WkBsLKvWkM1X+drZMdmsLM811AFM5mn1aeBpbV7mMgrNoi0dk+akPdWblGWgh71UaO/TSAK+okQu2pqRnUcvaus02OW8p46jRysMBNs9hrxLr2JOpuV/LaT1NPrE3mfRph45gdvQxVEp57q/5vY3nLmFownLWoeQO/znaZYxavaZK1d9lwvuC89lRL4q2+bVa/o3uaiyAD4aVCDMe5/uRshKXNPpXmZQAi17fOBSDHLMuN5plFl5Pa47nR1NY+RW0YbVlV395z0xwD4VbiXscz7/U0OXGQbmiKuldNZEbV7WX7ZATSVpZjK4QD00loch7T2FKvqRsc4fTJp+3TUm44BsKnxUqAEWLVyhlF1TxSFQxrrquXLLdMrkxOG6mdOzbzAU753ARSehmFU4pqY3nOZObWaVp8YU+dLoJZp1kQQB2gHDyHKkchxsEwBrKXou2Dv950uhvOJaB5AMpwZLUG2ZarEFJhdIRpIjwlYhsMc8NH+kaNF4QsNwA4DV19gGFw3HMWKszz2QiFHR5OmJgmMe2DUoLlI+p6wXLb5L0ekLJzSjWWLcU5HCZUCgOWMU0I7ifn1d2BF29vGQZntxt6L/mFIeXoyinuUIp4/vI1j33PPmB0g5tRfH7lvH574PDmljLkAy9z54A8uS9T26bFrMuHn7b3ktjFgZubkaurK0xxr7/+K/jbt9/z4k3waCfEVAeljk9h6UazbU7v8TLxMQbuD3tubm74428+xyJC0zTxc+lG0fkwUSbcnQe7kf8BlZVEMnAYgwMAAAAASUVORK5CYII=',
'iVBORw0KGgoAAAANSUhEUgAAAIcAAAA4CAYAAADXe+uqAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAJeUlEQVR4nO2dTY4byRGFvxeZxW79jDCagY3ZjDFLbw0DvoDhO/gW3nrry3jnM/gAvoB3BjzwD2ALkqbVzSZZGeFFZBVJqdWSYM2IxNQDGuwuksUu5KuIyIgXQb38yx8jXm3AXhEhTEFgSAUcmoL7IOne5xd8WkTk+r2+TurHXY4FKKDJULugfvaA4ZtfoG//8PNY//slenQDqhhBKIBCccPL/eRYcNpQOHHH/Rv9oLXA5UgFJ9DNJZdff8WTX/+Oevu3v9KuxeMnD2G4pGx3uBoRI2ZOjD59yg94SQs+Nrr9mC3I9BiDCCuIAV9fs/7XM9bjP3jw4p9UPSo8/uoznv7qt5TPv8SuXyDfpDnyLdEAbxhJkgjvH3P4oQtOFQrhOGYGiFABKwQGVqhmjPUSHjxh+5+/I/2JsRXEihrDQH30lEc//Qa+/BquXxDjGmIH4y1EQ94IHAVEtP0Hs5DjbGACjJCBCioVrBJlYLV6jC4/x8z47tFj/GYNOBUg2hbfXmG3z4n1MzSuIQLahnAHb4BDeB4nAx3FEpCeBeSgkqSguxFLckgVLkYI0OaaGBtghCnJ4THSxjUar2F3g+/WqI2E7zDfdavhaUUikhik1ZDKJ73uBe+HkPpa5WOUiqhErWANmuF+Ax5kBGvUEk4JxzxQc3BPNxIjFiOEIx9Jy9Fmi7FHu/OfWXAaCHXrHqT1wMACucCERqACo4jRMAUisIA6qhIqRDSibZDfgo+obQnfIUY8drkv9nHZtJwZhBFyIGONkKG+uQCI0iA2eNvSfEOLkRC4oNK2KHYQW8QOjx0W2+5KGsSIWku34uM+AlX/gLAf/IIXfAAmy2EZLwrLuHHmR4U2UmKkyDGEKEiimlVwoR5ryiNdCSPBDsIzi4Yn40QPTKeT+53/04ITQQaGEKWvXesJsIZwRMPD8++AoIEsyZFncIIRYiQskhjRMtaIoPTYg/AejC6EOCu4+o6lZgwSLQnjW0KrfC5G8C2QS+3uEznoC54WIiKSHHlmIrqLIdASgJ4fJuvRnQZ4EsIif+e1LHh/rIfnyGPRzQ0QrW9fW5JlcikLzhDar10YEULUHjseEOQgrVmP3++5z8WPXtRPPec3jp9Yti8njcOqW0S3IG/D8Y1v8J67Dek4G7qQ4mww82Nav7cSxO75K2zOwe9PEoRNJ7vbNy04XcTsBaIHpSne0HusnR2akui5i5Djop9sYtsSa5wj/p/aVzcRPkcYPlue2Rblw5LsOk+EUKjXS63/HHiHe2BAj1wzxSoPFDbLywg/8h53qYoWnC5CqezLm31ShfXKug4ihHkjsodN+sE9MfoTb7ikzIouYcZ5QRy7lsP1UxwU5nRgTSI3H+b6AGuwWI2zx9160jg6PpGpRifHFIRKdJekTKTNjDCg5WsjMOUbYzElJw2laUgL8fYX3elWKuyZop7LmAuvR5Hu3q0cmamPcw0Lvi/0m1d3sWNS8x3c3xbdkkRgxYEea8jjWMzjr6lExZtOa8FZQXeUP9rryzjVVnwOSAqUVCSjkiexftydiNKLb10WOJuX7+06FnwMBPtsRJcKhnXJoJXUkxYjaoq+0h6kB6mBZRxhglJRLUQzFBW8gKWb0RScLDhPmDJFYQVZ15BaTe2GVWSGmaGu5QCoEUG0Ea2vYfUcrr9D21fQtuA7wrepPvddF5/Gki09J0h9zUqqzTGiFCiXuA2YVdgG4SLWqT53DQRQB0HZrtHL/xK7a3TzAsZrGDfEboNaF4FEtii4O7IpyIFFCXbi0LDvly17SxFlhQ0PwFbE5SvYXsHVCzRusXKJwjLmiN2OuHmJ2g2xfkFsX6FxA5sbiB0xjshbKtMPs6W8owK84CSgw2psqVAKsku4uARdou0Wxi1cv4KxEUOGExbYUT1lPlEYohyX6iWmZJru2zcvOC0c7Fdd+71EYHdsb/e/zmKfMBElCSGrqAQMA7QgSszKsDRRvhDjXBDWayG9DdIKshXUVXcvhkolbMBtAMBpuF4rzSlSti6JkNMO9aKL/zhPyOcb+i6xjyzmFldwZKk0LdnEAIQoHLc1KibmNMR+h6JY3Mk5Ye8lcjX32e2p6m6kbjjeKLZWSqTrmPpgUyyKMNRKilHJPfK+5LsnyJIjPX3s48i5Pt+fcVpkfoNeM3NEKCUblZZBZrZOHtZWunR98iyT5Xht67pYkdPG4c0bljkPHQQUhTarCM1sHgEl6X3VxSxKsB8hlhVf8Fa8PzmWlPmPDovlWPBWLORY8FZ8eEC6BKZnjoP1e8dW8z1X+i0vW4hyBrCDdTpkg965fjlNsOfdmcYQ9kc3oShADvxI9dCBtEgAy8C4U8ZMhz7YT4ctCICbpVhchstpc+a0dYExftC7AHORRpYSMmrKBqU+pDazpVOvy4LTxdznLOuywIpsIEqFPrkYujRUZT/ZmAPLIU360dQSSg00pOJc0UUjY++CcaD0AXWLazllHFuOsvcQWJ/PMR0bZusyoU5vdBuQDakrLKvMqLojZb1FxVDL4WL5Hk+9RyyW4+ShrJfIKqHapxdfQLkAdZGxjvWjMOs5plr/AGWAVlBUVAdonX0hUOvWpfX3aCHHiSM0hQw5ZhIzKEOSpVYg9RwM3TAAk/Szqg9NV1lBuSDKKpXJh7X/ZjlQzCJHQc0nWFzKqWOelWB9KL4qlAHZBdgAVqFepJa01D6fJVGdwKVkTV1BWaF6SbRd718ooC4y9gZcsIiKzwcRMd/oslSgY6uceW4rogwZpJYBt5pxZO8yqJiyj6EmgzRcppVQBisRrQ+nHXpHXM6rzPGEi+U4eWSb/T7uwJIU3WKoDGj1AIZLrPZWhY5axoCHYJdfwMPPwYK4TSK0cUsZNxlXxK5PFhw/3YUu+GDooG8l81dDBqVDjy+HgVYfoodfUK5voOQoH2uijsUZN0ZbP8OsENsdjDvUbrHmeGsE+Z0rKTD2Y1P1iS9+wTsg9fXqaSyNhAJ3x6oT24aGC+RX7G43xAjUkaiNqu9Gbq+ueGZ/RqsHNL/G+ojr0gJnrzjH3+x205IhPWnE4W5yTohlsius5C60DlBWbG+fc/PtjvqTDdo5dXj6GevtLVfXz7HrK5o5FvmlXSX2Q+Tu+fjv67oWfFQcrmObe5UgsCiU/DYVeGTY06+Ih0+oT37zex693OAXt5TWkk0eNCkzrr6f3QG9Kebg25rK4lhOHhMR3hzlNTU5OaXtssbmj1k9fczFz37J/wC56KjvCuy8ggAAAABJRU5ErkJggg==',
'iVBORw0KGgoAAAANSUhEUgAAAIgAAAA4CAYAAAAmcLAnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKA0lEQVR4nO2dwY4kRxGGv4jMmWFtpJUFBiEjIeSLJSxx4gX8Ehx4M56BJ+DKhStXMBwQCBuD2MVez0xXZfwcIrOqunfWu0JY023ql0bTNVVdo1ZGRfzxR0S2Tc8/0fTZX5lfvCBkmAk3IxGcQhK2nH8VXn7fjnOA44IwcIG8YNEIo6+pIwlFxa4b1+/+kHr408d89utfcvvxn9HVPW73BNZvB9K62PE6uxjQm16442uB6eG/y3Dy8S22GspYbxkUge6eUL97wzsf/Zx6+/ff8+y3v+L+d19y9R5cfysvlGDrKIZxvNZ57DhrNAA5AhpBCZBZeg4zWhNf/gXqU+PJjz6k4g23G26+f8fTn/6Et999j9Ya4JgZ7g5myEv+B7c3CDE7HhXy/HVKByQgkBrWgmZQWqMpMIFXZ3pxi8pviFsIzdSmAldvU7/3nKfvf8g7P/6QaZqQgXsFr5gXrKTByAvCH+eD73gj2IYDis4vJCThCiICWtAs0kBag2hc31Tu/vWMLz/9A7efPsPtilp0jduMyzEFQVqd4RgF0clLFMINl8NrHchuQI+J0wdYg5Ko0WRgBbM5qaJyhW1wCgUFY+aWwKnYRLOKBWia0f090Rp4QdYwr1AaZg5WCDOas4eZc4YcLI6PAdGwEKbI5CPEHBPWZqLN2P0Vmu6IAFTAgnp6bzPrxmHghty6ceQxi3fZDeRsYQDl5Bg88qHHCjRBjxayAp68U0ue098zXkhraiS1o2NYM9c3TnV3nC1GFvxQFDhd93p6UlK/QYPILEZKrwGBhSOPlfxs3ruHnTOHCRS5VhEgEWqYAgSmSIIbq5FUs0xbh3oqKS+Sp2cK4SVQGOYAgQ13sjE2Ozne8Zg4DhNroOiLr0A0hCDUvUZDKpja0Z3qNuOwaKAGLcAt0yFmzCqG9fW3B5VS2xjYjsfGaakjj/MhHh6kZy8EEQ1FIIsligyrqGNBpUjjiIaiLXmzkaobpvQcVpA/ELu+nk+6438IE0hzN5DW6y4T1lI8o80Q0TOgAEQdhFQSEYHaDK0hN0RkztzvLtLiVFYDOfUcOw95fGy9uHUZ3cyI0JKAqBsIbSaGgXhBMY+7AFApNSu4IaxNtLjPc7NjRUlkLA3F3QnbcBBe9hy7JzkvaNFARohpKGaaGo5QCyLm1EIsnYTNQVDA6okOIsHU0s3IV8HFSxLXksT1oRCz4/wRUhKG1olqpxLEnJ7EBPOEsqSHmdJAlrDQZiwm2jzoaEEWGA0oBKNQVx76/zvOHBYNAYrA1FAoExKSd3oziANqg4d0HUQS0SDahA5z5siAhcAbNju4ZfEO1srujouCRXoGlzLUKFATYsZaklJaW66DIZT1BTeBR2PqFxgg0jAUvaDjlmx3x9kieLhcKjZCqJKwZgY8YyGEYdGwRYLfKKlpVDOa77HWkDnYjHvFLJY+kFRQdw9yznjV6piyYBcSPqSMHk6izRRqcpAlC/JUUsebiQbtAEEWdXCktngQumGE7z2nlwiLbBgyIGKGaCmGmvAmwpNmWKySRZJUjWajGc0TROB4ZitRwFN1UycusulxPuGO/xomCI3spORaKxuHsMjMxiKjx0ZHqSNfcTpJjbnLrmCtYNYLOmab9GdPc88ZpxV3XxqGxosp+QdZoFOIJnEVjSnmVNRZspikMxYGoW5B3VMokM9YlC63Z3fZ3rl83tgS1KMG92Eg1ssqgFoct3rE3GtwiZ7FDB4SxDyBNRTW5ybSc5gZWPal7gzkvDHk9VNolFtnZemkF+2WZmY7zlDDoKaFiUC0lvwj+wMsizhWGC0Bw1ft3WTnDj28QsNoYpUroldupT5R1eLI61SAsKAA3psJh0wS9OKcZauhlvR2r7icNWQPD0+NjHVzWS5lF8m6FWxD1NIwZHKY7tDhi0xzR1dRP6+hg+zO4yJxFHI2pNWU3YGSklIc7pOeeNKJKjOMig5i/uI5kwdNfdJq2JptSvlaW4d2XCZyii5fp8SRx+GFdpiYDsJvCkahGgWzghro9gXND8wxLC6Hfbfp7d4xdtkws5WDKDPS1te3lULMMzEB192DYF0Y6QQ0AjzUU53ezJpnjiTYHZeJ5fGW5Qjmph+Z3nJYBJPFcS0GwN0ppdDcsjC3YNPTCGgnIhcNV3qSxsozAcy9S6ZrqntkIJnK1t72ro3HKMt5SdjeMHTRUP9ZhbPhQbyX9Nf17QaSHiIWMax7jAcU011m/+ZgVOXHmo4ZqAFJGw/ihrn3ZuW9nP//AvWh7REZIrLVcKAu03TQ9wOpLIT0ld5iJ6mXjbVYkgP+fSpy/LwUYrrFqHuR1FMTOx/9JuLkAe8G4u5kq4/WnlQzLbWWcdHWKLS56c4/vhkYyYcTy/Fab7OjwFElI2tzAeUalWvQ+ibf3HAYyD7hf/nIHtTkmqmkiuoFi6GYO6bTNJeCeSGi7yExrOokHdodyYUjBGXDPfooZqa5zjZuVOjbXRpQHErNMBO2SX/GDiTH1cAdlwm5lhrM0LZUHPOS0/6DoliMfpCRwRTMa47keTYGLewWFgPZldTzxjZNfah2tpxWn7eWQIaXipWuonbZ/Xj00goqtc9ACPeVvIJnXwh7w9D5YzO8/cDZUUbR5reF49WxufZ9YBL16IZe8XqVhbq+sSp9FkZG7lXGrqZeOrbDUz0j6RmMZ6lls741xrSVdw3ePQ1hU3M5HZjaB6fOHV/dNTyakl2k3hFCCqwUrNSVe2ppOezNZu5dj3daRIaSEWZYDUO7BzlzvKx0H3ERH22FAWHIW+49Z95DxVFXu+HqW267QSlEE157I9FoObTcaUhu65zFjrPEQ41d27yiKCfrnNwLVQEUMospjhy8+SCpjVHaNyvICz7mYmxNdbdq6y6EnDccW0YchmEMn5I1NuGeQhhjP35GJps7aQ8xtJrGhUqhjIJ5irDmZVVPebiYs+P80NgM0b2EbDmMrNLhliX+dBCeW3vYGpJyfxDLSYoo+WNzNrEagXzU89au9t08zhuvzTLNKX3fShEQmZTU4swYFr40fOQm7UHfzB8KRnjpw9rOMAfzLr0DOwk5b6xjsieIbdjR8sUNbVCK4rQei1qPTRX16m1tlHrF9fUT5rEVt9mifeCGjeLOvsPQxULKrR5k0fcnE96nJ0ut1KsZvwpclqOXMiNMmJxmM7MmYor8HjOcbAcofZu8GP/lUT/kjjfDtgp/PKDdjmZzTUKRHkVtxptnZiuo3u7hy8+5/1vw7K0/cvvPfyxbA0DudLidqNtV1MvAdn9UONZBMjr0hz3GHqpBKYXp7pZ/fwKHGxGHmaqS3yw1H5znn93hn9+9vo3sVV+at+M88Jr1e9Wmx+PvhxdQnkAphfrWDz7gOx/9gifvf4puDrh9tUybN2qvvWbHY+LNeoZfZSBxf8P1U+fbH/yM/wDf/gjPC87N6QAAAABJRU5ErkJggg==',
'iVBORw0KGgoAAAANSUhEUgAAAIgAAAA4CAYAAAAmcLAnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKA0lEQVR4nO2dwY4kRxGGv4jMmWFtpJUFBiEjIeSLJSxx4gX8Ehx4M56BJ+DKhStXMBwQCBuD2MVez0xXZfwcIrOqunfWu0JY023ql0bTNVVdo1ZGRfzxR0S2Tc8/0fTZX5lfvCBkmAk3IxGcQhK2nH8VXn7fjnOA44IwcIG8YNEIo6+pIwlFxa4b1+/+kHr408d89utfcvvxn9HVPW73BNZvB9K62PE6uxjQm16442uB6eG/y3Dy8S22GspYbxkUge6eUL97wzsf/Zx6+/ff8+y3v+L+d19y9R5cfysvlGDrKIZxvNZ57DhrNAA5AhpBCZBZeg4zWhNf/gXqU+PJjz6k4g23G26+f8fTn/6Et999j9Ya4JgZ7g5myEv+B7c3CDE7HhXy/HVKByQgkBrWgmZQWqMpMIFXZ3pxi8pviFsIzdSmAldvU7/3nKfvf8g7P/6QaZqQgXsFr5gXrKTByAvCH+eD73gj2IYDis4vJCThCiICWtAs0kBag2hc31Tu/vWMLz/9A7efPsPtilp0jduMyzEFQVqd4RgF0clLFMINl8NrHchuQI+J0wdYg5Ko0WRgBbM5qaJyhW1wCgUFY+aWwKnYRLOKBWia0f090Rp4QdYwr1AaZg5WCDOas4eZc4YcLI6PAdGwEKbI5CPEHBPWZqLN2P0Vmu6IAFTAgnp6bzPrxmHghty6ceQxi3fZDeRsYQDl5Bg88qHHCjRBjxayAp68U0ue098zXkhraiS1o2NYM9c3TnV3nC1GFvxQFDhd93p6UlK/QYPILEZKrwGBhSOPlfxs3ruHnTOHCRS5VhEgEWqYAgSmSIIbq5FUs0xbh3oqKS+Sp2cK4SVQGOYAgQ13sjE2Ozne8Zg4DhNroOiLr0A0hCDUvUZDKpja0Z3qNuOwaKAGLcAt0yFmzCqG9fW3B5VS2xjYjsfGaakjj/MhHh6kZy8EEQ1FIIsligyrqGNBpUjjiIaiLXmzkaobpvQcVpA/ELu+nk+6438IE0hzN5DW6y4T1lI8o80Q0TOgAEQdhFQSEYHaDK0hN0RkztzvLtLiVFYDOfUcOw95fGy9uHUZ3cyI0JKAqBsIbSaGgXhBMY+7AFApNSu4IaxNtLjPc7NjRUlkLA3F3QnbcBBe9hy7JzkvaNFARohpKGaaGo5QCyLm1EIsnYTNQVDA6okOIsHU0s3IV8HFSxLXksT1oRCz4/wRUhKG1olqpxLEnJ7EBPOEsqSHmdJAlrDQZiwm2jzoaEEWGA0oBKNQVx76/zvOHBYNAYrA1FAoExKSd3oziANqg4d0HUQS0SDahA5z5siAhcAbNju4ZfEO1srujouCRXoGlzLUKFATYsZaklJaW66DIZT1BTeBR2PqFxgg0jAUvaDjlmx3x9kieLhcKjZCqJKwZgY8YyGEYdGwRYLfKKlpVDOa77HWkDnYjHvFLJY+kFRQdw9yznjV6piyYBcSPqSMHk6izRRqcpAlC/JUUsebiQbtAEEWdXCktngQumGE7z2nlwiLbBgyIGKGaCmGmvAmwpNmWKySRZJUjWajGc0TROB4ZitRwFN1UycusulxPuGO/xomCI3spORaKxuHsMjMxiKjx0ZHqSNfcTpJjbnLrmCtYNYLOmab9GdPc88ZpxV3XxqGxosp+QdZoFOIJnEVjSnmVNRZspikMxYGoW5B3VMokM9YlC63Z3fZ3rl83tgS1KMG92Eg1ssqgFoct3rE3GtwiZ7FDB4SxDyBNRTW5ybSc5gZWPal7gzkvDHk9VNolFtnZemkF+2WZmY7zlDDoKaFiUC0lvwj+wMsizhWGC0Bw1ft3WTnDj28QsNoYpUroldupT5R1eLI61SAsKAA3psJh0wS9OKcZauhlvR2r7icNWQPD0+NjHVzWS5lF8m6FWxD1NIwZHKY7tDhi0xzR1dRP6+hg+zO4yJxFHI2pNWU3YGSklIc7pOeeNKJKjOMig5i/uI5kwdNfdJq2JptSvlaW4d2XCZyii5fp8SRx+GFdpiYDsJvCkahGgWzghro9gXND8wxLC6Hfbfp7d4xdtkws5WDKDPS1te3lULMMzEB192DYF0Y6QQ0AjzUU53ezJpnjiTYHZeJ5fGW5Qjmph+Z3nJYBJPFcS0GwN0ppdDcsjC3YNPTCGgnIhcNV3qSxsozAcy9S6ZrqntkIJnK1t72ro3HKMt5SdjeMHTRUP9ZhbPhQbyX9Nf17QaSHiIWMax7jAcU011m/+ZgVOXHmo4ZqAFJGw/ihrn3ZuW9nP//AvWh7REZIrLVcKAu03TQ9wOpLIT0ld5iJ6mXjbVYkgP+fSpy/LwUYrrFqHuR1FMTOx/9JuLkAe8G4u5kq4/WnlQzLbWWcdHWKLS56c4/vhkYyYcTy/Fab7OjwFElI2tzAeUalWvQ+ibf3HAYyD7hf/nIHtTkmqmkiuoFi6GYO6bTNJeCeSGi7yExrOokHdodyYUjBGXDPfooZqa5zjZuVOjbXRpQHErNMBO2SX/GDiTH1cAdlwm5lhrM0LZUHPOS0/6DoliMfpCRwRTMa47keTYGLewWFgPZldTzxjZNfah2tpxWn7eWQIaXipWuonbZ/Xj00goqtc9ACPeVvIJnXwh7w9D5YzO8/cDZUUbR5reF49WxufZ9YBL16IZe8XqVhbq+sSp9FkZG7lXGrqZeOrbDUz0j6RmMZ6lls741xrSVdw3ePQ1hU3M5HZjaB6fOHV/dNTyakl2k3hFCCqwUrNSVe2ppOezNZu5dj3daRIaSEWZYDUO7BzlzvKx0H3ERH22FAWHIW+49Z95DxVFXu+HqW267QSlEE157I9FoObTcaUhu65zFjrPEQ41d27yiKCfrnNwLVQEUMospjhy8+SCpjVHaNyvICz7mYmxNdbdq6y6EnDccW0YchmEMn5I1NuGeQhhjP35GJps7aQ8xtJrGhUqhjIJ5irDmZVVPebiYs+P80NgM0b2EbDmMrNLhliX+dBCeW3vYGpJyfxDLSYoo+WNzNrEagXzU89au9t08zhuvzTLNKX3fShEQmZTU4swYFr40fOQm7UHfzB8KRnjpw9rOMAfzLr0DOwk5b6xjsieIbdjR8sUNbVCK4rQei1qPTRX16m1tlHrF9fUT5rEVt9mifeCGjeLOvsPQxULKrR5k0fcnE96nJ0ut1KsZvwpclqOXMiNMmJxmM7MmYor8HjOcbAcofZu8GP/lUT/kjjfDtgp/PKDdjmZzTUKRHkVtxptnZiuo3u7hy8+5/1vw7K0/cvvPfyxbA0DudLidqNtV1MvAdn9UONZBMjr0hz3GHqpBKYXp7pZ/fwKHGxGHmaqS3yw1H5znn93hn9+9vo3sVV+at+M88Jr1e9Wmx+PvhxdQnkAphfrWDz7gOx/9gifvf4puDrh9tUybN2qvvWbHY+LNeoZfZSBxf8P1U+fbH/yM/wDf/gjPC87N6QAAAABJRU5ErkJggg=='
,'iVBORw0KGgoAAAANSUhEUgAAAIcAAAA4CAYAAADXe+uqAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAJlklEQVR4nO2d36okVxXGf9+uOudMnMmQP0JiQFAQieTOC5/CO/EJfCAfwXfwKbwTzYWIFwmCimQ0yQzDnNNVe31erL2rqnvOBDE46Q71QZ/uPtXVRbO/Xutb/3brs6cfe6qfAwUIpAEsEvm/r4Ltrzy+45uFpHv/v65bQaWtsYVtrq8e8fD6A8bff/prnr74C0O5xjah4zcYOH3znQyXie06enkeAnkGF0oZiKi88+hDfvTeLxk/ffJbXtw94Z03P2Iob2AqMOfbaeCwW4aLRiHA5ZXHQ1AM0hXT3TOePPszz158wncf/5SxlJHvvf0zfvL9X/FgfBczA3MzOwWrvrYPsuN1Q8gwcIMYeXb4lI//+hum+pTwgXEsD3n38Uf88L2f853hg2ZsZtzch7rl0P3aY7cr543FmXTr0ddxeS7sAgx8Of2Jv33+O548/QOOgRFSW0RUGCZA2BPWjBC1C9IjFqxPpFebrB3fPMJBp8iROBVAARekMe/DhA9ARTKjbWrcUusXcPUeB/+b8B3WgL26FMX9NmKPVs4bBS3B5zbYSKLkF/uKB1zpLe7iKcQEDACMPVy1a7sFpqYlUSyLb0zxepGyc+IiEBtrcWz8B6C2/49Y85ExABiljG3tipkwExFTssyrzrDNcqphl6kXAh8/7q7Fm/xVMGDl2m8JMvbDZsaqRByompbTAiMnOTqRdlwuxDbBmWQxQ67/xhhIWgVppVuOubkXk/yqqL1mD00uH0JNhHahKmYqI5XqGRSLHknLIS/EmH0gnJbDrkmODSmOLMcrwtsd5wNJeKNEu1sRAylXhTRgz5jp6NxmOSoRTW94IuKQJFBaELfXvORWdktycVCLRESlGEIDYiB0wLUeuZbFrZiKPRORliNJMC9kKG4KZNccF4n+xe7kGDwQLrgEQwx4mAhn2aQ4b4vlsCszt2iJWgyOFskE0V53erEdFwKn1bBTU8xUBgbsgaqKOZCZ8UoXq2M/N6JCtPyG5xanVFisRbRr5L3YyXER8JodDc+UUrBLupK2xvLA7Kmt7T1uJZpLWSIWWlKsk2KxGv35Gt7uOH+41VLCGYmopc5dBuSB8IFoMStkorNFK0GalCZIfWj6oi6k6Fbk+ILexM07LgEiBagpWAMFL5FK+IBdqc0jjF1TmJnKjD21+wxvKS1i2biW1cWsTSM7zhXl5HFbR6ddsNQyozN9Xbs3GCURioU54YkaU9ZXmClayeH7kua77LgI9HxHKYV0K5EWpFZKAeJAxEkoaxu5EjFDy3WgZJE8L+GN8UuFmV1zXADUO8GEESYfQ6AouFyli2EGTwxSszUlLQdkFBIxJ0k8UT1jZrTJlub9samoOzfOHpIokUtuDy0NUQkVMESIWjPPcVR4k0pzK3eYA1UzwSETYlSklgehtjT77kcuDXZqCyxEtJzHFUUC3zFrYNAMpITojmVc9ES7RTRXEjMugSPDWbsuSbEdlwep11ICZYyyxBepK+sSkUpaq7LQsqDueY4KrjjmJUpZT97JcZlYtQeNKEYUl5QOMW/WOLHWVpZOsAxn08RMCyGilXNP+zp2QXr+yKBjU4WlIq7Ion3Bvsm1Pu0EA3LRqUtmNDyh9jwiU6qm4uiidHvh1/MBd/yvWKcHbC1dGmjKjj6BNFE1b7rDCnjT7HPcR9rcSiNIHoujntIVe0/HeaMnwZIcVk+CXS0EOVr3bW0l3UKGsT3x1a1EqHeFtSLcSU9pv+iO88VSqm86IwIkI5nCNbCK0bUDMLEW3ghmVyKCiJpuZUOMzqp7s6Q7zhZ9rR2NIGKNKRQ5tBYVRbzU2TcWlxwz8IQ8MTQ3UjW3gsyWWccl3ZWRO84Xq46wa2oOBeKaGhNSxZQsnbT0eXGbW8ki7VqOtyt1Yx1OiXFkOXTc4r7jfJExZWnyAKyKEKGyKZ3mWoYC5LXZJ/vPK7URpDeCWEF4bfzZitI9jD1/rKkHkGh/ok0VlOz802oQQgFkin0RpJaXTOgy9bbkNrIwp2K8GYvs4ws7zhldkObalV53c7YDGuV6t0mDLVbL4VVbBHUjQtu9ej/pMRm0z0WeNdaxBC11sv4cNXIwgbzxCps8RyLWmyLDVtWWUt9GLKcX//9+uB1fD2tbRQ7Gi6A0EgxqlRalmzn94m9qK25W4yQZho9C2ZcuvO/AcN5wD2fbfm8SttKtyIuMoDf6bMLZI0G6ZM8AlBVa1EkR7c22E29Qd69y1ijNq+SypUZMYRrNkrRURCNF2QzJZxKsFdeWsLX1kqqFqr0LPYgWE/UO9OafdpwtarMYhSRI9u6o5acqQ5uNjtZgXlkNwFFVtluInkbdjifYFbnHwdDnWfZo9rxhm+IcOJBKNgm6thHqgltSbCsblgbj7ZtErBFJbuAyH53YE2ARzrAWo9jT6ecMU6jL8HQv2atl0QfGTa/OKwRpL9mvQtRHVqRuSNJGEnyyocuOM0WOjxSDXFqXV8nItZySIte8W45ynKbIRBgKQkF0gdoTYaJtILc2B+04d7iVPrz07RwfXQuspxi9bGW96okQSyY0BOE+crkdbOq+aU90nD+yiXyRh4p0LV0zLkbg2K2U3kzah5tOcV8dZbtv9o5vB+6rk61T9id7nt+HvfP8EtHmVbbrSx9r+uqv92hps3Vke6lLe6ylX8NNqOS09nZGdrce540Wnjp/4kDqP3XQhtlCbdvRNnnP6hXGiByqtYZFQ6ikyDAD6jOyjRTSdtfifZD6/LHuGti/9GJoJBkopbuUddPaHrWMa1W1IEaKbrJ8rwkisAL56ri9jNVH7a7mvHHUqaeSMyulpCVRbsNgNcJwBQw4st90hORL8mjI0fzN7rZSsis7l+uJQF331d5xntgKzayjiLK1HHoDcXNCom45opubATwwkEmSquvsYF82balIsZmV7anW1/Mhd3w95C9wlUaKQtE1Yswh60VjQnGroQEjBMMwcj2+yc3149bDccXsNq6gw0mW9KTZZ2fHWWOx9Aw51FTGlRzNWtwMj7ke3+JuvEPDDWqh6xiUdBmtkBYMVF+DJ0bB5Nq0hrKz54Qcu+S4EGhouxcPqHRLkToz19zMsfkhBJvxEF/yr+d/58Fnb3N99YhpusuDTJhb7IFth9guQC8XIsUnkLqDAWmklMJQbnhx+wVfPv+E6/I+JhgHDTx7/pR/+I8UXYPmVKs6NGLsuGT8d24/51jmesft7S0PHz2gFBh//P4veH77TwY9WtvXESrzsqnYjm8vov0gQoaxQY1b3nr4A9599CH/ASnVWgdSt0h6AAAAAElFTkSuQmCC',
];
function glGetRenderTo()
{
    return _gl_renderTo;
}

function glGetCanvas()
{
    return _gl_canvas;
}

function glGetWidth()
{
    return _gl_width;
}

function glSetWidth(width)
{
    _gl_width = width;
}

function glGetHeight()
{
    return _gl_height;
}

function glSetHeight(height)
{
    _gl_height = height;
}

function glGetDrawContext()
{
    return _gl_drawContext;
}

function glItemAdd(pwindow)
{
    var i;
    if(pwindow.getType() == "window")
    {
        _gl_items.push(pwindow);
        for(i=0;i<pwindow.getWinItems().length;i++)
        {
            glItemAdd(pwindow.getWinItems()[i]);
        }
    }
    else
    {
        alert("_gl_items is window array ,you shouldn't put other class in it");
    }
}
function inArray(needle,array,bool){//判断是否在数组
	if(typeof needle=="string"||typeof needle=="number"){
	    var len=array.length;
		for(var i=0;i<len;i++){
			if(needle===array[i]){
				if(bool){
					return i;
				}
				return true;
			}
		}
		return false;
	}
}
function glItemRemove(pwindow)
{
    var i;
    _gl_items.remove(pwindow);
    for(i=0;i<pwindow.getWinItems().length;i++)
    {
        glItemRemove(pwindow.getWinItems()[i]);
    }
}

function glItemRemoveAt(index)
{
    var win;
    if(_gl_items.length > index)
    {
        glItemRemove(_gl_items[index]);
    }
    else
    {
        alert('the index which you provide out of the _gl_items');
    }
}

function glGetMouseState()
{
    return _gl_mouseState.mousedownstate;
}

function glSetMouseState(down)
{
    if(typeof(down) == "boolean")
    {
        _gl_mouseState.mousedownstate = down;
    }
    else
    {
        alert("paramter eror:glSetMouseState(down) down should be boolean");
    }
}

function glGetMouseFocusWin()
{
    return _gl_mouseState.focuswin;
}

function glSetMouseFocusWin(pwindow)
{
    if(pwindow)
    {
        if(pwindow.getType() == "window")
        {
            _gl_mouseState.focuswin = pwindow;
        }
        else
        {
            alert("paramter error:pwindow should be window class");
        }
    }
    else
    {
        _gl_mouseState.focuswin = null;
    }
}
function glGetMouseFocusEl()
{
    return _gl_mouseState.focusel;
}

function glSetMouseFocusEl(pcomponent)
{
    if(pcomponent)
    {
        if(pcomponent.getType() == "component")
        {
            _gl_mouseState.focusel = pcomponent;
        }
        else
        {
            alert("111paramter error:pcomponent should be component class");
        }
    }
    else
    {
        _gl_mouseState.focusel = null;
    }
}

function glGetMousePageXY(e)
{
    if(e.touches!==undefined){
		glGetMousePageXY = function(e){
			return {x:e.touches[0].pageX,y:e.touches[0].pageY};	
		}	
	}else{
		glGetMousePageXY=function(e){
			var x = e.pageX?e.pageX:(document.body.scrollLeft+e.clientX);
			var y = e.pageY?e.pageY:(document.body.scrollTop + e.clientY);
			return {x:x,y:y};
		}
	}
	return glGetMousePageXY(e);
}

function glGetMouseClientXY(e)
{
    if(e.touches!==undefined){
		glGetMouseClientXY = function(e){
			return {x:e.touches[0].clientX,y:e.touches[0].clientY};	
		}	
	}else{
		glGetMouseClientXY=function(e){
			var x = e.clientX;
			var y = e.clientY;
			return {x:x,y:y};
		}
	}
	return glGetMouseClientXY(e);
}

function glGetMouseCanvasXY(e)
{
    if(e.touches!==undefined){
		glGetMouseCanvasXY = function(e){
			return {x:e.touches[0].pageX,y:e.touches[0].pageY};	
		}	
	}else{
		glGetMouseCanvasXY=function(e){
			var x = e.offsetX?e.offsetX:e.layerX;
    		var y = e.offsetY?e.offsetY:e.layerY;
			return {x:x,y:y};	
		}
	}
	return glGetMouseCanvasXY(e);
}

function glGetMouseScreenXY(e)
{
    if(e.touches!==undefined){
		glGetMouseScreenXY = function(e){
			return {x:e.touches[0].screenX,y:e.touches[0].screenY};	
		}	
	}else{
		glGetMouseScreenXY=function(e){
			var x = e.screenX;
			var y = e.screenY;
			return {x:x,y:y};
		}
	}
    return glGetMouseScreenXY(e);
}

function glGetEvent(event)
{
        return event ? event : window.event;
}
function glGetTarget(event){
        return event.target || event.srcElement;
}
function glGetElementTop(element) {
    var actualTop = element.offsetTop;var current = element.offsetParent;while (current !== null) {actualTop += current.offsetTop;current = current.offsetParent;}if (document.compatMode == "BackCompat") {var elementScrollTop = document.body.scrollTop;} else {var elementScrollTop = document.documentElement.scrollTop;}return actualTop - elementScrollTop;}
	function addHandler(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
}
function sysclick(e)
{   
    var myevent = e?e:event;
	var i,winpos,mousepos; 
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysclick(e);
			    break;
			}
		}
	}
}

function sysdblclick(e)
{
    var myevent = e?e:event;
	var i,winpos,mousepos;
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysdblclick(myevent);
			    break;
			}
		}
	}
}

function sysmousedown(e)
{
    glSetMouseState(true);
    var myevent = e?e:event;
	var i,winpos,mousepos;
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysmousedown(myevent);
			    break;
			}
		}
	}
}

function sysmousemove(e)
{
    var myevent = e?e:event;
    var i,mousepos,winpos;
    if(glGetMouseState())
    {
        if(glGetMouseFocusWin() != null)
        {
            glGetMouseFocusWin().sysmousemove(e);
        }
        else
        {
            glSetMouseFocusEl(null);
        }
    }
    else
    {
		for(i=(_gl_items.length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			winpos =  _gl_items[i].getCanvasXY();
			if(mousepos.x > winpos.x
				&& mousepos.x < winpos.x + _gl_items[i].getWidth()
				&& mousepos.y > winpos.y
				&& mousepos.y < winpos.y + _gl_items[i].getHeight()
				)
			{
				if(_gl_items[i].getVisible())
				{
					_gl_items[i].sysmousemove(myevent);
					break;
				}
			}
		}
    }
}

function sysmouseup(e)
{
    glSetMouseState(false);
    var myevent = e?e:event;
	var i,winpos,mousepos;
	if(glGetMouseState())
    {
        if(glGetMouseFocusWin() != null)
        {
            glGetMouseFocusWin().sysmousemove(e);
        }
        else
        {
            glSetMouseFocusEl(null);
        }
    }
    else
    {
        for(i=(_gl_items.length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			winpos =  _gl_items[i].getCanvasXY();
			if(mousepos.x > winpos.x
				&& mousepos.x < winpos.x + _gl_items[i].getWidth()
				&& mousepos.y > winpos.y
				&& mousepos.y < winpos.y + _gl_items[i].getHeight()
				)
			{
				if(_gl_items[i].getVisible())
				{
					_gl_items[i].sysmouseup(myevent);
					break;
				}
			}
		}
    }
}

function sysmousewheel(e)
{
    var myevent = e?e:event;
    var i,winpos,mousepos;
	for(i=(_gl_items.length -1);i>=0;i--)
	{
	    mousepos = glGetMouseCanvasXY(e);
	    winpos =  _gl_items[i].getCanvasXY();
	    if(mousepos.x > winpos.x
	        && mousepos.x < winpos.x + _gl_items[i].getWidth()
	        && mousepos.y > winpos.y
	        && mousepos.y < winpos.y + _gl_items[i].getHeight()
	        )
		{
		    if(_gl_items[i].getVisible())
		    {
			    _gl_items[i].sysmousewheel(myevent);
			    break;
			}
		}
	}
}
function glInit(config)/*初始化函数*/
{
     _gl_renderTo = config.renderTo||document.body;
    
	 _gl_width = config.width || 550;
    
     _gl_height = config.height || 400;


    _gl_canvas = document.createElement("canvas");
	_gl_canvas.id='canvas';
	_gl_canvas.width = _gl_width;
	_gl_canvas.height = _gl_height;
	_gl_canvas.style.position = "relative";
	_gl_canvas.style.backgroundColor = "#fff";
	//_gl_canvas.style.border="1px solid #ff0000";
	_gl_canvas.style.margin = "auto";
	_gl_canvas.innerHTML = "您的浏览器不支持canvas标签";
	_gl_renderTo.appendChild(_gl_canvas);
	_gl_drawContext = _gl_canvas.getContext('2d');
	
	_gl_canvas2 = document.createElement("canvas");
	_gl_canvas2.id='canvas2';
	_gl_canvas2.width = _gl_width;
	_gl_canvas2.height = _gl_height;
	_gl_canvas2.style.display = "none";
	

	if(_gl_canvas.addEventListener)
	{
		//_gl_canvas.addEventListener("touchstart",function(){alert(11);},false);
		//_gl_canvas.addEventListener("touchmove",sysmousemove,false);
		//_gl_canvas.addEventListener("click",sysclick,false);
		_gl_canvas.addEventListener("dblclick",sysdblclick,false);
		//_gl_canvas.addEventListener("mousedown",sysmousedown,false);
	if(is_mobile){//为手机
		_gl_canvas.addEventListener("mousedown",function(event){
				sysmousedown(event);	
		},false);
	}else{
		_gl_canvas.addEventListener("mousedown",function(event){

				sysmousedown(event);	

		},false);	
	}	
		_gl_canvas.addEventListener("mousemove",sysmousemove,false);
		_gl_canvas.addEventListener("mouseup",sysmouseup,false);
		_gl_canvas.addEventListener("mousewheel",sysmousewheel,false);
		_gl_canvas.addEventListener("DOMMouseScroll",sysmousewheel,false);

	}
	else
	{
		//_gl_canvas.attachEvent("onclick",sysclick);
		_gl_canvas.attachEvent("ondblclick",sysdblclick);
		_gl_canvas.attachEvent("onmousedown",sysmousedown);
		_gl_canvas.attachEvent("onmousemove",sysmousemove);
		_gl_canvas.attachEvent("onmouseup",sysmouseup);
		_gl_canvas.attachEvent("onmousewheel",sysmousewheel);
	
	}
}

function glRun(pwindow)
{
	glItemAdd(pwindow);
	if(pwindow.getVisible())
	{
	    pwindow.syspaint();
	}
}

// JavaScript Document
function Window(config)
{
	/*
	property:
	this._x
	this._y
	this._width
	this._height
	this._parent
	this._comItems
	this._winItems
	this._visible
	this._dcFlag
	
	function:
	this.getX
	this.setX
	this.getY
	this.setY
	this.getWidth
	this.setWidth
	this.getHeight
	this.setHeight
	this.getCanvasXY
	this.getParent
	this.setParent
	this.getVisible
	this.setVisible
	this.comItemAdd
	this.getComItems
	this.comItemRemove
	this.comItemRemoveAt
	this.winItemAdd
	this.getWinItems
	this.winItemRemove
	this.winItemRemoveAt
	this.sysclick
	this.sysdblclick
	this.sysmousedown
	this.sysmousemove
	this.sysmouseup
	this.sysmousewheel
	this.syskeydown
	
	
	event:
	this.click
	this.dblclick
	this.mousedown
	this.mousemove
	this.mouseup
	this.mousewheel
	*/
	this._type = "window";
	this._dcFlag = false;
	if(config.x!= undefined)
	{
	    this._x = config.x;
	}
	else
	{
	    this._x = 0;
	}
	
	if(config.y!= undefined)
	{
	    this._y = config.y;
	}
	else
	{
	    this._y = 0;
	}
	
	if(config.width!= undefined)
	{
	    this._width = config.width;
	}
	else
	{
	    this._width = 300;
	}
	
	if(config.height!= undefined)
	{
	    this._height = config.height;
	}
	else
	{
	    this._height = 200;
	}
	
	if(config.visible!= undefined)
	{
	    if(typeof(config.visible) == "boolean")
	    {
	        this._visible = config.visible;
	    }
	    else
	    {
	        alert("config error:visible should be boolean");
	    }
	}
	else
	{
	    this._visible = false;
	}
	
	if(this.parent!= undefined)
	{
	    this._parent = config.parent;
	}
	else
	{
	    this._parent = null;
	}
	
	if(config.comItems!= undefined)
	{
	    this._comItems = config.comItems;
	    var i;
	    for(i=0;i<this._comItems.length;i++)
	    {
	        this._comItems[i].setParent(this);
	    }
		
	}
	else
	{
	    this._comItems = new Array();
	}
	
	if(config.winItems!= undefined)
	{
	    this._winItems = config.comItems;
	    var i;
	    for(i=0;i<this._winItems.length;i++)
	    {
	        this._winItems[i].setParent(this);
	    }
	}
	else
	{
	    this._winItems = new Array();
	}
	
	if(config.click)
	{
	    this.click = config.click;
	}
	
	if(config.dblclick)
	{
	    this.click = config.dblclick;
	}
	
	if(config.mousedown)
	{
	    this.mousedown = config.mousedown;
	}
	
	if(config.mousemove)
	{
	    this.mousemove = config.mousemove;   
	}
	
	if(config.mouseup)
	{
	    this.mouseup = config.mouseup;
	}
	
	if(config.mousewheel)
	{
	    this.mousewheel = config.mousewheel;
	}
	if(config.paint)
	{
	    this.paint =config.paint;
	}
	/*一般的函数*/
	this.getType = function()
	{
		return this._type;
	}
	
	this.getX = function()
	{
		return this._x;
	}
	
	this.setX = function(x)
	{
		this._x = x;
	}
	
	this.getY = function()
	{
		return this._y
	}
	
	this.setY = function(y)
	{
		this._y = y;
	}
	
	this.getWidth = function()
	{
		return this._width;
	}
	
	this.setWidth = function(width)
	{
		this._width = width;
	}
	
	this.getHeight = function()
	{
		return this._height;
	}
	
	this.setHeight = function(height)
	{
		this._height = height;
	}
	
	this.getCanvasXY = function()
	{
		return {x:this._x,y:this._y};
	}
	
	this.getParent = function()
	{
		return this._parent;
	}
	
	this.setParent = function(parentwin)
	{
		if(parentwin.getType() == "window")
		{
			this._parent = parentwin;
		}
		else
		{
			alert("window's parent must be class window, what you send is"+parentwin.getType());
		}
		
	}
	
	this.getVisible = function()
	{
		return this._visible;
	}
	
	this.setVisible = function(visible)
	{
		if(typeof(visible) == "boolean")
		{
			this._visible = visible;
		}
		else
		{
			alert('visible should be boolean');
		}
	}
	
	this.comItemAdd = function(component)
	{
		if(component.getType() == "component")
		{
			component.setParent(this);
			this._comItems.push(component);
		}
		else
		{
			alert("paremter error:component should be component class");
		}
	}
	
	this.getComItems = function()
	{
		return this._comItems;
	}
	
	this.comItemRemove = function(component)
	{
		this._comItems.remove(component);
	}
	
	this.comItemRemoveAt = function(index)
	{
		this._comItems.removeAt(index);
	}
	
	this.getWinItems = function()
	{
		return this._winItems;
	}
	
	this.winItemAdd = function(pwindow)
	{
		if(component.getType() == "window")
		{
			pwindow.setParent(this);
			this._winItems.push(pwindow);
		}
		else
		{
			alert("paramter error:pwindow should be window class");
		}
	}
	
	this.winItemRemove = function(pwindow)
	{
		this._winItems.push(pwindow);
	}
	
	this.winItemRemoveAt = function(index)
	{
		this._winItems.removeAt(index);
	}
	/*负责界面绘制及更新着一块*/
	
	this.getDc = function()
	{
		if(!this._dcFlag)
		{
			this._dc = glGetDrawContext();
			this._dc.save();
			this._dc.translate(this.getCanvasXY().x, this.getCanvasXY().y);
			this._dcFlag = true;
			return this._dc;
		}
		else
		{
			return this._dc;
		}
	}
	this.releaseDc = function(dc)
	{
		dc = null;
		if(this._dcFlag)
		{
			this._dc.restore();
			this._dc = null;
			this._dcFlag = false;
		}
	}
	
	this.syspaint = function()
	{
		var dc = this.getDc();
		dc.fillStyle = "#fff";
		dc.fillRect(0,0,this._x,this._y);
		this.releaseDc(dc);
		if(this.paint)
		{
			this.paint();
		}
		var i;
		for(i=0;i<this._comItems.length;i++)
		{
			if(this._comItems[i].getVisible())
			{
				this._comItems[i].syspaint();
			}
		}
		
		for(i=0;i<this._winItems.lenth;i++)
		{
			if(this._winItems[i].getVisible())
			{
				this._winItems[i].syspaint();
			}
		}
	}
	
	/*负责消息传递*/
	
	this.sysclick = function(e)//windows组件ExtDataGrid 继承自component
	{
		var i,compos,mousepos; 
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysclick)
					{
						this.getComItems()[i].sysclick(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.click)
			{
				this.click(e);
			}
		}
	}
	
	
	
	
	this.sysdblclick = function(e)
	{
		var i,compos,mousepos;
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysdblclick)
					{
						this.getComItems()[i].sysdblclick(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.dblclick)
			{
				this.dblclick(e);
			}
		}
	}
	
	this.sysmousedown = function(e)
	{
		glSetMouseFocusWin(this);
		var i,compos,mousepos;
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysmousedown)
					{
						this.getComItems()[i].sysmousedown(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.mousedown)
			{
				this.mousedown(e);
			}
		}
	}
	
	this.sysmousemove = function(e)
	{
		var i,compos,mousepos;
		if(glGetMouseState())
		{
			if(glGetMouseFocusEl() != null)
			{
				if(glGetMouseFocusEl().sysmousemove)
				{
					glGetMouseFocusEl().sysmousemove(e);
				}
			}
			else
			{
				if(this.mousemove)
				{
					this.mousemove(e);
				}
			}
		}
		else
		{
			for(i = (this.getComItems().length -1);i>=0;i--)
			{
				mousepos = glGetMouseCanvasXY(e);
				compos = this.getComItems()[i].getCanvasXY();
				if(mousepos.x > compos.x
					&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
					&& mousepos.y > compos.y
					&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
				{
					if(this.getComItems()[i].getVisible())
					{
						if(this.getComItems()[i].sysmousemove)
						{
							this.getComItems()[i].sysmousemove(e);
						}
						break;
					}
				}
			}
			
			if(i<0)
			{
				if(this.mousemove)
				{
					this.mousemove(e);
				}
			}
		}
	}
	
	this.sysmouseup = function(e)
	{
		glSetMouseFocusWin(null);
		if(glGetMouseFocusEl() != null)
		{
			glGetMouseFocusEl().sysmouseup(e);
		}
		else
		{
			if(this.mouseup)
			{
				this.mosueup(e);
			}
		}
	}
	
	this.sysmousewheel = function(e)
	{
		var i,compos,mousepos;
		for(i = (this.getComItems().length -1);i>=0;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this.getComItems()[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this.getComItems()[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this.getComItems()[i].getHeight())
			{
				if(this.getComItems()[i].getVisible())
				{
					if(this.getComItems()[i].sysmousewheel)
					{
						this.getComItems()[i].sysmousewheel(e);
					}
					break;
				}
			}
		}
		
		if(i<0)
		{
			if(this.mousewheel)
			{
				this.mousewheel(e);
			}
		}
	}
	
}


// JavaScript Document
function Component(config)
{
    /*
    this._type = "component";
    this._x
    this._y
    this._width
    this._height
    this._visible
    this._parent
    this._comItems

    
    this.getX
    this.setX
    this.getY
    this.setY
    this.getCanvasXY
    this.getWidth
    this.setWidth
    this.getHeight
    this.setHeight
    this.getParent
    this.setParent
    this.getVisible
    this.setVisible
    this.comItemAdd
    this.getComItems
    this.comItemRemove
    this.comItemRemoveAt
    this.sysclick
    this.sysdblclick
    this.sysmousedown
    this.sysmousemove
    this.sysmouseup
    this.sysmousewheel
    
    this.click;
    this.dblclick;
    this.mousedown;
    this.mousemove;
    this.mouseup;
    this.mousewheel;
    */
	
    this._type = "component";
    this._dcFlag = false;
    if(config.x != undefined)
    {
        this._x = config.x;
    }
    else
    {
        this._x =0;
    }
    
    if(config.y != undefined)
    {
        this._y = config.y;
    }
    else
    {
        this._y = 0;
    }
    
    if(config.width != undefined)
    {
        this._width = config.width;
    }
    else
    {
        this._width = 50;
    }
    
    if(config.height != undefined)
    {
        this._height = config.height;
    }
    else
    {
        this._height = 30;
    }
    
    if(config.visible != undefined)
    {
        if(typeof(config.visible) == "boolean")
        {
            this._visible = config.visible;
        }
        else
        {
            alert("config error:visible should be boolean");
        }
    }
    else
    {
        this._visible = true;
    }
    
    if(config.parent != undefined)
    {
        
        this._parent = config.parent;
    }
    else
    {
        this._parent = null;
    }
    
    if(config.comItems != undefined)
    {
        this._comItems = config.comItems;
        var i;
        for(i=0;i<this._comItems;i++)
        {
            if(this._comItems[i].getType() == "component")
            {
                this._comItems[i].setParent(this);
            }
            else
            {
                alert("config error:comItems's element should be component class");
                break;
            }
        }
    }
    else
    {
        this._comItems = new Array();
    }
    if(config.localStorageName)
	{
		this.localStorageName=config.localStorageName;
	}
    if(config.click)
	{
	    this.click = config.click;
	}
	
	if(config.dblclick)
	{
	    this.click = config.dblclick;
	}
	
	if(config.mousedown)
	{
	    this.mousedown = config.mousedown;
	}
	
	if(config.mousemove)
	{
	    this.mousemove = config.mousemove;   
	}
	
	if(config.mouseup)
	{
	    this.mouseup = config.mouseup;
	}
	
	if(config.mousewheel)
	{
	    this.mousewheel = config.mousewheel;
	}
	
	if(config.paint)
	{
	    this.paint = config.paint;
	}
	
	this.getType = function()
	{
		return this._type;
	}
	
	this.getX = function()
	{
		return this._x;
	}
	
	this.setX = function(x)
	{
		this._x = x;
	}
	
	this.getY = function()
	{
		return this._y;   
	}
	
	this.setY = function(y)
	{
		this._y = y;
	}
	
	this.getCanvasXY = function()
	{
		var x=this.getX(),y=this.getY();
		var parent = this;
		while(parent.getType() != "window")
		{
			parent = parent.getParent();
			x += parent.getX();
			y += parent.getY();
		}
		return {x:x,y:y};
	}
	
	this.getWidth = function()
	{
		return this._width;
	}
	
	this.setWidth = function(width)
	{
		this._width = width;
	}
	
	this.getHeight = function()
	{
		return this._height;
	}
	
	this.setHeight = function(height)
	{
		this._height = height;
	}
	
	this.getParent = function()
	{
		return this._parent;
	}
	
	this.setParent = function(winorcom)
	{
		this._parent = winorcom;
	}
	
	this.getVisible = function()
	{
		return this._visible;
	}
	
	this.setVisible = function(visible)
	{
		if(typeof(visible) == "boolean")
		{
			this._visible = visible;
		}
		else
		{
			alert('visible property should be boolean type');
		}
	}
	
	this.comItemAdd = function(component)
	{
		if(component.getType() == "component")
		{
			component.setParent(this);
			this._comItems.push(component);
		}
		else
		{
			alert("paramter error:component should be component class");
		}
	}
	
	this.comItemRemove = function(component)
	{
		this._comItems.remove(component);
	}
	
	this.comItemRemoveAt = function(index)
	{
		this._comItems.removeAt(index);
	}
	
	this.getComItems = function()
	{
		return this._comItems;
	}
	
	
	this.getDc = function()
	{
		if(this._dcFlag)
		{
			return this._dc
		}
		else
		{
			this._dc = glGetDrawContext();
			this._dc.save();
			this._dc.translate(this.getCanvasXY().x,this.getCanvasXY().y);
			this._dcFlag = true;
			return this._dc
		}
	}
	
	this.releaseDc = function(dc)
	{
		dc = null;
		if(this._dcFlag)
		{
			this._dc.restore();
			this._dc = null;
			this._dcFlag = false;
		}
	}
	
	this.syspaint = function()
	{
		var dc = this.getDc();
		dc.fillStyle = "#fff";
		dc.fillRect(0,0,this._width,this._height);
		this.releaseDc(dc);
		
		if(this.paint)
		{
			this.paint();
		}
		
		var i;
		for(i=0;i<this._comItems.length;i++)
		{
			if(this._comItems[i].getVisible())
			{
				
				
					if(_gl_filename !== undefined){
						if(i==0){
						//var now=new Date(); 
						//var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
	
						this._comItems[i].importxml('html/upload/'+_gl_filename);
						continue;
					}else{
						this._comItems[i].syspaint();		
					}
				}else{
					dc.font="20px sans-serif";
					dc.fillText('请选择左侧数据表或者新建一张使用',this._width/4,this._height/2);
				}

				
			}
		}
	}
	
	
	this.sysclick = function(e)
	{
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysclick)
					{
						this._comItems[i].sysclick(e);
					}
					break;
				}
			}
		}
		if(i<0)
		{
			if(this.click)
			{
				this.click(e);
			}
		}
	}
	
	this.sysdblclick = function(e)
	{
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysdblclick)
					{
						this._comItems[i].sysdblclick(e);
					}
					break;
				}
			}
		}
		if(i<0)
		{
			if(this.dblclick)
			{
				this.dblclick(e);
			}
		}
	}
	
	this.sysmousedown = function(e)
	{
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysmousedown)
					{
						this._comItems[i].sysmousedown(e);
					}
					break;
				}
			}
		}
		if(i<0)
		{
			glSetMouseFocusEl(this);
			if(this.mousedown)
			{
				this.mousedown(e);
			}
		}
	}
	
	this.sysmousemove = function(e)
	{
		if(glGetMouseState())
		{
			if(this.mousemove)
			{
				this.mousemove(e);
			}
		}
		else
		{
			var i,mousepos,compos;
			for(i = (this._comItems.length-1); i>=0 ;i--)
			{
				mousepos = glGetMouseCanvasXY(e);
				compos = this._comItems[i].getCanvasXY();
				if(mousepos.x > compos.x
					&& mousepos.x < compos.x + this._comItems[i].getWidth()
					&& mousepos.y > compos.y
					&& mousepos.y < compos.y + this._comItems[i].getHeight())
				{
					if(this._comItems[i].getVisible())
					{
						if(this._comItems[i].sysmousemove)
						{
							this._comItems[i].sysmousemove(e);
						}
						break;
					}
				}
			}
			if(i<0)
			{
				glSetMouseFocusEl(this);
				if(this.mousemove)
				{
					this.mousemove(e);
				}
			}
		}
	}
	
	this.sysmouseup = function(e)
	{
	    if(this.mouseup)
		{
			this.mouseup(e);
		}
	}
	
	this.sysmousewheel = function(e)
	{
		var i,mousepos,compos;
		for(i = (this._comItems.length-1); i>=0 ;i--)
		{
			mousepos = glGetMouseCanvasXY(e);
			compos = this._comItems[i].getCanvasXY();
			if(mousepos.x > compos.x
				&& mousepos.x < compos.x + this._comItems[i].getWidth()
				&& mousepos.y > compos.y
				&& mousepos.y < compos.y + this._comItems[i].getHeight())
			{
				if(this._comItems[i].getVisible())
				{
					if(this._comItems[i].sysmousedown)
					{
						this._comItems[i].sysmousewheel(e);
					}
					break;
				}
			}
		}
		if(i<0)
		{
			if(this.mousewheel)
			{
				this.mousewheel(e);
			}
		}
	}
}


// JavaScript Doment
function DataGrid(config)
{
	
	Component.call(this, config);//继承自 组件
	this._charDic = new Array(
			'A','B','C','D','E','F','G','H','I','J','K','L','M',
			'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
		);
	this.config				= 	config;
	
	this._offsetX			= 	config.rowheadwidth || 40;//默认宽度 ColHeaderWidth
	this._offsetY 			= 	config.colheadheight || 20;//默认高度 RowHeaderHeight
	this.width				= 	config.width || 0;
	this.height				= 	config.height || 0;
	
	
	this.colsNum			=	config.totalcol || 8;//总列数
	this.rowsNum			=	config.totalrow || 18;//总行数

	//this._localStorageName  = 	config.localStorageName || 'none';//
	
	this._textHeight 	    = 	config.textHeight ||14;//文字高度
	this._scrollRowNum 	    = 	config.scrollRowNum || 0;//滚动数量
	this._scrollColNum 		= 	config.scrollColNum || 0;//纵向滚动条滚动条滚动数量
	
	if(config.showgrid!== undefined){
			this._showgrid 	= 0;
	}else{
			this._showgrid 	= 1;///表格线showgrid缺省为显示表格线
	}
	if(config.showheader!== undefined){
			this._showheader 	= 0;
	}else{
			this._showheader 	= 1;///表格线_showheader缺省为显示行列头
	}
	
	if(config.Mousecursor!= undefined){
			this._Mousecursor		= 	config.Mousecursor;//
	}else{
			this._Mousecursor		= 	'default';//鼠标样式
	}
	if(config.backimage!= undefined){
			this._backimage			= 	config.backimage;//整个报表的背景图像
	}else{
			this._backimage		='';	
	}
	if(config.tableimage!= undefined){
			this._tableimage			= 	config.tableimage;//在表格上放置图片
	}else{
			this._tableimage		='';	
	}	
	if(config.caneditform!= undefined){
			this._caneditform			= 	config.caneditform;///设置整表保护
	}
	if(config.statscript!= undefined){
			this._statscript			= 	config.statscript;//统计脚本
	}
	if(config.verminor!= undefined){
			this._verminor			= 	config.verminor;//版本号
	}
	if(config.VerMinor!= undefined){
			this._verminor			= 	config.VerMinor;//版本号
	}
	if(config.vermajor!= undefined){
			this._vermajor			= 	config.vermajor;//此版本号
	}
	if(config._pacolor!= undefined){
			this.__pacolor			= 	config._pacolor;//背景颜色
	}
	if(config._maxeditrow!= undefined){
			this.__maxeditrow			= 	config._maxeditrow;//可编辑航
	}
	if(config.maxeditcol!= undefined){
			this._maxeditcol			= 	config.maxeditcol;//可编辑咧
	}
	
	if(config.showformula!= undefined){
			this._maxeditcol			= 	config.showformula;//是否显示公式
	}
	if(config.protecthascursor!= undefined){
			this._protecthascursor			= 	config.protecthascursor;//报表保护时是否出现光标
	}
	if(config.dclicklabelsort!= undefined){
			this._dclicklabelsort			= 	config.dclicklabelsort;//双击报表表头是否排序
	}
	if(config.propertiy!= undefined){
			this._propertiy				= 	config.propertiy;//报表属性值
	}
	if(config.printgrid!= undefined){
			this._printgrid				= 	config.printgrid;//是否打印表格线
	}
	if(config.fixedcols!= undefined){
			this._fixedcols				= 	config.fixedcols;//固定列头数
	}
	if(config.printhcalign!= undefined){
			this._printhcalign			= 	config.printhcalign;//打印是否横向中间对齐
	}
	if(config.printvcalign!= undefined){
			this._printvcalign			= 	config.printvcalign;//打印是否竖向中间对齐
	}
	if(config.designmode!= undefined){
			this._designmode			= 	config.designmode;//是否是设计模式
	}
	if(config.showmenu!= undefined){
			this._showmenu				= 	config.showmenu;//是否显示弹出菜单
	}
	if(config.loadscript!= undefined){
			this._loadscript			= 	config.loadscript;//报表加载时加载的脚本
	}
	if(config.data!= undefined){
			this._data					= 	config.data;//报表计算之前运行的脚本
	}
	if(config.userfuncs!= undefined){
			this._userfuncs				= 	config.userfuncs;//用户自定义函数
	}
	if(config.genscript!= undefined){
			this._genscript				= 	config.genscript;//是否自动生成统计脚本
	}
	if(config.savedb!= undefined){
			this._savedb				= 	config.savedb;//是否是录入报表
	}
	if(config.tagvalue!= undefined){
			this._tagvalue				= 	config.tagvalue;//报表设置属性
	}
	if(config.tagval2!= undefined){
			this._tagval2				= 	config.tagval2;//是否自动生成统计脚本
	}
	if(config.selbkcolor!= undefined){
			this._selbkcolor			= 	config.selbkcolor;//选中区域背景颜色
	}
	if(config.calscript!= undefined){
			this._calscript			= 	config.calscript;//计算之后运行的脚本
	}
	if(config.calscripttype!= undefined){
			this._calscripttype			= 	config.calscripttype;//计算之后运行的脚本类型
	}
	if(config.cursorwidth!= undefined){
			this._cursorwidth		= 	config.cursorwidth;//活动光标宽度
	}
	if(config.sysdbsource!= undefined){
			this._sysdbsource		= 	config.sysdbsource;//系统连接的数据源
	}
	if(config.prefooterrows!= undefined){
			this._prefooterrows		= 	config.prefooterrows;//页前脚行数
	}
	if(config.pfooterrows!= undefined){
			this._pfooterrows		= 	config.pfooterrows;//页脚行数
	}
	if(config.gridcolor!= undefined){
			this._gridcolor		= 	config.gridcolor;//系统表格线颜色
	}
	if(config.gridtype!= undefined){
			this._gridtype		= 	config.gridtype;//系统表格线类型
	}
	if(config.errmsgbox!= undefined){
			this._errmsgbox		= 	config.errmsgbox;//是否显示错误提示
	}
	if(config.pagerows!= undefined){
			this._pagerows		= 	config.pagerows;//主从和普通报表一页打印的行数
	}
	if(config.useado!= undefined){
			this._useado		= 	config.useado;//是否使用ado
	}
	if(config.allowrowresize!= undefined){
			this._allowrowresize		= 	config.allowrowresize;//是否允许行调整
	}
	if(config.allowcolresize!= undefined){
			this._allowcolresize		= 	config.allowcolresize;//是否允许列调整
	}
	if(config.autojump!= undefined){
			this._autojump		= 	config.autojump;//是否允许光标自动跳转
	}
	if(config.sheetname!= undefined){
			this._sheetname	= 	config.sheetname;//报表sheet名字
	}
	if(config.rowautosize!= undefined){
			this._rowautosize		= 	config.rowautosize;//是否自动调整行高
	}
	
	if(config.rowautosize!= undefined){
			this._rowautosize		= 	config.rowautosize;//是否自动调整行高
	}
	if(config.brlist!= undefined){
			this._brlist		= 	config.brlist;//单元背景色对象列表开始
	}
	if(config.ftlist!= undefined){
			this._ftlist		= 	config.ftlist;//单元字体对象列表开始
	}
	if(config.penlist!= undefined){
			this._penlist		= 	config.penlist;//框线的对象类型的
	}
	if(config.defaultcell!= undefined){
			this._defaultcell		= 	config.defaultcell;//表格
	}
	if(config.print!= undefined){
			this._print		= 	config.print;//打印属性
	}
	if(config.swty!= undefined){
			this._swty	= 	config.swty;//默认显示属性
	}
	if(config.hag!= undefined){
			this._hag	= 	config.hag;//默认显示属性
	}
	if(config.vag!= undefined){
			this._vag	= 	config.vag;//默认显示属性
	}
	if(config.imglist!= undefined)
	{
		this._imglist = config.imglist;
	}else{
		this._imglist=[];	
	}
	if(config.chartattribute!==undefined){//图表类型
		this._chartattribute= config.chartattribute;	
	}

	if(config.rows!= undefined)
	{
		this._rows = config.rows;
	}

	else
	{
		var i;
		this._rows = new Array();
		for(i=0;i < this.rowsNum;i++)
		{
			this._rows.push({});
		}
	}
	if(config.cols!= undefined)
	{
		this._cols = config.cols;
	}
	else
	{
		var i;
		this._cols = new Array();
		for(i=0;i < this.colsNum;i++)
		{
			this._cols.push({});
		}
	}
	
	if(config.cells!= undefined)
	{
		
		this._cells = config.cells;
	}
	else
	{
		var i,j;
		this._cells = new Array();
		for(i=0;i < this._rows.length;i++)
		{
			this._cells.push(new Array());
			for(j=0;j < this._cols.length;j++)
			{
				this._cells[i].push({});
			}
		}
	}
	/*用于测试的单元格数据*/
//	this._cells[2][5]={
//			//lexcel:'<data> <eformat>yyyy-m-d</eformat> </data>',
//			//fontFamily:"黑体",
//			cellurl:{newwin: false,
//url: "http://www.chinaexcel.com"},
//			t:'1221',
//			fl: 2048
//		};
//	this._cells[2][6]={
//tag:1
//		};
	/*辅助属性*/
	this._sel_startRow = 0;//默认第一行为1
	this._sel_startCol = 0;
	this._sel_endRow = 0;
	this._sel_endCol = 0;
	this._focusRow = 0;
	this._editRow = 0;
	this._focusCol = 0;
	this._editCol = 0;
	this._handThing = 'none';
	this._resizeRow = -1;
	this._oldRowBottomY = -1;
	this._minRowBottomY = -1;
	this._resizeCol = -1;
	this._oldColRightX = -1;
	this._minColRightX = -1;
	this._selLineAll={"on":false,'color':'#0251ff'};//设置光标整行选中
	
	this._editBox = document.createElement("textarea");
	this._editBox.id="_editBox";
	this._editBox.style.background = "transparent";
	this._editBox.style.borderWidth = "0px";
	this._editBox.style.outline = "none";
	this._editBox.style.overflow = "hidden";
	this._editBox.style.display = "none";
	this._editBox.style.resize = "none";
	this._editBox.style.position = "absolute";
	this._editBox.style.width='none';
	this._editBox.rows = 1;
	this._editBox.owner = this;
	this._editBox.onkeyup = function(e){
		/*
		var myevent = e?e:event;
		var eventobject = new EventObject(myevent);
		if(eventobject.ctrlKey() && eventobject.getKeyCode == 13){
		}
		else if(eventobject.getKeyCode == 13){
			var str = this._value;
			var index = str.indexOf('\n');
			str = str.splice(index);
		}
		*/
	}
	
	this._editBox.onfocus = function(e)
	{
		this.value ='';
		this.owner._editRow = this.owner._focusRow;
		this.owner._editCol = this.owner._focusCol;
		var cell = new DataCell(this.owner._cells[this.owner._focusRow][this.owner._focusCol]);
		this.style.fontSize = cell.getFontSize(this.owner._ftlist)+"px";
		this.style.fontFamily = cell.getFontName(this.owner._ftlist);
		//this.style.lineHeight = (this.style.fontSize + 3) + "px";
		
		this.value = cell.getValue();
	}
	this._editBox.onblur = function(e)
	{	
		if(this.value !== '')this.owner._cells[this.owner._editRow][this.owner._editCol].t = this.value;
/*		if(this.owner._focusCol!=0){
			if(this.value!='')
			{
				this.owner._cells[this.owner._focusRow][this.owner._focusCol-1].textWidth='cutdown';
				this.owner._cells[this.owner._focusRow][this.owner._focusCol-1]._textWidth='cutdown';
			}else{
				this.owner._cells[this.owner._focusRow][this.owner._focusCol-1].textWidth='default';	
			}
		}
*/		this.style.display = "none";
		var cellsize = this.owner.getCellSize(this.owner._editRow,this.owner._editCol);
		if(parseInt(this.style.left,10)+cellsize.width>=_gl_canvas.width){
			
			this.owner._parent._comItems[2].paint();
		}
		if(parseInt(this.style.top,10)+cellsize.height>=_gl_canvas.height){
			var dc = this.owner.getDc();
			this.owner.paintBbname(dc);
			this.owner._parent._comItems[1].paint();
		}
		this.owner.clear();
		this.owner.paint();
		
		
	}
	this._editBox.onkeyup = function(e)
	{
		if(!event.ctrlKey&&window.event.keyCode==13){
			return false;
		}
		if(this.owner._cells[this.owner._focusRow][this.owner._focusCol].controlsItem!==undefined)
		{
			if(this.owner._cells[this.owner._focusRow][this.owner._focusCol].controlsItem.type==='number')
			{	
				return false;	
			}	
		}
		if(event.ctrlKey&&window.event.keyCode==13){//ctrl_enter
			this.value+='\n';	
			this.owner._cells[this.owner._editRow][this.owner._editCol].value = this.value;
			this.owner.setAutoLineFeed(true);
		}
		
	}
	glGetRenderTo().appendChild(this._editBox);
    /*
    继承的属性：
    this._type = "component"
    this._dcFlag
    this._dc
    this._x
    this._y
    this._width
    this._height
    this._visible
    this._parent
    this._comItems

    独有属性：
    this._charDic = new Array(a,b,c,d,e,f);
    this._offsetX
    this._offsetY
    this._textHeight
    this._rows
    this._cols
    this._scrollRowNum
    this._scrollColNum
    this._cells
    this._netChartVisible
    this._resizeThing
    this._sel_startRow
    this._sel_startCol
    this._sel_endRow
    this._sel_endCol
    this._focusRow
    this._focusCol
    
    辅助属性:
	this._resizeThing
    this._sel_startRow
    this._sel_startCol
    this._sel_endRow
    this._sel_endCol
    this._focusRow
    this._focusCol
    this._handThing     row 
    this._resizeRow
    this._oldRowBottomY
    this._minRowBottomY
    this._resizeCol
    this._oldColRightX
    this._minColRightX
    
    函数
    this.getNetChartVisible
    this.setNetChartVisible
    this.setRowHeight
    this.getRowHeight
    this.setRowVisible
    this.getRowVisible
    this.setColWidth
    this.getColWidth
    this.setColVisible
    this.getColVisible
    this.insertRow
    this.deleteRow
    this.insertCol
    this.deleteCol
    this.insertCellTop
    this.deleteCellTopMove
    this.insertCellLeft
    this.deleteCellLeftMove 
    this.getCellSize
    this.getRowColByCoor
    this.getRowToTopByDis
    this.getColToLeftByDis
    this.combineCells
    this.combineSelCells
    this.breakupCell
    this.breakupSelCells
    this.getCellLeftTopCoor
    this.getCellRightTopCoor
    this.getCellRigthBottomCoor
    this.getCellLeftBottomCoor
    this.findCombineCellsAroundSelCells
    this.getScrollTopHeight
    this.getScrollLeftWidth
    this.getFullWidth
    this.getFullHeight
    this.getGridZoneWidth
    this.getGridZoneHeight
    this.getScrollRowNum
    this.setScrollRowNum
    this.getScrollColNum
    this.setScrollColNum
    this.getCellValue
    this.setCellValue
    this.getFocusValue
    this.setFocusValue
    this.setCellValueType
    this.setFocusCellValueType
    this.setCellTextAlign
    this.setFocusCellTextAlign
    this.setCellVerticalAlign
    this.setFocusCellVerticalAlign
    this.setCellTopBorder
    this.setFocusCellTopBorder
    this.setCellRightBorder
    this.setFocusCellTopBorder
    this.setCellBottomBorder
    this.setFocusCellBottomBorder
    this.setCellLeftBorder
    this.setFocusCellLeftBorder
    this.setCellFontFamily
    this.setFocusCellFontFamily
    this.setCellFontSize
    this.setFocusCellFontSize
    this.setCellFontColor
    this.setFocusCellFontColor
    this.setCellBackColor
    this.setFocusCellBackColor
    this.setCellBackImage
    this.setFocusCellBackImage
    
    绘图操作 
    继承的方法
    this.getDc
    this.releaseDc
    独有方法                              
    this.paintHeader                                行头和列头的绘制
    this.paintSelHeader                             绘制选中区域的行头和列头
	this.paintCell									绘制单个的单元格
    this.paintCells                                 绘制所有的单元格
    this.paintSelCells                              绘制选中区域的单元格
    this.paintFocusCell                             绘制焦点单元格
    this.paint                                      整个控件的完整绘制
    this.clear                                      清空整个区域
    
    
    this.click
    this.dblclick
    this.mousedown
    this.mousemove
    this.mouseup
    this.mousewheel
    */
}
DataGrid.prototype.getMousecursor= function()
{
    return this._Mousecursor;
}
DataGrid.prototype.getRowHeaderHeight= function()
{
    return this._RowHeaderHeight;
}
DataGrid.prototype.isShowHeader= function()
{
    if(typeof(this._showheader) == "string")
    {	
        return parseInt(this._showheader,10);
    }
    else if(this._showheader!==undefined)
    {
        return this._showheader;
    }else{
		return 1;	
	}
}

DataGrid.prototype.getColHeaderWidth= function()
{
    return this._ColHeaderWidth;
}
DataGrid.prototype.getNetChartVisible = function()
{	
    if(typeof(this._showgrid) == "string")
    {	
        return parseInt(this._showgrid,10);
    }
    else if(this._showgrid!==undefined)
    {
        return this._showgrid;
    }else{
		return 1;	
	}
}

DataGrid.prototype.setNetChartVisible = function(visible)
{
    if(typeof(visible) == "boolean")
    {
        if(visible){
			this._showgrid=1;
		}else{
			this._showgrid = 0;
		}
    }
    else
    {
        alert('paramter error:visible should be boolean type');
    }
}

DataGrid.prototype.getRowHeight = function(index)
{
    if(index < this._rows.length)
    {
        var row = new DataRow(this._rows[index]);
        return row.getHeight();
    }
    else
    {
        alert("paramter error:the index you provide is out of this._rows' range");
        return -1;
    }
}

DataGrid.prototype.setRowHeight = function(index,height)
{
    if(index < this._rows.length)
    {
        if(typeof(height) == "number")
        {
            this._rows[index].height = height;
        }
        else
        {
            alert("paramter error:this height you provide is not number type");
        }
    }
    else
    {
        alert("paramter error:the index you provide is out of the._rows' range");
    }
}
DataGrid.prototype.delCellPrototype = function(prototype){
	if(prototype==='financial'){
		var i, j,cell;
		for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
			for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
				cell = this._cells[i][j];
				if((cell.tag>>0)&0x01){//设置财务表头
					
					this._cells[i][j].tag=cell.tag^(1 << 0);//取反 
				
				}else if((cell.fl>>15)&0x01){//设置财务表览
					
					this._cells[i][j].fl=cell.fl^(1 << 15);//fl 15	
				}else if(cell.swty!==undefined){
					delete this._cells[i][j].swty;
					delete this._cells[i][j].dpt;
				}

			}
		}
	}	
}

DataGrid.prototype.getRowVisible = function(index)
{
    if(index < this._rows.length)
    {
        var row = new DataRow(this._rows[index]);
        return row.getVisible();
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._rows' range'");
        return -1;
    }
}

DataGrid.prototype.setRowVisible = function(index,visible)
{
    if(index < this._rows.length)
    {
        if(typeof(visible) == "boolean")
        {
            this._rows[index].visible = visible;
        }
        else
        {
            alert("paramter error: visible should be boolean type");
        }
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._rows' range");
    }
}

DataGrid.prototype.getColWidth = function(index)
{
    if(index < this._cols.length)
    {
        var col = new DataCol(this._cols[index]);
        return col.getWidth();
    }
    else
    {
        alert("paramter error: the index you provide out of the this._cols' range");
        return -1;
    }
}

DataGrid.prototype.setColWidth = function(index,width)
{
    if(index < this._cols.length)
    {
        if(typeof(width) == "number")
        {
            this._cols[index].width = width;
        }
        else
        {
            alert("paramter error: the width should be number type");
        }
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._cols' range");
    }
}

DataGrid.prototype.getColVisible = function(index)
{
    if(index < this._cols.length)
    {
        var col = new DataCol(this._cols[index]);
        return col.getVisible();
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._cols' range");
        return -1;
    }
}

DataGrid.prototype.setColVisible = function(index,visible)
{
    if(index < this._cols.length)
    {
        if(typeof(visible) == "boolean")
        {
            this._cols[i].visible = visible;
        }
        else
        {
            alert("paramter error:the visible should be boolean");
        }
    }
    else
    {
        alert("paramter error: the index you provide is out of the this._cols' range");
    }
}

DataGrid.prototype.getRowsCount = function()
{
    return this._rows.length;
}

DataGrid.prototype.getColsCount = function()
{
    return this._cols.length;
}

DataGrid.prototype.insertRow = function(index)
{
    var i,j;
    if(this._rows.length > index)
    {
        this._rows.splice(index,0,{});
        this._cells.splice(index,0,new Array());
        for(j=0;j < this._cols.length;j++)
        {
            this._cells[index].push({});
        }
    }
    else
    {
        for(i=this._rows.length;i<=index;i++)
        {
            this._cells.push(new Array());
            this._rows.push({});
            for(j=0;j < this._cols.length;j++)
            {
                this._cells[i].push({});
            }
        }
    }
}

DataGrid.prototype.deleteRow = function(index)
{
    if(index < this._rows.length)
    {
        this._rows.splice(index,1);
        this._cells.splice(index,1);
    }
    else
    {
        alert("paramter error:the index you provide is out of the this._rows' range");
    }
}

DataGrid.prototype.insertCol = function(index)
{
    var i,j;
    if(this._cols.length > index)
    {
        this._cols.splice(index,1,{});
        for(i=0;i < this._rows.length;i++)
        {
            this._cells[i].splice(index,0,{});
        }
    }
    else
    {
        for(j=0;j < this._rows.length;j++)
        {
            for(i=this._cols.length;i<=index;i++)
            {
                if(j==0)
                {
                    this._cols.push({});
                }
                this._cells[j].push({});   
            }
        }
    }
}

DataGrid.prototype.deleteCol = function(index)
{
    if(index < this._cols.length)
    {
        var i;
        this._cols.splice(index,1);
        for(i=0;i < this._rows.length;i++)
        {
            this._cells[i].splice(index,1);
        }
    }
    else
    {
        alert("paramter error:the index you provide is out of the this._rows' range");
    }
}

DataGrid.prototype.insertCellTop = function(rowindex,colindex)//上面插入活动单元下移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        var cell = new DataCell(this._cells[this._rows.length-1][colindex]);
        if(cell.ifSave())
        {
            this.insertRow(this._rows.length);
        }
        for(i=this._rows.length;i>rowindex;i--)
        {
            this._cells[i][colindex] = this._cells[i-1][colindex];
        }
        this._cells[rowindex][colindex] = {};
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.deleteCellTopMove = function(rowindex,colindex)//删除单元格活动单元上移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        for(i=rowindex;i < this._rows.length;i++)
        {
            if( i != (this._rows.length -1))
            {
                this._cells[i][colindex] = this._cells[i+1][colindex];
            }
            else
            {
                this._cells[i][colindex] = {};
            }
        }
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.insertCellLeft = function(rowindex,colindex)//左边插入活动单元格右移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        var cell = new DataCell(this._cells[rowindex][this._cols.length-1]);
        if(cell.ifSave())
        {
            this.insertCol(this._cols.length);
        }
        for(i=this._cols.length;i>colindex;i--)
        {
            this._cells[rowindex][i] = this._cells[i-1][colindex];
        }
        this._cells[rowindex][colindex] = {};
        
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.deleteCellLeftMove = function(rowindex,colindex)//删除单元格活动单元左移
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var i;
        for(i=colindex;i < this._cols.length;i++)
        {
            if( i != (this._cols.length - 1) )
            {
                this._cells[rowindex][i] = this._cells[rowindex][i+1];
            }
            else
            {
                this._cells[rowindex][i] = {};
            }
        }
    }
    else
    {
        alert("paramter error: the rowindex or colindex you provide may out of the range");
    }
}

DataGrid.prototype.getCellSize = function(rowindex,colindex)
{
    var i;
    var width=0,height=0;
    var row,col;
    var cell = new DataCell(this._cells[rowindex][colindex]);
    for(i=0;i < cell.getColspan();i++)
    {
        col = new DataCol(this._cols[colindex + i]);
        if(col.getVisible())
        {
            width += col.getWidth();
        }
    }
    
    for(i=0;i < cell.getRowspan();i++)
    {
        row = new DataRow(this._rows[rowindex+i]);
        if(row.getVisible())
        {
            height += row.getHeight();
        }
    }
    return {width:width,height:height};
}

DataGrid.prototype.getRectSize = function(srowindex,scolindex,erowindex,ecolindex)
{
    var i;
    var row,col;
    var width=0,height=0;
    for(i=srowindex;i<=erowindex;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            height += row.getHeight();
        }
    }
    for(i=scolindex;i<=ecolindex;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            width += col.getWidth();
        }
    }
    return {width:width,height:height};
}

DataGrid.prototype.getRowColByCoor = function(x,y)//根据鼠标位置获得对应的行列
{
    var i,j;
    var row,col;
    var tempx = this._offsetX,tempy = this._offsetY;
    for(i=this._scrollColNum;tempx < x && i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            tempx += col.getWidth();
        }
    }
    
    for(j=this._scrollRowNum; tempy < y && j < this._rows.length ; j++)
    {
        row = new DataRow(this._rows[j]);
        if(row.getVisible())
        {
            tempy += row.getHeight();
        }
    }
    
    if(tempx < x  || tempy < y)
    {
        if(tempx < x)
        {
            col = this._cols.length -1;
        }
        else
        {
			 if(i == 0)
			{
				i = 1;
			}
            col = i - 1;
			
        }
        
        if(tempy < y)
        {
            row = this._rows.length -1;
        }
        else
        {
            row = j - 1;
        }
        return {row:row,col:col};
    }
    else
    {
        if(i == 0)
        {
            i = 1;
        }
        if(j == 0)
        {
            j = 1;
        }
        var cell = new DataCell(this._cells[j-1][i-1]);
        if(cell.getRowspan() < 0 || cell.getColspan() < 0)
        {	
            return {row:(0-cell.getRowspan()),col:(0-cell.getColspan())};
        }else if(cell.getRowspan()===0){
			return 	{row:0,col:(0-cell.getColspan())};
		}
        else
        {	
            return {row:(j-1),col:(i-1)};
        }   
    }
    
}

DataGrid.prototype.getRowByDisToTop = function(y)//根据鼠标位置获得对应的行
{
    var i,row,half;
    var tempy = 0;
    for(i=0 ; tempy <= y && i < this._rows.length;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            tempy += row.getHeight();
        }
		
    }
    if(tempy > y)
    {
        if((tempy-y)/row.getHeight() < 0.5)
        {
            half = true;
        }
        else
        {
            half = false;
        }
        return {row:i,half:half};
    }
    else
    {
        return {row:this._rows.length,half:true};
    }
    
}


DataGrid.prototype.getColByDisToLeft = function(x)//根据鼠标位置获得对应的列
{
    var i,col,half;
    var tempx = 0;
    for(i=0;tempx <= x && i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            tempx += col.getWidth();
        }
    }
    if(tempx > x)
    {
        if((tempx-x)/col.getWidth() < 0.5)
        {
            half = true;
        }
        else
        {
            half = false;
        }
        return {col:i,half:half};
    }
    else
    {
        return {col:this._cols.length,half:true};
    }
}

DataGrid.prototype.combineCells = function(srowindex,scolindex,erowindex,ecolindex)
{
    if(srowindex > erowindex || scolindex > ecolindex)
    {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    }
    else
    {
        var i,j,a=0,text="";
		
        if(this._rows.length < erowindex)
        {
            this.insertRow(erowindex);
        }
        
        if(this._cols.length < ecolindex)
        {
            this.insertCol(ecolindex);
        }
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				
                if(i==srowindex && j == scolindex)
                {
                    this._cells[i][j].rows = erowindex - srowindex;
                    this._cells[i][j].cols = ecolindex - scolindex;
              		
			    }
                else
                {
                    this._cells[i][j].rows = 0-srowindex-1;
                    this._cells[i][j].cols = 0-scolindex-1;
                }
				
            }
        }
    }
}

DataGrid.prototype.combineSelCells = function(srowindex,scolindex,erowindex,ecolindex)
{
    this.combineCells(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol);
}
DataGrid.prototype.IscombineCell = function(srowindex,scolindex,erowindex,ecolindex)
{
  if(srowindex > erowindex || scolindex > ecolindex)
    {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    }
    else
    {
        var i,j,a=0,text="";
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				
			   if(this._cells[i][j].rows===undefined){
					return false;   
				}
            }
        }
    }
	return true;
}

DataGrid.prototype.breakupCells = function(srowindex,scolindex,erowindex,ecolindex)
{
    var i,j;
	//this._cells[srowindex][scolindex].t='';
    for(i=srowindex;i<=erowindex;i++)
    {
        for(j=scolindex;j<=ecolindex;j++)
        {
			if(this._cells[i][j].rows != undefined)
            {
                delete this._cells[i][j].rows;
            }
            if(this._cells[i][j].cols != undefined)
            {
                delete this._cells[i][j].cols;
            }
        }
    }    
}

DataGrid.prototype.breakupSelCells = function()
{
    this.breakupCells(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol);
}

DataGrid.prototype.getCellLeftTopCoor = function(rowindex,colindex)
{
    var x,y,i,row,col;
    x = this._offsetX;
    y = this._offsetY;
    if(rowindex > this._scrollRowNum)
    {
        for(i=this._scrollRowNum;i < rowindex;i++)
        {
            row = new DataRow(this._rows[i]);
            if(row.getVisible())
            {
                y += row.getHeight();
            }
        }
    }
    else if(rowindex < this._scrollRowNum)
    {
        for(i=rowindex;i < this._scrollRowNum;i++)
        {
            row = new DataRow(this._rows[i]);
            if(row.getVisible())
            {
                y -= row.getHeight();
            }
        }
    }
    if(colindex > this._scrollColNum)
    {
        for(i=this._scrollColNum;i < colindex;i++)
        {
            col = new DataCol(this._cols[i]);
            if(col.getVisible())
            {
                x += col.getWidth();
            }
        }
    }
    else if(colindex < this._scrollColNum)
    {
        for(i=colindex;i < this._scrollColNum;i++)
        {
            col = new DataCol(this._cols[i]);
            if(col.getVisible())
            {
                x -= col.getWidth();
            }
        }
    }
    return {x:x,y:y};
}

DataGrid.prototype.getCellRightTopCoor = function(rowindex,colindex)
{
    var leftop = this.getCellLeftTopCoor(rowindex,colindex);
    var cellsize = this.getCellSize(rowindex,colindex);
    return {x:leftop.x+cellsize.width,y:leftop.y};
}

DataGrid.prototype.getCellRightBottomCoor = function(rowindex,colindex)
{
    var leftop = this.getCellLeftTopCoor(rowindex,colindex);
    var cellsize = this.getCellSize(rowindex,colindex);
    return {x:leftop.x+cellsize.width,y:leftop.y+cellsize.height};
}

DataGrid.prototype.getCellLeftBottomCoor = function(rowindex,colindex)
{
    var leftop = this.getCellLeftTopCoor(rowindex,colindex);
    var cellsize = this.getCellSize(rowindex,colindex);
    return {x:leftop.x,y:leftop.y+cellsize.height};
}

DataGrid.prototype.findCombineCellsAroundSelCells = function()//找到合并的单元格
{	
    var i,cell;
    var temp_startrow,temp_startcol,temp_endrow,temp_endcol;
    for(i=this._sel_startRow;i<=this._sel_endRow;i++)
    {	
        cell = new DataCell(this._cells[i][this._sel_startCol]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)//mouseDown 触发合并单元格
        {
            temp_startrow = i;
            temp_startcol = this._sel_startCol;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    
    for(i=this._sel_startRow;i<=this._sel_endRow;i++)
    {
        cell = new DataCell(this._cells[i][this._sel_endCol]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)
        {
            temp_startrow = i;
            temp_startcol = this._sel_endCol;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    
    for(i=this._sel_startCol;i<=this._sel_endCol;i++)
    {
        cell = new DataCell(this._cells[this._sel_startRow][i]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)
        {
            temp_startrow = this._sel_startRow;
            temp_startcol = i;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    
    for(i=this._sel_startCol;i<=this._sel_endCol;i++)
    {
        cell = new DataCell(this._cells[this._sel_endRow][i]);
        if(cell.getRowspan()<=0 && cell.getColspan() <=0)
        {
            temp_startrow = 0 - cell.getRowspan();
            temp_startcol = 0 - cell.getColspan();
            cell = new DataCell(this._cells[temp_startrow][temp_startcol]);
            temp_endrow = temp_startrow + cell.getRowspan() - 1;
            temp_endcol = temp_startcol + cell.getColspan() - 1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
        else if(cell.getRowspan() > 1 || cell.getColspan() > 1)
        {
            temp_startrow = this._sel_endRow;
            temp_startcol = i;
            temp_endrow = temp_startrow + cell.getRowspan() -1;
            temp_endcol = temp_startcol + cell.getColspan() -1;
            if(temp_startrow < this._sel_startRow || temp_startcol<this._sel_startCol || temp_endrow>this._sel_endRow || temp_endcol > this._sel_endCol)
            {
                return {startrow:temp_startrow,startcol:temp_startcol,endrow:temp_endrow,endcol:temp_endcol};
            }
        }
    }
    return null;
}

DataGrid.prototype.getScrollTop = function()
{
    var i,tempheight,row;
    for(i=0,tempheight=0;i < this._scrollRowNum;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            tempheight += row.getHeight();
        }
    }
    return tempheight;
}

DataGrid.prototype.getScrollLeft = function()
{
    var i,tempwidth,col;
    for(i=0,tempwidth=0;i < this._scrollColNum;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            tempwidth += col.getWidth();
        }
    }
    return tempwidth;
}

DataGrid.prototype.getFullWidth = function()
{
    var i,col,fullwidth;
    for(i=0,fullwidth=0;i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            fullwidth += col.getWidth();
        }
    }
	col = new DataCol(this._cols[this._cols.length-1]);
    return fullwidth + this.getGridZoneWidth() - col.getWidth();
}

DataGrid.prototype.getFullHeight = function()
{
    var i,col,fullheight;
    for(i=0,fullheight=0;i < this._rows.length;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            fullheight += row.getHeight();
        }
    }
	col = new DataRow(this._rows[this._rows.length-1]);
    return fullheight + this.getGridZoneHeight() - col.getHeight();
}

DataGrid.prototype.getGridZoneWidth = function()
{
    return this._width - this._offsetX;
}

DataGrid.prototype.getGridZoneHeight = function()
{
    return this._height - this._offsetY;
}

DataGrid.prototype.getScrollRowNum = function()
{
    return this._scrollRowNum;
}

DataGrid.prototype.setScrollRowNum = function(num)
{
    if(typeof(num) == "number")
    {
        this._scrollRowNum = num;
    }
    else
    {
        alert("paramter error:scrollrownum should be number type");
    }
}

DataGrid.prototype.getScrollColNum = function()
{
    return this._scrollColNum;
}

DataGrid.prototype.setScrollColNum = function(num)
{
    if(typeof(num) == "number")
    {
        this._scrollColNum = num;
    }
    else
    {
        alert("paramter error:scrollcolnum should be number type");
    }
}

DataGrid.prototype.getSelStartRow = function()
{
	return this._sel_startRow;
}

DataGrid.prototype.getSelStartCol = function()
{
	return this._sel_startCol;
}

DataGrid.prototype.getEndRow = function()
{
	return this._sel_endRow;
}

DataGrid.prototype.getEndCol = function()
{
	return this._sel_endCol;
}

DataGrid.prototype.setFocusRow = function(rowindex)
{
	this._focusRow = rowindex;
}

DataGrid.prototype.setFocusCol = function(colindex)
{
	this._focusCol = colindex;
}

DataGrid.prototype.getCellValue = function(rowindex,colindex)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        var cell = new DataCell(this._cells[rowindex][colindex]);
        return cell.getValue();
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}

DataGrid.prototype.setCellValue = function(rowindex,colindex,value)
{	
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
		this._cells[rowindex][colindex].t = value;
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}



DataGrid.prototype.setCellProperty = function(rowindex,colindex,property,propertyvalue)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        for(var i in this._cells[rowindex][colindex])
		{
			if(i===property)
			{
				this._cells[rowindex][colindex][i]=	propertyvalue;
				break;
			}	
		}
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}
DataGrid.prototype.getCellProperty = function(rowindex,colindex,property)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
		if(this._cells[rowindex][colindex][property]!==undefined){
			return true;
		}
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}
DataGrid.prototype.setCellTextAlign = function(rowindex,colindex,textalign)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        this._cells[rowindex][colindex].hag = textalign;
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}

DataGrid.prototype.setSelCellTextAlign = function(textalign)
{
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this.setCellTextAlign(i,j,textalign);
		}
	}
}
DataGrid.prototype.setSelCellVerticalAlign = function(verticalAlign)
{
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this.setCellVerticalAlign(i,j,verticalAlign);
		}
	}
}

DataGrid.prototype.setCellVerticalAlign = function(rowindex,colindex,verticalAlign)
{
    
	if(rowindex < this._rows.length && colindex < this._cols.length)
    {
        this._cells[rowindex][colindex].vag  = verticalAlign;
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}

DataGrid.prototype.setFontFamily = function(rowindex,colindex,family)
{
	this._cells[rowindex][colindex].fontFamily = family;
}

DataGrid.prototype.setSelCellFontFamily = function(family)
{
	var i,j;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		templist.fname=family;	
	}else{
		templist={"hei":"-12","cset":"134","fname":family};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}
DataGrid.prototype.setCellNumberOnly=function(rowindex,colindex){
	this._cells[rowindex][colindex].numberOnly = !this._cells[rowindex][colindex].numberOnly;
}

DataGrid.prototype.setSelCellNumberOnly=function(){
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].numberOnly = !this._cells[i][j].numberOnly;
		}
	}
}

DataGrid.prototype.setFontSize = function(rowindex,colindex,size)
{
	if(typeof(size)!="number"){
		this._cells[rowindex][colindex].fontSize = parseInt(size);
	}else{
		this._cells[rowindex][colindex].fontSize = size;
	}
	
}

DataGrid.prototype.setSelCellFontSize = function(size)
{
	var i,j,size,tempfontsize,tempsize,ftlist=this._ftlist,listid;
	size=arguments[0];
	if(typeof(size)!="number"){
		size = parseInt(size);
	}	
	
	if(ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	var tempfontsize=-parseInt(templist.hei,10) || 14;
	tempsize=-size;
	if(!T.isEmptyObject(templist)){//引用
		
		
		templist.hei=String(tempsize);	
	}else{
		templist={"hei":String(tempsize),"cset":"134"};	
	}

	listid=T.array.InArray(templist,ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		var textheight=this.getRowHeight(i);
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			
			
			if(tempfontsize>size){
					
					textheight-=tempfontsize-	size;
			
			}else if(tempfontsize<size){
				
				textheight+=size-tempfontsize;
			}

			this._cells[i][j].ftid=listid;
		}
		this.setRowHeight(i, textheight);
	}
	
	

}

DataGrid.prototype.setFontBold = function(rowindex,colindex,Bold)
{
	this._cells[rowindex][colindex].fontBold = Bold;
}

DataGrid.prototype.setSelCellFontBold = function()
{
	
	var i,j,Bold;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		if(!("wei" in templist)){
			templist.wei="700";	
		}else{
			delete templist.wei;	
		}
			
	}else{
		templist={"hei":"-12","cset":"134","wei":"700"};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}
	
	for(i=this._sel_startRow;i <= this._sel_endRow; i++)
	{
		for(j=this._sel_startCol;j <= this._sel_endCol ; j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}

DataGrid.prototype.setFontItalic = function(rowindex,colindex,italic)
{
	this._cells[rowindex][colindex].fontItalic = italic;
}
DataGrid.prototype.setCellNote = function(rowindex,colindex,note)
{
	this._cells[rowindex][colindex].note = note;
}
DataGrid.prototype.setCellTip = function(rowindex,colindex,tip)
{
	this._cells[rowindex][colindex].tip = tip;
}
DataGrid.prototype.setSelCellFontItalic = function()
{
	var i,j,italic;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		if(!("ita" in templist)){
			templist.ita="1";	
		}else{
			delete templist.ita;	
		}
			
	}else{
		templist={"hei":"-12","cset":"134","ita":"1"};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}

DataGrid.prototype.setCellUnderline = function(rowindex,colindex,flag)
{
	this._cells[rowindex][colindex].fontUnderline = flag;
}

DataGrid.prototype.setSelCellUnderline = function()
{
	var i,j,flag;
	
	if(this._ftlist===undefined)this._ftlist=[];
	var templist=Object.extend({},this._ftlist[this._cells[this._focusRow][this._focusCol].ftid]) || {};
	if(!T.isEmptyObject(templist)){
		if(!("uline" in templist)){
			templist.uline="1";	
		}else{
			delete templist.uline;	
		}
			
	}else{
		templist={"hei":"-12","cset":"134","uline":"1"};	
	}
	
	var listid=T.array.InArray(templist,this._ftlist);//查询ftid的值 若为false则 插入
	if(listid === false){
		this._ftlist.push(templist);
		listid = String(this._ftlist.length-1);	
	}

	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			this._cells[i][j].ftid = listid;
		}
	}
}

DataGrid.prototype.setCellTopBorder = function(rowindex,colindex,border)
{
    if(rowindex < this._rows.length && colindex < this._cols.length)
    {
    }
    else
    {
        alert("paramter error:the paramter which you provide is out of the cells' range");
    }
}



DataGrid.prototype.setCellRightBorder = function()
{
    
}

DataGrid.prototype.setCellBottomBorder = function()
{
    
}

DataGrid.prototype.setCellLeftBorder  = function()
{
    
}

DataGrid.prototype.setCellFontFamily = function()
{
    
}

DataGrid.prototype.setCellFontSize = function()
{
    
}

DataGrid.prototype.setCellFontColor  = function(rowindex,colindex,color)
{
	this._cells[rowindex][colindex].fontColor = color;

}

DataGrid.prototype.setCellBackColor = function(rowindex,colindex,color)
{
	this._cells[rowindex][colindex].backColor = color;

}

DataGrid.prototype.setCellBackImage = function()
{
    
}

DataGrid.prototype.getSaveJson = function()
{
	var str = "";
	var i,j,row,col,cell,flag;
	if(this._netChartVisible)
	{
		str += "{netChartVisible:true,";
	}
	else
	{
		str += "netChartVisible:false,";
	}
	str += ("rowsNum:" + this._rows.length + ",");
	str += ("colsNum:" + this._cols.length + ",");
	str += "rows:[";
	for(i=0,flag=0;i < this._rows.length;i++)
	{
		row = new DataRow(this._rows[i]);
		if(row.ifSave())
		{
			if(flag != 0)
			{
				str += ",";
			}
			str += "{row:"+i+",data:"+toJson(this._rows[i])+"}";
			flag++;
		}
	}
	str += "],";
	str += "cols:[";
	for(i=0,flag=0;i < this._cols.length;i++)
	{
		col = new DataCol(this._cols[i]);
		if(col.ifSave())
		{
			if(flag !=0 )
			{
				str += ",";
			}
			str += "{col:"+i+",data:"+toJson(this._cols[i])+"}";
			flag++;
		}
	}
	str += "],";
	str += "cells:[";
	for(i=0,flag=0;i < this._rows.length;i++)
	{
		for(j=0;j < this._cols.length;j++)
		{
			cell = new DataCell(this._cells[i][j]);
			if(cell.ifSave())
			{
				if(flag != 0)
				{
					str += ",";
				}
				str += "{row:"+i+",col:"+j+",data:"+toJson(this._cells[i][j])+"}";
				flag ++;
			}
		}
	}
	str += "]}";
	return str;
}


/*绘图相关*/
DataGrid.prototype.paintNetLine = function()
{
	var dc = this.getDc();
	var paintNetLines=function(){
			
			var i,row,col,x,y,offsety=this._offsetY,offsetx=this._offsetX;
			
			dc.lineWidth = 1;
			dc.strokeStyle = '#BBBBBB';
			
			y = 0;
			dc.lineWidth = 1;
			dc.beginPath();
			dc.moveTo(0,y);
			dc.lineTo(this.getWidth(),y);
			y+=this._offsetY;
			dc.moveTo(0,y);
			dc.lineTo(this.getWidth(),y);
			dc.stroke();
			dc.closePath();					
			
			x = 0;
			dc.strokeStyle = '#BBBBBB';
			dc.beginPath();
			dc.moveTo(x,0);
			dc.lineTo(x,this.getHeight());
			x += this._offsetX;
			dc.moveTo(x,0);
			dc.lineTo(x,this.getHeight());
			dc.stroke();
			dc.closePath();
			
			if(this.getNetChartVisible())//是否显示表格线
			{
				var rectSize = this.getRectSize(this._scrollRowNum,this._scrollColNum,this._rows.length,this._cols.length);
				var width = Number(this._showheader)===0?rectSize.width:this.getWidth();
				var height = Number(this._showheader)===0?rectSize.height:this.getHeight();
				
				for(i = this._scrollRowNum;y<=this.getHeight() && i < this._rows.length; i ++)
				{
					row = new DataRow(this._rows[i]);
					if(row.getVisible())
					{	
						dc.beginPath();
						y += row.getHeight();
						dc.moveTo(offsetx,y);
						dc.lineTo(width,y);
						dc.stroke();
						dc.closePath();
					}
				}

				for(i=this._scrollColNum;x<=this.getWidth() && i < this._cols.length;i++)
				{
					col = new DataCol(this._cols[i]);
					if(col.getVisible())
					{	
						dc.beginPath();
						x += col.getWidth();
						dc.moveTo(x,offsety);
						dc.lineTo(x,height);
						dc.stroke();
						dc.closePath();
					}
				}
			this.releaseDc(dc);
		}
	};

	var _this=this;
	if(this.getProperty('backimage'))
	{
		var img={};
		var temp =this._imglist[this._backimage-1];
		if((this._tagval2 >> 17) & 0x01){
			img.size='origin';	
		}else{
			img.size='canvas';	
		}	
		
		img.width=temp.width;
		img.height=temp.height;
		var image = new Image();
		image.src = temp.src;
			_this.paintBackimage(dc,img,image);
			paintNetLines.apply(_this);
	}else
	{
		paintNetLines.apply(this);//在当前作用域中执行paintNetLines函数，不然是window对象
	}
}
DataGrid.prototype.getProperty=function(p){
	if(this['_'+p]!==undefined){
		if(this['_'+p]!=='none'&&this['_'+p]!==''){
			return this['_'+p];	
		}else{
			return false;	
		}	
	}else{
		return false;	
	}
}
DataGrid.prototype.paintRowColor = function()
{
	var dc = this.getDc();
	var i,row,col,x=0,y=0,offsety=this._offsetY,offsetx=this._offsetX,width=0;
	
	dc.lineWidth = 1;
	dc.strokeStyle = '#BBBBBB';
	for(var j=this._scrollColNum;j < this._cols.length;j++)
	{
		col = new DataCol(this._cols[j]);
		
		if(col.getVisible())
		{	
			
			width += col.getWidth();
			
		}
	}
	for(i = 0; i < this._rows.length; i ++)
	{
		row = new DataRow(this._rows[i]);
		
		if(row.getVisible())
		{	
			if(row.getColor()!==false){

				//dc.fillStyle =row.getColor();;
				//dc.fillRect(x,y,width,row.getHeight());
			}
		}
		y += row.getHeight();
	}
	this.releaseDc(dc);

}

DataGrid.prototype.paintHeader = function()
{
    var dc = this.getDc();
    var i,y,x,text,textx,texty,textlength,temp;
    var row,col;
    var compos = this.getCanvasXY();
    /*paint the row header*/
    dc.lineWidth = 0.2;
    dc.strokeStyle = "#000";
    dc.font = this._textHeight + "px 宋体";
	var selColor;
	if(this.getMousecursor()=='default'){
		selColor="#FFF69A";//'#ff1800';	
	}
	else
	{
		selColor='#FFF69A';
	}
	
    for(i=this._scrollRowNum,y=this._offsetY;y <= this.getHeight() && i<  this._rows.length;i++)
    {
        row = new DataRow(this._rows[i]);
        if(row.getVisible())
        {
            y += row.getHeight();
            text = i+1;
            textlength = dc.measureText(text).width;
            textx = (this._offsetX - textlength)/2;
            texty = y-(row.getHeight() - this._textHeight)/2;
            if(i<this._sel_startRow || i>this._sel_endRow)
            {
                dc.fillStyle = "#DEE6F1";//"#0f0";//左侧单元格
                dc.fillRect(1,y+1-row.getHeight(),this._offsetX-2,row.getHeight()-2);
            }
            else
            {
                dc.fillStyle = selColor;
				dc.fillRect(1,y+1-row.getHeight(),this._offsetX-2,row.getHeight()-2);
            }				
			
			dc.fillStyle = "#7F97B9";//"#716F64";
			dc.fillRect(1,y,this._offsetX-2,1);

            dc.fillStyle = "#000";
            dc.fillText(text,textx,texty);
        }
    }
    dc.lineWidth = 0.2;
    dc.strokeStyle = "#000";
    dc.font = this._textHeight + "px 宋体";
	/*左上角*/
	dc.fillStyle ="#DEE6F1"; //"#0f0";
	dc.fillRect(0,0,this._offsetX,this._offsetY);
	
    for(i=this._scrollColNum,x=this._offsetX; x <= this.getWidth() && i < this._cols.length;i++)
    {
        col = new DataCol(this._cols[i]);
        if(col.getVisible())
        {
            x += col.getWidth();
            text = "";
            temp = i;
            while(Math.floor(temp/26) != 0)
            {   
                text = this._charDic[temp%26] + text;
                temp = Math.floor(temp/26);
            }
            if(text != "")
            {
                text = this._charDic[temp-1] + text;
            }
            else
            {
                text = this._charDic[temp];
            }
            textlength = dc.measureText(text).width;
            if(textlength > col.getWidth())
            {
                textx = x - col.getWidth();
            }
            else
            {
                textx = x-(col.getWidth()+textlength)/2;
            }
            texty = (this._offsetY + this._textHeight)/2;
            if(i<this._sel_startCol || i>this._sel_endCol)//列
            {
                dc.fillStyle ="#DEE6F1"; //"#0f0";
                dc.fillRect((x-col.getWidth()+1),1,col.getWidth()-2,this._offsetY-2);
		    }
            else
            {
                dc.fillStyle = selColor;
                dc.fillRect((x-col.getWidth()+1),1,col.getWidth()-2,this._offsetY-2);
            }				
			
			dc.fillStyle ="#7F97B9";//"#716F64";
			dc.fillRect(x,1,1,this._offsetY-2);

            dc.fillStyle = "#000";//字体颜色
            dc.fillText(text,textx,texty);
        }
    }
    dc.fillStyle = "#fff";
    if(y < this.getHeight() )
    {
	    dc.fillRect(0,y,this.getWidth(),this.getHeight()-y);
	}
	if(x < this.getWidth())
	{
	    dc.fillRect(x,0,this.getWidth()-x,this.getHeight());
	}
    this.releaseDc(dc);
}

DataGrid.prototype.openJson = function(jsonstr)
{	
	
	var DATA=new parseXjc(jsonstr);
	this._rows = new Array();
	this._cols=[];
	this._rows=DATA._rows;
	this._cols=DATA._cols;
	this._xjc=DATA.xjc;
	this._cells = new Array();
	var General=["caneditform","rowheadwidth","colheadheight","showgrid","showheader","totalcol","totalrow","vermajor","verminor","tableimage","backimage",
				 "pacolor","maxeditrow","maxeditcol","showformula","protecthascursor","dclicklabelsort","propertiy","printgrid","fixedcols",
				 "printhcalign","printvcalign","designmode","showmenu","loadscript","data","userfuncs","genscript","savedb","hiderowdrag",
				 "tagvalue","tagval2","titlerows","selbkcolor","calscript","calscripttype","cursorwidth","sysdbsource","prefooterrows","pfooterrows",
				 "gridcolor","gridtype","statscript","errmsgbox","pagerows","useado","allowrowresize","allowcolresize","autojump","sheetname",
				 "rowautosize" ];
	for(var i=0;i<General.length;i++){
		  if(General[i] in this){
			delete  this[General[i]]; 
		  }
		  if('_'+General[i] in this){
			delete  this['_'+General[i]]; 
		  }
	}
	
	for( p in DATA.datagrid){
		if(p ==='_VerMinor'){
			this['_verminor']=DATA.datagrid[p];	
		}else{
			this[p]=DATA.datagrid[p];	
		}
	}
	this['print']=DATA['print'];
	for(i=0;i < this._rows.length;i++)
	{
		this._cells.push(new Array());
		for(j=0;j < this._cols.length;j++)
		{
			this._cells[i].push({});
		}
	}
	//
	
	for(var i=0;i < this._rows.length;i++){
		
		for(var j=0;j < this._cols.length;j++){
			
			
			for( p in DATA._cells[i][j]){
				
				if(DATA._cells[i][j].cellcheck !== undefined){
					var startcoor = this.getCellLeftTopCoor(i,j);
					this._cells[i][j][p]=DATA._cells[i][j][p];
					this._cells[i][j][p].x=startcoor.x;
					this._cells[i][j][p].y=startcoor.y;
				}else{
					this._cells[i][j][p]=DATA._cells[i][j][p];
				}
			}		
		}	
	}
	if(this._tableimage !== undefined){
		var tableimglist = this._tableimage.split(',');
		var bb=[];
		for(var i=0;i<tableimglist.length;i++){
		  if(tableimglist[i]!=='' && i==0){		
		    var img=new Image();
		   
			img.src =this._imglist[tableimglist[i]-1]['src'];
			img.id="uploadimgToCanavs"+i;
				
				bb.push("aa"+i);
				 	

				document.body.appendChild(img);
				bb[i]= new dragimg(img.id,img.width,img.height);	
		   }
		}
		
	}
	
	//exportXml(this);
	//=DATA._cells;

}

DataGrid.prototype.getSelStartRow = function() {
    return this._sel_startRow;
}

DataGrid.prototype.getSelStartCol = function() {
    return this._sel_startCol;
}
DataGrid.prototype.paintCellContent = function(dc, cell, x, y, width, height) {
	
    var backFillStyle = cell.getBackColor(this._brlist);;
	if (backFillStyle !== undefined) {
        	dc.fillStyle = backFillStyle;//cell._backColor;
        	//dc.fillRect(x + 1, y + 1, width - 2, height - 2);
    		dc.fillRect(x, y, width, height);
	}
	
	if((cell._flex >> 6) & 0x01){//flex 6 单元是否为特色背景色
		this.paintGradientColor(dc, cell, x, y, width, height);
	}
	if((cell._tag>>5)&0x01){//3Dbox
		this.paintCell3Dshape(dc, cell, x, y, width, height);
	}
	if (cell._cellImage !== 'none' && cell._cellImage.filename !== undefined) {
       		 var _this = this;
        
			var img={};
			var temp =cell._cellImage;
			temp.imagetype = Number(temp.imagetype);
			var imagetypearr =["image/bmp","image/jpeg","image/gif","image/png"];
			img.filename='data:'+imagetypearr[temp.imagetype-1]+';base64,'+temp.filename;
			img.type="cell";
			if((cell._tag >> 4) & 0x01){
				
				img.size="origin";	
			}else if((cell._tag >> 15) & 0x01){
				img.size="imgsize";		
			}else if((cell._tag >> 3) & 0x01){
				img.size="cell";		
			}
			if(cell._imgangle!== undefined){
				img.turn={};
				if((cell._tag >> 16) & 0x01){
					img.turn.direction=	'right';
				}else{
					img.turn.direction=	'left';	
				}
				img.turn.angle = parseInt(cell._imgangle,10);
			}
			img.width =temp.width;
			img.height = temp.height;
			var image = new Image();
			image.src = img.filename;
			//image.onload = function() {
				
				_this.paintCellImage(dc, cell, x, y, width, height, img, image);
				if ((!(cell._fl >> 15 & 0x01) &&!(cell._tag >> 0 & 0x01)) || cell._note!=='none') {
					if(cell._slty ===	undefined){
						 _this.paintCellText(dc, cell, x, y, width, height);
					}
				}
			//}
		
        this.paintCellBorder(dc, cell, x, y, width, height);

    } else {
		
        if ((!(cell._fl >> 15 & 0x01) &&!(cell._tag >> 0 & 0x01)) || cell._note!=='none') {
			if(cell._slty ===	undefined|| Number(cell._slty)===0 ){
				   this.paintCellText(dc, cell, x, y, width, height);
			  }
		}
		
		
	    this.paintCellBorder(dc, cell, x, y, width, height);
    }
    if ((cell._fl >> 12) & 0x01) {//下拉框
       
        this.paintCellControlsItem(dc, cell, "dropdownbox", x, y, width, height);
    }
	
    if ((cell._fl >> 10) & 0x01) {//单选框
        
        this.paintCellControlsItem(dc, cell, "radiobutton", x, y, width, height);
    }
			
    if (cell._cellurl !==undefined) {//按钮
        if((cell._cellurl.tagval >> 1) & 0x01){
			//this.paintCellControlsItem(dc, cell, "button", x, y, width, height);
		}
    }
	if ((cell._fl >> 15) & 0x01) {//财务表览
        
        this.paintCellControlsItem(dc, cell, "financialmain", x, y, width, height);
    }   
	if ((cell._tag >> 0) & 0x01) {//财务表头
       
        this.paintCellControlsItem(dc, cell, "financialhead", x, y, width, height);
    }   
	
	if (cell.getBorderLine() != "none") {
        var borderLines = cell.getBorderLine();
        //this.paintBorderLine(dc,borderLines,x,y,width,height,cell);
    }

    if (cell._slty !=undefined) {
        this.paintCellSlantline(dc, cell, x, y, width, height);
    }
	if((this._designmode===undefined && cell._note!=='none')||cell._tip!=='none'){
		this.paintNoteTag(dc, cell, x, y, width, height);
			
	}
}

DataGrid.prototype.paintCellBorder = function(dc, cell, x, y, width, height) {
	var fl=cell._fl;
    var paintdash = function(x, y, x2, y2, style, width, color) {
        if (style === '2') { //点线

            T.canvas.drawDashes(x, y, x2, y2, '1 2 0 2', width, 'dotted', color);

        } else if (style === '1') { //虚线

            T.canvas.drawDashes(x, y, x2, y2, '10 5 0 10', width, 'dashed', color);

        } else if (style === '3') { //点划线

            T.canvas.drawDashes(x, y, x2, y2, '10 4', width, 'butt', color);

        } else if (style === '4') { //点点划线
			
            T.canvas.drawDashes(x, y, x2, y2, '10 4', width, 'bbut', color);
        }
    };

    if ((fl >> 5) & 0x01) {//cell._borderTopWidth > 0
		
		var borderTopColor=T.color.getcolorFromByte(String(this._penlist[cell._tpenid].color));
		var borderTopWidth=this._penlist[cell._tpenid].widx;
		var borderTopStyle=this._penlist[cell._tpenid].style;
		
        dc.strokeStyle =borderTopColor; //cell._borderTopColor;
        dc.lineWidth = borderTopWidth;
        if (borderTopStyle === '0') {
            dc.beginPath();
            dc.moveTo(x, y);
            dc.lineTo(x + width, y);
            dc.stroke();
			dc.closePath();
        } else {
            paintdash(x, y, x + width, y, borderTopStyle, borderTopWidth, borderTopStyle);
        }
    }

    if ((fl >> 6) & 0x01) {//cell._borderRightWidth > 0 && cell._rightNetLine
		var borderRightColor=T.color.getcolorFromByte(String(this._penlist[cell._rpenid].color));
		var borderRightWidth=this._penlist[cell._rpenid].widx;
		var borderRightStyle=this._penlist[cell._rpenid].style;
        
		dc.strokeStyle = borderRightColor;
        dc.lineWidth =		borderRightWidth;
        if (borderRightStyle === '0') {
            dc.beginPath();
            dc.moveTo(x + width, y);
            dc.lineTo(x + width, y + height);
            dc.stroke();
			dc.closePath();
        } else {
            paintdash(x + width, y, x + width, y + height, borderRightStyle, borderRightWidth, borderRightColor);
        }
    }

    if ((fl >> 7) & 0x01) {//cell._borderBottomWidth > 0
	
		var borderBottomColor=T.color.getcolorFromByte(String(this._penlist[cell._bpenid].color));
		var borderBottomWidth=this._penlist[cell._bpenid].widx;
		var borderBottomStyle=this._penlist[cell._bpenid].style;

	    dc.strokeStyle = borderBottomColor;
        dc.lineWidth = borderBottomWidth;
        if (borderBottomStyle === '0') {
            dc.beginPath();
            dc.moveTo(x, y + height);
            dc.lineTo(x + width, y + height);
            dc.stroke();
			dc.closePath();
        } else {
            paintdash(x, y + height, x + width, y + height, borderBottomStyle, borderBottomWidth, borderBottomColor);
        }
    }

    if ((fl >> 4) & 0x01) {//cell._borderLeftWidth > 0 && cell._leftNetLine
	
		var borderLeftColor=T.color.getcolorFromByte(String(this._penlist[cell._lpenid].color));
		var borderLeftWidth=this._penlist[cell._lpenid].widx;
		var borderLeftStyle=this._penlist[cell._lpenid].style;

		dc.strokeStyle = borderLeftColor;
        dc.lineWidth = 	borderLeftWidth;
        if (borderLeftStyle === '0') {
            dc.beginPath();
            dc.moveTo(x, y);
            dc.lineTo(x, y + height);
            dc.stroke();
			dc.closePath();
	        } else {
            paintdash(x, y, x, y + height, borderLeftStyle, borderLeftWidth, borderLeftColor);
        }
    }
}
DataGrid.prototype.getdcfont = function(font) {
    if (font === undefined) {
        return "12px 宋体";
    } else {
        font = this._ftlist[font];
        if (font !== undefined) {
            var fontstr = "";
            if (font.ita !== undefined) {
                fontstr += "italic ";
            }
            if (font.wei !== undefined) {
                fontstr += "bold ";
            }

            if (font.hei !== undefined) {
                fontstr += -parseInt(font.hei, 10) + "px ";
            } else {
                fontstr += "12px ";
            }
            if (font.fname !== undefined) {
                fontstr += font.fname + " ";
            } else {
                fontstr += "宋体 ";
            }

            return fontstr;

        } else {
            return "12px 宋体";
        }
    }
}
DataGrid.prototype.paintCellText = function(dc, cell, x, y, width, height) {
	var ftlist= this._ftlist;
	var cellvalue=cell.getValue(),

		textFormat=cell.getTextFormat(this._swty),
		
		textfont=this.getdcfont(cell.getFtid()),
		
		textAlign=cell._hag || this._hag,
		
		textverAlign=cell._vag || this._vag,
		
		textfontsize= cell.getFontSize(ftlist);
		
		horMargin = cell._lspan || 5,//内左边距
		
		verMargin = cell._tspan || 3
		;
	var i, textx, texty, text, textlength, fontstr = "",oldvalue=cell._t,
    drawtextlist = new Array,
    config = '',textFormat;
	var textwidth;
		
	if(cellvalue===undefined){
		cellvalue='';//return;
	}
	if((cell._flex>>5)& 0x01){//html单元
		this.showhtmlCell(x, y,cell._t);
		return;	
	}
    var is_radiobutton = false,is_dropdownbox=false;
  
	if ((cell._fl >> 10) & 0x01) {//单选框
		
		is_radiobutton = true;
		config = cell._cellcheck;
	}else if((cell._fl >> 12) & 0x01){//下拉框
		is_dropdownbox = true;
		config = cell._clco;
	}
	
	if(is_dropdownbox === true) {
		var oldtext=drawtextlist[i];
		var tmplen=Math.floor((width-30)/dc.measureText(cellvalue).width*cellvalue.length);
		cellvalue=cellvalue.substring(0,tmplen)+'\n'+cellvalue.substring(tmplen,cellvalue.length);
		
	}
	
    dc.font = textfont;
	
	dc.fillStyle = T.color.getcolorFromByte(cell.get("tcor")) || "#000000";
	
	if(cell._swty  !== undefined){
		var swtyArray=[1,2,3,4,6,7,5,8,11,12,13,14,15,16,17,18];
		
		cell._swty = parseInt(cell._swty,10);
		
		if(swtyArray.indexOf(cell._swty)!==-1 || cell._swty>=128){//单元数字格式显示
		
			textFormat={'format':cell._swty,'weishu':cell._dpt===undefined?2:parseInt(cell._dpt,10),'nby':0};	
			if(textFormat.format >= 128){
				if(cellvalue===0){
					cellvalue='';	
				}else{
					textFormat.format=String(parseInt(textFormat.format,10)-128);
					cellvalue = this.turnFormat(textFormat, cellvalue);		
				}
			}else{
				cellvalue = this.turnFormat(textFormat, cellvalue);	
			}
		}
		if(textAlign === '' || textAlign===undefined){textAlign='2';}
	}
	if(cell._swty === 10 && cell._lexcel!==undefined){//单元时间格式显示
			
			var xmldom = null;
			try {
				xmldom = T.xml.parseXml(cell._lexcel);
			} catch(ex) {
				alert(ex.message);
			}
			var format = xmldom.getElementsByTagName("eformat")[0].firstChild.nodeValue;
			var textFormat = {
				'format': format,
				'type': 'lexcel'
			};	
			
			cellvalue = this.turnFormat(textFormat, cellvalue);
			if(textAlign === '' || textAlign===undefined){textAlign='2';}
	}
	
	
	if(/^\d+(\.\d+)?$/.test(cellvalue) && (cell._hag === '' || cell._hag===undefined)){textAlign='2';}//如果是数字则向右对齐
   
   
	if (this._designmode===undefined && cell._note !== 'none' && cell._note !== undefined) {//自定义单元脚本
        var xmldom = null;
		
        try {
            xmldom = T.xml.parseXml(cell._note);
        } catch(ex) {
            alert(ex.message);
        }
		
                var dname	    =	T.xml.gXmlPrototype(xmldom,"dname");
                var fieldname   =	T.xml.gXmlPrototype(xmldom,"fieldname");
				fieldname= fieldname.replace(/%101/g,'&');
                var table       =	T.xml.gXmlPrototype(xmldom,"table");
                var cmd		    =	parseInt(T.xml.gXmlPrototype(xmldom,"cmd"),10);
                var type	    =	parseInt(T.xml.gXmlPrototype(xmldom,"type"),10);
				var showcontent =	T.xml.gXmlPrototype(xmldom,"showcontent");
			  	var sumtype		=	T.xml.gXmlPrototype(xmldom,"sumtype");
				
				var insertflag  =   T.xml.gXmlPrototype(xmldom,"insertflag");
				var vname		=	T.xml.gXmlPrototype(xmldom,"vname");
				vname = vname.replace(/%101/g,'&');
				if(vname==='none')  vname=fieldname;
		
		if(sumtype!=='none' && type !==8){
			if(fieldname ==="纵向求和"){
				cellvalue="纵向[求和]";	
			}else{	
        		cellvalue = "求和[" +vname + "]";
			}
		}else if(type===5||type === 6||type === 7||type === 8){
			if(type === 5){//行头字段定义内容：
				cellvalue="R";	
			}else if(type === 6)//列头字段定义内容：
			{
        		cellvalue="C";
			}else if(type === 7)//交叉字段定义内容：
			{
				cellvalue="RC";	
			}else if(type === 8)//交叉字段定义内容：
			{
				cellvalue="G";	
			}
			cellvalue += "[" + vname + "]";
			
		}else{
			cellvalue = "[" + vname + "]";	
		}
		
	}	
	
	if(cell._tag!==undefined){
		if((cell._tag >> 11) & 0x01){//tag11位上下标
			if(cellvalue.indexOf("&scsup")!==-1)
			cellvalue= cellvalue.replace(/&scsup/g,'');	
			 
			if(cellvalue.indexOf("&scsub")!==-1)
			cellvalue= cellvalue.replace(/&scsub/g,'');	
			 
			cellvalue= cellvalue.replace(/&scend/g,'');	
		}
	}
	if(cell._lscript !==undefined && cell._lscript.indexOf('sf')!==-1){//单元格序号显示规则
		cellvalue=this.setCellRule(cell._lscript,x,y);
	}
	
    textlength = dc.measureText(cellvalue).width;
	var turnstring=function(str){
		var arr=[];
		var i=0;
		while(i<str.length){
			arr.push(str[i]);	
			i++;
		}
		return arr;	
	}
	dc.strokeStyle='#000000';
    if ((cell._fl>> 8) & 0x01) {//fl 8 自动换行
        //width=textlength+cell._horMargin;
		
        var textlist = String(cellvalue).split('\n');
        var i, temptext, textwidth, textheight;
        if (textAlign == "0" || textAlign == "2") {
            textwidth = width - horMargin;
        } else {
            textwidth = width;
        }
        textheight = 0;
        if (textwidth > 0) {

            for (i = 0; i < textlist.length && textheight < height; i++) {
                temptext = textlist[i];
                while (dc.measureText(temptext).width > textwidth && dc.measureText(temptext).width > 7) {
                    text = temptext.substring(0, textwidth / dc.measureText(temptext).width * temptext.length);
                    if (dc.measureText(text).width < 20) {
                        temptext = '';
						drawtextlist=turnstring(textlist[i]);
                        break;
                    }
                    if (text.length < 2) text.length = 2;
                    while ((dc.measureText(text).width + horMargin) > width) {
                        text = text.substring(0, text.length - 1);
                    }
                    textheight += textfontsize * 4 / 3;
                    temptext = temptext.substring(text.length, temptext.length);
                    
					drawtextlist.push(text);
                }
                drawtextlist.push(temptext);
                textheight += textfontsize * 4 / 3;
            }
			
            if (textverAlign == "0") {//居上
                if (textheight > height) {
                    texty = 0;
                } else {
                    texty = 0;//width;
                }
            } else if (textverAlign == "6") {//居中
                if (textheight > height) {
                    texty = 0;
                } else {
                    texty = (height - textheight) / 2;
                }
            } else if (textverAlign == "8") {//居下
                if (textheight + horMargin > height) {
                    texty = 0;
                } else {
                    texty = height - textheight - horMargin;
                }
            } else {
                if (textheight > height) {
                    texty = 0;
                } else {
                    texty = 0;//单列显示的文字竖排(height - textheight) / 2
                }
            }
			
            texty += textfontsize/2+2;
           
		    for (i = 0; i < drawtextlist.length && texty < height; i++) {
                if (textAlign == "0") {//0 居左
                    textx = horMargin;
					if (is_radiobutton === true) {
						config.x = x +textx;
						config.y = y + (height - 12) / 2;
						dc.lineWidth=1;
						dc.strokeRect(x +textx, y + (height - 12) / 2, 12, 12);
						if (config !== cell._controlsItem) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
						textx += 14;
					}
				} else if (textAlign == "6") {//6居中
                    textx = (width - dc.measureText(drawtextlist[i]).width) / 2;
					
					if (is_radiobutton === true) {
						config.x = x +textx -7;
						config.y = y + (height - 12) / 2;
						dc.lineWidth=1;
						dc.strokeRect(x +textx -7, y + (height - 12) / 2, 12, 12);
						if (config !== cell._controlsItem) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
						textx += 7;
					}
			    } else if (textAlign == "2") {
                    textx = (width - dc.measureText(drawtextlist[i]).width)- horMargin;
					
					if (is_radiobutton === true) {
						config.x = x +textx -14;
						dc.lineWidth=1;
						dc.strokeRect(x +textx -14, y + (height - 12) / 2, 12, 12);
						if (config !== cell._controlsItem) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
						//textx += 7;
					}else if(is_dropdownbox === true) {

						textx =  x + width - horMargin - textlength-20;
					}
			    } else {
                    textx = 0;
                }
				if (cell._note !== 'none') {
					/*遮罩区域*/
					dc.save();	
					dc.beginPath();
					dc.strokeStyle = "transparent";
					dc.rect(x,y,width,height);
					dc.clip();
					dc.stroke(); 
					dc.closePath();
					dc.fillText(drawtextlist[i], x + textx, y + texty+horMargin);
		
					dc.restore();
					/*遮罩区域*/	
				}else{
               		 dc.fillText(drawtextlist[i], x + textx, y + texty+horMargin);
				}
				if(cell._ftid!==undefined){
                	if (this._ftlist[cell._ftid].uline!==undefined) {
						dc.beginPath();
						dc.moveTo(x + textx, y + texty + 2);
						dc.lineTo(x + textx + dc.measureText(drawtextlist[i]).width, y + texty + 2);
						dc.stroke();
                	}
				}
                texty += textfontsize * 4 / 3;
            }
        }
    } else {
        var textstrings = 0;

        if (textAlign == "0") {//居左
            textx = x + horMargin;
            width = width - horMargin;
            textstrings = Math.ceil(width / dc.measureText(cellvalue).width * cellvalue.length);

            if (is_radiobutton === true) {
                config.x = textx;
                dc.lineWidth=1;
				dc.strokeRect(textx, y + (height - 12) / 2, 12, 12);
                if (config !== cell._cellcheck) this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'cellcheck', config);
                textx += 14;
            }

        } else if (textAlign == "6") {//居中
            //if (dc.measureText(cellvalue).width > width) {
               // textx = x;
           // } else {
                textx = x + (width - textlength) / 2;
           // }           
			
			textstrings = Math.ceil((1 + width / dc.measureText(cellvalue).width) * cellvalue.length / 2);

			if (is_radiobutton === true) {
				config.x = textx-7;
				config.y=y + (height - 12) / 2;
				
				this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);
				dc.lineWidth=0;
				dc.strokeRect(textx-7, y + (height - 12) / 2, 12, 12);

				textx = textx + 7;

			}else if(is_dropdownbox === true) {

				textx = x + (width - textlength) / 2-10;
			}

        } else if (textAlign == "2") {//居右
            //if (dc.measureText(cellvalue).width > width) {
              //  textx = x + width -horMargin- textlength;
            //} else {
                textx = x + width - horMargin - textlength;
            //}
            if (is_radiobutton=== true) {
                if (dc.measureText(cellvalue).width + 12 > width) {
                    textx = x - 12;
                } else {
                    textx = x + width - horMargin - textlength - 12;
                }
                config.x = textx;
                dc.lineWidth=1;
				dc.strokeRect(textx, y + (height - 12) / 2, 12, 12);
                this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);

                textx = textx + 14;
            }else if(is_dropdownbox === true) {

				textx =  x + width - horMargin - textlength-20;
			}

            textstrings = cellvalue.length;
        } else {
            textx = x;
            if (is_radiobutton === true) {
                if (dc.measureText(cellvalue).width + 12 > width) {
                    textx = x - 12;
                } else {
                    textx = x + width - horMargin - textlength - 12;
                }
                config.x = textx;
                dc.lineWidth=1;
				dc.strokeRect(textx, y + (height - 12) / 2, 12, 12);
                this.setCellProperty(this.getRowByDisToTop(y).row, this.getColByDisToLeft(x).col, 'controlsItem', config);

                textx = textx + 14;
            }
        }
		
        if(textverAlign == "0")//top 
        {
            texty = y + textfontsize+verMargin;   
        }
        else if(textverAlign == "6")//midle
        {
            texty = y + (height + textfontsize)/2;
        }
        else if(textverAlign == "8")//bottom
        {
            texty = y + height-verMargin;
        }
		
		var pos=this.getRowColByCoor(x,y);
		if (textAlign == "2") {//居右
			var nextcell=this._cells[pos.row+1][pos.col];
		}else{
			var nextcell=this._cells[pos.row+1][pos.col+2];
		}
		if( (nextcell!==undefined && !T.isEmptyObject(nextcell)) || cell._rows !== undefined ){
			textwidth= 'cutdown';
		}
		
	    if (textwidth== 'cutdown') {
			/*遮罩区域*/
			dc.save();	
			dc.beginPath();
			dc.strokeStyle = "transparent";
			dc.rect(x,y,width,height);
			dc.clip();
			dc.stroke(); 
			dc.closePath();
			
			dc.fillText(cellvalue, textx, texty);
			dc.restore();
			/*遮罩区域*/	
			//var text = String(cellvalue).substr(0, textstrings);
           
			//dc.fillText(text, textx, texty);
       
	    } else if(is_dropdownbox===true){
				
			/*遮罩区域*/
			dc.save();	
			dc.beginPath();
			dc.strokeStyle = "transparent";
			dc.rect(x,y,width-20,height);
			dc.clip();
			dc.stroke(); 
			dc.closePath();
			dc.fillText( cellvalue, textx, texty);

			dc.restore();
			/*遮罩区域*/	
		}else {
			
			if((cell._tag >> 11) & 0x01){//上下标
				var num=0;
				var cutwidth=dc.measureText("A").width;
            	for(var i=0;i<oldvalue.length;i++){
					
					if(oldvalue.substr(i,6)==='&scsup'){
						dc.save();	
						dc.font="5px sans-serif";
						
						dc.fillText(oldvalue.substr(i+6,1), textx+num*cutwidth, texty-8);
						dc.restore();
						i=i+12;
					}else if(oldvalue.substr(i,6)==='&scsub'){
						dc.save();	
						dc.font="5px sans-serif";
						
						dc.fillText(oldvalue.substr(i+6,1), textx+num*cutwidth, texty);
						dc.restore();
						i=i+12;
					}else{
						dc.fillText(oldvalue[i], textx+num*cutwidth-4, texty);	
					}	
					num++;
				}
			}else{
				if (cell._note !== 'none') {
					/*遮罩区域*/
					dc.save();	
					dc.beginPath();
					dc.strokeStyle = "transparent";
					dc.rect(x,y,width,height);
					dc.clip();
					dc.stroke(); 
					dc.closePath();
					dc.fillStyle="#80";
					dc.fillText(cellvalue, textx, texty);
		
					dc.restore();
					/*遮罩区域*/	
				}else{
					
					dc.fillText(cellvalue, textx, texty);	
				}
			}
        }
        if (cell.getuline(ftlist)) {//下划线
            dc.beginPath();
            dc.moveTo(textx, texty + 2);
            dc.lineTo(textx + dc.measureText(cellvalue).width, texty + 2);
            dc.stroke();
        }

    }
}
DataGrid.prototype.paintCellImage = function(dc, cell, x, y, width, height, img, image) {
    var imgwidth = 0,
    imgheight = 0,
    imgy = 0,
    imgx = 0,
	textAlign=cell._hag || this._hag,
	textverAlign=cell._vag || this._vag;
    if (img.size == 'cell') //单元格大小
    {
        imgwidth = width;
        imgheight = height;
        imgy = y;
        imgx = x;
        dc.drawImage(image, imgx, imgy, imgwidth, imgheight);

    } else if (img.size == "origin") { //原始尺寸
        imgy = y;
        imgx = x;
        imgwidth = width;
        imgheight = height;
        if (imgwidth > img.width) imgwidth = img.width;
        if (imgheight > img.height) {
            imgheight = img.height;
            y = y + (height - imgheight) / 2;
        }

        dc.save();
        if (textAlign == "6") {//居中
            dc.translate((width - imgwidth) / 2, 0);
		}else if (textAlign == "0") {//居左
            dc.translate(1, 0);
        } else if (textAlign == "2") {//居右
            dc.translate(width - imgwidth, 0);
        }
        if(textverAlign == "0")//top 
        {
            dc.translate(0, -(height - imgheight) / 2);
        }
        else if(textverAlign == "6")//midle
        {
            //dc.translate((width - imgwidth) / 2, 0);
        }
        else if(textverAlign == "8")//bottom
        {
            dc.translate(0, (height - imgheight) / 2);
        }

		dc.drawImage(image, 0, 0, imgwidth, imgheight, x, y, imgwidth, imgheight);
        dc.restore(); //取消遮罩		

    } else if (img.size == "imgsize") { //按照图片比例缩放显示
      if (width / height > img.width / img.height) {
            imgwidth = (height / img.height) * img.width;
            imgheight = height;
            if (imgwidth > width) {
                imgwidth = width;
                imgheight = (imgwidth / img.width) * img.height;
            }

            imgy = y;
            imgx = x;

        } else if (width / height == img.width / img.height) {
            imgwidth = width;
            imgheight = height;
            imgy = y;
            imgx = x;
        } else if (width / height < img.width / img.height) {

            imgheight = (width / img.width) * img.height;
            imgwidth = (imgheight / img.height) * img.width;
            imgy = y + (height - imgheight) / 2;
            imgx = x;
            if (imgwidth > width) imgwidth = width;
            if (imgheight > height) imgheight = height;
        }
		dc.save();
        if (textAlign == "6") {//居中
            dc.translate((width - imgwidth) / 2, 0);
		}else if (textAlign == "0") {//居左
            dc.translate(1, 0);
        } else if (textAlign == "2") {//居右
            dc.translate(width - imgwidth, 0);
        }
		
        if(textverAlign == "0")//top 
        {
            dc.translate(0, -(height - imgheight) / 2);
        }
        else if(textverAlign == "6")//midle
        {
            //dc.translate((width - imgwidth) / 2, 0);
        }
        else if(textverAlign == "8")//bottom
        {
            dc.translate(0, (height - imgheight) / 2);
        }
        dc.drawImage(image, imgx, imgy, imgwidth, imgheight);
		dc.restore();		
    }
}

DataGrid.prototype.paintNoteTag = function(dc, cell, x, y, width, height)
{
	dc.save();
	dc.fillStyle='#FF0000';
	dc.beginPath();
	dc.moveTo(x+width-8,y);
	dc.lineTo(x+width,y+8);
	dc.lineTo(x+width,y);
    dc.fill();
    dc.closePath();
    dc.restore();
}
DataGrid.prototype.paintCells = function() {
    var x, y;
    var i, j, m;
    var cellsize, compos, cellpos;
    var row, col, cell, temprow, tempcol, tempwidth;
    compos = this.getCanvasXY();
    dc = this.getDc();
    for (i = this._scrollRowNum, y = this._offsetY; y < this.getHeight() && i < this._rows.length; i++) {

        row = new DataRow(this._rows[i]);
        if (row.getVisible()) {
            for (x = this._offsetX, j = this._scrollColNum; j < this._cols.length && x < this.getWidth(); j++) {
                col = new DataCol(this._cols[j]);
                if (col.getVisible()) {
					
                    cell = new DataCell(this._cells[i][j]);
                    cellsize = this.getCellSize(i, j);
					  
                    if (cell.ifPaint()) {
                        width = 0;
                        height = 0;
                        if (cell.getColspan() > 0 && cell.getRowspan() > 0) {//该单元格为合并 或者正常
                        	  if (cellsize.width > 0 && cellsize.height > 0) {
                                if (cell.getCombineStyle() == "combine") { //该单元格为合并
                                    dc.fillStyle = "#fff";
                                    dc.fillRect(x + 1, y + 1, cellsize.width - 2, cellsize.height - 2);
										var nextcell=this._cells[i][j+1];
//										if(nextcell!==undefined &&nextcell.col !== undefined){
//												dc.save();		
//												/*遮罩区域*/
//												dc.beginPath();
//												dc.strokeStyle = "transparent";
//												dc.rect(x,y,cellsize.width, cellsize.height);
//												dc.clip();
//												dc.stroke(); 
//												dc.closePath();
//												/*遮罩区域*/	
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//												dc.restore();
//											}else{
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);	
//											}
										//}else{
											
										  if(row.getColor()!==false){
												
												dc.fillStyle =row.getColor();
												dc.fillRect(x,y,cellsize.width, cellsize.height);
										   }
	                                       this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
										
										//}

                                } else { //改单元格非合并单元格
                                    //
                                  //  if (cell.ifPaint()) { //单元格无内容不描绘,前一个有内容不描绘
                                       // dc.fillStyle = "#fff";
                                       // dc.fillRect(x + 1, y + 1, cellsize.width - 2, cellsize.height - 2);
										//var nextcell=this._cells[i][j+1];
//										if(dc.measureText(cell._value).width>cellsize.width){
//										
//										if(nextcell!==undefined && nextcell.col !== undefined){
//												dc.save();		
//												/*遮罩区域*/
//												//dc.setTransform(1, 0, 0, 1, 0, 0);
//												dc.beginPath();
//												dc.strokeStyle = "transparent";
//												dc.rect(x,y,cellsize.width, cellsize.height);
//												dc.clip();
//												dc.stroke(); 
//												dc.closePath();
//												/*遮罩区域*/	
//												
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//												dc.restore();
//											}else{
//												this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);	
//											}
										//}else{
											if(row.getColor()!==false){
												
												dc.fillStyle =row.getColor();
												dc.fillRect(x,y,cellsize.width, cellsize.height);
											}
											
	                                       this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
										//
										//}

                                   // }
                                }
                           	  }
                        } else {//cell.getColspan() < 0 合并单元格的其他单元格
                            temprow = 0 - cell.getRowspan();
                            tempcol = 0 - cell.getColspan();
                            if (temprow < this._scrollRowNum || tempcol < this._scrollColNum) {
                                if ((i == this._scrollRowNum && j == this._scrollColNum) || (i == this._scrollRowNum && j == tempcol) || (j == this._scrollColNum && i == temprow)) {
                                    cell = new DataCell(this._cells[temprow][tempcol]);
                                    cellpos = this.getCellLeftTopCoor(temprow, tempcol);
                                    cellsize = this.getCellSize(temprow, tempcol);
                                    dc.fillStyle = "#fff";
                                    dc.fillRect(cellpos.x + 1, cellpos.y + 1, cellsize.width - 2, cellsize.height - 2);
                                    this.paintCellContent(dc, cell, cellpos.x, cellpos.y, cellsize.width, cellsize.height);
                                }
                            }
                        }
                    } else {
//                        if (cell.getBorderLine() != "none") {
//                            this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//                        } else {
//                           // if (cell._backColor != "" && cell._value != '' && cell._cellImage != 'none') { //单元格无内容不描绘
//                                dc.fillStyle = "#fff";
//                                dc.fillRect(x + 1, y + 1, cellsize.width - 2, cellsize.height - 2);
//								 this.paintCellContent(dc, cell, x, y, cellsize.width, cellsize.height);
//                           // }
//
//                        }
						//dc.fillStyle = "#fff";
						//dc.fillRect(x+1,y+1,cellsize.width-2,cellsize.height-2);

                    }
                    x += col.getWidth();
                }
            }
            y += row.getHeight();
        }
    }
    rightimagedata = null;
    bottomimagedata = null;
    this.releaseDc(dc);
}

DataGrid.prototype.paintSelCells = function() {
    dc = this.getDc();
    var compos = this.getCanvasXY();
    var selColor, selAlpha;
    /*绘制选中的遮罩*/
    var startcoor = this.getCellLeftTopCoor(this._sel_startRow, this._sel_startCol);
    var selsize = this.getRectSize(this._sel_startRow, this._sel_startCol, this._sel_endRow, this._sel_endCol);
	dc.save();
    if ((this._tagvalue>> 16) & 0x01) {
        dc.globalAlpha =0.5;
        dc.fillStyle = T.color.getcolorFromByte(this._selbkcolor) || '#D2E0FF';
        dc.fillRect(startcoor.x, startcoor.y, selsize.width, selsize.height);
    } else {
        if (startcoor.x + selsize.width > this._offsetX && startcoor.y + selsize.height > this._offsetY) {
            dc.globalAlpha = 0.2;
            dc.fillStyle = "#00f";
            dc.fillRect(startcoor.x, startcoor.y, selsize.width, selsize.height);
            /*绘制焦点单元格*/
            dc.globalAlpha = selAlpha || 1;
            var focuscoor = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
            var focusize = this.getCellSize(this._focusRow, this._focusCol);
            var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
			
            if (focuscoor.x + focusize.width > 40 && focuscoor.y + focusize.height > 20) {
                dc.fillStyle = "#fff";

                dc.fillRect(focuscoor.x + 1, focuscoor.y + 1, focusize.width - 2, focusize.height - 2);
                this.paintCellContent(dc, cell, focuscoor.x, focuscoor.y, focusize.width, focusize.height);
            }
            /*绘制线框*/
            dc.strokeStyle = "#000000";
            dc.lineWidth = 3;
            dc.beginPath();
            dc.moveTo(startcoor.x, startcoor.y);
            dc.lineTo(startcoor.x + selsize.width, startcoor.y);
            dc.lineTo(startcoor.x + selsize.width, startcoor.y + selsize.height);
            dc.lineTo(startcoor.x, startcoor.y + selsize.height);
            dc.closePath();
            dc.stroke();
        }
    }
	dc.restore();
    this.releaseDc(dc);
}

DataGrid.prototype.paintBackimage = function(dc, img, image) {
    var compos = this.getCanvasXY();
    var x = this._offsetX;
    var y = this._offsetY;
    var posx = 0,
    posy = 0,
    sx = 0,
    sy = 0,
    sw = 0,
    sh = 0,
    dw = 0,
    dh = 0;
	
    if (img.size && img.size === "origin") {
        sw = img.width;
        sh = img.height;
        dw = img.width;
        dh = img.height;

        if (this._scrollColNum !== 0) {

            posx = this.getScrollLeft();

            sx = posx;

            sw = img.width - posx;

            dw = img.width - posx;

        }
        if (this._scrollRowNum !== 0) {

            posy = this.getScrollTop();

            sy = posy;

            sh = img.height - posy;

            dh = img.height - posy;

        }
        if (this._scrollColNum === 0 && this._scrollRowNum === 0) {
            //image.onload = function()
            //{		
            dc.drawImage(image, x, y, img.width, img.height);

            //}
        } else {
            dc.drawImage(image, sx, sy, sw, sh, x, y, dw, dh);
        }
    } else if (img.size && img.size === "canvas") {
		var size = this.getRectSize(0,0,this._rows.length,this._cols.length);
        sw = img.width;
        sh = img.height;
        dw = size.width;
        dh = size.height;

        if (this._scrollColNum !== 0) {

            posx = this.getScrollLeft();

            sx = img.width * (posx / dw);

            sw = img.width - img.width * (posx / dw);

            dw = dw - posx;

        }
        if (this._scrollRowNum !== 0) {

            posy = this.getScrollTop();

            sy = img.height * (posy /dh);

            sh = img.height - img.height * (posy / dh);

            dh = dh - posy;

        }

        if (this._scrollColNum === 0 && this._scrollRowNum === 0) {
			
            dc.drawImage(image, x, y, dw, dh);
        } else {
            dc.drawImage(image, sx, sy, sw, sh, x, y, dw, dh);
        }

    }
}
DataGrid.prototype.paint = function() {
    var compos = this.getCanvasXY();
    var dc = this.getDc();
    var imageRight = dc.getImageData(compos.x + this.getWidth(), 0, glGetWidth() - compos.x - this.getWidth(), glGetHeight());
    var imageBottom = dc.getImageData(0, compos.y + this.getHeight(), glGetWidth(), glGetHeight() - compos.y - this.getHeight());
    this.releaseDc(dc);

	//this.paintRowColor();//背景奇偶颜色调色器
    this.paintNetLine();
	
    dc = this.getDc();
    var imageLeft = dc.getImageData(0, 0, compos.x + this._offsetX, glGetHeight());
    var imageTop = dc.getImageData(0, 0, glGetWidth(), compos.y + this._offsetY);
    this.releaseDc(dc);
    this.paintCells();
    if (this.getMousecursor().indexOf('paintborder') == -1 && this._cols.length !== 0) {
		
		this.paintSelCells();
	}
    /*绘制选中框*/

    dc = this.getDc();
    dc.putImageData(imageLeft, 0, 0);
    dc.putImageData(imageTop, 0, 0);
    this.releaseDc(dc);
    if (this.isShowHeader()) this.paintHeader();
    dc = this.getDc();
    dc.putImageData(imageRight, compos.x + this.getWidth(), 0);
    dc.putImageData(imageBottom, 0, compos.y + this.getHeight());
	this.releaseDc(dc);
	this.paintBbname(dc);    
}
DataGrid.prototype.paintBbname = function(dc) {
	dc.font = "12px 宋体";
    dc.fillStyle = "#000";
	//dc.fillRect(0,_gl_canvas.height-20,_gl_canvas.width-21,100);
    dc.strokeRect(0, 0, Math.floor(this.getWidth()), Math.floor(this.getHeight()));
	dc.clearRect(10,_gl_canvas.height-20,_gl_canvas.width-421,20);
	
	dc.fillText('当前工作报表：'+(_gl_filename || ''), 10, 547);
		
}
DataGrid.prototype.clear = function() {
    dc = this.getDc();
    var compos = this.getCanvasXY();
    dc.fillStyle = "#fff";
    dc.fillRect(0, 0, this.getWidth(), this.getHeight());
    this.releaseDc(dc);
}
DataGrid.prototype.getCellvaluewidth = function(cell) { //获得单元格内一串字符串的长度
    var fontstr = '';
    if (cell._fontItalic) {
        fontstr += "italic ";
    }
    if (cell._fontBold) {
        fontstr += "bold ";
    }
    dc.font =fontstr + cell._fontSize + "px " + cell._fontFamily;// this.getdcfont(cell.getFtid());
    dc.fillStyle ="#000";
   
   // cell._value = this.turnFormat(cell._textFormat, cell._value);
    return dc.measureText(cell.getValue()).width;

}
DataGrid.prototype.dblclick = function(e) {
	if(_gl_filename === undefined){
		return ;
	}
	if(this._designmode===undefined){//计算模式
		if(!!this.getCellProperty(this._focusRow, this._focusCol, 'note')){
			return;	
		}
	}
	clearCeng('showbox');
    var pagepos = glGetMousePageXY(e);
    var canpos = glGetMouseCanvasXY(e);
    var compos = this.getCanvasXY();
    var ctrx = canpos.x - compos.x;
    var ctry = canpos.y - compos.y;
    var dc = this.getDc();
    var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
    var cellpos = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
    this._dblclick = true;
   // textlength = this.getCellvaluewidth(cell);
   console.log(cell);
 	if(cell._fl && ((cell._fl >> 0) & 0x01) === 0){//单元保护
		alert('单元保护');
		return false;
	}

   
    var textAlign=cell._hag || this._hag,horMargin = cell._lspan || 5;//内左边距;
    var textlength = Math.ceil(dc.measureText(cell._t).width);
	textlength = this.getCellvaluewidth(cell);
    if (textAlign == "0") {
        textx = textlength + horMargin;
    } else if (textAlign== "6") {
        if (dc.measureText(cell._t).width > width) {
            textx = textlength;
        } else {
            textx = textlength + (width - textlength) / 2;
        }
    } else if (textAlign == "2") {
        if (dc.measureText(cell._t).width > width) {
            textx = textlength;
        } else {
            textx = textlength + width - horMargin - textlength;
        }
    } else {
        textx = textlength;
    }

    if (textx < cellsize.width) {
        textx = cellsize.width;
    }

			dc.fillStyle = "#fff";
			dc.fillRect(cellpos.x, cellpos.y, textx, cellsize.height);
			dc.fillStyle = "#000";
			dc.strokeRect(cellpos.x, cellpos.y, textx, cellsize.height);
			/*绘制线框*/
			this._editBox.style.left = pagepos.x - (ctrx - cellpos.x) + "px";
			this._editBox.style.top = pagepos.y - (ctry - cellpos.y) + "px";
			this._editBox.style.width = textx +"px"; //cellsize.width + "px";
			this._editBox.style.fontsize = "12px";
			//this._editBox.width = 1000 +"px"; //cellsize.width + "px";
			this._editBox.style.display = "block";
			this._editBox.focus();
			this.releaseDc(dc);
}
DataGrid.prototype.showhtmlCell=function(ctrx,ctry,html){
	  clearCeng("htmlcell");
	  if(!html)return false;
	  var html=html.replace(/size="?10pt"?/g,'');
	  var left = (document.body.clientWidth - _gl_canvas.width) / 2 + document.body.scrollLeft;
	  var top=document.getElementById("canvas").offsetTop;
	  var startcoor = this.getCellLeftTopCoor(this._sel_startRow,this._sel_startCol);
	  var box = document.createElement("div");
	  
	  box.className='hint';
	  box.style.border='0px';
	  box.id = 'htmlcell';
	  box.style.width="240px";
	  box.style.zIndex="80";
	  box.style.position = 'absolute';
	  box.style.backgroundColor="transparent";
	  box.style.left =left+ctrx + 'px';
	  box.innerHTML =html;
	  document.body.insertBefore(box, document.getElementById("mainleft"));
	  var boxheight=document.getElementById("htmlcell").offsetHeight;
	  box.style.top =top+ctry+ 'px';
}
DataGrid.prototype.showTip=function(ctrx,ctry,html,upu){
	if (!document.getElementById("showbox")) {
		  this._editBox.style.display='none';
		  var left = (document.body.clientWidth - _gl_canvas.width) / 2 + document.body.scrollLeft;
		  var top=document.getElementById("canvas").offsetTop;
		  var startcoor = this.getCellLeftTopCoor(this._sel_startRow,this._sel_startCol);
		  var cellsize = this.getCellSize(this._sel_startRow,this._sel_startCol);
		  var box = document.createElement("div");
		  
		  box.className='hint';
		  box.id = 'showbox';
		  box.style.width="240px";
		  box.style.zIndex="80";
		  box.style.position = 'absolute';
		  box.style.backgroundColor="#FFC";
		  box.style.left =T.html.ex()+ 'px';
		 
		  
		  box.innerHTML ="<span>"+html+"</span><br><span class=\"hint-pointer\"></span>";
		  document.body.insertBefore(box, document.getElementById("mainleft"));
		  //box.onmouseout=function(){clearCeng("showbox");}
		  var boxheight=document.getElementById("showbox").offsetHeight;
		  box.style.top =startcoor.y+top+ cellsize.height+'px';
		 // _gl_mouseState.mousedownstate=false;
	}
}
DataGrid.prototype.mousedown = function(e) {
    clearCeng('myContextMenu');
    clearCeng('showbox');
	if(_gl_filename === undefined){
		return ;
	}
    var eve = e ? e: event;
    if (this._cols.length === 0 || this._rows.length === 0) return false;
	
    if (eve.button == 0 || eve.button == 1) {//ie 下左键为1
        var i, row, col;
        var x = this._offsetX,
        y = this._offsetY;
        var ctrpos = glGetMouseCanvasXY(e); //鼠标位置
        var compos = this.getCanvasXY();
        var ctrx = ctrpos.x - compos.x;
        var ctry = ctrpos.y - compos.y;
        if (ctrx < this._offsetX && ctry > this._offsetY) {
            for (i = this.getScrollRowNum(); i < this._rows.length && y < this._height; i++) {
                row = new DataRow(this._rows[i]);
                if (row.getVisible()) {
                    y += row.getHeight();
                }

                if (ctry > y - 3 && ctry < y + 1) {
                    this._handThing = "row";
                    this._resizeRow = i;
                    this._oldRowBottomY = y;
                    this._minRowBottomY = y - row.getHeight();
                    break;
                }else if(ctry >= y + 1 && ctry < y + 3){
					if(!row.getVisible()){
						this._handThing = "row";
						this._resizeRow = i;
						this._oldRowBottomY = y;
						this._minRowBottomY = y - row.getHeight();
						break;
					}	
				} else if (ctry >= (y - row.getHeight() + 3) && ctry <= (y - 3)) {
                    this._handThing = "rowcel";
                    this._sel_startRow = i;
                    this._sel_startCol = 0;
                    this._sel_endRow = i;
                    this._sel_endCol = this._cols.length - 1;
                    this._focusRow = i;
                    this._focusCol = this.getScrollColNum();
                    this.clear();
                    this.paint();
                    break;
                }
            }
        } else if (ctrx > this._offsetX && ctry < this._offsetY && this._selLineAll.on===false) {
            for (i = this.getScrollColNum(); i < this._cols.length && x < this._width; i++) {
                col = new DataCol(this._cols[i]);
                if (col.getVisible()) {
                    x += col.getWidth();
                }
                if (ctrx < x + 1 && ctrx > x - 3) {
                    this._handThing = "col";
                    this._resizeCol = i;
                    this._oldColRightX = x;
					this._oldColX = x;
                    this._minColRightX = x - col.getWidth();
                    break;
                }else if(ctrx >= x + 1 && ctrx < x + 3){
					if(!col.getVisible()){
						this._handThing = "col";
						this._resizeCol = i;
						this._oldColRightX = x;
						this._oldColX = x;
						this._minColRightX = x - col.getWidth();
					}	
				} else if (ctrx >= (x - col.getWidth() + 3) && ctrx <= (x - 3)) {
                    this._handThing = "colcel";
                    this._sel_startRow = 0;
                    this._sel_startCol = i;
                    this._sel_endRow = this._rows.length - 1;
                    this._sel_endCol = i;
                    this._focusRow = this.getScrollRowNum();
                    this._focusCol = i;
                    this.clear();
                    this.paint();
                    break;
                }
            }
        } else if (ctrx < this._offsetX && ctry < this._offsetY) {
            this._handThing = "allcel";
            this._sel_startRow = 0;
            this._sel_startCol = 0;
            this._sel_endRow = this._rows.length - 1;
            this._sel_endCol = this._cols.length - 1;
            this._focusRow = this.getScrollRowNum();
            this._focusCol = this.getScrollColNum();
            this.clear();
            this.paint();
        } else if (ctrx > this._offsetX && ctry > this._offsetY) {
			
            this._handThing = "cel";
            var focuscell = this.getRowColByCoor(ctrx, ctry);
            this._sel_startRow = focuscell.row;
            this._sel_startCol = focuscell.col;
            this._sel_endRow = focuscell.row;
            this._sel_endCol = focuscell.col;
            this._focusRow = focuscell.row;
            this._focusCol = focuscell.col;

            var cell;
            cell = this.findCombineCellsAroundSelCells();
            if (cell != null) {
                if (cell.startrow < this._sel_startRow) {
                    this._sel_startRow = cell.startrow;
                }
                if (cell.startcol < this._sel_startCol) {
                    this._sel_startCol = cell.startcol;
                }
                if (cell.endrow > this._sel_endRow) {
                    this._sel_endRow = cell.endrow;
                }
                if (cell.endcol > this._sel_endCol) {
                    this._sel_endCol = cell.endcol;
                }
            }
			
            var selCell = this._cells[this._focusRow][this._focusCol];
            if (selCell.fontSize !== undefined) {
                var options = document.getElementById("fontsize").options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == selCell.fontSize) {
                        document.getElementById("fontsize").options[i].selected = true;
                        break;
                    }
                }
            } else {
				try{
                	document.getElementById("fontsize").options[0].selected = true;
				}catch(err){
				}
				
            }
			
            if (selCell.fontFamily !== undefined) {
                var options = document.getElementById("font_family").options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == selCell.fontFamily) {
                        document.getElementById("font_family").options[i].selected = true;
                        break;
                    }
                }
            } else {
                document.getElementById("font_family").options[0].selected = true;
            }
			
			var startcoor = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
			if ((selCell.fl >> 11) & 0x01) {//超级链接
				
				var url = selCell.cellurl.url;
				if (/^((.+):\/\/)[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc(:s[0-9]{1-4})?/.test(url)) {
					if (/(https|http|ftp|file)/.test(RegExp.$2)) {
						if(selCell.cellurl.newwin===true){
							
							window.location.href= url;
						}else{
							window.open(url, "_blank");	
						}
					}
				} else if (/^(mailto)/.test(url)) {
					location.href = 'mailTo:123u@163.com';
				}
			
			} 
			if (this.getCellProperty(this._focusRow, this._focusCol, 'cellcheck')) {
				var dropdownbox=selCell.cellcheck;
                
                if (selCell.cellcheck.x !== undefined) {//radiobutton单选框
                    var dropx = dropdownbox.x,
                    dropy = dropdownbox.y;
					
					
                    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
					var cellCoor = this.getCellLeftTopCoor(this._focusRow, this._focusCol);
					var textAlign=selCell.hag || this._hag;
					if (textAlign == "0") {//居左
						if (ctrx < cellCoor.x+17 && ctrx > cellCoor.x+5 && ctry < cellCoor.y+cellsize.height/2+18 && ctry >cellCoor.y+ (cellsize.height-12)/2) 
						{
							this.paintCellControlsRadiobuttonHook(dropx, dropy);
							
						}
					} else if (textAlign == "6") {//居中
						if (ctrx < cellCoor.x+12+(cellsize.width-12)/2  && ctrx > cellCoor.x+(cellsize.width-12)/2 && ctry < cellCoor.y+cellsize.height/2+18 && ctry >cellCoor.y+ (cellsize.height-12)/2) 
						{
							this.paintCellControlsRadiobuttonHook(dropx, dropy);
							
						}
					} else if (textAlign == "2") {//居右
						if (ctrx < cellCoor.x+cellsize.width-5  && ctrx > cellsize.width-17 && ctry < cellCoor.y+cellsize.height/2+18 && ctry >cellCoor.y+ (cellsize.height-12)/2) 
						{
							this.paintCellControlsRadiobuttonHook(dropx, dropy);
							
						}
					}
					

                }
			}
			
			if ((selCell.fl >> 12) & 0x01) { //下拉框

                    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
					if(parseInt(selCell.cols,10)<0){//合并单元格的次要单元格
						cellsize = this.getCellSize(this._focusRow, -parseInt(selCell.cols,10)-1);	
						startcoor = this.getCellLeftTopCoor(this._focusRow, -parseInt(selCell.cols,10)-1);
						this._focusCol=-parseInt(selCell.cols,10)-1;
					}
                    if (ctrx < startcoor.x + cellsize.width - 2 & ctrx > startcoor.x + cellsize.width - 22 && ctry < startcoor.y + cellsize.height && ctry > startcoor.y) {
                       if (!document.getElementById("showbox")) {
                            this.paintCellControlsDropdownbox(selCell.clco, startcoor.x, startcoor.y, cellsize.width,this._focusRow,this._focusCol);
                        } else {
                            clearCeng("showbox");
                        }
                    }

             }
			
            if (this._designmode===undefined && this.getCellProperty(this._focusRow, this._focusCol, 'note')) {//自定义脚本
			    var xmldom = null;
                try {
                    xmldom = T.xml.parseXml(selCell.note);
                } catch(ex) {
                    alert(ex.message);
                }
				
                var dname	    =	T.xml.gXmlPrototype(xmldom,"dname");
                var fieldname   =	T.xml.gXmlPrototype(xmldom,"fieldname");
				fieldname = fieldname.replace(/%101/g,'&');
                var table       =	T.xml.gXmlPrototype(xmldom,"table");
                var cmd		    =	parseInt(T.xml.gXmlPrototype(xmldom,"cmd"),10);
                var type	    =	parseInt(T.xml.gXmlPrototype(xmldom,"type"),10);
				var showcontent =	T.xml.gXmlPrototype(xmldom,"showcontent");
			  	var sumtype		=	T.xml.gXmlPrototype(xmldom,"sumtype");
				var vname		=	T.xml.gXmlPrototype(xmldom,"vname");
				vname=vname.replace(/%101/g,'&');
				var insertflag  =   T.xml.gXmlPrototype(xmldom,"insertflag");
				
				
				var zdshuoming  =	"从表字段名称";
				
				if(vname==='none')vname=fieldname;
				var fztype=["细节","小计中","小计","总计中"];
			    if(cmd === 2 ){
					if(type === 1){
						zdshuoming="主表字段名称";		
					}else if(type === 1){
						zdshuoming="从表字段名称";	
					}
				}else if( cmd ===0 ){
					if(type === 2 ){
						zdshuoming="分组细节字段名称";
							
					}else if(  type === 3){
						
						zdshuoming="分组小计字段名称";
							
					}else if(  type === 4){
						
						zdshuoming="分组合计字段名称";
							
					}else if( type === 1){
						
						zdshuoming="分组头字段名称";
						
					}
				}else if( cmd ===5 ){
					if(type === 5 ){
						zdshuoming="行头字段";
							
					}else if(type === 6){
						
						zdshuoming="列头字段";	
					}else if(type === 7){
						
						zdshuoming="交叉区域字段";
							
					}else if( type === 3 && fieldname==="纵向求和"){
						zdshuoming="纵向求和字段名称";
					}else if(type=== 3 &&  fieldname==="横向求和"){
						zdshuoming="横向求和字段名称";
					}
				}else if(cmd === 4){
					if(type === 1){
						zdshuoming="分组头字段名称";	
					}else if(type === 5){
						zdshuoming="行头字段";	
					}else if(type===6){
						zdshuoming="列头字段";	
					}else if(type ===7){
						zdshuoming="交叉区域字段";	
					}else if(type === 3&& fieldname==="纵向求和" ){
						zdshuoming="纵向求和字段定义";	
					}else if(type === 3&& fieldname==="横向求和" ){
						zdshuoming="横向求和字段定义";	
					}
				}
				
				var li3=zdshuoming +"：" + vname;
				
				if(sumtype!=='none' && fieldname!=="纵向求和" && fieldname!=="横向求和"){
					li3=	fztype[type-1]+"对字段["+vname+"]求和";
				}else if(fieldname==="纵向求和" ){
					li3= 	"对字段纵向[求和]";	
				}else if( fieldname==="横向求和"){
					li3=	"对字段["+vname+"]横向求和";	
				}
				if(sumtype!=='none' && type===8){
					li3=	"按字段["+vname+"]分组小计求和";	
				}
				
				var setcmd = {
                    "2": "主从报表",
                    "6": "普通报表",
                    "5": "交叉报表",
                    "0": "分组报表",
                    "4": "分组交叉报表"
                };
				var html="<li>报表字段定义1</li><li class=\"ContextLine\"></li><li>报表类型:" + setcmd[cmd] + "</li>";
				html+=dname!=='none'?"<li>数据源名：" + dname + "</li>":'';
				html+="<li>"+ li3 +"</li>";
				html+=table!=="none"?"<li>表名：" + table+"</li>":'';
				this._cells[this._focusRow][this._focusCol].showTipFlag=true;
				this.showTip(ctrx,ctry,html,156);
				
            }else if (this.getCellProperty(this._focusRow, this._focusCol, 'tip')) {
				this._cells[this._focusRow][this._focusCol].showTipFlag=true;
				this.showTip(ctrx,ctry,selCell.tip,180);
				preventDefault(eve);
            }

            if ((this._tagvalue>>16)& 0x01) //设置光标整行选中
            {
                this._sel_startCol = 0;
                this._sel_endCol = this._cols.length - 1;
            }
            this.clear();
            this.paint();
			if(is_mobile){//为手机
				_moblie+=1;
				if(_moblie === 2 && tempcell.row ===this._focusRow && tempcell.col===this._focusCol ){
					preventDefault(event);
					this.dblclick(eve);
					_moblie=0;
				}else if(_moblie === 2){
					_moblie=1;
					tempcell={row:this._focusRow,col:this._focusCol};
				}else{
					tempcell={row:this._focusRow,col:this._focusCol};	
				}
			}
        }
    }
    if (eve.button == 2) {
        var meinv = eve.srcElement ? eve.srcElement: eve.target;
        var menu = new ClickMenuItem(eve);
        var _this = this,focusRow = this._focusRow,focusCol = this._focusCol;
        this._handThing = 'none'; //右键时阻止框选单元格，在鼠标左键按下时触发
        var menuItem = [{
            'itemText': '显示表格线',
			'css':_this._showgrid===1 ||_this._showgrid===undefined? 'select': '',
            'ev': function() {
                _this.setNetChartVisible(!_this.getNetChartVisible());
                _this.clear();
                _this.paint();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '显示行列头',
			'css':  _this._showheader===1||_this._showheader===undefined ? 'select': '',
            'ev': function() {
                _this.setTableHead();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '插入',
            'ev': function(event) {},
            'child': [{
                'itemText': '活动单元下移',
                'ev': function() {
                    _this.insertCellBefore();

                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '活动单元右移',
                'ev': function() {
                    _this.insertCellAfter();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '在此列前方插入',
                'ev': function() {
                    //_this.insertCol(focusCol);
                    _this.insertColBefore();
                    clearCeng('myContextMenu');

                }
            },
            {
                'itemText': '在此列后方插入',
                'ev': function() {
                    _this.insertColAfter();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '在此行上方插入行',
                'ev': function() {
                    _this.insertRowBefore();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '在此行下方插入行',
                'ev': function() {
                    _this.insertRowAfter();
                    clearCeng('myContextMenu');
                }
            }]
        }];
        menu.addItem(menuItem);
        menu.addMenuTo('rightMouse');
        document.oncontextmenu = function(eve) {
            return false;
        }
    }
    if (this.getMousecursor().indexOf('paintborder') != -1) {
        this.usepaintBorderLines(ctrpos.x, ctrpos.y, this._focusRow, this._focusCol);
        //alert(this._sel_startCol);
        //this.
    }
}

DataGrid.prototype.mousemove = function(e) {
    var eve = e ? e: event;
    if (eve.button == 0 && !((this._tagvalue>>16)& 0x01)) {
        var i, x = this._offsetX,
        y = this._offsetY;
        var ctrpos = glGetMouseCanvasXY(e);
        var compos = this.getCanvasXY();
        var ctrx = ctrpos.x - compos.x;
        var ctry = ctrpos.y - compos.y;
        var row, col;
		var cellrowcol = this.getRowColByCoor(ctrx, ctry);
			
		//if(document.getElementById("showbox")){
			//if(this._cells[cellrowcol.row][cellrowcol.col].showTipFlag=== undefined){
				//clearCeng("showbox");	
			//}	
		//}		
				
        if (glGetMouseState()) { 
            if (this._handThing == "row") { //拉行高
           	   row = new DataRow(this._rows[this._resizeRow]);
                if (row.getHeight() + Math.floor(ctry) - this._oldRowBottomY > 0) {
					this._rows[this._resizeRow].tagval&= ~(1 << 9); // 置第x位为0
                    this._rows[this._resizeRow].height = row.getHeight() + Math.floor(ctry) - this._oldRowBottomY;
                    this._oldRowBottomY = Math.floor(ctry);
                } else {
                    this._rows[this._resizeRow].tagval  |= 1 << 9; // 设置第x位为1
                    this._rows[this._resizeRow].tagval  |= 1 << 8; // 设置第x位为1
                    this._rows[this._resizeRow].height = 0;
                    this._oldRowBottomY = this._minRowBottomY;
                }
                this.clear();
                this.paint();
                if (this.resizeRow) {
                    //this.resizeRow(e, this._resizeRow);
                }
            } else if (this._handThing == "col") {
                col = new DataCol(this._cols[this._resizeCol]);
                if (col.getWidth() + Math.floor(ctrx) - this._oldColRightX > 0) {
					this._cols[this._resizeCol].tagval&= ~(1 << 9); // 置第x位为0
                    this._cols[this._resizeCol].width = col.getWidth() + Math.floor(ctrx) - this._oldColRightX;
                    this._oldColRightX = Math.floor(ctrx);
                } else {//col.getWidth() === 0 
				
                    this._cols[this._resizeCol].tagval  |= 1 << 9; // 设置第x位为1
                    this._cols[this._resizeCol].tagval  |= 1 << 8; // 设置第x位为1
                    this._cols[this._resizeCol].width = 0;
					this._oldColRightX = this._minColRightX;
                }
                this.clear();
                this.paint();
                if (this.resizeCol) {
                    this.resizeCol(e, this._resizeCol);
                }
            } else if (this._handThing == "allcel") {} else if (this._handThing == "rowcel") {} else if (this._handThing == "colcel") {} else if (this._handThing == "cel") {
	var cellrowcol = this.getRowColByCoor(ctrx, ctry);

                if (cellrowcol.row > this._focusRow) {
                    this._sel_startRow = this._focusRow;
                    this._sel_endRow = cellrowcol.row;
                } else if (cellrowcol.row < this._focusRow) {
                    this._sel_startRow = cellrowcol.row;
                    this._sel_endRow = this._focusRow;
                } else {
                    this._sel_startRow = this._focusRow;
                    this._sel_endRow = this._focusRow;
                }
                if (cellrowcol.col > this._focusCol) {
                    this._sel_startCol = this._focusCol;
                    this._sel_endCol = cellrowcol.col;
                } else if (cellrowcol.col < this._focusCol) {
                    this._sel_startCol = cellrowcol.col;
                    this._sel_endCol = this._focusCol;
                } else {
                    this._sel_startCol = this._focusCol;
                    this._sel_endCol = this._focusCol;
                }
                var cell = this.findCombineCellsAroundSelCells();
                while (cell != null) {
                    if (cell.startrow < this._sel_startRow) {
                        this._sel_startRow = cell.startrow;
                    }
                    if (cell.startcol < this._sel_startCol) {
                        this._sel_startCol = cell.startcol;
                    }
                    if (cell.endrow > this._sel_endRow) {
                        this._sel_endRow = cell.endrow;
                    }
                    if (cell.endcol > this._sel_endCol) {
                        this._sel_endCol = cell.endcol;
                    }
                    cell = this.findCombineCellsAroundSelCells();
                }
                this.clear();
                this.paint();
            }
        } else {
            if (ctrx < this._offsetX && ctry > this._offsetY) {
                for (i = this.getScrollRowNum(); y < this._height && i < this._rows.length; i++) {
                    row = new DataRow(this._rows[i]);
                    if (row.getVisible()) {
                        y += row.getHeight();
                    }
                    if (ctry > y - 3 && ctry < y + 1) {
                        glGetCanvas().style.cursor = "n-resize";//拉行高
                        break;
                    } else if(ctry >= y + 1 && ctry < y + 3){
						if (!row.getVisible()) {
							glGetCanvas().style.cursor = "url('image/icon/H_split.png'),auto";
							//glGetCanvas().style.cursor = "e-split";//拉列
							break;
						}
					} else {
                        glGetCanvas().style.cursor = "default";
                    }
                }
            } else if (ctrx > this._offsetX && ctry < this._offsetY) {
                for (i = this.getScrollColNum(); y < this._width && i < this._cols.length; i++) {
                    col = new DataCol(this._cols[i]);
                    if (col.getVisible()) {
                        x += col.getWidth();
					}	
					if (ctrx < x + 1 && ctrx > x - 3) {
						glGetCanvas().style.cursor = "e-resize";//拉列
						break;
					} else if(ctrx >= x + 1 && ctrx < x + 3){
						if (!col.getVisible()) {
						glGetCanvas().style.cursor = "url('image/icon/split.png'),auto";
						//glGetCanvas().style.cursor = "e-split";//拉列
						break;
						}
					}else{
						glGetCanvas().style.cursor = "default";
					}

					
                }
            } else {
                glGetCanvas().style.cursor = this.getMousecursor();
            }
        }
    }
}

DataGrid.prototype.mouseup = function(e) {

}

DataGrid.prototype.mousewheel = function(e) {

}
DataGrid.prototype.paintCellSlantline = function(dc, cell, x, y, width, height) {
	var slantline=cell._slty;
//    if (cell._slty != 'none' && slantline != undefined) //对角线 无左右对齐
//    {
//        dc.fillStyle = cell._backColor;
//        dc.fillRect(x + 1, y + 1, width - 2, height - 2); //清除原先的字迹		
//    }
	
    var splitFirstTwoSeparator = function(obj, separator) {
	  var obj =obj ||'';
	
       var result = obj.split(separator, 2);

       if(T.string.glCountInstances(obj,'|')>1){ 
		   result.push(obj.substr(obj.indexOf("|") + 1).replace(result[1] + '|', ''));
	   }

        return result;

    };
    var splitFirstSeparator = function(obj, separator) {
		var obj =obj ||'';
        var result = obj.split(separator, 1);

        obj.indexOf("|")!=-1?result.push(obj.substr(obj.indexOf("|") + 1)):null;

        return result;

    };
	/*遮罩区域*/
	dc.save();	
	dc.beginPath();
	dc.strokeStyle = "transparent";
	dc.rect(x,y,width,height);
	dc.clip();
	dc.stroke(); 
	dc.closePath();

	if(this._penlist === undefined) this._penlist=[{"style":"0","widx":"1","color":"#000000"}];
		var slantColor=this._penlist[cell._spenid].color || '#000';
		var slantWidth=this._penlist[cell._spenid].widx || 1;
        dc.strokeStyle = slantColor;
        dc.lineWidth = slantColor;	
		
	if(cell.getFtid() === undefined){
		var celltext=	{"hei":-12,"fname":"宋体"};
	}else{
		if(this._ftlist === undefined) this._ftlist=[{"hei":-12,"fname":"宋体"}];
		var celltext = this._ftlist[cell.getFtid()] || {"hei":-12,"fname":"宋体"};
	}

	var textfontsize = celltext.hei!==undefined?-parseInt(celltext.hei,10) :12;
	var horMargin = cell._lspan || 5;//内左边距
	if(cell.getFtid()){
		dc.font = this.getdcfont(this._ftlist[cell.getFtid()]);//fontstr +" "+ cell._fontSize + "px " + cell._fontFamily;
	}else{
		dc.font ="12px 宋体";	
	}
	dc.fillStyle = T.color.getcolorFromByte(cell.get("tcor")) || "#000000";

    if (slantline == '1') //对角线 无左右对齐
    {

        dc.beginPath();
        dc.moveTo(x, y);
        dc.lineTo(x + width, y + height);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");
				
            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
	
			var textfontsize = celltext.hei!==undefined?-parseInt(celltext.hei,10) :12;
			var horMargin = cell._lspan || 5;//内左边距
			if(cell.getFtid()){
				dc.font = this.getdcfont(this._ftlist[cell.getFtid()]);//fontstr +" "+ cell._fontSize + "px " + cell._fontFamily;
			}else{
				dc.font ="12px 宋体";	
			}
            dc.fillStyle = T.color.getcolorFromByte(cell.get("tcor")) || "#000000";
			
            textlength = dc.measureText(textss[0]).width;
			
            var pos = [[x + width - textlength - horMargin, y + textfontsize], [x + horMargin, y + height -textfontsize/2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }

    if (slantline == "8") {//反对角线
        dc.beginPath();
        dc.moveTo(x, y + height);
        dc.lineTo(x + width, y);
        dc.stroke();

        if (cell._t.indexOf("|") != -1) {
            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");

            var drawtextlist = [];
            textlength = dc.measureText(textss[1]).width;

            var pos = [[x + horMargin, y + textfontsize], [x + width - textlength - horMargin, y +height -textfontsize/2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
        }
    }

    if (slantline == "2") {//上对角线
        dc.beginPath();
        dc.moveTo(x, y);
        dc.lineTo(x + width, y + height / 2);
        dc.stroke();
        dc.moveTo(x, y);
        dc.lineTo(x + width / 2, y + height);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstTwoSeparator(cell._t, "|");
            var drawtextlist = new Array;

            textlength = dc.measureText(textss[0]).width;

            var pos = [[x + width - textlength - horMargin, y + textfontsize, y + textfontsize],

            [x + (width-textlength)/ 2, y + height / 2 + textfontsize / 2],

            [x + horMargin, y + height-textfontsize/2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }

    if (slantline == "3") {//下对角线
        dc.beginPath();
        dc.moveTo(x + width, y + height);
        dc.lineTo(x, y + height / 2);
        dc.stroke();
        dc.moveTo(x + width, y + height);
        dc.lineTo(x + width / 2, y);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstTwoSeparator(cell._t, "|");

            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
			
            textlength = dc.measureText(textss[0]).width;

            var pos = [[x + width - textlength - horMargin, y + textfontsize],

            [x + (width-textlength)/ 2, y + height / 2 + textfontsize / 2],

            [x + horMargin, y + height - textfontsize / 2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }

    }
    if (slantline == "4") //画横线
    {
        dc.beginPath();
        dc.moveTo(x, y + height / 2);
        dc.lineTo(x + width, y + height / 2);
        dc.stroke();
            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");

            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
           
            var pos = [[x + horMargin, y + (height + textfontsize) / 2 - height / 4],

            [x + horMargin, y + (height + textfontsize) / 2 + height / 4]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }
    if (slantline == "5	") {
        dc.beginPath();
        dc.moveTo(x + width / 2, y);
        dc.lineTo(x + width / 2, y + height);
        dc.stroke();

            var offset = 0;
            var snums = 0;
            var textss = splitFirstSeparator(cell._t, "|");

            var i, textx, texty, text, textlength, fontstr = "",
            drawtextlist = new Array;
           
            textlength1 = dc.measureText(textss[0]).width;
            textlength2 = dc.measureText(textss[1]).width;
            var pos = [[x + (width / 2 - textlength1) / 2, y + (height + textfontsize) / 2],

            [x + (3 * width - 2 * textlength2) / 4, y + (height + textfontsize) / 2]];
            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
                dc.fillText(text, pos[i][0], pos[i][1]);
            }
    }
    if (slantline == "6") {//根据文字分隔符产生对应的竖线
        if(cell._t!==undefined && cell._t.indexOf("|") != -1) {
            //dc.fillStyle = cell._backColor;
           // dc.fillRect(x + 1, y + 1, width - 2, height - 2);

            var count = T.string.glCountInstances(cell._t, "|");
            dc.beginPath();
            for (var i = 1; i <= count; i++) {

                dc.moveTo(x + (width / (count + 1)) * i, y);
                dc.lineTo(x + (width / (count + 1)) * i, y + height);
                dc.stroke();
            }
            var offset = 0;
            var snums = 0;
            var textss = cell._t.split("|");
            var i, textx, texty, text, textlength, fontstr = "",verMargin = cell._tspan || 3;
           
            for (var i = 0; i < textss.length; i++) {
				textx=x,texty=y;
                var text = textss[i];
				var twidth = dc.measureText(text).width;
				if (cell._hag=== "0") {
					textx = textx + (width / (count + 1)) * i;
				} else if (cell._hag === "6") {//居中
					if (twidth > width) {
						textx = textx + (width / (count + 1)) * i;
					} else {
						textx = textx + (width / (count + 1)) * i+((width / (count + 1))-twidth)/2;
					}
					
				} else if (cell._hag === "2") {
					textx =textx + (width / (count + 1)) * (i+1) - horMargin - twidth;
				}
				if (cell._vag== "0") {
					texty = texty + textfontsize+verMargin;
				} else if (cell._vag == "6") {
					
					texty = texty + (height + textfontsize) / 2;
				
				} else if (cell._vag == "8") {
					texty = texty + height - verMargin;
				}
                dc.fillText(text, textx, texty);
            }
        }
    }
    if (slantline == "7") {//根据文字分隔符产生对应的横线
        if (cell._t!==undefined && cell._t.indexOf("|") != -1) {
            //dc.fillStyle = cell._backColor;
            //dc.fillRect(x + 1, y + 1, width - 2, height - 2);

            var count = T.string.glCountInstances(cell._t, "|");
            dc.beginPath();
            for (var i = 1; i <= count; i++) {

                dc.moveTo(x, y + (height / (count + 1)) * i);
                dc.lineTo(x + width, y + (height / (count + 1)) * i);
                dc.stroke();
            }
            var offset = 0;
            var snums = 0;
            var textss = cell._t.split("|");
            var i, textx, texty, text, textlength, fontstr = "",verMargin = cell._tspan || 3;

            for (var i = 0; i < textss.length; i++) {
                textlength = dc.measureText(cell._t).width;
                var text = textss[i];
				
				textx=x,texty=y;
				var twidth = dc.measureText(text).width;
				if (cell._hag=== "0") {
					textx = textx + horMargin;
				} else if (cell._hag === "6") {//居中
					 textx = textx + (width - twidth) / 2;					
				} else if (cell._hag === "2") {
					textx = textx + width - horMargin - twidth;
				}
				if (cell._vag== "0") {
					texty = texty +textfontsize+(height / (count + 1)) * i ;
				} else if (cell._vag == "6") {
					
					texty = texty +(height / (count + 1)) *i+((height / (count + 1)) +textfontsize)/2;
				
				} else if (cell._vag == "8") {
					texty = texty + (height / (count + 1)) * i+(height / (count + 1))- verMargin;
				}
                dc.fillText(text, textx, texty);
            }
        }
    }
	dc.restore();
	/*遮罩区域*/	
}

DataGrid.prototype.keypress = function(e) {
    var keystring = '';
    var currKey = 0,
    CapsLock = 0,
    e = e || window.event;currKey = e.keyCode||e.which ||e.charCode;CapsLock = currKey >= 65 && currKey <= 90;
	switch (currKey){//屏蔽了退格、制表、回车、空格、方向键、删除键
    case 8:
    case 9:
    case 13:
	case 32:
    case 37:
    case 38:
    case 39:
    case 40:
        keyName = "";
        break;
    default:
        keyName = String.fromCharCode(currKey);
        break;
    }  

    keystring += keyName;
	
	var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
	if((cell._fl >> 15) & 0x01)
	{
			if(!/^\d+$/.test(keystring)||(T.string.glCountInstances(cell._t, ".")>0&&keystring==='.')){preventDefault(e);return false;}
			
	}else if((cell._fl >> 1) & 0x01){//只能输入数字
		
	}else if(cell._fl && ((cell._fl >> 0) & 0x01) === 0){//单元保护
		alert('单元保护');
		return false;
	}else if((cell._fl >> 9) & 0x01){//只能输入数字
		if(!/^\d+$/.test(keystring)){preventDefault(e);return false;}
	}else if((cell._fl >> 13) & 0x01)//日期控件
	{
		preventDefault(e);return false;	
	}else if (cell._cellcheck !== undefined ) {//超级链接
			if(Number(cell._cellcheck.noedit) === 1){//不可编辑
				return false;
			}
		}

    this.showEditbox(keystring);
}
DataGrid.prototype.commandKey = function(e) {
    var keystring = '';
    var currKey = 0,
    CapsLock = 0,
    e = e||window.event;currKey = e.keyCode|| e.which || e.charCode;CapsLock = currKey >= 65 &&currKey <= 90;
    if (currKey == 46) { //del
        if (document.getElementById("_innerDiv") && document.getElementById("_innerDiv").style.display == "block") {
            clearCeng("_outerDiv");
        }

    }
}
DataGrid.prototype.showEditbox = function(string) {
    var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
    var cellsize = this.getCellSize(this._focusRow, this._focusCol);
	//

	 var cellx = 0,celly = 0,dc = this.getDc(),textwidth = cellsize.width,cellsize, compos, cellpos,
	 row, col, cell, temprow, tempcol, tempwidth;
    
	var cellpos = this.getCellLeftTopCoor(this._focusRow, this._focusCol); //获得单元格在画布里的位置

    var left = (document.body.clientWidth - _gl_canvas.width) / 2 + document.body.scrollLeft;
    dc.fillStyle = "#fff";
    dc.fillRect(cellpos.x, cellpos.y, textwidth, cellsize.height);

   
	compos = this.getCanvasXY();
    var dc = this.getDc();

    //获取选定单元格的位置
    cellx = compos.x + cellpos.x;
    celly = compos.y + cellpos.y;
	
    this._editBox.style.left = cellx + document.getElementById("canvas").offsetLeft + "px";
    this._editBox.style.top = celly + document.getElementById("canvas").offsetTop + "px";
    this._editBox.style.width = cellsize.width + "px";
    this._editBox.style.height = cellsize.height + "px";
    this._editBox.style.display = "";
    this._editBox.focus();
    this.releaseDc(dc);

}
DataGrid.prototype.setBorderLine = function(Shape) {
    this.setBorderLines(Shape, this._sel_startRow, this._sel_startCol, this._sel_endRow, this._sel_endCol);
}
DataGrid.prototype.setBorderStyle=function(i,j,pos){
	
	var setborder=function(i,j,arg)
	{	
		var style="0",widx="1",color="#000000";
		if("undefined" !== typeof borderWidth)
		{
			widx = borderWidth;
		}
		if("undefined" !== typeof borderColor)
		{	
			color= borderColor;
		}
		if("undefined" !== typeof borderStyle)
		{
			style = borderStyle;
		}
		//color=color.substring(1);
		//color=color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
		//color = parseInt(color,16);
		
		if(this._penlist===undefined)this._penlist=[];
		var templist={"style":style,"widx":String(widx),"color":color};
		
		var listid=T.array.InArray(templist,this._penlist);//查询ftid的值 若为false则 插入
		if(listid === false){
			this._penlist.push(templist);
			listid = String(this._penlist.length-1);	
		}
		var fl = this._cells[i][j].fl;
		fl=fl|(1<<0);
		if(arg === 'Top'){
			this._cells[i][j].tpenid=listid;
			this._cells[i][j].fl=fl|(1<<5);//fl^(1 << 5);
		}else if(arg === 'Left'){
			this._cells[i][j].lpenid=listid;
			this._cells[i][j].fl=fl|(1<<4);//fl^(1 << 4);
		}else if(arg === 'Right'){
			this._cells[i][j].rpenid=listid;
			this._cells[i][j].fl=fl|(1<<6);//fl^(1 << 6);
		}else if(arg === 'Bottom'){
			this._cells[i][j].bpenid=listid;
			this._cells[i][j].fl=fl|(1<<7);//fl^(1 << 7);
		}
	};
	var cell = new DataCell(this._cells[i][j]);
	if(arguments[3]!==undefined){//导入json
			if(pos.indexOf("top")!==-1)
			{

				setborder.call(this,i,j,"Top");
			}
			if(pos.indexOf("left")!==-1)
			{
				setborder.call(this,i,j,"Left");	
			}
			if(pos.indexOf("right")!==-1)
			{	
				setborder.call(this,i,j,"Right");
			}
			if(pos.indexOf("bottom")!==-1)
			{
				setborder.call(this,i,j,"Bottom");
			}
	}else{
		if(cell.getCombineStyle() == "combine")//合并单元格
		{	
			var rows=cell.getRowspan();
			var cols=cell.getColspan();
			if(pos.indexOf("top")!==-1)
			{
				setborder.call(this,i,j,"Top");
//				for(var k=j;k<j+cols;k++){
//					if(this._cells[i-1][k]!==undefined&&this._cells[i-1][k].borderBottomWidth!==0)this.clearBorderStyle(i-1,k,"bottom");
//				}
			}
			if(pos.indexOf("left")!==-1)
			{
				setborder.call(this,i,j,"Left");	
				//if(this._cells[i][j-1]!==undefined&&this._cells[i][j-1].borderRightWidth!==0)this.clearBorderStyle(i,j-1,"right");
//				for(var k=i;k<i+rows;k++){
//					if(this._cells[k][j-1]!==undefined&&this._cells[k][j-1].borderRightWidth!==0)this.clearBorderStyle(k,j-1,"right");
//				}
			}
			if(pos.indexOf("right")!==-1)
			{	
				setborder.call(this,i,j,"Right");
				//if(this._cells[i][j+1]!==undefined&&this._cells[i][j+1].borderLeftWidth!==0)this.clearBorderStyle(i,j+1,"left");
				//for(var k=i;k<i+rows;k++){
					//if(this._cells[k][j+cols]!==undefined&&this._cells[k][j+cols].borderLeftWidth!==0)this.clearBorderStyle(k,j+cols,"left");
				//}
			}
			if(pos.indexOf("bottom")!==-1)
			{
				setborder.call(this,i,j,"Bottom");
				//for(var k=j;k<j+cols;k++){
					//if(this._cells[i+rows][k]!==undefined&&this._cells[i+rows][k].borderTopWidth!==0)this.clearBorderStyle(i+rows,k,"top");
				//}
			}
		}else if(cell.getCombineStyle() == "none")
		{
			if(pos.indexOf("top")!==-1)
			{
				setborder.call(this,i,j,"Top");
				//if(this._cells[i-1][j]!==undefined&&this._cells[i-1][j].borderBottomWidth!==0)this.clearBorderStyle(i-1,j,"bottom");
			}
			if(pos.indexOf("left")!==-1)
			{
				setborder.call(this,i,j,"Left");	
				//if(this._cells[i][j-1]!==undefined&&this._cells[i][j-1].borderRightWidth!==0)this.clearBorderStyle(i,j-1,"right");
			}
			if(pos.indexOf("right")!==-1)
			{	
				setborder.call(this,i,j,"Right");
				//if(this._cells[i][j+1]!==undefined&&this._cells[i][j+1].borderLeftWidth!==0)this.clearBorderStyle(i,j+1,"left");
			}
			if(pos.indexOf("bottom")!==-1)
			{
				setborder.call(this,i,j,"Bottom");
				//if(this._cells[i+1][j]!==undefined&&this._cells[i+1][j].borderTopWidth!==0)this.clearBorderStyle(i+1,j,"top");
			}
	
		}
	}
}
DataGrid.prototype.clearBorderStyle=function(i,j,pos){
	var setborder=function(i,j,arg)
	{	
		var fl = this._cells[i][j].fl;
		if(arg === 'Top'){
			if(this._cells[i][j].tpenid!==undefined)delete this._cells[i][j].tpenid;
			fl=fl|(1<<5);
			fl=fl^(1 << 5);
		}else if(arg === 'Left'){
			if(this._cells[i][j].lpenid!==undefined)delete this._cells[i][j].lpenid;
			fl=fl|(1<<4);
			fl=fl^(1 << 4);
		}else if(arg === 'Right'){
			if(this._cells[i][j].rpenid!==undefined)delete this._cells[i][j].rpenid;
			fl=fl|(1<<6);
			fl=fl^(1 << 6);
		}else if(arg === 'Bottom'){
			if(this._cells[i][j].bpenid!==undefined)delete this._cells[i][j].bpenid;
			fl=fl|(1<<7);
			fl=fl^(1 << 7);
		
		}	
		
		if(this._cells[i][j].fl!==undefined)this._cells[i][j].fl=fl;

	};
	
	var cell = new DataCell(this._cells[i][j]);
	if(cell.getCombineStyle() === "combine")//合并单元格
	{	
		var rows=cell.getRowspan();
		var cols=cell.getColspan();
		if(pos.indexOf("top")!==-1)
		{
			setborder.call(this,i,j,"Top");
				for(var k=j;k<j+cols;k++){
					setborder.call(this,i-1,k,"Bottom");
				}
		}
		if(pos.indexOf("left")!==-1)
		{
			setborder.call(this,i,j,"Left");	
			for(var k=i;k<i+rows;k++){
				setborder.call(this,k,j-1,"Right");
			}
		}
		if(pos.indexOf("right")!==-1)
		{	
			setborder.call(this,i,j,"Right");
			
			for(var k=i;k<i+rows;k++){
				setborder.call(this,k,j+cols,"Left");
			}
		}
		if(pos.indexOf("bottom")!==-1)
		{
			setborder.call(this,i,j,"Bottom");
			for(var k=j;k<j+cols;k++){
				
				setborder.call(this,i+rows,k,"Top");
			}
		}
	}else
	{
		if(pos.indexOf("top")!==-1)
		{
			setborder.call(this,i,j,"Top");
			setborder.call(this,i-1,j,"Bottom");
		}
		if(pos.indexOf("left")!==-1)
		{
			setborder.call(this,i,j,"Left");	
			setborder.call(this,i,j-1,"Right");
		}
		if(pos.indexOf("right")!==-1)
		{	
			setborder.call(this,i,j,"Right");
			setborder.call(this,i,j+1,"Left");
		}
		if(pos.indexOf("bottom")!==-1)
		{
			setborder.call(this,i,j,"Bottom");
			setborder.call(this,i+1,j,"Top");
		}

	}
//	if(pos.indexOf("top")!==-1)
//	{
//		setborder.call(this,i,j,"Top");
//	}
//	if(pos.indexOf("left")!==-1)
//	{
//		setborder.call(this,i,j,"Left");	
//	}
//	if(pos.indexOf("right")!==-1)
//	{
//		setborder.call(this,i,j,"Right");
//	}
//	if(pos.indexOf("bottom")!==-1)
//	{
//		setborder.call(this,i,j,"Bottom");
//	}
}
DataGrid.prototype.setBorderLines = function(Shape, srowindex, scolindex, erowindex, ecolindex) {
   
	if (srowindex > erowindex || scolindex > ecolindex) {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    } else {
        var i, j;
        if (this._rows.length < erowindex) {
            this.insertRow(erowindex);
        }

        if (this._cols.length < ecolindex) {
            this.insertCol(ecolindex);
        }
		var borderlineShape='';
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				var initialshape=new Array('left','top','right','bottom');
				var initialbordeline=this._cells[i][j].borderline;
				var cell = new DataCell(this._cells[i][j]);
				
				if(cell.getCombineStyle() == "combine"||(this._cells[i][j].borderline!= undefined&&scolindex===ecolindex&&srowindex===erowindex))
				{
					if(initialshape.indexOf(Shape)!=-1)
					{	
						if(this._cells[i][j].borderline===undefined){
							this._cells[i][j].borderline=Shape;
						}else if(this._cells[i][j].borderline.indexOf(Shape)==-1){
							this._cells[i][j].borderline +='-'+Shape;
						}
						this.setBorderStyle(i,j,Shape);
					}
					else if(Shape=='all'||Shape=='all_out'||Shape=='all_in')
					{
						this._cells[i][j].borderline=initialshape.join('-');
						this.setBorderStyle(i,j,this._cells[i][j].borderline);
					
					}else if(Shape=='all-top'||Shape=='top-bottom')//横框线
					{
						this.setBorderStyle(i,j,'top-bottom');
					}else if(Shape=='all-left'||Shape=='left-right')
					{
						this.setBorderStyle(i,j,'left-right');
					}
				}
				else if(cell.getCombineStyle() == "none")
				{
					if(Shape=='all')
					{	
						this._cells[i][j].borderline=initialshape.join('-');
						this.setBorderStyle(i,j,this._cells[i][j].borderline);
					
					}
					else if(Shape=='all_in' && !(erowindex==srowindex && ecolindex==scolindex))
					{
						if(i!=srowindex && i!=erowindex && j!=scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=initialshape.join('-');	
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j==ecolindex)
						{
							this._cells[i][j].borderline=['bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j!=scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i!=srowindex&& j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=erowindex &&i!=srowindex&& j==scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['top','right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=erowindex &&i!=srowindex&& j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=erowindex &&i!=srowindex&& j==scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i==srowindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i!=srowindex && j!=ecolindex&& j!=scolindex)
						{
							this._cells[i][j].borderline=['top','left','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==erowindex &&i!=srowindex && j!=ecolindex&& j==scolindex)
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}						
						else if(i==srowindex &&i==erowindex && j==scolindex )
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}

					}
					else if(Shape=='all_out')
					{
						if(i==srowindex && i==erowindex && j==scolindex && j==ecolindex)
						{
							this._cells[i][j].borderline=initialshape.join('-');	
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['left','top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j==scolindex && j==ecolindex)
						{
							this._cells[i][j].borderline=['left','top','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j!=scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['top'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i!=erowindex && j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['top','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}						
						else if(i==srowindex &&i==erowindex  && j!=scolindex&&j==ecolindex)
						{
							this._cells[i][j].borderline=['top','right','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i==srowindex &&i==erowindex && j==scolindex&&j!==ecolindex )
						{
							this._cells[i][j].borderline=['top','left','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}else if(i==srowindex &&i==erowindex && j!=scolindex&&j!=ecolindex )
						{
							this._cells[i][j].borderline=['top','bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex&&i!=erowindex && j==scolindex&& j!=ecolindex)
						{
							this._cells[i][j].borderline=['left'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex&&i!=erowindex && j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex&&i!=erowindex && j==scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['left','right'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex && i==erowindex &&j!=scolindex && j!=ecolindex)
						{
							this._cells[i][j].borderline=['bottom'].join('-');
							this.setBorderStyle(i,j,this._cells[i][j].borderline);
						}
						else if(i!=srowindex &&i==erowindex && j==scolindex&& j!=ecolindex)
						{
							//this._cells[i][j].borderline=['bottom','left'].join('-');
							this.setBorderStyle(i,j,'bottom-left');
						}						
						else if(i!=srowindex&&i==erowindex && j!=scolindex&& j==ecolindex)
						{
							this._cells[i][j].borderline=['bottom','right'].join('-');
							this.setBorderStyle(i,j,'bottom-right');
						}							
					}					
					else if(Shape=='left')
					{
						if(j==scolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("left")===-1){
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='right')
					{
						if(j==ecolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("right")===-1){
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='top')//上框线
					{
						if(i==srowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("top")===-1){
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						} 	
					}
					else if(Shape=='bottom')
					{
						if(i==erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("bottom")===-1){
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='top-bottom')
					{
						if(i!=srowindex&&i==erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("bottom")===-1){
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');	
								
							}
							this.setBorderStyle(i,j,'bottom');	
							
						}
						if(i==srowindex&&i!=erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("top")===-1){
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
								
							}
							this.setBorderStyle(i,j,'top');	
						}
						if(i==srowindex&&i==erowindex)
						{
							this._cells[i][j].borderline=['top','bottom'].join('-');	
							this.setBorderStyle(i,j,Shape);
						}							

					}
					else if(Shape=='left-right')
					{
						if(j==scolindex&&j!=ecolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("left")===-1){
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,"left");
						}
						if(j==ecolindex&&j!=scolindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("right")===-1){
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,'right');
						}
						if(j==scolindex&&j==ecolindex)
						{
							this._cells[i][j].borderline=['left','right'].join('-');	
							this.setBorderStyle(i,j,Shape);
						}
					}
					else if(Shape=='all-top')//横框线
					{
						if(i!=srowindex&&i==erowindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['bottom-top',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("bottom")===-1&&initialbordeline.indexOf("top")===-1)){
								
								this._cells[i][j].borderline=['bottom-top',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("bottom")===-1){
								
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("top")===-1){
								
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'bottom-top');
						}
						if(i==srowindex&&i!=erowindex)
						{
							if(initialbordeline===undefined||initialbordeline.indexOf("top")===-1){
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							}
							this.setBorderStyle(i,j,'bottom-top');
						}
						if(i!=srowindex&&i!=erowindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['bottom-top',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("bottom")===-1&&initialbordeline.indexOf("top")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("bottom")===-1){
								
								this._cells[i][j].borderline=['bottom',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("top")===-1){
								
								this._cells[i][j].borderline=['top',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'bottom-top');
						}
						if(i==srowindex&&i==erowindex)
						{	
							this._cells[i][j].borderline=['top','bottom'].join('-');	
							this.setBorderStyle(i,j,'bottom-top');
						}
					}
					else if(Shape=='all-left')//竖框线
					{
						if(j==scolindex&&j!=ecolindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("left")===-1&&initialbordeline.indexOf("right")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("left")===-1){
								
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("right")===-1){
								
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'left-right');
						}
						if(j==ecolindex&&j!=scolindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("left")===-1&&initialbordeline.indexOf("right")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("left")===-1){
								
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("right")===-1){
								
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'left-right');
						}
						if(j!=ecolindex&&j!=scolindex)
						{
							if(initialbordeline===undefined){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');		
							
							}else if((initialbordeline.indexOf("left")===-1&&initialbordeline.indexOf("right")===-1)){
								
								this._cells[i][j].borderline=['left-right',initialbordeline].join('-');	
							
							}else if(initialbordeline.indexOf("left")===-1){
								
								this._cells[i][j].borderline=['left',initialbordeline].join('-');		
							
							}else if(initialbordeline.indexOf("right")===-1){
								
								this._cells[i][j].borderline=['right',initialbordeline].join('-');		
							
							}
							this.setBorderStyle(i,j,'left-right');
						}
						if(j==scolindex&&j==ecolindex)
						{
							this._cells[i][j].borderline=['left','right'].join('-');	
							this.setBorderStyle(i,j,'left-right');
						}
					}
					

				}
				if(i==srowindex && j == scolindex)
                {	
				}
                else
                {
                }
				
				
				
            }
        }
    }
	this.clear();
	this.paint();
}
DataGrid.prototype.clearBorderLine= function(Shape) {
    var srowindex=this._sel_startRow, scolindex=this._sel_startCol, erowindex=this._sel_endRow,ecolindex= this._sel_endCol;
	
	if (srowindex > erowindex || scolindex > ecolindex) {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    } else {
        var i, j,cell;
        if (this._rows.length < erowindex) {
            this.insertRow(erowindex);
        }

        if (this._cols.length < ecolindex) {
            this.insertCol(ecolindex);
        }
		var borderlineShape='';
		var clearborderline = function(Shape,i,j){
	
		}
        for(i=srowindex;i<=erowindex;i++)
        {
            for(j=scolindex;j<=ecolindex;j++)
            {
				cell = new DataCell(this._cells[i][j]);
				var oldborderline=this._cells[i][j].borderline;
				var initialshape=new Array('left','top','right','bottom');

				if (cell.getColspan() > 0 && cell.getRowspan() > 0) {//该单元格为合并 或者正常
					if (cell.getCombineStyle() == "combine") { //该单元格为合并
					if(Shape=='all')
					{
						
						this.clearBorderStyle(i,j,initialshape.join('-'));
					}
					else if(Shape=='all_in')
					{
							this.clearBorderStyle(i,j,'right-bottom');
					}
					else if(Shape=='all_out')//外部框线
					{
						this.clearBorderStyle(i,j,initialshape.join('-'));
					}					
					else if(Shape=='left')//做框线
					{
							this.clearBorderStyle(i,j,'left');
					}
					else if(Shape=='right')
					{
							this.clearBorderStyle(i,j,'right');
					}
					else if(Shape=='top')
					{
							this.clearBorderStyle(i,j,'top');
					}
					else if(Shape=='bottom')//抹下框线
					{
							this.clearBorderStyle(i,j,'bottom');
					}
					else if(Shape=='top-bottom')//抹上下框线
					{
						this.clearBorderStyle(i,j,'top-bottom');
					}
					else if(Shape=='left-right')
					{
							this.clearBorderStyle(i,j,'left-right');
					}
					else if(Shape=='all-top')//横框线
					{
							this.clearBorderStyle(i,j,'top-bottom');
					}
					else if(Shape=='all-left')//竖框线
					{
							this.clearBorderStyle(i,j,'right-left');
					}
					}else { //该单元格非合并单元格
						if(Shape=='all')
						{
							
							this.clearBorderStyle(i,j,initialshape.join('-'));
						}
						else if(Shape=='all_in' && !(erowindex==srowindex && ecolindex==scolindex))
						{
							if(i!==srowindex&&i!==erowindex&&j!==scolindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,initialshape.join('-'));	
							}
							if(i===srowindex&&i!==erowindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,'right-bottom');
							}
							if(i===srowindex&&i!==erowindex&&j===ecolindex)
							{
								this.clearBorderStyle(i,j,'bottom');
							}
							if(i===srowindex&&i!==erowindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
							if(i===srowindex&&i!==erowindex&&j!==scolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
							
							if(i!==srowindex&&i===erowindex&&j!==ecolindex)
							{
								this.clearBorderStyle(i,j,'right-top');	
							}
							if(i!==srowindex&&i===erowindex&&j!==scolindex)
							{
								this.clearBorderStyle(i,j,'left-top');		
							}
							
							if(i!==srowindex&&i!==erowindex&&j!==ecolindex&&j===scolindex)
							{
								this.clearBorderStyle(i,j,'top-|bottom|right-');	
							}
							if(i!==srowindex&&i!==erowindex&&j===ecolindex&&j!==scolindex)
							{
								this.clearBorderStyle(i,j,'top-|bottom|left-');
							}
							
							if(j===scolindex&&j!==ecolindex&&i!==erowindex)
							{
								this.clearBorderStyle(i,j,'right-|bottom');
							}
							if(j===scolindex&&j===ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
							
							if(j!==scolindex&&j===ecolindex&&i!==srowindex)
							{
								this.clearBorderStyle(i,j,'top-left-');
							}
						}
						else if(Shape=='all_out')//外部框线
						{
							if(i===srowindex )
							{
								this.clearBorderStyle(i,j,'top');
							}
							if(i===erowindex)
							{
								this.clearBorderStyle(i,j,'bottom');
							}
							if(j===scolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
							if(j===ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
	
						}					
						else if(Shape=='left')//做框线
						{
							if(j==scolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
						}
						else if(Shape=='right')
						{
							if(j==ecolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
						}
						else if(Shape=='top')
						{
							if(i==srowindex)
							{
								this.clearBorderStyle(i,j,'top');
							}
						}
						else if(Shape=='bottom')//抹下框线
						{
							if(i==erowindex)
							{	
								this.clearBorderStyle(i,j,'bottom');
							}
						}
						else if(Shape=='top-bottom')//抹上下框线
						{
							if(i!=srowindex&&i==erowindex)
							{
								this.clearBorderStyle(i,j,'bottom');
							}
							if(i==srowindex&&i!=erowindex)
							{
								this.clearBorderStyle(i,j,'top');
							}
							if(i==srowindex&&i==erowindex)
							{
								this.clearBorderStyle(i,j,'top-bottom');
							}
						}
						else if(Shape=='left-right')
						{
							if(j==scolindex&&j!=ecolindex)
							{
								this.clearBorderStyle(i,j,'left');
							}
							if(j==ecolindex&&j!=scolindex)
							{
								this.clearBorderStyle(i,j,'right');
							}
							if(j==scolindex&&j==ecolindex)
							{
								this.clearBorderStyle(i,j,'top-left');
							}
						}
						else if(Shape=='all-top')//横框线
						{
								this.clearBorderStyle(i,j,'top-bottom');
						}
						else if(Shape=='all-left')//竖框线
						{
								this.clearBorderStyle(i,j,'right-left');
						}
					}
					
				}else{//合并单元格的非主单元格
						
				}

				}
				
        }
    }
	
	//this.clearBorderStyle(oldborderline);
	this.clear();
	this.paint();
}
DataGrid.prototype.paintBorderLine = function(dc, shape, x, y, width, height,cell) {
	
//    if (shape.indexOf('left') !==-1) {
//		var color=cell._borderLeftColor;
//        var width=cell._borderLeftWidth==0?1:cell._borderLeftWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; //this._borderTopColor;
//        dc.beginPath();
//        dc.moveTo(x, y);
//        dc.lineTo(x, y + height);
//        dc.stroke();
//    }
//    if (shape.indexOf('right') !== -1) {
//		var color=cell._borderRightColor;
//        var width=cell._borderRightWidth==0?1:cell._borderRightWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; //this._borderRightColor;
//        dc.beginPath();
//        dc.moveTo(x + width, y);
//        dc.lineTo(x + width, y + height);
//        dc.stroke();
//    }
//
//    if (shape.indexOf('bottom') !== -1) {
//		var color=cell._borderBottomColor;
//        var width=cell._borderBottomWidth==0?1:cell._borderBottomWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; // this._borderBottomColor;
//        dc.beginPath();
//        dc.moveTo(x, y + height);
//        dc.lineTo(x + width, y + height);
//        dc.stroke();
//    }
//
//    if (shape.indexOf('top') !== -1) {
//		var color=cell._borderTopColor;
//        var width=cell._borderTopWidth==0?1:cell._borderTopWidth;
//		dc.lineWidth=width;
//		dc.strokeStyle = color; // this._borderLeftColor;
//        dc.beginPath();
//        dc.moveTo(x, y);
//        //dc.lineTo(x + width, y);
//        dc.stroke();
//    }

}
DataGrid.prototype.usepaintBorderLine = function() {
    this._Mousecursor = "url('image/icon/paintborder.ico'),auto";
    this.clear();
    this.paint();
}
DataGrid.prototype.usepaintBorderLines = function(x, y, focusRow, focusCol) {
    this._cells[focusRow][focusCol].borderline = ['left', 'right', 'top', 'bottom'].join('-');
    //	  var i,cellY;
    //	  for(i = this.getScrollRowNum();i < focusRow && y < this._height;i++)
    //	  {
    //		  row = new DataRow(this._rows[i]);
    //		  if(row.getVisible())
    //		  {
    //			  cellY += row.getHeight();
    //		  }
    //	  }
    this.clear();
    this.paint();
    //
}
DataGrid.prototype.eraserBorderLine = function() {
    this.eraserBorderLines(this._sel_startRow, this._sel_startCol, this._sel_endRow, this._sel_endCol);
}

DataGrid.prototype.eraserBorderLines = function(srowindex, scolindex, erowindex, ecolindex) {
    if (srowindex > erowindex || scolindex > ecolindex) {
        alert("paramter error: srowindex < erowindex or scolindex < ecolindex");
    } else {
        var i, j;
        if (this._rows.length < erowindex) {
            this.insertRow(erowindex);
        }

        if (this._cols.length < ecolindex) {
            this.insertCol(ecolindex);
        }
        for (i = srowindex; i <= erowindex; i++) {
            for (j = scolindex; j <= ecolindex; j++) {
				this._cells[i-1][j].borderline!==undefined?this._cells[i-1][j].borderline=this._cells[i-1][j].borderline.replace('-bottom',''):null;
				
				this._cells[i][j-1].borderline!==undefined?this._cells[i][j-1].borderline=this._cells[i][j-1].borderline.replace('-right',''):null;
				
				this._cells[i+1][j].borderline!==undefined?this._cells[i+1][j].borderline=this._cells[i+1][j].borderline.replace('-top',''):null;
				
				this._cells[i][j+1].borderline!==undefined?this._cells[i][j+1].borderline=this._cells[i][j+1].borderline.replace('-left',''):null;
                
				this._cells[i][j].borderline = 'none';
            }
        }
    }
}
DataGrid.prototype.setSelCellFontColor = function(color) {
	var color=color.substring(1);
	color=color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	color = parseInt(color,16);
	
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
            this._cells[i][j].tcor = String(color);
        }
    }
}
DataGrid.prototype.setSelCellbackColor = function(color) {
	//var color=color.substring(1);
	//color=color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	//color = parseInt(color,16);
	
	var tempftlist=color;//T.color.getcolorFromByte(color);
	var brid=T.array.InArray(tempftlist,this._brlist);//查询ftid的值 若为false则 插入
	if(brid === false){
		if(this._brlist===undefined)this._brlist=[];
		this._brlist.push(tempftlist);
		brid = String(this._brlist.length-1);	
	}
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
            this._cells[i][j].brid = brid;
        }
    }
}
DataGrid.prototype.setSelCellborderLineColor = function(color) {
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
            this._cells[i][j].borderlinecolor = color;
        }
    }
}

DataGrid.prototype.getqianfenwen = function(num) {
    num = num + "";
    var re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
        num = num.replace(re, "$1,$2");
    }
    return num;

}
DataGrid.prototype.Chinese_num = function(num, type) {
    if (type == 'normal' || type == 'dx' || type == 'taoda' ) {
        var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
        var BB = new Array("", "拾", "佰", "仟", "万", "亿", "元", "");
        var CC = new Array("角", "分", "厘");
    } else if (type == 'xx') {
        var AA = new Array("〇", "一", "二", "三", "四", "五", "六", "七", "八", "九");
        var BB = new Array("", "十", "百", "千", "万", "亿", "圆", "");
        var CC = new Array("角", "分", "厘");
    }
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
        case 0:
            re = BB[7] + re;
            break;
        case 4:
            if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
            break;
        case 8:
            re = BB[5] + re;
            BB[7] = BB[5];
            k = 0;
            break;
        }
        if (k % 4 == 2 && a[0].charAt(i) == "0" && a[0].charAt(i + 2) != "0") re = AA[0] + re;
        if (a[0].charAt(i) != 0) {
            if (i == (a[0].length - 2) && type != 'normal' && a[0].charAt(i) == 1) {
                re = BB[1] + re;
            } else {
                re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            }
        }
        k++;
    }
    if (typeof(a[1]) != 'undefined') {
        if (type == 'dx' || type == 'xx') {
            re += '.';
        } else {
            re += '元';
        }
        for (var i = 0; i < a[1].length; i++) {
            re += AA[a[1].charAt(i)];
            if (type == 'normal' || type === 'taoda') re += CC[i];
            if(a[1].length == 1&&type === 'taoda') re += AA[0]+CC[1];
			if (i == 1)break;
        }
        if (a[1].charAt(0) == "0" && a[1].charAt(1) == "0") {
            re += "元整";
        }
    } else {
        if (type == 'normal') re += "元整";
		if (type === 'taoda') re += "元"+AA[0]+CC[0]+AA[0]+CC[1];
    }
    return re;

}
DataGrid.prototype.numTochart = function(num, type) {
    numto = function(num, type) {
        var floors = num / 26;
        var re = '';
        if (num % 27 != 0 && floors <= 1) {
            if (type == 'xx') {
                re += String.fromCharCode(num - 1 + 65).toLowerCase();
            } else if (type == 'dx') {
                re += String.fromCharCode(num - 1 + 65);
            }
        }
        if (floors > 1) {
            if (/^[0-9]*[1-9][0-9]*$/.test(floors)) floors--;
            var yushu = num % 26 == 0 ? 26 : num % 26;
            re += numto(floors, type) + numto(yushu, type);
        }
        return re;

    }
    num = ("" + num).replace(/(^0*)/g, "");
    var re = numto(num, type);
    return re;
}
DataGrid.prototype.numbyten = function(num, nby, type) {
    num = ("" + num).replace(/(^0*)/g, "");
    return num + '.00';
}
DataGrid.prototype.turnFormat = function(textFormat, textv) {
    if(textv == ''){
		return textv;
	}
    if (!/^\d*(\.\d*)?$/.test(textv)){
		 if(!/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/.test(textv)){
		 	return textv;	
		}
	}
    jason = textFormat;

    var textFormat = jason.format;
    var endnum;
    var weishu = jason.weishu;
    var nby = jason.nby;
	var type=jason.type===undefined?'':jason.type;
    if (weishu == 0) {
        endnum = '';
    } else {
        endnum = '.';
        for (var i = 0; i < weishu; i++) {
            endnum += '0';
        }
    }
    if (textFormat === 'default' || textFormat === '0') {
		return textv!==''?parseFloat(textv):textv;

    } else if (/^\d+$/.test(textFormat)) {
        if (textFormat == '1') { //数值
			
            return ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '2') { //RMB
			if(textv === '0') return '￥' + ("" + textv)+ endnum;
            return '￥' + ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '3') { //美元币
		
            return '$' + ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '4') { //百分比
            return ("" + textv).replace(/(^0*)/g, "") * 100 + endnum + '%';

        } else if (textFormat == '5') { //千位分隔式样
            return this.getqianfenwen(("" + textv).replace(/(^0*)/g, ""));

        } else if (textFormat == '6') { //欧元符号
            return '€' + ("" + textv).replace(/(^0*)/g, "") + endnum;

        } else if (textFormat == '7') { //财务大写
            return this.Chinese_num(textv, 'normal');

        } else if (textFormat == '8') { //文本
            return textv + endnum;

        } else if (textFormat == '11') { //套打大写
            return this.Chinese_num(textv,'taoda');

        } else if (textFormat == '12') { //中文数字小写
            return this.Chinese_num(textv, 'xx');

        } else if (textFormat == '13') { //中文数字大写
            return this.Chinese_num(textv, 'dx');

        } else if (textFormat == '14') { //一，二，三序号
            return this.Chinese_num(textv, 'xx');

        } else if (textFormat == '15') { //a,b,c序号
            return this.numTochart(textv, 'xx');

        } else if (textFormat == '16') { //A,B,C序号
            return this.numTochart(textv, 'dx');

        } else if (textFormat == '17') { //以10的n次相乘
            var nbynum = 1;
            if (nby != 0) {
                for (var i = 1; i <= nby; i++) {
                    nbynum *= 10;
                }
            }
			
            return this.turnweishu(String((("" + textv).replace(/(^0*)/g, "")) * nbynum), weishu);

        } else if (textFormat == '18') { //以10的n次相除
            var nbynum = 1;
            if (nby != 0) {
                for (var i = 1; i <= nby; i++) {
                    nbynum /= 10;
                }
            }
            return this.turnweishu(String((("" + textv).replace(/(^0*)/g, "")) * nbynum), weishu);
        }
    } else {
        var dat = new DateFormat(textv, textFormat,type);
        return dat.parseDate();
    }
}

DataGrid.prototype.turnweishu = function(textv, weishu) {
    var obj = textv.split('.');
    if (weishu == 0) {
        endnum = '';
    } else {
        endnum = '.';
        for (var i = 0; i < weishu; i++) {
            endnum += '0';
        }
    }
	
    if (obj.length===1) {
        return textv + endnum;
    } else if (obj.length >= weishu) {
        if (weishu == 0) {
            return obj;
        } else {
            return obj + '.' + String(obj).substring(0, weishu);
        }
    } else if (obj.length < weishu) {
        return obj + '.' + obj + repeat('0', weishu - obj.length);
    }
}
DataGrid.prototype.setTextFormat = function(textf) {
    var i, j;
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
			if(textf.type==='lexcel'){
				this._cells[i][j].swty=10;
				this._cells[i][j].lexcel='<data> <eformat>'+textf.format+'</eformat> </data>';
			}
			if("weishu" in textf){
				this._cells[i][j].swty=textf.format;
				this._cells[i][j].dpt=textf.weishu;
			}
			//this._cells[i][j].textFormat = textf;
        }
    }
    this.clear();
    this.paint();

}
DataGrid.prototype.setAutoLineFeed = function(type) {
	
    if((this._tagvalue>> 16) & 0x01){
		return ;
	}
	var cell = new DataCell(this._cells[this._focusRow][this._focusCol]);
	if(cell._t==='' || cell._t ===undefined)return;
    var dc = this.getDc();
    var cellsize = this.getCellSize(this._focusRow, this._focusCol),ftlist= this._ftlist;
	if((cell._fl >> 8) & 0x01){//自动换行
	
    	this._cells[this._focusRow][this._focusCol].fl &= ~(1 << 8);//清除自动换行
		this.setRowHeight(this._focusRow, 20); //默认高度
	
	}else{
    	//获得单元格内文字自动换行后高度
		
		var textlist = cell._t.split('\n');
		var i, temptext, textwidth, textheight,horMargin = cell._lspan || 5,textfontsize= cell.getFontSize(ftlist);
    	this._cells[this._focusRow][this._focusCol].fl |= 1 << 8;//设置自动换行
        if (cell._hag== "0" || cell._hag == "2") {
            textwidth = cellsize.width - horMargin;
        } else {
            textwidth = cellsize.width;
        }
        textheight = 0;
        for (i = 0; i < textlist.length; i++) {
            temptext = textlist[i];
            while (dc.measureText(temptext).width > textwidth) {
                text = temptext.substring(0, textwidth / dc.measureText(temptext).width * temptext.length);
                textheight += textfontsize * 4 / 3;
                temptext = temptext.substring(text.length, temptext.length);
            }
            textheight += textfontsize * 4 / 3;
        }
		textheight+=2*cell._horMargin;
        this.setRowHeight(this._focusRow, textheight);
	}

    this.clear();
    this.paint();
    this.showEditbox();
}
DataGrid.prototype.setSlantLine = function(linetype) {
	
    for (i = this._sel_startRow; i <= this._sel_endRow; i++) {
        for (j = this._sel_startCol; j <= this._sel_endCol; j++) {
			if(Number(linetype) === 0 ){
				delete this._cells[i][j].slty;
				break;
			}else{
            	this._cells[i][j].slty = linetype;
			}
			var templist={"style":"0","widx":"1","color":"#000000"};
			var listid=T.array.InArray(templist,this._penlist);//查询ftid的值 若为false则 插入
			if(listid === false){
				if(this._penlist===undefined)this._penlist=[];
				this._penlist.push(templist);
				listid = String(this._penlist.length-1);	
			}
			this._cells[i][j].spenid= listid;
			//this._cells[i][j].slty = 0;
        }
    }
    //this._cells[this._focusRow][this._focusCol].autoLineFeed=!;
    this.clear();
    this.paint();
}
DataGrid.prototype.setCustomizeCell = function(type, value,rowindex,colindex) {
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			if (type === 'num') {
					 this.setCellAttribute(i,j,'uval',value);//自定义数值
			}
			if (type === 'string') {
					 this.setCellAttribute(i,j,'sval',value);//自定义字符值
			}
			if (type === 'name') {
					 this.setCellAttribute(i,j,'bname',value);//单元变量名
			}
		} 
	}
    this.clear();
    this.paint();
}
DataGrid.prototype.setCellAttribute=function(rowindex,colindex,key,value){
	
     this._cells[rowindex][colindex][key] = value;//自定义数值
}
DataGrid.prototype.setfrozenCell = function(value1, value2) {
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{ 	
			
			if (value1) {
				this._cells[i][j].fl&= ~(1 << 0); //;//保护状态
			}else {
				this._cells[i][j].fl|= 1 << 0; // 设置第x位为1 可编辑
			}
		}
	}   
    if (value2) {
        for (i = 0; i < this._rows.length; i++) {
            for (j = 0; j < this._cols.length; j++) {
                this._caneditform = "0";
            }
        }
    } else if (!value2 && !value1) {
               delete this._caneditform;
    }

    this.clear();
    this.paint();
}
DataGrid.prototype.putimgToCanvas = function(imgid,type) {
    this._backimage = imgid;
	if(type === 'canvas_origin'){
		this._tagval2|= 1 << 17;//设置为 图片原始大小
	}else if( type === 'canvas_canvas') {
		this._tagval2&= ~(1 << 17);//设置为 图片表格大小
	}
    //this._Backimage={"filename":"cheungmine.jpg","width":200,"height":150,"size":"origin"}
    this.clear();
    this.paint();
}
DataGrid.prototype.delCanvasImage = function() {
	if( this._backimage !== undefined)
    delete this._backimage;

    this.clear();
    this.paint();
}
DataGrid.prototype.setCanvasImage = function(type) {
    if (this._backimage !== undefined) {
        if(type ==='origin'){
			this._tagval2|= 1 << 17;//设置为 图片原始大小	
		}else if( type === 'canvas'){
			this._tagval2&= ~(1 << 17);//设置为 图片表格大小	
		}
    }
    this.clear();
    this.paint();
}
DataGrid.prototype.putimgToCell = function(image) {
	if(arguments[1]==='button'){
		var imagepos = Number(arguments[2]);
		var col = this._focusCol,row = this._focusRow;
		if(imagepos == 1){//下面
			row+=1;	
		}else if(imagepos === 2){//左边
			col-=1;
		}else if(imagepos === 3){//右边
			col+=1;
		}else if(imagepos === 4){//中间
				
		}else if(imagepos === 0){//上面
			row-=1;	
		}
		
		if(this._cells[row][col]!== undefined){
			this._cells[row][col].tag|=1 << 15;//图片按比例缩放显示
			this._cells[row][col].tag|=1 << 3;//表示有图片
			this._cells[row][col].cellImage = {
				"filename": image.imagedata,
				"width": image.imagewidth,
				"height": image.imageheight,
				"type": "cell",
				"size": "imgsize",
				'imagetype':image.imagetype,
				'length':image.imagelen
			};
		}else{
			alert('错误');	
		}
	}else{
		this._cells[this._focusRow][this._focusCol].cellImage = {
			"filename": image.imagedata,
			"width": image.imagewidth,
			"height": image.imageheight,
			"type": "cell",
			"size": "imgsize",
			'imagetype':image.imagetype,
			'length':image.imagelen
		};
		this._cells[this._focusRow][this._focusCol].tag|=1 << 3;//表示有图片
		this._cells[this._focusRow][this._focusCol].tag|=1 << 4;
	}
    this.clear();
    this.paint();
}
DataGrid.prototype.delCellImage = function() {
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			var cell = this._cells[i][j];
			if(cell.imgid !== undefined)
			delete this._cells[i][j].imgid;
			if(cell.imgangle !== undefined)
			delete this._cells[i][j].imgangle;
			
			this._cells[i][j].tag&= ~(1 << 3); 
			this._cells[i][j].tag&= ~(1 << 4); 
			this._cells[i][j].tag&= ~(1 << 15); 
		}
	}	
	
    this.clear();
    this.paint();
}
DataGrid.prototype.setCellImage = function(type) {
	var _this = this;
	var i,j;
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			var cell = this._cells[i][j];
			if(cell.cellImage!==undefined){
				if (type.turn != undefined && type.turn) {
					var angle = type.turn.angle;
					if(angle === undefined){
						angle=0;	
					}else{
						angle = parseInt(angle,10);	
					}
					if(type.turn.direction === 'right' && angle === 0){	
						angle = 90;				
					}
					
					var context = _gl_canvas2.getContext('2d');
					var rotate = (angle / 180) * Math.PI;
					_gl_canvas2.width = width;
					_gl_canvas2.height = height;
					var image = new Image();
					var imagetypearr =["image/bmp","image/jpeg","image/gif","image/png"];
					image.src='data:'+imagetypearr[cell.cellImage.imagetype-1]+';base64,'+cell.cellImage.filename;
					var w, h;
					delete this._cells[i][j].cellImage.filename;
					image.onload = function(i,j) {
					
						w =_gl_canvas2.width = image.width;
						h =_gl_canvas2.height = image.height;
						context.translate( w / 2, h / 2);
						context.rotate(rotate);
						context.drawImage(image, -w / 2, -h / 2, w, h);
						var data = _gl_canvas2.toDataURL();                     
						//删除字符串前的提示信息 "data:image/png;base64,"  
						var b64 = data.substring( 22 ); //v = w.substring(w.indexOf("base64,") + 7);
						//v = atob(w);
						_this._cells[i][j].cellImage.filename=b64;
						_this._cells[i][j].cellImage.imagetype =4;
						_this._cells[i][j].cellImage.length =b64.length*3/4;
						_this.paint();
					}(i,j)
					
				} else if (type.size != undefined && type.size) {
					if(type.size === "imgsize")
				  {
						this._cells[i][j].tag&= ~(1 << 3); 
						this._cells[i][j].tag&= ~(1 << 4); 
						this._cells[i][j].tag|=1 << 15;
				  }else if(type.size === "origin")  {//原始尺寸
						this._cells[i][j].tag&= ~(1 << 3); 
						this._cells[i][j].tag&= ~(1 << 15); 
						this._cells[i][j].tag|=1 << 4;
				   }else if(type.size === "cell")  {//单元大小
						this._cells[i][j].tag&= ~(1 << 4); 
						this._cells[i][j].tag&= ~(1 << 15); 
						this._cells[i][j].tag|=1 << 3;
				   }
				}
			}
		}
	}
}
DataGrid.prototype.setTableHead = function(type) {
    if (this._offsetX != 0||type==false) {
		this._showheader = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    } else {
		this._showheader = 1;
        this._offsetX = 40;
        this._offsetY = 20;
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.setSelLineAll = function(type) {
    
	if((this._tagvalue>>16)& 0x01){
		this._selLineAll.on= false;
		this._tagvalue&= ~(1 << 16);
	}else{
		this._selLineAll.on=true;
			
		this._tagvalue|=1 << 16; // 设置第x位为1
	}
	
	if(arguments[1]!==undefined)this._selLineAll.color=arguments[1];
    this.clear();
    this.paint();
}
DataGrid.prototype.delCanvasCol = function() {
    
	var startCol = this._sel_startCol,endCol = this._sel_endCol , nums = endCol - startCol +1;
	this._colsNum = Number(this._colsNum) - nums;
    if (this._cols.length !== 0) {
		this._cols.splice(startCol,nums);
    }
	
	for(var i=0;i < this._cells.length;i++)
	{
		this._cells[i].splice(startCol,nums);
	}
	this._focusCol-=1;
	this._sel_startCol-=1;
	this._sel_endCol -=1;
    this.clear();
    this.paint();
}
DataGrid.prototype.delCanvasRow = function() {
	var startRow = this._sel_startRow,endRow = this._sel_endRow , nums = endRow - startRow +1;
    this._rowsNum = Number(this._rowsNum) - nums;
    if (this._rows.length !== 0) {
        this._rows.splice(startRow,nums);
    }
	this._cells.splice(startRow,nums);
	this._focusRow-=1;
	this._sel_endRow=this._sel_startRow=this._sel_endRow-1;
    this.clear();
    this.paint();
}
DataGrid.prototype.insertColBefore = function() //在此列前方插入
{	
	var colMoveMount=this._sel_endCol-this._sel_startCol+1;//获得添加的列的数量
    this._colsNum = Number(this._colsNum) + colMoveMount;
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		colMoveMount = 1;	
	}
    if (this._cols.length == 0) {
        this._cols.length = 1;
    } else {
        this._cols.length = this._cols.length + colMoveMount;
    }
	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};

	}
    var j = column_statr=this._sel_startCol;
	
	var column= this._sel_endCol;
	
	var row=this._sel_startRow;
	var cell='',combineCellStartCoor={};
	
	for (var i = 0; i < this._rows.length; i++) {
        for (var k = this._cols.length - 1; k >= j; k--) {
			
            if (k-j<colMoveMount) {
                this._cells[i][k] = {};
            }else{
				this._cells[i][k] = Object.extend({},this._cells[i][k - colMoveMount]);
				if(this._cells[i][k].cols<0){
					
					this._cells[i][k].cols=this._cells[i][k].cols-colMoveMount;
				}
			}
        }
    }
	this._focusCol=this._sel_endCol=this._sel_startCol=column_statr;//校准合并单元格的起始单元格
   	this._focusRow=this._sel_startRow=this._sel_endRow=row;
	this.clear();
    this.paint();
	
}
DataGrid.prototype.insertFormatCol = function(firstcol,colMoveMount,startcol,endcol) {//插入格式化列
    var startcol=Number(startcol),endcol=Number(endcol);
	var colMoveMount=parseInt(colMoveMount,10);
    this._colsNum = Number(this._colsNum) + colMoveMount;
    if (this._cols.length == 0) {
        this._cols.length = 1;
    } else {
        this._cols.length = this._cols.length + colMoveMount;
    }
	
	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};

	}
   
    var j = firstcol-1;
   
    for (i = 0; i < this._rows.length; i++) {
        for (var k = this._cols.length - 1; k > j; k--) {
			
			if(k-j<=colMoveMount) {
				if(endcol-startcol+1>=colMoveMount){
					for(var fr=startcol+colMoveMount-2;fr>=startcol-1;fr--){
						if(k-j===fr-startcol+2){
							this._cells[i][k] = Object.extend({},this._cells[i][fr]);
						}
					}
				}else{
					var tempcol=(k-j)%(endcol-startcol+1)===0?(k-j):(k-j)%(endcol-startcol+1);
					tempcol-=1;
					this._cells[i][k] = Object.extend({},this._cells[i][tempcol]);
				}
            }else{
				this._cells[i][k] = Object.extend({},this._cells[i][k - colMoveMount]);
			}
        }
    }
	
    this.clear();
    this.paint();
}

DataGrid.prototype.insertColAfter = function() {//在此列后方插入
	
	var colMoveMount=this._sel_endCol-this._sel_startCol+1;//获得添加的列的数量
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		colMoveMount = 1;	
	}
	this._colsNum = Number(this._colsNum) + colMoveMount;
    if (this._cols.length == 0) {
        this._cols.length = 1;
    } else {
        this._cols.length = this._cols.length + colMoveMount;
    }
    
	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};

	}
    //this._cols.push({});
    var j = this._sel_endCol || this._focusCol;
    for (i = 0; i < this._rows.length; i++) {
        for (var k = this._cols.length - 1; k > j; k--) {
            if (k-j<colMoveMount+1) {
                this._cells[i][k] = {};
            }else{
            	this._cells[i][k] = Object.extend({},this._cells[i][k - colMoveMount]);
			}
        }
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.insertRowAfter = function() {//在此行下方插入行
	var rowMoveMount=this._sel_endRow-this._sel_startRow+1;//获得添加的列的数量
    this._rowsNum = Number(this._rowsNum) + rowMoveMount;
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		rowMoveMount = 1;	
	}
 if (this._rows.length == 0) {
        this._rows.length = 1;
    } else {
        this._rows.length = this._rows.length + rowMoveMount;
    }

	for(var i=this._rows.length - 1;i >= this._rows.length-rowMoveMount;i--){
	
		this._rows[i] = {};
		this._cells[i] = new Array();

	}
    //this._cols.push({});
    var j = this._sel_endRow || this._focusRow;

   
	
	var column= this._sel_endCol;
	var row=this._sel_endRow;
   
    for (i = 0; i < this._cols.length; i++) {
        for (var k = this._rows.length - 1; k > j; k--) {
			
			if(k-j<=rowMoveMount) {
                this._cells[k][i] = {};
            }else{
				this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
			}
        }
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.insertFormatRow = function(firstrow,rowMoveMount,startrow,endrow) {//插入格式化行
    var startrow=Number(startrow),endrow=Number(endrow);
	var rowMoveMount=parseInt(rowMoveMount,10);
    this._rowsNum = Number(this._rowsNum) + rowMoveMount;
    if (this._rows.length == 0) {
        this._rows.length = 1;
    } else {
        this._rows.length = this._rows.length + rowMoveMount;
    }
	
	for(var i=this._rows.length - 1;i >= this._rows.length-rowMoveMount;i--){
	
		this._rows[i] = {};
		this._cells[i] = new Array();

	}

    //this._cols.push({});
    var j = firstrow-1;
   
    for (i = 0; i < this._cols.length; i++) {
        for (var k = this._rows.length - 1; k > j; k--) {
			
			if(k-j<=rowMoveMount) {
				if(endrow-startrow+1>=rowMoveMount){
					for(var fr=startrow+rowMoveMount-2;fr>=startrow-1;fr--){
						if(k-j===fr-startrow+2){
							this._cells[k][i] = Object.extend({},this._cells[fr][i]);
						}
					}
				}else{
					

					var temprow=(k-j)%(endrow-startrow+1)===0?(k-j):(k-j)%(endrow-startrow+1);
					temprow-=1;
							this._cells[k][i] = Object.extend({},this._cells[temprow][i]);
				}
            }else{
				this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
			}
        }
    }
	
    this.clear();
    this.paint();
}
DataGrid.prototype.copyFormatRow = function(copysrow,copyerow,startrow,endrow) {//拷贝格式化行
	var startrow=Number(startrow),copysrow=Number(copysrow);
    if(endrow-startrow !== copyerow-copysrow){
		alert('拷贝行数和要拷贝行数不一致！');
		return false;	
	}
	for (i = 0; i < this._cols.length; i++) {

		for(var fr=copyerow-1;fr>=copysrow-1;fr--){
			this._cells[startrow+fr-copysrow][i] = Object.extend({},this._cells[fr][i]);
		}
	}
    this.clear();
    this.paint();
}

DataGrid.prototype.insertRowBefore = function() {//在此行上方插入行
	var rowMoveMount=this._sel_endRow-this._sel_startRow+1;//获得添加的列的数量
    this._rowsNum = Number(this._rowsNum) + rowMoveMount;
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		rowMoveMount = 1;	
	}
	if (this._rows.length == 0) {
        this._rows.length = 1;
    } else {
        this._rows.length = this._rows.length + rowMoveMount;
    }
	for(var i=this._rows.length - 1;i >= this._rows.length-rowMoveMount;i--){
	
		this._rows[i] = {};
		this._cells[i] = new Array();

	}
	
	var column= this._sel_startCol;
   
    var j = column_statr=this._sel_startRow;

    for (i = 0; i < this._cols.length; i++) {
        for (var k = this._rows.length - 1; k >= j; k--) {

            if (k-j<rowMoveMount) {
                this._cells[k][i] = {};
            }else{
            	this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
				if(this._cells[k][i].rows<0){
					this._cells[k][i].rows=this._cells[k][i].rows-rowMoveMount;
				}
			}
		}
    }
	this._focusCol=this._sel_endCol=this._sel_startCol=column;//校准合并单元格的起始单元格
   	this._focusRow=this._sel_startRow=this._sel_endRow=column_statr;
   
    this.clear();
    this.paint();
}
DataGrid.prototype.insertCellBefore = function() //活动单元下移
{	
   	var rowMoveMount=rowAddNums=this._sel_endRow-this._sel_startRow+1;//获得添加的列的数量
	var add_new_row=false;
    var j = this._sel_startRow;
    var jend = this._sel_endRow;
	

    var istart =istart_old= this._sel_startCol;
	var iend=this._sel_endCol , rstart = this._sel_startRow , rend = this._sel_endRow , cell;
	
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		rowMoveMount = 1;	
	}
	for(var ll=istart;ll<=iend;ll++)//判断要追加的行数
	{
		for (var k = this._rows.length - 1; k >this._rows.length - 1-rowMoveMount; k--) {
			if(!T.isEmptyObject(this._cells[k][ll])){//判断对象是否为空
				add_new_row=true;
				rowAddNums=rowAddNums-(this._rows.length-k)+1;
				break;		
			}	
		}
	}
	
	if(add_new_row){ //为true就插入   
		this._rowsNum = Number(this._rowsNum) + 1;
		if (this._rows.length == 0) {
			this._rows.length = 1;
		} else {
			this._rows.length = this._rows.length + rowAddNums;
		}

		for(var q=this._rows.length - 1;q >= this._rows.length-rowAddNums;q--){
		
			this._rows[q] = {};
			this._cells[q] = new Array();
			for(var l=0;l<this._cols.length;l++){
				this._cells[q][l]={};	
			}
	
		}
	} 
	var imun=0;
	for(var i=istart;i<=iend;i++)//替代的列数
	{	
	  for (var k = this._rows.length - 1; k >=j; k--) {//替代的行数
			  if(k-j<rowMoveMount){
				  this._cells[k][i]={};	
			  }else{
				  	if(this._cells[k - rowMoveMount][i].rows!=undefined&&(k - rowMoveMount)>jend){
						  var startxspan=this._cells[k - rowMoveMount][i].rows>0?k - rowMoveMount:this._cells[k - rowMoveMount][i].rows*-1;
						  var startyspan=this._cells[k - rowMoveMount][i].cols>0?i:this._cells[k - rowMoveMount][i].cols*-1;
						 
						  var xspan=this._cells[startxspan][startyspan].rows;
						  var yspan=this._cells[startxspan][startyspan].cols;
						  if(startyspan<istart||(startyspan+yspan-1)>iend){
						   for (var initc = startyspan; initc < startyspan + yspan; initc++) { //合并单元格的时候集体下移
							  for (var initr = startxspan; initr <= startxspan+xspan; initr++) {
								 this._cells[initr][initc].rows=null;
								 this._cells[initr][initc].cols=null;
							 }
							}
						  }
					}
					  this._cells[k][i] = Object.extend({},this._cells[k - rowMoveMount][i]);
	
					  if(this._cells[k][i].rows<0){
						  this._cells[k][i].rows=this._cells[k][i].rows-rowMoveMount;	
					  }
				  }
		  }
	}
    this.clear();
    this.paint();
}
DataGrid.prototype.insertCellAfter = function() //活动单元右移
{	
   	var colMoveMount=this._sel_endCol-this._sel_startCol+1;//获得添加的列的数量

    
    var j = this._sel_startCol;
    var jend = this._sel_endCol;
   
    var istart =istart_old= this._sel_startRow;
	var iend=this._sel_endRow;
	
	if(this.IscombineCell(this._sel_startRow,this._sel_startCol,this._sel_endRow,this._sel_endCol)){
		colMoveMount = 1;	
	}
	
	this._colsNum = Number(this._colsNum) + colMoveMount;
	if (this._cols.length == 0) {
		this._cols.length = 1;
	} else {
		this._cols.length = this._cols.length + colMoveMount;
	}

	for(var i=this._cols.length - 1;i >= this._cols.length-colMoveMount;i--){
		
		this._cols[i] = {};
		for(var kl=0;kl<=this._rows.length - 1;kl++){
			this._cells[kl][i]={};	
		}

	}

    for (var k=istart;k<=iend;k++) {//行区间
        for (var i = this._cols.length - 1; i >= j; i--) {
            if (i-j<colMoveMount) {
                this._cells[k][i] = {};
            }else{
				  	if(this._cells[k][i - colMoveMount].rows!=undefined&&(i - colMoveMount)>jend){
						  var startxspan=this._cells[k][i- colMoveMount].rows>0?k - colMoveMount:this._cells[k][i- colMoveMount].rows*-1;
						  var startyspan=this._cells[k][i- colMoveMount].cols>0?i:this._cells[k][i- colMoveMount].cols*-1;
						 
						  var xspan=this._cells[startxspan][startyspan].rows;
						  var yspan=this._cells[startxspan][startyspan].cols;
						  if(!(startxspan>=istart&&(startxspan+xspan-1)<=iend)){
						   for (var initc = startyspan; initc < startyspan + yspan; initc++) { //合并单元格的时候集体下移
							  for (var initr = startxspan; initr <= startxspan+xspan; initr++) {
								 this._cells[initr][initc].rows=null;
								 this._cells[initr][initc].cols=null;
								  }
							}
						  }
					}
					 this._cells[k][i] = Object.extend({},this._cells[k][i - colMoveMount]);
					  if(this._cells[k][i].cols<0){
						  this._cells[k][i].cols=this._cells[k][i].cols-colMoveMount;	
					  }
			}
        }
    }
    this.clear();
    this.paint();
}
DataGrid.prototype.saveCanvasToLocal = function() {
    var localStorageName = 'canvas_LocalData';
    if (typeof arguments[0] === 'string') {
        localStorageName = 'canvas_' + arguments[0];
    } else {
        localStorageName = this._localStorageName;
    }
	var clearObject=function(obj){
		var array=[];
		for(var i=0;i<obj.length;i++){
			if(!T.isEmptyObject(obj[i]))	array.push(obj[i]);
		}
		return array;
	};
	
    var canvasConfig = Object.extend({},this.config);
    var config = {
        localStorageName: localStorageName,
        textHeight: this._textHeight,
        rows: this._rows,//rowsobj,
        cols: this._cols,//colsobj,
        scrollRowNum: this._scrollRowNum,
        scrollColNum: this._scrollColNum,
        cells: this._cells,//cellsobj,
        netChartVisible: this._netChartVisible,
        Mousecursor: this._Mousecursor,
        Backimage: this._Backimage
    };
    Object.extend(canvasConfig, config);
	
    if(	typeof arguments[1] !== undefined &&arguments[1]==='export')//导出
	{
		exportXml(this);
		
		//submitData('exportCanvasXml.php',JSON.stringify(canvasConfig));
	}else{
		localStorage.setItem(localStorageName, JSON.stringify(canvasConfig));
	}

    this.clear();
    this.paint();
}
DataGrid.prototype.setCellControlsItem = function(config,rowindex,colindex) {//设置单元控件类型
	var i,j,cell;
	var gettime=function(time,type){
			
			switch(type)
			{
				case '1'	:
					return time.Y+'年'+time.M+"月"+time.D+"日";
				break;
				case '2':	
					return time.Y+'-'+time.M+"-"+time.D;
				break;
				case '3':
					return time.h+':'+time.zm+":"+time.s;	
				break;
				case '4':
					return time.Y+'-'+time.M+"-"+time.D+' '+time.h+':'+time.zm+":"+time.s;	
				break;
				case '5':
					return time.Y+'年'+time.M+"月"+time.ZD+"日";
				break;
				case '6':
					return time.Y+'-'+time.ZM+"-"+time.ZD;
				break;
			}
	}
	if(arguments[1]===undefined){
		for(i=this._sel_startRow;i<=this._sel_endRow;i++)
		{
			for(j=this._sel_startCol;j<=this._sel_endCol;j++)
			{
				cell=this._cells[i][j];
				this._cells[i][j].fl|=cell.fl|(1<<0);
				if(config.type==='radiobutton'){
					this._cells[i][j].fl=cell.fl|(1<<10);//fl 10单选框
					var startcoor = this.getCellLeftTopCoor(i,j);
					this._cells[i][j].cellcheck={ckd:false,noedit:config.noedit,x:startcoor.x,y:startcoor.y};
					
				}else if(config.type==='dropdownbox'){
					this._cells[i][j].fl=cell.fl|(1<<12);//fl 10单选框
					this._cells[i][j].clco = {tagval:config.tagval,childs:config.value};
				}else if(config.type==='time'){//日期时间类型
					this._cells[i][j].fl=cell.fl|(1<<13);//fl 13时间控件
					 if(!/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/.test(cell.t)){
						var now=new Date(); 
					}else{
						var now=new Date(cell.t);	
					}
					now=DateFormat.parseTime(now);
					this._cells[i][j].t=gettime(now,config.value);
					this._cells[i][j].cldt = {dwstyle:config.value, year:now.Y, mon:now.M,
					 day:now.D, hour:now.h,
					  min:now.m,sec:now.s};
				}else if(config.type==='url'){
					this._cells[i][j].fl=cell.fl|(1<<11);//fl 11超级链接
					this._cells[i][j].cellurl={"url":config.value,"newwin":config.newwin};	
				}else if(config.type === 'number'){
					this._cells[i][j].fl=cell.fl|(1<<9);//fl 9数字
				}else if(config.type === 'financialhead'){//设置财务表头
					this._cells[i][j].tag=cell.tag|(1<<0);//tag 0
				}else if(config.type==='financialmain'){//设置财务表览
					this._cells[i][j].fl=cell.fl|(1<<15);//fl 15	
				}
				
			}
		}
	}else{
		
		cell=this._cells[rowindex][colindex];
		this._cells[i][j].fl|=cell.fl|(1<<0);
		if(config.type==='radiobutton'){
			this._cells[rowindex][colindex].fl=cell.fl|(1<<10);//fl 10单选框
			this._cells[rowindex][colindex].cellcheck={ckd:false,noedit:config.noedit};
			var startcoor = this.getCellLeftTopCoor(rowindex,colindex);
			config.x=startcoor.x;
			config.y=startcoor.y;//+(height-12)/2-4;
		}else if(config.type==='dropdownbox'){
			this._cells[rowindex][colindex].fl=cell.fl|(1<<12);//fl 10单选框
			this._cells[rowindex][colindex].dropdownbox = {tagval:config.tagval,childs:config.value};
		}
	}
	this.clear();
	this.paint();

}
DataGrid.prototype.delCellControlsItem=function(){
	var rowindex,colindex;
	for(rowindex=this._sel_startRow;rowindex<=this._sel_endRow;rowindex++)
	{
		for(colindex=this._sel_startCol;colindex<=this._sel_endCol;colindex++)
		{
			var cell=this._cells[rowindex][colindex];
			if(cell.cellcheck !== undefined){
				delete 	this._cells[rowindex][colindex].cellcheck;
				this._cells[rowindex][colindex].fl&= ~(1 << 10); ;
			}
			if(cell.dropdownbox !== undefined){
				delete 	this._cells[rowindex][colindex].dropdownbox;
				this._cells[rowindex][colindex].fl&= ~(1 << 12); ;
			}
		
			if(cell.cldt !== undefined){
				delete this._cells[rowindex][colindex].cldt;
				this._cells[rowindex][colindex].fl&= ~(1 << 13);
				delete this._cells[i][j].t;
			}
			if(cell.cellurl !== undefined){
				delete 	this._cells[rowindex][colindex].cellurl;
				this._cells[rowindex][colindex].fl&= ~(1 << 11);
			}
			if((cell._fl >> 9) & 0x01) this._cells[rowindex][colindex].fl&= ~(1 << 9);
			
			if((cell._tag >> 0) & 0x01) this._cells[rowindex][colindex].tag&= ~(1 << 0);
			
			if((cell._fl >> 15) & 0x01) this._cells[rowindex][colindex].fl&= ~(1 << 15);
			
			if(cell.cellbutton !== undefined){
				delete 	this._cells[rowindex][colindex].cellurl;
				this._cells[rowindex][colindex].cellurl.tagval&= ~(1 << 1);
			}
		}
	}
}
DataGrid.prototype.paintCellControlsDropdownbox=function(value,x,y,width,focusRow,focusCol)
{
	 
	if(!document.getElementById("showbox")){
			var child=value.childs;
			if(child !== undefined){		
				var _this=this;
				var left = 224;
				var top=document.getElementById("canvas").offsetTop;
				var startcoor = this.getCellLeftTopCoor(this._sel_startRow,this._sel_startCol);
		
			var box = document.createElement("ul");
				box.className='select_abs';

				for(var i=0;i < child.length;i++)
				{	
					var livalue=child[i].key;
					var option=document.createElement('li');
					option['data-name']=child[i].value;
					option.innerHTML=child[i].key;
					option.onclick=function(_this,livalue){
						return function(){
							_this.setCellValue(focusRow,focusCol,livalue);	
							_this.clear();
							_this.paint();
							clearCeng("showbox");	
						}
					}(_this,livalue);
					box.appendChild(option);	
				}
				
				box.style.textAlign = 'left';
				box.id = 'showbox';
				box.style.width='auto';
				box.style.paddingRight='10px';
				box.style.position = 'absolute';
				box.style.left =left+x + 'px';
				box.style.top =top+y +22+ 'px';
				document.body.appendChild(box);
				preventDefault(event);

			}
	}
}
DataGrid.prototype.paintCellControlsRadiobuttonHook=function(x,y)
{
	 var controlsConfig=this._cells[this._focusRow][this._focusCol].cellcheck;
	 if(controlsConfig!==undefined){
		 if(controlsConfig.ckd==='0'){
			this._cells[this._focusRow][this._focusCol].cellcheck.ckd='1';
		}else{
			this._cells[this._focusRow][this._focusCol].cellcheck.ckd='0';
		}
	  }
}
DataGrid.prototype.paintCellControlsItem=function(dc,cell,config,x,y,width,height)
{	
	if(cell._cellcheck!==undefined){
		 dc.save();
		 if(cell._cellcheck.ckd==='1')
		 {	
		 	 var config = cell._cellcheck;
		 	 var radioy=y+(height-12)/2;
			 dc.lineWidth=2;
			 dc.strokeStyle="#000000";
			 dc.beginPath();
			 dc.moveTo(config.x+1,radioy+4);
			 dc.lineTo(config.x+6,radioy+9);
			 dc.lineTo(config.x+11,radioy+1);
			 dc.stroke();
			 dc.closePath();
		 }
		 dc.restore();
	  }else if(config==='dropdownbox')
	  {	
		 dc.save();
		 dc.lineWidth=1;
		 dc.strokeStyle="#000000";
		 dc.strokeRect(x+width-22,y,20,20);
		 dc.fillStyle="#EFEBDE";
		 dc.fillRect(x+width-21,y+1,18,18);
		// 填充三角形
		 dc.beginPath();
		 dc.fillStyle="#000";
		 dc.moveTo(x+width-16,y+8);
		 dc.lineTo(x+width-12,y+15);
		 dc.lineTo(x+width-8,y+8);
		 dc.fill();
		 dc.closePath();	
		 dc.restore();
	  }else if(config==='url')
	  {	
	  	 
		 
		 //this._cells[this._focusRow][this._focusCol].fontColor='#4888eb';
		// cell.fontColor='#4888eb';
	 }else if(config ==='button'){
		dc.save();
		var button =cell._cellbutton,color=[];
		if(Number(button.seltype)===3 && button.imgid!==undefined){
			
			var temp =this._imglist[button.imgid-1];
			var image = new Image();
				image.src = temp.src;
				
				if(button.buttonimgype==='1'){
					dc.drawImage(image, x, y-height, 20, 20);
				}else if(button.buttonimgype==='2'){//下面
					
					dc.drawImage(image, x, y+height, 20, 20);
				
				}else if(button.buttonimgype==='3'){//左边
					dc.drawImage(image, x-20, y, 20, 20);
				}else if(button.buttonimgype==='4'){//右边
					dc.drawImage(image, x+width, y, 20, 20);
				}else if(button.buttonimgype==='5'){//中间
					var img={};
					img.size='imgsize';
					img.width=temp.width;
					img.height=temp.height;
					this.paintCellImage(dc, cell, x, y, width, height, img, image);
				}
	
		}
		if(button.buttonimgype!=='5'){
			switch (button.selstyle){
				case '1':
					color=['#fff','#B1D1E8','#C6EAFF','#AFD1EA'];
					break;
				case '2':
					color=['#64d9ff','#2daaff','#24b2fe','#0976ae'];
					break;
				case '3':
					color=['#FFA73D','#E97305','#E47309','#FF9B3D'];
					break;
				case '4':
					color=['#E0F1A1','#BFE142','#D7EC85','#BCD265'];//绿黄
					break;
				case '5':
					color=['#F79B6C','#F88245','#EA5505','#CC2B00'];
					break;
			}
			
			var myGradient = dc.createLinearGradient(x+3, y+3, x+3,y+height-6);
				myGradient.addColorStop(0, color[0]);//'#0698E3');
				myGradient.addColorStop(1, color[1]);//'#10AAEA');
			dc.fillStyle = myGradient;
			dc.fillRect(x+3,y+3,width-6,height-6);
			
			// 从白色到黑色的渐变，并指定给边框色
			var gradient = dc.createLinearGradient(x+2, y+2, x+2, y+height-4);
			gradient.addColorStop(0, color[2]);
			gradient.addColorStop(1, color[3]);
			dc.lineWidth=2;
			dc.strokeStyle = gradient;
			dc.strokeRect(x+2, y+2, width-4, height-4);
		}
			dc.restore();	
		if(button.seltype === '3'){
			var ftlist= this._ftlist;
			var textfontsize= cell.getFontSize(ftlist);
			var textlength = dc.measureText('上传图片').width;
			var textx = x + (width - textlength) / 2;
			dc.fillText( '上传图片', textx, y + (height + textfontsize)/2);
		}

	 }else if(config==='financialhead')//设置财务表头
	 {
		var fontSize=cell.getFontSize(this._ftlist);
		dc.fillStyle = cell.getBackColor(this._brlist) || '#fff';
		dc.fillRect(x + 1, y + 1, width - 2, height - 2);
		var financial='亿|千|百|十|万|千|百|十|元|角|分';
		var textss = financial.split("|");
		var textx=x+width,texty= y + (height +fontSize) / 2;;
		
		dc.save();		
		
		/*遮罩区域*/
		dc.beginPath();
		dc.strokeStyle = "transparent";
		dc.rect(x,y,width,height);
		dc.clip();
		dc.stroke(); 
		dc.closePath();
		/*遮罩区域*/	
		dc.font="14px sans-serif";
		dc.fillStyle='#000';
		dc.strokeStyle='#000080';
		for (var i = 0; i < textss.length; i++) {
			var text = textss[textss.length-1-i];		
			var textwidth=20.90;//dc.measureText(text).width;

			dc.fillText(text,textx-textwidth*(i+1)+3.5, texty);
			
			
			if(i===2){
				dc.strokeStyle='#FF0000';
			}else{
			dc.strokeStyle='#000080';
			}
			if(i===5||i===8||i===2){dc.lineWidth=2;
			}else{dc.lineWidth=1;}
			
			if(width-textwidth*i>0&&i>0)
			{
				dc.beginPath();
				dc.moveTo(x+width-textwidth*i, y);
				dc.lineTo(x +width-textwidth*i, y + height);
				dc.stroke();
				dc.closePath();
			}
			
		}
		dc.restore();
	}else if(config==='financialmain')//设置财务表览
	 {	var textss='';
		 var fontSize=cell.getFontSize(this._ftlist);
		//dc.fillStyle = cell._backColor;
		//dc.fillRect(x + 1, y + 1, width - 2, height - 2);
		var textss=cell._t;
		if(cell._t === undefined){textss='';}
		if(cell._t === '@公式'){textss='000';}
		
		textss = String(textss);
		
		
		if(textss.indexOf('.')!==-1){
			var pos=textss.indexOf('.');
			var str=textss.substring(pos);
			if(pos===0)textss='0'+textss;
			if(str.length<3){
				textss=textss+T.string.repeat("0",3-str.length);
			}else if(str.length>3)
			{	
				textss=textss.substring(0,pos+3);
				
			}
			
			textss=textss.replace(".",'');	
		}else if(textss!=='' &&textss!=='000' ){
			textss=textss+T.string.repeat("0",2);	
		}else if(textss===''){
			textss=T.string.repeat("0",3);	
		}
		
		if(cell._note !== 'none' && cell._t==='')textss='';
		
		var textx=x+width,texty= y + (height + fontSize) / 2;;
		
		dc.save();

		/*遮罩区域*/
		dc.beginPath();
		dc.strokeStyle = "transparent";
		dc.rect(x,y,width,height);
		dc.clip();
		dc.stroke(); 
		dc.closePath();
		/*遮罩区域*/	
		dc.fillStyle='#000';
		dc.strokeStyle='#000080';
		var length=textss.length;
		if(length<11)length=11;
		
		var textwidth=20.90;//14;
		for (var i = 0; i < length; i++) {
			
			if(textss!==undefined&&textss!==''){
				var text = textss[textss.length-1-i];
				if(text!==undefined)	{	
				dc.fillText(text,textx-textwidth*(i+1)+3.5, texty);
				}
			}
			
			if(i===2){
				dc.strokeStyle='#FF0000';
			}else{dc.strokeStyle='#000080';}
			if(i===5||i===8||i===2){dc.lineWidth=2;}else{dc.lineWidth=1;}
			
			if(width-i*textwidth>0&&i>0)
			{
				dc.beginPath();
				dc.moveTo(x+width-textwidth*i, y);
				dc.lineTo(x +width-textwidth*i, y + height);
				dc.stroke();
				dc.closePath();
			}
			
		}
		dc.restore();
	}
}
DataGrid.prototype.paintCell3Dshape=function(dc,cell,x,y,width,height)
{	
	dc.save();
	var myGradient = dc.createLinearGradient(x+3, y+3, x+3,y+height-6);
		myGradient.addColorStop(0, '#64d9ff');//'#0698E3');
		myGradient.addColorStop(1, '#2daaff');//'#10AAEA');
	dc.fillStyle = myGradient;
	dc.fillRect(x+3,y+3,width-6,height-6);
	
	// 从白色到黑色的渐变，并指定给边框色
    var gradient = dc.createLinearGradient(x+2, y+2, x+2, y+height-4);
    gradient.addColorStop(0, '#24b2fe');
    gradient.addColorStop(1, '#0976ae');
	dc.lineWidth=2;
    dc.strokeStyle = gradient;
    dc.strokeRect(x+2, y+2, width-4, height-4);
	dc.restore();	
		
}
DataGrid.prototype.paintGradientColor=function(dc,cell,x,y,width,height)
{	
	dc.save();
	var startcolor=T.color.getcolorFromByte(cell._bkmidcr);
	var endcolor=T.color.getcolorFromByte(cell._bkendcr);
	
	var myGradient = dc.createLinearGradient(x+1, y+1, x+1,y+height-1);
		myGradient.addColorStop(0, startcolor);//'#0698E3');
		myGradient.addColorStop(1, endcolor);//'#10AAEA');
	dc.fillStyle = myGradient;
	dc.fillRect(x+1,y+1,width-2,height-2);
	
	dc.restore();	
		
}


DataGrid.prototype.savecellCustomScript=function(value)
{
	 
	this._cells[this._focusRow][this._focusCol].note=value;
	this.clear();
	this.paint();
}
DataGrid.prototype.setSelCellTag=function(value)
{
	var i,j; 
	for(i=this._sel_startRow;i<=this._sel_endRow;i++)
	{
		for(j=this._sel_startCol;j<=this._sel_endCol;j++)
		{
			if(value.cellnumber!==undefined){
				this._cells[i][j].flex|= 1 << 4; // 设置第x位为1
				
				this._cells[i][j].lscript="<d><col>"+value.pianyil+"</col><row>"
				+value.pianyih+"</row><type>"+value.type+"</type><rule>"
				+value.rule+"</rule><sf>"+value.format+"</sf></d>";
					
			}else{
				this._cells[i][j].cellTag = value;
			}
		}
	}
	this.clear();
	this.paint();

}
DataGrid.prototype.setCellTag=function(rowindex,colindex,value)
{
	this._cells[rowindex][colindex].cellTag = value;
	this.clear();
	this.paint();

}

DataGrid.prototype.saveStatisticscript=function(value)
{
	 
	this._StatisticScript=value;
	this.clear();
	this.paint();
}
DataGrid.prototype.selFocusCellValue=function(value)
{
	this._cells[this._focusRow][this._focusCol].t=value;
	this.clear();
	this.paint();
}
DataGrid.prototype.importxml=function(file){
	
	var box = T.html.loading(800,540,228,48,document.getElementById("mainleft"));
	
	clearCeng('htmlcell');
	clearCeng('showbox');
	clearCeng('drawobjs');
	clearCeng('drawobj','class');
	_gl_canvas.style.display='block';
	delete this._rows;
	delete this._cols;
	this._sel_startRow=this._sel_startCol=this._sel_endRow=this._sel_endCol=this._focusRow=this._focusCol=0;

	var ss=/(html\/)?upload\/((.+)(\.xjc)?(\.js)?)/g.test(file);
	var filename = RegExp.$2;
	
	if(filename.indexOf('.xjc')===-1)filename+='.xjc';
	var _this =this;
	var mainport=function(getjson){
			var _this =this;
			var json=eval('(' + getjson + ')');
			this.openJson(json);
			this.clear();
			this.paint();
			this._parent._comItems[1].paint();
			this._parent._comItems[2].paint();			
			if(this._designmode!==undefined){
				try{
					var _drawobj = new drawObjs(this,this._chartattribute);
				}catch(e){
					alert(e);
				}
			}
	}
		
	if (localStorage.getItem(filename) && localStorage.getItem(filename)!=='undefined') {
		getjson = localStorage.getItem(filename);
		T.glproxy(mainport,this)(getjson);
		clearCeng(box);
	}else{
		var getjson = T.ajax.ajaxGet("html/lib/process_upload.php?type=getjson&filename="+encodeURIComponent(filename),false,true,

			function(getjson){
				mainport.call(_this,getjson);
				localStorage.setItem(filename, getjson);
				clearCeng(box);
			}
		);
		
	}
	_gl_filename = filename;

}
DataGrid.prototype.reDrawChart=function(){
	var left = 224;
	var top=document.getElementById("cvs").offsetTop;
	var box = document.createElement("div");
	
	box.className='loading';
	box.style.width="800px";
	box.style.height="548px";
	box.style.zIndex="100";
	box.style.position = 'absolute';
	box.style.left =left+ 'px';
    box.style.top =top+'px';
	document.body.insertBefore(box, document.getElementById("mainleft"));
	var mainimport = function(){
			
				if(this._designmode!==undefined){
					var _drawobj = new drawObjs(this,this._chartattribute);
				}

		
		clearCeng(box);
	};

	setTimeout(
		T.glproxy(mainimport,this)
	,0);
}
DataGrid.prototype.setCellRule=function(rule,x,y){
		var cellrule=rule;
		var pos=this.getRowColByCoor(x,y);
		//<d><col>0</col><row>3</row><type>2</type><sf>@row</sf></d> 
		
		
		var xmldom = null;
		
        try {
            xmldom = T.xml.parseXml(cellrule);
        } catch(ex) {
            alert(ex.message);
        }
		
		var pianyih = T.xml.gXmlPrototype(xmldom,"row");
		var pianyil = T.xml.gXmlPrototype(xmldom,"col");
		var celltype = T.xml.gXmlPrototype(xmldom,"type");
		var format  =  T.xml.gXmlPrototype(xmldom,"sf");
		if(typeof(celltype) != "number") celltype=parseInt(celltype,10);
		
		var getPrototype=function(type){
			var tempvalue='';
			if(type==='row'){
				tempvalue=pos.row+2-pianyih;
			}else if(type==='col'){
				tempvalue=pos.col+2-pianyil;
			}
			if(celltype===2){//一，二，三...
				
				tempvalue=this.Chinese_num(tempvalue,'xx');
			
			}else if(celltype===3){//a,b,c...
				tempvalue=this.numTochart(tempvalue,'xx');
			
			}else if(celltype===4){//A,B,C...
				tempvalue=this.numTochart(tempvalue,'dx');
			
			}else if(celltype===5){//小写单元名称
				
				tempvalue=this.numTochart(pos.col+2-pianyil,'xx')+tempvalue;
			
			}else if(celltype===6){//大写单元名称
				
				tempvalue=this.numTochart(pos.col+2-pianyil,'dx')+tempvalue;
			}
			return tempvalue;	
		}
		//type===1 1,2,3...
		
		if(format.indexOf("@row")!==-1){
			format=format.replace(/@row/g,getPrototype.call(this,"row"));
		}
		if(format.indexOf("@col")!==-1){
			format=format.replace(/@col/g,getPrototype.call(this,"col"));
		}
		
		return format;
}
// JavaScript Document
function DataCell(config)
{	
	
	if(config.t !== undefined){//单元文本内容。
		this._t = config.t;	
	}

	if(config.backColor != undefined)
	{
		this._backColor = config.backColor;
	}
	else 
	{
		this._backColor = "#fff";
	}
	if(config.col != undefined)
	{   
	    this._col = config.col;
	}
	
	if(config.fontSize != undefined)
	{   
	    this._fontSize = config.fontSize;
	}
	else
	{
	    this._fontSize = 12;
	}
	if(config.fontFamily != undefined)
	{
		this._fontFamily = config.fontFamily;
	}
	else
	{
		this._fontFamily = "宋体";
	}
	if(config.fontColor!= undefined)
	{
		this._fontColor = config.fontColor;
	}
	else
	{
		this._fontColor = "#000";
	}
	if(config.fontBold != undefined)
	{
		this._fontBold = config.fontBold;
	}
	else
	{
		this._fontBold = false;
	}
	if(config.fontItalic!= undefined)
	{
		this._fontItalic = config.fontItalic;
	}
	else
	{
		this._fontItalic = false;
	}
	if(config.fontUnderline!= undefined)
	{
		this._fontUnderline = config.fontUnderline;
	}
	else
	{
		this._fontUnderline = false;
	}
	if(config.autoLineFeed!= undefined)
	{
		this._autoLineFeed = config.autoLineFeed;
	}
	else
	{
		this._autoLineFeed = false;
	}
	
	if(config.textFormat!= undefined)
	{
		this._textFormat= config.textFormat;
	}
	else
	{
		this._textFormat={'format':'default','weishu':'2','nby':'0'};
	}
	if(config.frozenCell!= undefined)
	{
		this._frozenCell= config.frozenCell;
	}
	else
	{
		this._frozenCell=false;
	}
	if(config.frozenCellAll!= undefined)
	{
		this._frozenCellAll= config.frozenCellAll;
	}
	else
	{
		this._frozenCellAll=false;
	}

	if(config.customizeCell!= undefined)
	{
		this._customizeCell= config.customizeCell;
	}
	else
	{
		this._customizeCell=[];//num,string,name
	}
	if(config.textAlign!= undefined)
	{
		this._textAlign = config.textAlign;
	}
	else
	{
		this._textAlign = "left";
	}
	if(config.horMargin!= undefined)
	{
		this._horMargin = config.horMargin;
	}
	else
	{
		this._horMargin = 5;//文字水平内左边距
	}
	if(config.verAlign!= undefined)
	{
		this._verAlign = config.verAlign;
	}
	else
	{
		this._verAlign = "default";
	}
	if(config.verMargin != undefined)
	{
		this._verMargin = config.verMargin;
	}
	else
	{
		this._verMargin = 5;//文字水平内上边距
	}
	if(config.leftNetLine != undefined)
	{
		this._leftNetLine = config.leftNetLine;
	}
	else
	{
		this._leftNetLine = true;
	}
	if(config.rightNetLine != undefined)
	{
		this._rightNetLine = this.rightNetLine ;
	}
	else
	{
		this._rightNetLine = true;
	}
	
	if(config.borderTopStyle!= undefined)
	{
		this._borderTopStyle = config.borderTopStyle;
	}
	else
	{
		this._borderTopStyle = "default";
	}
	
	if(config.borderTopColor!= undefined)
	{
		this._borderTopColor = config.borderTopColor;
	}
	else
	{
		this._borderTopColor = "#000";
	}
	if(config.borderTopWidth!= undefined)
	{
		this._borderTopWidth = config.borderTopWidth;
	}
	else
	{
		this._borderTopWidth = 0;
	}
	if(config.borderRightStyle!= undefined)
	{
		this._borderRightStyle = config.borderRightStyle;
	}
	else
	{
		this._borderRightStyle = "default";
	}
	if(config.borderRightWidth!= undefined)
	{
		this._borderRightWidth = config.borderRightWidth;
	}
	else
	{
		this._borderRightWidth = 0;
	}
	if(config.borderRightColor!= undefined)
	{
		this._borderRightColor = config.borderRightColor;
	}
	else
	{
		this._borderRightColor = "#000";
	}
	if(config.borderBottomStyle!= undefined)
	{
		this._borderBottomStyle = config.borderBottomStyle;
	}
	else
	{
		this._borderBottomStyle = "default";
	}
	if(config.borderBottomWidth!= undefined)
	{
		this._borderBottomWidth = config.borderBottomWidth;
	}
	else
	{
		this._borderBottomWidth = 0;
	}
	if(config.borderBottomColor!= undefined)
	{
		this._borderBottomColor = config.borderBottomColor;
	}
	else
	{
		this._borderBottomColor = "#000";
	}
	if(config.borderLeftStyle!= undefined)
	{
		this._borderLeftStyle = config.borderLeftStyle;
	}
	else
	{
		this._borderLeftStyle = "default";
	}
	if(config.borderLeftWidth!= undefined)
	{
		this._borderLeftWidth = config.borderLeftWidth;
	}
	else
	{
		this._borderLeftWidth = 0;
	}
	if(config.borderLeftColor!= undefined)
	{
		this._borderLeftColor = config.borderLeftColor;
	}
	else
	{
		this._borderLeftColor = "#000";
	}
	if(config.rowspan!= undefined)
	{
		this._rowspan = config.rowspan;
	}
	else
	{
		this._rowspan = 0;
	}
	if(config.colspan!= undefined)
	{
		this._colspan = config.colspan;
	}
	else
	{
		this._colspan = 0;
	}

	if(config.borderline!= undefined)
	{
		this._borderline = config.borderline;
	}
	else
	{
		this._borderline = 'none';
	}
//	if(config.borderlineStyle!==undefined)
//	{
//		this._borderlineStyle = config.borderlineStyle;
//	}
//	else
//	{
//		this._borderlineStyle = [
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1},
//		{color:"#000000",style:"solod","width":1}
//		];
//	}
	if(config.slantLine!= undefined)
	{
		this._slantline = config.slantLine;
	}
	else
	{
		this._slantLine = "none";
	}
	if(config.cellImage!= undefined)
	{
		this._cellImage= config.cellImage;
	}
	else
	{
		this._cellImage = "none";
	}
	if(config.backImage!= undefined)
	{
		this._backImage = config.backImage;
	}
	else
	{
		this._backImage = "";
	}
	if(config.backImageScaleType!= undefined)
	{
		this._backImageScaleType = config.backImageScaleType;
	}
	else
	{
		this._backImageScaleTyoe = "default";
	}
	if(config.textWidth!= undefined)
	{
		this._textwidth = config.textWidth;
	}
	else
	{
		this._textwidth = "default";
	}	
	if(config.controlsItem!= undefined)
	{
		this._controlsItem = config.controlsItem;
	}
	else
	{
		this._controlsItem = "none";
	}
	if(config.customScript!= undefined)
	{
		this._customScript = config.customScript;
	}
	else
	{
		this._customScript = "none";
	}
	if(config.note!==undefined){
		this._note = config.note;
	}else{
		this._note = "none";
	}
	if(config.tip!==undefined){
		this._tip = config.tip;
	}else{
		this._tip= "none";
	}
	if(config.numberOnly!==undefined){
		this._numberOnly = config.numberOnly;
	}else{
		this._numberOnly= false;
	}
	if(config.numberOnly!==undefined){
		this._numberOnly = config.numberOnly;
	}else{
		this._numberOnly= false;
	}
	if(config.cellTag!==undefined){
		this._cellTag = config.cellTag;
	}else{
		this._cellTag= {"superscript":false};
	}
	if(config.visible!==undefined){
		this._visible = config.visible;	
	}else{
		this._visible = true;
	}
	if(config.fl!==undefined){
		this._fl = config.fl;	
	}else{
		this._fl = '';
	}
	if(config.tag!==undefined){
		this._tag = config.tag;	
	}else{
		this._tag = '';
	}
	if(config.flex!==undefined){
		this._flex = config.flex;	
	}else{
		this._flex = '';
	}
	if(config.brid!==undefined){//在单元背景色对象列表的索引号
		this._brid = config.brid;	
	}
	if(config.dpt!==undefined){//表示单元的数字小数位显示为1位，如果此项没有，则表示单元小数位显示为2位
		this._dpt = config.dpt;	
	}
	if(config.ftid!==undefined){//字体索引号
		this._ftid = config.ftid;	
	}
	if(config.tpenid!==undefined){//框线的对象类型的索引号
		this._tpenid = config.tpenid;	
	}
	if(config.bpenid!==undefined){//框线的对象类型的索引号
		this._bpenid = config.bpenid;	
	}
	if(config.lpenid!==undefined){//框线的对象类型的索引号
		this._lpenid = config.lpenid;	
	}
	if(config.rpenid!==undefined){//框线的对象类型的索引号
		this._rpenid = config.rpenid;	
	}
	if(config.hag!==undefined){//6表示单元文本的水平对齐方式是居中齐方式。0表示水平对齐方式是居左，2表示水平对齐方式
		this._hag = config.hag;	
	}
	if(config.vag!==undefined){//0表示单元文本的垂直对齐方式是居左6表示垂直对齐方式是居中，8表示垂直对齐方式是居下。
		this._vag= config.vag;	
	}
	if(config.swty!==undefined){//框线的对象类型的索引号
		this._swty = config.swty;	
	}
	if(config.spenid!==undefined){//斜线的对象类型的索引号
		this._spenid = config.spenid;	
	}
	if(config.tcor!==undefined){//表示单元文本的颜色
		this._tcor = config.tcor;	
	}	
	if(config.bcor!==undefined){//表示单元背景颜色
		this._bcor = config.bcor;	
	}	
	if(config.slty!==undefined){//单元斜线类型
		this._slty = config.slty;	
	}	
	if(config.bname!==undefined){//单元变量名
		this._bname = config.bname;	
	}	
	if(config.f!==undefined){//单元公式。
		this._f= config.f;	
	}	
	if(config.rows!==undefined){//组合单元的行数-1，如果为0，表示组合单元只有一行。
		this._rows = config.rows;	
	}	
	if(config.cols!==undefined){//组合单元的列数-1
		this._cols = config.cols;	
	}	
	if(config.imgid!==undefined){//组合单元的列数-1
		this._imgid = config.imgid;	
	}
	if(config.imgangle!==undefined){//组合单元的列数-1
		this._imgangle = config.imgangle;	
	}	

	if(config.uval!==undefined){//自定义数值，，缺省为0
		this._uval= config.uval;	
	}	
	if(config.sval!==undefined){//自定义字符值
		this._sval = config.sval;	
	}	
	if(config.tspan!==undefined){//单元文字上间距
		this._tspan = config.tspan;	
	}	
	if(config.lspan!==undefined){//单元文字左间距
		this._lspan = config.lspan;	
	}	
	if(config.lkspan!==undefined){//单元文字缩进字符个数
		this._lkspan = config.lkspan;	
	}	
	if(config.rspan!==undefined){//单元文字右间距
		this._rspan = config.rspan;	
	}	
	if(config.bspan!==undefined){//单元文字下边距
		this._bspan = config.bspan;	
	}	
	if(config.rowspan!==undefined){//单元文字行间距
		this._rowspan = config.rowspan;	
	}	
	if(config.colspan!==undefined){//单元文字列间距
		this._colspan = config.colspan;	
	}	
	if(config.note!==undefined){//单元字段定义脚本
		this._note = config.note;	
	}	
	if(config.lscript!==undefined){//数据动态绑定单元文字颜色、背景色定义
		this._lscript = config.lscript;	
	}	
	if(config.lexcel!==undefined){//日期时间格式定义
		this._lexcel = config.lexcel;	
	}	
	if(config.ldata!==undefined){//单元数据定义脚本
		this._ldata = config.ldata;	
	}	
	if(config.cmscript!==undefined){//单元内容修改之后运行的脚本
		this._cmscript = config.cmscript;	
	}	
	if(config.input!==undefined){//单元最大的输入字符个数，缺省为-1，表示不限制个数
		this._input = config.input;	
	}	
	if(config.tip!==undefined){//单元提示
		this._tip = config.tip;	
	}
	if(config.barcode!==undefined){//单元条形码类型
		this._barcode = config.barcode;	
	}	
	if(config.bkeffect!==undefined){//当单元类型是特殊背景颜色时的背景效果
		this._bkeffect = config.bkeffect;	
	}	
	if(config.bkgranularity!==undefined){//当单元类型是特殊背景颜色时的颜色粒度
		this._bkgranularity = config.bkgranularity;	
	}	
	if(config.bkmidcr!==undefined){//当单元类型是特殊背景颜色时的中间背景颜色
		this._bkmidcr = config.bkmidcr;	
	}	
	if(config.bkendcr!==undefined){//当单元类型是特殊背景颜色时的结束背景颜色
		this._bkendcr = config.bkendcr;	
	}	
	if(config.cellcheck!==undefined){
		this._cellcheck = config.cellcheck;	//    ckd CheckBox是否选中 noedit CheckBox中的单元文字是否能编辑，如果1，则表示不能编辑 

	}	
	if(config.cellurl!==undefined){
		this._cellurl = config.cellurl;	
	}	
	if(config.clcobtn!==undefined){//单元类型下拉颜色框说明
		this._clcobtn = config.clcobtn;	
	}	
	if(config.clco!==undefined){//单元类型下拉框说明
		this._clco = config.clco;	
	}	
	if(config.cldt!==undefined){//单元类型日期事件说明
		this._cldt = config.cldt;	
	}	
	if(config.cellbutton!==undefined){//单元类型日期事件说明
		this._cellbutton = config.cellbutton;	
	}
	if(config.imagetype!==undefined){//单元类型日期事件说明
		this._imagetype = config.imagetype;	
	}
	if(config.imagelen!==undefined){//单元类型日期事件说明
		this._imagelen = config.imagelen;	
	}
	if(config.imagewidth!==undefined){//单元类型日期事件说明
		this._imagewidth = config.imagewidth;	
	}
	if(config.imageheight!==undefined){//单元类型日期事件说明
		this._imageheight = config.imageheight;	
	}
	if(config.imagedata!==undefined){//单元类型日期事件说明
		this._imagedata = config.imagedata;	
	}
	/*
     this._value
     this._fontFamily
     this._fontSize
     this._fontColor
     this._fontBold                     //粗体
     this._fontItalic                   //斜体
     this._fontUnderline                //待实现
     this._autoLineFeed                 //自动换行   
     this._textAlign                    //水平方向对齐
     this._horMargin                    //水平防线缩进
     this._verAlign                     //竖直方向对齐
     this._verMargin                    //竖直方向缩进
     this._leftNetLine                  //左边的边框线是否存在
     this._editComponent                //编辑组件
     this._borderTopStyle               //上边框类型
     this._borderTopWidth               
     this._borderTopColor
     this._borderRightStyle
     this._borderRightWidth
     this._borderRightColor
     this._borderBottomStyle
     this._borderBottomWidth
     this._borderBottomColor
     this._borderLeftStyle
     this._borderLeftWidth
     this._borderLeftColor
     this._rowspan
     this._colspan
     this._backColor
     this._backImage
     this._backImageScaleType
     
     
     
     
    
     this.ifPaint
     this.ifSave
     this.getValue   
     this.getRowspan
     this.getColspan
     
     this.clear
     this.paintBorder
     this.paintText
     this.paintContent
     this.paint
	 */
    /*event*/
	/*
     编辑结束前
     修改之后的脚本
     指定单元的结束脚本
     指定单元的统计定义
     光标进入单元格
     光标离开单元格
	 */
}
DataCell.prototype.gettextAlign=function(hag){
 	var  sethag={
        "0": "left",
        "6": "center",
        "2": "right"
    };
	if(this._hag===undefined){
		return sethag[hag];
	}else{
		return sethag[this._hag];	
	}
	
}
DataCell.prototype.gettextverAlign=function(hag){
 	var setvag={
        "0": "top",
        "6": "middle",
        "8": "bottom"
    };
	if(this._vag===undefined){
		return 	setvag[vag];
	}else{
		setvag[this._vag];	
	}
	
}
DataCell.prototype.gettextmark=function(){
		
}
DataCell.prototype.getTextFormat=function(swty){
	var setswty={
        "0": "default",
        "11": "9",
        "12": "10",
        "13": "11",
        "14": "12",
        "15": "13",
        "16": "14"
    };
	var weishu=2,format='';
	if(this._dpt!==undefined){
		weishu=1;	
	}
	if(swty!==undefined){
		format=setswty[swty];
	}else{
		format=setswty[this._swty];	
	}
	
	return {'format': format,
            'weishu': weishu,
            'nby': '0'
		   };		
	
}
DataCell.prototype.getuline=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].uline!==undefined){
					return 1;	
				}else{
					return 0;	
				}	
			}else{
				return 0;	
			}	
		}else{
			return 0;	
		}
}
DataCell.prototype.getbold=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].wei!==undefined){
					return 1;	
				}else{
					return 0;	
				}	
			}else{
				return 0;	
			}	
		}else{
			return 0;	
		}
}

DataCell.prototype.getFontSize=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].hei!==undefined){
					return -parseInt(obj[ftid].hei,10);	
				}else{
					return 12;	
				}	
			}else{
				return 12;	
			}	
		}else{
			return 12;	
		}
}
DataCell.prototype.getFontName=function(obj){
		if(this._ftid!==undefined){
			var ftid=parseInt(this._ftid,10);
			if(obj[ftid]!==undefined){
				if(obj[ftid].fname!==undefined){
					return obj[ftid].fname;	
				}else{
					return "宋体";	
				}	
			}else{
				return "宋体";	
			}	
		}else{
			return "宋体";	
		}
}

DataCell.prototype.getValue=function(){
	return this._t || '';	
}
DataCell.prototype.get=function(obj){
	if("_"+obj in this){
		return this["_"+obj];
	}else{
		return undefined;	
	}
}
DataCell.prototype.getFtid=function(){
	return this._ftid;	
}
DataCell.prototype.getBackColor=function(obj){
	if(this._brid !== undefined){
		return String(obj[this._brid]);//T.color.getcolorFromByte(String(obj[this._brid].color));//cell._backColor;
	}	
}
DataCell.prototype.getCombineStyle = function()
{
	if(this.getRowspan() == 1 && this.getColspan() == 1)
	{
		return "none";
	}
	else if(this.getRowspan() <= 0 && this.getColspan() <=0) 
	{
		return "combined";
	}
	else
	{
		return "combine";
	}
}
DataCell.prototype.getFrozenCell = function()
{
    return this._frozenCell;
}
DataCell.prototype.getBorderLine = function()
{
	if(this.getborderline() == 'none')
	{
		return "none";
	}
	else
	{
		return this.getborderline();
	}
}
DataCell.prototype.ifPaint = function()
{
	if(this._visible === false && this._note === 'none'){
		return false;
	}else if(this._t!= "" && this._t!=undefined)
	{
		return true;
	}
	else if(this._tpenid!=undefined)
	{
		return true;
	}
	else if(this._lpenid!=undefined)
	{
		return true;
	}
	else if(this._rpenid!=undefined)
	{
		return true;
	}
	else if(this._bpenid!=undefined)
	{
		return true;
	}
	//else if(this._backColor != "")
	//{
		//return true;
	//}/
	else if(this._brid != undefined)
	{
		return true;
	}
	else if(this._rows != 0 && this._rows != undefined)
	{
		return true;
	}
	else if(this._cols != 0 && this._cols != undefined)
	{
		return true;
	}
	else if(this._slantLine!='none') 
	{
		return true;
	}
	else if(this._bcor!=undefined) 
	{
		return true;
	}
	else if(this._cellImage!='none') 
	{
		return true;
	}else if(this._imgid != undefined)
	{
		return true;
	}else if(this._controlsItem != 'none')
	{
		return true;
	}else if((this._fl >> 12) & 0x01 || (this._fl >> 10) & 0x01 
	|| (this._fl >> 5) & 0x01 || (this._fl >> 15) & 0x01
	 || (this._tag >> 0) & 0x01 || (this._tag >> 3) & 0x01 || (this._tag >> 4) & 0x01 || (this._tag >> 5) & 0x01
	  || (this._fl >> 12) & 0x01)
	{
		return true;
	}else if(this._slty != undefined){
		return true;
	}
	else if(this._note != 'none')
	{
		return true;
	}
	else 
	{
		return false;
	}
}

DataCell.prototype.ifSave = function()
{
	if(this._value != "")
	{
		return true;
	}
	else if(this._tpenid!=undefined)
	{
		return true;
	}
	else if(this._lpenid!=undefined)
	{
		return true;
	}
	else if(this._rpenid!=undefined)
	{
		return true;
	}
	else if(this._bpenid!=undefined)
	{
		return true;
	}
	else if(this._backColor != "")
	{
		return true;
	}
	else if(this._backImage != "")
	{
		return true;
	}
	else if(this._rowspan != 1)
	{
		return true;
	}
	else if(this._colspan != 1)
	{
		return true;
	}
	else 
	{
		return false;
	}
}

DataCell.prototype.setTextwidth = function(value)
{
   this._textwidth=value;
}
DataCell.prototype.getRowspan = function()
{//
	
	if(this._rows===undefined){
		
		return 1;	
	}else{
		var rows=parseInt(this._rows,10);
		if(rows<0){
			if(rows === -1)return 0;
			return -( - rows - 1)	
		}else if(rows>=0){
			return 	rows+1;
		}
	}
	
   //this._rowspan;
}

DataCell.prototype.getColspan = function()
{	
	
	if(this._cols===undefined){
		return 1;	
	}else{
		var cols=parseInt(this._cols,10);
		if(cols<0){
			//if(cols === -1)return -1;
			return -( - cols - 1);
		}else if(cols>=0){
			return 	cols+1;
		}
	}
	//this._colspan
}

DataCell.prototype.getborderline = function()
{
    return this._borderline;
}


// JavaScript Document
/*
extand from component
extand property:
            x
            y
            width
            height
            comitems
            parent
*/

function ScrollBar(config)
{
    
    
    this.newMethod = Component;
    this.newMethod(config);
    delete this.newMethod;
	
	if(config.dirType != undefined)
	{
		this._dirType = config.dirType;
	}
	else
	{
		this._dirType = "x";
	}
	if(config.length != undefined)
	{
		this._length = config.length;
	}
	else
	{
		this._length = 400;
	}
	if(config.barWidth != undefined)
	{
		this._barWidth = config.barWidth;
	}
	else
	{
		this._barWidth = 20;
	}
	if(this._dirType == "y")
	{
		this._width = this._barWidth;
		this._height = this._length;
	}
	else
	{
		this._width = this._length;
		this._height = this._barWidth;
	}
	
	if(config.scrollBarLength != undefined)
	{
		this._scrollBarLength = config.scrollBarLength;
	}
	else
	{
		this._scrollBarLength = this._length;
	}
	if(config.scrollLength != undefined)
	{
	    this._scrollLength = config.scrollLength;
	}
	else
	{
	    this._scrollLength = 0;
	}
	
	/*辅助属性*/
	this._mousedown_focus = "";
	this._oldScrollLength;
	this._oldMousePos;
	if(config.leftarrowmousedown)
	{
	    this.leftarrowmousedown = config.leftarrowmousedown;
	}
	if(config.leftarrowmouseup)
	{
	    this.leftarrowmouseup = config.leftarrowmouseup;
	}
	if(config.leftblankmousedown)
	{
	    this.leftblankmousedown = config.leftblankmousedown;
	}
	if(config.leftblankmouseup)
	{
	    this.leftblankmouseup = config.leftblankmouseup;
	}
	if(config.scrollbarmousemove)
	{
	    this.scrollbarmousemove = config.scrollbarmousemove;
	}
	if(config.scrollbarmouseup)
	{
	    this.scrollbarmouseup = config.scrollbarmouseup;
	}
	if(config.rightblankmousedown)
	{
	    this.rightblankmousedown = config.rightblankmousedown;
	}
	if(config.rightblankmouseup)
	{
	    this.rightblankmouseup = config.rightblankmouseup;
	}
	if(config.rightarrowmousedown)
	{
	    this.rightarrowmousedown = config.rightarrowmousedown;
	}
	if(config.rightarrowmouseup)
	{
	    this.rightarrowmouseup = config.rightarrowmouseup;
	}
	
    
    /* extra property:
                direction 
                length
                scrollbarlength
                scrolllength
				
    interface function:
    this.getLength()
    this.setLength()
    this.getScrollbarLength()
    this.setScrollbarLength()
    this.getScrollLength()
    this.setScrollLength()
    
    draw function:

    
    
    user event interface function:
    this.click
    this.dblclick
    this.mousedown
    this.mousemove
    this.mouseup
    this.mousewheel
    
    this.leftArrowClick
    this.leftArrowDblClick
    this.leftArrowMouseDown
    this.leftArrowMouseMove
    this.leftArrowMouseUp
    this.leftArrowMouseWheel
    
    this.leftBlankClick
    this.leftBlankDblClick
    this.leftBlankMouseDown
    this.leftBlankMouseMove
    this.leftBlankMouseUp
    this.leftBlankMouseWheel
    
    this.barClick
    this.barDblClick
    this.barMouseDown
    this.barMouseMove
    this.barMouseUp
    this.barMouseWheel
    
    this.rightBlankClick
    this.rightBlankDblClick
    this.rightBlankMouseDown
    this.rightBlankMouseMove
    this.rightBlankMouseUp
    this.rightBlankMouseWheel
    
    this.rightArrowClick
    this.rightArrowDblClick
    this.rightArrowMouseDown
    this.rightArrowMouseMove
    this.rightArrowMouseUp
    this.rightArrowMouseWheel
	*/
}

ScrollBar.prototype.getLength = function()
{
    return this._length;
}

ScrollBar.prototype.getScrollLength = function()
{
    return this._scrollLength;
}

ScrollBar.prototype.getScrollBarLength = function()
{
    return this._scrollBarLength;
}

ScrollBar.prototype.getScrollZoneLength = function()
{
    return (this._length -  2*this._barWidth);
}

ScrollBar.prototype.getMouseFocus = function()
{
    return this._mousedown_focus;
}

ScrollBar.prototype.getBarWidth = function()
{
    return this._barWidth;
}

ScrollBar.prototype.setScrollParamter = function(scrolllength,scrollbarlength,length)
{/*滑动条总长度*/
    this._scrollBarLength = (this.getScrollZoneLength())*scrollbarlength/length;
    this._scrollLength = (this.getScrollZoneLength())*scrolllength / length;
	/*滑动条距离左侧*/
}

ScrollBar.prototype.clear = function()
{
    dc = this.getDc();
    dc.clearRect(0,0,this._width,this._height);
}

ScrollBar.prototype.paintLeftArrow = function()
{
    dc = this.getDc();
    if(this._dirType == "x")
    {
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(0,0,this._barWidth,this._barWidth);
        dc.strokeRect(0,0,this._barWidth,this._barWidth);
		
        //dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
		dc.globalAlpha = 1;
        dc.lineWidth = 3.0;
        dc.beginPath();
        dc.moveTo(14,5);
        dc.lineTo(6,10);
        dc.lineTo(14,15);
        dc.stroke();
    }
    else
    {
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(0,0,this._barWidth,this._barWidth);
        dc.strokeRect(0,0,this._barWidth,this._barWidth);
        //dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
        dc.lineWidth = 3.0;
        dc.beginPath();
        dc.moveTo(5,14);
        dc.lineTo(10,6);
        dc.lineTo(15,14);
        dc.stroke();
    }
    this.releaseDc(dc);
}

ScrollBar.prototype.paintRightArrow = function()
{
    dc = this.getDc();
    if(this._dirType == "x")
    {
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(this._length - this._barWidth,0,this._barWidth,this._barWidth);
        dc.strokeRect(this._length - this._barWidth,0,this._barWidth,this._barWidth);
       // dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
	    dc.lineWidth = 3;
        dc.beginPath();
        dc.moveTo(this._length - 14,5);
        dc.lineTo(this._length - 6,10);
        dc.lineTo(this._length - 14,15);
        dc.stroke();
    }
    else
    {	//竖箭头
        dc.fillStyle ="#C0E4FC"; //"#0f0";
        dc.strokeStyle = "#A4BFE6";//"#000";
        dc.lineWidth = 1.0;
        dc.fillRect(0,this._length - this._barWidth,this._barWidth,this._barWidth);
        dc.strokeRect(0,this._length - this._barWidth,this._barWidth,this._barWidth);
        //dc.strokeStyle = "#fff";
		dc.fillStyle = "#4D6185";//"#fff";
        dc.lineWidth = 3;
        dc.beginPath();
        dc.moveTo(5,this._length - 14);
        dc.lineTo(10,this._length - 6);
        dc.lineTo(15,this._length - 14);
        dc.stroke();
    }
    this.releaseDc(dc);
}

ScrollBar.prototype.paintScrollbar = function()//移动滑条
{
    dc = this.getDc();
    if(this._dirType == "x")
    {
        dc.fillStyle = "#fff";
        dc.fillRect(this._barWidth,0,this._length-2*this._barWidth,this._barWidth);
        dc.fillStyle = "#CEE2FF";//"#0f0";
        dc.strokeStyle = "#000";
        dc.lineWidth = 1.0;
        dc.strokeRect(this._barWidth,0,this._length-2*this._barWidth,this._barWidth);
        if(this._scrollBarLength < (this._length - 2*this._barWidth))
        {
            dc.fillRect(this._scrollLength + this._barWidth,0,this._scrollBarLength,this._barWidth);
			dc.strokeRect(this._scrollLength + this._barWidth,0,this._scrollBarLength,this._barWidth);
        }
        else
        {
            this._scrollLength = 0;
        }
    }
    else//上下以动滑条
    {
        dc.fillStyle = "#fff";
        dc.fillRect(0,this._barWidth,this._barWidth,this._length-2*this._barWidth);
        dc.fillStyle = "#CEE2FF";//"#0f0";
		dc.strokeStyle = "#000";
		dc.lineWidth = 1.0;
		dc.strokeRect(0,this._barWidth,this._barWidth,this._length - 2 * this._barWidth);
		if(this._scrollBarLength < (this._length - 2*this._barWidth))
		{
			dc.fillRect(0, this._barWidth + this._scrollLength ,this._barWidth, this._scrollBarLength);
			dc.strokeRect(0, this._barWidth + this._scrollLength ,this._barWidth, this._scrollBarLength);
		}
    }
    this.releaseDc(dc);
}

ScrollBar.prototype.paint = function()
{
    this.paintLeftArrow();
    this.paintRightArrow();
    this.paintScrollbar();
}



ScrollBar.prototype.mousedown = function(e)
{	if(_gl_filename === undefined){return ;}
    var compos = this.getCanvasXY();
    var scrpos = glGetMouseCanvasXY(e);
    var ctrx = scrpos.x - compos.x;
    var ctry = scrpos.y - compos.y;
    if(this._dirType == "x")
    {
        if(ctrx > 0 && ctrx < this._barWidth && ctry>0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "leftarrow";
            if(this.leftarrowmousedown)
            {
                this.leftarrowmousedown(e);
            }
        }
        else if(ctrx > this._barWidth && ctrx < (this._barWidth + this._scrollLength)
            &&ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "leftblank";
            if(this.leftblankmousedown)
            {
                this.leftblankmousedown(e);
            }
        }
        else if(ctrx > (this._scrollLength + this._barWidth) && ctrx < (this._scrollLength + this._scrollBarLength + this._barWidth)
            && ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "scrollbar";
            this._oldScrollLength = this._scrollLength;
            this._oldMousePos = ctrx;
            if(this.scrollbarmousedown)
            {
                this.scrollbarmousedown(e);
            }
        }
        else if(ctrx > (this._barWidth+this._scrollLength + this._scrollBarLength) && ctrx < (this._length - this._barWidth)
            && ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "rightblank";
            if(this.rightblankmousedown)
            {
                this.rightblankmousedown(e);
            }
        }
        else if(ctrx> (this._length - this._barWidth) && ctrx < this._length 
			&& ctry > 0 && ctry < this._barWidth)
        {
            this._mousedown_focus = "rightarrow";
            if(this.rightarrowmousedown)
            {
                this.rightarrowmousedown();
            }
        }
    }
    else
    {
        if(ctry > 0 && ctry < this._barWidth && ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "leftarrow";
			if(this.leftarrowmousedown)
			{
				this.leftarrowmousedown(e);
			}
		}
		else if(ctry > this._barWidth && ctry <(this._barWidth + this._scrollLength) 
		    && ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "leftblank";
			if(this.leftblankmousedown)
			{
				this.leftblankmousedown(e);
			}
		}
		else if(ctry > (this._barWidth + this._scrollLength) && ctry < (this._barWidth + this._scrollLength + this._scrollBarLength) 
			&& ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "scrollbar";
			this._oldScrollLength = this._scrollLength;
			this._oldMousePos = ctry;
			if(this.scrollbarmousedown)
			{
				this.scrollbarmousedown(e);
			}
		}
		else if(ctry > (this._barWidth + this._scrollLength + this._scrollBarLength) && ctry < (this._length - this._barWidth) 
			&& ctrx > 0 && ctrx < this._barWidth )
		{
			this._mousedown_focus = "rightblank";
			if(this.rightblankmousedown)
			{
				this.rightblankmousedown(e);
			}
		}
		else if(ctry > (this._length - this._barWidth) && ctry < this._length 
			&& ctrx > 0 && ctrx < this._barWidth)
		{
			this._mousedown_focus = "rightarrow";
			if(this.rightarrowmousedown)
			{
				this.rightarrowmousedown(e);
			}
		}
    }
}

ScrollBar.prototype.mousemove = function(e)
{
    if(glGetMouseState())
    {
        var compos = this.getCanvasXY();
        var scrpos = glGetMouseCanvasXY(e);
        var ctrx = scrpos.x - compos.x;
        var ctry = scrpos.y - compos.y;
        if(this._mousedown_focus == "scrollbar")
        {
            if(this._scrollBarLength > this.getScrollZoneLength())
            {
                this._scrollLength = 0;
            }
            else
            {
                if(this._dirType == "x")
                {
                    this._scrollLength = this._oldScrollLength + ctrx - this._oldMousePos;
                    if(this._scrollLength < 0)
                    {
                        this._scrollLength = 0;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = 0;
                    }
                    else if(this._scrollLength > (this.getScrollZoneLength() - this._scrollBarLength))
                    {
                        this._scrollLength = this.getScrollZoneLength() - this._scrollBarLength;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = this._scrollLength;
                    }
                    else
                    {
                        this._oldMousePos = ctrx;
                        this._oldScrollLength = this._scrollLength;
                    }
                    this.paintScrollbar();
                    if(this.scrollbarmousemove)
                    {
                        this.scrollbarmousemove(e);
                    }
                }
                else
                {
                    this._scrollLength = this._oldScrollLength + ctry - this._oldMousePos;
                    if(this._scrollLength < 0)
                    {
                        this._scrollLength = 0;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = 0;
                    }
                    else if(this._scrollLength > (this.getScrollZoneLength() - this._scrollBarLength))
                    {
                        this._scrollLength = this.getScrollZoneLength() - this._scrollBarLength;
                        this._oldMousePos = this._oldMousePos + this._scrollLength - this._oldScrollLength;
                        this._oldScrollLength = this._scrollLength;
                    }
                    else
                    {
                        this._oldMousePos = ctry;
                        this._oldScrollLength = this._scrollLength;
                    }
                    this.paintScrollbar();
                    if(this.scrollbarmousemove)
                    {
                        this.scrollbarmousemove(e);
                    }
                }
            }
        }
    }
}

ScrollBar.prototype.mouseup = function(e)
{
    if(this._mousedown_focus == "leftarrow")
    {
        this._mousedown_focus = 'none';
        if(this.leftarrowmouseup)
        {
            this.leftarrowmouseup(e);
        }
    }
    else if(this._mousedown_focus == "leftblank")
    {
        this._mousedown_focus = 'none';
        if(this.leftblankmouseup)
        {
            this.leftblankmouseup(e);
        }
    }
    else if(this._mousedown_focus == "scrollbar")
    {
        this._mousedown_focus = 'none';
        if(this.scrollbarmouseup)
        {
            this.scrollbarmouseup(e);
        }
    }
    else if(this._mousedown_focus == "rightblank")
    {
        this._mousedown_focus = 'none';
        if(this.rightblankmouseup)
        {
            this.rightblankmouseup(e);
        }
    }
    else if(this._mousedown_focus == "rightarrow")
    {
        this._mousedown_focus = 'none';
        if(this.rightarrowmouseup)
        {
            this.rightarrowmouseup(e);
        }
    }
}

  // JavaScript Document
function DataCol(config)
{
    /*
    属性:
	this.visible
	this.width
	
	方法:
	this.getWidth
	this.getVisible
	this.ifSave
	*/
	if(config!==undefined){
		if(config.width != undefined)
		{
			if(typeof(config.width) == "number")
			{
				this._width = config.width;
			}
			else
			{
				alert("config error: width should be number type");
			}
		}
		else
		{
			this._width = 70;
		}
	
		if(config.visible != undefined)
		{
			if(typeof(config.visible) == "boolean")
			{
				this._visible = config.visible;
			}
			else
			{
				alert("config err: visible should be boolean type");
			}
		}
		else
		{
			this._visible = true;
		}
		if(config.tagval != undefined)
		{
			this._tagval = config.tagval;
		}
	}
}

DataCol.prototype.getWidth = function()
{	
    return this._width;
}
DataCol.prototype.getVisible = function()
{	if(this._tagval !== undefined && (this._tagval>>9)&0x01){
		return false;
	}
    return this._visible;
}

DataCol.prototype.ifSave = function()
{
    if(this._width != 80)
    {
        return true;
    }
    else if(!this._visible)
    {
        return true;
    }
    else
    {
        return false;
    }
}
/*右键菜单*/
function RightMenuItem(event){
    this.menu       = document.createElement("div");
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.style.cssText='font-size:10px';
				/*配合外部样式表，控制样式*/
				
       		var overcss=typeof(obj[i].onmouseoverStyle)!='undefined'?obj[i].onmouseoverStyle:'background-color:#007eff;color:#FFF;font-size:10px';
       		var outcss=typeof(obj[i].onmouseoutStyle)!='undefined'?obj[i].onmouseoutStyle:'background-color:#FFF;color:#000;font-size:10px';
			
			subItem.onmouseover = function(event){
				event = (event)?event:window.event;
				var obj=event.srcElement?event.srcElement:event.target;
				obj.style.cssText=overcss;
			};
			subItem.onmouseout = function(event){
				event = (event)?event:window.event;
				var obj=event.srcElement?event.srcElement:event.target;
				obj.style.cssText=outcss;
			};
//			var DataGrid=new DataGrid();
//			DataGrid.setNetChartVisible(false);
			obj[i].ev?subItem.onclick  = obj[i].ev:subItem.onclick=clearNetLine;
			this.menuBody.appendChild(subItem);

		}


    };
    /**
     * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
     * obj : 应用该右键菜单的元素
     */
    this.addMenuTo  = function(obj){
        /*设置ul的样式*/
        with(this.menuBody.style){
            /*配合外部样式表，控制样式*/
            className           = "myContextMenuBody";
            listStyle           = "none";
            listStylePosition   = "inside";
            margin              = "0px";
            padding             = "0px";
        }
        /*设置div的样式*/
		this.menu.id='myContextMenu';
        this.menu.className='RightMenuItem';

       var del_a = document.createElement("a");
        del_a.className="searchtag_del";
		with(del_a.style){
			            /*配合外部样式表，控制样式*/
	        left    	  = "10px";
            width  		  = "10px";
            zindex        = "9000";
            cursor        = "pointer";
       }
		del_a.onclick=function(){clearCeng('myContextMenu')};
        this.menu.appendChild(this.menuBody);   
		this.menu.appendChild(del_a);
        document.body.appendChild(this.menu);
        /*由于在事件函数内，this指代的对象不再是本类的对象，
         * 所以为以下函数定义一个全局变量menu
         */
        var menu = this.menu;
//       document.getElementById('myContextMenu').onmouseout = function(){
//			clearCeng('myContextMenu');       
//		}
        obj.oncontextmenu = function(){
            menu.style.left    =ex(event);
            menu.style.top     =ey(event);
            menu.style.display = "block";
            return false;
        }
    }
}
/*左键菜单*/
function ClickMenuItem(event){
	this.menu=document.createElement("div");
    this.menuBody=document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 this.createItem  = function(obj,css){
		 var menubody=document.createElement("div");
		 menubody.className=css;
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;			
			if(obj[i].itemText!=undefined){
				typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			}
			if(obj[i].itemType=='line') subItem.className="ContextLine";
			
			if(obj[i].child!=undefined){
				var arrow=document.createElement("div");
				arrow.className="edui-arrow";
				subItem.appendChild(arrow);
				subItem.appendChild(this.createItem(obj[i].child,"ContextThirdMenuSubItem"));
			}
			subItem.onclick  = obj[i].ev;
			menubody.appendChild(subItem);
		}
		return menubody;
    };

	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;			
			
			
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
						subItem.className = "ContextMenuSubItem";
				/*配合外部样式表，控制样式*/
			if(obj[i].css!=undefined){
				subItem.className+= " "+obj[i].css;
				if(obj[i].css ==='select'){
					subItem.innerHTML+='<div class="showflag"></div>';
				}

			}
			
			subItem.onclick  = obj[i].ev;
			if(obj[i].child!=undefined){
				var arrow=document.createElement("div");
				arrow.className="edui-arrow";
				subItem.appendChild(arrow);
				var menubody=this.createItem(obj[i].child,"ContextSecondMenuSubItem");
				subItem.appendChild(menubody);
			}

			
			this.menuBody.appendChild(subItem);
		}
    };
    /**
     * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
     * obj : 应用该右键菜单的元素
     */
    this.addMenuTo  = function(obj){
        /*设置ul的样式*/
        /*设置div的样式*/
		var left=0,top=0;
		this.menu.id='myContextMenu';
        this.menu.className='RightMenuBox';

        this.menu.appendChild(this.menuBody);   
		this.menu.style.position='absolute';  
		left    =obj.offsetLeft + document.documentElement.scrollLeft+'px';
		top     =obj.offsetTop + document.documentElement.scrollTop+25+'px';
		if(obj.nodeName !== undefined){
			if(obj.nodeName.toUpperCase() === 'EM')
			{
				top=obj.offsetTop + document.documentElement.scrollTop+25 - document.getElementById("left-tablechild").scrollTop+'px';
			}
		}
		if(obj==='rightMouse')
		{
            left    =T.html.ex(event)+'px';
            top     =T.html.ey(event)+'px';
		}  
		this.menu.style.left    =left;
        this.menu.style.top     =top;
        this.menu.style.display = "block";

        document.body.appendChild(this.menu);
        /*由于在事件函数内，this指代的对象不再是本类的对象，
         * 所以为以下函数定义一个全局变量menu
         */
//       document.getElementById('myContextMenu').onmouseout = function(){
//			clearCeng('myContextMenu');       
//		}
    }
}

function clearNetLine(config){
	var dataGrid = new DataGrid({
	    x:0.5,
	    y:0.5,
	    width:$this.getWidth() - 20.5,
	    height:$this.getHeight() - 20.5
	});
		dataGrid.setNetChartVisible(!dataGrid.getNetChartVisible());
		dataGrid.clear();
		dataGrid.paint();

}
RightMenuItem.prototype.setMenuItem=function(){
	return [{'itemText':'显示表格线'},
	{'itemText':'111'},
	{'itemText':'111'},
	{'itemText':'111'}];	
}

function colordialog(event,dataGrid,type,elem,clearColorFunc){
	    event = glGetEvent(event);
	    var target = glGetTarget(event);
	this.colordialogmouseover=function(obj){
		obj.style.borderColor="#0A66EE";
		obj.bgColor="#EEEEEE";
	}
	this.colordialogmouseout=function(obj){
		obj.style.borderColor="";
		obj.bgColor="";
	}
	elem===undefined?this.colordialogmousedown=function(color){
		clearCeng('showbox');
		if(type=='fontcolor'){
			dataGrid.setSelCellFontColor(color);
		}else if(type==='backcolor'){
			dataGrid.setSelCellbackColor(color);
		}else if(type==='borderLineColor')
		{
			//dataGrid.setSelCellborderLineColor(color);
			borderColor=color;
		}
		dataGrid.clear();
		dataGrid.paint();
		ecolorPopup.value=color;
		//document.body.bgColor=color;
	}:this.colordialogmousedown=function(color){
		var tempelm = document.getElementsByName(elem)[0];
		if(tempelm.nodeName === 'SELECT'){
			if(tempelm.value ===''){
				alert('请选中颜色');
				clearCeng('showbox');
				return false;
			}
			tempelm.options[tempelm.value.substring(1)].style.background=color;
			tempelm.style.background=color;
		}else{
			
			tempelm.value=color;
		}
		clearCeng('showbox');
	};
	clearColorFunc===undefined?this.clearColor=function(){
		clearCeng('showbox');
		if(type=='fontcolor'){
			dataGrid.setSelCellFontColor('');
		}else{
			dataGrid.setSelCellbackColor('');
		}
		dataGrid.clear();
		dataGrid.paint();
		//document.body.bgColor=color;
	}:this.clearColor=function(color){
		document.getElementsByName(elem)[0].value='';	
		clearCeng('showbox');
	};
	var abox = document.createElement("div");
	abox.id='showbox';
	abox.style.background='#FFE900';
	abox.style.position='absolute';
	abox.style.left=T.html.getPosition(target).left + document.documentElement.scrollLeft+'px';
	abox.style.top=T.html.getPosition(target).top+ document.documentElement.scrollTop+20+'px';
	document.body.appendChild(abox);
	var ocolorPopup = abox;
	var ecolorPopup=null;

	var e=event.srcElement;
	e.onkeyup=colordialog;
	ecolorPopup=e;
	var ocbody;
	var oPopBody = ocolorPopup;
	var colorlist=new Array(40);
	oPopBody.style.backgroundColor = "#f9f8f7";
	oPopBody.style.border = "solid #999999 1px";
	oPopBody.style.fontSize = "12px";
	 colorlist[0]="#000000"; colorlist[1]="#993300"; colorlist[2]="#333300"; colorlist[3]="#003300";
	  colorlist[4]="#003366"; colorlist[5]="#000080"; colorlist[6]="#333399"; colorlist[7]="#333333";
	 colorlist[8]="#800000"; colorlist[9]="#FF6600"; colorlist[10]="#808000";colorlist[11]="#008000";
	  colorlist[12]="#008080";colorlist[13]="#0000FF";colorlist[14]="#666699";colorlist[15]="#808080";
	 colorlist[16]="#FF0000";colorlist[17]="#FF9900";colorlist[18]="#99CC00";colorlist[19]="#339966";
	  colorlist[20]="#33CCCC";colorlist[21]="#3366FF";colorlist[22]="#800080";colorlist[23]="#999999";
	 colorlist[24]="#FF00FF";colorlist[25]="#FFCC00";colorlist[26]="#FFFF00";colorlist[27]="#00FF00";
	  colorlist[28]="#00FFFF";colorlist[29]="#00CCFF";colorlist[30]="#993366";colorlist[31]="#CCCCCC";
	 colorlist[32]="#FF99CC";colorlist[33]="#FFCC99";colorlist[34]="#FFFF99";colorlist[35]="#CCFFCC";
	  colorlist[36]="#CCFFFF";colorlist[37]="#99CCFF";colorlist[38]="#CC99FF";colorlist[39]="#FFFFFF";
	 ocbody = "";
	  ocbody += "<table CELLPADDING=0 CELLSPACING=3>";
	  ocbody += "<tr height=\"20\" width=\"20\"><td align=\"center\"><table style=\"border:1px solid #808080;\" width=\"12\" height=\"12\" bgcolor=\""+e.value+"\"><tr><td></td></tr></table></td><td bgcolor=\"eeeeee\" colspan=\"3\" style=\"font-size:12px;\" align=\"center\">当前颜色</td><td bgcolor=\"eeeeee\" colspan=\"3\" style=\"font-size:12px;\" align=\"center\"><input onClick=\"parent.clearColor()\" type=button value='清除颜色'></input></td></tr>";
	  for(var i=0;i<colorlist.length;i++){
	  if(i%8==0)
	  ocbody += "<tr>";
	  ocbody += "<td width=\"14\" height=\"16\" style=\"border:1px solid;\" onMouseOut=\"parent.colordialogmouseout(this);\" onMouseOver=\"parent.colordialogmouseover(this);\" onMouseDown=\"parent.colordialogmousedown('"+colorlist[i]+"')\" align=\"center\" valign=\"middle\"><table style=\"border:1px solid #808080;\" width=\"12\" height=\"12\" bgcolor=\""+colorlist[i]+"\"><tr><td></td></tr></table></td>";
	  if(i%8==7)
	  ocbody += "</tr>";
	  }
	  ocbody += "</table>";
	  oPopBody.innerHTML=ocbody;
  }

function clickbox(dataGrid){
	
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.className = "ContextMenuSubItem";
			subItem.alt=obj[i].itemsm;
			subItem.value=obj[i].index || '';
				/*配合外部样式表，控制样式*/
				
			
//			var DataGrid=new DataGrid();
//			DataGrid.setNetChartVisible(false);
			var _this=this;
			subItem.onclick=function(){_this.lionclick(this);}
			this.menuBody.appendChild(subItem);

		}


    };
	this.lionclick=function(obj){
			for(var i=0;i<obj.parentNode.childNodes.length;i++){
					if(obj.parentNode.childNodes[i]==obj)continue;
					obj.parentNode.childNodes[i].style.cssText='background-color:#fff';
			}
			if(obj.alt=='以10的n次相乘'||obj.alt=='以10的n次相除')
			{
				document.getElementById('nby').style.display='block';
			}else
			{
				document.getElementById('nby').style.display='none';
			}
			
			if(obj.innerHTML=='常规'||obj.innerHTML=='财务大写'||obj.innerHTML=='文本'||obj.innerHTML=='套打大写'||obj.innerHTML=='中文数字小写'||obj.innerHTML=='中文数字大写'||obj.innerHTML=='一，二，三序号'||obj.innerHTML=='a,b,c序号'||obj.innerHTML=='A,B,C序号')
			{
				document.getElementById('select').style.display='none';
			}else
			{
				document.getElementById('select').style.display='block';
			}
			obj.style.cssText='background-color:#007eff;color:#FFF;cursor:default';
			document.getElementById('boxlog').innerHTML=obj.alt;
			

	}
	this.check=function(){
			var elm=document.getElementById("myContextMenu").getElementsByTagName('li');	
			for(var i=0;i<elm.length;i++){
				if(elm[i].style.cssText.indexOf('126')!=-1){
					var weishu=document.getElementById('xsd').value;
					var nby=document.getElementById('nby').style.display==='block'?document.getElementById('nbynum').value:'';
					
					
					dataGrid.setTextFormat({'format':elm[i].value || i,'weishu':weishu,'nby':nby});
					clearCeng("myContextMenu");
					break;	
				}	
			}

	}
	this.rendhtml=function(textFormat){
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8 px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.width='300px';
		box.style.height='200px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		box.innerHTML='<h1>设置单元格数字格式</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a><div id="scrollbar" class="scrollbar"></div>';
		box.innerHTML+='<div id="boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><br><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" 	></div><div id="boxlog"></div>';
		box.innerHTML+='<div id="select">小数点位数：<select id="xsd" name="xsd"></select></div><div id="nby">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n次方：<input id="nbynum" value="0" type="text" width="80"></div>';
		var config=eval(textFormat);
		for(var i=0;i<=30;i++){
			
			var newOption=new Option(i,i);
			if(i==config.weishu)newOption.selected=true;
			document.getElementById('xsd').add(newOption);	
		}
		document.getElementById('nbynum').value=config.nby;
		
		document.getElementById('scrollbar').appendChild(this.menuBody);
		document.getElementById("check").onclick=function(){_this.check();}
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function clickboxslantline(dataGrid){
	
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/
    this.addItem    = function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.className = "ContextMenuSubItem";
			subItem.alt=obj[i].itemsm;
				/*配合外部样式表，控制样式*/
				
			
//			var DataGrid=new DataGrid();
//			DataGrid.setNetChartVisible(false);
			var _this=this;
			subItem.onclick=function(){_this.lionclick(this);}
			this.menuBody.appendChild(subItem);

		}


    };
	this.lionclick=function(obj){
			for(var i=0;i<obj.parentNode.childNodes.length;i++){
					if(obj.parentNode.childNodes[i]==obj)continue;
					obj.parentNode.childNodes[i].style.cssText='background-color:#fff';
			}
			obj.style.cssText='background-color:#007eff;color:#FFF;cursor:default';
	}
	this.check=function(){
			var elm=document.getElementsByTagName('li');	
			for(var i=0;i<elm.length;i++){
				if(elm[i].style.cssText.indexOf('126')!=-1){
					dataGrid.setSlantLine(i-1);
					break;	
				}	
			}
			clearCeng("myContextMenu");

	}
	this.rendhtml=function(textFormat){
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8 px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.width='300px';
		box.style.height='200px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		box.innerHTML='<h1>设置单元格斜线格式</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a><div id="scrollbar" class="scrollbar scrollbarlong"></div>';
		box.innerHTML+='<div id="boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><br><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		var config=eval(textFormat);
		document.getElementById('scrollbar').appendChild(this.menuBody);
		document.getElementById("check").onclick=function(){_this.check();};
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function customizeCell(config,dataGrid,checkfuc){
	this.title=config.itemText;
	this.type=config.itermtype;
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	if(checkfuc  ===  undefined){
		this.check=function(){
				var value=document.getElementById(this.itemsm).value;
				if(!/^\d+$/.test(value)&&this.itemsm=='num')
				{
					alert('请输入数字');
					return false;	
				}
				if(!/(V_|P_)[^\s]+$/.test(value)&&this.itemsm=='name')
				{
					alert('请注意格式');
					return false;	
				}
				dataGrid.setCustomizeCell(this.itemsm,value);
				clearCeng("myContextMenu");
	
		}
	}else{
		this.check=checkfuc;	
	}
	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.width='300px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		html='<h1>'+this.title+'</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a>';
		var inputvalue='';
		if(customizeCell!=undefined)inputvalue=customizeCell;
		
		if(this.type==='input'){
			
			html+='<input type="text" class="input" id="'+this.itemsm+'" value="'+inputvalue+'">';
			if(this.iteminstruction!=''&&this.iteminstruction!=undefined)html+='<div class="duanluo">'+this.iteminstruction+'</div>';	
		}else if(this.type==='textarea')
		{
			html+='<textarea class="textarea" id='+this.itemsm+'>'+inputvalue+'</textarea>';	
		}
		html+='<div class="bottom_boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		
		box.innerHTML=html;	
		
		box.getElementsByTagName("input").item(0).focus();
		
		document.getElementById("check").onclick=function(){_this.check();};
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function customizeAngle(config,dataGrid,checkfuc){
	var config = config;
	this.title=config.itemText;
	this.type=config.itermtype;
	
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.boxwidth=config.boxwidth!=undefined?config.boxwidth:'300px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			dataGrid.setCellImage({"turn":{"direction":"right","angle":value}});
			clearCeng("myContextMenu");
	}
	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.border ='8px solid';
		box.style.borderColor ='#CCCCCC';
		box.style.background ='#eeeeee';
		box.style.zIndex ='100';
		box.style.width=this.boxwidth;
		box.style.height=this.boxheight;
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		var inputvalue='';
		html='<h1>'+this.title+'</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a>';
		if(config.list !== undefined){//循环列出input列
			html+='<ul class="lilist">';
			for(var i=0;i<config.list.length;i++){
				if(config.list[i].itermtype ==='checkbox'){
					html+='<li  style="margin-right:65px;"><input type='+config.list[i].itermtype+' id='+config.list[i].itemsm+'><label for='+config.list[i].itemsm+'>'+config.list[i].itemtitle+'</label></li>';		
		
				}else if(config.list[i].itermtype ==='text'){
					if(customizeCell !== undefined){
						inputvalue=	customizeCell[config.list[i].itemsm];
					}
					html+='<li><span>'+config.list[i].itemtitle+'</span><input type='+config.list[i].itermtype+' class="input" id='+config.list[i].itemsm+' value='+inputvalue+'>';		
				}
			}
			html+='</ul>';
		}
		
		if(this.type==='input'){
			
				if(this.itemsm=='num'&&customizeCell[0]!=undefined)inputvalue=customizeCell[0];
				if(this.itemsm=='name'&&customizeCell[2]!=undefined)inputvalue=customizeCell[2];
			html+='<input type=text class="input" id='+this.itemsm+' value='+inputvalue+'>';
			
		}else if(this.type==='textarea')
		{
			var inputvalue='';
			if(customizeCell!=undefined&&customizeCell[1]!=undefined)inputvalue=customizeCell[1];
			html+='<textarea class="textarea" id='+this.itemsm+'>'+inputvalue+'</textarea>';	
		}
		if(this.iteminstruction!=''&&this.iteminstruction!=undefined)html+='<div class="duanluo">'+this.iteminstruction+'</div>';	
		html+='<div class="boxbutton2 "><input id="check" class="ui-button-state" type="button" value="确认" ><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		
		box.innerHTML=html;
		box.getElementsByTagName("input").item(0).focus();
		document.getElementById("check").onclick=function(){_this.check();};
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function saveAsCanvas(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
//	this.rendhtml=function(initial){
//		var html='';
//		var box=document.createElement('div');
//		box.id='myContextMenu';
//		box.style.width=500+"px";
//		box.style.height=this.boxheight;
//		document.body.appendChild(box);
//		box.style.position='absolute';
//		box.className = 'popupmenu_centerbox';
//		box.style.left= T.html.divCenterx(box);
//		box.style.top=divCentery(box);
		//box.innerHTML=T.ajax.ajaxGet('lib/htmllib/leftbar2.html');
		
//		var now=new Date(); 
//		var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();;
//		
//		var leftbarjson=ajaxInclude("leftbar.js?"+number);
//		if(leftbarjson!==''){
//			leftbarjson= eval('(' + leftbarjson + ')');
//		}	
//		new listFile(box,leftbarjson,dataGrid);
		//box.getElementsByTagName("input").item(0).focus();
		//document.getElementById("check").onclick=T.glproxy(this.check,this);
		
	//}
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.saveCanvasToLocal(value);
			clearCeng("myContextMenu");
	}
}
function setcellorder(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.rendhtml=function(initial){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/setCellOrder.html');
		box.getElementsByTagName("input").item(0).focus();
		if(initial.cellnumber!==undefined){
			document.getElementById("item1").value=initial.pianyih;
			document.getElementById("item2").value=initial.pianyil;
			document.getElementById("seltype").getElementsByTagName('option').item(initial.type-1).selected=true;
			document.getElementById("orderrule").value=initial.format;
			var rule =document.getElementsByName("rule");
			for(var i=0;i<rule.length;i++){
				if(rule[i].value===initial.rule){;
					rule[i].checked=true;
					break;	
				}	
			}
		}
		document.getElementById("check").onclick=T.glproxy(this.check,this);
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			var pianyih=document.getElementById("item1").value;
			var pianyil=document.getElementById("item2").value;
			var rule =document.getElementsByName("rule");
			for(var i=0;i<rule.length;i++){
				if(rule[i].checked===true){;
					rule=rule[i].value;
					break;	
				}	
			}
			var type=document.getElementById("seltype").value;
			var format=document.getElementById("orderrule").value;
			
			dataGrid.setSelCellTag({"cellnumber": true,"rule":rule,"type":type,"format":format,"pianyih":pianyih,"pianyil":pianyil});
			clearCeng("myContextMenu");
	}
}
function exportAsCanvas(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.saveCanvasToLocal(value,'export');
			clearCeng("myContextMenu");
	}
}
function editCellUrlbox(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var url=document.getElementById('url').value;
			var newwin=document.getElementById('newwin').checked;
			if(url==''){alert('请填写');return false;}
			dataGrid.setCellControlsItem({
				type: "url",
				value:url,
				newwin:newwin
			});
			dataGrid.setSelCellFontColor("#4888eb");
			clearCeng("myContextMenu");
			dataGrid.clear();
			dataGrid.paint();

	}
}


function editcellCustomScript(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.savecellCustomScript(value);
			clearCeng("myContextMenu");
	}
}
function editStatisticscript(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
			var value=document.getElementById(this.itemsm).value;
			if(value==''){alert('请填写');return false;}
			dataGrid.saveStatisticscript(value);
			clearCeng("myContextMenu");
	}
}
function editcelldropdownbox(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
		var table=document.getElementById("table");
		var tr=table.getElementsByTagName("tr");
		var items=[];
		for(var i=0;i < tr.length;i++)
		{
				var td1=tr[i].getElementsByTagName("td").item(0).innerHTML;
				var td2=tr[i].getElementsByTagName("td").item(1).innerHTML;
				items.push({"key":td1,"value":td2});
		}
		var tagval=0;
		tagval=document.getElementById("item3").checked?tagval|(1<<1):tagval|(0<<1);
		dataGrid.setCellControlsItem({
			type: "dropdownbox",
			tagval:tagval,
			value:items
		});
		clearCeng("myContextMenu");
		dataGrid.clear();
		dataGrid.paint();

	}
	this.plus=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var li=document.createElement("tr");
			li.innerHTML='<td>'+item1+'</td><td>'+item2+'</td>';
			document.getElementById("table").appendChild(li);	
		}else{
			alert('请填写');return false;
		}
	}
	this.del=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var table=document.getElementById("table");
			var tr=table.getElementsByTagName("tr");
			for(var i=0;i < tr.length;i++){
				if(tr[i].style.cssText.indexOf('255')!=-1)
				{
					table.removeChild(tr[i]);	
				}	
			}
		}else{
			alert('请填写');return false;
		}
	}
	this.insert=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var table=document.getElementById("table");
			var tr=table.getElementsByTagName("tr");
			var seltr=false;
			for(var i=0;i<tr.length;i++){
				if(tr[i].style.cssText.indexOf('255')!=-1)
				{
					var x=table.insertRow(i);
					var y=x.insertCell(0);
					var z=x.insertCell(1);
					y.innerHTML=item1;
					z.innerHTML=item2;
					seltr=true;
					break;
				}
			}
			if(!seltr){alert('请选中行');return false;}
		}else{
			alert('请填写');return false;
		}
	}
	this.edit=function(){
		var item1=document.getElementById("item1").value;
		var item2=document.getElementById("item2").value;
		if(item1!=''&&item2!=''){
			var table=document.getElementById("table");
			var tr=table.getElementsByTagName("tr");
			var seltr=false;
			for(var i=0;i < tr.length;i++){
				if(tr[i].style.cssText.indexOf('255')!=-1)
				{
					tr[i].getElementsByTagName("td").item(0).innerHTML=item1;
					tr[i].getElementsByTagName("td").item(1).innerHTML=item2;
					seltr=true;
					break;
				}
			}
			if(!seltr){alert('请选中行');return false;}
		}else{
			alert('请填写');return false;
		}
	}

	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/editdropdownbox.html');
		box.getElementsByTagName("input").item(0).focus();
		if(customizeCell!==undefined){
			if((customizeCell.tagval >> 1) & 0x01){
				document.getElementById("item3").checked=true;	
			}
			if(customizeCell.childs!==undefined){
				var tempvalue = customizeCell.childs;				
				
				var table=document.getElementById("table");
				
	
				for(var i = 0;i < tempvalue.length; i++){
						table.insertRow(i);
						table.rows[i].insertCell(0);
						table.rows[i].cells[0].appendChild(document.createTextNode(i));
						table.rows[i].insertCell(1);
						table.rows[i].cells[1].appendChild(document.createTextNode(tempvalue[i].value));
				}
			}
		}
		document.getElementById("plus").onclick=T.glproxy(this.plus,this);
		document.getElementById("del").onclick=T.glproxy(this.del,this);
		document.getElementById("insert").onclick=T.glproxy(this.insert,this);
		document.getElementById("edit").onclick=T.glproxy(this.edit,this);
		
		
		document.getElementById("table").onclick=function(event){
			var elm=event.target;
			var tr=this.getElementsByTagName("tr");
			for(var i=0;i<tr.length;i++){
				tr[i].style.backgroundColor='#CBD8AC';	
			}
			if(elm.parentNode.nodeName.toUpperCase()==='TR'){
				elm.parentNode.style.backgroundColor='#fff';	
			}	
		}
		document.getElementById("check").onclick=T.glproxy(this.check,this);
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}
}
function editcellTimeControls(config,dataGrid,checkfuc){
	customizeAngle.call(this,config,dataGrid,checkfuc);
	this.check=function(){
		var input=document.getElementById("myContextMenu").getElementsByTagName("input");
		var sel=false;
		for(var i=0;i < input.length;i++){
			if(input[i].checked)
			{
				dataGrid.setCellControlsItem({
					type: "time",
					value:String(i+1),
					edit:false
				});
				sel=true;
				break;	
			}	
		}
		if(!sel){alert('请填写');return false;}
		clearCeng("myContextMenu");
		dataGrid.clear();
		dataGrid.paint();

	}
	this.rendhtml=function(customizeCell){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.className = 'popupmenu_centerbox';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/editTimeControls.html');;
		box.getElementsByTagName("input").item(0).focus();
		
		document.getElementById("check").onclick=T.glproxy(this.check,this);
		new dragbox(box,box.getElementsByTagName('h1').item(0));
	}
}
function frozenCell(config,dataGrid){
	this.title=config.itemText;
	this.type=config.itermtype;
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	this.check=function(){
			var check2=document.getElementById("check2").checked==true?document.getElementById("check2").value:false;
			var check4=document.getElementById("check4").checked==true?document.getElementById("check4").value:false;
			dataGrid.setfrozenCell(check2,check4);
			clearCeng("myContextMenu");

	}
	this.rendhtml=function(frozenCell,frozenCellAll){
		var html='';
		var box=document.createElement('div');
		box.style.position='absolute';
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		var _this=this;
		
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/cellEditStatus.html');	
		if(!(frozenCell >> 0) & 0x01)document.getElementById("check2").checked=true;
		if(frozenCellAll)document.getElementById("check4").checked=true;
		document.getElementById("check").onclick=function(){_this.check();};
		document.getElementById("checkfalse").onclick=function(){clearCeng("myContextMenu");};
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}
}
function uploadImg(config,dataGrid,type,func){
	var dataGrid=dataGrid;
	var config = config;
	this.title=config.itemText;
	this.type=type;
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	var func=func;
	
	this.check=function(){
			var check2=document.getElementById("check2").checked==true?document.getElementById("check2").value:false;
			var check4=document.getElementById("check4").checked==true?document.getElementById("check4").value:false;
			dataGrid.setfrozenCell(check2,check4);
			clearCeng("myContextMenu");

	}
	this.rendhtml=function(frozenCell,frozenCellAll){
		var html='';
		var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		box.style.position='absolute';
		box.style.width='500px';
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		var _this=this;
		
		box.innerHTML=T.ajax.ajaxGet('lib/htmllib/imageUpload.html');
		box.getElementsByTagName("input").item(2).value=this.type;
		box.getElementsByTagName("span").item(0).innerHTML=this.title;
		
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}
	putImage=function (image){
		if(image.type==='table')
		{
		    var img=new Image();
			var listid=T.array.InArray({"src":arguments[2],'width':image.width,'height':image.height},dataGrid._imglist);//查询ftid的值 若为false则 插入
			if(listid === false){
				 dataGrid._imglist.push({"src":arguments[2],'width':image.width,'height':image.height});
				 listid=dataGrid._imglist.length;
			}
			img.src =arguments[2];
			img.id="uploadimgToCanavs";

			dataGrid._tableimage+=listid+',';
			img.onload=function()
			{	
				document.body.appendChild(img);
				var uploadimgToCanavs=new dragimg(img.id,img.width,img.height);	
			}
		}else if(image.type==='cell')
		{	
			
			dataGrid.putimgToCell(image);
			
		
		}else if(image.type==='cellbutton'){
			dataGrid.putimgToCell(image,'button',config.imagepos);
		
		}else if(image.type!==undefined&&image.type.indexOf('canvas')!=-1)
		{
			var listid=T.array.InArray({'height':String(image.height),"src":arguments[2],'width':String(image.width)},dataGrid._imglist);//查询ftid的值 若为false则 插入
			
			
			if(listid === false){
				 dataGrid._imglist.push({"src":arguments[2],'width':image.width,'height':image.height});
				 listid=dataGrid._imglist.length;
			}
			dataGrid.putimgToCanvas(listid,this.type.value);
		}else
		{	
			func(arguments[0]);
			dataGrid.importxml('html/upload/'+arguments[0]);//导入xjc文件			
			

		}	

		
	}

}
function measure(orignPos){
	document.onmousemove=function(event){
		var e=event||window.event;
		var glGetMousePageXY=function(e)
		{
			var x = e.pageX?e.pageX:(document.body.scrollLeft+e.clientX);
			var y = e.pageY?e.pageY:(document.body.scrollTop + e.clientY);
			return {x:x,y:y};
		}
		var pos=glGetMousePageXY(e);
		if(document.getElementById("measure"))document.body.removeChild(document.getElementById("measure"));
		var div=document.createElement("div");
		div.id="measure";
		div.style.cssText="position:absolute;width:100px;height:20px;left:"+0+";top:"+0;
		div.innerHTML="x:"+(pos.x-orignPos.x)+"&nbsp;y:"+(pos.y-orignPos.y);
		document.body.appendChild(div);
	  
	};
}
var menuItem=function()
{
	this.menuBody   = document.createElement("ul");
	
    this.menuChild = document.createElement("ul");
	
    this.addItem=function(obj){
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			var menu    = this.menu;
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			
			subItem.className = "ContextMenuSubItem";
			subItem.alt=obj[i].itemsm;
			subItem.data_name=obj[i].tag;

				/*配合外部样式表，控制样式*/
			if(obj[i].child!=undefined){
				var menuChilds=this.createItem(obj[i].tag,obj[i].child,"childscrollbar");
				this.menuChild.appendChild(menuChilds);
			}
			
			var _this=this;
			subItem.onclick=function(){_this.lionclick(this);};
			this.menuBody.appendChild(subItem);

		}

    }
	this.createItem= function(parent,obj,css){
		 var menubody=document.createElement("div");
		 menubody.className=css;
		var obj = eval(obj);
		for(var i=0;i<obj.length;i++){
		    var subItem = document.createElement("li");
			
			var menu    = this.menu;			
			typeof(obj[i].itemText)=='object'?subItem  = obj[i].itemText:subItem.innerHTML=obj[i].itemText;
			subItem.data_name="child_"+parent;
			subItem.data_sm=obj[i].itemsm;//类型说明
			
				/*配合外部样式表，控制样式*/
			var _this=this;
			subItem.onclick =function(){_this.lionclick(this);};
			
			
			menubody.appendChild(subItem);
		}
		return menubody;
    }
}
	
function clickboxCellDate(config,dataGrid)//单元显示格式
{
	menuItem.call(this);
	this.width=config?config.width:300;
    this.height=config?config.height:200;
	/**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
	 /*itemText,styleImg,ev*/

	this.lionclick=function(obj){
		  for(var i=0;i<obj.parentNode.childNodes.length;i++){
				  if(obj.parentNode.childNodes[i]==obj)continue;
				  obj.parentNode.childNodes[i].style.cssText='background-color:#fff';
			  
		  }
		  obj.style.cssText='background-color:#007eff;color:#FFF;cursor:default';	
		 if(obj.data_name.indexOf("child")==-1)
		  {
			var child=document.getElementById('childscrollbar').getElementsByTagName("li");
			for(var i=0;i < child.length;i++)
			{
				if(obj.data_name=="all")
				{
					child[i].style.display="block";	
				}else
				{
					child[i].style.display="none";
					if(child[i].data_name=="child_"+obj.data_name)
					{
						child[i].style.display="block";	
					}
				}
			}
		  }

	}
	this.check=function(){
		var elm=document.getElementById("childscrollbar").getElementsByTagName('li');
		for(var i=0;i<elm.length;i++){
			if(elm[i].style.cursor==='default'){
				dataGrid.setTextFormat({'format':elm[i].data_sm,'type':'lexcel'});
				clearCeng("myContextMenu");
				break;
			}
		}
	}
	
	this.rendhtml=function(textFormat){
		var bd=document;
		var box=bd.createElement('div');
		var _this=this;
		box.id='myContextMenu';
		bd.body.appendChild(box);
		box.className = 'popupmenu_centerbox';
		box.style.width=this.width+"px";
		box.style.height=this.height+"px";
		box.style.left= T.html.divCenterx(box);
		box.style.top=T.html.divCentery(box);
		
		box.innerHTML='<h1>设置单元格数字格式</h1><a class="float_del" onclick="clearCeng(\'myContextMenu\')" href="javascript:;">删除</a><div id="scrollbar" class="scrollbar"></div>';
		box.innerHTML+='<div id="boxbutton"><input id="check" class="ui-button-state" type="button" value="确认" ><br><input class="ui-button-state" type="button" value="取消"  onclick="clearCeng(\'myContextMenu\')" ></div>';
		box.innerHTML+='<div id="childscrollbar" class="childscrollbar"></div>';
		
		var config=eval(textFormat);
		bd.getElementById('scrollbar').style.height=bd.getElementById('childscrollbar').style.height="240px";
		
		bd.getElementById('scrollbar').appendChild(this.menuBody);
		

		bd.getElementById('childscrollbar').appendChild(this.menuChild);
		
		bd.getElementById('check').onclick=T.glproxy(this.check,this);
		
		new dragbox(box,box.getElementsByTagName('h1').item(0));

	}
}
function customizeBox(config,dataGrid,checkfuc){
	var config = config;
	this.title=config.itemText;
	this.type=config.itermtype;
	
	this.boxheight=config.boxheight!=undefined?config.boxheight:'200px';
	this.boxwidth=config.boxwidth!=undefined?config.boxwidth:'300px';
	this.itemsm=config.itemsm;
	this.iteminstruction=config.iteminstruction;
	this.check = checkfuc;
}
customizeBox.prototype.rendhtml=function(html,config){
	var box=document.createElement('div');
		box.id='myContextMenu';
		document.body.appendChild(box);
		
		box.style.position='absolute';
	box.style.width=this.boxwidth;
	box.style.height=this.boxheight;
	box.style.left= T.html.divCenterx(box);
	box.style.top=T.html.divCentery(box);
	var _this=this;
	box.innerHTML=html;
	if(config !== undefined )config();
	box.getElementsByTagName("input").item(0).focus();
	document.getElementById("check").onclick=function(){_this.check();};
	if(box.getElementsByClassName('tangram-dialog-title').item(0)!==null){
		new dragbox(box,box.getElementsByClassName('tangram-dialog-title').item(0));
	}else{
		new dragbox(box,box.getElementsByTagName('h1').item(0));	
	}
}

var DateFormat = function(DaysToAdd, strFormat,type) {
    this.strFormat = strFormat.replace(/;@/,'');
	if(type==='lexcel'){
		if(/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/.test(DaysToAdd)){
			this.curDate = new Date(DaysToAdd);		
		}else{
			if(DaysToAdd > 14245){
				DaysToAdd = (DaysToAdd-14245) % 36525;
				if (DaysToAdd == 0) DaysToAdd = 36525;
				this.curDate = new Date(1939, 0, 1, 0, 0, 0);		
			}else{
				this.curDate = new Date(2000, 0, 1, 0, 0, 0);
			}
		
			if (DaysToAdd == 0) DaysToAdd = "1";
		
			var days = DaysToAdd;
		
			var s = 0;
			DaysToAdd=String(DaysToAdd);
			if (isNaN(DaysToAdd)) {
				DaysToAdd = DaysToAdd.toString();
			}
		
			if (T.string.glCountInstances(DaysToAdd, '.') > 1) {
				return DaysToAdd;
		
			} else if (DaysToAdd.indexOf('.') != -1) {
				var DaysString = DaysToAdd.split(".");
		
				DaysToAdd = parseInt(DaysString[0], 10);
				s = (days - DaysToAdd) * 100000;
		
			}
			DaysToAdd--;
			
			this.curDate = this.curDate.getTime() + (DaysToAdd * 24 * 60) * 1000 * 60 + s * 1000;
		}
	}else{
		 this.curDate = new Date(DaysToAdd);	
	}
	this.curDate=new Date(this.curDate);
}
DateFormat.parseTime=function(time){
	
        var date = new Date(time);
        return {
			'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
			'ZM': (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1),
            'D': date.getDate(),
			'ZD':date.getDate()<10?'0'+date.getDate():date.getDate(),
            'h': date.getHours(),
            'm': date.getMinutes(),
			'zm': date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
            's': date.getSeconds()
        };
}
DateFormat.prototype = {
    Weeks_abbr: {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    },

    Months_abbr: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //定义一些常用的日期格式的常量   

    parseDate: function() {
        var strDate = this.getDateObject();
        var tempFormat = this.strFormat;
        if (/(y+)/.test(tempFormat)) { //匹配年份
            var fullYear = this.curDate.getFullYear() + '';
            var year = RegExp.$1.length == 4 ? fullYear: fullYear.substr(4 - RegExp.$1.length);
            tempFormat = tempFormat.replace(RegExp.$1, year);
        }
		
        if (/[^:m]?(m+)/g.test(tempFormat)) { //匹配m
          var tmpmonth = strDate.M + '';
            if (RegExp.$1.length === 1) {
                month = strDate.M;
            } else if (RegExp.$1.length === 2 ) {//mm月份
			    month = strDate.M.toString().length == 1 ? '0' + strDate.M: strDate.M;
           
		    } else if (RegExp.$1.length == 3) {//mmm
               
			    month = strDate.amonthEng;//strDate.m.length == 1 ? '0' + strDate.m: strDate.m;
           
		    } else if (RegExp.$1.length == 4) {
                month = strDate.monthEng;
            }
            tempFormat = tempFormat.replace(RegExp.$1, month);
			
			if(/(mm)-{0}/g.test(tempFormat)){
           	 	tempFormat = tempFormat.replace(RegExp.$1, strDate.m.toString().length == 1 ? '0' + strDate.m: strDate.m);
			}
        }
		if(/(:(m+))/g.test(tempFormat) || /(mm"分)/g.test(tempFormat)) { //匹配分
			var tmpminutes= strDate.m + '',minutes='';
			if(RegExp.$1.length === 3){
				minutes=tmpminutes.toString().length == 1 ? '0' + strDate.m: strDate.m;
			}else if(RegExp.$1.length === 4){
				minutes = tmpminutes.toString().length == 1 ? '0' + strDate.m: strDate.m+"分";	
			}
			tempFormat = tempFormat.replace(RegExp.$1, ':'+minutes);
		}
        if (/(d+)/.test(tempFormat)) { //匹配D
            var fullDay = this.curDate.getDate() + '';
            var Day = RegExp.$1.length == 1 ? fullDay: '0' + fullDay;
            tempFormat = tempFormat.replace(RegExp.$1, Day);
        }

        if (/(h+)/.test(tempFormat)) { //匹配h
            if (RegExp.$1.length === 1) {
                tempFormat = tempFormat.replace(RegExp.$1, strDate.H);
            }
        }

        if (/(AM\/PM)/.test(tempFormat)) { //匹配h
           if (RegExp.$1.length === 5) { 
                tempFormat = tempFormat.replace(RegExp.$1, strDate.tt);
            }
        }
        if (/(aaaa)/.test(tempFormat)) { //匹配h
            if (RegExp.$1.length ===4) {
                tempFormat = tempFormat.replace(RegExp.$1, "\u661f\u671f" + this.Weeks_abbr[strDate.weekday]);
            }
        }
        if (/(ss)/.test(tempFormat)) { //匹配ss
            if (RegExp.$1.length ===2) {
                tempFormat = tempFormat.replace(RegExp.$1, strDate.s.toString().length == 1 ? '0' + strDate.s: strDate.s);
            }
        }
        return tempFormat;

    },

    getDateObject: function() {
        date = this.curDate;
        return {
			'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
            'd': date.getDate(),
            'H': date.getHours(),
            'm': date.getMinutes(),
            's': date.getSeconds(),
            'monthEng': this.Months_abbr[date.getMonth()],
            'amonthEng': this.Months_abbr[date.getMonth()],// + 1],
            'tt': date.getHours() < 12 ? 'AM': 'PM',
            'weekday': (date.getUTCDay() + 2) > 6 ? date.getUTCDay() + 2 - 6 : date.getUTCDay() + 2
        };
    },
}

function TopMenu(config)
{
	config.height = 24;
	this.newMethod = Component;
	this.newMethod(config);
	delete this.newMethod;
	
	if(config.items)
	{
		this._items = config.items;
	}
	else
	{
		this._items = new Array();
	}
	
	if(config.itemClick)
	{
		this.itemClick = config.itemClick;
	}
}

TopMenu.prototype.paint = function(){
	var i,x,width,height,menuwidth,topmenu;
	width = this.getWidth();
	height = this.getHeight();
	dc = this.getDc();
	dc.strokeStyle = "#000";
	dc.strokeRect(0,0,width,height);
	dc.fillStyle = "#eee";
	dc.fillRect(0,0,width,height);
	dc.font = "16px sans-serif";
	dc.fillStyle = "#000";
	for(i=0,x=0;i<this._items.length;i++)
	{
		topmenu = new TopMenuItem(this._items[i]);
		menuwidth = topmenu.getWidth();
		dc.fillText(topmenu.getText(),x+15,20);
		x+= menuwidth;
	}
	this.releaseDc(dc);
}

TopMenu.prototype.click = function(e){
	var compos = this.getCanvasXY();
	var canpos = glGetMouseCanvasXY(e);
	var ctrx = canpos.x - compos.x;
	var ctry = canpos.y - compos.y;
	var i,x,topmenu;
	for(i=0,x=0;i<this._items.length && x < this.getWidth();i++)
	{
		topmenu = new TopMenuItem(this._items[i]);
		if(ctrx > x && ctrx < x + topmenu.getWidth())
		{
			if(this.itemClick)
			{
				this.itemClick(i,e);
			}
		}
		x += topmenu.getWidth();
	}
}

TopMenu.prototype.getItemWidth = function(index)
{
	var topmenu = new TopMenuItem(this._items[index]);
	return topmenu.getWidth();
}

TopMenu.prototype.getX = function(index)
{
	var topmenu,x,i;
	for(i=0,x=0;i<index-1;i++)
	{
		topmenu = new TopMenuItem(this._items[i]);
		x += topmenu.getWidth();
	}
	return x;
}

TopMenu.prototype.itemAdd = function(itemconfig)
{
	this._items.push(itemconfig);
}

TopMenu.prototype.itemRemove = function(index)
{
	this._items.splice();
}

Object.extend = function(destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
}

Array.prototype.indexOf = function(Object) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == Object) {
            return i;
        }
    }
    return - 1;
}

// JavaScript Document
function ExtDataGrid(config) {
    /*property
	        datagrid
	        scrollX
	        scrollY
	*/
    Component.call(this, config);

    $this = this;
    //继承Component

    var data = {
        x: 0.5,
        y: 0.5,
        width: $this.getWidth() - 20.5,
        height: $this.getHeight() - 20.5
    };
    if ($this.localStorageName !== undefined) {
        if (localStorage.getItem($this.localStorageName)) {
            data = JSON.parse(localStorage.getItem($this.localStorageName));
        }
    }
	

    var dataGrid = new DataGrid(data);
    document.body.onkeypress = function(event) {
        if (event.target.nodeName.toUpperCase() !== 'INPUT') dataGrid.keypress(event);
    };
    document.body.onkeydown = function(event) {
        if (event.target.nodeName.toUpperCase() !== 'INPUT') dataGrid.commandKey(event);
    };

    var scrollX = new ScrollBar({
        x: ($this.getWidth() - 21) / 2,
        y: ($this.getHeight() - 20.5),
        length: ($this.getWidth() - 21) / 2,
        dirType: 'x',
        leftarrowmousedown: scrollxleftarrowmousedown,
        leftblankmousedown: scrollxleftblankmousedown,
        leftblankmouseup: scrollxleftblankmouseup,
        scrollbarmousemove: scrollxbarmousemove,
        scrollbarmouseup: scrollxbarmouseup,
        rightblankmousedown: scrollxrightblankmousedown,
        rightblankmouseup: scrollxrightblankmouseup,
        rightarrowmousedown: scrollxrightarrowmousedown
        //leftblank

    });
    function scrollxleftarrowmousedown() //scroll bar 左侧点击的代码
    {
        if (dataGrid.getScrollColNum() > 0 && scrollX.getMouseFocus() == "leftarrow") {
            dataGrid.setScrollColNum(dataGrid.getScrollColNum() - 1); //设置显示的列数少一
            scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth()); //设置scrllbar的位置
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            setTimeout(scrollxleftarrowmousedown, 100);
        }
    }

    function _scrollxleftblankmousedown(e) {
        return function() {
            scrollxleftblankmousedown(e);
        }
    }

    function scrollxleftblankmousedown(e) //scrollbar 点击白板
    {
        var canpos = glGetMouseCanvasXY(e);
        var compos = scrollX.getCanvasXY();
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if ((scrollX.getScrollLength() > ctrx - scrollX.getBarWidth()) && scrollX.getMouseFocus() == "leftblank") {
            if (scrollX.getScrollLength() - scrollX.getScrollBarLength() >= 0) {
                scrollX.setScrollParamter(scrollX.getScrollLength() - scrollX.getScrollBarLength(), scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            } else {
                scrollX.setScrollParamter(0, scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            }
            var scrolllength = scrollX.getScrollLength();
            var scrollbarlength = scrollX.getScrollBarLength();
            var scrollzonelength = scrollX.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneWidth() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getColByDisToLeft(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollColNum(arrrow.col);
            } else {
                dataGrid.setScrollColNum(arrrow.col - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            window.setTimeout(_scrollxleftblankmousedown(e), 100);
        }
    }

    function scrollxleftblankmouseup() {
        scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
        scrollX.paint();
    }

    function scrollxbarmousemove() {
        var scrolllength = scrollX.getScrollLength();
        var scrollbarlength = scrollX.getScrollBarLength();
        var scrollzonelength = scrollX.getScrollZoneLength();
        var gridscrolllength = dataGrid.getGridZoneWidth() * scrolllength / scrollbarlength;
        var arrrow = dataGrid.getColByDisToLeft(gridscrolllength);
        if (arrrow.half) {
            dataGrid.setScrollColNum(arrrow.col);
        } else {
            dataGrid.setScrollColNum(arrrow.col - 1);
        }
        dataGrid.clear();
        dataGrid.paint();
    }

    function scrollxbarmouseup() {
        scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
        scrollX.paint();
    }

    function _scrollxrightblankmousedown(e) {
        return function() {
            scrollxrightblankmousedown(e);
        }
    }

    function scrollxrightblankmousedown(e) {
        var canpos = glGetMouseCanvasXY(e);
        var compos = scrollX.getCanvasXY();
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if (scrollX.getMouseFocus() == "rightblank" && (scrollX.getScrollLength() + scrollX.getScrollBarLength() < ctrx - scrollX.getBarWidth())) {
            if (scrollX.getScrollLength() + 2 * scrollX.getScrollBarLength() < scrollX.getScrollZoneLength()) {
                scrollX.setScrollParamter(scrollX.getScrollLength() + scrollX.getScrollBarLength(), scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            } else {
                scrollX.setScrollParamter(scrollX.getScrollZoneLength() - scrollX.getScrollBarLength(), scrollX.getScrollBarLength(), scrollX.getScrollZoneLength());
            }
            var scrolllength = scrollX.getScrollLength();
            var scrollbarlength = scrollX.getScrollBarLength();
            var scrollzonelength = scrollX.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneWidth() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getColByDisToLeft(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollColNum(arrrow.col);
            } else {
                dataGrid.setScrollColNum(arrrow.col - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            window.setTimeout(_scrollxrightblankmousedown(e), 100);
        }
    }

    function scrollxrightblankmouseup() {
        scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
        scrollX.paint();
    }

    function scrollxrightarrowmousedown() {
        if (scrollX.getMouseFocus() == "rightarrow" && dataGrid.getScrollColNum() < dataGrid.getColsCount() - 1) {
            dataGrid.setScrollColNum(dataGrid.getScrollColNum() + 1);
            scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
            dataGrid.clear();
            dataGrid.paint();
            scrollX.clear();
            scrollX.paint();
            window.setTimeout(scrollxrightarrowmousedown, 100);
        }
    }

    var scrollY = new ScrollBar({
        x: $this.getWidth() - 20.5,
        y: 0.5,
        length: $this.getHeight()-1,
        dirType: 'y',
        leftarrowmousedown: scrollyleftarrowmousedown,
        leftblankmousedown: scrollyleftblankmousedown,
        leftblankmouseup: scrollyleftblankmouseup,
        scrollbarmousemove: scrollyscrollbarmousemove,
        scrollbarmouseup: scrollyscrollbarmouseup,
        rightblankmousedown: scrollyrightblankmousedown,
        rightblankmouseup: scrollyrightblankmouseup,
        rightarrowmousedown: scrollyrightarrowmousedown
    });

    function scrollyleftarrowmousedown() {
        if (dataGrid.getScrollRowNum() > 0 && scrollY.getMouseFocus() == "leftarrow") {
            dataGrid.setScrollRowNum(dataGrid.getScrollRowNum() - 1);
            scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
            dataGrid.clear();
            dataGrid.paint();
            scrollY.clear();
            scrollY.paint();
            window.setTimeout(scrollyleftarrowmousedown, 100);
        }
    }

    function _scrollyleftblankmousedown(e) {
        return function() {
            scrollyleftblankmousedown(e);
        };
    }

    function scrollyleftblankmousedown(e) {
        var compos = scrollY.getCanvasXY();
        var canpos = glGetMouseCanvasXY(e);
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if (scrollY.getScrollLength() > ctry - scrollY.getBarWidth() && scrollY.getMouseFocus() == "leftblank") {
            if (scrollY.getScrollLength() - scrollY.getScrollBarLength() >= 0) {
                scrollY.setScrollParamter(scrollY.getScrollLength() - scrollY.getScrollBarLength(), scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            } else {
                scrollY.setScrollParamter(0, scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            }
            var scrolllength = scrollY.getScrollLength();
            var scrollbarlength = scrollY.getScrollBarLength();
            var scrollzonelength = scrollY.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneHeight() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getRowByDisToTop(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollRowNum(arrrow.row);
            } else {
                dataGrid.setScrollRowNum(arrrow.row - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            scrollY.clear();
            scrollY.paint();
            window.setTimeout(_scrollyleftblankmousedown(e), 100);
        }
    }

    function scrollyleftblankmouseup() {
        scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
        scrollY.clear();
        scrollY.paint();
    }

    function scrollyscrollbarmousemove() {
        var scrolllength = scrollY.getScrollLength();
        var scrollbarlength = scrollY.getScrollBarLength();
        var scrollzonelength = scrollY.getScrollZoneLength();
        var gridscrolllength = dataGrid.getGridZoneHeight() * scrolllength / scrollbarlength;
        var arrrow = dataGrid.getRowByDisToTop(gridscrolllength);
        if (arrrow.half) {
            dataGrid.setScrollRowNum(arrrow.row);
        } else {
            dataGrid.setScrollRowNum(arrrow.row - 1);
        }
        dataGrid.clear();
        dataGrid.paint();
    }

    function scrollyscrollbarmouseup() {
        scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
        scrollY.paint();
    }

    function _scrollyrightblankmousedown(e) {
        return function() {
            scrollyrightblankmousedown(e);
        }
    }

    function scrollyrightblankmousedown(e) {
        var compos = scrollY.getCanvasXY();
        var canpos = glGetMouseCanvasXY(e);
        var ctrx = canpos.x - compos.x;
        var ctry = canpos.y - compos.y;
        if (scrollY.getMouseFocus() == "rightblank" && scrollY.getScrollLength() + scrollY.getScrollBarLength() < ctry - scrollY.getBarWidth()) {
            if (scrollY.getScrollLength() + 2 * scrollY.getScrollBarLength() < scrollY.getScrollZoneLength()) {
                scrollY.setScrollParamter(scrollY.getScrollLength() + scrollY.getScrollBarLength(), scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            } else {
                scrollY.setScrollParamter(scrollY.getScrollZoneLength() - scrollY.getScrollBarLength(), scrollY.getScrollBarLength(), scrollY.getScrollZoneLength());
            }
            var scrolllength = scrollY.getScrollLength();
            var scrollbarlength = scrollY.getScrollBarLength();
            var scrollzonelength = scrollY.getScrollZoneLength();
            var gridscrolllength = dataGrid.getGridZoneHeight() * scrolllength / scrollbarlength;
            var arrrow = dataGrid.getRowByDisToTop(gridscrolllength);
            if (arrrow.half) {
                dataGrid.setScrollRowNum(arrrow.row);
            } else {
                dataGrid.setScrollRowNum(arrrow.row - 1);
            }
            dataGrid.clear();
            dataGrid.paint();
            window.setTimeout(_scrollyrightblankmousedown(e), 100);
        }
    }

    function scrollyrightblankmouseup() {
        scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
        scrollY.paint();
    }

    function scrollyrightarrowmousedown() {
        if (scrollY.getMouseFocus() == "rightarrow" && dataGrid.getScrollRowNum() < dataGrid.getRowsCount() - 1) {
            dataGrid.setScrollRowNum(dataGrid.getScrollRowNum() + 1);
            scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());
            dataGrid.clear();
            dataGrid.paint();
            scrollY.clear();
            scrollY.paint();
            setTimeout(scrollyrightarrowmousedown, 100);
        }
    }
    scrollX.setScrollParamter(dataGrid.getScrollLeft(), dataGrid.getGridZoneWidth(), dataGrid.getFullWidth());
    scrollY.setScrollParamter(dataGrid.getScrollTop(), dataGrid.getGridZoneHeight(), dataGrid.getFullHeight());

    function numdisplay() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menu = new clickbox(dataGrid);
        var menuItem = [{
            'itemText': '常规',
            'itemsm': '常规单元格式没有指定数字格式',
			'index':1
        },

        {
            'itemText': '数值',
            'itemsm': '普通数值格式(如3.12,12)',
			'index':1
        },

        {
            'itemText': '人民币',
            'itemsm': '人民币格式(如￥3.12),选择相应的小数位',
			'index':2
        },

        {
            'itemText': '美元币',
            'itemsm': '美元币格式(如$3.12)，选择相应的小数位',
			'index':3
        },

        {
            'itemText': '百分比',
            'itemsm': '百分比格式(如31.2%)，选择相应的小数位',
			'index':4
        },

        {
            'itemText': '千位分隔式样',
            'itemsm': '千位分隔式样格式(如3,120)，选择相应的小数位',
			'index':5
        },

        {
            'itemText': '欧元符号',
            'itemsm': '欧元格式(如€3.12)，选择相应的小数位',
			'index':6
        },

        {
            'itemText': '财务大写',
            'itemsm': '设置为财务大写格式，如123，显示为壹佰贰拾叁元整',
			'index':7
        },

        {
            'itemText': '文本',
            'itemsm': '设置为文本格式，数字也按文本显示',
			'index':8
        },

        {
            'itemText': '套打大写',
            'itemsm': '',
			'index':11
        },

        {
            'itemText': '中文数字小写',
            'itemsm': '设置为中文数字小写格式。如123，显示为一百二十三',
			'index':12
        },

        {
            'itemText': '中文数字大写',
            'itemsm': '设置为中文数字大写格式。如123，显示为壹佰贰拾叁元',
			'index':13
        },

        {
            'itemText': '一，二，三序号',
            'itemsm': '设置为一，二，三序号格式',
			'index':14
        },

        {
            'itemText': 'a,b,c序号',
            'itemsm': '设置为a,b,c序号格式',
			'index':15
        },

        {
            'itemText': 'A,B,C序号',
            'itemsm': '设置为A,B,C序号格式',
			'index':16
        },

        {
            'itemText': '以10的n次相乘',
            'itemsm': '以10的n次相乘',
			'index':17
        },

        {
            'itemText': '以10的n次相除',
            'itemsm': '以10的n次相除',
			'index':18
        },
        ];
        menu.addItem(menuItem);
        menu.rendhtml(cell._textFormat);

    }
	function cellorder(){
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置用户自定义字符值',
            'itemsm': 'orderrule',
            'itermtype': 'textarea'
        };
        var menu = new setcellorder(menuItem, dataGrid);
        menu.rendhtml(cell._cellTag);
	}
    function celldisplay() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menu = new clickboxCellDate({
            "width": 360,
            "height": 300
        },
        dataGrid);
        var menuItem = [{
            'itemText': '日期',
            'tag': 'date',
            'child': [{
                'itemText': '2004-6-16',
                'itemsm': 'yyyy-m-d'
            },

            {
                'itemText': '2004年6月16日',
                'itemsm': 'yyyy年m月d日;@'
            },

            {
                'itemText': '2004年6月',
                'itemsm': 'yyyy年m月;@'
            },

            {
                'itemText': '6月16日',
                'itemsm': 'm月d日;@'
            },

            {
                'itemText': '2004-6-16 1:30 PM',
                'itemsm': 'yyyy-m-d h:mm AM/PM;@'
            },

            {
                'itemText': '2004-6-16 1:30',
                'itemsm': 'yyyy-m-d h:mm;@'
            },

            {
                'itemText': '6-16',
                'itemsm': 'm-d;@'
            },

            {
                'itemText': '6-16-04',
                'itemsm': 'm-d-yy;@'
            },

            {
                'itemText': '06-16-04',
                'itemsm': 'mm-dd-yy;@'
            },

            {
                'itemText': '04-6-16',
                'itemsm': 'yy-m-d;@'
            },

            {
                'itemText': '16-June',
                'itemsm': 'd-mmm;@'
            },

            {
                'itemText': '16-June-04',
                'itemsm': 'd-mmm-yy;@'
            },

            {
                'itemText': '06-June-04',
                'itemsm': 'dd-mmm-yy;@'
            },

            {
                'itemText': 'June-04',
                'itemsm': 'mmm-yy;@'
            },

            {
                'itemText': 'March-04',
                'itemsm': 'mmmm-yy;@'
            },

            {
                'itemText': '星期三',
                'itemsm': 'aaaa;@'
            }]
        },
        {
            'itemText': '时间',
            'tag': 'time',
            'child': [{
                'itemText': '3:56:16',
                'itemsm': 'h:mm:ss;@'
            },

            {
                'itemText': '3:56',
                'itemsm': 'h:mm;@'
            },

            {
                'itemText': '3:56 PM',
                'itemsm': 'h:mm AM/PM;@'
            },

            {
                'itemText': '3:56:16 PM',
                'itemsm': 'h:mm:ss AM/PM;@'
            },

            {
                'itemText': '3时56分',
                'itemsm': 'h"时"mm"分";@'
            },
            ]

        },
        {
            'itemText': '全部',
            'tag': 'all'
        },
        ];
        menu.addItem(menuItem);
        menu.rendhtml(cell._textFormat);

    }

    function slantline() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menu = new clickboxslantline(dataGrid);
        var menuItem = [{
            'itemText': '无',
            'itemsm': 'none'
        },
        {
            'itemText': '对角线',
            'itemsm': 'slantline'
        },       
		{
            'itemText': '上对角线',
            'itemsm': 'tslantline'
        },      
		  {
            'itemText': '下对角线',
            'itemsm': 'bslantline'
        },
        {
            'itemText': '横线',
            'itemsm': 'cslantline'
        },

        {
            'itemText': '竖线',
            'itemsm': 'vslantline'
        },

        {
            'itemText': '根据文字分隔符产生对应的竖线',
            'itemsm': 'bvslantline'
        },

        {
            'itemText': '根据文字分隔符产生对应的横线',
            'itemsm': 'bcslantline'
        },       
		{
            'itemText': '反对角线',
            'itemsm': 'aslantline'
        },

        ];
        menu.addItem(menuItem);
        menu.rendhtml(cell._textFormat);
    }
    function customizenum() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置用户自定义数值',
            'itemsm': 'num',
            'itermtype': 'input',
            'boxheight': '120px'
        };
        var menu = new customizeCell(menuItem, dataGrid);
        menu.rendhtml(cell._uval);
    }
    function customizestring() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置用户自定义字符值',
            'itemsm': 'string',
            'itermtype': 'textarea'
        };
        var menu = new customizeCell(menuItem, dataGrid);
        menu.rendhtml(cell._sval);
    }
    function customizename() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置当前单元变量名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '注意：只对当前选中区域中的一个单元操作。单元变量名必须以V_或P_开头，并且不能重复，其中以V_开头表示当前单元，以P_开头表示当前单元的上一个单元，变量名只能以字母，数字，中文等组合而成，中间不能有空格'
        };
        var menu = new customizeCell(menuItem, dataGrid);
        menu.rendhtml(cell._bname);
    }
    function editfrozenCell() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': '设置单元是否可编辑',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '注意：只对当前选中区域中的一个单元操作。单元变量名必须以V_或P_开头，并且不能重复，其中以V_开头表示当前单元，以P_开头表示当前单元的上一个单元，变量名只能以字母，数字，中文等组合而成，中间不能有空格'
        };
        var menu = new frozenCell(menuItem, dataGrid);
        menu.rendhtml(cell._fl, dataGrid._caneditform);

    }
    function uploadimgToCanavs(type) {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        clearCeng('myContextMenu');

        var menuItem = {
            'itemText': '设置当前单元变量名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '注意：只对当前选中区域中的一个单元操作。单元变量名必须以V_或P_开头，并且不能重复，其中以V_开头表示当前单元，以P_开头表示当前单元的上一个单元，变量名只能以字母，数字，中文等组合而成，中间不能有空格'
        };

        var menu = new uploadImg(menuItem, dataGrid, type);

        menu.rendhtml(cell._frozenCell, cell._frozenCellAll);
    }
    function customTurnAngle() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置旋转角度',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '',
            'boxheight': '120px'
        };
        var menu = new customizeAngle(menuItem, dataGrid);
        menu.rendhtml(cell._customizeCell);
    }
    function saveAsCanvasToLocal() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置另存为名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '',
            'boxheight': '120px'
        };
        var menu = new saveAsCanvas(menuItem, dataGrid);
        menu.rendhtml(cell._customizeCell);
    }
    function exportCanvasToLocal() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置导出为名称',
            'itemsm': 'name',
            'itermtype': 'input',
            'iteminstruction': '',
            'boxheight': '120px'
        };
        var menu = new exportAsCanvas(menuItem, dataGrid);
        menu.rendhtml(cell._customizeCell);
    }
    function cellCustomScript() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '单元字段定义脚本',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '240px'
        };
        var menu = new editcellCustomScript(menuItem, dataGrid);
        menu.rendhtml(['',cell._note]);
    }
    function canvasStatisticscript() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '报表统计脚本',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '240px'
        };
        var menu = new editStatisticscript(menuItem, dataGrid);
        menu.rendhtml(['', dataGrid._StatisticScript]);
    }
    function celldropdownbox() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '下拉框',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '250px'
        };
        var menu = new editcelldropdownbox(menuItem, dataGrid);
        menu.rendhtml(cell._clco);
    }
    function editCellTimeControls() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '日期时间控件',
            'itemsm': 'script',
            'itermtype': 'textarea',
            'iteminstruction': '',
            'boxheight': '240px'
        };
        var menu = new editcellTimeControls(menuItem, dataGrid);
        menu.rendhtml(cell._controlsItem);
    }
    function editCellUrl() {
        var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
        var menuItem = {
            'itemText': '设置超级链接',
			'list':[
				{ 'itemsm': 'url',
            	  'itermtype': 'text',
           	      'itemtitle': '输入url'
				},
				{ 'itemsm': 'newwin',
            	  'itermtype': 'checkbox',
           	      'itemtitle': '在新窗口中打开链接'
				}
			],
            'boxheight': '260px',
            'boxwidth': '400px',
            'iteminstruction': '<p>如果是网站地址则以http://开头,如http://www.chinaexcel.com</p><p>如果是邮件地址,则以mailto:开头,如mailto:chinaexcel@sohu.com</p><p>如果是访问文件,则以file://开头,如file://C:dbcconf.log</p><p>如果是ftp地址,则以ftp://开头,如ftp://ftp.soft198.com'
        };
        var menu = new editCellUrlbox(menuItem, dataGrid);
        menu.rendhtml(cell._cellurl);
    }
    function uploadxml() {
        clearCeng('myContextMenu');

        var menuItem = {
            'itemText': '导入chinaexcel xjc文件',
        };

        var menu = new uploadImg(menuItem, dataGrid, 'xml');

        menu.rendhtml();
    }

    /*菜单*/
    /*
	var menu  =  document.createElement("div");
	menu.style.width = ($this.getWidth()-2)+"px";
	menu.style.backgroundImage = "url(image/back.jpg)";
	menu.style.backgroundRepeat = "repeat";
	menu.style.height = "24px";
	menu.style.borderWidth = "1px";
	menu.style.borderStyle = "solid";
	menu.style.borderColor = "#00f";
	menu.style.lineHeight = "24px";
	menu.style.fontSize = "12px";
	menu.style.textAlign = "left";
	menu.style.listStyle = "none";
	menu.style.margin = "auto";
	glGetRenderTo().insertBefore(menu,glGetCanvas());
	
	var fileitem = document.createElement("li");
	fileitem.innerHTML = "file";
	fileitem.onmouseover = function(){};
	menu.appendChild(fileitem);
	*/
    /*快捷工具栏*/
	if(!chartOnly){
	var now=new Date(); 
	var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
	var leftBar = document.createElement("div");
    leftBar.id = "mainleft";
    leftBar.innerHTML = T.ajax.ajaxGet('lib/htmllib/leftbar.html',false,false);//使用缓存，同步加载

	var leftbarjson=T.ajax.ajaxGetJson("html/leftbar.js?"+number,function(responseText){
				if(responseText!==''){
					responseText= eval('(' + responseText + ')');
				}	
				
				new leftbar(leftBar,responseText,dataGrid);
		},true);

	glGetRenderTo().insertBefore(leftBar, document.getElementById("_editBox"));
	}
	var mainDiv = document.createElement("div");
    mainDiv.id = "maincontent";
	glGetRenderTo().insertBefore(mainDiv, document.getElementById("_editBox"));

    var tbarframe = document.createElement("div");

    pickerFaceColor = 'ThreeDFace'; // CSS color
    pickerBorder = 1; // px
    pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color

    //	tbarframe.style.border = pickerBorder + 'px solid';
    //    tbarframe.style.borderColor = pickerBorderColor;
    //    tbarframe.style.background = pickerFaceColor;
    tbarframe.className = "toolbar";
    tbarframe.id = "tbarframe";
    //tbarframe.style.backgroundRepeat = "repeat";
    tbarframe.style.width = ($this.getWidth() - 2) + "px";
    tbarframe.style.margin = "auto";
    tbarframe.style.textAlign = "left";
    
    var systemframe = document.createElement("div");
    systemframe.id = "tbar1";
    systemframe.className = "toolbar";
    //    systemframe.style.borderColor = pickerBorderColor;
    //    systemframe.style.background = pickerFaceColor;
    systemframe.style.width = ($this.getWidth() - 2) + "px";
    systemframe.style.margin = "auto";
    systemframe.style.height = "20px";
    systemframe.style.textAlign = "left";
    mainDiv.appendChild(systemframe);
	mainDiv.appendChild(tbarframe);
	mainDiv.appendChild(_gl_canvas);

    var sytbar1 = document.createElement("div");
    systemframe.appendChild(sytbar1);

    var sytbar1_file = document.createElement("span");
    sytbar1_file.innerHTML = "文件";
    sytbar1_file.title = "文件";
    sytbar1_file.style.marginLeft = "10px";
    sytbar1_file.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_file);
    var storage = localStorage;
    var filename = [];
    for (var i = 0; i < storage.length; i++) {
        var storageName = storage.key(i);
        if (storageName.indexOf('LocalData') == -1) {

            filename.push({
                'itemText': storageName,
                'ev': function(storageName) {
                    return function() {
                        document.body.innerHTML = '';
                        window.onload(storageName);

                    }
                } (storageName)
            });
        }
    }
    sytbar1_file.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [/*{
            'itemText': '打开',
            'child': filename
        },*/
        {
            'itemText': '保存',
            'ev': function() {
				if(_gl_filename!==undefined){
					exportXml(dataGrid);//导出xjc文件
				}else{
					alert('当前不存在工作表！');	
				}
            }
        }/*,
        {
            'itemText': '另存为',
            'ev': function() {
                saveAsCanvasToLocal();
            }
        }*/,
        {
            'itemText': '重新加载数据',
            'ev': function() {
               // if (confirm("确定要清空所有数据?")) {
					if(_gl_filename!==undefined){
                    	localStorage.removeItem(_gl_filename);
						dataGrid.importxml('html/upload/' + _gl_filename,true);
					}else{
						alert('当前不存在工作表！');	
					}
               // }
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '导出',
            'ev': function() {
				if(_gl_filename!==undefined){
					exportXml(dataGrid);//导出xjc文件
					window.open('html/lib/savefie.php?filename='+encodeURIComponent(_gl_filename));
				}else{
					alert('当前不存在工作表！');	
				}
				clearCeng('myContextMenu');
            }
        },
        /*{
            'itemText': '导入',
            'ev': function() {
                uploadxml();
                //dataGrid.importxml();
            }
        },*/
        {
            'itemText': '设为工作表',
            'ev': function() {
				if(_gl_filename!==undefined){
					window.location='?filename='+encodeURIComponent(_gl_filename);
				}else{
					alert('当前不存在工作表！');	
				}
				
            }
        }
		];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }
    var sytbar1_geshi = document.createElement("span");
    sytbar1_geshi.style.marginLeft = '10px';
    sytbar1_geshi.innerHTML = "编辑";
    sytbar1_geshi.title = "编辑";
    sytbar1_geshi.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_geshi);
    sytbar1_geshi.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '插入行',
             'child': [{
                    'itemText': '前插行',
                    'ev': function() {
						dataGrid.insertRowBefore();
						clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '后插行',
                    'ev': function() {
						dataGrid.insertRowAfter();
						clearCeng('myContextMenu');
                    }
                },
            {
                'itemType': 'line'
            },{
                    'itemText': '插入格式行',
                    'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '160px',
								'boxwidth': '400px'
							};
							
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var form = document.selbutton;
										dataGrid.insertFormatRow(form.firstrow.value,form.rownums.value,form.startrow.value,form.endrow.value );
										clearCeng('myContextMenu');
										dataGrid.clear();
										dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/inserFormatLine.html'),function(){
																					var form = document.selbutton;
																						form.firstrow.value   =dataGrid._focusRow+1;
																						
																						form.startrow.value    =dataGrid._focusRow+1;
																						form.endrow.value 		=dataGrid._focusRow+1;
																					});

                  clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '拷贝格式行',
                    'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '160px',
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var form = document.selbutton;
										dataGrid.copyFormatRow(form.copysrow.value,form.copyerow.value,form.startrow.value,form.endrow.value );
										clearCeng('myContextMenu');
										dataGrid.clear();
										dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/copyFormatLine.html'),function(){
																					var form = document.selbutton;
																						form.copysrow.value   =dataGrid._focusRow+1;
																						form.copyerow.value   =dataGrid._focusRow+1;
																						form.startrow.value    =dataGrid._focusRow+2;
																						form.endrow.value 		=dataGrid._focusRow+2;
																					});

                    clearCeng('myContextMenu');
                    }
                }]
        },{
            'itemText': '插入列',
             'child': [{
                    'itemText': '前插列',
                    'ev': function() {
						dataGrid.insertColBefore();
						clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '后插列',
                    'ev': function() {
						dataGrid.insertColAfter();
						clearCeng('myContextMenu');
                    }
                },
            {
                'itemType': 'line'
            },{
                    'itemText': '插入格式列',
                    'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '160px',
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var form = document.selbutton;
										dataGrid.insertFormatCol(form.firstrow.value,form.rownums.value,form.startrow.value,form.endrow.value );
										clearCeng('myContextMenu');
										dataGrid.clear();
										dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/inserFormatCol.html'),function(){
																					var form = document.selbutton;
																						form.firstrow.value   =dataGrid._focusCol+1;
																						
																						form.startrow.value    =dataGrid._focusCol+1;
																						form.endrow.value 		=dataGrid._focusCol+1;
																					});

                    clearCeng('myContextMenu');
                    }
                },{
                    'itemText': '拷贝格式列',
                    'ev': function() {
                        var ControlsItem = {};
                        ControlsItem.type = "radiobutton";
                        ControlsItem.noedit = 0;

                        dataGrid.setCellControlsItem(ControlsItem);
                        clearCeng('myContextMenu');
                        dataGrid.clear();
                        dataGrid.paint();
                    }
                }]
        },{
            'itemText': '删除行',
            'ev': function() {
                dataGrid.delCanvasRow();
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '删除列',
            'ev': function() {
                dataGrid.delCanvasCol();
				clearCeng('myContextMenu');
            }
        }

        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }


    var sytbar1_geshi = document.createElement("span");
    sytbar1_geshi.style.marginLeft = '10px';
    sytbar1_geshi.innerHTML = "格式";
    sytbar1_geshi.title = "格式";
    sytbar1_geshi.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_geshi);
    sytbar1_geshi.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '文字自动换行',
            'ev': function() {
                dataGrid.setAutoLineFeed();
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '单元显示格式',
            'ev': function() {
                celldisplay();
            }
        },
        {
            'itemText': '单元数字显示格式',
            'ev': function() {
                numdisplay();
            }
        },
        {
            'itemText': '设置单元显示序号',
            'ev': function() {
                cellorder();
            }
        }, {
            'itemText': '单元控件类型',
            'child': [{
                'itemText': '单选框',
                'child': [{
                    'itemText': '单元内文字可编辑的单选框',
                    'ev': function() {
                        var ControlsItem = {};
                        ControlsItem.type = "radiobutton";
                        ControlsItem.noedit = 0;

                        dataGrid.setCellControlsItem(ControlsItem);
                        clearCeng('myContextMenu');
                        dataGrid.clear();
                        dataGrid.paint();
                    }
                },
                {
                    'itemText': '单元内文字不可编辑的单选框',
                    'ev': function() {
                        dataGrid.setCellControlsItem({
                            type: "radiobutton",
                            noedit: 1
                        });
                        clearCeng('myContextMenu');
                        dataGrid.clear();
                        dataGrid.paint();
                    }
                }]
            },
            {
                'itemText': '下拉框',
                'ev': function() {
                    celldropdownbox();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '日期时间',
                'ev': function() {
                    editCellTimeControls();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '超级链接',
                'ev': function() {
                    editCellUrl();
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '数字输入',
                'ev': function() {
                    dataGrid.setCellControlsItem({
                        type: "number",
						edit:	true
                    });
                    clearCeng('myContextMenu');
                    dataGrid.clear();
                    dataGrid.paint();
                }
            },
            {
                'itemText': '按钮',
                'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxheight': '320px',
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
									var table = document.getElementById("myContextMenu");
									var cellurl=cell._cellurl===undefined?{}:cell._cellurl;
									
									var cellbuttonimage = Number(table.getElementsByTagName('select').item(0).value);//按钮图片
									
									if(cellbuttonimage === 1){//浅蓝
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].cellImage={'imagetype':3,'filename':_gl_cellButton_image[0],'width':140,'height':22,'length':1202};	
									}else if(cellbuttonimage === 2){//深蓝
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[1],'width':140,'height':22,'length':1976};	
									}else if(cellbuttonimage === 3){//橘黄
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[2],'width':140,'height':22,'length':2521};	
									}else if(cellbuttonimage === 4){
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[3],'width':140,'height':22,'length':2550};	
									}else if(cellbuttonimage === 5){
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[4],'width':140,'height':22,'length':2659};	
									}else if(cellbuttonimage === 6){
										dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]['cellImage']={'imagetype':3,'filename':_gl_cellButton_image[5],'width':70,'height':22,'length':2659};	
									}
									cellurl.imagetype=table.getElementsByTagName('select').item(0).value;
									cellurl.style=table.getElementsByTagName('select').item(1).value;
									if(table.getElementsByTagName('select').item(2).style.display !=='none'){
										
										cellurl.imagepos=Number(table.getElementsByTagName('select').item(2).value)-1;
									}
									cellurl.scripttype=table.getElementsByTagName('select').item(3).value;
									cellurl.fun=table.getElementsByTagName('textarea').item(0).value;
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].cellurl=cellurl;
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].cellurl.tagval|=1 << 1;//单元控件类型 按钮
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].fl|=1 << 0;//单元控件类型 按钮
									dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol].tag|=1<<3;
									clearCeng('myContextMenu');
									dataGrid.clear();
									dataGrid.paint();
								});
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/setbutton.html'),function(){
																						if(cell._cellurl!==undefined){
																							var form = document.selbutton;
																								form.selstyle.value   =cell._cellurl.imagetype;
																								form.seltype.value    =cell._cellurl.style;
																								form.buttonimgype.value    =cell._cellurl.imagepos;
																								form.scripttype.value =cell._cellurl.scripttype;
																								form.script.value     =cell._cellurl.fun!==undefined?cell._cellurl.fun:'';
																								if(cell._cellurl.style === '3'){
																									form.buttonimgype.style.display='inline';
																									form.buttonimgype.value=Number(cell._cellurl.imagepos)+1;
																								}
																						}
																					});

                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '删除控件类型',
                'ev': function() {
                    dataGrid.delCellControlsItem();
                    clearCeng('myContextMenu');
					dataGrid.clear();
					dataGrid.paint();
                }
            }]
        },
        {
            'itemText': '财务格式类型',
            'ev': function() {},
            'child': [{
                'itemText': '设置财务表头',
                'ev': function() {
                    dataGrid.setCellControlsItem({
                        type: "financialhead",
                        edit: true
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '设置财务表览',
                'ev': function() {
                    dataGrid.setCellControlsItem({
                        type: "financialmain",
                        edit: true
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '设置财务大写',
                'ev': function() {
//                    dataGrid.setCellControlsItem({
//                        type: "financialHead",
//                        edit: false
//                    });
					dataGrid.setTextFormat({'format':7,'weishu':0,'nby':0});
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '设置财务套打大写',
                'ev': function() {
					dataGrid.setTextFormat({'format':11,'weishu':0,'nby':0});
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemType': 'line'
            },
            {
                'itemText': '删除财务类型',
                'ev': function() {
                    dataGrid.delCellPrototype('financial');
                    clearCeng('myContextMenu');
					dataGrid.clear();
					dataGrid.paint();
                }
            }]
        },

        {
            'itemText': '单元斜线设置',
            'ev': function() {
                slantline();
            }
        },
        {
            'itemText': '显示行列头',
			'css': dataGrid._showheader===1||dataGrid._showheader===undefined ? 'select': '',
            'ev': function() {
                dataGrid.setTableHead();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '显示表格线',
			'css': dataGrid._showgrid===1 ||dataGrid._showgrid===undefined? 'select': '',
            'ev': function() {
                dataGrid.setNetChartVisible(!dataGrid.getNetChartVisible());
                dataGrid.clear();
                dataGrid.paint();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '设置光标整行选中',
            'css': (dataGrid._tagvalue>>16)& 0x01 ? 'select': '',
            'ev': function() {
                dataGrid.setSelLineAll();
                clearCeng('myContextMenu');
            }
        },
        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };
    var sytbar1_shezhi = document.createElement("span");
    sytbar1_shezhi.style.marginLeft = '10px';
    sytbar1_shezhi.innerHTML = "设置";
    sytbar1_shezhi.title = "设置";
    sytbar1_shezhi.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_shezhi);
    sytbar1_shezhi.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '设置用户自定义数值',
            'ev': function() {
                customizenum();
            }
        },
        {
            'itemText': '设置用户自定义字符值',
            'ev': function() {
                customizestring();
            }
        },
        {
            'itemText': '设置当前单元变量名称',
            'ev': function() {
                customizename();
            }
        },
        {
            'itemText': '设置单元是否可编辑',
            'ev': function() {
                editfrozenCell();
            }
        },
        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };

    var sytbar1_image = document.createElement("span");
    sytbar1_image.style.marginLeft = '10px';
    sytbar1_image.innerHTML = "图片";
    sytbar1_image.title = "图片";
    sytbar1_image.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_image);
    sytbar1_image.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '在表格上放置图片',
            'ev': function() {
                uploadimgToCanavs('table');
            }
        },
        {
            'itemText': '在单元中插入图片',
            'ev': function() {
                uploadimgToCanavs('cell');
            }
        },
        {
            'itemText': '设置单元中图片的大小',
            'ev': function(event) {},
            'child': [{
                'itemText': '按图片比例缩放显示',
                'ev': function() {
                    dataGrid.setCellImage({
                        size: "imgsize"
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '原始尺寸',
                'ev': function() {
                    dataGrid.setCellImage({
                        size: "origin"
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '单元大小',
                'ev': function() {
                    dataGrid.setCellImage({
                        size: "cell"
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '图片左转',
                'ev': function() {
                    dataGrid.setCellImage({
                        "turn": {
                            "direction": "right",
                            "angle": -90
                        }
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '图片右转',
                'ev': function() {
                    dataGrid.setCellImage({
                        "turn": {
                            "direction": "right",
                            "angle": 90
                        }
                    });
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '图片旋转',
                'ev': function() {
                    customTurnAngle();
                    clearCeng('myContextMenu');
                }
            }]
        },
        {
            'itemText': '删除单元中的图片',
            'ev': function() {
                dataGrid.delCellImage();
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '插入背景图片',
            'ev': function() {},
            'child': [{
                'itemText': '图片原始大小',
                'ev': function() {
                    uploadimgToCanavs('canvas_origin');
                }
            },
            {
                'itemText': '表格大小',
                'ev': function() {
                    uploadimgToCanavs('canvas_canvas');
                }
            },
            ]

        },
        {
            'itemText': '设置背景图片',
            'ev': function() {},
            'child': [{
                'itemText': '图片原始大小',
                'ev': function() {
                    dataGrid.setCanvasImage('origin');
                    clearCeng('myContextMenu');
                }
            },
            {
                'itemText': '表格大小',
                'ev': function() {
                    dataGrid.setCanvasImage('canvas');
                    clearCeng('myContextMenu');
                }
            },
            ]

        },
        {
            'itemText': '删除背景图片',
            'ev': function() {
                dataGrid.delCanvasImage();
                clearCeng('myContextMenu');
            }
        },
        ];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };
    var sytbar1_data = document.createElement("span");
    sytbar1_data.style.marginLeft = '10px';
    sytbar1_data.innerHTML = "数据统计";
    sytbar1_data.title = "数据统计";
    sytbar1_data.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_data);
    sytbar1_data.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '报表统计脚本',
            'ev': function() {
                canvasStatisticscript();
                clearCeng("myContextMenu");
            }
        },
        {
            'itemText': '单元字段定义脚本',
            'ev': function() {
                cellCustomScript();
                clearCeng("myContextMenu");
            }
        }
        ] ;
		menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };
	
    var sytbar1_entry = document.createElement("span");
    sytbar1_entry.style.marginLeft = '10px';
    sytbar1_entry.innerHTML = "数据录入";
    sytbar1_entry.title = "数据录入";
    sytbar1_entry.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_entry);
    sytbar1_entry.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '开启数据录入功能',
			'css': Number(dataGrid._savedb)===1||dataGrid._savedb===undefined ? 'select': '',
            'ev': function() {
                dataGrid.setTableHead();
				clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '查看新增或修改数据记录',
            'ev': function() {
                cellCustomScript();
                clearCeng("myContextMenu");
            }
        }
        ] ;
		menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };

    var sytbar1_chart= document.createElement("span");
    sytbar1_chart.style.marginLeft = '10px';
    sytbar1_chart.innerHTML = "图形图表";
    sytbar1_chart.title = "图形图表";
    sytbar1_chart.className = 'inputmouuse';
    sytbar1.appendChild(sytbar1_chart);
    sytbar1_chart.onclick = function(event) {
        clearCeng('myContextMenu');
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '图表向导',
            'ev': function() {
                            var cell = new DataCell(dataGrid._cells[dataGrid._focusRow][dataGrid._focusCol]);
							var menuItem = {
								'boxwidth': '400px'
							};
							var menu = new customizeBox(menuItem,dataGrid,function(){
								var json = T.form.serialize(document.selbutton);
									var chartType={
										"1": "柱状图",
										"2": "堆积柱状图",
										"3": "3D柱状图",
										"4": "3D堆积柱状图",
										"5": "条形图",
										"6": "堆积条形图",
										"7": "线型图",
										"8": "圆饼图",
										"9": "3D圆饼图",
										"10": "面积图",
										"11": "堆积面积图",
										"12": "K线图",
										"13": "圈饼图",
										"14": "漏斗图",
										"15": "甘特图",
										"16": "柱状线型双坐标图",
										"17": "3D柱状线型双坐标图"	
									};
								
								var chartset=0;
								if(json.XYAXIS==='YYAXIS'){
									chartset+=0x01<<0;	
								}
								if(json.numflag===1){
									chartset+=0x01<<1;	
								}
								
								if(json.SHOW_NAME===1){
									chartset+=0x01<<2;	
								}
								if(json.SHOW_XAXIS_DIV_LINE===1){
									chartset+=0x01<<3;	
								}
								if(json.SHOW_YAXIS_DIV_LINE===1){
									chartset+=0x01<<4;	
								}
								if(json.OPEN_NEW_WINDOW===1){
									chartset+=0x01<<5;	
								}
								if(json.USE_LINKS===1){
									chartset+=0x01<<6;	
								}
								delete json.XYAXIS;
								delete json.numflag;
								delete json.SHOW_NAME;
								delete json.SHOW_XAXIS_DIV_LINE;
								delete json.SHOW_YAXIS_DIV_LINE;
								delete json.OPEN_NEW_WINDOW;
								delete json.USE_LINKS;
								json.chartset = chartset;
								json.type = chartType[json.type];
								json.serialcolor = function(sel){
									var colors = {};
									for(var i=1,len = sel.length;i<len;i++){
										colors[sel[i].value]=T.RGBToHex(sel.options[i].style.background).substring(1);	
									}
									colors['nums']=sel.length-1;
										return colors;
									}(document.selbutton.serialcolor);
								dataGrid._chartattribute.flashchart='';
								dataGrid._chartattribute.flashchart=json;
								
								 dataGrid.reDrawChart();
								 clearCeng("myContextMenu");
								}
							);
							menu.rendhtml(T.ajax.ajaxGet('lib/htmllib/chartSite.html'),function(){
																	var json=dataGrid._chartattribute,	
																	json = json.flashchart,
																	charste = json.chartset;
																	var form = document.selbutton;
																	
																	if((charste>> 0) & 0x01){
																		form['XYAXIS'][1].checked = true;	
																	}else{
																		form['XYAXIS'][0].checked = true;	
																	}
																	if((charste>> 1) & 0x01){//是否在图注上显示数值
																		form['numflag'].checked = true;		
																	}
																	if((charste>> 2) & 0x01){//显示分类X轴名称
																		form['SHOW_NAME'].checked = true;		
																	}
																	if((charste>> 3) & 0x01){//	x轴网格线
																		form['SHOW_XAXIS_DIV_LINE'].checked = true;		
																	}
																	if((charste>> 4) & 0x01){//y轴网格线
																	
																		form['SHOW_YAXIS_DIV_LINE'].checked = true;		
																	}
																	if((charste>> 5) & 0x01){//新窗口打开外链
																		form['OPEN_NEW_WINDOW'].checked = true;		
																	}
																	if((charste>> 6) & 0x01){//使用外链
																		form['USE_LINKS'].checked = true;		
																	}
																		
																	for(p in json){
																		if(form[p]!==undefined)
																		switch(form[p].type){
																			
																			case('text'):
																				try{
																				form[p].value=decodeURIComponent(json[p]);
																				}catch(e){
																					form[p].value=	json[p];
																				}
																				break;
																			case "select-one":
                 															case "select-multiple":
																				T.forEach(form[p],function(name,key ,source){
																					
																					if(T.Trim(source[key].innerHTML)==json[p]){
																					
																						form[p].value=source[key].value;
																						return;
																					}
																				}
																				);
																				break;
																			case('checkbox'):
																				form[p].checked = true;
																		}
																		
																	}	
																	var serialcolor=json.serialcolor;
																		
																	if(serialcolor!==''){
																		var option='';
																		for(var p in serialcolor){
																			if(p !== 'nums')
																			option+='<option value='+p+' style=" background: #'+serialcolor[p]+'">&nbsp;&nbsp;</option>';
																			
																		}
																		form["serialcolor"].innerHTML+=option;
																	}					
																	});

                    clearCeng('myContextMenu');
            }
        },
			{
				'itemText': '重绘图表',
				'ev': function() {
					clearCeng("myContextMenu");
					dataGrid.reDrawChart();
				}
			}
        ] ;
		menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    };

    var tbar1 = document.createElement("div");
    tbarframe.appendChild(tbar1);
    tbarframe.id = "tbar2";
    var tbar1_font = document.createElement("select");
    tbar1_font.title = "字体";
    tbar1_font.style.marginLeft = "10px";
    tbar1_font.id = "font_family";
    var tbar1_font_item = document.createElement("option");
    tbar1_font_item.value = "宋体";
    tbar1_font_item.innerHTML = "宋体";
    tbar1_font.appendChild(tbar1_font_item);
    tbar1.appendChild(tbar1_font);
    tbar1_font_item = document.createElement("option");
    tbar1_font_item.value = "黑体";
    tbar1_font_item.innerHTML = "黑体";
    tbar1_font.appendChild(tbar1_font_item);
    tbar1.appendChild(tbar1_font);
    tbar1_font.onchange = function() {
        //alert(tbar1_font.options[tbar1_font.selectedIndex].text);
        dataGrid.setSelCellFontFamily(tbar1_font.options[tbar1_font.selectedIndex].text);
        dataGrid.clear();
        dataGrid.paint();
    };

    var tbar1_fontsize = document.createElement("select");
    tbar1_fontsize.id = "fontsize";
    tbar1_fontsize.title = "字体大小";
    tbar1_fontsize.style.marginLeft = "10px";
    tbar1_fontsize.innerHTML = "<option value='12'>12</option><option value='14'>14</option><option value='16'>16</option><option value='24'>24</option>";
    tbar1.appendChild(tbar1_fontsize);
    tbar1_fontsize.onchange = function() {
        //alert(tbar1_fontsize.options[tbar1_fontsize.selectedIndex].text);
        dataGrid.setSelCellFontSize(tbar1_fontsize.options[tbar1_fontsize.selectedIndex].text);
        dataGrid.clear();
        dataGrid.paint();
    };

    var tbar1_bold = document.createElement("input");
    tbar1_bold.type = "button";
    tbar1_bold.title = "加粗";
    T.html.setClass(tbar1_bold, "bold buttonMouse");
    tbar1_bold.style.verticalAlign = "top";
    //tbar1_bold.style.marginTop = "1px";
    tbar1.appendChild(tbar1_bold);
    tbar1_bold.onclick = function() {
        dataGrid.setSelCellFontBold();
        dataGrid.clear();
        dataGrid.paint();
    };

    var tbar1_italic = document.createElement("input");
    tbar1_italic.type = "button";
    tbar1_italic.title = "斜体";
    T.html.setClass(tbar1_italic, "italic buttonMouse");
    tbar1_italic.style.verticalAlign = "top";
    //tbar1_italic.style.marginTop = "1px";
    tbar1.appendChild(tbar1_italic);
    tbar1_italic.onclick = function() {
        dataGrid.setSelCellFontItalic();
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_underline = document.createElement("input");
    tbar1_underline.type = "button";
    tbar1_underline.title = "下划线";
    T.html.setClass(tbar1_underline, "underline buttonMouse");
    tbar1_underline.style.verticalAlign = "top";
    //tbar1_underline.style.marginTop = "1px";
    tbar1.appendChild(tbar1_underline);
    tbar1_underline.onclick = function() {
        dataGrid.setSelCellUnderline();
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignleft = document.createElement("input");
    tbar1_alignleft.type = "button";
    tbar1_alignleft.className = 'inputmouuse';
    tbar1_alignleft.title = "左对齐";
    T.html.setClass(tbar1_alignleft, "alignleft buttonMouse");
    tbar1_alignleft.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignleft);
    tbar1_alignleft.onclick = function() {
        dataGrid.setSelCellTextAlign('0');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_aligncenter = document.createElement("input");
    tbar1_aligncenter.type = "button";
    tbar1_aligncenter.title = "中间对齐";
    T.html.setClass(tbar1_aligncenter, "aligncenter buttonMouse");
    tbar1_aligncenter.style.verticalAlign = "top";
    //tbar1_aligncenter.style.marginTop = "1px";
    tbar1.appendChild(tbar1_aligncenter);
    tbar1_aligncenter.onclick = function() {
        dataGrid.setSelCellTextAlign('6');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignright = document.createElement("input");
    tbar1_alignright.type = "button";
    tbar1_alignright.title = "右对齐";
    T.html.setClass(tbar1_alignright, "alignright buttonMouse");
    tbar1_alignright.style.verticalAlign = "top";
    //tbar1_alignright.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignright);
    tbar1_alignright.onclick = function() {
        dataGrid.setSelCellTextAlign('2');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_aligntop = document.createElement("input");
    tbar1_aligntop.type = "button";
    tbar1_aligntop.title = "上对齐";
    T.html.setClass(tbar1_aligntop, "aligntop buttonMouse");
    tbar1_aligntop.style.verticalAlign = "middle";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_aligntop);
    tbar1_aligntop.onclick = function() {
        dataGrid.setSelCellVerticalAlign('0');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignmiddle = document.createElement("input");
    tbar1_alignmiddle.type = "button";
    tbar1_alignmiddle.title = "垂直对齐";
    T.html.setClass(tbar1_alignmiddle, "alignmiddle buttonMouse");
    tbar1_alignmiddle.style.verticalAlign = "middle";
    //tbar1_aligncenter.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignmiddle);
    tbar1_alignmiddle.onclick = function() {
        dataGrid.setSelCellVerticalAlign('6');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_alignbottom = document.createElement("input");
    tbar1_alignbottom.type = "button";
    tbar1_alignbottom.title = "下对齐";
    T.html.setClass(tbar1_alignbottom, "alignbottom buttonMouse");
    tbar1_alignbottom.style.verticalAlign = "middle";
    //tbar1_alignright.style.marginTop = "1px";
    tbar1.appendChild(tbar1_alignbottom);
    tbar1_alignbottom.onclick = function() {
        dataGrid.setSelCellVerticalAlign('8');
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_combinecell = document.createElement("input");
    tbar1_combinecell.type = "button";
    tbar1_combinecell.title = "合并单元格";
    T.html.setClass(tbar1_combinecell, "mergecell buttonMouse");
    tbar1_combinecell.style.verticalAlign = "top";
    //tbar1_combinecell.style.marginTop = "1px";
    tbar1.appendChild(tbar1_combinecell);
    tbar1_combinecell.onclick = function() {
        dataGrid.combineSelCells();
        dataGrid.setFocusRow(dataGrid.getSelStartRow());
        dataGrid.setFocusCol(dataGrid.getSelStartCol());
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_breakcell = document.createElement("input");
    tbar1_breakcell.type = "button";
    tbar1_breakcell.title = "拆分单元格";
    T.html.setClass(tbar1_breakcell, "unmergecell buttonMouse");
    tbar1_breakcell.style.verticalAlign = "top";
    //tbar1_breakcell.style.marginTop = "1px";
    tbar1.appendChild(tbar1_breakcell);
    tbar1_breakcell.onclick = function() {
        dataGrid.breakupSelCells();
        dataGrid.clear();
        dataGrid.paint();
    }
    var tbar1_borderw = document.createElement("select");
    tbar1_borderw.title = "边框设置";
    tbar1_borderw.id = "font_family";
    var bwoptions = [{
        "name": "细线",
        "type": "0",
        "width": 1
    },
    {
        "name": "中线",
        "type": "0",
        "width": 2
    },
    {
        "name": "粗线",
        "type": "0",
        "width": 3
    },
    {
        "name": "点线",
        "type": "2",
        "width": 1
    },
    {
        "name": "虚线",
        "type": "1",
        "width": 1
    },
    {
        "name": "点划线",
        "type": "3",
        "width": 1
    },
    {
        "name": "点点划线",
        "type": "4",
        "width": 1
    },
    ];
    for (var i = 0; i < bwoptions.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("data-value", bwoptions[i].width);
        option.setAttribute("data-type", bwoptions[i].type);
        option.innerHTML = bwoptions[i].name;
        tbar1_borderw.appendChild(option);
    }
	tbar1_borderw.onclick = function(){clearCeng("showbox");};
    tbar1.appendChild(tbar1_borderw);
    tbar1_borderw.onchange = function(event) {
        var sel = tbar1_borderw.options[tbar1_borderw.selectedIndex];
        borderWidth = sel.dataset["value"];
        borderStyle = sel.dataset["type"];
        dataGrid.clear();
        dataGrid.paint();
    }

    var tbar1_border = document.createElement("input");
    tbar1_border.type = "button";
    tbar1_border.title = "边框";
    T.html.setClass(tbar1_border, "border buttonMouse");
    tbar1_border.style.verticalAlign = "top";
    //tbar1_border.style.marginTop = "1px";
    tbar1.appendChild(tbar1_border);
    tbar1_border.onclick = function(event) {
        colordialog(event, dataGrid, 'borderLineColor');
    }

    var tbar1_borderOptions = document.createElement("input");
    tbar1_borderOptions.type = "button";
    tbar1_borderOptions.title = "边框选项";
    tbar1_borderOptions.style.verticalAlign = "top";
    T.html.setClass(tbar1_borderOptions, "borderoption buttonMouse");
    tbar1.appendChild(tbar1_borderOptions);
    tbar1_borderOptions.onclick = function(event) {
        clearCeng('myContextMenu');
		clearCeng("showbox");
        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '全部框线',
            'ev': function() {
                dataGrid.setBorderLine('all');

                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '外部框线',
            'ev': function() {
                dataGrid.setBorderLine('all_out');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '内部框线',
            'ev': function() {
                dataGrid.setBorderLine('all_in');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '左框线',
            'ev': function() {
                dataGrid.setBorderLine('left');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '右框线',
            'ev': function() {
                dataGrid.setBorderLine('right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '上框线',
            'ev': function() {
                dataGrid.setBorderLine('top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '下框线',
            'ev': function() {
                dataGrid.setBorderLine('bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '上下框线',
            'ev': function() {
                dataGrid.setBorderLine('top-bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '左右框线',
            'ev': function() {
                dataGrid.setBorderLine('left-right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '横框线',
            'ev': function() {
                dataGrid.setBorderLine('all-top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '竖框线',
            'ev': function() {
                dataGrid.setBorderLine('all-left');
                clearCeng('myContextMenu');
            }
        }/*,
        {
            'itemText': '绘图',
            'ev': function() {
                clearCeng('myContextMenu');
                dataGrid.usepaintBorderLine();
            }
        }*/];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }

    var tbar1_bordereraser = document.createElement("input");
    tbar1_bordereraser.type = "button";
    tbar1_bordereraser.title = "擦除边框";
    T.html.setClass(tbar1_bordereraser, "eraser buttonMouse");
    tbar1_bordereraser.style.cssText = 'width:20px;height:20px';
    tbar1_bordereraser.style.verticalAlign = "top";
    //tbar1_border.style.marginTop = "1px";
    tbar1.appendChild(tbar1_bordereraser);
    tbar1_bordereraser.onclick = function() {

        dataGrid.eraserBorderLine();
        //dataGrid.setFocusRow(dataGrid.getSelStartRow());
        //dataGrid.setFocusCol(dataGrid.getSelStartCol());
        dataGrid.clear();
        dataGrid.paint();
    }
    var tbar1_bordereraserOptions = document.createElement("input");
    tbar1_bordereraserOptions.type = "button";
    tbar1_bordereraserOptions.alt = "边框选项";
    tbar1_bordereraserOptions.style.verticalAlign = "top";
    T.html.setClass(tbar1_bordereraserOptions, "borderoption buttonMouse");
    tbar1.appendChild(tbar1_bordereraserOptions);
    tbar1_bordereraserOptions.onclick = function(event) {
        clearCeng('myContextMenu');

        var meinv = event.srcElement ? event.srcElement: event.target;
        var menu = new ClickMenuItem(event);
        var menuItem = [{
            'itemText': '抹全部框线',
            'ev': function() {
                dataGrid.clearBorderLine('all');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹外部框线',
            'ev': function() {
                dataGrid.clearBorderLine('all_out');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹内部框线',
            'ev': function() {
                dataGrid.clearBorderLine('all_in');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹左框线',
            'ev': function() {
                dataGrid.clearBorderLine('left');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹右框线',
            'ev': function() {
                dataGrid.clearBorderLine('right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹上框线',
            'ev': function() {
                dataGrid.clearBorderLine('top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹下框线',
            'ev': function() {
                dataGrid.clearBorderLine('bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹上下框线',
            'ev': function() {
                dataGrid.clearBorderLine('top-bottom');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹左右框线',
            'ev': function() {
                dataGrid.clearBorderLine('left-right');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹横框线',
            'ev': function() {
                dataGrid.clearBorderLine('all-top');
                clearCeng('myContextMenu');
            }
        },
        {
            'itemText': '抹竖框线',
            'ev': function() {
                dataGrid.clearBorderLine('all-left');
                clearCeng('myContextMenu');
            }
        }];
        menu.addItem(menuItem);
        menu.addMenuTo(meinv);
    }

    var tbar1_backcolor = document.createElement("input");
    tbar1_backcolor.type = "button";
    tbar1_backcolor.title = "背景色";
    T.html.setClass(tbar1_backcolor, "backcolor buttonMouse");
    tbar1_backcolor.style.verticalAlign = "top";
    //tbar1_backcolor.style.marginTop = "1px";
    tbar1.appendChild(tbar1_backcolor);
    tbar1_backcolor.onclick = function() {
		clearCeng("showbox");
        colordialog(event, dataGrid, 'backcolor');

    }

    var tbar1_textcolor = document.createElement("input");
    tbar1_textcolor.type = "button";
    tbar1_textcolor.title = "文字颜色";
    T.html.setClass(tbar1_textcolor, "forecolor buttonMouse");
    tbar1_textcolor.style.verticalAlign = "top";
    //tbar1_textcolor.style.marginTop = "1px";
    tbar1.appendChild(tbar1_textcolor);
    tbar1_textcolor.onclick = function() {
		clearCeng("showbox");
        	(event, dataGrid, 'fontcolor');

    }

    var tbar1_delCol = document.createElement("input");
    tbar1_delCol.className = 'delCol buttonMouse';
    tbar1_delCol.title = "删除列";
    T.html.setClass(tbar1_delCol, "deletecol buttonMouse");
    tbar1_delCol.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_delCol);
    tbar1_delCol.onclick = function() {
        dataGrid.delCanvasCol();
    }
    var tbar1_delNum = document.createElement("input");
    tbar1_delNum.title = "删除行";
    tbar1_delNum.src = "image/icon/alignleft.png";
    T.html.setClass(tbar1_delNum, "deleterow buttonMouse");
    tbar1_delNum.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_delNum);
    tbar1_delNum.onclick = function() {
        dataGrid.delCanvasRow();
    }
	
    var tbar1_calculate = document.createElement("input");
	tbar1_calculate.type='button';
    tbar1_calculate.className = 'ui-state-default';
    tbar1_calculate.value = "计算模式";
    tbar1_calculate.style.verticalAlign = "top";
    //tbar1_alignleft.style.marginTop = "1px";
    tbar1.appendChild(tbar1_calculate);
    tbar1_calculate.onclick = function() {
		if(this.className==='ui-state-default'){
			this.className='ui-state-active';
			dataGrid._designmode=true;
		}else{
			this.className='ui-state-default';
			dataGrid._designmode=false;
		}
		dataGrid.clear();
		dataGrid.paint();
       
    }
	if(chartOnly){
	tbar1.style.display='none';	
	systemframe.style.display='none';
	mainDiv.style.marginLeft=0;
			
	}
    this.comItemAdd(dataGrid);
    this.comItemAdd(scrollX);
    this.comItemAdd(scrollY);
}
// JavaScript Document
function DataRow(config)
{
	/*
	属性:
	this.height
	this.visible
	函数:
	this.getHeight
	this.getVisible
	this.setVisible
	this.ifSave
	*/
	if(config!==undefined){
		if(config.height!= undefined)
		{
			if(typeof(config.height) == "number")
			{
				this._height = config.height;
			}
			else
			{
				alert("config error: height should be number type");
			}
		}
		else
		{
			this._height = 20;//linesize
		}
		if(config.color!= undefined)
		{

			this._color = config.color;
		}
		else
		{
			this._color = "none";
		}
		
		if(config.visible!= undefined)
		{
			if(typeof(config.visible) == "boolean")
			{
				this._visible = config.visible;
			}
			else
			{
				alert("config error: visible should be boolean type");
			}
		}
		else
		{
			this._visible = true;
		}
		if(config.tagval!= undefined)
		{

			this._tagval = config.tagval;
		}
		if(config.tagval2!= undefined)//行属性值
		{

			this._tagval2 = config.tagval2;
		}
		if(config.type!= undefined)
		{

			this._type = config.type;
		}
		if(config.text!= undefined)
		{

			this._text = config.text;
		}
		if(config.val!= undefined)
		{

			this._val = config.val;
		}
		if(config.childval!= undefined)
		{

			this._childval = config.childval;
		}
		if(config.oddbkcolor!= undefined)//有背景奇偶颜色调色器时的偶数背景颜色。
		{

			this._oddbkcolor = config.oddbkcolor;
		}
		if(config.evenbkcolor!= undefined)//有背景奇偶颜色调色器时的奇数背景颜色。
		{

			this._evenbkcolor = config.evenbkcolor;
		}
		if(config.oddtcolor!= undefined)//有文字奇偶颜色调色器时的偶数文字颜色。
		{

			this._oddtcolor = config.oddtcolor;
		}
		if(config.eventcolor!= undefined)//有文字奇偶颜色调色器时的奇数文字颜色。。
		{

			this._eventcolor = config.eventcolor;
		}
	}
}

DataRow.prototype.getHeight = function()
{
    return this._height;
}
DataRow.prototype.getColor=function(){
	if(this._color==='none')
	{
		return false;	
	}else{
		return this._color;
	}	
}
DataRow.prototype.getVisible = function()
{	if(this._tagval !== undefined && (this._tagval>>9)&0x01){
		return false;
	}
    return this._visible;
}

DataRow.prototype.ifSave = function()
{
    if(this._height != 40)
    {
        return true;
    }
    else if(!this._visible)
    {
        return true;
    }
    else
    {
        return false;
    }
}
// JavaScript Document
var parseXjc = function(jsonstr) {
    this.json = jsonstr;
    //this._netChartVisible = this.json.netChartVisible;
    this._rows = [];
    this._cols = [];
    this._cells = [];
    this.defaultrowslength = 18;
    this.defaultcolslength = 8;

    this.defaultrowheight = 20;
    this.defaultcolwidth = 70;
    this.defaultCellswty = 0;

    this.defaultCellhag = 0;
    this.defaultCellvag = 6;
    this.defaultFontSize = this.getDafaultFontSize();

    this.datagrid = {};
	this.general={};
		this.print={};
		this.defaultcell={};
    this.gattributes = this.json.f1.general.attributes; //general属性
    
	this.pattributes = this.json.f1.print; //general属性
	this.brlist = this.json.f1.brlist; //general属性
	this.drawobjs = this.json.f1.drawobjs; //general属性
	
	
	this.rattributes = this.json.f1.rowproperty; //row属性
    this.colattributes = this.json.f1.colproperty; //col属性
    this.defattributes = this.json.f1.defaultcell; //default属性
    this.cellattributes = this.json.f1.celllist; //cell属性
    this.parseGattributes(this.gattributes); //解析general属性
   
    this.parsePattributes(this.pattributes); //解析print属性
   
   
  this.parsebrlist(this.brlist); //解析brlist属性
  
  this.parserowproperty(this.rattributes); //解析rowproperty属性
  this.parsecolproperty(this.colattributes); //解析colproperty属性
  
   this.parseftlist(this.json.f1.ftlist); //解析brlist属性
   
   this.parsepenlist(this.json.f1.penlist); //解析brlist属性
    this.parseImgattributes(this.imglist); //解析general属性
	
	this.parseDrawobjattributes(this.drawobjs); //解析drawobjs属性
	
	this.parseRattributes(this.gattributes); //解析row属性
    this.parseColattributes(this.colattributes); //解析row属性
    this.parseDefattributes(this.defattributes); //解析default属性
    this.parseCellattributes(this.cellattributes); //解析cell属性

}
parseXjc.prototype = {
	parserowproperty:function(prototype){
		this.datagrid["_rowproperty"]=[];
		if(prototype!==undefined){
			if(prototype.obj.length === undefined){
				this.datagrid["_rowproperty"].push({});
				for(var p in prototype.obj.attributes){
					this.datagrid["_rowproperty"][0][p]=prototype.obj.attributes[p];	
				}
			}else{
				for(var i=0;i<prototype.obj.length;i++){
					this.datagrid["_rowproperty"].push({});
					for(var p in prototype.obj[i].attributes){
						this.datagrid["_rowproperty"][i][p]=	prototype.obj[i].attributes[p];	
					}	
				}	
			}
		}
	},
	parsecolproperty:function(prototype){
		this.datagrid["_colproperty"]=[];
		if(prototype!==undefined){
			if(prototype.obj.length === undefined){
				this.datagrid["_colproperty"].push({});
				for(var p in prototype.obj.attributes){
					this.datagrid["_colproperty"][0][p]=prototype.obj.attributes[p];	
				}
			}else{
				for(var i=0;i<prototype.obj.length;i++){
					this.datagrid["_colproperty"].push({});
					for(var p in prototype.obj[i].attributes){
						this.datagrid["_colproperty"][i][p]=	prototype.obj[i].attributes[p];	
					}	
				}	
			}
		}
	},
	parseImgattributes:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var imglist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				imglist.push({
					'width':obj[i].attributes.width,
					'height':obj[i].attributes.height,
					'src':obj[i].attributes.src
					});	
			}	
		}else{
			imglist.push({
					'width':obj.attributes.width,
					'height':obj.attributes.height,
					'src':obj.attributes.src
					});	
		}
		
		this.datagrid['_imglist']=imglist;
	},
	parseDrawobjattributes:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var list=this.expend(obj);
		
		this.datagrid['_chartattribute']=list;
	},
	expend:function(obj){
		var list={};
		if(obj instanceof Array){
			list=[];
			if(obj.length!==undefined){
				for(var i=0;i<obj.length;i++){
					if(typeof obj[i] === 'object'){
						list.push(this.expend(obj[i]));
					}else{
						list.push(obj[i]);	
					}
				}	
				
			}
		}else{
			for(var p in obj){
				if(p === 'attributes'){
					for(var i in obj[p]){
						list[i]=obj[p][i];
					}
				}else{
					list[p]=this.expend(obj[p]);
					
				}	
			}	
		}
		return list;
	},
	parsepenlist:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var penlist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				penlist.push({
					'style':obj[i].attributes.style,
					'widx':obj[i].attributes.widx,
					'color':this.getcolor(obj[i].attributes.color)
					});	
			}	
		}else{
			penlist.push({
					'style':obj.attributes.style,
					'widx':obj.attributes.widx,
					'color':this.getcolor(obj.attributes.color)
					});	
		}
		
		this.datagrid['_penlist']=penlist;
	},
	parseftlist:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var ftlist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				ftlist.push(obj[i].attributes);	
			}	
		}else{
			ftlist.push(obj.attributes);	
		}
		
		this.datagrid['_ftlist']=ftlist;
	},
	parsebrlist:function(prototype){
		if(prototype===undefined)return;
		var obj=prototype.obj;
		var brlist=[];
		if(obj.length!==undefined){
			for(var i=0;i<obj.length;i++){
				if(obj[i].attributes!==undefined){
					brlist.push(this.getcolor(obj[i].attributes.color));
				}else{
					brlist.push('');		
				}	
			}	
		}else{
			brlist.push(this.getcolor(obj.attributes.color||''));	
		}
		
		this.datagrid['_brlist']=brlist;
	},
    getDafaultFontSize: function() {
		if(this.json.f1.ftlist!== undefined){
			if (this.json.f1.ftlist.obj.length !== undefined) {
				if (this.json.f1.ftlist.obj[0].attributes.hei !== undefined) {
					return - parseInt(this.json.f1.ftlist.obj[0].attributes.hei);
				} else {
					return 10;
				}
			} else {
				if (this.json.f1.ftlist.obj.attributes.hei !== undefined) {
					return - parseInt(this.json.f1.ftlist.obj.attributes.hei);
				} else {
					return 10;
				}
			}
		}else{
			return 10;	
		}
    },
    parsePattributes: function(attributes) {
		  for (p in attributes) {
				
				this.print[p] =  attributes[p].attributes;  
		  }
	},
    parseGattributes: function(attributes) {
        for (p in attributes) {
			
			this.datagrid["_"+p] =  attributes[p];
            
			if (p === 'totalrow') {
                this.datagrid['_rowsNum']=this.defaultrowslength = attributes[p]; //默认行数
            }
            if (p === 'totalcol') {
               this.datagrid['_colsNum']= this.defaultcolslength = attributes[p]; //默认列数
            }
            if (p === 'showgrid') {
                this.datagrid._netChartVisible = false;
            }
            if (p === 'showheader') {
                this.datagrid._offsetX = 0;
                this.datagrid._offsetY = 0;
            }
            if (p === 'statscript') {
                this.datagrid._StatisticScript = attributes[p];
            }
            if (p === 'colheadheight') {
				if(attributes[p] !== '0')
                this.datagrid['_offsetX']=this.defaultrowheight = attributes[p]; //默认行高
            }
            if (p === 'rowheadwidth') {
				if(attributes[p] !== '0')
                this.datagrid['_offsetY']=this.defaultcolwidth = attributes[p]; //默认列宽
            }
            if (p === 'tagvalue') {
                if ((attributes[p] >> 16) & 0x01) {
                    if (attributes.selbkcolor !== undefined) {
                        this.datagrid._selLineAll = {
                            "on": true,
                            "color": this.getcolor(attributes.selbkcolor)
                        };
                    } else {
                        this.datagrid._selLineAll = {
                            "on": true,
                            "color": this.getcolor(attributes.selbkcolor)
                        };
                    }
                }else{
					 this.datagrid._selLineAll = {
                            "on": false,
                            "color": this.getcolor(attributes.selbkcolor)
                        };
				}
            }
        }
		if(attributes['showheader']===undefined){
			this.datagrid['_offsetX'] = this.datagrid['_offsetX'] || 40;
			this.datagrid['_offsetY'] = this.datagrid['_offsetY'] || 20;
		}
		
		this.datagrid['_colsNum'] = this.datagrid['_colsNum'] || 8;
        this.datagrid['_rowsNum'] = this.datagrid['_rowsNum'] || 18;
    },
    parseRattributes: function(attributes) {
        for (i = 0; i < this.defaultrowslength; i++) {
            this._rows.push({});
            if (this.json.f1.rowproperty !== undefined) {
                if (this.json.f1.rowproperty.obj.length !== undefined) {
					//默认的行属性 行高
					if (this.defaultrowheight !== '') {
					   
						this._rows[i].height = parseInt(this.defaultrowheight, 10); //默认高度
				   
					}
                    for (var k = 0; k < this.json.f1.rowproperty.obj.length; k++) {
						var temprow = parseInt(this.json.f1.rowproperty.obj[k].attributes.lineval, 10);
                        if (parseInt(this.json.f1.rowproperty.obj[k].attributes.lineval, 10) === (i + 1)) {//设定的 行属性
                            var height = parseInt(this.json.f1.rowproperty.obj[k].attributes.linesize, 10),
								attributes = this.json.f1.rowproperty.obj[k].attributes;
                            if (height !== '' && height!==0) {
                                this._rows[i].height = height;//linsize 不为0这样取消隐藏，可以恢复为原来的行 为0时，则取消隐藏就不能恢复原来的大小了
                           
						    } else if (this.defaultrowheight !== '') {
                               
							    this._rows[i].height = parseInt(this.defaultrowheight, 10); //默认高度
                          
						    }
							//奇偶行变色
							if (k % 2 !== 0 && this.json.f1.rowproperty.obj[k].attributes.evenbkcolor !== undefined) {
								var color = this.json.f1.rowproperty.obj[k].attributes.evenbkcolor;
								color = this.getcolor(color);
								this._rows[i].color = color;
							} else if (k % 2 === 0 && this.json.f1.rowproperty.obj[k].attributes.oddbkcolor !== undefined) {
								var color = this.json.f1.rowproperty.obj[k].attributes.oddbkcolor;
								color = this.getcolor(color);
								this._rows[i].color = color;
							}
						
                            var tagval = parseInt(this.json.f1.rowproperty.obj[k].attributes.tagval, 10);//行的可见性
                            var tag = (tagval >> 9) & 0x01;
                            if (tag) this._rows[i].visible = false;
							for(var p in attributes){
								this._rows[i][p] = attributes[p];	
							}
                        }
					  }
                } else //无length
                {
                    var temprow = parseInt(this.json.f1.rowproperty.obj.attributes.lineval, 10),
						attributes =this.json.f1.rowproperty.obj.attributes ;
                    if (this.json.f1.rowproperty.obj.attributes.evenbkcolor !== undefined) {
                        var color = this.json.f1.rowproperty.obj.attributes.evenbkcolor;
                        color = this.getcolor(color);
                        this._rows[i].color = color;
                    }
                    if (temprow === (i + 1)) {//存在
						var height  = parseInt(this.json.f1.rowproperty.obj.attributes.linesize, 10);
						if (height !== '' && height!==0) {
							this._rows[i].height = height;	
						}else {
                        this._rows[i].height = parseInt(this.defaultrowheight, 10);;
                   	    }
						
                    } else {
                        this._rows[i].height = parseInt(this.defaultrowheight, 10);;
                    }
					for(var p in attributes){
						this._rows[i][p] = attributes[p];	
					}
					

                }
            } else { //无rowproperty
                if (this.defaultrowheight != '') {
                    this._rows[i].height = parseInt(this.defaultrowheight, 10); //默认高度
                }
            }
        }
    },
    parseColattributes: function(attributes) {
        for (i = 0; i < this.defaultcolslength; i++) {
            this._cols.push({});
            if (this.json.f1.colproperty !== undefined) {
                if (this.json.f1.colproperty.obj.length !== undefined) {
					//默认的列属性 列宽
					if (this.defaultcolwidth !== '') {
					   
						this._cols[i].width = parseInt(this.defaultcolwidth, 10); //默认高度
				   
					}
				    for (var k = 0; k < this.json.f1.colproperty.obj.length; k++) {//设定的 列属性
                        if (parseInt(this.json.f1.colproperty.obj[k].attributes.lineval, 10) === (i + 1)) {

							for(var p in this.json.f1.colproperty.obj[k].attributes){
								if(p === 'linesize'){
									
									var width = parseInt(this.json.f1.colproperty.obj[k].attributes.linesize, 10);

									if (width !== '' && width !== 0) {
										this._cols[i].width = width;
									} else if (this.defaultcolwidth !== '') {
										this._cols[i].width = parseInt(this.defaultcolwidth, 10);;
									}
									continue;
								}
								this._cols[i][p]=this.json.f1.colproperty.obj[k].attributes[p];
							}
                            var tagval = parseInt(this.json.f1.colproperty.obj[k].attributes.tagval, 10);//列的可见性
                            var tag = (tagval >> 9) & 0x01;
                            if (tag || this.json.f1.colproperty.obj[k].attributes.linesize==="0") this._cols[i].visible = false;
							

                        }
                    }
                } else //无length
                {
					 var tempcol= parseInt(this.json.f1.colproperty.obj.attributes.lineval, 10);
                    if (tempcol === (i + 1)) {//存在
						for(var p in this.json.f1.colproperty.obj.attributes){
							if(p === 'linesize'){
								this._cols[i].width = parseInt(this.json.f1.colproperty.obj.attributes.linesize, 10); //默认宽度
								continue;
							}
							this._cols[i][p]=this.json.f1.colproperty.obj.attributes[p];
						}
                    } else {
                        this._cols[i].width = parseInt(this.defaultcolwidth, 10);;
                    }
				   
					
                }
            } else {//无colproperty
                if (this.defaultcolwidth != '') {
                    this._cols[i].width = parseInt(this.defaultcolwidth, 10); //默认宽度
                }
            }
        }
    },
    parseDefattributes: function(obj) {
		var attributes=obj.attributes;
	    for (p in attributes) {
			this.datagrid["_"+p] =  attributes[p];  
	    }
    },
    isPrototype: function(prototype, pos) {
        return (prototype >> pos) & 0x01;
    },
    setPrototype: function(someFunction, someArgument) {
        return someFunction(someArgument);
    },
    setfl: function(prototype, cl) {
        var prototype = parseInt(prototype, 10);
        var _borderline = '',
        _frozenCell = true,
        _autoLineFeed = false,
        _controlsItem = '',
		_visible=true;
        if (this.isPrototype(prototype, 0)) {
            _frozenCell = false;
        }
        if (this.isPrototype(prototype, 2)) {
            _visible = false;
        }
        if (this.isPrototype(prototype, 4)) {
            _borderline = "left";
        }
        if (this.isPrototype(prototype, 5)) {
            _borderline = _borderline === '' ? "top": _borderline += "-" + "top";
        }
        if (this.isPrototype(prototype, 6)) {
            _borderline = _borderline === '' ? "right": _borderline += "-" + "right";
        }
        if (this.isPrototype(prototype, 7)) {
            _borderline = _borderline === '' ? "bottom": _borderline += "-" + "bottom";
        }
        if (this.isPrototype(prototype, 8)) {
            _autoLineFeed = true;
        }
        if (this.isPrototype(prototype, 9)) {
            _controlsItem = {
                'type': 'number',
				edit:true
            };
        }
        if (this.isPrototype(prototype, 10)) {
            var editable = this.setnoedit[parseInt(cl.cellcheck.attributes.noedit, 10)];

            var checked = parseInt(cl.cellcheck.attributes.ckd, 10);
            checked === 0 ? checked = false: checked = true;
            _controlsItem = {
                'type': 'radiobutton',
                'edit': editable,
                'status': checked
            };
        }
        if (this.isPrototype(prototype, 11)) {
			var newwin=cl.cellurl.attributes.newwin!==undefined?cl.cellurl.attributes.newwin:'';
            _controlsItem = {
                'type': 'url',
				'newwin':newwin
				//edit:true
            };
        }
        if (this.isPrototype(prototype, 15)) //财务表览
        {
            _controlsItem = {
                'type': 'financialmain',
                'edit': true
            };
        }

        if (this.isPrototype(prototype, 12)) {
            var dropvalue = [];
            if (cl.clco.it1 !== undefined) {
                if (cl.clco.it1.length !== undefined) { //数组
                    for (var i = 0; i < cl.clco.it1.length; i++) {
                        dropvalue.push({
                            'key': cl.clco.it1[i].attributes.val,
                            'value': cl.clco.it2[i].attributes.val
                        });
                    }
                } else {
                    dropvalue.push({
                        'key': cl.clco.it1.attributes.val,
                        'value': cl.clco.it2.attributes.val
                    });
                }
            }
            _controlsItem = {
				'tagval':cl.clco.attributes.tagval,
                'type': 'dropdownbox',
                edit: true,
                'value': dropvalue
            };
        }
        if (this.isPrototype(prototype, 13)) {
            var timestyle = this.setdwstyle[cl.cldt.attributes.dwstyle];
            _controlsItem = {
                'type': 'time',
                edit: false,
                'value': timestyle
            };
        }

        return {
            "borderline": _borderline,
            "frozenCell": _frozenCell,
            "autoLineFeed": _autoLineFeed,
            "controlsItem": _controlsItem,
			"visible":_visible
        };
    },
    settag: function(prototype) {
        var prototype = parseInt(prototype, 10);
        var _cellImage = _controlsItem = _cellTag = '';
        if (this.isPrototype(prototype, 0)) {
            _controlsItem = {
                'type': 'financialhead',
                'edit': true
            };
        }
        if (this.isPrototype(prototype, 3)) {
            _cellImage = {
                "type": "cell"
            };

        }
        if (this.isPrototype(prototype, 4)) {
            _cellImage = {
                "type": "cell",
                "size": "origin"
            };

        }
        if (this.isPrototype(prototype, 5)) {
            _cellImage = {
                "type": "3Dbox",
                "edit": true
            };

        }

        if (this.isPrototype(prototype, 15)) {
            _cellImage = {
                "type": "cell",
                "size": "imgsize"
            };

        }
        if (this.isPrototype(prototype, 11)) {
            _cellTag = {
                "superscript": true,
                "edit": true
            }; //上下标
        }
        return {
            "cellImage": _cellImage,
            "controlsItem": _controlsItem,
            "cellTag": _cellTag
        };

    },

    setslty: function(prototype) {
        var _slantline = '';
        prototype = parseInt(prototype, 10);
        switch (prototype) {
        case 0:
            _slantline = 'none';
            break;
        case 1:
            _slantline = "slantline";
            break;
        case 2:
            //上对角线
            _slantline = "tslantline";
            break;
        case 3:
            _slantline = "bslantline";
            break;
        case 4:
            //横线
            _slantline = "cslantline";
            break;
        case 5:
            //竖线
            _slantline = "vslantline";
            break;
        case 6:
            //动态竖线
            _slantline = "bvslantline";
            break;
        case 7:
            //动态横线
            _slantline = "bcslantline";
            break;
        case 8:
            //反对角线
            _slantline = "aslantline";
            break;
        default:

        }

        return {
            "slantline":
            _slantline
        };
    },

    setftid: function(obj, i, j) {
        if (obj.attributes.hei !== undefined) {
            this._cells[i][j].fontSize = -parseInt(obj.attributes.hei, 10);
        } else {
            this._cells[i][j].fontSize = 10;
        }
        if (obj.attributes.wei !== undefined) {
            this._cells[i][j].fontBold = true;
        }
        if (obj.attributes.fname !== undefined) {
            this._cells[i][j].fontFamily = obj.attributes.fname;
        }
        if (obj.attributes.uline !== undefined) {
            this._cells[i][j].fontUnderline = true;
        }
    },

    setnoedit: {
        "1": false,
        "0": true
    },

    setdwstyle: {
        "0": "longtime",
        "1": "shortdate",
        "2": "time",
        "3": "timedate",
        "4": ""
    },

    sethag: {
        "0": "left",
        "6": "center",
        "2": "right"
    },
    //水平
    setvag: {
        "0": "top",
        "6": "middle",
        "8": "bottom"
    },
    //垂直
    setborderstyle: {
        "0": "default",
        "1": "dashed",
        "2": "dotted",
        "3": "butt",
        "4": "bbut"
    },

    setswty: {
        "0": "default",
        "11": "9",
        "12": "10",
        "13": "11",
        "14": "12",
        "15": "13",
        "16": "14"
    },

    getcolor: function(color) {
        var color = parseInt(color, 10).toString(16);
        if (color.length === 6) {
            return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
        } else if(color.length===2){
			color='0000'+color;
			return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	   }else if(color.length===4){
	   		color='00'+color;
			return "#" + color[4] + color[5] + color[2] + color[3] + color[0] + color[1];
	   }else if(color.length===1){
	   		if(color==="0"){
				return "#000000";	
			}
	   }else{
		   return "#" + color;
       }
    },
	getClco:function(obj){
		  var clcos={};
		  for(var p in obj.attributes){
			  clcos[p]=obj.attributes[p];	
		  }
		  if(T.object.getPrototypeNum(obj)>1){
			  clcos['childs']=[];
			  if (obj.it1.length !== undefined) { //数组
				  for (var i = 0; i < obj.it1.length; i++) {
					  clcos['childs'].push({
						  'key': obj.it1[i].attributes.val,
						  'value': obj.it2[i].attributes.val
					  });
				  }
			  } else {
					  clcos['childs'].push({
						  'key': obj.it1.attributes.val,
						  'value': obj.it2.attributes.val
					  });
			  }
		  }
		  return clcos;
	},
    parseCellattributes: function(obj) {
        this._cells = [];

        for (i = 0; i < this.defaultrowslength; i++) {
            this._cells.push(new Array());
            for (j = 0; j < this.defaultcolslength; j++) {
                this._cells[i].push({});
            }
        }
		
        if (obj.row !== undefined) {
			
				for (var k = 0 ,len = obj.row.length||1; k < len; k++) {
					obj.row.length ===undefined ? obj.row[k]= obj.row:null;
					if (obj.row[k].cl !== undefined) {
						if (obj.row[k].cl.length !== undefined) {
							for (var h = 0; h < obj.row[k].cl.length; h++) {
								
	//							if(!obj.row[k].cl[h]){
	//								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][h]={};
	//								continue;	
	//							}
								var attributes = obj.row[k].cl[h].attributes;
								var cl=obj.row[k].cl[h];
								var i = this.json.f1.celllist.row[k].attributes.val - 1,
								j = attributes.col - 1;
								for (var p in attributes) {
									if(p==='imagetype'){
										this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]['cellImage']={'imagetype':attributes['imagetype'],'filename':attributes['imagedata'],
										'width':attributes['imagewidth'],'height':attributes['imageheight'],'length':attributes['imagelen']};	
										continue;
									}
									if(p === 'imagelen' || p==='imagewidth' || p==='imageheight' || p==='imagedata' )continue;
									if(p ==='note' || p === 'lscript'){attributes[p]=attributes[p].replace(/&/g,'%101');}
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1][p] = attributes[p];	
									
								}
								if(cl.cellurl!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellurl"]=this.getClco(cl.cellurl);
									
								}
								if(cl.clco!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["clco"]=this.getClco(cl.clco);
									
								}
								if(cl.cellcheck!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellcheck"]=this.getClco(cl.cellcheck);
								}
								if(cl.cellbutton!==undefined){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellbutton"]=this.getClco(cl.cellbutton);
								}
						   }
						} else if (this.json.f1.celllist.row[k].cl.length === undefined) {
							var cl = this.json.f1.celllist.row[k].cl;
							var attributes = this.json.f1.celllist.row[k].cl.attributes;
	
							for (var p in attributes) {
								if(p==='imagetype'){
									this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]['cellImage']={'imagetype':attributes['imagetype'],'filename':attributes['imagedata'],
									'width':attributes['imagewidth'],'height':attributes['imageheight'],'length':attributes['imagelen']};	
										continue;
									}
									if(p === 'imagelen' || p==='imagewidth' || p==='imageheight' || p==='imagedata' )continue;
									if(p ==='note' || p === 'lscript'){attributes[p]=attributes[p].replace(/&/g,'%101');}
								if(p ==='note' || p === 'lscript'){attributes[p]=attributes[p].replace(/&/g,'%101');}
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1][p] = attributes[p];
							} //for
							if(cl.cellurl!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellurl"]=this.getClco(cl.cellurl);
								
							}
							if(cl.clco!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["clco"]=this.getClco(cl.clco);
								
							}
							if(cl.cellcheck!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellcheck"]=this.getClco(cl.cellcheck);
							}
							if(cl.cellbutton!==undefined){
								this._cells[this.json.f1.celllist.row[k].attributes.val - 1][attributes.col - 1]["cellbutton"]=this.getClco(cl.cellbutton);
							}
	
						} //cl.length
				}
			}
		}else{
			
		}
    }

}
var Json=function(json){
	var json = eval('(' + json + ')');
	return {
		getJson:function(){return json},
		findItem:function(obj,json){
			for(k in json){
				if(json[k].name ===obj ){
					return json[k].raw;
				}else{
					return arguments.callee(obj,json[k]['child']);
				}
			}
		}
	}	
}
var exportXml = function(dataGrid) {

var leftbarjson=T.ajax.ajaxGetJson("html/leftbar.js",undefined,false);
if(leftbarjson!==''){
	leftbarjson= Json(leftbarjson);
}
	
var isEdit = leftbarjson.findItem(_gl_filename.slice(0,-4),leftbarjson.getJson());
if(isEdit === 1){alert('模板文件,无法修改');return;}

var General=["caneditform","rowheadwidth","colheadheight","showgrid","showheader","totalcol","totalrow","vermajor","verminor","tableimage","backimage",
			 "pacolor","maxeditrow","maxeditcol","showformula","protecthascursor","dclicklabelsort","propertiy","printgrid","fixedcols",
			 "printhcalign","printvcalign","designmode","showmenu","loadscript","data","userfuncs","genscript","savedb","hiderowdrag",
			 "tagvalue","tagval2","titlerows","selbkcolor","calscript","calscripttype","cursorwidth","sysdbsource","prefooterrows","pfooterrows",
			 "gridcolor","gridtype","statscript","errmsgbox","pagerows","useado","allowrowresize","allowcolresize","autojump","sheetname",
			 "rowautosize"];	
 var Defaultcell=["swty","hag","vag"];  
 
 var Rowproperty=["tagval","tagval2","lineval","linesize","type","text","val","childval","oddbkcolor","evenbkcolor","oddtcolor","eventcolor"];
 var Colprototype=[];
	function xmlToJson(xml) { 
		// Create the return object 
		var obj = {};
		
		if (xml.nodeType == 1) { // element 
			// do attributes 
			if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text 
			obj = xml.nodeValue;
		}
		
		// do children 
		if (xml.hasChildNodes()) {
			for (var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].length) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	};
	function rscConvert(string){
		var replaces={  "<" :"&lt;",
						">" :"&gt;",
						"\n" : "&#x0D;&#x0A;",
						"&":"&amp;",
						'"':"&quot;",
						"'":'&apos;'};
		var tempstring='';			 
		for(var i=0;i<string.length;i++){
			if(string[i] in  replaces){
				tempstring+=	replaces[string[i]];
			}	else{
				tempstring+=string[i];
			}
		}	
		
		return tempstring;
	}
	function insertCellElm(eml,config){
		var clco=xmldoc.createElement("clco");
			for(p in config){
				if(p === 'childs'){
					for(var i =0;i<config[p].length;i++){
						
						var it1=xmldoc.createElement("it1");
						it1.setAttribute("val",config[p][i]['key']);
						var it2=xmldoc.createElement("it2");
						it2.setAttribute("val",config[p][i]['value']);		
						clco.appendChild(it1);
						clco.appendChild(it2);
						
					}
					continue;	
				}
				clco.setAttribute(p,config[p]);	
			}
		eml.appendChild(clco);
	}
	function insertCellElm1(eml,config,name){
		var clco=xmldoc.createElement(name);
		for(p in config){
			clco.setAttribute(p,config[p]);	
		}
		eml.appendChild(clco);
	}
	function setCellPrototype(elm,config){
		var cellp = ["tag","fl","flex","brid","dpt","ftid","tpenid","bpenid","lpenid","rpenid","hag","vag","swty","spenid","t",'cellImage',
"cellbutton",
					 "tcor","bcor","slty","bname","f","rows","cols","uval","sval","tspan","lspan","lkspan","rspan","bspan","rowspan",
					 "colspan","note","lscript","lexcel","ldata","cmscript","input","tip","barcode","bkeffect","bkgranularity","bkmidcr"
					 ,"bkendcr","cellcheck","cellurl","clcobtn","clco","cldt"];	
		var cellcheckp=["ckd","noedit"];
		var cellurlp=["url","newwin"];
		var clcop=["tagval","itcount","valcount"];
		var cldtp=["dwstyle","year","mon","day","hour","min","sec"];
		for(var i=0;i<cellp.length;i++){
			if(cellp[i] in config){
				
				if(cellp[i] === "cellImage") {
					elm.setAttribute('imagetype',config[cellp[i]].imagetype);
					elm.setAttribute('imagelen',config[cellp[i]].length);	
					elm.setAttribute('imagewidth',config[cellp[i]].width);	
					elm.setAttribute('imageheight',config[cellp[i]].height);	
					elm.setAttribute('imagedata',config[cellp[i]].filename);
					continue;	
				}
				if(cellp[i]==='clco') {insertCellElm(elm,config[cellp[i]]);continue;}
				if(cellp[i]==='cellurl' || cellp[i]==='cellcheck' || cellp[i]==='cldt' || cellp[i] === 'cellbutton'){insertCellElm1(elm,config[cellp[i]],cellp[i]);continue;}

				elm.setAttribute(cellp[i],config[cellp[i]]);	
			}
			
		}
		
	}
	function get16str(color){
		if(typeof color==='number')color=String(color);
		var str=color.substring(1);	
		str=str[4] + str[5] + str[2] + str[3] + str[0] + str[1];
		return parseInt(str,16);
	}
	var xmldoc, xmlnode; 

    xmldoc = document.implementation.createDocument("", "chinaexcel", null);
	var f1 = xmldoc.createElement("f1");
		var general= document.createElement("general");
		for(var i=0;i<General.length;i++){
			if("_"+General[i] in dataGrid){
				//if(General[i] === "userfuncs" || General[i] ==="statscript") {
					//dataGrid["_"+General[i]] = rscConvert(dataGrid["_"+General[i]]);
					//var newCDATA = xmldoc.createCDATASection(dataGrid["_"+General[i]]);
					//newCDATA=(new XMLSerializer()).serializeToString(newCDATA);
					//general.appendChild(newCDATA);
					
					//general.setAttribute(General[i],"<![CDATA["+dataGrid["_"+General[i]]+"]]>");		
				//}else{
				if(General[i] === 'showgrid' && dataGrid["_"+General[i]] === 1 ){
					continue;
				}
				if(General[i] === 'showheader' && dataGrid["_"+General[i]] === 1 ){
					continue;
				}
				general.setAttribute(General[i],dataGrid["_"+General[i]]);	
				//}
			}
		}
		general.setAttribute("totalrow",dataGrid["_rowsNum"]);
		general.setAttribute("totalcol",dataGrid["_colsNum"]);
		
		//general.setAttribute('align','right');
		var print = xmldoc.createElement("print");
		for(var p in dataGrid.print){
			var print_child=xmldoc.createElement(p);
			print_child.InnerXml='';
				for(var i in dataGrid.print[p]){
					print_child.setAttribute(i,dataGrid.print[p][i]);		
				}
			print.appendChild(print_child);
		}
		
		
		var defaultcell=xmldoc.createElement("defaultcell");
		for(var i=0;i<Defaultcell.length;i++){
			if("_"+Defaultcell[i] in dataGrid){
				defaultcell.setAttribute(Defaultcell[i],dataGrid["_"+Defaultcell[i]]);	
			}
		}
		var celllist = xmldoc.createElement("celllist");
		celllist.setAttribute('writebyrow','1');
		for(var i=0;i<dataGrid._cells.length;i++){
			
				var row =  xmldoc.createElement("row");	
				row.setAttribute('val',i+1);
				for(var j=0;j<dataGrid._cells[i].length;j++){
					var cell = new DataCell(dataGrid._cells[i][j]);
					if(!T.isEmptyObject(dataGrid._cells[i][j]) && cell.ifPaint()){
						var cl = 	xmldoc.createElement("cl");	
						cl.setAttribute('col',j+1);
						setCellPrototype(cl,dataGrid._cells[i][j]);
						row.appendChild(cl);
					}else{
						
						continue;	
					}
				}
			
			celllist.appendChild(row);
		}	
		
		if(dataGrid['_ftlist'] !== undefined){
			var ftlist=xmldoc.createElement("ftlist");
			for(var i=0;i<dataGrid['_ftlist'].length;i++){
				var ftlist_obj=xmldoc.createElement("obj");
				for(var p in dataGrid['_ftlist'][i]){
					ftlist_obj.setAttribute(p,dataGrid['_ftlist'][i][p]);
				}
				ftlist.appendChild(ftlist_obj);
			}
		}
		
		var imglist=xmldoc.createElement("imglist");
		for(var i=0;i<dataGrid['_imglist'].length;i++){
			var imglist_obj=xmldoc.createElement("obj");
			for(var p in dataGrid['_imglist'][i]){
		    	imglist_obj.setAttribute(p,dataGrid['_imglist'][i][p]);
			}
			imglist.appendChild(imglist_obj);
		}
		
		if(dataGrid['_brlist'] !== undefined){
			var brlist=xmldoc.createElement("brlist");
			for(var i=0;i<dataGrid['_brlist'].length;i++){
				var brlist_obj=xmldoc.createElement("obj");
				brlist_obj.setAttribute("color",get16str(dataGrid['_brlist'][i]));
				brlist.appendChild(brlist_obj);
			}
		}
		var rendXml =function(data,name){
			var temp = xmldoc.createElement(name);
			for(var p in data){
				if(typeof data[p] !=='object'){
					temp.setAttribute(p,data[p]);
				}else{
					
					temp.appendChild(rendXml(data[p],p));	
				}
			}
			return temp;

		}
		if(dataGrid['_chartattribute'] !== undefined){
			var rule = dataGrid['_chartattribute'];
			var chart=xmldoc.createElement("drawobjs");
			chart.appendChild(rendXml(rule,"obj"));
		}
		
		if(dataGrid['_penlist'] !== undefined){
			var penlist=xmldoc.createElement("penlist");
			for(var i=0;i<dataGrid['_penlist'].length;i++){
				var penlist_obj=xmldoc.createElement("obj");
				for(var p in dataGrid['_penlist'][i]){
					if(p ==='color'){
						penlist_obj.setAttribute(p,get16str(dataGrid['_penlist'][i][p]));
						continue;	
					}
					penlist_obj.setAttribute(p,dataGrid['_penlist'][i][p]);
				}
				penlist.appendChild(penlist_obj);
			}
		}
		
		if(dataGrid['_rows'] !== undefined){
			var rowproperty=xmldoc.createElement("rowproperty");
			for(var i=0;i<dataGrid['_rows'].length;i++){
				if(dataGrid['_rows'][i].linesize!==undefined){
					var rowproperty_obj=xmldoc.createElement("obj");
						rowproperty_obj.setAttribute("tagval",dataGrid['_rows'][i].tagval);
						rowproperty_obj.setAttribute("tagval2",dataGrid['_rows'][i].tagval2);
						rowproperty_obj.setAttribute("lineval",i+1);
						rowproperty_obj.setAttribute("linesize",dataGrid['_rows'][i].height);
						rowproperty_obj.setAttribute("type",dataGrid['_rows'][i].type);
						rowproperty_obj.setAttribute("tagval",dataGrid['_rows'][i].tagval);
						rowproperty_obj.setAttribute("text",dataGrid['_rows'][i].text);
						rowproperty.appendChild(rowproperty_obj);
				}
				
			}
		}
		
		if(dataGrid['_cols'] !== undefined){
			var colproperty=xmldoc.createElement("colproperty");
			for(var i=0;i<dataGrid['_cols'].length;i++){
				if(dataGrid['_cols'][i].linesize!==undefined){
					var colproperty_obj=xmldoc.createElement("obj");
						colproperty_obj.setAttribute("tagval",dataGrid['_cols'][i].tagval || 160);
						colproperty_obj.setAttribute("tagval2",dataGrid['_cols'][i].tagval2);
						colproperty_obj.setAttribute("lineval",i+1);
						colproperty_obj.setAttribute("linesize",dataGrid['_cols'][i].width);
						colproperty_obj.setAttribute("type",dataGrid['_cols'][i].type);
						colproperty_obj.setAttribute("text",dataGrid['_cols'][i].text);
						colproperty.appendChild(colproperty_obj);
				}
				
			}
		}
		
		f1.appendChild(general);
		f1.appendChild(print);
		f1.appendChild(defaultcell);
		f1.appendChild(celllist);
		if(chart !== undefined)f1.appendChild(chart);
		if(ftlist !== undefined)f1.appendChild(ftlist);
		if(brlist !== undefined)f1.appendChild(brlist);
		if(penlist !== undefined)f1.appendChild(penlist);
		if(imglist.childNodes.length !== 0)f1.appendChild(imglist);
		
		if(rowproperty.childNodes.length !== 0)f1.appendChild(rowproperty);
		if(colproperty.childNodes.length !== 0)f1.appendChild(colproperty);

	var json  = xmlToJson(f1);
	json='{"f1":'+JSON.stringify(json).replace(/@attributes/g,'attributes')+'}';
	xmldoc.documentElement.appendChild(f1);

	 
    xmldoc=(new XMLSerializer()).serializeToString(xmldoc);
	var ss =/((.+?)\.xjc)(\.js)?/g.test(_gl_filename);
	var filename = RegExp.$1;
					
	var box = T.html.loading(800,540,228,48,document.getElementById("mainleft"));
	
	T.ajax.ajaxPost("html/lib/saveXmlFile.php?filename="+encodeURIComponent(filename),xmldoc,
			function(){					
					var ss =/((.+?)\.xjc)\.js/g.test(_gl_filename);
					var filename = RegExp.$1;
					if (localStorage.getItem(filename)) {
						localStorage.setItem(filename, json);
					}
					clearCeng('myContextMenu');
					clearCeng(box);
					alert('保存成功');

				}(json),true
	);

}

// JavaScript Document
var leftbar = function (mainDiv, leftbarjson, dataGrid) {
    var _this = this;
    this.grid = dataGrid;
    this.left_table = mainDiv.getElementsByTagName("ul").item(0);

    this.left_tablechild = mainDiv.getElementsByTagName("div").item(0).getElementsByTagName("div").item(0);

    this.add_sheet = this.left_table.getElementsByTagName("a").item(1);

    this.config = leftbarjson;

    this.inital();

    this.nextsibling = function(elm) {
        var nextelm = elm.nextSibling;
        if (nextelm.nodeName.toUpperCase() === '#TEXT') {
            nextelm = nextelm.nextSibling;
        }
        return nextelm;
    }

    this.add_sheet.addEventListener("click",function(event) {return _this.addnewoptionbox("添加新类", _this,undefined,event)},false); //添加类别 box 弹出框
	var ulelm = this.ulelm = '';
    if (this.left_tablechild.childNodes[1] !== undefined) {
        var ulelm = this.ulelm = this.left_tablechild.childNodes[1].childNodes;
	}
	
    for (var i = 0; i < ulelm.length; i++) {
        if (ulelm[i].className.indexOf('left-table01') !== -1) {
            if (ulelm[i].getElementsByTagName("div").item(0) !== null) ulelm[i].getElementsByTagName("div").item(0).style.display = 'none';
            ulelm[i].onclick = function() {
                var meinv = this;
                if (this.getElementsByTagName("div").item(0) !== null) {
					var img = this.getElementsByTagName("span").item(0),
						imgClass = T.html.getClass(img);
					if(imgClass .indexOf('elbow-minus-nl')!==-1){
						T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-plus-nl');
					}else{
						T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-minus-nl');
					}
					if (this.getElementsByTagName("div").item(0).style.display === 'none') {
                        this.style.background='#fff';
						this.getElementsByTagName("div").item(0).style.display = 'block';
                    } else {
						var childs = this.parentNode.childNodes;
						for(var i=0;i<childs.length;i++){
							childs[i].style.background='#fff';
						}
						this.style.background='#eeeeee';
                        this.getElementsByTagName("div").item(0).style.display = 'none';
                    }
                }
				clearCeng("myContextMenu");
            }
        }
    }
    mainDiv.onclick = function(event) {
        var meinv = event.srcElement ? event.srcElement: event.target;
        if (meinv.nodeName.toUpperCase() === 'A') {
            if (meinv.name === 'parent') {
                var nextelm = meinv.parentNode.parentNode.parentNode.nextSibling;
                if (nextelm.nodeName.toUpperCase() === '#TEXT') nextelm = nextelm.nextSibling;
                if (nextelm.style.display === 'none') {
                    nextelm.style.display = 'block';
					T.html.setClass(meinv.parentNode.parentNode.getElementsByTagName('span').item(0),'icon4');
                } else {
                    nextelm.style.display = 'none';
					T.html.setClass(meinv.parentNode.parentNode.getElementsByTagName('span').item(0),'icon3');
                }
            } else {
				//var now=new Date(); 
				//var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
                dataGrid.importxml('upload/' + meinv.name + '.xjc');
            }
        } else if (meinv.nodeName.toUpperCase() === 'SPAN') {

        }
    }
    return mainDiv;
}

leftbar.prototype = {
	
	removeClass : function(obj){
			var ullist =obj.getElementsByTagName("div").item(0).childNodes;

			for(var i=0;i<ullist.length;i++){
				if(ullist[i].getElementsByTagName("div").item(0)==null){
					ullist[i].className = ullist[i].className.replace(/ bt_select/,'');	
				}else{
					if(ullist[i].getElementsByTagName("div").item(0).style.display==='block'){
						var childs = ullist[i].getElementsByTagName("div").item(0).childNodes;
						for(var j=0;j<childs.length;j++){
							if(childs[j]['data-type'] === 'parent'){
								arguments.callee(childs[j]);	
							}else{
								childs[j].className = childs[j].className.replace(/ bt_select/,'');	
							}
						}
					}
				}
			} 
		},

    inital: function() {
        var listoption = function(_this, option) {
            var _this = _this;
            var elm = document.createElement("div");
            
            if (T.isEmptyObject(option) === false && option !== '') {
                for (var i = 0; i < option.length; i++) {
                    var tempul = document.createElement("ul");
                    tempul.className = 'left-table01';

                    tempul.style = 'display:block';
					
                    if (option[i].type !== undefined) {

                        if (option[i].type === 'parent') {

                            tempul.innerHTML = '<span class ="elbow-plus-nl"></span><span class ="folder"></span>';

                            tempul.className = 'left-table02 parent';
							tempul['data-type']='parent';
                            tempul.style.marginLeft = 5 + "px";
                            tempul.onclick = function(event) {
                                if (this.getElementsByTagName("div").item(0) !== null) {
									var img = this.getElementsByTagName("span").item(0),
										imgClass = T.html.getClass(img);
									if(imgClass .indexOf('elbow-minus-nl')!==-1){
										T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-plus-nl');
									}else{
										T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-minus-nl');
									}
                                    if (this.getElementsByTagName("div").item(0).style.display === 'none') {
                                        this.getElementsByTagName("div").item(0).style.display = 'block';
                                    } else {
                                        this.getElementsByTagName("div").item(0).style.display = 'none';
                                    }
                                }
								clearCeng("myContextMenu");
                                preventDefault(event);
                            }
							
							if(!T.isEmptyObject(option[i].child)){
								listoption(_this, option[i].child);	
							}
                        } else if (option[i].type === 'child') {
							
							if(_gl_filename !== option[i].name+'.xjc'){
								elm.style.display = 'none';
							}else{
							
								elm.style.display = 'block';
								
							}
                            
                            tempul.innerHTML = '<span class="leaf"></span>';
                            tempul.className = 'left-table02 child';
							tempul['data-type']='child';
                            tempul.name = option[i].name;
                            tempul.style.marginLeft = 5 + "px";
                            tempul.onclick = function(event) {
								_this.removeClass(_this.left_tablechild,this);
								if(this.className.indexOf('bt_select')===-1){//存在
									this.className+=' bt_select';
									var meinv = event.srcElement ? event.srcElement: event.target;
									
									_this.grid._editBox.style.display = "none";
									_this.grid.importxml('html/upload/' + this.name + '.xjc');
								}
								preventDefault(event);
								clearCeng("myContextMenu");
                            }
                            tempul.onmousedown = function(event) {
                                preventDefault(event);
                            }
                        }
                    } else {
                        tempul.innerHTML = '<span class ="elbow-plus-nl"></span><span class ="folder"></span>';
                        tempul.className = 'left-table01 parent';

                    }
                    var tempspan = document.createElement("span");
                    if (option[i].type === 'child') {
						
                        tempspan.innerHTML = "<a name=" + option[i].name + ">" + option[i].name + "</a>";
                    } else {
                        tempspan.innerHTML = option[i].name;
                    }
				 	var tempeditoption = document.createElement("span");
					
					if(option[i].type === 'child'){
						if(option[i].raw !== 1){
							
							tempeditoption.innerHTML='<em class="s_b_del_icon"> </em>';
							tempeditoption.title='删除';
							tempeditoption.addEventListener("click",function(event) {return _this.ulelmdel(_this,event)},false);
						}else{
							tempul.setAttribute("raw",1); // 设置  	
						}
					}else{
						tempeditoption.innerHTML='<em id="s_b_settings_icon"> </em>';
						tempeditoption.addEventListener("click",function(event) {return _this.ulelmClick(_this,event)},false);
					} 
            		tempspan.appendChild(tempeditoption);

                    tempul.appendChild(tempspan);

                    if (option[i].child !== undefined) {
                        tempul.appendChild(listoption(_this, option[i].child));
                    }

                    if (tempul.className !== 'left-table02 child') {
                    }
                    elm.appendChild(tempul);

                } //for
            } //if
            return elm;
        };
        if (T.isEmptyObject(this.config) === false && this.config !== '') {
            var _this = this;

            this.left_tablechild.appendChild(listoption(_this, this.config));
        }

    },
    add_option: function(html,node,type){
        var _this = this;
		var node= String(node);
        var getNewelm=function(html,type){
			var filename =html;
			var tempul = document.createElement("ul");
			
			if (type === 'parent') { //文件夹类型
				tempul.innerHTML = '<span class ="elbow-plus-nl"></span><span class ="folder"></span>';
				tempul.className = 'left-table01 parent';
				if(node !== '-1')tempul.style.marginLeft = 5 + "px";
			
			} else if (type === 'child') {
				
				tempul.style.marginLeft = 5 + "px";
				tempul.innerHTML = '<span class="leaf"></span>';
				tempul.className = 'left-table02 child';
			}
		    tempul.style = 'display:block';

			var tempspan = document.createElement("span");
			if (type === 'child') {
				tempspan.innerHTML = "<a name=" + html + ">" + html + "</a>";
			} else {

				tempspan.innerHTML = html;
			}
			var tempeditoption = document.createElement("span");
			
			if(type === 'child'){
				tempeditoption.innerHTML='<em class="s_b_del_icon"> </em>';
				tempeditoption.title='删除';
				tempeditoption.addEventListener("click",function(event) {return _this.ulelmdel(_this,event)},false);
			}else{
				tempeditoption.innerHTML='<em id="s_b_settings_icon"> </em>';
				tempeditoption.addEventListener("click",function(event) {return _this.ulelmClick(_this,event)},false);
			} 
				
			tempspan.appendChild(tempeditoption);
			
			tempul.appendChild(tempspan);
			
			tempul.onclick = function() {
				return function(){
					if(type === 'parent'){
						if (this.getElementsByTagName("div").item(0) !== null) {
							var img = this.getElementsByTagName("span").item(0),
								imgClass = T.html.getClass(img);
							if(imgClass .indexOf('elbow-minus-nl')!==-1){
								T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-plus-nl');
							}else{
								T.html.setClass(this.getElementsByTagName("span").item(0),'elbow-minus-nl');
							}
							if (this.getElementsByTagName("div").item(0).style.display === 'none') {
								this.getElementsByTagName("div").item(0).style.display = 'block';
							} else {
								this.getElementsByTagName("div").item(0).style.display = 'none';
							}
						}
						clearCeng("myContextMenu");
						preventDefault(event);
					}else if(type === 'child'){
						_this.removeClass(_this.left_tablechild,this);

						if(this.className.indexOf('bt_select')===-1){//存在
							this.className+=' bt_select';
							var meinv = event.srcElement ? event.srcElement: event.target;
							_this.grid._editBox.style.display = "none";
							_this.grid.importxml('html/upload/' + html + '.xjc');
						}
						preventDefault(event);
						clearCeng("myContextMenu");
					}
				}
			}(filename);
			tempul.onmousedown = function(event) {

				preventDefault(event);
			}
			
		    return tempul;
		};
		
		if( node === '-1'){
			
			this.left_tablechild.getElementsByTagName("div").item(0).appendChild(getNewelm(html,type));	
		}else if(node.indexOf('-')===-1){
			var child = this.left_tablechild.getElementsByTagName("div").item(0);
			if(child.childNodes[node].getElementsByTagName("div").item(0)===null){
				child.childNodes[node].appendChild(document.createElement("div"));	
			}
			child.childNodes[node].getElementsByTagName("div").item(0).appendChild(getNewelm(html,type));
		}else if(node.indexOf('-')!==-1){
			
			var nodes = node.split('-');
			var i=0,elm=this.left_tablechild.getElementsByTagName("div").item(0);
			
			var getelm=function(elm , nodes){
				while(nodes[i]!==undefined){
					if(elm.childNodes[nodes[i]].getElementsByTagName("div").item(0)!==null){
						elm = elm.childNodes[nodes[i]].getElementsByTagName("div").item(0);
					}else{
						elm=elm.childNodes[nodes[i]].appendChild(document.createElement("div"));	
					}
					i++;	
				}
				return elm;
			};
			
			elm = getelm(elm , nodes);
			elm!==null?elm.style.display='block':null;
			elm.appendChild(getNewelm(html,type));
		}
    },
	deleteOption:function(node){
		if(String(node).indexOf('-')===-1){
			var childs=this.left_tablechild.getElementsByTagName("div").item(0);
			
			this.left_tablechild.getElementsByTagName("div").item(0).removeChild(childs.childNodes[node]);			
		}else if(String(node).indexOf('-')!==-1){
			var nodes = node.split('-');
			var i=0,elm=this.left_tablechild.getElementsByTagName("div").item(0);
			var getelm=function(elm , nodes){
				while(nodes[i]!==undefined){
					if(i === nodes.length-1){
						elm = elm.childNodes[nodes[i]];
						break;	
					}
					elm = elm.childNodes[nodes[i]].getElementsByTagName("div").item(0) === null?elm.childNodes[nodes[i]]:elm.childNodes[nodes[i]].getElementsByTagName("div").item(0);
					i++;
				}
				return elm;
			};
			
			elm = getelm(elm , nodes);
			
			elm.parentNode.removeChild(elm);
	
	    }
	},
    left_tablechildclick: function(event) {
        var meinv = this.left_table;
        if (this.nextsibling(meinv).style.display == 'none') {
			T.html.setClass(meinv.getElementsByTagName('span').item(0),'icon3');
            this.nextsibling(meinv).style.display = 'block';

        } else if (this.nextsibling(meinv).style.display == 'block') {
			T.html.setClass(meinv.getElementsByTagName('span').item(0),'icon4');
            this.nextsibling(meinv).style.display = 'none';
        }
    },
    getNode: function(ulelm, meinv) {
        var getfirstchild = function(elm, node) {
            var childs = elm.childNodes;
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].nodeName.toUpperCase() !== node) {
                    childs.removeChild(childs[i]);
                }
            }
            return childs;
        }
        for (var k = 0; k < ulelm.length; k++) {
            var node = '';
            if (ulelm[k] === meinv) {
                node = k;
                return node;
            } else {
                node += k + '-';
                var divs = ulelm[k].getElementsByTagName("div");
                for (var j = 0; j < divs.length; j++) {
                    var tempk = this.getNode(getfirstchild(divs[j], "UL"), meinv);
                    if (tempk !== '' && tempk !== undefined) {
                        node += tempk;
                        return node;
                    }

                }

            }

        }
    },
    ulelmClick: function(handle,event) {
			var _this = handle;
			clearCeng('myContextMenu');
			var eve = event || window.event;
            var meinv = eve.srcElement ? eve.srcElement: eve.target;
            var menu = new ClickMenuItem(eve);
            var menuItem = [{
                'itemText': '导入',
                'ev': function() {
                    var parent = meinv,
                    type = '';
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
                    var value = parent.getElementsByTagName("span").item(1).innerHTML;

                    var ulelm = _this.ulelm;

                    var node = _this.getNode(ulelm, meinv);

                    clearCeng('myContextMenu');

                    var menuItem = {
                        'itemText': '导入chinaexcel xjc文件',
                    };
					
                    var menu = new uploadImg(menuItem, _this.grid, node,function(html){
																			if(html.indexOf('.xjc')===-1){
																				html+='.xjc';	
																			}
																			_gl_filename=html;
																			html=html.replace('.xjc','');
																			_this.add_option(html,node,'child');
																			
																		});
					
                    menu.rendhtml();

                }
            },
            {
                'itemText': '删除',
                'ev': function() {
					
					
                    var parent = meinv,
                    type = '';
					
					
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
					
					var ullist = meinv.getElementsByTagName("ul");
					
					if(_this.getRaw(ullist)){
						alert("不允许删除该类别");
						return false;	
					}
                    var value = parent.getElementsByTagName("span").item(1);
					
                    var ulelm = _this.ulelm,filename='';
                    var node = _this.getNode(ulelm, meinv);
					if(meinv.className.indexOf('child')!==-1){
						type= 'child';	
						filename=value.getElementsByTagName("a").item(0).innerHTML;
					}else if(meinv.className.indexOf('parent')!==-1){
						type= 'parent';	
					}
					
					
                    var url = 'html/lib/leftbar.php?node=' + node + '&op=delete&type='+type+'&filename='+encodeURIComponent(filename);
                    var response = T.ajax.ajaxGet(url);
                    if (response === 'SUCCESS') {
                       _this.deleteOption(node);
                    	localStorage.removeItem(filename);
                    } else {
                        alert(response);
                    }

                    clearCeng('myContextMenu');

                }
            },
            {
                'itemText': '添加新类',
                'ev': function() {
                    var parent = meinv,
                    type = '';
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
                    var value = parent.getElementsByTagName("span").item(1).innerHTML;

                    var ulelm = _this.ulelm;
				
                    var node = _this.getNode(ulelm, meinv);
                    _this.addnewoptionbox("添加新工作表类别", _this, "html/lib/leftbar.php?type=parent&op=add&node=" + node,event);
                } //parent 类 
            },
            {
                'itemText': '添加新表',
                'ev': function() {
                    var parent = meinv,
                    type = '';
                    if (meinv.nodeName.toUpperCase() === 'SPAN') {
                        meinv = parent = parent.parentNode
                    }else{
						meinv = parent = parent.parentNode.parentNode.parentNode;	
					}
                    var value = parent.getElementsByTagName("span").item(1).innerHTML;

                    var ulelm = _this.ulelm;
					
                    var node = _this.getNode(ulelm, meinv);
                    _this.addnewoptionbox("工作表名称", _this, "html/lib/leftbar.php?type=child&op=add&node=" + node);
                } //parent 类 
            }];
            menu.addItem(menuItem);
            menu.addMenuTo(meinv);
			preventDefault(event);
    },
	getRaw:function(list){
		var lists = convertToArray(list);
		for(var i=0,len=lists.length;i<len;i++){
			if(lists[i].attributes["raw"] && lists[i].attributes["raw"].nodeValue == 1){
				return true;	
			}	
		}	
		return false;
	},
	ulelmdel:function(handle,event){
        var _this = handle;
        clearCeng('myContextMenu');
        var eve = event ? event: window.event;
        var meinv = eve.srcElement ? eve.srcElement: eve.target;
			var parent = meinv,
			type = '';
			if (meinv.nodeName.toUpperCase() === 'SPAN') {
				meinv = parent = parent.parentNode
			}else{
				meinv = parent = parent.parentNode.parentNode.parentNode;	
			}
			var value = parent.getElementsByTagName("span").item(1);

			var ulelm = _this.ulelm,filename='';
			var node = _this.getNode(ulelm, meinv);
			if(meinv.className.indexOf('child')!==-1){
				type= 'child';	
				filename=value.getElementsByTagName("a").item(0).innerHTML;
			}else if(meinv.className.indexOf('parent')!==-1){
				type= 'parent';	
			}
			var url = 'html/lib/leftbar.php?node=' + node + '&op=delete&type='+type+'&filename='+encodeURIComponent(filename);
			var response = T.ajax.ajaxGet(url);
			if (response === 'SUCCESS') {
			   _this.deleteOption(node);
			} else {
				alert(response);
			}
			preventDefault(event);
			clearCeng('myContextMenu');
	},
	getUrlParameter:function(url,parameter){
			if(url.indexOf(parameter+'=')){
				var parameter = parameter+'=';
				var parameterStartAt=	url.indexOf(parameter);
				var parameterEndsAt =   url.indexOf("&", parameterStartAt+1)!==-1? url.indexOf("&", parameterStartAt+1) : url.length;
				
				return url.substring(parameterStartAt+parameter.length,parameterEndsAt);
			}	
	},
	resetList:function(){
		        document.getElementById("maincontent").innerHTML = T.ajax.ajaxGet('../lib/htmllib/leftbar.html');
                var now = new Date();
                var number = now.getYear().toString() + now.getMonth().toString() + now.getDate().toString() + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();;

                var leftbarjson = T.ajax.ajaxGetJson("html/leftbar.js?" + number);
                if (leftbarjson !== '') {
                    leftbarjson = eval('(' + leftbarjson + ')');
                }
                new leftbar(document.getElementById("maincontent"), leftbarjson);
	},
    addnewoptionbox: function(title, handle, url,event) {
        var _this = handle,eve = event ? event: window.event;
        var url = url;
        clearCeng('myContextMenu');
        var menuItem = {
            'itemText': title,
            'itemsm': 'string',
            'itermtype': 'input',
            'boxheight': '120px'
        };
        var menu = new customizeCell(menuItem, '',
        function() {
            var value = document.getElementById(this.itemsm).value;
            if (url !== undefined) {
                url = url + '&value=' + value;
            } else {
                url = 'html/lib/leftbar.php?type=parent&op=add&node=' + -1 + '&value=' + value;
            }
			var type=_this.getUrlParameter(url,'type');
			var node=_this.getUrlParameter(url,'node');
			var html=_this.getUrlParameter(url,'value');
            var response = T.ajax.ajaxGet(url);
            if (response === 'SUCCESS') {
                _this.add_option(html,node,type);


            } else {
                alert(response);
            }
            clearCeng('myContextMenu');
        });
        menu.rendhtml();

        preventDefault(eve);

    }

};

var dragimg=function(imageDiv,width,height) {
	this.hooks=["Left","Up","Down","Right","RightUp","LeftDown","LeftUp","RightDown"];
	var box=document.createElement('div');
	
	box.id='_outerDiv';
	
	if(/(\d+?)$/.test(imageDiv)){
		var num = RegExp.$1;
		box.id='_outerDiv'+num;
	}
	this.Divid= box.id;		
	
	
	box.style.cssText="z-index:1; position:relative;top:0px; left:0px; width:"+width+"px; height:"+height+"px;";
	
	var innerbox=document.createElement('div');
	innerbox.id='_innerDiv';
	
	innerbox.style.display='none';
	for(var i=0;i < this.hooks.length;i++)
	{
		var tmp=document.createElement('div');
		tmp.id=	this.hooks[i];
		innerbox.appendChild(tmp);
	}	
	this.innerbox=innerbox;
	this.objdiv=box;
	this.imgId=imageDiv;
	this.imageDiv=document.getElementById(imageDiv);
	box.appendChild(innerbox);
	box.appendChild(this.imageDiv);
	document.body.appendChild(box);


	
	this.dragging = false;
	this.scaleing=false;
	this.startTop =0; // top is a Key Word in Chrome and Opera
	this.startLeft = 0;//mouuseDown时记录下的元素初始top,left属性
	
	this.width=0;
	this.height=0;
	
	
	this.dragPosY = 0;
	this.dragPosX = 0;//mouuseDown时记录下的鼠标初始top,left属性，通过mousemove的鼠标坐标相减得到鼠标的偏移
	this._scale = 1;//比例参数
	
	this.MinWidth=50;
	this.MinHeight=50;

	
	this._mxRight=1000;
	var _this=this;
	this._mxDown=50;
	this.Limit=true;
	this.Resize=function(){};
	this.hitInRect=function(hitX, hitY, rcLeft, rcTop, rcWidth, rcHeight) {
	  return (hitX>=rcLeft && hitX<rcLeft+rcWidth && hitY>=rcTop && hitY<rcTop+rcHeight);
	}
	this.trimPX=function(_px) {
	  if(_px==null || _px=="")return 0;
	  return parseInt(_px.substr(0, _px.lastIndexOf("px")));
	}
	
	box.addEventListener("mousedown",function(event){return _this.dragmousedown(event);},false);
	 // document.onmousedown=function(event){_this.dragmousedown(event)};// start moving image
	box.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
	 // document.onmousemove=function(event){_this.dragmousemove(event)};// moving image
	box.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
	 // document.onmouseup=function(event){_this.dragmouseup(event)};// stop moving image

}
dragimg.prototype.dragmousedown=function(event)
{	
	var e=event||window.event;
	var target=glGetTarget(e);
	var _this=this;
	this.startTop = this.trimPX(this.objdiv.style.top);
	this.startLeft = this.trimPX(this.objdiv.style.left);
	this.width=parseInt(this.objdiv.style.width);
	this.height=parseInt(this.objdiv.style.height);
	var mousePos=glGetMousePageXY(e);
	this.dragPosX = mousePos.x;
	this.dragPosY = mousePos.y;	
	this.innerbox.style.display='block';
	  if(target.id=="_outerDiv"||target.id==this.imgId)
	  {
		  this.dragging = true;
		  preventDefault(e); // disable default behavior of browser
	  }else if(T.array.inArray(target.id,this.hooks))
	  { 
	  this.scaleing = true;	
	  var elmid=target.id.toLowerCase();
	    switch (elmid) {
			case "up" :
					this.Resize=this.scaleUp;
				break;
			case "down" :
					this.Resize=this.scaleDown;
				break;
			case "left" :
					this.Resize=this.scaleLeft;
				break;
			case "right" :
					this.Resize=this.scaleRight;
				break;
			case "leftup" :
					this.Resize=this.scaleLeftUp;
				break;
			case "rightup" :
					this.Resize=this.scaleRightUp;
				break;
			case "leftdown" :
					this.Resize=this.scaleLeftDown;
				break;
			case "rightdown" :
				this.Resize=this.scaleRightDown;
				break;
			default :
				_fun = function(e){ if(oThis.Scale){ oThis.scaleRightDown(e); }else{ oThis.SetRight(e); oThis.SetDown(e); } };
				_cursor = "nw-resize";
		}
	  }else
	  {
			  this.innerbox.style.display='none';
  
	  }
	document.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
	document.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
		preventDefault(e);
}
dragimg.prototype.dragmousemove=function(event){
	var e=event||window.event;
	var mousePos=glGetMousePageXY(e);
	var target=glGetTarget(e);
	if (this.dragging){	
		this.objdiv.style.cursor="pointer";
		this.objdiv.style.top = parseInt(this.startTop)+(mousePos.y- this.dragPosY)+ "px";
		this.objdiv.style.left = parseInt(this.startLeft)+(mousePos.x- this.dragPosX)+ "px";
	}else if (this.scaleing)
	{	
		this.Resize(mousePos.x-this.dragPosX,mousePos.y-this.dragPosY);
	}
}
dragimg.prototype.dragmouseup= function (event) {
	  var e=event||window.event;
	  this.dragging = false;
	  this.scaleing = false;
	  this.objdiv.style.cursor="default";          
	  preventDefault(e); // disable default behavior of browser
   
}

dragimg.prototype.scaleRight= function (iwidth) {
		var iwidth=this.width+iwidth;
		if(iwidth<this.MinWidth)iwidth=this.MinWidth;
		
		this.imageDiv.width=iwidth;
		this.objdiv.style.width =iwidth +"px";
		
		this.imageDiv.height=this.imageDiv.height;
}  
dragimg.prototype.scaleLeft= function (iwidth) {
		var style_left=iwidth;
		var iwidth=this.width-iwidth;
		if(iwidth < this.MinWidth)
		{
			iwidth=this.MinWidth;
			style_left=this.width-this.MinWidth;;
			
		}		
		this.objdiv.style.left=this.startLeft+style_left+"px";

		this.objdiv.style.width = iwidth +"px";
		this.imageDiv.width=iwidth;
		
		this.imageDiv.height=this.imageDiv.height;
} 
dragimg.prototype.scaleUp= function (iwidth,iheight) {
		var style_top=iheight;
		var iheight=this.height-iheight;
		if(iheight < this.MinHeight){
			iheight=this.MinHeight;
			style_top=this.height-this.MinHeight;
		}		
		this.objdiv.style.top=this.startTop+style_top+"px";

		this.objdiv.style.height = iheight+"px";
		this.imageDiv.height=iheight;
		
		this.imageDiv.width=this.imageDiv.width;
} 
dragimg.prototype.scaleDown= function (iwidth,iheight) {
		var iheight=this.height+iheight;
		if(iheight<this.MinHeight)iheight=this.MinHeight;
		this.objdiv.style.height = iheight +"px";
		this.imageDiv.height=iheight;
		this.imageDiv.width=this.imageDiv.width;
} 
dragimg.prototype.scaleLeftUp= function (iwidth,iheight) {
		this.scaleLeft(iwidth);
		this.scaleUp(iwidth,iheight);
} 
dragimg.prototype.scaleLeftDown= function (iwidth,iheight) {
		this.scaleLeft(iwidth);
		this.scaleDown(iwidth,iheight);
} 
dragimg.prototype.scaleRightUp= function (iwidth,iheight) {
		this.scaleRight(iwidth);
		this.scaleUp(iwidth,iheight);
} 
dragimg.prototype.scaleRightDown= function (iwidth,iheight) {
		this.scaleRight(iwidth);
		this.scaleDown(iwidth,iheight);
} 


var dragbox=function(div,mousediv) {
	var box = this.box=this.objdiv=typeof div==='String'?document.getElementById(div):div;
	var mousediv =this.mousediv= mousediv||box;
	this.dragging = false;
	this.dragPosY = 0;
	this.dragPosX = 0;//mouuseDown时记录下的鼠标初始top,left属性，通过mousemove的鼠标坐标相减得到鼠标的偏移
	this._scale = 1;//比例参数

	this._mxRight=1000;
	var _this=this;
	this._mxDown=50;
	this.Limit=true;
	this.Resize=function(){};
	this.hitInRect=function(hitX, hitY, rcLeft, rcTop, rcWidth, rcHeight) {
	  return (hitX>=rcLeft && hitX<rcLeft+rcWidth && hitY>=rcTop && hitY<rcTop+rcHeight);
	}
	this.trimPX=function(_px) {
	  if(_px==null || _px=="")return 0;
	  return parseInt(_px.substr(0, _px.lastIndexOf("px")));
	}
	
mousediv.addEventListener("mousedown",function(event){return _this.dragmousedown(event);},false);
 // document.onmousedown=function(event){_this.dragmousedown(event)};// start moving image
mousediv.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
 // document.onmousemove=function(event){_this.dragmousemove(event)};// moving image
mousediv.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
 // document.onmouseup=function(event){_this.dragmouseup(event)};// stop moving image
mousediv.addEventListener("mouseout",function(event){return _this.dragmouseout(event);},false);


}
dragbox.prototype.dragmousedown=function(event)
{	
	var e=event||window.event;
	var target=glGetTarget(e);
	var _this=this;
	this.startTop = this.trimPX(this.objdiv.style.top);
	this.startLeft = this.trimPX(this.objdiv.style.left);
	this.width=parseInt(this.objdiv.style.width);
	this.height=parseInt(this.objdiv.style.height);
	var mousePos=glGetMousePageXY(e);
	this.dragPosX = mousePos.x;
	this.dragPosY = mousePos.y;	
	this.dragging = true;
	document.addEventListener("mousemove",function(event){return _this.dragmousemove(event);},false);
	document.addEventListener("mouseup",function(event){return _this.dragmouseup(event);},false);
	preventDefault(e);
}
dragbox.prototype.dragmousemove=function(event){
	var e=event||window.event;
	this.mousediv.style.cursor="Move";
	var mousePos=glGetMousePageXY(e);
	var target=glGetTarget(e);
	if (this.dragging){	
		this.mousediv.style.cursor="Move";
		this.objdiv.style.top = parseInt(this.startTop)+(mousePos.y- this.dragPosY)+ "px";
		this.objdiv.style.left = parseInt(this.startLeft)+(mousePos.x- this.dragPosX)+ "px";
	}
}
dragbox.prototype.dragmouseup= function (event) {
	  var e=event||window.event;
	  this.dragging = false;
	  this.scaleing = false;
	  this.mousediv.style.cursor="default";          
	  preventDefault(e); // disable default behavior of browser
   
}
dragbox.prototype.dragmouseout= function (event) {
	this.objdiv.style.cursor="default";   
}


/*
	[Discuz!] (C)2001-2009 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: calendar.js 17449 2008-12-22 08:58:53Z cnteacher $
*/
	
function showTime(event, controlid1, addtime1, startdate1, enddate1,posx,posy,dataFormat,row,col){
	this.doane=function(event) {
		e = event ? event : window.event;
		if(is_ie) {
			e.returnValue = false;
			e.cancelBubble = true;
		} else if(e) {
			e.stopPropagation();
			e.preventDefault();
		}
	}
	var is_ie = (document.all) ? true : false;
	this.controlid = {"value":"2012-12-20 11:00:00"};
	this.currdate = null;
	this.startdate = null;
	this.enddate  = null;
	this.yy = null;
	this.mm = null;
	this.hh = null;
	this.ss	= null;
	this.ii = null;
	
	this.currday = null;
	this.addtime = false;
	this.today = new Date();
	this.lastcheckedyear = false;
	this.lastcheckedmonth = false;
	
	var datagrid;
	
	function getposition(obj) {
		var r = new Array();
		r['x'] = obj.offsetLeft;
		r['y'] = obj.offsetTop;
		while(obj = obj.offsetParent) {
			r['x'] += obj.offsetLeft;
			r['y'] += obj.offsetTop;
		}
		return r;
	}
	this.$=function (id) {
			return document.getElementById(id);
		}
	var out=function(){alert(123);}

	var loadcalendar=function (posx,posy) {	
		s = '';
		s += '<div id="calendar" style="display:none; position:absolute; z-index:100000;" onclick="parent.doane(event)">';
		s += '<div style="width: 210px;"><table cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">';
		s += '<tr align="center" id="calendar_week"><td><a href="###" onclick="parent.refreshcalendar(yy, mm-1)" title="上一月">《</a></td><td colspan="5" style="text-align: center"><a href="###" onclick="parent.showdiv(\'year\');parent.doane(event)" class="dropmenu" title="点击选择年份" id="year"></a>&nbsp; - &nbsp;<a id="month" class="dropmenu" title="点击选择月份" href="###" onclick="parent.showdiv(\'month\');parent.doane(event)"></a></td><td><A href="###" onclick="parent.refreshcalendar(yy, mm+1)" title="下一月">》</A></td></tr>';
		s += '<tr id="calendar_header"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';
		for(var i = 0; i < 6; i++) {
			s += '<tr>';
			for(var j = 1; j <= 7; j++)
				s += "<td id=d" + (i * 7 + j) + " height=\"19\">0</td>";
			s += "</tr>";
		}
		s += '<tr id="hourminute"><td colspan="7" align="center"><input type="text" size="2" value="" id="hour" class="txt"  onKeyUp=\'this.value=this.value > 23 ? 23 : parent.zerofill(this.value);parent.controlid.value=parent.controlid.value.replace(/\\d+(\:\\d+)/ig, this.value+"$1")\'> 点 <input type="text" size="2" value="" id="minute" class="txt" onKeyUp=\'this.value=this.value > 59 ? 59 : parent.zerofill(this.value);controlid.value=parent.controlid.value.replace(/(\\d+\:)\\d+/ig, "$1"+this.value)\'> 分<input type="text" size="2" value="" id="second" class="txt"  onKeyUp=\'this.value=this.value > 59 ? 59 : parent.zerofill(this.value);parent.controlid.value=parent.controlid.value.replace(/(\\d+\:\\d+\:)\\d+/ig, "$1"+this.value)\'> 秒</td></tr>';
		s += '</table></div></div>';
		s += '<div id="calendar_year" onclick="parent.doane(event)" style="display: none;z-index:100001;"><div class="col">';
		for(var k = 2020; k >= 1931; k--) {
			s += k != 2020 && k % 10 == 0 ? '</div><div class="col">' : '';
			s += '<a href="###" onclick="parent.refreshcalendar(' + k + ', parent.mm);$(\'calendar_year\').style.display=\'none\'"><span' + (today.getFullYear() == k ? ' class="calendar_today"' : '') + ' id="calendar_year_' + k + '">' + k + '</span></a><br />';
		}
		s += '</div></div>';
		s += '<div id="calendar_month" onclick="parent.doane(event)" style="display: none;z-index:100001;">';
		for(var k = 1; k <= 12; k++) {
			s += '<a href="###" onclick="parent.refreshcalendar(parent.yy, ' + (k - 1) + ');$(\'calendar_month\').style.display=\'none\'"><span' + (today.getMonth()+1 == k ? ' class="calendar_today"' : '') + ' id="calendar_month_' + k + '">' + k + ( k < 10 ? '&nbsp;' : '') + ' 月</span></a><br />';
		}
		s += '</div>';
		if(is_ie && is_ie < 7) {
			s += '<iframe id="calendariframe" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
			s += '<iframe id="calendariframe_year" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
			s += '<iframe id="calendariframe_month" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
		}
	
		var div = document.createElement('div');
		div.innerHTML = s;
		div.id="time";
		div.style.position="absolute";
		div.style.left=posx+"px";
		div.style.top=posy+"px";
		document.body.appendChild(div);
		document.onclick = function(event) {
			$('calendar').style.display = 'none';
			$('calendar_year').style.display = 'none';
			$('calendar_month').style.display = 'none';
			if(is_ie && is_ie < 7) {
				$('calendariframe').style.display = 'none';
				$('calendariframe_year').style.display = 'none';
				$('calendariframe_month').style.display = 'none';
			}
		}
		$('calendar').onclick = function(event) {
			doane(event);
			$('calendar_year').style.display = 'none';
			$('calendar_month').style.display = 'none';
			if(is_ie && is_ie < 7) {
				$('calendariframe_year').style.display = 'none';
				$('calendariframe_month').style.display = 'none';
			}
		}
	
	}
	
	function parsedate(s) {
		/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);
		var m1 = (RegExp.$1 && RegExp.$1 > 1899 && RegExp.$1 < 2101) ? parseFloat(RegExp.$1) : today.getFullYear();
		var m2 = (RegExp.$2 && (RegExp.$2 > 0 && RegExp.$2 < 13)) ? parseFloat(RegExp.$2) : today.getMonth() + 1;
		var m3 = (RegExp.$3 && (RegExp.$3 > 0 && RegExp.$3 < 32)) ? parseFloat(RegExp.$3) : today.getDate();
		var m4 = (RegExp.$4 && (RegExp.$4 > -1 && RegExp.$4 < 24)) ? parseFloat(RegExp.$4) : 0;
		var m5 = (RegExp.$5 && (RegExp.$5 > -1 && RegExp.$5 < 60)) ? parseFloat(RegExp.$5) : 0;
		/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");
		return new Date(m1, m2 - 1, m3, m4, m5);
	}
	
	this.settime=function(d) {
		$('calendar').style.display = 'none';
		$('calendar_month').style.display = 'none';
		if(is_ie && is_ie < 7) {
			$('calendariframe').style.display = 'none';
		}
		controlid.value = yy + "-" + zerofill(mm + 1) + "-" + zerofill(d) + (addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill($('minute').value) : '');
		if(dataFormat.dwstyle   ==='1')//longdate
		{
			controlid.value = yy + "年" + zerofill(mm + 1) + "月" + zerofill(d) + "日";
		}else if(dataFormat.dwstyle==='2')//shortdate
		{
			controlid.value = yy + "-" + zerofill(mm + 1) + "-" + zerofill(d);
		}else if(dataFormat.dwstyle==='3')//time
		{
			controlid.value =(addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill($('minute').value) : '')+':'+zerofill($('second').value);	
		}else if(dataFormat.dwstyle==='4')//timedate 日期时间类型
		{
			controlid.value =yy + "-" + zerofill(mm + 1) + "-" + zerofill(d)+' '+(addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill($('minute').value) : '')+':'+zerofill($('second').value);	
		}
		
		datagrid.selFocusCellValue(controlid.value);
	}
	
	
	function showcalendar(event, controlid1, addtime1, startdate1, enddate1,posx,posy,dataFormat) {
		loadcalendar(posx,posy);
		datagrid=controlid1;
		addtime = addtime1;
		startdate = startdate1 ? parsedate(startdate1) : false;
		enddate = enddate1 ? parsedate(enddate1) : false;
		currday = controlid.value ? parsedate(controlid.value) : today;
		hh = currday.getHours();
		ii = currday.getMinutes();
		var p = getposition(controlid);
		$('calendar').style.display = 'block';
		$('calendar').style.left = p['x']+'px';
		$('calendar').style.top	= (p['y'] + 20)+'px';
		doane(event);
		refreshcalendar(currday.getFullYear(), currday.getMonth());
		if(lastcheckedyear != false) {
			$('calendar_year_' + lastcheckedyear).className = 'calendar_default';
			$('calendar_year_' + today.getFullYear()).className = 'calendar_today';
		}
		if(lastcheckedmonth != false) {
			$('calendar_month_' + lastcheckedmonth).className = 'calendar_default';
			$('calendar_month_' + (today.getMonth() + 1)).className = 'calendar_today';
		}
		$('calendar_year_' + currday.getFullYear()).className = 'calendar_checked';
		$('calendar_month_' + (currday.getMonth() + 1)).className = 'calendar_checked';
		$('hourminute').style.display = addtime ? '' : 'none';
		lastcheckedyear = currday.getFullYear();
		lastcheckedmonth = currday.getMonth() + 1;
		if(is_ie && is_ie < 7) {
			$('calendariframe').style.top = $('calendar').style.top;
			$('calendariframe').style.left = $('calendar').style.left;
			$('calendariframe').style.width = $('calendar').offsetWidth;
			$('calendariframe').style.height = $('calendar').offsetHeight;
			$('calendariframe').style.display = 'block';
		}
	}
	
	this.refreshcalendar=function(y, m) {
		var x = new Date(y, m, 1);
		var mv = x.getDay();
		var d = x.getDate();
		var dd = null;
		yy = x.getFullYear();
		mm = x.getMonth();
		$("year").innerHTML = yy;
		$("month").innerHTML = mm + 1 > 9  ? (mm + 1) : '0' + (mm + 1);
	
		for(var i = 1; i <= mv; i++) {
			dd = $("d" + i);
			dd.innerHTML = "&nbsp;";
			dd.className = "";
		}
	
		while(x.getMonth() == mm) {
			dd = $("d" + (d + mv));
			dd.innerHTML = '<a href="###" onclick="settime(' + d + ');return false">' + d + '</a>';
			if((enddate && x.getTime() > enddate.getTime()) || (startdate && x.getTime() < startdate.getTime())) {
				dd.className = 'calendar_expire';
			} else {
				dd.className = 'calendar_default';
			}
			if(x.getFullYear() == today.getFullYear() && x.getMonth() == today.getMonth() && x.getDate() == today.getDate()) {
				dd.className = 'calendar_today';
				dd.firstChild.title = '今天';
			}
			if(x.getFullYear() == currday.getFullYear() && x.getMonth() == currday.getMonth() && x.getDate() == currday.getDate()) {
				dd.className = 'calendar_checked';
			}
			x.setDate(++d);
		}
	
		while(d + mv <= 42) {
			dd = $("d" + (d + mv));
			dd.innerHTML = "&nbsp;";
			d++;
		}
	
		if(addtime) {
			$('hour').value = zerofill(hh);
			$('minute').value = zerofill(ii);
		}
	}
	
	this.showdiv=function(id) {
		var p = getposition($(id));
		$('calendar_' + id).style.left =110+'px';
		$('calendar_' + id).style.top =25+'px';
		$('calendar_' + id).style.display = 'block';
		if(is_ie && is_ie < 7) {
			$('calendariframe_' + id).style.top = $('calendar_' + id).style.top;
			$('calendariframe_' + id).style.left = $('calendar_' + id).style.left;
			$('calendariframe_' + id).style.width = $('calendar_' + id).offsetWidth;
			$('calendariframe_' + id ).style.height = $('calendar_' + id).offsetHeight;
			$('calendariframe_' + id).style.display = 'block';
		}
	}
	
	this.zerofill=function(s) {
		var s = parseFloat(s.toString().replace(/(^[\s0]+)|(\s+$)/g, ''));
		s = isNaN(s) ? 0 : s;
		return (s < 10 ? '0' : '') + s.toString();
	}
	
	/*  加载样式  */
	
showcalendar(event, controlid1, addtime1, startdate1, enddate1,posx,posy,dataFormat);
}
// JavaScript Document
var drawObjs = function(datagrid,rule) {
    clearCeng('drawobjs');
    clearCeng('drawobj', 'class');

    var left = 224,top = document.getElementById("canvas").offsetTop || 48,width,height,
    maincontent = document.getElementById('maincontent');
    if (rule instanceof Array) {
        var drawobjs = document.createElement('div');
        drawobjs.id = 'drawobjs';
        maincontent.insertBefore(drawobjs, _gl_canvas);
        T.forEach(rule,
        function(item, index, source) {
            if (item.flashchart) {
                width = 400;
                height = 400;
            } else {
                width = 50;
                height = 50;
            }

            var drawobj = T.html.rendBox({
                'id': 'drawobj_' + index,
                'class': 'drawobj',

                'style': 'width=' + width + 'px,height=' + height + 'px,zIndex=1,left=' + left + 'px,top=' + top + 'px',
                'html': {
                    'file': "tangram-dialog",
                    'filter': {
                        "title": '图表显示',
                        "content": '',
                        'tip': '展开显示'
                    }
                },
                'drag': true
            });
			if(chartOnly){
				T.html.css(drawobj,'margin=0');	
			}
            var _gl_chart = T.html.rendBox({
                'type': 'canvas',
                'output': true,
                'id': 'cvs_' + index,
                'style': 'width=' + width + ',height=' + height
            });

            T.html.getElementsByClassName("clath-path-all", drawobj)[0].appendChild(_gl_chart);
            drawobjs.appendChild(drawobj);
            T.html.getElementsByClassName("s_b_settings_icon", drawobj)[0].onclick = this.expend;
            new drawObjs.drawChart(new drawObjs.parseChart(datagrid, item), item, 'cvs_' + index);
        });
    } else {
        var drawobj = T.html.rendBox({
            'id': 'drawobj',
            'rendTo': function(obj) {
                maincontent.insertBefore(obj, _gl_canvas);
            },
            'class': 'drawobj',
            'style': 'width="800px",height="650px",zIndex="1",left=' + left + 'px,top=' + top + 'px',
            'html': {
                'file': "tangram-dialog",
                'filter': {
                    "title": '图表显示',
                    "content": '',
                    'tip': '展开显示'
                }
            },
            'drag': true
        });
		if(chartOnly){
			T.html.css(drawobj,'margin=0');	
		}

        var _gl_chart = T.html.rendBox({
            'type': 'canvas',
            'output': true,
            'id': 'cvs',
            'style': 'width=' + 500 + ',height=' + 600
        });

        T.html.getElementsByClassName("s_b_settings_icon", drawobj)[0].onclick = this.expend;

        T.html.getElementsByClassName("clath-path-all", drawobj)[0].appendChild(_gl_chart);
        try {
            new drawObjs.drawChart(new drawObjs.parseChart(datagrid, rule), rule);
        } catch(e) {
            alert(e);
        }
    }

}
drawObjs.prototype.expend = function(event) {
        var eve = event || window.event,
        meinv = eve.srcElement ? eve.srcElement: eve.target;
        var obj = meinv.parentNode.parentNode;
        if (meinv.title === '并入显示') {

            if (obj.style.position === 'absolute') {
                meinv.title = '展开显示';
                obj.style.position = '';
                maincontent.insertBefore(drawobj, _gl_canvas);
            }
        } else if (meinv.title === '展开显示') {
            meinv.title = '并入显示';
            obj.style.position = 'absolute';
        }
    }

drawObjs.parseChart = function(datagrid, rule) {
    this.datagrid = datagrid;
    var cells = this.cells = datagrid._cells,
    sql;
    if (T.isJson(rule)) {
        if (rule.flashchart === undefined) return {};
        var rule = rule.flashchart;
    } else {
        var rule = eval('(' + rule + ')');
    }

    T.forEach(rule,
    function(item, index, source) {
        if (typeof item !== 'object') rule[index] = decodeURIComponent(item);
    });

    if (this.isDataResourse(rule.data)) {
        document.getElementById('canvas').style.display = 'none';
        sql = T.xml.gXmlPrototype(datagrid['_statscript'], "sql");
        cells = T.ajax.ajaxGet('html/lib/getmyData.php?sql=' + encodeURIComponent(sql));
        cells = eval('(' + cells + ')');
        //this.tooltips =
        this.table = this.fliter(cells, rule.data);

        this.chartX = this.fliter(cells, rule.xlabeldata);
        this.title = rule['title'].charAt(0) === '=' ? this.parseSjyTtile(cells, rule['title']) : rule['title'];
        this.toolkey = rule.legenddata === undefined ? '': this.getKey(cells, rule.legenddata); //提示数据区域
    } else {
console.log(rule);
        this.title = rule.title === undefined ? '': this.getTitle(rule.title); //图表标题

        this.jsh = this.parseksh(datagrid._rows, '结束行');
        this.tooltips = rule.hovertextdata === undefined ? '': this.getTooltips(cells, rule.hovertextdata); //图表浮动提示数据区域
        this.table = rule.data === undefined ? '': this.getTooltips(cells, rule.data); //数据区域
        this.chartX = rule.xlabeldata === undefined ? '': this.getTooltips(cells, rule.xlabeldata); //数据区域
        this.toolkey = rule.legenddata === undefined ? '': this.getKey(cells, rule.legenddata); //提示数据区域

    }
}
drawObjs.parseChart.prototype = {
    parseSjyTtile: function(cells, str) {

        var str = str.replace(/(@[a-zA-Z\u4e00-\u9fa5]+)/g,
        function(word) {
            return cells[word.substring(1)][0];
        });
        str = str.replace(/&"([a-zA-Z\u4e00-\u9fa5]+)"&?/g, "$1");

        return str.substring(1);
    },
    fliter: function(cells, str) {
        if (str.charAt(0) === '@') {
            var sts = str.split(/\s+/);
            if (sts.length === 1) {
                return cells[sts[0].substring(1)];
            } else {
                var temparr = [],
                datas = cells[sts[0].substring(1)];
                for (var i = 0,
                len = datas.length; i < len; i++) {
                    var childarr = [];
                    for (var j = 0,
                    jlen = sts.length; j < jlen; j++) {
                        var data = cells[sts[j].substring(1)];
                        childarr.push(data[i]);
                    }
                    temparr.push(childarr);
                }
                return temparr;
            }
            return cells[str.substring(1)];
        } else if (/([a-zA-Z]+)\("@([a-zA-Z]+)",(\d+)\)\s?/g.test(str)) {
            var pre = RegExp.$1;
            return cells[RegExp.$2].slice(0, pre === 'left' ? RegExp.$3: -RegExp.$3);
        } else if (/"?@([a-zA-Z\u4e00-\u9fa5]+)"?\s?/g.test(str)) {
            var patt = /"(?:(.+?))"/g,
            temparr = [],
            resultarr = [],
            length = null,
            tempstr = '',
            j = 0;
            while ((result = patt.exec(str)) != null) {
                temparr.push(result[1]);
            }

            for (var i = 0,
            len = temparr.length; i < len; i++) {
                if (/(@[a-zA-Z\u4e00-\u9fa5]+)/.test(temparr[i])) {
                    var data = cells[RegExp.$1.substring(1)];
                    var length = data.length;

                    break;
                }
            }
            if (length) {
                while (j < length) {
                    tempstr = '';
                    for (var i = 0,
                    len = temparr.length; i < len; i++) {
                        if (/(@[a-zA-Z\u4e00-\u9fa5]+)/.test(temparr[i])) {
                            var data = cells[RegExp.$1.substring(1)];
                            tempstr += String(data[j]);
                        }

                        if (/(^[a-zA-Z\u4e00-\u9fa5]+)/.test(temparr[i])) {
                            tempstr += RegExp.$1;
                        }
                    }
                    resultarr.push(tempstr);
                    j++;
                }
            }

            return resultarr;

        }
    },
    isDataResourse: function(key) {
        var key = decodeURIComponent(key);
        return (/(@[a-zA-Z\u4e00-\u9fa5]+\s?)+/g.test(key));
    },
    getKey: function(cells, key) { //A1:B4

        var key = decodeURIComponent(key);
        var r;
        if (r = /="([A-Z]\d+)(?::[A-Z]"&Row\("结束行",0,-(\d+)\))?/g.exec(key)) {
            cells = this.cells;
            r.splice(0, 1);
            var temp = /([A-Z])(\d+)/.test(r[0]);
            var temparr = [];
            for (var k = RegExp.$2 - 1; k < this.jsh; k++) {
                temparr.push(cells[k][RegExp.$1.charCodeAt(0) - 65]['t']);
            }

            return temparr;

        } else if (r = /([A-Z]\d+):([A-Z]\d+)?/g.exec(key)) {
            cells = this.cells;
            r.splice(0, 1);
            var res = [];
            for (var k = 0; k < r.length; k++) {
                var temp = /([A-Za-z]+)(\d+)/.test(r[k]);
                res[k] = {
                    'col': RegExp.$1.toUpperCase().charCodeAt(0) - 65,
                    'row': RegExp.$2 - 1
                };
            }
            var temparr = [];
            for (var i = res[0].row, len = res[1].row + 1; i < len; i++) {
                for (var j = res[0].col, jlen = res[1].col; j <= jlen; j++) {
                    temparr.push(cells[i][j]['t']);
                }
            }

            return temparr;
        } else if (/([A-Z]\d+)/g.test(key)) {
            var arrs = key.split(/\s+/),
            temparr = [];
            for (var i = 0,
            len = arrs.length; i < len; i++) {
                var temp = /([A-Z])(\d+)/.test(arrs[i]);
                temparr.push(cells[RegExp.$2 - 1][RegExp.$1.charCodeAt(0) - 65]['t']);

            }

            return temparr;
        }
    },
    getTooltips: function(cells, key) { //="C5:C"&Row("结束行",0,-1)
        if (key === '') return '';

        var key = decodeURIComponent(key);
        var result, arr = [];
        var patt = /([A-Z]\d+)(?::[A-Z]"&Row\("([a-zA-Z\u4e00-\u9fa5]+)",0,-(\d+)\))?/g;

        while ((result = patt.exec(key)) != null) {
            arr.push(result.slice(1, result.length));
        }

        if (arr[1] === undefined) {

            if (arr[0][1] !== '结束行') this.jsh = this.parseksh(this.datagrid._rows, arr[0][1]);
            var temp = /([A-Z])(\d+)/.test(arr[0][0]),
            matches1 = RegExp.$1;
            var temparr = [],
            t;
            for (var k = RegExp.$2 - 1; k < this.jsh; k++) {
                t = cells[k][matches1.toUpperCase().charCodeAt(0) - 65];
                if (Number(t.swty) === 10 && t.lexcel !== undefined) {
                    var xmldom = null;
                    try {
                        xmldom = T.xml.parseXml(t.lexcel);
                    } catch(ex) {
                        alert(ex.message);
                    }
                    var format = xmldom.getElementsByTagName("eformat")[0].firstChild.nodeValue;
                    var textFormat = {
                        'format': format,
                        'type': 'lexcel'
                    };

                    var cellvalue = DataGrid.prototype.turnFormat(textFormat, t['t']);
                    temparr.push(cellvalue);
                } else {
                    temparr.push(t['t']);
                }
            }
        } else {
            if (arr[0][1] !== '结束行') this.jsh = this.parseksh(this.datagrid._rows, arr[0][1]);

            var temparr = [];
            for (var i = 0; i < arr.length; i++) {
                var temp = /([A-Z])(\d+)/.test(arr[i][0]);
                var temparry = [];
                for (var k = RegExp.$2 - 1; k < this.jsh; k++) {
                    temparry.push(cells[k][RegExp.$1.charCodeAt(0) - 65]['t'] || '');
                }
                temparr.push(temparry);
            }

            var clonearr = temparr.slice(0, 1)[0];
            for (var i = 0; i < clonearr.length; i++) {
                var temp = [];
                for (var j = 0; j < temparr.length; j++) {
                    temp.push(temparr[j][i]);
                }
                clonearr[i] = temp;
            }
            temparr = clonearr;

        }

        return temparr;
    },
    getTitle: function(key) {
        var cells = this.cells || arguments[1],
        key = decodeURIComponent(key),
        r,
        result = '';

        if (/^=(.+)/g.exec(key)) { //公式
            r = key.substring(1);

            var rs = r.split('&');
            for (var i = 0,
            len = rs.length; i < len; i++) {
                if (/([a-zA-Z]+)(\d+)/.test(rs[i])) {

                    result += cells[RegExp.$2 - 1][RegExp.$1.toUpperCase().charCodeAt(0) - 65]['t'];
                }
                if (/"([^"]+)"?/.test(rs[i])) {
                    result += RegExp.$1;
                }
            }
            return result;
            //if(r=/=([A-Z]\d+)(?:&"([^""])?("&([A-Z]\d+)&")?([^""])")?/g.exec(key)){
            //				//r.splice(0,1);
            //			}
            //			
            //			var r=r.map(function(item , index , array){
            //				if(/([A-Z])(\d+)/.test(item)){
            //					return 	cells[RegExp.$2-1][RegExp.$1.charCodeAt(0)-65]['t'];
            //				}else{
            //					return 	item;
            //				}	
            //			});
            //		

        } else {
            return key;
        }
    },
    parseCellattributes: function(obj, ksh, jsh) {

        if (obj.row !== undefined) {
            for (var k = ksh - 1; k < jsh; k++) {
                this._cells[k] = [];
                for (var h = 0; h < obj.row[k].cl.length; h++) {

                    var attributes = obj.row[k].cl[h].attributes;

                    this._cells[k][h] = attributes['t'];

                } //cl.length
            }
        }
        this._cells.splice(0, 4);
    },
    parseksh: function(obj, tag) {
        for (var k = 0; k < obj.length; k++) {

            if (obj[k]['text'] === tag) {
                return k;
            }
        }
        return false;

    },

    parserowproperty: function(attributes) {
        for (i = 0; i < attributes.obj.length; i++) {
            if (attributes.obj[i].attributes.text === '结束行') { //设定的 行属性
                return attributes.obj[i].attributes.lineval;
            }
        }
    }
}
 
drawObjs.drawChart = function(data, rule) {
    if (T.isEmptyObject(data)) return;
    this.cvs = arguments[2] ? arguments[2] : 'cvs';
    clearCeng('RGraph_tooltip', 'class');
    RGraph.Reset(document.getElementById(this.cvs));
    var rule = rule.flashchart || rule;
    var chartType = {
        "1": "柱状图",
        "2": "堆积柱状图",
        "3": "3D柱状图",
        "4": "3D堆积柱状图",
        "5": "条形图",
        "6": "堆积条形图",
        "7": "线型图",
        "8": "圆饼图",
        "9": "3D圆饼图",
        "10": "面积图",
        "11": "堆积面积图",
        "12": "K线图",
        "13": "圈饼图",
        "14": "漏斗图",
        "15": "甘特图",
        "16": "柱状线型双坐标图",
        "17": "3D柱状线型双坐标图"
    };

    var type = Number(T.varsearch(chartType, rule.type));
    var is_multi = typeof data.table[0] === 'object';

    data.colorange = function(obj) {
        var arr = [];
        for (var p in obj) {
            if (p !== 'nums') arr.push('#' + obj[p]);
        }
        return arr;
    } (rule.serialcolor);

    this.draw({
        'type': type,
        'is_multi': is_multi,
        'rule': rule,
        'data': data
    });
}

drawObjs.drawChart.prototype.sortNumber = function(a, b) {
    return a - b
}
drawObjs.drawChart.prototype.myTick = function(obj, data, value, index, x, y, color, prevX, prevY) {
    var ctx = obj.canvas.getContext("2d");
    ctx.fillStyle = "white";

    if (index == 3 || index == 4 || (index >= 13 && index <= 16) || index == 20) {
        ctx.fillStyle = "#4C2288";
    }

    // Draw your custom tick here
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
drawObjs.drawChart.prototype.arrryCpoy = function(arr) {
    var temparr = RGraph.array_clone(arr);
    for (var i = 0; i < arr.length * 2; i = i + 2) {
        temparr.splice(i, 0, arr[i / 2]);

    }
    return temparr;
}

drawObjs.drawChart.prototype.arrayToNumber = function(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'string') {
            temp.push(Number(arr[i]));
        } else if (typeof arr[i] === 'object') {
            temp.push(arguments.callee(arr[i]));
        } else if (typeof arr[i] === 'number') {
            temp.push(arr[i]);
        }
    }
    return temp;
}
drawObjs.drawChart.prototype.conmmonSet = function(chart, config) {
    var key = config.key !== false ? true: false,
    rule = config.rule,
    data = config.data;

    if (rule.numprefix !== '') {
        chart.Set('chart.units.pre', rule.numprefix);
    }
    if (rule.numsuffix !== '') {
        chart.Set('chart.units.post', rule.numsuffix);
    }
    if (rule.yaxismaxval !== undefined && rule.yaxismaxval !== '') {
        var ymax = rule.yaxismaxval;
        if (typeof ymax !== 'Number') {
            ymax = data.getTitle(ymax);
        }
        if (rule.type === '条形图') {
            chart.Set('xmax', ymax);
        } else {
            chart.Set('ymax', ymax);
        }
    }
    if (rule.legenddata !== '' && rule.legenddata !== undefined && key) {
        chart.Set('key', data.toolkey);
        chart.Set('key.background', 'rgba(255,255,255,0.8)');
        chart.Set('key.rounded', true);
        chart.Set('chart.key.position', 'gutter');
        chart.Set('chart.key.position.gutter.boxed', false);
        chart.Set('chart.key.position.y', 550);
    }

    if (! ((rule.chartset >> 4) & 0x01)) { //y轴网格线
        chart.Set('chart.background.grid.hlines', false);
    }
    if (! ((rule.chartset >> 3) & 0x01)) {
        chart.Set('chart.background.grid.vlines', false);
    }

    if (rule.divlinecolor !== '') {
        chart.Set('chart.background.grid.color', T.color.getcolorFromByte(rule.divlinecolor));
    }
    if ((rule.chartset >> 1) & 0x01) { //是否在图注上显示数值
        chart.Set('labels.above', true);
    }

	

}
drawObjs.drawChart.prototype.getData = function(datas, rule, toolkey, tooltips, i, is_multi, data) {
    var tempdata = '',
	
    index = is_multi !== false ? datas[Math.floor(i / 2)][i % 2 == 0 ? 1 : 0] : datas[i];
	

	if (toolkey) {
        tempdata += toolkey[i % 2] ? (toolkey[i % 2] + ', ') : (toolkey[0] + ', ');
    }
    if (tooltips === undefined && data.chartX !== undefined) {
        tempdata += data.chartX[i] + ', ';
    } else if (tooltips !== undefined) {   
        tempdata += tooltips[i] + ', ';
    }
	if (rule.numprefix && rule.numprefix !== '') {
		tempdata += rule.numprefix;
	}
	
    var tempdata2 = index;

    if (rule.numdigit !== '0' && rule.numdigit !== undefined) {
        tempdata2 = T.string.turnweishu(String(index), Number(rule.numdigit));
    }
	if (rule.numsuffix && rule.numprefix !== '') {
		tempdata2 = tempdata2 + rule.numsuffix;
	}

    return tempdata + tempdata2;
}

drawObjs.drawChart.prototype.multiTooltipSet = function(datas, chart, config) {
    var is_multi = config.is_multi,
    rule = config.rule,
    data = config.data,
    type = config.type,
    datatable;

    for (var i = 0,
    dlen = datas.length,
    len = datas.length * datas[0].length, blen = datas[0].length; i < len; i++) {

        var tempdata = datas[Math.floor(i / blen)][i % blen],
        temptooltips,
        toolkey;
		
        if (data.tooltips !== undefined && data.tooltips !== "") {
            temptooltips = data.tooltips[i] + ', ';
            if (type == 7) {
                temptooltips = data.tooltips[i % dlen] + ', ';
            } else {
                temptooltips = data.tooltips[Math.floor(i / blen)] + ', ';
            }

        } else {
            temptooltips = data.chartX[Math.floor(i / data.toolkey.length)] + ', ';
            if (type == 7) {
                temptooltips = data.chartX[i % dlen] + ', ';
            }

        }
        if (data.toolkey !== undefined && data.toolkey !== '' && !T.isEmptyObject(data.toolkey)) {
            if (type !== 7) {
                toolkey = data.toolkey[i % data.toolkey.length] + ', ';
            } else if (type == 7) {
                if (is_multi) {
                    toolkey = data.toolkey[Math.floor(i / dlen)] + ', ';
                } else {
                    toolkey = data.toolkey[i % data.toolkey.length] + ', ';
                }
            }
        }
        if (type !== 7) {
            datatable = datas[Math.floor(i / blen)][i % blen];
        } else {

            datatable = datas[i % dlen][Math.floor(i / dlen)];
        }
        if (rule.numprefix && rule.numprefix !== '') {
            datatable = rule.numprefix + datatable;
        }
		if (rule.numsuffix && rule.numprefix !== '') {
            datatable = datatable + rule.numsuffix;
        }

        chart.Get('chart.tooltips')[i] = (toolkey || '') + temptooltips + datatable;
    }

}
drawObjs.drawChart.prototype.arrayToMergeLine = function(arr) {

    var temparr = [];
    for (var i = 0,
    len = arr[0].length; i < len; i++) {
        var childarr = [];
        for (var j = 0,
        jlen = arr.length; j < jlen; j++) {

            childarr.push(arr[j][i]);
        }
        temparr.push(childarr);
    }
    return temparr;

}
drawObjs.drawChart.prototype.draw = function(config) {
    var config = config,
    type = config.type,
    output = config.output || false,
    is_multi = config.is_multi,
    rule = config.rule,
    data = config.data,
    colorange = data.colorange,
    marginLeft = 40,
    dataLength = data.tooltips !== undefined ? data.tooltips.length: 0,
    arrayToNumber = this.arrayToNumber,
    arrryCpoy = this.arrryCpoy,
    conmmonSet = this.conmmonSet,
    multiTooltipSet = this.multiTooltipSet,
    myTick = this.myTick,
    arrayToMergeLine = this.arrayToMergeLine,
    getData = this.getData;

    if (type === 1) { //柱状图

        var datas = arrayToNumber(data.table),
        color;
        if (is_multi) { //多系列
            tooltips = arrryCpoy(data.tooltips || data.table);
        } else { //单系列
            tooltips = data.tooltips || data.table;
        }

        var chart = new RGraph.Bar(this.cvs, datas);

        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.bottom', 80);
        if (config.chartX !== false) chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);

        conmmonSet(chart, config);

        chart.Set('chart.strokestyle', 'transparent');
        var yidong = (rule.numprefix || '') + (rule.numsuffix || '');
        yidong = yidong.length * 10;
        if (rule.numdigit !== '0' && rule.numdigit !== undefined) {

            chart.Set('chart.units.post', '.' + T.string.repeat('0', rule.numdigit));

            yidong += Number(rule.numdigit) * 10;

        }
        marginLeft += yidong;
        chart.Set('gutter.left', marginLeft + 5);
        chart.Set('gutter.right', marginLeft + 20);

        if (is_multi) { //多系列
            multiTooltipSet(datas, chart, config);
        } else { //单系列

            chart.Set('colors.sequential', true);
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        if (output) return chart;
        chart.Draw();
    } else if (type === 2) { //多系列堆积柱状图

        var datas = arrayToNumber(data.table);
        var tooltips = arrryCpoy(data.tooltips || data.table);

        var chart = new RGraph.Bar(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('grouping', 'stacked'); //堆积

        conmmonSet(chart, config);

        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 3) { //单系列3D柱状图

        var datas = arrayToNumber(data.table);
        var tooltips = data.tooltips || data.table;

        var chart = new RGraph.Bar(this.cvs, datas);
        chart.Set('variant', '3d');
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        //chart.Set('grouping', 'stacked');//堆积
        chart.Set('gutter.right', 60);

        conmmonSet(chart, config);

        if (is_multi) {
			
            multiTooltipSet(datas, chart, config);
        } else { //单系列
		chart.Set('colors.sequential', true);
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        if (output) return chart;
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 4) { //多系列3D堆积柱状图

        var datas = arrayToNumber(data.table);
        var tooltips = data.tooltips || data.table;

        var chart = new RGraph.Bar(this.cvs, datas);
        chart.Set('variant', '3d');
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('grouping', 'stacked'); //堆积

        conmmonSet(chart, config);

        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 5) { //多系列条形图

        var datas = arrayToNumber(data.table);
        var tooltips = arrryCpoy(data.tooltips || data.table);

        var chart = new RGraph.HBar(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('chart.xmax', 11000);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        

        conmmonSet(chart, config);
        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
		chart.Set('chart.colors.sequential', true);
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }

        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 6) { //多系列堆积条形图

        var datas = arrayToNumber(data.table);
        var tooltips = arrryCpoy(data.tooltips || data.table);

        var chart = new RGraph.HBar(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        chart.Set('ymax', 19000);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('grouping', 'stacked'); //堆积

        conmmonSet(chart, config);

        multiTooltipSet(datas, chart, config);
        chart.Draw();
        //RGraph.Effects.Bar.Grow(chart);
    } else if (type === 7) { //多系列线形图
        var datas = arrayToNumber(data.table);
        tooltips = data.tooltips || data.table;
        if (is_multi) { //多系列
            tooltips = tooltips.concat(tooltips);
            //colorange=['#FF8040','#0080FF'];	
        } else { //单系列
            tooltips = tooltips;
            //colorange=['#EC0033','#A0D300','#FFCD00','#00B869','#999999','#FF7300','#004CB0','#FD84FD','#B4AC0B','#FD8447'];	
        }
        if (datas[0] instanceof Array) {
            var arrs = [];
            var childLen = datas[0].length;
            for (var i = 0; i < childLen; i++) {
                var arr = [];
                for (var j = 0; j < datas.length; j++) {
                    arr.push(datas[j][i]);
                }
                arrs.push(arr);

            }
        } else {
            var arrs = datas;
        }

        var chart = new RGraph.Line(this.cvs, arrs);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('gutter.bottom', 80);
        if (config.chartX !== false) chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('chart.colors.alternate', true);
        chart.Set('tickmarks', myTick);

        conmmonSet(chart, config);

        if (is_multi) {
            multiTooltipSet(datas, chart, config);
        } else { //单系列
            for (var i = 0; i < datas.length; ++i) {
                chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
            }

        }

        if (output) return chart;
        chart.Draw();
    } else if (type === 8) { //圆饼图
        var sum = data.table.reduce(function(prev, cur, index, array) {
            return Number(prev) + Number(cur);
        });

        var datas = data.table.map(function(item, index, array) {
            return Math.round(Number(item) / sum * 100);
        });
        var tooltips = data.tooltips || data.table;

        var chart = new RGraph.Pie(this.cvs, datas);
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('chart.colors', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);
        chart.Set('gutter.top', 50);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.shadow', true);
        chart.Set('chart.shadow.offsetx', 2);
        chart.Set('chart.shadow.offsety', 2);
        chart.Set('chart.shadow.blur', 3);
        chart.Set('chart.strokestyle', 'white');
        chart.Set('chart.exploded', [25]);

        conmmonSet(chart, config);

        for (var i = 0; i < datas.length; ++i) {
            var temdata = '';
            if (data.tooltips === undefined) {
                temdata = data.chartX[i];
            } else {
                temdata = data.tooltips[i];
            }
            chart.Get('chart.tooltips')[i] = temdata + ', ' + datas[i] + '%';
        }

        chart.Draw();

    } else if (type === 9) { //3D圆饼图
        var sum = data.table.reduce(function(prev, cur, index, array) {
            return Number(prev) + Number(cur);
        });

        var datas = data.table.map(function(item, index, array) {
            return Math.round(Number(item) / sum * 100);
        });

        var chart = new RGraph.Pie(this.cvs, datas);
        chart.Set('chart.tooltips', data.tooltips);
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('chart.colors', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);
        chart.Set('gutter.top', 50);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.shadow', true);
        chart.Set('chart.shadow.offsetx', 2);
        chart.Set('chart.shadow.offsety', 2);
        chart.Set('chart.shadow.blur', 3);
        chart.Set('chart.strokestyle', 'white');
        chart.Set('chart.exploded', [25]);

        // This is the factor that the canvas is scaled by
        var factor = 1.5;

        // Set the transformation of the canvas - a scale up by the factor (which is 1.5 and a simultaneous translate
        // so that the Pie appears in the center of the canvas
        // chart.context.setTransform(factor,0,0,1,((chart.canvas.width * factor) - chart.canvas.width) * -0.5,0);
        
	    conmmonSet(chart, config);
        for (var i = 0; i < datas.length; ++i) {
            var temdata = '';
            if (data.tooltips === undefined) {
                temdata = data.chartX[i];
            } else {
                temdata = data.tooltips[i];
            }
            chart.Get('chart.tooltips')[i] = temdata + ', ' + datas[i] + '%';
        }

        chart.Draw();
        //RGraph.Effects.Pie.RoundRobin(chart, {frames:30});

    } else if (type === 10) { //面积图
        var datas = data.table.map(function(item, index, array) {
            return Number(item);
        });
        var tooltips = arrryCpoy(data.tooltips || data.table);
        var chart = new RGraph.Line(this.cvs, datas);
        chart.Set('chart.tooltips', tooltips);
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', ['red']);
        chart.Set('gutter.top', 50);
        chart.Set('gutter.left', 50);
        chart.Set('ymax', 11000);
        chart.Set('chart.filled', true);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');

        chart.Set('chart.fillstyle', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);

        conmmonSet(chart, config);

        for (var i = 0; i < datas.length; i++) {
            chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
        }

        chart.Draw();
    } else if (type === 13) { //圈饼图
        var sum = data.table.reduce(function(prev, cur, index, array) {
            return Number(prev) + Number(cur);
        });

        var datas = data.table.map(function(item, index, array) {
            return Math.round(Number(item) / sum * 100);
        });
        var tooltips = data.tooltips || data.table;
        var chart = new RGraph.Pie(this.cvs, datas);
        chart.Set('chart.variant', 'donut');
        chart.Set('chart.tooltips', RGraph.array_clone(tooltips));
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('chart.colors', ['#EC0033', '#A0D300', '#FFCD00', '#00B869', '#999999', '#FF7300', '#004CB0', '#FD84FD', '#B4AC0B', '#FD8447']);
        chart.Set('gutter.top', 50);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.title', data.title);
        chart.Set('chart.strokestyle', 'transparent');
        chart.Set('chart.exploded', 3);

        conmmonSet(chart, config);

        for (var i = 0; i < datas.length; ++i) {
            var temdata = '';
            if (data.tooltips === undefined) {
                temdata = data.chartX[i];
            } else {
                temdata = data.tooltips[i];
            }
            chart.Get('chart.tooltips')[i] = temdata + ', ' + datas[i] + '%';
        }

        chart.Draw();

    } else if (type === 14) { //漏斗图
        var datas = data.table.map(function(item, index, array) {
            return Number(item);
        });
        function swap(array, i, j) {
            var d = array[j];
            array[j] = array[i];
            array[i] = d;
        }

        var i = 0,
        len = datas.length,
        j, d;
        for (; i < len; i++) {　　
            for (j = 0; j < len; j++) {　　
                if (datas[i] < datas[j]) {　d = datas[j];
                    datas[j] = datas[i];
                    datas[i] = d;

                    if (data.tooltips) swap(data.tooltips, i, j);
                    swap(data.chartX, i, j);　　　　
                }　　
            }　　
        }　　

        var chart = new RGraph.Funnel(this.cvs, datas);
        chart.Set('chart.tooltips', data.tooltips || data.table);
        chart.Set('chart.labels', data.chartX);
        chart.Set('chart.tooltips.event', 'onmousemove');
        chart.Set('colors', colorange);
        chart.Set('chart.gutter.left', 240);
        chart.Set('chart.labels.sticks', true);
        chart.Set('chart.strokestyle', 'rgba(0,0,0,0)');
        chart.Set('chart.text.boxed', false);
        chart.Set('chart.labels.x', 10);
        chart.Set('chart.shadow', true);
        chart.Set('chart.shadow.offsetx', 0);
        chart.Set('chart.shadow.offsety', 0);
        chart.Set('chart.shadow.blur', 15);
        chart.Set('chart.shadow.color', 'gray');

        conmmonSet(chart, config);
        chart.Set('chart.key.position.x', 150);

        for (var i = 0; i < datas.length; ++i) {
            chart.Get('chart.tooltips')[i] = getData(datas, rule, data.toolkey, data.tooltips, i, is_multi, data);
        }

        chart.Draw();
    } else if (type === 16 || type === 17) { //	柱状线型双坐标图

        var datas = arrayToNumber(data.table, rule.numdigit),

        color,
        len = datas[0].length,
        rightyaxisseialnums = Number(rule.rightyaxisseialnums),
        separate1 = function(array) {
            var temp = [];
            for (var i = 0,
            l = array.length; i < l; i++) {
                temp.push(array[i].slice(0, len - rightyaxisseialnums));
            }
            return temp;
        } (datas, len, rightyaxisseialnums),
        separate2 = function(array) {
            var temp = [];
            for (var i = 0,
            l = array.length; i < l; i++) {
                temp.push(array[i].slice(rightyaxisseialnums));
            }
            return temp;
        } (datas, len, rightyaxisseialnums),
        arraymax = T.array.arrayMax(datas);

        data.table = separate1;
        delete data.cells;
        delete data.datagrid;
        var data1 = T.cloneDeep(data);
        delete data1.title;
        data1.toolkey = data1.toolkey.slice(0, len - rightyaxisseialnums);
        data.table = separate2;
        var data2 = T.cloneDeep(data);
        data2.toolkey = data2.toolkey.slice(rightyaxisseialnums);

        var chart = this.draw({
            'output': true,
            'key': false,
            'chartX': false,
            'type': (type === 16 ? 1 : 3),
            'is_multi': is_multi,
            'rule': rule,
            'data': data1
        });
        var line = this.draw({
            'output': true,
            'type': 7,
            'chartX': false,
            'key': false,
            'is_multi': is_multi,
            'rule': rule,
            'data': data2
        });

        var combo = new RGraph.CombinedChart(chart, line);     
		   if (rule.legenddata !== '' && rule.legenddata !== undefined) {
            line.Set('key', data.toolkey);
            line.Set('key.background', 'rgba(255,255,255,0.8)');
            line.Set('key.rounded', true);
            line.Set('chart.key.position', 'gutter');
            line.Set('chart.key.position.gutter.boxed', false);
            line.Set('chart.key.position.y', 550);
        }

        combo.Draw();

        chart.Set('chart.labels', data.chartX);

        var yidong = (rule.numprefix || '') + (rule.numsuffix || '');
        yidong = yidong.length * 10;
        if (rule.numdigit !== '0' && rule.numdigit !== undefined) {

            chart.Set('chart.units.post', '.' + T.string.repeat('0', rule.numdigit));

            yidong += Number(rule.numdigit) * 10;

        }
        marginLeft += yidong;
        yaxis1 = new RGraph.Drawing.YAxis(this.cvs, 750 - yidong || 0);
        yaxis1.Set('chart.align', 'right');
        yaxis1.Set('noaxes', true);
        yaxis1.Set('hmargin', 5);
        yaxis1.Set('gutter.bottom', 80);
        if (rule.numdigit !== 0 && rule.numdigit !== undefined) {

            yaxis1.Set('chart.units.post', '.' + T.string.repeat('0', rule.numdigit));
            //marginLeft+=Number(rule.numdigit)*10;
        }

        yaxis1.Set('chart.colors', ['black']);
        yaxis1.Set('chart.text.color', 'black');
        yaxis1.Set('chart.max', arraymax);
        yaxis1.Draw();

    }
}

window.onload = function()
{
	
	
	borderWidth=1;	
	var data={};
	if(typeof arguments[0]==='string'){
		data={width:800,height:550,x:0,y:0,localStorageName:arguments[0]};	
	}else
	{
		data={width:800,height:550,x:0,y:0};	
	}
	glInit({width:800,height:550});
	var datagrid = new ExtDataGrid(data);
	//var scrolldemo = new ScrollBar({x:0,y:0,dirType:'y',length:400,scrollBarLength:50});
	var app = new Window({width:800,height:550,comItems:[datagrid]});
	app.setVisible(true);
	glRun(app);
}
