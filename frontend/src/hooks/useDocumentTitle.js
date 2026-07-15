import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | GymOS` : 'GymOS';
  }, [title]);
};

export default useDocumentTitle;
