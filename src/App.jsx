import { useEffect, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

const DynamicPhotoSphereViewer = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Lấy giá trị của tham số 'img' từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const imgParam = urlParams.get("image");

    if (imgParam) {
      // Giải mã URL (trong trường hợp nó đã được mã hóa)
      setImageUrl(decodeURIComponent(imgParam));
    }

    // Thêm CSS để ẩn thanh điều hướng và phần mờ
    const style = document.createElement("style");
    style.textContent = `
      .psv-navbar {
        display: none !important;
      }
      .psv-panel {
        background: none !important;
      }
    `;
    document.head.append(style);

    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (imageUrl === "") {
    return (
      <div>
        <p>Ảnh không tồn tại</p>
      </div>
    );
  }

  return (
    <ReactPhotoSphereViewer
      src={imageUrl}
      height={"100vh"}
      width={"100vw"}
      navbar={[]}
    ></ReactPhotoSphereViewer>
  );
};

export default DynamicPhotoSphereViewer;
