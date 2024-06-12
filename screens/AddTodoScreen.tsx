import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from 'react-native';
import uuid from 'react-native-uuid'; // Correct import

const AddTodoScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [enableReminder, setEnableReminder] = useState(false); // State to track reminder toggle switch

  const handleAddTodo = () => {
    // Generate a unique ID for the new To-Do item
    const id = uuid.v4();

    // Implement the logic to add the To-Do item to the database or storage

    const todoDetails = { id, title, description, enableReminder };
    Alert.alert('New To-Do Added', JSON.stringify(todoDetails));

    // Reset the form fields
    setTitle('');
    setDescription('');
    setEnableReminder(false); // Reset the reminder toggle switch
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New To-Do</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.reminderContainer}>
        <Text>Enable Reminder</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={enableReminder ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setEnableReminder}
          value={enableReminder}
        />
      </View>
      <Button title="Add To-Do" onPress={handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default AddTodoScreen;
