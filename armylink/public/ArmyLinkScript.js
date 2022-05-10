const MAXHALL = 14;
let ARMY;
var clipboard = new ClipboardJS('.army__infotable__link__copy');

InitArmyBox();
function InitArmyBox(){
  'use strict';
  IEFallback();
  const tierSelect = document.querySelector('.army__tierselect');
  const infoLink = document.querySelector('.army__infotable__link');
  const unitSelect = document.querySelector('.army__unitselect');
  for(let i = 1; i <= MAXHALL; i++){
    let container = document.createElement('div');
    let label = document.createElement('label');
    let tier = document.createElement('input');
    container.className = 'army__tierselect__tier';
    label.className = 'army__tierSelect__label';
    tier.setAttribute('type', 'radio');
    tier.setAttribute('name', 'tiers');
    tier.value = i;
    label.addEventListener('click', TierClickListener)
    tierSelect.appendChild(container).appendChild(label).appendChild(tier);
    label.appendChild(document.createTextNode('TH ' + i));
  }
  InitUnitSelect('units');
  InitUnitSelect('superunits');
  InitUnitSelect('spells');
  InitUnitSelect('siegemachines');
  infoLink.addEventListener('touchstart', InfoLinkTouchStart);
  infoLink.addEventListener('touchend', InfoLinkTouchEnd);
  unitSelect.addEventListener('touchstart', UnitSelectTouchStart);
  unitSelect.addEventListener('touchend', UnitSelectTouchEnd);
  unitSelect.addEventListener('click', UnitSelectClickListener);
}
function IEFallback(){
  'use strict';
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf('MSIE') > 0){
    //IE 11 미만 브라우저
  }else if(userAgent.indexOf('Trident') > 0){
    //IE 11
  }else{
    //IE 이외 브라우저들
    let header = document.querySelector('header');
    if (header) {
      header.remove();
    }
  }
}
function InitUnitSelect(type){
  'use strict';
  const unitSelect = document.querySelector('.army__unitselect__' + type);
  for(const key in window[type.toUpperCase()]){
    let button = document.createElement('button');
    //button.className = 'army__' + type + '--' + key;
    //button.classList.add('army__unitselect--disabledTH');
    //let bgUrl = "url('./public/COCimages/' + type + '_' + key + '.webp')";
    button.style.backgroundImage = "url('./public/COCimages/" + type + "_" + key + ".webp')";
    button.className = 'army__unitselect--disabledTH';
    button.value = type + '_' + key;
    unitSelect.appendChild(button);
  }
}
function TierClickListener(event){
  'use strict';
  let target = event.target;
  if (target.tagName !== 'INPUT'){
    return
  }
  let tier = Number(event.target.value);
  if (ARMY){
    ARMY.reset(tier);
    ClearChildren(document.querySelector('.army__unitdisplay__units'));
    ClearChildren(document.querySelector('.army__unitdisplay__spells'));
    ClearChildren(document.querySelector('.army__unitdisplay__siegemachines'));
  }else{
    ARMY = new Army(tier);
  }
}
function UnitSelectTouchStart(event){
  'use strict';
  let target = event.target;
  let className = target.className;
  if (target.tagName === 'BUTTON'){
    if (!className.includes('disabledTH')){
      target.classList.add('army__unitselect--clickable--active');
    }
  }
}
function UnitSelectTouchEnd(event){
  'use strict';
  let target = event.target;
  if (target.tagName === 'BUTTON'){
    target.classList.remove('army__unitselect--clickable--active');
  }
}
function InfoLinkTouchStart(event){
  'use strict';
  let target = event.target;
  let className = target.className;
  if (className.includes('generator')||className.includes('linkahrf')||className.includes('copy')){
    target.classList.add('army__infotable__link--active');
  }
}
function InfoLinkTouchEnd(event){
  'use strict';
  let target = event.target;
  let className = target.className;
  if (className.includes('generator')||className.includes('linkahrf')||className.includes('copy')){
    target.classList.remove('army__infotable__link--active');
  }
}
function UnitSelectClickListener(event){
  'use strict';
  if (ARMY === undefined){
    throw 'SELECT TIER';
  }
  const target = event.target;
  if (target.tagName !== 'BUTTON'){
    return
  }
  const className = target.className;
  if (className.includes('disabled')){
    return
  }
  const names = target.value.split('_');
  ARMY.update(names[0], names[1], 1);
  ARMY.applyCap(names[0]);
  if (names[0] === 'units'){
    ARMY.applyCap('superunits');
  }else if (names[0] === 'superunits'){
    ARMY.applyCap('units');
    ARMY.applySuperUnitCap(names[1], true);
  }
}
function UnitDisplayClickListener(event){
  'user strict';
  const names = event.currentTarget.value.split('_');
  ARMY.update(names[0], names[1], -1);
  ARMY.applyCap(names[0]);
  if (names[0] === 'units'){
    ARMY.applyCap('superunits');
  }else if (names[0] === 'superunits'){
    ARMY.applyCap('units');
    ARMY.applySuperUnitCap(names[1], false);
  }
}

