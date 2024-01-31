import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async page => {
    return fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=41083655-82ce4b08f1604d0cb0165a8b6&image_type=photo&orientation=horizontal&per_page=12`
    );
  };

  const loadImages = async () => {
    setIsLoading(true);

    try {
      const response = await fetchImages(currentPage);
      if (response.ok) {
        const data = await response.json();
        setImages(prevImages => [...prevImages, ...data.hits]);

        if (data.hits.length < 12) {
          setHasMore(false);
        } else {
          setCurrentPage(prevPage => prevPage + 1);
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
    setImages([]);
    setCurrentPage(1);
    setHasMore(true);

    if (query) {
      loadImages();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleLoadMore = () => {
    loadImages();
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      <ul className={styles.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={handleImageClick}
          />
        ))}
      </ul>
      {hasMore && !isLoading && (
        <button
          type="button"
          onClick={handleLoadMore}
          className={styles.loadMoreButton}
        >
          Load more
        </button>
      )}
      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
