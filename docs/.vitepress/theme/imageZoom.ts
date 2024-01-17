const imageZoomDirective = {
    mounted(el: HTMLElement) {
      if (el.tagName === 'IMG') {
        el.style.cursor = 'zoom-in';
        el.addEventListener('click', () => {
          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            overflow: auto;
          `;
  
          const clonedImg = el.cloneNode() as HTMLImageElement;
          clonedImg.style.maxWidth = '100%';
          clonedImg.style.maxHeight = '90vh';
          modal.appendChild(clonedImg);
  
          modal.addEventListener('click', () => {
            modal.remove();
          });
  
          document.body.appendChild(modal);
        });
      }
    }
  };
  
  export default imageZoomDirective;
  