"use strict";
import * as Helper from "./helper.js";

const DOM_COLOR1_ORI = "color1_ori";
const DOM_COLOR1_SEL = "color1_sel";
const DOM_COLOR2_ORI = "color2_ori";
const DOM_COLOR2_SEL = "color2_sel";
/** @type {HTMLInputElement} */ let ELEM_COLOR1_ORI = null;
/** @type {HTMLInputElement} */ let ELEM_COLOR1_SEL = null;
/** @type {HTMLInputElement} */ let ELEM_COLOR2_ORI = null;
/** @type {HTMLInputElement} */ let ELEM_COLOR2_SEL = null;
const DOM_COLOR_RESULT       = "color_result";
const DOM_COLOR_RESULT_HEX   = "color_result_hex";
const DOM_COLOR_RESULT_RGB   = "color_result_rgb";
const DOM_COLOR_RESULT_ALPHA = "color_result_alpha";
/** @type {HTMLInputElement} */ let ELEM_COLOR_RESULT       = null;
/** @type {HTMLInputElement} */ let ELEM_COLOR_RESULT_HEX   = null;
/** @type {HTMLInputElement} */ let ELEM_COLOR_RESULT_RGB   = null;
/** @type {HTMLInputElement} */ let ELEM_COLOR_RESULT_ALPHA = null;

let initDone = false;

function getResult() {
    const INCONSISTENT = "(inconsistent)";
    const result = Helper.calculateHighlight(
        ELEM_COLOR1_ORI.value,
        ELEM_COLOR1_SEL.value,
        ELEM_COLOR2_ORI.value,
        ELEM_COLOR2_SEL.value,
    )

    const rgb_consistent = !result.slice(1).some((c) => c < 0 || c > 255);
    const result_hex = Helper.makeHex(...result, false);
    ELEM_COLOR_RESULT.value = rgb_consistent ? result_hex : "#000000";
    ELEM_COLOR_RESULT_HEX.value = rgb_consistent ? result_hex : INCONSISTENT;
    ELEM_COLOR_RESULT_RGB.value = rgb_consistent ? result.slice(1).join(", ") : INCONSISTENT;

    ELEM_COLOR_RESULT_ALPHA.value = (result[0] < 0 || result[0] > 255) ? INCONSISTENT : result[0];
}

function init() {
    // console.log(Helper.calculateHighlight("#000000", "#001c38", "#ffffff", "#b9d5f1"));
    [DOM_COLOR1_ORI, DOM_COLOR1_SEL, DOM_COLOR2_ORI, DOM_COLOR2_SEL].forEach((id) => {
        const colorPicker = document.getElementById(id);
        const colorHex = document.getElementById(id + "_hex");

        // event listener for updating hex value from color picker
        const fnUpdateHex = () => {
            colorHex.value = colorPicker.value;
            if (initDone) getResult();
        };
        colorPicker.addEventListener("input", fnUpdateHex);

        // event listener for updating color picker from hex value
        colorHex.addEventListener("input", () => {
            colorPicker.value = Helper.makeHex(...Helper.parseHex(colorHex.value, true), false);
            if (initDone) getResult();
        });

        // run this once to display the hex value
        fnUpdateHex();
    });

    ELEM_COLOR1_ORI = document.getElementById(DOM_COLOR1_ORI);
    ELEM_COLOR1_SEL = document.getElementById(DOM_COLOR1_SEL);
    ELEM_COLOR2_ORI = document.getElementById(DOM_COLOR2_ORI);
    ELEM_COLOR2_SEL = document.getElementById(DOM_COLOR2_SEL);
    ELEM_COLOR_RESULT = document.getElementById(DOM_COLOR_RESULT);
    ELEM_COLOR_RESULT_HEX = document.getElementById(DOM_COLOR_RESULT_HEX);
    ELEM_COLOR_RESULT_RGB = document.getElementById(DOM_COLOR_RESULT_RGB);
    ELEM_COLOR_RESULT_ALPHA = document.getElementById(DOM_COLOR_RESULT_ALPHA);

    // generate result once
    getResult();

    initDone = true;
}

//=| Init |===================================================================//
if (document.readyState === "complete") {
    // If the document completes loading before the script does, (for example,
    // when async is running), directly invoke the init function instead of
    // attaching an event handler.
    init();
} else {
    window.addEventListener("load", init, false);
}
