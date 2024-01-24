# react wrapped simple file preview component, support pdf, word, ppt, xlsx, picture preview.

## Use
```npm i react-doc-viewer-simple``.
```import DocViewer from 'react-doc-viewer-simple';```
```<DocViewer
    attachments={[{title: 'xxx.pdf', url: 'your url'}]}
    // extra={extraComponent}
    // beforeDownload={this.beforeDownload}
  />```
You can pass in extra to customize the extra component, and pass in beforeDownload method to customize the behavior before download.
Also support minHeight, toolbar parameters to customize the minimum height and whether to show the action menu in pdf.

===============================

中文
# react封装的简单文件预览组件，支持pdf、word、ppt、xlsx、图片预览。

## 使用
```npm i react-doc-viewer-simple```
```import DocViewer from 'react-doc-viewer-simple';```
```<DocViewer
    attachments={[{title: 'xxx.pdf', url: 'your url'}]}
    // extra={extraComponent}
    // beforeDownload={this.beforeDownload}
  />```
可以传入extra自定义额外组件，传入beforeDownload方法自定义下载前行为。
另外还支持minHeight, toolbar参数自定义最小高度及pdf是否显示操作菜单。