import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import { apiSearchBook } from '../../api/main';

const CamContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  hr {
    position: absolute;
    width: 400px;
    border: 1px solid #61b864;
  }
`;

function ScanBook() {
  const navigate = useNavigate();
  const [findCode, setCode] = useState(null);

  function searchIsbn() {
    const reqData = {
      word: `${findCode}`,
      index: 2,
    };
    apiSearchBook(
      reqData,
      response => {
        console(response.data.bookId);
        navigate(`/bookDetail/${response.data.bookId}`);
      },
      error => console.log(error),
    );
  }

  const video = useRef(null);
  const canvas = useRef(null);
  const openCam = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 400, height: 300, facingMode: 'environment' },
      })
      .then(stream => {
        video.current.srcObject = stream;
        video.current.play();
        const ctx = canvas.current.getContext('2d');
        const barcode = new window.BarcodeDetector({
          formats: ['ean_13'],
        });
        const detectBarcode = setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight,
          );
          barcode
            .detect(canvas.current)
            .then(([data]) => {
              if (data) {
                clearInterval(detectBarcode);
                setCode(data.rawValue);
              }
            })
            .catch(err => console.log(err));
        }, 100);
      })
      .catch(err => {
        alert('바코드 스캔을 지원하지 않는 기기입니다');
        navigate(-1);
      });
  };

  useEffect(() => {
    if (findCode) {
      searchIsbn();
    } else {
      openCam();
    }
  });

  return (
    <CamContainer>
      <div>
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas} />
      </div>
      <hr />
    </CamContainer>
  );
}
export default ScanBook;
