const MAINFIELD = document.getElementsByTagName('article')[0];
const FILTER = {tags :[], lastindex: 0};
const INITIALLOAD = 4;

function SetPageNation(){
  let count = CONTENTS.length;
  let pages = Math.floor(count / 4);
  return
};

function CheckboxClick(box){
  let tag = box.value
  let passedIndex = [];
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
  ClearChildren(MAINFIELD);
  for(let i = 0; i < CONTENTS.length; i++){
    if (IsPassFilter(CONTENTS[i].tags, FILTER.tags)){
      passedIndex.push(i);
    }
  }
  LoadContents(passedIndex, 0, 4);
  return
}

function LoadContents(passedIndex, startIndex, count){
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

function IsPassFilter(test, filter){
  let passTier = false;
  let passTierExisted = false;
  let passStrat = true;
  if (filter.length){
    for(let i = 0; i < filter.length; i++){
      if (filter[i].includes('TH')) {
        passTierExisted = true;
        passTier = passTier || test.includes(filter[i])
      }else{
        passStrat = passStrat && test.includes(filter[i])
      }
    }
    if (passTierExisted){
      return passTier && passStrat
    }else{
      return passStrat
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

LoadContents([0, 1, 2, 3], 0, 4);

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
