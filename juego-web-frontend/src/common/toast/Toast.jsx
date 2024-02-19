import { useCallback, useEffect } from 'react';
import '../toast/Toast.css';  

const Toast = ({ toastlist, position, setList }) => {
  const deleteToast = useCallback(id => {
    const toastListItem = toastlist.filter(e => e.id !== id);
    setList(toastListItem);
  }, [toastlist, setList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [toastlist, deleteToast]);

  return (
    <div className={`container ${position}`}>
      {toastlist.map((toast, i) => (
        <div
          key={i}
          className={`notification toast ${position} ${toast.type}`}
        >
        <div className='contenido'>
        <p className="title">{toast.title}</p>
        <p className="description">{toast.description}</p>
        </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;