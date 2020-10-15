import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import '@bbva-web-components/bbva-button-default';
import { attachmentDM } from '../../elements/attach-dm/attach-dm.js';

const utilBehavior = CellsBehaviors.cellsBaseBehaviorPfco;
class InitPage extends utilBehavior(CellsPage) {
  static get is() {
    return 'init-page';
  }

  static get properties() {
    return {
    };
  }

  get attachmentDM() {
    return attachmentDM(this);
  }

  constructor() {
    super();

    this.addListers();
  }

  async addListers() {
    await this.updateComplete;
    await this.dowLoadFile();
  }

  async dowLoadFile() {
    let item = await fetch('./resources/mock/item.json').then(response => response.json());
    console.log('Item Mock', item);
    this.getById('loadingDetail').activeLoading = true;
    this.getById('btnFile').setAttribute('disabled', 'disabled');
    this.getById('btnFile').text = 'Bulding file...';
    try {
      let textBinary = await this.attachmentDM.getFileDocument(item.id);
      console.log(textBinary);

      // let file = this.attachmentDM.dataURLtoFile(`data:${item.contentInfo.contentType};base64,${hashBase64}`, item.name);
      // console.log(file);
      // let reader = new FileReader();
      // reader.onload = () => {
      //   let dataURL = reader.result;
      //   let downloadMemoryLink = this.shadowRoot.querySelector('#link-download');
      //   downloadMemoryLink.setAttribute('href', dataURL);
      //   downloadMemoryLink.download = item.contentInfo.fileName;
      //   downloadMemoryLink.click();
      // };
      // reader.readAsDataURL(file);
      this.getById('loadingDetail').activeLoading = false;
      this.getById('btnFile').removeAttribute('disabled');
      this.getById('btnFile').text = 'Build File complete!';
    } catch (e) {
      console.log('error descargar file', e);
      this.getById('loadingDetail').activeLoading = false;
    }
  }

  render() {
    return html`
      <style>${this.constructor.shadyStyles}</style>
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__main" >
          <a id = "link-download" style = "display:none" ></a>
          <div class = "container">
            <bbva-button-default
              disabled
              id = "btnFile"
              text="Bulding file..."
              @click=${() => this.dowLoadFile() }  ></bbva-button-default>
          </div>

          <cells-spinner-global-pfco id = "loadingDetail"  ></cells-spinner-global-pfco>

        </div>
      </cells-template-paper-drawer-panel>`;
  }

  static get shadyStyles() {
    return `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f4f4f4;
      }
    `;
  }
}

window.customElements.define(InitPage.is, InitPage);
