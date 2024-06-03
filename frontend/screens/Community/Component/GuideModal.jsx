import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const GuideModal = ({ isGuideModalVisible, setGuideModalVisible }) => {
  return (
    <Modal
      visible={isGuideModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setGuideModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>커뮤니티 사용 가이드</Text>
          <Text>1. 게시물 형식 준수.</Text>
          <Text>2. 도배성 게시물 금지.</Text>
          <Text>3. 회원 간의 배려와 존중.</Text>
          <Text>4. 타인에 대한 비방 금지.</Text>
          <Text>5. 주제에 맞는 콘텐츠 작성.</Text>
          <Text>                       </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setGuideModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GuideModal;
