import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, ScrollView, Modal, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);


  const addPost = () => {
    if (newCategory && newTitle && newContent && newKeywords) {
      const newPost = {
        id: Date.now(),
        category: newCategory,
        title: newTitle,
        content: newContent,
        keywords: newKeywords,
        image: image,
      };
      setPosts([...posts, newPost]);
      setNewCategory('');
      setNewTitle('');
      setNewContent('');
      setNewKeywords('');
      setImage(null); // 이미지 초기화
      setModalVisible(false);
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
    setNewCategory(post.category);
    setNewTitle(post.title);
    setNewContent(post.content);
    setNewKeywords(post.keywords);
    setImage(post.image); // 이미지 설정
    setModalVisible(true);
  };

  const updatePost = () => {
    if (editingPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id
          ? {
              ...post,
              category: newCategory,
              title: newTitle,
              content: newContent,
              keywords: newKeywords,
              image: image,
            }
          : post
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      setNewCategory('');
      setNewTitle('');
      setNewContent('');
      setNewKeywords('');
      setImage(null); // 이미지 초기화
      setModalVisible(false);
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setNewCategory('');
    setNewTitle('');
    setNewContent('');
    setNewKeywords('');
    setImage(null); // 이미지 초기화
    setModalVisible(false);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const pickImage = async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) return;
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const getPermission = async () => { 
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('권한이 필요합니다.');
        return false;
      }
      return true;
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 25, marginBottom: 25, marginTop: 30 }}>게시판</Text>

      {/* 검색 창 */}
      <TextInput
        style={styles.searchInput}
        placeholder="글 제목, 내용"
        // 추가 검색 로직
      />

      {/* 게시판 목록 */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatListItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Board');  // navigate logic 구현 예정
              }}
              onLongPress={() => setEditingItem(editingItem === item ? null : item)} // 버튼 숨기기
            >
              <View style={{ flexDirection: 'row' }}>
                {item.image && <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 10, marginBottom: 10}} />}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text>{item.category}</Text>
                  <Text>{item.keywords}</Text>
                  <Text>{item.content}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {editingItem === item && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title="수정" onPress={() => editPost(item)} color="purple" />
                <Button title="삭제" onPress={() => deletePost(item.id)} color="purple" />
              </View>
            )}
          </View>
        )}
      />

      {/* 글 작성 */}
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button title="글 작성" onPress={() => setModalVisible(true)} color="purple"/>
      </View>

      {/* 게시글 작성 및 수정 */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
      >
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {editingPost ? '게시글 수정' : '글 작성'}
          </Text>
          
          {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }}/>}
          <Button title="이미지 업로드" onPress={pickImage} color="purple" />

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
            style={styles.textInput}
            placeholder="키워드(#)"
            value={newKeywords}
            onChangeText={(text) => setNewKeywords(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 8,
              marginBottom: 10,
              minHeight: 200, 
              textAlign: 'left', 
              textAlignVertical: 'top', 
            }}
            placeholder="내용을 입력하세요"
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
            multiline={true} 
          />
          <View style={styles.buttonContainer}>
            <Button
              title={editingPost ? '수정' : '작성'}
              onPress={editingPost ? updatePost : addPost} color="purple"
            />
            <Button title="취소" onPress={cancelEdit} color="purple"/>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
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
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
});