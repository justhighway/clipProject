import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PostItem = ({ item, editPost, deletePost, setEditingItem, editingItem, navigation }) => {
  return (
    <View style={styles.flatListItem}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Board')
        }}
        onLongPress={() => setEditingItem(editingItem === item ? null : item)}
      >
        <View style={{ flexDirection: 'row' }}>
          {item.image && <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 10, marginBottom: 0}} />}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text><Text style={{ color: 'black', fontWeight: 'bold' }}>카테고리:</Text> {item.category}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{item.content}</Text>
            <Text style={{ color: 'gray', fontSize: 12 }}>{formatDate(item.id)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {editingItem === item && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="수정" onPress={() => editPost(item)} color="#8A2BE2" />
          <Button title="삭제" onPress={() => deletePost(item.id)} color="#8A2BE2" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
});

const formatDate = (timestamp) => {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDiff = Math.floor((currentDate - postDate) / (60 * 1000));

  const pad = (num) => {
    return num < 10 ? '0' + num : num;
  };

  if (timeDiff < 1) {
    return '방금 전';
  } else if (timeDiff < 60) {
    return `${timeDiff}분 전 / ${postDate.getFullYear()}.${pad(postDate.getMonth() + 1)}.${pad(postDate.getDate())}`;
  } else if (timeDiff < 1440) {
    return `${Math.floor(timeDiff / 60)}시간 전 / ${postDate.getFullYear()}.${pad(postDate.getMonth() + 1)}.${pad(postDate.getDate())}`;
  } else {
    return `${postDate.getFullYear()}.${pad(postDate.getMonth() + 1)}.${pad(postDate.getDate())}`;
  }
};

export default PostItem;
