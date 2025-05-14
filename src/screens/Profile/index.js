/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Background from '../../utils/Background';
import {useDispatch, useSelector} from 'react-redux';
import {postData, postFormData, fetchPosts} from '../../store/ApiReducer';
import {Text} from '../../utils/fontfamily';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {posts, loading, error} = useSelector(state => state.api);

  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handlePostData = () => {
    dispatch(
      postData({
        title: title || 'Test Title',
        body: body || 'This is a test post',
        userId: 1,
      }),
    );
  };
  ({item}) => <Text style={styles.item}>{item.title}</Text>;

  const handlePostFormData = () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('description', 'Test FormData Upload');

    dispatch(postFormData(formData));
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
        <Text style={{fontSize: 14}}>{item.body}</Text>
      </View>
    );
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={{marginBottom: 100}} tyle={{}}>
            <Text style={styles.heading}>Posts</Text>

            {loading && <ActivityIndicator size="large" color="blue" />}
            {error && <Text style={styles.error}>{error}</Text>}

            <FlatList
              data={posts}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: 20}}
            />

            <Text style={styles.label}>Title:</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <Text style={styles.label}>Body:</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              style={styles.input}
            />

            <Button title="Post JSON" onPress={handlePostData} />
            <View style={{height: 10}} />
            <Button title="Post FormData" onPress={handlePostFormData} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
});
