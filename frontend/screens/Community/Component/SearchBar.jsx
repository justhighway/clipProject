import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <TextInput
      style={[styles.searchInput, { marginTop: 45 }]}
      placeholder="  게시판 제목"
      value={searchKeyword}
      onChangeText={(text) => setSearchKeyword(text)}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
});

export default SearchBar;
