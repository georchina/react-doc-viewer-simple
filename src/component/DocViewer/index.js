import React from 'react';
import { Row, Col, Button, Empty } from 'antd';
import { downloadFile, fetchDownload } from '../../utils/download';
import styles from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      contentType: undefined,
    };
  }

  componentDidMount() {
    const { index } = this.state;
    const { attachments } = this.props;
    if (attachments && attachments.length > 0) {
      this.getContentType(attachments[index].title);
    }
  }

  downloadAttachment = async url => {
    const { beforeDownload } = this.props;
    if (beforeDownload) {
      const res = await beforeDownload();
      if (!res.errSms) {
        const { url: downloadUrl, fileName } = await fetchDownload(url, 'GET');
        downloadFile(downloadUrl, fileName);
      }
    } else {
      const { url: downloadUrl, fileName } = await fetchDownload(url, 'GET');
      downloadFile(downloadUrl, fileName);
    }
  }

  getViewer = () => {
    const { index, contentType } = this.state;
    const { attachments, minHeight, toolbar } = this.props;
    const current = attachments[index];
    if(["pdf", "application/pdf"].includes(contentType)) {
      return (
        <Row>
          <iframe title={current.title} src={`${current.url}#toolbar=${toolbar || 0}`} style={{width:'100%', minHeight: minHeight || 800}} />
        </Row>
      )
    }
    if (["doc", "application/msword", "docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "xls", "application/vnd.ms-excel",
    "xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ppt", "application/vnd.ms-powerpoint", "pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"].includes(contentType)) {
      return (
        <iframe
          id="msdoc-iframe"
          title="msdoc-iframe"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            current.url
          )}`}
          frameBorder="0"
          style={{width:'100%', minHeight: minHeight || 800}}
        />
      )
    }
    if (["bmp", "image/bmp", "jpg", "jpeg", "image/jpg", "image/jpeg", "png", "image/png", "tif", "tiff", "image/tif", "image/tiff"].includes(contentType)) {
      return <img id="image-img" src={current.url} alt='attachment' className={styles.img} />
    }
    return <Row>Unsupported file types.</Row>
  }

  getContentType = title => {
    let contentType;
    const arr = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "bmp", "jpg", "jpeg", "png", "tif", "tiff"];
    for(let i=0; i<arr.length; i++) {
      if(title.endsWith(`.${arr[i]}`)) {
        contentType = arr[i];
        break;
      }
    }
    this.setState({ contentType });
  }

  onClick = type => {
    let { index } = this.state;
    const { attachments } = this.props;
    if (type === 'prev') {
      if (index !== 0) {
        index--;
      }
    } else if (index !== (attachments.length - 1)) {
      index++;
    }
    this.setState({ index });
    this.getContentType(attachments[index].title);
  }

  render() {
    const { index } = this.state;
    const { attachments, extra } = this.props;
    if(!attachments || attachments.length === 0) {
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    const current = attachments[index];
    return (
      <Row>
        <Row className={styles.attachmentHeader}>
          <Col span={12}><Button onClick={() => this.downloadAttachment(current.url)} icon='download' shape="round">Download</Button></Col>
          <Col span={12}>
            <Row type='flex' justify='end' align='middle' gutter={10}>
              {extra?
                <Col>
                  {extra}
                </Col>:null
              }
              <Col>
                <Row>
                  Doc {index + 1} of {attachments.length}
                </Row>
              </Col>
              <Col>
                <Button
                  icon='left'
                  shape="circle"
                  onClick={() => this.onClick('prev')}
                  disabled={index === 0}
                />
              </Col>
              <Col>
                <Button
                  icon='right'
                  shape="circle"
                  onClick={() => this.onClick('back')}
                  disabled={index >= attachments.length - 1}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {this.getViewer()}
      </Row>
    )
  }
}

export default Index;