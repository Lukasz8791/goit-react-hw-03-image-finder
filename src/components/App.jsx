// App.jsx
import React, { useState, useEffect } from 'react';
import TopBar from './TopBar/TopBar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

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
        if (data.hits.length === 0) {
          setHasMore(false);
        }
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
    setHasMore(true);
    loadImages(query, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage]);

  const handleFormSubmit = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setCurrentPage(1);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <TopBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onClick={handleImageClick} />

      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      {hasMore && images.length > 0 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
