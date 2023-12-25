/** Simple function to parse given hex code into an ARGB array.
 * @param {string} hexCode
 * @param {boolean} includeAlpha
 * @returns {number[]} */
export function parseHex(hexCode, includeAlpha) {
    if (hexCode.startsWith("#")) hexCode = hexCode.substring(1);
    let a = -1, r = -1, g = -1, b = -1;
    if (hexCode.length == 8) {
        a = parseInt(hexCode.substring(0, 2), 16);
        r = parseInt(hexCode.substring(2, 4), 16);
        g = parseInt(hexCode.substring(4, 6), 16);
        b = parseInt(hexCode.substring(6, 8), 16);
    } else if (hexCode.length == 6) {
        a = 255;
        r = parseInt(hexCode.substring(0, 2), 16);
        g = parseInt(hexCode.substring(2, 4), 16);
        b = parseInt(hexCode.substring(4, 6), 16);
    } else if (hexCode.length == 3) {
        a = 255;
        r = parseInt(hexCode.substring(0, 1), 16) * 0x11;
        g = parseInt(hexCode.substring(1, 2), 16) * 0x11;
        b = parseInt(hexCode.substring(2, 3), 16) * 0x11;
        // the factor of 0x11 above basically repeats the hex digit twice,
        // just like how multiplying, say "3" with 11 gives "33"
    }

    const returnArr = [a,r,g,b];
    if (returnArr.some((value) => isNaN(value)))
        returnArr = [-1,-1,-1,-1];
    return includeAlpha ? returnArr : returnArr.slice(1);
}

/** Makes a hex code for the given components.
 * @param {number} a 
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @param {boolean} includeAlpha 
 */
export function makeHex(a,r,g,b,includeAlpha) {
    const aHex = Math.max(0, Math.min(255, a)).toString(16).padStart(2, "0");
    const rHex = Math.max(0, Math.min(255, r)).toString(16).padStart(2, "0");
    const gHex = Math.max(0, Math.min(255, g)).toString(16).padStart(2, "0");
    const bHex = Math.max(0, Math.min(255, b)).toString(16).padStart(2, "0");

    if (includeAlpha) return ["#",aHex,rHex,gHex,bHex].join("");
    return ["#",rHex,gHex,bHex].join("");
}

/** A function which takes two numbers and returns a result, such as sum, etc.
 * @callback Operation
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */

/** Performs the operation on the corresponding elements of the given arrays.
 * @param {Operation} operation
 * @param {...number[]} arrays
 * @returns {number[]} Length of returned array is that of the shortest array.
 */
export function arraysOperation(operation, arr1, arr2) {
    const n = Math.min(arr1.length, arr2.length);
    const result = new Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = operation(arr1[i], arr2[i]);
    }
    return result;
}

/** @type {Operation} */ const opAdd = (a, b) => a + b;
/** @type {Operation} */ const opSub = (a, b) => a - b;
/** @type {Operation} */ const opMul = (a, b) => a * b;
/** @type {Operation} */ const opDiv = (a, b) => a / b;
export function arraysAdd(...arrays) {return arraysOperation(opAdd, ...arrays);}
export function arraysSub(...arrays) {return arraysOperation(opSub, ...arrays);}
export function arraysMul(...arrays) {return arraysOperation(opMul, ...arrays);}
export function arraysDiv(...arrays) {return arraysOperation(opDiv, ...arrays);}

/** Scales the given array by the given factor.
 * @param {number} factor
 * @param {number[]} array
 * @returns {number[]} */
export function arrayScale(factor, array) {return array.map((item) => factor * item);}

/** Calculates the highlight color from the given reference colors.
 * @param {string} color1_ori_hex 
 * @param {string} color1_sel_hex 
 * @param {string} color2_ori_hex 
 * @param {string} color2_sel_hex 
 * @returns {number[]} ARGB. Alpha will be -1 if inconsistent.
 */
export function calculateHighlight(color1_ori_hex, color1_sel_hex, color2_ori_hex, color2_sel_hex) {
    const B1 = parseHex(color1_ori_hex, false); // original Color 1
    const R1 = parseHex(color1_sel_hex, false); // Result color 1
    const B2 = parseHex(color2_ori_hex, false); // original Color 2
    const R2 = parseHex(color2_sel_hex, false); // Result color 2

    // https://www.desmos.com/calculator/dkxzhv79hs

    //              R1*B2 - R2*B1
    // result = -----------------------
    //           (R1 - B1) + (R2 - B2)

    const R1subB1 = arraysSub(R1, B1);
    const R2subB2 = arraysSub(R2, B2);
    const result = arraysDiv(
        arraysSub(arraysMul(R1, B2), arraysMul(R2, B1)),
        arraysSub(R1subB1, R2subB2)
    );

    const alphaFrom1 = arraysDiv(R1subB1, arraysSub(result, B1)).map((c) => parseInt(c * 255));
    const alphaFrom2 = arraysDiv(R2subB2, arraysSub(result, B2)).map((c) => parseInt(c * 255));

    let alpha = -1;
    for (let i = 0; i < 3; i++) {
        if (isNaN(alphaFrom1[i]) || isNaN(alphaFrom2[i])) {
            continue;
        }

        if ((alpha == -1) || (alpha != -1 && alphaFrom1[i] == alphaFrom2[i])) {
            alpha = alphaFrom1[i];
        }
    }
    result.unshift(alpha);
    return result.map(Math.trunc);
}
