import xmlConvert from 'xml-js'

function nativeType(value) {
    var nValue = Number(value);
    if (!isNaN(nValue)) {
        return nValue;
    }
    var bValue = value.toLowerCase();
    if (bValue === 'true') {
        return true;
    } else if (bValue === 'false') {
        return false;
    }
    return value;
}

var removeJsonTextAttribute = function (value, parentElement) {
    try {
        var keyNo = Object.keys(parentElement._parent).length;
        var keyName = Object.keys(parentElement._parent)[keyNo - 1];
        parentElement._parent[keyName] = nativeType(value);
    } catch (e) { }
}

export const XML = {
    parseCoords2Xml: (obj) => {
        const result = xmlConvert.js2xml({ _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } }, data: obj }, { compact: true, spaces: 4 })

        return result
    },
    parseXml2Coords: (obj) => {
        const result = xmlConvert.xml2js(obj, { compact: true, spaces: 4, textFn: removeJsonTextAttribute })
        return result
    }
}




