import React, { useState, useEffect } from 'react';
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
  const [isGuideModalVisible, setGuideModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

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
      setImage(null);
      setModalVisible(false);
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
    setNewCategory(post.category);
    setNewTitle(post.title);
    setNewContent(post.content);
    setNewKeywords(post.keywords);
    setImage(post.image);
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
      setImage(null);
      setModalVisible(false);
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setNewCategory('');
    setNewTitle('');
    setNewContent('');
    setNewKeywords('');
    setImage(null);
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

  const searchFilter = (item) => { //검색 기능
    const titleMatch = item.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const contentMatch = item.content.toLowerCase().includes(searchKeyword.toLowerCase());
    return titleMatch || contentMatch;
  };

  useEffect(() => {
    setFilteredPosts(posts.filter(searchFilter));
  }, [searchKeyword, posts]);
  
  //게시판
  return ( 
    <View style={{ flex: 1, padding: 12 }}> 
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10 }}></Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="  글 제목"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />

      <TouchableOpacity
        style={[styles.searchInput, { marginTop: 0, marginBottom: 10, backgroundColor: 'lightgray', padding: 10 }]}
        onPress={() => setGuideModalVisible(true)}
      >
        <Text>🏴 커뮤니티 사용 가이드</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatListItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Board');
              }}
              onLongPress={() => setEditingItem(editingItem === item ? null : item)}
            >
              <View style={{ flexDirection: 'row' }}>
                {item.image && <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 10, marginBottom: 0}} />}
                <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                <Text><Text style={{ color: 'gray', fontWeight: 'bold' }}>카테고리:</Text> {item.category}</Text>
                <Text><Text style={{ color: 'gray', fontWeight: 'bold' }}>지역:</Text> {item.keywords}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail">{item.content}</Text>
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

      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button title="작성" onPress={() => setModalVisible(true)} color="purple"/>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
      >
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {editingPost ? '게시글 수정' : '게시판 작성'}
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
            placeholder="지역"
            value={newKeywords}
            onChangeText={(text) => setNewKeywords(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 8,
              marginBottom: 10,
              minHeight: 330, 
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
    </View>
  );
}

const styles = StyleSheet.create({
  flatListItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
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
    textAlign: 'left', // 좌로 정렬
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
