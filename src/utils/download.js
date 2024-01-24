export const downloadFile = (url, fileName) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 封装一个fetch download方法
export const fetchDownload = async(fetchUrl, fileName, method = "POST", body = null) => {
  const response = await window.fetch(fetchUrl, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
      },
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return { blob, url, fileName }; // 返回blob、download url、fileName
}
