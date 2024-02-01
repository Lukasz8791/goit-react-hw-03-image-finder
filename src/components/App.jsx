import React, { useState, useEffect } from 'react';
import TopBar from './TopBar/TopBar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async (query, page) => {
    return fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=41083655-82ce4b08f1604d0cb0165a8b6&image_type=photo&orientation=horizontal&per_page=12`
    );
  };

  const loadImages = async (query, page) => {
    setIsLoading(true);

    try {
      const response = await fetchImages(query, page);
      if (response.ok) {
        const data = await response.json();
        if (currentPage === 1) {
          setImages(data.hits);
        } else {
          setImages(prevImages => [...prevImages, ...data.hits]);
        }
      } else {
        console.error('Error fetching images from Pixabay API');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages(query, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage]);

  const handleFormSubmit = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.app}>
      <TopBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />

      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      {images.length > 0 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
