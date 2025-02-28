import {useEffect, useState} from 'react';
import styles from './ArticleParamsForm.module.scss';

type UseCloseReturn = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export function useClose(initialState: boolean): UseCloseReturn {
  const [isOpen, setIsOpen] = useState(initialState);
    
  useEffect(() => {
    setIsOpen(initialState)
  }, [initialState]);

  function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  function open() {
    setIsOpen(true);
  }
  
  function close() {
    setIsOpen(false);
  }
  
  return {isOpen, toggle, close};
}