import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const Detail = ({ route }) => {
  const { title, category, keywords, content, purchase, trade, timestamp } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false); 

 
  const getImageUri = async () => {
    
    const imageUri = route.params.image;
    setImageUri(imageUri);
  };

  useEffect(() => {
    getImageUri();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day}  ${hours}:${minutes}`; // 공백
  };

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
      <Text style={styles.text}>↔  {trade}</Text>
      <Text>  </Text>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>상품 가격: {category}</Text>
        <Text style={styles.text}>상품 상태: {keywords}</Text>
        <Text style={styles.text}>구매 시기: {purchase}</Text>
        <Text>  </Text>
        <Text style={styles.text}>{content}</Text>
      </View>
      
      {/* modal */}
      {imageUri && (
        <TouchableOpacity onPress={toggleImageModal}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
      )}
      {/* modal */}
      <Modal visible={isImageModalVisible} transparent={true} onRequestClose={toggleImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleImageModal}>
            <Text style={styles.closeButtonText}> X </Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUri }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 125,
    height: 125,
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
  },
  // 모달 스타일
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detail;




