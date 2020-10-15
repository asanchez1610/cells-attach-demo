import { BaseDm } from '../base-dm/base-dm.js';

class AttachmentDm extends BaseDm {

  constructor(element) {
    super(element);
  }

  formatId(id) {
    id = id.replace(/{/gi, '');
    id = id.replace(/}/gi, '');
    return id;
  }

  separeteMultipartBase64(responseText) {
    let temp = [];
    responseText.split('--uuid:').forEach(item => {
      if (item.indexOf('Content-ID: <attachmentPart>') !== -1) {
        temp.push(item);
      }
    });
    let bodyBinary = temp[0];
    let hashBase64 = bodyBinary.substr(bodyBinary.indexOf('Content-ID: <attachmentPart>') + ('Content-ID: <attachmentPart>').length).trim();
    return hashBase64;
  }

  async getFileDocument(idDocument) {
    let request = await fetch('./resources/mock/file.txt');
    let responseText = await request.text();
    let hashBase64 = this.separeteMultipartBase64(responseText);
    return hashBase64;
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([ u8arr ], filename, { type: mime });
  }

}
let attachmentDM = (element) => new AttachmentDm(element);
export { attachmentDM };