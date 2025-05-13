import React, {useEffect, useState} from 'react';
import App from './src/App';

const MainApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

  return <App />;
};

export default MainApp;
