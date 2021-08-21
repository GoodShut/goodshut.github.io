const MAINFIELD = document.getElementsByTagName('article')[0];
const PAGENATION = document.querySelector('.pagenation');
const FILTER = {tags :[], passed: [], currentpage: 1};
const INITIALLOAD = 4;

class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }

    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
            if ( this.xDiff > 0 ) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if ( this.yDiff > 0 ) {
                this.onUp();
            } else {
                this.onDown();
            }
        }

        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt).bind(this);
        }.bind(this), false);
    }
}
const swiper = new Swipe(document.body);
swiper.onRight(function(){
  let currentPageButton = document.querySelector('pagenation__indexbutton--selected');
  let prevPageButton = currentPageButton.previousElementSibling;
  if (prevPageButton){
    prevPageButton.click();
  }
  return
});
swiper.onLeft(function(){
  let currentPageButton = document.querySelector('pagenation__indexbutton--selected');
  let nextPageButton = currentPageButton.nextElementSibling;
  if (nextPageButton){
    nextPageButton.click();
  }
  return
});
swiper.run();

function SetPageNation(startPage){
  ClearChildren(PAGENATION);
  let count = FILTER.passed.length;
  let pages = Math.floor((count - 1) / 4) + 1;
  if (pages === 1){
    return
  }
  if (startPage !== 1){
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton';
    child.value = (startPage - 5);
    child.textContent = '<<';
    child.addEventListener('click', PrevPageChapter);
    PAGENATION.appendChild(child);
  }
  for(let i = 0; i < 5 ;i++){
    let page = startPage + i;
    if (page > pages){
      return
    }
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton';
    child.textContent = page;
    if (i === 0){
      child.classList.add('pagenation__indexbutton--selected')
    }
    child.addEventListener('click', PageButtonClicked);
    PAGENATION.appendChild(child);
  }
  if ((startPage + 4) < pages){
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton';
    child.value = (startPage + 5);
    child.textContent = '>>';
    child.addEventListener('click', NextPageChapter);
    PAGENATION.appendChild(child);
  }
  return
}

function PrevPageChapter(event){
  let startPage = Math.floor(event.target.value);
  FILTER.currentpage = startPage + 4;
  SetPageNation(startPage);
  let queryClass = 'pagenation__indexbutton--selected';
  document.querySelector('.' + queryClass).classList.remove(queryClass)
  PAGENATION.lastElementChild.previousElementSibling.classList.add(queryClass);
  LoadContents(FILTER.passed, (startPage + 3) * 4, 4);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return
}

function NextPageChapter(event){
  let startPage = Math.floor(event.target.value);
  FILTER.currentpage = startPage;
  SetPageNation(startPage);
  LoadContents(FILTER.passed, (startPage - 1) * 4, 4);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return
}


function PageButtonClicked(event){
  let page = Math.floor(event.target.textContent);
  if (page === FILTER.currentpage){
    return
  }else{
    FILTER.currentpage = page;
    LoadContents(FILTER.passed, (page - 1) * 4, 4);
    let queryClass = 'pagenation__indexbutton--selected';
    document.querySelector('.' + queryClass).classList.remove(queryClass);
    event.target.classList.add(queryClass);
  }
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return
}

function CheckboxClick(box){
  let tag = box.value
  FILTER.passed = [];
  if (box.checked) {
    if (!FILTER.tags.includes(tag)){
      FILTER.tags.push(tag);
    }
  }else{
    if (FILTER.tags.includes(tag)){
      let index = FILTER.tags.indexOf(tag);
      if (index !== -1) {
        FILTER.tags.splice(index, 1);
      }
    }
  }
  for(let i = 0; i < CONTENTS.length; i++){
    if (IsPassFilter(CONTENTS[i].tags, FILTER.tags)){
      FILTER.passed.push(i);
    }
  }
  FILTER.currentpage = 1;
  LoadContents(FILTER.passed, 0, 4);
  SetPageNation(1);
  return
}

function LoadContents(passedIndex, startIndex, count){
  ClearChildren(MAINFIELD);
  for(let i = 0; i < count; i++){
    let index = passedIndex[startIndex + i];
    if (index !== undefined){
      let src = 'https://www.youtube-nocookie.com/embed/' + CONTENTS[index].videoId + '?rel=0';
      let child = document.createElement('div');
      child.className = 'coc';
      let grandChild = document.createElement('iframe');
      grandChild.className = 'COC__youtube'
      SetYoutubeAttributes(grandChild, src)
      child.appendChild(grandChild);
      MAINFIELD.appendChild(child);
    }else{
      return
    }
  }
  return
}

function IsPassFilter(test, filters){
  let passTier = false;
  let passLayout = false;
  let passStrat = true;
  let passTierExisted = false;
  let passLayoutExisted = false;
  let filterCount = filters.length;
  if (filterCount){
    for(let i = 0; i < filterCount; i++){
      let filter = filters[i];
      if (filter.includes('TH_')) {
        passTierExisted = true;
        passTier = passTier || test.includes(filter)
      }else if(filter.includes('LO_')){
        passLayoutExisted = true;
        passLayout = passLayout || test.includes(filter)
      }else if(filter.includes('ST_')){
        passStrat = passStrat && test.includes(filter)
      }
    }
    if (passTierExisted){
      if (passLayoutExisted){
        return passTier && passStrat && passLayout
      }else{
        return passTier && passStrat
      }
    }else{
      if (passLayoutExisted){
        return passStrat && passLayout
      }else{
        return passStrat
      }
    }
  }else{
    return true
  }
}

function SetYoutubeAttributes(element, src){
  element.src = src;
  element.width = '50%';
  element.height = '500px';
  element.setAttribute('allowFullScreen', '');
  element.setAttribute('frameborder', '0');
  element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  return
};

function Main(){
  for(let i = 0; i < CONTENTS.length; i++){
    FILTER.passed.push(i);
  }
  LoadContents([0, 1, 2, 3], 0, 4);
  SetPageNation(1);
  return
}
Main();


/////////////////////////Functions///////////////////////////////
function ClearChildren(element){
  while(element.firstChild){
    element.removeChild(element.lastChild);
  }
  return
};

/*
for IE8 and below
 */
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}
/////////////////////////////////////////////////////////////
