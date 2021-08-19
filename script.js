const MAINFIELD = document.getElementsByTagName('article')[0];
const PAGENATION = document.querySelector('.pagenation');
const FILTER = {tags :[], passed: [], currentpage: 1};
const INITIALLOAD = 4;

function SetPageNation(count){
  ClearChildren(PAGENATION);
  FILTER.currentpage = 1;
  let pages = Math.floor((count - 1) / 4);
  if (pages === 0){
    return
  }
  for(let i = 0; i <= pages ;i++){
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton'
    child.textContent = i + 1;
    if (i === 0){
      child.classList.add('pagenation__indexbutton--selected')
    }
    child.addEventListener('click', function(event){
      let page = Math.floor(event.target.textContent);
      if (page === FILTER.currentpage){
        return
      }else{
        FILTER.currentpage = page;
        LoadContents(FILTER.passed, (page - 1) * 4, 4);
        document.querySelector('.pagenation__indexbutton--selected').classList.remove('pagenation__indexbutton--selected');
        event.target.classList.add('pagenation__indexbutton--selected');
      }
    });
    PAGENATION.appendChild(child);
  }
  return
};

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
  SetPageNation(FILTER.passed.length);
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
  SetPageNation(CONTENTS.length);
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
