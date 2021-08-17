const CONTENTS = [{videoId: "mf3efASc-F0"}];
const mainDiv = document.getElementById('main');

function AddContent(){
  let child = document.createElement('div');
  child.className = 'coc';
  let grandChild = document.createElement('iframe');
  grandChild.className = 'COC__youtube'
  let src = "https://www.youtube-nocookie.com/embed/" + CONTENTS[0].videoId;
  setYoutubeAttributes(grandChild, src)
  child.appendChild(grandChild);
  mainDiv.appendChild(child);
};

function setYoutubeAttributes(element, src){
  element.src = src;
  element.width = '50%';
  element.height = '500px';
  element.setAttribute('allowFullScreen', 'true');
  element.setAttribute('frameborder', '0');
  element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
};

AddContent();
