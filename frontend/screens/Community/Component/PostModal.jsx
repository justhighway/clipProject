import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PostModal = ({ isModalVisible, setModalVisible, addPost, updatePost, editingPost, newCategory, setNewCategory, newTitle, setNewTitle, newContent, setNewContent, image, setImage }) => {
  const pickImage = async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('권한이 필요합니다.');
        return false;
      }
      return true;
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setImage(null);
    setNewCategory('');
    setNewTitle('');
    setNewContent('');
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={false}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {editingPost ? '게시판 수정' : '게시판 생성'}
          </Text>
        </View>

        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }} />}
        <Button title="이미지 업로드" onPress={pickImage} color="#8A2BE2" />

        <TextInput
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder="제목"
          value={newTitle}
          onChangeText={(text) => setNewTitle(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="카테고리"
          value={newCategory}
          onChangeText={(text) => setNewCategory(text)}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 8,
            marginBottom: 10,
            minHeight: 380,
            textAlign: 'left',
            textAlignVertical: 'top',
          }}
          placeholder="내용을 입력하세요"
          value={newContent}
          onChangeText={(text) => setNewContent(text)}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.fullWidthButton} onPress={editingPost ? updatePost : addPost}>
            <Text style={styles.fullWidthButtonText}>{editingPost ? '수정' : '생성'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fullWidthButton} onPress={handleCancel}>
            <Text style={styles.fullWidthButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fullWidthButton: {
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PostModal;