clipboard.on('success', function(e) {
  let display = document.querySelector('.army__infotable__link');
  let msg = document.querySelector('.army__infotable__link__copied');
  if (msg !== null) {
    msg.remove();
  }
  msg = document.createElement('span');
  msg.textContent = '  Copied !';
  msg.className = 'army__infotable__link__copied';
  display.appendChild(msg);
  setTimeout(RemoveTimer, 1000, msg);
  e.clearSelection();
});
function RemoveTimer(msg){
  msg.remove();
}

Army.prototype.MaxFood_units = [20, 30, 70, 80, 135, 150, 200, 200, 220, 240, 260, 280, 300, 300];
Army.prototype.MaxFood_spells = [0, 0, 0, 0, 2, 4, 6, 7, 9, 11, 11, 11, 11, 11];
Army.prototype.MaxFood_siegemachines = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
Army.prototype.update = function(unitType, unitName, count){
  'use strict';
  if (unitType && unitName){
    const UNITTYPE = unitType.toUpperCase();
    const unitInfo = window[UNITTYPE][unitName];
    if (!unitInfo){
      throw 'INVALID PARAMETER: fullname';
    }
    let food = unitInfo.food;
    if (!Number.isInteger(count)){
      throw 'INVALID PARAMETER: count';
    }
    let foodCategory = unitType;
    if (unitType === 'superunits'){
      foodCategory = 'units';
    }
    const canvas = 'army__unitdisplay__';
    if (count > 0){
      let nextFood = 0;
      for(let i = 0; i < count; i++){
        nextFood = this['food_' + foodCategory] + food;
        if (nextFood > this['maxFood_' + foodCategory]){
          throw 'OVER MAXFOOD: ' + foodCategory;
        }
        const prevCount = this[unitType][unitName];
        if (isNaN(prevCount)) {
          this[unitType][unitName] = 1;
          this.draw(canvas + foodCategory, unitType, unitName, 1);
        }else{
          this[unitType][unitName] = prevCount + 1;
          this.draw(canvas + foodCategory, unitType, unitName, prevCount + 1);
        }
        this['food_' + foodCategory] = nextFood;
      }
    }else if (count < 0){
      for(let i = 0; i > count; i--){
        const prevCount = this[unitType][unitName];
        if (isNaN(prevCount)) {
          throw 'UNIT NOT EXISTS';
        }else{
          if (prevCount > 0){
            if (prevCount === 1){
              delete this[unitType][unitName];
            }else{
              this[unitType][unitName] = prevCount - 1;
            }
            this['food_' + foodCategory] = this['food_' + foodCategory] - food;
            this.draw(canvas + foodCategory, unitType, unitName, prevCount - 1);
          }else{
            throw 'UNIT BELOW ZERO';
          }
        }
      }
    }
    if (foodCategory === 'units'){
      this.displayCount('unit', '');
    }else if (foodCategory === 'spells'){
      this.displayCount('spell', '');
    }
  }else{
    throw 'INVALID PARAMETER: fullname';
  }

}
Army.prototype.reset = function(TH){
  if ((TH > 0) && (TH <= MAXHALL)){
    this.maxFood_units = this.MaxFood_units[TH - 1];
    this.maxFood_spells = this.MaxFood_spells[TH - 1];
    this.maxFood_siegemachines = this.MaxFood_siegemachines[TH - 1];
  }
  this.food_units = 0;
  this.food_spells = 0;
  this.food_siegemachines = 0;
  this.units = {};
  this.superunits = {};
  this.spells = {};
  this.siegemachines = {};
  this.clearCap();
  this.clearSuperUnitCap();
  this.applyUnitSelectCap(TH);
  this.displayCount('unit', 'total');
  this.displayCount('unit', '');
  this.displayCount('spell', 'total');
  this.displayCount('spell', '');
  this.clearLink();
}
Army.prototype.clearCap = function(){
  let matches = document.querySelectorAll('button.army__unitselect--disabled');
  for(let i = 0; i < matches.length ; i++){
    matches[i].classList.remove('army__unitselect--disabled');
  }
}
Army.prototype.applyCap = function(unitType){
  'use strict';
  let unitTypeForCap = unitType;
  if (unitType === 'superunits'){
    unitTypeForCap = 'units';
  }
  const cap = this.getCap(unitTypeForCap);
  const children = document.querySelector('.army__unitselect__' + unitType).children;
  for(let i = 0; i < children.length; i++){
    let child = children[i];
    if (child.className.includes('disabledTH')){
      continue;
    }
    let unitName = child.value.split('_')[1];
    if (window[unitType.toUpperCase()][unitName].food > cap){
      child.classList.add('army__unitselect--disabled');
    }else {
      child.classList.remove('army__unitselect--disabled');
    }
  }
}
Army.prototype.applySuperUnitCap = function(unitName, isAdd){
  'use strict';
  let superUnitTypeCount = Object.keys(this.superunits).length;
  if (isAdd){
    if (superUnitTypeCount === 2){
      if (this.superunits[unitName] === 1){
        this.applySuperUnitCapDisplay();
      }
    }
  }else{
    if (superUnitTypeCount === 1){
      if (this.superunits[unitName] === undefined){
        this.clearSuperUnitCap();
      }
    }
  }
}
Army.prototype.clearSuperUnitCap = function(){
  'use strict';
  let disabledSU = document.querySelectorAll('.army__unitselect--disabledSU');
  for (let i = 0; i < disabledSU.length; i++){
    disabledSU[i].classList.remove('army__unitselect--disabledSU');
  }
}
Army.prototype.applySuperUnitCapDisplay = function(){
  'use strict';
  const unitselect_superunits = document.querySelector('.army__unitselect__superunits').children;
  for (let i = 0; i < unitselect_superunits.length; i++){
    let element = unitselect_superunits[i];
    let isIn = false;
    for (const keys in this.superunits) {
      if (element.className.includes(keys)){
        isIn = true;
      }
    }
    if (!isIn){
      element.classList.add('army__unitselect--disabledSU');
    }
  }
}
Army.prototype.getCap = function(unitType){
  'use strict';
  if (unitType === 'superunits'){
    unitType = 'units';
  }
  return this['maxFood_' + unitType] - this['food_' + unitType]
}
Army.prototype.draw = function(canvas, unitType, unitName, count){
  'use strict';
  if (canvas instanceof HTMLElement){
  }else if (typeof canvas === 'string'){
    canvas = document.querySelector('.' + canvas);
  }else{
    throw 'INVALID PARAMETER: canvas';
  }
  let isUnitExist = false;
  let children = canvas.children;
  let child;
  for(let i = 0; i < children.length; i++){
    child = children[i];
    if (child.className === 'army__' + unitType + '--' + unitName){
      isUnitExist = true;
      break;
    }
  }
  if (isUnitExist){
    if (count === 0) {
      child.remove();
    }else {
      child.firstChild.innerText = count + 'x';
    }
  }else {
    if (count === 1){
      child = document.createElement('button');
      child.className = 'army__' + unitType + '--' + unitName;
      child.value = unitType + '_' + unitName;
      child.addEventListener('click', UnitDisplayClickListener);
      let grandChild = document.createElement('span');
      grandChild.className = 'army__unitdisplay__count'
      grandChild.innerText = count + 'x';
      canvas.appendChild(child).appendChild(grandChild);
      let img = document.createElement('div');
      img.className = 'army__unitdisplay__minusimg';
      child.appendChild(img);
    }else {
      child.firstChild.innerText = count + 'x';
    }
  }
  this.clearLink();
}
Army.prototype.clearLink = function(){
  'use strict';
  if (document.querySelector('.army__infotable__link__linkahref')){
    document.querySelector('.army__infotable__link__linkahref').remove();
  }
  if (document.querySelector('.army__infotable__link__copy')){
    document.querySelector('.army__infotable__link__copy').remove();
  }
}
Army.prototype.applyUnitSelectCap = function(TH){
  'use strict';
  let matches = document.querySelectorAll('button.army__unitselect--disabledTH');
  for(let i = 0; i < matches.length ; i++){
    matches[i].classList.remove('army__unitselect--disabledTH');
  }
  matches = document.querySelectorAll('button.army__unitselect--clickable');
  for(let i = 0; i < matches.length ; i++){
    matches[i].classList.remove('army__unitselect--clickable');
  }
  let lists = ['units', 'superunits', 'spells', 'siegemachines']
  for (let i = 0; i < lists.length; i++){
    let target = lists[i];
    let children = document.querySelector('.army__unitselect__' + target).children;
    for(let i = 0; i < children.length ; i++){
      const child = children[i];
      const names = child.value.split('_');
      const unitType = target.toUpperCase();
      const unitName = names[1];
      const minTH = window[unitType][unitName].minTH;
      if (minTH > TH){
        child.classList.add('army__unitselect--disabledTH');
      }else{
        child.classList.add('army__unitselect--clickable');
      }
    }
  }
}
Army.prototype.displayCount = function(type, total){
  'use strict';
  let display = document.querySelector('.army__infotable__' + type + 'count__' + total + 'count');
  if (total === 'total'){
    display.innerText = '/' + this['maxFood_' + type + 's'];
  }else{
    display.innerText = this['food_' + type + 's'];
  }
}
Army.prototype.setLinkGenerator = function(){
  'use strict';
  const container = document.querySelector('.army__infotable__link');
  const button = document.createElement('div');
  const halfinner = document.createElement('div');
  button.addEventListener('click', this.generateLink);
  button.className = 'army__infotable__link__generator';
  button.textContent = 'Generate';
  halfinner.className = 'army__infotable__link__generator__halfinner';
  container.appendChild(button).appendChild(halfinner);
}
Army.prototype.generateLink = function(){
  'use strict';
  if (ARMY == undefined){
    throw 'SELECT TIER';
  }
  let link = '';
  const units = ARMY.generateLinkByType('units');
  const spells = ARMY.generateLinkByType('spells');
  const siegemachines = ARMY.generateLinkByType('siegemachines');
  link = units ? link + 'u' + units : '';
  link = siegemachines ? link + (units? '-' + siegemachines: siegemachines): link;
  link = spells ? link + 's' + spells : link;
  if (link === ''){
    return
  }else{
    link = 'https://link.clashofclans.com/?action=CopyArmy&army=' + link;
  }
  const container = document.querySelector('.army__infotable__link');
  let linkahref = document.querySelector('.army__infotable__link__linkahref');
  let copy = document.querySelector('.army__infotable__link__copy');
  if (linkahref === null){
    const halfinner = document.createElement('div');
    halfinner.className = 'army__infotable__link__generator__halfinner';
    linkahref = document.createElement('a');
    linkahref.className = 'army__infotable__link__linkahref';
    linkahref.textContent = 'LINK';
    linkahref.target = '_blank';
    container.appendChild(linkahref).appendChild(halfinner);
  }
  if (copy === null){
    const halfinner = document.createElement('div');
    halfinner.className = 'army__infotable__link__generator__halfinner';
    copy = document.createElement('button');
    copy.className = 'army__infotable__link__copy';
    copy.textContent = 'COPY';
    container.appendChild(copy).appendChild(halfinner);
  }
  linkahref.href = link;
  copy.setAttribute('data-clipboard-text', link);
}
Army.prototype.generateLinkByType = function(unitType){
  'use strict';
  const blocks = document.querySelector('.army__unitdisplay__' + unitType).children;
  let str = '';
  for(let i = 0; i < blocks.length; i++) {
    const names = blocks[i].value.split('_');
    const count = ARMY[names[0]][names[1]];
    const code = window[names[0].toUpperCase()][names[1]].code;
    if (str === ''){
      str = count + 'x' + code;
    }else{
      str = str + '-' + count + 'x' + code;
    }
  }
  return str
}

function Army(TH){
  'use strict';
  if (isNaN(TH) || (TH < 1) || (TH > MAXHALL)){
    throw 'INVALID PARAMETER: Townhall Level';
  }
  this.maxFood_units = this.MaxFood_units[TH - 1];
  this.maxFood_spells = this.MaxFood_spells[TH - 1];
  this.maxFood_siegemachines = this.MaxFood_siegemachines[TH - 1];
  this.food_units = 0;
  this.food_spells = 0;
  this.food_siegemachines = 0;
  this.units = {};
  this.superunits = {};
  this.spells = {};
  this.siegemachines = {};
  this.applyUnitSelectCap(TH);
  this.displayCount('unit', 'total');
  this.displayCount('unit', '');
  this.displayCount('spell', 'total');
  this.displayCount('spell', '');
  this.setLinkGenerator();
}


////////////
function ClearChildren(element){
  while(element.firstChild){
    element.removeChild(element.lastChild);
  }
};
//POLYFILL//
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
//POLYFILL for element.remove() by github-chenzhenxi
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode && this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype].filter(Boolean));
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
