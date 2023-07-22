import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
}

function ModalPortal({ children } : Props) {
  if( typeof window === 'undefined' ) return null; // 서버사이드에서는 실행 안되게

  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node);
}

export default ModalPortal