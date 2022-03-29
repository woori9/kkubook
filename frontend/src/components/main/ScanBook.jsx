import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';

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
                console.log(data.rawValue);
                clearInterval(detectBarcode);
                setCode(data.rawValue);
              }
            })
            .catch(err => console.log(err));
        }, 100);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (findCode) {
      navigate(`/bookDetail/${findCode}`);
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
