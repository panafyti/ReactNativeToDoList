import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Check if there are locally stored todos
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
        
        // Fetch new todos from the endpoint
        const response = await fetch('https://scmscore.i-magic.gr/uploads/rn/reminders');
        if (!response.ok) {
          throw new Error('Failed to fetch To-Do items');
        }
        const data = await response.json();

        // Combine newly fetched todos with stored todos
        const updatedTodos = [...todos, ...(data.todos ?? [])];
        setTodos(updatedTodos);

        // Store the updated todos locally
        await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      } catch (error) {
        console.error('Error fetching todos:', error); // Log the error for debugging
        Alert.alert('Error', 'Failed to fetch To-Do items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleUpdate = (id) => {
    
  };

  const handleDelete = (id) => {

  };

  const handleSetReminder = (id) => {
  
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={() => handleUpdate(item.id)} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
              <Button title="Set Reminder" onPress={() => handleSetReminder(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  todoItem: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default TodoListScreen;
